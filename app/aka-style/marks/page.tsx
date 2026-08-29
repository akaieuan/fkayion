import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PixelHead } from '@/components/features/brand/pixel-head'
import { AkaMark } from '@/components/features/brand/aka-mark'
import { PixelRoundabout } from '@/components/features/brand/pixel-roundabout'
import { BlockpadMark } from '@/components/ui/blockpad-mark'
import { CovartMark } from '@/components/ui/covart-mark'
import { BodyLogMark } from '@/components/demo/bodylog/bodylog-mark'

const kicker = 'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'
const label = 'text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/50'
const mono = 'font-mono text-[10.5px] text-muted-foreground/60'
const cell = 'aka-card p-5'

export const metadata = {
  title: 'Marks — the brand engine | akaSTYLE',
  description:
    'Every mark the pixel-disc engine produces: the akaBuild disc, studio heads, wordmarks, work-line icons, dissolve modes, grid resolutions, and the props that drive them.',
}

/** Each row is one prop dimension of the same engine, shown across its range. */
export default function MarksPage() {
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
          <p className={kicker}>Brand engine · Marks</p>
          <h1 className="mt-2 text-[clamp(1.7rem,5vw,2.4rem)] font-extralight leading-none tracking-tight text-foreground/90">
            Marks
          </h1>
          <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
            One canvas engine, every mark in the family. A disc of pixel cells with something
            subtracted from it — change what is subtracted and you change brands, not code. Every
            mark on this page is live: colour follows <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[11px]">--foreground</code>,
            loops pause offscreen, and reduced motion renders a single frame.
          </p>
        </header>

        {/* THE MARK */}
        <section className="scroll-mt-24">
          <p className={kicker}>The akaBuild mark</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            A disc with aka inside
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            The primary identity: a solid disc with the lowercase wordmark knocked out of it. The
            glyph is sampled in normalized space rather than baked to a fixed grid, so the same mark
            resolves at any resolution — chrome, favicon, or hero.
          </p>

          <div className={`${cell} mt-6`}>
            <div className="flex flex-wrap items-end justify-center gap-10 py-2">
              {[
                { s: 160, g: 32, l: 'grid 32 · full detail' },
                { s: 96, g: 28, l: 'grid 28 · card' },
                { s: 56, g: 24, l: 'grid 24 · chrome' },
                { s: 32, g: 20, l: 'grid 20 · favicon' },
              ].map((v) => (
                <div key={v.l} className="flex flex-col items-center gap-2.5">
                  <PixelHead size={v.s} grid={v.g} icon="disc-aka" still />
                  <span className={label}>{v.l}</span>
                </div>
              ))}
            </div>
            <p className={`${mono} mt-4 text-center`}>
              {'<PixelHead icon="disc-aka" size={160} grid={32} still />'}
            </p>
          </div>
        </section>

        {/* THE FAMILY */}
        <section className="mt-16">
          <p className={kicker}>The family</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            Same grammar, different subtraction
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            Each studio and product gets its own knockout. That is the entire brand system — the
            engine, the ground, and one shape removed.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: 'disc-aka' as const, name: 'akaBuild', note: 'wordmark void' },
              { icon: 'head' as const, name: 'Circleheads', note: 'figure void' },
              { icon: 'spark' as const, name: 'akaOSS', note: 'sparkle void' },
              { icon: 'gamepad' as const, name: 'Games', note: 'work line' },
            ].map((m) => (
              <div key={m.name} className="aka-card p-4 text-center">
                <div className="flex justify-center">
                  <PixelHead size={84} grid={24} icon={m.icon} still />
                </div>
                <p className="mt-3 text-[12px] text-foreground/85">{m.name}</p>
                <p className={`${label} mt-0.5`}>{m.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* VARIANT */}
        <section className="mt-16">
          <p className={kicker}>Variant</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            Negative and figure
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            The default is <span className="text-foreground/85">negative</span> — a filled disc with
            the shape cut out. <span className="text-foreground/85">Figure</span> inverts it: the
            shape is drawn, wrapped in a thin ring. Negative reads better small; figure reads better
            when the shape itself is the message.
          </p>

          <div className={`${cell} mt-6`}>
            <div className="flex flex-wrap items-center justify-center gap-12 py-2">
              {(['negative', 'figure'] as const).map((v) => (
                <div key={v} className="flex flex-col items-center gap-2.5">
                  <PixelHead size={110} grid={22} icon="head" variant={v} still />
                  <span className={label}>variant = {v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORDMARKS */}
        <section className="mt-16">
          <p className={kicker}>Wordmarks</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            Mask-drawn lettering
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            For titles whose mark is text, the glyph is drawn directly instead of subtracted — a
            hand-authored bitmap on the same cell grid, so lettering sits in the identical pixel
            rhythm as the discs.
          </p>

          <div className={`${cell} mt-6`}>
            <div className="flex flex-wrap items-center justify-center gap-12 py-3">
              {(['aka', 'nyz', 'pogo'] as const).map((w) => (
                <div key={w} className="flex flex-col items-center gap-2.5">
                  <PixelHead size={64} grid={14} gap={0.12} icon={w} still />
                  <span className={label}>icon = {w}</span>
                </div>
              ))}
            </div>
            <p className={`${mono} mt-4 text-center`}>
              {'<PixelHead icon="aka" size={30} grid={14} gap={0.12} still />  // site header'}
            </p>
          </div>
        </section>

        {/* DISSOLVE MODES */}
        <section className="mt-16">
          <p className={kicker}>Motion</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            Four dissolve modes
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            The mark decays and reforms on a loop. The mode sets the order cells leave: by row, by
            radius, at random, or in glitch blocks. All four move cells through space — none of them
            fade opacity, per the motion rule.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(['ash', 'explode', 'scatter', 'glitch'] as const).map((m) => (
              <div key={m} className="aka-card p-4 text-center">
                <div className="flex justify-center">
                  <PixelHead size={92} grid={22} icon="disc-aka" mode={m} />
                </div>
                <p className={`${label} mt-3`}>mode = {m}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GRID */}
        <section className="mt-16">
          <p className={kicker}>Resolution</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            Grid and gap
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[11px]">grid</code> sets
            cells across; <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[11px]">gap</code>{' '}
            sets the gutter as a fraction of a cell. Lower grid reads bolder at small sizes; higher
            grid carries finer knockouts.
          </p>

          <div className={`${cell} mt-6`}>
            <div className="flex flex-wrap items-end justify-center gap-8 py-2">
              {[14, 18, 24, 32, 40].map((g) => (
                <div key={g} className="flex flex-col items-center gap-2.5">
                  <PixelHead size={80} grid={g} icon="head" still />
                  <span className={label}>grid {g}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 h-px bg-border/60" />
            <div className="flex flex-wrap items-end justify-center gap-8 pt-6">
              {[0.06, 0.16, 0.3].map((gp) => (
                <div key={gp} className="flex flex-col items-center gap-2.5">
                  <PixelHead size={80} grid={22} gap={gp} icon="head" still />
                  <span className={label}>gap {gp}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DISCIPLINE CYCLER */}
        <section className="mt-16">
          <p className={kicker}>Derived engine</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            AkaMark, the discipline cycler
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            Same disc grammar, but each reform reveals a discipline rather than a face: AI spark,
            code brackets, an eighth note, an isometric cube, a terminal prompt, a pen stroke. The
            dissolve <em>is</em> the discipline change.
          </p>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            It was the hero until the hero moved to{' '}
            <Link href="/aka-style/faces" className="text-primary underline decoration-border underline-offset-[3px]">
              faces
            </Link>
            . Kept, because the discipline set is still the clearest demonstration of what a
            knockout can carry, and because nothing else in the library swaps its subject on the
            dissolve.
          </p>
          <div className={`${cell} mt-6 flex flex-col items-center gap-4`}>
            <AkaMark size={190} grid={24} />
            <p className={mono}>{'<AkaMark size={400} grid={24} hold={3.4} fluid />'}</p>
          </div>
        </section>

        {/* ROUNDABOUT */}
        <section className="mt-16">
          <p className={kicker}>Derived engine</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            PixelRoundabout — a simulation as a mark
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            The furthest the grammar stretches: Bartel-Pritchard Square rendered in the same bit
            style, driven by a real traffic simulation. Queueing, merge-yielding, and stop-and-go
            waves emerge from two rules. The sim is pure and DOM-free — the component owns the clock,
            so the same model could drive an SVG or a test.
          </p>
          <div className={`${cell} mt-6 flex flex-col items-center gap-4`}>
            <PixelRoundabout size={230} />
            <p className={mono}>{'<PixelRoundabout size={360} />'}</p>
          </div>
        </section>

        {/* DRAWN MARKS */}
        <section className="mt-16">
          <p className={kicker}>Outside the engine</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            Drawn marks
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            Not every product mark is a knockout. Three ship artwork of their own, and it is
            transcribed into an SVG here rather than exported as a bitmap, because the same mark has
            to survive an 18px specimen and a 300px plate on one page, and because a resampled
            squircle goes to mush at the small end.
          </p>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            All three are server components. A mark is a static drawing, so none of them should cost
            a client bundle.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                art: <BlockpadMark size={92} />,
                name: 'BlockpadMark',
                note: 'Two masters, palette in CSS',
              },
              {
                art: <BodyLogMark size={92} title="" />,
                name: 'BodyLogMark',
                note: 'Five weeks of the logging grid',
              },
              { art: <CovartMark size={92} />, name: 'CovartMark', note: 'Its own ground' },
            ].map((m) => (
              <div key={m.name} className={`${cell} flex flex-col items-center gap-3`}>
                {m.art}
                <p className="text-[12px] text-foreground/85">{m.name}</p>
                <p className={`${label} text-center`}>{m.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 aka-card-well px-5 py-4">
            <p className={label}>The convention</p>
            <p className="mt-2 text-[13.5px] font-light leading-relaxed text-foreground/85">
              A mark with a value per theme keeps its palette in CSS custom properties, not in the
              component. Blockpad ships a dark master and a light one, and reading the theme in
              order to pick would make a static drawing a client component for no other reason. So
              the drawing is one SVG whose fills are <code className={mono}>var(--bp-*)</code>, and
              the browser picks.
            </p>
            <p className="mt-2 text-[13.5px] font-light leading-relaxed text-foreground/85">
              The same move covers the pixel engine&apos;s face accents, which arrived from the
              handoff as literal hex tuned for a dark ground:{' '}
              <code className={mono}>--pixel-face-*</code> resolves them per theme, and the hex stays
              in the table as the record of what the design says.
            </p>
          </div>
        </section>

        {/* PROPS */}
        <section className="mt-16">
          <p className={kicker}>Reference</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">Props</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  {['prop', 'type', 'what it does'].map((h) => (
                    <th key={h} className={`${label} pb-2 pr-4 font-medium`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[12px] font-light text-muted-foreground">
                {[
                  ['size', 'number', 'Canvas CSS px. Required.'],
                  ['grid', 'number', 'Cells across. 14 for chrome, 22–32 for display.'],
                  ['icon', 'disc-aka | head | spark | bubble | gamepad | aka | nyz | pogo', 'What is subtracted, or which wordmark is drawn.'],
                  ['variant', 'negative | figure', 'Disc-with-void, or drawn shape in a ring.'],
                  ['mode', 'ash | explode | scatter | glitch', 'Dissolve order.'],
                  ['gap', 'number', 'Gutter as a fraction of a cell.'],
                  ['faces', 'boolean', 'Cycle expressions inside the void while assembled.'],
                  ['face', 'wink | thinking', 'Hold one expression — persona marks.'],
                  ['faceIndex', 'number', 'Hold expression n. Gallery use; face is the stable API.'],
                  ['startAssembled', 'boolean', 'With faces: open on the first expression rather than assembling into it.'],
                  ['still', 'boolean', 'One assembled frame, never animates. Logo use.'],
                  ['once', 'boolean', 'Assemble on first view, then hold.'],
                  ['shimmer', 'boolean', 'With once: a quiet ~3Hz twinkle on ~4% of cells.'],
                  ['fluid', 'boolean', 'Scale down with the container, capped at size.'],
                  ['color', 'string', 'Override the pixel colour. Defaults to --foreground.'],
                  ['speed', 'number', 'Loop rate multiplier.'],
                ].map(([p, t, d]) => (
                  <tr key={p} className="border-b border-border/40">
                    <td className="py-2 pr-4 align-top font-mono text-[11px] text-foreground/85">{p}</td>
                    <td className="py-2 pr-4 align-top font-mono text-[10.5px] text-muted-foreground/70">{t}</td>
                    <td className="py-2 align-top">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16 aka-card-well px-5 py-4">
          <p className="text-[14px] font-light leading-relaxed text-foreground/85">
            Next:{' '}
            <Link href="/aka-style/faces" className="text-primary underline decoration-border underline-offset-[3px]">
              the face set
            </Link>{' '}
            — twenty-six expressions that live inside the void, and the rules for when a mark is
            allowed to have one.
          </p>
        </section>
      </article>
    </div>
  )
}
