import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'
import { DemoVideo } from '@/components/ui/demo-video'
import { LoopVideo } from '@/components/ui/loop-video'
import { UbikCardArt, type CardArt } from '@/components/demo/ubik/card-art'
import { UbikCanvasViewer } from '@/components/demo/ubik/canvas-viewer'
import { WAYPOINTS } from '@/lib/ubik-canvas'
import { JsonLd, breadcrumbSchema, projectSchema } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'

const code = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]'
const microLabel =
  'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'

type Shot = { src: string; w: number; h: number; label: string }

const hero: Shot = {
  src: '/ubik/splash.webp',
  w: 1506,
  h: 853,
  label: 'The workspace in its final build: the file explorer and an indexed-four-minutes-ago context pill on the left, a source paper in the middle with every claim the agent drew highlighted in place, evidence cards queued for review along the bottom, and the agent working through a four-task plan on the right',
}


/**
 * The 2026 build, recorded.
 *
 * These replace three recordings from an older build that no longer looked
 * like the product. Ordered as the work is: a folder becomes a workspace, the
 * sources come in, the agent reads them, the notes carry their evidence, and a
 * human signs off before any of it lands.
 */
type Demo = {
  /** Base path; the component appends .mp4. */
  src: string
  title: string
  length: string
  summary: string
  /**
   * Which of the marketing site's painted grounds sits behind this card. Six
   * of the seven map onto the section the painting was originally made for.
   */
  art: CardArt
}

/** Every recording is 1280 wide after encoding; heights vary by capture. */
const DEMO_H: Record<string, number> = {
  '/ubik/workspace': 978,
  '/ubik/agent': 950,
  '/ubik/search': 952,
  '/ubik/notes': 958,
  '/ubik/review': 988,
  '/ubik/models': 952,
  '/ubik/hopper': 1054,
}

/**
 * The 2025 build, at full length.
 *
 * Kept rather than replaced. The seven above each show one thing in under a
 * minute and a half; these are whole sessions, and a reader who wants to watch
 * the loop actually close needs one of them rather than seven clips of it. They
 * are a different register, not an older version of the same thing.
 *
 * They sit inside a `<details>`, closed. Ten video frames down one column is a
 * scroll rather than a page, and a disclosure is the one way to carry all of it
 * without spending the reader's attention by default — native, server-rendered,
 * no client component and no state.
 */
const longRuns: Omit<Demo, 'art'>[] = [
  {
    src: '/ubik-demo-walkthrough',
    title: 'Workspace walkthrough',
    length: '3:26',
    summary:
      'The full loop, end to end: ask the agent what’s working in a draft, and it reads the essay against the source PDFs, writes analytical notes, and queues every one for review — accepted or rejected claim by claim, with the evidence panel surfacing the supporting quotes as you go.',
  },
  {
    src: '/ubik-demo-synthesis',
    title: 'Cross-source synthesis',
    length: '2:33',
    summary:
      'Five papers @-mentioned into a single prompt — “find the commonalities” — while the Context Engine indexes the workspace live. The agent reads the peer-reviewed PDFs side by side and builds a synthesis grounded in all five sources, not a summary of one.',
  },
  {
    src: '/ubik-demo-files',
    title: 'The workspace library',
    length: '2:36',
    summary:
      'The file explorer as a research surface: PDFs, documents, saved searches, and folders in one indexed library. Then a multi-note agent run — grep across source bundles, evidence distributed in bulk, three notes finalized — with every artifact landing in the explorer as it’s produced.',
  },
]

/**
 * What the disclosure's tooltip cycles through.
 *
 * Three phrases rather than one, on the site's own trickle animation — the
 * stacked-grid swap the Trickle kit uses, which is pure CSS and needs no
 * JavaScript to run. Kept to a similar length because they share one grid cell,
 * so the pill sizes to the widest and would jump if one were much longer.
 *
 * They say what the summary line does not: how much is in there, and that it is
 * whole sessions rather than more of the same clips.
 */
const TIPS = ['More videos in here', 'Nine more minutes', 'The loop, end to end']

/** One third of the cycle each, matching the kit's own swap timing. */
const TIP_SWAP = 2.6

/** The older runs are webm, from before the encoding was measured. */
const LONG_H: Record<string, number> = {
  '/ubik-demo-walkthrough': 774,
  '/ubik-demo-synthesis': 934,
  '/ubik-demo-files': 802,
}

const demos: Demo[] = [
  {
    src: '/ubik/workspace',
    art: 'stone',
    title: 'A folder becomes a workspace',
    length: '1:25',
    summary:
      'No import step and no database: point Ubik at a directory of PDFs and it indexes them in place, into a local context engine that reports how stale it is in the status bar. The explorer is the file system, so the workspace is still just a folder when you close the app.',
  },
  {
    src: '/ubik/agent',
    art: 'forest',
    title: 'Twelve papers into one prompt',
    length: '1:15',
    summary:
      'Sources are @-mentioned rather than uploaded. A dozen papers named in a single sentence, and the agent reads them in parallel against the draft rather than summarising them one at a time. The model picker sits beside the send button because which model reads your sources is a decision worth leaving with the researcher.',
  },
  {
    src: '/ubik/search',
    art: 'sage',
    title: 'Search that scores its own results',
    length: '0:53',
    summary:
      'Agentic literature search across 146 results and 8 searches, then the Result Explorer: every candidate scored on peer review, methodology, recency and relevance, with an agent analysis under each and a preview before anything is accepted into the workspace.',
  },
  {
    src: '/ubik/notes',
    art: 'pine',
    title: 'A note is its evidence',
    length: '1:16',
    summary:
      'Notes are typed — highlight, key point, claim, evidence, definition, methodology, limitation — and opening one shows the supporting quotes with page numbers behind it. There is no note in Ubik that is only an assertion; if the quotes are not there, the note does not get written.',
  },
  {
    src: '/ubik/review',
    art: 'olive',
    title: 'Human Needed, and the review queue',
    length: '0:30',
    summary:
      'The part I am proudest of. The agent stops mid-document, states the judgment it needs, and waits — skip or submit, counted in the status bar as blocking. Beside it the review queue holds every claim the run produced, each one accepted or rejected on its own, with a jump straight to where it would land.',
  },
  {
    src: '/ubik/models',
    art: 'violet',
    title: 'Model control, per subagent',
    length: '0:50',
    summary:
      'The PDF reader, the writer and the researcher are separate agents, and each one takes its own model and its own reasoning effort. Toolsets switch off individually. A researcher who wants a cheap model reading PDFs and an expensive one writing the draft can have exactly that.',
  },
  {
    src: '/ubik/hopper',
    art: 'rust',
    title: 'Hopper, the capture extension',
    length: '0:29',
    summary:
      'The companion browser extension. Hop a page and it lands in the workspace sources folder, verified and attributed, syncing to the desktop app when it is connected. The web half of a local-first tool: the browser is where sources are found, and the file system is where they live.',
  },
]

const PATH = '/demo/ubik'
const TITLE = 'Ubik Studio — A Desktop-Native AI Research Platform'
const DESCRIPTION =
  'Three and a half years co-founding a desktop-native AI research platform where agents did the gathering and drafting, and humans kept the final say — with evidence behind every claim.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: 'article',
    url: PATH,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: hero.src, width: hero.w, height: hero.h, alt: hero.label }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [hero.src],
  },
}

/**
 * One capability, as a product card.
 *
 * The painted ground runs to the edges, the recording sits on it like a print
 * on a wall, and the words sit on the paint rather than under the card. That is
 * how the marketing site presented these, and it is the reason the art was
 * commissioned in the first place: a screenshot on a plain background reads as
 * documentation, and the same screenshot on a painted one reads as a product.
 *
 * The whole card is server-rendered except the recording, which is a thin
 * client wrapper that starts and stops it on scroll. Nothing about the art, the
 * copy or the layout reaches the browser as JavaScript.
 */
/**
 * The card row's measure: the site's own container width, centred on the
 * article's narrower column.
 *
 * An inline style rather than a Tailwind class because the value is a `calc`
 * over a `min` over a viewport unit, which arbitrary-value syntax can express
 * only as an unreadable string of underscores. This is one constant used once.
 */
const ROW_W = 'min(100vw - 3rem, 1180px)'
const CARD_ROW: React.CSSProperties = {
  width: ROW_W,
  marginInline: `calc((100% - ${ROW_W}) / 2)`,
}

function ProductCard({ demo }: { demo: Demo }) {
  return (
    <figure className="relative overflow-hidden rounded-2xl border border-border/60">
      <UbikCardArt art={demo.art} className="absolute inset-0 h-full w-full" />

      {/*
        A wash between the paint and the type. The paintings are mid-tone and
        the copy is white; without this the headings sit on whatever value the
        ridge happens to be at that point, which changes across the card.
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55" />

      <div className="relative p-4 sm:p-6 lg:p-8">
        <figcaption className="mb-4 sm:mb-5">
          <h3 className="text-[17px] font-medium tracking-tight text-white sm:text-[19px]">
            {demo.title}
          </h3>
          <p className="mt-1.5 max-w-xl text-[13px] font-light leading-relaxed text-white/75">
            {demo.summary}
          </p>
        </figcaption>

        <div className="overflow-hidden rounded-lg shadow-2xl shadow-black/40 ring-1 ring-white/10">
          <LoopVideo
            src={demo.src}
            poster={`${demo.src}-poster.webp`}
            width={1280}
            height={DEMO_H[demo.src]}
            label={`${demo.title} — ${demo.summary}`}
          />
        </div>

        <p className="mt-2.5 text-right font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
          {demo.length}
        </p>
      </div>
    </figure>
  )
}

export default function UbikProjectPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background px-6 py-16">
      <JsonLd
        data={[
          projectSchema({
            path: PATH,
            name: 'Ubik Studio',
            description: DESCRIPTION,
            image: hero.src,
            keywords: [
              'AI research platform',
              'human-in-the-loop',
              'agentic research',
              'local-first',
              'Electron',
              'product design',
              'evaluation framework',
            ],
          }),
          breadcrumbSchema([
            { name: 'Projects', path: '/demo' },
            { name: 'Ubik Studio', path: PATH },
          ]),
        ]}
      />
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

          Product · Desktop AI research platform · 2023–2026
          </p>
          <h1
            className="mt-2 text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight"
            aria-label="Ubik Studio"
          >
            <span className="text-foreground/90">Ubik Studio</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
          A desktop-native, local-first AI research platform. Three and a half years building the
          human side of agentic research, before it had a name.
          </p>
        </header>

        <figure className="-mx-6 aka-card-well aka-card-media overflow-hidden sm:mx-0">
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
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Team test log
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          <a
            href="https://www.reddit.com/r/ubikstudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            r/ubikstudio
            <ArrowUpRight className="h-4 w-4 opacity-60" aria-hidden />
          </a>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          2023–2026 · co-founded · the public site and builds are retired; the test log and the
          subreddit are what remain in the open.
        </p>
        <PlainSummary path={PATH} />

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

          {/*
            The cards take the page, two across.
            
            ── Why they break out ────────────────────────────────────────────
            
            Everything else here is a column of text at the reading measure,
            which is the right width to read at and the wrong one to watch a
            screen recording in. These are recordings of a three-pane desktop
            app; at reading width the panes are too small to tell apart, which
            defeats the point of showing them.
            
            ── Why this width ────────────────────────────────────────────────
            
            1180px is not a new number. It is `max-w-site` — the width the
            project plates take on the landing and on /demo — so a reader who
            has seen the card wall meets the same grid here rather than a
            third measure invented for one page. The old version used
            breakpoint-tuned negative margins (-mx-24, -mx-40) that landed on
            896px, which matched nothing.
            
            The arithmetic is one line: give the block a width, then split the
            difference between it and the column across both margins. The
            negative margins fall out automatically and stay symmetrical, and
            `min()` against the viewport means the breakout shrinks into the
            gutter on a narrow window instead of opening a scrollbar — so
            there is no separate mobile rule to keep in sync.
            
            ── Why two across ────────────────────────────────────────────────
            
            Seven short loops of one product read as a set side by side. In a
            single column each one is a separate event and the section runs
            seven screens long. `items-start` because the clips have different
            aspect ratios and a row should not stretch the shorter card to
            match the taller one.
          */}
          <div style={CARD_ROW}>
            <p className={microLabel}>The product, in motion</p>
            <p className="mt-2 max-w-xl text-[12px] font-light leading-relaxed text-muted-foreground/70">
              Seven silent recordings of the last build, March 2026. Each one loads and starts when
              you reach it, and stops when you leave.
            </p>
            <div className="mt-6 grid items-start gap-5 lg:grid-cols-2">
              {demos.map((demo) => (
                <ProductCard key={demo.src} demo={demo} />
              ))}
            </div>
          </div>

          <div>
            <details className="group mt-8 aka-card-well px-5 py-4">
              <summary className="cursor-pointer list-none text-[13px] font-medium text-foreground/85 marker:content-none">
                {/*
                  The label is the hover target, not the whole summary row: a
                  tooltip centred on a full-width bar would float somewhere off
                  in the margin. `group/tip` is named so it cannot be caught by
                  the `group-open` the caret already uses.
                */}
                <span className="group/tip relative inline-flex items-center gap-2">
                  <span className="font-mono text-[10px] text-muted-foreground/60 transition-transform group-open:rotate-90">
                    ▸
                  </span>
                  Three longer runs from the 2025 build
                  <span className="text-[11px] font-light text-muted-foreground/55">
                    2:33 – 3:26
                  </span>

                  {/*
                    Same pill as the header's theme control, so a tooltip means
                    one thing on this site. `aria-hidden` for the same reason it
                    is there: the disclosure already names itself, and a
                    rotating label read aloud mid-cycle is noise.
                  */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-full z-10 mt-2.5 grid -translate-x-1/2 justify-items-center whitespace-nowrap rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium tracking-wide text-background opacity-0 transition-opacity duration-200 group-hover/tip:opacity-100 group-focus-visible/tip:opacity-100"
                  >
                    {TIPS.map((tip, i) => (
                      <span
                        key={tip}
                        // One cell for all three, so the pill keeps its width
                        // whichever phrase is currently up.
                        className="aka-trickle-swap col-start-1 row-start-1 block"
                        style={{
                          animationDelay: `${i * TIP_SWAP}s`,
                          animationDuration: `${TIPS.length * TIP_SWAP}s`,
                        }}
                      >
                        {tip}
                      </span>
                    ))}
                  </span>
                </span>
              </summary>
              <p className="mt-2 pl-5 text-[12px] font-light leading-relaxed text-muted-foreground/70">
                Whole sessions rather than single capabilities. The interface is a year older and
                the loop is the same one.
              </p>
              <div className="mt-5 space-y-8">
                {longRuns.map((run) => (
                  <figure key={run.src}>
                    <div className="aka-card-well aka-card-media overflow-hidden rounded-lg">
                      <DemoVideo
                        src={run.src}
                        poster={`${run.src}-poster.webp`}
                        format="webm"
                        width={1280}
                        height={LONG_H[run.src]}
                        label={`${run.title} — ${run.summary}`}
                      />
                    </div>
                    <figcaption className="mt-2">
                      <span className="text-[13px] font-medium text-foreground/85">{run.title}</span>
                      <span className="ml-2 text-[11px] text-muted-foreground/50">{run.length}</span>
                      <p className="mt-1 text-[12px] font-light leading-relaxed text-muted-foreground/75">
                        {run.summary}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </details>
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




          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">The design board</h2>
            <p>
              Ubik never had a design team, a seat of anything for everybody, or the time to keep a
              spec in sync with itself. What it had was Excalidraw files that nobody ever closed.
              This is one of them, running from 2024 into 2025, left exactly as it was.
            </p>
            <p>
              It is a snapshot rather than the archive. Plenty of boards came before it, and the 2023
              and 2024 ones from the Fiig years and the ed-tech work sprawl further than this. I
              picked this one because it is a fair picture of how I actually think while a product is
              still being decided.
            </p>
            <p>
              It worked because it refused to be one thing. The same board carried landing page
              explorations, user story wireframes, screenshots of the running app with corrections
              drawn straight over them, and plain notes to whoever opened it next. A sketch on the
              left, the decision written beside it, and underneath that the file path it applied to.
              That middle layer, looser than a spec and more durable than a conversation, is where
              most of this product actually got decided.
            </p>
            <p>
              It is messy in places and I have left it messy. Areas trail off, copy is labelled not
              solid, and one region is simply the words ICONS NEEDED above a list of what still
              needed drawing. That is what a working document looks like while it is still working.
              Excalidraw being free is not a small detail either: in a team with scrappy limits it
              meant everyone could open it, and no part of how we thought sat behind a licence we
              were deciding whether to renew.
            </p>
            <div className="not-prose pt-1">
              <UbikCanvasViewer waypoints={WAYPOINTS} />
            </div>
            <p>
              What the board eventually taught me was when to stop drawing. Once my engineer
              teammate had a framework standing, it was faster to develop the flow directly in code:
              build the primitives, get the real UI working inside the constraints that already
              existed, and skip a wireframe that could only ever approximate them. That shift made me
              pick up a lot of new skills on the way and it changed how I design. I still open a
              board when a problem is genuinely unresolved, but much of what used to become a sketch
              now goes straight into components.
            </p>
          </section>

          <section className="aka-card-well px-5 py-4">
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
