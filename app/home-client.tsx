'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import { MetallicMeltingOrb } from '../components/main-page/orb-1'
import { CrystallineShatterOrb } from '../components/main-page/orb-2'
import { LiquidMorphOrb } from '../components/main-page/orb-3'
import { Button } from '@/components/ui/button'

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

// Animated Orb Wrapper for smooth position transitions
function AnimatedOrbWrapper({ 
  children, 
  targetPosition, 
  isActive 
}: { 
  children: React.ReactNode
  targetPosition: [number, number, number]
  isActive: boolean 
}) {
  const groupRef = useRef<THREE.Group>(null)
  const currentPosition = useRef(new THREE.Vector3(...targetPosition))

  useFrame(() => {
    if (!groupRef.current) return
    
    // Smooth position interpolation
    const target = new THREE.Vector3(...targetPosition)
    currentPosition.current.lerp(target, 0.08)
    groupRef.current.position.copy(currentPosition.current)
    
    // Subtle scale animation for active orb
    const targetScale = isActive ? 1 : 0.85
    const currentScale = groupRef.current.scale.x
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.06)
    groupRef.current.scale.setScalar(newScale)
    
    // Subtle opacity for inactive orbs
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const material = child.material as THREE.Material
        if ('opacity' in material) {
          const targetOpacity = isActive ? 1.0 : 0.6
          material.opacity = THREE.MathUtils.lerp(material.opacity || 1, targetOpacity, 0.05)
          material.transparent = true
        }
      }
    })
  })

  return <group ref={groupRef}>{children}</group>
}

// Camera controller for smooth transitions
function CameraController({ currentOrbIndex }: { currentOrbIndex: number }) {
  const { camera } = useThree()

  useFrame(() => {
    // Keep camera centered but allow slight movement for depth
    const targetX = 0
    const targetY = 0.2 // Slightly elevated to better view the higher orbs
    const targetZ = 12
    
    // Smooth camera positioning
    camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.03)
    camera.lookAt(0, 2, 0) // Look at the higher orb positions
  })

  return null
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

// Hook for detecting mobile screen size
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}

export function HomeClient({ orbsData, sceneConfig }: HomeClientProps) {
  const router = useRouter()
  const [hoveredOrb, setHoveredOrb] = useState<string | null>(null)
  const [currentOrbIndex, setCurrentOrbIndex] = useState(0) // Unified for both mobile and desktop
  const isMobile = useIsMobile()
  
  // No auto-switching - user controls navigation manually

  // Both mobile and desktop now use the same carousel behavior
  const activeOrbId = orbsData[currentOrbIndex].id
  const activeOrbData = orbsData[currentOrbIndex]
  
  // Component mapping
  const getOrbComponent = (componentName: string) => {
    switch (componentName) {
      case 'MetallicMeltingOrb': return MetallicMeltingOrb
      case 'CrystallineShatterOrb': return CrystallineShatterOrb
      case 'LiquidMorphOrb': return LiquidMorphOrb
      default: return MetallicMeltingOrb
    }
  }

  // Navigation functions for both mobile and desktop
  const goToPrevOrb = () => {
    setCurrentOrbIndex((prev) => (prev - 1 + orbsData.length) % orbsData.length)
  }

  const goToNextOrb = () => {
    setCurrentOrbIndex((prev) => (prev + 1) % orbsData.length)
  }

  const goToOrb = (index: number) => {
    setCurrentOrbIndex(index)
  }

  return (
    <>
      {/* More Accessible Mobile Navigation - Using Button components */}
      {isMobile && (
        <>
          {/* Navigation container - reduced bottom padding */}
          <div className="absolute bottom-8 left-0 right-0 z-30 px-6">
            <div className="flex justify-between items-center">
              {/* Left Arrow */}
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevOrb}
                className="w-12 h-12 rounded-full bg-transparent border-white/40 text-white hover:bg-white/20 hover:border-white/60"
              >
                ←
              </Button>

              {/* Dot indicators */}
              <div className="flex space-x-4">
                {orbsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToOrb(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                      index === currentOrbIndex 
                        ? 'bg-white border-white scale-125' 
                        : 'bg-white/20 border-white/40 hover:bg-white/40 hover:border-white/60'
                    }`}
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <Button
                variant="outline"
                size="icon"
                onClick={goToNextOrb}
                className="w-12 h-12 rounded-full bg-transparent border-white/40 text-white hover:bg-white/20 hover:border-white/60"
              >
                →
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Desktop Navigation - reduced bottom padding */}
      {!isMobile && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex items-center space-x-6">
            {/* Left Arrow */}
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevOrb}
              className="w-10 h-10 rounded-full bg-transparent border-white/40 text-white hover:bg-white/20 hover:border-white/60"
            >
              ←
            </Button>

            {/* Dot indicators */}
            <div className="flex space-x-3">
              {orbsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToOrb(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
                    index === currentOrbIndex 
                      ? 'bg-white border-white scale-125' 
                      : 'bg-white/20 border-white/40 hover:bg-white/40 hover:border-white/60'
                  }`}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextOrb}
              className="w-10 h-10 rounded-full bg-transparent border-white/40 text-white hover:bg-white/20 hover:border-white/60"
            >
              →
            </Button>
          </div>
        </div>
      )}
      
      {/* Orb Labels - moved up with reduced bottom padding */}
      {activeOrbData && (
        <div className={`absolute z-20 text-center transition-all duration-500 ${
          isMobile 
            ? 'bottom-32 left-1/2 transform -translate-x-1/2' 
            : 'bottom-24 left-1/2 transform -translate-x-1/2'
        }`}>
          <h3 className={`font-bold text-white mb-1 tracking-wider ${
            isMobile ? 'text-xl' : 'text-xl md:text-2xl'
          }`}>
            {activeOrbData.label}
          </h3>
          <p className={`text-white/60 max-w-sm px-4 ${
            isMobile ? 'text-base' : 'text-sm md:text-base'
          }`}>
            {activeOrbData.description}
          </p>
        </div>
      )}
      
      {/* Instructions - reduced bottom padding */}
      <div className={`absolute z-20 text-center ${
        isMobile 
          ? 'bottom-2 left-1/2 transform -translate-x-1/2' 
          : 'bottom-4 left-1/2 transform -translate-x-1/2'
      }`}>
        <p className={`text-white/30 ${
          isMobile ? 'text-sm' : 'text-xs md:text-sm'
        }`}>
          {isMobile 
            ? 'Use arrows or dots to navigate • Touch center to enter' 
            : (activeOrbId ? 'Click to enter' : 'Hover to see the transformation')
          }
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
        <CameraController currentOrbIndex={currentOrbIndex} />
        <Scene config={sceneConfig} />
        
        {orbsData.map((orb, index) => {
          const OrbComponent = getOrbComponent(orb.component)
          
          // Calculate position based on index and current active orb
          const isActive = index === currentOrbIndex
          
          // Create a horizontal carousel layout - moved up
          const offsetX = (index - currentOrbIndex) * 6 // 6 units apart horizontally
          const baseY = isActive ? 2.0 : 1.6 // Active orb higher up, inactive orbs also higher
          const baseZ = isActive ? 0 : -1.5 // Inactive orbs slightly back
          
          const position: [number, number, number] = [offsetX, baseY, baseZ]
          
          // Size: active orb normal size, inactive smaller
          const orbSize = orb.size * (isActive ? (isMobile ? 1.2 : 1.1) : 0.8)
          
          return (
            <AnimatedOrbWrapper 
              key={orb.id}
              targetPosition={position}
              isActive={isActive}
            >
              <OrbComponent
                position={[0, 0, 0]} // Position handled by wrapper
                colors={orb.colors}
                size={orbSize}
                onClick={() => router.push(orb.route)}
                isHovered={isActive} // Only active orb is animated
                onHover={(hovered) => setHoveredOrb(hovered ? orb.id : null)}
              />
            </AnimatedOrbWrapper>
          )
        })}
      </Canvas>
    </>
  )
} 