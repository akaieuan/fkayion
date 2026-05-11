'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShowsList, ReleasesList, PurchaseList, PlaylistList } from '@/components/shared/lists'

type ActivePanel = 'shows' | 'releases' | 'purchase' | 'playlists' | null

interface NavItemProps {
  label: string
  isActive: boolean
  onClick: () => void
  hasDropdown?: boolean
  isOpen?: boolean
}

function NavItem({ label, isActive, onClick, hasDropdown, isOpen }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex items-center gap-1.5 sm:gap-2 py-2 transition-all duration-300"
    >
      <span 
        className="text-sm sm:text-base md:text-lg font-extralight tracking-tight transition-all duration-300"
        style={{
          color: isActive || isHovered ? '#44ddaa' : 'rgba(255,255,255,0.4)',
          transition: 'color 0.3s ease-out',
        }}
      >
        {label}
      </span>
      {hasDropdown && (
        <span 
          className="text-sm transition-transform duration-300"
          style={{
            color: isActive ? '#44ddaa' : 'rgba(255,255,255,0.3)',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        >
          →
        </span>
      )}
    </button>
  )
}

export function FourUHClient() {
  const router = useRouter()
  const [activePanel, setActivePanel] = useState<ActivePanel>('shows')

  const handleNavClick = (section: string) => {
    const panelMap: Record<string, ActivePanel> = {
      'Shows': 'shows',
      'Releases': 'releases',
      'Purchase': 'purchase',
      'Playlists': 'playlists',
    }
    
    const panel = panelMap[section]
    if (panel) {
      // Toggle: if same panel clicked, close it; otherwise open the new one
      setActivePanel(activePanel === panel ? null : panel)
    }
  }

  return (
    <div className="h-full w-full relative overflow-hidden">
      {/* Video background - centered */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-auto h-auto max-w-none opacity-40"
          style={{
            minWidth: '40%',
            minHeight: '40%',
            objectFit: 'contain',
          }}
        >
          <source src="/4uh-aka.webm" type="video/webm" />
        </video>
      </div>

      {/* Gradient overlays for text readability */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Main content container */}
      <div className="relative min-h-full">
        <div className="flex flex-col min-h-screen">
          <div className="w-full flex-1 min-h-0 flex flex-col px-4 sm:px-6 md:px-8 lg:px-16 pt-20 md:py-20 gap-4">
            {/* Horizontal tabs above content */}
            <nav className="flex flex-wrap gap-2 sm:gap-4 shrink-0">
              <NavItem 
                label="Shows" 
                isActive={activePanel === 'shows'}
                onClick={() => handleNavClick('Shows')}
                hasDropdown
                isOpen={activePanel === 'shows'}
              />
              <NavItem 
                label="Releases" 
                isActive={activePanel === 'releases'}
                onClick={() => handleNavClick('Releases')}
                hasDropdown
                isOpen={activePanel === 'releases'}
              />
              <NavItem 
                label="Purchase" 
                isActive={activePanel === 'purchase'}
                onClick={() => handleNavClick('Purchase')}
                hasDropdown
                isOpen={activePanel === 'purchase'}
              />
              <NavItem 
                label="Playlists" 
                isActive={activePanel === 'playlists'}
                onClick={() => handleNavClick('Playlists')}
                hasDropdown
                isOpen={activePanel === 'playlists'}
              />
            </nav>

            {/* Content panels - stretch to fill */}
            <div className="relative flex-1 min-h-0">
              <div className={`absolute inset-0 ${activePanel !== 'shows' ? 'pointer-events-none' : ''}`}>
                <ShowsList isOpen={activePanel === 'shows'} />
              </div>
              <div className={`absolute inset-0 ${activePanel !== 'releases' ? 'pointer-events-none' : ''}`}>
                <ReleasesList isOpen={activePanel === 'releases'} />
              </div>
              <div className={`absolute inset-0 ${activePanel !== 'purchase' ? 'pointer-events-none' : ''}`}>
                <PurchaseList isOpen={activePanel === 'purchase'} />
              </div>
              <div className={`absolute inset-0 ${activePanel !== 'playlists' ? 'pointer-events-none' : ''}`}>
                <PlaylistList isOpen={activePanel === 'playlists'} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA - Visualizer link */}
        <div className="fixed bottom-8 left-8 md:left-16 lg:left-24">
          <button
            onClick={() => router.push('/Visualizer-Eden')}
            className="group flex items-center gap-3 text-white/30 hover:text-white/70 transition-all duration-300"
          >
            <span className="text-sm font-light tracking-wide">
              visualize your track
            </span>
            <span 
              className="text-xs transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
