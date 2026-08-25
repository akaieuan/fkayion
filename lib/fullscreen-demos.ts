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


/**
 * Demo routes that keep the site header but drop the section rail.
 *
 * The rail is a reading aid for an article. /demo/ubik is not an article any
 * more: it is a product page, cards and recordings at full width, and a table
 * of contents pinned beside it makes it read as documentation about a product
 * rather than as the product. It is the one page where the chrome is the point.
 */
export const RAILLESS_DEMOS = ['/demo/ubik'] as const

export function hidesRail(pathname: string | null | undefined) {
  return Boolean(pathname && RAILLESS_DEMOS.some((p) => pathname === p))
}
