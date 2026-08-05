/**
 * The pixel engine's shape vocabulary — the knockouts the marks are built from.
 *
 * Pure functions over normalized -1..1 space, no React and no DOM, so both the
 * canvas engine (`aka-mark.tsx`, client, animating) and the server-rendered
 * card fields (`pixel-field.tsx`, RSC, static) draw from exactly the same
 * geometry. A shape added here shows up in both.
 */

export const hash = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

/** Distance-to-segment stroke: true inside a capsule around A→B. */
export function seg(
  x: number, y: number,
  ax: number, ay: number, bx: number, by: number,
  w: number,
) {
  const dx = bx - ax
  const dy = by - ay
  const t = clamp01(((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy))
  const px = ax + t * dx
  const py = ay + t * dy
  return (x - px) ** 2 + (y - py) ** 2 < w * w
}

export function diamond(x: number, y: number, cx: number, cy: number, s: number) {
  return Math.abs(x - cx) + Math.abs(y - cy) < s
}

function disc(x: number, y: number, cx: number, cy: number, r: number) {
  return (x - cx) ** 2 + (y - cy) ** 2 < r * r
}

function ring(x: number, y: number, cx: number, cy: number, r: number, w: number) {
  const d = Math.hypot(x - cx, y - cy)
  return d < r + w && d > r - w
}

function box(x: number, y: number, x0: number, y0: number, x1: number, y1: number) {
  return x >= x0 && x <= x1 && y >= y0 && y <= y1
}

/* ---- the six hero disciplines ----------------------------------------- */

/** Gen-AI sparkles — a large diamond and a small companion. */
export function inSpark(x: number, y: number) {
  return diamond(x, y, -0.1, 0.12, 0.52) || diamond(x, y, 0.48, -0.44, 0.24)
}

/** Code — angle brackets with a leaning slash. */
export function inCode(x: number, y: number) {
  const w = 0.1
  return (
    seg(x, y, -0.18, -0.42, -0.56, 0, w) ||
    seg(x, y, -0.56, 0, -0.18, 0.42, w) ||
    seg(x, y, 0.18, -0.42, 0.56, 0, w) ||
    seg(x, y, 0.56, 0, 0.18, 0.42, w) ||
    seg(x, y, 0.1, -0.5, -0.1, 0.5, w * 0.85)
  )
}

/** Music — an eighth note: head, stem, flag. */
export function inNote(x: number, y: number) {
  const hx = x + 0.2
  const hy = y - 0.34
  if (hx * hx + hy * hy < 0.19 * 0.19) return true
  if (x >= -0.08 && x <= 0.04 && y >= -0.5 && y <= 0.36) return true
  return seg(x, y, -0.02, -0.5, 0.34, -0.26, 0.1)
}

/** Procedural 3D — an isometric cube wireframe. */
export function inCube(x: number, y: number) {
  const w = 0.09
  const T: [number, number] = [0, -0.52]
  const R: [number, number] = [0.46, -0.26]
  const Rb: [number, number] = [0.46, 0.26]
  const B: [number, number] = [0, 0.52]
  const Lb: [number, number] = [-0.46, 0.26]
  const L: [number, number] = [-0.46, -0.26]
  const C: [number, number] = [0, 0]
  const edges: [readonly [number, number], readonly [number, number]][] = [
    [T, R], [R, Rb], [Rb, B], [B, Lb], [Lb, L], [L, T],
    [C, L], [C, R], [C, B],
  ]
  return edges.some(([p, q]) => seg(x, y, p[0], p[1], q[0], q[1], w))
}

/** Agent tooling — a terminal prompt: chevron and cursor line. */
export function inTerminal(x: number, y: number) {
  const w = 0.1
  return (
    seg(x, y, -0.48, -0.32, -0.12, 0, w) ||
    seg(x, y, -0.12, 0, -0.48, 0.32, w) ||
    seg(x, y, 0.08, 0.3, 0.46, 0.3, w)
  )
}

/** Design — a pen stroke: nib tip and a drawn diagonal. */
export function inPen(x: number, y: number) {
  return (
    diamond(x, y, -0.36, 0.36, 0.16) ||
    seg(x, y, -0.3, 0.3, 0.34, -0.34, 0.12) ||
    diamond(x, y, 0.42, -0.42, 0.1)
  )
}

/* ---- subjects for the project fields ----------------------------------- */

/** A head in the ring — the studio's own construction. */
export function inRing(x: number, y: number) {
  return ring(x, y, 0, 0, 0.46, 0.1) || disc(x, y, -0.17, -0.13, 0.09) || disc(x, y, 0.17, -0.13, 0.09)
}

/** A logging grid — five weeks of cells, gaps and all. */
export function inGrid(x: number, y: number) {
  const c = 0.19
  const i = Math.floor((x + 0.5) / c)
  const j = Math.floor((y + 0.5) / c)
  if (i < 0 || i > 4 || j < 0 || j > 4) return false
  if (hash(i * 7 + j * 13) < 0.22) return false // the record has gaps
  const fx = ((x + 0.5) % c) / c
  const fy = ((y + 0.5) % c) / c
  return fx > 0.12 && fx < 0.88 && fy > 0.12 && fy < 0.88
}

/** A box, drawn — the collective's mark reduced to its noun. */
export function inBox(x: number, y: number) {
  const w = 0.11
  return (
    seg(x, y, -0.46, -0.46, 0.46, -0.46, w) ||
    seg(x, y, 0.46, -0.46, 0.46, 0.46, w) ||
    seg(x, y, 0.46, 0.46, -0.46, 0.46, w) ||
    seg(x, y, -0.46, 0.46, -0.46, -0.46, w)
  )
}

/** A waveform — five bars, the centre one loudest. */
export function inWave(x: number, y: number) {
  const bars = [0.18, 0.38, 0.58, 0.34, 0.14]
  const i = Math.round((x + 0.44) / 0.22)
  if (i < 0 || i > 4) return false
  const cx = -0.44 + i * 0.22
  return Math.abs(x - cx) < 0.07 && Math.abs(y) < bars[i]!
}

/** Layers collapsing into one — four bars, the lowest widest. */
export function inLayers(x: number, y: number) {
  const rows = [
    [-0.42, 0.42, -0.42],
    [-0.32, 0.32, -0.16],
    [-0.2, 0.2, 0.1],
    [-0.08, 0.08, 0.36],
  ]
  return rows.some(([x0, x1, cy]) => box(x, y, x0!, cy! - 0.07, x1!, cy! + 0.07))
}

/** Approval — a check, drawn as two strokes. */
export function inCheck(x: number, y: number) {
  return seg(x, y, -0.42, 0.04, -0.12, 0.34, 0.12) || seg(x, y, -0.12, 0.34, 0.44, -0.36, 0.12)
}

/** Scores — four bars of differing height on a baseline. */
export function inBars(x: number, y: number) {
  const h = [0.16, 0.44, 0.28, 0.5]
  const i = Math.round((x + 0.33) / 0.22)
  if (i >= 0 && i <= 3) {
    const cx = -0.33 + i * 0.22
    if (Math.abs(x - cx) < 0.08 && y < 0.42 && y > 0.42 - h[i]! * 1.6) return true
  }
  return box(x, y, -0.48, 0.42, 0.48, 0.5)
}

/** A drop — the trickle. */
export function inDrop(x: number, y: number) {
  return disc(x, y, 0, 0.16, 0.3) || diamond(x, y, 0, -0.26, 0.3)
}

/** A speech bubble with a tail. */
export function inBubble(x: number, y: number) {
  const w = 0.1
  return (
    (ring(x, y, 0, -0.06, 0.42, w) && y < 0.3) ||
    seg(x, y, -0.3, 0.3, -0.34, 0.52, w) ||
    seg(x, y, -0.34, 0.52, -0.08, 0.32, w)
  )
}

/** A slashed zero — nothing, on purpose. */
export function inZero(x: number, y: number) {
  return ring(x, y, 0, 0, 0.36, 0.11) || seg(x, y, 0.22, -0.34, -0.22, 0.34, 0.09)
}

/** Five letter tiles in a row. */
export function inTiles(x: number, y: number) {
  const i = Math.round((x + 0.4) / 0.2)
  if (i < 0 || i > 4) return false
  const cx = -0.4 + i * 0.2
  const inCell = Math.abs(x - cx) < 0.085 && Math.abs(y) < 0.16
  const inner = Math.abs(x - cx) < 0.05 && Math.abs(y) < 0.1
  return inCell && !(inner && i % 2 === 1)
}

/** A lens with a handle — looking for something. */
export function inLens(x: number, y: number) {
  return ring(x, y, -0.1, -0.1, 0.32, 0.1) || seg(x, y, 0.12, 0.12, 0.44, 0.44, 0.11)
}

/** Named lookup — the card layer picks a subject by name. */
export const SHAPES = {
  spark: inSpark,
  code: inCode,
  note: inNote,
  cube: inCube,
  terminal: inTerminal,
  pen: inPen,
  ring: inRing,
  grid: inGrid,
  box: inBox,
  wave: inWave,
  layers: inLayers,
  check: inCheck,
  bars: inBars,
  drop: inDrop,
  bubble: inBubble,
  zero: inZero,
  tiles: inTiles,
  lens: inLens,
} as const

export type ShapeName = keyof typeof SHAPES

/** The cycle the hero dissolves through: AI → code → music → 3D → agents → design. */
export const DISCIPLINES = [inSpark, inCode, inNote, inCube, inTerminal, inPen]
