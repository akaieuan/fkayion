'use client'

import { usePathname } from 'next/navigation'
import { SiteFooter } from './site-footer'

export function ConditionalFooter() {
  const pathname = usePathname()
  const isVisualizerPage = pathname?.startsWith('/Visualizer-Eden')

  if (isVisualizerPage) return null

  return <SiteFooter />
}
