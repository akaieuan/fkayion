import { PixelHead } from '@/components/features/brand/pixel-head'
import { label, mono, card as cell } from '@/components/features/aka-style/shared'

/** The akaBuild mark: a disc with aka inside, at four resolutions. Moved verbatim from app/aka-style/marks/page.tsx. */
export function TheMarkSection() {
  return (
        <section className="scroll-mt-24">
          <p className="aka-kicker">The akaBuild mark</p>
          <h2 className="mt-2 aka-section-title">
            A disc with aka inside
          </h2>
          <p className="aka-standfirst">
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
  )
}
