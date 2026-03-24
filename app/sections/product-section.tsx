'use client'

import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { LiquidMorphOrb } from '@/components/features/home'

export function ProductSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    setMousePos({ x, y })
  }, [])

  return (
    <section id="section-2" className="h-screen w-full relative snap-start" onPointerMove={handlePointerMove}>
      <div className="absolute inset-0 opacity-40">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          style={{ width: '100%', height: '100%' }}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.1} />
          <pointLight position={[-4, 2, 4]} intensity={1.0} color="#2d7a50" distance={15} />
          <pointLight position={[4, -2, 4]} intensity={0.7} color="#1a4d33" distance={15} />
          <LiquidMorphOrb
            position={[3.5, 0, 0]}
            colors={{ primary: '#1a4d33', secondary: '#2d7a50', rim: '#3d8a60' }}
            size={0.5}
            onClick={() => {}}
            isHovered={false}
            onHover={() => {}}
            mousePos={mousePos}
          />
        </Canvas>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full flex items-center justify-start">
          <div className="pointer-events-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-xl">
            <div className="mb-8">
              <h1 className="text-xl text-gray-500/80 font-light tracking-wide">
                product design &amp; research
              </h1>
              <p className="text-white/25 text-xs mt-1 font-light">
                human-in-the-loop ai · design systems · user research · content strategy
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-400/80 mb-1.5">
                  What I Build
                </p>
                <p className="text-sm font-light leading-relaxed text-white/50">
                  Interfaces for complex AI systems that people actually trust. Design systems, approval flows, citation verification, and the copy conventions that make agentic tools feel legible. I design with code. I draw by hand, upload to v0 for a high-fidelity first draft, then ship production-ready in Cursor with agentic help, my own brain, and user feedback driving every decision.
                </p>
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-400/80 mb-1.5">
                  How I Validate
                </p>
                <p className="text-sm font-light leading-relaxed text-white/50">
                  User interviews, session replays, behavioral observation, and custom evaluation datasets that track where AI agents succeed and where they break. Findings go directly into design decisions, copy changes, and system prompt rewrites.
                </p>
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-400/80 mb-1.5">
                  Current Work
                </p>
                <p className="text-sm font-light leading-relaxed text-white/50">
                  Founding designer at{' '}
                  <a
                    href="https://ubik.studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                  >
                    Ubik Studio
                  </a>
                  , a desktop-native AI research platform. Ran research across music industry, academia, biotech, and law. Identified interaction patterns, shipped fixes live, iterated with real users weekly.{' '}
                  <a
                    href="https://kraa.io/team-test-log042"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                  >
                    team-test-log042 →
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
