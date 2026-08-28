/**
 * Drawn marks for projects that never had a logo of their own.
 *
 * Same rule as the rest of the site's bit language: a character grid, not an
 * asset. `#` takes the foreground, `a` takes the card's accent — one accent
 * cell each, so the mark stays monochrome enough to sit under any hue.
 */

const GRIDS: Record<string, string[]> = {
  /** Null Browser — a slashed zero. */
  zero: [
    '..####..',
    '.##..##.',
    '.##.a##.',
    '.##aa##.',
    '.##aa##.',
    '.##a.##.',
    '.##..##.',
    '..####..',
  ],
  /** Music Analysis Chat — a bubble with a note in it. */
  'music-chat': [
    '######..',
    '#....#..',
    '#..aa#..',
    '#..a.#..',
    '#..a.#..',
    '#.aa.#..',
    '######..',
    '.##.....',
  ],
}

export type GlyphName = keyof typeof GRIDS

export function MarkGlyph({
  name,
  size = 60,
  accent,
}: {
  name: string
  size?: number
  /** The card's hue, for the `a` cells. Falls back to the ink. */
  accent?: string
}) {
  const rows = GRIDS[name]
  if (!rows) return null
  const cell = 100 / rows.length
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden focusable="false">
      {rows.map((row, j) =>
        [...row].map((ch, i) =>
          ch === '.' ? null : (
            // 2% overlap so no hairline seam opens up at fractional scales.
            <rect
              key={`${i}-${j}`}
              x={i * cell}
              y={j * cell}
              width={cell * 1.02}
              height={cell * 1.02}
              fill={ch === 'a' ? (accent ?? 'currentColor') : 'currentColor'}
              fillOpacity={ch === 'a' ? 1 : 0.92}
            />
          ),
        ),
      )}
    </svg>
  )
}

export function hasGlyph(name: string) {
  return name in GRIDS
}
