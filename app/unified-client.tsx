'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Lazy-load heavy sections (R3F Canvas) to reduce initial bundle and improve TTI
const HomeSection = dynamic(() => import('./sections/home-section').then(m => ({ default: m.HomeSection })), {
  ssr: false,
  loading: () => <section id="section-0" className="h-screen w-full snap-start bg-black" />
})

const LinksSection = dynamic(() => import('./sections/links-section').then(m => ({ default: m.LinksSection })), {
  ssr: false,
  loading: () => <section id="section-1" className="h-screen w-full snap-start bg-black" />
})

const FourUHSection = dynamic(() => import('./sections/four-uh-section').then(m => ({ default: m.FourUHSection })), {
  ssr: false,
  loading: () => <section id="section-2" className="h-screen w-full snap-start bg-black" />
})

// ============================================
// SECTION INDICATOR
// ============================================
function SectionIndicator({ currentSection }: { currentSection: number }) {
  const sections = ['Home', 'Links', '4UH']
  
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col gap-3">
      {sections.map((name, index) => (
        <button
          key={name}
          onClick={() => {
            document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="group flex items-center gap-3"
        >
          <span 
            className={`text-xs font-light tracking-wide transition-all duration-300 opacity-0 group-hover:opacity-100 ${
              currentSection === index ? 'text-white/70' : 'text-white/40'
            }`}
          >
            {name}
          </span>
          <div 
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? 'bg-emerald-400 scale-125' 
                : 'bg-white/20 group-hover:bg-white/40'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

// ============================================
// MAIN UNIFIED CLIENT
// ============================================
export function UnifiedClient() {
  const [currentSection, setCurrentSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const sectionHeight = window.innerHeight
      const section = Math.round(scrollTop / sectionHeight)
      setCurrentSection(section)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      ref={containerRef}
      data-scroll-container
      className="h-screen w-screen overflow-y-auto snap-y snap-mandatory bg-black"
      style={{ scrollBehavior: 'smooth' }}
    >
      <SectionIndicator currentSection={currentSection} />
      <HomeSection />
      <LinksSection />
      <FourUHSection />

      {/* Scroll-down arrow - on every section except last, scrolls to next */}
      {currentSection < 2 && (
        <button
          onClick={() => document.getElementById(`section-${currentSection + 1}`)?.scrollIntoView({ behavior: 'smooth' })}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex lg:hidden flex-col items-center gap-1 text-white/50 hover:text-white/90 transition-colors pointer-events-auto"
          aria-label="Scroll to next section"
        >
          <span className="text-xs font-light tracking-wide">scroll</span>
          <span className="animate-bounce text-3xl leading-none">↓</span>
        </button>
      )}

      {/* Back to top - on last section only */}
      {currentSection === 2 && (
        <button
          onClick={() => document.getElementById('section-0')?.scrollIntoView({ behavior: 'smooth' })}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex lg:hidden flex-col items-center gap-1 text-white/50 hover:text-white/90 transition-colors pointer-events-auto"
          aria-label="Back to top"
        >
          <span className="text-xs font-light tracking-wide">top</span>
          <span className="animate-bounce text-3xl leading-none">↑</span>
        </button>
      )}
    </div>
  )
}
