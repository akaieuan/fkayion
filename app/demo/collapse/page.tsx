import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { WriteUpHeader } from '@/components/features/demo/write-up-header'
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
    <DemoShell>
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <WriteUpHeader
        kicker="Open source · Developer tool · Claude Code"
        title="Collapse"
        description={
          <>
            A Claude Code skill-building framework: a pattern to SKILL.md compiler.{' '}
            <a
              href="https://github.com/akaieuan/collapse"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-border hover:decoration-foreground/60 underline-offset-[3px] transition-colors"
            >
              github.com/akaieuan/collapse
            </a>
          </>
        }
        hero={
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
        }
        actions={
          <a
            href="https://github.com/akaieuan/collapse"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            GitHub — akaieuan/collapse
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
        }
        byline={
          <>
            Open source, public repo. Clone, <code className={code}>pnpm dev</code>, and collapse a lesson
            into a skill. Part of the{' '}
            <Link href="/demo/akaoss" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">akaOSS</Link>{' '}
            studio.
          </>
        }
      />
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
    </DemoShell>
  )
}
