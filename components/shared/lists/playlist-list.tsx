'use client'

import { fourUhScrollPanelClass, fourUhSectionLabelAccent } from './four-uh-shared'
import { onFourUhPanelWheel } from './four-uh-wheel'

const embedShell = 'overflow-hidden rounded-lg border border-white/[0.06]'

interface PlaylistListProps {
  isOpen: boolean
}

export function PlaylistList({ isOpen }: PlaylistListProps) {
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
      <a 
        href="https://open.spotify.com/artist/5OwuCYMg2wmmh3QofLLIPe?si=6ztoGCYKR2GzCDAQMzd8sQ" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block text-[10px] font-medium tracking-widest text-white/40 uppercase hover:text-white/65"
      >
        playlists
      </a>
      
      <div className="mt-3 space-y-5">
        <div>
          <p className={`${fourUhSectionLabelAccent} mb-2`}>Music I like</p>
          <div className={embedShell}>
            <iframe 
              data-testid="embed-iframe"
              style={{ borderRadius: '8px' }}
              src="https://open.spotify.com/embed/playlist/5aXocYO3XRi4CZEjAGe0zB?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="h-[220px] sm:h-[300px] md:h-[352px]"
            />
          </div>
        </div>

        <div>
          <div className={embedShell}>
            <iframe 
              data-testid="embed-iframe"
              style={{ borderRadius: '8px' }}
              src="https://open.spotify.com/embed/playlist/32t2rw0o6MeYBP87q7AKVa?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="h-[220px] sm:h-[300px] md:h-[352px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
