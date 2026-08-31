import { SWATCHES, ACCENTS } from '@/lib/aka-style'
import { MEASURE, kicker, sectionH, card } from '@/components/features/aka-style/writeup/chrome'

/** Color: the live tokens as swatches, and the accent set the engines carry. */
export function Color() {
  return (
        <section className="mt-16">
          <p className={kicker}>Color</p>
          <h2 className={sectionH}>Tokens, in OKLCH</h2>
          <p className={`mt-3 ${MEASURE} text-[15px] font-light leading-relaxed text-muted-foreground`}>
            Every surface resolves from a CSS variable, so light and dark are one definition rather
            than two stylesheets. These swatches are the live tokens: switch the theme and this row
            repaints itself, because there is nothing here but the variables the rest of the site
            uses.
          </p>

          <ul className="mt-6 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-6">
            {SWATCHES.map((sw) => (
              <li key={sw.name} className={`${card} overflow-hidden`}>
                <div className={`aka-card-rule h-16 w-full border-b ${sw.cls}`} />
                <div className="px-3 py-2">
                  <p className="text-[11px] text-foreground/85">{sw.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground/60">{sw.varName}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
            Accent set, carried by the canvas engines
          </p>
          <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
            {ACCENTS.map((a) => (
              <li
                key={a.name}
                className={`${card} flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] text-muted-foreground`}
              >
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ background: a.v }}
                  aria-hidden
                />
                {a.name}
              </li>
            ))}
          </ul>
        </section>
  )
}
