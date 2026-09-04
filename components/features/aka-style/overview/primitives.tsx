import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { card as cardCls } from '@/components/features/aka-style/shared'

/** Primitives: controls and surfaces, with links into the specimen pages. Moved verbatim from app/aka-style/page.tsx. */
export function PrimitivesSection() {
  return (
        <section id="primitives" className="mt-16 scroll-mt-24">
          <p className="aka-kicker">Primitives</p>
          <h2 className="mt-2 aka-section-title">
            Controls &amp; surfaces
          </h2>
          <p className="aka-standfirst">
            The small set everything else composes from. All server-rendered; none of these need
            client JavaScript to look right.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link href="/aka-style/primitives" className={`${cardCls} aka-card-lift`}>
              <p className="text-14 font-light text-foreground/90">Primitives →</p>
              <p className="mt-1 text-12 font-light leading-relaxed text-muted-foreground">
                Every control and surface with its class string printed beside it: buttons, forms,
                tables, code, media frames. The page exists to be copied from.
              </p>
            </Link>
            <Link href="/aka-style/foundations" className={`${cardCls} aka-card-lift`}>
              <p className="text-14 font-light text-foreground/90">Foundations →</p>
              <p className="mt-1 text-12 font-light leading-relaxed text-muted-foreground">
                Spacing, radii, the type ramp, motion timings, breakpoints, and the globals.css
                block that carries the whole system to a new repo.
              </p>
            </Link>
          </div>

          <div className="mt-4 space-y-4">
            <div className={cardCls}>
              <p className="aka-label">Buttons</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background">
                  Primary action
                  <ArrowRight className="h-4 w-4 opacity-80" aria-hidden />
                </span>
                <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground">
                  Secondary
                  <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
                </span>
                <span className="text-13 font-light text-muted-foreground/70">Quiet link →</span>
              </div>
            </div>

            <div className={cardCls}>
              <p className="aka-label">Chips &amp; tags</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {['Open source', 'Applied AI', 'Write-up', 'v0.6', 'Client project'].map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border/60 px-1.5 py-0.5 text-10 font-medium uppercase tracking-[0.12em] text-muted-foreground/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className={cardCls}>
              <p className="aka-label">Tabs: quiet, accent on active only</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-1 gap-y-1">
                <span className="rounded-md px-2.5 py-1 text-12 font-light tracking-wide text-primary">
                  projects
                </span>
                {['writing', 'music', 'social'].map((t) => (
                  <span
                    key={t}
                    className="rounded-md px-2.5 py-1 text-12 font-light tracking-wide text-muted-foreground/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className={cardCls}>
              <p className="aka-label">Status row: mono numerals, uppercase label</p>
              <div className="mt-3 flex flex-wrap gap-8">
                {[
                  { n: '3.5 yrs', l: 'Ubik Studio' },
                  { n: '15', l: 'HITL primitives' },
                  { n: '20+', l: 'Shipped projects' },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="text-xl font-extralight text-foreground/90">{s.n}</p>
                    <p className="aka-label mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={cardCls}>
              <p className="aka-label">Callout card: the closing-argument surface</p>
              <div className="mt-3 aka-card-well px-5 py-4">
                <p className="aka-lead">One rule</p>
                <p className="mt-2 text-14 font-light leading-relaxed text-foreground/85">
                  Inertials emit signals. The Runciter dispatches them. Humans decide.
                </p>
              </div>
            </div>

            <div className={cardCls}>
              <p className="aka-label">Blockquote: for source material, not decoration</p>
              <blockquote className="mt-3 border-l-2 border-border pl-4 text-14 font-light italic leading-relaxed text-foreground/80">
                &ldquo;Your job is not to replace human thinking — it is to amplify it.&rdquo;
                <span className="mt-1.5 block text-11 not-italic text-muted-foreground/60">
                  From Ubik Studio&apos;s own agent design
                </span>
              </blockquote>
            </div>
          </div>
        </section>
  )
}
