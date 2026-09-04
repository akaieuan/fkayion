import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { WriteUpHeader } from '@/components/features/demo/write-up-header'
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
    <DemoShell>
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <WriteUpHeader
        kicker="Interactive demo · Mock API"
        title="Music Analysis Chat"
        /*
          The page never had a lead under its title: the one paragraph it has
          belongs to the heading below. The lead is the page's own description,
          which is the same sentence the crawler is given.
        */
        description={metadata.description as string}
        hero={
          <DemoImage
            src="/music-chat/workspace.webp"
            alt="The workspace on open: a sidebar of recent threads and campaign projects, the chat column, and five suggested starting points"
            width={1440}
            height={760}
            className="block h-auto w-full"
            priority
          />
        }
        actions={
          <Link
            href="/demo/music-analysis-chat/app"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Open the demo
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </Link>
        }
        byline="It runs in the browser with no key and no backend. Ask it about saves, social, creators or outreach and it answers from a fixture."
      />

      <h2 className="mt-10 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
        What an answer should look like
      </h2>
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
    </DemoShell>
  )
}
