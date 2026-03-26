'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
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

const ProductSection = dynamic(() => import('./sections/product-section').then(m => ({ default: m.ProductSection })), {
  ssr: false,
  loading: () => <section id="section-2" className="h-screen w-full snap-start bg-black" />
})

const VisualizerSection = dynamic(() => import('./sections/visualizer-section').then(m => ({ default: m.VisualizerSection })), {
  ssr: false,
  loading: () => <section id="section-3" className="h-screen w-full snap-start bg-black" />
})

const FourUHSection = dynamic(() => import('./sections/four-uh-section').then(m => ({ default: m.FourUHSection })), {
  ssr: false,
  loading: () => <section id="section-4" className="h-screen w-full snap-start bg-black" />
})

// ============================================
// SECTION INDICATOR
// ============================================
function SectionIndicator({ currentSection }: { currentSection: number }) {
  const sections = ['Home', 'Links', 'Product', 'Visualizer', '4UH']
  
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden sm:flex md:hidden flex-col gap-3">
      {sections.map((name, index) => (
        <button
          key={name}
          type="button"
          onClick={() => {
            const el = document.querySelector<HTMLElement>('[data-scroll-container]')
            if (!el) return
            const h = el.clientHeight
            el.scrollTo({ top: index * h, behavior: 'smooth' })
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

  /** Snap sections are exactly one viewport tall — scroll by index, not scrollIntoView (avoids scroll-padding misalignment). */
  const scrollToSection = useCallback((index: number) => {
    const el = containerRef.current
    if (!el) return
    const h = el.clientHeight
    el.scrollTo({ top: Math.max(0, index) * h, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const sectionHeight = container.clientHeight || window.innerHeight
      const section = Math.round(scrollTop / Math.max(1, sectionHeight))
      setCurrentSection(Math.min(4, Math.max(0, section)))
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      ref={containerRef}
      data-scroll-container
      className="h-screen w-full overflow-y-auto snap-y snap-proximity md:snap-none bg-black"
      style={{ scrollBehavior: 'auto' }}
    >
      <SectionIndicator currentSection={currentSection} />
      <HomeSection />
      <LinksSection />
      <ProductSection />
      <VisualizerSection />
      <FourUHSection />

      {/* Scroll-down arrow - on every section except last, scrolls to next */}
      {currentSection < 4 && (
        <button
          type="button"
          onClick={() => scrollToSection(currentSection + 1)}
          className="fixed bottom-20 left-1/2 z-[110] flex -translate-x-1/2 flex-col items-center gap-0.5 text-white/40 hover:text-white/75 md:hidden pointer-events-auto"
          aria-label="Scroll to next section"
        >
          <span className="text-[10px] font-medium tracking-widest uppercase">next</span>
          <span className="text-lg leading-none">↓</span>
        </button>
      )}

      {/* Back to top - on last section only */}
      {currentSection === 4 && (
        <button
          type="button"
          onClick={() => scrollToSection(0)}
          className="fixed bottom-20 left-1/2 z-[110] flex -translate-x-1/2 flex-col items-center gap-0.5 text-white/40 hover:text-white/75 md:hidden pointer-events-auto"
          aria-label="Back to top"
        >
          <span className="text-[10px] font-medium tracking-widest uppercase">top</span>
          <span className="text-lg leading-none">↑</span>
        </button>
      )}
    </div>
  )
}
