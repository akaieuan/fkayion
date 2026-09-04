/** The closing note: why this page exists. Moved verbatim from app/aka-style/page.tsx. */
export function WhyKeepSection() {
  return (
        <section className="mt-16 aka-card-well px-5 py-4">
          <h2 className="aka-lead">Why keep this page</h2>
          <p className="mt-2 text-[14px] font-light leading-relaxed text-foreground/85">
            A design system that lives in screenshots rots within a month. This one renders from the
            same components the site ships, so it is structurally incapable of lying — and when a new
            repo needs the language, akaSTYLE travels as eight rules and a token file rather than a
            folder of stale mockups.
          </p>
        </section>
  )
}
