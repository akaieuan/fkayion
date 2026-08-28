import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'

const extLink =
  'underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50'

const PATH = '/demo/trickle-ui-kit'

export const metadata = demoMetadata(PATH, {
  title: 'trickle — Pure-CSS text animations for React',
  description:
    '47 hand-tuned text-animation primitives for React. Zero runtime, SSR-safe, copy-paste install via the shadcn registry. Tailwind v4, React 18+, Next.js 15+, MIT.',
})

export default function TrickleKitProjectPage() {
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
            className="text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-balance text-foreground/90"
            aria-label="trickle"
          >
            tricklekit
          </p>
        </header>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="https://tricklekit.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Visit tricklekit.dev
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          <a
            href="https://github.com/akaieuan/trickle-UI-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            GitHub — akaieuan/trickle-UI-kit
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
          <a
            href="https://tricklekit.dev/#catalog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            Browse the 47 components
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          Live site, interactive catalog, and shadcn-installable registry — the canonical home for the
          project.
        </p>

        <p className="mt-6 text-[12px] leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground/85">Quick install (any one component):</span>{' '}
          <code className="rounded bg-muted/60 px-1.5 py-0.5 font-mono text-[11px] text-foreground/85">
            npx shadcn@latest add https://tricklekit.dev/r/typewriter.json
          </code>
        </p>

        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
          Open source · v0.1 shipped · MIT
        </p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          trickle
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Pure-CSS text animations for React. Zero runtime, SSR-safe, copy-paste install via the shadcn
          registry.{' '}
          <a
            href="https://tricklekit.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border hover:decoration-foreground/60 underline-offset-[3px] transition-colors"
          >
            tricklekit.dev
          </a>
        </p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What this is</h2>
            <p>
              trickle is{' '}
              <strong className="font-medium text-foreground/90">
                forty-seven hand-tuned text-animation primitives
              </strong>{' '}
              for React, distributed shadcn-style. Every animation is a pure CSS keyframe — no
              framer-motion, no motion-one, no react-spring. The browser does the work; React
              orchestrates a couple of state changes when it has to.
            </p>
            <p>
              <strong className="font-medium text-foreground/90">42 of 47</strong> are pure React Server
              Components — they ship literally zero client JavaScript. The other five (Typewriter,
              TypoCorrect, DecryptScramble, WordRotate, MorphSwap) need minimal client state for
              orchestration logic that genuinely cannot be expressed as a single keyframe. Median
              component weight: <strong className="font-medium text-foreground/90">&lt;1kb gzip</strong>.
              Animation runtime dependencies:{' '}
              <strong className="font-medium text-foreground/90">zero</strong>.
            </p>
            <p>
              SSR-safe by construction. The server renders the final HTML with animation classes
              applied, the browser starts the animation on first paint, no flash, no hydration
              mismatch.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why it exists</h2>
            <p>
              Every popular React text-animation library makes you pay a tax to animate one word.
              Install <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">framer-motion</code>{' '}
              to fade in a heading and you&apos;ve added 30kb of runtime JS to your bundle and forced every
              parent into a <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">&apos;use client&apos;</code> boundary. The animation engine wants to live in your application&apos;s runtime, with
              refs into the live DOM, observing layout shifts, owning the render loop. For a library
              whose primary use case is &quot;text appears nicely on a marketing page,&quot; that is
              profoundly the wrong tool for the job.
            </p>
            <p>
              trickle is the argument that text animation should be CSS, and the components that prove
              it. The CSS Animations spec is twelve years old, GPU-accelerated, server-renderable, and
              declaratively complete for 80% of what marketing pages, dashboards, and hero sections
              actually need. The browser has been able to animate text natively since 2012 — the only
              reason we reach for animation libraries is because writing keyframes by hand is tedious,
              not because the platform is missing capability.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What I actually built</h2>
            <ul className="list-disc space-y-2.5 pl-5 marker:text-muted-foreground/50">
              <li>
                <span className="text-foreground/85">A 47-component catalog organised by mechanism.</span>{' '}
                Reveal animations (TextReveal, Typewriter, Shatter, Pixelate, Wireframe, Stamp,
                Compress, Tear, Mosaic, Halftone, Grain, Bounce, SpinIn, ScaleSlam, Shutter, others).
                Continuous loops (GradientShift, AuroraText, WordRotate, Wave, Wobble3D, Float,
                RainbowRoll, Flutter, PulseText, Spotlight, Magnetize, Plasma, MarqueeRibbon, Phase,
                NeonFlicker, CarouselFlip). Special-purpose effects (DecryptScramble, InkBleed,
                ConfettiText, GlitchSplit, UnderlineDraw, Echo, Reflect, Stretch, Scanline,
                StaticText).
              </li>
              <li>
                <span className="text-foreground/85">A shadcn-compatible registry I authored from scratch.</span>{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">registry.json</code>{' '}
                feeds <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">shadcn build</code>, which generates a JSON manifest per component at{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">public/r/&lt;name&gt;.json</code>. Every endpoint resolves transitive dependencies (the{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">TextRoot</code> shell, the per-component CSS-variable tokens, the keyframes block, the
                reduced-motion override) so that one CLI command installs a working component into any
                consuming repo.
              </li>
              <li>
                <span className="text-foreground/85">A{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">TextRoot</code> orchestration shell.</span>{' '}
                Components that need lifecycle awareness (mount-trigger, view-trigger,
                reduced-motion) compose a{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">useTextRoot</code> hook. Pure-CSS components don&apos;t import it at all — they remain plain RSCs.
                The server renders with{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">ready=false</code>{' '}
                so the static fallback is visible without JS; the client hydrates and flips on the
                animation. No flash, no hydration mismatch.
              </li>
              <li>
                <span className="text-foreground/85">
                  Sub-character techniques without a JS runtime.
                </span>{' '}
                Shatter breaks each letter into four{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">clip-path</code>{' '}
                shards that converge from random offsets. Pixelate resolves through a 6-step
                crossed-gradient mask that reads as a true 8-bit pixel grid. Wireframe drops in as a
                stroke outline, refines, and fills. CarouselFlip positions characters on an invisible
                3D ring, spins three full revolutions, then unwraps and snaps into the spelled word.
                None of this uses{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">requestAnimationFrame</code>; it&apos;s all keyframes and{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@property</code>-typed CSS variables.
              </li>
              <li>
                <span className="text-foreground/85">A docs site that is the spec.</span> Next.js 15
                App Router, Tailwind v4, dark-mode-first. The catalog is interactive — every strip has
                a tweak panel (per-component CSS-variable controls) and a replay button. There&apos;s
                an{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">/audit</code>{' '}
                route for single-strip QA renders, and an install-reference page with copy buttons for
                every shadcn command.
              </li>
              <li>
                <span className="text-foreground/85">Reduced-motion as a first-class concern.</span>{' '}
                Every keyframe ships with a{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@media (prefers-reduced-motion: reduce)</code>{' '}
                override that skips to the final visible state. The five JS-orchestrated components
                also expose{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">prefersReducedMotion</code>{' '}
                from{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">useTextRoot</code>{' '}
                so they can short-circuit too.
              </li>
              <li>
                <span className="text-foreground/85">Build-and-validate tooling.</span>{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">pnpm new &lt;name&gt;</code>{' '}
                scaffolds a component plus a registry entry from a template.{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">pnpm registry:build</code>{' '}
                regenerates the public manifests.{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">pnpm registry:validate</code>{' '}
                Zod-checks every JSON in CI so a malformed entry can&apos;t reach the registry.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Design rubric</h2>
            <p>Every animation is judged against three axes before it ships.</p>
            <div className="space-y-3">
              <h3 className="text-[13px] font-medium text-foreground/90">Distinct motion signature</h3>
              <p>
                Could you name the component from the visual alone? If two animations look like the
                same gesture in different colors, one of them shouldn&apos;t exist. v0.1 cut four
                duplicates from the original draft (Drip, CurtainReveal, VerticalSlide, PaperFold) for
                failing this test.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-[13px] font-medium text-foreground/90">Per-character expression where it matters</h3>
              <p>
                Generic entrance animations are easy mode. The interesting components express the
                concept of the animation through the character itself: Shatter breaks chars into{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">clip-path</code>{' '}
                shards, Pixelate resolves through a sub-character pixel grid, CarouselFlip positions
                chars on a rotating 3D ring, Wireframe draws stroke outlines per char before filling.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-[13px] font-medium text-foreground/90">Fluidity</h3>
              <p>
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">mask-image</code>{' '}
                switching between gradient types mid-animation snaps discretely (browsers can&apos;t
                interpolate). All masked components keep{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">mask-image</code>{' '}
                constant on the class and animate only{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">mask-size</code>{' '}
                and{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">mask-position</code>. Same rule for{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">clip-path</code>{' '}
                polygons.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why it&apos;s unusual</h2>
            <p>
              The React text-animation space is dominated by runtime-tax libraries: install 30kb of
              JavaScript to move a heading. trickle is the counter-argument, shipped as proof. It uses
              twelve-year-old CSS spec to do the work that Magic UI, framer-motion text components,
              and react-type-animation all do with a runtime. The result is faster (GPU-accelerated
              keyframes), lighter (median &lt;1kb per component), and architecturally honest (server
              components stay server, no{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">&apos;use client&apos;</code>{' '}
              tax).
            </p>
            <p>
              Distribution is shadcn-CLI only by design. There is no installable npm package and no
              plan for one — the registry IS the distribution. You own the source the moment you run{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">shadcn add</code>. No version lock-in, no upgrade churn, customise freely.
            </p>
            <p>
              Related perspective on building open-source kits with the shadcn registry pattern:{' '}
              <Link href="/demo/hitl-kit" className={extLink}>
                HITL Kit
              </Link>
              {' · '}
              <Link href="/demo/eval-kit" className={extLink}>
                eval-kit
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">How I describe the skill set</h2>
            <p>
              Modern CSS animation engineering (keyframes, the{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@property</code>{' '}
              rule for typed custom properties,{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">mask-composite</code>,{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">clip-path</code>{' '}
              polygons, conic and radial gradients,{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">backdrop-filter</code>); SSR-safe React patterns and the discipline to keep 42 of 47 components as
              pure RSCs; shadcn registry CLI authoring (manifest schema,{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">cssVars</code>{' '}
              merge,{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">registryDependencies</code>, transitive resolution); Tailwind v4{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@theme</code>{' '}
              tokens; Next.js 15 App Router; TypeScript strict; design rubric authorship; accessibility
              (reduced-motion as a first-class build axis); and the willingness to delete four
              components from a draft because they failed the motion-signature test.
            </p>
          </section>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <p className="text-[14px] leading-relaxed text-foreground/85">
              Most React text-animation libraries are runtime taxes. trickle is the argument that text
              animation should be CSS, and the 47 components that prove it. SSR-safe, &lt;1kb median,
              installable component-by-component via the shadcn CLI. The registry is the distribution;
              the source is yours the moment you install it.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
