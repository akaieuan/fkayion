'use client'

import Link from 'next/link'
import { useRef } from 'react'

type SpotlightCardProps = {
  href: string
  external?: boolean
  className?: string
  children: React.ReactNode
}

/**
 * Glassy card with a very subtle border highlight that tracks the cursor.
 * Pure CSS spotlight (radial gradient masked to the 1px border ring); the only
 * client work is writing the pointer position to two CSS variables.
 */
export function SpotlightCard({ href, external, className, children }: SpotlightCardProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  // bg-card/40 resolves to transparent here (v3 opacity modifier doesn't apply to the
  // var(--card) token), so use an explicit theme-aware translucent fill for real glass.
  const base =
    'group relative flex h-full flex-col rounded-xl border border-border bg-[color-mix(in_oklab,var(--card)_72%,transparent)] p-4 backdrop-blur-md transition-colors hover:bg-[color-mix(in_oklab,var(--card)_90%,transparent)]'

  const inner = (
    <>
      {/* cursor-tracked border glow — masked to the 1px ring, very faint */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(200px circle at var(--mx, 50%) var(--my, 0%), oklch(0.72 0.1 152 / 0.5), transparent 65%)',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: 1,
        }}
      />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </>
  )

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMouseMove}
        className={`${base} ${className ?? ''}`}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link ref={ref} href={href} onMouseMove={onMouseMove} className={`${base} ${className ?? ''}`}>
      {inner}
    </Link>
  )
}
