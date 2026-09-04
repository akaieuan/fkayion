import { PixelHead } from '@/components/features/brand/pixel-head'
import { label, card as cell } from '@/components/features/aka-style/shared'

/** Resolution: grid and gap across their ranges. Moved verbatim from app/aka-style/marks/page.tsx. */
export function GridSection() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">Resolution</p>
          <h2 className="mt-2 aka-section-title">
            Grid and gap
          </h2>
          <p className="aka-standfirst">
            <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-11">grid</code> sets
            cells across; <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-11">gap</code>{' '}
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
  )
}
