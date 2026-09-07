#!/usr/bin/env node
/**
 * akaSTYLE drift check.
 *
 * The design system is only worth having if the code and the specimen agree.
 * They drift in three directions and this looks for all of them:
 *
 *   1. Code that breaks a law. A hard-coded colour, a drop shadow, an
 *      animation that pulses brightness, a render loop nothing pauses, an
 *      image with no dimensions, one more client component than the budget.
 *      Each of these is one of the eight laws stated as a constraint precisely
 *      so it can be checked rather than argued about, and a constraint nothing
 *      checks is a preference.
 *
 *   2. The specimen disagreeing with the code it documents. A law count in
 *      prose that LAWS.length has moved on from, a token value printed on
 *      /aka-style/foundations that globals.css no longer holds.
 *
 *   3. Vocabulary the specimen has not caught up with. A component in
 *      components/ui, or an aka-* class in globals.css, that /aka-style never
 *      shows means the page claiming to show "everything this site is built
 *      from" is now wrong.
 *
 * Exits non-zero only for law violations, and only with --strict. Missing
 * specimen entries are reported and do not fail. `--selftest` runs every rule
 * against a built-in fixture that must trip it and one that must pass, so a
 * rule that silently stopped matching is caught here rather than never.
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
  'components/features/demo/three-examples/liquid-morph-orb.tsx',
  'components/features/demo/three-examples/orb-hero.tsx',
  // The same orb restated as a plate mark: one raw fragment shader carrying
  // the orb's own palette, so it answers to the orb rather than the theme.
  'components/features/demo/three-examples/mark.tsx',
  // Blockpad's own wireframe palette, which moved with its section when the
  // page went thin. The exemption follows the colours, not the route.
  'components/features/demo/blockpad/payload.tsx',
  // Transcribed logo masters. The hex in brand-logos is an SVG mask channel
  // (white keeps, black drops) and one waveform peak the mark owns; the hex
  // in project-logo is inside vendored SVG source. Neither is a surface.
  'components/ui/brand-logos.tsx',
  'components/ui/project-logo.tsx',
  // Each plugin's own tint, per-product data like the plate tints above.
  'components/features/demo/akavsts/plugins.tsx',
  // The Trickle kit's showcase, in the kit's own effect colours.
  'components/ui/trickle-specimen.tsx',
  // Prints the token file itself, as text to copy; the literals are the subject.
  'components/features/aka-style/foundations/transfer-block.tsx',
]

/** Whole trees that are somebody else's surface. */
const ART_TREES = [
  'components/features/visualizer/',
  'components/trickle/', // the Trickle kit's effects carry their own colours
]

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
  'components/product-replicas/', // embedded replicas of other products' UIs
  'app/demo/bodylog/v1/', // the v1 exploration, in its own palette
  'app/demo/music-analysis-chat/app/', // the running demo, not the write-up
  'app/demo/hitl-ai/', // a product screen with its own controls, not a write-up
  'components/features/demo/hitl-ai/', // that screen's own components
  'app/Visualizer-Eden/', // a full app route with its own surface
  'app/trickle.css', // the Trickle kit's own specimen styles
  'lib/blur-map.generated.ts', // generated
]

/**
 * Law 05 governs render loops. These files call requestAnimationFrame for
 * something that is not a loop, and say so here rather than carrying the
 * observers a loop would need.
 */
const RAF_EXEMPT = {
  'components/features/demo-index/cover-flow.tsx': 'one frame per scroll event, gated on an IntersectionObserver; no loop',
  'components/ui/site-header.tsx': 'scroll throttle, one frame per event',
  'components/features/landing/links/use-cursor-panel.ts': 'pointer follow, one frame per move',
  'components/features/demo/trickle-ui-kit/what-i-built.tsx': 'the word in prose, describing a kit that does not use it',
}

/**
 * Keyframes that are somebody else's effect. The landing plate runs the
 * Trickle kit's word swap, and the kit's tree is already art.
 */
const ART_KEYFRAMES = { 'aka-trickle-swap': 'the Trickle kit', 'aka-trickle-turn': 'the Trickle kit' }

/**
 * Law 07 as a number. Files under the scan that carry a client directive.
 * Adding one is allowed; it is a decision, so the budget moves in the same
 * commit as the file that spends it, with the reason in that commit.
 */
const CLIENT_BUDGET = 18

/**
 * aka-* classes that are one page's own chrome rather than vocabulary. The
 * deck documents itself on /demo; a palette hook belongs to its one mark.
 */
const INTERNAL_CLASSES = {
  'aka-flow-section': 'the deck', 'aka-flow-caption': 'the deck', 'aka-flow-grid': 'the deck', 'aka-flow-pill': 'the deck',
  'aka-flow-pill-track': 'the deck', 'aka-flow-slot': 'the deck', 'aka-flow-strip': 'the deck',
  'aka-blockpad': 'a palette hook for one mark',
  'aka-trickle-line': "the landing plate's own animation", 'aka-trickle-swap': "the landing plate's own animation",
}

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

/** Drop a trailing // comment, but not the // inside a URL. */
const stripComment = (line) => line.replace(/(^|[^:"'`\w])\/\/.*$/, '$1')

const WORDS = { four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 }

// ── The rules ────────────────────────────────────────────────────────────────
/**
 * Every check is a function of (rel, src) that pushes [at, what, law] onto
 * `out`. They are written this way so --selftest can hand each one a fixture.
 */
function checkLines(rel, src, out) {
  const lines = src.split('\n')
  lines.forEach((line, i) => {
    const at = `${rel}:${i + 1}`
    if (/^\s*\*/.test(line)) return // inside a block comment
    const code = stripComment(line)

    // Law 02 — every surface resolves from a variable.
    // globals.css is where the variables are defined, so literals belong there.
    if (rel !== 'app/globals.css') {
      const hex = code.match(/#[0-9a-fA-F]{3,8}\b/)
      if (hex) out.push([at, `hard-coded colour ${hex[0]}`, 'law 02'])
      const fn = code.match(/\b(rgba?|hsla?|oklch|oklab|lab|lch|color)\(/)
      if (fn) out.push([at, `hard-coded colour ${fn[1]}()`, 'law 02'])
      const stock = code.match(/\b(?:bg|text|border|from|via|to|fill|stroke)-(white|black)\b/)
      if (stock) out.push([at, `stock ${stock[0]}, not a token`, 'law 02'])
    }

    // Law 03 — depth is a border, never a drop shadow.
    // Bare `shadow` only counts inside a class string; the word appears in prose.
    const shadow = code.match(/(?:^|[\s"'`])(shadow-(?!none\b)[a-z0-9[\]/.-]+)(?=[\s"'`]|$)/) ||
      (/className=|\bcls=|@apply/.test(code) ? code.match(/(?:^|[\s"'`])(shadow)(?=[\s"'`]|$)/) : null)
    if (shadow) out.push([at, shadow[1], 'law 03'])
    if (/\bdrop-shadow(?:-|\()/.test(code)) out.push([at, 'drop-shadow', 'law 03'])
    if (/\bbox-shadow\s*:/.test(code) || /\bboxShadow\s*:/.test(code)) out.push([at, 'box-shadow', 'law 03'])

    // Law 01 — one type scale. Sizes are the eight named steps and text-display;
    // an arbitrary pixel or clamp is a size the scale does not have.
    const size = code.match(/\btext-\[(?:\d+(?:\.\d+)?px|clamp\([^\]]*\))\]/)
    if (size) out.push([at, `${size[0]}: not on the type scale`, 'law 01'])

    // Law 04 — motion moves space, never brightness.
    if (/\banimate-pulse\b/.test(code)) out.push([at, 'animate-pulse', 'law 04'])
    if (/\banimate-ping\b/.test(code)) out.push([at, 'animate-ping', 'law 04'])
    const hov = code.match(/\bhover:opacity-(\d+)\b/)
    if (hov && hov[1] !== '0' && hov[1] !== '100') out.push([at, `hover:opacity-${hov[1]}: a hover that dims`, 'law 04'])
  })
}

/** Law 04 in CSS: keyframes and hover rules that only change brightness. */
function checkCss(rel, src, out) {
  if (!rel.endsWith('.css')) return
  const kf = /@keyframes\s+([\w-]+)\s*\{([\s\S]*?)\n\}/g
  let m
  while ((m = kf.exec(src))) {
    if (ART_KEYFRAMES[m[1]]) continue
    const props = new Set([...m[2].matchAll(/(?:^|[{;])\s*([a-z-]+)\s*:/gm)].map((x) => x[1]))
    props.delete('offset')
    const bright = new Set(['opacity', 'filter', 'box-shadow', 'background-color', 'color', 'background'])
    if (props.size && [...props].every((p) => bright.has(p))) {
      const line = src.slice(0, m.index).split('\n').length
      out.push([`${rel}:${line}`, `@keyframes ${m[1]} animates ${[...props].join(', ')} and nothing else`, 'law 04'])
    }
  }
  const hov = /([^{}]*:hover[^{}]*)\{([^}]*)\}/g
  while ((m = hov.exec(src))) {
    const op = m[2].match(/(?:^|[\s;])opacity\s*:\s*([\d.]+)/)
    if (op && Number(op[1]) > 0 && Number(op[1]) < 1) {
      const line = src.slice(0, m.index).split('\n').length
      out.push([`${rel}:${line}`, `${m[1].trim()} dims to ${op[1]}`, 'law 04'])
    }
  }
}

/** Law 05 — loops pause when unwatched. */
function checkLoops(rel, src, out) {
  if (!/requestAnimationFrame\(/.test(src)) return
  if (RAF_EXEMPT[rel]) return
  const gates = [
    ['IntersectionObserver', /IntersectionObserver/],
    ['visibilitychange', /visibilitychange|document\.hidden/],
    ['prefers-reduced-motion', /prefers-reduced-motion/],
  ]
  const missing = gates.filter(([, re]) => !re.test(src)).map(([n]) => n)
  if (missing.length) out.push([rel, `a render loop without ${missing.join(', ')}`, 'law 05'])
}

/** Law 06 — layout never jumps: every image ships its dimensions. */
function checkImages(rel, src, out) {
  if (!rel.endsWith('.tsx')) return
  const tag = /<(Image|img)\b([\s\S]*?)\/?>/g
  let m
  while ((m = tag.exec(src))) {
    const attrs = m[2]
    const sized = (/\bwidth=/.test(attrs) && /\bheight=/.test(attrs)) || /\bfill\b/.test(attrs)
    // A static import carries its own intrinsic size.
    const staticSrc = /\bsrc=\{\s*[a-zA-Z_$][\w$]*\s*\}/.test(attrs) && !/\bsrc=\{\s*['"`\/]/.test(attrs)
    if (!sized && !(m[1] === 'Image' && staticSrc)) {
      const line = src.slice(0, m.index).split('\n').length
      out.push([`${rel}:${line}`, `<${m[1]}> without width and height`, 'law 06'])
    }
  }
}

const isClient = (src) => /^\s*['"]use client['"]/m.test(src)

// ── The scan ─────────────────────────────────────────────────────────────────
function scan() {
  const files = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)))
    .map((f) => f.slice(ROOT.length + 1))
    .filter((f) => !EXCLUDE.some((e) => f.startsWith(e)))
  const violations = []
  const notes = []
  let clientFiles = 0

  for (const rel of files) {
    if (ART_TREES.some((t) => rel.startsWith(t))) continue
    const src = readFileSync(join(ROOT, rel), 'utf8')
    if (isClient(src)) clientFiles++
    if (ART_LAYER.includes(rel)) continue
    checkLines(rel, src, violations)
    checkCss(rel, src, violations)
    checkLoops(rel, src, violations)
    checkImages(rel, src, violations)
  }

  // Law 07 — server by default. The count is the constraint.
  if (clientFiles > CLIENT_BUDGET)
    violations.push(['(scan)', `${clientFiles} client files, budget ${CLIENT_BUDGET}: raise it in the commit that spends it`, 'law 07'])
  else if (clientFiles < CLIENT_BUDGET)
    notes.push(`client files: ${clientFiles}, under the budget of ${CLIENT_BUDGET}; lower CLIENT_BUDGET to keep the gain`)

  // ── Does the specimen agree with the code? ───────────────────────────────
  const specimenFiles = ['app/aka-style', 'components/features/aka-style'].flatMap((d) => walk(join(ROOT, d)))
  const specimen = specimenFiles.map((f) => readFileSync(f, 'utf8')).join('\n')
  const globals = readFileSync(join(ROOT, 'app/globals.css'), 'utf8')

  // The law count, wherever it is written as a word.
  const lawCount = (readFileSync(join(ROOT, 'lib/aka-style.ts'), 'utf8').match(/^\s*n: '\d\d'/gm) || []).length
  const prose = [
    ...specimenFiles.map((f) => f.slice(ROOT.length + 1)),
    'lib/projects.ts',
    'lib/plain-summaries.ts',
    'tools/aka-style-check.mjs',
  ]
  for (const rel of prose) {
    const src = readFileSync(join(ROOT, rel), 'utf8')
    src.split('\n').forEach((line, i) => {
      // Outside the specimen tree only sentences about the design language count;
      // a summary elsewhere may have six rules of its own.
      if (!rel.startsWith('app/aka-style') && !rel.startsWith('components/features/aka-style') && !/design language|akaSTYLE/.test(line)) return
      const m = line.match(/\b(four|five|six|seven|eight|nine|ten)\s+(laws|rules|constraints)\b/i)
      if (m && WORDS[m[1].toLowerCase()] !== lawCount)
        violations.push([`${rel}:${i + 1}`, `says ${m[1]} ${m[2]}, LAWS has ${lawCount}`, 'specimen'])
    })
  }

  // Token rows on /aka-style/foundations against globals.css.
  const tokens = { light: {}, dark: {} }
  const root = globals.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1] || ''
  const dark = globals.match(/\.dark\s*\{([\s\S]*?)\n\}/)?.[1] || ''
  for (const [theme, block] of [['light', root], ['dark', dark]])
    for (const t of block.matchAll(/^\s*(--[\w-]+):\s*([^;]+);/gm)) tokens[theme][t[1]] = t[2].trim()
  const norm = (v) => v.replace(/^oklch\(|\)$/g, '').replace(/\s+/g, ' ').trim()
  for (const f of specimenFiles) {
    const src = readFileSync(f, 'utf8')
    for (const row of src.matchAll(/<Row\s+name="(--[\w-]+)"\s+value="([^"]+)"/g)) {
      const [, name, value] = row
      const [l, d] = value.split('/').map((s) => s.trim())
      const check = (theme, printed) => {
        if (!printed || !/^[\d.]+(\s+[\d.]+){0,2}$|^[\d.]+%$/.test(printed)) return
        const actual = tokens[theme][name]
        if (actual && norm(actual) !== printed)
          violations.push([f.slice(ROOT.length + 1), `${name} ${theme} printed ${printed}, globals.css has ${norm(actual)}`, 'specimen'])
      }
      check('light', l)
      check('dark', d)
    }
  }

  // ── Does the specimen know about everything? ─────────────────────────────
  const uiComponents = readdirSync(join(ROOT, 'components/ui'))
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => basename(f, '.tsx'))
  // A component is documented when one of its exported names appears on the
  // specimen as a whole word; the file's basename is the fallback for a file
  // that exports nothing named.
  const undocumented = uiComponents.filter((name) => {
    const src = readFileSync(join(ROOT, 'components/ui', `${name}.tsx`), 'utf8')
    const exported = [...src.matchAll(/^export (?:function|const) ([A-Z]\w+)/gm)].map((m) => m[1])
    const names = exported.length ? exported : [name.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('')]
    return !names.some((n) => new RegExp(`\\b${n}\\b`).test(specimen))
  })
  const classes = new Set([...globals.matchAll(/\.(aka-[\w-]+)/g)].map((m) => m[1]))
  const unshown = [...classes].filter((c) => !INTERNAL_CLASSES[c] && !new RegExp(`\\b${c}\\b`).test(specimen)).sort()

  return { violations, notes, undocumented, unshown, clientFiles }
}

// ── Self-test ────────────────────────────────────────────────────────────────
/**
 * One fixture per rule that must trip it, and its clean twin that must not.
 * A rule that stops firing on its own fixture is a rule that has quietly
 * become a preference, which is the failure this whole file exists to avoid.
 */
function selftest() {
  const cases = [
    ['law 02 hex', checkLines, 'x.tsx', '<div className="bg-[#fff]" />', '<div className="bg-background" />'],
    ['law 02 oklch()', checkLines, 'x.tsx', "const c = 'oklch(0.5 0.1 200)'", "const c = 'var(--select)'"],
    ['law 02 stock white', checkLines, 'x.tsx', '<div className="bg-white" />', '<div className="bg-background" />'],
    ['law 02 url is not a comment', checkLines, 'x.tsx', "const u = 'https://x.dev/#fff'", "const u = 'https://x.dev/' // #fff"],
    ['law 01 type scale', checkLines, 'x.tsx', '<p className="text-[12.5px]" />', '<p className="text-13" />'],
    ['law 01 clamp', checkLines, 'x.tsx', '<h1 className="text-[clamp(1.7rem,5vw,2.4rem)]" />', '<h1 className="text-display" />'],
    ['law 03 bare shadow', checkLines, 'x.tsx', '<div className="rounded shadow" />', '<div className="rounded shadow-none" />'],
    ['law 03 box-shadow', checkLines, 'x.css', '.a { box-shadow: 0 1px 2px black; }', '.a { border: 1px solid var(--border); }'],
    ['law 04 hover dims', checkLines, 'x.tsx', '<a className="hover:opacity-90" />', '<a className="hover:opacity-100" />'],
    ['law 04 keyframes', checkCss, 'x.css', '@keyframes glow {\n  0% { opacity: 0.3; }\n  50% { opacity: 0.6; }\n}', '@keyframes rise {\n  0% { transform: translateY(8px); opacity: 0; }\n}'],
    ['law 04 css hover dims', checkCss, 'x.css', '.b:hover {\n  opacity: 0.9;\n}', '.b:hover {\n  transform: translateY(-2px);\n}'],
    ['law 05 loop', checkLoops, 'x.tsx', 'requestAnimationFrame(tick)', 'requestAnimationFrame(tick); new IntersectionObserver(); document.addEventListener("visibilitychange", f); matchMedia("(prefers-reduced-motion: reduce)")'],
    ['law 06 image', checkImages, 'x.tsx', '<Image src="/a.webp" alt="" />', '<Image src="/a.webp" alt="" width={10} height={10} />'],
    ['law 06 static import', checkImages, 'x.tsx', '<img src="/a.webp" alt="" />', '<Image src={hero} alt="" />'],
  ]
  let failed = 0
  for (const [name, fn, rel, bad, good] of cases) {
    const a = []; fn(rel, bad, a)
    const b = []; fn(rel, good, b)
    const ok = a.length > 0 && b.length === 0
    if (!ok) failed++
    console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${name}${ok ? '' : ` (bad: ${a.length}, good: ${b.length})`}`)
  }
  return failed
}

// ── Report ──────────────────────────────────────────────────────────────────
const bold = (s) => `\x1b[1m${s}\x1b[0m`
const dim = (s) => `\x1b[2m${s}\x1b[0m`

console.log(bold('\nakaSTYLE check\n'))

if (process.argv.includes('--selftest')) {
  const failed = selftest()
  console.log(failed ? bold(`\n  ${failed} rule(s) no longer fire on their own fixture.\n`) : '\n  Every rule fires on its fixture and passes its twin.\n')
  process.exit(failed ? 1 : 0)
}

const { violations, notes, undocumented, unshown, clientFiles } = scan()

if (violations.length === 0) {
  console.log('  Laws: no violations.')
} else {
  console.log(`  ${bold(`Laws: ${violations.length} violation(s)`)}`)
  for (const [at, what, law] of violations) console.log(`    ${at}  ${what}  ${dim(law)}`)
}
console.log(`  Client files: ${clientFiles} of a budget of ${CLIENT_BUDGET}.`)
for (const n of notes) console.log(`  ${dim(n)}`)

if (undocumented.length === 0 && unshown.length === 0) {
  console.log('  Specimen: every components/ui piece and every aka-* class appears on /aka-style.')
} else {
  if (undocumented.length) {
    console.log(`\n  ${bold('Specimen: components not on /aka-style')} ${dim('(report only)')}`)
    for (const n of undocumented) console.log(`    components/ui/${n}.tsx`)
  }
  if (unshown.length) {
    console.log(`\n  ${bold('Specimen: aka-* classes not on /aka-style')} ${dim('(report only)')}`)
    console.log(`    ${unshown.join('  ')}`)
  }
  console.log(dim('\n    If one of these is house vocabulary rather than a one-off,\n    add it to app/aka-style/primitives so the page stays true.'))
}

/*
 * Reports by default, fails only when asked.
 *
 * A check that fails from the first run is a check somebody turns off, so this
 * reports and exits clean unless `--strict` is passed. The convention is to
 * read it before a push and not add to the list; `--strict` is there for when
 * the list is empty and you want it to stay that way.
 */
const strict = process.argv.includes('--strict')
console.log(violations.length && !strict ? dim('  Reporting only. Pass --strict to fail on violations.\n') : '')
process.exit(strict && violations.length > 0 ? 1 : 0)
