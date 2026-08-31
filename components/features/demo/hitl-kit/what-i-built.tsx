/** What I actually built. Moved verbatim from app/demo/hitl-kit/page.tsx. */
export function WhatIBuiltSection() {
  return (
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What I actually built</h2>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                <span className="text-foreground/85">An AI Measurement Problem (paper).</span> A
                perspective piece synthesizing benchmark saturation, cognitive neuroscience, uncertainty
                quantification, and enterprise deployment data into the Assist-Not-Complete paradigm.
                Rendered live on the site from a single markdown source, with a sticky table of contents
                and editorial typography.
              </li>
              <li>
                <span className="text-foreground/85">Nineteen HITL primitives.</span> Among them: Interrupt
                Card, Subagent Status, MiniTrace, AI Generation Scale, Context Chips, QA Flow, Writing
                Agent, Research Agent, Batch Queue, Search Result Card, Approve/Reject Row. Each one is the
                physical embodiment of a specific claim from the paper.
              </li>
              <li>
                <span className="text-foreground/85">Shadcn registry with nineteen endpoints.</span>{' '}
                registry.json, a build pipeline (pnpm registry:build), and nineteen JSON manifests served
                at hitlkit.dev/r/*.json. Transitive dependencies resolve correctly. End-to-end tested:
                anyone on the open internet can run{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">
                  npx shadcn@latest add https://www.hitlkit.dev/r/hitl-card.json
                </code>{' '}
                and get a working install.
              </li>
              <li>
                <span className="text-foreground/85">The site itself.</span> Next.js 16, Tailwind CSS v4,
                TypeScript, React 19. Dark-mode-first with Geist and JetBrains Mono. Four routes: a
                landing that frames the thesis, a live component showcase, a markdown paper renderer, and
                a registry-install reference page with copy-button commands for every primitive.
              </li>
              <li>
                <span className="text-foreground/85">A taxonomy, not a grab-bag.</span> Every primitive
                traces to a named research claim: MiniTrace instantiates the supporting-facts requirement
                from HotpotQA (Yang 2018), the AI Generation Scale operationalises the scaffolding
                principle from Dhillon 2024, the Interrupt Card is the agency-preservation boundary from
                §3.1. The library is the paper, made clickable.
              </li>
            </ul>
          </section>
  )
}
