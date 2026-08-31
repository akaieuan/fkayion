import { kicker, label, codeChip as code, card as cardCls } from '@/components/features/aka-style/chrome'

/** Type: the scale, one specimen per step. Moved verbatim from app/aka-style/page.tsx. */
export function TypeSection() {
  return (
        <section id="type" className="mt-16 scroll-mt-24">
          <p className={kicker}>Type</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">The scale</h2>

          <div className={`${cardCls} mt-6 space-y-5`}>
            <div>
              <p className={label}>Kicker · 11px / 0.18em / uppercase / medium</p>
              <p className={`${kicker} mt-1.5`}>Product design · Technical anthropology</p>
            </div>
            <div className="h-px bg-border/60" />
            <div>
              <p className={label}>Display · clamp(1.7–2.4rem) / extralight / tight</p>
              <p className="mt-1.5 text-[clamp(1.7rem,5vw,2.4rem)] font-extralight leading-none tracking-tight text-foreground/90">
                I build tools and create art.
              </p>
            </div>
            <div className="h-px bg-border/60" />
            <div>
              <p className={label}>Section head · 20px / light</p>
              <p className="mt-1.5 text-xl font-light tracking-tight text-foreground/90">
                The human-in-the-loop architecture
              </p>
            </div>
            <div className="h-px bg-border/60" />
            <div>
              <p className={label}>Body · 15px / light / 1.6</p>
              <p className="mt-1.5 text-[15px] font-light leading-relaxed text-muted-foreground">
                Human control wasn&apos;t a confirmation dialog bolted on at the end — it was
                load-bearing architecture, designed in at three layers.
              </p>
            </div>
            <div className="h-px bg-border/60" />
            <div>
              <p className={label}>Caption · 11px / light / muted-70</p>
              <p className="mt-1.5 text-[11px] font-light text-muted-foreground/70">
                The three-pane workspace — agent chat, the source paper, and an evidence panel.
              </p>
            </div>
            <div className="h-px bg-border/60" />
            <div>
              <p className={label}>Mono inline · 11px on muted fill</p>
              <p className="mt-1.5 text-[13px] font-light text-muted-foreground">
                Citations resolved to <code className={code}>[noteId:page]</code> via{' '}
                <code className={code}>runciter.dispatch(event)</code>.
              </p>
            </div>
          </div>
        </section>
  )
}
