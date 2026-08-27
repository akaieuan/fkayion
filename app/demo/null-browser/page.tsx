import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'
import { JsonLd, breadcrumbSchema, projectSchema } from '@/components/seo/json-ld'

/**
 * Null, rewritten against the repo as it stands.
 *
 * The previous version of this page described a browser that no longer exists.
 * It led on four AI surfaces — grounded tab chat, summarize, search, save —
 * with a local Ollama router, an OS-keychain provider setup and a streaming
 * artifacts pipeline. All of that shipped, and all of it has since been taken
 * back out: invariant 3 used to read "AI inference is local by default" and now
 * reads "no inference in the browser".
 *
 * A portfolio page that describes removed features is worse than no page, so
 * this is a rewrite rather than an edit. The removal is kept on the page rather
 * than quietly dropped, because deciding to delete a working feature is the
 * more interesting engineering judgment and the repo's own milestone list is
 * honest about it.
 *
 * Fully server-rendered; the screenshots are the only thing fetched.
 */

const extLink =
  'underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50'
const code = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]'
const microLabel = 'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'

const REPO = 'https://github.com/akaieuan/null-browser'
const PHILOSOPHY = `${REPO}/blob/main/docs/PHILOSOPHY.md`
const SECURITY = `${REPO}/blob/main/docs/SECURITY.md`

const PATH = '/demo/null-browser'
const TITLE = 'Null: a browser that sends nothing by default'
const DESCRIPTION =
  'Open source, MPL 2.0. A macOS browser on Tauri 2 and Rust with no telemetry, no accounts and no AI: pages captured as markdown on disk, every outbound request visible in a Network Inspector you can block from, six invariants enforced in code and review.'
const HERO = '/null/overview.webp'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: 'article',
    url: PATH,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: HERO, width: 1600, height: 1000, alt: 'Null, showing pinned sites and saved notes' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [HERO] },
}

/** The six, verbatim in substance from docs/PHILOSOPHY.md. */
const invariants: [string, string][] = [
  ['Zero telemetry', 'No analytics, no crash reporting to a server, no usage statistics, no phone-home of any kind.'],
  ['No default cloud connections', 'It must start up and browse without contacting any service beyond the site you asked for.'],
  ['No inference in the browser', 'It does not run or call a language model. It captures pages as markdown; you take that markdown wherever you like.'],
  ['Every outbound connection is visible', 'Through the Network Inspector, in real time, grouped by origin.'],
  ['Data lives with you', 'SQLite and plain markdown on disk. No mandatory sync, no cloud account.'],
  ['No dark patterns', 'No forced onboarding, no retention tricks, no notification spam.'],
]

const shots: { src: string; alt: string; caption: string }[] = [
  {
    src: '/null/network-inspector.webp',
    alt: 'The Network Inspector listing four requests across three origins, with google-analytics.com struck through and marked blocked',
    caption:
      'The Network Inspector, mid-page-load. Four requests, three origins, one blocked: google-analytics.com is struck through and cancelled at the webview layer, and still logged so you can see what was refused.',
  },
  {
    src: '/null/notes.webp',
    alt: 'A note card open beside the page, with saved pages and selections listed and a copy button on every row',
    caption:
      'Notes, summoned beside the page rather than replacing it. Save a page or a selection as markdown, annotate it, copy it out. Every note is written twice: once to SQLite as the index, once to a real file in ~/Documents/Null.',
  },
]

export default function NullBrowserProjectPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <JsonLd
        data={[
          projectSchema({
            path: PATH,
            name: 'Null',
            description: DESCRIPTION,
            image: HERO,
            keywords: [
              'privacy browser',
              'Tauri 2',
              'Rust',
              'local-first',
              'open source',
              'macOS',
              'WebKit',
              'markdown notes',
            ],
          }),
          breadcrumbSchema([
            { name: 'Projects', path: '/demo' },
            { name: 'Null', path: PATH },
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

        <p className={microLabel}>Open source · Personal project · macOS</p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          Null
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A browser where nothing is sent, nothing is stored and nothing is tracked, unless you
          explicitly choose otherwise.
        </p>

        <figure className="-mx-6 mt-8 overflow-hidden rounded-xl border border-border/80 bg-muted/10 sm:mx-0">
          <DemoImage
            src={HERO}
            alt="Null, showing pinned sites and tabs in the left source list and recent notes as cards on the new-tab surface"
            width={1600}
            height={1000}
            className="block h-auto w-full"
            priority
          />
        </figure>
        <p className="mt-2 text-[11px] font-light text-muted-foreground/60">
          Pinned sites and tabs in the left source list, recent notes as cards on the new-tab
          surface. The whole window is glass over macOS vibrancy.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            GitHub · akaieuan/null-browser
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          <a
            href={PHILOSOPHY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            PHILOSOPHY.md
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          Open source under MPL 2.0. macOS first. Tauri 2 + Rust + React, using the system WebView
          rather than a bundled engine. Not funded, not monetised, not for sale.
        </p>

        <div className="mt-12 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What it is</h2>
            <p>
              The name is the thesis. <code className={code}>null</code> is what a function returns
              when there is nothing to return, and that is the correct default for a browser. Null is
              a macOS desktop browser built on Tauri 2 in Rust with a React and TypeScript interface,
              rendering through the system WebView, so pages look the way they would in Safari while
              the browser around them is written to different defaults.
            </p>
            <p>
              There is no account system, no sync service and no telemetry endpoint. It does not
              phone home on launch, does not check for updates unless asked, and ships no crash
              reports anywhere. Bookmarks, history, notes and settings live on the machine in SQLite,
              plain markdown and localStorage, readable with{' '}
              <code className={code}>sqlite3</code>, <code className={code}>grep</code> or any text
              editor.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              The part I want on record: it had AI, and I removed it
            </h2>
            <p>
              Null shipped a full AI layer. Local Ollama by default, bring-your-own Anthropic key in
              the OS keychain, chat grounded in the current tab, summarize, multi-turn conversation
              history in SQLite. Four milestones of work. It is gone, and the milestone list in the
              repo says so rather than pretending it never happened.
            </p>
            <p>
              The reasoning is short. A browser that holds an API key is a browser you have to trust,
              and after living with it the only part that consistently earned its place was the part
              that needed no model at all: getting a clean copy of the page out of the browser and
              into somewhere else. So that is what is left. Null captures; you decide what reads it.
            </p>
            <p>
              Invariant 3 was rewritten from &ldquo;inference is local by default&rdquo; to{' '}
              <strong className="font-medium text-foreground/90">no inference in the browser</strong>
              , and migration 006 drops the conversation tables. Putting a model back, local or
              remote, now needs a decision recorded in{' '}
              <a href={PHILOSOPHY} target="_blank" rel="noopener noreferrer" className={extLink}>
                PHILOSOPHY.md
              </a>{' '}
              before any code. Deleting working software you spent months on is the judgment I am
              most pleased with on this project.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">The six invariants</h2>
            <p>
              Not defaults. Invariants: code that violates one is a bug, and every pull request that
              touches networking or storage answers three questions from the diff alone. What does
              this store? What does this transmit? What does this remember?
            </p>
            <ol className="mt-4 list-none space-y-0 border-t border-border/70 p-0">
              {invariants.map(([name, detail], i) => (
                <li
                  key={name}
                  className="grid gap-x-4 border-b border-border/50 py-3 sm:grid-cols-[1.5rem_minmax(0,1fr)]"
                >
                  <span className="hidden font-mono text-[11px] tabular-nums text-muted-foreground/50 sm:block">
                    {i + 1}
                  </span>
                  <span>
                    <strong className="font-medium text-foreground/90">{name}.</strong>{' '}
                    <span className="text-[14px]">{detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Radical transparency, as a surface
            </h2>
            <p>
              The Network Inspector is a first-class panel rather than something buried in devtools.
              It streams every outbound request the browser makes, grouped by origin, and a shield
              next to any origin cancels its future requests at the webview layer. Subresources to a
              blocked origin still log, marked blocked, so you can see what was refused rather than
              only what got through. The buffer is capped and never persisted; the blocklist is the
              only part that survives a restart.
            </p>
          </section>

          {shots.map((shot) => (
            <figure key={shot.src} className="!mt-8">
              <div className="-mx-6 overflow-hidden rounded-xl border border-border/80 bg-muted/10 sm:mx-0">
                <DemoImage
                  src={shot.src}
                  alt={shot.alt}
                  width={1600}
                  height={1000}
                  className="block h-auto w-full"
                />
              </div>
              <figcaption className="mt-2 text-[12px] font-light leading-relaxed text-muted-foreground/75">
                {shot.caption}
              </figcaption>
            </figure>
          ))}

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Capture, not inference
            </h2>
            <p>
              Notes is where the browser earns its keep. A note opens beside the page rather than
              covering it, autosaves as you type, and carries the page&apos;s URL as its source line.
              Saving a page runs Mozilla Readability and Turndown to get the article as markdown;
              saving a selection converts whatever is highlighted. Both run inside the tab&apos;s own
              WebView with vendored copies, so no network call of any kind is involved.
            </p>
            <p>
              Every note is written twice: to SQLite, which is the index the list reads, and to{' '}
              <code className={code}>~/Documents/Null/</code> as a real markdown file with YAML front
              matter. The file is the copy that matters. It opens in Obsidian, it greps, and it is
              still readable long after you stop running Null. The sync goes both ways, and it
              refuses the dangerous cases: a file older than Null&apos;s own last write is treated as
              a stale mirror rather than an edit, and an empty file never erases a note, because
              editors save by truncate-then-write and reading mid-save must not eat the copy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              The engineering worth pointing at
            </h2>
            <ul className="list-disc space-y-2.5 pl-5 marker:text-muted-foreground/50">
              <li>
                <strong className="font-medium text-foreground/85">Chrome height is a constant.</strong>{' '}
                Opening a second tab or saving a first bookmark used to change it, which physically
                reflowed the page you were reading. Tab creation and tab resizing now consume one
                function, <code className={code}>contentRect()</code>, so they cannot disagree about
                where the page goes.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Shortcuts are native menu accelerators</strong>{' '}
                rather than listeners in the shell. Not cosmetic: the shell and each tab are separate
                native webviews, so a shell listener stops receiving keys the moment you click into a
                page, which is exactly when Reload and Back matter.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">The privileged webview is pinned to its own origin.</strong>{' '}
                A strict CSP on the shell, <code className={code}>http</code>/
                <code className={code}>https</code>-only tab navigation refused at the IPC boundary,
                and a navigation guard so a remote link surfaced inside the shell can only ever open
                in a tab. Written up in{' '}
                <a href={SECURITY} target="_blank" rel="noopener noreferrer" className={extLink}>
                  SECURITY.md
                </a>
                .
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Favicons are captured, never fetched.</strong>{' '}
                Taken from pages as you visit them and validated in Rust, because fetching them would
                breach invariant 2. A hostname-derived letter mark stands in until the first visit.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Extraction rides an image beacon.</strong>{' '}
                Readability and Turndown run in the tab and return through a custom{' '}
                <code className={code}>null-event://</code> scheme as chunked{' '}
                <code className={code}>Image.src</code> requests rather than{' '}
                <code className={code}>fetch</code>, because <code className={code}>img-src</code> is
                broad where <code className={code}>connect-src</code> is locked down on exactly the
                sites worth clipping.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Split view and pin folders.</strong>{' '}
                Drag a tab or a pin out of the sidebar onto the page for a live drop target; drop one
                pin dead-centre on another to fold them, iOS-style. Deleting a folder re-roots its
                pins, so arrangement is never a place data can be lost.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Session restore that costs nothing.</strong>{' '}
                Restored tabs come back dormant, as rows with no webview, and load when selected.
                Twenty restored tabs cost one page load.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Where it is</h2>
            <p>
              M0 through M2, M6, M7 and M8 are done: browsing, bookmarks and history; the Network
              Inspector with subresource capture and per-origin blocking; shell hardening; the
              sidebar navigation rebuild; and the Zen-informed redesign that brought glass, split
              view, the Notes editor, pin folders, popups, downloads, per-tab zoom and find.
            </p>
            <p>
              Next is subresource blocking through WebKit&apos;s own{' '}
              <code className={code}>WKContentRuleList</code>, a command bar that searches notes,
              bookmarks and history together, and FTS5 search over what you have actually seen. A
              SearXNG provider already exists in the Rust backend with no interface in front of it,
              because the search view was part of the AI drawer that was removed. It gets a UI or it
              gets cut.
            </p>
            <p className="text-[12px] text-muted-foreground/70">
              Tauri 2 · Rust · React 19 · TypeScript · Tailwind v4 · SQLite · WebKit · MPL 2.0
            </p>
          </section>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What Null is not</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">
              Not a Chromium fork, because one maintainer cannot keep up with Chromium. Not an AI
              browser: it captures, it does not think. Not a product, not funded, not monetised, not
              for sale. Not a competitor to Chrome or Safari or Firefox, and it does not need to
              displace them to matter. Not for everyone. It is for people who would rather have
              control than convenience.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
