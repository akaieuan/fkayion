/**
 * The prototype's state shape, its one derived dataset, and the three style
 * helpers the screens share.
 *
 * The activity history is computed once at module load rather than per render:
 * it is a pure function of the hash in `data.ts`, so it never changes, and
 * hoisting it means the 371-cell grid is built exactly once for the whole page
 * instead of on every keystroke in the capture form.
 */
import type { CSSProperties } from 'react'
import { rnd } from './data'
import type { SpriteState, Body } from './pixel'

export type View =
  | 'today'
  | 'project'
  | 'body'
  | 'photos'
  | 'notes'
  | 'you'
  | 'sprite'
  | 'capture'
  | 'badge'

export type Draft = {
  area: string | null
  sev: number
  tags: string[]
  note: string
  tx: string
  trig: string[]
  light: string
  dist: string
}

export type State = {
  theme: 'dark' | 'light'
  view: View
  back: View | null
  pid: string
  capStep: 0 | 1 | 2
  capPid: string
  draft: Draft
  sprite: SpriteState
  body: Body
  zoom: number
  noteFilter: string
  photoFilter: string
  spriteTab: string
  lock: boolean
  blur: boolean
  remind: boolean
  cmp: number
  onboard: boolean
  obStep: number
  badge: string | null
  toast: { title: string; sub: string } | null
  ghost: boolean
  spot: string | null
}

export const INITIAL: State = {
  theme: 'dark',
  view: 'today',
  back: null,
  pid: 'acne',
  capStep: 0,
  capPid: 'psoriasis',
  draft: { area: null, sev: 3, tags: [], note: '', tx: '', trig: [], light: 'window', dist: 'close' },
  sprite: {
    form: 'circlehead',
    disc: 0,
    chExpr: 1,
    acc: ['glasses'],
    accC: 0,
    skin: 2,
    hair: 1,
    hairC: 1,
    expr: 1,
    outfit: 2,
    outfitC: 2,
    scene: 1,
    name: 'pip',
  },
  body: { sex: 'fem', side: 'front', h: 168, w: 64 },
  zoom: 1,
  noteFilter: 'all',
  photoFilter: 'all',
  spriteTab: 'face',
  lock: true,
  blur: true,
  remind: true,
  cmp: 50,
  onboard: false,
  obStep: 0,
  badge: null,
  toast: null,
  ghost: true,
  spot: null,
}

/* ---------- the logging history ---------- */

/** Five steps: nothing logged, then four depths of the one blue. */
const RAMP = [
  'var(--surface-inset)',
  'color-mix(in oklch, var(--accent-blue) 26%, var(--background))',
  'color-mix(in oklch, var(--accent-blue) 50%, var(--background))',
  'color-mix(in oklch, var(--accent-blue) 74%, var(--background))',
  'var(--accent-blue)',
]

export type Cell = { t: string; s: CSSProperties }

function buildActivity() {
  const DAYS = 371
  const cells: Cell[] = []
  let total = 0
  let active = 0
  for (let i = 0; i < DAYS; i++) {
    const r = rnd(i * 3.7)
    // The last four months are denser: the fixture is someone who has been at
    // it a while and recently got consistent.
    const recent = i > DAYS - 120 ? 0.22 : 0
    const v = r + recent
    let n = v > 0.93 ? 4 : v > 0.78 ? 3 : v > 0.58 ? 2 : v > 0.38 ? 1 : 0
    if (i > DAYS - 32) n = Math.max(1, n)
    total += n
    if (n) active++
    cells.push({
      t: n ? `${n} photo${n > 1 ? 's' : ''}` : 'nothing logged',
      s: {
        width: '8px',
        height: '8px',
        borderRadius: '2px',
        background: RAMP[n],
        border: n ? 'none' : '1px solid var(--rule-soft)',
        boxSizing: 'border-box',
      },
    })
  }
  let streak = 0
  for (let i = DAYS - 1; i >= 0 && cells[i].t !== 'nothing logged'; i--) streak++
  return { cells, cells26: cells.slice(-182), streak, total, active }
}

export const ACTIVITY = buildActivity()

export const LEGEND: CSSProperties[] = [0, 1, 2, 3, 4].map((n) => ({
  width: '9px',
  height: '9px',
  borderRadius: '2px',
  background: RAMP[n],
  border: n ? 'none' : '1px solid var(--rule-soft)',
  boxSizing: 'border-box',
}))

export const STATS = [
  { k: 'photos', v: String(ACTIVITY.total), sub: 'across 3 projects' },
  { k: 'days logged', v: String(ACTIVITY.active), sub: 'of 371' },
  { k: 'sites pinned', v: '8', sub: 'front and back' },
  { k: 'notes', v: '146', sub: 'your words' },
]

/* ---------- shared styles ---------- */

/** One card treatment: one border weight, no shadow, ever. */
export const CARD: CSSProperties = {
  border: '1px solid var(--rule-soft)',
  background: 'var(--surface-card)',
  borderRadius: '18px',
}

/** The only selected state in the system: ink fill, never an accent. */
export function chip(on: boolean, extra?: CSSProperties): CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    flex: 'none',
    padding: '6px 12px',
    borderRadius: '999px',
    fontFamily: 'var(--font-sans)',
    fontSize: '12px',
    fontWeight: 300,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    border: `1px solid ${on ? 'transparent' : 'var(--rule-soft)'}`,
    background: on ? 'var(--primary)' : 'transparent',
    color: on ? 'var(--primary-foreground)' : 'var(--text-3)',
    transition: 'all .15s',
    ...extra,
  }
}

/** The uppercase mono label, at the two sizes the prototype uses. */
export function micro(color = 'var(--text-5)', size = 9.5, tracking = '.18em'): CSSProperties {
  return {
    font: `500 ${size}px var(--font-mono)`,
    letterSpacing: tracking,
    textTransform: 'uppercase',
    color,
  }
}

export const DOT = (tone: string): CSSProperties => ({
  width: '7px',
  height: '7px',
  borderRadius: '999px',
  background: tone,
  display: 'inline-block',
  flex: 'none',
})
