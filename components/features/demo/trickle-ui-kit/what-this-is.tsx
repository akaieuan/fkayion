/** What this is. Moved verbatim from app/demo/trickle-ui-kit/page.tsx. */
export function WhatThisIsSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What this is</h2>
            <p>
              trickle is{' '}
              <strong className="font-medium text-foreground/90">
                forty-seven hand-tuned text-animation primitives
              </strong>{' '}
              for React, distributed shadcn-style. Every animation is a pure CSS keyframe — no
              framer-motion, no motion-one, no react-spring. The browser does the work; React
              orchestrates a couple of state changes when it has to.
            </p>
            <p>
              <strong className="font-medium text-foreground/90">42 of 47</strong> are pure React Server
              Components — they ship literally zero client JavaScript. The other five (Typewriter,
              TypoCorrect, DecryptScramble, WordRotate, MorphSwap) need minimal client state for
              orchestration logic that genuinely cannot be expressed as a single keyframe. Median
              component weight: <strong className="font-medium text-foreground/90">&lt;1kb gzip</strong>.
              Animation runtime dependencies:{' '}
              <strong className="font-medium text-foreground/90">zero</strong>.
            </p>
            <p>
              SSR-safe by construction. The server renders the final HTML with animation classes
              applied, the browser starts the animation on first paint, no flash, no hydration
              mismatch.
            </p>
          </section>
  )
}
