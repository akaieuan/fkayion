import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

const extLink =
  'underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50'

const repoHref = 'https://github.com/akaieuan/inertial-moderation-tool'
const readmeHref = 'https://github.com/akaieuan/inertial-moderation-tool/blob/main/README.md'

export const metadata = {
  title: 'Inertial: HITL AI content moderation | aka4uh',
  description:
    'Open source, pre-alpha. Multimodal AI moderation with human-in-the-loop review for Mastodon, Bluesky, Lemmy, Discord, Slack, and custom apps. Inertials emit structured signals, the Runciter dispatches them, humans decide. Hash-chained audit, per-instance YAML policy, four composable tiers from heuristics to cloud.',
}

export default function InertialProjectPage() {
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
            className="text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-balance lowercase text-foreground/90"
            aria-label="inertial"
          >
            inertial
          </p>
        </header>

        <div className="-mx-6 space-y-3 sm:mx-0">
          <div className="overflow-hidden rounded-xl border border-border/80 bg-muted/10">
            <Image
              src="/inertial-dashboard.png"
              alt="Inertial dashboard: flag activity heatmap, pending queue counts, top-of-queue items"
              width={1024}
              height={611}
              className="block h-auto w-full"
              priority
            />
          </div>
          <div className="overflow-hidden rounded-xl border border-border/80 bg-muted/10">
            <Image
              src="/inertial-queue.png"
              alt="Inertial review queue: per-item signals, per-inertial traces, approve / remove / escalate row, side panel summary"
              width={1024}
              height={611}
              className="block h-auto w-full"
            />
          </div>
        </div>

        <p className="mt-5 text-[13px] font-light leading-relaxed text-muted-foreground">
          <a
            href={repoHref}
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            github.com/akaieuan/inertial-moderation-tool
            <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5 align-[-0.1em] opacity-70" aria-hidden />
          </a>
          <span className="text-muted-foreground/50"> · </span>
          <a
            href={readmeHref}
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            Read the README
            <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5 align-[-0.1em] opacity-70" aria-hidden />
          </a>
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={repoHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            GitHub
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          <a
            href={readmeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            Read the README
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
        </div>
        <p className="mt-3 text-[12px] font-light text-muted-foreground/80">
          Repo, install instructions, the architecture diagram, and the honest capability matrix all live in the README.
        </p>

        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
          Open source · pre-alpha (month 1 of 3)
        </p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          Inertial
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Human-in-the-loop AI content moderation. Inertials emit signals, the Runciter dispatches them, humans decide.
        </p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What this is</h2>
            <p>
              Inertial is open-source AI content moderation with human-in-the-loop review, multimodal across text, image,
              video, and audio. It is built for federated platforms (Mastodon, Bluesky, Lemmy) and centralized ones
              (Discord, Slack, custom apps), and it lets a single operator compose any agent stack — heuristics, local
              models, cloud LLMs — under one auditable pipeline that keeps humans in authority.
            </p>
            <p>
              The vocabulary comes from Philip K. Dick&apos;s <em>Ubik</em> (1969). <strong className="font-medium text-foreground/85">Inertials</strong> are
              the sub-agents — each one neutralizes a class of harmful signal (toxicity, spam, NSFW, identity hate,
              brigading) for the communities it serves. The <strong className="font-medium text-foreground/85">Runciter</strong> is
              the orchestrator that dispatches them. <strong className="font-medium text-foreground/85">Structured signals</strong>{' '}
              are what inertials emit — probability + confidence + evidence pointers, never verdicts. The policy layer
              turns signals into routing decisions; humans turn routing decisions into actions. One rule: inertials emit
              signals; the Runciter dispatches them; humans decide.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What I actually built</h2>
            <ul className="list-disc space-y-2.5 pl-5 marker:text-muted-foreground/50">
              <li>
                <strong className="font-medium text-foreground/85">A monorepo that is two products at once.</strong>{' '}
                The <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@inertial/*</code> toolkit
                handles orchestration, persistence, policy, and HITL primitives. <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@inertial/app</code>{' '}
                is the Electron + React + Tailwind reference dashboard moderators actually click in, built on HITL-KIT
                primitives and shown above.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">A typed signal contract, end to end.</strong>{' '}
                Every cross-package shape is a Zod schema in <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@inertial/schemas</code>{' '}
                — eight of them: <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">ContentEvent</code>,{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">StructuredSignal</code>,{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">AgentTrace</code>,{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">ReviewItem</code>,{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">ReviewDecision</code>,{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">Policy</code>,{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">AuditEntry</code>, and the
                supporting unions. Adding a new inertial or signal type means changing the contract there first.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Runciter, the orchestrator.</strong>{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@inertial/core</code> ships{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">BaseAgent</code> +{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">TraceCollector</code> +{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">InMemoryRunciter</code>. The
                runtime dispatches inertials matching <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">event.modalities</code>,
                aggregates their signals (max-confidence on collision), captures per-agent traces, and never lets one
                inertial silently swallow another&apos;s evidence.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Hash-chained audit, in code, with tests.</strong>{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@inertial/db</code> is eight
                tables on Postgres + pgvector with a pglite dev factory and 41 hermetic integration tests. Every state
                transition writes one entry per instance with <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">prevHash → hash</code>{' '}
                linkage. Tampering is detectable, compliance is provable, and a federated mod can ship the artifact —
                not a promise — that says &quot;no remote API touched my instance over the last 30 days.&quot;
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Per-instance policy as a structured AST, not a string eval.</strong>{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@inertial/policy</code> loads
                YAML rules and walks an AST: leaves are <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">channel + op + value</code>{' '}
                or <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">entity + present</code>; nodes
                compose with <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">all</code> /{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">any</code>. First match wins.
                Actions are <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">queue.quick</code>,{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">queue.deep</code>,{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">escalate</code>,{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">auto-allow</code>, or{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">auto-remove</code>. The original
                AST is preserved in the audit log next to the rule id, so any reviewer decision can be traced back to
                the exact configuration that produced it.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Real ingest, real classification, real dashboard.</strong>{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">apps/gateway</code> is a Hono
                ingest on <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">:4000</code> that
                normalizes platform payloads into <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">ContentEvent</code>s
                and owns media download + perceptual hashing. <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">apps/runciter</code>{' '}
                runs the orchestrator on <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">:4001</code>,
                persists through <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@inertial/db</code>,
                evaluates policy, creates review items, and audits every step. Tier 1 text-toxicity is real today —{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@huggingface/transformers</code>{' '}
                running <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">Xenova/toxic-bert</code>{' '}
                in-process at ~50ms/event after warmup. Tier 3 text-toxicity via Anthropic ships in{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@inertial/agents-cloud</code>.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">An honest capability matrix.</strong> Heuristics
                cover URL spam and known-bad image phash. Local WASM (transformers.js) covers text toxicity, NER,
                obvious image NSFW, and Whisper transcription. Local server (Ollama) adds better text reasoning and
                multimodal vision-language. Cloud is reserved for what only frontier models can do honestly: minor
                detection, video temporal reasoning, coordinated brigading. The architecture refuses to ship a fake
                local image classifier that lies about its capability.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">A reviewer dashboard built on HITL-KIT.</strong>{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@inertial/app</code> is Electron
                + React + Tailwind v4. The Queue tab pulls live data from the Runciter, lets a moderator expand each
                item to see post text + per-inertial traces, and approve / remove / escalate commits a{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">ReviewDecision</code> with a
                hash-chained audit entry. The right rail surfaces &quot;what&apos;s up next, ieuan&quot; — overview,
                streaks, top channel, draft policy language for the case in front of you.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why it&apos;s unusual</h2>
            <p>
              Most AI moderation tools are a black-box verdict-maker bolted onto a queue. The reviewer either
              rubber-stamps the model or fights it, and nobody can audit what actually happened. Inertial is the
              opposite bet. Sub-agents emit typed structured signals, not &quot;remove this post.&quot; A per-instance
              policy engine turns signals into routing decisions. Reviewers see the signals, the inertial&apos;s
              reasoning trace, and the policy rule that fired — then they decide. Every signal and every decision lands
              in the hash-chained audit log.
            </p>
            <p>
              The other unusual move is the tier composition. Federated mods and centralized operators have wildly
              different privacy budgets, and inertial refuses to lie about what local models can do. A no-budget
              instance runs heuristics + local text-toxicity only and accepts that they don&apos;t get image
              moderation. A funded operator opts into cloud skills per rule, with budget caps, and gets full coverage.
              Both flow through the same code, the same dashboard, the same review queue, and the same audit log. The
              architecture is the argument: trust is a property of the data flow, not of the vendor.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">How I describe the skill set</h2>
            <p>
              TypeScript monorepo authorship (pnpm + Turbo), Zod schema-first contract design across eight packages,
              orchestrator and aggregator runtime in <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@inertial/core</code>,
              Postgres + pgvector + Drizzle with hash-chained audit, structured-AST policy DSL, Hono HTTP services,
              Electron + React 19 + Tailwind v4 reviewer dashboard built on HITL-KIT primitives,{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@huggingface/transformers</code>{' '}
              in-process classification, Ollama and Anthropic provider integration, hermetic integration testing
              against pglite, and the discipline to refuse capability claims the local tier can&apos;t honestly make.
            </p>
          </section>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <p className="text-[14px] leading-relaxed text-foreground/85">
              Inertials emit signals. The Runciter dispatches them. Humans decide. Every routing decision is a policy
              rule you can read, every signal is evidence you can inspect, and every state transition is an entry in a
              hash-chained log. The architecture is the argument.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
