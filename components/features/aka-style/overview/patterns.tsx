import { PixelHead } from '@/components/features/brand/pixel-head'
import { label, card as cardCls } from '@/components/features/aka-style/shared'

/** Patterns: compositions that repeat. Moved verbatim from app/aka-style/page.tsx. */
export function PatternsSection() {
  return (
        <section id="patterns" className="mt-16 scroll-mt-24">
          <p className="aka-kicker">Patterns</p>
          <h2 className="mt-2 aka-section-title">
            Compositions that repeat
          </h2>
          <p className="aka-standfirst">
            Where the primitives combine into something reusable. These are the shapes that get
            copied into a new repo first.
          </p>

          <div className="mt-6 space-y-4">
            <div className={cardCls}>
              <p className={label}>Section header — kicker, title, standfirst</p>
              <div className="mt-3 border-l border-border/60 pl-4">
                <p className="aka-kicker">Selected work · 01</p>
                <p className="mt-1.5 aka-section-title">
                  Ubik Studio
                </p>
                <p className="mt-1 text-[13px] font-light text-muted-foreground">
                  Co-founder · Desktop AI research platform · 2023–2026
                </p>
              </div>
            </div>

            <div className={cardCls}>
              <p className={label}>Media figure — bordered frame, caption below</p>
              <figure className="mt-3">
                <div className="flex aspect-[16/10] w-full items-center justify-center aka-card-well aka-card-media overflow-hidden rounded-lg">
                  <PixelHead size={120} grid={18} faces />
                </div>
                <figcaption className="mt-1.5 text-[11px] font-light text-muted-foreground/70">
                  Captions describe what is happening in the frame, not what the thing is called.
                </figcaption>
              </figure>
            </div>

            <div className={cardCls}>
              <p className={label}>Row item — the list unit behind every index</p>
              <div className="mt-3 space-y-3">
                {[
                  { t: 'Hologram', ty: 'Open source · Dev tool', d: 'Live observability for Blender → glTF pipelines.' },
                  { t: 'eval-kit', ty: 'Open source · Write-up', d: 'Agent evaluation where humans score, not LLMs.' },
                ].map((r) => (
                  <div key={r.t}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[14px] text-foreground/90">{r.t}</span>
                      <span className={label}>{r.ty}</span>
                    </div>
                    <p className="mt-0.5 text-[12.5px] font-light text-muted-foreground">{r.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
  )
}
