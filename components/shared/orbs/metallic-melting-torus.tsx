'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface MetallicMeltingTorusProps {
  position: [number, number, number]
  color: string
  hoverColor: string
  onClick: () => void
  isHovered: boolean
  onHover: (hovered: boolean) => void
  size?: number
  variant?: number
  baseGeometry?: 'torusKnot' | 'torus' | 'tetrahedron' | 'sphere'
  narrowViewport?: boolean
}

export function MetallicMeltingTorus({ 
  position, 
  color,
  hoverColor,
  onClick, 
  isHovered, 
  onHover,
  size = 1,
  variant = 0,
  baseGeometry = 'torusKnot',
  narrowViewport = false,
}: MetallicMeltingTorusProps) {
  const groupRef = useRef<THREE.Group>(null)
  const tetraRef = useRef<THREE.Mesh>(null)
  const dropletsRef = useRef<THREE.Group>(null)
  
  const variantFactor = 0.9 + (variant % 8) * 0.035
  const speed = 2.0 * (0.9 + ((variant * 3) % 5) * 0.03)
  const rotIntensity = 0.3 * (0.9 + ((variant * 5) % 5) * 0.03)
  const floatIntensity = 0.5 * (0.9 + ((variant * 7) % 5) * 0.03)
  const dropletCount = 5 + (variant % 4)

  const comfort = narrowViewport ? 0 : 1

  // Contrasty film grain mercury shader - no shine, strong blacks
  const mercuryMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      splitLevel: { value: 0.6 * variantFactor }, // Always animated with variant
      baseColor: { value: new THREE.Color(color) },
      mercuryColor: { value: new THREE.Color(hoverColor) },
      comfort: { value: comfort },
    },
    vertexShader: `
      uniform float time;
      uniform float splitLevel;
      uniform float comfort;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      
      void main() {
        vNormal = normal;
        vPosition = position;
        vUv = uv;
        float t = time * mix(0.52, 1.0, comfort);
        
        vec3 pos = position;
        
        // Mercury melting and dripping
        float meltFactor = sin(t * 1.0) * 0.5 + 0.5;
        
        // Dripping downward
        if (pos.y < 0.0) {
          pos.y -= meltFactor * 0.85;
        }
        
        // Liquid mercury stretching
        float stretch = sin(pos.x * 4.0 + t * 2.0) * sin(pos.z * 4.0 + t * 1.5);
        pos.y -= abs(stretch) * meltFactor * 0.65;
        
        // Mercury blob deformation
        float blob = sin(pos.x * 6.0 + t * 3.0) * sin(pos.y * 5.0 + t * 2.0) * sin(pos.z * 7.0 + t * 2.5);
        pos += normal * blob * 0.35;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float comfort;
      uniform vec3 baseColor;
      uniform vec3 mercuryColor;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      
      // Heavy film grain function
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      
      float filmGrain(vec2 uv, float t, float gscale) {
        return hash(uv * gscale + t * 0.1) * 0.8 - 0.4;
      }
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vPosition);
        float t = time * mix(0.52, 1.0, comfort);
        float gscale = mix(105.0, 300.0, comfort);
        float px = mix(5.0, 15.0, comfort);
        float py = mix(4.5, 12.0, comfort);
        float ptx = mix(2.2, 5.0, comfort);
        float pty = mix(1.8, 4.0, comfort);
        
        // Strong saturated color base - no shine
        vec3 color = mix(baseColor * 1.5, mercuryColor * 1.3, 0.7);
        
        // NO reflection - just edge darkening for definition
        float edge = dot(normal, viewDir);
        color = mix(vec3(0.0), color, edge * 0.8 + 0.2);
        
        // Strong animated patterns
        float pattern = sin(vPosition.x * px + t * ptx) * 
                       sin(vPosition.y * py + t * pty) * 0.4;
        color += pattern * mercuryColor * 0.6;
        
        // Heavy film grain
        float grain = filmGrain(vUv, t, gscale);
        color += grain * mix(0.18, 1.2, comfort);
        
        // Strong contrast and saturation
        color = pow(color, vec3(0.7)); // Boost mids
        color = mix(vec3(0.0), color, 2.0); // Strong contrast
        color = clamp(color, 0.0, 1.0);
        
        // Boost saturation
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(luminance), color, 2.5);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `
  }), [color, hoverColor, variantFactor, comfort])
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    const motion = narrowViewport ? 0.55 : 1
    
    // Update material uniforms
    mercuryMaterial.uniforms.time.value = time
    
    // Always animated rotation and floating
    groupRef.current.rotation.y = time * (0.8 * variantFactor) * motion
    groupRef.current.rotation.x = Math.sin(time * (1.2 * variantFactor) * motion) * 0.2
    groupRef.current.rotation.z = Math.cos(time * (0.9 * variantFactor) * motion) * 0.1
    
    // Floating motion
    groupRef.current.position.y = position[1] + Math.sin(time * (2.0 * variantFactor) * motion) * 0.1
    
    // Always animate mercury droplets
    if (dropletsRef.current) {
      dropletsRef.current.children.forEach((droplet, i) => {
        const mesh = droplet as THREE.Mesh
        const angle = (i / Math.max(1, dropletCount)) * Math.PI * 2 + time * (2 * variantFactor) * motion
        const distance = 0.6 + Math.sin(time * (3 * variantFactor) * motion + i) * 0.2
        
        mesh.position.x = Math.cos(angle) * distance
        mesh.position.y = Math.sin(time * 4 * motion + i) * 0.4
        mesh.position.z = Math.sin(angle) * distance
        
        mesh.rotation.y = time * (2 + i * 0.3) * motion
      })
    }
  })

  return (
    <Float
      speed={narrowViewport ? speed * 0.45 : speed}
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
          {baseGeometry === 'torusKnot' && (
            <torusKnotGeometry args={[size * 0.45, size * 0.16, 140, 18, 2, 3]} />
          )}
          {baseGeometry === 'torus' && (
            <torusGeometry args={[size * 0.8, size * 0.18, 64, 96]} />
          )}
          {baseGeometry === 'tetrahedron' && (
            <tetrahedronGeometry args={[size * 0.75, 2]} />
          )}
          {baseGeometry === 'sphere' && (
            <sphereGeometry args={[size * 0.65, 48, 36]} />
          )}
          <primitive object={mercuryMaterial} />
        </mesh>
        
        {/* Droplet orbit is extra work on mobile — main torus carries the look */}
        {!narrowViewport && (
          <group ref={dropletsRef}>
            {Array.from({ length: dropletCount }).map((_, i) => (
              <mesh key={i}>
                <sphereGeometry args={[size * 0.08, 16, 16]} />
                <meshStandardMaterial 
                  color={hoverColor}
                  metalness={0.0}
                  roughness={1.0}
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