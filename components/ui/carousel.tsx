'use client'

import { Children, useEffect, useRef, type KeyboardEvent, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

/**
 * A carousel: one slide at a time, in a strip the page's own scroll drives.
 *
 * ── What ships to the browser ───────────────────────────────────────────────
 *
 * This file, and nothing else. The slides arrive as children the server has
 * already rendered (`CarouselSlide`, a server component beside this one), so a
 * carousel of ten screenshots ships ten image tags and none of their
 * rendering. The same arrangement the deck and `Reveal` use.
 *
 * ── Why the scroll is not hijacked ──────────────────────────────────────────
 *
 * The track is an ordinary horizontal scroll container with CSS scroll-snap.
 * Touch, trackpad and the keyboard already know how to move it, and a reader
 * who drags the strip gets the browser's own momentum. The two buttons are for
 * a mouse: each one scrolls the track by exactly one slide. Nothing here calls
 * preventDefault on a scroll.
 *
 * ── Why there is no state ───────────────────────────────────────────────────
 *
 * Which slide is current is a fact about the track's scroll position, so it is
 * read from there and written back to the DOM: a `data-current` attribute on
 * the slide and the counter's text. React is never told, per law 08. There is
 * no requestAnimationFrame either: the scroll listener is passive and does one
 * division, so law 05 has nothing to gate.
 *
 * Reduced motion is honoured: the buttons jump instead of gliding, and the
 * track's own smooth scrolling is off in the stylesheet under the same query.
 */
export function Carousel({
  label,
  children,
  className,
}: {
  /** What the strip is a strip of, for the region's name and the counter. */
  label: string
  /** `CarouselSlide`s, rendered on the server. */
  children: ReactNode
  className?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const total = Children.count(children)

  useEffect(() => {
    const track = trackRef.current
    const count = countRef.current
    if (!track || !count) return

    const slides = Array.from(track.querySelectorAll<HTMLElement>('[data-slide]'))
    let last = -1

    /** Which slide is under the viewport, from where the track has scrolled to. */
    function update() {
      const width = track!.clientWidth || 1
      const i = Math.min(slides.length - 1, Math.max(0, Math.round(track!.scrollLeft / width)))
      if (i === last) return
      last = i
      count!.textContent = `${i + 1} / ${slides.length}`
      for (let k = 0; k < slides.length; k++) slides[k].toggleAttribute('data-current', k === i)
    }

    update()
    track.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(track)
    return () => {
      track.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [])

  /** Move by whole slides; the snap points land the track on one. */
  function step(dir: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: dir * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' })
  }

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      step(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      step(-1)
    }
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={`aka-carousel ${className ?? ''}`}
    >
      <div ref={trackRef} tabIndex={0} onKeyDown={onKey} className="aka-carousel-track">
        {children}
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <span ref={countRef} aria-live="polite" className="font-mono text-11 text-muted-foreground/75">
          {`1 / ${total}`}
        </span>
        {/* The segmented control's frame, so two icon buttons read as one control. */}
        <div className="aka-card inline-flex items-center gap-0.5 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label={`Previous, ${label}`}
            className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label={`Next, ${label}`}
            className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  )
}
