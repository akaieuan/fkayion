/**
 * Demo routes that are applications, not articles.
 *
 * These render their own full-bleed chrome — a sidebar, a toolbar, their own
 * way back — and fill the viewport. The site header and the demo rail both sit
 * out on them, because anything fixed to the top-left lands on top of the
 * demo's own UI.
 *
 * Everything else under /demo is a write-up: a centred article that wants the
 * header and the section rail.
 */
export const FULLSCREEN_DEMOS = [
  '/demo/research-os',
  '/demo/music-analysis-chat',
  '/demo/hitl-ai',
  '/demo/bodylog/v1',
] as const

export function isFullscreenDemo(pathname: string | null | undefined) {
  return Boolean(pathname && FULLSCREEN_DEMOS.some((p) => pathname.startsWith(p)))
}
