import Link from 'next/link'
import { DemoImage } from '@/components/ui/demo-image'
import { link, h2 } from '@/components/features/demo/how-i-work/shared'

/**
 * The software I use daily because the thing I wanted did not exist.
 *
 * These sit inside the article rather than in a row beside it. Three across
 * put each screenshot at about 380px, which is narrower than the plugin's own
 * window: the synth became a grey smear and the Blockpad canvas stopped being
 * legible. At the article's measure each is shown near the size it is used at,
 * and the prose that explains it is the paragraph directly above rather than a
 * caption squeezed under a thumbnail.
 *
 * `NAME_LINK` is where the tool's name goes in the lead, so the name is a link
 * inside a sentence rather than a label stapled to the end of one.
 */
const TOOLS = [
  {
    href: '/demo/null-browser',
    name: 'Null',
    src: '/null/overview.webp',
    w: 1600,
    h: 1000,
    alt: 'Null browser, showing a workspace of tabs beside its notes pane',
    lead: 'I browse in something I wrote. NAME_LINK started as a browser with an AI layer in it and became a better one when I took the layer back out. What survived is six invariants about what the app is never allowed to do behind you, a network inspector, and notes that live with the tab instead of in another app.',
    caption: 'A workspace in Null. Notes belong to the tab, so closing the window does not strand them.',
  },
  {
    href: '/demo/akavsts',
    name: 'akaVST',
    src: '/akavsts/akableep-synth.webp',
    w: 1163,
    h: 556,
    alt: 'akaBleep, a synthesizer plugin with oscillators, envelopes and a ladder filter',
    lead: 'I play instruments I wrote, too. NAME_LINK is JUCE plugins for Ableton: oscillators, a ladder filter, a sequencer with per-step parameter locks. Building them is the clearest case I have of what this page is about, because a knob in the wrong place does not read worse, it makes you play something else.',
    caption: 'akaBleep, the acid voice. Every knob on this panel is reachable per step from the sequencer.',
  },
  {
    href: '/demo/blockpad',
    name: 'Blockpad',
    src: '/blockpad/blockpad-hero.webp',
    w: 1600,
    h: 1003,
    alt: 'Blockpad: a two-panel wireframe on the canvas, with the canvas controls, the drawing toolbar and the Copy control',
    lead: 'And I wireframe in NAME_LINK, which exists because of how I work now. It copies a layout out as both the drawing and a compact text payload, so a screen can go straight into a chat. That costs far fewer tokens than describing it, and the model reads the structure instead of my description of the structure.',
    caption: 'A two-panel layout on the Blockpad canvas. Copy, top right, hands back the drawing and the payload together.',
  },
] as const

function Tool({ t }: { t: (typeof TOOLS)[number] }) {
  const [before, after] = t.lead.split('NAME_LINK')
  return (
    <div className="space-y-4 pt-6 first:pt-2">
      <p>
        {before}
        <Link href={t.href} className={link}>
          {t.name}
        </Link>
        {after}
      </p>
      <figure className="-mx-6 sm:mx-0">
        <Link href={t.href} className="group block">
          {/*
           * The frame carries the aspect ratio, so the row it will occupy is
           * reserved before the bytes arrive and nothing below it moves when
           * they do. The image fills that frame rather than setting its own
           * height, which keeps three screenshots of three different shapes
           * reading as one sequence instead of three interruptions.
           */}
          <div
            className="aka-card-well aka-card-media overflow-hidden"
            style={{ aspectRatio: `${t.w} / ${t.h}` }}
          >
            <DemoImage
              src={t.src}
              alt={t.alt}
              width={t.w}
              height={t.h}
              /*
               * The exact measure at every breakpoint. Left at the default,
               * next/image assumes the image is as wide as the viewport and
               * ships a frame several times larger than the column it lands
               * in; overstated the other way and a retina screen gets a soft
               * one.
               */
              sizes="(min-width: 704px) 672px, calc(100vw - 3rem)"
              className="block h-full w-full object-cover transition-opacity group-hover:opacity-95"
            />
          </div>
        </Link>
        <figcaption className="mt-2.5 px-6 text-[11px] font-light leading-relaxed text-muted-foreground/70 sm:px-0">
          {t.caption}
        </figcaption>
      </figure>
    </div>
  )
}

/** Small software. Moved verbatim from app/demo/how-i-work/page.tsx. */
export function SmallSoftwareSection() {
  return (
          <section className="space-y-3">
            <h2 className={h2}>Small software</h2>
            <p>
              I believe in small software: a tool built for one person doing one thing, which is
              allowed to be opinionated precisely because it does not have to be for everyone. The
              three below are the ones I open every day, and I open them because I made them.
            </p>
            {TOOLS.map((t) => (
              <Tool key={t.href} t={t} />
            ))}
          </section>
  )
}
