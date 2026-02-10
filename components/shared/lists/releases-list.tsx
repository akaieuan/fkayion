'use client'

interface ReleasesListProps {
  isOpen: boolean
}

export function ReleasesList({ isOpen }: ReleasesListProps) {
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
      {/* Header */}
      <p className="text-white/40 text-[11px] sm:text-xs font-medium tracking-widest uppercase mb-4 sm:mb-5 py-2">
        releases
      </p>

      {/* Latest EP */}
      <div className="mb-5 sm:mb-6">
        <p className="text-[9px] sm:text-[10px] text-emerald-400/70 font-semibold tracking-widest uppercase mb-2 sm:mb-3">
          latest EP
        </p>
        <div className="rounded-lg overflow-hidden">
          <iframe 
            width="100%" 
            height="166" 
            scrolling="no" 
            frameBorder="no" 
            allow="autoplay"
            className="h-[140px] sm:h-[166px]"
            src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/akaieuan/sets/sciritua-live-ext&color=%2344ddaa&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
          />
        </div>
        <a 
          href="https://soundcloud.com/akaieuan/sets/sciritua-live-ext" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block mt-2 py-1 text-white/40 text-[10px] sm:text-[11px] font-light tracking-wide hover:text-white/70 transition-colors"
        >
          Parsimony [live] →
        </a>
      </div>

      {/* DJ Sets */}
      <div className="mb-5 sm:mb-6">
        <p className="text-[9px] sm:text-[10px] text-emerald-400/70 font-semibold tracking-widest uppercase mb-2 sm:mb-3">
          DJ sets
        </p>
        <div className="space-y-3">
          <div className="rounded-lg overflow-hidden">
            <iframe 
              width="100%" 
              height="166" 
              scrolling="no" 
              frameBorder="no" 
              allow="autoplay"
              className="h-[140px] sm:h-[166px]"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/akaieuan/akaieuan-for-agape-w-kuko-012426-hypnotic-techno&color=%2344ddaa&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <iframe 
              width="100%" 
              height="166" 
              scrolling="no" 
              frameBorder="no" 
              allow="autoplay"
              className="h-[140px] sm:h-[166px]"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/akaieuan/nevstv-aka-ieuan-hypnotic&color=%2344ddaa&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
            />
          </div>
        </div>
        <a 
          href="https://soundcloud.com/akaieuan/sets/vm4uh-vitamixes-4-ur-health" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block mt-2 py-1 text-white/40 text-[10px] sm:text-[11px] font-light tracking-wide hover:text-white/70 transition-colors"
        >
          VM4UH - Vitamixes 4 Ur Health →
        </a>
      </div>

      {/* Video */}
      <div className="mb-5 sm:mb-6">
        <p className="text-[9px] sm:text-[10px] text-emerald-400/70 font-semibold tracking-widest uppercase mb-2 sm:mb-3">
          video
        </p>
        <div className="rounded-lg overflow-hidden aspect-video">
          <iframe 
            width="100%" 
            height="100%"
            src="https://www.youtube.com/embed/hqsTCdA-QfQ"
            title="YouTube video"
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
      
      {/* SoundCloud Embed */}
      <div className="mb-5 sm:mb-6">
        <p className="text-[9px] sm:text-[10px] text-white/25 font-semibold tracking-widest uppercase mb-2 sm:mb-3">
          soundcloud · all releases
        </p>
        <div className="rounded-lg overflow-hidden">
          <iframe 
            width="100%" 
            height="300" 
            scrolling="no" 
            frameBorder="no" 
            allow="autoplay" 
            className="h-[200px] sm:h-[260px] md:h-[300px]"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2152603196&color=%232eff00&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          />
        </div>
        <div className="mt-2 py-1">
          <a 
            href="https://soundcloud.com/akaieuan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/30 text-[10px] sm:text-[11px] font-light tracking-wide hover:text-white/60 active:text-white/70 transition-colors"
          >
            aka ieuan
          </a>
          <span className="text-white/20 text-[10px] mx-1">·</span>
          <a 
            href="https://soundcloud.com/akaieuan/sets/aka-ieuan-releases-all" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/30 text-[10px] sm:text-[11px] font-light tracking-wide hover:text-white/60 active:text-white/70 transition-colors"
          >
            aka/Releases/All
          </a>
        </div>
      </div>

      {/* Spotify Embeds */}
      <div className="mb-5 sm:mb-6">
        <p className="text-[9px] sm:text-[10px] text-white/25 font-semibold tracking-widest uppercase mb-2 sm:mb-3">
          spotify · aka ieuan
        </p>
        <div className="rounded-xl overflow-hidden">
          <iframe 
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/artist/5OwuCYMg2wmmh3QofLLIPe?utm_source=generator" 
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

      <div className="mb-5 sm:mb-6">
        <p className="text-[9px] sm:text-[10px] text-white/25 font-semibold tracking-widest uppercase mb-2 sm:mb-3">
          spotify · yion
        </p>
        <div className="rounded-xl overflow-hidden">
          <iframe 
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/artist/0SKj35DCAPNfu3KVUBTiVE?utm_source=generator" 
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

      {/* View all link */}
      <div className="mt-6 sm:mt-8 pb-4">
        <a 
          href="https://akaieuan.bandcamp.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block py-2 text-white/30 text-[11px] sm:text-xs font-light tracking-wide hover:text-white/60 active:text-white/70 transition-colors"
        >
          view all releases →
        </a>
      </div>
    </div>
  )
}
