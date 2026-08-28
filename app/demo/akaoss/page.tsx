import Image from 'next/image'
import Link from 'next/link'
import { ProjectGrid } from '@/components/ui/project-grid'
import { childProjects } from '@/lib/projects'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import akaossMark from '@/public/akaoss.webp'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'

const SITE = 'https://www.akaoss.dev'
const REPO = 'https://github.com/akaieuan/akaOSS'

const PATH = '/demo/akaoss'

export const metadata = demoMetadata(PATH, {
  title: 'akaOSS — Open-Source Software for Human-in-the-Loop AI',
  description:
    'The akaOSS studio: five open-source projects, one thesis (Assist-Not-Complete), a reproducible research feed, and the HITL Kit component registry — served as one site at akaoss.dev.',
})

type Project = {
  name: string
  href: string
  external?: boolean
  blurb: string
  status: string
}

/** Which track a toolkit belongs to, keyed by its title in the project list. */
const MEASUREMENT = new Set(['HITL Kit', 'EVAL Kit'])

/** tag-kit has no write-up on this site, so it stays a row that links out. */
const tagKit: Project = {
  name: 'tag-kit',
  href: 'https://www.akaoss.dev/projects/tag-kit',
  external: true,
  blurb:
    'Structured tagging primitives for annotation workflows. Most tagging in HITL tools is unstructured strings you can never aggregate or score across; tag-kit gives them per-modality scoping, scope-aware agreement scoring, and headless React. Zero runtime deps.',
  status: 'stable',
}

function ProjectRow({ p }: { p: Project }) {
  const inner = (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[14px] text-foreground/90 group-hover:text-foreground">{p.name}</span>
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/60">
          {p.status}
        </span>
      </div>
      <p className="mt-1 text-[13px] font-light leading-relaxed text-muted-foreground">{p.blurb}</p>
    </>
  )
  const cls =
    'group block rounded-xl border border-border/70 bg-muted/10 px-4 py-3.5 transition-colors hover:bg-muted/25'
  return p.external ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={p.href} className={cls}>
      {inner}
    </Link>
  )
}

export default function AkaossProjectPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground lg:hidden"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        <header className="mb-6 flex items-center gap-4">
          <figure className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-black sm:h-20 sm:w-20">
            <Image
              src={akaossMark}
              alt="akaOSS mark"
              placeholder="blur"
              sizes="80px"
              className="block h-full w-full object-cover"
            />
          </figure>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
              Studio · Open source · HITL AI
            </p>
            <h1 className="mt-1 text-[clamp(1.6rem,5vw,2.4rem)] font-extralight leading-none tracking-tight text-foreground/90">
              akaOSS
            </h1>
          </div>
        </header>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={SITE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Visit akaoss.dev
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            GitHub — akaieuan/akaOSS
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          Five projects, one thesis, a live research feed. MIT.
        </p>

        <PlainSummary path={PATH} />

        <p className="mt-8 max-w-xl text-sm text-muted-foreground">
          The open-source studio for human-in-the-loop AI. Five projects, one thesis, a reproducible
          research feed, and the HITL Kit component registry — served as one site.
        </p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">The thesis</h2>
            <p>
              Current benchmarks ask “can the model complete this task autonomously?” In deployment,
              real users want an assistant that respects their authority, preserves their agency, and
              makes them better over time.{' '}
              <strong className="font-medium text-foreground/90">Assist-Not-Complete</strong>: evaluate
              AI on whether it assists humans without displacing them, not on whether it can finish the
              task alone. The argument is made in full in the paper,{' '}
              <a href="https://www.akaoss.dev/paper" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">An AI Measurement Problem</a>
              , and tested in public in the{' '}
              <a href="https://www.akaoss.dev/research" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">research feed</a>{' '}
              — every finding is a reproducible experiment run with the kits below.
            </p>
          </section>

          {/*
            The four toolkits with a page on this site are shown as the same
            plates the index uses, drawn from the same records, so a toolkit
            looks identical wherever you meet it. They were removed from /demo
            itself: akaOSS and the things akaOSS ships were sitting there as
            five equal entries, which made the wall longer without making it
            say more. tag-kit keeps a text row because it has no page here.
          */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">The projects</h2>
            <p>
              Five projects across two tracks. Each lives in its own repo; four of them have a
              write-up here.
            </p>

            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
                Human-in-the-loop measurement
              </p>
              <ProjectGrid
                items={childProjects('akaOSS').filter((p) => MEASUREMENT.has(p.title))}
                flush
                columns={2}
              />
            </div>

            <div className="pt-2">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
                Developer tooling
              </p>
              <ProjectGrid
                items={childProjects('akaOSS').filter((p) => !MEASUREMENT.has(p.title))}
                flush
                columns={2}
              />
            </div>

            <div className="pt-2">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
                Also in the registry
              </p>
              <ProjectRow p={tagKit} />
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">One site, one source of truth</h2>
            <p>
              <a href={SITE} target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">akaoss.dev</a>{' '}
              ties them together. The projects each live in their own repos; this one holds the{' '}
              <strong className="font-medium text-foreground/90">HITL Kit registry</strong> (the source
              of truth for the shadcn primitives, served at <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">/r/*.json</code>, with CI failing on drift), the{' '}
              <strong className="font-medium text-foreground/90">research feed</strong> (question → runs
              against real models → human-scored results → checked-in run JSON → repro link), and the
              paper. Next.js 16, Tailwind v4, file-based content — no CMS, no database.
            </p>
          </section>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Where it comes from</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">
              akaOSS is where the human-side-of-applied-AI work becomes reusable: the kits are the
              measurement instruments, the research feed is the evidence, and the paper is the
              argument. It&apos;s built at{' '}
              <Link href="/demo/circleheads" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">Circleheads</Link>.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
