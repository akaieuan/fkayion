'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
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
    autoSwitchInterval?: number // Made optional since we removed auto-cycling
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

  // Removed auto-cycling - user has manual control

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
    <div className="w-full h-full relative overflow-hidden">
      {/* Mobile Layout */}
      {isMobile && (
        <>
          {/* Mobile link title and indicator - higher up to be visible */}
          <div className="absolute top-4 left-0 right-0 z-40 text-center px-4">
            <h2 className="text-2xl font-bold text-white mb-3">{currentLink?.label}</h2>
            <div className="flex justify-center space-x-3">
              {linksData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMobileLinkIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentMobileLinkIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Mobile orb display - floating on whole page */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pt-20 pb-32">
            <div className="w-full h-full max-w-sm max-h-96 flex items-center justify-center">
              <UnifiedDynamicOrb
                activeLink={currentLink?.label || null}
                color={orbColor}
                hoverColor={orbHoverColor}
                size={1.3}
              />
            </div>
          </div>

          {/* Mobile navigation - clean without borders */}
          <div className="absolute bottom-8 left-0 right-0 z-40 px-6">
            <div className="flex justify-center items-center space-x-4 bg-black/30 backdrop-blur-lg rounded-2xl p-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateToLink('prev')}
                className="w-12 h-12 rounded-full bg-transparent border-white/40 text-white hover:bg-white/20 hover:border-white/60"
              >
                ←
              </Button>
              <Button
                variant="outline"
                onClick={() => handleLinkClick(currentLink?.url || '')}
                className="px-6 py-2 bg-transparent border-white/40 text-white hover:bg-white/20 hover:border-white/60"
              >
                Visit
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateToLink('next')}
                className="w-12 h-12 rounded-full bg-transparent border-white/40 text-white hover:bg-white/20 hover:border-white/60"
              >
                →
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Desktop Layout */}
      {!isMobile && (
        <>
          {/* Desktop content - no title, more space for orb */}
          <div className="absolute inset-0 z-20 flex">
            {/* Left side - Compact links list */}
            <div className="w-1/3 flex flex-col justify-center px-6 py-8">
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-white mb-4 opacity-80">Navigate</h2>
                {linksData.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => handleLinkClick(link.url)}
                    onMouseEnter={() => handleLinkHover(link.label)}
                    onMouseLeave={() => handleLinkHover(null)}
                    className="w-full text-left py-2 px-4 rounded-lg bg-gray-900/40 backdrop-blur-sm border border-gray-700/30 text-white hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300 group"
                    style={{
                      background: hoveredLink === link.label 
                        ? `linear-gradient(135deg, ${link.color}20, ${link.hoverColor}10)`
                        : undefined,
                      borderColor: hoveredLink === link.label ? `${link.color}60` : undefined
                    }}
                  >
                    <span className="text-sm font-medium group-hover:text-opacity-100 text-opacity-90">
                      {link.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right side - Dynamic orb taking more space, floating freely */}
            <div className="w-2/3 relative flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center">
                <UnifiedDynamicOrb
                  activeLink={hoveredLink}
                  color={orbColor}
                  hoverColor={orbHoverColor}
                  size={1.3}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Instructions - responsive */}
      <div className="absolute bottom-2 left-4 right-4 z-30 text-center">
        <p className="text-white/50 text-xs">
          {isMobile 
            ? 'Tap arrows to navigate • Tap dots to jump • Tap Visit to open'
            : 'Hover over links to see animations • Click to visit'
          }
        </p>
      </div>
    </div>
  )
} 