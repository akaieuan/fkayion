import { PixelHead } from '@/components/features/brand/pixel-head'
import { label, mono, card as cell } from '@/components/features/aka-style/shared'

/** Personas: the two named expressions. Moved verbatim from app/aka-style/faces/page.tsx. */
export function PersonasSection() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">Personas</p>
          <h2 className="mt-2 aka-section-title">
            Named expressions
          </h2>
          <p className="aka-standfirst">
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
  )
}
