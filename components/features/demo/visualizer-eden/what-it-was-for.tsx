/** What this project was for. Moved verbatim from app/demo/visualizer-eden/page.tsx. */
export function WhatItWasForSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              What this project was for
            </h2>
            <p>
              End-to-end ownership of one pipeline: decode audio in the browser, derive stable features,
              push them across the JS/WebGL boundary every frame, and keep the mesh readable under real
              laptops. The product value is the fluency: Web Audio, R3F’s render loop, and large custom
              GLSL in one codebase, with a clear split between “analysis” and “look.”
            </p>
          </section>
  )
}
