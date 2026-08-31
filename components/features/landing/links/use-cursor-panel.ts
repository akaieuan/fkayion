'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * A floating panel that follows the pointer.
 *
 * The music list opens a record's artwork under the cursor and the writing list
 * opens a sentence about the piece; the placement problem is the same both
 * times, so it is solved once here.
 *
 * The panel eases toward the pointer rather than being pinned to it. Pinned, it
 * snapped from row to row and read as five separate popups; easing makes it one
 * object that follows you down the list. The easing is done by interpolating
 * position in the frame loop rather than by a CSS transition on transform,
 * because a transition restarts from wherever it was on every single pointer
 * event and turns a smooth follow into a stutter.
 *
 * Nothing about the position goes through React. A pointermove fires far more
 * often than a frame, and re-rendering a list on each one would cost more than
 * the animation is worth; the only thing that belongs in state is which row is
 * showing. The loop parks itself once it has caught up, so a still cursor is
 * not holding a frame callback open, and reads happen before writes inside the
 * frame so the follow never forces a synchronous layout.
 *
 * The panel measures itself rather than being told its size, so a fixed square
 * of artwork and a sentence that wraps to three lines both stay on screen.
 *
 * `enabled` is the whole point of the hook's shape. Where the query does not
 * match, the caller renders no panel and attaches no listener: on a phone there
 * is no hover to speak of, `:hover` latches after a tap, and there is nowhere
 * sensible to put a floating panel anyway.
 */

/** Clear of the cursor, and clear of the edge of the screen. */
const GAP = 28
const EDGE = 14
/** Fraction of the remaining distance closed each frame. */
const EASE = 0.2
/** Close enough to stop animating and wait for the next move. */
const SETTLED = 0.4

export function useCursorPanel(query: string) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const target = useRef({ x: 0, y: 0 })
  const at = useRef<{ x: number; y: number } | null>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const sync = () => setEnabled(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [query])

  const stop = useCallback(() => {
    if (frame.current) cancelAnimationFrame(frame.current)
    frame.current = 0
  }, [])

  const tick = useCallback(() => {
    const el = ref.current
    if (!el) {
      frame.current = 0
      return
    }

    // Read first: both of these are the panel's own box, and writing the
    // transform before reading them would invalidate the layout every frame.
    const w = el.offsetWidth
    const h = el.offsetHeight
    const { x, y } = target.current

    // Flipped to whichever side has room, so the panel never covers the row it
    // belongs to or runs off the viewport.
    const right = x + GAP
    const left = x - GAP - w
    const toX = right + w > window.innerWidth - EDGE ? left : right
    const toY = Math.min(
      Math.max(y - h / 2, EDGE),
      Math.max(window.innerHeight - h - EDGE, EDGE)
    )

    // First frame of a hover lands on the mark. Easing in from wherever the
    // panel was left last time would fly it across the screen as it fades up.
    if (!at.current) at.current = { x: toX, y: toY }

    const p = at.current
    const dx = toX - p.x
    const dy = toY - p.y
    const settled = Math.abs(dx) < SETTLED && Math.abs(dy) < SETTLED
    p.x = settled ? toX : p.x + dx * EASE
    p.y = settled ? toY : p.y + dy * EASE

    el.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0)`

    // Caught up: let the loop go and wait for the next move rather than
    // holding a frame callback open behind a still cursor.
    frame.current = settled ? 0 : requestAnimationFrame(tick)
  }, [])

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled) return
      target.current = { x: e.clientX, y: e.clientY }
      if (!frame.current) frame.current = requestAnimationFrame(tick)
    },
    [enabled, tick]
  )

  /**
   * Park the panel beside an element rather than a cursor.
   *
   * Keyboard focus has no coordinates, and without this the panel would open
   * wherever the mouse happened to be left — or at the last row someone
   * pointed at, which on a page nobody has touched is the top-left corner.
   */
  const pointAt = useCallback(
    (el: Element) => {
      if (!enabled) return
      const r = el.getBoundingClientRect()
      target.current = { x: r.right, y: r.top + r.height / 2 }
      // Placed, not flown to: there is no gesture here to follow.
      at.current = null
      if (!frame.current) frame.current = requestAnimationFrame(tick)
    },
    [enabled, tick]
  )

  /** Call when the pointer leaves the list, so the next hover starts fresh. */
  const onPointerLeave = useCallback(() => {
    stop()
    at.current = null
  }, [stop])

  useEffect(() => stop, [stop])

  return { enabled, ref, onPointerMove, onPointerLeave, pointAt }
}

/** A real pointer, and a screen with room beside the column for a panel. */
export const HOVER_PANEL_QUERY = '(min-width: 768px) and (hover: hover) and (pointer: fine)'
