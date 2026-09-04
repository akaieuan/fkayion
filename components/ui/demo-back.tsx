'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

/**
 * The way back to the projects index, in the left margin, from anywhere
 * under /demo.
 *
 * ── Why this is mounted once instead of fixed twenty-one times ──────────────
 *
 * The pages' own links are correct below `lg` and stay exactly as they are:
 * in the flow, at the top of the article, inside that page's own padding
 * (written once, in DemoShell). This supplies the one placement they cannot,
 * and it is mounted in app/demo/layout.tsx, so no page has to know about it
 * and a new write-up gets it by existing.
 *
 * ── Why it lines up with the wordmark without any arithmetic ────────────────
 *
 * The wrapper is `fixed inset-x-0` with the same `max-w-site mx-auto
 * site-inset` the site header's own nav uses, so it inherits the header's
 * geometry at every breakpoint and lands directly under the logo. No magic
 * numbers, and nothing to re-tune if the container ever changes.
 *
 * ── The pill ────────────────────────────────────────────────────────────────
 *
 * At the top of a page the link rests on the page's own ground and needs
 * nothing behind it. Once the page scrolls, prose passes under it, so it
 * gains the header's arriving-glass treatment: a borderless blur pill that
 * fades in at the same threshold the header detaches at, so the two pieces
 * of fixed furniture change state together. The scroll listener writes a
 * data attribute, not React state, and the styles live under
 * `.aka-demo-back` in globals.css; the padding is always present with
 * negative margins cancelling it, so the text never moves when the pill
 * appears.
 *
 * ── Where it does not appear ────────────────────────────────────────────────
 *
 * The index itself, where a link back to Projects would be circular, and the
 * full-bleed demos, which hide the site header entirely, so there is no
 * wordmark for it to sit under. Both are handled in CSS rather than by asking
 * this component what route it is on; see `.aka-demo-back` in globals.css.
 */

/** The header detaches at this same scroll depth; see site-header.tsx. */
const SCROLL_THRESHOLD = 24

export function DemoBack() {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return
    const read = () => el.toggleAttribute('data-scrolled', window.scrollY > SCROLL_THRESHOLD)
    read()
    window.addEventListener('scroll', read, { passive: true })
    return () => window.removeEventListener('scroll', read)
  }, [])

  return (
    <div
      ref={host}
      className="aka-demo-back pointer-events-none fixed inset-x-0 top-[92px] z-30 hidden lg:block"
      /*
       * `pointer-events-none` on the full-width band, restored on the link.
       * Without it this invisible strip across the page would swallow clicks
       * meant for the article underneath it.
       */
    >
      <div className="max-w-site mx-auto site-inset">
        <Link
          href="/demo"
          className="pointer-events-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Projects
        </Link>
      </div>
    </div>
  )
}
