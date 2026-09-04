import { ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { WriteUpHeader } from '@/components/features/demo/write-up-header'
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
    <DemoShell>
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <WriteUpHeader
        kicker="Client project · Live"
        title="Box Populi"
        description={
          <>
            A site for a live techno improvisation collective out of New York City. The interesting
            part was never the landing page. It was the constraints.{' '}
            <a
              href="https://www.boxpopuli.live/"
              target="_blank"
              rel="noopener noreferrer"
              className="aka-quiet-link"
            >
              boxpopuli.live
            </a>
          </>
        }
        hero={
          <DemoImage
            src="/box-populi/box-populi-hero.webp"
            alt="Box Populi — hero with rotating word-cloud logo, set player, and booking CTA"
            width={1600}
            height={905}
            sizes="(min-width: 672px) 640px, 100vw"
            className="block h-auto w-full"
            priority
          />
        }
        actions={
          <a
            href="https://www.boxpopuli.live/"
            target="_blank"
            rel="noopener noreferrer"
            className="aka-button"
          >
            Visit boxpopuli.live
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
        }
        byline={
          <>
            Live and deployed on Vercel — the collective&apos;s public face for sets, roster, and
            bookings.
          </>
        }
      />
      <PlainSummary path={PATH} />

      <div className="mt-10 aka-prose">
        <WhatThisIsSection />

        <HowItsBuiltSection />

        <NotableEngineeringSection />

        <StatusSection />

        <SkillSetSection />

        <BoxPopuliClosing />
      </div>
    </DemoShell>
  )
}
