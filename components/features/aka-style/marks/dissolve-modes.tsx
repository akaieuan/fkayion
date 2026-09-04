import { PixelHead } from '@/components/features/brand/pixel-head'

/** Motion: the four dissolve modes. Moved verbatim from app/aka-style/marks/page.tsx. */
export function DissolveModesSection() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">Motion</p>
          <h2 className="mt-2 aka-section-title">
            Four dissolve modes
          </h2>
          <p className="aka-standfirst">
            The mark decays and reforms on a loop. The mode sets the order cells leave: by row, by
            radius, at random, or in glitch blocks. All four move cells through space: none of them
            fade opacity, per the motion rule.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(['ash', 'explode', 'scatter', 'glitch'] as const).map((m) => (
              <div key={m} className="aka-card p-4 text-center">
                <div className="flex justify-center">
                  <PixelHead size={92} grid={22} icon="disc-aka" mode={m} />
                </div>
                <p className="aka-label mt-3">mode = {m}</p>
              </div>
            ))}
          </div>
        </section>
  )
}
