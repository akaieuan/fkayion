import { label } from '@/components/features/aka-style/shared'
import { SWATCHES as swatches, ACCENTS as accents } from '@/lib/aka-style'

/** Color: the token swatches and the accent set. Moved verbatim from app/aka-style/page.tsx. */
export function ColorSection() {
  return (
        <section id="color" className="mt-16 scroll-mt-24">
          <p className="aka-kicker">Color</p>
          <h2 className="mt-2 aka-section-title">
            Tokens, in OKLCH
          </h2>
          <p className="aka-standfirst">
            Every surface resolves from a CSS variable, so light and dark are one definition rather
            than two stylesheets. Toggle the theme and this section repaints itself.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {swatches.map((sw) => (
              <div key={sw.name} className="overflow-hidden rounded-lg border border-border">
                <div className={`h-14 w-full ${sw.cls}`} />
                <div className="aka-card-rule border-t px-2.5 py-2">
                  <p className="text-[11px] text-foreground/85">{sw.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground/60">{sw.varName}</p>
                </div>
              </div>
            ))}
          </div>

          <p className={`${label} mt-6`}>Accent set — carried by the canvas engines</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {accents.map((a) => (
              <div key={a.name} className="flex items-center gap-2 rounded-md border border-border/60 px-2 py-1">
                <span
                  className="h-3 w-3 rounded-full border border-border/40"
                  style={{ background: a.v }}
                />
                <span className="font-mono text-[10.5px] text-muted-foreground">{a.name}</span>
              </div>
            ))}
          </div>
        </section>
  )
}
