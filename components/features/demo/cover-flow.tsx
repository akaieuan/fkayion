'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * The Cover Flow deck: vertical scroll, horizontal deck.
 *
 * ── What ships to the browser ───────────────────────────────────────────────
 *
 * This file, and nothing else. The covers and the captions arrive as
 * `ReactNode` props, which means React renders them on the server and hands
 * this component the finished output: eighteen plates, their images, their SVG
 * marks and their summary text all stay server-rendered, and adding a project
 * does not grow the client bundle by a byte. It is the same arrangement
 * components/ui/reveal.tsx uses, for the same reason.
 *
 * ── Why there is no state in here ───────────────────────────────────────────
 *
 * The obvious version of this keeps the deck's position in `useState` and
 * re-renders on scroll. At sixty frames a second across eighteen covers that is
 * a thousand React renders a second to move some transforms, and it is why most
 * scroll-linked components are janky.
 *
 * The position is not React's business. It is written to one CSS custom
 * property on one element, and every cover derives its own pose from that in
 * CSS. React is never told, so scrolling the entire deck costs zero renders and
 * the browser does the only work that was ever actually required.
 *
 * Two properties are written, at two different rates:
 *
 *   --flow         the fractional position, 0…n-1. Changes every frame.
 *   --flow-active  the rounded index. Changes eighteen times in total, and is
 *                  what the caption strip steps to.
 *
 * ── Why the scroll is not hijacked ──────────────────────────────────────────
 *
 * The section is tall — one step of scroll per cover — and the stage inside it
 * is `position: sticky`. The deck reads its position out of the page's own
 * scroll rather than intercepting it. Nothing calls `preventDefault`, so
 * momentum, touch, the scrollbar, the keyboard and find-in-page all still work,
 * and the deck can never disagree with the scrollbar about where you are.
 */
export function CoverFlow({
  count,
  covers,
  caption,
}: {
  count: number
  /** The `<ol>` of covers, rendered on the server. */
  covers: ReactNode
  /** The caption strip, rendered on the server. Presentational; see the page. */
  caption: ReactNode
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    if (!section || !stage || count < 2) return

    // The deck has no honest reduced-motion form, so CSS falls back to the
    // grid and there is nothing here left to run.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-flow-card]'))

    /** Measured on mount and on resize, never per frame. */
    let band = 0
    let pinTop = 0
    let travel = 0
    /** The last values written, so an unchanged frame writes nothing. */
    let lastFlow = -1
    let lastIndex = -1
    let frame = 0

    function measure() {
      band = stage!.offsetHeight
      pinTop = parseFloat(getComputedStyle(stage!).top) || 0
      travel = section!.getBoundingClientRect().height - band
    }

    function apply() {
      frame = 0
      // Read first, write after. Everything below this line is a style write,
      // so the layout read never lands in the middle of one.
      const top = section!.getBoundingClientRect().top
      const p = travel > 0 ? Math.min(Math.max((pinTop - top) / travel, 0), 1) : 0

      /*
       * The detent, and it is a curve rather than a scroll behaviour.
       *
       * The first version of this snapped: a scroll-snap point per cover, so
       * the browser pulled the page onto the nearest one. It worked and it felt
       * awful — you nudge the page and it yanks itself somewhere you did not
       * ask to go, which on the way into the deck also dragged the header off
       * the top of the screen.
       *
       * Nothing has to move the scroll. What was actually wanted is that you
       * never *see* a half-turned cover, and that is a property of the mapping
       * from scroll to position, not of the scroll. So the gap between two
       * covers is mostly dead: the first and last third of it hold the current
       * cover dead centre, and the deck turns over across the middle third,
       * smoothed at both ends so it starts and stops without a corner.
       *
       * Two thirds of every position you can stop at is therefore a cover,
       * landed — and the page still scrolls exactly where you put it.
       */
      const DEAD = 0.32
      const raw = p * (count - 1)
      const i = Math.min(Math.floor(raw), count - 2)
      const f = raw - i
      const t = Math.min(Math.max((f - DEAD) / (1 - 2 * DEAD), 0), 1)
      const flow = i + t * t * (3 - 2 * t)

      if (Math.abs(flow - lastFlow) > 0.0004) {
        lastFlow = flow
        section!.style.setProperty('--flow', flow.toFixed(4))
      }

      const index = Math.round(flow)
      if (index !== lastIndex) {
        cards[lastIndex]?.removeAttribute('data-active')
        cards[index]?.setAttribute('data-active', '')
        lastIndex = index
        section!.style.setProperty('--flow-active', String(index))
      }
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(apply)
    }

    /*
     * Scroll so that cover `i` is the centred one.
     *
     * Tweened by hand rather than with `behavior: 'smooth'`. Native smooth
     * scrolling is tuned for jumping to an anchor and takes its time in
     * proportion to the distance, so clicking a cover six along glided for the
     * better part of a second and felt like the page was thinking about it.
     * This is a fixed, short easing curve: the same crispness whether the cover
     * is one along or twelve.
     *
     */
    let tween = 0
    function centre(i: number) {
      const from = window.scrollY
      const to =
        from + section!.getBoundingClientRect().top - pinTop + (i / (count - 1)) * travel
      const dist = Math.abs(to - from)
      if (dist < 2) return

      if (tween) cancelAnimationFrame(tween)

      const ms = Math.min(180 + dist * 0.22, 520)
      const t0 = performance.now()
      const step = (now: number) => {
        const t = Math.min((now - t0) / ms, 1)
        // easeOutCubic: leaves immediately, arrives without a bounce.
        const e = 1 - Math.pow(1 - t, 3)
        window.scrollTo(0, from + (to - from) * e)
        if (t < 1) tween = requestAnimationFrame(step)
        else tween = 0
      }
      tween = requestAnimationFrame(step)
    }

    /*
     * Clicking an off-centre cover brings it to the centre; clicking the
     * centred one follows its link. That is what the original did, and it means
     * the deck is fully usable by someone who never scrolls it at all.
     */
    function onClick(e: MouseEvent) {
      const card = (e.target as Element | null)?.closest?.('[data-flow-card]')
      if (!card) return
      const i = Number((card as HTMLElement).dataset.flowCard)
      if (i === lastIndex) return
      e.preventDefault()
      centre(i)
    }

    /*
     * Arrows move the page rather than the deck. The scroll position is the
     * deck's only source of truth, so driving it any other way would let the
     * deck and the scrollbar disagree.
     */
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      const next = lastIndex + (e.key === 'ArrowRight' ? 1 : -1)
      if (next < 0 || next > count - 1) return
      e.preventDefault()
      centre(next)
    }

    /** Tabbing to a cover centres it, so focus is never left off screen. */
    function onFocusIn(e: FocusEvent) {
      const card = (e.target as Element | null)?.closest?.('[data-flow-card]')
      if (!card) return
      const i = Number((card as HTMLElement).dataset.flowCard)
      if (i !== lastIndex) centre(i)
    }

    /*
     * Law 05: the scroll listener only exists while the deck is on screen. A
     * page this tall spends most of its scroll somewhere else.
     */
    let listening = false
    function listen(on: boolean) {
      if (on === listening) return
      listening = on
      if (on) window.addEventListener('scroll', onScroll, { passive: true })
      else window.removeEventListener('scroll', onScroll)
    }

    const io = new IntersectionObserver(([entry]) => listen(entry.isIntersecting), {
      rootMargin: '20% 0px',
    })
    io.observe(section)

    const ro = new ResizeObserver(() => {
      measure()
      lastFlow = -1
      onScroll()
    })
    ro.observe(section)

    measure()
    apply()

    section.addEventListener('click', onClick)
    section.addEventListener('keydown', onKey)
    section.addEventListener('focusin', onFocusIn)

    return () => {
      io.disconnect()
      ro.disconnect()
      listen(false)
      if (frame) cancelAnimationFrame(frame)
      if (tween) cancelAnimationFrame(tween)
      section.removeEventListener('click', onClick)
      section.removeEventListener('keydown', onKey)
      section.removeEventListener('focusin', onFocusIn)
    }
  }, [count])

  return (
    <section
      ref={sectionRef}
      aria-label="Projects, as a deck"
      className="aka-flow-section"
      style={{ ['--flow-n' as string]: count }}
    >
      <div ref={stageRef} className="aka-flow">
        <div className="aka-flow-track">{covers}</div>

        {/*
          A mouse affordance, not a second route to the same page: the strip is
          aria-hidden, and this forwards to the centred cover's own anchor,
          which is the element that is in the accessibility tree and the tab
          order. Nothing here is reachable or announced twice.
        */}
        <div
          onClick={(e) => {
            const el = e.currentTarget.parentElement?.querySelector<HTMLElement>(
              '[data-flow-card][data-active] a',
            )
            el?.click()
          }}
          className="aka-flow-caption mx-auto mt-7 max-w-[440px] cursor-pointer px-4 text-center"
        >
          {caption}
        </div>

        {/*
          Where you are, with nothing under it. A hairline with a marker on it
          is a progress bar, and a progress bar says "a task with an end"; a
          deck is not that. The capsule says it three ways instead — where it
          sits, how long it has grown, and what colour it has turned — and all
          three come out of the same --flow the covers read.
        */}
        <div className="aka-flow-pill-track mx-auto mt-9" aria-hidden>
          <div className="aka-flow-pill" />
        </div>
      </div>
    </section>
  )
}
