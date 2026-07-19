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
  { src: '/ubik-summary.webp', w: 1600, h: 932, label: 'The Result Explorer scoring sources on recency, peer-review, methodology, and relevance — behind a Review Needed gate that makes you review-and-download rather than download blindly. Left: an edit workflow trimming a draft at a chosen intensity while the Context Engine indexes' },
]

export const metadata = {
  title: 'Ubik Studio — A Desktop-Native AI Research Platform | akaBuild',
  description:
    'Three and a half years building a local-first, desktop-native AI research platform: multi-agent orchestration with batch approval gates, an auditable review-blocker ledger, Human Needed blocks inside documents, and evidence gates that stop an agent from writing claims it cannot cite.',
}

export default function UbikProjectPage() {
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
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          2023–2026 · co-founded · the public site and builds are retired; the test log is what
          remains in the open.
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

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">The product</h2>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                <span className="text-foreground/85">Workspaces.</span> Folder-based and local-first —
                a <code className={code}>.ubik</code> directory turned any folder into a research
                workspace. Storage was SQLite, Yjs CRDT documents, and file bundles on your own disk.
              </li>
              <li>
                <span className="text-foreground/85">The Context Engine.</span> A PDF-ingest pipeline
                indexed sources into searchable bundles, with live indexing status and per-bundle
                stats — the workspace&apos;s memory, built locally.
              </li>
              <li>
                <span className="text-foreground/85">Agentic search.</span> Web and academic search
                across Semantic Scholar and the open web, with results scored for recency,
                peer-review, and methodology — and a review queue between &ldquo;found&rdquo; and
                &ldquo;in your workspace.&rdquo; Flagged papers were previewed and human-approved,
                one by one or not at all.
              </li>
              <li>
                <span className="text-foreground/85">Multi-agent orchestration.</span> A workspace
                orchestrator delegated to a PDF agent (up to five in parallel), a writing agent, and a
                remote research agent — LangGraph state machines with a middleware stack for model
                selection, tool filtering, and parallel limits.
              </li>
              <li>
                <span className="text-foreground/85">UDoc.</span> A rich-text document format
                (TipTap/Yjs) with first-class citation nodes, search-result references, math, page
                breaks — and Human Needed blocks as a native node type. Agents drafted in markdown and
                converted into the editor through a revision pipeline, never editing your document
                directly.
              </li>
              <li>
                <span className="text-foreground/85">Evidence attribution.</span> Citations resolved
                to <code className={code}>[noteId:page]</code> — a claim in a draft linked to the
                quote, the page, and the source PDF. An @-mention system made every artifact
                addressable in chat: PDFs, searches, documents, notes, individual results.
              </li>
              <li>
                <span className="text-foreground/85">Ubik Hopper.</span> A companion Chrome extension
                that &ldquo;hopped&rdquo; webpages and PDFs into the workspace — detecting scholarly
                pages by their citation metadata, capturing true PDF bytes through the DevTools
                protocol, and printing clean pages to PDF when there wasn&apos;t one.
              </li>
              <li>
                <span className="text-foreground/85">And the rest.</span> Zotero integration,
                grep-style search inside source bundles, multi-model support across providers, and a
                web gateway for accounts and sync.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              The human-in-the-loop architecture
            </h2>
            <p>
              The part of Ubik I&apos;m proudest of is that human control wasn&apos;t a confirmation
              dialog bolted on at the end — it was load-bearing architecture, designed in at three
              layers:
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                <span className="text-foreground/85">Batch approval gates.</span> A{' '}
                <code className={code}>hitl_batch_gate</code> middleware collected agent tool calls
                into approval batches and interrupted the graph — the human approved or rejected
                actions in one pass, and agents could ask structured questions back through the same
                channel.
              </li>
              <li>
                <span className="text-foreground/85">The review-blocker ledger.</span> Every gating
                decision lived in an append-only, audited record on disk — independent of the mutable
                document state — with a full status machine from{' '}
                <code className={code}>open</code> through{' '}
                <code className={code}>answered</code>, <code className={code}>resolved</code>,{' '}
                <code className={code}>skipped</code>, and{' '}
                <code className={code}>accepted_with_override</code>. Provenance you could audit after
                the fact, not just a toast you dismissed.
              </li>
              <li>
                <span className="text-foreground/85">Human Needed blocks.</span> Agents emitted typed,
                in-document requests for judgment — a question, a decision, an approval, a
                fill-in — rendered as first-class blocks exactly where the judgment belonged.
                Documents generated at three levels: an annotated scaffold the human fleshes out, an
                aggressive draft that pauses at every inflection point, or polished prose. The
                philosophy had a dial.
              </li>
              <li>
                <span className="text-foreground/85">The evidence gate.</span> My favorite single
                rule in the system: <code className={code}>evidence_needed</code> stopped the writing
                agent from producing academic claims when no citeable notes existed. No evidence, no
                prose. Full stop.
              </li>
            </ul>
          </section>

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
              A pnpm monorepo of twenty packages and roughly three thousand TypeScript files, plus a
              Python agent sidecar: an Electron desktop app talking over local HTTP to a LangGraph
              runtime, a Next.js web gateway, two cloud agent deployments, and the Chrome extension. A
              local-first workspace protocol (<code className={code}>protocol-v2</code>) defined the
              schemas for bundles, notes, citations, manifests, snapshots, resource locks, and the
              review-blocker ledger. 1,038 commits from September 2023 to May 2026 — with the design
              and research that preceded the first commit, about three and a half years of my life.
            </p>
            <p className="text-[12px] text-muted-foreground/70">
              Electron · Next.js · TypeScript · Python · LangGraph + LangChain · TipTap + Yjs · SQLite
              · local-first · Clerk · Semantic Scholar
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
