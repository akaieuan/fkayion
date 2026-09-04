/** Where the shipped app knowingly left the original plan. */
const departures = [
  {
    h: 'Crisp, not hand-drawn.',
    t: 'The plan argued that roughness signals provisional and stops a model reading proportions as exact. That risk turned out to be covered elsewhere: the tree states coordinates and counts outright, so precision never depends on the picture. The default is clean geometry and the sketch renderer survives behind a toggle.',
  },
  {
    h: 'A dock, not a top bar.',
    t: 'The top edge of a drawing is where you look, so tools moved to the bottom. The inspector became a collapsible rail of rows: leading glyph, quiet label, control on the trailing edge, hairline between.',
  },
  {
    h: 'Arbitrary colour.',
    t: 'The plan said five swatches and no picker, and listed a colour picker as a non-goal. Both reversed, and the payload got better for it: hex is a value the receiving agent can paste into CSS, where a palette name was a lookup it could not perform.',
  },
]

/** The design left the plan three times, on purpose. Moved verbatim from app/demo/blockpad/page.tsx. */
export function DeparturesSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">
              The design left the plan three times, on purpose
            </h2>
            <ul className="!mt-4 list-none space-y-4 p-0">
              {departures.map((d) => (
                <li key={d.h} className="border-l border-border pl-4">
                  <p className="text-14 text-foreground/85">{d.h}</p>
                  <p className="mt-1 text-14">{d.t}</p>
                </li>
              ))}
            </ul>
          </section>
  )
}
