'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Canvas } from '@react-three/fiber'
import { LiquidMorphOrb } from '../../components/main-page/orb-3'

export default function MusicPage() {
  const router = useRouter()
  
  const handleNavigation = () => {
    router.push('/')
  }
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Navigation */}
      <nav className="absolute top-4 left-4 z-20">
        <button
          onClick={handleNavigation}
          className="py-3 px-5 rounded-xl bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 text-white hover:bg-gray-800/70 hover:border-gray-600/70 transition-all duration-300 group flex items-center space-x-2"
        >
          <span className="text-lg group-hover:text-opacity-100 text-opacity-90">←</span>
          <span className="text-base font-medium group-hover:text-opacity-100 text-opacity-90">Back to Home</span>
        </button>
      </nav>
      
      {/* 3D Orb Scene - Always animated like a frame */}
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
  )
} 