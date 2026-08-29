import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'

const code = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]'
const microLabel =
  'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'

type Shot = { src: string; w: number; h: number; label: string }

const hero: Shot = { src: '/covart-splash.webp', w: 1600, h: 839, label: 'akaCOVART — a generative album-art engine' }
const gallery: Shot[] = [
  { src: '/covart-controls.webp', w: 488, h: 1100, label: 'Controls — engine, seed, palette, motion' },
  { src: '/covart-cover-wave.webp', w: 860, h: 796, label: 'A finished Waves cover' },
  { src: '/covart-engine-grid.webp', w: 1706, h: 937, label: 'Grid + Waves engines' },
  { src: '/covart-engine-wave.webp', w: 1715, h: 876, label: 'Waves, up close' },
  { src: '/covart-animate.webp', w: 394, h: 936, label: 'Animate — move the cover to a beat' },
  { src: '/covart-audio.webp', w: 396, h: 649, label: 'Audio — react to a track' },
]

const PATH = '/demo/akacovart'

export const metadata = demoMetadata(PATH, {
  title: 'akaCOVART — Generative Album-Art Studio',
  description:
    'A browser-based generative album-art studio: pick an engine, drop a seed, shape with palette / composition / film / type, and export a print-ready cover or a synced video loop. Every cover is reproducible data. Next.js, React, Canvas 2D, Web Audio.',
})

export default function AkaCovartProjectPage() {
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
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">

          Open source · Generative studio · Album art
          </p>
          <h1
            className="mt-2 text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight"
            aria-label="akaCOVART"
          >
            <span className="text-foreground/90">akaCOVART</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
          A generative album-art engine. Shape it, sync the motion to your track, and export the
          cover.{' '}
          <a
            href="https://akacovart.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border hover:decoration-foreground/60 underline-offset-[3px] transition-colors"
          >
            akacovart.com
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
            href="https://akacovart.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Visit akacovart.com
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          <a
            href="https://github.com/akaieuan/akaCovart"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            GitHub — akaieuan/akaCovart
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          Built by Ieuan King (akaBuild). Open source; the{' '}
          <span className="font-medium text-foreground/80">akaCOVART</span> name is a trademark of the
          project owner.
        </p>
        <PlainSummary path={PATH} />

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What this is</h2>
            <p>
              akaCOVART is a browser-based studio for making album art. You pick an engine, drop in a
              seed, and shape the result with a handful of controls — palette, composition, film
              texture, type — then export a print-ready cover or a looping video. It’s built for
              musicians, labels, and designers who want a distinctive sleeve fast, and for developers
              who want a clean generative engine to build on.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Every image is data</h2>
            <p>
              At its core is one decision:{' '}
              <strong className="font-medium text-foreground/90">every image is data.</strong> A cover
              is fully described by an engine, a seed, and a small set of parameters — nothing else.
              Feed the same seed and the same settings back in and you get the exact same artwork, on
              any machine, every time. A look you love isn’t a lucky export you can’t reproduce; it’s a
              tiny, shareable recipe. That determinism is the spine of the whole tool.
            </p>
            <pre className="overflow-x-auto aka-card-well rounded-lg p-4 text-[11px] leading-relaxed text-foreground/80">
{`{ engine, seed, palette, composition, film, type }
        │
        ▼  deterministic render (seeded RNG)
  3000×3000 PNG  +  synced video loop`}
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What you make</h2>
            <p>
              Three focuses, seven engines. The <span className="text-foreground/85">Art</span> focus
              gives four abstract field engines:
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                <span className="text-foreground/85">Blob.</span> Soft, painterly clouds of colour with
                diamond detail zones.
              </li>
              <li>
                <span className="text-foreground/85">Grid.</span> Organic cells arranged on a grid,
                from sparse to packed.
              </li>
              <li>
                <span className="text-foreground/85">Contours.</span> A 3D heightfield terrain drawn as
                receding ridgelines.
              </li>
              <li>
                <span className="text-foreground/85">Signal.</span> Overlapping wave gratings that add
                into shimmering moiré interference.
              </li>
            </ul>
            <p>
              The <span className="text-foreground/85">TxT</span> focus makes your display text the
              subject, styled by three type engines — Dither (pixelated + broken), Lines (round-cap
              hatching clipped to the glyphs), and Blur (gooey blur-to-threshold metaballs) — and{' '}
              <span className="text-foreground/85">Stack</span> composites a type layer over an Art
              background, as an on-top overlay or an art-filled knockout.
            </p>
            <p>
              On top of any engine: hand-tuned palettes (dark, cream, grey, or a seed-picked random), a
              colour picker that pushes the whole palette toward any hue, and a light-to-dark tone
              control. A film-finish pass layers in grain, dust, scratches, vignette, and bloom for a
              printed, physical feel, and a type layer handles title and artist with selectable fonts,
              case and glitch options, and drag-to-place positioning. A focus-aware grid of curated starting
              points (with live hover previews) gives one-click starts; export drops a 3000×3000 PNG
              sized independently of what’s on screen.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Motion &amp; music</h2>
            <p>
              Two modes. <span className="text-foreground/85">Still</span> is a single frame.{' '}
              <span className="text-foreground/85">Animate</span> makes the cover move to a beat you set
              by hand — BPM, pump, kick, plus motion tuned per engine — or, with the{' '}
              <span className="text-foreground/85">Track</span> source, drop in an MP3 or WAV, trim a
              clip, and the art reacts to the track’s energy and beats, exporting a real MP4 with the
              audio muxed in.
            </p>
            <p>
              There’s one rule the motion never breaks: energy only ever moves{' '}
              <em>space</em> — scale, position, displacement — never brightness, opacity, or hue. No
              strobe, no flash, no flicker. Beats read as physical movement, which is easy to watch on
              loop and safe for photosensitive viewers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Under the hood</h2>
            <p>
              The generative core is a pure, framework-agnostic Canvas-2D module with no UI
              dependencies — parameters go in, pixels come out — which is why the same code drives the
              live preview, the high-res export, and the gallery thumbnails without changes. Each engine
              is a small plugin behind a shared interface and a registry, so adding one is
              self-contained. Randomness comes from a seeded generator rather than the system’s, and
              that’s what guarantees the determinism. The studio around it is a thin React layer over a
              single flat state object whose keys are exactly what the engine reads — so “the artwork as
              data” is literally the app’s state minus its buttons. Because a cover is just data, you can
              hand a settings blob to a model and ask it to nudge the look.
            </p>
            <p className="text-[12px] text-muted-foreground/70">
              Next.js (static export) · React · TypeScript · Tailwind · Zustand · Canvas 2D · Web Audio
              API · WebCodecs (H.264/AAC) MP4 export
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Status &amp; what’s next</h2>
            <p>
              Built, live at akacovart.com, and usable today: three focuses and seven engines, Still and
              Animate modes with BPM or track-driven motion, curated starting points, and PNG + MP4
              export (audio muxed in for track-synced clips). Planned: more engines and deeper audio
              mapping.
            </p>
          </section>

          <div>
            <p className={microLabel}>More views</p>
            <div className="mt-3 columns-1 gap-4 sm:columns-2">
              {gallery.map((shot) => (
                <figure key={shot.src} className="mb-4 break-inside-avoid">
                  <a href={shot.src} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="aka-card-well aka-card-media overflow-hidden rounded-lg">
                      <DemoImage
                        src={shot.src}
                        alt={shot.label}
                        width={shot.w}
                        height={shot.h}
                        sizes="(min-width: 640px) 320px, 100vw"
                        className="block h-auto w-full transition-opacity group-hover:opacity-95"
                      />
                    </div>
                  </a>
                  <figcaption className="mt-1.5 text-[11px] font-light text-muted-foreground/70">
                    {shot.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <section className="aka-card-well px-5 py-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why it&apos;s different</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">
              Most cover generators hand you a lucky export you can’t reproduce. akaCOVART makes every
              cover a tiny, deterministic recipe — engine + seed + a few parameters — so the look you
              love reopens identically on any machine, renders to a 3000×3000 print or a beat-synced
              video from the same data, and is simple enough for a model to nudge.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
