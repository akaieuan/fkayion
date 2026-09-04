import Link from 'next/link'
import { PixelHead } from '@/components/features/brand/pixel-head'
import { AkaMark } from '@/components/features/brand/aka-mark'
import { PixelRoundabout } from '@/components/features/brand/pixel-roundabout'
import { codeChip as code, card as cardCls } from '@/components/features/aka-style/shared'

/** Brand engines: the canvas marks, one grammar. Moved verbatim from app/aka-style/page.tsx. */
export function BrandEnginesSection() {
  return (
        <section id="brand" className="mt-16 scroll-mt-24">
          <p className="aka-kicker">Brand engines</p>
          <h2 className="mt-2 aka-section-title">
            Canvas marks, one grammar
          </h2>
          <p className="aka-standfirst">
            Three engines sharing a single idea: a disc of pixel cells that dissolves and reforms,
            with something knocked out of it. Colour follows <code className={code}>--foreground</code>,
            so they repaint on theme change; each pauses offscreen and renders one still frame under
            reduced motion.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link href="/aka-style/marks" className={`${cardCls} aka-card-lift group`}>
              <div className="flex items-center gap-4">
                <PixelHead size={60} grid={24} icon="disc-aka" still />
                <div>
                  <p className="text-[14px] font-light text-foreground/90">Marks →</p>
                  <p className="mt-0.5 text-[12px] font-light text-muted-foreground">
                    The disc family, variants, dissolve modes, grid range, and the full prop table.
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/aka-style/faces" className={`${cardCls} aka-card-lift group`}>
              <div className="flex items-center gap-4">
                <PixelHead size={60} grid={22} face="wink" still />
                <div>
                  <p className="text-[14px] font-light text-foreground/90">Faces →</p>
                  <p className="mt-0.5 text-[12px] font-light text-muted-foreground">
                    Twenty-six expressions, the named personas, and when a mark may have a face.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-4 space-y-4">
            <div className={cardCls}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="shrink-0">
                  <PixelHead size={150} grid={30} icon="disc-aka" still />
                </div>
                <div>
                  <p className="text-[14px] font-light text-foreground/90">
                    The akaBuild mark <span className="text-muted-foreground/50">· disc-aka</span>
                  </p>
                  <p className="mt-1 text-[12.5px] font-light leading-relaxed text-muted-foreground">
                    A solid disc with the lowercase wordmark subtracted. The glyph samples in
                    normalized space rather than baking to a fixed grid, so one definition serves the
                    favicon, the chrome, and the hero. This is the site&apos;s icon.
                  </p>
                  <p className="mt-1.5 font-mono text-[10.5px] text-muted-foreground/60">
                    {'<PixelHead icon="disc-aka" grid={32} still />'}
                  </p>
                </div>
              </div>
            </div>

            <div className={cardCls}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="shrink-0">
                  <AkaMark size={150} grid={22} />
                </div>
                <div>
                  <p className="text-[14px] font-light text-foreground/90">AkaMark</p>
                  <p className="mt-1 text-[12.5px] font-light leading-relaxed text-muted-foreground">
                    Each reform reveals a discipline rather than a face: AI spark, code brackets, an
                    eighth note, an isometric cube, a terminal prompt, a pen stroke. The dissolve{' '}
                    <em>is</em> the discipline change. The hero it was built for now cycles faces.
                  </p>
                  <p className="mt-1.5 font-mono text-[10.5px] text-muted-foreground/60">
                    {'<AkaMark size grid gap hold speed fluid />'}
                  </p>
                </div>
              </div>
            </div>

            <div className={cardCls}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex shrink-0 items-center gap-3">
                  <PixelHead size={110} grid={20} faces />
                  <PixelHead size={54} grid={14} gap={0.12} icon="aka" still />
                </div>
                <div>
                  <p className="text-[14px] font-light text-foreground/90">
                    PixelHead <span className="text-muted-foreground/50">· ported from circleheads</span>
                  </p>
                  <p className="mt-1 text-[12.5px] font-light leading-relaxed text-muted-foreground">
                    The studio mark: a knocked-out head cycling facial expressions, plus an icon mode
                    that renders any mask from the same grid — here the pixel{' '}
                    <code className={code}>aka</code> wordmark used in this site&apos;s header.
                  </p>
                  <p className="mt-1.5 font-mono text-[10.5px] text-muted-foreground/60">
                    {'<PixelHead faces still icon face shimmer fluid />'}
                  </p>
                </div>
              </div>
            </div>

            <div className={cardCls}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="shrink-0">
                  <PixelRoundabout size={150} />
                </div>
                <div>
                  <p className="text-[14px] font-light text-foreground/90">PixelRoundabout</p>
                  <p className="mt-1 text-[12.5px] font-light leading-relaxed text-muted-foreground">
                    Bartel-Pritchard Square as a live traffic simulation — queueing, merge-yielding,
                    and stop-and-go waves emerging from two rules, painted in the same bit style. The
                    sim is pure and DOM-free; the component owns the clock.
                  </p>
                  <p className="mt-1.5 font-mono text-[10.5px] text-muted-foreground/60">
                    {'<PixelRoundabout size grid gap />'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}
