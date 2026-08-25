/**
 * The Blockpad mark, drawn rather than shipped as a bitmap.
 *
 * Blockpad generates its own icon in Core Graphics from the app's palette and
 * emits an SVG from the same ratios, so vector and raster cannot drift. Those
 * ratios are transcribed here from the app's two masters: a rounded card on
 * Apple's icon geometry, 22.37% corner radius, holding an isometric stack of
 * three faces with three short rules radiating from where they meet. It is a
 * blockout of a layout seen in three dimensions, which is close to literally
 * what the app does.
 *
 * Vector because it has to survive being an 18px specimen and a 300px plate on
 * the same page, and because a 1024px PNG resampled to 18px turns the three
 * hairline rules into grey fog.
 *
 * The app ships a dark master and a light one. Rather than pick at render time
 * — which would mean reading the theme, which would mean a client component for
 * a static drawing — the two palettes are CSS custom properties (see
 * `.aka-blockpad` in globals.css) and the browser picks. The orange face is the
 * one colour that is the same in both.
 */

/**
 * From the app's own SVG masters, in their 1024 canvas.
 *
 * The masters pad the card with a 9.4% margin inside that canvas. Kept as-is,
 * the mark rendered about four fifths the size of every other logo on a project
 * plate, all of which fill their frame edge to edge. So the viewBox is cropped
 * to the card and the geometry is left alone: same drawing, no margin.
 */
const CARD = { inset: 96.26, size: 831.49, r: 186 }
const VIEW_BOX = `${CARD.inset} ${CARD.inset} ${CARD.size} ${CARD.size}`

/** The edge is centred on the card's boundary, so half of it would clip. */
const EDGE_WIDTH = 4

/** Three short rules from the centre, where the three faces meet. */
const RULES = [
  { x2: 512.0, y2: 420.7 },
  { x2: 591.07, y2: 557.65 },
  { x2: 432.93, y2: 557.65 },
]

const FACE_RIGHT = '767.56,410.10 767.56,659.55 551.53,784.27 551.53,534.82'
const FACE_LEFT = '256.44,410.10 472.47,534.82 472.47,784.27 256.44,659.55'
const FACE_TOP = '512.00,216.90 728.03,341.63 512.00,466.35 295.97,341.63'

/**
 * One id, shared by every instance on the page.
 *
 * The gradient is identical everywhere — both its stops are custom properties,
 * so a single definition already themes itself — and `url(#…)` resolves to the
 * first match in document order. Generating a unique id per instance would mean
 * `useId`, which would mean making a static drawing a client component.
 */
const CARD_GRADIENT = 'aka-blockpad-card'

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
  return (
    <svg
      viewBox={VIEW_BOX}
      width={size}
      height={size}
      className={className ? `aka-blockpad ${className}` : 'aka-blockpad'}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={CARD_GRADIENT} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--bp-card-top)" />
          <stop offset="1" stopColor="var(--bp-card-bottom)" />
        </linearGradient>
      </defs>

      <rect
        x={CARD.inset}
        y={CARD.inset}
        width={CARD.size}
        height={CARD.size}
        rx={CARD.r}
        ry={CARD.r}
        fill={`url(#${CARD_GRADIENT})`}
      />
      {/*
       * The card is near-black in the dark theme and near-white in the light
       * one, so on a plate it is within a step of the ground it sits on either
       * way. The rule is what keeps the silhouette; it is not in the app's own
       * masters, which only ever draw the icon against a desktop.
       */}
      <rect
        x={CARD.inset + EDGE_WIDTH / 2}
        y={CARD.inset + EDGE_WIDTH / 2}
        width={CARD.size - EDGE_WIDTH}
        height={CARD.size - EDGE_WIDTH}
        rx={CARD.r - EDGE_WIDTH / 2}
        ry={CARD.r - EDGE_WIDTH / 2}
        fill="none"
        stroke="var(--bp-edge)"
        strokeWidth={EDGE_WIDTH}
      />

      <g stroke="var(--bp-rule)" strokeOpacity="var(--bp-rule-opacity)" strokeWidth={14.97} strokeLinecap="round">
        {RULES.map((r) => (
          <line key={r.x2} x1={512} y1={512} x2={r.x2} y2={r.y2} />
        ))}
      </g>

      <polygon points={FACE_RIGHT} fill="var(--bp-face-right)" />
      <polygon points={FACE_LEFT} fill="var(--bp-face-left)" />
      <polygon points={FACE_TOP} fill="#F97316" />
    </svg>
  )
}
