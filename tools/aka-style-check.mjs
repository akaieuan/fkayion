#!/usr/bin/env node
/**
 * akaSTYLE drift check.
 *
 * The design system is only worth having if the code and the specimen agree.
 * They drift in two directions and this looks for both:
 *
 *   1. Code that breaks a law. A hard-coded colour, a drop shadow, an
 *      animation that pulses brightness. Each of these is one of the seven
 *      stated as a constraint precisely so it can be checked rather than
 *      argued about, and a constraint nothing checks is a preference.
 *
 *   2. Vocabulary the specimen has not caught up with. A new component in
 *      components/ui that /aka-style has never heard of means the page that
 *      claims to show "everything this site is built from" is now wrong.
 *
 * Exits non-zero only for law violations. Missing specimen entries are
 * reported and do not fail: adding a component and documenting it in the same
 * commit is the goal, not a gate that blocks the commit that adds it.
 *
 * Run: npm run style:check
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname, basename } from 'node:path'

const ROOT = process.cwd()

/**
 * Files whose colour literals are the artwork rather than the interface.
 *
 * The canvas engines paint park greens, brick tans and cop lights; those are
 * art-layer constants in the same way the face accents are, and tokenising
 * them would mean a theme switch could recolour Prospect Park. Everything not
 * on this list resolves its colour from a variable.
 */
const ART_LAYER = [
  'components/features/brand/pixel-roundabout.tsx',
  'components/features/brand/pixel-head.tsx',
  'components/features/brand/roundabout-sim.ts',
  'components/ui/blockpad-mark.tsx',
  'components/ui/covart-mark.tsx',
  'lib/projects.ts', // the plate tints, which are per-project data
  // Shader and canvas work: these colours are inputs to a render, not
  // surfaces. A theme switch must not recolour a WebGL material.
  'components/features/home/liquid-morph-orb.tsx',
  'components/features/demo/orb-hero.tsx',
  'app/demo/blockpad/page.tsx', // renders Blockpad's own wireframe palette
]

/** Whole trees that are somebody else's surface. */
const ART_TREES = ['components/features/visualizer/']

/**
 * What akaSTYLE actually governs.
 *
 * It is the language this site is written in, not a rule about every pixel
 * that appears on it. A write-up that embeds a replica of BodyLog has to paint
 * BodyLog's colours, and a wireframe specimen has to paint the wireframe's;
 * holding those to the site's tokens would mean a theme switch recolours
 * somebody else's product. The scope is the chrome: the page shells, the
 * shared vocabulary in components/ui, the sections, and the tokens themselves.
 */
const EXCLUDE = [
  'components/demo/', // embedded replicas of other products
  'app/demo/bodylog/v1/', // the v1 exploration, in its own palette
  'app/demo/music-analysis-chat/app/', // the running demo, not the write-up
  'app/Visualizer-Eden/', // a full app route with its own surface
  'app/trickle.css', // the Trickle kit's own specimen styles
  'lib/blur-map.generated.ts', // generated
]

const SCAN_DIRS = ['app', 'components', 'lib']
const CODE = new Set(['.ts', '.tsx', '.css'])

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (CODE.has(extname(p))) out.push(p)
  }
  return out
}

const files = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)))
  .map((f) => f.slice(ROOT.length + 1))
  .filter((f) => !EXCLUDE.some((e) => f.startsWith(e)))

const violations = []
const notes = []

for (const rel of files) {
  if (ART_LAYER.includes(rel)) continue
  if (ART_TREES.some((t) => rel.startsWith(t))) continue
  const src = readFileSync(join(ROOT, rel), 'utf8')
  const lines = src.split('\n')

  lines.forEach((line, i) => {
    const at = `${rel}:${i + 1}`
    const code = line.replace(/\/\/.*$/, '')
    if (/^\s*\*/.test(line)) return // inside a block comment

    // Law 02 — every surface resolves from a variable.
    // globals.css is where the variables are defined, so literals belong there.
    if (rel !== 'app/globals.css') {
      const hex = code.match(/#[0-9a-fA-F]{3,8}\b/)
      if (hex) violations.push([at, `hard-coded colour ${hex[0]}`, 'law 02'])
      if (/\brgba?\(|\bhsla?\(/.test(code))
        violations.push([at, 'hard-coded colour function', 'law 02'])
    }

    // Law 03 — depth is a border, never a drop shadow.
    const shadow = code.match(/\bshadow-(?!none\b)[a-z0-9[\]/.-]+/)
    if (shadow) violations.push([at, `${shadow[0]}`, 'law 03'])

    // Law 04 — motion moves space, never brightness.
    if (/\banimate-pulse\b/.test(code)) violations.push([at, 'animate-pulse', 'law 04'])
    if (/\banimate-ping\b/.test(code)) violations.push([at, 'animate-ping', 'law 04'])
  })
}

// ── Does the specimen know about everything? ────────────────────────────────
/*
 * The specimen is a surface, not a directory. Its pages live under
 * app/aka-style and their section components live in the feature folder the
 * refactor gave them, so both are the text this check reads. Scanning only
 * the pages would have marked every extracted component "undocumented" the
 * day the pages went thin.
 */
const specimen = ['app/aka-style', 'components/features/aka-style']
  .flatMap((d) => walk(join(ROOT, d)))
  .map((f) => readFileSync(f, 'utf8'))
  .join('\n')

const uiComponents = readdirSync(join(ROOT, 'components/ui'))
  .filter((f) => f.endsWith('.tsx'))
  .map((f) => basename(f, '.tsx'))

const undocumented = uiComponents.filter((name) => {
  const pascal = name
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join('')
  return !specimen.includes(pascal) && !specimen.includes(name)
})

// ── Report ──────────────────────────────────────────────────────────────────
const bold = (s) => `[1m${s}[0m`
const dim = (s) => `[2m${s}[0m`

console.log(bold('\nakaSTYLE check\n'))

if (violations.length === 0) {
  console.log('  Laws: no violations.')
} else {
  console.log(`  ${bold(`Laws: ${violations.length} violation(s)`)}`)
  for (const [at, what, law] of violations) console.log(`    ${at}  ${what}  ${dim(law)}`)
}

if (undocumented.length === 0) {
  console.log('  Specimen: every components/ui piece appears on /aka-style.')
} else {
  console.log(`\n  ${bold('Specimen: not on /aka-style')} ${dim('(report only)')}`)
  for (const n of undocumented) console.log(`    components/ui/${n}.tsx`)
  console.log(
    dim('\n    If one of these is house vocabulary rather than a one-off,\n' +
        '    add it to app/aka-style/primitives so the page stays true.'),
  )
}

/*
 * Reports by default, fails only when asked.
 *
 * There is a standing backlog here that predates the check: a handful of drop
 * shadows and some literals in the header and the logo set. A check that fails
 * from the first run is a check somebody turns off, so this reports and exits
 * clean unless `--strict` is passed. The convention is to read it before a
 * push and not add to the list; `--strict` is there for when the list is
 * empty and you want it to stay that way.
 */
const strict = process.argv.includes('--strict')
console.log(
  violations.length && !strict
    ? dim('  Reporting only. Pass --strict to fail on violations.\n')
    : '',
)
process.exit(strict && violations.length > 0 ? 1 : 0)
