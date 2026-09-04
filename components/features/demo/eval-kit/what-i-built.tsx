/** What I actually built. Moved verbatim from app/demo/eval-kit/page.tsx. */
export function WhatIBuiltSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">What I actually built</h2>
            <ul className="aka-list space-y-2.5">
              <li>
                A <strong className="font-medium text-foreground/85">monorepo with three published npm packages</strong> under the <code className="aka-code">@eval-kit</code> scope, with{' '}
                <code className="aka-code">core</code> (runtime, schema, scoring engine, agent adapters),{' '}
                <code className="aka-code">ui</code> (React primitives), and{' '}
                <code className="aka-code">seed-suite</code> (reference YAML tasks). All live on npm under the <code className="aka-code">latest</code> dist-tag.
              </li>
              <li>
                A <strong className="font-medium text-foreground/85">Next.js dashboard</strong> that composes those primitives into a reviewer cockpit: Inbox queue with prioritized triage, run review with keyboard-first scoring, diff view across runs, in-app docs.
              </li>
              <li>
                A <strong className="font-medium text-foreground/85">CLI</strong> with eight commands:{' '}
                <code className="aka-code">run</code>,{' '}
                <code className="aka-code">review</code>,{' '}
                <code className="aka-code">diff</code>,{' '}
                <code className="aka-code">report</code>,{' '}
                <code className="aka-code">init</code>,{' '}
                <code className="aka-code">preflight</code>,{' '}
                <code className="aka-code">ci</code>,{' '}
                <code className="aka-code">export</code>. Each follows the same commander pattern; new commands plug in cleanly.
              </li>
              <li>
                A <strong className="font-medium text-foreground/85">YAML-defined agent profile system</strong> so contributors describe an agent (model, system prompt, tools, max iterations) without writing TypeScript. Two seed profiles ship: <code className="aka-code">claude-research-v1</code> and{' '}
                <code className="aka-code">claude-coding-v1</code>. Custom adapters work via an{' '}
                <code className="aka-code">--adapter ./path.js</code> escape hatch.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Tiered automation that respects the human-gate.</strong> Tier 1 is deterministic auto-scoring (tool-match check, distraction heuristic). Tier 2 is optional LLM pre-fill. Claude drafts scores, the human accepts or overrides, every draft flagged{' '}
                <code className="aka-code">pre_filled: true</code>. Tier 3 is active triage that surfaces low-confidence drafts and pre-fill/auto-score disagreements first.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">CI integration</strong> (
                <code className="aka-code">eval-kit ci</code>
                ) that gates merges on tier-1 regressions but never auto-fails on golden-truth scores. Those need human judgment.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Training-data export</strong> (
                <code className="aka-code">eval-kit export</code>
                ) that emits SFT pairs or DPO preference pairs from scored runs. Pre-filled scores are excluded by default.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">OSS hygiene the framework deserved</strong>: issue and PR templates, CODEOWNERS, SECURITY policy, branch protection requiring four CI matrix jobs to pass, four release milestones, fifteen labels, an RFC process, two release tags shipped, npm Trusted Publishing wired up.
              </li>
              <li>
                A <strong className="font-medium text-foreground/85">published roadmap and RFC</strong> for v0.4 (multi-reviewer + inter-rater agreement, standalone <code className="aka-code">npx</code> dashboard) and v0.5 (the human-gated agent-to-agent training flywheel, RFC 0001, accepted).
              </li>
            </ul>
          </section>
  )
}
