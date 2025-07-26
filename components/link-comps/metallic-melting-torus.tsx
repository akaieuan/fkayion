'use client'

import { useRef } from 'react'
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
}

export function MetallicMeltingTorus({ 
  position, 
  color,
  hoverColor,
  onClick, 
  isHovered, 
  onHover,
  size = 1
}: MetallicMeltingTorusProps) {
  const groupRef = useRef<THREE.Group>(null)
  const tetraRef = useRef<THREE.Mesh>(null)
  const dropletsRef = useRef<THREE.Group>(null)
  
  // Contrasty film grain mercury shader - no shine, strong blacks
  const mercuryMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      splitLevel: { value: 0.6 }, // Always animated
      baseColor: { value: new THREE.Color(color) },
      mercuryColor: { value: new THREE.Color(hoverColor) },
    },
    vertexShader: `
      uniform float time;
      uniform float splitLevel;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      
      void main() {
        vNormal = normal;
        vPosition = position;
        vUv = uv;
        
        vec3 pos = position;
        
        // Strong animated mercury flow
        float wave1 = sin(pos.x * 8.0 + time * 3.0) * 0.2;
        float wave2 = sin(pos.y * 6.0 + time * 2.5) * 0.18;
        float wave3 = sin(pos.z * 10.0 + time * 4.0) * 0.22;
        
        pos += normal * (wave1 + wave2 + wave3) * splitLevel;
        
        // Strong pulsing
        float pulse = sin(time * 2.5) * 0.15;
        pos += normal * pulse;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 baseColor;
      uniform vec3 mercuryColor;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      
      // Heavy film grain function
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      
      float filmGrain(vec2 uv, float time) {
        return hash(uv * 300.0 + time * 0.1) * 0.8 - 0.4;
      }
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vPosition);
        
        // Strong saturated color base - no shine
        vec3 color = mix(baseColor * 1.5, mercuryColor * 1.3, 0.7);
        
        // NO reflection - just edge darkening for definition
        float edge = dot(normal, viewDir);
        color = mix(vec3(0.0), color, edge * 0.8 + 0.2);
        
        // Strong animated patterns
        float pattern = sin(vPosition.x * 15.0 + time * 5.0) * 
                       sin(vPosition.y * 12.0 + time * 4.0) * 0.4;
        color += pattern * mercuryColor * 0.6;
        
        // Heavy film grain
        float grain = filmGrain(vUv, time);
        color += grain * 1.2;
        
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
  })
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    
    // Update material uniforms
    mercuryMaterial.uniforms.time.value = time
    
    // Always animated rotation and floating
    groupRef.current.rotation.y = time * 0.8
    groupRef.current.rotation.x = Math.sin(time * 1.2) * 0.2
    groupRef.current.rotation.z = Math.cos(time * 0.9) * 0.1
    
    // Floating motion
    groupRef.current.position.y = position[1] + Math.sin(time * 2.0) * 0.1
    
    // Always animate mercury droplets
    if (dropletsRef.current) {
      dropletsRef.current.children.forEach((droplet, i) => {
        const mesh = droplet as THREE.Mesh
        const angle = (i / 6) * Math.PI * 2 + time * 2
        const distance = 0.6 + Math.sin(time * 3 + i) * 0.2
        
        mesh.position.x = Math.cos(angle) * distance
        mesh.position.y = Math.sin(time * 4 + i) * 0.4
        mesh.position.z = Math.sin(angle) * distance
        
        mesh.rotation.y = time * (2 + i * 0.3)
      })
    }
  })

  return (
    <Float speed={2.0} rotationIntensity={0.3} floatIntensity={0.5}>
      <group 
        ref={groupRef} 
        position={position}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        onClick={onClick}
      >
        <mesh ref={tetraRef}>
          <tetrahedronGeometry args={[size * 0.6, 5]} />
          <primitive object={mercuryMaterial} />
        </mesh>
        
        {/* Always visible mercury droplets - contrasty, no shine */}
        <group ref={dropletsRef}>
          {Array.from({ length: 6 }).map((_, i) => (
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
      </group>
    </Float>
  )
} 