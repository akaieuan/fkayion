/** What I actually built. Moved verbatim from app/demo/eval-kit/page.tsx. */
export function WhatIBuiltSection() {
  return (
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What I actually built</h2>
            <ul className="list-disc space-y-2.5 pl-5 marker:text-muted-foreground/50">
              <li>
                A <strong className="font-medium text-foreground/85">monorepo with three published npm packages</strong> under the <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@eval-kit</code> scope, with{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">core</code> (runtime, schema, scoring engine, agent adapters),{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">ui</code> (React primitives), and{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">seed-suite</code> (reference YAML tasks). All live on npm under the <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">latest</code> dist-tag.
              </li>
              <li>
                A <strong className="font-medium text-foreground/85">Next.js dashboard</strong> that composes those primitives into a reviewer cockpit: Inbox queue with prioritized triage, run review with keyboard-first scoring, diff view across runs, in-app docs.
              </li>
              <li>
                A <strong className="font-medium text-foreground/85">CLI</strong> with eight commands:{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">run</code>,{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">review</code>,{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">diff</code>,{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">report</code>,{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">init</code>,{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">preflight</code>,{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">ci</code>,{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">export</code>. Each follows the same commander pattern; new commands plug in cleanly.
              </li>
              <li>
                A <strong className="font-medium text-foreground/85">YAML-defined agent profile system</strong> so contributors describe an agent (model, system prompt, tools, max iterations) without writing TypeScript. Two seed profiles ship: <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">claude-research-v1</code> and{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">claude-coding-v1</code>. Custom adapters work via an{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">--adapter ./path.js</code> escape hatch.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Tiered automation that respects the human-gate.</strong> Tier 1 is deterministic auto-scoring (tool-match check, distraction heuristic). Tier 2 is optional LLM pre-fill. Claude drafts scores, the human accepts or overrides, every draft flagged{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">pre_filled: true</code>. Tier 3 is active triage that surfaces low-confidence drafts and pre-fill/auto-score disagreements first.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">CI integration</strong> (
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">eval-kit ci</code>
                ) that gates merges on tier-1 regressions but never auto-fails on golden-truth scores. Those need human judgment.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Training-data export</strong> (
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">eval-kit export</code>
                ) that emits SFT pairs or DPO preference pairs from scored runs. Pre-filled scores are excluded by default.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">OSS hygiene the framework deserved</strong>: issue and PR templates, CODEOWNERS, SECURITY policy, branch protection requiring four CI matrix jobs to pass, four release milestones, fifteen labels, an RFC process, two release tags shipped, npm Trusted Publishing wired up.
              </li>
              <li>
                A <strong className="font-medium text-foreground/85">published roadmap and RFC</strong> for v0.4 (multi-reviewer + inter-rater agreement, standalone <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">npx</code> dashboard) and v0.5 (the human-gated agent-to-agent training flywheel, RFC 0001, accepted).
              </li>
            </ul>
          </section>
  )
}
