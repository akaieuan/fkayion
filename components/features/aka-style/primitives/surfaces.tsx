import { Layers, LayoutGrid } from 'lucide-react'
import { Spec } from '@/components/features/aka-style/spec'
import { FlowSpecimen } from '@/components/features/aka-style/flow-specimen'
import { FLOW } from '@/lib/aka-style'

/** Surface: the two materials, the deck, the segmented control, chips, status. Moved verbatim from app/aka-style/primitives/page.tsx. */
export function SurfacesSection() {
  return (
        <section className="mt-14 space-y-3">
          <p className="aka-kicker">Surface</p>

          {/*
            The surfaces are two materials rather than four class strings.

            They used to be four: a card, a callout, a media well and a hover
            state, each written out by hand wherever it was needed, which is
            how the site ended up with several drifted copies of each. Law 03
            says depth is an edge and a fill, so taken literally there is one
            material lit from above and the same material with the light
            reversed. Everything else is which one, and how much padding.

            Padding stays on the element on purpose. A surface says what the
            material is; how much room the content needs is the content's.
          */}
          <Spec
            name="Surfaces"
            note="one material, lit from above or reversed. no drop shadow anywhere"
            cls={`card    aka-card                      ← raised: sits on the page
well    aka-card-well                 ← recessed: cut into the page
media   aka-card-well aka-card-media  ← a well with the grain off
head    aka-card-head                 ← the label band at the top of a card
rule    aka-card-rule                 ← a hairline inside one
lift    aka-card aka-card-lift        ← a card that is also a control`}
          >
            <div className="w-full space-y-3">
              <div className="aka-card overflow-hidden">
                <div className="aka-card-head px-4 py-2.5">
                  <span className="font-mono text-11 font-medium uppercase tracking-[0.16em] text-foreground/70">
                    Card
                  </span>
                </div>
                <p className="px-4 py-3.5 text-12 font-light text-muted-foreground">
                  Raised. The fill grades light-to-dark downward and the top edge is lifted, so
                  the light reads as coming from above the page.
                </p>
              </div>
              <div className="aka-card-well px-4 py-3">
                <p className="text-13 text-foreground/85">Well</p>
                <p className="mt-1 text-12 font-light text-muted-foreground">
                  The same material with the grade and the top edge inverted, which is what a cut
                  into the page looks like. Callouts, closing notes, code, media.
                </p>
              </div>
              <div className="aka-card aka-card-lift px-4 py-3">
                <p className="text-13 text-foreground/85">Lift</p>
                <p className="mt-1 text-12 font-light text-muted-foreground">
                  Hover this one. It moves 2px and its edge sharpens; it does not get brighter,
                  because law 04 applies to a card as much as to a canvas.
                </p>
              </div>
            </div>
          </Spec>

          {/*
            The overlay: the page's own ground, translucent, over a blur.

            It is what a menu panel or a floating control is drawn on, and it
            is a third material rather than a card, because a card sits on the
            page and this sits over it: whatever is underneath still shows
            through. The archive menu on /demo/ubik is the working instance,
            absolutely positioned against its button so opening it reflows
            nothing. Here it is in the flow, open, so the page can show it.
          */}
          <Spec
            name="Overlay"
            note="a menu panel: the ground, translucent, over a blur; lit at the top like a card"
            cls={`panel  aka-overlay rounded-lg p-1.5
group  px-3 pb-1 pt-2 text-10 font-medium uppercase tracking-[0.14em] text-muted-foreground/50
item   block rounded-md px-3 py-2 text-13 transition-colors hover:bg-muted/40`}
          >
            <div className="aka-overlay w-[min(22rem,100%)] rounded-lg p-1.5">
              <p className="px-3 pb-1 pt-2 text-10 font-medium uppercase tracking-[0.14em] text-muted-foreground/50">
                Rebuilt here
              </p>
              <ul className="list-none p-0">
                {[
                  ['The three-pane workspace', 'agent, source, evidence, side by side'],
                  ['Search that scores its own results', 'a rank you can argue with'],
                ].map(([title, line]) => (
                  <li key={title}>
                    <span className="block rounded-md px-3 py-2 text-13 transition-colors hover:bg-muted/40">
                      <span className="block text-foreground/85">{title}</span>
                      <span className="mt-0.5 block text-12 font-light leading-relaxed text-muted-foreground">
                        {line}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Spec>

          {/*
            The hint: a tooltip in a span and two CSS rules.

            The Radix tooltip in components/ui is thirty-odd kilobytes of
            JavaScript to explain a button, on a page built to ship none. The
            accessible name is the aria-label either way; the visible hint is
            a child span that `.aka-hint-host:hover` reveals, arriving over its
            last four pixels rather than fading, per law 04.

            A hint only shows on hover, which a page cannot demonstrate, so the
            second copy is pinned open with inline overrides: the same span,
            in the flow, at rest. Nothing else on this page carries an inline
            style, and this one exists only to make a hover state printable.
          */}
          <Spec
            name="Hint"
            note="hover or focus the button; the second copy is the same span, pinned open"
            cls={`host  aka-hint-host
hint  aka-hint aka-card px-2 py-1 text-11 font-light
end   aka-hint-end   ← anchored to the trailing edge, for a control at the page edge`}
          >
            <button
              type="button"
              aria-label="Deck view"
              className="aka-hint-host aka-card grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
            >
              <Layers className="h-[15px] w-[15px]" aria-hidden />
              <span aria-hidden className="aka-hint aka-card px-2 py-1 text-11 font-light">
                Deck view
              </span>
            </button>
            <span
              aria-hidden
              className="aka-hint aka-card px-2 py-1 text-11 font-light"
              style={{ visibility: 'visible', opacity: 1, position: 'static', transform: 'none' }}
            >
              Deck view
            </span>
          </Spec>

          {/*
            Law 08, as the smallest thing that demonstrates it. Drag the slider:
            one custom property changes and five covers re-pose, with no React
            render in between. The deck on /demo is this, with the page scroll
            in place of the slider and eighteen covers in place of five.
          */}
          <Spec
            name="Scroll-linked deck"
            note="one custom property, no state, no re-render"
            cls={FLOW.map((f) => `${f.name.padEnd(14)}${f.what}`).join('\n')}
          >
            <FlowSpecimen />
          </Spec>

          {/*
            `DemoBack` is the way back to the projects index, in the left
            margin under the wordmark, mounted once in app/demo/layout.tsx. Its
            wrapper borrows the site header's own container classes rather than
            positioning by hand, so it lines up with the logo at every
            breakpoint; `.aka-demo-back` in globals.css is what hides it on the
            index and on the full-bleed demos.
          */}
          {/*
            The segmented control. Two or three mutually exclusive views of the
            same thing, as icons rather than words, because the options are
            layouts and a picture of a layout says it faster than its name.

            The selected state is the deck's own glass. Law 02 spends the
            accent once per screen and the test is subject rather than count:
            the deck's progress pill and the control that selects the deck are
            the same subject. Each option is led from its own end of the glass
            ramp, the second one with `aka-glass-rose`, so switching changes
            the colour of the chip and not only its position. The control is
            shown twice, once in each state, because a single frame cannot
            show both a ramp end and the off dress. Every button carries
            aria-pressed and a tooltip, since an icon alone is not a label.

            `ViewToggle` on /demo is the working instance; this is the pattern.
            The covers it switches between come from `ProjectCover`, the plate
            at deck size.
          */}
          <Spec
            name="Segmented control"
            note="icons that share no silhouette, a glass end each for the selected one"
            cls={`group   aka-card inline-flex items-center gap-0.5 rounded-lg p-0.5
button  grid h-7 w-7 place-items-center rounded-md transition-colors
on 1st  aka-glass text-background
on 2nd  aka-glass aka-glass-rose text-background
off     text-muted-foreground hover:text-foreground
a11y    role=group + aria-label, aria-pressed per button, tooltip per button`}
          >
            <div className="flex items-center gap-3">
              <div className="aka-card inline-flex items-center gap-0.5 rounded-lg p-0.5">
                <span className="aka-glass grid h-7 w-7 place-items-center rounded-md text-background">
                  <Layers className="h-[15px] w-[15px]" aria-hidden />
                </span>
                <span className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground">
                  <LayoutGrid className="h-[15px] w-[15px]" aria-hidden />
                </span>
              </div>
              <div className="aka-card inline-flex items-center gap-0.5 rounded-lg p-0.5">
                <span className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground">
                  <Layers className="h-[15px] w-[15px]" aria-hidden />
                </span>
                <span className="aka-glass aka-glass-rose grid h-7 w-7 place-items-center rounded-md text-background">
                  <LayoutGrid className="h-[15px] w-[15px]" aria-hidden />
                </span>
              </div>
            </div>
          </Spec>

          {/*
            One row, two callers. `TagRow` is the chip row itself; `KickerTags`
            is the same row built from a write-up's middle-dot kicker string.

            It replaced the uppercase run that used to open every write-up —
            PRODUCT · DESKTOP AI RESEARCH PLATFORM · 2023–2026 — which is three
            separate facts set as one sentence in the treatment that is hardest
            to read at length. As chips they are three things again, each one
            bounded, and the projects deck and the page it links to now show the
            same row from the same component rather than two that drift.
          */}
          <Spec
            name="Chips & tags"
            note="TagRow / KickerTags · uppercase, tracked, never colored by category"
            cls={`chip   rounded-md border border-border/60 px-1.5 py-0.5 text-10 font-medium uppercase tracking-[0.12em] text-muted-foreground/70
tech   aka-card-well inline-flex items-center rounded-md px-2 py-0.5 text-11 font-medium uppercase tracking-[0.14em] text-muted-foreground`}
          >
            {['Product design', 'Open source', 'HITL AI'].map((t) => (
              <span
                key={t}
                className="rounded-md border border-border/60 px-1.5 py-0.5 text-10 font-medium uppercase tracking-[0.12em] text-muted-foreground/70"
              >
                {t}
              </span>
            ))}
            {['TypeScript', 'Next.js'].map((t) => (
              <span
                key={t}
                className="aka-card-well inline-flex items-center rounded-md px-2 py-0.5 text-11 font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </Spec>

          <Spec
            name="Status"
            note="the one place a hue other than the accent may appear"
            cls={`neutral  border-border/60 text-muted-foreground/60
active   text-primary
warn     text-status-warn
danger   text-status-danger`}
          >
            {[
              ['Shipped', 'text-primary'],
              ['In progress', 'text-status-warn'],
              ['Deprecated', 'text-status-danger'],
              ['Archived', 'text-muted-foreground/60'],
            ].map(([t, c]) => (
              <span key={t} className={`inline-flex items-center gap-1.5 text-12 font-light ${c}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {t}
              </span>
            ))}
          </Spec>
        </section>
  )
}
