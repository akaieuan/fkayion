import { Suspense } from 'react'
import { LinksClient } from './links-client'

// Server-side static data - 8 links
const linksData = [
  { 
    label: 'Ubik Studio', 
    url: 'https://ubik.studio',
    color: '#ff4422',
    hoverColor: '#ff6644'
  },
  { 
    label: 'App Ubik Studio', 
    url: 'https://app.ubik.studio',
    color: '#4488ff',
    hoverColor: '#66aaff'
  },
  { 
    label: 'Instagram', 
    url: 'https://instagram.com/akaieuan',
    color: '#22dd88',
    hoverColor: '#44ffaa'
  },
  { 
    label: 'Spotify', 
    url: 'https://open.spotify.com/artist/yourartist',
    color: '#ffaa22',
    hoverColor: '#ffcc44'
  },
  { 
    label: 'SoundCloud', 
    url: 'https://soundcloud.com/youraccount',
    color: '#aa22ff',
    hoverColor: '#cc44ff'
  },
  { 
    label: 'Bandcamp', 
    url: 'https://yourname.bandcamp.com',
    color: '#22aaff',
    hoverColor: '#44ccff'
  },
  { 
    label: 'YouTube', 
    url: 'https://youtube.com/yourchannel',
    color: '#ff2288',
    hoverColor: '#ff44aa'
  },
  { 
    label: 'Contact', 
    url: 'mailto:hello@ubik.studio',
    color: '#88ff22',
    hoverColor: '#aaff44'
  }
]

// Server-side 2D layout configuration
const layoutConfig = {
  fog: {
    particleCount: 120,
    colors: ['#1a1a2e', '#16213e', '#0f3460', '#533483', '#7209b7'],
    mouseInfluence: 150,
    viscosity: 0.92
  },
  links: {
    containerWidth: '90%',
    maxWidth: '1200px',
    gridCols: 4,
    spacing: '2rem',
    positions: [
      { x: 20, y: 25 }, { x: 40, y: 20 }, { x: 60, y: 25 }, { x: 80, y: 20 },
      { x: 25, y: 60 }, { x: 45, y: 70 }, { x: 65, y: 55 }, { x: 85, y: 85 }
    ]
  }
}

// Server-side metadata
export const metadata = {
  title: 'Links | FKAYION',
  description: 'Explore connections and digital experiences'
}

export default function LinksPage() {
  return (
    <div className="h-screen w-screen relative bg-black" style={{ overflow: 'visible' }}>
      <Suspense fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-black">
          <div className="text-white text-xl">Loading experience...</div>
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