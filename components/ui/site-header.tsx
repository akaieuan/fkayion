'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

const FOUR_UH_URL = 'https://4uhnyc.com'

type MainNavItem = {
  name: string
  sectionId: string
  /** If set, nav label is an external link instead of in-page scroll */
  externalHref?: string
}

const mainNavItems: MainNavItem[] = [
  { name: 'Home', sectionId: 'section-0' },
  { name: 'Links', sectionId: 'section-1' },
  { name: '4UH', sectionId: 'section-4', externalHref: FOUR_UH_URL },
]

const SCROLL_THRESHOLD = 24

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-4 h-4" />

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="text-foreground/50 hover:text-foreground/80 transition-colors duration-200 focus:outline-none"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

export function SiteHeader() {
  const router = useRouter()
  const pathname = usePathname()

  const [activeSection, setActiveSection] = useState<string | null>('section-0')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // rAF-throttled scroll listener; only updates state when crossing the threshold,
  // so React renders at most twice (once each direction) instead of every frame.
  const scrolledRef = useRef(false)
  useEffect(() => {
    let frame = 0
    let queued = false

    const update = () => {
      queued = false
      const next = window.scrollY > SCROLL_THRESHOLD
      if (next !== scrolledRef.current) {
        scrolledRef.current = next
        setScrolled(next)
      }
    }

    const onScroll = () => {
      if (queued) return
      queued = true
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const isHome = pathname === '/'
  const isDark = !mounted || theme === 'dark'

  useEffect(() => {
    if (!isHome) { setActiveSection(null); return }

    const sectionIds = mainNavItems.map(i => i.sectionId)
    const observers: IntersectionObserver[] = []

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [isHome])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const handleNavClick = (item: MainNavItem) => {
    if (item.externalHref) {
      window.open(item.externalHref, '_blank', 'noopener,noreferrer')
      setMobileMenuOpen(false)
      return
    }
    if (isHome) {
      const section = document.getElementById(item.sectionId)
      if (section) section.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/')
      setTimeout(() => {
        const section = document.getElementById(item.sectionId)
        if (section) section.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    }
    setMobileMenuOpen(false)
  }

  const navTextActive = isDark ? 'text-white/80' : 'text-foreground/90'
  const navTextInactive = isDark ? 'text-white/40 hover:text-white/70' : 'text-foreground/40 hover:text-foreground/70'
  const logoText = isDark ? 'text-white/80 hover:text-white' : 'text-foreground/80 hover:text-foreground'

  /** Inline color so bars always match header chrome; `bg-foreground` can desync from `isDark` during theme/hydration. */
  const mobileMenuBarColor = isDark ? 'rgba(255,255,255,0.65)' : 'oklch(0.122 0.001 0 / 0.88)'

  // Memoized so identity is stable across scroll-triggered renders. This keeps the
  // browser from flagging the glass layer as "changed" and re-rasterizing the blur.
  const glassStyle = useMemo<React.CSSProperties>(() => ({
    opacity: scrolled ? 1 : 0,
    background: isDark ? 'oklch(0.182 0.014 94.03 / 0.55)' : 'oklch(0.866 0.004 106.485 / 0.55)',
    borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid oklch(0.475 0.001 0 / 0.08)',
    transform: 'translateZ(0)',
    willChange: 'opacity',
    backfaceVisibility: 'hidden',
  }), [scrolled, isDark])

  const fadeStyle = useMemo<React.CSSProperties>(() => ({
    opacity: scrolled ? 1 : 0,
    background: isDark
      ? 'linear-gradient(to bottom, oklch(0.182 0.014 94.03 / 0.55), oklch(0.182 0.014 94.03 / 0))'
      : 'linear-gradient(to bottom, oklch(0.866 0.004 106.485 / 0.55), oklch(0.866 0.004 106.485 / 0))',
    transform: 'translateZ(0)',
    willChange: 'opacity',
  }), [scrolled, isDark])

  /** Fullscreen demo subpages manage their own chrome; the demo index keeps the site header for consistency */
  if (pathname?.startsWith('/demo/')) {
    return null
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] pointer-events-none"
      style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
    >
      {/* Glass chrome — solid backdrop blur with a hard bottom edge. No mask-image:
          combining mask-image with backdrop-filter is a known repaint-flicker source. */}
      <div
        aria-hidden
        className="absolute inset-0 backdrop-blur-md transition-opacity duration-300"
        style={glassStyle}
      />

      {/* Soft fade beneath the chrome to avoid a hard edge against the page. Uses a
          plain gradient (no blur) so it composites cheaply and never flickers. */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-full h-6 transition-opacity duration-300"
        style={fadeStyle}
      />

      <nav className="relative flex max-w-site mx-auto items-center justify-between site-inset pt-5 md:pt-6 pb-4 md:pb-5">
        <button
          onClick={() => handleNavClick(mainNavItems[0])}
          className={`pointer-events-auto text-sm sm:text-base font-light tracking-wide transition-colors duration-200 ${logoText}`}
        >
          akaBuild
        </button>

        {/* Desktop nav */}
        <div className="pointer-events-auto hidden md:flex items-center space-x-5 sm:space-x-7">
          {mainNavItems.map((item) => (
            <button
              key={item.sectionId}
              onClick={() => handleNavClick(item)}
              className={`text-xs sm:text-sm font-light tracking-wide transition-colors duration-200 ${
                activeSection === item.sectionId ? navTextActive : navTextInactive
              }`}
            >
              {item.name}
            </button>
          ))}

          <button
            onClick={() => router.push('/demo')}
            className={`text-xs sm:text-sm font-light tracking-wide transition-colors duration-200 ${
              pathname?.startsWith('/demo') || pathname === '/Visualizer-Eden' ? navTextActive : navTextInactive
            }`}
          >
            Projects
          </button>

          <ThemeToggle />
        </div>

        {/* Mobile right side: theme toggle + hamburger */}
        <div className="pointer-events-auto md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="flex flex-col justify-center items-end gap-1 p-1 hover:opacity-80 transition-opacity"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span
              className="block h-0.5 w-5 transition-all duration-200"
              style={{
                backgroundColor: mobileMenuBarColor,
                transform: mobileMenuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block h-0.5 w-4 transition-opacity duration-200"
              style={{
                backgroundColor: mobileMenuBarColor,
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-0.5 w-5 transition-all duration-200"
              style={{
                backgroundColor: mobileMenuBarColor,
                transform: mobileMenuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="md:hidden fixed inset-0 z-[99]"
        style={{ pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}
      >
        <div
          className="absolute inset-0 transition-opacity duration-200"
          style={{ opacity: mobileMenuOpen ? 1 : 0 }}
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className="absolute top-0 right-0 w-[65vw] max-w-[260px] px-5 py-8 flex flex-col space-y-6"
          style={{
            height: '100vh',
            minHeight: '100%',
            background: isDark ? '#0f0e0a' : 'oklch(0.885 0.011 112.391)',
            borderLeft: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid oklch(0.475 0.001 0 / 0.12)',
            transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease-out',
          }}
        >
          <div className="flex items-center justify-between">
            <span className={`text-sm tracking-wide ${isDark ? 'text-white/70' : 'text-foreground/70'}`}>Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className={`transition-colors text-sm ${isDark ? 'text-white/50 hover:text-white/80' : 'text-foreground/50 hover:text-foreground/80'}`}
            >
              Close
            </button>
          </div>

          <div className="space-y-4">
            {mainNavItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => handleNavClick(item)}
                className={`w-full text-left text-base font-light tracking-wide py-2 transition-colors duration-200 ${
                  activeSection === item.sectionId
                    ? isDark ? 'text-white/90' : 'text-foreground/90'
                    : isDark ? 'text-white/60 hover:text-white/90' : 'text-foreground/60 hover:text-foreground/90'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className={`pt-4 border-t ${isDark ? 'border-white/10' : 'border-foreground/10'}`}>
            <button
              onClick={() => { router.push('/demo'); setMobileMenuOpen(false) }}
              className={`w-full text-left text-base font-light tracking-wide py-2 transition-colors duration-200 ${
                pathname?.startsWith('/demo') || pathname === '/Visualizer-Eden'
                  ? isDark ? 'text-white/90' : 'text-foreground/90'
                  : isDark ? 'text-white/60 hover:text-white/90' : 'text-foreground/60 hover:text-foreground/90'
              }`}
            >
              Projects
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
