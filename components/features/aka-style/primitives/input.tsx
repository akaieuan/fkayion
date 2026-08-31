import { Check, Search } from 'lucide-react'
import { kicker, label } from '@/components/features/aka-style/chrome'
import { Spec } from '@/components/features/aka-style/spec'

/** Input: text fields, choice controls, tabs. Moved verbatim from app/aka-style/primitives/page.tsx. */
export function InputSection() {
  return (
        <section className="mt-14 space-y-3">
          <p className={kicker}>Input</p>

          <Spec
            name="Text fields"
            note="label above, hint below, never placeholder-as-label"
            cls={`label  text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/60
input  w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/40 focus:border-foreground/30 focus:outline-none
hint   mt-1.5 text-[11px] font-light text-muted-foreground/60`}
          >
            <div className="w-full max-w-sm space-y-4">
              <div>
                <p className={label}>Email</p>
                <div className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-muted-foreground/40">
                  you@example.com
                </div>
                <p className="mt-1.5 text-[11px] font-light text-muted-foreground/60">
                  We reply within 48h.
                </p>
              </div>
              <div>
                <p className={label}>Message</p>
                <div className="mt-1.5 h-20 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-muted-foreground/40">
                  Tell us about the project…
                </div>
              </div>
              <div>
                <p className={label}>Search</p>
                <div className="mt-1.5 flex w-full items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
                  <Search className="h-3.5 w-3.5 text-muted-foreground/40" aria-hidden />
                  <span className="text-[13px] text-muted-foreground/40">Filter projects…</span>
                </div>
              </div>
            </div>
          </Spec>

          <Spec
            name="Choice"
            note="square = many, round = one"
            cls={`box     h-4 w-4 rounded border border-border bg-background
checked h-4 w-4 rounded border border-foreground/40 bg-foreground text-background
radio   h-4 w-4 rounded-full border border-border
toggle  h-5 w-9 rounded-full border border-border bg-muted/40 → bg-foreground when on`}
          >
            <div className="w-full space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-4 w-4 items-center justify-center rounded border border-foreground/40 bg-foreground">
                  <Check className="h-3 w-3 text-background" aria-hidden />
                </span>
                <span className="text-[13px] font-light text-foreground/85">Checked option</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="h-4 w-4 rounded border border-border bg-background" />
                <span className="text-[13px] font-light text-muted-foreground">Unchecked option</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-foreground/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                </span>
                <span className="text-[13px] font-light text-foreground/85">Selected radio</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-5 w-9 items-center rounded-full border border-border bg-foreground px-0.5">
                  <span className="ml-auto h-3.5 w-3.5 rounded-full bg-background" />
                </span>
                <span className="text-[13px] font-light text-foreground/85">Toggle on</span>
              </div>
            </div>
          </Spec>

          <Spec
            name="Tabs"
            note="active carries the accent; the rest stay quiet"
            cls={`active   text-primary
inactive text-muted-foreground/50 hover:text-foreground
wrapper  flex flex-wrap items-center gap-x-1 gap-y-1 -ml-2.5`}
          >
            {['projects', 'writing', 'music', 'social'].map((t, i) => (
              <span
                key={t}
                className={`px-2.5 py-1 text-[12px] font-light tracking-wide ${
                  i === 0 ? 'text-primary' : 'text-muted-foreground/50'
                }`}
              >
                {t}
              </span>
            ))}
          </Spec>
        </section>
  )
}
