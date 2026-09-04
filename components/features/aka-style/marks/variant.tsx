import { PixelHead } from '@/components/features/brand/pixel-head'
import { label, card as cell } from '@/components/features/aka-style/shared'

/** Variant: negative and figure. Moved verbatim from app/aka-style/marks/page.tsx. */
export function VariantSection() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">Variant</p>
          <h2 className="mt-2 aka-section-title">
            Negative and figure
          </h2>
          <p className="aka-standfirst">
            The default is <span className="text-foreground/85">negative</span> — a filled disc with
            the shape cut out. <span className="text-foreground/85">Figure</span> inverts it: the
            shape is drawn, wrapped in a thin ring. Negative reads better small; figure reads better
            when the shape itself is the message.
          </p>

          <div className={`${cell} mt-6`}>
            <div className="flex flex-wrap items-center justify-center gap-12 py-2">
              {(['negative', 'figure'] as const).map((v) => (
                <div key={v} className="flex flex-col items-center gap-2.5">
                  <PixelHead size={110} grid={22} icon="head" variant={v} still />
                  <span className={label}>variant = {v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
  )
}
