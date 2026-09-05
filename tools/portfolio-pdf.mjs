#!/usr/bin/env node
/**
 * Print the portfolio.
 *
 * The portfolio is a route, /portfolio, rendered by the site's own components
 * and tokens: a stack of 1600 by 1000 sheets. This script opens that route in
 * headless Chrome and prints it, one sheet per page, to
 * public/ieuan-king-portfolio-2026.pdf. There is no second copy of anything:
 * the PDF is a print of the site.
 *
 * Usage, after `npm run build`:
 *
 *   npm run portfolio:pdf                 starts `next start` on 7871, prints, stops it
 *   npm run portfolio:pdf -- --base URL   prints from a server that is already running
 *
 * Options: --port 7871, --out public/ieuan-king-portfolio-2026.pdf. Needs Node 22
 * (global WebSocket) and a Chrome; set CHROME to point at one.
 *
 * Every wait and assert below is a way the first print came out wrong in
 * review before it was here: lazy images below the fold printing as empty
 * frames, canvases that draw on a frame that never comes when nothing scrolls,
 * a theme applied one frame after the capture, and a page one pixel too wide
 * that Chrome quietly shrank.
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

const ROOT = resolve(new URL('..', import.meta.url).pathname)
const args = process.argv.slice(2)
const opt = (name, dflt) => { const i = args.indexOf(name); return i === -1 ? dflt : args[i + 1] }
const port = Number(opt('--port', 7871))
const base = (opt('--base', null) || `http://127.0.0.1:${port}`).replace(/\/$/, '')
const out = resolve(ROOT, opt('--out', 'public/ieuan-king-portfolio-2026.pdf'))
const W = 1600, H = 1000
const bold = (s) => `\x1b[1m${s}\x1b[0m`
const dim = (s) => `\x1b[2m${s}\x1b[0m`
const fail = (msg) => { console.error(`\n  \x1b[31m${msg}\x1b[0m\n`); process.exit(1) }

// ── A server, if asked for one ─────────────────────────────────────────────
let server = null
if (!opt('--base', null)) server = spawn('npx', ['next', 'start', '-p', String(port)], { cwd: ROOT, stdio: 'ignore' })
const stopServer = () => { if (server) { server.kill(); server = null } }
process.on('exit', stopServer)
for (let i = 0; i < 60; i++) {
  try { const r = await fetch(base + '/portfolio', { signal: AbortSignal.timeout(5000) }); if (r.ok) break } catch {}
  await new Promise((r) => setTimeout(r, 1000))
  if (i === 59) fail(`nothing answering at ${base}/portfolio`)
}

// ── Chrome over the DevTools protocol ──────────────────────────────────────
const CHROME = process.env.CHROME
  || ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(existsSync)
if (!CHROME) fail('no Chrome found: set CHROME to the binary')
const dp = 9300 + Math.floor(Math.random() * 400)
const profile = join(ROOT, '.next', 'portfolio-chrome')
mkdirSync(profile, { recursive: true })
const chrome = spawn(CHROME, [
  `--remote-debugging-port=${dp}`, '--headless=new', '--no-first-run', '--use-gl=angle', '--use-angle=swiftshader',
  ...(process.platform === 'linux' ? ['--no-sandbox'] : []), `--user-data-dir=${profile}`,
], { stdio: 'ignore' })
process.on('exit', () => chrome.kill())
let ver
for (let i = 0; i < 80; i++) { try { ver = await fetch(`http://127.0.0.1:${dp}/json/version`).then((r) => r.json()); break } catch { await new Promise((r) => setTimeout(r, 250)) } }
if (!ver) fail('Chrome did not open its debugging port')
const bws = new WebSocket(ver.webSocketDebuggerUrl); await new Promise((r) => (bws.onopen = r))
let bid = 0; const bpend = new Map()
const bsend = (m, p = {}) => new Promise((res) => { const i = ++bid; bpend.set(i, res); bws.send(JSON.stringify({ id: i, method: m, params: p })) })
bws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && bpend.has(m.id)) { bpend.get(m.id)(m.result); bpend.delete(m.id) } }
// The default target is 1×1; a page target with a size is the only way to get a real viewport.
const { targetId } = await bsend('Target.createTarget', { url: 'about:blank', width: W, height: H, newWindow: true })
const list = await fetch(`http://127.0.0.1:${dp}/json/list`).then((r) => r.json())
const ws = new WebSocket(list.find((t) => t.id === targetId).webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r))
let id = 0; const pend = new Map()
const send = (m, p = {}, ms = 30000) => Promise.race([
  new Promise((res, rej) => { const i = ++id; pend.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p })) }),
  new Promise((_, rej) => setTimeout(() => rej(new Error(m + ' timed out')), ms)),
])
ws.onmessage = (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pend.has(m.id)) { const { res, rej } = pend.get(m.id); pend.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result) }
}
await send('Page.enable'); await send('Runtime.enable')
const js = async (expression, ms = 30000) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, ms)
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text)
  return r.result?.value
}

console.log(`\n${bold('portfolio')} ${dim(base + '/portfolio')}\n`)

/*
 * Before the page exists. The theme provider reads localStorage in an inline
 * script during parsing, so setting it first means the very first paint is
 * dark. Reduced motion makes every canvas engine draw its still frame rather
 * than start a loop that a page nobody scrolls would never advance.
 */
await send('Page.addScriptToEvaluateOnNewDocument', { source: "try { localStorage.setItem('theme', 'dark') } catch {}" })
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
// One device pixel per CSS pixel. At two, every filtered surface rasterises
// at four times the pixels and the first print came out at 135 MB.
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false })

await send('Page.navigate', { url: base + '/portfolio' })
await new Promise((r) => setTimeout(r, 2500))

const step = (label, ok) => console.log(`  ${ok ? '\x1b[32mok\x1b[0m' : '\x1b[31mFAIL\x1b[0m'}  ${label}`)

const dark = await js(`document.documentElement.classList.contains('dark')`)
if (!dark) await js(`document.documentElement.classList.add('dark'); document.documentElement.classList.remove('light'); true`)
step('dark theme on the root', true)

await js(`document.fonts.ready.then(() => true)`)
const fonts = await js(`[...document.fonts].every((f) => f.status === 'loaded' || f.status === 'unloaded') && document.fonts.status === 'loaded'`)
step('fonts loaded', fonts); if (!fonts) fail('a font face never loaded')

const sheets = await js(`document.querySelectorAll('.pf-page').length`)
if (!sheets) fail('no .pf-page on the route')
console.log(`  ${dim(`${sheets} sheets on the route`)}`)

// Scroll the whole document once, so anything that only exists once seen exists.
await js(`(async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y <= h; y += 800) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)) } window.scrollTo(0, 0); return true })()`, 120000)

const images = await js(`(async () => { const imgs = [...document.images]; await Promise.all(imgs.map((i) => i.decode().catch(() => {}))); return { total: imgs.length, bad: imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src) } })()`, 120000)
step(`images decoded (${images.total})`, images.bad.length === 0)
if (images.bad.length) { images.bad.forEach((s) => console.log(`         ${dim(s)}`)); fail('an image on a sheet never loaded') }

/*
 * A canvas that has never been drawn is transparent. Every mark is asked to
 * draw a still frame; this waits until each one has at least one opaque
 * pixel, so a blank disc cannot reach the PDF.
 */
const canvases = await js(`(async () => {
  const deadline = Date.now() + 20000
  let blank = []
  while (Date.now() < deadline) {
    blank = [...document.querySelectorAll('canvas')].filter((c) => {
      const ctx = c.getContext('2d'); if (!ctx) return false
      if (!c.width || !c.height) return true
      const d = ctx.getImageData(0, 0, c.width, c.height).data
      for (let i = 3; i < d.length; i += 4) if (d[i]) return false
      return true
    })
    if (!blank.length) break
    await new Promise((r) => setTimeout(r, 250))
  }
  return { total: document.querySelectorAll('canvas').length, blank: blank.length }
})()`, 60000)
step(`canvases drawn (${canvases.total})`, canvases.blank === 0)
if (canvases.blank) fail(`${canvases.blank} canvas element(s) never drew`)

// Under print media the sheets stand at full size; anything wider than the page shrinks the whole document.
await send('Emulation.setEmulatedMedia', { media: 'print', features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
await new Promise((r) => setTimeout(r, 400))
const width = await js(`document.documentElement.scrollWidth`)
step(`print width is ${W}`, width === W)
if (width !== W) fail(`the print layout is ${width}px wide; something on a sheet escapes it`)

// ── Print ──────────────────────────────────────────────────────────────────
const { stream } = await send('Page.printToPDF', {
  printBackground: true,
  preferCSSPageSize: true,
  paperWidth: W / 96,
  paperHeight: H / 96,
  marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
  scale: 1,
  displayHeaderFooter: false,
  transferMode: 'ReturnAsStream',
}, 300000)
const chunks = []
for (;;) {
  const { data, base64Encoded, eof } = await send('IO.read', { handle: stream, size: 1 << 20 }, 60000)
  chunks.push(base64Encoded ? Buffer.from(data, 'base64') : Buffer.from(data, 'latin1'))
  if (eof) break
}
await send('IO.close', { handle: stream })
const pdf = Buffer.concat(chunks)
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, pdf)
chrome.kill(); stopServer()

// ── The count, from the bytes: leaf pages and the tree's own total must both match the sheets. ──
const text = pdf.toString('latin1')
const leaves = (text.match(/\/Type\s*\/Page(?![s\w])/g) || []).length
const counted = Math.max(0, ...[...text.matchAll(/\/Count\s+(\d+)/g)].map((m) => Number(m[1])))
const size = statSync(out).size
step(`${leaves} pages in the PDF (tree says ${counted}), ${sheets} sheets on the route`, leaves === sheets && counted === sheets)
console.log(`\n  ${bold(out.replace(ROOT + '/', ''))} ${dim(`${(size / 1024 / 1024).toFixed(1)} MB`)}\n`)
if (leaves !== sheets || counted !== sheets) fail('the page count does not match the sheets: a sheet is overflowing its page or splitting')
