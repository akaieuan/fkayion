import Link from 'next/link'

/** The closing card: where it comes from. Moved verbatim from app/demo/akaoss/page.tsx. */
export function AkaossClosing() {
  return (
          <section className="aka-card-well px-5 py-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Where it comes from</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">
              akaOSS is where the human-side-of-applied-AI work becomes reusable: the kits are the
              measurement instruments, the research feed is the evidence, and the paper is the
              argument. It&apos;s built at{' '}
              <Link href="/demo/circleheads" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">Circleheads</Link>.
            </p>
          </section>
  )
}
