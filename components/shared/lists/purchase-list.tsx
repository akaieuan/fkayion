'use client'

import { useState } from 'react'
import type { PurchaseItem } from '@/types'
import { fourUhScrollPanelClass, fourUhSectionLabelAccent } from './four-uh-shared'
import { onFourUhPanelWheel } from './four-uh-wheel'

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
      className="block py-2"
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-[9px] font-medium uppercase tracking-wider text-white/30">{item.type}</span>
        <span
          className="text-[13px] font-normal leading-tight text-white/80"
          style={{ color: isHovered ? '#44ddaa' : undefined }}
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
      data-four-uh-scroll=""
      className={fourUhScrollPanelClass}
      style={{
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateX(0)' : 'translateX(-8px)',
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
        visibility: isOpen ? 'visible' : 'hidden',
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-y',
      }}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onWheel={onFourUhPanelWheel}
    >
      {/* Bandcamp header */}
      <a 
        href="https://akaieuan.bandcamp.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block text-[10px] font-medium tracking-widest text-white/40 uppercase hover:text-white/65"
      >
        bandcamp
      </a>
      
      <div className="mt-3">
        <p className={fourUhSectionLabelAccent}>Available</p>
        <div className="divide-y divide-white/[0.06]">
          {items.map((item, i) => (
            <PurchaseItemComponent key={i} item={item} />
          ))}
        </div>
      </div>

      <div className="mt-5">
        <a 
          href="https://akaieuan.bandcamp.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] font-light text-white/30 hover:text-white/55"
        >
          All on Bandcamp →
        </a>
      </div>
    </div>
  )
}
