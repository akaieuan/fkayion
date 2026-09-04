/** What people track — deliberately broad; this is not a derm-only tool. */
const conditions = [
  'Acne', 'Psoriasis', 'Eczema', 'Cysts', 'Ingrown hairs', 'Alopecia',
  'Bruising', 'Scarring', 'Post-op healing', 'Posture / PT progress',
]

/** What people track. Moved verbatim from app/demo/bodylog/page.tsx. */
export function WhatPeopleTrackSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">What people track</h2>
            <p>
              Deliberately not a dermatology-only tool. Anything visible on the outside of the body,
              changing slowly enough that memory fails you:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {conditions.map((c) => (
                <span
                  key={c}
                  className="rounded-md border border-border/60 px-2 py-0.5 text-[11px] font-light text-muted-foreground/80"
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="text-[13px]">
              And what you call it is <span className="text-foreground/85">free text you coin</span> —
              &ldquo;psoriasis&rdquo;, &ldquo;jaw acne&rdquo;, &ldquo;hand eczema&rdquo; — not a fixed
              menu. Two people with the same diagnosis rarely describe it the same way, and a closed
              list would make the app argue with them about their own body.
            </p>
            <p className="text-[13px]">
              The two routes it is built around: <span className="text-foreground/85">face acne</span>,
              logged zone by zone on a face diagram, and{' '}
              <span className="text-foreground/85">fold-prone persistent spots</span> — psoriasis and
              eczema at the inner elbows, backs of knees, neck, scalp, waist — on front and back body
              diagrams.
            </p>
          </section>
  )
}
