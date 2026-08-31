import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { kicker } from '@/components/features/demo/music-analysis-chat/chrome'
import { WhyItExistsSection } from '@/components/features/demo/music-analysis-chat/why-it-exists'
import { FixtureRuleSection } from '@/components/features/demo/music-analysis-chat/fixture-rule'
import { ArtifactsSection } from '@/components/features/demo/music-analysis-chat/artifacts'
import { SurfacesSection } from '@/components/features/demo/music-analysis-chat/surfaces'
import { ApiFixtureSection } from '@/components/features/demo/music-analysis-chat/api-fixture'
import { WhatIWouldKeepSection } from '@/components/features/demo/music-analysis-chat/what-i-would-keep'
import { MusicChatClosing } from '@/components/features/demo/music-analysis-chat/closing'

const PATH = '/demo/music-analysis-chat'

export const metadata = demoMetadata(PATH, {
  title: 'Music Analysis Chat — What an Answer Should Look Like',
  description:
    'A roster workspace built to answer one question: when an agent replies about music data, what should come back instead of a paragraph? Six artifact types, four surfaces, and a mock API that always returns the same shapes.',
})

export default function MusicAnalysisChatPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background px-6 py-16">
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
          <p
            className="text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-balance text-foreground/90"
            aria-label="Music Analysis Chat"
          >
            Music Analysis Chat
          </p>
        </header>

        <div className="-mx-6 aka-card-well aka-card-media overflow-hidden sm:mx-0">
          <DemoImage
            src="/music-chat/workspace.webp"
            alt="The workspace on open: a sidebar of recent threads and campaign projects, the chat column, and five suggested starting points"
            width={1440}
            height={760}
            className="block h-auto w-full"
            priority
          />
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/demo/music-analysis-chat/app"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Open the demo
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </Link>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          It runs in the browser with no key and no backend. Ask it about saves, social, creators or
          outreach and it answers from a fixture.
        </p>

        <p className={`mt-10 ${kicker}`}>Interactive demo · Mock API</p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          What an answer should look like
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A roster workspace for a label, built to rehearse rich agent output in a domain I already
          know well.
        </p>
        <PlainSummary path={PATH} />

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <WhyItExistsSection />

          <FixtureRuleSection />
        </div>

        <ArtifactsSection />

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <SurfacesSection />

          <ApiFixtureSection />

          <WhatIWouldKeepSection />

          <MusicChatClosing />
        </div>
      </article>
    </div>
  )
}
