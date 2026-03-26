'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
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
      type="button"
      onClick={() => window.open(link.url, '_blank')}
      onMouseEnter={() => { setIsHovered(true); onHover(link.label) }}
      onMouseLeave={() => { setIsHovered(false); onHover(null) }}
      className="relative py-3 px-0 text-left transition-all duration-300"
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
  const [mobileLinkIndex, setMobileLinkIndex] = useState(0)
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

  // Small screens: orb follows the link selected with ← → (desktop still uses hover on grid)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(max-width: 767px)').matches) return
    if (!isInView) {
      setHoveredLink(null)
      return
    }
    setHoveredLink(linksData[mobileLinkIndex]?.label ?? null)
  }, [mobileLinkIndex, isInView])
  
  const orbColor = hoveredLink ? linksData.find(l => l.label === hoveredLink)?.color || '#6655cc' : '#6655cc'
  const orbHoverColor = hoveredLink ? linksData.find(l => l.label === hoveredLink)?.hoverColor || '#aa88ff' : '#aa88ff'

  const goNextMobile = useCallback(() => {
    setMobileLinkIndex((i) => (i >= linksData.length - 1 ? 0 : i + 1))
  }, [])

  const openCurrentMobileLink = useCallback(() => {
    const link = linksData[mobileLinkIndex]
    if (link) window.open(link.url, '_blank')
  }, [mobileLinkIndex])

  return (
    <section ref={sectionRef} id="section-1" className="h-screen w-full relative snap-start">
      <div className="absolute inset-0">
        <UnifiedDynamicOrb activeLink={hoveredLink} color={orbColor} hoverColor={orbHoverColor} size={1.0} />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full flex items-center justify-start pt-14 pb-16">
          <div className="pointer-events-auto px-6 sm:px-8 md:px-16 lg:px-24">
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
            {/* Small screens: link first, squircle arrows below — orb updates as you browse */}
            <div className="relative z-30 md:hidden w-full max-w-[min(100%,17rem)]">
              <div className="flex flex-col items-stretch gap-2.5">
                <button
                  type="button"
                  onClick={openCurrentMobileLink}
                  className="w-full rounded-[1rem] border border-white/[0.12] bg-black/35 px-3.5 py-2.5 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] active:scale-[0.99] active:bg-white/[0.06]"
                >
                  <span className="text-[13px] font-light tracking-wide text-white/[0.9]">
                    {linksData[mobileLinkIndex]?.label}
                  </span>
                </button>
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    aria-label="Next link"
                    onClick={goNextMobile}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.85rem] border border-white/[0.14] bg-white/[0.03] text-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/25 hover:bg-emerald-400/[0.07] hover:text-emerald-200/90 active:scale-95"
                  >
                    <span className="text-[13px] font-light leading-none">→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* md+: original grid + hover orb */}
            <div className="hidden md:flex flex-wrap gap-x-6 gap-y-1 w-full max-w-[320px]">
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
