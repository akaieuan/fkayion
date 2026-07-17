import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import circleheadsMark from '@/public/circleheads.webp'

const pillars = [
  {
    label: 'Applied AI',
    body: 'Agentic systems that do real work — shipped to production with approval gates that keep humans in control.',
  },
  {
    label: 'Consulting',
    body: 'A short, senior-only bench: a few engagements a year — architecture, AI strategy, brand, and design that ships.',
  },
  {
    label: 'Games',
    body: 'Original titles, quietly built in-house on scopes two people can hold in their heads.',
  },
]

export function CurrentWorkSection() {
  return (
    <section id="section-3" className="relative w-full py-20">
      <div className="max-w-site mx-auto site-inset">
        <div className="mb-6">
          <h1 className="text-xl text-muted-foreground font-light tracking-wide">current work</h1>
          <p className="text-muted-foreground/50 text-xs mt-0.5 font-light">
            circleheads · applied-ai software studio · brooklyn
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-md p-5 sm:p-7">
          <div className="grid gap-6 md:grid-cols-[168px_1fr] md:gap-8 md:items-start">
            <figure className="mx-auto w-40 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-black md:mx-0 md:w-[168px]">
              <Image
                src={circleheadsMark}
                alt="Circleheads — two circle-headed figures"
                placeholder="blur"
                sizes="168px"
                className="block h-auto w-full"
              />
            </figure>

            <div>
              <p className="text-sm font-light leading-relaxed text-muted-foreground max-w-xl">
                <span className="text-foreground/90">Circleheads</span> is the two-person Brooklyn
                studio I co-run — applied AI in production, a short consulting bench, and original
                games on the side. We watch the work first, then ship agents that do it, with
                approval gates that keep humans in control.
              </p>

              <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                {pillars.map((p) => (
                  <li key={p.label} className="rounded-lg border border-border/60 bg-background/30 p-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/80">
                      {p.label}
                    </p>
                    <p className="mt-1.5 text-[12px] font-light leading-snug text-muted-foreground/80">
                      {p.body}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="https://circleheads.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Visit circleheads.com
                  <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
                </a>
                <Link
                  href="/demo/circleheads"
                  className="text-[13px] font-light text-muted-foreground/70 transition-colors hover:text-foreground"
                >
                  what we do →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
