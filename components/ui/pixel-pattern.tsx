/**
 * Pixel-cell card backgrounds, in the same bit language as the marks.
 *
 * Pure server-rendered SVG: a deterministic grid of cells, seeded per project,
 * washed in that project's muted hue. No client JS, no canvas, no images — the
 * whole thing is a few hundred `<rect>`s that gzip to nothing and paint with
 * the first HTML.
 *
 * Four arrangements so a wall of cards doesn't repeat itself. Each stays quiet:
 * these sit *behind* a logo, so they never exceed ~18% alpha.
 */

export type PatternKind = 'drift' | 'scatter' | 'strata' | 'bloom'

/** Deterministic 0–1 — same card, same pattern, every render and reload. */
function rand(seed: number, i: number) {
  const x = Math.sin(seed * 127.1 + i * 311.7) * 43758.5453
  return x - Math.floor(x)
}

/**
 * Cell opacity for a given arrangement.
 * Returns 0 for cells that should not be drawn at all.
 */
function weightFor(kind: PatternKind, col: number, row: number, cols: number, rows: number, seed: number, i: number) {
  const r = rand(seed, i)
  const cx = (col + 0.5) / cols
  const cy = (row + 0.5) / rows

  switch (kind) {
    // A diagonal drift, denser toward the top-left — the logging-grid feel.
    case 'drift': {
      const t = 1 - (cx * 0.7 + cy * 0.5)
      return r < t * 0.85 ? 0.25 + r * 0.75 : 0
    }
    // Loose confetti; reads as noise rather than structure.
    case 'scatter':
      return r > 0.82 ? 0.3 + rand(seed, i + 7) * 0.7 : 0
    // Horizontal bands of varying density — layered, like stacked records.
    case 'strata': {
      const band = rand(seed, row * 3) // one weight per row
      return r < band * 0.9 ? 0.2 + band * 0.6 : 0
    }
    // A soft radial bloom off one corner.
    case 'bloom': {
      const d = Math.hypot(cx - 0.16, cy - 0.2)
      const t = Math.max(0, 1 - d * 1.5)
      return r < t ? 0.25 + t * 0.75 : 0
    }
  }
}

export function PixelPattern({
  kind = 'drift',
  accent,
  seed = 1,
  cols = 26,
  rows = 11,
  className,
}: {
  kind?: PatternKind
  /** The project's hue; the pattern is drawn entirely in it. */
  accent: string
  seed?: number
  cols?: number
  rows?: number
  className?: string
}) {
  const gap = 0.18 // fraction of a cell
  const cell = 100 / cols
  const size = cell * (1 - gap)
  const rectH = 100 / rows

  const cells: React.ReactElement[] = []
  let i = 0
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++, i++) {
      const w = weightFor(kind, col, row, cols, rows, seed, i)
      if (!w) continue
      cells.push(
        <rect
          key={i}
          x={col * cell}
          y={row * rectH}
          width={size}
          height={rectH * (1 - gap)}
          rx={size * 0.22}
          fill={accent}
          fillOpacity={w * 0.18}
        />,
      )
    }
  }

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
      focusable="false"
    >
      {cells}
    </svg>
  )
}

/** Give each project a stable arrangement + seed from its own name. */
export function patternFor(key: string): { kind: PatternKind; seed: number } {
  let h = 0
  for (let i = 0; i < key.length; i++) h = (Math.imul(h, 31) + key.charCodeAt(i)) >>> 0
  const kinds: PatternKind[] = ['drift', 'scatter', 'strata', 'bloom']
  return { kind: kinds[h % 4]!, seed: (h % 997) + 1 }
}
