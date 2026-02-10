'use client'

import { useState, useRef, useEffect } from 'react'
import { UnifiedDynamicOrb } from '@/components/shared/orbs'

const linksData = [
  { label: 'SoundCloud', url: 'https://soundcloud.com/akaieuan', color: '#aa22ff', hoverColor: '#cc44ff' },
  { label: 'aka.write', url: 'https://kraa.io/akaieuan', color: '#88ff22', hoverColor: '#aaff44' },
  { label: 'Ubik', url: 'https://ubik.studio', color: '#ff4422', hoverColor: '#ff6644' },
  { label: 'Bandcamp', url: 'https://akaieuan.bandcamp.com/', color: '#22aaff', hoverColor: '#44ccff' },
  { label: 'Spotify', url: 'https://open.spotify.com/artist/5OwuCYMg2wmmh3QofLLIPe', color: '#aa22ff', hoverColor: '#cc44ff' },
  { label: 'YouTube', url: 'https://www.youtube.com/channel/UC6etRnx7fZEtoVAI-phCu6Q', color: '#ff2288', hoverColor: '#ff44aa' },
  { label: 'Instagram', url: 'https://instagram.com/aka.ieuan/', color: '#ff6b9d', hoverColor: '#ff8fa3' }
]

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
  
  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), index * 80)
      return () => clearTimeout(timer)
    }
  }, [isInView, hasAnimated, index])
  
  useEffect(() => {
    if (!isInView) setHasAnimated(false)
  }, [isInView])
  
  const getInitialTransform = () => {
    const directions = [
      'translate3d(-20px, -20px, 0)',
      'translate3d(0, -25px, 0)',
      'translate3d(20px, -20px, 0)',
      'translate3d(-25px, 0, 0)',
      'translate3d(0, 0, 0) scale(0.8)',
      'translate3d(25px, 0, 0)',
      'translate3d(-20px, 20px, 0)',
      'translate3d(0, 25px, 0)',
      'translate3d(20px, 20px, 0)',
    ]
    return directions[index] || 'translate3d(0, 20px, 0)'
  }
  
  return (
    <button
      onClick={() => window.open(link.url, '_blank')}
      onMouseEnter={() => { setIsHovered(true); onHover(link.label) }}
      onMouseLeave={() => { setIsHovered(false); onHover(null) }}
      className="relative py-3 px-4 text-left transition-all duration-300"
      style={{
        opacity: hasAnimated ? 1 : 0,
        transform: hasAnimated ? 'translate3d(0, 0, 0) scale(1)' : getInitialTransform(),
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

export function LinksSection() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) setIsInView(true)
        else if (!entry.isIntersecting) setIsInView(false)
      },
      { threshold: [0, 0.2, 0.5, 1] }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])
  
  const orbColor = hoveredLink ? linksData.find(l => l.label === hoveredLink)?.color || '#6655cc' : '#6655cc'
  const orbHoverColor = hoveredLink ? linksData.find(l => l.label === hoveredLink)?.hoverColor || '#aa88ff' : '#aa88ff'

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
