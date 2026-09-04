import Link from 'next/link'

/** From design exploration to a shipping app. Moved verbatim from app/demo/bodylog/page.tsx. */
export function DesignToProductionSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">
              From design exploration to a shipping app
            </h2>
            <p>
              It started as a design exploration — a working name, three dashboard variants, and nine
              screens argued out in the browser before any Swift existed. That stage was for settling
              questions cheaply: whether the history grid should be one hue or one per condition,
              whether streaks should exist at all, what a broken streak is allowed to say to you.
            </p>
            <p>
              That exploration is still the best way to read the user story in one go, so it is{' '}
              <Link
                href="/demo/bodylog/v1"
                className="aka-quiet-link"
              >
                kept whole and playable
              </Link>{' '}
              rather than described. Every screen, in the order a person meets them.
            </p>
            <p>
              What survived became a written system — tokens, the rules above, the frozen mark — and
              then the real app. The production build is native SwiftUI with SwiftData underneath,
              and the values on this page are read out of it rather than reconstructed. A few things
              got better on the way: the figure went from an abstract diagram to real rasterised
              anatomy with independent left and right limbs, and heat became something clipped by the
              body&apos;s own silhouette so it spreads <em>along</em> a limb instead of stamping a
              rectangle on it.
            </p>
            <p className="text-[13px] text-muted-foreground/80">
              A few decisions are still open, and it&apos;s worth saying so rather than presenting
              them as settled: whether the app should force dark rather than follow the system, what
              a clinic export contains, and whether the multi-colour mark stays multi-colour given
              the system&apos;s own accent rule.
            </p>
          </section>
  )
}
