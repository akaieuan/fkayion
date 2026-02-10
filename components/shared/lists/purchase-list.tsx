'use client'

import { useState } from 'react'
import type { PurchaseItem } from '@/types'

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

function PurchaseItemComponent({ item }: { item: PurchaseItem }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Larger touch target
      className="block py-3 sm:py-2 -mx-2 px-2 rounded-lg transition-all duration-200 active:bg-white/5"
    >
      <div className="flex flex-col gap-0.5">
        {/* Type badge */}
        <span 
          className="text-[9px] sm:text-[10px] font-light tracking-widest uppercase"
          style={{ 
            color: isHovered ? 'rgba(68, 221, 170, 0.6)' : 'rgba(255,255,255,0.25)',
            transition: 'color 0.2s ease-out',
          }}
        >
          {item.type}
        </span>
        {/* Title */}
        <span 
          className="text-[13px] sm:text-sm font-normal tracking-wide leading-snug"
          style={{ 
            color: isHovered ? '#44ddaa' : 'rgba(255,255,255,0.85)',
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
      className="w-[92vw] sm:w-[85vw] md:w-[50vw] lg:w-[45vw] max-w-[700px] h-[55vh] sm:h-[55vh] md:h-[65vh] overflow-y-auto overflow-x-hidden pr-1 sm:pr-4 md:pr-8 pb-8 isolate"
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
    >
      {/* Bandcamp header */}
      <a 
        href="https://akaieuan.bandcamp.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block py-2 text-white/40 text-[11px] sm:text-xs font-medium tracking-widest uppercase hover:text-white/70 active:text-white/80 transition-colors"
      >
        bandcamp
      </a>
      
      {/* Albums list */}
      <div className="mt-4 sm:mt-5">
        <p className="text-[9px] sm:text-[10px] text-emerald-400/70 font-semibold tracking-widest uppercase mb-2 sm:mb-3">
          available now
        </p>
        <div className="space-y-1">
          {items.map((item, i) => (
            <PurchaseItemComponent key={i} item={item} />
          ))}
        </div>
      </div>

      {/* View all link */}
      <div className="mt-6 sm:mt-8 pb-4">
        <a 
          href="https://akaieuan.bandcamp.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block py-2 text-white/30 text-[11px] sm:text-xs font-light tracking-wide hover:text-white/60 active:text-white/70 transition-colors"
        >
          view all on bandcamp →
        </a>
      </div>
    </div>
  )
}
