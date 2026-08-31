import { kicker, card as cardCls } from '@/components/features/aka-style/shared'
import { LAWS as laws } from '@/lib/aka-style'

/** The rules: seven laws stated as constraints. Moved verbatim from app/aka-style/page.tsx. */
export function RulesSection() {
  return (
        <section id="rules" className="scroll-mt-24">
          <p className={kicker}>The rules</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            The design language, stated as constraints
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            Seven laws that hold across every repo. They are deliberately written as constraints
            rather than preferences — a constraint can be checked in review, and it travels to a new
            codebase without me having to be in the room.
          </p>

          <ol className="mt-6 space-y-3">
            {laws.map((l) => (
              <li key={l.n} className={`${cardCls} flex gap-4`}>
                <span className="shrink-0 font-mono text-[11px] text-primary">{l.n}</span>
                <div>
                  <p className="text-[14px] font-light text-foreground/90">{l.rule}</p>
                  <p className="mt-1 text-[12.5px] font-light leading-relaxed text-muted-foreground">
                    {l.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
  )
}
