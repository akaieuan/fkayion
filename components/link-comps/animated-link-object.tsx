'use client'

import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { FracturingCubeOrb } from './fracturing-cube-orb'
import { FlowingCubeOrb } from './flowing-cube-orb'
import { PulsatingCubeOrb } from './pulsating-cube-orb'
import { TwistingCubeOrb } from './twisting-cube-orb'
import { MeltingCubeOrb } from './melting-cube-orb'

interface AnimatedLinkObjectProps {
  label: string
  url: string
  color: string
  hoverColor: string
  position: { x: number, y: number }
  onHover: (hovered: boolean) => void
  isHovered: boolean
  isDotMatrix?: boolean
}

export function AnimatedLinkObject({ 
  label, 
  url, 
  color, 
  hoverColor, 
  position, 
  onHover, 
  isHovered,
  isDotMatrix = false
}: AnimatedLinkObjectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [localHovered, setLocalHovered] = useState(false)

  const handleClick = () => {
    if (url.startsWith('mailto:')) {
      window.location.href = url
    } else {
      window.open(url, '_blank')
    }
  }

  const handleHover = (hovered: boolean) => {
    setLocalHovered(hovered)
    onHover(hovered)
  }

  // Map specific links to unique animations based on their identity
  const getOrbComponent = () => {
         // Use label to determine animation type - each platform gets unique identity
     switch (label.toLowerCase()) {
       case 'ubik studio': return FlowingCubeOrb // Main site - smooth flowing liquid
       case 'app ubik studio': return TwistingCubeOrb // App platform - twisting/coding energy  
       case 'instagram': return PulsatingCubeOrb // Social media - pulse/heartbeat
       case 'spotify': return MeltingCubeOrb // Music streaming - melting/dripping
       case 'soundcloud': return FracturingCubeOrb // Audio platform - sound breaks apart
       case 'bandcamp': return FlowingCubeOrb // Music flows like liquid (shares with main site)
       case 'youtube': return FracturingCubeOrb // Video breaks into fragments (shares with sound)
       case 'contact': return TwistingCubeOrb // Communication spiraling connection
       default: return FlowingCubeOrb
     }
  }

  const OrbComponent = getOrbComponent()

  return (
    <div
      ref={containerRef}
      className="absolute cursor-pointer select-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        overflow: 'visible',
        animation: `floatGentle 12s ease-in-out infinite`,
        animationDelay: `${Math.random() * 4}s`
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onClick={handleClick}
    >
      {/* 3D Canvas for the orb - massive to prevent any clipping */}
      <Canvas
        camera={{ position: [0, 0, 6], fov: 90 }}
        style={{ 
          width: '100%', 
          height: '100%',
          pointerEvents: 'none',
          overflow: 'visible'
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          preserveDrawingBuffer: true
        }}
        frameloop="always"
      >
        {/* Lighting setup similar to main page */}
        <ambientLight intensity={0.4} color="#ffffff" />
        <pointLight position={[3, 3, 3]} intensity={2} color="#ffffff" />
        <pointLight position={[-3, -2, 2]} intensity={1.5} color={hoverColor} />
        <directionalLight 
          position={[4, 4, 4]} 
          intensity={0.8} 
          color="#ffffff"
        />
        
        {/* The orb component with extra space */}
        <OrbComponent
          position={[0, 0, 0]}
          color={color}
          hoverColor={hoverColor}
          onClick={() => {}} // Handled by parent div
          isHovered={isHovered || localHovered}
          onHover={() => {}} // Handled by parent div
          size={2.2}
          isDotMatrix={isDotMatrix}
        />
      </Canvas>

      {/* Label text - adjusted for much larger container */}
      <div 
        className={`absolute top-64 left-1/2 transform -translate-x-1/2 text-center transition-all duration-500 pointer-events-none ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <span 
          className="text-xs md:text-sm font-medium px-2 py-1 rounded-md backdrop-blur-sm border whitespace-nowrap"
          style={{
            color: hoverColor,
            borderColor: `${color}40`,
            backgroundColor: `${color}20`
          }}
        >
          {label}
        </span>
      </div>

      <style jsx>{`
        @keyframes floatGentle {
          0%, 100% { 
            transform: translate(-50%, -50%) translateY(0px) rotate(0deg); 
          }
          25% { 
            transform: translate(-50%, -50%) translateY(-4px) rotate(0.5deg); 
          }
          50% { 
            transform: translate(-50%, -50%) translateY(-6px) rotate(0deg); 
          }
          75% { 
            transform: translate(-50%, -50%) translateY(-3px) rotate(-0.5deg); 
          }
        }
      `}</style>
    </div>
  )
} 