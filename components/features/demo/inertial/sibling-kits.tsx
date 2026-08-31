import { codeChip } from '@/components/features/demo/inertial/shared'

/** Sibling kits. Moved verbatim from app/demo/inertial/page.tsx. */
export function SiblingKitsSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Sibling kits</h2>
            <ul className="list-disc space-y-2.5 pl-5 marker:text-muted-foreground/50">
              <li>
                <strong className="font-medium text-foreground/85">eval-kit</strong> — evaluation framework for
                collaborative-task agents. Inertial uses <code className={codeChip}>@eval-kit/ui</code> primitives in
                its eval cockpit; calibration scoring runs through <code className={codeChip}>@eval-kit/core</code>{' '}
                (README: <code className={codeChip}>@inertial/eval</code> wraps it).
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
  )
}
