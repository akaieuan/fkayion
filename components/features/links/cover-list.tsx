'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

/**
 * A list whose rows show their artwork under the cursor.
 *
 * The previous version opened the cover in a fixed lane off to the right, which
 * put a picture of a record several hundred pixels from the name you were
 * pointing at. This follows the pointer instead, so the art arrives where you
 * are already looking.
 *
 * Position is written straight to the element inside a rAF rather than held in
 * state. A pointermove fires far more often than a frame, and putting the
 * coordinates through React would re-render the whole list on every one of
 * them; the only thing that actually belongs in state is which cover is
 * showing. Reads and writes are both kept inside the frame callback, so the
 * move never forces a synchronous layout.
 *
 * The whole behaviour is gated on a real pointer. On a touch screen there is no
 * hover to speak of, `:hover` latches after a tap, and there is nowhere sensible
 * to put a floating image, so the listener is never attached.
 */

export type CoverRow = {
  title: string
  meta: string
  href: string
  /** Artwork. Optional: a row without one simply shows nothing. */
  cover?: string
}

const SIZE = 232

export function CoverList({ items }: { items: CoverRow[] }) {
  const [cover, setCover] = useState<string | null>(null)
  const floatRef = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const point = useRef({ x: 0, y: 0 })
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setFine(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (!fine) return
      point.current = { x: e.clientX, y: e.clientY }
      if (frame.current) return
      frame.current = requestAnimationFrame(() => {
        frame.current = 0
        const el = floatRef.current
        if (!el) return
        // Held clear of the pointer, and flipped to whichever side has room, so
        // the art never covers the row it belongs to or runs off the viewport.
        const { x, y } = point.current
        const right = x + 28
        const left = x - 28 - SIZE
        const useLeft = right + SIZE > window.innerWidth - 16
        const top = Math.min(
          Math.max(y - SIZE / 2, 12),
          Math.max(window.innerHeight - SIZE - 12, 12)
        )
        el.style.transform = `translate3d(${useLeft ? left : right}px, ${top}px, 0)`
      })
    },
    [fine]
  )

  return (
    <div onPointerMove={onMove} onPointerLeave={() => setCover(null)}>
      <ul className="list-none p-0">
        {items.map((row) => (
          <li key={row.href}>
            <a
              href={row.href}
              target="_blank"
              rel="noopener noreferrer"
              onPointerEnter={() => setCover(row.cover ?? null)}
              onFocus={() => setCover(row.cover ?? null)}
              onBlur={() => setCover(null)}
              className="group block py-2.5"
            >
              <span className="text-[14px] font-light tracking-tight text-foreground/85 underline decoration-transparent underline-offset-[5px] transition-colors duration-200 group-hover:text-foreground group-hover:decoration-foreground/30">
                {row.title}
              </span>
              <span className="mt-0.5 block text-[12.5px] font-light leading-relaxed text-muted-foreground/55 transition-colors duration-200 group-hover:text-muted-foreground/80">
                {row.meta}
              </span>
            </a>
          </li>
        ))}
      </ul>

      {fine && (
        <div
          ref={floatRef}
          aria-hidden
          className={`pointer-events-none fixed left-0 top-0 z-50 overflow-hidden rounded-xl shadow-2xl shadow-black/40 transition-opacity duration-200 ease-out ${
            cover ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ width: SIZE, height: SIZE }}
        >
          {cover && (
            <Image
              src={cover}
              alt=""
              width={SIZE * 2}
              height={SIZE * 2}
              quality={82}
              sizes={`${SIZE}px`}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      )}
    </div>
  )
}
