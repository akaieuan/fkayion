import { card } from '@/components/features/demo/aka-style/shared'

/*
 * The type scale, shown at the sizes it actually ships at.
 *
 * Each row carries one class string, and that string is both what the
 * specimen is set in and what the header band prints. There is no second
 * copy of the numbers to drift: the sizes live in tailwind.config.cjs and the
 * roles in globals.css, and the ramp on /aka-style/foundations lists the
 * scale itself.
 */
const SCALE = [
  {
    role: 'Display',
    cls: 'text-display font-extralight leading-none tracking-tight text-foreground/90',
    /*
     * The largest specimen gets the full row and breaks out to the site
     * width, since a display line has to be seen at display length; the rest
     * pair up under it inside the column.
     */
    wide: true,
    text: 'A language written as constraints',
  },
  { role: 'Section head', cls: 'aka-section-title', text: 'The rules' },
  {
    role: 'Body',
    cls: 'text-15 font-light leading-relaxed text-muted-foreground',
    text: 'A constraint can be checked in review, and it travels to a new codebase without me having to be in the room.',
  },
  { role: 'Kicker', cls: 'aka-kicker', text: 'Design system · Live specimen' },
  {
    role: 'Caption',
    cls: 'text-11 font-light text-muted-foreground/70',
    text: 'Rendered live, never screenshotted.',
  },
]

/** Type: one scale, five roles, each row set in the class it prints. */
export function TypeScale() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">Type</p>
          <h2 className="mt-2 aka-section-title">One scale, five roles</h2>
          <p className="mt-3 text-15 font-light leading-relaxed text-muted-foreground">
            Hierarchy is carried by the contrast between uppercase mono and light sans, not by size,
            which is why the headings on this page are barely larger than the body under them. Each
            row below is set in the class its band prints, so the specimen and the spec are one
            string.
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
                    {s.cls}
                  </span>
                </div>
                {/* Centred, so a short specimen in a stretched row is not stranded at its top. */}
                <div className="flex flex-1 items-center px-5 py-5">
                  <p className={s.cls}>{s.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
  )
}
