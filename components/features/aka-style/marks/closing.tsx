import Link from 'next/link'

/** The closing note pointing at faces. Moved verbatim from app/aka-style/marks/page.tsx. */
export function MarksClosing() {
  return (
        <section className="mt-16 aka-card-well px-5 py-4">
          <p className="text-[14px] font-light leading-relaxed text-foreground/85">
            Next:{' '}
            <Link href="/aka-style/faces" className="text-primary underline decoration-border underline-offset-[3px]">
              the face set
            </Link>{' '}
            — twenty-six expressions that live inside the void, and the rules for when a mark is
            allowed to have one.
          </p>
        </section>
  )
}
