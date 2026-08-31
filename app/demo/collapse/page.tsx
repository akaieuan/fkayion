import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { KickerTags } from '@/components/ui/tag-row'
import { DemoImage } from '@/components/ui/demo-image'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { code, type Shot } from '@/components/features/demo/collapse/shared'
import { WhatThisIsSection } from '@/components/features/demo/collapse/what-this-is'
import { HowItWorksSection } from '@/components/features/demo/collapse/how-it-works'
import { IngestorsSection } from '@/components/features/demo/collapse/ingestors'
import { EnginePersistenceSection } from '@/components/features/demo/collapse/engine-persistence'
import { WhyCollapseSection } from '@/components/features/demo/collapse/why-collapse'
import { StatusSection } from '@/components/features/demo/collapse/status'
import { GallerySection } from '@/components/features/demo/collapse/gallery'
import { CollapseClosing } from '@/components/features/demo/collapse/closing'

const hero: Shot = { src: '/collapse/collapse-home.webp', w: 1600, h: 1000, label: 'Concepts index' }

const PATH = '/demo/collapse'

export const metadata = demoMetadata(PATH, {
  title: 'Collapse — Pattern → SKILL.md Compiler for Claude Code',
  description:
    'A Claude Code skill-building framework: three pluggable ingestors — MDX lessons, Jupyter .ipynb / MyST .md, and a one-file extension pattern for any other source format — feed a typed pipeline that compiles each pattern into a SKILL.md or an MCP server scaffold, written atomically to ~/.claude/skills/. Next.js 16 + TypeScript.',
})

export default function CollapseProjectPage() {
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
          <KickerTags>Open source · Developer tool · Claude Code</KickerTags>
          <h1
            className="mt-2 text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight"
            aria-label="Collapse"
          >
            <span className="text-foreground/90">Collapse</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
          A Claude Code skill-building framework: a pattern to SKILL.md compiler.{' '}
          <a
            href="https://github.com/akaieuan/collapse"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border hover:decoration-foreground/60 underline-offset-[3px] transition-colors"
          >
            github.com/akaieuan/collapse
          </a>
          </p>
        </header>

        <figure className="-mx-6 aka-card-well aka-card-media overflow-hidden sm:mx-0">
          <a href={hero.src} target="_blank" rel="noopener noreferrer" className="group block">
            <DemoImage
              src={hero.src}
              alt={hero.label}
              width={hero.w}
              height={hero.h}
              sizes="(min-width: 672px) 640px, 100vw"
              className="block h-auto w-full transition-opacity group-hover:opacity-95"
              priority
            />
          </a>
        </figure>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="https://github.com/akaieuan/collapse"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            GitHub — akaieuan/collapse
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          Open source, public repo. Clone, <code className={code}>pnpm dev</code>, and collapse a lesson
          into a skill. Part of the{' '}
          <Link href="/demo/akaoss" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">akaOSS</Link>{' '}
          studio.
        </p>
        <PlainSummary path={PATH} />

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <WhatThisIsSection />

          <HowItWorksSection />

          <IngestorsSection />

          <EnginePersistenceSection />

          <WhyCollapseSection />

          <StatusSection />

          <GallerySection />

          <CollapseClosing />
        </div>
      </article>
    </div>
  )
}
