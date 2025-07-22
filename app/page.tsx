'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// Sleek Metal Orb Component
function MetalOrb({ 
  position, 
  colors, 
  onClick, 
  isHovered, 
  onHover,
  size = 1
}: {
  position: [number, number, number]
  colors: { primary: string, secondary: string, rim: string }
  onClick: () => void
  isHovered: boolean
  onHover: (hovered: boolean) => void
  size?: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const rimRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    
    // Smooth hover scaling
    const targetScale = isHovered ? 1.2 : 1
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15)
    
    // Gentle rotation
    groupRef.current.rotation.y = time * 0.5
    groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.1
    
    // Inner orb counter-rotation
    if (innerRef.current) {
      innerRef.current.rotation.y = -time * 0.3
      innerRef.current.rotation.z = Math.cos(time * 0.4) * 0.2
    }
    
    // Rim glow animation
    if (rimRef.current) {
      const rimScale = 1 + Math.sin(time * 2) * 0.05 + (isHovered ? 0.1 : 0)
      rimRef.current.scale.setScalar(rimScale)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group 
        ref={groupRef} 
        position={position}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        onClick={onClick}
      >
        {/* Outer rim glow */}
        <Sphere ref={rimRef} args={[size * 1.3, 32, 32]}>
          <meshBasicMaterial 
            color={colors.rim} 
            transparent 
            opacity={isHovered ? 0.4 : 0.2}
            side={THREE.BackSide}
          />
        </Sphere>
        
        {/* Main metal orb */}
        <Sphere args={[size, 64, 64]}>
          <meshStandardMaterial
            color={colors.primary}
            metalness={0.95}
            roughness={0.1}
            envMapIntensity={1.5}
          />
        </Sphere>
        
        {/* Inner energy core */}
        <Sphere ref={innerRef} args={[size * 0.3, 32, 32]}>
          <meshBasicMaterial 
            color={colors.secondary}
            transparent
            opacity={0.8}
          />
        </Sphere>
        
        {/* Outer atmosphere */}
        <Sphere args={[size * 1.1, 32, 32]}>
          <meshBasicMaterial 
            color={colors.secondary}
            transparent 
            opacity={0.1}
            side={THREE.BackSide}
          />
        </Sphere>
      </group>
    </Float>
  )
}

// Enhanced Particles
function EnhancedParticles() {
  const count = 80
  const particles = useRef<THREE.Points>(null)
  
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30
    
    // Varied colors
    const colorChoice = Math.random()
    if (colorChoice < 0.33) {
      colors[i * 3] = 0.0
      colors[i * 3 + 1] = 0.95
      colors[i * 3 + 2] = 1.0
    } else if (colorChoice < 0.66) {
      colors[i * 3] = 1.0
      colors[i * 3 + 1] = 0.0
      colors[i * 3 + 2] = 0.66
    } else {
      colors[i * 3] = 0.44
      colors[i * 3 + 1] = 0.0
      colors[i * 3 + 2] = 1.0
    }
    
    sizes[i] = Math.random() * 0.1 + 0.05
  }
  
  useFrame((state) => {
    if (!particles.current) return
    
    const time = state.clock.elapsedTime
    const positions = particles.current.geometry.attributes.position
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      positions.array[i3] += Math.sin(time * 0.5 + i) * 0.002
      positions.array[i3 + 1] += Math.cos(time * 0.3 + i) * 0.002
      positions.array[i3 + 2] += Math.sin(time * 0.7 + i) * 0.001
      
      // Boundary wrapping
      if (Math.abs(positions.array[i3]) > 15) positions.array[i3] *= -0.5
      if (Math.abs(positions.array[i3 + 1]) > 15) positions.array[i3 + 1] *= -0.5
      if (Math.abs(positions.array[i3 + 2]) > 15) positions.array[i3 + 2] *= -0.5
    }
    
    positions.needsUpdate = true
  })

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.1}
        transparent 
        opacity={0.8}
        sizeAttenuation
        vertexColors
      />
    </points>
  )
}

// Background Environment
function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00f2ff" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff00a8" />
      <pointLight position={[0, 0, -15]} intensity={1.8} color="#7000ff" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      
      <EnhancedParticles />
    </>
  )
}

export default function HomePage() {
  const router = useRouter()
  const [hoveredOrb, setHoveredOrb] = useState<string | null>(null)
  
  const orbs = [
    {
      id: 'links',
      position: [-4, 1, 0] as [number, number, number],
      colors: {
        primary: '#ff4444',
        secondary: '#ff8866',
        rim: '#ff6666'
      },
      route: '/Links',
      label: 'Links',
      description: 'Connections & Networks'
    },
    {
      id: 'visualizer',
      position: [0, 0, 0] as [number, number, number],
      colors: {
        primary: '#00aaff',
        secondary: '#00ffff',
        rim: '#4466ff'
      },
      route: '/Visualizer-Eden',
      label: 'Visualizer',
      description: 'Audio Experience',
      size: 1.2
    },
    {
      id: 'music',
      position: [4, -1, 0] as [number, number, number],
      colors: {
        primary: '#44aa88',
        secondary: '#66ddcc',
        rim: '#22ccaa'
      },
      route: '/Music',
      label: 'Music',
      description: 'Audio Collection'
    }
  ]
  
  const hoveredOrbData = orbs.find(orb => orb.id === hoveredOrb)
  
  return (
    <div className="h-screen w-screen relative overflow-hidden bg-black">
      {/* Title */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20 text-center">
        <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          FKAYION
        </h1>
        <p className="text-2xl text-white/60 font-light">
          Interactive Digital Experience
        </p>
      </div>
      
      {/* Orb Labels - Only show when hovered */}
      {hoveredOrbData && (
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20 text-center transition-all duration-300">
          <h3 className="text-3xl font-bold text-white mb-2">
            {hoveredOrbData.label}
          </h3>
          <p className="text-lg text-white/70">
            {hoveredOrbData.description}
          </p>
        </div>
      )}
      
      {/* Instructions */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 text-center">
        <p className="text-lg text-white/40">
          {hoveredOrb ? 'Click to enter' : 'Hover over the orbs to explore'}
        </p>
      </div>
      
      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
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
          toneMappingExposure: 1.2
        }}
      >
        <Scene />
        
        {orbs.map((orb) => (
          <MetalOrb
            key={orb.id}
            position={orb.position}
            colors={orb.colors}
            size={orb.size || 1}
            onClick={() => router.push(orb.route)}
            isHovered={hoveredOrb === orb.id}
            onHover={(hovered) => setHoveredOrb(hovered ? orb.id : null)}
          />
        ))}
      </Canvas>
    </div>
  )
}
