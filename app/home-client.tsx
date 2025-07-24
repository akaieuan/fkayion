'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { MetallicMeltingOrb } from '../components/main-page/orb-1'
import { CrystallineShatterOrb } from '../components/main-page/orb-2'
import { LiquidMorphOrb } from '../components/main-page/orb-3'

// Types for server data
interface OrbData {
  id: string
  component: string
  position: [number, number, number]
  colors: { primary: string, secondary: string, rim: string }
  route: string
  label: string
  description: string
  size: number
}

interface SceneConfig {
  camera: { position: [number, number, number], fov: number }
  lighting: {
    toneMapping: string
    toneMappingExposure: number
  }
  particles: {
    count: number
    colorDistribution: [number, number]
    sizeRange: [number, number]
    boundarySize: { x: number, y: number, z: number }
  }
}

interface HomeClientProps {
  orbsData: OrbData[]
  sceneConfig: SceneConfig
}

// Enhanced Particles with server config
function EnhancedParticles({ config }: { config: SceneConfig['particles'] }) {
  const particles = useRef<THREE.Points>(null)
  
  const positions = new Float32Array(config.count * 3)
  const colors = new Float32Array(config.count * 3)
  const sizes = new Float32Array(config.count)
  const velocities = new Float32Array(config.count * 3)
  
  for (let i = 0; i < config.count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 40
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40
    
    velocities[i * 3] = (Math.random() - 0.5) * 0.01
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01
    
    // Use server config for color distribution
    const colorChoice = Math.random()
    if (colorChoice < config.colorDistribution[0]) {
      colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.4; colors[i * 3 + 2] = 0.2
    } else if (colorChoice < config.colorDistribution[1]) {
      colors[i * 3] = 0.2; colors[i * 3 + 1] = 0.6; colors[i * 3 + 2] = 1.0
    } else {
      colors[i * 3] = 0.2; colors[i * 3 + 1] = 0.8; colors[i * 3 + 2] = 0.6
    }
    
    sizes[i] = Math.random() * (config.sizeRange[1] - config.sizeRange[0]) + config.sizeRange[0]
  }
  
  useFrame((state) => {
    if (!particles.current) return
    
    const time = state.clock.elapsedTime
    const positions = particles.current.geometry.attributes.position
    
    for (let i = 0; i < config.count; i++) {
      const i3 = i * 3
      
      positions.array[i3] += velocities[i3] + Math.sin(time * 0.5 + i) * 0.002
      positions.array[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.3 + i) * 0.002
      positions.array[i3 + 2] += velocities[i3 + 2] + Math.sin(time * 0.7 + i) * 0.001
      
      // Use server config for boundary
      if (Math.abs(positions.array[i3]) > config.boundarySize.x) {
        positions.array[i3] = -positions.array[i3] * 0.5
        velocities[i3] *= -0.8
      }
      if (Math.abs(positions.array[i3 + 1]) > config.boundarySize.y) {
        positions.array[i3 + 1] = -positions.array[i3 + 1] * 0.5
        velocities[i3 + 1] *= -0.8
      }
      if (Math.abs(positions.array[i3 + 2]) > config.boundarySize.z) {
        positions.array[i3 + 2] = -positions.array[i3 + 2] * 0.5
        velocities[i3 + 2] *= -0.8
      }
    }
    
    positions.needsUpdate = true
  })

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={config.count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={config.count} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={config.count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.12} transparent opacity={0.7} sizeAttenuation vertexColors
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Enhanced lighting with server config
function Scene({ config }: { config: SceneConfig }) {
  const lightsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!lightsRef.current) return
    
    const time = state.clock.elapsedTime
    lightsRef.current.rotation.y = time * 0.1
    lightsRef.current.rotation.x = Math.sin(time * 0.3) * 0.2
  })
  
  return (
    <>
      <ambientLight intensity={0.15} />
      
      <group ref={lightsRef}>
        <pointLight position={[-6, 2, 3]} intensity={3} color="#ff4400" distance={15} />
        <pointLight position={[0, 3, 3]} intensity={2.5} color="#44aaff" distance={15} />
        <pointLight position={[6, -1, 3]} intensity={2.8} color="#44ddaa" distance={15} />
        <pointLight position={[0, -8, -5]} intensity={1.2} color="#ffffff" distance={20} />
        <pointLight position={[8, 8, -8]} intensity={1} color="#ffddaa" distance={25} />
        <pointLight position={[-8, 4, -6]} intensity={0.8} color="#aaddff" distance={20} />
      </group>
      
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.3} 
        color="#ffffff"
        castShadow
      />
      
      <EnhancedParticles config={config.particles} />
    </>
  )
}

export function HomeClient({ orbsData, sceneConfig }: HomeClientProps) {
  const router = useRouter()
  const [hoveredOrb, setHoveredOrb] = useState<string | null>(null)
  
  const hoveredOrbData = orbsData.find(orb => orb.id === hoveredOrb)
  
  // Component mapping
  const getOrbComponent = (componentName: string) => {
    switch (componentName) {
      case 'MetallicMeltingOrb': return MetallicMeltingOrb
      case 'CrystallineShatterOrb': return CrystallineShatterOrb
      case 'LiquidMorphOrb': return LiquidMorphOrb
      default: return MetallicMeltingOrb
    }
  }

  return (
    <>
      {/* Title */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20 text-center">
         
      </div>
      
      {/* Orb Labels - Only show when hovered */}
      {hoveredOrbData && (
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 z-20 text-center transition-all duration-500">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-wider">
            {hoveredOrbData.label}
          </h3>
          <p className="text-base md:text-lg text-white/60 max-w-md">
            {hoveredOrbData.description}
          </p>
        </div>
      )}
      
      {/* Instructions */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 text-center">
        <p className="text-sm md:text-base text-white/30">
          {hoveredOrb ? 'Click to enter' : 'Hover to see the transformation'}
        </p>
      </div>
      
      {/* 3D Scene */}
      <Canvas
        camera={sceneConfig.camera}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: sceneConfig.lighting.toneMappingExposure
        }}
        shadows
      >
        <Scene config={sceneConfig} />
        
        {orbsData.map((orb) => {
          const OrbComponent = getOrbComponent(orb.component)
          return (
            <OrbComponent
              key={orb.id}
              position={orb.position}
              colors={orb.colors}
              size={orb.size}
              onClick={() => router.push(orb.route)}
              isHovered={hoveredOrb === orb.id}
              onHover={(hovered) => setHoveredOrb(hovered ? orb.id : null)}
            />
          )
        })}
      </Canvas>
    </>
  )
} 