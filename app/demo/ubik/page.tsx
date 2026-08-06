import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'

const code = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]'
const microLabel =
  'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'

type Shot = { src: string; w: number; h: number; label: string }

const hero: Shot = {
  src: '/ubik-workspace.webp',
  w: 1600,
  h: 962,
  label: 'The three-pane workspace — agent chat on the left, the source paper in the middle, and an evidence panel on the right where each extracted claim is accepted or rejected by hand (two still pending in the header)',
}

const gallery: Shot[] = [
  { src: '/ubik-evidence.webp', w: 1600, h: 945, label: 'An evidence card — a single claim, the paragraph it was drawn from, and the eight supporting quotes (with page numbers) that back it, opened beside the highlighted source note' },
  { src: '/ubik-human-needed.webp', w: 1600, h: 1206, label: 'A Human Needed block embedded mid-document: the agent stops, states the judgment it needs, offers two candidate drafts and a free-write, and waits — skip or submit, tracked in the status bar' },
  { src: '/ubik-litreview.webp', w: 1600, h: 1156, label: 'The Review Sources queue — each flagged paper (some auto, one manual/paywalled) previewed in full before it is accepted, driven entirely by the keyboard: arrow to navigate, enter to accept, esc to reject' },
  { src: '/ubik-explorer.webp', w: 1600, h: 975, label: 'Agentic search returns a ranked shortlist of flagged papers on the left; on the right, a drafted document where every claim carries an inline citation back to a real source (King 1, King 2 …)' },
  { src: '/ubik-summary.webp', w: 1600, h: 932, label: 'The Result Explorer scoring sources on recency, peer-review, methodology, and relevance — behind a Review Needed gate that makes you review-and-download rather than download blindly. Left: an edit workflow trimming a draft at a chosen intensity while sources index in the background' },
]

type Demo = { src: string; poster: string; title: string; length: string; summary: string }

const demos: Demo[] = [
  {
    src: '/ubik-demo-walkthrough.webm',
    poster: '/ubik-demo-walkthrough-poster.webp',
    title: 'Workspace walkthrough',
    length: '3:26',
    summary:
      'The full loop, end to end: ask the agent what’s working in a draft, and it reads the essay against the source PDFs, writes analytical notes, and queues every one for review — accepted or rejected claim by claim, with the evidence panel surfacing the supporting quotes as you go.',
  },
  {
    src: '/ubik-demo-synthesis.webm',
    poster: '/ubik-demo-synthesis-poster.webp',
    title: 'Cross-source synthesis',
    length: '2:33',
    summary:
      'Five papers @-mentioned into a single prompt — “find the commonalities” — while the Context Engine indexes the workspace live. The agent reads the peer-reviewed PDFs side by side and builds a synthesis grounded in all five sources, not a summary of one.',
  },
  {
    src: '/ubik-demo-files.webm',
    poster: '/ubik-demo-files-poster.webp',
    title: 'The workspace library',
    length: '2:36',
    summary:
      'The file explorer as a research surface: PDFs, documents, saved searches, and folders in one indexed library. Then a multi-note agent run — grep across source bundles, evidence distributed in bulk, three notes finalized — with every artifact landing in the explorer as it’s produced.',
  },
]

export const metadata = {
  title: 'Ubik Studio — A Desktop-Native AI Research Platform | akaBuild',
  description:
    'Three and a half years co-founding a desktop-native AI research platform where agents did the gathering and drafting, and humans kept the final say — with evidence behind every claim.',
}

export default function UbikProjectPage() {
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

        <header className="mb-6">
          <p
            className="text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight"
            aria-label="Ubik Studio"
          >
            <span className="text-foreground/90">Ubik Studio</span>
          </p>
        </header>

        <figure className="-mx-6 overflow-hidden rounded-xl border border-border/80 bg-muted/10 sm:mx-0">
          <DemoImage
            src={hero.src}
            alt={hero.label}
            width={hero.w}
            height={hero.h}
            sizes="(min-width: 672px) 640px, 100vw"
            className="block h-auto w-full"
            priority
          />
        </figure>
        <p className="mt-2 text-[11px] font-light text-muted-foreground/60">{hero.label}</p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="https://kraa.io/team-test-log042"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Team test log
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          <a
            href="https://www.reddit.com/r/ubikstudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            r/ubikstudio
            <ArrowUpRight className="h-4 w-4 opacity-60" aria-hidden />
          </a>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          2023–2026 · co-founded · the public site and builds are retired; the test log and the
          subreddit are what remain in the open.
        </p>

        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
          Product · Desktop AI research platform · 2023–2026
        </p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          Ubik Studio
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A desktop-native, local-first AI research platform — three and a half years of building the
          human side of agentic research, before it had a name.
        </p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What Ubik was</h2>
            <p>
              Ubik Studio was a desktop research environment where AI agents did the gathering,
              reading, and drafting — and the human stayed in the loop at every point of judgment. A
              researcher opened a folder, and it became a workspace: sources indexed into a local
              context engine, agents searching the literature and reading PDFs in parallel, documents
              drafted with citations that traced back to real pages — and a review queue standing
              between every consequential agent action and the workspace it wanted to touch.
            </p>
            <p>
              The thesis was written directly into the agents themselves. From the writing agent&apos;s
              system prompt:
            </p>
            <blockquote className="border-l-2 border-border pl-4 text-[14px] italic text-foreground/80">
              &ldquo;Your job is not to replace human thinking — it is to amplify it. Optimize for the
              loop: you draft, the human refines, you incorporate, the human approves. Intelligence is
              maximized not when either side works alone, but when the handoff between AI and human is
              so seamless it feels like one mind thinking.&rdquo;
            </blockquote>
            <p>
              That sentence was written years before &ldquo;human-in-the-loop&rdquo; became an
              industry talking point. Ubik spent three and a half years trying to actually earn it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">The product</h2>
            <p>
              A desktop app where any folder became a research workspace. Sources went in — papers,
              PDFs, webpages captured by a companion browser extension — and were indexed locally.
              Agents searched the literature, read sources in parallel, and drafted documents where
              every claim traced back to a real quote on a real page. Everything an agent wanted to
              do of consequence passed through a human first: sources were approved before they
              entered the workspace, drafts paused for judgment where judgment was needed, and
              nothing was written that couldn&apos;t be cited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              The human-in-the-loop architecture
            </h2>
            <p>
              The part of Ubik I&apos;m proudest of is that human control wasn&apos;t a confirmation
              dialog bolted on at the end — it was load-bearing architecture. Agent actions were
              approved in batches, not rubber-stamped one toast at a time. Every review decision was
              recorded in an auditable trail you could revisit after the fact. Agents could stop
              mid-document and ask for human judgment exactly where it belonged, at a depth you could
              dial from rough scaffold to polished draft. And the rule I still think about most: if
              there was no evidence to cite, the agent didn&apos;t get to write the claim.
            </p>
          </section>

          <div>
            <p className={microLabel}>The product, in motion</p>
            <div className="mt-3 space-y-8">
              {demos.map((demo) => (
                <figure key={demo.src}>
                  <div className="overflow-hidden rounded-xl border border-border/80 bg-muted/10">
                    {/* eslint-disable-next-line jsx-a11y/media-has-caption -- silent screen recordings */}
                    <video
                      controls
                      muted
                      playsInline
                      preload="none"
                      poster={demo.poster}
                      className="block h-auto w-full"
                    >
                      <source src={demo.src} type="video/webm" />
                    </video>
                  </div>
                  <figcaption className="mt-2">
                    <span className="text-[13px] font-medium text-foreground/85">{demo.title}</span>
                    <span className="ml-2 text-[11px] text-muted-foreground/50">{demo.length}</span>
                    <p className="mt-1 text-[12px] font-light leading-relaxed text-muted-foreground/75">
                      {demo.summary}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div>
            <p className={microLabel}>The product, in frames</p>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {gallery.map((shot) => (
                <figure key={shot.src}>
                  <div className="overflow-hidden rounded-lg border border-border/80 bg-muted/10">
                    <DemoImage
                      src={shot.src}
                      alt={shot.label}
                      width={shot.w}
                      height={shot.h}
                      sizes="(min-width: 640px) 320px, 100vw"
                      className="block h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-1.5 text-[11px] font-light text-muted-foreground/70">
                    {shot.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">The engineering</h2>
            <p>
              A large multi-package system: a desktop app, a web gateway, cloud agent deployments,
              and a browser extension, with a local-first storage model underneath it all. 1,038
              commits from September 2023 to May 2026 — with the design and research that preceded
              the first commit, about three and a half years of my life.
            </p>
            <p className="text-[12px] text-muted-foreground/70">
              Electron · Next.js · TypeScript · Python · local-first
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">My role</h2>
            <p>
              I co-founded Ubik and led product design end to end: the workspace model, the review
              surfaces, the evidence and citation UX, the Human Needed grammar, and the copy and
              interaction conventions across every surface. I built front-end throughout, and ran the
              user research cycles — interviews, behavioral observation, session replays, and the{' '}
              <a href="https://kraa.io/team-test-log042" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">team test log</a>{' '}
              that documented them in public.
            </p>
            <p>
              On the agent side I owned the system prompts, skills, and custom datasets — and I
              designed and built the <strong className="font-medium text-foreground/90">custom
              evaluation framework and ARC eval suite</strong> we used to train, tune, and regression-test
              our agents and the agent-orchestration systems that coordinated them. That evaluation
              work is what actually moved the product: measurable gains in output accuracy, answer
              quality, and real-world usability — not benchmark numbers in isolation, but whether a
              researcher could trust and use what came back. It&apos;s the part of Ubik least visible
              in a screenshot and the part that mattered most to the results.
            </p>
          </section>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">A closed chapter</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">
              The public site and the builds are retired, and I&apos;m at peace with that — Ubik was a
              complete thing, and it stands on its own. Three and a half years of asking one question
              in earnest: what does it take to make an AI research tool a person can actually trust?
              Everything I learned answering it — about evaluation, about evidence, about where a human
              has to stay in the loop — I still carry. But this page is the record of the work itself,
              not a stepping stone to something else.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
