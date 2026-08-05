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
 * Grid resolutions. A card drawn at 46 columns reads as fine grain, one at 24
 * as chunky pixels — same engine, different zoom, and it does as much to tell
 * cards apart as the shapes do.
 */
const DENSITIES = [24, 30, 38, 46] as const

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
  className,
}: {
  shape: ShapeName
  /** The project's hue; the field is drawn entirely in it. */
  accent: string
  seed?: number
  motion?: FieldMotion
  cols?: number
  className?: string
}) {
  const knockout = SHAPES[shape]
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
      className={[className, 'aka-field', motion ? `aka-field-${motion}` : '']
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
        const o = Math.min(5, Math.max(0, Math.floor((g.depth / g.n) * 7)))
        const cls =
          key === 'still' ? `o${o}` : `o${o} d${key.split(':')[0]} v${key.split(':')[1]}`
        return <path key={key} className={cls} d={g.d.join('')} />
      })}
    </svg>
  )
}
