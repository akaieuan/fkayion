'use client'

import { useMemo, useState } from 'react'
import { Chip, conditionColor } from './primitives'

/**
 * The logging-history calendar.
 *
 * Depth means *how much was logged*; hue means *which thing was tracked*.
 * Neither ever means "worse" — that rule is the whole product, and this grid is
 * where it's most visible. Days with nothing logged render as `--inset`,
 * visibly: gaps read as gaps.
 */

const CONDITIONS = ['psoriasis', 'jaw acne', 'hand eczema'] as const
const DEPTHS = [0.26, 0.5, 0.74, 1]

type Day = { count: number; condition: string | null; future: boolean }

/** A stable, plausible 13 weeks — deterministic so it never flickers. */
function buildDays(weeks: number): Day[] {
  const days: Day[] = []
  const total = weeks * 7
  // Leave the last few cells as future so the grid shows blank, not "missed".
  const futureFrom = total - 3
  let h = 1337
  const rnd = () => {
    h = (Math.imul(h, 1664525) + 1013904223) >>> 0
    return h / 0xffffffff
  }
  for (let i = 0; i < total; i++) {
    if (i >= futureFrom) {
      days.push({ count: 0, condition: null, future: true })
      continue
    }
    const r = rnd()
    // Denser recently — the record grows as the habit sticks.
    const bias = 0.28 + 0.42 * (i / total)
    const count = r > 1 - bias ? 1 + Math.floor(rnd() * 3) : 0
    days.push({
      count,
      condition: count ? CONDITIONS[Math.floor(rnd() * CONDITIONS.length)]! : null,
      future: false,
    })
  }
  return days
}

export function ActivityGrid({
  weeks = 13,
  cell = 13,
  palette: controlled,
  showToggle = true,
  hue,
  label = 'logging history',
}: {
  weeks?: number
  cell?: number
  palette?: 'shading' | 'tracked'
  showToggle?: boolean
  /** Force one hue (used by the per-condition mini grids). */
  hue?: string
  label?: string
}) {
  const [internal, setInternal] = useState<'shading' | 'tracked'>('shading')
  const palette = controlled ?? internal
  const days = useMemo(() => buildDays(weeks), [weeks])

  const gap = cell * 0.22
  const radius = cell * 0.26
  const logged = days.filter((d) => d.count > 0).length

  return (
    <div>
      {showToggle && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          <Chip label="shading" active={palette === 'shading'} onClick={() => setInternal('shading')} />
          <Chip label="colour" active={palette === 'tracked'} onClick={() => setInternal('tracked')} />
        </div>
      )}

      <div
        role="img"
        aria-label={`${label}: ${logged} days logged across the last ${weeks} weeks`}
        style={{ display: 'flex', gap, overflowX: 'auto' }}
        className="bl-scroll"
      >
        {Array.from({ length: weeks }, (_, w) => (
          <div key={w} style={{ display: 'flex', flexDirection: 'column', gap }}>
            {Array.from({ length: 7 }, (_, d) => {
              const day = days[w * 7 + d]!
              const depth = DEPTHS[Math.min(day.count, 4) - 1]
              const fill = day.future
                ? 'transparent'
                : day.count === 0
                  ? 'var(--inset)'
                  : hue
                    ? hue
                    : palette === 'shading'
                      ? 'var(--blue)'
                      : conditionColor(day.condition!)
              return (
                <div
                  key={d}
                  aria-hidden
                  style={{
                    width: cell,
                    height: cell,
                    borderRadius: radius,
                    background: fill,
                    opacity: day.count > 0 ? depth : 1,
                    transition: 'background 180ms ease-out, opacity 180ms ease-out',
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>

      {/* In `tracked` mode the legend is drawn in ink steps — a blue key would
          claim the ramp is blue. */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
        <span className="bl-micro">less</span>
        {DEPTHS.map((d) => (
          <span
            key={d}
            aria-hidden
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              background: palette === 'tracked' ? 'var(--ink3)' : 'var(--blue)',
              opacity: d,
            }}
          />
        ))}
        <span className="bl-micro">more</span>
      </div>
    </div>
  )
}
