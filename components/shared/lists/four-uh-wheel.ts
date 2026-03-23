import type { WheelEvent } from 'react'

/**
 * Stops wheel events from reaching the full-page snap-scroll container while the user
 * is scrolling inside a 4UH panel. Without this, the parent `snap-mandatory` scroll
 * steals the gesture (especially on desktop where the panel had no max-height).
 */
function scrollDeltaY(e: WheelEvent<HTMLDivElement>): number {
  if (e.deltaMode === 1) return e.deltaY * 16
  if (e.deltaMode === 2) return e.deltaY * (typeof window !== 'undefined' ? window.innerHeight : 800)
  return e.deltaY
}

export function onFourUhPanelWheel(e: WheelEvent<HTMLDivElement>) {
  const el = e.currentTarget
  const { scrollTop, scrollHeight, clientHeight } = el
  // No overflow — let the page snap scroll handle it
  if (scrollHeight <= clientHeight + 2) return

  const d = scrollDeltaY(e)
  if (Math.abs(d) < Math.abs(e.deltaX) * 1.5) return

  const atTop = scrollTop <= 0
  const atBottom = scrollTop + clientHeight >= scrollHeight - 2

  if ((d < 0 && !atTop) || (d > 0 && !atBottom)) {
    e.stopPropagation()
  }
}
