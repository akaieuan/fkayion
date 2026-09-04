import { TypeScaleSpecimen } from '@/components/features/aka-style/type-scale-specimen'

/** Type: the scale, one row per named size. The roles built on it are on /aka-style/primitives. */
export function TypeSection() {
  return (
        <section id="type" className="mt-16 scroll-mt-24">
          <p className="aka-kicker">Type</p>
          <h2 className="mt-2 aka-section-title">The scale</h2>
          <TypeScaleSpecimen />
        </section>
  )
}
