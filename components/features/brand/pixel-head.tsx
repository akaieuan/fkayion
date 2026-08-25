"use client"

import { useEffect, useRef } from "react"

/**
 * The circleheads mark: a pixel disc with the head knocked out, dissolving
 * and reforming on a loop ("glitch decay"). Ported from the design handoff
 * (circleheads-pixelated-logo/project/pixelhead.js) — the cell geometry,
 * timeline, and expression data are the design; keep them in sync with the
 * prototype if it revs.
 *
 * House behaviors added on top: the pixel color tracks --foreground across
 * theme switches, the loop pauses offscreen/hidden, and reduced-motion gets
 * a single assembled frame (neutral face when faces are on).
 */

type PixelHeadProps = {
  /** Canvas CSS px. */
  size: number
  /** Cells across. */
  grid?: number
  /** Dissolve style. */
  mode?: "ash" | "explode" | "scatter" | "glitch"
  /** figure = head + ring; negative = solid disc, head knocked out. */
  variant?: "figure" | "negative"
  /** Gap between pixels, as a fraction of a cell. */
  gap?: number
  /** Knockout shape: the brand head or a work-line icon. */
  icon?: PixelIcon
  /** Cycle expressions inside the head void during the assembled hold. */
  faces?: boolean
  /**
   * With `faces`: open on the first expression instead of assembling into it.
   *
   * The loop's own order is reform, hold, dissolve, and the face is only drawn
   * once the disc is whole, so by default a mark spends its first 1.7s as
   * scattered pixels and then the face appears at once. That reads as a loading
   * state where the mark is the first thing on a page. Starting the clock at
   * the top of the hold skips only that first assemble; every later loop still
   * dissolves and reforms.
   */
  startAssembled?: boolean
  /** Render one assembled frame and never animate (logo/chrome usage). */
  still?: boolean
  /** Assemble once when first visible, then hold — no dissolve loop. */
  once?: boolean
  /** With `once`: after settling, a quiet pixel twinkle (~3Hz, ~4% cells). */
  shimmer?: boolean
  /** Hold one expression from the hero cycle (persona marks). */
  face?: PersonaFace
  /** Hold a specific expression by index (demo/gallery use; see EXPRESSIONS). */
  faceIndex?: number
  /** Scale down with the container (canvas caps at `size`). */
  fluid?: boolean
  /** Override the pixel color (default: the theme foreground). */
  color?: string
  speed?: number
  className?: string
}

const hash = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}
const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
const easeInCubic = (t: number) => t * t * t
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/* ---- knockout shapes, in normalized -1..1 space ------------------------ */

/**
 * The circleheads figure: a big round head over a wide floating shoulder
 * capsule, both fully enclosed by the disc with clear space between and
 * around them. Nothing rises from the disc edge — that silhouette reads
 * as a generic avatar; two floating shapes read as an abstract pixel
 * person. Sized so the 9×8 face fills the head void (pair with grid 24).
 */
function inFigure(x: number, y: number) {
  const hx = x
  const hy = y + 0.42
  if (hx * hx + hy * hy < 0.42 * 0.42) return true
  const tx = x / 0.62
  const ty = (y - 0.52) / 0.32
  return tx * tx + ty * ty < 1
}

/**
 * The logo, hand-authored for small sizes (favicon, header): a solid
 * CIRCLE head with the neutral face knocked out — no body. Below
 * SMALL_MASK_MAX_GRID the "head" icon renders these exact pixels; larger
 * sizes (the hero) draw the figure-in-disc instead.
 * Keep in sync with the favicon generator (see app/icon.svg).
 */
const SMALL_MASK_MAX_GRID = 16
const SMALL_MASK = `
.....####.....
...########...
..##########..
.############.
.###.####.###.
##############
##############
##############
####......####
.############.
.############.
..##########..
...########...
.....####.....`
  .trim()
  .split("\n")
const SMALL_MASK_GRID = SMALL_MASK.length

/** One pixel diamond. */
function diamond(x: number, y: number, cx: number, cy: number, s: number) {
  return Math.abs(x - cx) + Math.abs(y - cy) < s
}

/** Gen-AI sparkles — Applied AI: a large diamond and a small companion. */
function inSpark(x: number, y: number) {
  return diamond(x, y, -0.1, 0.12, 0.52) || diamond(x, y, 0.48, -0.44, 0.24)
}

/** Speech bubble with a tail — Consulting. */
function inBubble(x: number, y: number) {
  const bx = x / 0.58
  const by = (y + 0.14) / 0.42
  if (bx ** 4 + by ** 4 < 1) return true
  if (y >= 0.24 && y <= 0.6) {
    const t = (y - 0.24) / 0.36
    if (x >= -0.34 + t * 0.12 && x <= -0.04 - t * 0.18) return true
  }
  return false
}

/**
 * Game controller — Games: wide body with a grip lobe at each end, and two
 * face-button dots left solid inside the void (d-pad and buttons).
 */
function inGamepad(x: number, y: number) {
  for (const cx of [-0.3, 0.3]) {
    const lx = x - cx
    const ly = y + 0.04
    if (lx * lx + ly * ly < 0.12 * 0.12) return false
  }
  const bx = x / 0.6
  const by = (y + 0.06) / 0.3
  if (bx * bx + by * by < 1) return true
  for (const gx of [-0.42, 0.42]) {
    const lx = x - gx
    const ly = y - 0.2
    if (lx * lx + ly * ly < 0.24 * 0.24) return true
  }
  return false
}


/** Cross + pencil — the BodyLog mark: a medical log, drawn not diagnosed. */
function inCrossPencil(x: number, y: number) {
  const arm = 0.17
  const cross = (Math.abs(x + 0.12) < arm && Math.abs(y) < 0.5) || (Math.abs(y) < arm && Math.abs(x + 0.12) < 0.5)
  const nib = Math.abs(x - 0.44) + Math.abs(y - 0.44) < 0.11
  const shaft = segHit(x, y, 0.18, -0.18, 0.4, 0.4, 0.1)
  return cross || nib || shaft
}

/** Eye in a bracket — Hologram: watching a pipeline, read-only. */
function inWatch(x: number, y: number) {
  const lid = Math.abs(y) < 0.34 - 0.5 * x * x && Math.abs(x) < 0.62
  const pupil = x * x + y * y < 0.14 * 0.14
  return lid && !pupil
}

/** Down-arrow into a tray — Collapse: many lessons into one skill. */
function inCollapseGlyph(x: number, y: number) {
  const stem = Math.abs(x) < 0.1 && y > -0.52 && y < 0.1
  const head = Math.abs(x) + Math.abs(y - 0.24) < 0.3 && y > 0.02
  const tray = Math.abs(y - 0.46) < 0.09 && Math.abs(x) < 0.46
  return stem || head || tray
}

/** Checked box over a bar — eval-kit: humans score, not models. */
function inScore(x: number, y: number) {
  const bars = [
    { cx: -0.34, top: 0.02 },
    { cx: 0.0, top: -0.24 },
    { cx: 0.34, top: -0.48 },
  ]
  const bar = bars.some((b) => Math.abs(x - b.cx) < 0.12 && y > b.top && y < 0.44)
  const base = Math.abs(y - 0.5) < 0.07 && Math.abs(x) < 0.52
  return bar || base
}

/** Stacked strata — Trickle: text animation primitives, layered. */
function inStrata(x: number, y: number) {
  if (Math.abs(x) > 0.56) return false
  const rows = [-0.36, -0.12, 0.12, 0.36]
  return rows.some((r, i) => Math.abs(y - r) < 0.08 && Math.abs(x) < 0.56 - i * 0.1)
}

/** A gate with a gap — HITL Kit: the moment control returns to a human. */
function inGate(x: number, y: number) {
  const posts = Math.abs(Math.abs(x) - 0.42) < 0.1 && Math.abs(y) < 0.5
  const lintel = Math.abs(y + 0.42) < 0.1 && Math.abs(x) < 0.52
  const halfBar = Math.abs(y - 0.06) < 0.09 && x > -0.42 && x < 0.02
  return posts || lintel || halfBar
}

/** Knob + wave — akaVST: an instrument you play. */
function inKnob(x: number, y: number) {
  const r = Math.hypot(x, y)
  const ring = r < 0.46 && r > 0.33
  const pointer = segHit(x, y, 0, 0, 0, -0.46, 0.09)
  return ring || pointer
}

/** A gear — the practice/method mark. */
function inGear(x: number, y: number) {
  const r = Math.hypot(x, y)
  if (r < 0.17) return false
  const a = Math.atan2(y, x)
  const tooth = Math.abs(((a / (Math.PI / 4)) % 1) - 0.5) < 0.28
  return r < (tooth ? 0.54 : 0.4)
}

/** Segment-distance helper shared by the glyphs above. */
function segHit(x: number, y: number, ax: number, ay: number, bx: number, by: number, w: number) {
  const dx = bx - ax
  const dy = by - ay
  const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)))
  const px = ax + t * dx
  const py = ay + t * dy
  return (x - px) ** 2 + (y - py) ** 2 < w * w
}

const KNOCKOUTS = {
  head: inFigure,
  spark: inSpark,
  bubble: inBubble,
  gamepad: inGamepad,
  bodylog: inCrossPencil,
  watch: inWatch,
  collapse: inCollapseGlyph,
  score: inScore,
  strata: inStrata,
  gate: inGate,
  knob: inKnob,
  gear: inGear,
} as const

/**
 * Wordmark icons rendered as hand-authored pixel masks (solid letters, not a
 * disc knockout) — same grammar as SMALL_MASK. For titles whose mark is text.
 */
const ICON_MASKS = {
  aka: `
..............
..............
..............
..............
.##..#.....##.
...#.#.#.....#
.###.##....###
#..#.#.#..#..#
.###.#..#..###
..............
..............
..............
..............
..............`,
  nyz: `
..............
..............
..............
#..#.#..#.####
#..#.#..#....#
##.#..##....#.
##.#..##....#.
#.##...#...#..
#.##...#...#..
#..#...#..#...
#..#...#..####
..............
..............
..............`,
  pogo: `
................
................
................
................
................
.###.###.###.###
.#.#.#.#.#...#.#
.###.#.#.#...#.#
.#...#.#.#.#.#.#
.#...#.#.#.#.#.#
.#...#.#.#.#.#.#
.#...###.###.###
................
................
................
................`,
} as const

/**
 * Knockout masks: unlike ICON_MASKS (which draw the glyph itself), these are
 * subtracted from a solid disc — the mark is the ring of pixels left behind.
 * Sampled in normalized space, so they render at any `grid`.
 */
const KNOCKOUT_MASKS = {
  aka: `........................
........................
........................
........................
........................
........................
........................
........................
....###..#......###.....
.......#.#..#......#....
....####.#.#....####....
...#...#.##....#...#....
...#..##.#.#...#..##....
....##.#.#..#...##.#....
.........#...#..........
........................
........................
........................
........................
........................
........................
........................
........................
........................`,
} as const

type KnockoutMask = keyof typeof KNOCKOUT_MASKS

/** Parse a knockout mask into a square lookup grid. */
function parseKnockoutMask(name: KnockoutMask) {
  const rows = KNOCKOUT_MASKS[name].trim().split("\n").map((r) => r.trim())
  return { rows, n: rows.length }
}

const ICON_MASK_ROWS = Object.fromEntries(
  Object.entries(ICON_MASKS).map(([k, v]) => [k, v.trim().split("\n")]),
) as Record<keyof typeof ICON_MASKS, string[]>

export type PixelIcon = keyof typeof KNOCKOUTS | keyof typeof ICON_MASKS | `disc-${KnockoutMask}`

/**
 * Named picks from the expression cycle, adoptable as persona marks (the
 * `face` prop). Values are EXPR indices — keep in sync if EXPR reorders.
 */
export const PERSONA_FACES = {
  wink: 5,
  thinking: 22,
} as const

export type PersonaFace = keyof typeof PERSONA_FACES

/* ---- expressions: 9×8 pixel faces drawn inside the head void ---------- */

function parseFace(str: string): [number, number][] {
  const rows = str.replace(/^\n|\n$/g, "").split("\n")
  const out: [number, number][] = []
  rows.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) if (row[c] === "#") out.push([c, r])
  })
  return out
}

type Expression = {
  accent: string | null
  px: [number, number][]
  px2?: [number, number][]
}

/**
 * Where each of the table's five accents is actually read from.
 *
 * The hex keys below are the circleheads handoff's own values and stay the
 * record of what the design says. They are not what gets painted: a pastel
 * picked to glow on the studio's near-black ground washes out on paper, and on
 * the fifteen expressions that carry one it is the only colour the mark has. So
 * each resolves through a token with a value per theme (--pixel-face-* in
 * globals.css), falling back to the hex if the stylesheet has not arrived.
 *
 * Dark restates the handoff's values exactly, so the mark there is unchanged.
 */
const ACCENT_TOKENS: Record<string, string> = {
  "#EBBB63": "--pixel-face-amber",
  "#8FD9A6": "--pixel-face-green",
  "#7FB0E3": "--pixel-face-blue",
  "#B39DE8": "--pixel-face-violet",
  "#E88FAE": "--pixel-face-rose",
}

const EXPR: Expression[] = [
  {
    accent: null,
    px: parseFace(`.........
.........
..#...#..
.........
.........
.........
..#####..
.........`),
  },
  // smiley whose eyes are tiny smileys too
  {
    accent: "#EBBB63",
    px: parseFace(`.........
.#.#.#.#.
..#...#..
.........
.........
.#.....#.
..#####..
.........`),
  },
  {
    accent: null,
    px: parseFace(`.........
.........
..#...#..
.........
.........
..#...#..
...###...
.........`),
  },
  {
    accent: null,
    px: parseFace(`.........
.........
..#...#..
.........
.........
...###...
...###...
.........`),
    px2: parseFace(`.........
.........
..#...#..
.........
.........
.........
...###...
.........`),
  },
  {
    accent: null,
    px: parseFace(`.........
.........
..#...#..
.........
.........
.#.....#.
.#######.
..#####..`),
    px2: parseFace(`.........
.........
..#...#..
.........
.........
.........
.#######.
.........`),
  },
  {
    accent: "#8FD9A6",
    px: parseFace(`.........
.........
.###..#..
.........
.........
..#...#..
...###...
.........`),
  },
  {
    accent: null,
    px: parseFace(`.........
.........
..#...#..
.........
.........
.....##..
..###....
.........`),
  },
  {
    accent: null,
    px: parseFace(`.........
.........
...#...#.
.........
.........
.........
...##....
.........`),
    px2: parseFace(`.........
.........
.#...#...
.........
.........
.........
....##...
.........`),
  },
  {
    accent: null,
    px: parseFace(`.........
.........
.###.###.
.........
.........
.........
...###...
.........`),
  },
  {
    accent: "#EBBB63",
    px: parseFace(`.........
.##...##.
.##...##.
.........
...###...
...#.#...
...###...
.........`),
  },
  {
    accent: "#8FD9A6",
    px: parseFace(`.........
.........
..#...#..
.#.#.#.#.
.........
..#...#..
...###...
.........`),
  },
  {
    accent: "#EBBB63",
    px: parseFace(`.........
.....##..
..#...#..
.........
....#....
...#.#...
....#....
.........`),
  },
  {
    accent: null,
    px: parseFace(`.........
.........
..#...#..
.#.#.#.#.
.........
..#####..
..#####..
...###...`),
    px2: parseFace(`.........
.........
..#...#..
.#.#.#.#.
.........
...###...
...###...
.........`),
  },
  {
    accent: null,
    px: parseFace(`.........
.........
..#...#..
.........
.........
.........
...####..
.........`),
  },
  {
    accent: "#7FB0E3",
    px: parseFace(`.........
.........
..#...#..
.........
.........
...###...
..#...#..
.........`),
  },
  {
    accent: "#7FB0E3",
    px: parseFace(`.........
.........
..#...#..
..#...#..
.........
...###...
..#...#..
.........`),
    px2: parseFace(`.........
.........
..#...#..
.........
..#...#..
...###...
..#...#..
.........`),
  },
  {
    accent: "#B39DE8",
    px: parseFace(`.........
.#.....#.
..#...#..
..#...#..
.........
.........
...###...
.........`),
  },
  {
    accent: "#B39DE8",
    px: parseFace(`.........
.#.....#.
..#...#..
.........
..#####..
..#...#..
..#####..
.........`),
  },
  {
    accent: "#7FB0E3",
    px: parseFace(`.........
.........
.#######.
.#.#.#.#.
.........
..#...#..
...###...
.........`),
  },
  {
    accent: null,
    px: parseFace(`.........
..####...
..#...#..
.........
.........
..####...
.........
.........`),
  },
  {
    accent: "#EBBB63",
    px: parseFace(`.........
..#...#..
.###.###.
..#...#..
.........
..#...#..
...###...
.........`),
  },
  {
    accent: "#E88FAE",
    px: parseFace(`.........
.#.#.#.#.
.###.###.
..#...#..
.........
..#...#..
...###...
.........`),
  },
  // thinking: eyes drift up-left, dots pulse
  {
    accent: "#7FB0E3",
    px: parseFace(`.........
.#...#...
.........
.........
.........
..#.#.#..
.........
.........`),
    px2: parseFace(`.........
.#...#...
.........
.........
.........
...#.#...
.........
.........`),
  },
  // dizzy: crossed eyes, small o mouth
  {
    accent: "#B39DE8",
    px: parseFace(`.........
.#.#.#.#.
..#...#..
.#.#.#.#.
.........
.........
...##....
.........`),
    px2: parseFace(`.........
.#.#.#.#.
..#...#..
.#.#.#.#.
.........
.........
....##...
.........`),
  },
  // singing: closed happy eyes, mouth opens and closes
  {
    accent: "#E88FAE",
    px: parseFace(`.........
.........
.##...##.
.........
.........
...###...
...#.#...
...###...`),
    px2: parseFace(`.........
.........
.##...##.
.........
.........
.........
...###...
.........`),
  },
  // determined: flat brows, steady mouth
  {
    accent: null,
    px: parseFace(`.........
.##...##.
..#...#..
.........
.........
.........
..#####..
.........`),
  },
]
/** drawFace timeline: seconds per expression slot, and the morph window at
 * its tail. A persona face reveal drives a scramble across TRANS into its
 * expression. */
const FACE_SLOT = 2.9
const FACE_TRANS = 0.5
const FACE_COLS = 9
const FACE_ROWS = 8

export function PixelHead({
  size,
  grid = 22,
  mode = "glitch",
  variant = "negative",
  gap = 0.16,
  icon = "head",
  faces = false,
  startAssembled = false,
  still = false,
  once = false,
  shimmer = false,
  face,
  faceIndex,
  fluid = false,
  color,
  speed = 1,
  className,
}: PixelHeadProps) {
  const hostRef = useRef<HTMLSpanElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    // Disc-knockout marks (`disc-aka`): a solid disc with a glyph subtracted.
    const knockMask =
      typeof icon === "string" && icon.startsWith("disc-")
        ? parseKnockoutMask(icon.slice(5) as KnockoutMask)
        : null

    // Mask-rendered icons: wordmarks always, the head at chrome sizes.
    const maskRows = knockMask
      ? null
      : icon in ICON_MASK_ROWS
        ? ICON_MASK_ROWS[icon as keyof typeof ICON_MASKS]
        : icon === "head" && grid <= SMALL_MASK_MAX_GRID
          ? SMALL_MASK
          : null
    const N = maskRows ? maskRows.length : grid
    const figScale = 0.78
    // Analytic shapes only; the mask branch below never reads this.
    const knockout = maskRows || knockMask ? null : KNOCKOUTS[icon as keyof typeof KNOCKOUTS]
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = size * dpr
    canvas.height = size * dpr
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Pixel color follows the theme: the host carries color: var(--foreground)
    // (set in JSX); resolve it now and again whenever the html class flips.
    // The accents are read off the host alongside the foreground, so a theme
    // flip re-resolves both in the one pass the observer already makes.
    const readAccents = () => {
      const cs = getComputedStyle(host)
      const out: Record<string, string> = {}
      for (const [hex, token] of Object.entries(ACCENT_TOKENS)) {
        out[hex] = cs.getPropertyValue(token).trim() || hex
      }
      return out
    }
    let fg = getComputedStyle(host).color
    let accents = readAccents()
    let onceDone = false
    const themeObserver = new MutationObserver(() => {
      fg = getComputedStyle(host).color
      accents = readAccents()
      if (reduced || onceDone) paintStill()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    /* ---- sample cells ------------------------------------------------- */
    const cell = (size * dpr) / N
    const ringW = Math.max(0.1, 2.2 / N)
    type Cell = {
      x: number
      y: number
      nx: number
      ny: number
      d: number
      seed: number
      r1: number
      r2: number
      r3: number
      delay: number
    }
    const cells: Cell[] = []
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const nx = ((i + 0.5) / N) * 2 - 1
        const ny = ((j + 0.5) / N) * 2 - 1
        const d = Math.sqrt(nx * nx + ny * ny)
        let on = false
        if (knockMask) {
          // Solid disc with the mask subtracted — sampled in normalized space
          // so the mark stays correct at any grid resolution.
          const t = (v: number) => Math.floor(((v / (figScale + 0.06) + 1) / 2) * knockMask.n)
          const mi = t(nx)
          const mj = t(ny)
          const inGlyph =
            mi >= 0 && mi < knockMask.n && mj >= 0 && mj < knockMask.n &&
            knockMask.rows[mj]?.[mi] === "#"
          on = d < 0.98 && !inGlyph
        } else if (maskRows) {
          on = maskRows[j]?.[i] === "#"
        } else if (variant === "negative") {
          on = d < 0.98 && !knockout!(nx / (figScale + 0.04), ny / (figScale + 0.04))
        } else {
          const inF = d < 0.84 && knockout!(nx / figScale, ny / figScale)
          const rg = d < 0.98 && d > 0.98 - ringW * 2
          on = inF || rg
        }
        if (!on) continue
        const seed = i * 37 + j * 101
        const r1 = hash(seed)
        let delay: number
        if (mode === "ash") delay = ((ny + 1) / 2) * 0.75 + r1 * 0.25
        else if (mode === "explode") delay = d * 0.6 + r1 * 0.15
        else if (mode === "scatter") delay = r1
        else delay = hash(Math.floor((ny + 1) * 6)) * 0.7 + r1 * 0.3
        cells.push({
          x: i * cell,
          y: j * cell,
          nx,
          ny,
          d,
          seed,
          r1,
          r2: hash(seed + 1),
          r3: hash(seed + 2),
          delay,
        })
      }
    }

    /* ---- timeline (seconds) ------------------------------------------- */
    const HOLD = faces ? 25 : 1.1
    const DISSOLVE = 1.9
    const GONE = 0.55
    const REFORM = 1.7
    const TOTAL = HOLD + DISSOLVE + GONE + REFORM
    const SPREAD = 0.55

    const W = size * dpr
    const px = cell * (1 - gap)
    const off = (cell - px) / 2

    // Face layer geometry, snapped to the disc's pixel grid.
    // Head void center: figure-space y -0.40 × the 0.82 knockout scale.
    const headCenterPy = ((-0.328 + 1) / 2) * W
    const faceOriginX = Math.round((W * 0.5 - (FACE_COLS * cell) / 2) / cell) * cell
    const faceOriginY = Math.round((headCenterPy - (FACE_ROWS * cell) / 2) / cell) * cell

    const drawFace = (fTime: number) => {
      const SLOT = FACE_SLOT
      const TRANS = FACE_TRANS
      const raw = fTime / SLOT
      const i = Math.floor(raw) % EXPR.length
      const phase = fTime - Math.floor(raw) * SLOT
      const morphing = phase > SLOT - TRANS
      const expr = morphing ? EXPR[(i + 1) % EXPR.length]! : EXPR[i]!
      const tt = morphing ? (phase - (SLOT - TRANS)) / TRANS : 1
      const blink =
        !morphing && phase > SLOT - TRANS - 0.24 && phase < SLOT - TRANS - 0.08
      const pixels =
        !morphing && expr.px2 && Math.floor(phase * 3) % 2 === 1
          ? expr.px2
          : expr.px
      const color = expr.accent ? (accents[expr.accent] ?? expr.accent) : fg

      const draws: [number, number, number][] = []
      for (const [c, r] of pixels) {
        let bx = faceOriginX + c * cell
        let by = faceOriginY + r * cell
        let a = 1
        if (morphing) {
          const s = 1 - tt
          const q = hash(c * 13 + r * 7 + Math.floor(phase * 40) * 3)
          bx += Math.round((q - 0.5) * 6 * s) * cell
          const q2 = hash(c * 5 + r * 17 + Math.floor(phase * 40) * 5)
          if (q2 > 0.75) by += Math.round((q2 - 0.5) * 4 * s) * cell
          a = q > 0.35 ? 1 : 0.2
        } else {
          const j = hash(c * 3 + r * 11 + Math.floor(fTime * 8))
          if (j > 0.985) a = 0.25
          if (blink && r <= 3) a = r === 2 ? 1 : 0
        }
        if (a > 0.02) draws.push([bx, by, a])
      }
      // Knockout halo: clear around every face pixel so big mouths punch
      // through the disc and always read clearly.
      for (const d of draws) ctx.clearRect(d[0] - cell, d[1] - cell, cell * 3, cell * 3)
      ctx.fillStyle = color
      for (const d of draws) {
        ctx.globalAlpha = d[2]
        ctx.fillRect(d[0] + off, d[1] + off, px, px)
      }
      // A single soft accent sparkle for color-pop expressions.
      if (expr.accent && !morphing) {
        const spk = Math.floor(fTime * 4)
        const h = hash(spk * 9 + i * 3)
        if (h > 0.82) {
          const ang = hash(spk * 7 + 1) * Math.PI * 2
          const rad = (0.31 + hash(spk) * 0.1) * W
          const sx = Math.round((W * 0.5 + Math.cos(ang) * rad) / cell) * cell
          const sy =
            Math.round((headCenterPy + Math.sin(ang) * rad * 0.7) / cell) * cell
          ctx.fillStyle = accents[expr.accent] ?? expr.accent
          ctx.globalAlpha = 0.55
          ctx.fillRect(sx + off, sy + off, px, px)
        }
      }
      ctx.globalAlpha = 1
    }

    const drawCell = (c: Cell, t: number) => {
      // t: 0 assembled, 1 fully dissolved
      let x = c.x
      let y = c.y
      let a = 1
      let rot = 0
      let s = 1
      if (t <= 0) {
        /* home */
      } else if (mode === "ash") {
        const e = easeInCubic(t)
        y -= e * W * (0.55 + c.r2 * 0.5)
        x += Math.sin(t * (4 + c.r2 * 5) + c.seed) * W * 0.045 * t
        a = 1 - t
        s = 1 - t * 0.5
      } else if (mode === "explode") {
        const e = easeOutCubic(t)
        const ang = Math.atan2(c.ny, c.nx) + (c.r2 - 0.5) * 0.6
        const dist = W * (0.35 + c.r3 * 0.45) * e
        x += Math.cos(ang) * dist
        y += Math.sin(ang) * dist
        rot = (c.r2 - 0.5) * 4 * t
        a = 1 - easeInCubic(t) * 0.95
        s = 1 - t * 0.35
      } else if (mode === "scatter") {
        const e = t
        y += 0.9 * W * e * e * (0.8 + c.r2 * 0.6)
        x += (c.r3 - 0.5) * W * 0.35 * e
        rot = (c.r2 - 0.5) * 7 * e
        a = 1 - easeInCubic(t) * 0.9
      } else {
        // glitch
        const step = Math.floor(t * 9) / 9
        if (step > 0) {
          const q = Math.round((hash(c.seed + step * 53) - 0.5) * 8 * step)
          x += q * cell
          if (hash(c.seed + step * 17) > 0.82)
            y += Math.round((hash(c.seed + step * 29) - 0.5) * 4) * cell
        }
        const flick = hash(c.seed + Math.floor(t * 14) * 7)
        a = t >= 0.99 ? 0 : flick > t * 0.9 ? 1 : 0.15
      }
      if (a <= 0.01) return
      ctx.globalAlpha = a
      if (rot !== 0 || s !== 1) {
        ctx.save()
        ctx.translate(x + cell / 2, y + cell / 2)
        ctx.rotate(rot)
        ctx.scale(s, s)
        ctx.fillRect(-px / 2, -px / 2, px, px)
        ctx.restore()
      } else {
        const sz = px * s
        ctx.fillRect(x + off + (px - sz) / 2, y + off + (px - sz) / 2, sz, sz)
      }
    }

    // A persona face holds one expression: mid-slot, past the chatter
    // frame, clear of the blink window.
    const personaIndex =
      faceIndex != null ? faceIndex : face != null ? PERSONA_FACES[face] : null
    const personaTime =
      personaIndex != null ? personaIndex * FACE_SLOT + 0.7 : null
    /**
     * Persona face scrambling into its expression as the disc assembles.
     * Reveal r (0→1) walks drawFace across the morph that lands on the
     * persona expression, so the face materializes with the mark instead
     * of snapping in when assembly completes.
     */
    const drawPersonaReveal = (r: number) => {
      if (personaIndex == null) return
      const morphStart = (personaIndex - 1) * FACE_SLOT + (FACE_SLOT - FACE_TRANS)
      drawFace(morphStart + clamp01(r) * FACE_TRANS)
    }

    const paintStill = () => {
      ctx.clearRect(0, 0, W, W)
      ctx.fillStyle = fg
      for (const c of cells) drawCell(c, 0)
      if (personaTime != null) drawFace(personaTime)
      else if (faces) drawFace(0.5) // neutral, mid-hold
    }

    /* ---- loop, with the house pause/reduced-motion machinery ---------- */
    const reduced =
      still || window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      paintStill()
      return () => themeObserver.disconnect()
    }

    // once: assemble on first sight, then hold — no dissolve loop. The
    // IntersectionObserver defers playback (and starts the clock) at first
    // visibility. Afterward: plain hold repaints only on theme flips; with
    // `shimmer`, a quiet twinkle re-rolls ~4% of cells a few times a second
    // while visible.
    if (once) {
      let raf = 0
      let visible = false
      let started = false
      let t1 = 0
      let bucket = -1

      const paintShimmer = (now: number) => {
        const b = Math.floor(now / 300)
        if (b === bucket) return
        bucket = b
        ctx.clearRect(0, 0, W, W)
        ctx.fillStyle = fg
        for (const c of cells) {
          ctx.globalAlpha = hash(c.seed + b * 13) > 0.96 ? 0.35 : 1
          ctx.fillRect(c.x + off, c.y + off, px, px)
        }
        ctx.globalAlpha = 1
        // the held expression twinkles too — jitter walks with the bucket
        if (personaTime != null) drawFace(personaTime + (b % 8) * 0.125)
      }

      const frameOnce = (now: number) => {
        if (!t1) t1 = now
        const g = Math.max(0, 1 - (((now - t1) / 1000) * speed) / REFORM)
        if (g > 0) {
          ctx.clearRect(0, 0, W, W)
          ctx.fillStyle = fg
          for (const c of cells)
            drawCell(c, clamp01(g * (1 + SPREAD) - c.delay * SPREAD))
          ctx.globalAlpha = 1
          // once the void has mostly formed (g < 0.55), scramble the face in
          if (g < 0.55) drawPersonaReveal((0.55 - g) / 0.55)
          raf = requestAnimationFrame(frameOnce)
          return
        }
        onceDone = true
        if (!shimmer) {
          paintStill()
          return // settled for good; theme flips repaint via the observer
        }
        if (visible) paintShimmer(now)
        raf = requestAnimationFrame(frameOnce)
      }

      const observer = new IntersectionObserver((entries) => {
        visible = entries[entries.length - 1]?.isIntersecting ?? true
        if (visible && !started) {
          started = true
          raf = requestAnimationFrame(frameOnce)
          if (!shimmer) observer.disconnect()
        }
      })
      observer.observe(host)
      return () => {
        cancelAnimationFrame(raf)
        observer.disconnect()
        themeObserver.disconnect()
      }
    }

    // Faces mode starts mid-air and assembles on load, unless it was asked to
    // open already whole, in which case the clock starts at the top of the hold
    // and the first frame is the first expression. Everything else starts at a
    // random phase so multiple marks on a page don't sync up.
    const offset = faces
      ? startAssembled
        ? (REFORM * 1000) / speed
        : 0
      : hash(cells.length) * 1000
    const t0 = performance.now() - offset
    let raf = 0
    let visible = true
    let lastSig = ""

    const frame = (now: number) => {
      const elapsed = ((now - t0) / 1000) * speed
      const time = elapsed % TOTAL
      let g // global progress: 0 assembled -> 1 gone
      if (faces) {
        if (time < REFORM) g = 1 - time / REFORM
        else if (time < REFORM + HOLD) g = 0
        else if (time < REFORM + HOLD + DISSOLVE) g = (time - REFORM - HOLD) / DISSOLVE
        else g = 1
      } else {
        if (time < HOLD) g = 0
        else if (time < HOLD + DISSOLVE) g = (time - HOLD) / DISSOLVE
        else if (time < HOLD + DISSOLVE + GONE) g = 1
        else g = 1 - (time - HOLD - DISSOLVE - GONE) / REFORM
      }

      // Idle throttle: while fully assembled nothing moves except the face,
      // whose drivers tick at ≤8Hz (jitter) / 12.5Hz (blink edges) — outside
      // a morph, repainting between ticks is pure waste. Dissolve, reform,
      // and morph windows keep full frame rate (empty signature).
      let sig = ""
      if (g === 0) {
        if (!faces) sig = "hold"
        else {
          const fTime =
            Math.floor(elapsed / TOTAL) * HOLD + Math.min(time - REFORM, HOLD)
          const phase = fTime % 2.9 // drawFace's SLOT
          if (phase <= 2.9 - 0.5)
            sig = `h${Math.floor(fTime * 8)}p${Math.floor(phase * 12.5)}`
        }
      }
      if (sig !== "" && sig === lastSig) {
        raf = requestAnimationFrame(frame)
        return
      }
      lastSig = sig

      ctx.clearRect(0, 0, W, W)
      ctx.fillStyle = fg
      for (const c of cells) drawCell(c, clamp01(g * (1 + SPREAD) - c.delay * SPREAD))
      ctx.globalAlpha = 1
      // Faces only while the disc is fully assembled; the expression clock
      // accumulates assembled time only, so the loop survives dissolves.
      // Whole assembled window: the head is never shown faceless.
      if (faces && time >= REFORM && time < REFORM + HOLD) {
        const fTime = Math.floor(elapsed / TOTAL) * HOLD + Math.min(time - REFORM, HOLD)
        drawFace(fTime)
      }
      raf = requestAnimationFrame(frame)
    }
    const start = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(frame)
    }
    const stop = () => cancelAnimationFrame(raf)
    const sync = () => {
      if (visible && !document.hidden) start()
      else stop()
    }
    const observer = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1]?.isIntersecting ?? true
      sync()
    })
    observer.observe(host)
    document.addEventListener("visibilitychange", sync)

    sync()
    return () => {
      stop()
      observer.disconnect()
      document.removeEventListener("visibilitychange", sync)
      themeObserver.disconnect()
    }
  }, [size, grid, mode, variant, gap, icon, faces, startAssembled, still, once, shimmer, face, faceIndex, fluid, color, speed])

  return (
    <span
      ref={hostRef}
      className={className}
      aria-hidden
      style={{
        display: "inline-block",
        lineHeight: 0,
        color: color ?? "var(--foreground)",
        ...(fluid ? { width: "100%", maxWidth: size } : null),
      }}
    >
      <canvas
        ref={canvasRef}
        style={
          fluid
            ? { width: "100%", height: "auto", display: "block" }
            : { width: size, height: size, display: "block" }
        }
      />
    </span>
  )
}
