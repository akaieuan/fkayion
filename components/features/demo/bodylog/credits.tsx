import Link from 'next/link'

/** Who built it. Moved verbatim from app/demo/bodylog/page.tsx. */
export function CreditsSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">Who built it</h2>
            <p>
              A two-person{' '}
              <Link href="/demo/circleheads" className="aka-quiet-link">
                Circleheads
              </Link>{' '}
              build. I did the product: the user story, the whole front end, and the design language
              — the screen model, the body map, the capture flow, the tracking grid, the copy
              conventions, and the pixel brand art. The mark, tab icons, badges, figure and sprite are
              all drawn by one engine, which is why they hold from 14px to 512px with no assets.
            </p>
            <p>
              <a href="https://blaiseab.com" target="_blank" rel="noopener noreferrer" className="aka-quiet-link">
                Blaise
              </a>{' '}
              built the back end — how photos are stored, processed and traced through the app: the
              image pipeline, the SwiftData schema and its migration plan, and the persistence layer
              underneath the log.
            </p>
            <p className="text-[12px] text-muted-foreground/70">
              Swift · SwiftUI · SwiftData · iOS 17+ · zero external dependencies
            </p>
          </section>
  )
}
