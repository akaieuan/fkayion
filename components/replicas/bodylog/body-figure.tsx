'use client'

import { useMemo, useState } from 'react'
import figure from './figure.json'
import { conditionColor } from './primitives'

/**
 * The body figure — the app's own vector anatomy, rasterised.
 *
 * 1,264 cells on a 34×85 grid, exported from the shipping app rather than
 * re-drawn, so the portfolio figure and the app's picker are the same body.
 * Edge cells render a step darker than the interior — that darker rim *is* the
 * outline; the silhouette is never stroked.
 *
 * Left and right limbs are separate sections: clicking one forearm must not
 * mirror to the other, because "my left elbow" is a different answer from
 * "my right".
 */

type Cell = [number, number, number, number] // x, y, sectionIndex, isEdge
const CELLS = figure.cells as Cell[]
const SECTIONS = figure.sections as string[]
const DIVIDERS = figure.dividers as number[][]
const COLS = figure.columns
const ROWS = figure.rows

/** Human-readable names for the hit targets. */
const LABELS: Record<string, string> = {
  scalp: 'scalp',
  neck: 'neck',
  chest: 'chest',
  waist: 'waist',
  groin: 'groin',
  innerElbowsL: 'left inner elbow',
  innerElbowsR: 'right inner elbow',
  forearmsL: 'left forearm',
  forearmsR: 'right forearm',
  handsL: 'left hand',
  handsR: 'right hand',
  kneesL: 'left knee',
  kneesR: 'right knee',
  lowerLegsL: 'left lower leg',
  lowerLegsR: 'right lower leg',
  feetL: 'left foot',
  feetR: 'right foot',
}

/** A plausible demo history — which sections carry heat, and from what. */
const HEAT: Record<string, { condition: string; intensity: number }> = {
  innerElbowsL: { condition: 'psoriasis', intensity: 1 },
  innerElbowsR: { condition: 'psoriasis', intensity: 0.55 },
  kneesR: { condition: 'psoriasis', intensity: 0.7 },
  handsL: { condition: 'hand eczema', intensity: 0.85 },
  scalp: { condition: 'psoriasis', intensity: 0.4 },
}

export function BodyFigure({
  mode = 'heat',
  width = 240,
  onSelect,
}: {
  mode?: 'heat' | 'picker'
  width?: number
  onSelect?: (section: string | null) => void
}) {
  const [picked, setPicked] = useState<Set<string>>(new Set())
  const [focused, setFocused] = useState<string | null>(null)

  const cellSize = width / COLS
  const height = cellSize * ROWS
  const r = cellSize * 0.22
  const gap = cellSize * 0.14

  /** Group cells by section so a whole limb is one hit target. */
  const bySection = useMemo(() => {
    const m = new Map<string, Cell[]>()
    for (const c of CELLS) {
      const name = SECTIONS[c[2]]!
      const arr = m.get(name)
      if (arr) arr.push(c)
      else m.set(name, [c])
    }
    return m
  }, [])

  function toggle(section: string) {
    if (mode !== 'picker') {
      setFocused((f) => (f === section ? null : section))
      onSelect?.(focused === section ? null : section)
      return
    }
    setPicked((prev) => {
      const next = new Set(prev)
      if (next.has(section)) next.delete(section)
      else next.add(section)
      onSelect?.(next.size ? [...next].join(', ') : null)
      return next
    })
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${COLS * cellSize} ${ROWS * cellSize}`}
      style={{ display: 'block', margin: '0 auto', overflow: 'visible' }}
      role="group"
      aria-label={mode === 'picker' ? 'body map — pick where it is showing up' : 'body map — where entries are logged'}
    >
      {[...bySection.entries()].map(([section, cells]) => {
        const isPicked = picked.has(section)
        const heat = mode === 'heat' ? HEAT[section] : undefined
        const isFocused = focused === section

        return (
          <g
            key={section}
            role="button"
            tabIndex={0}
            aria-label={LABELS[section] ?? section}
            aria-pressed={mode === 'picker' ? isPicked : undefined}
            onClick={() => toggle(section)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                toggle(section)
              }
            }}
            style={{ cursor: 'pointer', outline: 'none' }}
          >
            {cells.map(([x, y, , isEdge], k) => {
              // Selection is the one accent-spend in the picker.
              let fill = 'var(--ink1)'
              let opacity = isEdge ? 0.2 : 0.11

              if (isPicked) {
                fill = 'var(--green)'
                opacity = isEdge ? 1 : 0.82
              } else if (heat) {
                fill = conditionColor(heat.condition)
                opacity = (isEdge ? 0.95 : 0.75) * heat.intensity
              } else if (isFocused) {
                opacity = isEdge ? 0.36 : 0.22
              }

              return (
                <rect
                  key={k}
                  x={x * cellSize + gap / 2}
                  y={y * cellSize + gap / 2}
                  width={cellSize - gap}
                  height={cellSize - gap}
                  rx={r}
                  ry={r}
                  fill={fill}
                  fillOpacity={opacity}
                  style={{ transition: 'fill-opacity 150ms ease-out' }}
                />
              )
            })}
          </g>
        )
      })}

      {/* Picker only: a heavier line wherever two sections meet — never around
          the outside, which the darker rim already handles. */}
      {mode === 'picker' &&
        DIVIDERS.map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1! * cellSize}
            y1={y1! * cellSize}
            x2={x2! * cellSize}
            y2={y2! * cellSize}
            stroke="var(--ink2)"
            strokeWidth={cellSize * 0.34}
            strokeLinecap="round"
            opacity={0.5}
          />
        ))}
    </svg>
  )
}
