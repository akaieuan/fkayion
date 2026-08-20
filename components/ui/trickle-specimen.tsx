import { GradientShift } from '@/components/trickle/gradient-shift'
import { Wave } from '@/components/trickle/wave'
import { ShinyShimmer } from '@/components/trickle/shiny-shimmer'
import { Float } from '@/components/trickle/float'
import { Flutter } from '@/components/trickle/flutter'
import { Phase } from '@/components/trickle/phase'
import { Wobble3D } from '@/components/trickle/wobble-3d'
import { RainbowRoll } from '@/components/trickle/rainbow-roll'

/**
 * The trickle plate: a specimen sheet that is actually running.
 *
 * A logo on this card would be the one project on the wall whose card cannot
 * show what it does. The kit is text animation, so the plate names eight of its
 * primitives, each set in the primitive it names, and cycles through them.
 *
 * One at a time rather than a stack. A stack of eight would be eight lines of
 * tiny type; one at a time lets each word be large enough to actually watch,
 * and cycling is what a catalogue does. The lines share a single grid cell and
 * take turns through one keyframe: eight slots on a shared loop, each offset by
 * one slot, so the sequence needs nothing to drive it.
 *
 * All eight are from trickle's continuous family, which is the half of the
 * catalogue built to loop. That matters here: a reveal fires once on mount and
 * is over, so a card built from reveals would be blank a second after the page
 * settled. A loop needs nothing to restart it.
 *
 * Everything is CSS. The component ships no client JavaScript and holds no
 * state, which is the argument the kit makes.
 *
 * The type steps with the breakpoints rather than the container, because the
 * plate's width changes at exactly those points.
 */

/** Seconds each word holds. Eight of them makes the loop about eighteen. */
const SLOT = 2.3

/*
 * The shimmer ships tuned for a dark page: a mid-grey base with a white glint,
 * which on a light plate is a grey word with an invisible highlight. The kit
 * puts both ends behind custom properties for exactly this, so they are set to
 * the page's own ink and the sheen works in either theme.
 */
const SHIMMER = {
  ['--trickle-shimmer-base' as string]: 'color-mix(in srgb, var(--foreground) 78%, transparent)',
  ['--trickle-shimmer-highlight' as string]: 'var(--foreground)',
}

/** Warm through cool, so the coloured ones do not land back to back. */
const GRADIENT = ['oklch(68% 0.15 20)', 'oklch(66% 0.14 300)', 'oklch(68% 0.15 20)']

const EXAMPLES = [
  <GradientShift key="gradient" colors={GRADIENT} duration={5200}>
    gradient
  </GradientShift>,
  <Wave key="wave" text="wave" stagger={70} />,
  <span key="shimmer" style={SHIMMER}>
    <ShinyShimmer duration={2600}>shimmer</ShinyShimmer>
  </span>,
  <Float key="float" text="float" stagger={90} />,
  <Flutter key="flutter" text="flutter" stagger={60} />,
  <Phase key="phase">phase</Phase>,
  <Wobble3D key="wobble" text="wobble" />,
  <RainbowRoll key="rainbow" text="rainbow" />,
]

export function TrickleSpecimen() {
  return (
    <span
      className="grid h-full w-full place-items-center font-light tracking-tight text-foreground/90"
      role="img"
      aria-label="trickle — eight of its text animations, cycling"
    >
      {EXAMPLES.map((example, i) => (
        <span
          // Every line occupies the same cell, so the plate does not resize
          // around whichever word is currently up.
          key={i}
          className="aka-trickle-slot col-start-1 row-start-1 block whitespace-nowrap leading-none text-[15px] sm:text-[22px] lg:text-[28px]"
          style={{
            animationDelay: `${i * SLOT}s`,
            animationDuration: `${EXAMPLES.length * SLOT}s`,
          }}
        >
          {example}
        </span>
      ))}
    </span>
  )
}
