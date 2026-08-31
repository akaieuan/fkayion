import { PixelHead } from '@/components/features/brand/pixel-head'
import { kicker, label, mono, codeChip as codeCls, card as cell } from '@/components/features/aka-style/shared'

/** In motion: the cycle, with and without startAssembled. Moved verbatim from app/aka-style/faces/page.tsx. */
export function CycleSection() {
  return (
        <section className="mt-16">
          <p className={kicker}>In motion</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            The cycle
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            With <code className={codeCls}>faces</code>, the expression changes during the assembled
            hold — so the mark is never static but never busy either. Blinks fire on their own
            schedule, independent of the expression slot.
          </p>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            The loop&apos;s order is reform, hold, dissolve, and a face is only drawn once the disc
            is whole. So a mark opens on 1.7 seconds of scattered pixels and then the first face
            appears at once, which reads as loading when the mark is the first thing on a page.{' '}
            <code className={codeCls}>startAssembled</code> starts the clock at the top of the hold
            instead. Only that first assemble is skipped; every later loop still dissolves.
          </p>
          <div className={`${cell} mt-6 grid gap-6 sm:grid-cols-2`}>
            {[
              { label: 'faces', node: <PixelHead size={150} grid={24} faces />, code: '<PixelHead grid={24} faces fluid />' },
              {
                label: 'faces + startAssembled',
                node: <PixelHead size={150} grid={24} faces startAssembled />,
                code: '<PixelHead grid={24} faces startAssembled fluid />',
              },
            ].map((v) => (
              <div key={v.label} className="flex flex-col items-center gap-3">
                {v.node}
                <p className={label}>{v.label}</p>
                <p className={`${mono} text-center`}>{v.code}</p>
              </div>
            ))}
          </div>
        </section>
  )
}
