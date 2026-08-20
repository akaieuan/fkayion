/**
 * The akaCOVART mark, drawn rather than photographed.
 *
 * akaCOVART is a generative album-art engine: a cover is a few colour fields,
 * a blur, and a grain, reproducible from a seed and a handful of parameters.
 * Its logo should be the same thing rather than a picture of one, so this is an
 * SVG that runs that idea at whatever size it is asked for. Nothing here is
 * random: the lobes are placed, so every render is identical.
 *
 * It replaces a 256px raster that had to be blown up past four times its size
 * on the landing plate. A blurred, grainy image is the worst possible thing to
 * upscale or to compress, which is why it looked soft and mushy at once. This
 * is resolution-independent and about a kilobyte.
 *
 * Composition is doing a specific job. A blur field with even weight turns into
 * a grey smudge the moment it is small, so the lobes are graded: one dominant
 * teal near the middle, cooler mass falling to the lower right, small warm
 * accents at the edges, and a vignette pulling value off the corners. That
 * keeps a legible centre of gravity at 26px on a card and still opens up into a
 * full field at 300px on a plate.
 */

/** Its own accent first, then the cooler and warmer notes around it. */
const LOBES: { cx: number; cy: number; rx: number; ry: number; fill: string; o: number }[] = [
  { cx: 44, cy: 42, rx: 32, ry: 30, fill: '#4FC0A6', o: 0.92 }, // teal, the anchor
  { cx: 66, cy: 63, rx: 30, ry: 27, fill: '#4A86D8', o: 0.78 }, // blue mass
  { cx: 74, cy: 26, rx: 19, ry: 17, fill: '#8E74D8', o: 0.62 }, // violet, upper right
  { cx: 26, cy: 72, rx: 21, ry: 19, fill: '#DE8FA8', o: 0.55 }, // rose, lower left
  { cx: 22, cy: 22, rx: 14, ry: 13, fill: '#E8BE72', o: 0.44 }, // amber spark
  { cx: 56, cy: 88, rx: 17, ry: 12, fill: '#6FD8C4', o: 0.38 }, // teal echo at the base
]

export function CovartMark({
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
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        {/* The filter region has to be grown by hand: the default clips at
            110%, which would cut the blur off square at the edges. */}
        <filter id="covart-blur" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="11" />
        </filter>

        <filter id="covart-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="11" />
          <feColorMatrix type="saturate" values="0" />
        </filter>

        <radialGradient id="covart-vignette" cx="48%" cy="44%" r="68%">
          <stop offset="45%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.72" />
        </radialGradient>

        <clipPath id="covart-clip">
          <rect width="100" height="100" />
        </clipPath>
      </defs>

      <g clipPath="url(#covart-clip)">
        <rect width="100" height="100" fill="#0B0B0C" />

        <g filter="url(#covart-blur)">
          {LOBES.map((l) => (
            <ellipse
              key={`${l.cx}-${l.cy}`}
              cx={l.cx}
              cy={l.cy}
              rx={l.rx}
              ry={l.ry}
              fill={l.fill}
              fillOpacity={l.o}
            />
          ))}
        </g>

        {/* Grain last, and gently: the engine's covers are grained, but at card
            size a heavy one turns into moiré rather than texture. */}
        <rect
          width="100"
          height="100"
          filter="url(#covart-grain)"
          opacity="0.16"
          style={{ mixBlendMode: 'overlay' }}
        />
        <rect width="100" height="100" fill="url(#covart-vignette)" />
      </g>
    </svg>
  )
}
