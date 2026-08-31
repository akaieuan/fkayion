'use client'

import { useEffect, useState } from 'react'
import { Layers, LayoutGrid } from 'lucide-react'

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
 * ── Why the choice is not remembered ────────────────────────────────────────
 *
 * It was, in localStorage, and the restore could only ever run after hydration:
 * the server has no localStorage, so reading it during render would produce
 * markup that disagrees with the server's. So anyone who had once chosen the
 * grid arrived at the deck and watched it flip a frame later, every visit. That
 * flip is a worse thing to see than the grid is a good thing to have
 * remembered.
 *
 * The deck is the page. It is what the design is and what the server renders;
 * the grid is the escape hatch for when you want all of them at once, which is
 * a decision you make on arrival rather than one worth carrying between visits.
 * So the page always opens on the deck and nothing flips, and this component
 * keeps no state at all beyond the attribute it writes.
 */

export type View = 'deck' | 'grid'

const OPTIONS = [
  /*
   * The hint is what the button would do, so the selected one has nothing to
   * offer: "See all of them at once" beside the view you are already in reads
   * as a control that is not working.
   */
  /*
   * Two icons that cannot be mistaken for each other at fifteen pixels. The
   * deck was a gallery frame, which is a rectangle with two slivers beside it,
   * and next to a four-square grid at this size both read as "a rectangle with
   * some smaller shapes near it". Stacked layers and a grid share no silhouette.
   */
  /*
   * Each option owns the end of the glass ramp its selected state is led from,
   * so switching changes the colour of the chip and not only its position.
   * Same material either way; see .aka-glass-rose.
   */
  { v: 'deck', Icon: Layers, label: 'Deck', hint: 'Scroll through the covers', glass: 'aka-glass' },
  {
    v: 'grid',
    Icon: LayoutGrid,
    label: 'Grid',
    hint: 'See all of them at once',
    glass: 'aka-glass aka-glass-rose',
  },
] as const

export function ViewToggle({ target }: { target: string }) {
  const [view, setView] = useState<View>('deck')

  // Apply. The attribute is what the CSS reads; this is the only write.
  useEffect(() => {
    document.getElementById(target)?.setAttribute('data-view', view)
  }, [target, view])

  return (
    <div
      role="group"
      aria-label="How to show the projects"
      className="aka-card inline-flex shrink-0 items-center gap-0.5 rounded-lg p-0.5"
    >
      {OPTIONS.map(({ v, Icon, label, hint, glass }) => (
        <button
          key={v}
          type="button"
          aria-pressed={view === v}
          aria-label={label}
          onClick={() => setView(v)}
          /*
           * The selected state is the deck's own glass, the surface the
           * progress pill is made of.
           *
           * It was a flat inverted fill, on the reasoning that law 02 spends
           * the accent once per screen. But the pill is already spending it on
           * this screen, a few inches below, to say where in the deck you are —
           * and this control says which deck you are in. The same colour for
           * the same subject is the law kept, not bent; what would break it is
           * a second, unrelated accent.
           *
           * The ink stays `text-background`, which is why that pairing survives
           * the change: the gradient is mid-toned in the light theme and light
           * in the dark one, and the page's own ground is the opposite of it
           * either way. That holds from either end of the ramp, so the grid's
           * rose-led glass takes the same ink.
           */
          className={`aka-hint-host grid h-7 w-7 place-items-center rounded-md transition-colors ${
            view === v ? `${glass} text-background` : 'text-muted-foreground hover:text-foreground'
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
