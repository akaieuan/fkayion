'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

// Chunk-split so the three.js payload only loads on this page.
const LiquidMorphOrb = dynamic(
  () => import('@/components/features/home/liquid-morph-orb').then(m => ({ default: m.LiquidMorphOrb })),
  { ssr: false }
)

/**
 * The liquid orb that used to live on the landing hero, rehomed as the live
 * preview for Visualizer Eden — a real WebGL artifact instead of a video.
 * Renders only while on screen; pointer-events stay off so it never eats
 * scroll (the canvas tracks the pointer from the wrapper instead).
 */
export function OrbHero() {
  const mousePosRef = useRef({ x: 0, y: 0 })
  const hostRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    mousePosRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mousePosRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  }, [])

  return (
    <div
      ref={hostRef}
      onPointerMove={handlePointerMove}
      className="relative aspect-video w-full bg-[#0E0E0D]"
    >
      <Canvas
        className="pointer-events-none"
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
        dpr={[1, 1.5]}
        frameloop={inView ? 'always' : 'never'}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[-4, 2, 4]} intensity={1.5} color="#44ddaa" distance={15} />
        <pointLight position={[4, -2, 4]} intensity={1} color="#228866" distance={15} />
        <pointLight position={[0, 3, 2]} intensity={0.8} color="#ffffff" distance={20} />
        <LiquidMorphOrb
          position={[0, 0, 0]}
          colors={{ primary: '#228866', secondary: '#44ddaa', rim: '#66cc99' }}
          size={1.35}
          onClick={() => {}}
          isHovered={true}
          onHover={() => {}}
          mousePosRef={mousePosRef}
          narrowViewport={false}
        />
      </Canvas>
    </div>
  )
}
