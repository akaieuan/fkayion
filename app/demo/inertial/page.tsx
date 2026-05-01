import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

const extLink =
  'underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50'

const repoHref = 'https://github.com/akaieuan/inertial-moderation-tool'
const readmeHref = 'https://github.com/akaieuan/inertial-moderation-tool/blob/main/README.md'

const codeChip = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]'
const techChip =
  'inline-flex items-center rounded-md border border-border/70 bg-muted/30 px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground'
const eyebrow = 'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80'

export const metadata = {
  title: 'Inertial: reference architecture for auditable AI content review | akaBuild',
  description:
    'A reference architecture for auditable AI content review. Not a deployable moderation service — a working demonstration of one architectural thesis: AI classification outputs and human review actions both land in a hash-chained audit log, with typed structured signals as the unit of evidence and per-instance YAML as the unit of policy.',
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
              alt="Inertial dashboard: 52-week flag activity heatmap, day-by-day stats grid, queue mix"
              width={1024}
              height={611}
              className="block h-auto w-full"
              priority
            />
          </div>
          <div className="overflow-hidden rounded-xl border border-border/80 bg-muted/10">
            <Image
              src="/inertial-queue.png"
              alt="Inertial review queue: per-item channel chips, reviewer-tag picker, agent traces, similar events"
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

        <div className="mt-4 flex flex-wrap gap-1.5">
          <span className={techChip}>MIT</span>
          <span className={techChip}>Node ≥20</span>
          <span className={techChip}>pnpm 10</span>
          <span className={techChip}>TypeScript</span>
        </div>

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
          Repo, install instructions, the architecture diagram, the policy DSL, and the honest capability matrix all
          live in the README.
        </p>

        <p className={`mt-10 ${eyebrow}`}>
          Reference architecture · portfolio work · MIT
        </p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          Inertial
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A reference architecture for auditable AI content review. Not a deployable moderation service — a working
          demonstration of one architectural thesis, end-to-end through real code.
        </p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="rounded-xl border border-border bg-muted/20 px-5 py-4">
            <p className={eyebrow}>Status</p>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">
              Reference architecture, not deployable. Schemas, audit chain, eval harness, skill registry, and reviewer
              dashboard are real and tested. Connectors are stubbed. Action dispatch is unimplemented. No auth. The
              31-event gold set is too small for statistical claims; it&apos;s there to demonstrate the calibration
              math, not to certify any skill&apos;s accuracy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">The thesis</h2>
            <p>
              AI classification outputs and human review actions should both land in a hash-chained audit log, with
              typed structured signals as the unit of evidence and per-instance YAML as the unit of policy. Inertial is
              that thesis demonstrated end-to-end through real code.
            </p>
            <p>
              The system is two products in one monorepo: <code className={codeChip}>@inertial/*</code> — a toolkit of
              orchestration, persistence, policy, and HITL primitives, sibling to <em>eval-kit</em> and{' '}
              <em>HITL-KIT</em> — and <code className={codeChip}>@inertial/app</code>, an Electron + React + Tailwind
              reference dashboard for moderators, built on HITL-KIT.
            </p>
            <p className="text-foreground/80">
              This is portfolio work, not a maintained OSS project. The point is the architecture choices and where
              they hold up — not feature completeness.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What&apos;s real</h2>
            <ul className="list-disc space-y-2.5 pl-5 marker:text-muted-foreground/50">
              <li>
                <strong className="font-medium text-foreground/85">Schema-first Zod contracts</strong> across 12+
                shapes: <code className={codeChip}>ContentEvent</code>, <code className={codeChip}>StructuredSignal</code>,{' '}
                <code className={codeChip}>AgentTrace</code>, <code className={codeChip}>ReviewItem</code>,{' '}
                <code className={codeChip}>ReviewDecision</code>, <code className={codeChip}>Policy</code>,{' '}
                <code className={codeChip}>AuditEntry</code>, <code className={codeChip}>SkillRegistration</code>,{' '}
                <code className={codeChip}>GoldEvent</code>, <code className={codeChip}>EvalRun</code>,{' '}
                <code className={codeChip}>SkillCalibration</code>, <code className={codeChip}>ReviewerTag</code> +
                scope, <code className={codeChip}>TagAgreement</code>.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">A skill / tool registry</strong> with a catalog plus
                a per-instance registration table. Adding a skill is a registration row, not a code change. Reviewers
                wire Voyage / Anthropic / etc. without touching YAML.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">A YAML policy evaluator with hash-chained{' '}
                  <code className={codeChip}>/verify</code></strong>. Per-instance, structured AST (no string eval).
                Leaves are <code className={codeChip}>channel + op + value</code> or{' '}
                <code className={codeChip}>entity + present</code>; nodes compose with{' '}
                <code className={codeChip}>all</code> / <code className={codeChip}>any</code>; first match wins. The
                AST is preserved next to the rule id in the audit log so any decision can be traced back to the exact
                configuration that produced it.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">An eval harness scoring per-(skill, channel) Brier /
                  ECE / agreement</strong>. <code className={codeChip}>pnpm eval</code> boots an in-memory pipeline,
                dispatches the 31-event gold set against the live skill registry, and prints calibration as a
                hash-chained artifact, not vibes. Reviewer commits auto-promote to{' '}
                <code className={codeChip}>gold_events</code> rows, so the corpus grows on every decision.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">A reviewer-tag layer with per-modality / per-segment
                  scope</strong>. <code className={codeChip}>TAG_CATALOG</code> ships ~18 starter tags;{' '}
                <code className={codeChip}>reviewer_tags</code> stores them with scope; the &quot;good video, bad
                audio&quot; mixed-validity case gets a precise label, not a whole-asset verdict.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">A reviewer dashboard wired to all of it</strong>.
                Three-deck queue (Quick / Deep / Escalation), inline review session (not a modal), per-channel evidence
                chips, video keyframe strip with timestamps + per-frame top-channel score, author history, similar
                events via Voyage embeddings + pgvector, reviewer-tag picker filtered to the event&apos;s modalities,
                side panels (Chat / Notes / Agent activity) docked edge-to-edge.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Hash-chained audit, in code, with tests</strong>.{' '}
                <code className={codeChip}>@inertial/db</code> is 14 tables on Postgres + pgvector with a pglite dev
                factory and 68 hermetic integration tests. Every state transition writes one entry per instance with{' '}
                <code className={codeChip}>prevHash → hash</code> linkage. &quot;No remote API touched my instance over
                the last 30 days&quot; becomes a SQL query, not a vendor promise.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What&apos;s stubbed (deliberately)</h2>
            <ul className="list-disc space-y-2.5 pl-5 marker:text-muted-foreground/50">
              <li>
                Every source connector — Mastodon (ActivityPub), Bluesky (AT Protocol), Lemmy, Discord, Slack, generic
                webhook. Without these, no real platform&apos;s events ever reach the runciter; the system can only
                process events posted directly to <code className={codeChip}>POST /v1/events</code> by a script. This
                is the single biggest gap between this project and a moderation tool.
              </li>
              <li>
                The action dispatcher that pushes decisions back to source platforms. A moderation system that
                can&apos;t act on its decisions is a logging system.
              </li>
              <li>
                Every <code className={codeChip}>@inertial/agents-*</code> package except text and context. Cloud
                vision works through <code className={codeChip}>image-classify@anthropic</code>, but{' '}
                <code className={codeChip}>vision-*</code>, <code className={codeChip}>identity-*</code>, and{' '}
                <code className={codeChip}>audio-*</code> packages return empty arrays.
              </li>
              <li>
                Audio entirely — no transcription, no classification, no even-stub audio analysis.
                &quot;Multimodal&quot; is overstated; today it&apos;s text + image + frame-grabbed video.
              </li>
              <li>
                Auth and observability layers. Anyone who can reach{' '}
                <code className={codeChip}>localhost:4001</code> can register skills, kick off eval runs, or delete
                review items. Don&apos;t run this in front of any real instance.
              </li>
            </ul>
            <p>
              The architecture diagram in the README documents the target shape. What runs today is a verification
              substrate with a reference UI on top.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why I built this</h2>
            <p>
              Commercial moderation APIs claim accuracy without proof and ship verdicts without evidence. Federated
              mods distrust them because they can&apos;t audit them; centralized compliance teams need defensible
              records they can show regulators. Both want decomposed, evidence-rich decisions; neither has them.
            </p>
            <p>
              I wanted to know: what would a substrate for that look like — schemas, audit log, skill registry, eval
              harness, reviewer surface — wired together end-to-end with real code rather than a slide deck. So I built
              it. Four claims:
            </p>
            <ul className="list-disc space-y-2.5 pl-5 marker:text-muted-foreground/50">
              <li>
                Inertials emit typed structured signals, <em>not</em> verdicts. Probability + confidence + evidence
                pointers. The policy layer turns signals into routing; humans turn routing into actions.
              </li>
              <li>
                Per-instance YAML policy so federation is a first-class case, not an afterthought. The same code serves
                a wide-open community and a high-compliance enterprise because the operator brings their own rules.
              </li>
              <li>
                Per-skill privacy posture lives in the schema. A skill is either{' '}
                <code className={codeChip}>dataLeavesMachine: true</code> or <code className={codeChip}>false</code>.
                The audit chain records which model saw which event, so privacy claims become hash-chained artifacts.
              </li>
              <li>
                Reviewer decisions auto-promote into the eval gold set. Every commit grows the calibration corpus by
                one structured row, so the system improves at measuring itself.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What this is NOT</h2>
            <ul className="list-disc space-y-2.5 pl-5 marker:text-muted-foreground/50">
              <li>
                <strong className="font-medium text-foreground/85">Not a deployable moderation service.</strong> No
                connectors. No action dispatcher. No auth. Don&apos;t put it in front of any real instance.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Not a model.</strong> Composes existing classifiers
                (toxic-bert, Claude, Voyage) under typed contracts. Trains nothing.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Not statistically validated.</strong> The 31-event
                gold set demonstrates the calibration math is correct; per-channel sample sizes (1–15) are too small
                to make any actual claim about any skill&apos;s real-world accuracy.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Not multimodal in the way that phrase usually
                  means.</strong> Audio is fully unimplemented. Video is keyframe extraction plus per-frame image
                classification — no temporal reasoning, no audio track, no scene-change detection.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Not a maintained OSS project.</strong> No
                CONTRIBUTING.md, no issue templates, no triage commitment. If you want to use any of this, fork it.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Skill tiers — what&apos;s actually demonstrated
            </h2>
            <p>
              The architecture supports four execution tiers; today, only two are exercised end-to-end. Honest mapping:
            </p>
            <div className="space-y-2.5">
              <div className="flex flex-col gap-1 border-b border-border/60 pb-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <span className="text-[12px] font-medium uppercase tracking-[0.16em] text-foreground/70 shrink-0">
                  Tier 0
                </span>
                <span className="text-[13px] text-muted-foreground/80 sm:text-right">
                  In-process JS · <code className={codeChip}>text-detect-spam-link</code> (regex)
                </span>
              </div>
              <div className="flex flex-col gap-1 border-b border-border/60 pb-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <span className="text-[12px] font-medium uppercase tracking-[0.16em] text-foreground/70 shrink-0">
                  Tier 1
                </span>
                <span className="text-[13px] text-muted-foreground/80 sm:text-right">
                  Local WASM (transformers.js / ONNX) ·{' '}
                  <code className={codeChip}>text-classify-toxicity@local</code> (toxic-bert)
                </span>
              </div>
              <div className="flex flex-col gap-1 border-b border-border/60 pb-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <span className="text-[12px] font-medium uppercase tracking-[0.16em] text-foreground/70 shrink-0">
                  Tier 2
                </span>
                <span className="text-[13px] text-muted-foreground/80 sm:text-right">
                  Local server (Ollama @ <code className={codeChip}>:11434</code>) · nothing yet — planned vision-ollama
                </span>
              </div>
              <div className="flex flex-col gap-1 pb-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <span className="text-[12px] font-medium uppercase tracking-[0.16em] text-foreground/70 shrink-0">
                  Tier 3
                </span>
                <span className="text-[13px] text-muted-foreground/80 sm:text-right">
                  Cloud · <code className={codeChip}>text-classify-toxicity@anthropic</code>,{' '}
                  <code className={codeChip}>image-classify@anthropic</code>,{' '}
                  <code className={codeChip}>text-embed@voyage</code>, video frame-by-frame (ffmpeg →
                  image-classify@anthropic per keyframe)
                </span>
              </div>
            </div>
            <p>
              Privacy posture is per-skill: Tier 0 / 1 never leave the machine; Tier 3 always does. The audit log
              records which model saw which event, so a federated mod can prove &quot;no remote API touched my instance
              over the last 30 days&quot; — not as a promise, as a hash-chained artifact.
            </p>
            <p>
              Local-first is not a magic bullet. For high-stakes content (minor detection, video understanding, audio
              harassment, coordinated attacks), cloud is currently the only adequate tier — and audio is unimplemented
              entirely. The point of inertial isn&apos;t to replace cloud — it&apos;s to make the routing legible and
              the data flow auditable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Naming</h2>
            <p>The vocabulary comes from Philip K. Dick&apos;s <em>Ubik</em> (1969).</p>
            <ul className="list-disc space-y-2.5 pl-5 marker:text-muted-foreground/50">
              <li>
                <strong className="font-medium text-foreground/85">inertials</strong> — anti-telepaths whose function
                is to neutralize harmful psychic intrusion on behalf of clients. Here: each sub-agent neutralizes a
                class of harmful signal (toxicity, spam, NSFW, identity hate, brigading) for the communities it serves.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Runciter</strong> — Glen Runciter, the operator who
                runs the prudence organization that dispatches inertials. The orchestrator class in{' '}
                <code className={codeChip}>@inertial/core</code> is <code className={codeChip}>Runciter</code>; the
                host process is <code className={codeChip}>apps/runciter</code>. Code reads as{' '}
                <code className={codeChip}>runciter.dispatch(event) → inertials emit StructuredSignals</code>.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">structured signals</strong> — what inertials emit.
                Probability + confidence + evidence pointers. <em>Never verdicts.</em> Policy turns signals into
                routing; humans turn routing into actions.
              </li>
            </ul>
            <p className="text-foreground/80">
              One rule: inertials emit signals; the Runciter dispatches them; humans decide.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Sibling kits</h2>
            <ul className="list-disc space-y-2.5 pl-5 marker:text-muted-foreground/50">
              <li>
                <strong className="font-medium text-foreground/85">eval-kit</strong> — evaluation framework for
                collaborative-task agents. Inertial uses <code className={codeChip}>@eval-kit/ui</code> primitives in
                its eval cockpit and <code className={codeChip}>@eval-kit/core</code> for calibration scoring.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">HITL-KIT</strong> — human-in-the-loop UI primitives.{' '}
                <code className={codeChip}>@inertial/app</code>&apos;s queue and review screens are built on{' '}
                <code className={codeChip}>MiniTrace</code>, <code className={codeChip}>HitlCard</code>,{' '}
                <code className={codeChip}>BatchQueue</code>, <code className={codeChip}>AiGenerationScale</code>, and{' '}
                <code className={codeChip}>ApproveRejectRow</code> from the hitlkit.dev shadcn registry.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">tag-kit</strong> — domain-agnostic structured
                tagging primitives (catalog + scope-aware matching + PRF scoring + headless React{' '}
                <code className={codeChip}>TagPicker</code> / <code className={codeChip}>TagChip</code>).
                Inertial&apos;s reviewer-tag layer was extracted into tag-kit so other HITL annotation workflows
                (medical, legal, ML training data) can reuse the same substrate.
              </li>
            </ul>
          </section>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <p className="text-[14px] leading-relaxed text-foreground/85">
              Inertials emit signals. The Runciter dispatches them. Humans decide. Every routing decision is a policy
              rule you can read, every signal is evidence you can inspect, and every state transition is an entry in a
              hash-chained log. The architecture is the argument — and the point of the project is to demonstrate it
              end-to-end through real code, not to ship a moderation service.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
