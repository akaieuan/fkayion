import { PixelHead } from '@/components/features/brand/pixel-head'
import { kicker, label, codeChip as codeCls, card as cell } from '@/components/features/aka-style/chrome'

/** Entrance: once, shimmer, still. Moved verbatim from app/aka-style/faces/page.tsx. */
export function EntranceSection() {
  return (
        <section className="mt-16">
          <p className={kicker}>Entrance</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            Assemble once, then hold
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            For marks that should announce themselves and then get out of the way:{' '}
            <code className={codeCls}>once</code> assembles on first view and stops.{' '}
            <code className={codeCls}>shimmer</code> adds a ~3Hz twinkle on ~4% of cells — enough to
            keep it alive in peripheral vision without asking for attention.
          </p>
          <div className={`${cell} mt-6`}>
            <div className="flex flex-wrap items-center justify-center gap-12 py-2">
              <div className="flex flex-col items-center gap-2.5">
                <PixelHead size={110} grid={22} once />
                <span className={label}>once</span>
              </div>
              <div className="flex flex-col items-center gap-2.5">
                <PixelHead size={110} grid={22} once shimmer />
                <span className={label}>once + shimmer</span>
              </div>
              <div className="flex flex-col items-center gap-2.5">
                <PixelHead size={110} grid={22} still />
                <span className={label}>still</span>
              </div>
            </div>
          </div>
        </section>
  )
}
