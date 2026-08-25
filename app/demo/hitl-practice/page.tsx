import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

const linkSage =
  'text-[oklch(0.4_0.08_152.2)] underline decoration-border underline-offset-[3px] transition-colors hover:text-[oklch(0.32_0.085_152)] dark:text-[oklch(0.707_0.108_152.216)] dark:hover:text-[oklch(0.78_0.1_152)]'
const linkMuted =
  'text-muted-foreground underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground'

export const metadata = {
  title: 'How I work — product design & research practice',
  description:
    'How I design for human-in-the-loop AI: watch the work first, prototype in code, measure what matters. The practice behind the HITL Kit, the studios, and the demos on this site.',
}

export default function HitlPracticePage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground lg:hidden"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        <header className="mb-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
            Practice · Product design &amp; research
          </p>
          <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
            How I work
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The method behind everything else on this site: watch the work first, prototype in
            code, and measure whether AI actually helps the person using it.
          </p>
        </header>

        <div className="mt-2 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/demo/hitl-kit"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            HITL Kit
          </Link>
          <a
            href="https://kraa.io/team-test-log042"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            Team test log
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
          <Link
            href="/demo/research-os"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            Research OS
          </Link>
          <Link
            href="/demo/ubik"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            Ubik Studio
          </Link>
        </div>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What I build</h2>
            <p>
              Interfaces for AI systems that people actually trust: approval and review flows,
              evidence and citation UX, and the copy conventions that make agentic tools legible. I
              spent three and a half years doing this at{' '}
              <Link href="/demo/ubik" className={linkSage}>
                Ubik Studio
              </Link>{' '}
              before &ldquo;human-in-the-loop&rdquo; was an industry phrase, and I do it today at{' '}
              <Link href="/demo/circleheads" className={linkSage}>
                Circleheads
              </Link>{' '}
              — shipping production agents behind approval gates — and in the open at{' '}
              <Link href="/demo/akaoss" className={linkSage}>
                akaOSS
              </Link>
              , where the{' '}
              <Link href="/demo/hitl-kit" className={linkSage}>
                HITL Kit
              </Link>{' '}
              packages the patterns as nineteen installable primitives.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Watch the work first
            </h2>
            <p>
              Before designing anything, I watch people do the job the software is supposed to
              help with. Mixed-methods research — structured interviews, behavioral observation,
              session replays — synthesized into prioritized UX decisions rather than slide-deck
              summaries. Every cycle is anchored in three questions: does the person trust what
              they&apos;re seeing, can they trace where it came from, and do they stay in control?
            </p>
            <p>
              Findings feed interaction specs, flow changes, system prompts, and microcopy in the
              same shipping rhythm as the product. One window into that loop is the public{' '}
              <a
                href="https://kraa.io/team-test-log042"
                target="_blank"
                rel="noopener noreferrer"
                className={linkSage}
              >
                team test log
              </a>
              : real feedback and observation turned into concrete improvements, documented so you
              can read the arc — not only the conclusions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Prototype in code, at scale
            </h2>
            <p>
              I don&apos;t hand off static mockups. Claude Code and Cursor turn intent into
              working surfaces — web and desktop — fast enough that the build stays aligned with
              what research is finding the same week. The demos on this site are that practice in
              public:{' '}
              <Link href="/demo/research-os" className={linkSage}>
                Research OS
              </Link>{' '}
              is a deliberately small slice of an agentic research workspace built to stress-test
              legibility, density, and control;{' '}
              <Link href="/demo/music-analysis-chat" className={linkSage}>
                Music Analysis Chat
              </Link>{' '}
              rehearses rich agent output in a domain I know from the inside; the{' '}
              <Link href="/demo/hitl-ai" className={linkSage}>
                HITL-AI showcase
              </Link>{' '}
              and{' '}
              <Link href="/demo/hitl-ai/sheet" className={linkSage}>
                component sheet
              </Link>{' '}
              are the earlier in-repo iterations that became the Kit.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Measure what matters
            </h2>
            <p>
              95% of enterprise AI initiatives deliver zero measurable return — not because the
              models are bad, but because we measure the wrong thing. Benchmarks ask whether a
              model can complete a task alone; deployment asks whether it respects the user&apos;s
              authority, preserves their agency, and makes them better over time. I design and
              evaluate for the second question. The full argument is my paper,{' '}
              <a
                href="https://kraa.io/abmpinai1"
                target="_blank"
                rel="noopener noreferrer"
                className={linkSage}
              >
                An AI Measurement Problem
                <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5 align-[-0.1em] opacity-70" aria-hidden />
              </a>
              , and the working version is the{' '}
              <Link href="/demo/eval-kit" className={linkSage}>
                eval-kit
              </Link>{' '}
              — an evaluation framework where humans score, not LLMs. Every primitive in the HITL
              Kit is tied to a claim the paper defends; if it can&apos;t be, it doesn&apos;t ship.
            </p>
          </section>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              The demos aren&apos;t decoration
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">
              Everything on this site rehearses the same discipline that ships in product: Research
              OS for end-to-end flows, the HITL-AI pages for primitive comparison, the Kit and the
              Kraa write-ups for the argument and the field notes. If you want the full index,
              it&apos;s all on the{' '}
              <Link href="/demo" className={linkMuted}>
                projects page
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
