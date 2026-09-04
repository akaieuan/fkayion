import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { WriteUpHeader } from '@/components/features/demo/write-up-header'
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
      <WriteUpHeader
        kicker="Open source · MCP + Blender · MIT"
        title="◇ Hologram"
        name="Hologram"
        description={
          <>
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
          </>
        }
        actions={
          <a
            href="https://github.com/akaieuan/Hologram"
            target="_blank"
            rel="noopener noreferrer"
            className="aka-button"
          >
            GitHub — akaieuan/Hologram
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
        }
        byline={
          <>
            Open source, MIT. No release to download — <code className="aka-code">uvx</code> fetches and runs
            it on demand. Part of the{' '}
            <Link href="/demo/akaoss" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">akaOSS</Link>{' '}
            studio.
          </>
        }
      />
      <PlainSummary path={PATH} />

      <div className="mt-10 aka-prose">
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
