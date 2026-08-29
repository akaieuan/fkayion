import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'

const PATH = '/demo/box-populi'

export const metadata = demoMetadata(PATH, {
  title: 'Box Populi — Live Techno Collective Site',
  description:
    'On-brand site for a NYC live-techno collective. Custom audio players over the SoundCloud Widget, multiple live streams coordinated so they never overlap, an iOS quirk handled honestly.',
})

export default function BoxPopuliProjectPage() {
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

        <header className="mb-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">

          Client project · Live
          </p>
          <h1
            className="mt-2 text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-balance"
            aria-label="Box Populi"
          >
            <span className="text-foreground/90">Box Populi</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
          A site for a live techno improvisation collective out of New York City. The interesting
          part was never the landing page. It was the constraints.{' '}
          <a
            href="https://www.boxpopuli.live/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border hover:decoration-foreground/60 underline-offset-[3px] transition-colors"
          >
            boxpopuli.live
          </a>
          </p>
        </header>

        <div className="-mx-6 aka-card-well aka-card-media overflow-hidden sm:mx-0">
          <DemoImage
            src="/box-populi-hero.webp"
            alt="Box Populi — hero with rotating word-cloud logo, set player, and booking CTA"
            width={1600}
            height={905}
            sizes="(min-width: 672px) 640px, 100vw"
            className="block h-auto w-full"
            priority
          />
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="https://www.boxpopuli.live/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Visit boxpopuli.live
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          Live and deployed on Vercel — the collective&apos;s public face for sets, roster, and
          bookings.
        </p>
        <PlainSummary path={PATH} />

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What this is</h2>
            <p>
              Box Populi (&ldquo;Box of the People&rdquo;) is a rotating cast of NYC artists who play
              continuous, multi-hour improvised techno sets. The site is the collective&apos;s public
              face: a club-flavored landing page, a full roster with a profile page for every member,
              an in-page set player, and a booking form. It is{' '}
              <strong className="font-medium text-foreground/90">roster-driven</strong>, so the crew
              can grow without anyone touching layout code.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">How it&apos;s built</h2>
            <p>
              The site is a thin presentation layer over a typed data model. Everything the public
              sees is generated from typed files in{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">data/</code>:
              network constants, the artist roster and lookup helpers, shows, role labels, and shared
              types. Adding an artist or swapping the featured set is a one-line data change, and the
              per-artist pages generate themselves from the roster. Pages stay declarative.
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                <span className="text-foreground/85">Structure.</span> A multi-page Next.js App
                Router app, not a single landing page: a home page (hero, manifesto, Listen player,
                crew grid), a roster index, a dynamically generated profile page for each artist, a
                Resend-backed booking form, and an unlisted, non-indexed sandbox for work-in-progress
                pieces and client conversations. Around two dozen routes in all.
              </li>
              <li>
                <span className="text-foreground/85">Stack.</span> Next.js 16 (App Router, React
                Server Components), TypeScript 5 end to end, React 19, Tailwind CSS v4 with Radix UI
                primitives and lucide-react. Geist plus a VCR display face for headings. Resend for
                the booking form, the official SoundCloud Widget API for audio, Vercel with CI/CD on
                push to main.
              </li>
              <li>
                <span className="text-foreground/85">SEO.</span> The Next.js Metadata API drives
                titles, Open Graph, and Twitter cards, alongside robots and sitemap routes. The
                sandbox is excluded from indexing.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Notable engineering</h2>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                <span className="text-foreground/85">One-at-a-time audio coordination.</span> Several
                players can be on screen at once: a persistent header player that keeps playing
                across navigation, the Listen playlist, and per-artist related tracks. A small
                module-level registry (no React context) lets every player join a shared bus, and
                whoever starts playing pauses the rest. Because it is a module singleton, the
                coordination survives client-side navigation. The header keeps playing as you move
                between pages, but starting a track elsewhere still pauses it.
              </li>
              <li>
                <span className="text-foreground/85">Custom players over the SoundCloud Widget.</span>{' '}
                The players are fully custom and on-brand (dark glass cards, a bespoke transport and
                tracklist) but driven by the official SoundCloud Widget API behind a hidden iframe.
                A single module centralizes embed-URL building and one-time script loading, so
                SoundCloud stays the sanctioned host while the interface stays on theme.
              </li>
              <li>
                <span className="text-foreground/85">The iOS first-tap reality, handled honestly.</span>{' '}
                iOS Safari only starts audio inside a synchronous user gesture. A custom button
                calling <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">play()</code>{' '}
                across a cross-origin iframe via postMessage is asynchronous, so the gesture is lost
                and iOS needs a second tap. Rather than hide this, the site shows a one-time
                &ldquo;Double Tap&rdquo; hint on touch devices that flips to the track name once
                playback starts. An overlay workaround was prototyped and rejected after on-device
                testing. An unofficial-API approach was rejected on terms-of-service and reliability
                grounds. Both calls are documented in the commit history.
              </li>
              <li>
                <span className="text-foreground/85">No device sniffing.</span> All responsive and
                capability behavior is CSS: width breakpoints for layout, input-capability queries
                (<code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">pointer-coarse</code>,{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">hover</code>) for
                touch-specific UI. No{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">isMobile</code>,
                no user-agent checks. A narrow desktop window never sees the touch hint.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Status</h2>
            <p>
              Live and deployed on Vercel. A git-backed CMS (Keystatic) is built and parked on a
              branch, ready to let the crew edit copy and roster content without code. Not yet
              merged.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Skill set, end to end</h2>
            <p className="text-[14px] leading-relaxed">
              Brand-faithful visual design, typed data modeling, Next.js App Router and React Server
              Components, Tailwind CSS v4, third-party API integration (SoundCloud Widget, Resend),
              cross-origin audio coordination, capability-query responsive design, and SEO plumbing.
              Plus the judgment calls, documented in the commit history, about which workarounds to
              ship and which to reject.
            </p>
          </section>

          <section className="aka-card-well px-5 py-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">The interesting part</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">
              It was never the landing page. It was the constraints. Multiple live players that
              cannot talk over each other. A sanctioned but clunky audio API kept behind an on-brand
              interface. An iOS limitation handled by telling the user the truth instead of hiding
              it. A roster-driven data model that lets the collective grow without touching a line of
              layout code.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
