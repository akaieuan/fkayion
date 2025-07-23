'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

interface FracturingCubeProps {
  position: [number, number, number]
  size: number
  intensity: number
  isActive: boolean
}

export function FracturingCube({ position, size, intensity, isActive }: FracturingCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Enhanced fracturing shader based on orb-2 with stronger hover response
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      fractureLevel: { value: 0 },
      intensity: { value: intensity },
      baseColor: { value: new THREE.Color('#3388dd') }, // Much brighter blue
      crystalColor: { value: new THREE.Color('#66bbff') }, // Brighter crystal blue
      glowColor: { value: new THREE.Color('#ffffff') }, // Pure white glow
      blackColor: { value: new THREE.Color('#000000') },
    },
    vertexShader: `
      uniform float time;
      uniform float fractureLevel;
      uniform float intensity;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vFracture;
      varying vec3 vWorldPosition;
      
      // Enhanced fracture generation (from orb-2)
      float fracture(vec3 pos) {
        float f1 = sin(pos.x * 20.0) * sin(pos.y * 18.0);
        float f2 = sin(pos.z * 25.0) * sin(pos.x * 12.0);
        float f3 = sin(pos.y * 30.0) * sin(pos.z * 15.0);
        float combined = (f1 + f2 + f3) * 0.33;
        return step(0.1, abs(combined)) * sign(combined);
      }
      
      void main() {
        vNormal = normal;
        vPosition = position;
        vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        
        vec3 pos = position;
        
        // Enhanced fracture pattern (from orb-2)
        float fracturePattern = fracture(pos);
        vFracture = fracturePattern;
        
        // More dramatic displacement when fracturing
        if (fractureLevel > 0.0) {
          vec3 displacement = normal * fracturePattern * fractureLevel * intensity * 0.6;
          pos += displacement;
          
          // Create deeper gaps
          float gap = step(0.3, abs(fracturePattern)) * fractureLevel;
          pos += normal * gap * 0.25;
          
          // Chaos effect at high fracture levels (from orb-2)
          if (fractureLevel > 0.7) {
            float chaos = sin(time * 2.0 + pos.x * 10.0) * (fractureLevel - 0.7) * 2.0;
            pos += normal * chaos * 0.3;
          }
        }
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float fractureLevel;
      uniform vec3 baseColor;
      uniform vec3 crystalColor;
      uniform vec3 glowColor;
      uniform vec3 blackColor;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vFracture;
      varying vec3 vWorldPosition;
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        
        // Start with base crystal color
        vec3 color = baseColor;
        
        // Dramatic fracture lines with pure black cracks (from orb-2)
        float fractureLine = abs(vFracture);
        if (fractureLevel > 0.1) {
          // Black fracture lines
          float crackMask = step(0.8, fractureLine) * fractureLevel;
          color = mix(color, blackColor, crackMask * 0.9);
          
          // Bright glow on fracture edges
          float glowMask = smoothstep(0.7, 0.85, fractureLine) * fractureLevel;
          color = mix(color, glowColor, glowMask * 1.2);
        }
        
        // Enhanced crystal refraction
        float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 2.0);
        color = mix(color, crystalColor, fresnel * 0.7);
        
        // Internal light scattering (from orb-2)
        float scatter = sin(vPosition.x * 15.0 + time * 2.0) * 
                       sin(vPosition.y * 12.0 + time * 2.5) * 
                       sin(vPosition.z * 18.0 + time * 1.5) * 0.15;
        color += scatter * crystalColor * 0.5;
        
        // Transparency increases with fracturing
        float alpha = 0.9 - fractureLevel * 0.4;
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true
  })
  
  useFrame((state) => {
    if (!meshRef.current) return
    
    const material = meshRef.current.material as THREE.ShaderMaterial
    if (!material) return
      
    const time = state.clock.elapsedTime
    
    // Update shader uniforms with smoother transitions
    material.uniforms.time.value = time
    
    // Enhanced fracture animation - more dramatic response like orb-2
    const targetFracture = isActive ? 1.0 : 0.1 + Math.sin(time * 0.25 + position[1]) * 0.05
    const currentFracture = material.uniforms.fractureLevel.value
    material.uniforms.fractureLevel.value = THREE.MathUtils.lerp(currentFracture, targetFracture, 0.04) // Slower exit transition
    
    // Enhanced rotation with crystalline precision
    const rotationSpeed = isActive ? 0.2 : 0.4
    meshRef.current.rotation.y = time * rotationSpeed + position[1]
    meshRef.current.rotation.x = Math.cos(time * 0.3 + position[0]) * 0.1
    meshRef.current.rotation.z = Math.sin(time * 0.15 + position[2]) * 0.05
    
    // Scale pulsing when active - smoother transitions
    if (isActive) {
      const scale = 1.0 + Math.sin(time * 3.5) * 0.08
      meshRef.current.scale.setScalar(scale)
    } else {
      const currentScale = meshRef.current.scale.x
      const targetScale = 1.0
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.06)
      meshRef.current.scale.setScalar(newScale)
    }
  })

  return (
    <Float 
      speed={isActive ? 1.8 : 1.2} 
      rotationIntensity={isActive ? 0.3 : 0.2} 
      floatIntensity={isActive ? 0.5 : 0.3}
    >
      <RoundedBox 
        ref={meshRef} 
        position={position}
        args={[size, size, size]} 
        radius={0.05} 
        smoothness={4}
      >
        <primitive object={material} />
      </RoundedBox>
    </Float>
  )
} 