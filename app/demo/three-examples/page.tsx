import { DemoShell } from '@/components/features/demo/demo-shell'
import { WriteUpHeader } from '@/components/features/demo/write-up-header'
import { OrbHero } from '@/components/features/demo/three-examples/orb-hero'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { WhyThisPageExistsSection } from '@/components/features/demo/three-examples/why-this-page-exists'
import { TheLiquidOrbSection } from '@/components/features/demo/three-examples/the-liquid-orb'
import { KeepingItPoliteSection } from '@/components/features/demo/three-examples/keeping-it-polite'
import { VisualizerEdenSection } from '@/components/features/demo/three-examples/visualizer-eden'
import { BrooklynDeadSection } from '@/components/features/demo/three-examples/brooklyn-dead'

const PATH = '/demo/three-examples'

export const metadata = demoMetadata(PATH, {
  title: 'Three.js Examples',
  description:
    'The liquid shader orb from the old landing hero, running live: hand-written GLSL over Three.js, and the loading and rendering rules that let WebGL sit on a portfolio page.',
})

export default function ThreeExamplesDemoPage() {
  return (
    <DemoShell>
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <WriteUpHeader
        kicker="WebGL"
        title="Three.js Examples"
        description="The Three.js work built for this site, gathered on one page: a liquid orb whose vertex and fragment stages are hand-written GLSL, plus the loading and rendering rules that keep a real-time scene from taxing everything around it."
        hero={<OrbHero />}
        /*
          No card. The orb is the page's own artifact rather than a picture of
          one, so it floats on the page ground the way it did on the old landing
          hero. A media frame around it only cropped the motion it exists to
          show.
        */
        unframedHero
        byline="Live WebGL, not a capture. Move your cursor across the orb."
      />
      <PlainSummary path={PATH} />

      <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
        <WhyThisPageExistsSection />
        <TheLiquidOrbSection />
        <KeepingItPoliteSection />
        <VisualizerEdenSection />
        <BrooklynDeadSection />
      </div>
    </DemoShell>
  )
}
