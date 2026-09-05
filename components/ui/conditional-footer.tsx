'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { isFullscreenDemo } from '@/lib/fullscreen-demos'

/**
 * Hides its children on the one route that has no room for them.
 *
 * It used to import SiteFooter and decide whether to render it, which meant a
 * server-rendered footer — the whole site map, on every page — was pulled into
 * the client bundle so that one string comparison could run in the browser.
 * Taking the footer as children instead leaves it a server component; the only
 * thing that ships is the comparison.
 */
export function ConditionalFooter({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  // The immersive visualizer and the full-bleed routes opt out: the same list
  // the header reads, so a route without chrome is without all of it.
  if (pathname?.startsWith('/Visualizer-Eden') || isFullscreenDemo(pathname)) return null

  return <>{children}</>
}
