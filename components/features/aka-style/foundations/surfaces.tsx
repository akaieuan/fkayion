import { label, card as cardCls, codeChip as codeCls } from '@/components/features/aka-style/shared'
import { Row, Table } from '@/components/features/aka-style/foundations/token-table'

/** Surfaces: the ground under a mark. Moved verbatim from app/aka-style/foundations/page.tsx. */
export function SurfacesSection() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">Surfaces</p>
          <h2 className="mt-2 aka-section-title">
            The ground under a mark
          </h2>
          <p className="aka-standfirst">
            A project plate is one colour: the plate ground with a percentage of the project&apos;s
            own hue mixed into it. Both halves are tokens, and both differ per theme for reasons that
            are not symmetry.
          </p>
          <div className={`${cardCls} mt-6`}>
            <Table>
              <Row name="--stamp-ground" value="0.92 0 0 / 0.2 0 0">
                <span
                  className="block h-6 w-full max-w-[160px] rounded border border-border"
                  style={{ background: 'var(--stamp-ground)' }}
                />
              </Row>
              <Row name="--plate-mix" value="10% / 7%">
                <span className="text-11 font-light text-muted-foreground/60">
                  How much of the project&apos;s hue reaches the plate
                </span>
              </Row>
              <Row name="--surface" value="0.945 0.004 106 / 0.145 0 0">
                <span
                  className="block h-6 w-full max-w-[160px] rounded border border-border"
                  style={{ background: 'var(--surface)' }}
                />
              </Row>
            </Table>
            <p className="mt-4 text-12 font-light leading-relaxed text-muted-foreground/70">
              <span className="text-foreground/80">Dark is the reference.</span> Light is not the
              same number: a hue over a light ground shows up more readily than the same hue over a
              dark one, so light takes more mix to read as the same character. And{' '}
              <code className={codeCls}>--stamp-ground</code> steps <em>down</em> from the page in
              light while it steps up in dark. It used to sit lighter than the background, which made
              every plate in light mode effectively invisible.
            </p>
            <p className="mt-2 text-12 font-light leading-relaxed text-muted-foreground/70">
              <span className="text-foreground/80">The mix is sRGB, not OKLCH.</span> The ground is
              achromatic but carries an explicit hue, and an OKLCH mix interpolates that channel: a
              green, a blue and a violet all came out pink. It is also why the plate ground is
              neutral rather than warm.
            </p>
          </div>

          <div className={`${cardCls} mt-3`}>
            <p className={label}>Palettes that belong to one drawing</p>
            <p className="mt-2 text-13 font-light leading-relaxed text-muted-foreground">
              When artwork has a value per theme, the palette goes in custom properties and the
              browser picks. Reading the theme in JavaScript would make a static drawing a client
              component, which is the whole cost being avoided. Two live examples:{' '}
              <code className={codeCls}>--bp-*</code>, which carries Blockpad&apos;s dark and light
              icon masters, and <code className={codeCls}>--pixel-face-*</code>, which re-homes the
              five face accents the circleheads handoff supplies as literal hex.
            </p>
            <p className="mt-2 text-13 font-light leading-relaxed text-muted-foreground">
              The rule that keeps this honest: the source value stays written down where the design
              put it, and the token is where it is <em>read</em> from. So dark restates the
              handoff&apos;s hex exactly and only light diverges.
            </p>
          </div>

          <div className={`${cardCls} mt-3`}>
            <p className={label}>The one exception to Tailwind</p>
            <p className="mt-2 text-13 font-light leading-relaxed text-muted-foreground">
              An artefact ported in from elsewhere keeps its own stylesheet, scoped to a class, the
              way <code className={codeCls}>app/trickle.css</code> keeps the kit&apos;s keyframes and{' '}
              <code className={codeCls}>bodylog-v1/v1.css</code> keeps the circleheads token set
              under <code className={codeCls}>.bl1</code>. Rewriting a hundred and fifty custom
              properties as utilities is a redesign, not a port, and the point of keeping an artefact
              is that it is the version something was decided from.
            </p>
            <p className="mt-2 text-13 font-light leading-relaxed text-muted-foreground">
              Scoped, always, so none of it reaches the site. And a ported theme hangs off its own
              attribute rather than the site&apos;s <code className={codeCls}>.dark</code>, because
              the artefact&apos;s theme and the page&apos;s are not the same state.
            </p>
          </div>
        </section>
  )
}
