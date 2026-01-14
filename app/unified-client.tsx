'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

import { LiquidMorphOrb } from '../components/main-page/orb-3'
import { LatestReleases } from '../components/main-page-components/latest-releases'
import { UnifiedDynamicOrb } from '../components/link-comps/unified-dynamic-orb'
import { ShowsList } from '../components/4uh-page/shows-list'
import { ReleasesList } from '../components/4uh-page/releases-list'
import { PurchaseList } from '../components/4uh-page/purchase-list'
import { PlaylistList } from '../components/4uh-page/playlist-list'

// ============================================
// LINKS DATA
// ============================================
const linksData = [
  { label: 'SoundCloud', url: 'https://soundcloud.com/akaieuan', color: '#aa22ff', hoverColor: '#cc44ff' },
  { label: 'aka.write', url: 'https://kraa.io/akaieuan', color: '#88ff22', hoverColor: '#aaff44' },
  { label: 'Ubik', url: 'https://ubik.studio', color: '#ff4422', hoverColor: '#ff6644' },
  { label: 'Bandcamp', url: 'https://akaieuan.bandcamp.com/', color: '#22aaff', hoverColor: '#44ccff' },
  { label: 'Spotify', url: 'https://open.spotify.com/artist/5OwuCYMg2wmmh3QofLLIPe', color: '#aa22ff', hoverColor: '#cc44ff' },
  { label: 'YouTube', url: 'https://www.youtube.com/channel/UC6etRnx7fZEtoVAI-phCu6Q', color: '#ff2288', hoverColor: '#ff44aa' },
  { label: 'Instagram', url: 'https://instagram.com/aka.ieuan/', color: '#ff6b9d', hoverColor: '#ff8fa3' }
]

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
// HOME SECTION
// ============================================
function HomeSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    setMousePos({ x, y })
  }, [])

  return (
    <section id="section-0" className="h-screen w-full relative snap-start" onPointerMove={handlePointerMove}>
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          style={{ width: '100%', height: '100%' }}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.15} />
          <pointLight position={[-4, 2, 4]} intensity={1.5} color="#44ddaa" distance={15} />
          <pointLight position={[4, -2, 4]} intensity={1} color="#228866" distance={15} />
          <pointLight position={[0, 3, 2]} intensity={0.8} color="#ffffff" distance={20} />
          <LiquidMorphOrb
            position={[1.8, 0, 0]}
            colors={{ primary: '#228866', secondary: '#44ddaa', rim: '#66cc99' }}
            size={0.7}
            onClick={() => {}}
            isHovered={true}
            onHover={() => {}}
            mousePos={mousePos}
          />
        </Canvas>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full flex items-center justify-start">
          <div className="pointer-events-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="mb-8">
              <h1 className="text-xl text-gray-500/80 font-light tracking-wide">
                ieuan | yion | akaieuan 
              </h1>
              <p className="text-white/25 text-xs mt-1 font-light">
                digital anthropologist · ai researcher · <br />front-end developer · designer · musician
              </p>
            </div>
            <LatestReleases />
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// LINKS SECTION - with scroll-triggered animations
// ============================================
function GridLinkItem({ 
  link, 
  index, 
  onHover,
  isInView 
}: { 
  link: typeof linksData[0]
  index: number
  onHover: (label: string | null) => void
  isInView: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  
  // Trigger animation when section comes into view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), index * 80)
      return () => clearTimeout(timer)
    }
  }, [isInView, hasAnimated, index])
  
  // Reset animation when leaving view
  useEffect(() => {
    if (!isInView) {
      setHasAnimated(false)
    }
  }, [isInView])
  
  const isFirstCol = index % 3 === 0
  
  // Grid position determines animation direction
  const getInitialTransform = () => {
    const directions = [
      'translate3d(-20px, -20px, 0)', // top-left
      'translate3d(0, -25px, 0)',     // top-center
      'translate3d(20px, -20px, 0)',  // top-right
      'translate3d(-25px, 0, 0)',     // middle-left
      'translate3d(0, 0, 0) scale(0.8)', // center - scale in
      'translate3d(25px, 0, 0)',      // middle-right
      'translate3d(-20px, 20px, 0)',  // bottom-left
      'translate3d(0, 25px, 0)',      // bottom-center
      'translate3d(20px, 20px, 0)',   // bottom-right
    ]
    return directions[index] || 'translate3d(0, 20px, 0)'
  }
  
  return (
    <button
      onClick={() => window.open(link.url, '_blank')}
      onMouseEnter={() => { setIsHovered(true); onHover(link.label) }}
      onMouseLeave={() => { setIsHovered(false); onHover(null) }}
      className={`relative py-3 pr-4 text-left transition-all duration-300 ${isFirstCol ? 'pl-0' : 'pl-4'}`}
      style={{
        opacity: hasAnimated ? 1 : 0,
        transform: hasAnimated 
          ? 'translate3d(0, 0, 0) scale(1)' 
          : getInitialTransform(),
        transition: `opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)`,
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <span className="text-sm font-light tracking-wide" style={{ color: isHovered ? '#44ddaa' : 'rgba(255,255,255,0.5)' }}>
        {link.label}
      </span>
    </button>
  )
}

function LinksSection() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  // Intersection observer to detect when section is in view
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger when at least 20% visible
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          setIsInView(true)
        } else if (!entry.isIntersecting) {
          setIsInView(false)
        }
      },
      { threshold: [0, 0.2, 0.5, 1] }
        setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.5)
      },
      { threshold: 0.5 }
    )
    
    observer.observe(section)
    return () => observer.disconnect()
  }, [])
  
  const orbColor = hoveredLink 
    ? linksData.find(l => l.label === hoveredLink)?.color || '#6655cc'
    : '#6655cc'
  const orbHoverColor = hoveredLink 
    ? linksData.find(l => l.label === hoveredLink)?.hoverColor || '#aa88ff'
    : '#aa88ff'

  return (
    <section ref={sectionRef} id="section-1" className="h-screen w-full relative snap-start">
      <div className="absolute inset-0">
        <UnifiedDynamicOrb activeLink={hoveredLink} color={orbColor} hoverColor={orbHoverColor} size={1.0} />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full flex items-center justify-start">
          <div className="pointer-events-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div 
              className="mb-6 transition-all duration-500"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <h1 className="text-xl text-gray-500/80 font-light tracking-wide">links</h1>
              <p className="text-white/25 text-xs mt-1 font-light">social · music · writing</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-1 w-full max-w-[260px] sm:max-w-[320px]">
            <div className="grid grid-cols-3 gap-1 max-w-[320px]">
              {linksData.slice(0, 9).map((link, index) => (
                <GridLinkItem 
                  key={link.label} 
                  link={link} 
                  index={index} 
                  onHover={setHoveredLink}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// 4UH SECTION - uses all panel components
// ============================================
type ActivePanel = 'shows' | 'releases' | 'purchase' | 'playlists' | null

function FourUHSection() {
  const [activePanel, setActivePanel] = useState<ActivePanel>('shows')

  const handleNavClick = (item: string) => {
    const panelMap: Record<string, ActivePanel> = {
      'Shows': 'shows',
      'Releases': 'releases',
      'Purchase': 'purchase',
      'Playlists': 'playlists',
    }
    const panel = panelMap[item]
    if (panel) {
      setActivePanel(activePanel === panel ? null : panel)
    }
  }

  return (
    <section id="section-2" className="h-screen w-full relative snap-start overflow-visible">
    <section id="section-2" className="h-screen w-full relative snap-start overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <video autoPlay loop muted playsInline className="w-auto h-auto max-w-none opacity-40" style={{ minWidth: '40%', minHeight: '40%', objectFit: 'contain' }}>
          <source src="/4uh-aka.webm" type="video/webm" />
        </video>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 100%)' }} />

      <div className="relative h-full flex items-start md:items-center justify-start">
        <div className="w-full flex flex-col md:flex-row items-start md:items-start justify-start px-4 sm:px-6 md:px-12 lg:px-16 pt-16 sm:pt-20 md:py-0 gap-4 md:gap-4">
          {/* Left - Navigation */}
          <nav className="space-y-2 sm:space-y-3 md:space-y-6 shrink-0 text-left">
        <div className="w-full flex flex-col md:flex-row items-start md:items-start justify-start px-4 sm:px-6 md:px-12 lg:px-16 pt-20 md:py-0 gap-6 md:gap-4">
          {/* Left - Navigation */}
          <nav className="space-y-3 sm:space-y-4 md:space-y-6 shrink-0 text-left">
            {['Shows', 'Releases', 'Purchase', 'Playlists'].map((item) => {
              const panelKey = item.toLowerCase() as ActivePanel
              const isActive = activePanel === panelKey
              return (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="block text-left group"
                >
                  <span 
                    className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extralight tracking-tight transition-all duration-300 inline-block"
                    style={{
                      color: isActive ? '#44ddaa' : 'rgba(255,255,255,0.4)',
                      transform: isActive ? 'translateX(8px)' : 'translateX(0)',
                    }}
                  >
                    {item}
                  </span>
                  <span className="ml-2 sm:ml-3 text-base sm:text-lg inline-block" style={{ color: isActive ? '#44ddaa' : 'rgba(255,255,255,0.3)', transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                    →
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Panels - all same position on mobile, overlapping cards on desktop */}
          <div className="relative flex-1 mt-4 md:mt-0 h-[62vh] sm:h-[58vh] md:h-[70vh]">
            <div className={`absolute top-0 left-0 md:left-0 ${activePanel !== 'shows' ? 'pointer-events-none' : ''}`}>
              <ShowsList isOpen={activePanel === 'shows'} />
            </div>
            <div className={`absolute top-0 left-0 md:left-[8vw] ${activePanel !== 'releases' ? 'pointer-events-none' : ''}`}>
              <ReleasesList isOpen={activePanel === 'releases'} />
            </div>
            <div className={`absolute top-0 left-0 md:left-[16vw] ${activePanel !== 'purchase' ? 'pointer-events-none' : ''}`}>
              <PurchaseList isOpen={activePanel === 'purchase'} />
            </div>
            <div className={`absolute top-0 left-0 md:left-auto md:right-0 ${activePanel !== 'playlists' ? 'pointer-events-none' : ''}`}>
          <div className="relative flex-1 mt-6 md:mt-0 h-[50vh] md:h-[70vh]">
            <div className="absolute top-0 left-0 md:left-0">
              <ShowsList isOpen={activePanel === 'shows'} />
            </div>
            <div className="absolute top-0 left-0 md:left-[8vw]">
              <ReleasesList isOpen={activePanel === 'releases'} />
            </div>
            <div className="absolute top-0 left-0 md:left-[16vw]">
              <PurchaseList isOpen={activePanel === 'purchase'} />
            </div>
            <div className="absolute top-0 left-0 md:left-auto md:right-0">
              <PlaylistList isOpen={activePanel === 'playlists'} />
            </div>
          </div>
        </div>
      </div>
    </section>
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
    </div>
  )
}
