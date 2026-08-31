import { codeChip } from '@/components/features/demo/inertial/shared'

/** What's real. Moved verbatim from app/demo/inertial/page.tsx. */
export function WhatsRealSection() {
  return (
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What&apos;s real</h2>
            <ul className="list-disc space-y-2.5 pl-5 marker:text-muted-foreground/50">
              <li>
                <strong className="font-medium text-foreground/85">Schema-first Zod contracts</strong> across 33 typed
                shapes (README&apos;s inventory centers on 12+ primary schemas in{' '}
                <code className={codeChip}>@inertial/schemas</code>): <code className={codeChip}>ContentEvent</code>,{' '}
                <code className={codeChip}>StructuredSignal</code>, <code className={codeChip}>AgentTrace</code>,{' '}
                <code className={codeChip}>ReviewItem</code>, <code className={codeChip}>ReviewDecision</code>,{' '}
                <code className={codeChip}>Policy</code>, <code className={codeChip}>AuditEntry</code>,{' '}
                <code className={codeChip}>SkillRegistration</code>, <code className={codeChip}>GoldEvent</code>,{' '}
                <code className={codeChip}>EvalRun</code>, <code className={codeChip}>SkillCalibration</code>,{' '}
                <code className={codeChip}>ReviewerTag</code> + scope, <code className={codeChip}>TagAgreement</code>.
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
                dispatches the 31-event gold set (
                <code className={codeChip}>config/evals/gold-set-v1.jsonl</code> — 27 text + 3 image + 1 video)
                against the live skill registry, and prints calibration as a hash-chained artifact, not vibes. Reviewer
                commits auto-promote via <code className={codeChip}>signalFeedback</code> +{' '}
                <code className={codeChip}>reviewerTags</code> into <code className={codeChip}>gold_events</code> (
                source <code className={codeChip}>reviewer-derived</code>), so the corpus grows on every decision.
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
  )
}
