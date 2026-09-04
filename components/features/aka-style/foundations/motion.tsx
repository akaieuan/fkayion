import { card as cardCls } from '@/components/features/aka-style/shared'
import { Row, Table } from '@/components/features/aka-style/foundations/token-table'

/** Motion: timings and the rule. Moved verbatim from app/aka-style/foundations/page.tsx. */
export function MotionSection() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">Motion</p>
          <h2 className="mt-2 aka-section-title">
            Timings &amp; the rule
          </h2>
          <p className="aka-standfirst">
            One rule governs everything, including the brand engines:{' '}
            <span className="text-foreground/85">energy moves space, never brightness</span> — scale,
            position, displacement. No strobe, no flash, no opacity pulsing. It keeps long loops
            watchable and the whole system safe for photosensitive viewers.
          </p>
          <div className={`${cardCls} mt-6`}>
            <Table>
              {[
                ['150ms', 'Hover, focus — color only', 'transition-colors'],
                ['200ms', 'Tab content swap', 'animate-in fade-in duration-200'],
                ['300ms', 'Image hover scale', 'transition-transform duration-300'],
                ['450ms', 'Scroll reveal', 'opacity + translateY(16px)'],
                ['700ms', 'Hero entrance', 'motion-safe:animate-in fade-in slide-in-from-bottom-2'],
                ['120ms', 'Stagger step', 'animationDelay: step * 120ms'],
              ].map(([t, use, cls]) => (
                <Row key={t as string} name={t as string} value={cls as string}>
                  <span className="text-[11px] font-light text-muted-foreground/60">{use}</span>
                </Row>
              ))}
            </Table>
            <p className="mt-4 text-[11.5px] font-light leading-relaxed text-muted-foreground/70">
              <span className="text-foreground/80">Always gated.</span> Entrances use{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[10.5px]">motion-safe:</code>{' '}
              and canvas loops check{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[10.5px]">
                prefers-reduced-motion
              </code>{' '}
              before starting — reduced motion renders one representative frame, never a frozen blank.
            </p>
          </div>
        </section>
  )
}
