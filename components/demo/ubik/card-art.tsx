/**
 * The painted grounds from the Ubik marketing site, rebuilt as drawings.
 *
 * The originals were six oil-painted landscapes, one behind each section of the
 * old site — misty ridges in olive, a violet dusk, a sage flat. They shipped as
 * 2240×1260 bitmaps, about 5 MB for the set, and they were soft at that size on
 * a retina screen and unusable at card size because a downscaled painting turns
 * to mud.
 *
 * So they are drawn instead. Each is a vertical wash, four or five ridge
 * silhouettes stacked back to front, and a grain overlay — which is what those
 * paintings are, structurally. The palettes are sampled from the originals
 * rather than invented, so a card still reads as the same picture it always
 * was.
 *
 * What that buys, beyond the bytes: it is resolution-independent, so the same
 * art is correct at 320px on a phone and 1200px on a plate; it costs about a
 * kilobyte of markup instead of 800 KB of bitmap; and it is a server component,
 * so none of it reaches the browser as JavaScript.
 *
 * The ridges are deterministic. Profiles are hand-authored as height samples
 * and smoothed through a Catmull-Rom pass at module load, so a card looks the
 * same on every render and there is no seeded randomness to keep in sync
 * between server and client.
 */

const W = 1200
const H = 750

/** Palettes sampled from the original paintings, back to front. */
const PALETTES = {
  /** working-with-files-folders-workspaces — pale sage and stone. */
  stone: ['#b3b59f', '#abb09b', '#98a595', '#7f8c79', '#737d62'],
  /** using-the-ubik-context-engine — dark forest, warm earth at the front. */
  forest: ['#4c5a54', '#47422f', '#35372a', '#293028', '#23271f'],
  /** search-save-analyze — sage grey, the flattest of the set. */
  sage: ['#a0aaa0', '#9aa59c', '#8ea09a', '#8a9c97', '#7c9390'],
  /** craft-well-cited-text — deep greens. */
  pine: ['#5b7954', '#4b6942', '#405d37', '#37532f', '#2e4825'],
  /** human-in-the-loop — olive and khaki, the misty one. */
  olive: ['#c9bd8b', '#ada575', '#837a4b', '#675b30', '#504721'],
  /** model-control — the violet dusk. */
  violet: ['#a188de', '#9c84d8', '#957dd1', '#8e74ca', '#8b71c7'],
  /**
   * hopper — the seventh. The extension came after the marketing site, so it
   * never had a painting; this is the context-engine's warm earth pulled
   * forward into a rust, which is the one direction the set does not already
   * cover.
   */
  rust: ['#9a8467', '#8a6a4a', '#6f5238', '#4f3d2c', '#332821'],
} as const

export type CardArt = keyof typeof PALETTES

/**
 * Ridge profiles as height samples across the width, 0 = top, 1 = bottom.
 *
 * Spread through the whole frame rather than stacked along the bottom. The
 * first attempt put every ridge in the lower third and left two-thirds of flat
 * gradient above it, which reads as a graphic of a mountain; the paintings are
 * atmospheric, layer behind layer receding into haze, and that only happens if
 * the layers overlap all the way up.
 *
 * The amplitudes are deliberately uneven. Equal ones came out as a sine wave,
 * which is the tell that nobody drew it.
 */
const PROFILES = [
  [0.2, 0.09, 0.26, 0.14, 0.3, 0.11, 0.22, 0.32, 0.16, 0.24],
  [0.4, 0.52, 0.33, 0.46, 0.3, 0.5, 0.38, 0.28, 0.47, 0.36],
  [0.58, 0.5, 0.66, 0.54, 0.71, 0.6, 0.52, 0.68, 0.56, 0.62],
  [0.78, 0.86, 0.72, 0.82, 0.68, 0.8, 0.88, 0.74, 0.84, 0.76],
  [0.93, 0.88, 0.97, 0.9, 0.99, 0.92, 0.95, 0.89, 0.96, 0.94],
]

/**
 * How far each variant rotates the sample arrays.
 *
 * Without it all seven cards were the same horizon in seven colourways, which
 * is worse than one painting used seven times because it looks like an
 * accident. Rotating the samples gives each card its own skyline out of the
 * same five profiles, and costs nothing at render.
 */
const PHASE: Record<string, number> = {
  stone: 0,
  forest: 3,
  sage: 6,
  pine: 1,
  olive: 4,
  violet: 7,
  rust: 2,
}

function rotate(samples: readonly number[], by: number) {
  const n = samples.length
  return samples.map((_, i) => samples[(i + by) % n])
}

/**
 * Catmull-Rom through the samples, emitted as cubic beziers and closed to the
 * bottom edge. Smooth like a brushed horizon rather than a polyline.
 */
function ridge(samples: readonly number[]) {
  const n = samples.length
  const step = W / (n - 1)
  const y = (i: number) => +(H * samples[Math.max(0, Math.min(n - 1, i))]).toFixed(1)
  const x = (i: number) => +(i * step).toFixed(1)

  let d = `M0,${y(0)}`
  for (let i = 0; i < n - 1; i++) {
    const c1x = +(x(i) + step / 3).toFixed(1)
    const c1y = +(y(i) + (y(i + 1) - y(i - 1)) / 6).toFixed(1)
    const c2x = +(x(i + 1) - step / 3).toFixed(1)
    const c2y = +(y(i + 1) - (y(i + 2) - y(i)) / 6).toFixed(1)
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${x(i + 1)},${y(i + 1)}`
  }
  return `${d} L${W},${H + 40} L0,${H + 40} Z`
}

export function UbikCardArt({ art, className }: { art: CardArt; className?: string }) {
  const palette = PALETTES[art]
  const phase = PHASE[art] ?? 0
  const ridges = PROFILES.map((p) => ridge(rotate(p, phase)))

  // Namespaced per variant so two cards on one page cannot share a filter id.
  const grain = `ubik-grain-${art}`
  const sky = `ubik-sky-${art}`

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette[0]} />
          <stop offset="45%" stopColor={palette[1]} />
          <stop offset="100%" stopColor={palette[3]} />
        </linearGradient>
        {/*
          The canvas tooth. Fractal noise at a high base frequency, held at a
          low opacity: enough to stop the gradients banding across a wide plate
          and to read as paint rather than as a CSS gradient, without becoming a
          texture in its own right.
        */}
        <filter id={grain} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <rect width={W} height={H} fill={`url(#${sky})`} />

      {/*
        Low opacities, and the far layers lowest. Haze is the whole subject of
        these paintings: at full strength the same five paths are a paper cutout.
      */}
      {ridges.map((d, i) => (
        <path
          key={i}
          d={d}
          fill={palette[Math.min(i, palette.length - 1)]}
          opacity={0.34 + i * 0.14}
        />
      ))}

      <rect width={W} height={H} filter={`url(#${grain})`} opacity="0.16" />
    </svg>
  )
}
