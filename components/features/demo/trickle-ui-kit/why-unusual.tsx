import Link from 'next/link'

const extLink =
  'underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50'

/** Why it's unusual. Moved verbatim from app/demo/trickle-ui-kit/page.tsx. */
export function WhyUnusualSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">Why it&apos;s unusual</h2>
            <p>
              The React text-animation space is dominated by runtime-tax libraries: install 30kb of
              JavaScript to move a heading. trickle is the counter-argument, shipped as proof. It uses
              twelve-year-old CSS spec to do the work that Magic UI, framer-motion text components,
              and react-type-animation all do with a runtime. The result is faster (GPU-accelerated
              keyframes), lighter (median &lt;1kb per component), and architecturally honest (server
              components stay server, no{' '}
              <code className="aka-code">&apos;use client&apos;</code>{' '}
              tax).
            </p>
            <p>
              Distribution is shadcn-CLI only by design. There is no installable npm package and no
              plan for one — the registry IS the distribution. You own the source the moment you run{' '}
              <code className="aka-code">shadcn add</code>. No version lock-in, no upgrade churn, customise freely.
            </p>
            <p>
              Related perspective on building open-source kits with the shadcn registry pattern:{' '}
              <Link href="/demo/hitl-kit" className={extLink}>
                HITL Kit
              </Link>
              {' · '}
              <Link href="/demo/eval-kit" className={extLink}>
                eval-kit
              </Link>
              .
            </p>
          </section>
  )
}
