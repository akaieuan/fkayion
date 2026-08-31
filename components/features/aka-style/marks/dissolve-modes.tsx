import { PixelHead } from '@/components/features/brand/pixel-head'
import { kicker, label } from '@/components/features/aka-style/chrome'

/** Motion: the four dissolve modes. Moved verbatim from app/aka-style/marks/page.tsx. */
export function DissolveModesSection() {
  return (
        <section className="mt-16">
          <p className={kicker}>Motion</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            Four dissolve modes
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            The mark decays and reforms on a loop. The mode sets the order cells leave: by row, by
            radius, at random, or in glitch blocks. All four move cells through space — none of them
            fade opacity, per the motion rule.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(['ash', 'explode', 'scatter', 'glitch'] as const).map((m) => (
              <div key={m} className="aka-card p-4 text-center">
                <div className="flex justify-center">
                  <PixelHead size={92} grid={22} icon="disc-aka" mode={m} />
                </div>
                <p className={`${label} mt-3`}>mode = {m}</p>
              </div>
            ))}
          </div>
        </section>
  )
}
