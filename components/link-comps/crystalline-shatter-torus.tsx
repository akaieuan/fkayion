'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface CrystallineShatterTorusProps {
  position: [number, number, number]
  color: string
  hoverColor: string
  onClick: () => void
  isHovered: boolean
  onHover: (hovered: boolean) => void
  size?: number
}

export function CrystallineShatterTorus({ 
  position, 
  color,
  hoverColor,
  onClick, 
  isHovered, 
  onHover,
  size = 1
}: CrystallineShatterTorusProps) {
  const groupRef = useRef<THREE.Group>(null)
  const tetraRef = useRef<THREE.Mesh>(null)
  const fragmentsRef = useRef<THREE.Group>(null)
  
  // Contrasty film grain crystal shader - no shine, strong blacks
  const crystalMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      fractureLevel: { value: 0.7 }, // Always fractured and animated
      baseColor: { value: new THREE.Color(color) },
      crystalColor: { value: new THREE.Color(hoverColor) },
    },
    vertexShader: `
      uniform float time;
      uniform float fractureLevel;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      
      void main() {
        vNormal = normal;
        vPosition = position;
        vUv = uv;
        
        vec3 pos = position;
        
        // Strong crystal faceting
        float facet1 = sin(pos.x * 12.0 + time * 2.0) * 0.18;
        float facet2 = sin(pos.y * 10.0 + time * 1.8) * 0.16;
        float facet3 = sin(pos.z * 14.0 + time * 2.3) * 0.2;
        
        pos += normal * (facet1 + facet2 + facet3) * fractureLevel;
        
        // Strong crystal pulsing
        float breathe = sin(time * 3.0) * 0.12;
        pos += normal * breathe;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 baseColor;
      uniform vec3 crystalColor;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      
      // Heavy film grain function
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      
      float filmGrain(vec2 uv, float time) {
        return hash(uv * 320.0 + time * 0.1) * 0.9 - 0.45;
      }
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vPosition);
        
        // Strong saturated crystal base - no shine
        vec3 color = mix(baseColor * 1.4, crystalColor * 1.6, 0.8);
        
        // NO reflection - just edge darkening for crystal definition
        float edge = dot(normal, viewDir);
        color = mix(vec3(0.0), color, edge * 0.7 + 0.3);
        
        // Strong crystal sparkle patterns
        float sparkle = sin(vPosition.x * 20.0 + time * 4.0) * 
                       sin(vPosition.y * 18.0 + time * 3.5) * 0.5;
        color += sparkle * crystalColor * 0.8;
        
        // Heavy film grain
        float grain = filmGrain(vUv, time);
        color += grain * 1.3;
        
        // Strong contrast and saturation
        color = pow(color, vec3(0.6)); // Boost mids more
        color = mix(vec3(0.0), color, 2.2); // Stronger contrast
        color = clamp(color, 0.0, 1.0);
        
        // Boost saturation heavily
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(luminance), color, 3.0);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    transparent: false
  })
  
  // Create constantly moving crystal fragments
  const fragments: Array<{
    position: [number, number, number]
    rotation: [number, number, number]
    scale: number
  }> = []
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2
    const radius = size * (0.5 + Math.random() * 0.4)
    fragments.push({
      position: [
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * size * 1.0,
        Math.sin(angle) * radius
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      scale: 0.05 + Math.random() * 0.12
    })
  }
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    
    // Update material uniforms
    crystalMaterial.uniforms.time.value = time
    
    // Always animated rotation
    groupRef.current.rotation.y = time * 0.9
    groupRef.current.rotation.x = Math.sin(time * 1.3) * 0.25
    groupRef.current.rotation.z = Math.cos(time * 1.1) * 0.15
    
    // Always animate fragments
    if (fragmentsRef.current) {
      fragmentsRef.current.children.forEach((fragment, i) => {
        const mesh = fragment as THREE.Mesh
        
        // Constant scattering animation
        const baseDistance = 1.2
        
        mesh.position.x = fragments[i].position[0] * baseDistance + Math.sin(time * 2 + i) * 0.2
        mesh.position.y = fragments[i].position[1] * baseDistance + Math.cos(time * 1.5 + i) * 0.3
        mesh.position.z = fragments[i].position[2] * baseDistance + Math.sin(time * 2.5 + i) * 0.2
        
        // Constant rotation
        mesh.rotation.x = fragments[i].rotation[0] + time * (1.2 + i * 0.2)
        mesh.rotation.y = fragments[i].rotation[1] + time * (0.9 + i * 0.15)
        mesh.rotation.z = fragments[i].rotation[2] + time * (1.0 + i * 0.25)
        
        const material = mesh.material as THREE.MeshPhysicalMaterial
        material.opacity = 0.7
      })
    }
  })

  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <group 
        ref={groupRef} 
        position={position}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        onClick={onClick}
      >
        <mesh ref={tetraRef}>
          <tetrahedronGeometry args={[size * 0.6, 5]} />
          <primitive object={crystalMaterial} />
        </mesh>
        
        {/* Always visible crystal fragments - contrasty, no shine */}
        <group ref={fragmentsRef}>
          {fragments.map((fragment, i) => (
            <mesh
              key={i}
              position={fragment.position}
              rotation={fragment.rotation}
              scale={fragment.scale}
            >
              <octahedronGeometry args={[0.08, 0]} />
              <meshStandardMaterial
                color={color}
                metalness={0.0}
                roughness={1.0}
                transparent
                opacity={0.8}
              />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  )
} 