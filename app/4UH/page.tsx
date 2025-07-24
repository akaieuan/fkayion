'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Canvas } from '@react-three/fiber'
import { LiquidMorphOrb } from '../../components/main-page/orb-3'

export default function MusicPage() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  
  const handleNavigation = () => {
    router.push('/')
  }
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Navigation */}
      <nav className="absolute top-4 left-4 z-20">
        <button
          onClick={handleNavigation}
          className="px-4 py-2 md:px-6 md:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg transition-all duration-300 flex items-center space-x-2"
        >
          <span className="text-lg">←</span>
          <span className="text-sm md:text-base">Back to Home</span>
        </button>
      </nav>
      
      {/* 3D Orb Scene */}
      <div className="w-96 h-96 mb-8">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
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
            isHovered={isHovered}
            onHover={setIsHovered}
            size={2}
          />
        </Canvas>
      </div>
      
      {/* Text */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          4UH.NYC
        </h1>
        <p className="text-lg md:text-xl text-white/70 animate-pulse">
          in dev coming soon
        </p>
      </div>
    </div>
  )
} 