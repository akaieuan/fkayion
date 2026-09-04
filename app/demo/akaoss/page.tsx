import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import akaossMark from '@/public/akaoss/akaoss.webp'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { WriteUpHeader } from '@/components/features/demo/write-up-header'
import { SITE } from '@/components/features/demo/akaoss/shared'
import { ThesisSection } from '@/components/features/demo/akaoss/thesis'
import { ProjectsSection } from '@/components/features/demo/akaoss/projects'
import { OneSiteSection } from '@/components/features/demo/akaoss/one-site'
import { AkaossClosing } from '@/components/features/demo/akaoss/closing'

const REPO = 'https://github.com/akaieuan/akaOSS'

const PATH = '/demo/akaoss'

export const metadata = demoMetadata(PATH, {
  title: 'akaOSS — Open-Source Software for Human-in-the-Loop AI',
  description:
    'The akaOSS studio: five open-source projects, one thesis (Assist-Not-Complete), a reproducible research feed, and the HITL Kit component registry — served as one site at akaoss.dev.',
})

export default function AkaossProjectPage() {
  return (
    <DemoShell>
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <WriteUpHeader
        kicker="Studio · Open source · HITL AI"
        title="akaOSS"
        mark={
          <figure className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-black sm:h-20 sm:w-20">
            <Image
              src={akaossMark}
              alt="akaOSS mark"
              placeholder="blur"
              sizes="80px"
              className="block h-full w-full object-cover"
            />
          </figure>
        }
        description={
          <>
            The open-source studio for human-in-the-loop AI. Five projects, one thesis, a reproducible
            research feed, and the HITL Kit component registry — served as one site.
          </>
        }
        actions={
          <>
            <a
              href={SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="aka-button"
            >
              Visit akaoss.dev
              <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
            </a>
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="aka-button-secondary"
            >
              GitHub — akaieuan/akaOSS
              <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
            </a>
          </>
        }
        byline="Five projects, one thesis, a live research feed. MIT."
      />

      <PlainSummary path={PATH} />

      <div className="mt-10 aka-prose">
        <ThesisSection />

        {/*
          The four toolkits with a page on this site are shown as the same
          plates the index uses, drawn from the same records, so a toolkit
          looks identical wherever you meet it. They were removed from /demo
          itself: akaOSS and the things akaOSS ships were sitting there as
          five equal entries, which made the wall longer without making it
          say more. tag-kit keeps a text row because it has no page here.
        */}
        <ProjectsSection />

        <OneSiteSection />

        <AkaossClosing />
      </div>
    </DemoShell>
  )
}
