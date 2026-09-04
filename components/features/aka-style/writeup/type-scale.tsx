import { card } from '@/components/features/aka-style/writeup/shared'

/*
 * The type scale, shown at the sizes it actually ships at.
 *
 * Split into a role and its spec rather than one long uppercase run. The run
 * was doing two jobs in one line: naming the row, and listing four numbers
 * nobody reads as a sentence. As a header band with the name on the left and
 * the numbers on the right, both are scannable and the specimen underneath
 * gets the card to itself.
 */
const SCALE = [
  {
    role: 'Display',
    spec: 'clamp 1.85 to 2.85rem / extralight / tight',
    /*
     * The largest specimen gets the full row and breaks out to the site
     * width, since a display line has to be seen at display length; the rest
     * pair up under it inside the column.
     */
    wide: true,
    node: (
      <p className="text-display font-extralight leading-none tracking-tight text-foreground/90">
        A language written as constraints
      </p>
    ),
  },
  {
    role: 'Section head',
    spec: '20px / light',
    node: <p className="aka-section-title">The rules</p>,
  },
  {
    role: 'Body',
    spec: '15px / light / 1.6',
    node: (
      <p className="text-15 font-light leading-relaxed text-muted-foreground">
        A constraint can be checked in review, and it travels to a new codebase without me having
        to be in the room.
      </p>
    ),
  },
  {
    role: 'Kicker',
    spec: '11px / 0.18em / uppercase / medium',
    node: <p className="aka-kicker">Design system · Live specimen</p>,
  },
  {
    role: 'Caption',
    spec: '11px / light / muted-70',
    node: (
      <p className="text-11 font-light text-muted-foreground/70">
        Rendered live, never screenshotted.
      </p>
    ),
  },
]

/** Type: one scale, five roles, each row set in the class the site ships. */
export function TypeScale() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">Type</p>
          <h2 className="mt-2 aka-section-title">One scale, five roles</h2>
          <p className="mt-3 text-15 font-light leading-relaxed text-muted-foreground">
            Hierarchy is carried by the contrast between uppercase mono and light sans, not by size,
            which is why the headings on this page are barely larger than the body under them. Each
            row below is set in the class the site actually ships.
          </p>

          <ul className="mt-6 grid list-none gap-3 p-0 lg:grid-cols-2">
            {SCALE.map((s) => (
              <li
                key={s.role}
                className={`${card} flex flex-col overflow-hidden ${s.wide ? 'aka-breakout lg:col-span-2' : ''}`}
              >
                <div className="aka-card-head flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 py-2.5">
                  <span className="font-mono text-11 font-medium uppercase tracking-[0.16em] text-foreground/70">
                    {s.role}
                  </span>
                  <span className="font-mono text-11 tracking-[0.03em] text-muted-foreground/60">
                    {s.spec}
                  </span>
                </div>
                {/* Centred, so a short specimen in a stretched row is not stranded at its top. */}
                <div className="flex flex-1 items-center px-5 py-5">{s.node}</div>
              </li>
            ))}
          </ul>
        </section>
  )
}
