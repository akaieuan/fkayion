'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

// Main nav items - all link to sections on the unified home page
const mainNavItems = [
  { name: 'Home', sectionIndex: 0, sectionId: 'section-0' },
  { name: 'Links', sectionIndex: 1, sectionId: 'section-1' },
  { name: 'Product', sectionIndex: 2, sectionId: 'section-2' },
  { name: '4UH', sectionIndex: 4, sectionId: 'section-4' }
]

// Projects are separate pages (not sections)
const projectItems = [
  { name: 'Visualizer Eden', href: '/Visualizer-Eden' }
]

export function SiteHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Check if we're on the unified home page (not a project page)
  const isUnifiedPage = pathname === '/'

  // Track current section from scroll when on unified page
  useEffect(() => {
    if (!isUnifiedPage) return

    const handleScroll = () => {
      const scrollContainer = document.querySelector('[data-scroll-container]')
      if (!scrollContainer) return
      
      const scrollTop = scrollContainer.scrollTop
      const sectionHeight = window.innerHeight
      const section = Math.round(scrollTop / sectionHeight)
      setCurrentSection(section)
    }

    // Initial check
    handleScroll()

    // Listen to scroll on the unified container
    const scrollContainer = document.querySelector('[data-scroll-container]')
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [isUnifiedPage])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProjectsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const isProjectActive = projectItems.some(item => pathname === item.href)

  // Navigate to section on unified page
  const handleNavClick = (item: typeof mainNavItems[0]) => {
    if (isUnifiedPage) {
      // Already on unified page - just scroll to section
      const section = document.getElementById(item.sectionId)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // On a different page (like Visualizer) - navigate to home and scroll
      router.push('/')
      // Wait for navigation, then scroll to section
      setTimeout(() => {
        const section = document.getElementById(item.sectionId)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
        }
      }, 150)
    }
    setMobileMenuOpen(false)
  }

  // Determine if nav item is active based on current scroll section
  const getIsActive = (item: typeof mainNavItems[0]) => {
    // When on unified page, use scroll position
    if (isUnifiedPage) {
      return currentSection === item.sectionIndex
    }
    // When on project pages, no main nav item is active
    return false
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] py-3 md:py-4 bg-black/80 backdrop-blur-sm">
        <nav className="flex items-center justify-between px-6 sm:px-8 md:px-16 lg:px-24 max-w-[1440px] mx-auto">
        {/* Logo/Brand - always scrolls to home section */}
        <button 
          onClick={() => handleNavClick(mainNavItems[0])}
          className="text-lg sm:text-xl text-white/80 font-light tracking-wide hover:text-white transition-colors duration-200"
        >
          aka4uh
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-4 sm:space-x-6">
          {mainNavItems.map((item) => {
            const isActive = getIsActive(item)
            return (
              <button
                key={item.sectionId}
                onClick={() => handleNavClick(item)}
                className={`text-xs sm:text-sm font-light tracking-wide transition-colors duration-200 ${
                  isActive 
                    ? 'text-white/80' 
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {item.name}
              </button>
            )
          })}

          {/* Projects Dropdown - these are actual separate pages */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProjectsOpen(!projectsOpen)}
              className={`text-xs sm:text-sm font-light tracking-wide transition-colors duration-200 flex items-center gap-1 ${
                isProjectActive || projectsOpen
                  ? 'text-white/80' 
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              Projects
              <span 
                className="text-[10px] transition-transform duration-200"
                style={{ transform: projectsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                ▼
              </span>
            </button>

            {/* Dropdown menu - minimal transparent style */}
            <div 
              className="absolute top-full right-0 mt-3 transition-all duration-200 ease-out"
              style={{
                opacity: projectsOpen ? 1 : 0,
                transform: projectsOpen ? 'translateY(0)' : 'translateY(-4px)',
                pointerEvents: projectsOpen ? 'auto' : 'none',
              }}
            >
              <div className="py-1">
                {projectItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <button
                      key={item.href}
                      onClick={() => {
                        router.push(item.href)
                        setProjectsOpen(false)
                      }}
                      className={`block text-xs sm:text-sm font-light tracking-wide transition-colors duration-200 ${
                        isActive 
                          ? 'text-emerald-400' 
                          : 'text-white/40 hover:text-white/80'
                      }`}
                    >
                      {item.name}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-end gap-1 p-1 hover:opacity-80 transition-opacity"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span 
            className="block h-[1.5px] w-5 bg-white/60 transition-all duration-200"
            style={{ transform: mobileMenuOpen ? 'translateY(5px) rotate(45deg)' : 'none' }}
          />
          <span 
            className="block h-[1.5px] w-4 bg-white/60 transition-opacity duration-200"
            style={{ opacity: mobileMenuOpen ? 0 : 1 }}
          />
          <span 
            className="block h-[1.5px] w-5 bg-white/60 transition-all duration-200"
            style={{ transform: mobileMenuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none' }}
          />
        </button>
      </nav>

      {/* Mobile slide-out menu */}
      <div 
        className="md:hidden fixed inset-0 z-[99]" 
        style={{ pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}
      >
        {/* Click-away overlay (transparent) */}
        <div 
          className="absolute inset-0 transition-opacity duration-200"
          style={{ opacity: mobileMenuOpen ? 1 : 0 }}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Panel */}
        <div 
          className="absolute top-0 right-0 w-[65vw] max-w-[260px] px-5 py-8 flex flex-col space-y-6"
          style={{ 
            height: '100vh',
            minHeight: '100%',
            background: '#0a0a0a',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease-out',
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm tracking-wide">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/50 hover:text-white/80 transition-colors text-sm"
            >
              Close
            </button>
          </div>

          <div className="space-y-4">
            {mainNavItems.map((item) => {
              const isActive = getIsActive(item)
              return (
                <button
                  key={item.sectionId}
                  onClick={() => handleNavClick(item)}
                  className={`w-full text-left text-base font-light tracking-wide py-2 transition-colors duration-200 ${
                    isActive 
                      ? 'text-white/90' 
                      : 'text-white/60 hover:text-white/90'
                  }`}
                >
                  {item.name}
                </button>
              )
            })}
          </div>

          <div className="pt-4 border-t border-white/10">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Projects</p>
            <div className="space-y-2">
              {projectItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <button
                    key={item.href}
                    onClick={() => {
                      router.push(item.href)
                      setProjectsOpen(false)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full text-left text-base font-light tracking-wide transition-colors duration-200 ${
                      isActive 
                        ? 'text-emerald-400' 
                        : 'text-white/60 hover:text-white/90'
                    }`}
                  >
                    {item.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
