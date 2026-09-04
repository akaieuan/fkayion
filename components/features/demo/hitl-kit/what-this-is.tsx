/** What this is. Moved verbatim from app/demo/hitl-kit/page.tsx. */
export function WhatThisIsSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">What this is</h2>
            <p>
              HITL Kit is three artifacts shipped as one project: a{' '}
              <strong className="font-medium text-foreground/90">perspective paper</strong> arguing that
              95% of enterprise AI pilots fail because we evaluate systems for autonomous completion when
              deployment demands human-AI collaboration; a{' '}
              <strong className="font-medium text-foreground/90">component library</strong> of nineteen HITL
              primitives that installs into any shadcn/ui project via one CLI command, plus six{' '}
              <code className="aka-code">@hitl-kit/*</code> npm
              packages; and a{' '}
              <strong className="font-medium text-foreground/90">shadcn-compatible registry</strong> I
              built, now served from the akaOSS site (the hitlkit.dev registry URLs keep resolving). The
              argument, the implementation, and the distribution, in one place.
            </p>
          </section>
  )
}
