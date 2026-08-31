'use client'

import { useCallback, useState, type CSSProperties, type ReactNode } from 'react'
import { HOVER_PANEL_QUERY, useCursorPanel } from './use-cursor-panel'

/**
 * Shows one of a set of pre-rendered panels under the cursor.
 *
 * The island is deliberately thin. Its whole job is: which row is the pointer
 * on, and where is the pointer. The rows themselves and the animated blurbs
 * inside the panel are both rendered on the server and handed in — `children`
 * for the list, `blurbs` for the panels — so none of that markup, and none of
 * trickle, reaches the client bundle. What ships is this file, the positioning
 * hook, and one integer of state.
 *
 * Which row is found by delegation rather than by a handler per row: a single
 * pointerover on the container walks up to the nearest `[data-blurb]`. That is
 * what keeps the rows plain server-rendered markup instead of turning every
 * link into a client component with three callbacks attached.
 *
 * Keying the panel's contents on that integer is what replays the animation.
 * trickle's reveals are CSS keyframes, which run when an element mounts and
 * never again; remounting on each new row is the restart. The panel around
 * them stays mounted so its position survives the swap and nothing jumps.
 *
 * Below the query — small screens, or no real pointer — `enabled` is false, so
 * there is no panel in the DOM and the pointer handlers return immediately.
 * Callers print the same text under the title there instead.
 */
export function HoverBlurb({
  blurbs,
  panelClassName = 'max-w-[19rem] rounded-xl border border-border bg-[var(--surface)] px-4 py-3 text-[12.5px] font-light leading-relaxed text-foreground/80 shadow-2xl shadow-black/30',
  panelStyle,
  children,
}: {
  /** One server-rendered panel body per row, in row order. */
  blurbs: ReactNode[]
  /** How the panel itself is dressed. A sentence and a record sleeve want
      different boxes; the positioning and the swap are the same. */
  panelClassName?: string
  /** Fixed dimensions, for a panel whose size is not set by its contents. */
  panelStyle?: CSSProperties
  children: ReactNode
}) {
  const [row, setRow] = useState<number | null>(null)
  const { enabled, ref, onPointerMove, onPointerLeave, pointAt } = useCursorPanel(HOVER_PANEL_QUERY)

  /** The nearest row above whatever the event landed on, if any. */
  const rowOf = (target: EventTarget | null) =>
    target instanceof Element ? target.closest('[data-blurb]') : null

  const pick = useCallback((e: { target: EventTarget | null }) => {
    const el = rowOf(e.target)
    const i = el ? Number(el.getAttribute('data-blurb')) : NaN
    // Setting the same row is a no-op in React, so pointerover firing on every
    // descendant of a link costs nothing.
    setRow(Number.isInteger(i) ? i : null)
  }, [])

  /** Focus carries no coordinates, so the panel is placed against the row. */
  const focus = useCallback(
    (e: { target: EventTarget | null }) => {
      const el = rowOf(e.target)
      if (el) pointAt(el)
      pick(e)
    },
    [pick, pointAt]
  )

  const leave = useCallback(() => {
    setRow(null)
    onPointerLeave()
  }, [onPointerLeave])

  return (
    <div
      onPointerMove={onPointerMove}
      onPointerOver={pick}
      onPointerLeave={leave}
      onFocusCapture={focus}
      onBlurCapture={leave}
    >
      {children}

      {enabled && (
        <div
          ref={ref}
          aria-hidden
          className={`pointer-events-none fixed left-0 top-0 z-50 will-change-transform transition-opacity duration-200 ease-out ${panelClassName} ${
            row === null ? 'opacity-0' : 'opacity-100'
          }`}
          style={panelStyle}
        >
          {row !== null && (
            <div key={row} className="h-full w-full">
              {blurbs[row]}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
