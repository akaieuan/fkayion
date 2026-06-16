import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

const microLabel =
  'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'

type Shot = { src: string; w: number; h: number; label: string }
type Feature = { h: string; t: string }
type Plugin = {
  id: string
  suffix: string
  accent: string
  github: string
  eyebrow: string
  tagline: string
  loadsAs?: string
  hero: Shot | null
  what: string
  features: Feature[]
  signalFlow?: string
  tech: string
  gallery: Shot[]
}

const plugins: Plugin[] = [
  {
    id: 'akableep',
    suffix: 'Bleep',
    // magenta — matches the akaBleep UI accent
    accent: 'text-[oklch(0.5_0.2_350)] dark:text-[oklch(0.72_0.17_350)]',
    github: 'https://github.com/akaieuan/akaBleep-VST',
    eyebrow: 'Instrument · VST3 / AU / Standalone · Ableton-ready',
    tagline: 'A hypnotic-techno acid voice and 64-step P-lock sequencer in one plugin — built to be performed.',
    loadsAs: 'Loads as akaBleep.',
    hero: { src: '/akableep-synth.webp', w: 1163, h: 556, label: 'Synth — oscillators, envelopes, ladder filter' },
    what: 'akaBleep is a monophonic instrument for the “bleep-bloop” lineage of hypnotic techno — the Dozzy / Surgeon / Plastikman school where one acid line, slowly mutating over sixteen bars, is the track. It folds the whole loop into one window: a voice that squelches, a sequencer that locks a different sound to every step, a patch bay to set it breathing, and a master FX chain to smear it into the room. One plugin, on one MIDI track in Ableton, that you play live.',
    features: [
      { h: 'Acid voice', t: 'Two multi-mode oscillators (saw / square / sine / FM) with sub and ring mod, summed into a tanh drive stage and a ladder filter.' },
      { h: 'Three envelopes', t: 'Amp ADSR, filter ADSR with ±5 octaves of sweep, and the exponential pitch-decay env that makes the genre’s acid “bloop.”' },
      { h: '64-step sequencer', t: 'Four pages, variable length, and Elektron-style parameter locks — ~40 parameters P-lockable per step, so step 3 can be a sub thud and step 11 a screaming chirp from one voice.' },
      { h: 'Live parameter locks', t: 'Hit REC and twist any knob while it plays to lock that value to the current step — record moves live, exactly as you perform them. Plus per-step chords, velocity, gate, and probability so the line never repeats the same way.' },
      { h: 'Generators + host sync', t: 'Four-on-the-floor, off-beats, Euclidean 3/5/7, and random seeds; runs standalone or phase-locks to the Ableton transport.' },
      { h: 'Patch bay', t: 'Drag-to-wire modulation — LFO, filter env, noise, or velocity into pitch, PW, cutoff, resonance, or amplitude — to keep a static loop breathing.' },
      { h: 'Dedicated FX page', t: 'Chorus → phaser → bitcrush → ping-pong delay → reverb, each stage P-lockable per step, with a live spectrum analyzer and presets — the fast route from clean bleep to ruined dub-techno smear.' },
      { h: 'Presets', t: '39 genre-curated factory patches plus a user store and favourites.' },
    ],
    signalFlow: `        ┌─ osc 1 ─┐
 MIDI ─▶┤  osc 2  ├─▶ mix ─▶ tanh drive ─▶ ladder filter ─▶ amp env ─▶┐
        │  sub    │                                                  │
        └─ ring ──┘   LFO · filter env · noise · velocity ─▶ patch bay │
                                                                     ▼
   out ◀─ reverb ◀─ ping-pong delay ◀─ bitcrush ◀─ phaser ◀─ chorus`,
    tech: 'JUCE 8.0.4 · C++17 · VST3 / AU / Standalone · macOS 11+ universal (Apple Silicon + Intel)',
    gallery: [
      { src: '/akableep-sequencer.webp', w: 1179, h: 560, label: 'Sequencer · EDIT — per-step parameter locks' },
      { src: '/akableep-patchbay.webp', w: 1171, h: 563, label: 'Patch bay — drag-to-wire modulation' },
      { src: '/akableep-fx.webp', w: 1173, h: 559, label: 'FX — master chain + spectrum' },
      { src: '/akableep-presets.webp', w: 1174, h: 557, label: 'Presets — factory patch browser' },
    ],
  },
  {
    id: 'akaenzyme',
    suffix: 'Enzyme',
    // Waldorf blue — matches the "Protein" theme
    accent: 'text-[oklch(0.52_0.17_245)] dark:text-[oklch(0.72_0.14_245)]',
    github: 'https://github.com/akaieuan/akaEnzyme-VST',
    eyebrow: 'Instrument · VST3 / AU / Standalone · Ableton-ready',
    tagline: 'A 4-layer lo-fi multi-timbral synth inspired by the Waldorf Protein — stacked, split, and mangled live.',
    loadsAs: 'Loads as Enzyme in your plugin list.',
    hero: { src: '/enzyme-layer.webp', w: 1600, h: 1131, label: 'Layer — per-layer synth voice' },
    what: 'akaEnzyme reimagines the Waldorf Protein’s 8-bit tabletop character as a modern plugin: four independent layers sharing a single 8-voice pool, routed by a hardware-style Multi engine, then smeared through a switchable FX rack and a dedicated lo-fi / “sample-breaking” mangle section. The grit comes from bitcrush, sample-rate reduction, and drive waveshaping. It ships as a signed universal VST3/AU that passes Apple’s auval and drops straight into Ableton, Logic, or Bitwig — designed to be stacked, split, and mangled fast, live.',
    features: [
      { h: 'Four layers, one pool', t: 'Independent A/B/C/D layers share a single 8-voice pool with global voice-stealing — a hardware-style Multi engine, not four separate synths.' },
      { h: 'Five Multi modes', t: 'Single, Layered, Round-Robin, Random-Robin, and MIDI-Split with three key-split points — stack a pad, split the keyboard, or cycle layers per note.' },
      { h: 'Per-layer voice', t: 'Two PolyBLEP / 2-op-FM oscillators, sub + ring, a ladder filter, three envelopes, drive, glide, and a per-layer “Dirt” grit (Static / Crackle / Geiger / Click / Burst).' },
      { h: 'Dedicated FX page', t: 'Two switchable series slots (1-of-9: chorus, flanger, phaser, tremolo, drive, compressor, EQ, delay, reverb) plus a lo-fi / mangle block — bitcrush, sample-rate reduction to 64×, and a free-running stutter.' },
      { h: 'Arpeggiator', t: 'Host-synced Up / Down / Up-Down / Random / As-Played, up to 4 octaves, gate and swing — and it feeds the Multi engine, so it follows your layer routing.' },
      { h: 'Built for the stage', t: 'Ableton-style QWERTY play from anywhere in the editor, ±2-semitone pitch bend, click-free master gain, and an output bus guarded by a DC blocker + soft clipper so extreme settings never spike the master.' },
      { h: 'Production-ready', t: 'Signed universal VST3/AU that passes auval on both architectures, reports correct tail/latency, and smooths automation — it behaves like a finished instrument in any host.' },
    ],
    tech: 'JUCE 8.0.4 · C++17 · VST3 / AU / Standalone · macOS 11+ universal (Apple Silicon + Intel)',
    gallery: [
      { src: '/enzyme-multi.webp', w: 1600, h: 1127, label: 'Multi — 4-layer routing + splits' },
      { src: '/enzyme-arp.webp', w: 1600, h: 1134, label: 'Arp — host-synced arpeggiator' },
      { src: '/enzyme-fx.webp', w: 1600, h: 1124, label: 'FX + lo-fi / mangle' },
      { src: '/enzyme-out.webp', w: 1600, h: 1146, label: 'Out — master + info' },
    ],
  },
  {
    id: 'aka-i4',
    suffix: '-i4',
    // teal / slate — matches the i4 UI accent
    accent: 'text-[oklch(0.5_0.08_220)] dark:text-[oklch(0.72_0.08_220)]',
    github: 'https://github.com/akaieuan/akaI4-VST',
    eyebrow: 'Sampler · VST3 / AU / Standalone · Ableton-ready',
    tagline: 'A sculpting sampler inspired by the Torso S-4 — built for live resampling and performance.',
    loadsAs: 'Loads as i4.',
    hero: { src: '/i4-tape.webp', w: 1600, h: 951, label: 'Tape — varispeed source' },
    what: 'i4 takes one sample (or sixteen) and runs it through a series of sound-sculpting engines, lets you modulate any of it, and resamples the result straight back into the instrument. Built for performance: granular textures, resonant tones, destruction, and space — all under a 4-slot modulation matrix, in Ableton or standalone. Tape is the master clip; the sixteen pads sum in right after it, so every pad runs the full chain too.',
    features: [
      { h: 'Sculpt, then resample', t: 'One sample (or sixteen pads) runs through a chain of engines and resamples straight back into the instrument — mangle your own output and play it back.' },
      { h: 'Tape', t: 'A varispeed tape-style source — scrub, rotate the loop, glide between speeds, reverse, freeze, keylock, and sound-on-sound layering.' },
      { h: 'Mosaic', t: 'A granular cloud: grain rate, size, contour, spray, warp, detune, and scale-quantized grain pitch.' },
      { h: 'Ring', t: 'A 48-band resonator bank — tune, pitch and detune the partials, tilt and tone the spectrum, inject waves and noise, quantize to a scale.' },
      { h: 'Deform + Vast', t: 'Deform: drive / saturation, compression, bit-crush, spectral tilt, a noise layer, and a gate. Vast: a synced delay and reverb in one — feedback, spread, damp, decay, size, and an infinite freeze.' },
      { h: 'Performance', t: 'Tempo-synced Beat Repeat (what you hear is what resamples), Tape Stop spin-down, a 30-second Loop Recorder that drops onto a pad, and a one-knob master filter (lowpass → bypass → highpass) for live tension.' },
      { h: 'Modulation', t: 'Four mod slots (Wave LFO / Random / ADSR) route to ~50 destinations across every engine; right-click any knob to assign it.' },
    ],
    signalFlow: ` Tape + 16 Pads ─▶ Mosaic ─▶ Ring ─▶ Deform ─▶ Vast ─▶ Beat Repeat ─▶ Master Filter ─▶ out
                                                                       └▶ Loop Recorder ─▶ new Pad`,
    tech: 'JUCE 8.0.4 · C++17 · VST3 / AU / Standalone · macOS 11+ (Apple Silicon + Intel)',
    gallery: [
      { src: '/i4-mosaic.webp', w: 1600, h: 953, label: 'Mosaic — granular cloud' },
      { src: '/i4-ring.webp', w: 1600, h: 952, label: 'Ring — 48-band resonator' },
      { src: '/i4-deform.webp', w: 1600, h: 960, label: 'Deform — destruction & dynamics' },
      { src: '/i4-vast.webp', w: 1600, h: 953, label: 'Vast — delay + reverb' },
    ],
  },
]

export const metadata = {
  title: 'akaVSTs — Instrument & Sampler Plugins | akaBuild',
  description:
    'Three Ableton-ready macOS instrument plugins I play live and use in my own music: akaBleep (acid synth + P-lock sequencer), akaEnzyme (4-layer lo-fi multi-timbral synth), and i4 (sculpting sampler). JUCE 8, C++17, Apple Silicon native.',
}

function HeroImage({ shot }: { shot: Shot }) {
  return (
    <figure className="-mx-6 mt-6 sm:mx-0">
      <a href={shot.src} target="_blank" rel="noopener noreferrer" className="group block">
        <div className="overflow-hidden rounded-xl border border-border/80 bg-muted/10">
          <Image
            src={shot.src}
            alt={shot.label}
            width={shot.w}
            height={shot.h}
            sizes="(min-width: 672px) 640px, 100vw"
            className="block h-auto w-full transition-opacity group-hover:opacity-95"
          />
        </div>
      </a>
      <figcaption className="mt-2 px-6 text-[11px] font-light text-muted-foreground/70 sm:px-0">
        {shot.label}
      </figcaption>
    </figure>
  )
}

function Gallery({ shots }: { shots: Shot[] }) {
  return (
    <div className="mt-6">
      <p className={microLabel}>More views</p>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {shots.map((shot) => (
          <figure key={shot.src}>
            <a href={shot.src} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="overflow-hidden rounded-lg border border-border/80 bg-muted/10">
                <Image
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
  )
}

export default function AkaVstsPage() {
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

        <header>
          <h1
            className="text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-foreground/90"
            aria-label="akaVSTs"
          >
            akaVSTs
          </h1>
          <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground max-w-xl">
            Three macOS instrument plugins I build and play — and use in my own music today. VST3 / AU
            / Standalone, JUCE 8, C++17, Apple Silicon native; they drop straight into Ableton (or any
            DAW). Each one is made to be recorded live: immediate, hands-on parameter control,
            dedicated FX pages, and master sections built around tension and performance.
          </p>
        </header>

        {plugins.map((p, i) => (
          <section
            key={p.id}
            id={p.id}
            className={i === 0 ? 'mt-14 scroll-mt-20' : 'mt-16 border-t border-border/60 pt-14 scroll-mt-20'}
          >
            <p className={microLabel}>{p.eyebrow}</p>
            <h2 className="mt-2 text-2xl font-light tracking-tight text-foreground/90 md:text-[26px]">
              aka{p.suffix}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {p.tagline}
              {p.loadsAs && <span className="text-muted-foreground/70"> {p.loadsAs}</span>}
            </p>

            <div className="mt-4">
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
              >
                GitHub — {p.github.replace('https://github.com/', '')}
                <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
              </a>
            </div>

            {p.hero && <HeroImage shot={p.hero} />}

            <div className="mt-6 space-y-6 text-[15px] font-light leading-relaxed text-muted-foreground">
              <p>{p.what}</p>

              <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
                {p.features.map((f) => (
                  <li key={f.h}>
                    <span className="text-foreground/85">{f.h}.</span> {f.t}
                  </li>
                ))}
              </ul>

              {p.signalFlow && (
                <div>
                  <p className={microLabel}>Signal flow</p>
                  <pre className="mt-3 overflow-x-auto rounded-lg border border-border/80 bg-muted/30 p-4 text-[10.5px] leading-relaxed text-foreground/80">
                    {p.signalFlow}
                  </pre>
                </div>
              )}

              <p className="text-[12px] text-muted-foreground/70">{p.tech}</p>
            </div>

            {p.gallery.length > 0 && <Gallery shots={p.gallery} />}
          </section>
        ))}
      </article>
    </div>
  )
}
