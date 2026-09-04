import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import circleheadsMark from '@/public/circleheads/circleheads.webp'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { WriteUpHeader } from '@/components/features/demo/write-up-header'
import { CONTACT } from '@/components/features/demo/circleheads/shared'
import { WhoWeAreSection } from '@/components/features/demo/circleheads/who-we-are'
import { WhatWeDoSection } from '@/components/features/demo/circleheads/what-we-do'
import { HowWeBuildSection } from '@/components/features/demo/circleheads/how-we-build'
import { WorkingTogetherSection } from '@/components/features/demo/circleheads/working-together'

const SITE = 'https://circleheads.com'

const PATH = '/demo/circleheads'

export const metadata = demoMetadata(PATH, {
  title: 'Circleheads — Applied-AI Software Studio',
  description:
    'Circleheads is a two-person Brooklyn studio building applied AI in production, taking a short senior consulting bench, and shipping original games. We watch the work first, then ship agents that do it with approval gates that keep humans in control.',
})

export default function CircleheadsProjectPage() {
  return (
    <DemoShell>
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <WriteUpHeader
        kicker="Studio · Applied AI · Brooklyn"
        title="Circleheads"
        mark={
          <figure className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-black sm:h-20 sm:w-20">
            <Image
              src={circleheadsMark}
              alt="Circleheads mark"
              placeholder="blur"
              sizes="80px"
              className="block h-full w-full object-cover"
            />
          </figure>
        }
        description={
          <>
            An applied-AI software studio. We build applied AI in production, take a small consulting
            bench, and ship original games on the side.
          </>
        }
        actions={
          <>
            <a
              href={CONTACT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
            </a>
            <a
              href={SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted/40"
            >
              circleheads.com
              <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
            </a>
          </>
        }
        byline="We take a few engagements a year, when the fit is right."
      />

      <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
        <WhoWeAreSection />

        <WhatWeDoSection />

        <HowWeBuildSection />

        <WorkingTogetherSection />
      </div>
    </DemoShell>
  )
}
