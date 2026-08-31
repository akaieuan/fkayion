import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { kicker } from '@/components/features/aka-style/chrome'
import { Spec } from '@/components/features/aka-style/spec'

/** Action: buttons, sizes, links. Moved verbatim from app/aka-style/primitives/page.tsx. */
export function ButtonsSection() {
  return (
        <section className="space-y-3">
          <p className={kicker}>Action</p>

          <Spec
            name="Buttons"
            note="one primary per view"
            cls={`primary   inline-flex items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90
secondary inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40
quiet     text-[13px] font-light text-muted-foreground/70 transition-colors hover:text-foreground`}
          >
            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background">
              Primary action
              <ArrowRight className="h-4 w-4 opacity-80" aria-hidden />
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground">
              Secondary
              <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
            </span>
            <span className="text-[13px] font-light text-muted-foreground/70">Quiet link →</span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground/40">
              Disabled
            </span>
          </Spec>

          <Spec
            name="Sizes"
            note="py-1.5 / py-2.5 / py-3"
            cls={`sm  rounded-md px-3 py-1.5 text-[12px]
md  rounded-lg px-4 py-2.5 text-sm     ← default
lg  rounded-lg px-5 py-3 text-[15px]`}
          >
            {[
              ['sm', 'rounded-md px-3 py-1.5 text-[12px]'],
              ['md', 'rounded-lg px-4 py-2.5 text-sm'],
              ['lg', 'rounded-lg px-5 py-3 text-[15px]'],
            ].map(([n, c]) => (
              <span
                key={n}
                className={`inline-flex items-center border border-border bg-foreground font-medium text-background ${c}`}
              >
                Button {n}
              </span>
            ))}
          </Spec>

          <Spec
            name="Links"
            note="underline offset 3px, border-colored rule"
            cls={`body  underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50
accent text-primary underline decoration-border underline-offset-[3px]
nav    text-muted-foreground transition-colors hover:text-foreground`}
          >
            <span className="text-[13px] font-light text-muted-foreground underline decoration-border underline-offset-[3px]">
              An inline body link
            </span>
            <span className="text-[13px] font-light text-primary underline decoration-border underline-offset-[3px]">
              An accent link
            </span>
            <span className="text-[13px] font-light text-muted-foreground">Nav item</span>
          </Spec>
        </section>
  )
}
