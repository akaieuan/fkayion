import { kicker, label, card as cardCls } from '@/components/features/aka-style/chrome'

/** Type: the ramp. Moved verbatim from app/aka-style/foundations/page.tsx. */
export function TypeRampSection() {
  return (
        <section className="mt-16">
          <p className={kicker}>Type</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">The ramp</h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            One family, four weights, and a ramp that leans light. Display sizes get{' '}
            <span className="text-foreground/85">extralight</span> with negative tracking; small text
            gets <span className="text-foreground/85">medium</span> with positive tracking. The
            inversion is deliberate — it&apos;s what makes small type read as a label rather than
            shrunken body copy.
          </p>
          <div className={`${cardCls} mt-6 space-y-4`}>
            {[
              ['Display', 'text-[clamp(1.7rem,5vw,2.4rem)] font-extralight tracking-tight', 'Page title'],
              ['Title', 'text-xl font-light tracking-tight', 'Section title'],
              ['Body', 'text-[13px] font-light leading-relaxed', 'The default paragraph, set light for long-form comfort.'],
              ['Small', 'text-[12px] font-light', 'Captions, secondary detail.'],
              ['Kicker', 'text-[11px] font-medium uppercase tracking-[0.18em]', 'SECTION LABEL'],
              ['Mono', 'font-mono text-[11px]', 'const token = value'],
            ].map(([n, cls, sample]) => (
              <div key={n as string} className="flex flex-col gap-1 border-b border-border/40 pb-3 last:border-0 last:pb-0">
                <div className="flex items-baseline justify-between gap-4">
                  <span className={label}>{n}</span>
                  <span className="font-mono text-[10px] text-muted-foreground/50">{cls}</span>
                </div>
                <p className={`${cls as string} text-foreground/85`}>{sample}</p>
              </div>
            ))}
          </div>
        </section>
  )
}
