'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * A floating panel that follows the pointer.
 *
 * The music list opens a record's artwork under the cursor and the writing list
 * opens a sentence about the piece; the placement problem is the same both
 * times, so it is solved once here.
 *
 * Position is written straight to the element inside a rAF rather than held in
 * state. A pointermove fires far more often than a frame, and putting the
 * coordinates through React would re-render the whole list on every one of
 * them. The only thing that belongs in state is which row is showing.
 *
 * The panel measures itself rather than being told its size, so a fixed square
 * of artwork and a paragraph that wraps to three lines both stay on screen. The
 * read happens before the write inside the same frame, so the move never forces
 * a synchronous layout.
 *
 * `enabled` is the whole point of the hook's shape. Where the query does not
 * match, the caller renders no panel and attaches no listener: on a phone there
 * is no hover to speak of, `:hover` latches after a tap, and there is nowhere
 * sensible to put a floating panel anyway.
 */

/** Clear of the cursor, and clear of the edge of the screen. */
const GAP = 28
const EDGE = 14

export function useCursorPanel(query: string) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const point = useRef({ x: 0, y: 0 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const sync = () => setEnabled(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [query])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled) return
      point.current = { x: e.clientX, y: e.clientY }
      if (frame.current) return
      frame.current = requestAnimationFrame(() => {
        frame.current = 0
        const el = ref.current
        if (!el) return
        const { x, y } = point.current
        const w = el.offsetWidth
        const h = el.offsetHeight
        // Flipped to whichever side has room, so the panel never covers the row
        // it belongs to or runs off the viewport.
        const right = x + GAP
        const left = x - GAP - w
        const useLeft = right + w > window.innerWidth - EDGE
        const top = Math.min(
          Math.max(y - h / 2, EDGE),
          Math.max(window.innerHeight - h - EDGE, EDGE)
        )
        el.style.transform = `translate3d(${useLeft ? left : right}px, ${top}px, 0)`
      })
    },
    [enabled]
  )

  return { enabled, ref, onPointerMove }
}

/** A real pointer, and a screen with room beside the column for a panel. */
export const HOVER_PANEL_QUERY = '(min-width: 768px) and (hover: hover) and (pointer: fine)'
