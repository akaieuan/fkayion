import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import circleheadsMark from '@/public/circleheads.webp'
import { PixelRoundabout } from '@/components/features/brand/pixel-roundabout'

const CONTACT = 'https://circleheads.com/about'
const SITE = 'https://circleheads.com'

export const metadata = {
  title: 'Circleheads — Applied-AI Software Studio | akaBuild',
  description:
    'Circleheads is a two-person Brooklyn studio building applied AI in production, taking a short senior consulting bench, and shipping original games. We watch the work first, then ship agents that do it with approval gates that keep humans in control.',
}

const pillars = [
  {
    label: 'Applied AI',
    line: 'Agentic systems that do real work.',
    body: 'We watch the work first. Then we ship agents that do it in production — with the data they need, the skills they use, and approval gates that keep humans in control.',
  },
  {
    label: 'Consulting',
    line: 'A short bench, senior only.',
    body: 'A few engagements a year, taken when the fit is right: architecture, AI strategy, brand identity, and design that ships.',
  },
  {
    label: 'Games',
    line: 'Strange things, quietly built.',
    body: 'Original titles built in-house, on scopes two people can hold in their heads. Not ready to show you — which is exactly how we like it.',
  },
]

export default function CircleheadsProjectPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground xl:hidden"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        <header className="mb-6 flex items-center gap-4">
          <figure className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-black sm:h-20 sm:w-20">
            <Image
              src={circleheadsMark}
              alt="Circleheads mark"
              placeholder="blur"
              sizes="80px"
              className="block h-full w-full object-cover"
            />
          </figure>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
              Studio · Applied AI · Brooklyn
            </p>
            <h1 className="mt-1 text-[clamp(1.6rem,5vw,2.4rem)] font-extralight leading-none tracking-tight text-foreground/90">
              Circleheads
            </h1>
          </div>
        </header>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={CONTACT}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          <a
            href={SITE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            circleheads.com
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          We take a few engagements a year, when the fit is right.
        </p>

        <p className="mt-8 max-w-xl text-sm text-muted-foreground">
          An applied-AI software studio. We build applied AI in production, take a small consulting
          bench, and ship original games on the side.
        </p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Who we are</h2>
            {/* Bartel-Pritchard Square itself, in the brand's bit style — the live traffic
                sim from the circleheads engine, next to the story it illustrates. */}
            <div className="float-right ml-5 mb-2 w-[170px] sm:w-[210px]">
              <PixelRoundabout size={210} />
            </div>
            <p>
              Circleheads is a two-person studio born and based out of Brooklyn, NY. The name comes
              from the traffic circle we grew up around on the southwest corner of Prospect Park,
              Bartel-Pritchard Square, where Park Slope meets Windsor Terrace — our friend group got
              called the circleheads, and it stuck. It&apos;s{' '}
              <a href="https://akabuild.dev" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">Ieuan</a>{' '}
              (product design + technical anthropology — the human side of applied AI — plus
              skill-building, agent testing, front-end, and procedural 3D) and{' '}
              <a href="https://blaiseab.com" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">Blaise</a>{' '}
              (full-stack systems, agent tooling, and the verification and evaluation layers that keep
              outputs honest) — friends since we were ten.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What we do</h2>
            <ul className="space-y-4">
              {pillars.map((p) => (
                <li key={p.label} className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/80">
                    {p.label}
                  </p>
                  <p className="mt-1 text-[14px] text-foreground/85">{p.line}</p>
                  <p className="mt-1.5 text-[13px] font-light leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">How we build</h2>
            <p>
              We watch the work before we build. Then we ship a production system: the data it needs,
              the skills it uses, and approval gates that keep humans in control. Discovery and
              validation come first; the interface is what makes an agent legible and worth trusting.
            </p>
          </section>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Working together</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">
              If you have real work for an agent to do — or a system that needs the human side gotten
              right — we&apos;d like to hear about it. We take a small number of projects a year, and
              the fastest way to reach us is through the studio.
            </p>
            <div className="mt-4">
              <a
                href={CONTACT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
              </a>
            </div>
          </section>
        </div>
      </article>
    </div>
  )
}
