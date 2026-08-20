'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

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
  // Only the immersive visualizer opts out; every other route gets the site map.
  if (pathname?.startsWith('/Visualizer-Eden')) return null

  return <>{children}</>
}
