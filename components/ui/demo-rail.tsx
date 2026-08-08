'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { isFullscreenDemo } from '@/lib/fullscreen-demos'

/**
 * The left rail on a demo page: a way back, and a map of the page that tracks
 * where you are in it.
 *
 * It reads the page rather than being configured. Every demo page already
 * writes its sections as `<h2>`, so the rail collects them on mount, gives any
 * that lack one a slug id, and watches them. Adding a section to a page adds it
 * to the rail; nothing to keep in sync.
 *
 * It sits in the gutter beside the article on wide screens and is simply absent
 * below that, where there is no gutter to sit in — the pages already read fine
 * without it, so there is no mobile drawer to build or maintain.
 */

type Entry = { id: string; text: string }

function slug(text: string) {
  return (
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 48) || 'section'
  )
}

export function DemoRail() {
  const pathname = usePathname()
  const [entries, setEntries] = useState<Entry[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  // /demo is the index; the rail belongs to the detail pages under it.
  const onDetailPage =
    Boolean(pathname && /^\/demo\/.+/.test(pathname)) && !isFullscreenDemo(pathname)

  useEffect(() => {
    if (!onDetailPage) {
      setEntries([])
      return
    }
    const headings = [...document.querySelectorAll<HTMLHeadingElement>('main h2, article h2')]
      // Skip anything decorative or inside an interactive demo panel.
      .filter((h) => h.textContent?.trim() && !h.closest('[data-rail-skip]'))

    const seen = new Map<string, number>()
    const found: Entry[] = headings.map((h) => {
      const text = h.textContent!.trim()
      if (!h.id) {
        const base = slug(text)
        const n = seen.get(base) ?? 0
        seen.set(base, n + 1)
        h.id = n ? `${base}-${n}` : base
      }
      // Anchor jumps should not tuck the heading under the fixed header.
      h.style.scrollMarginTop = '96px'
      return { id: h.id, text }
    })
    setEntries(found)

    // The heading nearest the top of the viewport wins, so the rail tracks
    // reading position rather than flipping on whatever happens to intersect.
    const onScroll = () => {
      let best: string | null = null
      let bestTop = Number.NEGATIVE_INFINITY
      for (const h of headings) {
        const top = h.getBoundingClientRect().top - 120
        if (top <= 0 && top > bestTop) {
          bestTop = top
          best = h.id
        }
      }
      setActiveId(best ?? found[0]?.id ?? null)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname, onDetailPage])

  if (!onDetailPage) return null

  return (
    /*
     * Positioned from both edges rather than given a width:
     *   left  — the site container's content edge, so it lines up with the
     *           header wordmark (the rail only shows at xl, where the inset is
     *           always 4rem and the container is capped at its max width).
     *   right — 1rem short of where a centred 42rem article begins.
     * The width falls out of those two, so the rail can never reach the text
     * however wide a page sets its own column. BodyLog was the only page at
     * 48rem and it was the only one that collided.
     */
    <nav
      aria-label="On this page"
      className="pointer-events-none fixed inset-y-0 z-40 hidden xl:block"
      style={{
        left: 'calc((100vw - 1180px) / 2 + 4rem)',
        right: 'calc(50vw + 21rem + 1rem)',
      }}
    >
      <div className="pointer-events-auto flex h-full flex-col gap-6 py-24">
        <Link
          href="/demo"
          className="inline-flex w-fit items-center gap-1.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        {entries.length > 0 && (
          <ol className="flex min-h-0 list-none flex-col gap-0 overflow-y-auto p-0 text-[11px] leading-snug">
            {entries.map((e) => {
              const isActive = e.id === activeId
              return (
                <li key={e.id}>
                  <a
                    href={`#${e.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`block border-l py-1.5 pl-3 transition-colors ${
                      isActive
                        ? 'border-[var(--select)] text-foreground'
                        : 'border-border/70 text-muted-foreground/55 hover:border-foreground/30 hover:text-foreground'
                    }`}
                  >
                    {e.text}
                  </a>
                </li>
              )
            })}
          </ol>
        )}
      </div>
    </nav>
  )
}
