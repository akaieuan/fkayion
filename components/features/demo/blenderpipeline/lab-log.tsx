import Link from 'next/link'

/** The lab log. Moved verbatim from app/demo/blenderpipeline/page.tsx. */
export function LabLogSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">The lab log</h2>
            <p>
              Findings like that one get written up rather than fixed and forgotten. The{' '}
              <Link
                href="/demo/blenderpipeline/bkz-lab-log"
                className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                BKZ lab log
              </Link>{' '}
              is where the methodology lives: what broke, how it was measured, what the numbers said
              before and after, and what I priced and then refused. It is the record I would want if
              I came back to this codebase in a year.
            </p>
          </section>
  )
}
