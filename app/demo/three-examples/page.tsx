import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { KickerTags } from '@/components/ui/tag-row'
import { OrbHero } from '@/components/features/demo/orb-hero'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'

const PATH = '/demo/three-examples'

const inlineLink =
  'underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50'

export const metadata = demoMetadata(PATH, {
  title: 'Three.js Examples',
  description:
    'The liquid shader orb from the old landing hero, running live: hand-written GLSL over Three.js, and the loading and rendering rules that let WebGL sit on a portfolio page.',
})

export default function ThreeExamplesDemoPage() {
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
          <p
            className="text-[clamp(1.65rem,4.5vw,2.5rem)] font-extralight leading-none tracking-tight text-balance text-foreground/90"
            aria-label="Three.js Examples"
          >
            Three.js Examples
          </p>
        </header>

        <div className="-mx-6 aka-card-well aka-card-media overflow-hidden sm:mx-0">
          {/* The orb from the old landing hero, live and reactive to the cursor. */}
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
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why this page exists</h2>
            <p>
              The orb above used to open this site: for a while it was the landing hero. When the
              landing page calmed down, a real-time WebGL scene stopped earning its place there, but
              the work behind it was worth keeping. The rule now is placement rather than abstinence:
              Three.js lives here and inside{' '}
              <Link href="/demo/visualizer-eden" className={inlineLink}>
                Visualizer Eden
              </Link>
              , and nowhere else on the site. The pages you pass through stay light; the pages you
              choose to visit can spend.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">The liquid orb</h2>
            <p>
              The orb is one Three.js mesh carrying a{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                ShaderMaterial
              </code>{' '}
              with both stages written by hand. The vertex stage stacks three sine waves for the
              wave motion, adds a bulge term from multi-octave value noise (a six-octave fbm), and a
              viscous stretch along the vertical so the blob reads as liquid rather than as a
              wobbling sphere. When the cursor is over the canvas, vertices near it are pulled
              toward it, bulged, and rippled, so the surface answers you instead of just looping.
            </p>
            <p>
              The fragment stage does the material: a fresnel term that foams the rim, a fake
              subsurface scatter from above, cavity shadows in the crevices, film grain, and a
              saturation push at the end. The three small droplets orbiting the main body are the
              one part that is not custom GLSL: they are{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                meshPhysicalMaterial
              </code>{' '}
              spheres with clearcoat, because a stock material was already the right look there and
              a shader would have been vanity.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Keeping it polite</h2>
            <p>
              A portfolio page has no business running a render loop you cannot see. An{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                IntersectionObserver
              </code>{' '}
              flips the canvas{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                frameloop
              </code>{' '}
              between running and stopped as the orb enters and leaves the viewport, and device
              pixel ratio is clamped to 1.5 so a retina laptop does not pay four times the fragment
              cost for sharpness nobody perceives on a moving surface.
            </p>
            <p>
              Pointer handling follows the house rule that scroll-linked and animated state never
              touches React: the wrapper writes cursor position into a ref, the frame loop reads it
              into a shader uniform, and no pointer move ever re-renders the tree. The canvas itself
              keeps{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                pointer-events: none
              </code>{' '}
              so it can never eat a scroll. On narrow viewports the orb drops its droplets, slows
              its motion, and softens the grain, because small GPUs and small pixels turn both into
              shimmer. And the whole Three.js payload is chunk-split behind a dynamic import, so no
              other route on the site downloads a byte of it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">The bigger sibling</h2>
            <p>
              The larger piece of this body of work is{' '}
              <Link href="/demo/visualizer-eden" className={inlineLink}>
                Visualizer Eden
              </Link>
              : the same stack, but with a Web Audio analyser feeding band energies into the
              uniforms every frame, so music drives the deformation instead of a clock. The orb here
              is the etude; that one is the piece.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
