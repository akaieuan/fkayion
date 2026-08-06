/**
 * The card art field: a dithered gradient in the project's own hue.
 *
 * It is a *background*, not a mark. An earlier version knocked a subject out of
 * a disc the way the hero does, and the result read as a second logo sitting
 * behind the real one — the silhouette competed with the icon in front instead
 * of supporting it. So there is no shape here at all now. A gradient ramps
 * across the plate and an ordered dither resolves it into cells: the texture
 * carries the brand language, the icon carries the identity.
 *
 * What differs card to card is the ramp (which way the gradient runs), the
 * dither (how it breaks up), the grain (how fine the cells are) and the hue.
 * Four independent axes, no two plates alike, and nothing that reads as a form.
 *
 * It stays cheap enough to put twenty of on one page:
 *
 * 1. Cells group by the motion they share — delay band x jump vector — and each
 *    group is drawn as ONE `<path>`. About 26 animated nodes per card rather
 *    than several hundred elements, which is the whole frame-rate story.
 * 2. The viewBox is the cell lattice itself, so a square is `M12 8h.8v.8h-.8z`
 *    rather than a decimal fraction of 100, and everything that repeats — fill,
 *    alpha, delay, jump — is a class, never an attribute written per cell.
 */

import { hash } from '@/components/features/brand/shapes'

/** Which glitch character a card's cells use. */
export type FieldMotion = 'scatter' | 'sweep' | 'jitter' | 'collapse' | 'drift' | 'burst'

/**
 * How the gradient runs across the plate. `u` and `v` are 0–1 across and down;
 * each returns the level at that point, 1 being solid and 0 being empty.
 *
 * Every one of these is anchored solid along at least three edges and falls
 * away toward a single corner or side. Two reasons. It has to read as a
 * background, which means filling its plate rather than floating in the middle
 * of it with margins around it. And it has to stay abstract: a ramp that peaks
 * somewhere interior draws a band or a blob, and any closed form back there
 * reads as a second mark competing with the icon in front.
 */
const RAMPS = {
  /** Solid top-left, falling to the bottom-right corner. */
  fall: (u: number, v: number) => 1.35 - (u * 0.72 + v * 0.62),
  /** Solid along the top, thinning downward. */
  settle: (u: number, v: number) => 1.3 - v * 1.15 - u * 0.12,
  /** Solid along the left, thinning across. */
  lean: (u: number, v: number) => 1.28 - u * 1.1 - v * 0.14,
  /** Solid but for one corner falling away. */
  corner: (u: number, v: number) => 1.32 - Math.hypot(u - 0.92, (v - 0.9) * 0.8) * 1.05,
  /** Densest at the top-left, easing off in a slow arc. */
  swell: (u: number, v: number) => 1.24 - Math.hypot(u - 0.04, (v - 0.1) * 0.8) * 0.78,
} as const

export type Ramp = keyof typeof RAMPS
const RAMP_NAMES = Object.keys(RAMPS) as Ramp[]

/**
 * Grid resolutions. All fine — coarse cells read as noise at this size — with
 * enough spread that a wall of cards is not one uniform grain.
 */
const DENSITIES = [34, 40, 46, 52] as const

/**
 * How the gradient breaks into cells. This is where most of the character is:
 * the same ramp ordered-dithered, checkered or scanlined reads as three
 * different materials. `level` is 1 at the solid end and 0 at the empty end.
 */
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
]

const DITHERS = {
  /** Classic 4x4 ordered dither — the finest, most photographic falloff. */
  bayer: (i: number, j: number, level: number) => level > BAYER[j % 4]![i % 4]! / 16,
  /** A coarser threshold, so the fade breaks into visible clumps. */
  halftone: (i: number, j: number, level: number) =>
    level > ((BAYER[j % 4]![i % 4]! >> 2) + 0.5) / 4,
  /** Checkerboard through the fade — a woven texture. */
  checker: (i: number, j: number, level: number) =>
    level > 0.8 || ((i + j) % 2 === 0 && level > 0.3),
  /** Scanlines — reads like a CRT or a readout. */
  scan: (i: number, j: number, level: number) => level > 0.86 || (j % 2 === 0 && level > 0.28),
  /** The same idea turned ninety degrees. */
  rule: (i: number, j: number, level: number) => level > 0.86 || (i % 2 === 0 && level > 0.28),
  /** The sparsest: one cell in four, and only where the ramp is still strong. */
  lattice: (i: number, j: number, level: number) =>
    level > 0.88 || (i % 2 === 0 && j % 2 === 0 && level > 0.24),
  /** Sparser still — one in nine, for plates that want air. */
  drizzle: (i: number, j: number, level: number) =>
    level > 0.9 || (i % 3 === 0 && j % 3 === 0 && level > 0.14),
} as const

export type Dither = keyof typeof DITHERS
const DITHER_NAMES = Object.keys(DITHERS) as Dither[]

/** Delay bands and jump vectors. Their product is the number of animated
 *  nodes, so both stay small on purpose. */
const DELAY_BANDS = 5
const VECTORS = 8

export function PixelField({
  accent,
  seed = 1,
  motion,
  /** Which way the gradient runs; omit to take one from the seed. */
  ramp,
  /** How the gradient breaks into cells; omit to take one from the seed. */
  dither,
  /** Cells across the plate; omit to take a resolution from the seed. */
  cols,
  className,
}: {
  /** The project's hue; the field is drawn entirely in it. */
  accent: string
  seed?: number
  motion?: FieldMotion
  ramp?: Ramp
  dither?: Dither
  cols?: number
  className?: string
}) {
  const rampName =
    ramp ?? RAMP_NAMES[Math.floor(hash(seed + 3) * RAMP_NAMES.length) % RAMP_NAMES.length]!
  const ditherName =
    dither ?? DITHER_NAMES[Math.floor(hash(seed + 7) * DITHER_NAMES.length) % DITHER_NAMES.length]!
  const level = RAMPS[rampName]
  const thin = DITHERS[ditherName]

  const nCols = cols ?? DENSITIES[Math.floor(hash(seed + 5) * DENSITIES.length) % DENSITIES.length]!
  const nRows = Math.round(nCols / 2)

  // Nudge the ramp per card so two projects on the same ramp don't line up,
  // and mirror some of them so a diagonal doesn't always fall the same way.
  const shiftU = (hash(seed) - 0.5) * 0.3
  const shiftV = (hash(seed + 11) - 0.5) * 0.24
  const flipU = hash(seed + 17) > 0.5
  const flipV = hash(seed + 29) > 0.68

  /** One entry per motion bucket: its path data, and how solid it sits. */
  const groups = new Map<string, { d: string[]; level: number; n: number }>()

  for (let j = 0; j < nRows; j++) {
    for (let i = 0; i < nCols; i++) {
      let u = (i + 0.5) / nCols + shiftU
      let v = (j + 0.5) / nRows + shiftV
      if (flipU) u = 1 - u
      if (flipV) v = 1 - v
      const t = level(u, v)
      if (t <= 0) continue
      if (!thin(i, j, t)) continue

      const cellSeed = i * 37 + j * 101 + seed
      // The hero's own delay: banded by row, then jittered per cell, so the
      // dissolve reads as a wave crossing the plate rather than a random fizz.
      const delay = hash(Math.floor(v * 12)) * 0.7 + hash(cellSeed) * 0.3
      const band = Math.min(DELAY_BANDS - 1, Math.floor(delay * DELAY_BANDS))
      // The hero's own displacement, quantized to a small set of vectors so the
      // cells that move together can be drawn together.
      const vec = Math.floor(hash(cellSeed + 53) * VECTORS) % VECTORS

      const key = motion ? `${band}:${vec}` : 'still'
      let g = groups.get(key)
      if (!g) groups.set(key, (g = { d: [], level: 0, n: 0 }))
      // One square, closed: move, right, down, left, close. Shorter than a
      // <rect> element and it costs no DOM node.
      g.d.push(`M${i} ${j}h.8v.8h-.8z`)
      g.level += t
      g.n++
    }
  }

  return (
    <svg
      viewBox={`0 0 ${nCols} ${nRows}`}
      preserveAspectRatio="none"
      className={[
        className,
        'aka-field',
        `aka-ramp-${rampName}`,
        `aka-dither-${ditherName}`,
        motion ? `aka-field-${motion}` : '',
      ]
        .filter(Boolean)
        .join(' ')}
      // One fill for the whole field. A jump of one cell is one user unit in
      // this space, so a 34-column card and a 52-column card throw their cells
      // exactly one cell at a time without either needing to say how big it is.
      fill={accent}
      aria-hidden
      focusable="false"
    >
      {[...groups].map(([key, g]) => {
        // Alpha per group, from how solid its cells average — the gradient's
        // own depth, kept without paying for a class on every cell.
        const o = Math.min(5, Math.max(0, Math.round((g.level / g.n) * 6)))
        const cls = key === 'still' ? `o${o}` : `o${o} d${key.split(':')[0]} v${key.split(':')[1]}`
        return <path key={key} className={cls} d={g.d.join('')} />
      })}
    </svg>
  )
}
