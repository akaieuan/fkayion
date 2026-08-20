/**
 * The prototype's art layer: every mark, icon, badge, sprite and body figure is
 * drawn from a character grid at render time. There is not one image file in
 * the whole thing, which is why it scales from a 14px tab icon to a 176px
 * sprite without an asset pipeline.
 *
 * None of this is a client component. The grids are pure functions of their
 * props, so React renders them on the server and the browser only ever gets the
 * resulting SVG.
 */
import type { CSSProperties, ReactElement } from 'react'
import {
  ACCCS,
  ACCS,
  CH_FACES,
  DISCS,
  EXPRS,
  HAIRCS,
  HAIRS,
  OUTFITCS,
  OUTFITS,
  PERSON_ACCS,
  SKINS,
  SPR_BASE,
  rnd,
} from './data'

export type Theme = 'dark' | 'light'

/** The prototype's ink: near-white on the dark ground, near-black on paper. */
export function inkOf(theme: Theme): string {
  return theme === 'dark' ? '#ededea' : '#1a1a18'
}

/**
 * The one primitive everything else is built on: a character grid plus a
 * palette that maps each character to a fill. Characters with no entry in the
 * palette are holes, not blanks — nothing is drawn there at all.
 *
 * Cells are 1.02 wide so neighbours overlap by a hair. Without it the browser
 * leaves seams between rects at fractional scales.
 */
export function Px({
  rows,
  pal,
  scale,
}: {
  rows: readonly string[]
  pal: Record<string, string | undefined>
  scale: number
}) {
  const w = rows[0].length
  const h = rows.length
  const cells: ReactElement[] = []
  rows.forEach((row, j) =>
    [...row].forEach((c, i) => {
      const fill = pal[c]
      if (!fill) return
      cells.push(<rect key={`${i}_${j}`} x={i} y={j} width={1.02} height={1.02} fill={fill} />)
    })
  )
  return (
    <svg
      width={w * scale}
      height={h * scale}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      style={{ display: 'block' }}
      aria-hidden
    >
      {cells}
    </svg>
  )
}

/** A single-colour glyph, with 'a' reserved for the one accented cell. */
export function Glyph({
  rows,
  scale,
  color,
}: {
  rows: readonly string[]
  scale: number
  color?: string
}) {
  return <Px rows={rows} pal={{ '#': color ?? 'currentColor', a: '#ebbb63' }} scale={scale} />
}

/**
 * The dermp mark, generated rather than stored: a cross whose lower-right
 * diagonal is a pencil, resolved at whatever grid size the display size can
 * carry. Small sizes drop to a 14-cell grid so the pencil stays legible.
 */
function markRows(N: number): string[] {
  const rows: string[] = []
  const lo = Math.round(N * 0.13)
  const hi = N - 1 - lo
  const a = Math.round(N * 0.375)
  const b = N - 1 - a
  for (let j = 0; j < N; j++) {
    let s = ''
    for (let i = 0; i < N; i++) {
      const cross = (i >= a && i <= b && j >= lo && j <= hi) || (j >= a && j <= b && i >= lo && i <= hi)
      const d = i + j
      const onP = d >= N - 2 && d <= N && i >= 1 && i <= N - 2 && j >= 1 && j <= N - 2
      s += onP
        ? i <= Math.round(N * 0.2)
          ? 'T'
          : i >= N - 1 - Math.round(N * 0.2)
            ? 'E'
            : 'P'
        : cross
          ? 'C'
          : '.'
    }
    rows.push(s)
  }
  return rows
}

export function Mark({ size, theme }: { size: number; theme: Theme }) {
  const N = size <= 22 ? 14 : 20
  return (
    <Px
      rows={markRows(N)}
      pal={{
        C: inkOf(theme),
        P: '#ebbb63',
        T: theme === 'dark' ? '#8f8b84' : '#55524c',
        E: '#e88fae',
      }}
      scale={size / N}
    />
  )
}

/* ---------- the sprite ---------- */

export type SpriteState = {
  form: 'circlehead' | 'badge' | 'person'
  disc: number
  chExpr: number
  acc: string[]
  accC: number
  skin: number
  hair: number
  hairC: number
  expr: number
  outfit: number
  outfitC: number
  scene: number
  name: string
}

type Built = { grid: string[][]; N: number; accent: string | null }

/**
 * A circlehead (or badge): a filled disc with the face knocked out of it.
 *
 * `inFig` is the bust silhouette — a head circle union a shoulder ellipse — and
 * in circlehead mode those cells are removed from the disc rather than filled,
 * so the figure reads as negative space.
 */
function headGrid(s: SpriteState): Built {
  const N = s.form === 'badge' ? 16 : 22
  const grid: string[][] = []
  for (let j = 0; j < N; j++) grid.push(new Array<string>(N).fill('.'))

  const inFig = (x: number, y: number) => {
    const hy = y + 0.42
    if (x * x + hy * hy < 0.42 * 0.42) return true
    const tx = x / 0.62
    const ty = (y - 0.52) / 0.32
    return tx * tx + ty * ty < 1
  }
  const neg = s.form === 'circlehead'

  for (let j = 0; j < N; j++)
    for (let i = 0; i < N; i++) {
      const nx = ((i + 0.5) / N) * 2 - 1
      const ny = ((j + 0.5) / N) * 2 - 1
      if (Math.sqrt(nx * nx + ny * ny) >= 0.98) continue
      grid[j][i] = neg && inFig(nx / 0.82, ny / 0.82) ? '.' : 'D'
    }

  const f = CH_FACES[s.chExpr % CH_FACES.length]
  const ox = Math.round((N - 9) / 2)
  const oy = neg ? Math.round(((-0.328 + 1) / 2) * N - 4) : Math.round((N - 8) / 2)
  f.px.forEach((row, r) =>
    [...row].forEach((c, i) => {
      if (c !== '#') return
      const y = oy + r
      const x = ox + i
      if (y < 0 || y >= N || x < 0 || x >= N) return
      grid[y][x] = neg ? (r <= 1 && f.a ? 'F' : 'D') : '.'
    })
  )
  return { grid, N, accent: f.a }
}

/** The person bust: a skin base with hair, features and a garment stacked on. */
function personGrid(s: SpriteState): Built {
  const N = 16
  const grid = SPR_BASE.slice(0, N).map((row) => row.split(''))
  const put = (j: number, str: string) => {
    if (j < 0 || j >= N) return
    ;[...str].forEach((c, i) => {
      if (c !== '.') grid[j][i] = c
    })
  }
  HAIRS[s.hair].r.forEach(([j, str]) => put(j, str))
  put(6, EXPRS[s.expr].e)
  put(8, EXPRS[s.expr].m)
  OUTFITS[s.outfit].r.forEach(([j, str]) => put(j, str))
  return { grid, N, accent: null }
}

export function Sprite({
  size,
  sprite,
  theme,
  over,
}: {
  size: number
  sprite: SpriteState
  theme: Theme
  over?: Partial<SpriteState>
}) {
  const s: SpriteState = { ...sprite, ...over }
  const built = s.form === 'person' ? personGrid(s) : headGrid(s)
  const { grid, N } = built
  // Accessories were drawn against the 22-cell head, so smaller grids scale
  // their rect runs down rather than getting their own tables.
  const k = N / 22

  for (const id of s.acc ?? []) {
    if (s.form === 'person') {
      const m = PERSON_ACCS[id]
      if (!m) continue
      m.forEach(([j, str]) =>
        [...str].forEach((c, i) => {
          if (c === 'A' && j >= 0 && j < N) grid[j][i] = 'A'
        })
      )
      continue
    }
    const a = ACCS.find((x) => x.id === id)
    if (!a) continue
    a.r.forEach(([x0, x1, y0, y1]) => {
      for (let y = Math.round(y0 * k); y <= Math.round(y1 * k); y++)
        for (let x = Math.round(x0 * k); x <= Math.round(x1 * k); x++)
          if (y >= 0 && y < N && x >= 0 && x < N) grid[y][x] = 'A'
    })
  }

  const ink = inkOf(theme)
  const pal: Record<string, string | undefined> = {
    S: SKINS[s.skin],
    H: HAIRCS[s.hairC],
    E: '#221e1a',
    O: OUTFITCS[s.outfitC],
    A: ACCCS[s.accC],
    D: DISCS[s.disc] ?? ink,
    F: built.accent ?? DISCS[s.disc] ?? ink,
  }

  const rects: ReactElement[] = []
  for (let j = 0; j < N; j++)
    for (let i = 0; i < N; i++) {
      const fill = pal[grid[j][i]]
      if (!fill) continue
      // Inset by .08 on each side: the gap is what makes it read as pixels
      // rather than as a flat shape.
      rects.push(<rect key={`${i}_${j}`} x={i + 0.08} y={j + 0.08} width={0.84} height={0.84} fill={fill} />)
    }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${N} ${N}`}
      shapeRendering="crispEdges"
      style={{ display: 'block', borderRadius: Math.round(size * 0.12) }}
      aria-hidden
    >
      {rects}
    </svg>
  )
}

/* ---------- photo stand-ins ---------- */

/**
 * A photograph the prototype does not have: an 8x8 noise field in the project's
 * hue, encoded as a data URI so it can be a background-image anywhere a real
 * photo would go. Deterministic in `seed`, so a given thumbnail is always the
 * same thumbnail.
 */
export function mosaic(seed: number, hue: number): string {
  const n = 8
  let r = ''
  for (let j = 0; j < n; j++)
    for (let i = 0; i < n; i++) {
      const v = rnd(seed * 7.3 + i * 13.1 + j * 29.7)
      const l = 44 + v * 26
      const sa = 16 + rnd(seed + i * 3 + j * 5) * 16
      r += `<rect x='${i}' y='${j}' width='1' height='1' fill='hsl(${hue - 200} ${sa.toFixed(0)}% ${l.toFixed(0)}%)'/>`
    }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' preserveAspectRatio='none'>${r}</svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

export function tileStyle(seed: number, hue: number, extra?: CSSProperties): CSSProperties {
  return {
    backgroundImage: mosaic(seed, hue),
    backgroundSize: 'cover',
    imageRendering: 'pixelated',
    border: '1px solid var(--rule-soft)',
    ...extra,
  }
}

/* ---------- body figure ---------- */

export type Body = { sex: 'fem' | 'masc'; side: 'front' | 'back'; h: number; w: number }

/**
 * The silhouette the hotspots are pinned to.
 *
 * Height and weight only change the drawing's proportions so a pin lands where
 * the person actually means. It is never shown back as a health number: `k` is
 * clamped hard at both ends so no body shape can render as a caricature.
 */
export function BodyFigure({ body, theme }: { body: Body; theme: Theme }) {
  const bmi = body.w / Math.pow(body.h / 100, 2)
  const k = Math.max(0.74, Math.min(1.5, 0.78 + (bmi - 17) / 26))
  const masc = body.sex === 'masc'
  const sh = (masc ? 21 : 18) * k
  const wa = (masc ? 14.5 : 13) * k
  const hp = (masc ? 16.5 : 19.5) * k
  const c = theme === 'dark' ? 'rgba(237,237,234,.13)' : 'rgba(20,20,19,.10)'
  const ln = theme === 'dark' ? 'rgba(237,237,234,.22)' : 'rgba(20,20,19,.18)'

  return (
    <svg
      viewBox="0 0 100 220"
      width="100%"
      height="100%"
      style={{ display: 'block', position: 'absolute', inset: 0 }}
      aria-hidden
    >
      <circle cx={50} cy={20} r={11.5 * Math.min(1.12, k)} fill={c} stroke={ln} strokeWidth={0.7} />
      <rect x={46} y={29} width={8} height={8} fill={c} />
      <path
        d={`M${50 - sh} 40 L${50 - wa} 88 L${50 - hp} 116 L${50 + hp} 116 L${50 + wa} 88 L${50 + sh} 40 Z`}
        fill={c}
        stroke={ln}
        strokeWidth={0.7}
        strokeLinejoin="round"
      />
      {[-1, 1].map((s) => (
        <g key={s}>
          <line x1={50 + s * (sh - 2)} y1={44} x2={50 + s * (hp + 6)} y2={112} stroke={c} strokeWidth={8 * k} strokeLinecap="round" />
          <line x1={50 + s * hp * 0.5} y1={114} x2={50 + s * hp * 0.62} y2={206} stroke={c} strokeWidth={12 * k} strokeLinecap="round" />
        </g>
      ))}
    </svg>
  )
}
