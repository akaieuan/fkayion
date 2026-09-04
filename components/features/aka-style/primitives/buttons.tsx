import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Spec } from '@/components/features/aka-style/spec'

/** Action: buttons, sizes, links. Moved verbatim from app/aka-style/primitives/page.tsx. */
export function ButtonsSection() {
  return (
        <section className="space-y-3">
          <p className="aka-kicker">Action</p>

          {/*
            The two buttons the site ships, by name.

            This spec used to print a larger pair, px-4 py-2.5 at text-sm, that
            appeared nowhere on the site: every write-up's call to action is
            the 13px pair below. The pair is two classes in globals.css now, so
            the specimen and the pages read the same definition and cannot
            disagree again. The quiet link stays a string, since it is a text
            treatment rather than a control.
          */}
          <Spec
            name="Buttons"
            note="one primary per view"
            cls={`primary   aka-button
secondary aka-button-secondary
quiet     text-[13px] font-light text-muted-foreground/70 transition-colors hover:text-foreground`}
          >
            <span className="aka-button">
              Primary action
              <ArrowRight className="h-4 w-4 opacity-80" aria-hidden />
            </span>
            <span className="aka-button-secondary">
              Secondary
              <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
            </span>
            <span className="text-[13px] font-light text-muted-foreground/70 transition-colors hover:text-foreground">
              Quiet link →
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground/40">
              Disabled
            </span>
          </Spec>

          <Spec
            name="Sizes"
            note="py-1.5 / py-2.5 / py-3"
            cls={`sm  rounded-md px-3 py-1.5 text-[12px]
md  rounded-lg px-3.5 py-2 text-[13px] ← default, what aka-button is
lg  rounded-lg px-5 py-3 text-[15px]`}
          >
            {[
              ['sm', 'rounded-md px-3 py-1.5 text-[12px]'],
              ['md', 'rounded-lg px-3.5 py-2 text-[13px]'],
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
            note="quiet where the ink around it is already muted (bylines, captions, lists); ink inside running prose"
            cls={`quiet  aka-quiet-link
accent text-primary underline decoration-border underline-offset-[3px]
nav    text-muted-foreground transition-colors hover:text-foreground
ink    aka-ink-link   ← full ink at rest, the select accent on hover`}
          >
            <span className="aka-quiet-link text-13 font-light text-muted-foreground">
              A quiet link
            </span>
            <span className="text-[13px] font-light text-primary underline decoration-border underline-offset-[3px]">
              An accent link
            </span>
            <span className="text-[13px] font-light text-muted-foreground transition-colors hover:text-foreground">
              Nav item
            </span>
            {/*
              The accent link prints no hover, so the swatch carries none: a
              live example that does more than its class string says is the
              thing this section exists to prevent.
            */}
            <span className="aka-ink-link text-[13px] font-light">An ink link</span>
          </Spec>
        </section>
  )
}
