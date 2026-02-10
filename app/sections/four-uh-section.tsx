'use client'

import { useState } from 'react'
import { ShowsList, ReleasesList, PurchaseList, PlaylistList } from '@/components/shared/lists'

type ActivePanel = 'shows' | 'releases' | 'purchase' | 'playlists' | null

export function FourUHSection() {
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
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <video autoPlay loop muted playsInline className="w-auto h-auto max-w-none opacity-40" style={{ minWidth: '40%', minHeight: '40%', objectFit: 'contain' }}>
          <source src="/4uh-aka.webm" type="video/webm" />
        </video>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 100%)' }} />

      <div className="relative h-full flex flex-col">
        <div className="w-full flex flex-col flex-1 min-h-0 px-4 sm:px-6 md:px-12 lg:px-16 pt-16 sm:pt-20 md:py-8 gap-4">
          {/* Horizontal tabs above content */}
          <nav className="flex flex-wrap gap-2 sm:gap-4 shrink-0">
            {['Shows', 'Releases', 'Purchase', 'Playlists'].map((item) => {
              const panelKey = item.toLowerCase() as ActivePanel
              const isActive = activePanel === panelKey
              return (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="group flex items-center gap-1.5 sm:gap-2 py-2 transition-all duration-300"
                >
                  <span 
                    className="text-sm sm:text-base md:text-lg font-extralight tracking-tight transition-all duration-300"
                    style={{
                      color: isActive ? '#44ddaa' : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {item}
                  </span>
                  <span 
                    className="text-sm transition-transform duration-300" 
                    style={{ color: isActive ? '#44ddaa' : 'rgba(255,255,255,0.3)', transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)' }}
                  >
                    →
                  </span>
                </button>
              )
            })}
          </nav>

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
    </section>
  )
}
