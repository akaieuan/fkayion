import { PixelRoundabout } from '@/components/features/brand/pixel-roundabout'
import { mono, card as cell } from '@/components/features/aka-style/shared'

/** Derived engine: PixelRoundabout, a simulation as a mark. Moved verbatim from app/aka-style/marks/page.tsx. */
export function RoundaboutSection() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">Derived engine</p>
          <h2 className="mt-2 aka-section-title">
            PixelRoundabout: a simulation as a mark
          </h2>
          <p className="aka-standfirst">
            The furthest the grammar stretches: Bartel-Pritchard Square rendered in the same bit
            style, driven by a real traffic simulation. Queueing, merge-yielding, and stop-and-go
            waves emerge from two rules. The sim is pure and DOM-free: the component owns the clock,
            so the same model could drive an SVG or a test.
          </p>
          <div className={`${cell} mt-6 flex flex-col items-center gap-4`}>
            <PixelRoundabout size={230} />
            <p className={mono}>{'<PixelRoundabout size={360} />'}</p>
          </div>
        </section>
  )
}
