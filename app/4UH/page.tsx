'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Canvas } from '@react-three/fiber'
import { LiquidMorphOrb } from '../../components/main-page/orb-3'
import { NavigationSidebar } from '@/components/ui/navigation-sidebar'

export default function MusicPage() {
  const router = useRouter()
  
  const handleNavigation = () => {
    router.push('/')
  }
  
  return (
    <div className="h-screen w-screen relative bg-black overflow-hidden flex flex-col">
      {/* Navigation Sidebar */}
      <NavigationSidebar />

      {/* Transparent Header - for layout structure */}
      <header className="relative z-50 h-16 bg-transparent">
        {/* Empty header for spacing and potential future nav */}
      </header>

      {/* Main Content Area - Flex grow to fill space */}
      <main className="flex-1 relative overflow-hidden">
        <div className="w-full h-full flex flex-col items-center justify-center">
          {/* 3D Orb Scene - Always animated like a frame */}
          <div className="w-80 h-80 mb-8 max-w-sm max-h-80">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              style={{ width: '100%', height: '100%' }}
            >
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4466aa" />
              
              <LiquidMorphOrb
                position={[0, 0, 0]}
                colors={{
                  primary: '#228866',
                  secondary: '#44ddaa',
                  rim: '#66cc99'
                }}
                onClick={() => {}}
                isHovered={true}
                onHover={() => {}}
                size={2}
              />
            </Canvas>
          </div>
          
          {/* Simple text */}
          <div className="text-center">
            <p className="text-sm text-white/60">
              in dev
            </p>
          </div>
        </div>
      </main>

      {/* Transparent Footer - for layout structure */}
      <footer className="relative z-50 h-16 bg-transparent">
        {/* Empty footer for spacing and potential future content */}
      </footer>
    </div>
  )
} 