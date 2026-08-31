import { kicker, label } from '@/components/features/aka-style/shared'
import { Spec } from '@/components/features/aka-style/spec'

/** Content: code, lists, tables, media frames, the section header. Moved verbatim from app/aka-style/primitives/page.tsx. */
export function ContentSection() {
  return (
        <section className="mt-14 space-y-3">
          <p className={kicker}>Content</p>

          <Spec
            name="Code"
            note="inline chips and blocks share the muted ground"
            cls={`inline rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]
block  aka-card-well overflow-x-auto rounded-lg p-4 font-mono text-[11px] leading-relaxed text-foreground/80`}
          >
            <div className="w-full">
              <p className="text-[13px] font-light text-muted-foreground">
                Run <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">pnpm dev</code>{' '}
                and open the app.
              </p>
              <pre className="mt-3 aka-card-well overflow-x-auto rounded-lg p-4 font-mono text-[11px] leading-relaxed text-foreground/80">
                {`npx shadcn@latest add https://www.hitlkit.dev/r/hitl-card.json
→ writes components/hitl/hitl-card.tsx`}
              </pre>
            </div>
          </Spec>

          <Spec
            name="Lists"
            note="em-dash markers, never bullets, for prose lists"
            cls={`quiet li  flex gap-3 → <span className="mt-[7px] h-1 w-1 rounded-full bg-muted-foreground/40" />
disc     list-disc space-y-2 pl-5 marker:text-muted-foreground/50
lead     <span className="text-foreground/85">Term.</span> then body`}
          >
            <ul className="w-full space-y-2.5 text-[13px] font-light leading-relaxed text-muted-foreground">
              {[
                ['Watch the work first', 'research before design'],
                ['Prototype in code', 'working surfaces over mockups'],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                  <span>
                    <span className="text-foreground/85">{t}.</span> {d}
                  </span>
                </li>
              ))}
            </ul>
          </Spec>

          <Spec
            name="Table"
            note="rules only between rows; no zebra, no vertical rules"
            cls={`head  border-b border-border + label class
row   border-b border-border/40
cell  py-2 pr-4 align-top text-[12px] font-light`}
          >
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  {['token', 'value'].map((h) => (
                    <th key={h} className={`${label} pb-2 pr-4 font-medium`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[12px] font-light text-muted-foreground">
                {[
                  ['--background', 'oklch(0.145 0.004 106)'],
                  ['--foreground', 'oklch(0.93 0.003 106)'],
                ].map(([a, b]) => (
                  <tr key={a} className="border-b border-border/40">
                    <td className="py-2 pr-4 font-mono text-[11px] text-foreground/85">{a}</td>
                    <td className="py-2 font-mono text-[11px]">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Spec>

          <Spec
            name="Media frame"
            note="every screenshot gets the same frame + caption"
            cls={`frame   aka-card-well aka-card-media overflow-hidden rounded-lg
caption mt-1.5 text-[11px] font-light text-muted-foreground/70`}
          >
            <div className="w-full max-w-sm">
              <div className="flex h-24 items-center justify-center aka-card-well aka-card-media overflow-hidden rounded-lg">
                <span className="text-[11px] font-light text-muted-foreground/40">16:10 media</span>
              </div>
              <p className="mt-1.5 text-[11px] font-light text-muted-foreground/70">
                A caption states what the frame shows, not that it is a screenshot.
              </p>
            </div>
          </Spec>

          <Spec
            name="Section header"
            note="the page rhythm — kicker, title, standfirst"
            cls={`kicker text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70
title  text-xl font-light tracking-tight text-foreground/90
stand  mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground`}
          >
            <div className="w-full">
              <p className={kicker}>Section kicker</p>
              <h3 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
                The section title
              </h3>
              <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
                A standfirst that says what this section argues, in one sentence.
              </p>
            </div>
          </Spec>
        </section>
  )
}
