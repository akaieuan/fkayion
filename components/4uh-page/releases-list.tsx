'use client'

interface ReleasesListProps {
  isOpen: boolean
}

export function ReleasesList({ isOpen }: ReleasesListProps) {
  return (
    <div 
      className="w-[85vw] md:w-[45vw] lg:w-[50vw] max-w-[800px] max-h-[50vh] md:max-h-[65vh] overflow-y-auto pr-4 md:pr-10 pb-6"
      style={{
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateX(0)' : 'translateX(-12px)',
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
        visibility: isOpen ? 'visible' : 'hidden',
      }}
    >
      {/* Header */}
      <p className="text-white/40 text-xs font-medium tracking-widest uppercase mb-5">
        releases
      </p>
      
      {/* SoundCloud Embed */}
      <div className="mb-6">
        <p className="text-[10px] text-emerald-400/70 font-medium tracking-widest uppercase mb-3">
          soundcloud
        </p>
        <div className="rounded-lg overflow-hidden">
          <iframe 
            width="100%" 
            height="300" 
            scrolling="no" 
            frameBorder="no" 
            allow="autoplay" 
            className="h-[230px] sm:h-[280px] md:h-[300px]"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2152603196&color=%232eff00&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          />
        </div>
        <div className="mt-2">
          <a 
            href="https://soundcloud.com/akaieuan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/30 text-[10px] font-light tracking-wide hover:text-white/60 transition-colors"
          >
            aka ieuan
          </a>
          <span className="text-white/20 text-[10px] mx-1">·</span>
          <a 
            href="https://soundcloud.com/akaieuan/sets/aka-ieuan-releases-all" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/30 text-[10px] font-light tracking-wide hover:text-white/60 transition-colors"
          >
            aka/Releases/All
          </a>
        </div>
      </div>

      {/* Spotify Embeds */}
      <div className="mb-6">
        <p className="text-[10px] text-white/25 font-medium tracking-widest uppercase mb-3">
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
            className="h-[260px] sm:h-[320px] md:h-[352px]"
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-[10px] text-white/25 font-medium tracking-widest uppercase mb-3">
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
            className="h-[260px] sm:h-[320px] md:h-[352px]"
          />
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
          view all releases →
        </a>
      </div>
    </div>
  )
}

