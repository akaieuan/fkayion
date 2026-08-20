/**
 * The Blockpad mark, drawn rather than shipped as a bitmap.
 *
 * Blockpad generates its own icon in Core Graphics from the app's palette and
 * emits an SVG from the same ratios, so vector and raster cannot drift. Those
 * ratios are transcribed here: a white squircle on Apple's icon geometry, a
 * 22.37% continuous corner radius, inset in its canvas, holding three blocks
 * from the palette — slate as the main column, dusty red and amber stacked
 * beside it. It is a blockout of a layout, which is literally what the app does.
 *
 * Vector because it has to survive being an 18px specimen and a 300px plate on
 * the same page. A 1024px PNG has to be resampled for both, and a white card
 * with a soft shadow is the worst thing to resample: the shadow smears and the
 * squircle's edge goes to mush.
 *
 * Two of the app's own size rules are kept rather than flattened, because they
 * are the reason the mark reads at all:
 *
 *   - The shadow is dropped below 64px, where it stops describing a card and
 *     only muddies the silhouette.
 *   - The hairline appears at 128px and up, where it is the only thing keeping
 *     a white card from dissolving into a white page.
 */

/** From the app's own SVG master, in its 1024 canvas. */
const CARD = { x: 96.26, size: 831.49, r: 186 }
const BLOCKS = [
  { x: 241.77, y: 241.77, w: 237.81, h: 540.47, fill: '#55677A' }, // slate, the column
  { x: 520.11, y: 241.77, w: 262.13, h: 249.97, fill: '#B4534A' }, // dusty red
  { x: 520.11, y: 532.27, w: 262.13, h: 249.97, fill: '#C08A2E' }, // amber
]
const BLOCK_R = 29.73

export function BlockpadMark({
  size = 64,
  title,
  className,
}: {
  size?: number
  /** Give it a label to expose it as an image; leave off when decorative. */
  title?: string
  className?: string
}) {
  const shadow = size >= 64
  const hairline = size >= 128
  const id = `blockpad-shadow-${Math.round(size)}`

  return (
    <svg
      viewBox="0 0 1024 1024"
      width={size}
      height={size}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
    >
      {shadow && (
        <defs>
          <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="18" floodColor="#000000" floodOpacity="0.22" />
          </filter>
        </defs>
      )}

      <rect
        x={CARD.x}
        y={CARD.x}
        width={CARD.size}
        height={CARD.size}
        rx={CARD.r}
        ry={CARD.r}
        fill="#FFFFFF"
        filter={shadow ? `url(#${id})` : undefined}
      />
      {hairline && (
        <rect
          x={CARD.x}
          y={CARD.x}
          width={CARD.size}
          height={CARD.size}
          rx={CARD.r}
          ry={CARD.r}
          fill="none"
          stroke="#000000"
          strokeOpacity="0.07"
          strokeWidth="4"
        />
      )}

      {BLOCKS.map((b) => (
        <rect
          key={b.fill}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx={BLOCK_R}
          ry={BLOCK_R}
          fill={b.fill}
        />
      ))}
    </svg>
  )
}
