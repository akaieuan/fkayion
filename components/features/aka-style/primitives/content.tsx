import { label } from '@/components/features/aka-style/shared'
import { Spec } from '@/components/features/aka-style/spec'

/** Content: the type roles, code, lists, tables, media frames, the section header. Moved verbatim from app/aka-style/primitives/page.tsx. */
export function ContentSection() {
  return (
        <section className="mt-14 space-y-3">
          <p className="aka-kicker">Content</p>

          {/*
            The type roles, one class each.

            They used to be printed here as the utility strings they were built
            from, and the strings were lying. The theme colours are bare var()
            with no alpha slot, so the /70 on the kicker and the /90 on the
            title never compiled and every call site inherited its ink instead.
            The classes in globals.css are written as the roles actually
            render, with the intent noted beside each, so fixing the alpha slot
            later is a change to those lines and not to a hundred call sites.
          */}
          <Spec name="Kicker" note="uppercase label, 11px, tracked 0.18em; the ink is inherited" cls="aka-kicker">
            <p className="aka-kicker">Section kicker</p>
          </Spec>

          <Spec
            name="Section title"
            note="20px light, tight; mt-2 is the step under a kicker"
            cls="mt-2 aka-section-title"
          >
            <div className="w-full">
              <h3 className="mt-2 aka-section-title">The section title</h3>
            </div>
          </Spec>

          <Spec
            name="Standfirst"
            note="one sentence under the title, saying what the section argues"
            cls="aka-standfirst"
          >
            <div className="w-full">
              <p className="aka-standfirst">
                A standfirst that says what this section argues, in one sentence.
              </p>
            </div>
          </Spec>

          <Spec name="Lead" note="the h3 that opens a write-up block" cls="aka-lead">
            <h3 className="aka-lead">Why keep this page</h3>
          </Spec>

          <Spec
            name="Prose"
            note="15px light on the muted ink, 1.6 leading, paragraphs 2.5rem apart"
            cls="aka-prose"
          >
            <div className="aka-prose w-full">
              <p>
                Body copy is sans and light, and the space between paragraphs is generous enough
                that each one reads as its own thought rather than the next line of the last.
              </p>
              <p>The muted ink is the default. Full ink is for the terms a reader will look for again.</p>
            </div>
          </Spec>

          <Spec name="List" note="the disc list; the spacing stays a utility on the element" cls="aka-list space-y-2">
            {/* Inside the prose it would sit in, so the list carries exactly the string printed. */}
            <div className="aka-prose w-full">
              <ul className="aka-list space-y-2">
                <li>Watch the work first.</li>
                <li>Prototype in code.</li>
                <li>Ship the smallest true thing.</li>
              </ul>
            </div>
          </Spec>

          <Spec
            name="Code"
            note="inline chips and blocks share the muted ground"
            cls={`inline aka-code
block  aka-card-well overflow-x-auto rounded-lg p-4 font-mono text-[11px] leading-relaxed text-foreground/80`}
          >
            <div className="w-full">
              <p className="text-[13px] font-light text-muted-foreground">
                Run <code className="aka-code">pnpm dev</code>{' '}
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
            note="quiet dot markers for prose; the disc list is aka-list, for reference lists"
            cls={`quiet li  flex gap-3 → <span className="mt-[7px] h-1 w-1 rounded-full bg-muted-foreground/40" />
disc     aka-list space-y-2
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
            name="Breakout"
            note="a block that takes the site's width from inside the reading column"
            cls={`block  aka-breakout
width  min(100vw - 3rem, 1180px), the same 1180px as max-w-site
margin calc((100% - width) / 2) on both sides, negative on its own`}
          >
            <div className="w-full">
              <p className="text-[13px] font-light text-muted-foreground">
                Prose keeps the column. A gallery, a card row or a six-up swatch ramp steps out
                to the width the project plates already use, and back in on a phone.
              </p>
            </div>
          </Spec>

          <Spec
            name="Section header"
            note="the page rhythm: kicker, title, standfirst, stacked"
            cls={`kicker aka-kicker
title  mt-2 aka-section-title
stand  aka-standfirst`}
          >
            <div className="w-full">
              <p className="aka-kicker">Section kicker</p>
              <h3 className="mt-2 aka-section-title">
                The section title
              </h3>
              <p className="aka-standfirst">
                A standfirst that says what this section argues, in one sentence.
              </p>
            </div>
          </Spec>
        </section>
  )
}
