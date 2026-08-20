import type { ReactNode } from 'react'
import { GlitchSplit } from '@/components/trickle/glitch-split'
import { Wave } from '@/components/trickle/wave'
import { AuroraText } from '@/components/trickle/aurora-text'
import { Echo } from '@/components/trickle/echo'
import { Flutter } from '@/components/trickle/flutter'
import { ShinyShimmer } from '@/components/trickle/shiny-shimmer'
import { Plasma } from '@/components/trickle/plasma'
import { Phase } from '@/components/trickle/phase'
import { GradientShift } from '@/components/trickle/gradient-shift'
import { Wobble3D } from '@/components/trickle/wobble-3d'
import { PulseText } from '@/components/trickle/pulse-text'
import { NeonFlicker } from '@/components/trickle/neon-flicker'
import { RainbowRoll } from '@/components/trickle/rainbow-roll'
import { Float } from '@/components/trickle/float'
import { Spotlight } from '@/components/trickle/spotlight'

/**
 * The trickle plate: a specimen sheet that is actually running.
 *
 * A logo on this card would be the one project on the wall whose card cannot
 * show what it does. The kit is text animation, so the plate names fifteen of
 * its primitives and sets each in the primitive it names.
 *
 * Five lines, and each line turns over between three of them, so the card is
 * never showing the same page twice for long. Stacked rather than one at a
 * time, because five animations running together is what a catalogue looks
 * like and one at a time makes the card a slot machine.
 *
 * Two loops, nested and both pure CSS. The inner one swaps each line's word
 * every four seconds, offset per line so they do not all turn at once. The
 * outer one moves emphasis down the stack, one line at full ink while the rest
 * sit back, so there is always a subject.
 *
 * All fifteen come from trickle's continuous family, which matters here: a
 * reveal fires once on mount and is over, so a card built from reveals would be
 * blank a second after the page settled.
 *
 * The component ships no client JavaScript and holds no state, which is the
 * argument the kit makes. The type steps with the breakpoints rather than the
 * container, because the plate's width changes at exactly those points.
 */

/** Seconds a line holds the emphasis. Five lines makes the outer loop fifteen. */
const SLOT = 3
/** Seconds a word stays before its line turns over. Three each, so eighteen. */
const SWAP = 6
/** Offset between lines' turnovers, so the stack never flips all at once. */
const STAGGER = 1.2

/*
 * Echo's ghosts ripple outward and the plate clips its contents, so the
 * distance is pulled in from the kit's default of 32px: at plate scale a
 * shorter ripple stays inside the tile instead of running off the edge.
 */
const GHOST = 16

/*
 * ShinyShimmer ships tuned for a dark page — a mid-grey base with a white
 * glint, which on a light plate is a grey word with an invisible highlight.
 * The kit puts both ends behind custom properties for exactly this.
 */
const SHIMMER = {
  ['--trickle-shimmer-base' as string]: 'color-mix(in srgb, var(--foreground) 78%, transparent)',
  ['--trickle-shimmer-highlight' as string]: 'var(--foreground)',
}

/** Warm to cool, so the gradient reads as movement rather than as one hue. */
const GRADIENT = ['oklch(68% 0.15 20)', 'oklch(66% 0.14 300)', 'oklch(68% 0.15 20)']

/** Five lines of three. Each line turns over between its own set. */
const LINES: ReactNode[][] = [
  [
    <GlitchSplit key="glitch">glitch</GlitchSplit>,
    <Wave key="wave" text="wave" stagger={70} />,
    <AuroraText key="aurora">aurora</AuroraText>,
  ],
  [
    <Echo key="echo" ghostCount={4} ghostDistance={GHOST}>
      echo
    </Echo>,
    <Flutter key="flutter" text="flutter" stagger={60} />,
    <span key="shimmer" style={SHIMMER}>
      <ShinyShimmer duration={2600}>shimmer</ShinyShimmer>
    </span>,
  ],
  [
    <Plasma key="plasma">plasma</Plasma>,
    <Phase key="phase">phase</Phase>,
    <GradientShift key="gradient" colors={GRADIENT} duration={5200}>
      gradient
    </GradientShift>,
  ],
  [
    <Wobble3D key="wobble" text="wobble" />,
    <PulseText key="pulse">pulse</PulseText>,
    <NeonFlicker key="neon">neon</NeonFlicker>,
  ],
  [
    <RainbowRoll key="rainbow" text="rainbow" />,
    <Float key="float" text="float" stagger={90} />,
    <Spotlight key="spotlight">spotlight</Spotlight>,
  ],
]

export function TrickleSpecimen() {
  return (
    <span
      className="flex h-full w-full flex-col items-center justify-center gap-[0.68em] text-[13px] font-light leading-none tracking-tight text-foreground/90 sm:text-[18px] lg:text-[25px]"
      role="img"
      aria-label="trickle — fifteen of its text animations, cycling"
    >
      {LINES.map((line, i) => (
        <span
          key={i}
          className="aka-trickle-line grid whitespace-nowrap"
          style={{
            animationDelay: `${i * SLOT}s`,
            animationDuration: `${LINES.length * SLOT}s`,
          }}
        >
          {line.map((example, j) => (
            <span
              // One grid cell for all three, so the stack keeps its shape
              // whichever word is currently up.
              key={j}
              className="aka-trickle-swap col-start-1 row-start-1 block"
              style={{
                animationDelay: `${j * SWAP + i * STAGGER}s`,
                animationDuration: `${line.length * SWAP}s`,
              }}
            >
              {example}
            </span>
          ))}
        </span>
      ))}
    </span>
  )
}
