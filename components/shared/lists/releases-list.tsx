'use client'

import { fourUhScrollPanelClass, fourUhSectionLabelAccent, fourUhSectionLabelMuted } from './four-uh-shared'
import { onFourUhPanelWheel } from './four-uh-wheel'

const embedShell = 'overflow-hidden rounded-lg border border-white/[0.06]'

interface ReleasesListProps {
  isOpen: boolean
}

export function ReleasesList({ isOpen }: ReleasesListProps) {
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
      <p className="text-[10px] font-medium tracking-widest text-white/40 uppercase">releases</p>

      <div className="mb-5 mt-3">
        <p className={`${fourUhSectionLabelAccent} mb-2`}>Latest EP</p>
        <div className={embedShell}>
          <iframe
            title="Ubiquity — Spotify"
            src="https://open.spotify.com/embed/album/3Obm9hWHC26Yk0vByeHBUl?utm_source=generator"
            width="100%"
            height="260"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="min-h-[200px] h-[220px] sm:h-[260px]"
          />
        </div>
        <a 
          href="https://open.spotify.com/album/3Obm9hWHC26Yk0vByeHBUl?si=FYgHq0lzTAGjmiTdCEjvdw" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-2 inline-block text-[10px] font-light text-white/35 hover:text-white/60"
        >
          Ubiquity — Spotify →
        </a>
      </div>

      <div className="mb-5">
        <p className={`${fourUhSectionLabelAccent} mb-2`}>DJ sets</p>
        <div className="space-y-2">
          <div className={embedShell}>
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
          <div className={embedShell}>
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
          className="mt-2 inline-block text-[10px] font-light text-white/35 hover:text-white/60"
        >
          VM4UH →
        </a>
      </div>

      <div className="mb-5">
        <p className={`${fourUhSectionLabelAccent} mb-2`}>Video</p>
        <div className={`aspect-video ${embedShell}`}>
          <iframe 
            width="100%" 
            height="100%"
            src="https://www.youtube.com/embed/hqsTCdA-QfQ"
            title="YouTube video"
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
      
      <div className="mb-5">
        <p className={`${fourUhSectionLabelMuted} mb-2`}>SoundCloud · all</p>
        <div className={embedShell}>
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
        <div className="mt-2 text-[10px] font-light text-white/30">
          <a href="https://soundcloud.com/akaieuan" target="_blank" rel="noopener noreferrer" className="hover:text-white/55">
            aka ieuan
          </a>
          <span className="mx-1 text-white/15">·</span>
          <a href="https://soundcloud.com/akaieuan/sets/aka-ieuan-releases-all" target="_blank" rel="noopener noreferrer" className="hover:text-white/55">
            aka/Releases/All
          </a>
        </div>
      </div>

      <div className="mb-5">
        <p className={`${fourUhSectionLabelMuted} mb-2`}>Spotify · aka ieuan</p>
        <div className={embedShell}>
          <iframe 
            style={{ borderRadius: '8px' }}
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

      <div className="mb-5">
        <p className={`${fourUhSectionLabelMuted} mb-2`}>Spotify · yion</p>
        <div className={embedShell}>
          <iframe 
            style={{ borderRadius: '8px' }}
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

      <div className="pb-2">
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
