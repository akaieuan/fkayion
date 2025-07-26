'use client'

import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { MetallicMeltingTorus } from './metallic-melting-torus'
import { CrystallineShatterTorus } from './crystalline-shatter-torus'
import { LiquidMorphTorus } from './liquid-morph-torus'

interface UnifiedDynamicOrbProps {
  activeLink: string | null
  color: string
  hoverColor: string
  size?: number
}

// Hook to detect mobile
function useIsMobile() {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

// Default contrasty film grain tetrahedron - constantly moving
function DefaultTorus({ size = 1 }) {
  const groupRef = useRef<THREE.Group>(null)
  const tetraRef = useRef<THREE.Mesh>(null)
  
  // Contrasty film grain shader - no shine, strong blacks
  const defaultMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      baseColor: { value: new THREE.Color('#6655cc') },
      glowColor: { value: new THREE.Color('#aa88ff') },
    },
    vertexShader: `
      uniform float time;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      
      void main() {
        vNormal = normal;
        vPosition = position;
        vUv = uv;
        vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        
        vec3 pos = position;
        
        // Strong deformation
        float wave = sin(time * 2.5 + pos.x * 6.0) * sin(time * 2.0 + pos.y * 5.0) * sin(time * 3.0 + pos.z * 7.0);
        pos += normal * wave * 0.25;
        
        // Strong breathing
        float pulse = sin(time * 1.8) * 0.15;
        pos += normal * pulse;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 baseColor;
      uniform vec3 glowColor;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      
      // Heavy film grain function
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      
      float filmGrain(vec2 uv, float time) {
        return hash(uv * 250.0 + time * 0.1) * 0.9 - 0.45;
      }
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        
        // Strong saturated base - no shine
        vec3 color = mix(baseColor * 1.5, glowColor * 1.3, 0.6);
        
        // NO reflection - just edge darkening for definition
        float edge = dot(normal, viewDir);
        color = mix(vec3(0.0), color, edge * 0.7 + 0.3);
        
        // Strong shimmer patterns
        float shimmer = sin(vPosition.x * 18.0 + time * 4.5) * 
                       sin(vPosition.y * 16.0 + time * 4.0) * 
                       sin(vPosition.z * 20.0 + time * 5.0) * 0.4;
        color += shimmer * glowColor * 0.8;
        
        // Heavy film grain
        float grain = filmGrain(vUv, time);
        color += grain * 1.1;
        
        // Strong contrast and saturation
        color = pow(color, vec3(0.7)); // Boost mids
        color = mix(vec3(0.0), color, 2.1); // Strong contrast
        color = clamp(color, 0.0, 1.0);
        
        // Boost saturation
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(luminance), color, 2.6);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `
  })
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    
    // Update material
    defaultMaterial.uniforms.time.value = time
    
    // Strong rotation
    groupRef.current.rotation.y = time * 0.8
    groupRef.current.rotation.x = Math.sin(time * 0.9) * 0.2
    groupRef.current.rotation.z = Math.cos(time * 0.7) * 0.15
    
    // Strong floating
    groupRef.current.position.y = Math.sin(time * 1.5) * 0.12
  })

  return (
    <Float speed={2.0} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={groupRef}>
        <mesh ref={tetraRef}>
          <tetrahedronGeometry args={[size * 0.6, 5]} />
          <primitive object={defaultMaterial} />
        </mesh>
      </group>
    </Float>
  )
}

export function UnifiedDynamicOrb({ activeLink, color, hoverColor, size = 1 }: UnifiedDynamicOrbProps) {
  const isMobile = useIsMobile()
  
  const getControlledSize = () => {
    return isMobile ? 1.5 : 2.0
  }

  const renderActiveOrb = () => {
    if (!activeLink) {
      return <DefaultTorus size={getControlledSize()} />
    }

    const orbProps = {
      position: [0, 0, 0] as [number, number, number],
      color,
      hoverColor,
      onClick: () => {},
      isHovered: true,
      onHover: () => {},
      size: getControlledSize()
    }

    switch (activeLink) {
      case 'Ubik Studio':
        return <MetallicMeltingTorus {...orbProps} />
      case 'App Ubik Studio':
        return <LiquidMorphTorus {...orbProps} />
      case 'Instagram':
        return <CrystallineShatterTorus {...orbProps} />
      case 'SoundCloud':
        return <MetallicMeltingTorus {...orbProps} />
      case 'Bandcamp':
        return <LiquidMorphTorus {...orbProps} />
      case 'YouTube':
        return <CrystallineShatterTorus {...orbProps} />
      case 'Contact':
        return <MetallicMeltingTorus {...orbProps} />
      default:
        return <DefaultTorus size={getControlledSize()} />
    }
  }

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50, near: 0.1, far: 100 }}
        style={{ 
          width: '100%', 
          height: '100%',
          overflow: 'hidden'
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.7,
          preserveDrawingBuffer: true
        }}
        frameloop="always"
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        {/* Clean lighting */}
        <ambientLight intensity={0.5} color="#ffffff" />
        <pointLight position={[2, 2, 2]} intensity={1.0} color="#ffffff" />
        <pointLight position={[-2, -1, 2]} intensity={0.8} color={activeLink ? hoverColor : "#6655cc"} />
        <directionalLight position={[3, 3, 3]} intensity={0.4} color="#ffffff" />
        
        {renderActiveOrb()}
      </Canvas>

      {/* Active link indicator - Only show on desktop */}
      {activeLink && !isMobile && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center z-10">
          <span 
            className="text-base font-medium px-3 py-2 rounded-lg backdrop-blur-sm border whitespace-nowrap"
            style={{
              color: hoverColor,
              borderColor: `${color}40`,
              backgroundColor: `${color}20`
            }}
          >
            {activeLink}
          </span>
        </div>
      )}
    </div>
  )
}