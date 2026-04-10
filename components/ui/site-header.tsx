'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

const mainNavItems = [
  { name: 'Home', sectionId: 'section-0' },
  { name: 'Links', sectionId: 'section-1' },
  { name: 'Product', sectionId: 'section-2' },
  { name: '4UH', sectionId: 'section-4' },
]

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
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

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

  const handleNavClick = (item: typeof mainNavItems[0]) => {
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

  /** Fullscreen demos manage their own chrome */
  if (pathname?.startsWith('/demo')) {
    return null
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] py-3 md:py-4 backdrop-blur-sm"
      style={{ background: isDark ? 'oklch(0.182 0.014 94.03 / 0.85)' : 'oklch(0.866 0.004 106.485 / 0.85)' }}
    >
      <nav className="flex max-w-site mx-auto items-center justify-between site-inset">
        <button
          onClick={() => handleNavClick(mainNavItems[0])}
          className={`text-lg sm:text-xl font-light tracking-wide transition-colors duration-200 ${logoText}`}
        >
          aka4uh
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-4 sm:space-x-6">
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
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="flex flex-col justify-center items-end gap-1 p-1 hover:opacity-80 transition-opacity"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span
              className={`block h-[1.5px] w-5 transition-all duration-200 ${isDark ? 'bg-white/60' : 'bg-foreground/60'}`}
              style={{ transform: mobileMenuOpen ? 'translateY(5px) rotate(45deg)' : 'none' }}
            />
            <span
              className={`block h-[1.5px] w-4 transition-opacity duration-200 ${isDark ? 'bg-white/60' : 'bg-foreground/60'}`}
              style={{ opacity: mobileMenuOpen ? 0 : 1 }}
            />
            <span
              className={`block h-[1.5px] w-5 transition-all duration-200 ${isDark ? 'bg-white/60' : 'bg-foreground/60'}`}
              style={{ transform: mobileMenuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none' }}
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
