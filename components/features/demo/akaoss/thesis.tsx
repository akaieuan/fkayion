/** The thesis. Moved verbatim from app/demo/akaoss/page.tsx. */
export function ThesisSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">The thesis</h2>
            <p>
              Current benchmarks ask “can the model complete this task autonomously?” In deployment,
              real users want an assistant that respects their authority, preserves their agency, and
              makes them better over time.{' '}
              <strong className="font-medium text-foreground/90">Assist-Not-Complete</strong>: evaluate
              AI on whether it assists humans without displacing them, not on whether it can finish the
              task alone. The argument is made in full in the paper,{' '}
              <a href="https://www.akaoss.dev/paper" target="_blank" rel="noopener noreferrer" className="aka-quiet-link">An AI Measurement Problem</a>
              , and tested in public in the{' '}
              <a href="https://www.akaoss.dev/research" target="_blank" rel="noopener noreferrer" className="aka-quiet-link">research feed</a>{' '}
              — every finding is a reproducible experiment run with the kits below.
            </p>
          </section>
  )
}
