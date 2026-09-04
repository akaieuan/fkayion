
/** Under it: how a face is drawn. Moved verbatim from app/aka-style/faces/page.tsx. */
export function HowItWorksSection() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">Under it</p>
          <h2 className="mt-2 aka-section-title">
            How a face is drawn
          </h2>
          <ul className="mt-4 space-y-2.5 text-[13px] font-light leading-relaxed text-muted-foreground">
            {[
              ['9×9 sub-grid', 'Each expression is a small bitmap of eye, brow, and mouth cells, parsed once at module load — not per frame.'],
              ['2.9s slot, short morph', 'Expressions hold, then interpolate into the next over a fixed transition window. Nothing cuts.'],
              ['Independent blinks', 'Blink timing runs on its own clock, so the same expression never looks looped.'],
              ['Optional accent', 'A slot can carry one accent colour cell — the only place colour enters a mark.'],
              ['Reduced motion', 'The whole timeline collapses to a single representative frame.'],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                <span>
                  <span className="text-foreground/85">{t}.</span> {d}
                </span>
              </li>
            ))}
          </ul>
        </section>
  )
}
