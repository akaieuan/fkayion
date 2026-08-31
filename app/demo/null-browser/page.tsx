import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'
import { JsonLd, breadcrumbSchema, projectSchema } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { REPO, PHILOSOPHY } from '@/components/features/demo/null-browser/shared'
import { WhatItIsSection } from '@/components/features/demo/null-browser/what-it-is'
import { AiRemovalSection } from '@/components/features/demo/null-browser/ai-removal'
import { InvariantsSection } from '@/components/features/demo/null-browser/invariants'
import { TransparencySection } from '@/components/features/demo/null-browser/transparency'
import { ShotsSection } from '@/components/features/demo/null-browser/shots'
import { CaptureSection } from '@/components/features/demo/null-browser/capture'
import { EngineeringSection } from '@/components/features/demo/null-browser/engineering'
import { WhereItIsSection } from '@/components/features/demo/null-browser/where-it-is'
import { NotSection } from '@/components/features/demo/null-browser/not'

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

const microLabel = 'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'

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
        <figure className="-mx-6 mt-8 aka-card-well aka-card-media overflow-hidden sm:mx-0">
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
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            GitHub · akaieuan/null-browser
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          <a
            href={PHILOSOPHY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            PHILOSOPHY.md
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          Open source under MPL 2.0. macOS first. Tauri 2 + Rust + React, using the system WebView
          rather than a bundled engine. Not funded, not monetised, not for sale.
        </p>

        <PlainSummary path={PATH} />

        <div className="mt-12 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <WhatItIsSection />

          <AiRemovalSection />

          <InvariantsSection />

          <TransparencySection />

          <ShotsSection />

          <CaptureSection />

          <EngineeringSection />

          <WhereItIsSection />

          <NotSection />
        </div>
      </article>
    </div>
  )
}
