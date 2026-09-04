import Link from 'next/link'

/** The closing card: where it comes from. Moved verbatim from app/demo/akaoss/page.tsx. */
export function AkaossClosing() {
  return (
          <section className="aka-card-well px-5 py-4">
            <h2 className="aka-lead">Where it comes from</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">
              akaOSS is where the human-side-of-applied-AI work becomes reusable: the kits are the
              measurement instruments, the research feed is the evidence, and the paper is the
              argument. It&apos;s built at{' '}
              <Link href="/demo/circleheads" className="aka-quiet-link">Circleheads</Link>.
            </p>
          </section>
  )
}
