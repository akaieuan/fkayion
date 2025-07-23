'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

interface FracturingCylinderProps {
  position: [number, number, number]
  size: number
  intensity: number
  isActive: boolean
}

export function FracturingCylinder({ position, size, intensity, isActive }: FracturingCylinderProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      fractureLevel: { value: 0 },
      intensity: { value: intensity },
      baseColor: { value: new THREE.Color('#5566ff') }, // Purple-blue (unique)
      crystalColor: { value: new THREE.Color('#7788ff') }, // Brighter purple-blue
      glowColor: { value: new THREE.Color('#ffffff') },
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
        
        float fracturePattern = fracture(pos);
        vFracture = fracturePattern;
        
        if (fractureLevel > 0.0) {
          vec3 displacement = normal * fracturePattern * fractureLevel * intensity * 0.6;
          pos += displacement;
          
          float gap = step(0.3, abs(fracturePattern)) * fractureLevel;
          pos += normal * gap * 0.25;
          
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
        
        vec3 color = baseColor;
        
        float fractureLine = abs(vFracture);
        if (fractureLevel > 0.1) {
          float crackMask = step(0.8, fractureLine) * fractureLevel;
          color = mix(color, blackColor, crackMask * 0.9);
          
          float glowMask = smoothstep(0.7, 0.85, fractureLine) * fractureLevel;
          color = mix(color, glowColor, glowMask * 1.2);
        }
        
        float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 2.0);
        color = mix(color, crystalColor, fresnel * 0.7);
        
        float scatter = sin(vPosition.x * 15.0 + time * 2.0) * 
                       sin(vPosition.y * 12.0 + time * 2.5) * 
                       sin(vPosition.z * 18.0 + time * 1.5) * 0.15;
        color += scatter * crystalColor * 0.5;
        
        float alpha = 0.9 - fractureLevel * 0.4;
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true
  })
  
  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime
    material.uniforms.time.value = time
    
    const targetFracture = isActive ? 0.9 : 0.05 + Math.sin(time * 0.25 + position[1]) * 0.05
    const currentFracture = material.uniforms.fractureLevel.value
    material.uniforms.fractureLevel.value = THREE.MathUtils.lerp(currentFracture, targetFracture, 0.08)
    
    const rotationSpeed = isActive ? 0.4 : 0.2
    meshRef.current.rotation.y = time * rotationSpeed + position[1]
    meshRef.current.rotation.x = Math.sin(time * 0.35 + position[0]) * 0.2
    meshRef.current.rotation.z = Math.cos(time * 0.15 + position[2]) * 0.1
    
    if (isActive) {
      const scale = 1.0 + Math.sin(time * 3.0) * 0.03
      meshRef.current.scale.setScalar(scale)
    } else {
      meshRef.current.scale.setScalar(1.0)
    }
  })

  return (
    <Float 
      speed={isActive ? 1.8 : 1.2} 
      rotationIntensity={isActive ? 0.3 : 0.2} 
      floatIntensity={isActive ? 0.5 : 0.3}
    >
      <Cylinder 
        ref={meshRef} 
        position={position}
        args={[size, size, size * 1.5, 16]}
      >
        <primitive object={material} />
      </Cylinder>
    </Float>
  )
} 