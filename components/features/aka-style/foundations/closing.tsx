import Link from 'next/link'

/** The closing note pointing at primitives and marks. Moved verbatim from app/aka-style/foundations/page.tsx. */
export function FoundationsClosing() {
  return (
        <section className="mt-14 aka-card-well px-5 py-4">
          <p className="text-14 font-light leading-relaxed text-foreground/85">
            With the block above plus{' '}
            <Link
              href="/aka-style/primitives"
              className="text-primary underline decoration-border underline-offset-[3px]"
            >
              primitives
            </Link>{' '}
            and the{' '}
            <Link
              href="/aka-style/marks"
              className="text-primary underline decoration-border underline-offset-[3px]"
            >
              brand engine
            </Link>
            , a new repo starts with the same design language on day one, which is the entire point
            of writing this down.
          </p>
        </section>
  )
}
