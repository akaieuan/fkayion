/** The six, verbatim in substance from docs/PHILOSOPHY.md. */
const invariants: [string, string][] = [
  ['Zero telemetry', 'No analytics, no crash reporting to a server, no usage statistics, no phone-home of any kind.'],
  ['No default cloud connections', 'It must start up and browse without contacting any service beyond the site you asked for.'],
  ['No inference in the browser', 'It does not run or call a language model. It captures pages as markdown; you take that markdown wherever you like.'],
  ['Every outbound connection is visible', 'Through the Network Inspector, in real time, grouped by origin.'],
  ['Data lives with you', 'SQLite and plain markdown on disk. No mandatory sync, no cloud account.'],
  ['No dark patterns', 'No forced onboarding, no retention tricks, no notification spam.'],
]

/** The six invariants. Moved verbatim from app/demo/null-browser/page.tsx. */
export function InvariantsSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">The six invariants</h2>
            <p>
              Not defaults. Invariants: code that violates one is a bug, and every pull request that
              touches networking or storage answers three questions from the diff alone. What does
              this store? What does this transmit? What does this remember?
            </p>
            <ol className="mt-4 list-none space-y-0 border-t border-border/70 p-0">
              {invariants.map(([name, detail], i) => (
                <li
                  key={name}
                  className="grid gap-x-4 border-b border-border/50 py-3 sm:grid-cols-[1.5rem_minmax(0,1fr)]"
                >
                  <span className="hidden font-mono text-[11px] tabular-nums text-muted-foreground/50 sm:block">
                    {i + 1}
                  </span>
                  <span>
                    <strong className="font-medium text-foreground/90">{name}.</strong>{' '}
                    <span className="text-[14px]">{detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
  )
}
