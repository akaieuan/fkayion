import { Suspense } from 'react'
import { LinksClient } from './links-client'

// Server-side static data for links with optimized mapping
const linksData = [
  { 
    label: 'Ubik Studio', 
    url: 'https://ubik.studio',
    color: '#ff4422',
    hoverColor: '#ff6644'
  },
  { 
    label: 'Instagram', 
    url: 'https://instagram.com/aka.ieuan/',
    color: '#ff6b9d',
    hoverColor: '#ff8fa3'
  },
  { 
    label: 'Spotify', 
    url: 'https://open.spotify.com/artist/5OwuCYMg2wmmh3QofLLIPe?si=QfdVpYAeRQSC3G4fWTuIyg',
    color: '#aa22ff',
    hoverColor: '#cc44ff'
  },
  { 
    label: 'SoundCloud', 
    url: 'https://soundcloud.com/akaieuan',
    color: '#aa22ff',
    hoverColor: '#cc44ff'
  },
  { 
    label: 'Bandcamp', 
    url: 'https://akaieuan.bandcamp.com/',
    color: '#22aaff',
    hoverColor: '#44ccff'
  },
  { 
    label: 'YouTube', 
    url: 'https://www.youtube.com/channel/UC6etRnx7fZEtoVAI-phCu6Q',
    color: '#ff2288',
    hoverColor: '#ff44aa'
  },
  { 
    label: 'aka.write', 
    url: 'https://substack.com/@akaieuan?utm_source=user-menu',
    color: '#88ff22',
    hoverColor: '#aaff44'
  }
]

// Server-side layout configuration
const layoutConfig = {
  mobileView: {
    linksPerPage: 1
  },
  fog: {
    colors: ['#1a1a2e', '#16213e', '#0f3460', '#533483', '#7209b7']
  }
}

// Server-side metadata
export const metadata = {
  title: 'Links | aka4uh',
  description: 'Social links and connections'
}

export default function LinksPage() {
  return (
    <div className="h-screen w-screen relative bg-black overflow-hidden pt-16">
      <Suspense fallback={
        <div className="h-full w-full flex items-center justify-center bg-black">
          <div className="text-white text-xl">Loading...</div>
        </div>
      }>
        <LinksClient 
          linksData={linksData}
          layoutConfig={layoutConfig}
        />
      </Suspense>
    </div>
  )
}
