/**
 * The deck's two rules, as arithmetic.
 *
 * Both of these used to live inside the controller's scroll handler, where
 * they could not be run without a browser, a layout and a scroll position.
 * That is how the culling rule shipped wrong: the mistake was one comparison,
 * and finding it took several rounds of screenshotting the deck and diffing
 * the pixels. Out here it is a one-line assertion.
 *
 * No React, no DOM, no imports. See lib/cover-flow.test.ts.
 */

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi)

/**
 * Is cover `k` completely hidden behind another one, with the deck centred
 * on `index`?
 *
 * Past `near` the CSS clamps every cover to a single pose, so they stop being
 * their own picture and pile up exactly on top of one another. The CSS also
 * stacks every cover by its distance from the centre, nearest on top, so the
 * cover at exactly `near` fronts its pile on either side and everything
 * further out is behind it. That stacking is why the rule is symmetric now:
 * it used to spare the last cover on the page, because a preserve-3d deck
 * left the coplanar right-hand pile to document order and the last cover
 * painted on top of it.
 */
export function isCovered(k: number, index: number, count: number, near = 6): boolean {
  return k < index - near || k > index + near
}

/**
 * How far a cover holds dead centre before the deck starts turning over, as a
 * fraction of the scroll between two covers. Both ends of every step.
 */
export const DEAD = 0.32

/**
 * Where the deck sits, given `p` as the fraction of the way through it.
 *
 * Deliberately not linear. A linear mapping means most of the positions you
 * can stop at show a half-turned cover, and the obvious fix — a scroll-snap
 * point per cover — moves the page under the reader, which feels like the
 * page arguing with you. Nothing has to move the scroll: it is enough that
 * the mapping spends most of its range parked on a cover. So each step holds
 * the current cover through its first and last `DEAD`, then turns over across
 * what is left, smoothed at both ends so it starts and stops without a corner.
 */
export function flowAt(p: number, count: number, dead = DEAD): number {
  const raw = clamp(p, 0, 1) * (count - 1)
  const i = Math.min(Math.floor(raw), count - 2)
  const f = raw - i
  const t = clamp((f - dead) / (1 - 2 * dead), 0, 1)
  return i + t * t * (3 - 2 * t)
}
