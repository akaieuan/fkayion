'use client'

/**
 * BodyLog primitives, ported from the shipping app's pixel engine.
 *
 * Everything here is a character grid or a deterministic function — no icon
 * fonts, no image assets. Adding an icon means adding a grid.
 */

import { useMemo } from 'react'

/* ------------------------------------------------------------------ colour */

export const HUE_VARS = ['--blue', '--green', '--amber', '--rose', '--violet'] as const

/**
 * Deterministic 64-bit FNV-1a of the condition name, mod 5.
 *
 * Deterministic matters: the stock language hash is seeded per launch, which
 * would repaint someone's whole history on every open. The same condition must
 * be the same colour on every card, page and reload.
 */
export function conditionIndex(name: string): number {
  // BigInt(...) rather than n-literals so the project's build target is untouched.
  const OFFSET = BigInt('0xcbf29ce484222325')
  const PRIME = BigInt('0x100000001b3')
  const MASK = BigInt('0xffffffffffffffff')
  const FIVE = BigInt(5)
  let h = OFFSET
  for (const b of new TextEncoder().encode(name.trim().toLowerCase())) {
    h = ((h ^ BigInt(b)) * PRIME) & MASK
  }
  return Number(h % FIVE)
}

export function conditionColor(name: string): string {
  return `var(${HUE_VARS[conditionIndex(name)]})`
}

/* ------------------------------------------------------------- pixel glyph */

/** 8×8 UI glyphs, verbatim from `PixelArt.icons`. Monochrome by rule. */
const ICONS: Record<string, string[]> = {
  today: ['........', '.##..##.', '.##..##.', '........', '.##..##.', '.##..##.', '........', '........'],
  body: ['...##...', '...##...', '.######.', '.######.', '...##...', '..#..#..', '..#..#..', '..#..#..'],
  photos: ['........', '...##...', '.######.', '########', '##.##.##', '##.##.##', '########', '........'],
  notes: ['........', '.######.', '........', '.######.', '........', '.####...', '........', '........'],
  you: ['..####..', '.######.', '.######.', '..####..', '........', '.######.', '#######.', '########'],
  lock: ['..####..', '.##..##.', '.##..##.', '########', '###..###', '###..###', '########', '........'],
  search: ['.####...', '#....#..', '#....#..', '#....#..', '.####...', '....##..', '.....##.', '........'],
  close: ['........', '.#....#.', '..#..#..', '...##...', '...##...', '..#..#..', '.#....#.', '........'],
  camera: ['........', '...##...', '.######.', '########', '##.##.##', '##.##.##', '########', '........'],
}

/** 8×8 badge art. `a` cells take the amber accent — the one accent allowed. */
const BADGES: Record<string, string[]> = {
  return: ['........', '..####..', '.##..##.', '##....#.', '#....##.', '.##..##.', '..####..', '........'],
  pair: ['........', '.##..##.', '####.###', '####.###', '.##..##.', '........', '.######.', '........'],
  full: ['########', '#......#', '#.a..a.#', '#......#', '#.a..a.#', '#......#', '#......#', '########'],
  tag: ['..#####.', '.##...##', '##.a...#', '#......#', '#......#', '.##...##', '..#####.', '........'],
  cross: ['..####..', '..####..', '######..', '########', '########', '..####..', '..####..', '........'],
  flame: ['...#....', '..##....', '.####...', '.#####..', '##a###..', '##aa##..', '.####...', '..##....'],
  pin: ['..###...', '.#####..', '.##a##..', '.#####..', '..###...', '...#....', '...#....', '........'],
  eye: ['........', '..####..', '.#....#.', '#..aa..#', '#..aa..#', '.#....#.', '..####..', '........'],
  pen: ['......##', '.....###', '....###.', '...###..', '..###...', '.###....', '##......', '#.......'],
  star: ['...#....', '...#....', '.#####..', '..###...', '.##.##..', '.#...#..', '........', '........'],
}

export function PixelGlyph({
  name,
  size = 16,
  color = 'currentColor',
  amber,
  set = 'icon',
}: {
  name: string
  size?: number
  color?: string
  /** Colour for `a` cells in badge grids. */
  amber?: string
  set?: 'icon' | 'badge'
}) {
  const rows = (set === 'badge' ? BADGES : ICONS)[name]
  if (!rows) return null
  const n = rows.length
  const cell = 100 / n
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden focusable="false">
      {rows.map((row, j) =>
        [...row].map((ch, i) => {
          if (ch === '.') return null
          const fill = ch === 'a' ? (amber ?? 'var(--amber)') : color
          return (
            // 2% overlap so no hairline seam shows at fractional scales.
            <rect
              key={`${i}-${j}`}
              x={i * cell}
              y={j * cell}
              width={cell * 1.02}
              height={cell * 1.02}
              fill={fill}
            />
          )
        }),
      )}
    </svg>
  )
}

/** The capture glyph: a 5×5 plus in the mark's own geometry. */
export function CaptureGlyph({ size = 20, color = 'var(--inverse)' }: { size?: number; color?: string }) {
  const on = new Set(['2,0', '2,1', '0,2', '1,2', '2,2', '3,2', '4,2', '2,3', '2,4'])
  const unit = 100 / (5 + 4 * 0.24)
  const gap = unit * 0.24
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden focusable="false">
      {[0, 1, 2, 3, 4].map((j) =>
        [0, 1, 2, 3, 4].map((i) =>
          on.has(`${i},${j}`) ? (
            <rect
              key={`${i}-${j}`}
              x={i * (unit + gap)}
              y={j * (unit + gap)}
              width={unit}
              height={unit}
              rx={unit * 0.22}
              fill={color}
            />
          ) : null,
        ),
      )}
    </svg>
  )
}

/* -------------------------------------------------------------------- chip */

export function Chip({
  label,
  active = false,
  dot,
  onClick,
  dashed = false,
}: {
  label: string
  active?: boolean
  /** A condition colour for the leading dot. */
  dot?: string
  onClick?: () => void
  dashed?: boolean
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className="bl-press"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        borderRadius: 999,
        border: `1px ${dashed ? 'dashed' : 'solid'} var(--rule-soft)`,
        background: active ? 'var(--ink1)' : 'transparent',
        color: active ? 'var(--inverse)' : 'var(--ink3)',
        fontSize: 12,
        fontWeight: active ? 500 : 300,
        cursor: onClick ? 'pointer' : 'default',
        lineHeight: 1.2,
      }}
    >
      {dot && (
        <span
          style={{ width: 6, height: 6, borderRadius: 999, background: dot, flexShrink: 0 }}
          aria-hidden
        />
      )}
      {label}
    </button>
  )
}

/* ------------------------------------------------------------ rating dots */

/** Five dots; 5 is the good end ("clear"). Never coloured. */
export function RatingDots({ value, size = 6 }: { value: number; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 4 }} aria-label={`${value} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          aria-hidden
          style={{
            width: size,
            height: size,
            borderRadius: 999,
            background: i <= value ? 'var(--ink2)' : 'transparent',
            border: i <= value ? 'none' : '1px solid var(--rule)',
          }}
        />
      ))}
    </span>
  )
}

/* -------------------------------------------------------------- entry tile */

/** Deterministic 0–1 from a string+index — tiles must not change on re-sort. */
function jitter(seed: string, i: number) {
  let h = 2166136261
  const s = `${seed}:${i}`
  for (let k = 0; k < s.length; k++) {
    h ^= s.charCodeAt(k)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % 1000) / 1000
}

/**
 * The photo stand-in: the mark's 5×5 grid with every cell filled.
 *
 * The mark has gaps because a record has gaps; a tile is one entry, and an
 * entry has no gaps. Lists show these rather than photographs by default, so
 * the app is safe to scroll in public without changing a setting.
 */
export function EntryTile({
  seed,
  accent,
  size = 44,
}: {
  seed: string
  accent: string
  size?: number
}) {
  const cells = useMemo(() => {
    const dir = Math.floor(jitter(seed, 99) * 4) // wash direction
    const out: number[] = []
    for (let j = 0; j < 5; j++) {
      for (let i = 0; i < 5; i++) {
        const t = dir === 0 ? i / 4 : dir === 1 ? j / 4 : dir === 2 ? 1 - i / 4 : 1 - j / 4
        const level = Math.max(0, Math.min(1, t * 0.75 + jitter(seed, j * 5 + i) * 0.25))
        out.push(0.24 + 0.72 * level)
      }
    }
    return out
  }, [seed])

  const unit = 100 / (5 + 4 * 0.24)
  const gap = unit * 0.24
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden focusable="false">
      {cells.map((op, k) => {
        const i = k % 5
        const j = Math.floor(k / 5)
        return (
          <rect
            key={k}
            x={i * (unit + gap)}
            y={j * (unit + gap)}
            width={unit}
            height={unit}
            rx={unit * 0.22}
            fill={accent}
            fillOpacity={op}
          />
        )
      })}
    </svg>
  )
}
