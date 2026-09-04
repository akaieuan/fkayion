import { PixelHead } from '@/components/features/brand/pixel-head'
import { label } from '@/components/features/aka-style/shared'

/** The family: same grammar, different subtraction. Moved verbatim from app/aka-style/marks/page.tsx. */
export function FamilySection() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">The family</p>
          <h2 className="mt-2 aka-section-title">
            Same grammar, different subtraction
          </h2>
          <p className="aka-standfirst">
            Each studio and product gets its own knockout. That is the entire brand system — the
            engine, the ground, and one shape removed.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: 'disc-aka' as const, name: 'akaBuild', note: 'wordmark void' },
              { icon: 'head' as const, name: 'Circleheads', note: 'figure void' },
              { icon: 'spark' as const, name: 'akaOSS', note: 'sparkle void' },
              { icon: 'gamepad' as const, name: 'Games', note: 'work line' },
            ].map((m) => (
              <div key={m.name} className="aka-card p-4 text-center">
                <div className="flex justify-center">
                  <PixelHead size={84} grid={24} icon={m.icon} still />
                </div>
                <p className="mt-3 text-[12px] text-foreground/85">{m.name}</p>
                <p className={`${label} mt-0.5`}>{m.note}</p>
              </div>
            ))}
          </div>
        </section>
  )
}
