'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface LiquidMorphTorusProps {
  position: [number, number, number]
  color: string
  hoverColor: string
  onClick: () => void
  isHovered: boolean
  onHover: (hovered: boolean) => void
  size?: number
  variant?: number
  baseGeometry?: 'octa' | 'dodeca' | 'tetra' | 'icosa' | 'torusKnot' | 'torus'
  shatterMode?: boolean
  narrowViewport?: boolean
}

export function LiquidMorphTorus({ 
  position, 
  color,
  hoverColor,
  onClick, 
  isHovered, 
  onHover,
  size = 1,
  variant = 0,
  baseGeometry = 'octa',
  shatterMode = false,
  narrowViewport = false,
}: LiquidMorphTorusProps) {
  const groupRef = useRef<THREE.Group>(null)
  const tetraRef = useRef<THREE.Mesh>(null)
  const fragmentsRef = useRef<THREE.Group>(null)
  
  const variantFactor = 0.85 + (variant % 8) * 0.04
  const floatSpeed = 3.0 * (0.9 + ((variant * 3) % 5) * 0.03)
  const rotIntensity = 0.6 * (0.9 + ((variant * 5) % 5) * 0.03)
  const floatIntensity = 0.8 * (0.9 + ((variant * 7) % 5) * 0.03)
  const fragmentCount = shatterMode ? 10 + (variant % 4) : 0
  
  // Generate fragment data for shatter mode
  const seeded = (i: number) => {
    const s = (variant + 1) * 9301 + i * 49297
    return ((s % 233280) / 233280)
  }
  const fragments = shatterMode ? Array.from({ length: fragmentCount }, (_, i) => ({
    baseAngle: (i / fragmentCount) * Math.PI * 2,
    baseRadius: size * (0.4 + seeded(i) * 0.3),
    baseY: (seeded(i + 13) - 0.5) * size * 0.8,
    rotationOffset: [seeded(i + 29) * Math.PI, seeded(i + 47) * Math.PI, seeded(i + 71) * Math.PI] as [number, number, number],
    scale: 0.06 + seeded(i + 91) * 0.08
  })) : []

  const comfort = narrowViewport ? 0 : 1

  // Contrasty film grain liquid shader - no shine, strong blacks
  const liquidMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      flowIntensity: { value: 0.85 * variantFactor }, // Slightly increased
      baseColor: { value: new THREE.Color(color) },
      liquidColor: { value: new THREE.Color(hoverColor) },
      comfort: { value: comfort },
    },
    vertexShader: `
      uniform float time;
      uniform float flowIntensity;
      uniform float comfort;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      
      void main() {
        vNormal = normal;
        vPosition = position;
        vUv = uv;
        float t = time * mix(0.5, 1.0, comfort);
        
        vec3 pos = position;
        
        // Smooth liquid flowing and morphing
        float wave1 = sin(pos.x * 3.0 + t * 3.5) * 0.65;
        float wave2 = sin(pos.y * 2.5 + t * 2.8) * 0.55;
        float wave3 = sin(pos.z * 4.0 + t * 4.2) * 0.75;
        
        // Liquid bulging and contracting
        pos += normal * (wave1 + wave2 + wave3) * flowIntensity * 0.42;
        
        // Liquid dripping effect
        float drip = max(0.0, -pos.y + 0.2) * sin(t * 1.8 + pos.x * 5.0);
        pos.y -= drip * 0.55;
        
        // Viscous stretching with surface tension
        float stretch = sin(t * 1.4 + pos.y * 8.0) * 0.32;
        pos += normal * stretch;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float comfort;
      uniform vec3 baseColor;
      uniform vec3 liquidColor;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      
      // Heavy film grain function
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      
      float filmGrain(vec2 uv, float t, float grainScale) {
        return hash(uv * grainScale + t * 0.1) * 1.0 - 0.5;
      }
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vPosition);
        float t = time * mix(0.5, 1.0, comfort);
        float grainScale = mix(95.0, 280.0, comfort);
        float px = mix(9.0, 25.0, comfort);
        float pz = mix(8.0, 20.0, comfort);
        float vtx = mix(2.6, 7.0, comfort);
        float vtz = mix(2.0, 5.5, comfort);
        
        // Strong saturated liquid base - no shine
        vec3 color = mix(baseColor * 1.6, liquidColor * 1.4, 0.9);
        
        // NO reflection - just edge darkening for liquid definition
        float edge = dot(normal, viewDir);
        color = mix(vec3(0.0), color, edge * 0.6 + 0.4);
        
        // Strong liquid ripple patterns
        float ripple = sin(vPosition.x * px + t * vtx) * 
                      sin(vPosition.z * pz + t * vtz) * 0.6;
        color += ripple * liquidColor * 0.7;
        
        // Heavy film grain (toned down when comfort is low)
        float grain = filmGrain(vUv, t, grainScale);
        color += grain * mix(0.15, 1.4, comfort);
        
        // Strong contrast and saturation
        color = pow(color, vec3(0.65)); // Boost mids
        color = mix(vec3(0.0), color, 2.4); // Strongest contrast
        color = clamp(color, 0.0, 1.0);
        
        // Boost saturation heavily
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(luminance), color, 2.8);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    transparent: false
  }), [color, hoverColor, variantFactor, comfort])
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    const motion = narrowViewport ? 0.55 : 1
    
    // Update material uniforms
    liquidMaterial.uniforms.time.value = time
    
    // Always animated chaotic rotation
    groupRef.current.rotation.y = time * (1.2 * variantFactor) * motion
    groupRef.current.rotation.x = Math.sin(time * (2.5 * variantFactor) * motion) * 0.3
    groupRef.current.rotation.z = Math.cos(time * (1.8 * variantFactor) * motion) * 0.2
    
    // Constant floating motion
    groupRef.current.position.y = position[1] + 
      Math.sin(time * (2.5 * variantFactor) * motion) * 0.15 +
      Math.sin(time * (4.2 * variantFactor) * motion) * 0.08
    
    // Constant scale pulsing
    const scale = 1 + Math.sin(time * (5.0 * variantFactor) * motion) * 0.1 + 
                     Math.sin(time * (7.0 * variantFactor) * motion) * 0.05
    groupRef.current.scale.setScalar(scale)
    
    // Animate shatter fragments - they separate and reform dynamically
    if (shatterMode && fragmentsRef.current) {
      fragmentsRef.current.children.forEach((fragment, i) => {
        const mesh = fragment as THREE.Mesh
        const frag = fragments[i]
        if (!frag) return
        
        // Separation/reform cycle - fragments move outward and back
        const separateCycle = Math.sin(time * 1.5 + i * 0.7) * 0.5 + 0.5 // 0 to 1
        const separateDistance = separateCycle * 0.8 // max separation
        
        // Orbital motion with separation
        const angle = frag.baseAngle + time * (1.2 + i * 0.15)
        const radius = frag.baseRadius + separateDistance
        
        mesh.position.x = Math.cos(angle) * radius
        mesh.position.y = frag.baseY + Math.sin(time * 2.5 + i) * 0.2 + separateDistance * 0.3
        mesh.position.z = Math.sin(angle) * radius
        
        // Chaotic rotation
        mesh.rotation.x = frag.rotationOffset[0] + time * (1.5 + i * 0.2)
        mesh.rotation.y = frag.rotationOffset[1] + time * (1.2 + i * 0.15)
        mesh.rotation.z = frag.rotationOffset[2] + time * (1.8 + i * 0.25)
        
        // Scale pulses with separation
        const fragScale = frag.scale * (1 + separateCycle * 0.3)
        mesh.scale.setScalar(fragScale)
        
        // Opacity changes with separation
        const material = mesh.material as THREE.MeshStandardMaterial
        material.opacity = 0.6 + separateCycle * 0.3
      })
    }
  })

  return (
    <Float
      speed={narrowViewport ? floatSpeed * 0.45 : floatSpeed}
      rotationIntensity={narrowViewport ? rotIntensity * 0.45 : rotIntensity}
      floatIntensity={narrowViewport ? floatIntensity * 0.45 : floatIntensity}
    >
      <group 
        ref={groupRef} 
        position={position}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        onClick={onClick}
      >
        <mesh ref={tetraRef}>
          {baseGeometry === 'octa' && (
            <octahedronGeometry args={[size * 0.7, 2 + (variant % 2)]} />
          )}
          {baseGeometry === 'dodeca' && (
            <dodecahedronGeometry args={[size * 0.8, 0]} />
          )}
          {baseGeometry === 'tetra' && (
            <tetrahedronGeometry args={[size * 0.8, 2]} />
          )}
          {baseGeometry === 'icosa' && (
            <icosahedronGeometry args={[size * 0.8, 1]} />
          )}
          {baseGeometry === 'torusKnot' && (
            <torusKnotGeometry args={[size * 0.4, size * 0.12, 100, 16, 2, 3]} />
          )}
          {baseGeometry === 'torus' && (
            <torusGeometry args={[size * 0.55, size * 0.22, 32, 64]} />
          )}
          <primitive object={liquidMaterial} />
        </mesh>
        
        {/* Shatter mode fragments - dynamically separate and reform */}
        {shatterMode && (
          <group ref={fragmentsRef}>
            {fragments.map((frag, i) => (
              <mesh
                key={i}
                position={[
                  Math.cos(frag.baseAngle) * frag.baseRadius,
                  frag.baseY,
                  Math.sin(frag.baseAngle) * frag.baseRadius
                ]}
                rotation={frag.rotationOffset}
                scale={frag.scale}
              >
                <tetrahedronGeometry args={[size * 0.15, 1]} />
                <meshStandardMaterial
                  color={hoverColor}
                  metalness={0.0}
                  roughness={0.8}
                  transparent
                  opacity={0.7}
                />
              </mesh>
            ))}
          </group>
        )}
      </group>
    </Float>
  )
} 