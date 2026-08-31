import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import circleheadsMark from '@/public/circleheads/circleheads.webp'
import { KickerTags } from '@/components/ui/tag-row'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { CONTACT } from '@/components/features/demo/circleheads/chrome'
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

        <header className="mb-6 flex items-center gap-4">
          <figure className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-black sm:h-20 sm:w-20">
            <Image
              src={circleheadsMark}
              alt="Circleheads mark"
              placeholder="blur"
              sizes="80px"
              className="block h-full w-full object-cover"
            />
          </figure>
          <div>
            <KickerTags>Studio · Applied AI · Brooklyn</KickerTags>
            <h1 className="mt-1 text-[clamp(1.6rem,5vw,2.4rem)] font-extralight leading-none tracking-tight text-foreground/90">
              Circleheads
            </h1>
          </div>
        </header>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          We take a few engagements a year, when the fit is right.
        </p>

        <p className="mt-8 max-w-xl text-sm text-muted-foreground">
          An applied-AI software studio. We build applied AI in production, take a small consulting
          bench, and ship original games on the side.
        </p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <WhoWeAreSection />

          <WhatWeDoSection />

          <HowWeBuildSection />

          <WorkingTogetherSection />
        </div>
      </article>
    </div>
  )
}
