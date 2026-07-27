'use client'

import { usePathname } from 'next/navigation'
import { SiteFooter } from './site-footer'

export function ConditionalFooter() {
  const pathname = usePathname()
  // Only the immersive visualizer opts out; every other route gets the site map.
  const isVisualizerPage = pathname?.startsWith('/Visualizer-Eden')

  if (isVisualizerPage) return null

  return <SiteFooter />
}
