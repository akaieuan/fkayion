import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { KickerTags } from '@/components/ui/tag-row'
import { DemoImage } from '@/components/ui/demo-image'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { WhatThisIsSection } from '@/components/features/demo/box-populi/what-this-is'
import { HowItsBuiltSection } from '@/components/features/demo/box-populi/how-its-built'
import { NotableEngineeringSection } from '@/components/features/demo/box-populi/notable-engineering'
import { StatusSection } from '@/components/features/demo/box-populi/status'
import { SkillSetSection } from '@/components/features/demo/box-populi/skill-set'
import { BoxPopuliClosing } from '@/components/features/demo/box-populi/closing'

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
          <KickerTags>Client project · Live</KickerTags>
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
            src="/box-populi/box-populi-hero.webp"
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
          <WhatThisIsSection />

          <HowItsBuiltSection />

          <NotableEngineeringSection />

          <StatusSection />

          <SkillSetSection />

          <BoxPopuliClosing />
        </div>
      </article>
    </div>
  )
}
