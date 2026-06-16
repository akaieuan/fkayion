import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

const linkSage =
  'text-[oklch(0.4_0.08_152.2)] underline decoration-border underline-offset-[3px] transition-colors hover:text-[oklch(0.32_0.085_152)] dark:text-[oklch(0.707_0.108_152.216)] dark:hover:text-[oklch(0.78_0.1_152)]'
const linkMuted =
  'text-muted-foreground underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground'

export const metadata = {
  title: 'HITL practice — product design & research | akaBuild',
  description:
    'How product work, user validation, and the HITL Kit fit together—with links to interactive demos and write-ups on this site.',
}

export default function HitlPracticePage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        <header className="mb-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
            Product design &amp; research
          </p>
          <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
            HITL practice
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The same story as the home page product section, with paths into prototypes, the Kit, and
            how validation with real users shaped the work.
          </p>
        </header>

        <div className="mt-2 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="https://www.reddit.com/user/akaieuan/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Ubik Studio
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          <a
            href="https://kraa.io/team-test-log042"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            Team test log (Kraa)
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
          <Link
            href="/demo/research-os"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            Research OS (prototype)
          </Link>
          <Link
            href="/demo/hitl-kit"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            HITL Kit write-up
          </Link>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          Or jump to the{' '}
          <Link href="/demo" className={linkMuted}>
            full demo list
          </Link>
          .
        </p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What I build</h2>
            <p>
              Interfaces for complex AI systems that people actually trust. Approval flows, citation
              verification, design systems, and the copy conventions that make agentic tools feel
              legible. I use Claude and Claude Code in a pipeline into Cursor; when I sketch by hand, I
              often pipe that through v0 or Claude first, then finish in Cursor.
            </p>
            <p>
              The public face of that systems work is the{' '}
              <Link href="/demo/hitl-kit" className={linkSage}>
                HITL Kit
              </Link>
              : a perspective paper, eleven primitives, and a shadcn registry. Before and alongside the
              shipped site at{' '}
              <a
                href="https://www.hitlkit.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkSage}
              >
                hitlkit.dev
              </a>
              , I iterated the same ideas in this repo: the{' '}
              <Link href="/demo/hitl-ai" className={linkSage}>
                HITL-AI widget showcase
              </Link>{' '}
              and the{' '}
              <Link href="/demo/hitl-ai/sheet" className={linkSage}>
                component sheet
              </Link>{' '}
              are the earlier, in-site reference implementations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">How I validate</h2>
            <p>
              Mixed-methods research: structured interviews, behavioral observation, and session
              replays, synthesized into prioritized UX decisions rather than slide-deck summaries. I
              anchor every cycle in trust, evidence attribution, and meaningful human control. Findings
              feed interaction specs, flow changes, system prompts, and microcopy in the same shipping
              rhythm as the product.
            </p>
            <p>
              A running example of that loop in the open is the{' '}
              <a
                href="https://kraa.io/team-test-log042"
                target="_blank"
                rel="noopener noreferrer"
                className={linkSage}
              >
                team test log
              </a>
              : feedback and observation turned into concrete improvements, documented where partners
              and future-us can read the arc—not only the conclusions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Prototyping in the browser</h2>
            <p>
              I prototype in code, at scale, not in a separate design handoff. Cursor and Claude Code
              are how I turn intent into high-quality, working surfaces—web and desktop—fast enough
              to stay aligned with the people using the product. The same weeks usually include
              interviews, screen replays, and light data analysis, so the next build is shaped by
              what we are seeing in the field, not by a static milestone.
            </p>
            <p>
              <Link href="/demo/research-os" className={linkSage}>
                Research OS
              </Link>{' '}
              is a deliberately simple, browser-based slice of that idea: a multi-panel surface with
              agentic search, chat, and human-in-the-loop approval so I can stress-test legibility,
              density, and control in isolation. It is not the whole story—just a visible checkpoint.
              Related slices are in{' '}
              <Link href="/demo/music-analysis-chat" className={linkSage}>
                Music Analysis Chat
              </Link>{' '}
              and the rest of the{' '}
              <Link href="/demo" className={linkSage}>
                demo index
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">How the HITL Kit was born</h2>
            <p>
              The Kit did not start as a component drop. It started from a measurement argument: most
              enterprise AI pilots are judged on autonomous completion while real deployment is
              collaborative. I wrote that case into a single narrative—paper, installable library, and
              registry—so the critique and the UI stay coupled. The{' '}
              <Link href="/demo/hitl-kit" className={linkSage}>
                HITL Kit project page
              </Link>{' '}
              breaks down what actually shipped; the in-repo HITL-AI pages are a fork in the timeline
              worth comparing.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">A measurement problem</h2>
            <p>
              95% of enterprise AI initiatives deliver zero measurable return, not from technology
              failure but from a measurement crisis. Current benchmarks saturate within months and
              optimize for autonomous task completion; the longer piece traces that gap across
              cognitive science, scaffolding research, and enterprise data, and argues for the
              assist-not-complete paradigm: AI designed to augment human agency rather than replace
              it.{' '}
              <a
                href="https://kraa.io/abmpinai1"
                target="_blank"
                rel="noopener noreferrer"
                className={linkSage}
              >
                Read the paper
                <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5 align-[-0.1em] opacity-70" aria-hidden />
              </a>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Current work</h2>
            <p>
              Co-founded{' '}
              <a href="https://www.reddit.com/user/akaieuan/" target="_blank" rel="noopener noreferrer" className={linkSage}>
                Ubik Studio
              </a>
              , a desktop-native AI research platform. Tied to that: production-ready UI in Next.js and
              Electron, user research (interviews, observation, session synthesis), approval flows and
              citation UI, copy and terminology standards, and datasets plus prompts for multi-hop
              research agents. The{' '}
              <a
                href="https://kraa.io/team-test-log042"
                target="_blank"
                rel="noopener noreferrer"
                className={linkSage}
              >
                team test log
              </a>{' '}
              is one window into how that work gets validated with real users.
            </p>
          </section>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <p className="text-[14px] leading-relaxed text-foreground/85">
              Demos on this site are not decoration—they are where I rehearse the same HITL patterns that
              show up in product and in the Kit. Research OS for end-to-end flows, HITL-AI for primitive
              comparison, the Kit and Kraa write-ups for the argument and the field notes.
            </p>
            <p className="mt-3 text-[12px] text-muted-foreground">
              Mirror:{' '}
              <a href="/#section-1" className={linkMuted}>
                links section
              </a>{' '}
              on the home page.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
