'use client'

interface PlaylistListProps {
  isOpen: boolean
}

export function PlaylistList({ isOpen }: PlaylistListProps) {
  return (
    <div 
      className="w-[90vw] sm:w-[85vw] md:w-[45vw] lg:w-[50vw] max-w-[800px] h-[60vh] sm:h-[55vh] md:h-[65vh] overflow-y-scroll overflow-x-hidden pr-2 sm:pr-4 md:pr-16 pb-6 isolate"
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
      {/* Header */}
      <a 
        href="https://open.spotify.com/artist/5OwuCYMg2wmmh3QofLLIPe?si=6ztoGCYKR2GzCDAQMzd8sQ" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white/40 text-xs font-medium tracking-widest uppercase hover:text-white/70 transition-colors"
      >
        playlists
      </a>
      
      {/* Spotify Playlists */}
      <div className="mt-5 space-y-6">
        <div>
          <p className="text-[10px] text-emerald-400/70 font-medium tracking-widest uppercase mb-3">
            music i like
          </p>
          <div className="rounded-xl overflow-hidden">
            <iframe 
              data-testid="embed-iframe"
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/5aXocYO3XRi4CZEjAGe0zB?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="h-[260px] sm:h-[320px] md:h-[352px]"
            />
          </div>
        </div>

        <div>
          <div className="rounded-xl overflow-hidden">
            <iframe 
              data-testid="embed-iframe"
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/32t2rw0o6MeYBP87q7AKVa?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="h-[260px] sm:h-[320px] md:h-[352px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
