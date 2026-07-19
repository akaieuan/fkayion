"use client"

import { useEffect, useRef } from "react"

import { RoundaboutSim, VIEW_SIZE } from "./roundabout-sim"

/**
 * Bartel-Pritchard Square in the brand's bit style: the same traffic
 * simulation as ever (lib/roundabout-sim.ts) over a pixel scene drawn from
 * the real circle — a tan plaza ring, the donut of park trees, the plaza
 * around the memorial (the circlehead at dead center), zebra crossings on
 * every approach, and Prospect Park bleeding in from the east. Cars are
 * crisp cell-proportioned blocks that glide fluidly through it.
 *
 * House behaviors: chrome colors track the theme (greens/tans are art-layer
 * constants like the face accents), the loop pauses offscreen and on hidden
 * tabs, reduced-motion renders one mid-flow frame.
 */

type PixelRoundaboutProps = {
  /** Canvas CSS px (scales down with its container). */
  size?: number
  /** Cells across. */
  grid?: number
  /** Gap between pixels, as a fraction of a cell. */
  gap?: number
  className?: string
}

/** Accent variables the car palette resolves from (index = sim color roll). */
const CAR_VARS = [
  "--accent-blue",
  "--accent-green",
  "--accent-amber",
  "--accent-rose",
  "--accent-violet",
  "--muted-foreground",
]

/** Chrome tones, as alpha on the foreground color. The carriageway stays
 * quiet — cars are the event; markings are hints, not features. */
const ROAD_ALPHA = 0.1
const MARKING_ALPHA = 0.28
const CROSSWALK_ALPHA = 0.38
const MEMORIAL_ALPHA = 1

/**
 * Art-layer palette (fixed constants, like the pixel-head face accents):
 * park greens, the plaza's brick tans, and the cop lights — mid-toned to
 * sit on both themes.
 */
const TREE_DEEP = "#2E4A33"
const TREE_MID = "#3F6446"
const TREE_LIT = "#5B885A"
const PLAZA = "#A68A6E"
const PLAZA_LIT = "#B59878"
const COP_RED = "#E3524D"
const COP_BLUE = "#4D7BE3"
const FIRE_RED = "#D0453F"
const FIRE_AMBER = "#F5D061"
const FIRE_CAB = "#EDEDEA"

/* Scene geometry in sim viewBox units (see roundabout-sim.ts). */
const C = VIEW_SIZE / 2
const RING_R = 112
const RING_HALF_W = 26
const ROAD_HALF_W = 24
/** Island bands, road edge inward: plaza ring, tree donut, center plaza. */
const PLAZA_RING_R = 86
const TREES_R = 74
const CENTER_PLAZA_R = 44
const MEMORIAL_R = 20
/** Half-width of the four footpaths radiating out along the approach axes. */
const PATH_HALF_W = 6
/** Zebra crossings sit just past the ring road on every approach. */
const CROSSWALK_NEAR = 142
const CROSSWALK_FAR = 154
/** Prospect Park fills the block northeast of the circle. */
const PARK_EDGE_X = C + 104
/** A footpath (West Drive) cuts through the park canopy. */
const PARK_PATH_Y = C - 60
/** Sidewalk apron around the outside of the ring road. */
const SIDEWALK_R = 148
/** Top-right corner kept empty for the name label. x is set clear of the
 * north approach road (right edge at C + ROAD_HALF_W) so nothing is notched. */
const LABEL_ZONE = { x: C + ROAD_HALF_W + 4, y: 34 }

/**
 * Pedestrians: a few slow dots looping the plaza and strolling West Drive.
 * Pure functions of time — no state, no interaction with traffic (they
 * keep to the island and the park, never the carriageway).
 */
const PEDS = [
  { kind: "plaza", r: 80, w: 0.05, phase: 0.3 },
  { kind: "plaza", r: 79, w: -0.04, phase: 2.6 },
  { kind: "plaza", r: 81, w: 0.06, phase: 4.4 },
  { kind: "path", w: 0.09, phase: 0.9 },
  { kind: "path", w: 0.07, phase: 3.7 },
] as const

const cellHash = (i: number, j: number) => {
  const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453
  return s - Math.floor(s)
}

type SceneCell = { i: number; j: number; color: string | null; alpha: number }

/**
 * Sample the static scene at a cell center. `color: null` means "paint in
 * the theme's foreground"; anything else is an art-layer constant.
 */
function sceneCell(vx: number, vy: number, h: number): Omit<SceneCell, "i" | "j"> | null {
  const dx = vx - C
  const dy = vy - C
  const r = Math.hypot(dx, dy)

  // Name-label corner: reserved before anything else so no pixel sits
  // behind the text.
  if (vx > LABEL_ZONE.x && vy < LABEL_ZONE.y) return null

  /* the island, from the center out */
  if (r < MEMORIAL_R) return { color: null, alpha: MEMORIAL_ALPHA }
  // four footpaths cutting the island along the N/E/S/W approach axes
  if ((Math.abs(dx) < PATH_HALF_W || Math.abs(dy) < PATH_HALF_W) && r < PLAZA_RING_R)
    return { color: h > 0.5 ? PLAZA : PLAZA_LIT, alpha: 0.72 }
  if (r < CENTER_PLAZA_R)
    return { color: h > 0.5 ? PLAZA : PLAZA_LIT, alpha: 0.75 }
  if (r < TREES_R) {
    // canopy: greens cluster by a low-frequency hash (tree crowns, not
    // static), dappled across three tones with the odd dirt clearing
    const clump = cellHash(Math.floor(vx / 15) * 3, Math.floor(vy / 15) * 7)
    if (h > 0.9) return { color: PLAZA, alpha: 0.45 } // clearing
    const tone = clump > 0.62 ? TREE_LIT : clump > 0.32 ? TREE_MID : TREE_DEEP
    return { color: tone, alpha: h > 0.25 ? 0.95 : 0.8 }
  }
  if (r < PLAZA_RING_R)
    return { color: h > 0.5 ? PLAZA : PLAZA_LIT, alpha: 0.7 }

  const onRing = Math.abs(r - RING_R) <= RING_HALF_W
  const onRoad =
    (Math.abs(dx) <= ROAD_HALF_W || Math.abs(dy) <= ROAD_HALF_W) &&
    Math.max(Math.abs(dx), Math.abs(dy)) > PLAZA_RING_R
  if (onRing || onRoad) {
    // zebra crossings: stripes across each approach, just past the ring
    const axial = Math.max(Math.abs(dx), Math.abs(dy))
    const perp = Math.abs(dx) <= ROAD_HALF_W ? dx : dy
    if (
      !onRing &&
      axial >= CROSSWALK_NEAR &&
      axial <= CROSSWALK_FAR &&
      Math.floor((perp + ROAD_HALF_W) / 8) % 2 === 0
    )
      return { color: null, alpha: CROSSWALK_ALPHA }
    // approach centerlines only — the single-lane ring carries no markings,
    // so the moving cars stay the brightest thing on the tarmac
    const along = Math.abs(dx) <= 2 ? vy : Math.abs(dy) <= 2 ? vx : null
    if (along !== null && r > RING_R + RING_HALF_W) {
      if (Math.floor(along / 14) % 2 === 0)
        return { color: null, alpha: MARKING_ALPHA }
    }
    return { color: null, alpha: ROAD_ALPHA }
  }

  // Prospect Park owns the whole east side beyond the road, like the real
  // square: clumped canopy with a feathered west edge and West Drive
  // through the upper half.
  if (Math.abs(dy) > ROAD_HALF_W + 4 && vx > PARK_EDGE_X - 24) {
    const clump = cellHash(Math.floor(vx / 20) * 3, Math.floor(vy / 20) * 5)
    const fringe = vx < PARK_EDGE_X // feathered boundary, not a hard line
    if (dy < 0 && Math.abs(vy - PARK_PATH_Y) < 6 && !fringe)
      return { color: h > 0.5 ? PLAZA : PLAZA_LIT, alpha: 0.35 }
    if ((fringe ? clump > 0.62 : clump > 0.18) && h < 0.9)
      return { color: clump > 0.68 ? TREE_LIT : TREE_DEEP, alpha: 0.52 }
    return null
  }

  // sidewalk apron hugging the outside of the ring — beyond it, west of
  // the park, the canvas stays deliberately empty
  if (r <= SIDEWALK_R) return { color: null, alpha: 0.06 }
  return null
}

export function PixelRoundabout({
  size = 260,
  grid = 40,
  gap = 0.15,
  className,
}: PixelRoundaboutProps) {
  const hostRef = useRef<HTMLSpanElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    const N = grid
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = size * dpr
    canvas.height = size * dpr
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const W = size * dpr
    const cell = W / N
    const px = cell * (1 - gap)
    const off = (cell - px) / 2
    /** Sim viewBox units per grid cell. */
    const unitsPerCell = VIEW_SIZE / N

    /* ---- theme-reactive palette --------------------------------------- */
    let fg = ""
    let carColors: string[] = []
    const resolveColors = () => {
      const style = getComputedStyle(host)
      fg = style.color
      carColors = CAR_VARS.map((v) => style.getPropertyValue(v).trim() || fg)
    }
    resolveColors()
    const themeObserver = new MutationObserver(() => {
      resolveColors()
      if (reduced) paint()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    /* ---- static scene cells, sampled once ------------------------------ */
    const scene: SceneCell[] = []
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const sampled = sceneCell(
          (i + 0.5) * unitsPerCell,
          (j + 0.5) * unitsPerCell,
          cellHash(i, j),
        )
        if (sampled) scene.push({ i, j, ...sampled })
      }
    }

    const sim = new RoundaboutSim(Math.floor(Math.random() * 2 ** 31)).warmUp()

    // Emergency vehicles: every so often the next spawn is adopted as the
    // cop or the (rarer) firetruck, keeping the role for that pass. Once
    // per visit, a cop on the ring pulls over the car ahead of it — a real
    // sim hold, so traffic queues behind the stop like it would in life.
    let simTime = 0
    let copId = 0
    let truckId = 0
    let lastMaxId = 0
    let nextCopAt = 5 + Math.random() * 8
    let nextTruckAt = 20 + Math.random() * 25
    let copRingSince = 0
    let pulloverDone = false

    const ringU = (x: number, y: number) => {
      const a = Math.atan2(y - C, x - C)
      return (((-a * RING_R) % (2 * Math.PI * RING_R)) + 2 * Math.PI * RING_R) % (2 * Math.PI * RING_R)
    }

    const trackSpecials = () => {
      const cars = sim.snapshots()
      let maxId = lastMaxId
      for (const car of cars) maxId = Math.max(maxId, car.id)
      if (copId && !cars.some((car) => car.id === copId)) {
        copId = 0
        copRingSince = 0
        pulloverDone = false
      }
      if (truckId && !cars.some((car) => car.id === truckId)) truckId = 0
      if (maxId > lastMaxId) {
        if (!copId && simTime >= nextCopAt) {
          copId = maxId
          nextCopAt = simTime + 30 + Math.random() * 30
        } else if (!truckId && maxId !== copId && simTime >= nextTruckAt) {
          truckId = maxId
          nextTruckAt = simTime + 70 + Math.random() * 50
        }
      }
      lastMaxId = maxId

      // pull-over: once the cop has circulated a moment, stop the car ahead
      if (copId && !pulloverDone) {
        const cop = cars.find((car) => car.id === copId)
        const onRing = cop && Math.abs(Math.hypot(cop.x - C, cop.y - C) - RING_R) < 1
        if (!onRing) copRingSince = 0
        else if (!copRingSince) copRingSince = simTime
        else if (simTime - copRingSince > 3) {
          const cu = ringU(cop.x, cop.y)
          const circ = 2 * Math.PI * RING_R
          let best: { id: number; du: number } | null = null
          for (const other of cars) {
            if (other.id === copId) continue
            if (Math.abs(Math.hypot(other.x - C, other.y - C) - RING_R) > 1) continue
            const du = (((ringU(other.x, other.y) - cu) % circ) + circ) % circ
            if (du > 12 && du < 70 && (!best || du < best.du)) best = { id: other.id, du }
          }
          if (best) {
            sim.holdCar(best.id, 5)
            pulloverDone = true
          }
        }
      }
    }

    const paint = () => {
      ctx.clearRect(0, 0, W, W)
      for (const s of scene) {
        ctx.fillStyle = s.color ?? fg
        ctx.globalAlpha = s.alpha
        ctx.fillRect(s.i * cell + off, s.j * cell + off, px, px)
      }
      // cars: cell-proportioned blocks at continuous positions — pixel
      // bodies, fluid motion
      const scale = W / VIEW_SIZE
      for (const car of sim.snapshots()) {
        if (car.opacity <= 0.02) continue
        const isCop = car.id === copId
        const isTruck = car.id === truckId
        const len = car.length * scale
        const flash = Math.floor(simTime * 3) % 2 === 0
        ctx.save()
        ctx.translate(car.x * scale, car.y * scale)
        ctx.rotate((car.headingDeg * Math.PI) / 180)
        if (isCop || isTruck) {
          // light spill: a faint oversized wash in the current flash color —
          // light on the road, not a painted box
          ctx.globalAlpha = car.opacity * 0.15
          ctx.fillStyle = isCop
            ? flash
              ? COP_RED
              : COP_BLUE
            : flash
              ? FIRE_RED
              : FIRE_AMBER
          ctx.fillRect(-len * 0.95, -px * 1.3, len * 1.9, px * 2.6)
        }
        ctx.globalAlpha = car.opacity
        ctx.fillStyle = isCop
          ? fg
          : isTruck
            ? FIRE_RED
            : carColors[Math.floor(car.color * carColors.length)]!
        ctx.fillRect(-len / 2, -px / 2, len, px)
        if (isCop) {
          const lightW = len * 0.34
          const lightH = px * 0.8
          ctx.fillStyle = flash ? COP_RED : COP_BLUE
          ctx.fillRect(lightW * 0.15, -lightH / 2, lightW, lightH)
          ctx.fillStyle = flash ? COP_BLUE : COP_RED
          ctx.fillRect(-lightW * 1.15, -lightH / 2, lightW, lightH)
        } else if (isTruck) {
          // white cab up front, amber/red flash at the rear
          ctx.fillStyle = FIRE_CAB
          ctx.fillRect(len * 0.18, -px * 0.4, len * 0.3, px * 0.8)
          ctx.fillStyle = flash ? FIRE_AMBER : FIRE_RED
          ctx.fillRect(-len * 0.45, -px * 0.4, len * 0.24, px * 0.8)
        }
        ctx.restore()
      }
      // pedestrians: half-cell dots, quietly alive
      ctx.fillStyle = fg
      ctx.globalAlpha = 0.65
      for (const ped of PEDS) {
        let vx: number
        let vy: number
        if (ped.kind === "plaza") {
          const a = ped.phase + simTime * ped.w
          vx = C + Math.cos(a) * ped.r
          vy = C + Math.sin(a) * ped.r
        } else {
          const span = (VIEW_SIZE - PARK_EDGE_X - 20) / 2
          vx = PARK_EDGE_X + 10 + span + Math.sin(ped.phase + simTime * ped.w) * span
          vy = PARK_PATH_Y
        }
        ctx.fillRect(vx * scale - px * 0.25, vy * scale - px * 0.25, px * 0.5, px * 0.5)
      }
      ctx.globalAlpha = 1
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      paint()
      return () => themeObserver.disconnect()
    }

    let raf = 0
    let last = 0
    let visible = true

    const frame = (now: number) => {
      const dt = Math.min(Math.max(0, now - last) / 1000, 0.05)
      last = now
      simTime += dt
      sim.step(dt)
      trackSpecials()
      paint()
      raf = requestAnimationFrame(frame)
    }
    const start = () => {
      cancelAnimationFrame(raf)
      last = performance.now()
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
  }, [size, grid, gap])

  return (
    <span
      ref={hostRef}
      role="img"
      aria-label="Pixelated overhead view of Bartel-Pritchard Square with cars circulating"
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        lineHeight: 0,
        color: "var(--foreground)",
        width: "100%",
        maxWidth: size,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
      {/* sits in the scene's reserved top-right corner (LABEL_ZONE);
          compact tracking so it clears the north approach road */}
      <span
        aria-hidden
        className="text-muted-foreground/70 absolute top-[2%] right-[2%] font-mono text-[10px] tracking-[0.12em] uppercase"
      >
        bartel-pritchard sq
      </span>
    </span>
  )
}
