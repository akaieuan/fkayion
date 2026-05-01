import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

const edenGreen =
  'text-[oklch(0.38_0.055_152.2)] dark:text-[oklch(0.62_0.09_152)]'

export const metadata = {
  title: 'Visualizer Eden | akaBuild',
  description:
    'Web Audio analyser, React Three Fiber, and custom GLSL: FFT-driven mesh deformation for a browser audio visualizer.',
}

export default function VisualizerEdenDemoPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        <header className="mb-6">
          <p
            className="text-[clamp(1.65rem,4.5vw,2.5rem)] font-extralight leading-none tracking-tight text-balance"
            aria-label="Visualizer Eden"
          >
            <span className="text-foreground/90">Visualizer </span>
            <span className={edenGreen}>Eden</span>
          </p>
        </header>

        <div className="-mx-6 overflow-hidden rounded-xl border border-border/80 bg-muted/10 sm:mx-0">
          <video
            className="block h-auto w-full"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="/visualizer-eden-preview-poster.jpg"
            aria-label="Visualizer Eden preview"
          >
            <source src="/visualizer-eden-preview.webm" type="video/webm" />
          </video>
        </div>

        <div className="mt-5">
          <Link
            href="/Visualizer-Eden"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Open Visualizer Eden
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </Link>
          <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
            Same-origin app route. Upload WAV and drive the full control surface.
          </p>
        </div>

        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
          Audio tool
        </p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          Visualizer Eden
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browser-only pipeline: decoded audio into an FFT, scalar features into shader uniforms, and a
          custom GLSL vertex stage that displaces a high-poly mesh every frame.
        </p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why I built it</h2>
            <p>
              I wanted mixes to show up as motion, not only as a waveform strip. The same FFT that powers
              meters in a DAW is enough to steer a 3D look if you compress it into a few stable scalars
              and keep the CPU work off the hot path.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Web Audio: graph, analyser, and features
            </h2>
            <p>
              Playback goes through{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                AudioContext
              </code>
              , then{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                createMediaElementSource
              </code>{' '}
              on the HTMLMediaElement so the file you load is the same signal you hear. An{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                AnalyserNode
              </code>{' '}
              sits in-line before{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                destination
              </code>
              :{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                fftSize = 512
              </code>
              ,{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                smoothingTimeConstant
              </code>{' '}
              around 0.3, and decibel bounds set so the byte spectrum is usable without pegging.
            </p>
            <p>
              Each frame we call{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                getByteFrequencyData
              </code>{' '}
              into a{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                Uint8Array
              </code>{' '}
              sized to{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                frequencyBinCount
              </code>
              , then reduce bins into three bands (roughly the lowest 10% as bass, the next 40% as mid,
              the remainder as high) plus a whole-spectrum volume term. Those four numbers are normalized
              against 0–255 and passed into React context as the thing the canvas reads. The analysis
              loop is throttled to about 30fps so we are not burning main-thread time on work the eye
              cannot resolve anyway.
            </p>
            <p>
              On top of that, there is light temporal logic: rolling volume history, peak tracking, and a
              bass-threshold beat detector that looks at spacing between hits to infer tempo-ish behavior
              for features that care about rhythm, not just level.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              React Three Fiber and the render loop
            </h2>
            <p>
              The scene is a{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                @react-three/fiber
              </code>{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                Canvas
              </code>
              . The blob is a Three.js mesh with a{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                ShaderMaterial
              </code>
              , not a stack of built-in materials: everything interesting happens in strings you own.
              Each animation tick,{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                useFrame
              </code>{' '}
              copies fresh audio scalars and UI control values into material uniforms (time, play state,
              band levels, reactivity gain, palette colors, and dozens of “physics” and mode toggles).
              That keeps a single source of truth: the React tree for controls, the GPU for look.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              GLSL: what the vertex shader actually does
            </h2>
            <p>
              The vertex stage builds an{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                audioIntensity
              </code>{' '}
              term from volume plus weighted bass, mid, and high. That scalar modulates how hard
              procedural motion runs: multi-octave value noise (fbm), sine wave stacks for “liquid”
              motion, surface-tension ripples, elasticity-style bounce, optional puddle flattening,
              goopiness and liquidity channels, split and tentacle modes, and a base fbm layer scaled by
              user noise parameters. When audio is playing, an extra normal-aligned displacement term
              scales with{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                audioReactivity
              </code>{' '}
              and per-band weights so kicks read differently from hiss.
            </p>
            <p>
              Fragment-side, the shader handles multi-color blending, metallic and contrast controls, and
              the surface look that sells each preset (glass vs goo vs pearl is mostly uniform math, not
              separate scenes). The point is not photoreal PBR: it is a controllable, expressive surface
              that stays within a predictable cost because you wrote the math.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              What this project was for
            </h2>
            <p>
              End-to-end ownership of one pipeline: decode audio in the browser, derive stable features,
              push them across the JS/WebGL boundary every frame, and keep the mesh readable under real
              laptops. The product value is the fluency: Web Audio, R3F’s render loop, and large custom
              GLSL in one codebase, with a clear split between “analysis” and “look.”
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
