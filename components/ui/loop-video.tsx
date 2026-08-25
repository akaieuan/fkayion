'use client'

import { useEffect, useRef } from 'react'

/**
 * A silent recording that plays itself while you are looking at it.
 *
 * The product cards want the old marketing-site feel: the interface moving on
 * its own, no play button to press. A bare `<video autoplay loop muted>` gets
 * that in one line and is wrong here for two reasons. Seven of them on a page
 * would start seven downloads at once — about 15 MB — whether or not the reader
 * ever scrolls that far. And browsers only sometimes suspend an autoplaying
 * video that has scrolled off, so the rest keep decoding frames nobody is
 * looking at, which on a laptop is just heat.
 *
 * So the element ships with `preload="none"` and no `autoplay`, and one shared
 * IntersectionObserver starts it on the way in and pauses it on the way out.
 * Nothing is fetched until a card is actually reached.
 *
 * It is built the same way `Reveal` is, and for the same reasons:
 *
 *   - **One observer for the page**, at module scope, rather than one per
 *     video.
 *   - **No state and no re-renders.** Play and pause are calls on the DOM node.
 *     React is never told a video started, because nothing in the tree depends
 *     on it.
 *   - **Two-way, unlike Reveal.** A reveal happens once and unobserves; this
 *     has to keep watching, because the point is to stop work when the card
 *     leaves. That is the one place the two components differ.
 *
 * `play()` rejects rather than throws when a browser declines — data saver, a
 * battery-saving mode, iOS Low Power Mode. That is a legitimate answer, so the
 * rejection is swallowed and the poster stays up. The controls are there for
 * anyone whose browser refused, and for anyone who wants to scrub.
 *
 * Reduced motion is honoured: nothing plays by itself, and the reader gets the
 * poster and a play button. A looping interface recording is exactly the
 * unrequested motion that setting is asking about.
 */

let observer: IntersectionObserver | null = null

function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLVideoElement
        if (entry.isIntersecting) {
          // Rejects if the browser declines autoplay. That is an answer, not
          // an error: leave the poster up and move on.
          void el.play().catch(() => {})
        } else if (!el.paused) {
          el.pause()
        }
      }
    },
    // A card counts as being looked at once a third of it is on screen, so a
    // video does not start while it is a sliver at the bottom edge.
    { threshold: 0.35 }
  )
  return observer
}

type LoopVideoProps = {
  /** Base path under /public, without extension. */
  src: string
  poster: string
  /** Intrinsic size, so the frame holds its shape before anything loads. */
  width: number
  height: number
  label: string
  className?: string
}

export function LoopVideo({ src, poster, width, height, label, className }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const obs = getObserver()
    obs.observe(el)
    return () => obs.unobserve(el)
  }, [])

  return (
    <video
      ref={ref}
      loop
      muted
      playsInline
      controls
      preload="none"
      poster={poster}
      aria-label={label}
      style={{ aspectRatio: `${width} / ${height}` }}
      className={className ?? 'block h-auto w-full'}
    >
      <source src={`${src}.mp4`} type="video/mp4" />
      {label}
    </video>
  )
}
