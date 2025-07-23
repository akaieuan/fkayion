import { Suspense } from 'react'
import { HomeClient } from './home-client'

// Server-side static data
const orbsData = [
  {
    id: 'links',
    component: 'MetallicMeltingOrb',
    position: [-4.5, 1, 0] as [number, number, number],
    colors: {
      primary: '#cc3333',
      secondary: '#ff6644',
      rim: '#ff4422'
    },
    route: '/Links',
    label: 'Links',
    description: 'Other Stuff 4U',
    size: 1.1
  },
  {
    id: 'visualizer',
    component: 'CrystallineShatterOrb',
    position: [0, 0, 0] as [number, number, number],
    colors: {
      primary: '#2266bb',
      secondary: '#44aaff',
      rim: '#6688dd'
    },
    route: '/Visualizer-Eden',
    label: 'Visualizer Eden',
    description: 'upload your music and visualize it (still in development)',
    size: 1.3
  },
  {
    id: 'music',
    component: 'LiquidMorphOrb',
    position: [4.5, -1, 0] as [number, number, number],
    colors: {
      primary: '#228866',
      secondary: '#44ddaa',
      rim: '#66cc99'
    },
    route: '/Music',
    label: 'Music',
    description: 'My Music (released and unreleased)',
    size: 1.0
  }
]

// Server-side static configuration
const sceneConfig = {
  camera: { position: [0, 0, 12] as [number, number, number], fov: 45 },
  lighting: {
    toneMapping: 'ACESFilmicToneMapping',
    toneMappingExposure: 1.0
  },
  particles: {
    count: 120,
    colorDistribution: [0.33, 0.66] as [number, number], // for red/orange, blue/cyan, teal split
    sizeRange: [0.05, 0.15] as [number, number],
    boundarySize: { x: 20, y: 20, z: 20 }
  }
}

// Server-side metadata
export const metadata = {
  title: 'aka4uh | akaieuan | aka4uh.com',
  description: 'akaieuan is a front-end developer, designer,and artist'
}

export default function HomePage() {
  return (
    <div className="h-screen w-screen relative overflow-hidden bg-black">
      <Suspense fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-black">
          <div className="text-white text-xl">Loading experience...</div>
        </div>
      }>
        <HomeClient 
          orbsData={orbsData}
          sceneConfig={sceneConfig}
        />
      </Suspense>
    </div>
  )
}
