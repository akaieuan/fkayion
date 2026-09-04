/** The thesis. Moved verbatim from app/demo/inertial/page.tsx. */
export function ThesisSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">The thesis</h2>
            <p>
              AI classification outputs and human review actions should both land in a hash-chained audit log, with
              typed structured signals as the unit of evidence and per-instance YAML as the unit of policy. Inertial is
              that thesis demonstrated end-to-end through real code.
            </p>
            <p>
              The system is two products in one monorepo: <code className="aka-code">@inertial/*</code> — a toolkit of
              orchestration, persistence, policy, and HITL primitives, sibling to <em>eval-kit</em> and{' '}
              <em>HITL-KIT</em> — and <code className="aka-code">@inertial/app</code>, an Electron + React + Tailwind
              reference dashboard for moderators, built on HITL-KIT.
            </p>
            <p className="text-foreground/80">
              This is portfolio work, not a maintained OSS project. The point is the architecture choices and where
              they hold up — not feature completeness.
            </p>
          </section>
  )
}
