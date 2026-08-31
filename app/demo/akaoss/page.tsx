import Image from 'next/image'
import Link from 'next/link'
import { KickerTags } from '@/components/ui/tag-row'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import akaossMark from '@/public/akaoss/akaoss.webp'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
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
              src={akaossMark}
              alt="akaOSS mark"
              placeholder="blur"
              sizes="80px"
              className="block h-full w-full object-cover"
            />
          </figure>
          <div>
            <KickerTags>Studio · Open source · HITL AI</KickerTags>
            <h1 className="mt-1 text-[clamp(1.6rem,5vw,2.4rem)] font-extralight leading-none tracking-tight text-foreground/90">
              akaOSS
            </h1>
          </div>
        </header>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={SITE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Visit akaoss.dev
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            GitHub — akaieuan/akaOSS
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          Five projects, one thesis, a live research feed. MIT.
        </p>
        <p className="mt-8 max-w-xl text-sm text-muted-foreground">
          The open-source studio for human-in-the-loop AI. Five projects, one thesis, a reproducible
          research feed, and the HITL Kit component registry — served as one site.
        </p>

        <PlainSummary path={PATH} />

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
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
      </article>
    </div>
  )
}
