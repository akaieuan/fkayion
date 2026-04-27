import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

/** Muted violet-gray accent for “ull”, distinct from other project pages */
const nullAccent = 'text-[oklch(0.55_0.04_280)] dark:text-[oklch(0.72_0.05_280)]'

const extLink =
  'underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50'

const philosophyHref =
  'https://github.com/akaieuan/null-browser/blob/main/docs/PHILOSOPHY.md'

export const metadata = {
  title: 'Null Browser: privacy-first Tauri browser | akaBuild',
  description:
    'Open source, pre-v0.1. Tauri 2.0, zero telemetry, local-first Ollama, four AI modes (Chat, Summarize, Search, Save), SQLite artifacts with streaming pipelines, every outbound connection visible, six invariants enforced in code and review.',
}

export default function NullBrowserProjectPage() {
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
          <p
            className="text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-balance"
            aria-label="Null browser"
          >
            <span className="text-foreground/90">N</span>
            <span className={nullAccent}>ull</span>
            <span className={nullAccent}>Browser</span>
          </p>
        </header>

        <div className="-mx-6 overflow-hidden rounded-xl border border-border/80 bg-muted/10 sm:mx-0">
          <video
            className="block h-auto w-full"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Null Browser preview"
          >
            <source src="/null-browser-hero.webm" type="video/webm" />
          </video>
        </div>

        <p className="mt-5 text-[13px] font-light leading-relaxed text-muted-foreground">
          <a
            href="https://github.com/akaieuan/null-browser"
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            github.com/akaieuan/null-browser
            <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5 align-[-0.1em] opacity-70" aria-hidden />
          </a>
          <span className="text-muted-foreground/50"> · </span>
          
          <a
            href={philosophyHref}
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            Read PHILOSOPHY.md
            <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5 align-[-0.1em] opacity-70" aria-hidden />
          </a>
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="https://github.com/akaieuan/null-browser"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            GitHub
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          
          <a
            href={philosophyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            Read PHILOSOPHY.md
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
        </div>
        <p className="mt-3 text-[12px] font-light text-muted-foreground/80">
          Repo, product site, and the living invariant list in the repo.
        </p>

        <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground/90">
          Earlier reference on this site: concept sketch <span className="text-muted-foreground/50">·</span>{' '}
          philosophy draft. The shipped build supersedes both, but these show how the constraints
          evolved.
        </p>

        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
          Open source · pre-v0.1
        </p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          Null
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A browser that refuses to ship what the user didn&apos;t ask for.{' '}
          <a
            href="https://null.sh"
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            null.sh
          </a>
        </p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What this is</h2>
            <p>
              Null is three commitments shipped as one project: a perspective arguing that browsers
              have quietly become advertising infrastructure and that the invariants usually waved
              away as &quot;nice to have&quot; are actually the only load-bearing specification; a
              shell built on Tauri 2.0 + the system WebView: not a Chromium fork, not a vendored
              engine, roughly 15k lines of Rust and TypeScript doing the work of a million; and a
              manifest, six rules that every feature has to earn against, enforced in code and in the
              PR template. The shipped app adds four separate AI surfaces (grounded tab chat, tab
              summarize, user-configured search, save to artifacts), a SQLite artifacts browser, and
              Tauri channel streaming for those flows, all inspectable. The argument, the
              implementation, and the constraints, in one place.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What I actually built</h2>
            <ul className="list-disc space-y-2.5 pl-5 marker:text-muted-foreground/50">
              <li>
                <strong className="font-medium text-foreground/85">Six invariants, enforced in code.</strong>{' '}
                Zero telemetry. No default cloud connections. All AI inference local by default
                (Ollama). Every outbound connection visible in the inspector. Data on disk, not in an
                account. No dark patterns. Each one is a line item in{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">docs/PHILOSOPHY.md</code>{' '}
                and a gate in review.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">The three questions.</strong> Every
                change that touches networking, storage, or AI routing answers from the diff alone:
                what does this store, transmit, remember?
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Tauri 2.0 multi-webview shell.</strong>{' '}
                Every tab is its own child WebView with its own cookie jar. The React chrome lives in
                the main webview and never sees page content. Tab switching is native show/hide, not
                CSS visibility tricks.
              </li>
              <li className="space-y-2.5">
                <p>
                  <strong className="font-medium text-foreground/85">AI as four collaborator modes, not one chat.</strong>{' '}
                  The modes are the philosophy in code. The model never clicks, types, or navigates on
                  its own, it summarizes what is on screen, answers questions about it, saves it, or
                  runs search at your request.
                </p>
                <ul className="ml-0 list-disc space-y-1.5 pl-5 text-muted-foreground marker:text-muted-foreground/50">
                  <li>
                    <strong className="font-medium text-foreground/90">Chat.</strong> Grounded in the active
                    tab with <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">chatWithPage</code>
                    {', '}streams <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">ChatEvents</code>{' '}
                    (grounded, chunk, done, error) over a Tauri channel.
                  </li>
                  <li>
                    <strong className="font-medium text-foreground/90">Summarize.</strong>{' '}
                    <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">summarizeCurrentTab</code>
                    {' '}extracts the page, streams a summary with optional focus, and can save a persistent artifact.
                  </li>
                  <li>
                    <strong className="font-medium text-foreground/90">Search.</strong> Web search via a
                    user-configured search instance from{' '}
                    <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">searchGetInstance</code>
                    {', rendered as '}
                    <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">SearchResult[]</code>
                    {` cards.`}
                  </li>
                  <li>
                    <strong className="font-medium text-foreground/90">Save.</strong>{' '}
                    <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">saveCurrentTab</code>
                    {' '}snapshots a page into the artifacts collection.
                  </li>
                </ul>
                <p>
                  Every mode streams on Tauri channels, not polling for those flows. Every cloud call passes a
                  permission broker and shows in the network inspector before it leaves the machine.
                </p>
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Artifacts as a first-class object.</strong>{' '}
                SQLite stores saved pages and summaries, with <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">listArtifacts</code>,{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">getArtifact</code>, and{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">deleteArtifact</code>, a
                full list-and-detail browser, and markdown in the reader via{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">react-markdown</code> and{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">remark-gfm</code>, openable
                in a dedicated view inside the drawer. The streaming <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">ArtifactEvent</code> path (extracted, chunk, saved, error) is built on Tauri channels instead of polling, local, and visible. The AI never routes you to a new place; it saves what the user
                is already looking at.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Local-first provider router.</strong>{' '}
                Ollama is the only provider enabled at startup. Anthropic and OpenAI-compatible
                providers are opt-in, per-key, per-call. Keys live in the OS keychain, not
                localStorage, not SQLite. <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">ProviderRow</code> is
                provider key management inline: paste an Anthropic or OpenAI key there without
                leaving the chrome.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">The inspector is a surface, not a devtool.</strong>{' '}
                Every subresource, every AI call, every connection. Origins can be blocked live
                through a SQLite-backed allowlist wired into a{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">beforeRequest</code> hook.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">One button to forget everything.</strong>{' '}
                &quot;Clear history &amp; logins&quot; wipes the SQLite history table and clears cookies,{' '}
                localStorage, sessionStorage, and IndexedDB across every live tab webview in one
                transaction.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why it&apos;s unusual</h2>
            <p>
              Most &quot;privacy browsers&quot; are a Chromium fork with a VPN upsell and a logo change. Null
              is the opposite bet: a tiny Tauri shell where every feature has to justify existing
              against six invariants, and every outbound connection is visible without opening a
              devtool. I wrote the manifest that says browsers became ad infrastructure because nobody
              was enforcing the constraints that made them trustworthy, then built the shell that
              enforces those constraints in code, then wrote the review gates that keep them enforced
              as the project grows. Positioning, authorship, engineering, and governance are one piece
              of work. The manifest is not marketing. The manifest is the build.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">How I describe the skill set</h2>
            <p>
              Rust and Tauri 2.0 runtime internals, multi-webview architecture, SQLite schema
              authorship and migrations, React 19 + TypeScript, Tailwind v4 design tokens, Tauri channel
              streaming for chat and artifacts, AI router and permission-broker design, OS keychain
              and inline provider setup, network instrumentation,
              open-source principled positioning, and the discipline to refuse features the invariants
              don&apos;t accept.
            </p>
          </section>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <p className="text-[14px] leading-relaxed text-foreground/85">
              Most browsers ship what the vendor wants to ship. Null ships what the user consented to.
              Zero telemetry, no default cloud, local-first AI, every connection in the open. The
              invariants aren&apos;t copy. They&apos;re the build.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
