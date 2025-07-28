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
  
  // Enhanced flowing crystal shader - like orb-2.tsx but with liquid flow
  const crystalMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      fractureLevel: { value: 0.6 }, // Always fractured and flowing
      flowIntensity: { value: 0.8 }, // Added flow like other torus
      baseColor: { value: new THREE.Color(color) },
      crystalColor: { value: new THREE.Color(hoverColor) },
    },
    vertexShader: `
      uniform float time;
      uniform float fractureLevel;
      uniform float flowIntensity;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying float vFracture;
      varying vec3 vWorldPosition;
      
      // Enhanced fracture generation from orb-2.tsx
      float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }
      
      float fracture(vec3 pos) {
        // Flowing organic fracture patterns (from orb-2.tsx)
        float f1 = sin(pos.x * 20.0 + time * 2.0) * sin(pos.y * 18.0 + time * 1.5);
        float f2 = sin(pos.z * 25.0 + time * 2.5) * sin(pos.x * 12.0 + time * 1.8);
        float f3 = sin(pos.y * 30.0 + time * 3.0) * sin(pos.z * 15.0 + time * 2.2);
        float combined = (f1 + f2 + f3) * 0.33;
        
        // Smooth flowing fracture lines (less harsh than step)
        return smoothstep(0.0, 0.3, abs(combined)) * sign(combined);
      }
      
      void main() {
        vNormal = normal;
        vPosition = position;
        vUv = uv;
        vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        
        vec3 pos = position;
        
        // FLOWING crystal fracture pattern with time animation
        float fracturePattern = fracture(pos + time * 0.1);
        vFracture = fracturePattern;
        
        // FLOWING liquid-like crystal waves (like other torus)
        float wave1 = sin(pos.x * 4.0 + time * 3.0) * flowIntensity * 0.3;
        float wave2 = sin(pos.y * 3.5 + time * 2.5) * flowIntensity * 0.25;
        float wave3 = sin(pos.z * 5.0 + time * 4.0) * flowIntensity * 0.2;
        
        pos += normal * (wave1 + wave2 + wave3);
        
        // Crystal growth and contraction (flowing)
        float growth = sin(time * 2.0) * 0.5 + 0.5;
        pos += normal * fracturePattern * growth * 0.4;
        
        // Flowing crystal breathing
        float breath = sin(time * 1.8 + pos.x * 3.0) * 0.15;
        pos += normal * breath;
        
        // Crystal liquid stretching
        float stretch = sin(time * 2.5 + pos.y * 6.0) * 0.2;
        pos.y += stretch * flowIntensity;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float fractureLevel;
      uniform float flowIntensity;
      uniform vec3 baseColor;
      uniform vec3 crystalColor;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying float vFracture;
      varying vec3 vWorldPosition;
      
      // Heavy film grain function (like other torus)
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      
      float filmGrain(vec2 uv, float time) {
        return hash(uv * 290.0 + time * 0.1) * 0.9 - 0.45;
      }
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        
        // Strong saturated crystal base - flowing like liquid crystal
        vec3 color = mix(baseColor * 1.5, crystalColor * 1.7, 0.8);
        
        // NO reflection - just edge darkening for crystal definition
        float edge = dot(normal, viewDir);
        color = mix(vec3(0.0), color, edge * 0.7 + 0.3);
        
        // Flowing crystal fracture lines (smooth, not harsh)
        float fractureMask = smoothstep(0.2, 0.8, abs(vFracture)) * flowIntensity;
        color = mix(color, crystalColor * 1.5, fractureMask * 0.6);
        
        // Flowing crystal sparkle patterns
        float sparkle = sin(vPosition.x * 18.0 + time * 5.0) * 
                       sin(vPosition.y * 15.0 + time * 4.0) * 
                       sin(vPosition.z * 22.0 + time * 6.0) * 0.4;
        color += sparkle * crystalColor * flowIntensity * 0.8;
        
        // Heavy film grain for texture
        float grain = filmGrain(vUv, time);
        color += grain * 1.3;
        
        // Strong contrast and saturation (like other torus)
        color = pow(color, vec3(0.65)); // Film-like gamma
        color = mix(vec3(0.0), color, 2.1); // Strong contrast
        color = clamp(color, 0.0, 1.0);
        
        // Boost saturation heavily
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(luminance), color, 2.7);
        
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
    
    // Flowing rotation like liquid crystal (similar to other torus)
    groupRef.current.rotation.y = time * 1.0
    groupRef.current.rotation.x = Math.sin(time * 1.5) * 0.25
    groupRef.current.rotation.z = Math.cos(time * 1.2) * 0.15
    
    // Flowing floating motion (like other torus)
    groupRef.current.position.y = position[1] + 
      Math.sin(time * 2.2) * 0.12 +
      Math.sin(time * 3.8) * 0.06
    
    // Flowing scale pulsing (like crystal breathing)
    const scale = 1 + Math.sin(time * 3.5) * 0.08 + 
                     Math.sin(time * 5.2) * 0.04
    groupRef.current.scale.setScalar(scale)
    
    // Smooth flowing fragment animation
    if (fragmentsRef.current) {
      fragmentsRef.current.children.forEach((fragment, i) => {
        const mesh = fragment as THREE.Mesh
        
        // Smooth flowing orbital motion
        const angle = (i / 10) * Math.PI * 2 + time * 1.5
        const radius = 1.0 + Math.sin(time * 2.0 + i * 0.5) * 0.2
        
        mesh.position.x = fragments[i].position[0] * radius + Math.cos(angle) * 0.1
        mesh.position.y = fragments[i].position[1] * radius + Math.sin(time * 1.8 + i) * 0.15
        mesh.position.z = fragments[i].position[2] * radius + Math.sin(angle) * 0.1
        
        // Smooth flowing rotation
        mesh.rotation.x = fragments[i].rotation[0] + time * (1.0 + i * 0.1)
        mesh.rotation.y = fragments[i].rotation[1] + time * (0.8 + i * 0.08)
        mesh.rotation.z = fragments[i].rotation[2] + time * (0.9 + i * 0.12)
        
        const material = mesh.material as THREE.MeshStandardMaterial
        material.opacity = 0.8 + Math.sin(time * 3.0 + i) * 0.1
      })
    }
  })

  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.7}>
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