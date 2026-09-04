import Link from 'next/link'

/** Why it's unusual. Moved verbatim from app/demo/eval-kit/page.tsx. */
export function WhyUnusualSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">Why it&apos;s unusual</h2>
            <p>Three things put this outside the eval-framework norm.</p>
            <div className="space-y-3">
              <h3 className="text-13 font-medium text-foreground/90">It&apos;s a UI, not a leaderboard</h3>
              <p>
                The product is the scoring cockpit: the keyboard-first inbox where a human reviewer
                can move through fifty steps in an afternoon. Aggregate scores exist but aren&apos;t
                published; the project explicitly forbids benchmark marketing because the differentiator
                is qualitative collaborative performance, not a number.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-13 font-medium text-foreground/90">It refuses LLM-as-judge as the default</h3>
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
              <h3 className="text-13 font-medium text-foreground/90">It&apos;s pre-1.0 but ships like it isn&apos;t</h3>
              <p>
                v0.3.1 is published with provenance attestations, the release workflow uses{' '}
                <code className="aka-code">pnpm pack</code> +{' '}
                <code className="aka-code">npm publish</code> for OIDC trusted publishing, the <code className="aka-code">main</code> branch
                requires four green CI matrix jobs before any merge, and the CHANGELOG has honest notes
                about what worked and what fell back to a token. It looks like a 1.0 because the
                discipline is what makes a tool depend-on-able, not the version number.
              </p>
            </div>
            <p>
              Related perspective on the same measurement wall:{' '}
              <Link
                href="/demo/hitl-kit"
                className="aka-quiet-link"
              >
                HITL Kit
              </Link>
              .
            </p>
          </section>
  )
}
