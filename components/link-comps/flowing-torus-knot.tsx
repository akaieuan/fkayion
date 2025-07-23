'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, TorusKnot } from '@react-three/drei'
import * as THREE from 'three'

interface FlowingTorusKnotProps {
  position: [number, number, number]
  size: number
  intensity: number
  isActive: boolean
}

export function FlowingTorusKnot({ position, size, intensity, isActive }: FlowingTorusKnotProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      flowLevel: { value: 0 },
      viscosity: { value: 0 },
      intensity: { value: intensity },
      baseColor: { value: new THREE.Color('#22dd88') }, // Emerald green (unique)
      liquidColor: { value: new THREE.Color('#44ffaa') }, // Brighter emerald
      foamColor: { value: new THREE.Color('#ffffff') },
    },
    vertexShader: `
      uniform float time;
      uniform float flowLevel;
      uniform float viscosity;
      uniform float intensity;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vFlow;
      varying vec3 vWorldPosition;
      
      float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }
      
      float noise(vec3 x) {
        vec3 i = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        
        return mix(mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                      mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                  mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                      mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
      }
      
      float fbm(vec3 p) {
        float value = 0.0;
        float amp = 0.5;
        float freq = 1.0;
        for(int i = 0; i < 4; i++) {
          value += amp * noise(p * freq);
          freq *= 2.0;
          amp *= 0.5;
        }
        return value;
      }
      
      void main() {
        vNormal = normal;
        vPosition = position;
        vFlow = flowLevel;
        vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        
        vec3 pos = position;
        
        if (flowLevel > 0.0) {
          float wave1 = sin(pos.x * 8.0 + time * 4.0) * flowLevel * intensity * 0.4;
          float wave2 = sin(pos.z * 6.0 + time * 3.5) * flowLevel * intensity * 0.3;
          float wave3 = sin(pos.y * 10.0 + time * 5.0) * flowLevel * intensity * 0.2;
          
          pos += normal * (wave1 + wave2 + wave3);
          
          float bulge = fbm(pos * 2.5 + time * 2.0) * flowLevel * intensity;
          pos += normal * bulge * 0.6;
          
          float stretch = sin(time * 3.0 + pos.y * 5.0) * viscosity * flowLevel * 0.8;
          pos.y += stretch;
          
          if (flowLevel > 0.6) {
            float chaos = fbm(pos * 4.0 + time * 3.0) * (flowLevel - 0.6) * 2.5;
            pos += normal * chaos * 0.4;
          }
        }
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 baseColor;
      uniform vec3 liquidColor;
      uniform vec3 foamColor;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vFlow;
      varying vec3 vWorldPosition;
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        
        vec3 color = mix(baseColor, liquidColor, smoothstep(0.3, 0.9, vFlow));
        
        float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 1.8);
        color = mix(color, foamColor, fresnel * (0.3 + vFlow * 0.7));
        
        float ripple = sin(vPosition.x * 30.0 + time * 8.0) * 
                      sin(vPosition.z * 25.0 + time * 6.0) * 
                      vFlow * 0.4;
        color += ripple * foamColor;
        
        float scatter = max(0.0, dot(normal, vec3(0.0, 1.0, 0.0))) * vFlow * 0.8;
        color = mix(color, liquidColor * 1.8, scatter);
        
        gl_FragColor = vec4(color, 0.85 + vFlow * 0.1);
      }
    `,
    transparent: true
  })
  
  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime
    material.uniforms.time.value = time
    
    const targetFlow = isActive ? 1.0 : 0.1 + Math.sin(time * 0.4 + position[2]) * 0.1
    const currentFlow = material.uniforms.flowLevel.value
    material.uniforms.flowLevel.value = THREE.MathUtils.lerp(currentFlow, targetFlow, 0.1)
    
    const targetViscosity = isActive ? 1.0 : 0.0
    const currentViscosity = material.uniforms.viscosity.value
    material.uniforms.viscosity.value = THREE.MathUtils.lerp(currentViscosity, targetViscosity, 0.06)
    
    const flowMultiplier = 1 + currentFlow * 2
    meshRef.current.rotation.y = time * 0.5 * flowMultiplier + position[2]
    meshRef.current.rotation.x = Math.sin(time * 0.45 + position[0]) * 0.2 * flowMultiplier
    meshRef.current.rotation.z = Math.cos(time * 0.35 + position[1]) * 0.15 * flowMultiplier
    
    if (isActive) {
      const scale = 1.0 + Math.sin(time * 4.0) * 0.08 * currentFlow + 
                         Math.sin(time * 6.0) * 0.04 * currentFlow
      meshRef.current.scale.setScalar(scale)
    } else {
      meshRef.current.scale.setScalar(1.0)
    }
  })

  return (
    <Float 
      speed={isActive ? 2.5 : 2.0} 
      rotationIntensity={isActive ? 0.5 : 0.3} 
      floatIntensity={isActive ? 0.7 : 0.4}
    >
      <TorusKnot 
        ref={meshRef} 
        position={position}
        args={[size, size * 0.3, 100, 16, 2, 3]}
      >
        <primitive object={material} />
      </TorusKnot>
    </Float>
  )
} 