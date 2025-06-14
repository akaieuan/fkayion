'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { GooeyBlob } from './AudioVisualizer'
import { AnimatedBackground } from './animated-bg'
import { AnimationSequence } from './animation-sequence'
import { useAudio } from './AudioContext'

export function SophonBox() {
  const { controls } = useAudio()

  return (
    <div className="w-full h-full relative">
      {/* Animation sequence controller */}
      <AnimationSequence />
      
      <Canvas
        camera={{ position: [0, 0, 24], fov: 45 }}
        gl={{ 
          antialias: true,
          alpha: true,
          logarithmicDepthBuffer: true
        }}
      >
        {/* Background particles */}
        {controls.showParticles && <AnimatedBackground />}

        {/* Shared lighting for all visualizers */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        
     

        {/* Main visualizer - centered */}
        <group position={[0, 0, 0]}>
          <GooeyBlob />
        </group>

   

        {/* Shared camera controls with adjusted distances */}
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={false}
          minDistance={12}
          maxDistance={60}
          zoomSpeed={1}
        />
      </Canvas>
    </div>
  )
} 