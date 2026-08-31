import { Layers, LayoutGrid } from 'lucide-react'
import { kicker } from '@/components/features/aka-style/shared'
import { Spec } from '@/components/features/aka-style/spec'
import { FlowSpecimen } from '@/components/features/aka-style/flow-specimen'
import { FLOW } from '@/lib/aka-style'

/** Surface: the two materials, the deck, the segmented control, chips, status. Moved verbatim from app/aka-style/primitives/page.tsx. */
export function SurfacesSection() {
  return (
        <section className="mt-14 space-y-3">
          <p className={kicker}>Surface</p>

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
                  <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-foreground/70">
                    Card
                  </span>
                </div>
                <p className="px-4 py-3.5 text-[12px] font-light text-muted-foreground">
                  Raised. The fill grades light-to-dark downward and the top edge is lifted, so
                  the light reads as coming from above the page.
                </p>
              </div>
              <div className="aka-card-well px-4 py-3">
                <p className="text-[13px] text-foreground/85">Well</p>
                <p className="mt-1 text-[12px] font-light text-muted-foreground">
                  The same material with the grade and the top edge inverted, which is what a cut
                  into the page looks like. Callouts, closing notes, code, media.
                </p>
              </div>
              <div className="aka-card aka-card-lift px-4 py-3">
                <p className="text-[13px] text-foreground/85">Lift</p>
                <p className="mt-1 text-[12px] font-light text-muted-foreground">
                  Hover this one. It moves 2px and its edge sharpens; it does not get brighter,
                  because law 04 applies to a card as much as to a canvas.
                </p>
              </div>
            </div>
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

            The selected state is an inverted fill and never the accent: law 02
            spends the accent once per screen, and a view switch is not what it
            is for. Every button carries aria-pressed and a tooltip, since an
            icon alone is not a label.

            `ViewToggle` on /demo is the working instance; this is the pattern.
            The covers it switches between come from `ProjectCover`, the plate
            at deck size.
          */}
          <Spec
            name="Segmented control"
            note="icons that share no silhouette, glass for the selected one"
            cls={`group   aka-card inline-flex items-center gap-0.5 rounded-lg p-0.5
button  grid h-7 w-7 place-items-center rounded-md transition-colors
on      aka-glass text-background
off     text-muted-foreground hover:text-foreground
a11y    role=group + aria-label, aria-pressed per button, tooltip per button`}
          >
            <div className="aka-card inline-flex items-center gap-0.5 rounded-lg p-0.5">
              <span className="aka-glass grid h-7 w-7 place-items-center rounded-md text-background">
                <Layers className="h-[15px] w-[15px]" aria-hidden />
              </span>
              <span className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground">
                <LayoutGrid className="h-[15px] w-[15px]" aria-hidden />
              </span>
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
            cls={`chip   rounded-md border border-border/60 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70
tech   aka-card-well inline-flex items-center rounded-md px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground`}
          >
            {['Product design', 'Open source', 'HITL AI'].map((t) => (
              <span
                key={t}
                className="rounded-md border border-border/60 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70"
              >
                {t}
              </span>
            ))}
            {['TypeScript', 'Next.js'].map((t) => (
              <span
                key={t}
                className="aka-card-well inline-flex items-center rounded-md px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </Spec>

          <Spec
            name="Status"
            note="the one place a hue other than the accent may appear"
            cls={`neutral  border-border/60 text-muted-foreground/70
active   text-primary
warn     text-[oklch(0.72_0.13_75)]
danger   text-[oklch(0.62_0.2_25)]`}
          >
            {[
              ['Shipped', 'text-primary'],
              ['In progress', 'text-[oklch(0.72_0.13_75)]'],
              ['Deprecated', 'text-[oklch(0.62_0.2_25)]'],
              ['Archived', 'text-muted-foreground/60'],
            ].map(([t, c]) => (
              <span key={t} className={`inline-flex items-center gap-1.5 text-[12px] font-light ${c}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {t}
              </span>
            ))}
          </Spec>
        </section>
  )
}
