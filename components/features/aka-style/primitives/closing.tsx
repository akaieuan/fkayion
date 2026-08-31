import Link from 'next/link'

/** The closing note pointing at foundations. Moved verbatim from app/aka-style/primitives/page.tsx. */
export function PrimitivesClosing() {
  return (
        <section className="mt-14 aka-card-well px-5 py-4">
          <p className="text-[14px] font-light leading-relaxed text-foreground/85">
            The measurable half —{' '}
            <Link
              href="/aka-style/foundations"
              className="text-primary underline decoration-border underline-offset-[3px]"
            >
              foundations
            </Link>{' '}
            — carries the spacing scale, radii, motion timings, and breakpoints these primitives are
            built on. Take both and the system travels intact.
          </p>
        </section>
  )
}
