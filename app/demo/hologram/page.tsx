import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { KickerTags } from '@/components/ui/tag-row'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { code } from '@/components/features/demo/hologram/shared'
import { WhatThisIsSection } from '@/components/features/demo/hologram/what-this-is'
import { WhyIBuiltItSection } from '@/components/features/demo/hologram/why-i-built-it'
import { FeaturesSection } from '@/components/features/demo/hologram/features'
import { McpSurfaceSection } from '@/components/features/demo/hologram/mcp-surface'
import { HowItWorksSection } from '@/components/features/demo/hologram/how-it-works'
import { DeliveredSection } from '@/components/features/demo/hologram/delivered'
import { StatusSection } from '@/components/features/demo/hologram/status'
import { HologramClosing } from '@/components/features/demo/hologram/closing'

const PATH = '/demo/hologram'

export const metadata = demoMetadata(PATH, {
  title: 'Hologram — Live Observability for Blender → glTF Pipelines',
  description:
    'Live observability and a read-only MCP surface for Blender → glTF pipelines. Watch your AI agent work on your game assets in real time, and hand the same pipeline back to the agent as read-only MCP tools.',
})

export default function HologramProjectPage() {
  return (
    <DemoShell>
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <header className="mb-6">
        <KickerTags>Open source · MCP + Blender · MIT</KickerTags>
        <h1
          className="mt-2 text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-balance"
          aria-label="Hologram"
        >
          <span className="text-foreground/90">◇ Hologram</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
        Live observability and a read-only MCP surface for Blender → glTF pipelines. Watch your AI
        agent work on your game assets in real time.{' '}
        <a
          href="https://github.com/akaieuan/Hologram"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-border hover:decoration-foreground/60 underline-offset-[3px] transition-colors"
        >
          github.com/akaieuan/Hologram
        </a>
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          href="https://github.com/akaieuan/Hologram"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
        >
          GitHub — akaieuan/Hologram
          <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
        </a>
      </div>
      <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
        Open source, MIT. No release to download — <code className={code}>uvx</code> fetches and runs
        it on demand. Part of the{' '}
        <Link href="/demo/akaoss" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">akaOSS</Link>{' '}
        studio.
      </p>
      <PlainSummary path={PATH} />

      <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
        <WhatThisIsSection />

        <WhyIBuiltItSection />

        <FeaturesSection />

        <McpSurfaceSection />

        <HowItWorksSection />

        <DeliveredSection />

        <StatusSection />

        <HologramClosing />
      </div>
    </DemoShell>
  )
}
