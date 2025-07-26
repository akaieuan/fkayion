'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { UnifiedDynamicOrb } from '../../components/link-comps/unified-dynamic-orb'

interface Link {
  label: string
  url: string
  color: string
  hoverColor: string
}

interface LayoutConfig {
  mobileView: {
    linksPerPage: number
    autoSwitchInterval: number
  }
  fog: {
    colors: string[]
  }
}

interface LinksClientProps {
  linksData: Link[]
  layoutConfig: LayoutConfig
}

// Custom hook for mobile detection
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

export function LinksClient({ linksData, layoutConfig }: LinksClientProps) {
  const router = useRouter()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [currentMobileLinkIndex, setCurrentMobileLinkIndex] = useState(0)
  const isMobile = useIsMobile()

  // Auto-switch for mobile
  useEffect(() => {
    if (!isMobile) return

    const interval = setInterval(() => {
      setCurrentMobileLinkIndex((prev) => (prev + 1) % linksData.length)
    }, layoutConfig.mobileView.autoSwitchInterval)

    return () => clearInterval(interval)
  }, [isMobile, linksData.length, layoutConfig.mobileView.autoSwitchInterval])

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank')
  }

  const handleLinkHover = (linkLabel: string | null) => {
    setHoveredLink(linkLabel)
  }

  const navigateToLink = (direction: 'prev' | 'next') => {
    const currentIndex = currentMobileLinkIndex
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % linksData.length 
      : (currentIndex - 1 + linksData.length) % linksData.length
    setCurrentMobileLinkIndex(newIndex)
  }

  // Get current colors based on mobile state
  const currentLink = isMobile ? linksData[currentMobileLinkIndex] : null
  const orbColor = hoveredLink 
    ? linksData.find(link => link.label === hoveredLink)?.color || '#6655cc'
    : currentLink?.color || '#6655cc'
  const orbHoverColor = hoveredLink 
    ? linksData.find(link => link.label === hoveredLink)?.hoverColor || '#aa88ff'
    : currentLink?.hoverColor || '#aa88ff'

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-black">
      {/* FIXED HEADER with proper padding to avoid browser header cutoff */}
      <div className="absolute top-0 left-0 right-0 z-40 pt-16 px-6">
        <div className="flex items-center justify-between">
          {/* Back button */}
          <button
            onClick={() => router.push('/')}
            className="text-white hover:text-gray-300 transition-colors duration-200 p-2 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/20"
          >
            ← Home
          </button>
          
          {/* Page Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wider">
            LINKS
          </h1>
          
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Mobile Navigation - Only visible on mobile */}
      {isMobile && (
        <>
          {/* Mobile link indicator */}
          <div className="absolute top-32 left-0 right-0 z-30 text-center">
            <h2 className="text-xl font-semibold text-white mb-2">{currentLink?.label}</h2>
            <div className="flex justify-center space-x-2">
              {linksData.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentMobileLinkIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Mobile navigation arrows */}
          <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-8">
            <button
              onClick={() => navigateToLink('prev')}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
            >
              ←
            </button>
            <button
              onClick={() => handleLinkClick(currentLink?.url || '')}
              className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
            >
              Visit Link
            </button>
            <button
              onClick={() => navigateToLink('next')}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
            >
              →
            </button>
          </div>
        </>
      )}

      {/* Desktop Layout */}
      {!isMobile && (
        <div className="absolute inset-0 z-20 flex">
          {/* Left side - Links list without scroll */}
          <div className="w-1/2 flex flex-col justify-center px-16">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white mb-6 opacity-80">Links</h2>
              {linksData.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleLinkClick(link.url)}
                  onMouseEnter={() => handleLinkHover(link.label)}
                  onMouseLeave={() => handleLinkHover(null)}
                  className="w-full text-left py-3 px-5 rounded-xl bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 text-white hover:bg-gray-800/70 hover:border-gray-600/70 transition-all duration-300 group"
                  style={{
                    background: hoveredLink === link.label 
                      ? `linear-gradient(135deg, ${link.color}20, ${link.hoverColor}10)`
                      : undefined,
                    borderColor: hoveredLink === link.label ? `${link.color}60` : undefined
                  }}
                >
                  <span className="text-lg font-medium group-hover:text-opacity-100 text-opacity-90">
                    {link.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Dynamic orb */}
          <div className="w-1/2 relative">
            <UnifiedDynamicOrb
              activeLink={hoveredLink}
              color={orbColor}
              hoverColor={orbHoverColor}
              size={3.5}
            />
          </div>
        </div>
      )}

      {/* Mobile Layout - Enhanced orb display */}
      {isMobile && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="w-full h-full relative pt-16 pb-32">
            <UnifiedDynamicOrb
              activeLink={hoveredLink}
              color={orbColor}
              hoverColor={orbHoverColor}
              size={3.2}
            />
          </div>
        </div>
      )}

      {/* Instructions - Updated for mobile */}
      <div className="absolute bottom-4 left-4 right-4 z-30 text-center">
        <p className="text-white/60 text-sm">
          {isMobile 
            ? 'Tap arrows to navigate • Tap "Visit Link" to open'
            : 'Hover over links to see dynamic animations • Click to visit'
          }
        </p>
      </div>

      {/* Subtle gradient overlay for depth */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.3) 100%)`
        }}
      />
    </div>
  )
} 