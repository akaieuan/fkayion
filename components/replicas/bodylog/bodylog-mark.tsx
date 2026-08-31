/**
 * The BodyLog mark — five weeks of the app's own logging grid, frozen.
 *
 * Hue says which thing was tracked, weight says how much, and the empty cells
 * are days nothing was logged. It is the product's data structure used as its
 * signature: not a metaphor for the record, but a picture of one. Gaps are
 * load-bearing — a mark with no gaps would quietly claim a perfect streak.
 *
 * Server-safe inline SVG (no client JS) so it can render inside project cards.
 * Ported from `PixelArt.markGrid` in the shipping app; do not regenerate — the
 * arrangement was chosen from 400 candidate seeds and is byte-identical across
 * the app icon, the splash and here.
 */

/** `[hueIndex, weight]` per cell. Frozen constant — never generate. */
const MARK: readonly (readonly [number, number])[][] = [
  [[0, 0], [4, 2], [3, 0], [1, 2], [2, 0]],
  [[0, 3], [3, 2], [1, 0], [4, 0], [3, 4]],
  [[4, 0], [4, 2], [4, 4], [1, 4], [4, 2]],
  [[3, 2], [2, 2], [1, 1], [2, 2], [2, 2]],
  [[1, 3], [1, 2], [0, 0], [4, 0], [4, 1]],
]

/** The five meaning hues, in fixed order: blue, green, amber, rose, violet. */
const HUES_DARK = ['#5D98F4', '#69B57F', '#F0BE67', '#EC7380', '#B3A0EC'] as const
const HUES_LIGHT = ['#1D6BDE', '#377249', '#B37903', '#C6495B', '#7152B5'] as const
const INSET_DARK = '#181817'
const INSET_LIGHT = '#e9e8e4'

/** Taken from the logging calendar itself — a 3pt gap on a 13pt cell. */
const GAP_RATIO = 0.24
const RADIUS_RATIO = 0.22

export function BodyLogMark({
  size = 96,
  theme = 'dark',
  className,
  title = 'BodyLog',
}: {
  size?: number
  theme?: 'dark' | 'light'
  className?: string
  /** Empty string renders it decorative (aria-hidden). */
  title?: string
}) {
  const hues = theme === 'light' ? HUES_LIGHT : HUES_DARK
  const inset = theme === 'light' ? INSET_LIGHT : INSET_DARK

  // Lay out on a 100-unit viewBox: 5 cells + 4 gaps.
  const unit = 100 / (5 + 4 * GAP_RATIO)
  const gap = unit * GAP_RATIO
  const r = unit * RADIUS_RATIO

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
    >
      {MARK.map((row, j) =>
        row.map(([hue, weight], i) => {
          // weight 0 is the empty token; 1–4 render the hue at 30/53/77/100%.
          const filled = weight > 0
          return (
            <rect
              key={`${i}-${j}`}
              x={i * (unit + gap)}
              y={j * (unit + gap)}
              width={unit}
              height={unit}
              rx={r}
              ry={r}
              fill={filled ? hues[hue] : inset}
              fillOpacity={filled ? 0.3 + (0.7 * (weight - 1)) / 3 : 1}
            />
          )
        }),
      )}
    </svg>
  )
}
