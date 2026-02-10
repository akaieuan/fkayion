'use client'

import { useState, useEffect } from 'react'
import { UnifiedDynamicOrb } from '@/components/shared/orbs'

// Greenish-white hover color matching orb
const hoverColor = '#44ddaa'

const LINK_DESCRIPTIONS: Record<string, string> = {
  SoundCloud: 'The primary hub for mixes, DJ sets, and live recordings. Stream the full catalog of original productions and collaborative work.',
  'aka.write': 'Long-form writing on digital culture, AI, and music. Essays, reflections, and research published on Kraa.',
  Ubik: 'Creative studio for web experiences, digital interfaces, and experimental design projects.',
  Bandcamp: 'Purchase and download original albums, EPs, and singles directly. Support independent music.',
  Spotify: 'Stream all releases and follow for new music. Available across aka ieuan and yion artist profiles.',
  YouTube: 'Video content including live sets, visual experiments, and music videos.',
  Instagram: 'Visual updates, behind-the-scenes, and event announcements.',
}

interface Link {
  label: string
  url: string
  color: string
  hoverColor: string
}

interface LinksClientProps {
  linksData: Link[]
}

function GridLinkItem({ 
  link, 
  index,
  onHover,
  onClick
}: { 
  link: Link
  index: number
  onHover: (label: string | null) => void
  onClick: (link: Link) => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 60)
    return () => clearTimeout(timer)
  }, [index])
  
  const handleMouseEnter = () => { setIsHovered(true); onHover(link.label) }
  const handleMouseLeave = () => { setIsHovered(false); onHover(null) }

  const getInitialTransform = () => {
    const directions = [
      'translate3d(-20px, -20px, 0)', 'translate3d(0, -25px, 0)', 'translate3d(20px, -20px, 0)',
      'translate3d(-25px, 0, 0)', 'translate3d(0, 0, 0) scale(0.8)', 'translate3d(25px, 0, 0)',
      'translate3d(-20px, 20px, 0)', 'translate3d(0, 25px, 0)', 'translate3d(20px, 20px, 0)',
    ]
    return directions[index] || 'translate3d(0, 20px, 0)'
  }
  
  return (
    <button
      onClick={() => onClick(link)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative py-3 px-2 sm:px-4 text-left transition-all duration-300 group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? 'translate3d(0, 0, 0) scale(1)' 
          : getInitialTransform(),
        transition: `opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)`,
        transitionDelay: `${index * 60}ms`,
      }}
    >
      {/* Link text */}
      <span 
        className="relative text-base sm:text-sm font-light tracking-wide transition-colors duration-200"
        style={{
          color: isHovered ? hoverColor : 'rgba(255,255,255,0.5)',
        }}
      >
        {link.label}
      </span>
    </button>
  )
}

export function LinksClient({ linksData }: LinksClientProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [selectedLink, setSelectedLink] = useState<Link | null>(null)

  const handleLinkClick = (link: Link) => {
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches) {
      window.open(link.url, '_blank')
    } else {
      setSelectedLink(link)
    }
  }

  const handleLinkHover = (linkLabel: string | null) => {
    setHoveredLink(linkLabel)
  }

  const activeLinkForOrb = selectedLink ? selectedLink.label : hoveredLink
  const defaultColor = linksData[0]?.color || '#6655cc'
  const defaultHover = linksData[0]?.hoverColor || '#aa88ff'
  const orbColor = activeLinkForOrb 
    ? linksData.find(link => link.label === activeLinkForOrb)?.color || defaultColor
    : defaultColor
  const orbHoverColor = activeLinkForOrb 
    ? linksData.find(link => link.label === activeLinkForOrb)?.hoverColor || defaultHover
    : defaultHover

  return (
    <div className="relative w-full min-h-screen">
      <div className="absolute inset-0">
        <UnifiedDynamicOrb
          activeLink={activeLinkForOrb}
          color={orbColor}
          hoverColor={orbHoverColor}
          size={0.9}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1 flex items-start md:items-center">
          <div className="relative w-full px-4 pt-14 pb-16 sm:px-6 md:px-12 lg:px-16">
            {/* Title */}
            <div className="mb-6">
              <h1 className="text-lg sm:text-xl text-gray-500/80 font-light tracking-wide">
                links
              </h1>
              <p className="text-white/25 text-xs mt-1 font-light">
                social · music · writing
              </p>
            </div>

            {/* Grid - hidden on small screens when detail panel is shown */}
            <div 
              className={`relative transition-opacity duration-300 md:opacity-100 ${
                selectedLink ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100'
              }`}
            >
              <div className="absolute -inset-4 bg-zinc-800/80 backdrop-blur-2xl backdrop-saturate-150 rounded-2xl -z-10" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-2 w-full max-w-[280px] sm:max-w-[340px] md:max-w-[360px] p-3 sm:p-2">
                {linksData.slice(0, 9).map((link, index) => (
                  <GridLinkItem 
                    key={link.label}
                    link={link}
                    index={index}
                    onHover={handleLinkHover}
                    onClick={handleLinkClick}
                  />
                ))}
              </div>
            </div>

            {/* Detail panel - small screens only when link selected */}
            {selectedLink && (
              <div 
                className="md:hidden absolute top-0 left-0 right-0 pt-14 px-4 pb-16 flex flex-col transition-opacity duration-300"
              >
                <div className="absolute -inset-4 bg-zinc-800/90 backdrop-blur-2xl backdrop-saturate-150 rounded-2xl -z-10" />
                <div className="flex flex-col gap-6">
                  <button
                    onClick={() => setSelectedLink(null)}
                    className="self-start text-white/50 hover:text-white/80 text-sm font-light tracking-wide transition-colors"
                  >
                    ← Back
                  </button>
                  <h2 
                    className="text-xl font-light tracking-wide transition-colors"
                    style={{ color: selectedLink.color }}
                  >
                    {selectedLink.label}
                  </h2>
                  <p className="text-white/70 text-sm font-light leading-relaxed">
                    {LINK_DESCRIPTIONS[selectedLink.label] || 'Explore this link.'}
                  </p>
                  <a
                    href={selectedLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 self-start py-2 px-4 rounded-lg text-sm font-light tracking-wide transition-colors hover:opacity-90"
                    style={{ 
                      backgroundColor: selectedLink.color,
                      color: '#000',
                    }}
                  >
                    Go to {selectedLink.label} →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pb-6 flex justify-center pointer-events-none">
          <p className="text-white/15 text-xs font-light">
            {selectedLink ? 'tap to open link' : 'hover or tap to interact'}
          </p>
        </div>
      </div>
    </div>
  )
}
