import { PixelHead } from '@/components/features/brand/pixel-head'
import { mono, card as cell } from '@/components/features/aka-style/shared'

/** Wordmarks: mask-drawn lettering. Moved verbatim from app/aka-style/marks/page.tsx. */
export function WordmarksSection() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">Wordmarks</p>
          <h2 className="mt-2 aka-section-title">
            Mask-drawn lettering
          </h2>
          <p className="aka-standfirst">
            For titles whose mark is text, the glyph is drawn directly instead of subtracted: a
            hand-authored bitmap on the same cell grid, so lettering sits in the identical pixel
            rhythm as the discs.
          </p>

          <div className={`${cell} mt-6`}>
            <div className="flex flex-wrap items-center justify-center gap-12 py-3">
              {(['aka', 'nyz', 'pogo'] as const).map((w) => (
                <div key={w} className="flex flex-col items-center gap-2.5">
                  <PixelHead size={64} grid={14} gap={0.12} icon={w} still />
                  <span className="aka-label">icon = {w}</span>
                </div>
              ))}
            </div>
            <p className={`${mono} mt-4 text-center`}>
              {'<PixelHead icon="aka" size={30} grid={14} gap={0.12} still />  // site header'}
            </p>
          </div>
        </section>
  )
}
