import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import akaossMark from '@/public/akaoss.webp'

const SITE = 'https://www.akaoss.dev'
const REPO = 'https://github.com/akaieuan/akaOSS'

export const metadata = {
  title: 'akaOSS — Open-Source Software for Human-in-the-Loop AI | akaBuild',
  description:
    'The akaOSS studio: five open-source projects, one thesis (Assist-Not-Complete), a reproducible research feed, and the HITL Kit component registry — served as one site at akaoss.dev.',
}

type Project = {
  name: string
  href: string
  external?: boolean
  blurb: string
  status: string
}

const measurement: Project[] = [
  {
    name: 'HITL Kit',
    href: '/demo/hitl-kit',
    blurb: 'Human-in-the-loop AI, measured properly. 15 React primitives installable via the shadcn CLI (registry served from this repo) and six @hitl-kit/* npm packages — schemas, gates, and LangGraph / AI-SDK / MCP adapters.',
    status: 'v0.6',
  },
  {
    name: 'eval-kit',
    href: '/demo/eval-kit',
    blurb: 'A measurement instrument for multi-step research agents: YAML suites, per-step tool-match auto-scoring, a five-dimension human rubric, deterministic replay. Humans score, not LLMs.',
    status: 'v0.3.1',
  },
  {
    name: 'tag-kit',
    href: 'https://www.akaoss.dev/projects/tag-kit',
    external: true,
    blurb: 'Structured tagging primitives for annotation workflows: per-modality scoping, scope-aware agreement scoring, headless React.',
    status: 'stable',
  },
]

const tooling: Project[] = [
  {
    name: 'Collapse',
    href: '/demo/collapse',
    blurb: 'A Claude Code skill-building framework — compile MDX lessons and Jupyter notebooks into SKILL.md files Claude reaches for first.',
    status: 'v0.1.0',
  },
  {
    name: 'Hologram',
    href: '/demo/hologram',
    blurb: 'Live observability, guided skills, and a non-destructive MCP surface for Blender → glTF pipelines. Stdlib Python, no build step.',
    status: 'v0.5.0',
  },
]

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
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
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

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">The projects</h2>
            <p>Five projects across two tracks. Each lives in its own repo; here they are on this site.</p>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
                  Human-in-the-loop measurement
                </p>
                <div className="space-y-2">
                  {measurement.map((p) => (
                    <ProjectRow key={p.name} p={p} />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
                  Developer tooling
                </p>
                <div className="space-y-2">
                  {tooling.map((p) => (
                    <ProjectRow key={p.name} p={p} />
                  ))}
                </div>
              </div>
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
