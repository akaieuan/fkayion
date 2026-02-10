'use client'

import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { LiquidMorphOrb, LatestReleases } from '@/components/features/home'

export function HomeSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    setMousePos({ x, y })
  }, [])

  return (
    <section id="section-0" className="h-screen w-full relative snap-start" onPointerMove={handlePointerMove}>
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          style={{ width: '100%', height: '100%' }}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.15} />
          <pointLight position={[-4, 2, 4]} intensity={1.5} color="#44ddaa" distance={15} />
          <pointLight position={[4, -2, 4]} intensity={1} color="#228866" distance={15} />
          <pointLight position={[0, 3, 2]} intensity={0.8} color="#ffffff" distance={20} />
          <LiquidMorphOrb
            position={[1.8, 0, 0]}
            colors={{ primary: '#228866', secondary: '#44ddaa', rim: '#66cc99' }}
            size={0.7}
            onClick={() => {}}
            isHovered={true}
            onHover={() => {}}
            mousePos={mousePos}
          />
        </Canvas>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full flex items-center justify-start">
          <div className="pointer-events-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="mb-8">
              <h1 className="text-xl text-gray-500/80 font-light tracking-wide">
                ieuan | yion | akaieuan 
              </h1>
              <p className="text-white/25 text-xs mt-1 font-light">
                digital anthropologist · ai researcher · <br />front-end developer · designer · musician
              </p>
            </div>
            <LatestReleases />
          </div>
        </div>
      </div>
    </section>
  )
}
