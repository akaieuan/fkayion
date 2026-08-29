import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Search } from 'lucide-react'
import { ProjectLogo } from '@/components/ui/project-logo'

const kicker = 'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'
const label = 'text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/50'

export const metadata = {
  title: 'Primitives — controls & surfaces | akaSTYLE',
  description:
    'Every control and surface in the system, with the class string beside it: buttons, links, cards, chips, form controls, tables, code, lists, media frames, and status. Copy-paste transferable.',
}

/**
 * A spec block: the live primitive on the left, the exact class string under it.
 * The string is the deliverable — this page exists to be copied from.
 */
function Spec({
  name,
  note,
  cls,
  children,
}: {
  name: string
  note?: string
  cls?: string
  children: React.ReactNode
}) {
  return (
    <div className="aka-card p-5">
      <div className="flex items-baseline justify-between gap-4">
        <p className={label}>{name}</p>
        {note && <p className="text-[10.5px] font-light text-muted-foreground/50">{note}</p>}
      </div>
      <div className="mt-3.5 flex flex-wrap items-center gap-3">{children}</div>
      {cls && (
        <pre className="mt-4 overflow-x-auto aka-card-well rounded-lg px-3 py-2 font-mono text-[10.5px] leading-relaxed text-muted-foreground/75">
          {cls}
        </pre>
      )}
    </div>
  )
}

export default function PrimitivesPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/aka-style"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          akaSTYLE
        </Link>

        <header className="mb-10">
          <p className={kicker}>Library · Primitives</p>
          <h1 className="mt-2 text-[clamp(1.7rem,5vw,2.4rem)] font-extralight leading-none tracking-tight text-foreground/90">
            Controls &amp; surfaces
          </h1>
          <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
            The whole vocabulary, with the class string printed beside each piece. Everything here is
            server-rendered — no control on this page needs client JavaScript to look right. Copy the
            string, keep the tokens, and the primitive lands correctly in any repo running the same
            four variables.
          </p>
        </header>

        {/* BUTTONS */}
        <section className="space-y-3">
          <p className={kicker}>Action</p>

          <Spec
            name="Buttons"
            note="one primary per view"
            cls={`primary   inline-flex items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90
secondary inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40
quiet     text-[13px] font-light text-muted-foreground/70 transition-colors hover:text-foreground`}
          >
            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background">
              Primary action
              <ArrowRight className="h-4 w-4 opacity-80" aria-hidden />
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground">
              Secondary
              <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
            </span>
            <span className="text-[13px] font-light text-muted-foreground/70">Quiet link →</span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground/40">
              Disabled
            </span>
          </Spec>

          <Spec
            name="Sizes"
            note="py-1.5 / py-2.5 / py-3"
            cls={`sm  rounded-md px-3 py-1.5 text-[12px]
md  rounded-lg px-4 py-2.5 text-sm     ← default
lg  rounded-lg px-5 py-3 text-[15px]`}
          >
            {[
              ['sm', 'rounded-md px-3 py-1.5 text-[12px]'],
              ['md', 'rounded-lg px-4 py-2.5 text-sm'],
              ['lg', 'rounded-lg px-5 py-3 text-[15px]'],
            ].map(([n, c]) => (
              <span
                key={n}
                className={`inline-flex items-center border border-border bg-foreground font-medium text-background ${c}`}
              >
                Button {n}
              </span>
            ))}
          </Spec>

          <Spec
            name="Links"
            note="underline offset 3px, border-colored rule"
            cls={`body  underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50
accent text-primary underline decoration-border underline-offset-[3px]
nav    text-muted-foreground transition-colors hover:text-foreground`}
          >
            <span className="text-[13px] font-light text-muted-foreground underline decoration-border underline-offset-[3px]">
              An inline body link
            </span>
            <span className="text-[13px] font-light text-primary underline decoration-border underline-offset-[3px]">
              An accent link
            </span>
            <span className="text-[13px] font-light text-muted-foreground">Nav item</span>
          </Spec>
        </section>

        {/* SURFACES */}
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

          <Spec
            name="Chips & tags"
            note="uppercase, tracked, never colored by category"
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

        {/* CARD */}
        <section className="mt-14 space-y-3">
          <p className={kicker}>Card</p>

          <Spec
            name="Project plate"
            note="the mark at the size where it is the thing you see"
            cls={`.aka-plate  grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-xl
            background-color: color-mix(in srgb, var(--plate-tint) var(--plate-mix), var(--stamp-ground))
mark        relative block aspect-square h-[62%] overflow-hidden rounded-[16%]
.aka-mark-ground   a dark ground for art drawn light on nothing
hover       .group:hover .aka-plate { transform: translateY(-3px) }

This replaced a card that surrounded a 26px mark with a border, a description,
four tags and an arrow, which made the cleanest element on it also the smallest.
The chrome went and the mark took the space.

The plate is landscape and the mark inside it is square, because every mark is.
The inset is sized off the plate's height for that reason: taking it off the
width would grow the mark by a third the moment the plate stopped being square.

Art that carries its own ground fills the inset frame; a bare glyph shows the
tint through it; a screenshot is the one exception and takes the whole plate,
because cropping a picture of the work into a small square in the middle of a
large plate reads as a thumbnail of a thumbnail.`}
          >
            <p className="text-[12px] font-light text-muted-foreground/70">
              Live on{' '}
              <Link href="/demo" className="text-foreground underline underline-offset-2">
                /demo
              </Link>{' '}
              and the landing grid. Server-rendered; the hover is CSS.
            </p>
          </Spec>

          <Spec
            name="Reading ink"
            note="the two steps that carry long-form text"
            cls={`.aka-ink-body   color-mix(in srgb, var(--foreground) 82%, transparent)
.aka-ink-quiet  color-mix(in srgb, var(--foreground) 62%, transparent)

Classes, not utilities, because /nn does not compile against a bare var() token
on Tailwind v3. See foundations.`}
          >
            <div className="w-full space-y-1.5">
              <p className="aka-ink-body text-[13px] font-light leading-relaxed">
                Body ink. What an essay is set in.
              </p>
              <p className="aka-ink-quiet text-[13px] font-light leading-relaxed">
                Quiet ink. A caption, a date, an aside.
              </p>
            </div>
          </Spec>

          <Spec
            name="Reveal"
            note="scroll-driven, no JavaScript"
            cls={`.aka-rise   animation-timeline: view(); animation-range: …; animation-duration: auto

Longhands only. The \`animation\` shorthand resets animation-timeline to auto and
the reveal silently becomes a one-shot on load.

This replaced an IntersectionObserver that existed to fade in one paragraph and
forced the whole landing section — every plate, every link — to be a client
component in order to hold its one boolean.`}
          >
            <p className="text-[12px] font-light text-muted-foreground/70">
              Live on the landing&apos;s writing and music lists.
            </p>
          </Spec>
        </section>

        {/* FORM */}
        <section className="mt-14 space-y-3">
          <p className={kicker}>Input</p>

          <Spec
            name="Text fields"
            note="label above, hint below, never placeholder-as-label"
            cls={`label  text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/60
input  w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/40 focus:border-foreground/30 focus:outline-none
hint   mt-1.5 text-[11px] font-light text-muted-foreground/60`}
          >
            <div className="w-full max-w-sm space-y-4">
              <div>
                <p className={label}>Email</p>
                <div className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-muted-foreground/40">
                  you@example.com
                </div>
                <p className="mt-1.5 text-[11px] font-light text-muted-foreground/60">
                  We reply within 48h.
                </p>
              </div>
              <div>
                <p className={label}>Message</p>
                <div className="mt-1.5 h-20 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-muted-foreground/40">
                  Tell us about the project…
                </div>
              </div>
              <div>
                <p className={label}>Search</p>
                <div className="mt-1.5 flex w-full items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
                  <Search className="h-3.5 w-3.5 text-muted-foreground/40" aria-hidden />
                  <span className="text-[13px] text-muted-foreground/40">Filter projects…</span>
                </div>
              </div>
            </div>
          </Spec>

          <Spec
            name="Choice"
            note="square = many, round = one"
            cls={`box     h-4 w-4 rounded border border-border bg-background
checked h-4 w-4 rounded border border-foreground/40 bg-foreground text-background
radio   h-4 w-4 rounded-full border border-border
toggle  h-5 w-9 rounded-full border border-border bg-muted/40 → bg-foreground when on`}
          >
            <div className="w-full space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-4 w-4 items-center justify-center rounded border border-foreground/40 bg-foreground">
                  <Check className="h-3 w-3 text-background" aria-hidden />
                </span>
                <span className="text-[13px] font-light text-foreground/85">Checked option</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="h-4 w-4 rounded border border-border bg-background" />
                <span className="text-[13px] font-light text-muted-foreground">Unchecked option</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-foreground/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                </span>
                <span className="text-[13px] font-light text-foreground/85">Selected radio</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-5 w-9 items-center rounded-full border border-border bg-foreground px-0.5">
                  <span className="ml-auto h-3.5 w-3.5 rounded-full bg-background" />
                </span>
                <span className="text-[13px] font-light text-foreground/85">Toggle on</span>
              </div>
            </div>
          </Spec>

          <Spec
            name="Tabs"
            note="active carries the accent; the rest stay quiet"
            cls={`active   text-primary
inactive text-muted-foreground/50 hover:text-foreground
wrapper  flex flex-wrap items-center gap-x-1 gap-y-1 -ml-2.5`}
          >
            {['projects', 'writing', 'music', 'social'].map((t, i) => (
              <span
                key={t}
                className={`px-2.5 py-1 text-[12px] font-light tracking-wide ${
                  i === 0 ? 'text-primary' : 'text-muted-foreground/50'
                }`}
              >
                {t}
              </span>
            ))}
          </Spec>
        </section>

        {/* CONTENT */}
        <section className="mt-14 space-y-3">
          <p className={kicker}>Content</p>

          <Spec
            name="Code"
            note="inline chips and blocks share the muted ground"
            cls={`inline rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]
block  aka-card-well overflow-x-auto rounded-lg p-4 font-mono text-[11px] leading-relaxed text-foreground/80`}
          >
            <div className="w-full">
              <p className="text-[13px] font-light text-muted-foreground">
                Run <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">pnpm dev</code>{' '}
                and open the app.
              </p>
              <pre className="mt-3 aka-card-well overflow-x-auto rounded-lg p-4 font-mono text-[11px] leading-relaxed text-foreground/80">
                {`npx shadcn@latest add https://www.hitlkit.dev/r/hitl-card.json
→ writes components/hitl/hitl-card.tsx`}
              </pre>
            </div>
          </Spec>

          <Spec
            name="Lists"
            note="em-dash markers, never bullets, for prose lists"
            cls={`quiet li  flex gap-3 → <span className="mt-[7px] h-1 w-1 rounded-full bg-muted-foreground/40" />
disc     list-disc space-y-2 pl-5 marker:text-muted-foreground/50
lead     <span className="text-foreground/85">Term.</span> then body`}
          >
            <ul className="w-full space-y-2.5 text-[13px] font-light leading-relaxed text-muted-foreground">
              {[
                ['Watch the work first', 'research before design'],
                ['Prototype in code', 'working surfaces over mockups'],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                  <span>
                    <span className="text-foreground/85">{t}.</span> {d}
                  </span>
                </li>
              ))}
            </ul>
          </Spec>

          <Spec
            name="Table"
            note="rules only between rows; no zebra, no vertical rules"
            cls={`head  border-b border-border + label class
row   border-b border-border/40
cell  py-2 pr-4 align-top text-[12px] font-light`}
          >
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  {['token', 'value'].map((h) => (
                    <th key={h} className={`${label} pb-2 pr-4 font-medium`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[12px] font-light text-muted-foreground">
                {[
                  ['--background', 'oklch(0.145 0.004 106)'],
                  ['--foreground', 'oklch(0.93 0.003 106)'],
                ].map(([a, b]) => (
                  <tr key={a} className="border-b border-border/40">
                    <td className="py-2 pr-4 font-mono text-[11px] text-foreground/85">{a}</td>
                    <td className="py-2 font-mono text-[11px]">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Spec>

          <Spec
            name="Media frame"
            note="every screenshot gets the same frame + caption"
            cls={`frame   aka-card-well aka-card-media overflow-hidden rounded-lg
caption mt-1.5 text-[11px] font-light text-muted-foreground/70`}
          >
            <div className="w-full max-w-sm">
              <div className="flex h-24 items-center justify-center aka-card-well aka-card-media overflow-hidden rounded-lg">
                <span className="text-[11px] font-light text-muted-foreground/40">16:10 media</span>
              </div>
              <p className="mt-1.5 text-[11px] font-light text-muted-foreground/70">
                A caption states what the frame shows, not that it is a screenshot.
              </p>
            </div>
          </Spec>

          <Spec
            name="Section header"
            note="the page rhythm — kicker, title, standfirst"
            cls={`kicker text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70
title  text-xl font-light tracking-tight text-foreground/90
stand  mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground`}
          >
            <div className="w-full">
              <p className={kicker}>Section kicker</p>
              <h3 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
                The section title
              </h3>
              <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
                A standfirst that says what this section argues, in one sentence.
              </p>
            </div>
          </Spec>
        </section>

        <section className="mt-14 aka-card-well px-5 py-4">
          <p className="text-[14px] font-light leading-relaxed text-foreground/85">
            The measurable half —{' '}
            <Link
              href="/aka-style/foundations"
              className="text-primary underline decoration-border underline-offset-[3px]"
            >
              foundations
            </Link>{' '}
            — carries the spacing scale, radii, motion timings, and breakpoints these primitives are
            built on. Take both and the system travels intact.
          </p>
        </section>
      </article>
    </div>
  )
}
