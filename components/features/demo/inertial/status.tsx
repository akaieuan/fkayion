/** Status. Moved verbatim from app/demo/inertial/page.tsx. */
export function StatusSection() {
  return (
          <section className="aka-card-well px-5 py-4">
            <p className="aka-kicker">Status</p>
            <p className="mt-2 text-14 leading-relaxed text-foreground/85">
              Reference architecture, not deployable. Schemas, audit chain, eval harness, skill registry, and reviewer
              dashboard are real and tested. Connectors are stubbed. Action dispatch is unimplemented. No auth. The
              31-event gold set is too small for statistical claims; it&apos;s there to demonstrate the calibration
              math, not to certify any skill&apos;s accuracy.
            </p>
          </section>
  )
}
