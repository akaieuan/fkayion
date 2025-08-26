import React, { Suspense } from 'react'
import { HomeClient } from './home-client'
import { NavigationSidebar } from '@/components/ui/navigation-sidebar'

// Server-side static data
const orbsData = [
  {
    id: 'links',
    component: 'MetallicMeltingOrb',
    position: [0, 0.5, 0] as [number, number, number], // Main focus - center position, vertically centered
    colors: {
      primary: '#cc3333',
      secondary: '#ff6644',
      rim: '#ff4422'
    },
    route: '/Links',
    label: 'Links',
    description: 'Other Stuff 4U',
    size: 1.3 // Larger size for main focus
  },
  {
    id: 'visualizer',
    component: 'CrystallineShatterOrb',
    position: [-4.5, 0.2, 0] as [number, number, number], // Left side, vertically centered
    colors: {
      primary: '#2266bb',
      secondary: '#44aaff',
      rim: '#6688dd'
    },
    route: '/Visualizer-Eden',
    label: 'Visualizer Eden',
    description: 'upload your music and visualize it (still in development)',
    size: 1.1 // Slightly smaller as supporting element
  },
  {
    id: '4UH.NYC',
    component: 'LiquidMorphOrb',
    position: [4.5, 0.2, 0] as [number, number, number], // Right side, vertically centered
    colors: {
      primary: '#228866',
      secondary: '#44ddaa',
      rim: '#66cc99'
    },
    route: '/4UH',
    label: '4UH.NYC',
    description: '4UH.NYC releases, unreleased, and other health related content',
    size: 1.0 // Smallest as supporting element
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
    count: 60, // Reduced from 120 for better mobile performance
    colorDistribution: [0.33, 0.66] as [number, number], // for red/orange, blue/cyan, teal split
    sizeRange: [0.08, 0.18] as [number, number], // Slightly larger for visibility with fewer particles
    boundarySize: { x: 16, y: 16, z: 16 } // Smaller boundary for better performance
  }
}

// Server-side metadata
export const metadata = {
  title: 'aka4uh | akaieuan | aka4uh.com',
  description: 'akaieuan is a front-end developer, designer,and artist'
}

export default function HomePage() {
  return (
    <div className="h-screen w-screen relative overflow-hidden bg-black flex flex-col">
      {/* Navigation Sidebar */}
      <NavigationSidebar />

      {/* Transparent Header - for layout structure */}
      <header className="relative z-50 h-16 bg-transparent">
        {/* Empty header for spacing and potential future nav */}
      </header>

      {/* Main Content Area - Flex grow to fill space */}
      <main className="flex-1 relative overflow-hidden">
        <Suspense fallback={
          <div className="h-full w-full flex items-center justify-center bg-black">
            <div className="text-white text-xl">Loading experience...</div>
          </div>
        }>
          <HomeClient 
            orbsData={orbsData}
            sceneConfig={sceneConfig}
          />
        </Suspense>
      </main>

      {/* Transparent Footer - for layout structure */}
      <footer className="relative z-50 h-16 bg-transparent">
        {/* Empty footer for spacing and potential future content */}
      </footer>
    </div>
  )
}
