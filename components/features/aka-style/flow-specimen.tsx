'use client'

import { useRef } from 'react'

/**
 * The deck's mechanism, on a slider instead of on the page scroll.
 *
 * The deck on /demo needs six screens of scrolling to demonstrate itself, which
 * is not a specimen. This is the same CSS — the same `.aka-flow-card` pose, the
 * same `--flow` — with a slider standing in for the scroll, so the page that
 * documents the system can actually show the thing it is documenting.
 *
 * It is also the smallest honest demonstration of law 08. Dragging the slider
 * writes one custom property and nothing re-renders: no state, no `onChange`
 * handler feeding React, no five cards re-rendering sixty times a second. Swap
 * the `setProperty` below for a `setState` and this file becomes the version of
 * this component that everybody writes and nobody profiles.
 */
export function FlowSpecimen({ n = 5 }: { n?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div className="w-full">
      <div
        ref={ref}
        className="aka-flow-specimen"
        style={{ ['--flow-n' as string]: n, ['--flow' as string]: (n - 1) / 2 }}
      >
        <div className="aka-flow-track">
          {Array.from({ length: n }, (_, i) => (
            <div
              key={i}
              className="aka-flow-card"
              style={{ ['--i' as string]: i }}
              aria-hidden
            >
              <span className="aka-plate grid place-items-center font-mono text-13 text-muted-foreground">
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      <label className="mt-4 block">
        <span className="sr-only">Deck position</span>
        <input
          type="range"
          min={0}
          max={n - 1}
          step={0.01}
          defaultValue={(n - 1) / 2}
          onInput={(e) => ref.current?.style.setProperty('--flow', e.currentTarget.value)}
          className="w-full accent-[var(--foreground)]"
        />
      </label>
    </div>
  )
}
