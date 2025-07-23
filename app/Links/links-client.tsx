'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { MeltingCube } from '../../components/link-comps/melting-cube'
import { FracturingCube } from '../../components/link-comps/fracturing-cube'
import { FlowingCube } from '../../components/link-comps/flowing-cube'
import { MeltingSphere } from '../../components/link-comps/melting-sphere'
import { FracturingCylinder } from '../../components/link-comps/fracturing-cylinder'
import { FlowingCone } from '../../components/link-comps/flowing-cone'
import { MeltingTorus } from '../../components/link-comps/melting-torus'
import { FlowingTorusKnot } from '../../components/link-comps/flowing-torus-knot'
import { FracturingOctahedron } from '../../components/link-comps/fracturing-octahedron'
import { MeltingDodecahedron } from '../../components/link-comps/melting-dodecahedron'

// Types for server data
interface LinkData {
  label: string
  url: string
  type: 'melting' | 'fracturing' | 'flowing'
  shape: 'sphere' | 'cube' | 'cylinder' | 'cone' | 'torus' | 'torusKnot' | 'octahedron' | 'dodecahedron'
}

interface SceneConfig {
  camera: { position: [number, number, number], fov: number }
  lighting: {
    ambient: { intensity: number, color: string }
    directional: { position: [number, number, number], intensity: number, color: string }
  }
  cubes: {
    count: number
    sizeRange: [number, number]
    positions: [number, number, number][]
  }
}

interface LinksClientProps {
  linksData: LinkData[]
  sceneConfig: SceneConfig
}

// Animated typing text component
function TypingText({ text, isVisible }: { text: string, isVisible: boolean }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!isVisible) {
      setDisplayText('')
      setCurrentIndex(0)
      return
    }

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 80) // Typing speed

      return () => clearTimeout(timer)
    }
  }, [text, isVisible, currentIndex])

  if (!isVisible) return null

  return (
    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
        {displayText}
        <span className="animate-pulse">|</span>
      </h2>
    </div>
  )
}

// Abstract particles component
function AbstractParticles() {
  const count = 80
  const particles = useRef<THREE.Points>(null)
  
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const velocities = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40
    
    velocities[i * 3] = (Math.random() - 0.5) * 0.008
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.006
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005
    
    const blueVariation = Math.random()
    if (blueVariation < 0.4) {
      colors[i * 3] = 0.4; colors[i * 3 + 1] = 0.7; colors[i * 3 + 2] = 1.0
    } else if (blueVariation < 0.7) {
      colors[i * 3] = 0.2; colors[i * 3 + 1] = 0.8; colors[i * 3 + 2] = 0.9
    } else {
      colors[i * 3] = 0.6; colors[i * 3 + 1] = 0.4; colors[i * 3 + 2] = 1.0
    }
    
    sizes[i] = Math.random() * 0.12 + 0.04
  }
  
  useFrame((state) => {
    if (!particles.current) return
    
    const time = state.clock.elapsedTime
    const positions = particles.current.geometry.attributes.position
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      positions.array[i3] += velocities[i3] + Math.sin(time * 0.3 + i) * 0.003
      positions.array[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.25 + i) * 0.002
      positions.array[i3 + 2] += velocities[i3 + 2] + Math.sin(time * 0.4 + i) * 0.001
      
      if (Math.abs(positions.array[i3]) > 25) {
        positions.array[i3] = -positions.array[i3] * 0.5
        velocities[i3] *= -0.8
      }
      if (Math.abs(positions.array[i3 + 1]) > 20) {
        positions.array[i3 + 1] = -positions.array[i3 + 1] * 0.5
        velocities[i3 + 1] *= -0.8
      }
      if (Math.abs(positions.array[i3 + 2]) > 20) {
        positions.array[i3 + 2] = -positions.array[i3 + 2] * 0.5
        velocities[i3 + 2] *= -0.8
      }
    }
    
    positions.needsUpdate = true
  })

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.1} transparent opacity={0.4} sizeAttenuation vertexColors
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Scene component
function BlueAbstractScene({ config }: { config: SceneConfig['lighting'] }) {
  const lightsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!lightsRef.current) return
    
    const time = state.clock.elapsedTime
    lightsRef.current.rotation.y = time * 0.02
    lightsRef.current.rotation.x = Math.sin(time * 0.1) * 0.03
  })
  
  return (
    <>
      <ambientLight intensity={config.ambient.intensity} color={config.ambient.color} />
      
      <group ref={lightsRef}>
        <pointLight position={[-10, 8, 6]} intensity={3.5} color="#ff4400" distance={25} />
        <pointLight position={[10, -6, 7]} intensity={3.0} color="#44aaff" distance={22} />
        <pointLight position={[0, 10, -8]} intensity={3.2} color="#22ddaa" distance={20} />
        <pointLight position={[8, 0, 10]} intensity={2.5} color="#ffffff" distance={18} />
        <pointLight position={[-8, -8, 5]} intensity={2.8} color="#ffaa44" distance={20} />
      </group>
      
      <directionalLight 
        position={config.directional.position}
        intensity={config.directional.intensity}
        color={config.directional.color}
        castShadow
      />
      
      <AbstractParticles />
    </>
  )
}

// Enhanced shape component with hover states
function HoverableLinkShape({ 
  position, 
  size, 
  type, 
  shape,
  link, 
  onHover, 
  isHovered 
}: {
  position: [number, number, number]
  size: number
  type: 'melting' | 'fracturing' | 'flowing'
  shape: 'sphere' | 'cube' | 'cylinder' | 'cone' | 'torus' | 'torusKnot' | 'octahedron' | 'dodecahedron'
  link: LinkData
  onHover: (hovered: boolean) => void
  isHovered: boolean
}) {
  const handleClick = () => {
    if (link.url.startsWith('mailto:')) {
      window.location.href = link.url
    } else {
      window.open(link.url, '_blank')
    }
  }

  // Map type + shape to component
  const getShapeComponent = () => {
    const key = `${type}-${shape}`
    switch (key) {
      case 'melting-sphere': return MeltingSphere
      case 'fracturing-cube': return FracturingCube
      case 'flowing-cylinder': return FracturingCylinder // Use fracturing logic for cylinder
      case 'melting-cone': return FlowingCone // Use flowing logic for cone
      case 'fracturing-torus': return MeltingTorus // Use melting logic for torus
      case 'flowing-torusKnot': return FlowingTorusKnot
      case 'melting-octahedron': return FracturingOctahedron // Use fracturing logic for octahedron
      case 'fracturing-dodecahedron': return MeltingDodecahedron // Use melting logic for dodecahedron
      // Fallbacks
      default:
        if (type === 'melting') return MeltingCube
        if (type === 'fracturing') return FracturingCube
        return FlowingCube
    }
  }

  const ShapeComponent = getShapeComponent()

  return (
    <group
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
      onClick={handleClick}
    >
      <ShapeComponent
        position={position}
        size={size}
        intensity={isHovered ? 1.0 : 0.3}
        isActive={isHovered}
      />
    </group>
  )
}

export function LinksClient({ linksData, sceneConfig }: LinksClientProps) {
  const router = useRouter()
  const [hoveredCube, setHoveredCube] = useState<number | null>(null)
  
  const hoveredLink = hoveredCube !== null ? linksData[hoveredCube] : null
  
  // Generate shape data from server config
  const shapes = sceneConfig.cubes.positions.map((position, index) => ({
    position,
    size: sceneConfig.cubes.sizeRange[0] + 
          (Math.random() * (sceneConfig.cubes.sizeRange[1] - sceneConfig.cubes.sizeRange[0])),
    type: linksData[index % linksData.length].type,
    shape: linksData[index % linksData.length].shape,
    link: linksData[index % linksData.length]
  }))

  return (
    <>
      {/* Back button */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-6 left-6 z-20 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg transition-all duration-300 text-white text-sm"
      >
        ← Home
      </button>

      {/* Animated typing text - centered */}
      <TypingText 
        text={hoveredLink?.label || ''} 
        isVisible={hoveredLink !== null} 
      />

      {/* Instructions at bottom - centered */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-center">
        <p className="text-sm text-white/40">
          {hoveredLink ? 'Click to visit' : 'Hover over shapes to explore'}
        </p>
      </div>
      
      {/* 3D Scene - full width */}
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
          toneMappingExposure: 1.1
        }}
        shadows
      >
        <BlueAbstractScene config={sceneConfig.lighting} />
        
        {shapes.map((shape, index) => (
          <HoverableLinkShape
            key={index}
            position={shape.position}
            size={shape.size}
            type={shape.type}
            shape={shape.shape}
            link={shape.link}
            onHover={(hovered) => setHoveredCube(hovered ? index : null)}
            isHovered={hoveredCube === index}
          />
        ))}
      </Canvas>
    </>
  )
} 