import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { WriteUpHeader } from '@/components/features/demo/write-up-header'
import { WhyIBuiltItSection } from '@/components/features/demo/visualizer-eden/why-i-built-it'
import { WebAudioSection } from '@/components/features/demo/visualizer-eden/web-audio'
import { RenderLoopSection } from '@/components/features/demo/visualizer-eden/render-loop'
import { GlslSection } from '@/components/features/demo/visualizer-eden/glsl'
import { WhatItWasForSection } from '@/components/features/demo/visualizer-eden/what-it-was-for'

const PATH = '/demo/visualizer-eden'

export const metadata = demoMetadata(PATH, {
  title: 'Visualizer Eden',
  description:
    'Web Audio analyser, React Three Fiber, and custom GLSL: FFT-driven mesh deformation for a browser audio visualizer.',
})

export default function VisualizerEdenDemoPage() {
  return (
    <DemoShell>
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <WriteUpHeader
        kicker="Audio tool"
        title="Visualizer Eden"
        description="Browser-only pipeline: decoded audio into an FFT, scalar features into shader uniforms, and a custom GLSL vertex stage that displaces a high-poly mesh every frame."
        /* Captured preview. The live WebGL work is on /demo/three-examples. */
        hero={
          <video
            className="block h-auto w-full"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="/visualizer-eden/visualizer-eden-preview-poster.jpg"
            aria-label="Visualizer Eden preview"
          >
            <source src="/visualizer-eden/visualizer-eden-preview.webm" type="video/webm" />
          </video>
        }
        actions={
          <Link
            href="/Visualizer-Eden"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Open Visualizer Eden
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </Link>
        }
        byline="Same-origin app route. Upload WAV and drive the full control surface."
      />
      <PlainSummary path={PATH} />

      <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
        <WhyIBuiltItSection />

        <WebAudioSection />

        <RenderLoopSection />

        <GlslSection />

        <WhatItWasForSection />
      </div>
    </DemoShell>
  )
}
