'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Reveal a block once it is scrolled to.
 *
 * The plates below the fold arrive at different times: a lazy bitmap decodes
 * when it nears the viewport, and the pixel-engine marks cannot draw until they
 * hydrate. Nothing about that is slow, but you see it, because each plate lands
 * on its own and the grid assembles itself in front of you. This gives them one
 * moment to arrive in instead of several.
 *
 * ── Why it is shaped like this ──────────────────────────────────────────────
 *
 * **The children never become client code.** This is the whole point of the
 * component. `<Reveal>` is called from a server component, so React renders the
 * children on the server and hands this wrapper the finished output. What ships
 * to the browser is this file: a div, a ref and an effect. The plate, its
 * images, its SVG marks and its text stay server-rendered, and the grid's
 * client bundle does not grow when a project is added to it.
 *
 * **One observer, not one per card.** The common version of this pattern is a
 * `useIsVisible(ref)` hook that news up an IntersectionObserver inside every
 * element's effect. Twenty-two plates then means twenty-two observers, each
 * with its own callback queue. The observer here is module scope: every Reveal
 * on the page registers with the same one.
 *
 * **No state, so no re-renders.** The same common version keeps `isIntersecting`
 * in `useState` and swaps a class string, which re-renders that subtree every
 * time the element crosses the edge of the screen. Revealing is a one-way
 * visual change, so it is written straight to the DOM as a data attribute and
 * React is never told. Scrolling the whole grid past costs zero React renders.
 *
 * **One-way, and then it stops costing anything.** The element is unobserved
 * the moment it is shown. It cannot flicker back out on the way up, and the
 * observer's work is O(cards) for the life of the page rather than continuous.
 *
 * **The animation is CSS.** The attribute is the only thing JavaScript touches;
 * `[data-reveal]` in globals.css owns the timing, the distance and the reduced
 * motion rule. Both animated properties — opacity and transform — are the two
 * the compositor can handle on its own, so a row arriving costs no layout and
 * no repaint.
 *
 * **What is already on screen does not animate.** An element that fades in from
 * nothing is not painted until the fade ends, which would push the largest
 * contentful paint out by the length of the transition on the one grid that is
 * above the fold. Anything the observer finds in the first moments after mount
 * is shown outright; the animation is for what you scroll to, which is also
 * what "appear on scroll" means. No blank grid on first paint, no LCP cost.
 *
 * **It cannot hide content from something that will not run it.** The hidden
 * state lives on `data-reveal="pending"`, and the `<noscript>` block in the
 * root layout overrides it. If the script never runs, every plate is simply
 * visible.
 */

/** Shared by every Reveal on the page. Created on first use, never torn down. */
let observer: IntersectionObserver | null = null

/*
 * The first paint is not an animation. See the note above.
 *
 * Batch-based rather than time-based: the observer's first callback contains
 * exactly the elements that were already on screen when it started watching,
 * whatever the clock says. Timing it instead meant racing hydration, and on a
 * cold load hydration wins — the first row animated, which is precisely the
 * case this exists to avoid.
 */
let firstBatchDone = false

/** Cap the cascade so a tall batch does not leave the last card waiting. */
const STEP_MS = 70
const MAX_STEPS = 5

function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries, obs) => {
      // Entries arrive in the order the elements were observed, which for a
      // grid is DOM order, which is reading order. Staggering by position in
      // the batch therefore cascades along the row that just came in, without
      // the component needing to know how many columns the breakpoint has.
      const instant = !firstBatchDone
      let step = 0
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        if (!instant) {
          el.style.setProperty('--reveal-delay', `${Math.min(step, MAX_STEPS) * STEP_MS}ms`)
          step += 1
        }
        el.dataset.reveal = instant ? 'instant' : 'shown'
        obs.unobserve(el)
        // Only a batch that actually revealed something counts as the first
        // one; an empty callback must not spend it.
        firstBatchDone = true
      }
    },
    // Slightly inside the bottom edge, so a card is committed to being on
    // screen before it starts arriving rather than animating half off it.
    { rootMargin: '0px 0px -8% 0px', threshold: 0 }
  )
  return observer
}

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No observer support: show it and stop. Never leave content hidden.
    if (typeof IntersectionObserver === 'undefined') {
      el.dataset.reveal = 'instant'
      return
    }

    const obs = getObserver()
    obs.observe(el)
    return () => obs.unobserve(el)
  }, [])

  return (
    <div ref={ref} data-reveal="pending" className={className}>
      {children}
    </div>
  )
}
