'use client'

import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { LiquidMorphOrb } from '../../components/main-page/orb-3'
import { MusicReleases } from '../../components/4uh/music-releases'

interface MousePos {
  x: number
  y: number
}

export default function MusicPage() {
  const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 })
  
  // Track mouse position for cursor reactivity on orb
  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    setMousePos({ x, y })
  }, [])

  return (
    <div className="h-screen w-screen relative bg-black overflow-hidden pt-16" onPointerMove={handlePointerMove}>
      {/* Full-screen orb canvas */}
      <div className="absolute inset-0 pt-16">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          style={{ 
            width: '100%',
            height: '100%'
          }}
          gl={{ 
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.0
          }}
          dpr={[1, 2]}
        >
          {/* Simple lighting */}
          <ambientLight intensity={0.15} />
          <pointLight position={[-4, 2, 4]} intensity={1.5} color="#4488ff" distance={15} />
          <pointLight position={[4, -2, 4]} intensity={1} color="#2266aa" distance={15} />
          <pointLight position={[0, 3, 2]} intensity={0.8} color="#ffffff" distance={20} />
          
          <LiquidMorphOrb
            position={[1.8, 0, 0]}
            colors={{ primary: '#224488', secondary: '#4488ff', rim: '#6699ff' }}
            size={1.0}
            onClick={() => {}}
            isHovered={true}
            onHover={() => {}}
            mousePos={mousePos}
          />
        </Canvas>
      </div>

      {/* Floating content - overlays the orb */}
      <div className="absolute inset-0 pt-16 pointer-events-none">
        <div className="h-full w-full flex items-center justify-start">
          <div className="pointer-events-auto px-8 md:px-16 lg:px-24">
            {/* Page Info */}
            <div className="mb-8">
              <h1 className="text-xl text-white/80 font-light tracking-wide">
                4UH
              </h1>
              <p className="text-white/25 text-xs mt-1 font-light">
                music · releases · productions
              </p>
            </div>

            {/* Music Releases */}
            <MusicReleases />
          </div>
        </div>
      </div>

      {/* Subtle hint at bottom */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none">
        <p className="text-white/15 text-xs font-light">
          hover to interact
        </p>
      </div>
    </div>
  )
}
