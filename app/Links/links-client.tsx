'use client'

import { useState, useEffect } from 'react'
import { UnifiedDynamicOrb } from '../../components/link-comps/unified-dynamic-orb'

// Greenish-white hover color matching orb
const hoverColor = '#44ddaa'

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
  onNavigate
}: { 
  link: Link
  index: number
  onHover: (label: string | null) => void
  onNavigate: (url: string) => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  // Staggered entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 60)
    return () => clearTimeout(timer)
  }, [index])
  
  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover(link.label)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onHover(null)
  }

  // Grid position determines animation direction
  const row = Math.floor(index / 3)
  const col = index % 3
  
  // Each cell animates from a different direction based on position
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
  
  // First column items should not have left padding for alignment
  const isFirstCol = index % 3 === 0
  
  return (
    <button
      onClick={() => onNavigate(link.url)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative py-3 sm:py-3 pr-2 sm:pr-4 text-left transition-all duration-300 group ${isFirstCol ? 'pl-0' : 'pl-2 sm:pl-4'}`}
      className={`relative py-3 pr-4 text-left transition-all duration-300 group ${isFirstCol ? 'pl-0' : 'pl-4'}`}
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
        className="relative text-sm font-light tracking-wide transition-colors duration-200"
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

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank')
  }

  const handleLinkHover = (linkLabel: string | null) => {
    setHoveredLink(linkLabel)
  }

  const defaultColor = linksData[0]?.color || '#6655cc'
  const defaultHover = linksData[0]?.hoverColor || '#aa88ff'
  const orbColor = hoveredLink 
    ? linksData.find(link => link.label === hoveredLink)?.color || defaultColor
    : defaultColor
  const orbHoverColor = hoveredLink 
    ? linksData.find(link => link.label === hoveredLink)?.hoverColor || defaultHover
    : defaultHover

  return (
    <div className="relative w-full min-h-screen">
      {/* Full-screen orb canvas */}
      <div className="absolute inset-0">
        <UnifiedDynamicOrb
          activeLink={hoveredLink}
          color={orbColor}
          hoverColor={orbHoverColor}
          size={0.9}
        />
      </div>

      {/* Floating content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1 flex items-start md:items-center">
          <div className="w-full px-4 pt-14 pb-16 sm:px-6 md:px-12 lg:px-16">
            {/* Title */}
            <div className="mb-6">
              <h1 className="text-lg sm:text-xl text-gray-500/80 font-light tracking-wide">
                links
              </h1>
              <p className="text-white/25 text-xs mt-1 font-light">
                social · music · writing
              </p>
            </div>

            {/* Responsive Grid */}
            <div className="relative">
              <div className="absolute -inset-4 bg-zinc-800/80 backdrop-blur-2xl backdrop-saturate-150 rounded-2xl -z-10" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-2 w-full max-w-[280px] sm:max-w-[340px] md:max-w-[360px] p-3 sm:p-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-1 max-w-[320px] sm:max-w-[360px] md:max-w-[320px] p-2">
                {linksData.slice(0, 9).map((link, index) => (
                  <GridLinkItem 
                    key={link.label}
                    link={link}
                    index={index}
                    onHover={handleLinkHover}
                    onNavigate={handleLinkClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Subtle hint at bottom */}
        <div className="pb-6 flex justify-center pointer-events-none">
          <p className="text-white/15 text-xs font-light">
            hover or tap to interact
          </p>
        </div>
      </div>
    </div>
  )
}
