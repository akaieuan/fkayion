'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

/** Plain icon, no circle — matches demo index link-arrow scale (h-3.5) */
export function DemoPageThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <span className="inline-block h-3.5 w-3.5 shrink-0" aria-hidden />
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="shrink-0 p-0 text-muted-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
    >
      {isDark ? (
        <Sun className="h-3.5 w-3.5" strokeWidth={1.75} />
      ) : (
        <Moon className="h-3.5 w-3.5" strokeWidth={1.75} />
      )}
    </button>
  )
}
