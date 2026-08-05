/**
 * The card art field — the hero mark's construction, rendered on the server.
 *
 * This is not a pattern. It is the same thing `aka-mark.tsx` draws to canvas:
 * a disc of cells with a subject knocked out of it, sampled on a grid. Same
 * geometry module (`../features/brand/shapes`), same per-cell delay formula
 * (banded by row, jittered per cell), same glitch offsets (whole-cell jumps
 * from `hash(seed)`). The only difference is that the hero animates on a
 * requestAnimationFrame loop and this one hands its per-cell numbers to CSS as
 * custom properties, so the whole thing is static HTML until you hover it.
 *
 * The disc is drawn larger than the plate and pushed off-centre, so it crops
 * differently on every card — you read a fragment of a mark, not a second logo
 * competing with the icon in front.
 */

import { SHAPES, hash, type ShapeName } from '@/components/features/brand/shapes'

/** Which glitch character a card's cells use. */
export type FieldMotion = 'scatter' | 'sweep' | 'jitter' | 'collapse' | 'drift' | 'burst'

export function PixelField({
  shape,
  accent,
  seed = 1,
  motion,
  /** Cells across the plate. The disc bleeds past it. */
  cols = 24,
  rows = 12,
  className,
}: {
  shape: ShapeName
  /** The project's hue; the field is drawn entirely in it. */
  accent: string
  seed?: number
  motion?: FieldMotion
  cols?: number
  rows?: number
  className?: string
}) {
  const knockout = SHAPES[shape]
  const cellW = 100 / cols
  const cellH = 100 / rows
  /**
   * Two decimals on every coordinate. The raw floats are ~17 characters each
   * and there are four per cell — rounding them is most of this page's weight,
   * and at a 100-unit viewBox the difference is far under a device pixel.
   */
  const r2 = (n: number) => Math.round(n * 100) / 100

  // Where the disc sits, and how far past the plate it runs. Deterministic per
  // card, so the crop is part of the project's identity rather than noise.
  const cx = 0.5 + (hash(seed) - 0.5) * 0.42
  const cy = 0.5 + (hash(seed + 11) - 0.5) * 0.3
  const radius = 0.62 + hash(seed + 23) * 0.26 // > 0.5 ⇒ always bleeds
  const figScale = 0.86

  const cells: React.ReactElement[] = []
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      // Normalized to the disc, correcting for the plate being wide, not square.
      const nx = ((i + 0.5) / cols - cx) / radius
      const ny = (((j + 0.5) / rows - cy) * (rows / cols)) / radius
      const d = Math.hypot(nx, ny)
      if (d >= 0.98) continue
      if (knockout(nx / figScale, ny / figScale)) continue // the subject, knocked out

      const cellSeed = i * 37 + j * 101 + seed
      const r1 = hash(cellSeed)
      // The hero's own delay: banded by row, then jittered per cell, so the
      // reform reads as a wave crossing the shape rather than a random fizz.
      const delay = hash(Math.floor((ny + 1) * 6)) * 0.7 + r1 * 0.3
      // The hero's own displacement: whole-cell jumps, mostly sideways.
      const qx = Math.round((hash(cellSeed + 53) - 0.5) * 8)
      const qy = hash(cellSeed + 17) > 0.82 ? Math.round((hash(cellSeed + 29) - 0.5) * 4) : 0

      // Per-cell numbers ride on classes rather than inline custom properties:
      // ten delay buckets and nine jump columns compress to a handful of
      // repeated tokens, where `style="--d:341ms;--qx:-4"` per cell does not.
      // Denser toward the middle of the disc, thinning at the rim — the
      // engine's own falloff, bucketed so it compresses.
      const o = Math.min(5, Math.floor((1 - d) * 6))
      const cls = motion
        ? `o${o} d${Math.round(delay * 9)} x${qx + 4}${qy ? ` y${qy + 2}` : ''}`
        : `o${o}`

      cells.push(
        <rect
          key={`${i}-${j}`}
          className={cls}
          x={r2(i * cellW)}
          y={r2(j * cellH)}
        />,
      )
    }
  }

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      // One fill for the whole field — the cells inherit it, rather than each
      // repeating the hex.
      fill={accent}
      className={[className, motion ? `aka-field aka-field-${motion}` : ''].filter(Boolean).join(' ')}
      aria-hidden
      focusable="false"
    >
      {cells}
    </svg>
  )
}
