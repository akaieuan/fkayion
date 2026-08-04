import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

const extLink =
  'underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50'

export const metadata = {
  title: 'eval-kit: Human scoring for research agents | akaBuild',
  description:
    'The scoring cockpit for research agents: Zod schema-first monorepo, @eval-kit packages, Next.js dashboard, CLI, human 0-3 rubric, OSS release discipline. Pre-1.0, v0.3.1 stable.',
}

export default function EvalKitProjectPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        <header className="mb-6">
          <p
            className="text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-balance text-foreground/90"
            aria-label="eval-kit"
          >
            evalkit
          </p>
        </header>

        <p className="text-[13px] font-light leading-relaxed text-muted-foreground">
          <a
            href="https://github.com/akaieuan/eval-kit"
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            github.com/akaieuan/eval-kit
            <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5 align-[-0.1em] opacity-70" aria-hidden />
          </a>
          <span className="text-muted-foreground/50"> · </span>
          <a
            href="https://www.npmjs.com/package/@eval-kit/core"
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            @eval-kit/core on npm
            <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5 align-[-0.1em] opacity-70" aria-hidden />
          </a>
          <span className="text-muted-foreground/50"> · </span>
          <a
            href="https://github.com/akaieuan/eval-kit/blob/main/docs/BRIEF.md"
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            Read the brief
            <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5 align-[-0.1em] opacity-70" aria-hidden />
          </a>
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="https://github.com/akaieuan/eval-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            GitHub
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          <a
            href="https://www.npmjs.com/package/@eval-kit/core"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            @eval-kit on npm
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
          <a
            href="https://github.com/akaieuan/eval-kit/blob/main/docs/BRIEF.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            Read the brief
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
        </div>
        <p className="mt-3 text-[12px] font-light text-muted-foreground/80">
          Repo, scoped packages on npm, and the full project brief (philosophy, architecture, §13
          guardrails).
        </p>

        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
          Open source · pre-1.0 · v0.3.1
        </p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          eval-kit
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          The scoring cockpit for research agents. Open source. Pre-1.0. v0.3.1 stable.
        </p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What this is</h2>
            <p>
              eval-kit measures one thing: whether an AI agent actually helps a human do real work, as
              judged by the human. Not whether the agent can solve a synthetic puzzle alone. Not
              whether an LLM-judge says it did well. Whether a person, scoring step-by-step, finds it
              useful.
            </p>
            <p>
              Most eval frameworks (MMLU, SWE-bench, GAIA, AgentBench) measure autonomous task
              completion on synthetic prompts and let an LLM grade the output. eval-kit refuses both
              choices. The seed suite is ported from observed real workflows with real distractors:
              future-dated papers, unverifiable claims, jobs that don&apos;t exist yet. Scores come
              from a human reviewer using a <strong className="font-medium text-foreground/90">0-3 rubric</strong> across <strong className="font-medium text-foreground/90">five dimensions</strong> per
              step. LLM pre-fill is allowed as a draft the human accepts or overrides; it can never
              be the default scorer. If LLM-as-judge becomes the default, the project loses its reason
              to exist.
            </p>
            <p className="text-[14px] text-muted-foreground/95">
              The five dimensions: explainability, agency preservation, long-term capability,
              calibration, collaborative performance.
            </p>
          </section>

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

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why it&apos;s unusual</h2>
            <p>Three things put this outside the eval-framework norm.</p>
            <div className="space-y-3">
              <h3 className="text-[13px] font-medium text-foreground/90">It&apos;s a UI, not a leaderboard</h3>
              <p>
                The product is the scoring cockpit: the keyboard-first inbox where a human reviewer
                can move through fifty steps in an afternoon. Aggregate scores exist but aren&apos;t
                published; the project explicitly forbids benchmark marketing because the differentiator
                is qualitative collaborative performance, not a number.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-[13px] font-medium text-foreground/90">It refuses LLM-as-judge as the default</h3>
              <p>
                Every other eval framework I looked at lets an LLM grade the output because human
                scoring is expensive. eval-kit treats that expense as the point. If the same family
                of model that produced the answer also grades it, the eval inherits the model&apos;s
                blind spots. LLM-as-judge exists in the tool only as an opt-in pre-fill, and every
                score it touches is flagged as such — so a human-scored run and an assisted one are
                never mistaken for each other. The accepted RFC for v0.5&apos;s continuous-learning flywheel doubles down: AI
                agents can <em>propose</em> training updates, but a human must approve each proposal
                before it can feed an export. Auto-approval is named in the spec as a guardrail
                violation that should fork the project, not amend it.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-[13px] font-medium text-foreground/90">It&apos;s pre-1.0 but ships like it isn&apos;t</h3>
              <p>
                v0.3.1 is published with provenance attestations, the release workflow uses{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">pnpm pack</code> +{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">npm publish</code> for OIDC trusted publishing, the <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">main</code> branch
                requires four green CI matrix jobs before any merge, and the CHANGELOG has honest notes
                about what worked and what fell back to a token. It looks like a 1.0 because the
                discipline is what makes a tool depend-on-able, not the version number.
              </p>
            </div>
            <p>
              Related perspective on the same measurement wall:{' '}
              <Link
                href="/demo/hitl-kit"
                className={extLink}
              >
                HITL Kit
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">How I describe the skill set</h2>
            <p>
              This project is the load-bearing example for how I work in TypeScript and AI
              infrastructure right now.
            </p>
            <ul className="list-disc space-y-2.5 pl-5 marker:text-muted-foreground/50">
              <li>
                <strong className="font-medium text-foreground/85">Schema-first design.</strong> Zod schemas
                in <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">packages/core/src/schema.ts</code> are the source of truth for every persisted shape. TS
                types are inferred via <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">z.infer</code>. <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">parseX</code> helpers are the
                only validation entry points. New shapes can&apos;t enter the system without going through
                the schema.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Workspace monorepo discipline.</strong> pnpm
                workspaces, ESM-only with explicit <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">.js</code> extensions, <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">noUncheckedIndexedAccess</code> on, tsup builds, vitest
                tests. Each package has its own <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">package.json</code>, <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">tsconfig</code>, and CI step.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Anthropic SDK at production-shape.</strong> Real
                tool-use loop with prompt caching on system + tool blocks, max-iteration guards, and a
                structured pre-fill helper that returns a typed <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">StepScore</code> draft for human review.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">OSS-grade release engineering.</strong> GitHub
                Actions matrix CI on Ubuntu and macOS across Node 20 and 22. Trusted Publishing (OIDC)
                with provenance attestations; the failure mode where it didn&apos;t match per-package
                permissions got documented in the CHANGELOG, not hidden.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Design that pushes back.</strong> I keep a
                §13 &quot;Philosophical guardrails&quot; section in the brief that names the rules a
                feature request can&apos;t violate. When I caught myself drifting toward an LLM-judge
                auto-approval flow during v0.5 design, the rule said no. The project loses its reason
                to exist if I crossed it. I rejected my own suggestion.
              </li>
            </ul>
          </section>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <p className="text-[14px] leading-relaxed text-foreground/85">
              The scoring cockpit is the product: a human gate on every label that matters, automation
              that never pretends to replace that gate, and release discipline that matches the
              seriousness of the claim.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
