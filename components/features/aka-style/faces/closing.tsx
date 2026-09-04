import Link from 'next/link'

/** The closing note pointing back at marks and akaSTYLE. Moved verbatim from app/aka-style/faces/page.tsx. */
export function FacesClosing() {
  return (
        <section className="mt-16 aka-card-well px-5 py-4">
          <p className="text-14 font-light leading-relaxed text-foreground/85">
            Back to{' '}
            <Link href="/aka-style/marks" className="text-primary underline decoration-border underline-offset-[3px]">
              marks
            </Link>{' '}
            for the disc family, dissolve modes, and the full prop reference, or{' '}
            <Link href="/aka-style" className="text-primary underline decoration-border underline-offset-[3px]">
              akaSTYLE
            </Link>{' '}
            for the design language itself.
          </p>
        </section>
  )
}
