'use client'

import { useState, useEffect } from 'react'

// Responsive breakpoints matching Tailwind
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1400,
} as const

/**
 * Hook to detect mobile viewport.
 * Uses the md breakpoint (768px) by default.
 */
export function useIsMobile(breakpoint = BREAKPOINTS.md): boolean {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }
    
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < breakpoint)
    
    return () => mql.removeEventListener('change', onChange)
  }, [breakpoint])

  return !!isMobile
}

/**
 * Hook to detect tablet viewport (between sm and lg).
 */
export function useIsTablet(): boolean {
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth
      setIsTablet(width >= BREAKPOINTS.sm && width < BREAKPOINTS.lg)
    }
    
    checkTablet()
    window.addEventListener('resize', checkTablet)
    return () => window.removeEventListener('resize', checkTablet)
  }, [])

  return isTablet
}

/**
 * Hook to get current breakpoint name.
 */
export function useBreakpoint(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' {
  const [breakpoint, setBreakpoint] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('xs')

  useEffect(() => {
    const getBreakpoint = () => {
      const width = window.innerWidth
      if (width >= BREAKPOINTS['2xl']) return '2xl'
      if (width >= BREAKPOINTS.xl) return 'xl'
      if (width >= BREAKPOINTS.lg) return 'lg'
      if (width >= BREAKPOINTS.md) return 'md'
      if (width >= BREAKPOINTS.sm) return 'sm'
      return 'xs'
    }
    
    setBreakpoint(getBreakpoint())
    
    const handleResize = () => setBreakpoint(getBreakpoint())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return breakpoint
}
