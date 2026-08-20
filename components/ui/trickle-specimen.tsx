import { GradientShift } from '@/components/trickle/gradient-shift'
import { Wave } from '@/components/trickle/wave'
import { ShinyShimmer } from '@/components/trickle/shiny-shimmer'
import { Float } from '@/components/trickle/float'

/**
 * The trickle plate: a specimen sheet that is actually running.
 *
 * A logo on this card would be the one project on the wall whose card cannot
 * show what it does. The kit is text animation, so the plate sets four words in
 * four of its own primitives and lets them play.
 *
 * All four are from trickle's continuous family, which is the half of the
 * catalogue built to loop. That matters here: a reveal animation fires once on
 * mount and is over, so a card built from reveals would be blank a second after
 * the page settled. A loop needs nothing to restart it.
 *
 * The cycling is a fifth animation, added here rather than taken from the kit:
 * each line's emphasis rises and falls on a shared eight-second loop, offset by
 * two seconds, so the lines take turns being the bright one instead of four
 * things moving at once. Everything is CSS. The component ships no client
 * JavaScript and holds no state, which is the whole argument the kit makes.
 *
 * The type steps with the breakpoints rather than the container, because the
 * plate's width changes at exactly those points.
 */

const LINE = 'aka-trickle-line block leading-none'
const size = 'text-[11px] sm:text-[15px] lg:text-[18px]'

/** The plate's own accent, so the one coloured line agrees with its tint. */
const GRADIENT = ['oklch(68% 0.15 20)', 'oklch(66% 0.14 300)', 'oklch(68% 0.15 20)']

/*
 * The shimmer ships tuned for a dark page: a mid-grey base with a white glint,
 * which on a light plate is a grey word with an invisible highlight. The kit
 * puts both ends behind custom properties for exactly this, so they are set to
 * the page's own ink and the sheen works in either theme.
 */
const SHIMMER = {
  ['--trickle-shimmer-base' as string]: 'color-mix(in srgb, var(--foreground) 62%, transparent)',
  ['--trickle-shimmer-highlight' as string]: 'var(--foreground)',
}

export function TrickleSpecimen() {
  return (
    <span
      className={`flex h-full w-full flex-col items-center justify-center gap-[0.55em] font-light tracking-tight text-foreground/85 ${size}`}
      role="img"
      aria-label="trickle — four of its text animations, running"
    >
      <span className={LINE} style={{ animationDelay: '0s' }}>
        <GradientShift colors={GRADIENT} duration={5200}>
          gradient
        </GradientShift>
      </span>
      <span className={LINE} style={{ animationDelay: '2s' }}>
        <Wave text="wave" stagger={70} />
      </span>
      <span className={LINE} style={{ animationDelay: '4s', ...SHIMMER }}>
        <ShinyShimmer duration={2600}>shimmer</ShinyShimmer>
      </span>
      <span className={LINE} style={{ animationDelay: '6s' }}>
        <Float text="float" stagger={90} />
      </span>
    </span>
  )
}
