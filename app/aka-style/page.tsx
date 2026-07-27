import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, ArrowRight } from 'lucide-react'
import { PixelHead } from '@/components/features/brand/pixel-head'
import { AkaMark } from '@/components/features/brand/aka-mark'
import { PixelRoundabout } from '@/components/features/brand/pixel-roundabout'

/**
 * The library: every primitive, brand engine, and design-language rule this site
 * (and its sibling repos) is built from — rendered live, not screenshotted, so the
 * page is always telling the truth about the current system.
 */

const kicker = 'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'
const label = 'text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/50'
const code = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[11px]'
const cardCls = 'rounded-xl border border-border bg-card/40 p-5'

const sections = [
  { id: 'rules', label: 'The rules' },
  { id: 'color', label: 'Color' },
  { id: 'type', label: 'Type' },
  { id: 'primitives', label: 'Primitives' },
  { id: 'brand', label: 'Brand engines' },
  { id: 'patterns', label: 'Patterns' },
  { id: 'usage', label: 'Where it runs' },
]

/** The design language, stated as rules — the portable part of akaSTYLE. */
const laws = [
  {
    n: '01',
    rule: 'Mono for structure, sans for prose.',
    body: 'Uppercase mono kickers at 11px/0.18em tracking label every section. Body copy is font-light sans with generous leading. The contrast between the two carries the hierarchy, so headings rarely need to be big.',
  },
  {
    n: '02',
    rule: 'One accent, used sparingly.',
    body: 'Everything is greyscale on a near-black (or near-white) ground except a single quiet green. If two things on screen are competing for the accent, neither gets it.',
  },
  {
    n: '03',
    rule: 'Borders over shadows.',
    body: 'Depth comes from a 1px border and a translucent card fill, never a drop shadow. Rounded to 0.75rem for cards, 0.5rem for controls.',
  },
  {
    n: '04',
    rule: 'Motion moves space, never brightness.',
    body: 'Animation translates, scales, and displaces. It does not flash, strobe, or pulse opacity. This started as an accessibility rule for the audio-reactive work and became the house style.',
  },
  {
    n: '05',
    rule: 'Loops pause when unwatched.',
    body: 'Every canvas engine gates its RAF loop on an IntersectionObserver plus visibilitychange, and renders one still frame under prefers-reduced-motion. Ambient animation should cost nothing when nobody is looking.',
  },
  {
    n: '06',
    rule: 'Layout never jumps.',
    body: 'Tabbed regions are floored to the tallest tab at each breakpoint. Images ship with intrinsic dimensions and blur placeholders. Switching views should never move the content under a reader.',
  },
  {
    n: '07',
    rule: 'Server by default.',
    body: 'Components stay server-rendered unless they need state, an event, or a canvas. The client boundary is drawn as deep in the tree as possible — a card is a server component even when its page is interactive.',
  },
]

const swatches = [
  { name: 'background', varName: '--background', cls: 'bg-background' },
  { name: 'foreground', varName: '--foreground', cls: 'bg-foreground' },
  { name: 'card', varName: '--card', cls: 'bg-card' },
  { name: 'muted', varName: '--muted', cls: 'bg-muted' },
  { name: 'border', varName: '--border', cls: 'bg-border' },
  { name: 'primary', varName: '--primary', cls: 'bg-primary' },
]

const accents = [
  { name: 'accent-green', v: 'var(--accent-green)' },
  { name: 'accent-blue', v: 'var(--accent-blue)' },
  { name: 'accent-amber', v: 'var(--accent-amber)' },
  { name: 'accent-rose', v: 'var(--accent-rose)' },
  { name: 'accent-violet', v: 'var(--accent-violet)' },
]

const usage = [
  {
    name: 'akabuild.dev',
    what: 'This site. AkaMark hero, pixel aka wordmark, the project-card vocabulary, every write-up page.',
    href: '/',
    internal: true,
  },
  {
    name: 'circleheads.com',
    what: 'Origin of the PixelHead engine and the roundabout simulation. Same tokens, same kicker grammar, its own face set.',
    href: 'https://circleheads.com',
  },
  {
    name: 'akaoss.dev',
    what: 'The open-source studio site — same type scale and card system, with the sparkle mark as its brand variant.',
    href: 'https://www.akaoss.dev',
  },
  {
    name: 'HITL Kit',
    what: 'Fifteen human-in-the-loop React primitives, installable via the shadcn CLI. The interaction half of this language.',
    href: '/demo/hitl-kit',
    internal: true,
  },
  {
    name: 'Trickle UI Kit',
    what: '47 pure-CSS text-animation primitives — the motion rules above, packaged as zero-runtime components.',
    href: '/demo/trickle-ui-kit',
    internal: true,
  },
  {
    name: 'boxpopuli.live · akacovart.com',
    what: 'Client and studio work that borrows the dark ground, bordered cards, and mono labelling wholesale.',
    href: '/demo/box-populi',
    internal: true,
  },
]

export const metadata = {
  title: 'akaSTYLE — design language, primitives & brand engines | akaBuild',
  description:
    'akaSTYLE: the design language, component primitives, and canvas brand engines behind akabuild.dev, circleheads.com, akaoss.dev, and the kits — seven rules, a token set, and every primitive rendered live rather than screenshotted.',
}

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          akaBuild
        </Link>

        <header className="mb-8">
          <p className={kicker}>Design system · Primitives · Brand engines</p>
          <h1 className="mt-2 text-[clamp(1.7rem,5vw,2.4rem)] font-extralight leading-none tracking-tight text-foreground/90">
            aka<span className="font-mono font-normal text-primary">STYLE</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
            Everything this site is built from, rendered live on this page rather than captured as
            screenshots — so it can never drift from what actually ships. The same vocabulary runs
            across the studios, the kits, and the client work.
          </p>
        </header>

        <nav aria-label="Sections" className="mb-12 flex flex-wrap gap-1.5">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-md border border-border/60 px-2.5 py-1 text-[11px] font-light text-muted-foreground/80 transition-colors hover:border-border hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </nav>

        {/* ============ akaSTYLE ============ */}
        <section id="rules" className="scroll-mt-24">
          <p className={kicker}>The rules</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            The design language, stated as constraints
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            Seven laws that hold across every repo. They are deliberately written as constraints
            rather than preferences — a constraint can be checked in review, and it travels to a new
            codebase without me having to be in the room.
          </p>

          <ol className="mt-6 space-y-3">
            {laws.map((l) => (
              <li key={l.n} className={`${cardCls} flex gap-4`}>
                <span className="shrink-0 font-mono text-[11px] text-primary">{l.n}</span>
                <div>
                  <p className="text-[14px] font-light text-foreground/90">{l.rule}</p>
                  <p className="mt-1 text-[12.5px] font-light leading-relaxed text-muted-foreground">
                    {l.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ============ COLOR ============ */}
        <section id="color" className="mt-16 scroll-mt-24">
          <p className={kicker}>Color</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            Tokens, in OKLCH
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            Every surface resolves from a CSS variable, so light and dark are one definition rather
            than two stylesheets. Toggle the theme and this section repaints itself.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {swatches.map((sw) => (
              <div key={sw.name} className="overflow-hidden rounded-lg border border-border">
                <div className={`h-14 w-full ${sw.cls}`} />
                <div className="border-t border-border bg-card/40 px-2.5 py-2">
                  <p className="text-[11px] text-foreground/85">{sw.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground/60">{sw.varName}</p>
                </div>
              </div>
            ))}
          </div>

          <p className={`${label} mt-6`}>Accent set — carried by the canvas engines</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {accents.map((a) => (
              <div key={a.name} className="flex items-center gap-2 rounded-md border border-border/60 px-2 py-1">
                <span
                  className="h-3 w-3 rounded-full border border-border/40"
                  style={{ background: a.v }}
                />
                <span className="font-mono text-[10.5px] text-muted-foreground">{a.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ============ TYPE ============ */}
        <section id="type" className="mt-16 scroll-mt-24">
          <p className={kicker}>Type</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">The scale</h2>

          <div className={`${cardCls} mt-6 space-y-5`}>
            <div>
              <p className={label}>Kicker · 11px / 0.18em / uppercase / medium</p>
              <p className={`${kicker} mt-1.5`}>Product design · Technical anthropology</p>
            </div>
            <div className="h-px bg-border/60" />
            <div>
              <p className={label}>Display · clamp(1.7–2.4rem) / extralight / tight</p>
              <p className="mt-1.5 text-[clamp(1.7rem,5vw,2.4rem)] font-extralight leading-none tracking-tight text-foreground/90">
                I build tools and create art.
              </p>
            </div>
            <div className="h-px bg-border/60" />
            <div>
              <p className={label}>Section head · 20px / light</p>
              <p className="mt-1.5 text-xl font-light tracking-tight text-foreground/90">
                The human-in-the-loop architecture
              </p>
            </div>
            <div className="h-px bg-border/60" />
            <div>
              <p className={label}>Body · 15px / light / 1.6</p>
              <p className="mt-1.5 text-[15px] font-light leading-relaxed text-muted-foreground">
                Human control wasn&apos;t a confirmation dialog bolted on at the end — it was
                load-bearing architecture, designed in at three layers.
              </p>
            </div>
            <div className="h-px bg-border/60" />
            <div>
              <p className={label}>Caption · 11px / light / muted-70</p>
              <p className="mt-1.5 text-[11px] font-light text-muted-foreground/70">
                The three-pane workspace — agent chat, the source paper, and an evidence panel.
              </p>
            </div>
            <div className="h-px bg-border/60" />
            <div>
              <p className={label}>Mono inline · 11px on muted fill</p>
              <p className="mt-1.5 text-[13px] font-light text-muted-foreground">
                Citations resolved to <code className={code}>[noteId:page]</code> via{' '}
                <code className={code}>runciter.dispatch(event)</code>.
              </p>
            </div>
          </div>
        </section>

        {/* ============ PRIMITIVES ============ */}
        <section id="primitives" className="mt-16 scroll-mt-24">
          <p className={kicker}>Primitives</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            Controls &amp; surfaces
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            The small set everything else composes from. All server-rendered; none of these need
            client JavaScript to look right.
          </p>

          <div className="mt-6 space-y-4">
            <div className={cardCls}>
              <p className={label}>Buttons</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background">
                  Primary action
                  <ArrowRight className="h-4 w-4 opacity-80" aria-hidden />
                </span>
                <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground">
                  Secondary
                  <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
                </span>
                <span className="text-[13px] font-light text-muted-foreground/70">Quiet link →</span>
              </div>
            </div>

            <div className={cardCls}>
              <p className={label}>Chips &amp; tags</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {['Open source', 'Applied AI', 'Write-up', 'v0.6', 'Client project'].map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border/60 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className={cardCls}>
              <p className={label}>Tabs — quiet, accent on active only</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-1 gap-y-1">
                <span className="rounded-md px-2.5 py-1 text-[12px] font-light tracking-wide text-primary">
                  projects
                </span>
                {['writing', 'music', 'social'].map((t) => (
                  <span
                    key={t}
                    className="rounded-md px-2.5 py-1 text-[12px] font-light tracking-wide text-muted-foreground/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className={cardCls}>
              <p className={label}>Status row — mono numerals, uppercase label</p>
              <div className="mt-3 flex flex-wrap gap-8">
                {[
                  { n: '3.5 yrs', l: 'Ubik Studio' },
                  { n: '15', l: 'HITL primitives' },
                  { n: '20+', l: 'Shipped projects' },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="text-xl font-extralight text-foreground/90">{s.n}</p>
                    <p className={`${label} mt-0.5`}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={cardCls}>
              <p className={label}>Callout card — the closing-argument surface</p>
              <div className="mt-3 rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
                <p className="text-sm font-medium tracking-wide text-foreground">One rule</p>
                <p className="mt-2 text-[14px] font-light leading-relaxed text-foreground/85">
                  Inertials emit signals. The Runciter dispatches them. Humans decide.
                </p>
              </div>
            </div>

            <div className={cardCls}>
              <p className={label}>Blockquote — for source material, not decoration</p>
              <blockquote className="mt-3 border-l-2 border-border pl-4 text-[14px] font-light italic leading-relaxed text-foreground/80">
                &ldquo;Your job is not to replace human thinking — it is to amplify it.&rdquo;
                <span className="mt-1.5 block text-[11px] not-italic text-muted-foreground/60">
                  — from Ubik Studio&apos;s own agent design
                </span>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ============ BRAND ENGINES ============ */}
        <section id="brand" className="mt-16 scroll-mt-24">
          <p className={kicker}>Brand engines</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            Canvas marks, one grammar
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            Three engines sharing a single idea: a disc of pixel cells that dissolves and reforms,
            with something knocked out of it. Colour follows <code className={code}>--foreground</code>,
            so they repaint on theme change; each pauses offscreen and renders one still frame under
            reduced motion.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link href="/aka-style/marks" className={`${cardCls} group transition-colors hover:bg-muted/25`}>
              <div className="flex items-center gap-4">
                <PixelHead size={60} grid={24} icon="disc-aka" still />
                <div>
                  <p className="text-[14px] font-light text-foreground/90">Marks →</p>
                  <p className="mt-0.5 text-[12px] font-light text-muted-foreground">
                    The disc family, variants, dissolve modes, grid range, and the full prop table.
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/aka-style/faces" className={`${cardCls} group transition-colors hover:bg-muted/25`}>
              <div className="flex items-center gap-4">
                <PixelHead size={60} grid={22} face="wink" still />
                <div>
                  <p className="text-[14px] font-light text-foreground/90">Faces →</p>
                  <p className="mt-0.5 text-[12px] font-light text-muted-foreground">
                    Twenty-six expressions, the named personas, and when a mark may have a face.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-4 space-y-4">
            <div className={cardCls}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="shrink-0">
                  <PixelHead size={150} grid={30} icon="disc-aka" still />
                </div>
                <div>
                  <p className="text-[14px] font-light text-foreground/90">
                    The akaBuild mark <span className="text-muted-foreground/50">· disc-aka</span>
                  </p>
                  <p className="mt-1 text-[12.5px] font-light leading-relaxed text-muted-foreground">
                    A solid disc with the lowercase wordmark subtracted. The glyph samples in
                    normalized space rather than baking to a fixed grid, so one definition serves the
                    favicon, the chrome, and the hero. This is the site&apos;s icon.
                  </p>
                  <p className="mt-1.5 font-mono text-[10.5px] text-muted-foreground/60">
                    {'<PixelHead icon="disc-aka" grid={32} still />'}
                  </p>
                </div>
              </div>
            </div>

            <div className={cardCls}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="shrink-0">
                  <AkaMark size={150} grid={22} />
                </div>
                <div>
                  <p className="text-[14px] font-light text-foreground/90">AkaMark</p>
                  <p className="mt-1 text-[12.5px] font-light leading-relaxed text-muted-foreground">
                    The akaBuild hero. Each reform reveals a different discipline — AI spark, code
                    brackets, an eighth note, an isometric cube, a terminal prompt, a pen stroke.
                    The dissolve <em>is</em> the discipline change.
                  </p>
                  <p className="mt-1.5 font-mono text-[10.5px] text-muted-foreground/60">
                    {'<AkaMark size grid gap hold speed fluid />'}
                  </p>
                </div>
              </div>
            </div>

            <div className={cardCls}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex shrink-0 items-center gap-3">
                  <PixelHead size={110} grid={20} faces />
                  <PixelHead size={54} grid={14} gap={0.12} icon="aka" still />
                </div>
                <div>
                  <p className="text-[14px] font-light text-foreground/90">
                    PixelHead <span className="text-muted-foreground/50">· ported from circleheads</span>
                  </p>
                  <p className="mt-1 text-[12.5px] font-light leading-relaxed text-muted-foreground">
                    The studio mark: a knocked-out head cycling facial expressions, plus an icon mode
                    that renders any mask from the same grid — here the pixel{' '}
                    <code className={code}>aka</code> wordmark used in this site&apos;s header.
                  </p>
                  <p className="mt-1.5 font-mono text-[10.5px] text-muted-foreground/60">
                    {'<PixelHead faces still icon face shimmer fluid />'}
                  </p>
                </div>
              </div>
            </div>

            <div className={cardCls}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="shrink-0">
                  <PixelRoundabout size={150} />
                </div>
                <div>
                  <p className="text-[14px] font-light text-foreground/90">PixelRoundabout</p>
                  <p className="mt-1 text-[12.5px] font-light leading-relaxed text-muted-foreground">
                    Bartel-Pritchard Square as a live traffic simulation — queueing, merge-yielding,
                    and stop-and-go waves emerging from two rules, painted in the same bit style. The
                    sim is pure and DOM-free; the component owns the clock.
                  </p>
                  <p className="mt-1.5 font-mono text-[10.5px] text-muted-foreground/60">
                    {'<PixelRoundabout size grid gap />'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PATTERNS ============ */}
        <section id="patterns" className="mt-16 scroll-mt-24">
          <p className={kicker}>Patterns</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            Compositions that repeat
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            Where the primitives combine into something reusable. These are the shapes that get
            copied into a new repo first.
          </p>

          <div className="mt-6 space-y-4">
            <div className={cardCls}>
              <p className={label}>Section header — kicker, title, standfirst</p>
              <div className="mt-3 border-l border-border/60 pl-4">
                <p className={kicker}>Selected work · 01</p>
                <p className="mt-1.5 text-xl font-light tracking-tight text-foreground/90">
                  Ubik Studio
                </p>
                <p className="mt-1 text-[13px] font-light text-muted-foreground">
                  Co-founder · Desktop AI research platform · 2023–2026
                </p>
              </div>
            </div>

            <div className={cardCls}>
              <p className={label}>Media figure — bordered frame, caption below</p>
              <figure className="mt-3">
                <div className="flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-lg border border-border/80 bg-muted/10">
                  <PixelHead size={120} grid={18} faces />
                </div>
                <figcaption className="mt-1.5 text-[11px] font-light text-muted-foreground/70">
                  Captions describe what is happening in the frame, not what the thing is called.
                </figcaption>
              </figure>
            </div>

            <div className={cardCls}>
              <p className={label}>Row item — the list unit behind every index</p>
              <div className="mt-3 space-y-3">
                {[
                  { t: 'Hologram', ty: 'Open source · Dev tool', d: 'Live observability for Blender → glTF pipelines.' },
                  { t: 'eval-kit', ty: 'Open source · Write-up', d: 'Agent evaluation where humans score, not LLMs.' },
                ].map((r) => (
                  <div key={r.t}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[14px] text-foreground/90">{r.t}</span>
                      <span className={label}>{r.ty}</span>
                    </div>
                    <p className="mt-0.5 text-[12.5px] font-light text-muted-foreground">{r.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ USAGE ============ */}
        <section id="usage" className="mt-16 scroll-mt-24">
          <p className={kicker}>Where it runs</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            The same language, six places
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            The point of writing the rules down is that a new project starts at hour six instead of
            hour zero. Each of these inherited the tokens, the type scale, and at least one engine.
          </p>

          <ul className="mt-6 space-y-2">
            {usage.map((u) => {
              const inner = (
                <>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[14px] text-foreground/90">{u.name}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/35" aria-hidden />
                  </div>
                  <p className="mt-1 text-[12.5px] font-light leading-relaxed text-muted-foreground">
                    {u.what}
                  </p>
                </>
              )
              const cls =
                'block rounded-xl border border-border/70 bg-muted/10 px-4 py-3.5 transition-colors hover:bg-muted/25'
              return (
                <li key={u.name}>
                  {u.internal ? (
                    <Link href={u.href} className={cls}>
                      {inner}
                    </Link>
                  ) : (
                    <a href={u.href} target="_blank" rel="noopener noreferrer" className={cls}>
                      {inner}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        <section className="mt-16 rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
          <h2 className="text-sm font-medium tracking-wide text-foreground">Why keep this page</h2>
          <p className="mt-2 text-[14px] font-light leading-relaxed text-foreground/85">
            A design system that lives in screenshots rots within a month. This one renders from the
            same components the site ships, so it is structurally incapable of lying — and when a new
            repo needs the language, akaSTYLE travels as seven rules and a token file rather than a
            folder of stale mockups.
          </p>
        </section>
      </article>
    </div>
  )
}
