'use client'

import { useState, useCallback } from 'react'
import { ShowsList, ReleasesList, PurchaseList, PlaylistList } from '@/components/shared/lists'

const PANELS = ['Shows', 'Releases', 'Purchase', 'Playlists'] as const
type PanelName = (typeof PANELS)[number]
type ActivePanel = Lowercase<PanelName>

export function FourUHSection() {
  const [panelIndex, setPanelIndex] = useState(0)

  const activePanel = PANELS[panelIndex].toLowerCase() as ActivePanel

  const goNext = useCallback(() => {
    setPanelIndex((i) => (i >= PANELS.length - 1 ? 0 : i + 1))
  }, [])

  return (
    <section id="section-4" className="h-screen w-full relative snap-start overflow-visible">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <video autoPlay loop muted playsInline className="w-auto h-auto max-w-none opacity-40" style={{ minWidth: '40%', minHeight: '40%', objectFit: 'contain' }}>
          <source src="/4uh-aka.webm" type="video/webm" />
        </video>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 100%)' }} />

      <div className="relative h-full flex flex-col md:justify-center md:pt-14 md:pb-16">
        <div className="w-full flex flex-col flex-1 min-h-0 px-6 sm:px-8 md:w-[420px] lg:w-[480px] md:px-0 md:ml-16 lg:ml-24 md:flex-none gap-3 max-md:pt-[max(9rem,calc(5rem+env(safe-area-inset-top,0px)))] max-md:pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))]">

          {/* Small screen: squircle label + single → arrow */}
          <div className="md:hidden flex items-center gap-2.5">
            <div className="rounded-[0.9rem] border border-white/[0.12] bg-black/35 px-3.5 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-md">
              <span className="text-[11px] font-medium tracking-widest uppercase text-white/75">
                {PANELS[panelIndex]}
              </span>
            </div>
            <button
              type="button"
              aria-label="Next section"
              onClick={goNext}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.85rem] border border-white/[0.14] bg-white/[0.03] text-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/25 hover:bg-emerald-400/[0.07] hover:text-emerald-200/90 active:scale-95"
            >
              <span className="text-[12px] font-light leading-none">→</span>
            </button>
          </div>

          {/* Large screen: plain text tab row */}
          <nav
            className="hidden md:flex shrink-0 flex-nowrap items-center gap-x-3 border-b border-white/[0.06] pb-1.5"
            aria-label="4UH sections"
          >
            {PANELS.map((item, i) => (
              <button
                key={item}
                type="button"
                onClick={() => setPanelIndex(i)}
                className={`shrink-0 whitespace-nowrap text-[10px] font-medium uppercase tracking-wide transition-colors ${
                  i === panelIndex ? 'text-emerald-300/95' : 'text-white/35 hover:text-white/60'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* List panels */}
          <div className="relative min-h-0 max-h-[min(52vh,calc(100dvh-15rem))] md:h-[400px] md:max-h-[400px] lg:h-[440px] lg:max-h-[440px] overscroll-y-contain flex-1 md:flex-none">
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
