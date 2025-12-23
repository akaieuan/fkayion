'use client'

import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

import { LiquidMorphOrb } from '../components/main-page/orb-3'

interface MousePos {
  x: number
  y: number
}

interface NavCard {
  label: string
  description: string
  route: string
  color: string
}

const navCards: NavCard[] = [
  {
    label: 'Links',
    description: 'Social links',
    route: '/Links',
    color: '#ff4422'
  },
  {
    label: 'Visualizer Eden',
    description: 'Music visualizer',
    route: '/Visualizer-Eden',
    color: '#4488ff'
  },
  {
    label: '4UH.NYC',
    description: 'Releases',
    route: '/4UH',
    color: '#44ddaa'
  }
]

function NavCardButton({ card, onNavigate }: { card: NavCard; onNavigate: (route: string) => void }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={() => onNavigate(card.route)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group w-full py-3 pr-2 text-left transition-all duration-200"
      style={{
        color: isHovered ? card.color : 'rgba(255,255,255,0.6)'
      }}
    >
      <span className="text-sm tracking-wide">
        {card.label}
      </span>
      <span className="text-xs text-white/30 ml-3">
        {card.description}
      </span>
    </button>
  )
}

export function HomeClient() {
  const router = useRouter()
  const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 })
  
  // Track mouse position for cursor reactivity on orb
  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    setMousePos({ x, y })
  }, [])

  const handleNavigation = (route: string) => {
    router.push(route)
  }

  return (
    <div className="h-full w-full relative" onPointerMove={handlePointerMove}>
      {/* Full-screen orb canvas */}
      <div className="absolute inset-0">
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
          <pointLight position={[-4, 2, 4]} intensity={1.5} color="#44ddaa" distance={15} />
          <pointLight position={[4, -2, 4]} intensity={1} color="#228866" distance={15} />
          <pointLight position={[0, 3, 2]} intensity={0.8} color="#ffffff" distance={20} />
          
          <LiquidMorphOrb
            position={[1.8, 0, 0]}
            colors={{ primary: '#228866', secondary: '#44ddaa', rim: '#66cc99' }}
            size={1.0}
            onClick={() => {}}
            isHovered={true}
            onHover={() => {}}
            mousePos={mousePos}
          />
        </Canvas>
      </div>

      {/* Floating navigation - overlays the orb */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full flex items-center justify-start">
          <div className="pointer-events-auto ml-8 md:ml-16 lg:ml-24">
            {/* Title */}
            <div className="mb-8">
              <h1 className="text-xl text-white/80 font-light tracking-wide">
                aka4uh
              </h1>
              <p className="text-white/25 text-xs mt-1 font-light">
                digital anthropologist · ai researcher · <br />front-end developer · designer · musician
              </p>
            </div>

            {/* Navigation Cards */}
            <div className="space-y-1">
              {navCards.map((card) => (
                <NavCardButton 
                  key={card.route} 
                  card={card} 
                  onNavigate={handleNavigation}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle hint at bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
        <p className="text-white/15 text-xs font-light">
          hover to interact
        </p>
      </div>
    </div>
  )
}
