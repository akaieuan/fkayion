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
    label: 'App Ubik Studio', 
    url: 'https://app.ubik.studio',
    color: '#4488ff',
    hoverColor: '#66aaff'
  },
  { 
    label: 'Instagram', 
    url: 'https://instagram.com/akaieuan',
    color: '#ff6b9d',
    hoverColor: '#ff8fa3'
  },
  { 
    label: 'SoundCloud', 
    url: 'https://soundcloud.com/akaieuan',
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
    url: 'mailto:ieuan@ubik.studio',
    color: '#88ff22',
    hoverColor: '#aaff44'
  }
]

// Server-side layout configuration optimized for list + orb design with mobile support
const layoutConfig = {
  mobileView: {
    linksPerPage: 1,
    autoSwitchInterval: 4000
  },
  fog: {
    colors: ['#1a1a2e', '#16213e', '#0f3460', '#533483', '#7209b7']
  }
}

// Server-side metadata
export const metadata = {
  title: 'Links | FKAYION',
  description: 'Explore connections and dynamic visual experiences'
}

export default function LinksPage() {
  return (
    <div className="h-screen w-screen relative bg-black overflow-hidden">
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