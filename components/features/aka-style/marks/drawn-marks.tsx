import { BlockpadMark } from '@/components/ui/blockpad-mark'
import { CovartMark } from '@/components/ui/covart-mark'
import { BodyLogMark } from '@/components/product-replicas/bodylog/bodylog-mark'
import { kicker, label, mono, card as cell } from '@/components/features/aka-style/shared'

/** Outside the engine: the three drawn marks and the palette convention. Moved verbatim from app/aka-style/marks/page.tsx. */
export function DrawnMarksSection() {
  return (
        <section className="mt-16">
          <p className={kicker}>Outside the engine</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            Drawn marks
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            Not every product mark is a knockout. Three ship artwork of their own, and it is
            transcribed into an SVG here rather than exported as a bitmap, because the same mark has
            to survive an 18px specimen and a 300px plate on one page, and because a resampled
            squircle goes to mush at the small end.
          </p>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            All three are server components. A mark is a static drawing, so none of them should cost
            a client bundle.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                art: <BlockpadMark size={92} />,
                name: 'BlockpadMark',
                note: 'Two masters, palette in CSS',
              },
              {
                art: <BodyLogMark size={92} title="" />,
                name: 'BodyLogMark',
                note: 'Five weeks of the logging grid',
              },
              { art: <CovartMark size={92} />, name: 'CovartMark', note: 'Its own ground' },
            ].map((m) => (
              <div key={m.name} className={`${cell} flex flex-col items-center gap-3`}>
                {m.art}
                <p className="text-[12px] text-foreground/85">{m.name}</p>
                <p className={`${label} text-center`}>{m.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 aka-card-well px-5 py-4">
            <p className={label}>The convention</p>
            <p className="mt-2 text-[13.5px] font-light leading-relaxed text-foreground/85">
              A mark with a value per theme keeps its palette in CSS custom properties, not in the
              component. Blockpad ships a dark master and a light one, and reading the theme in
              order to pick would make a static drawing a client component for no other reason. So
              the drawing is one SVG whose fills are <code className={mono}>var(--bp-*)</code>, and
              the browser picks.
            </p>
            <p className="mt-2 text-[13.5px] font-light leading-relaxed text-foreground/85">
              The same move covers the pixel engine&apos;s face accents, which arrived from the
              handoff as literal hex tuned for a dark ground:{' '}
              <code className={mono}>--pixel-face-*</code> resolves them per theme, and the hex stays
              in the table as the record of what the design says.
            </p>
          </div>
        </section>
  )
}
