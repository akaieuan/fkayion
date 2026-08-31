/** The thesis. Moved verbatim from app/demo/akaoss/page.tsx. */
export function ThesisSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">The thesis</h2>
            <p>
              Current benchmarks ask “can the model complete this task autonomously?” In deployment,
              real users want an assistant that respects their authority, preserves their agency, and
              makes them better over time.{' '}
              <strong className="font-medium text-foreground/90">Assist-Not-Complete</strong>: evaluate
              AI on whether it assists humans without displacing them, not on whether it can finish the
              task alone. The argument is made in full in the paper,{' '}
              <a href="https://www.akaoss.dev/paper" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">An AI Measurement Problem</a>
              , and tested in public in the{' '}
              <a href="https://www.akaoss.dev/research" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">research feed</a>{' '}
              — every finding is a reproducible experiment run with the kits below.
            </p>
          </section>
  )
}
