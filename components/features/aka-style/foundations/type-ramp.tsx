import { TypeScaleSpecimen } from '@/components/features/aka-style/type-scale-specimen'

/** Type: the ramp. The closed scale, set at its own sizes. */
export function TypeRampSection() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">Type</p>
          <h2 className="mt-2 aka-section-title">The ramp</h2>
          <p className="aka-standfirst">
            One family, four weights, and a ramp that leans light. Display sizes get{' '}
            <span className="text-foreground/85">extralight</span> with negative tracking; small text
            gets <span className="text-foreground/85">medium</span> with positive tracking. The
            inversion is deliberate: it is what makes small type read as a label rather than
            shrunken body copy.
          </p>
          <TypeScaleSpecimen />
        </section>
  )
}
