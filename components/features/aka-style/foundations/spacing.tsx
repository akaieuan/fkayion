import { kicker, card as cardCls } from '@/components/features/aka-style/chrome'
import { Row, Table } from '@/components/features/aka-style/foundations/token-table'

/** Space: the rhythm, six steps of a 4px base. Moved verbatim from app/aka-style/foundations/page.tsx. */
export function SpacingSection() {
  return (
        <section className="mt-16">
          <p className={kicker}>Space</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            The rhythm
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            A 4px base, but only six steps are ever used. Sections breathe at 64, cards at 20, and
            related things sit 8–12 apart. Constraint is the point: fewer choices, faster decisions,
            consistent result.
          </p>
          <div className={`${cardCls} mt-6`}>
            <Table>
              {[
                ['gap-2', '8px', 'Icon to label, chip to chip', 8],
                ['gap-3', '12px', 'Buttons in a row, list items', 12],
                ['mt-4', '16px', 'Inside a card, between blocks', 16],
                ['p-5', '20px', 'Card padding — the default', 20],
                ['mt-10', '40px', 'Header to first section', 40],
                ['mt-16', '64px', 'Between sections', 64],
              ].map(([t, v, use, px]) => (
                <Row key={t as string} name={t as string} value={v as string}>
                  <div className="flex items-center gap-3">
                    <span
                      className="block h-2 rounded-sm bg-foreground/25"
                      style={{ width: `${px as number}px` }}
                    />
                    <span className="text-[11px] font-light text-muted-foreground/60">{use}</span>
                  </div>
                </Row>
              ))}
            </Table>
          </div>
        </section>
  )
}
