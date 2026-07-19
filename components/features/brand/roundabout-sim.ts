/**
 * Traffic simulation for the roundabout mark. Pure and DOM-free: the
 * component owns the clock and paints the snapshots however it likes.
 *
 * Model: four two-way approach roads feed a single-lane ring driven on the
 * right, so traffic circulates counterclockwise on screen. Every car follows
 * one 1D lane at a time (entry leg → ring → exit leg). Queueing, yielding at
 * the merge, and stop-and-go waves all emerge from two rules: keep a headway
 * to the car ahead, and don't merge into a gap that isn't there.
 *
 * All coordinates live in the component's VIEW_SIZE² viewBox.
 */

export const VIEW_SIZE = 400
export const RING_RADIUS = 112

const CENTER = VIEW_SIZE / 2
const CIRC = 2 * Math.PI * RING_RADIUS
/** Half a road-width between a lane and its road's centerline. */
const LANE_OFFSET = 12
/** Cars spawn/despawn this far past the viewBox edge. */
const SPAWN_PAD = 18
/** Distance over which cars fade in at spawn and out before despawn. */
const FADE_DIST = 16

export const MAX_CARS = 13
/** Bumper-to-bumper distance queued cars settle at. */
const MIN_GAP = 7
/** Acceleration / braking authority, px/s². Braking is stronger so a car
 * caught out by a slow merger ahead can always recover the headway. */
const ACCEL = 30
const BRAKE = 90
/** Gain converting spare headway into target speed (1/s). */
const FOLLOW_GAIN = 1.4
/** Comfort cap while circulating — nobody races the ring. */
const RING_SPEED_CAP = 34
/** An entering car needs the merge clear this many px upstream... */
const MERGE_GAP = 80
/** ...and not blocked by a car sitting this close past the merge. */
const MERGE_CLEAR = 18
/** Entering cars start checking the ring this far before the merge — far
 * enough that a car at full approach speed can brake to the stop line. */
const YIELD_ZONE = 40
/** Stop line: how far short of the merge point a yielding car halts. Set so
 * a waiting nose keeps clear daylight from ring traffic sweeping the merge
 * (ring bodies extend ~CAR half-width past the lane centerline). */
const YIELD_LINE = 16
/** A car this far down its exit leg still occupies the ring for followers —
 * it hasn't physically cleared the carriageway yet. */
const EXIT_CLEARANCE = 16
/** Body heading sweeps through each ring junction over ±TURN_ZONE px of
 * travel, so cars steer into and out of the ring instead of pivoting on the
 * corner. Presentation only: the 1D dynamics never read headings. */
const TURN_ZONE = 12
/** Seconds between spawn attempts per road, tuned against MAX_CARS so the
 * scene stays busy without gridlocking the merges. */
const SPAWN_DELAY_MIN = 1.4
const SPAWN_DELAY_JITTER = 3.2
/** Clear road a newborn car needs ahead of the spawn point (≳ the longest
 * car plus MIN_GAP). */
const SPAWN_CLEARANCE = 29
/** Per-car character, rolled once at spawn. */
const SPAWN_SPEED = 24 // px/s — cars arrive already rolling
const CRUISE_MIN = 30 // px/s
const CRUISE_JITTER = 16
const CAR_LENGTH_MIN = 13 // px
const CAR_LENGTH_JITTER = 4
/** Default pre-roll so the scene starts mid-flow: past the ~3.5 s it takes
 * the first spawns to cross, well into steady state. */
const WARM_UP_SECONDS = 30

type Vec = { x: number; y: number }

type Leg = {
  /** Unit vector pointing from the road's edge toward the ring. */
  inward: Vec
  /** Heading (rad) of the entry lane; the exit lane is this plus π. */
  inHeading: number
  /** Entry lane: from spawn point (offscreen) to the ring merge point. */
  entryStart: Vec
  entryLen: number
  /** Ring coordinate (px along direction of travel) of the merge point. */
  entryU: number
  /** Exit lane: from the ring toward the edge, leaving the view. */
  exitStart: Vec
  exitLen: number
  exitU: number
}

type LaneKind = "entry" | "ring" | "exit"

type Car = {
  id: number
  lane: LaneKind
  /** Road index while on an entry/exit leg; the entry road while on ring. */
  leg: number
  /** Position along the current lane, px. On the ring this is `u`. */
  s: number
  exitLeg: number
  v: number
  vMax: number
  color: number
  length: number
  /** Seconds this car still has to sit at zero target speed (pulled over). */
  holdFor: number
}

export type CarSnapshot = {
  id: number
  x: number
  y: number
  /** Degrees, ready for an SVG rotate(). */
  headingDeg: number
  opacity: number
  /** Stable per-car roll in [0, 1); the painter maps it onto its palette. */
  color: number
  /** Body length, px. Width is the painter's choice. */
  length: number
}

/** Small deterministic PRNG so a seed reproduces a run exactly. */
function mulberry32(seed: number) {
  let t = seed >>> 0
  return () => {
    t = (t + 0x6d2b79f5) | 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

const mod = (n: number, m: number) => ((n % m) + m) % m

const smoothstep = (t: number) => t * t * (3 - 2 * t)

/** Shortest-arc interpolation between two angles (rad). */
const mixAngle = (a: number, b: number, t: number) =>
  a + (mod(b - a + Math.PI, 2 * Math.PI) - Math.PI) * t

/** Right-hand perpendicular in screen coords (y down). */
const rightOf = (v: Vec): Vec => ({ x: -v.y, y: v.x })

/**
 * Ring coordinate u (px along travel) ↔ polar angle φ. Screen-CCW travel
 * means φ decreases as u grows.
 */
const angleOf = (u: number) => -u / RING_RADIUS

function ringPoint(u: number): Vec {
  const a = angleOf(u)
  return {
    x: CENTER + RING_RADIUS * Math.cos(a),
    y: CENTER + RING_RADIUS * Math.sin(a),
  }
}

function ringHeading(u: number) {
  const a = angleOf(u)
  return Math.atan2(-Math.cos(a), Math.sin(a))
}

/**
 * Distance along `start + t·dir` to the first crossing of the ring's
 * centerline circle. Lanes are offset from the road centerline, so this is a
 * plain line-circle intersection rather than a constant.
 */
function distanceToRing(start: Vec, dir: Vec): number {
  const rel = { x: start.x - CENTER, y: start.y - CENTER }
  const b = rel.x * dir.x + rel.y * dir.y
  const c = rel.x * rel.x + rel.y * rel.y - RING_RADIUS * RING_RADIUS
  return -b - Math.sqrt(b * b - c)
}

function buildLeg(edgeCenter: Vec, inward: Vec): Leg {
  const inRight = rightOf(inward)
  const entryStart = {
    x: edgeCenter.x + LANE_OFFSET * inRight.x - SPAWN_PAD * inward.x,
    y: edgeCenter.y + LANE_OFFSET * inRight.y - SPAWN_PAD * inward.y,
  }
  const entryLen = distanceToRing(entryStart, inward)
  const merge = {
    x: entryStart.x + entryLen * inward.x,
    y: entryStart.y + entryLen * inward.y,
  }

  const outward = { x: -inward.x, y: -inward.y }
  const outRight = rightOf(outward)
  const exitEdge = {
    x: edgeCenter.x + LANE_OFFSET * outRight.x - SPAWN_PAD * inward.x,
    y: edgeCenter.y + LANE_OFFSET * outRight.y - SPAWN_PAD * inward.y,
  }
  const exitLen = distanceToRing(exitEdge, inward)
  const exitPoint = {
    x: exitEdge.x + exitLen * inward.x,
    y: exitEdge.y + exitLen * inward.y,
  }

  const uOf = (p: Vec) =>
    mod(-Math.atan2(p.y - CENTER, p.x - CENTER) * RING_RADIUS, CIRC)

  return {
    inward,
    inHeading: Math.atan2(inward.y, inward.x),
    entryStart,
    entryLen,
    entryU: uOf(merge),
    exitStart: exitPoint,
    exitLen,
    exitU: uOf(exitPoint),
  }
}

const LEGS: Leg[] = [
  buildLeg({ x: CENTER, y: 0 }, { x: 0, y: 1 }), // north
  buildLeg({ x: VIEW_SIZE, y: CENTER }, { x: -1, y: 0 }), // east
  buildLeg({ x: CENTER, y: VIEW_SIZE }, { x: 0, y: -1 }), // south
  buildLeg({ x: 0, y: CENTER }, { x: 1, y: 0 }), // west
]

export class RoundaboutSim {
  private cars: Car[] = []
  private nextId = 1
  private spawnTimers: number[]
  private rand: () => number

  constructor(seed = 1) {
    this.rand = mulberry32(seed)
    // Stagger the first spawn on each road.
    this.spawnTimers = LEGS.map(() => this.rand() * 2)
  }

  /** Run the sim forward so the scene starts mid-flow, not empty. */
  warmUp(seconds = WARM_UP_SECONDS) {
    const dt = 1 / 30
    for (let t = 0; t < seconds; t += dt) this.step(dt)
    return this
  }

  step(dt: number) {
    for (let i = 0; i < LEGS.length; i++) {
      this.spawnTimers[i]! -= dt
      if (this.spawnTimers[i]! <= 0) {
        this.trySpawn(i)
        this.spawnTimers[i] = SPAWN_DELAY_MIN + this.rand() * SPAWN_DELAY_JITTER
      }
    }

    for (const car of this.cars) {
      const headroom = Math.max(0, this.gapAhead(car) - MIN_GAP)
      let target = Math.min(
        car.vMax,
        car.lane === "ring" ? RING_SPEED_CAP : Infinity,
        FOLLOW_GAIN * headroom,
      )
      // A held car brakes to a stop and sits; followers queue behind it
      // through the normal headway rule — same as any stopped leader.
      if (car.holdFor > 0) {
        car.holdFor -= dt
        target = 0
      }
      const dv = target - car.v
      car.v += Math.max(-BRAKE * dt, Math.min(ACCEL * dt, dv))
      this.advance(car, car.v * dt)
    }

    this.cars = this.cars.filter(
      (car) => car.lane !== "exit" || car.s < LEGS[car.leg]!.exitLen,
    )
  }

  snapshots(): CarSnapshot[] {
    return this.cars.map((car) => {
      const p = this.position(car)
      return {
        id: car.id,
        x: p.x,
        y: p.y,
        headingDeg: (this.heading(car) * 180) / Math.PI,
        opacity: this.opacity(car),
        color: car.color,
        length: car.length,
      }
    })
  }

  private trySpawn(leg: number) {
    if (this.cars.length >= MAX_CARS) return
    const blocked = this.cars.some(
      (c) => c.lane === "entry" && c.leg === leg && c.s < SPAWN_CLEARANCE,
    )
    if (blocked) return

    this.cars.push({
      id: this.nextId++,
      lane: "entry",
      leg,
      s: 0,
      // Screen-CCW ring: the next road around is leg − 1; go 1–3 quarters.
      exitLeg: mod(leg - 1 - Math.floor(this.rand() * 3), 4),
      v: SPAWN_SPEED,
      vMax: CRUISE_MIN + this.rand() * CRUISE_JITTER,
      color: this.rand(),
      length: CAR_LENGTH_MIN + this.rand() * CAR_LENGTH_JITTER,
      holdFor: 0,
    })
  }

  /** Pull a car over: it brakes to a stop and sits for `seconds`. */
  holdCar(id: number, seconds: number) {
    const car = this.cars.find((c) => c.id === id)
    if (car) car.holdFor = Math.max(car.holdFor, seconds)
  }

  /** Free distance to the nearest obstacle ahead in this car's lane. */
  private gapAhead(car: Car): number {
    let gap = Infinity
    for (const other of this.cars) {
      if (other === car) continue
      let d = Infinity
      if (car.lane === "ring" && other.lane === "ring") {
        d = mod(other.s - car.s, CIRC)
      } else if (
        car.lane === "ring" &&
        other.lane === "exit" &&
        other.s < EXIT_CLEARANCE
      ) {
        // Still clearing the carriageway: hold followers behind the point
        // where it left the ring, plus however far it has pulled away.
        d = mod(LEGS[other.leg]!.exitU + other.s - car.s, CIRC)
      } else if (
        car.lane === "entry" &&
        other.lane === "ring" &&
        mod(other.s - LEGS[car.leg]!.entryU, CIRC) < 30
      ) {
        // A ring car sitting just past this car's merge is a physical
        // obstacle even for a committed enterer — commitment waives the
        // yield, not the brakes. (Matters when traffic stops on the ring,
        // e.g. a pulled-over car.)
        d =
          LEGS[car.leg]!.entryLen -
          car.s +
          mod(other.s - LEGS[car.leg]!.entryU, CIRC)
      } else if (
        car.lane === other.lane &&
        car.leg === other.leg &&
        other.s > car.s
      ) {
        d = other.s - car.s
      }
      gap = Math.min(gap, d - (other.length + car.length) / 2)
    }

    if (car.lane === "entry") {
      const leg = LEGS[car.leg]!
      const toMerge = leg.entryLen - car.s
      // Yield only between the zone edge and the stop line. Past the line
      // the car is committed: braking there would park it straddling the
      // carriageway, which is worse than finishing the merge.
      if (
        toMerge < YIELD_ZONE &&
        toMerge > YIELD_LINE &&
        !this.mergeIsClear(leg)
      ) {
        gap = Math.min(gap, toMerge - YIELD_LINE)
      }
    }
    return gap
  }

  private mergeIsClear(leg: Leg): boolean {
    return !this.cars.some((other) => {
      if (other.lane !== "ring") return false
      const upstream = mod(leg.entryU - other.s, CIRC)
      const past = mod(other.s - leg.entryU, CIRC)
      return upstream < MERGE_GAP || past < MERGE_CLEAR
    })
  }

  private advance(car: Car, ds: number) {
    if (car.lane === "entry") {
      const leg = LEGS[car.leg]!
      car.s += ds
      if (car.s >= leg.entryLen) {
        car.lane = "ring"
        car.s = mod(leg.entryU + (car.s - leg.entryLen), CIRC)
      }
      return
    }
    if (car.lane === "ring") {
      const exitU = LEGS[car.exitLeg]!.exitU
      const toExit = mod(exitU - car.s, CIRC)
      if (ds >= toExit) {
        car.lane = "exit"
        car.leg = car.exitLeg
        car.s = ds - toExit
      } else {
        car.s = mod(car.s + ds, CIRC)
      }
      return
    }
    car.s += ds
  }

  private position(car: Car): Vec {
    if (car.lane === "ring") return ringPoint(car.s)
    const leg = LEGS[car.leg]!
    if (car.lane === "entry") {
      return {
        x: leg.entryStart.x + car.s * leg.inward.x,
        y: leg.entryStart.y + car.s * leg.inward.y,
      }
    }
    return {
      x: leg.exitStart.x - car.s * leg.inward.x,
      y: leg.exitStart.y - car.s * leg.inward.y,
    }
  }

  /**
   * Body heading is the lane's direction, swept smoothly across the merge
   * and exit corners: the sweep runs TURN_ZONE px either side of the corner,
   * so it is a pure function of position — no per-frame rotation state. The
   * eased blend peaks mid-corner and settles gently at both ends.
   */
  private heading(car: Car): number {
    const leg = LEGS[car.leg]!
    if (car.lane === "entry") {
      const t = (car.s - leg.entryLen + TURN_ZONE) / (2 * TURN_ZONE)
      if (t <= 0) return leg.inHeading
      return mixAngle(leg.inHeading, ringHeading(leg.entryU), smoothstep(t))
    }
    if (car.lane === "exit") {
      const out = leg.inHeading + Math.PI
      const t = 0.5 + car.s / (2 * TURN_ZONE)
      if (t >= 1) return out
      return mixAngle(ringHeading(leg.exitU), out, smoothstep(t))
    }
    const h = ringHeading(car.s)
    const sinceMerge = mod(car.s - leg.entryU, CIRC)
    if (sinceMerge < TURN_ZONE) {
      const t = 0.5 + sinceMerge / (2 * TURN_ZONE)
      return mixAngle(leg.inHeading, h, smoothstep(t))
    }
    const exit = LEGS[car.exitLeg]!
    const toExit = mod(exit.exitU - car.s, CIRC)
    if (toExit < TURN_ZONE) {
      const t = 0.5 - toExit / (2 * TURN_ZONE)
      return mixAngle(h, exit.inHeading + Math.PI, smoothstep(t))
    }
    return h
  }

  /** Eased fade near the offscreen ends of the entry and exit legs. */
  private opacity(car: Car): number {
    if (car.lane === "ring") return 1
    const toEdge =
      car.lane === "entry" ? car.s : LEGS[car.leg]!.exitLen - car.s
    return smoothstep(Math.max(0, Math.min(1, toEdge / FADE_DIST)))
  }
}
