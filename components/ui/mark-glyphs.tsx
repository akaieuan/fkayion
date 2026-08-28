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
  /**
   * akaSTYLE — the type scale, as three blocks of falling length.
   *
   * The system's most visible rule is that hierarchy is carried by weight and
   * measure rather than by size, so the mark is the scale itself: display,
   * section head, caption. The accent lands on the smallest block, which is
   * law 02 stated in eight cells — one accent, and it goes to the quietest
   * thing on the plate rather than the loudest.
   */
  'aka-style': [
    '.######.',
    '.######.',
    '........',
    '.#####..',
    '.#####..',
    '........',
    '.aaaa...',
    '.aaaa...',
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

  /*
   * Cells are drawn in two passes, and the ink's softening is on the group
   * rather than on each rect.
   *
   * The cells overlap slightly so no hairline seam opens up at fractional
   * scales. Per-rect `fill-opacity` turns that overlap into the opposite
   * problem: two translucent rects composite darker where they meet, so a
   * solid run drew its own grid back over itself. The sparse glyphs hid it,
   * because most of their cells have a gap on at least one side; a mark built
   * from runs six cells wide did not. Opacity on the group is flattened once,
   * after the shapes are unioned, so overlaps are invisible.
   */
  const cells = (match: (ch: string) => boolean, fill: string) =>
    rows.map((row, j) =>
      [...row].map((ch, i) =>
        ch === '.' || !match(ch) ? null : (
          <rect
            key={`${i}-${j}`}
            x={i * cell}
            y={j * cell}
            width={cell * 1.06}
            height={cell * 1.06}
            fill={fill}
          />
        ),
      ),
    )

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden focusable="false">
      {/*
       * `opacity`, not `fill-opacity`. The latter is a presentation attribute
       * that inherits down to each rect, so every cell still paints at 0.92 on
       * its own and the overlaps composite to about 0.99 — a brighter grid
       * drawn exactly where the seams were supposed to disappear. `opacity`
       * groups: the union is rasterised first and dimmed once.
       */}
      <g opacity={0.92}>{cells((ch) => ch === '#', 'currentColor')}</g>
      <g>{cells((ch) => ch === 'a', accent ?? 'currentColor')}</g>
    </svg>
  )
}

export function hasGlyph(name: string) {
  return name in GRIDS
}
