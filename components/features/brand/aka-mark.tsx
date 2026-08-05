'use client'

import { useEffect, useRef } from 'react'
// The geometry lives in ./shapes so the server-rendered card fields draw from
// exactly the same knockouts this canvas does.
import { clamp01, hash, DISCIPLINES } from './shapes'

/**
 * The akaBuild hero mark. Same pixel-disc language as the studio family
 * (see ./pixel-head.tsx, the circleheads engine) but its own subject:
 * instead of a figure cycling expressions, the disc dissolves and each
 * reform reveals a different DISCIPLINE knocked out of it — AI spark,
 * code, music, procedural 3D, agent tooling, design. The glitch dissolve
 * is the discipline change.
 *
 * House behaviors kept from the engine: pixel color tracks --foreground
 * across theme flips, the loop pauses offscreen/on hidden tabs, and
 * reduced-motion renders one assembled frame.
 */

type AkaMarkProps = {
  /** Canvas CSS px. */
  size: number
  /** Cells across. */
  grid?: number
  /** Gap between pixels, as a fraction of a cell. */
  gap?: number
  /** Scale down with the container (canvas caps at `size`). */
  fluid?: boolean
  /** Seconds each discipline holds before dissolving. */
  hold?: number
  speed?: number
  className?: string
}



export function AkaMark({
  size,
  grid = 24,
  gap = 0.16,
  fluid = false,
  hold = 3.4,
  speed = 1,
  className,
}: AkaMarkProps) {
  const hostRef = useRef<HTMLSpanElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    const N = grid
    const figScale = 0.82
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = size * dpr
    canvas.height = size * dpr
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let fg = getComputedStyle(host).color
    const themeObserver = new MutationObserver(() => {
      fg = getComputedStyle(host).color
      if (reduced) paintStill()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    /* ---- sample cells per discipline ---------------------------------- */
    const cell = (size * dpr) / N
    type Cell = { x: number; y: number; seed: number; r1: number; delay: number }
    const cellSets: Cell[][] = DISCIPLINES.map((knockout) => {
      const cells: Cell[] = []
      for (let j = 0; j < N; j++) {
        for (let i = 0; i < N; i++) {
          const nx = ((i + 0.5) / N) * 2 - 1
          const ny = ((j + 0.5) / N) * 2 - 1
          const d = Math.sqrt(nx * nx + ny * ny)
          const on = d < 0.98 && !knockout(nx / figScale, ny / figScale)
          if (!on) continue
          const seed = i * 37 + j * 101
          const r1 = hash(seed)
          const delay = hash(Math.floor((ny + 1) * 6)) * 0.7 + r1 * 0.3
          cells.push({ x: i * cell, y: j * cell, seed, r1, delay })
        }
      }
      return cells
    })

    /* ---- timeline (seconds): reform → hold → dissolve → gone → next ---- */
    const REFORM = 1.7
    const DISSOLVE = 1.9
    const GONE = 0.5
    const TOTAL = REFORM + hold + DISSOLVE + GONE
    const SPREAD = 0.55
    const W = size * dpr
    const px = cell * (1 - gap)
    const off = (cell - px) / 2

    const drawCell = (c: Cell, t: number) => {
      // t: 0 assembled, 1 fully dissolved — the engine's glitch dissolve
      let x = c.x
      let y = c.y
      let a = 1
      if (t > 0) {
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
      ctx.fillRect(x + off, y + off, px, px)
    }

    const paintStill = () => {
      ctx.clearRect(0, 0, W, W)
      ctx.fillStyle = fg
      for (const c of cellSets[0]!) drawCell(c, 0)
      ctx.globalAlpha = 1
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      paintStill()
      return () => themeObserver.disconnect()
    }

    const t0 = performance.now()
    let raf = 0
    let visible = true

    const frame = (now: number) => {
      // rAF hands back the frame's *start* time, which can precede the t0 we
      // captured a moment ago — floor at zero or the first frame indexes
      // cellSets at -1 and the loop throws on an undefined set.
      const elapsed = Math.max(0, ((now - t0) / 1000) * speed)
      const cycle = Math.floor(elapsed / TOTAL)
      const time = elapsed % TOTAL
      const cells = cellSets[cycle % cellSets.length] ?? cellSets[0]!
      let g // 0 assembled -> 1 gone
      if (time < REFORM) g = 1 - time / REFORM
      else if (time < REFORM + hold) g = 0
      else if (time < REFORM + hold + DISSOLVE) g = (time - REFORM - hold) / DISSOLVE
      else g = 1

      ctx.clearRect(0, 0, W, W)
      ctx.fillStyle = fg
      for (const c of cells) drawCell(c, clamp01(g * (1 + SPREAD) - c.delay * SPREAD))
      ctx.globalAlpha = 1
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
    document.addEventListener('visibilitychange', sync)

    sync()
    return () => {
      stop()
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      themeObserver.disconnect()
    }
  }, [size, grid, gap, fluid, hold, speed])

  return (
    <span
      ref={hostRef}
      className={className}
      aria-hidden
      style={{
        display: 'inline-block',
        lineHeight: 0,
        color: 'var(--foreground)',
        ...(fluid ? { width: '100%', maxWidth: size } : null),
      }}
    >
      <canvas
        ref={canvasRef}
        style={
          fluid
            ? { width: '100%', height: 'auto', display: 'block' }
            : { width: size, height: size, display: 'block' }
        }
      />
    </span>
  )
}
