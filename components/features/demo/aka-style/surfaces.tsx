import { SURFACES } from '@/lib/aka-style'

/** Surfaces: the raised and recessed material, rendered by its own definition. */
export function Surfaces() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">Surface</p>
          <h2 className="mt-2 aka-section-title">One material, lit two ways</h2>
          <p className="mt-3 text-15 font-light leading-relaxed text-muted-foreground">
            Law 03 rules out the drop shadow, which means depth has to happen inside the panel
            rather than under it. A card is lit from above: the fill grades light-to-dark downward,
            the top edge catches a hairline the other three do not, and a fine grain over the fill
            keeps a gradient that shallow from banding. Invert the grade and the top edge and the
            same material reads as a cut into the page instead of an object on it. Every surface
            below is one of those two.
          </p>

          <ul className="aka-breakout mt-6 grid list-none gap-3 p-0 md:grid-cols-2">
            {SURFACES.map((sf) => (
              <li key={sf.cls} className={`${sf.render} overflow-hidden`}>
                <div className="aka-card-head flex items-baseline justify-between gap-4 px-4 py-2.5">
                  <span className="text-14 font-light text-foreground/90">{sf.name}</span>
                  <span className="font-mono text-11 text-muted-foreground/60">.{sf.cls}</span>
                </div>
                <div className="px-4 py-3.5">
                  <p className="text-13 font-light leading-relaxed text-muted-foreground">
                    {sf.what}
                  </p>
                  {/* The one material that cannot be its own tile. See Surface.sample. */}
                  {sf.sample && (
                    <span
                      className={`${sf.sample} mt-3 block h-[13px] w-full max-w-[190px] rounded-full opacity-90`}
                    />
                  )}
                  <ul className="mt-2.5 list-none space-y-1 p-0">
                    {sf.layers.map((l) => (
                      <li
                        key={l}
                        className="font-mono text-11 leading-relaxed text-muted-foreground/60"
                      >
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-15 font-light leading-relaxed text-muted-foreground">
            These were four class strings copied by hand into two dozen files until recently, which
            is the failure mode a design system is supposed to prevent and does not if the system is
            a document. They are two classes now. The specimen above is not a picture of them: it is
            them, rendered by the same definition every page on this site loads.
          </p>
        </section>
  )
}
