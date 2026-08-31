import { codeChip } from '@/components/features/demo/inertial/shared'

/** Skill tiers: what's actually demonstrated. Moved verbatim from app/demo/inertial/page.tsx. */
export function SkillTiersSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Skill tiers — what&apos;s actually demonstrated
            </h2>
            <p>
              The architecture supports four execution tiers.{' '}
              <strong className="font-medium text-foreground/85">Three of the four are exercised today</strong> — Tier 2
              (local server / Ollama) has no shipped skill yet. Honest mapping:
            </p>
            <div className="space-y-2.5">
              <div className="flex flex-col gap-1 border-b border-border/60 pb-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <span className="text-[12px] font-medium uppercase tracking-[0.16em] text-foreground/70 shrink-0">
                  Tier 0
                </span>
                <span className="text-[13px] text-muted-foreground/80 sm:text-right">
                  In-process JS · <code className={codeChip}>text-detect-spam-link</code> (regex URL detection),{' '}
                  <code className={codeChip}>text-context-author@local</code> (DB-backed author-history lookup)
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
                  Local server (Ollama @ <code className={codeChip}>:11434</code>) · nothing yet — planned for the
                  in-flight <code className={codeChip}>vision-ollama</code> work
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
  )
}
