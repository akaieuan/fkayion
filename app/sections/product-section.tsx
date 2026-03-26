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
        <div className="h-full w-full flex items-center justify-start pt-14 pb-16">
          <div className="pointer-events-auto px-6 sm:px-8 md:px-16 lg:px-24 max-w-xl">
            <div className="mb-6">
              <h1 className="text-xl text-gray-500/80 font-light tracking-wide">
                product design &amp; research
              </h1>
              <p className="text-white/25 text-xs mt-1 font-light">
                human-in-the-loop ai · design systems · user research · content strategy
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-400/80 mb-1.5">
                  What I Build
                </p>
                <p className="text-sm font-light leading-relaxed text-white/50">
                  Interfaces for complex AI systems that people actually trust. Approval flows, citation verification, design systems, and the copy conventions that make agentic tools feel legible. I design with code, sketch by hand, draft in v0, and ship in Cursor.
                </p>
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-400/80 mb-1.5">
                  How I Validate
                </p>
                <p className="text-sm font-light leading-relaxed text-white/50">
                  User research cycles built around interviews, behavioral observation, session replays, and feedback synthesis, focused on trust, evidence attribution, and human control. I build custom evaluation datasets for multi-hop research agents and translate findings directly into UX decisions, copy changes, and system prompt rewrites.
                </p>
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-400/80 mb-1.5">
                  Current Work
                </p>
                <p className="text-sm font-light leading-relaxed text-white/50">
                  Co-founded{' '}
                  <a
                    href="https://ubik.studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                  >
                    Ubik Studio
                  </a>
                  , a desktop-native AI research platform. Designed approval flows, citation verification interfaces, and copy systems balancing automation with meaningful human control, shipped across a Next.js web app and Electron desktop app with real users in music, academia, biotech, and law. Built custom datasets for multi-hop research agents and iterated weekly from system prompts to microcopy.{' '}
                  <a
                    href="https://kraa.io/team-test-log042"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                  >
                    team-test →
                  </a>
                </p>
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-400/80 mb-1.5">
                  A Measurement Problem
                </p>
                <p className="text-sm font-light leading-relaxed text-white/50">
                  95% of enterprise AI initiatives deliver zero measurable return, not from technology failure but from a measurement crisis. Current benchmarks saturate within months and optimize for autonomous task completion; this paper traces that gap across cognitive science, scaffolding research, and enterprise data, and argues for the assist-not-complete paradigm: AI designed to augment human agency rather than replace it.{' '}
                  <a
                    href="https://kraa.io/abmpinai1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                  >
                    read →
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
