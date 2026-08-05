/**
 * The card art field — the hero mark's construction, rendered on the server.
 *
 * This is not a pattern. It is the same thing `aka-mark.tsx` draws to canvas:
 * a disc of cells with a subject knocked out of it, sampled on a grid. Same
 * geometry module (`../features/brand/shapes`), same delay formula (banded by
 * row, jittered per cell), same glitch offsets (whole-cell jumps from
 * `hash(seed)`). The hero animates on a requestAnimationFrame loop; this hands
 * its numbers to CSS, so the whole thing is static HTML until hover.
 *
 * Three decisions make it cheap enough to put twenty of on one page:
 *
 * 1. Cells are grouped by *motion*, not position — every cell sharing a jump
 *    vector and a delay bucket travels together. Cells sharing a vector are
 *    scattered all over the shape, so the grouping is invisible: you still read
 *    individual cells flying their own way.
 * 2. Each group is drawn as ONE `<path>`, not as hundreds of `<rect>`s. That is
 *    ~35 animated nodes per card instead of ~400, which is the entire frame-rate
 *    story: the browser composites 35 transforms rather than rasterising a
 *    tree of hundreds of elements every frame.
 * 3. The viewBox is the cell lattice itself, so a square is `M12 8h.8v.8h-.8z`
 *    rather than a decimal fraction of 100, and everything that repeats — fill,
 *    alpha, delay, jump — is a class, never an attribute written per cell.
 *
 * The disc is drawn larger than the plate and pushed off-centre, so it crops
 * differently on every card — you read a fragment of a mark, not a second logo
 * competing with the icon in front.
 */

import { SHAPES, hash, type ShapeName } from '@/components/features/brand/shapes'

/** Which glitch character a card's cells use. */
export type FieldMotion = 'scatter' | 'sweep' | 'jitter' | 'collapse' | 'drift' | 'burst'

/**
 * Grid resolutions. All fine — the coarse ones read as noise at this size — with
 * enough spread that a wall of cards is not one uniform grain.
 */
const DENSITIES = [34, 40, 46, 52] as const

/**
 * How the disc thins toward its rim. This, not the grid size, is where the
 * variation lives: the same shape at the same zoom reads completely differently
 * ordered-dithered than checkered than scanlined. `depth` is 1 at the centre of
 * the disc and 0 at its edge, so every one of these is solid in the middle and
 * comes apart at the rim — the way a dither resolves a gradient.
 */
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
]

const DITHERS = {
  /** Classic 4x4 ordered dither — the finest, most photographic falloff. */
  bayer: (i: number, j: number, depth: number) => depth > BAYER[j % 4]![i % 4]! / 16,
  /** Half-tone: a coarser 2x2 threshold, so the rim breaks into visible clumps. */
  halftone: (i: number, j: number, depth: number) =>
    depth > ((BAYER[(j % 4) as number]![(i % 4) as number]! >> 2) + 0.5) / 4,
  /** Checkerboard past the core — a woven texture. */
  checker: (i: number, j: number, depth: number) => depth > 0.55 || ((i + j) % 2 === 0 && depth > 0.12),
  /** Scanlines past the core — reads like a CRT or a readout. */
  scan: (i: number, j: number, depth: number) => depth > 0.6 || (j % 2 === 0 && depth > 0.1),
  /** Vertical rules — the same idea turned ninety degrees. */
  rule: (i: number, j: number, depth: number) => depth > 0.6 || (i % 2 === 0 && depth > 0.1),
  /** A sparse lattice: one cell in four survives outside the core. */
  lattice: (i: number, j: number, depth: number) =>
    depth > 0.62 || (i % 2 === 0 && j % 2 === 0 && depth > 0.08),
} as const

export type Dither = keyof typeof DITHERS
const DITHER_NAMES = Object.keys(DITHERS) as Dither[]

/** Delay bands, and the jump vectors a cell can draw. Their product is the
 *  number of animated nodes, so both stay small on purpose. */
const DELAY_BANDS = 5
const VECTORS = 8

export function PixelField({
  shape,
  accent,
  seed = 1,
  motion,
  /** Cells across the plate; omit to take a resolution from the seed. */
  cols,
  /** How the disc thins at its rim; omit to take one from the seed. */
  dither,
  className,
}: {
  shape: ShapeName
  /** The project's hue; the field is drawn entirely in it. */
  accent: string
  seed?: number
  motion?: FieldMotion
  cols?: number
  dither?: Dither
  className?: string
}) {
  const knockout = SHAPES[shape]
  const ditherName =
    dither ?? DITHER_NAMES[Math.floor(hash(seed + 7) * DITHER_NAMES.length) % DITHER_NAMES.length]!
  const thin = DITHERS[ditherName]
  const nCols = cols ?? DENSITIES[Math.floor(hash(seed + 5) * DENSITIES.length) % DENSITIES.length]!
  const nRows = Math.round(nCols / 2)

  // Where the disc sits and how far past the plate it runs. Deterministic per
  // card, so the crop is part of the project's identity rather than noise.
  const cx = 0.5 + (hash(seed) - 0.5) * 0.46
  const cy = 0.5 + (hash(seed + 11) - 0.5) * 0.32
  const radius = 0.6 + hash(seed + 23) * 0.3 // > 0.5 ⇒ always bleeds
  const figScale = 0.8 + hash(seed + 31) * 0.16

  /** One entry per motion bucket: its path data, and how deep in the disc it sits. */
  const groups = new Map<string, { d: string[]; depth: number; n: number }>()

  for (let j = 0; j < nRows; j++) {
    for (let i = 0; i < nCols; i++) {
      // Normalized to the disc, correcting for the plate being wide, not square.
      const dx = ((i + 0.5) / nCols - cx) / radius
      const dy = (((j + 0.5) / nRows - cy) * (nRows / nCols)) / radius
      const dist = Math.hypot(dx, dy)
      if (dist >= 0.98) continue
      if (knockout(dx / figScale, dy / figScale)) continue // the subject, knocked out
      // The dither decides what survives near the rim.
      if (!thin(i, j, 1 - dist)) continue

      const cellSeed = i * 37 + j * 101 + seed
      // The hero's own delay: banded by row, then jittered per cell, so the
      // reform reads as a wave crossing the shape rather than a random fizz.
      const delay = hash(Math.floor((dy + 1) * 6)) * 0.7 + hash(cellSeed) * 0.3
      const band = Math.min(DELAY_BANDS - 1, Math.floor(delay * DELAY_BANDS))
      // The hero's own displacement, quantized to a small set of vectors so the
      // cells that move together can be drawn together.
      const v = Math.floor(hash(cellSeed + 53) * VECTORS) % VECTORS

      const key = motion ? `${band}:${v}` : 'still'
      let g = groups.get(key)
      if (!g) groups.set(key, (g = { d: [], depth: 0, n: 0 }))
      // One square, closed: move, right, down, left, close. Shorter than a
      // <rect> element and it costs no DOM node.
      g.d.push(`M${i} ${j}h.8v.8h-.8z`)
      g.depth += 1 - dist
      g.n++
    }
  }

  return (
    <svg
      viewBox={`0 0 ${nCols} ${nRows}`}
      preserveAspectRatio="none"
      className={[className, 'aka-field', `aka-dither-${ditherName}`, motion ? `aka-field-${motion}` : '']
        .filter(Boolean)
        .join(' ')}
      // One fill for the whole field. A jump of one cell is one user unit in
      // this space, so a 24-column card and a 46-column card throw their cells
      // exactly one cell at a time without either needing to say how big it is.
      fill={accent}
      aria-hidden
      focusable="false"
    >
      {[...groups].map(([key, g]) => {
        // Alpha per group, from how deep in the disc its cells average — the
        // engine's falloff, kept without paying for a class on every cell.
        const o = Math.min(5, Math.max(1, Math.round(2 + (g.depth / g.n) * 5)))
        const cls =
          key === 'still' ? `o${o}` : `o${o} d${key.split(':')[0]} v${key.split(':')[1]}`
        return <path key={key} className={cls} d={g.d.join('')} />
      })}
    </svg>
  )
}
