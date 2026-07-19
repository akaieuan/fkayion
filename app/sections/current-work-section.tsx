import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import circleheadsMark from '@/public/circleheads.webp'
import akaossMark from '@/public/akaoss.webp'

type Studio = {
  name: string
  mark: StaticImageData
  alt: string
  eyebrow: string
  blurb: string
  tags: string[]
  site: { label: string; href: string }
  demo: { label: string; href: string }
}

const studios: Studio[] = [
  {
    name: 'Circleheads',
    mark: circleheadsMark,
    alt: 'Circleheads mark',
    eyebrow: 'Studio · Applied AI · Brooklyn',
    blurb:
      'The two-person Brooklyn studio I co-run. We watch the work first, then ship agents that do it in production — with the data, skills, and approval gates that keep humans in control. Plus a short senior consulting bench and original games.',
    tags: ['Applied AI', 'Consulting', 'Games'],
    site: { label: 'circleheads.com', href: 'https://circleheads.com' },
    demo: { label: 'what we do', href: '/demo/circleheads' },
  },
  {
    name: 'akaOSS',
    mark: akaossMark,
    alt: 'akaOSS mark',
    eyebrow: 'Studio · Open source · HITL AI',
    blurb:
      'The open-source arm — software for human-in-the-loop AI. Five projects (HITL Kit, EVAL Kit, tag-kit, Collapse, Hologram), the Assist-Not-Complete thesis, and a reproducible research feed, served as one site.',
    tags: ['Open source', 'HITL AI', 'Research'],
    site: { label: 'akaoss.dev', href: 'https://www.akaoss.dev' },
    demo: { label: 'the projects', href: '/demo/akaoss' },
  },
]

const chip =
  'rounded-md border border-border/60 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70'

export function CurrentWorkSection() {
  return (
    <section id="section-3" className="relative w-full py-20">
      <div className="max-w-site mx-auto site-inset">
        <div className="mb-6">
          <h1 className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
            Current work
          </h1>
          <p className="mt-1 text-xs font-light text-muted-foreground/50">
            applied AI — in production with clients, and in the open
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {studios.map((s) => (
            <div
              key={s.name}
              className="flex h-full flex-col rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-md sm:p-6"
            >
              <div className="flex items-center gap-3">
                <figure className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border/80 bg-black">
                  <Image
                    src={s.mark}
                    alt={s.alt}
                    placeholder="blur"
                    sizes="48px"
                    className="block h-full w-full object-cover"
                  />
                </figure>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
                    {s.eyebrow}
                  </p>
                  <p className="mt-0.5 text-base font-light tracking-tight text-foreground/90">
                    {s.name}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-[13px] font-light leading-relaxed text-muted-foreground">
                {s.blurb}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span key={t} className={chip}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
                <a
                  href={s.site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
                >
                  {s.site.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-80" aria-hidden />
                </a>
                <Link
                  href={s.demo.href}
                  className="text-[13px] font-light text-muted-foreground/70 transition-colors hover:text-foreground"
                >
                  {s.demo.label} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
