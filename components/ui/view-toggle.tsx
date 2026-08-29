'use client'

import { useEffect, useState } from 'react'
import { GalleryHorizontal, LayoutGrid } from 'lucide-react'

/**
 * Deck or grid, for the same eighteen projects.
 *
 * ── Why this only writes an attribute ───────────────────────────────────────
 *
 * Both views are server-rendered and both are in the page. Switching flips one
 * `data-view` attribute on their shared container and CSS hides the other, so
 * nothing remounts, no image is fetched twice (the URLs are identical, so the
 * second view paints out of cache), and neither tree has to become client code
 * to be toggled.
 *
 * The alternative — lifting a `view` state up and passing it down — would make
 * the page a client component and drag all eighteen plates across the boundary
 * with it. The attribute is the state; this component just owns the buttons.
 *
 * ── Why the tooltips are CSS ────────────────────────────────────────────────
 *
 * The obvious move is the Radix tooltip already in components/ui. It is a good
 * component and it is thirty-odd kilobytes of JavaScript, imported nowhere else
 * on this site, to explain two buttons on a page built specifically to not ship
 * JavaScript. `aria-label` is the accessible name either way; the visible hint
 * is a span and two CSS rules. See `.aka-hint`.
 *
 * ── Why the stored choice is read in an effect ──────────────────────────────
 *
 * The server has no localStorage, so reading it during render would produce
 * markup that disagrees with the server's and React would throw a hydration
 * mismatch. The server always renders the deck; a stored preference for the
 * grid is applied one frame later, which is the only correct order available.
 */
const KEY = 'demo-view'

export type View = 'deck' | 'grid'

const OPTIONS = [
  /*
   * The hint is what the button would do, so the selected one has nothing to
   * offer: "See all of them at once" beside the view you are already in reads
   * as a control that is not working.
   */
  { v: 'deck', Icon: GalleryHorizontal, label: 'Deck', hint: 'Scroll through the covers' },
  { v: 'grid', Icon: LayoutGrid, label: 'Grid', hint: 'See all of them at once' },
] as const

export function ViewToggle({ target }: { target: string }) {
  const [view, setView] = useState<View>('deck')

  // Restore. Runs once, after hydration, for the reason above.
  useEffect(() => {
    const stored = localStorage.getItem(KEY)
    if (stored === 'grid' || stored === 'deck') setView(stored)
  }, [])

  // Apply. The attribute is what the CSS reads; this is the only write.
  useEffect(() => {
    document.getElementById(target)?.setAttribute('data-view', view)
  }, [target, view])

  function choose(next: View) {
    setView(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      // Private browsing, or storage disabled. The choice simply does not
      // outlive the page, which is a smaller problem than throwing.
    }
  }

  return (
    <div
      role="group"
      aria-label="How to show the projects"
      className="aka-card inline-flex shrink-0 items-center gap-0.5 rounded-lg p-0.5"
    >
      {OPTIONS.map(({ v, Icon, label, hint }) => (
        <button
          key={v}
          type="button"
          aria-pressed={view === v}
          aria-label={label}
          onClick={() => choose(v)}
          /*
           * The selected state is an inverted fill, not the accent. Law 02
           * spends the accent once per screen, and a view switch is not what
           * it is for.
           */
          className={`aka-hint-host grid h-7 w-7 place-items-center rounded-md transition-colors ${
            view === v
              ? 'bg-foreground text-background'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon className="h-[15px] w-[15px]" aria-hidden />
          <span
            aria-hidden
            /*
             * Anchored, not centred. This group sits at the page's right edge,
             * and a hint centred on a button that close to it hangs past the
             * viewport and opens a horizontal scrollbar on the document.
             */
            className="aka-hint aka-hint-end aka-card px-2 py-1 text-[11px] font-light"
          >
            {view === v ? 'Current view' : hint}
          </span>
        </button>
      ))}
    </div>
  )
}
