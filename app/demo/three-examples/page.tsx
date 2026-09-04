import { KickerTags } from '@/components/ui/tag-row'
import { DemoShell } from '@/components/features/demo/demo-shell'
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
      <header className="mb-6">
        <p
          className="text-[clamp(1.65rem,4.5vw,2.5rem)] font-extralight leading-none tracking-tight text-balance text-foreground/90"
          aria-label="Three.js Examples"
        >
          Three.js Examples
        </p>
      </header>

      {/*
        No card. The orb is the page's own artifact rather than a picture of
        one, so it floats on the page ground the way it did on the old landing
        hero. A media frame around it only cropped the motion it exists to
        show.
      */}
      <div className="-mx-6 sm:mx-0">
        <OrbHero />
      </div>

      <p className="mt-2.5 text-[12px] font-light text-muted-foreground/80">
        Live WebGL, not a capture. Move your cursor across the orb.
      </p>

      <KickerTags className="mt-10">WebGL</KickerTags>
      <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
        Three.js Examples
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        The Three.js work built for this site, gathered on one page: a liquid orb whose vertex and
        fragment stages are hand-written GLSL, plus the loading and rendering rules that keep a
        real-time scene from taxing everything around it.
      </p>
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
