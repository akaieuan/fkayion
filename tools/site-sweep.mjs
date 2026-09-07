#!/usr/bin/env node
/**
 * Site sweep: every route of the production build, in a real browser.
 *
 * The style check reads source. This reads the site: it drives every route the
 * build prerendered through headless Chrome at a desktop width and a phone
 * width, and fails on anything a visitor would hit that the build cannot see.
 *
 *   - a route that does not answer 200
 *   - a console error or a thrown exception while the page loads
 *   - a request that fails or answers 4xx/5xx (a missing image, a stale chunk)
 *   - horizontal overflow at 1280 or 375, the sign of something escaping its column
 *   - an axe-core violation at either width, in either theme: WCAG 2.1 A and AA
 *     (colour contrast above all, which is law 09 as rendered), plus the
 *     structural best practices, content outside a landmark, a page without a
 *     main or an h1, a heading that skips a level, a landmark named twice
 *
 * It also writes a top-of-page screenshot per route at each width, and tiles
 * them into two contact sheets when ffmpeg is on the machine, so a layout that
 * broke without erroring can be seen at a glance.
 *
 * Usage, after `npm run build`:
 *
 *   npm run site:sweep                 starts `next start` on 7871, sweeps, stops it
 *   npm run site:sweep -- --base URL   sweeps a server that is already running
 *
 * Options: --port 7871, --out .next/sweep, --routes /a,/b (instead of the
 * manifest), --no-shots, --no-axe. Needs Node 22 (global WebSocket) and a
 * Chrome; set CHROME to point at one that is not in the usual place.
 *
 * The one thing axe is not asked about is text under aria-hidden: the Trickle
 * kit's echo effect paints fading copies of a word over the word itself, and
 * the copies are hidden from a reader on purpose. Nothing else is excluded;
 * a violation is fixed at its source, not allowlisted here.
 */
import { spawn, execSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(new URL('..', import.meta.url).pathname)
const args = process.argv.slice(2)
const opt = (name, dflt) => { const i = args.indexOf(name); return i === -1 ? dflt : args[i + 1] }
const flag = (name) => args.includes(name)
const port = Number(opt('--port', 7871))
const base = (opt('--base', null) || `http://localhost:${port}`).replace(/\/$/, '')
const out = resolve(ROOT, opt('--out', '.next/sweep'))
const shots = !flag('--no-shots')
const axe = !flag('--no-axe')
const axeSrc = axe ? readFileSync(join(ROOT, 'node_modules/axe-core/axe.min.js'), 'utf8') : ''
const bold = (s) => `\x1b[1m${s}\x1b[0m`
const dim = (s) => `\x1b[2m${s}\x1b[0m`

// ── Routes: what the build prerendered, minus the files that are not pages ──
function routesFromManifest() {
  const p = join(ROOT, '.next/prerender-manifest.json')
  if (!existsSync(p)) throw new Error('no .next/prerender-manifest.json: run `npm run build` first')
  const m = JSON.parse(readFileSync(p, 'utf8'))
  return Object.keys(m.routes)
    .filter((r) => r !== '/_not-found' && !/\.[a-z0-9]+$/i.test(r))
    .sort()
}
const routes = opt('--routes', null) ? opt('--routes').split(',').map((s) => s.trim()).filter(Boolean) : routesFromManifest()

// ── A server, if asked for one ─────────────────────────────────────────────
let server = null
if (!opt('--base', null)) {
  server = spawn('npx', ['next', 'start', '-p', String(port)], { cwd: ROOT, stdio: 'ignore' })
}
const stopServer = () => { if (server) { server.kill(); server = null } }
process.on('exit', stopServer)
for (let i = 0; i < 60; i++) {
  try { const r = await fetch(base + '/', { signal: AbortSignal.timeout(5000) }); if (r.ok) break } catch {}
  await new Promise((r) => setTimeout(r, 1000))
  if (i === 59) { stopServer(); throw new Error(`nothing answering at ${base}`) }
}

// ── Chrome over the DevTools protocol ──────────────────────────────────────
const CHROME = process.env.CHROME
  || ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(existsSync)
if (!CHROME) { stopServer(); throw new Error('no Chrome found: set CHROME to the binary') }
const dp = 9222 + Math.floor(Math.random() * 500)
const chrome = spawn(CHROME, [
  `--remote-debugging-port=${dp}`, '--headless=new', '--no-first-run', '--use-gl=angle', '--use-angle=swiftshader',
  ...(process.platform === 'linux' ? ['--no-sandbox'] : []), `--user-data-dir=${join(out, 'chrome-profile')}`,
], { stdio: 'ignore' })
process.on('exit', () => chrome.kill())
mkdirSync(out, { recursive: true })
let ver
for (let i = 0; i < 80; i++) { try { ver = await fetch(`http://127.0.0.1:${dp}/json/version`).then((r) => r.json()); break } catch { await new Promise((r) => setTimeout(r, 250)) } }
if (!ver) throw new Error('Chrome did not open its debugging port')
const bws = new WebSocket(ver.webSocketDebuggerUrl); await new Promise((r) => (bws.onopen = r))
let bid = 0; const bpend = new Map()
const bsend = (m, p = {}) => new Promise((res) => { const i = ++bid; bpend.set(i, res); bws.send(JSON.stringify({ id: i, method: m, params: p })) })
bws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && bpend.has(m.id)) { bpend.get(m.id)(m.result); bpend.delete(m.id) } }
// The default target is 1×1; a page target with a size is the only way to get a real viewport.
const { targetId } = await bsend('Target.createTarget', { url: 'about:blank', width: 1280, height: 900, newWindow: true })
const list = await fetch(`http://127.0.0.1:${dp}/json/list`).then((r) => r.json())
const ws = new WebSocket(list.find((t) => t.id === targetId).webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r))
let id = 0; const pend = new Map(); const events = []
const send = (m, p = {}, ms = 25000) => Promise.race([
  new Promise((res) => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method: m, params: p })) }),
  new Promise((_, rej) => setTimeout(() => rej(new Error(m + ' timed out')), ms)),
])
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result); pend.delete(m.id) } else if (m.method) events.push(m) }
await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable'); await send('Log.enable')
/*
 * The audit runs under reduced motion. Every loop on the site honours it (law
 * 05) and so do the Trickle kit's effects, so the page axe reads is the one a
 * reader who asked for stillness gets: a glitch loop that flashes clipped
 * copies of a word in and out is otherwise a different page on every sample.
 */
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
const js = async (expression, ms = 10000) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, ms)).result?.value
const viewport = (width, height, mobile) => send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile })
const nameOf = (r) => (r === '/' ? 'home' : r.replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-'))

// ── Accessibility, through axe ─────────────────────────────────────────────
const AXE_RUN = `(async () => {
  const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']
  const a = await axe.run(document, { runOnly: { type: 'tag', values: tags }, rules: { 'color-contrast': { enabled: false } }, resultTypes: ['violations'] })
  const b = await axe.run({ exclude: [['[aria-hidden="true"]']] }, { runOnly: { type: 'rule', values: ['color-contrast'] }, resultTypes: ['violations'] })
  return [...a.violations, ...b.violations].map((v) => ({
    id: v.id, impact: v.impact, count: v.nodes.length,
    nodes: v.nodes.slice(0, 3).map((n) => ({ target: n.target.join(' ').slice(0, 90), html: n.html.replace(/\\s+/g, ' ').slice(0, 120), data: (n.any[0] && n.any[0].data) || null })),
  }))
})()`
/**
 * A theme is a load, not a toggle. next-themes reads localStorage in an inline
 * script during parsing, so setting it before navigation makes the first
 * paint the theme under test; and a prototype that reads the theme once at
 * mount, the way the BodyLog v1 page does, only ever agrees with the tokens
 * on a page that loaded in that theme. Toggling the class after the fact
 * audited a hybrid nobody sees.
 */
let themeScript = null
async function setTheme(theme) {
  if (themeScript) await send('Page.removeScriptToEvaluateOnNewDocument', { identifier: themeScript })
  ;({ identifier: themeScript } = await send('Page.addScriptToEvaluateOnNewDocument', { source: `try { localStorage.setItem('theme', '${theme}') } catch {}` }))
}

// ── The sweep ──────────────────────────────────────────────────────────────
const report = []
console.log(`\n${bold('site sweep')} ${dim(base)} ${dim(`${routes.length} routes`)}\n`)
for (const route of routes) {
  const row = { route, status: null, errors: [], warnings: [], failed: [], overflow: { 1280: null, 375: null }, a11y: {} }
  events.length = 0
  /*
   * Each width and each theme is its own load. Resizing a loaded page down to
   * a phone is not what a phone does: a prototype that measured itself at
   * 1280 keeps that layout across the resize, and what axe then reads is a
   * desktop page bent into a narrow viewport rather than the page a phone
   * gets. The status, the overflow and the screenshot come from the light
   * load at each width; axe runs on all four.
   */
  for (const [w, h, mobile] of [[1280, 900, false], [375, 812, true]]) {
    await viewport(w, h, mobile)
    for (const theme of axe ? ['light', 'dark'] : ['light']) {
      await setTheme(theme)
      try { await send('Page.navigate', { url: base + route }) } catch (e) { row.errors.push(`navigate@${w}/${theme}: ` + e.message) }
      await new Promise((r) => setTimeout(r, 3000))
      if (theme === 'light') {
        if (w === 1280) { try { row.status = await js(`(performance.getEntriesByType('navigation')[0] || {}).responseStatus ?? null`) } catch (e) { row.errors.push('evaluate: ' + e.message) } }
        try { row.overflow[w] = await js('document.documentElement.scrollWidth - window.innerWidth') } catch (e) { row.errors.push(`overflow@${w}: ` + e.message) }
        if (shots) {
          try { const { data } = await send('Page.captureScreenshot', { format: 'png' }, 20000); writeFileSync(join(out, `${nameOf(route)}-${w}.png`), Buffer.from(data, 'base64')) }
          catch (e) { row.errors.push(`screenshot@${w}: ` + e.message) }
        }
      }
      if (axe && !row.errors.length) {
        try {
          // Reveal everything once: a block that fades in as it is scrolled to is invisible to axe until it has been.
          await js(`(async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y <= h; y += 700) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 30)) } window.scrollTo({ top: 0, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 300)); return true })()`, 60000)
          await send('Runtime.evaluate', { expression: axeSrc }, 20000)
          const ok = await js(`document.documentElement.classList.contains('dark') === ${theme === 'dark'}`)
          if (!ok) throw new Error(`the page did not load in the ${theme} theme`)
          row.a11y[w] ??= {}
          row.a11y[w][theme] = await js(AXE_RUN, 90000)
        } catch (e) { row.errors.push(`axe@${w}/${theme}: ` + e.message) }
      }
    }
  }
  const a11yCount = Object.values(row.a11y).flatMap((t) => Object.values(t)).flat().reduce((n, v) => n + v.count, 0)
  for (const ev of events) {
    const p = ev.params
    if (ev.method === 'Runtime.exceptionThrown') row.errors.push('exception: ' + (p.exceptionDetails.exception?.description || p.exceptionDetails.text).split('\n')[0].slice(0, 200))
    if (ev.method === 'Runtime.consoleAPICalled' && p.type === 'error') row.errors.push('console.error: ' + p.args.map((a) => a.value ?? a.description ?? '').join(' ').split('\n')[0].slice(0, 200))
    if (ev.method === 'Runtime.consoleAPICalled' && p.type === 'warning') row.warnings.push(p.args.map((a) => a.value ?? a.description ?? '').join(' ').split('\n')[0].slice(0, 200))
    if (ev.method === 'Log.entryAdded' && p.entry.level === 'error') row.errors.push('log: ' + p.entry.text.slice(0, 200))
    if (ev.method === 'Network.responseReceived' && p.response.status >= 400) row.failed.push(`${p.response.status} ${p.response.url.replace(base, '').slice(0, 120)}`)
    if (ev.method === 'Network.loadingFailed' && !p.canceled) row.failed.push(`failed ${p.errorText || ''} ${p.type || ''}`.trim())
  }
  row.ok = row.status === 200 && !row.errors.length && !row.failed.length && !(row.overflow[1280] > 0) && !(row.overflow[375] > 0) && a11yCount === 0
  const mark = row.ok ? '\x1b[32mok\x1b[0m' : '\x1b[31mFAIL\x1b[0m'
  console.log(`  ${mark}  ${route.padEnd(52)} ${dim(`${row.status}  overflow ${row.overflow[1280]}/${row.overflow[375]}  errors ${row.errors.length}  failed ${row.failed.length}  warnings ${row.warnings.length}${axe ? `  a11y ${a11yCount}` : ''}`)}`)
  for (const l of [...row.errors, ...row.failed]) console.log(`         ${dim(l)}`)
  for (const [w, themes] of Object.entries(row.a11y))
    for (const [theme, violations] of Object.entries(themes))
      for (const v of violations) {
        console.log(`         ${dim(`${w} ${theme}`)} ${v.id} ×${v.count}`)
        for (const n of v.nodes) console.log(`           ${dim(n.html)}${n.data && n.data.contrastRatio ? dim(`  ${n.data.contrastRatio}:1 of ${n.data.expectedContrastRatio}`) : ''}`)
      }
  report.push(row)
}
writeFileSync(join(out, 'report.json'), JSON.stringify(report, null, 2))
chrome.kill(); stopServer()

// ── Contact sheets, when ffmpeg is here ────────────────────────────────────
if (shots) {
  let ffmpeg = null
  try { ffmpeg = execSync('command -v ffmpeg || ls /opt/homebrew/bin/ffmpeg', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim().split('\n')[0] } catch {}
  if (ffmpeg) {
    const n = routes.length
    for (const [w, tw, th, cols] of [[1280, 320, 225, 6], [375, 150, 325, 11]]) {
      const rows = Math.ceil(n / cols)
      execSync(`"${ffmpeg}" -loglevel error -y -pattern_type glob -i '${join(out, `*-${w}.png`)}' -vf "scale=${tw}:${th},tile=${cols}x${rows}:padding=4:margin=4:color=0x444444" "${join(out, `sheet-${w}.png`)}"`)
    }
    console.log(`\n  Contact sheets: ${dim(join(out, 'sheet-1280.png'))} and ${dim(join(out, 'sheet-375.png'))}`)
  } else {
    console.log(`\n  ${dim('No ffmpeg on the path, so no contact sheets; the screenshots are in')} ${dim(out)}`)
  }
}

const bad = report.filter((r) => !r.ok)
console.log(`\n  ${bad.length ? bold(`${bad.length} of ${routes.length} routes failed`) : bold(`${routes.length} routes clean`)}: 200, no console errors, no failed requests, no overflow at 1280 or 375${axe ? ', no axe violation at either width in either theme' : ''}.\n`)
process.exit(bad.length ? 1 : 0)
