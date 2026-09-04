/** What this is. Moved verbatim from app/demo/collapse/page.tsx. */
export function WhatThisIsSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">What this is</h2>
            <p>
              Collapse exists because Claude’s default knowledge is stack-agnostic, but most developers
              live inside one stack at a time. The same idea — reactive state, lifecycle, error
              boundaries, circuit composition — lands differently in React, Vue, Nuxt, and Qiskit, and
              a “generic” answer costs round-trips. Collapsed skills carry your cross-stack vocabulary
              so Claude reaches for the right idiom on the first try, with trigger phrases derived from
              your annotations. The repo ships with 21 cross-stack reference lessons and a sample
              notebook that exercises the import flow end to end.
            </p>
          </section>
  )
}
