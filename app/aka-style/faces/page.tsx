import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PixelHead } from '@/components/features/brand/pixel-head'

const kicker = 'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'
const label = 'text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/50'
const mono = 'font-mono text-[10.5px] text-muted-foreground/60'
const cell = 'aka-card p-5'
const codeCls = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[11px]'

/** The full expression table lives in EXPR (pixel-head.tsx) — 26 slots. */
const FACE_COUNT = 26
const faces = Array.from({ length: FACE_COUNT }, (_, i) => i)

export const metadata = {
  title: 'Faces — the expression set | akaSTYLE',
  description:
    'Twenty-six expressions that live inside the pixel-disc void: the full face set, the persona marks, and the rules for when a mark is allowed to have a face.',
}

export default function FacesPage() {
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
          <p className={kicker}>Brand engine · Faces</p>
          <h1 className="mt-2 text-[clamp(1.7rem,5vw,2.4rem)] font-extralight leading-none tracking-tight text-foreground/90">
            Faces
          </h1>
          <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
            Inside the knocked-out void, a mark can hold an expression. Twenty-six of them, drawn on
            a 9×9 sub-grid and morphed between on a 2.9-second slot with a short transition — so a
            face never cuts, it always travels.
          </p>
        </header>

        {/* THE RULE */}
        <section className={`${cell}`}>
          <p className={label}>The rule</p>
          <p className="mt-2 text-[14px] font-light leading-relaxed text-foreground/85">
            A face needs room and it needs time. So it appears at hero scale and nowhere else: the
            header and footer marks are the same engine held still with no face at all, because an
            expression at 26px is noise, and a mark you look at for a second cannot say anything
            with a 2.9-second slot.
          </p>
          <p className="mt-3 text-[14px] font-light leading-relaxed text-foreground/85">
            The set comes from <span className="text-foreground">Circleheads</span>, a studio of
            people, and akaBuild runs the same head through the same twenty-six expressions. It
            used to cycle{' '}
            <Link href="/aka-style/marks" className="text-primary underline decoration-border underline-offset-[3px]">
              disciplines
            </Link>{' '}
            instead. Naming the work was the weaker version of the point: range reads better as one
            face changing than as a list.
          </p>
        </section>

        {/* LIVE CYCLE */}
        <section className="mt-16">
          <p className={kicker}>In motion</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            The cycle
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            With <code className={codeCls}>faces</code>, the expression changes during the assembled
            hold — so the mark is never static but never busy either. Blinks fire on their own
            schedule, independent of the expression slot.
          </p>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            The loop&apos;s order is reform, hold, dissolve, and a face is only drawn once the disc
            is whole. So a mark opens on 1.7 seconds of scattered pixels and then the first face
            appears at once, which reads as loading when the mark is the first thing on a page.{' '}
            <code className={codeCls}>startAssembled</code> starts the clock at the top of the hold
            instead. Only that first assemble is skipped; every later loop still dissolves.
          </p>
          <div className={`${cell} mt-6 grid gap-6 sm:grid-cols-2`}>
            {[
              { label: 'faces', node: <PixelHead size={150} grid={24} faces />, code: '<PixelHead grid={24} faces fluid />' },
              {
                label: 'faces + startAssembled',
                node: <PixelHead size={150} grid={24} faces startAssembled />,
                code: '<PixelHead grid={24} faces startAssembled fluid />',
              },
            ].map((v) => (
              <div key={v.label} className="flex flex-col items-center gap-3">
                {v.node}
                <p className={label}>{v.label}</p>
                <p className={`${mono} text-center`}>{v.code}</p>
              </div>
            ))}
          </div>
        </section>

        {/* THE SET */}
        <section className="mt-16">
          <p className={kicker}>The set</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            Twenty-six expressions
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            Every slot, held still via <code className={codeCls}>faceIndex</code>. The range runs
            from neutral through curious, skeptical, delighted, and asleep — enough personality to
            feel alive across a long hold, never so much that it reads as a cartoon.
          </p>

          <div className="mt-6 grid grid-cols-4 gap-2.5 sm:grid-cols-6 md:grid-cols-7">
            {faces.map((i) => (
              <div key={i} className="aka-card rounded-lg p-2 text-center">
                <div className="flex justify-center">
                  <PixelHead size={62} grid={20} faceIndex={i} still />
                </div>
                <p className={`${mono} mt-1.5`}>{i}</p>
              </div>
            ))}
          </div>
          <p className={`${mono} mt-4`}>{'<PixelHead faceIndex={7} size={62} grid={20} still />'}</p>
        </section>

        {/* PERSONAS */}
        <section className="mt-16">
          <p className={kicker}>Personas</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            Named expressions
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            Two slots are named, because they carry meaning rather than mood — they stand in for
            people and states across the studio sites. Named faces are stable API; raw indices are
            not.
          </p>
          <div className={`${cell} mt-6`}>
            <div className="flex flex-wrap items-center justify-center gap-12 py-2">
              {(['wink', 'thinking'] as const).map((f) => (
                <div key={f} className="flex flex-col items-center gap-2.5">
                  <PixelHead size={120} grid={22} face={f} still />
                  <span className={label}>face = {f}</span>
                </div>
              ))}
            </div>
            <p className={`${mono} mt-4 text-center`}>{'<PixelHead face="wink" size={120} grid={22} still />'}</p>
          </div>
        </section>

        {/* ENTRANCE */}
        <section className="mt-16">
          <p className={kicker}>Entrance</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            Assemble once, then hold
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            For marks that should announce themselves and then get out of the way:{' '}
            <code className={codeCls}>once</code> assembles on first view and stops.{' '}
            <code className={codeCls}>shimmer</code> adds a ~3Hz twinkle on ~4% of cells — enough to
            keep it alive in peripheral vision without asking for attention.
          </p>
          <div className={`${cell} mt-6`}>
            <div className="flex flex-wrap items-center justify-center gap-12 py-2">
              <div className="flex flex-col items-center gap-2.5">
                <PixelHead size={110} grid={22} once />
                <span className={label}>once</span>
              </div>
              <div className="flex flex-col items-center gap-2.5">
                <PixelHead size={110} grid={22} once shimmer />
                <span className={label}>once + shimmer</span>
              </div>
              <div className="flex flex-col items-center gap-2.5">
                <PixelHead size={110} grid={22} still />
                <span className={label}>still</span>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-16">
          <p className={kicker}>Under it</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            How a face is drawn
          </h2>
          <ul className="mt-4 space-y-2.5 text-[13px] font-light leading-relaxed text-muted-foreground">
            {[
              ['9×9 sub-grid', 'Each expression is a small bitmap of eye, brow, and mouth cells, parsed once at module load — not per frame.'],
              ['2.9s slot, short morph', 'Expressions hold, then interpolate into the next over a fixed transition window. Nothing cuts.'],
              ['Independent blinks', 'Blink timing runs on its own clock, so the same expression never looks looped.'],
              ['Optional accent', 'A slot can carry one accent colour cell — the only place colour enters a mark.'],
              ['Reduced motion', 'The whole timeline collapses to a single representative frame.'],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                <span>
                  <span className="text-foreground/85">{t}.</span> {d}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 aka-card-well px-5 py-4">
          <p className="text-[14px] font-light leading-relaxed text-foreground/85">
            Back to{' '}
            <Link href="/aka-style/marks" className="text-primary underline decoration-border underline-offset-[3px]">
              marks
            </Link>{' '}
            for the disc family, dissolve modes, and the full prop reference — or{' '}
            <Link href="/aka-style" className="text-primary underline decoration-border underline-offset-[3px]">
              akaSTYLE
            </Link>{' '}
            for the design language itself.
          </p>
        </section>
      </article>
    </div>
  )
}
