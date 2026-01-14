'use client'

import { useState } from 'react'

export interface PurchaseItem {
  title: string
  type: 'album' | 'track' | 'merch'
  url: string
}

// Data from https://akaieuan.bandcamp.com/
export const purchaseData: PurchaseItem[] = [
  { title: 'Chaotic Networks [live]', type: 'album', url: 'https://akaieuan.bandcamp.com/album/chaotic-networks-live' },
  { title: 'The Veil Of Kobol [live]', type: 'album', url: 'https://akaieuan.bandcamp.com/album/the-veil-of-kobol-live' },
  { title: 'Birth in the Cavryn [live]', type: 'track', url: 'https://akaieuan.bandcamp.com/track/birth-in-the-cavryn-live' },
  { title: 'Calls with Fermi [live]', type: 'track', url: 'https://akaieuan.bandcamp.com/track/calls-with-fermi-live' },
  { title: 'EXT.AKA.8+', type: 'album', url: 'https://akaieuan.bandcamp.com/album/ext-aka-8' },
  { title: 'Algorithmic Oppression [live]', type: 'album', url: 'https://akaieuan.bandcamp.com/album/algorithmic-oppression-live' },
  { title: 'Making Love in 2009 [live]', type: 'track', url: 'https://akaieuan.bandcamp.com/track/making-love-in-2009-live' },
  { title: 'Rolling Pressure [live]', type: 'track', url: 'https://akaieuan.bandcamp.com/track/rolling-pressure-live' },
  { title: 'False Promises [live]', type: 'album', url: 'https://akaieuan.bandcamp.com/album/false-promises-live' },
  { title: '2008core [live]', type: 'album', url: 'https://akaieuan.bandcamp.com/album/2008core-live' },
  { title: 'Synth Organoid [4UH.007] [live]', type: 'album', url: 'https://akaieuan.bandcamp.com/album/synth-organoid-4uh-007-live' },
  { title: 'Entering Chromeostasis [4UH.005] [live]', type: 'album', url: 'https://akaieuan.bandcamp.com/album/entering-chromeostasis-4uh-005-live' },
  { title: 'Slate Annwn [4UH001]', type: 'album', url: 'https://akaieuan.bandcamp.com/album/slate-annwn-4uh001' },
  { title: 'Orbital Momentum [4UH.002]', type: 'album', url: 'https://akaieuan.bandcamp.com/album/orbital-momentum-4uh-002' },
  { title: 'Making Contact [4UH.003]', type: 'album', url: 'https://akaieuan.bandcamp.com/album/making-contact-4uh-003' },
  { title: 'Galactica [4UH.004] [live]', type: 'track', url: 'https://akaieuan.bandcamp.com/track/galactica-4uh-004-live' },
  { title: 'Sonic Ecology [4UH000]', type: 'album', url: 'https://akaieuan.bandcamp.com/album/sonic-ecology-4uh000' },
  { title: 'M4UH - Music 4 Ur Health', type: 'album', url: 'https://akaieuan.bandcamp.com/album/m4uh-music-4-ur-health' },
  { title: 'HB2 - HealthBoost2', type: 'album', url: 'https://akaieuan.bandcamp.com/album/hb2-healthboost2' },
  { title: 'YYY', type: 'album', url: 'https://akaieuan.bandcamp.com/album/yyy' },
  { title: 'Visualizer Eden', type: 'track', url: 'https://akaieuan.bandcamp.com/track/visualizer-eden' },
  { title: 'Digital Rain 4', type: 'album', url: 'https://akaieuan.bandcamp.com/album/digital-rain-4' },
  { title: 'Purgatory', type: 'album', url: 'https://akaieuan.bandcamp.com/album/purgatory' },
  { title: 'V0013', type: 'track', url: 'https://akaieuan.bandcamp.com/track/v0013' },
  { title: 'Girls Just Want Breaks (yion flip)', type: 'track', url: 'https://akaieuan.bandcamp.com/track/girls-just-want-breaks-yion-flip' },
]

function PurchaseItem({ item }: { item: PurchaseItem }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="block py-2 transition-all duration-200"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-1.5 sm:gap-4">
        <span 
          className="text-[10px] sm:text-[11px] font-light tracking-widest uppercase min-w-[56px] sm:min-w-[60px] shrink-0"
          style={{ 
            color: isHovered ? 'rgba(68, 221, 170, 0.6)' : 'rgba(255,255,255,0.25)',
            transition: 'color 0.2s ease-out',
          }}
        >
          {item.type}
        </span>
        <span 
          className="text-sm sm:text-base font-normal tracking-wide leading-tight"
          style={{ 
            color: isHovered ? '#44ddaa' : 'rgba(255,255,255,0.8)',
            transition: 'color 0.2s ease-out',
          }}
        >
          {item.title}
        </span>
      </div>
    </a>
  )
}

interface PurchaseListProps {
  isOpen: boolean
  items?: PurchaseItem[]
}

export function PurchaseList({ isOpen, items = purchaseData }: PurchaseListProps) {
  return (
    <div 
      className="w-[90vw] sm:w-[85vw] md:w-[45vw] lg:w-[50vw] max-w-[800px] h-[60vh] sm:h-[55vh] md:h-[65vh] overflow-y-scroll overflow-x-hidden pr-2 sm:pr-4 md:pr-10 pb-6 isolate"
      className="w-[85vw] md:w-[45vw] lg:w-[50vw] max-w-[800px] max-h-[50vh] md:max-h-[65vh] overflow-y-auto pr-4 md:pr-10 pb-6"
      style={{
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateX(0)' : 'translateX(-12px)',
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
        visibility: isOpen ? 'visible' : 'hidden',
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-y',
      }}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      }}
    >
      {/* Bandcamp header */}
      <a 
        href="https://akaieuan.bandcamp.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white/40 text-xs font-medium tracking-widest uppercase hover:text-white/70 transition-colors"
      >
        bandcamp
      </a>
      
      {/* Albums list */}
      <div className="mt-5">
        <p className="text-[10px] text-emerald-400/70 font-medium tracking-widest uppercase mb-2">
          available now
        </p>
        <div className="space-y-0">
          {items.map((item, i) => (
            <PurchaseItem key={i} item={item} />
          ))}
        </div>
      </div>

      {/* View all link */}
      <div className="mt-8">
        <a 
          href="https://akaieuan.bandcamp.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white/30 text-xs font-light tracking-wide hover:text-white/60 transition-colors"
        >
          view all on bandcamp →
        </a>
      </div>
    </div>
  )
}

