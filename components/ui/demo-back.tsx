import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

/**
 * The way back to the projects index, in the left margin, from anywhere
 * under /demo.
 *
 * ── What was broken ─────────────────────────────────────────────────────────
 *
 * Every write-up carries its own back link marked `lg:hidden`, because a
 * section rail used to occupy the left margin and carried the way back itself.
 * The rail was removed; the `lg:hidden` was not. So the largest screens became
 * the only ones with no way back to the index.
 *
 * ── Why this is mounted once instead of fixed twenty-one times ──────────────
 *
 * The pages' own links are correct below `lg` and stay exactly as they are:
 * in the flow, at the top of the article, inside that page's own padding. This
 * supplies the one placement they cannot, and it is mounted in
 * app/demo/layout.tsx, so no page has to know about it and a new write-up gets
 * it by existing.
 *
 * ── Why it lines up with the wordmark without any arithmetic ────────────────
 *
 * The wrapper is `fixed inset-x-0` with the same `max-w-site mx-auto
 * site-inset` the site header's own nav uses, so it inherits the header's
 * geometry at every breakpoint and lands directly under the logo. No magic
 * numbers, and nothing to re-tune if the container ever changes.
 *
 * ── Where it does not appear ────────────────────────────────────────────────
 *
 * The index itself, where a link back to Projects would be circular, and the
 * full-bleed demos, which hide the site header entirely, so there is no
 * wordmark for it to sit under. Both are handled in CSS rather than by asking
 * this component what route it is on: a server component cannot know that, and
 * the answer is not worth a client boundary on every page under /demo. See
 * `.aka-demo-back` in globals.css.
 */
export function DemoBack() {
  return (
    <div
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
