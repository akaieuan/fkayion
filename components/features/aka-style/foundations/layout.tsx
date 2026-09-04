import { card as cardCls } from '@/components/features/aka-style/shared'
import { Row, Table } from '@/components/features/aka-style/foundations/token-table'

/** Layout: widths and breakpoints. Moved verbatim from app/aka-style/foundations/page.tsx. */
export function LayoutSection() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">Layout</p>
          <h2 className="mt-2 aka-section-title">
            Widths &amp; breakpoints
          </h2>
          <div className={`${cardCls} mt-6`}>
            <Table>
              {[
                ['max-w-2xl', '672px', 'Write-ups: one column of prose'],
                ['max-w-3xl', '768px', 'Reference pages, galleries'],
                ['max-w-site', '1180px', 'Landing, project index'],
                ['site-inset', 'px-5 → px-16', 'The universal gutter, widening by breakpoint'],
                ['sm:', '640px', 'One column → two'],
                ['md:', '768px', 'Stacked hero → side by side'],
                ['lg:', '1024px', 'Two columns → three'],
              ].map(([t, v, use]) => (
                <Row key={t as string} name={t as string} value={v as string}>
                  <span className="text-11 font-light text-muted-foreground/60">{use}</span>
                </Row>
              ))}
            </Table>
            <p className="mt-4 text-12 font-light leading-relaxed text-muted-foreground/70">
              <span className="text-foreground/80">No device sniffing.</span> Layout responds to
              width; touch-specific behavior responds to{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-11">
                pointer: coarse
              </code>{' '}
              and <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-11">hover</code>.
              There is no <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-11">isMobile</code>{' '}
              anywhere in any repo running this system.
            </p>
          </div>
        </section>
  )
}
