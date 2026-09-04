/** Sibling kits. Moved verbatim from app/demo/inertial/page.tsx. */
export function SiblingKitsSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">Sibling kits</h2>
            <ul className="aka-list space-y-2.5">
              <li>
                <strong className="font-medium text-foreground/85">eval-kit</strong> — evaluation framework for
                collaborative-task agents. Inertial uses <code className="aka-code">@eval-kit/ui</code> primitives in
                its eval cockpit; calibration scoring runs through <code className="aka-code">@eval-kit/core</code>{' '}
                (README: <code className="aka-code">@inertial/eval</code> wraps it).
              </li>
              <li>
                <strong className="font-medium text-foreground/85">HITL-KIT</strong> — human-in-the-loop UI primitives.{' '}
                <code className="aka-code">@inertial/app</code>&apos;s queue and review screens are built on{' '}
                <code className="aka-code">MiniTrace</code>, <code className="aka-code">HitlCard</code>,{' '}
                <code className="aka-code">BatchQueue</code>, <code className="aka-code">AiGenerationScale</code>, and{' '}
                <code className="aka-code">ApproveRejectRow</code> from the hitlkit.dev shadcn registry.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">tag-kit</strong> — domain-agnostic structured
                tagging primitives (catalog + scope-aware matching + PRF scoring + headless React{' '}
                <code className="aka-code">TagPicker</code> / <code className="aka-code">TagChip</code>).
                Inertial&apos;s reviewer-tag layer was extracted into tag-kit so other HITL annotation workflows
                (medical, legal, ML training data) can reuse the same substrate.
              </li>
            </ul>
          </section>
  )
}
