import Link from 'next/link'

const linkMuted =
  'text-muted-foreground underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground'

/** The closing card. Moved verbatim from app/demo/how-i-work/page.tsx. */
export function ClosingSection() {
  return (
          <section className="aka-card-well px-5 py-4">
            <p className="text-14 leading-relaxed text-foreground/85">
              Everything on this site is the same habit at different sizes: go and find the
              problem, build something you can actually operate, and keep the person using it in
              charge of what happens next. The full index is on the{' '}
              <Link href="/demo" className={linkMuted}>
                projects page
              </Link>
              .
            </p>
          </section>
  )
}
