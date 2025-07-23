import { Suspense } from 'react'
import { LinksClient } from './links-client'

// Server-side static data - 8 links
const linksData = [
  { 
    label: 'Ubik Studio', 
    url: 'https://ubik.studio',
    type: 'melting' as const,
    shape: 'sphere' as const
  },
  { 
    label: 'App Ubik Studio', 
    url: 'https://app.ubik.studio',
    type: 'fracturing' as const,
    shape: 'cube' as const
  },
  { 
    label: 'Instagram', 
    url: 'https://instagram.com/akaieuan',
    type: 'flowing' as const,
    shape: 'cylinder' as const
  },
  { 
    label: 'Spotify', 
    url: 'https://open.spotify.com/artist/yourartist',
    type: 'melting' as const,
    shape: 'cone' as const
  },
  { 
    label: 'SoundCloud', 
    url: 'https://soundcloud.com/youraccount',
    type: 'fracturing' as const,
    shape: 'torus' as const
  },
  { 
    label: 'Bandcamp', 
    url: 'https://yourname.bandcamp.com',
    type: 'flowing' as const,
    shape: 'torusKnot' as const
  },
  { 
    label: 'YouTube', 
    url: 'https://youtube.com/yourchannel',
    type: 'melting' as const,
    shape: 'octahedron' as const
  },
  { 
    label: 'Contact', 
    url: 'mailto:hello@ubik.studio',
    type: 'fracturing' as const,
    shape: 'dodecahedron' as const
  }
]

// Server-side static configuration
const sceneConfig = {
  camera: { position: [0, 0, 28] as [number, number, number], fov: 85 },
  lighting: {
    ambient: { intensity: 0.3, color: "#ffffff" },
    directional: { position: [15, 12, 8] as [number, number, number], intensity: 0.5, color: "#ffffff" }
  },
  cubes: {
    count: 8,
    sizeRange: [1.4, 2.2] as [number, number],
    positions: [
      [-16, 4, 1], [18, 5, -2], [-12, -4, 4], [14, -5, -3],
      [-6, 5, -1], [10, 2, 2], [0, 1, 0], [6, -2, 3]
    ] as [number, number, number][]
  }
}

// Server-side metadata
export const metadata = {
  title: 'Links | FKAYION',
  description: 'Explore connections and digital experiences'
}

export default function LinksPage() {
  return (
    <div className="h-screen w-screen relative overflow-hidden bg-black">
      <Suspense fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-black">
          <div className="text-white text-xl">Loading experience...</div>
        </div>
      }>
        <LinksClient 
          linksData={linksData}
          sceneConfig={sceneConfig}
        />
      </Suspense>
    </div>
  )
} 