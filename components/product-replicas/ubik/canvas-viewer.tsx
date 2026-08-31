'use client'

import { useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react'
import { Maximize2, Minus, Plus, X } from 'lucide-react'
import { CANVAS, type Waypoint } from '@/lib/ubik-canvas'

/**
 * A pan and zoom window onto the Ubik design canvas.
 *
 * The whole board is one static SVG in `public/`, so the page ships no geometry
 * and React never sees the two thousand elements inside it. The browser gets a
 * single cacheable file and does the drawing.
 *
 * Keeping it sharp is the interesting part. An SVG in an `<img>` is rasterised
 * at its layout size, so scaling it with a CSS transform blows the same bitmap
 * up and the handwriting goes soft. Re-laying it out on every wheel tick would
 * be sharp but would also re-raster four megabytes mid-gesture.
 *
 * So the two are separated. `scale` is what you see and rides on the compositor
 * during the gesture; `raster` is the size the image is actually laid out at,
 * and it catches up once you stop moving. The transform applied is their ratio,
 * which means it settles to exactly 1 and the canvas resolves to full detail at
 * rest. Panning never touches either, so dragging is always a straight
 * translate.
 */

const MIN_SCALE = 0.004
const MAX_SCALE = 2.5
const PAD = 0.055
/** Long enough to sit out a wheel gesture, short enough to feel immediate. */
const SETTLE_MS = 180

type View = {
  scale: number
  /** Canvas origin in viewport pixels. */
  x: number
  y: number
  /** The scale the image is currently rasterised at. */
  raster: number
  /** Animate the next transform (waypoint jumps and button zooms). */
  tween: boolean
}

type Size = { w: number; h: number }

type Action =
  /** Frame a box, or the whole board when none is given. */
  | { type: 'fit'; size: Size; box?: Waypoint }
  | { type: 'pan'; dx: number; dy: number }
  | { type: 'zoom'; factor: number; px: number; py: number; tween?: boolean }
  | { type: 'goto'; box: Waypoint; size: Size }
  /** The frame changed shape: hold the centre still and keep the scale. */
  | { type: 'recentre'; from: Size; to: Size }
  | { type: 'raster' }

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

function fitView(size: Size, box: { x: number; y: number; w: number; h: number }): View {
  const scale = clamp(
    Math.min(size.w / (box.w * (1 + PAD * 2)), size.h / (box.h * (1 + PAD * 2))),
    MIN_SCALE,
    MAX_SCALE
  )
  return {
    scale,
    x: size.w / 2 - (box.x + box.w / 2) * scale,
    y: size.h / 2 - (box.y + box.h / 2) * scale,
    raster: scale,
    tween: false,
  }
}

/**
 * Keeps the board from being flung off screen: wherever you stop, some of it is
 * still under the pointer.
 */
function clampPan(v: View, size: Size): View {
  const w = CANVAS.w * v.scale
  const h = CANVAS.h * v.scale
  const slackX = Math.min(size.w * 0.85, w * 0.85)
  const slackY = Math.min(size.h * 0.85, h * 0.85)
  return {
    ...v,
    x: clamp(v.x, size.w - w - slackX, slackX),
    y: clamp(v.y, size.h - h - slackY, slackY),
  }
}

function reducer(state: View, action: Action): View {
  switch (action.type) {
    case 'fit':
      return fitView(action.size, action.box ?? { x: 0, y: 0, w: CANVAS.w, h: CANVAS.h })

    case 'pan':
      return { ...state, x: state.x + action.dx, y: state.y + action.dy, tween: false }

    case 'zoom': {
      const next = clamp(state.scale * action.factor, MIN_SCALE, MAX_SCALE)
      const k = next / state.scale
      if (k === 1) return state
      return {
        ...state,
        scale: next,
        // Hold the point under the cursor still while the rest grows around it.
        x: action.px - (action.px - state.x) * k,
        y: action.py - (action.py - state.y) * k,
        tween: Boolean(action.tween),
      }
    }

    case 'goto': {
      const fit = fitView(action.size, action.box)
      // Keep the current raster during the animation; committing it mid-tween
      // would relayout the image on every frame.
      return { ...fit, raster: state.raster, tween: true }
    }

    case 'recentre': {
      // Whatever was in the middle of the frame stays in the middle. Re-fitting
      // instead would throw away wherever the reader had navigated to, which on
      // a phone rotation is the last thing they want.
      return {
        ...state,
        x: state.x + (action.to.w - action.from.w) / 2,
        y: state.y + (action.to.h - action.from.h) / 2,
        tween: false,
      }
    }

    case 'raster':
      return state.raster === state.scale ? state : { ...state, raster: state.scale, tween: false }
  }
}

const INITIAL: View = { scale: 0.01, x: 0, y: 0, raster: 0.01, tween: false }

export function UbikCanvasViewer({ waypoints }: { waypoints: Waypoint[] }) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [view, dispatch] = useReducer(reducer, INITIAL)
  const [size, setSize] = useState<Size>({ w: 0, h: 0 })
  const [full, setFull] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  const sizeRef = useRef(size)
  sizeRef.current = size

  /**
   * The frame's size, read now rather than remembered.
   *
   * Every interaction goes through this, so a measurement taken before the
   * layout had settled can never survive into the geometry. Cached sizes are
   * only ever a fast path, never the source of truth.
   */
  const measured = useCallback((): Size => {
    const box = frameRef.current?.getBoundingClientRect()
    return box && box.width > 0 && box.height > 0
      ? { w: box.width, h: box.height }
      : sizeRef.current
  }, [])
  // Read through a ref so the one-shot landing effect below keeps a stable
  // dependency list; the waypoints themselves never change at runtime.
  const wpRef = useRef(waypoints)
  wpRef.current = waypoints
  const activeRef = useRef(active)
  activeRef.current = active
  /** Set when the frame is about to change shape and the view should re-frame. */
  const refit = useRef(false)
  /** Whether the reader has moved the board themselves. */
  const touched = useRef(false)

  /* ------------------------------------------------------------ measurement */
  // Measured straight off the element rather than through a ResizeObserver.
  // The frame only changes shape when the window does or when fullscreen is
  // toggled, and both of those are already events we handle, so an observer
  // would add a dependency whose failure mode is a viewer that opens at the
  // wrong scale with no way to recover.
  useLayoutEffect(() => {
    const measure = () => {
      const el = frameRef.current
      if (!el) return
      const box = el.getBoundingClientRect()
      if (box.width <= 0 || box.height <= 0) return
      const next = { w: box.width, h: box.height }
      const prev = sizeRef.current
      setSize(next)

      const reframe = () =>
        dispatch({
          type: 'fit',
          size: next,
          box: wpRef.current.find((w) => w.id === activeRef.current),
        })

      // Re-frame with the size we just read, not the one in state, which does
      // not exist yet on this pass.
      if (refit.current) {
        refit.current = false
        reframe()
        return
      }
      if (!prev.w || !prev.h || (prev.w === next.w && prev.h === next.h)) return
      // The frame changed size. Someone who has not touched the board yet is
      // still looking at the framing we chose, so re-derive it at the new size;
      // once they have moved, their position is theirs and only the centre is
      // preserved.
      if (touched.current) dispatch({ type: 'recentre', from: prev, to: next })
      else reframe()
    }
    measure()
    // A resize event is the usual signal, but it is not the only way a frame
    // ends up a different size than it was at mount, and a viewer stuck at the
    // wrong scale has no way to tell you. A couple of follow-up reads cost
    // nothing and close that gap.
    const frame = requestAnimationFrame(measure)
    const settle = window.setTimeout(measure, 300)
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(settle)
      window.removeEventListener('resize', measure)
    }
  }, [full])

  /* Fit once we know how big the window is, and again when it changes shape. */
  const fitted = useRef(false)
  useEffect(() => {
    if (!size.w || !size.h || fitted.current) return
    fitted.current = true
    // The board is taller than it is wide, so framing all of it inside a
    // landscape window opens on a strip too small to read. Start on the first
    // area instead, where there is something to look at. Fit is a button away.
    const first = wpRef.current[0]
    if (first) setActive(first.id)
    dispatch({ type: 'fit', size, box: first })
  }, [size])

  /* --------------------------------------------- commit the sharp render */
  useEffect(() => {
    if (view.raster === view.scale) return
    const id = window.setTimeout(() => dispatch({ type: 'raster' }), SETTLE_MS)
    return () => window.clearTimeout(id)
  }, [view.scale, view.raster])

  /* --------------------------------------------------------------- gestures */
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const pinch = useRef(0)

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      pinch.current = Math.hypot(a!.x - b!.x, a!.y - b!.y)
    }
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId)
    if (!prev) return
    const next = { x: e.clientX, y: e.clientY }
    pointers.current.set(e.pointerId, next)

    if (pointers.current.size >= 2) {
      const [a, b] = [...pointers.current.values()]
      const dist = Math.hypot(a!.x - b!.x, a!.y - b!.y)
      if (pinch.current > 0 && dist > 0) {
        const rect = frameRef.current?.getBoundingClientRect()
        dispatch({
          type: 'zoom',
          factor: dist / pinch.current,
          px: (a!.x + b!.x) / 2 - (rect?.left ?? 0),
          py: (a!.y + b!.y) / 2 - (rect?.top ?? 0),
        })
      }
      pinch.current = dist
      return
    }
    touched.current = true
    dispatch({ type: 'pan', dx: next.x - prev.x, dy: next.y - prev.y })
    setActive(null)
  }, [])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinch.current = 0
  }, [])

  /* Wheel has to be non-passive to stop the page scrolling underneath, and
     React attaches its own listener passively, so this one is manual. */
  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = el.getBoundingClientRect()
      touched.current = true
      const step = e.ctrlKey ? 0.012 : 0.0022 // trackpad pinch reports ctrlKey
      dispatch({
        type: 'zoom',
        factor: Math.exp(-e.deltaY * step),
        px: e.clientX - rect.left,
        py: e.clientY - rect.top,
      })
      setActive(null)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  /* ------------------------------------------------------------ navigation */
  const goto = useCallback(
    (wp: Waypoint) => {
      const s = measured()
      if (!s.w) return
      // A waypoint jump is a framing we chose, so a later resize re-derives it.
      touched.current = false
      setActive(wp.id)
      dispatch({ type: 'goto', box: wp, size: s })
    },
    [measured]
  )

  const nudge = useCallback(
    (factor: number) => {
      touched.current = true
      const s = measured()
      dispatch({ type: 'zoom', factor, px: s.w / 2, py: s.h / 2, tween: true })
    },
    [measured]
  )

  const reset = useCallback(() => {
    touched.current = false
    setActive(null)
    dispatch({ type: 'fit', size: measured() })
  }, [measured])

  /* Escape leaves fullscreen; the page must not scroll behind it. */
  useEffect(() => {
    if (!full) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setFull(false)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [full])

  const ratio = view.scale / view.raster
  const current = waypoints.find((w) => w.id === active)

  return (
    <div className={full ? 'fixed inset-0 z-[200] bg-background p-3 sm:p-5' : ''}>
      <div className={full ? 'flex h-full flex-col gap-3' : ''}>
        <div
          ref={frameRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={`relative cursor-grab touch-none select-none overflow-hidden rounded-xl border border-border/80 bg-[#121212] active:cursor-grabbing ${
            full ? 'min-h-0 flex-1' : 'h-[clamp(340px,58vh,560px)]'
          }`}
        >
          {/* Deferred with the browser's own lazy loading rather than an
              observer in here. Four megabytes should not be fetched for a
              reader who never reaches this section, but a hand-rolled gate can
              miss its signal and strand the panel on "loading" with no way out.
              This cannot: a browser without the attribute simply fetches it
              straight away. */}
          {
            /* eslint-disable-next-line @next/next/no-img-element -- one static
               vector asset, deliberately not run through the image optimiser:
               rasterising it would defeat the entire point of zooming in. */
            <img
              src="/ubik/ubik-canvas.svg"
              loading="lazy"
              alt="The Ubik Drive product design canvas: landing page explorations, user story wireframes, and review notes drawn across one board."
              draggable={false}
              decoding="async"
              onLoad={() => setLoaded(true)}
              style={{
                width: CANVAS.w * view.raster,
                height: CANVAS.h * view.raster,
                transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${ratio})`,
                transformOrigin: '0 0',
                transition: view.tween ? 'transform 560ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
                opacity: loaded ? 1 : 0,
              }}
              className="pointer-events-none absolute left-0 top-0 max-w-none"
            />
          }

          {!loaded && (
            <div className="absolute inset-0 grid place-items-center">
              <span className="text-[11px] font-light tracking-wide text-white/35">
                loading the board
              </span>
            </div>
          )}

          {/* Controls sit above the board rather than beside it, so the drawing
              keeps the full width on a phone. */}
          <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-lg border border-white/10 bg-black/55 p-1 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => nudge(1 / 1.5)}
              aria-label="Zoom out"
              className="grid h-7 w-7 place-items-center rounded text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => nudge(1.5)}
              aria-label="Zoom in"
              className="grid h-7 w-7 place-items-center rounded text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded px-2 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              Fit
            </button>
            <button
              type="button"
              onClick={() => {
                refit.current = true
                setFull((v) => !v)
              }}
              aria-label={full ? 'Exit fullscreen' : 'Open fullscreen'}
              className="grid h-7 w-7 place-items-center rounded text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              {full ? <X className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </button>
          </div>

          <p className="pointer-events-none absolute bottom-2.5 left-3 text-[10px] font-light text-white/25">
            drag to move
            <span className="hidden sm:inline"> · scroll to zoom</span>
            <span className="sm:hidden"> · pinch to zoom</span>
          </p>
        </div>

        {/* The waypoints. Rendered by the server; this only tracks which one you
            last jumped to. */}
        <div className={full ? 'shrink-0' : 'mt-3'}>
          <div className="flex flex-wrap gap-1.5">
            {waypoints.map((wp) => (
              <button
                key={wp.id}
                type="button"
                onClick={() => goto(wp)}
                aria-pressed={active === wp.id}
                className={`rounded-md border px-2.5 py-1 text-[11px] font-light tracking-wide transition-colors ${
                  active === wp.id
                    ? 'border-[var(--select)]/50 bg-[var(--select)]/10 text-[var(--select)]'
                    : 'border-border/70 text-muted-foreground/70 hover:border-foreground/30 hover:text-foreground'
                }`}
              >
                {wp.label}
              </button>
            ))}
          </div>
          <p
            className={`mt-2 text-[12px] font-light leading-relaxed text-muted-foreground/75 ${
              full ? 'line-clamp-2' : 'min-h-[3.4em]'
            }`}
          >
            {current?.note ?? 'Pick an area to fly to it, or drag straight into the board.'}
          </p>
        </div>
      </div>
    </div>
  )
}
