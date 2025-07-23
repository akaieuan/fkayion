'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Torus } from '@react-three/drei'
import * as THREE from 'three'

interface MeltingTorusProps {
  position: [number, number, number]
  size: number
  intensity: number
  isActive: boolean
}

export function MeltingTorus({ position, size, intensity, isActive }: MeltingTorusProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      heatLevel: { value: 0 },
      intensity: { value: intensity },
      baseColor: { value: new THREE.Color('#dd2244') }, // Deep red (unique)
      hotColor: { value: new THREE.Color('#ff4466') }, // Brighter deep red
      glowColor: { value: new THREE.Color('#ffaa00') },
    },
    vertexShader: `
      uniform float time;
      uniform float heatLevel;
      uniform float intensity;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vHeat;
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
        vHeat = heatLevel;
        vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        
        vec3 pos = position;
        
        if (heatLevel > 0.0) {
          float meltFactor = smoothstep(0.0, 1.0, heatLevel);
          
          float gravity = max(0.0, -pos.y + 0.3) * meltFactor * intensity;
          pos.y -= gravity * 1.2;
          
          float goop = fbm(pos * 4.0 + time * 0.8) * meltFactor * intensity;
          pos.y -= abs(goop) * 0.6;
          
          float bulge = fbm(pos * 2.5 + time * 0.5) * meltFactor;
          pos += normal * bulge * 0.4;
          
          float tension = sin(pos.x * 8.0 + time * 2.0) * sin(pos.z * 6.0 + time * 1.5);
          pos += normal * tension * meltFactor * 0.3;
        }
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 baseColor;
      uniform vec3 hotColor;
      uniform vec3 glowColor;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vHeat;
      varying vec3 vWorldPosition;
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        
        vec3 color = mix(baseColor, hotColor, smoothstep(0.2, 0.8, vHeat));
        
        if (vHeat > 0.5) {
          float extremeGlow = (vHeat - 0.5) * 2.0;
          color = mix(color, glowColor, extremeGlow * 0.8);
        }
        
        float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 1.5);
        color = mix(color, vec3(1.0), fresnel * 0.4);
        
        if (vHeat > 0.3) {
          float shimmer = sin(vPosition.x * 20.0 + time * 6.0) * 
                         sin(vPosition.y * 15.0 + time * 4.0) * 
                         vHeat * 0.2;
          color += shimmer * glowColor;
        }
        
        gl_FragColor = vec4(color, 1.0);
      }
    `
  })
  
  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime
    material.uniforms.time.value = time
    
    const targetHeat = isActive ? 1.0 : 0.1 + Math.sin(time * 0.3 + position[0]) * 0.1
    const currentHeat = material.uniforms.heatLevel.value
    material.uniforms.heatLevel.value = THREE.MathUtils.lerp(currentHeat, targetHeat, 0.06)
    
    const rotationSpeed = isActive ? 0.1 : 0.3
    meshRef.current.rotation.y = time * rotationSpeed + position[0]
    meshRef.current.rotation.x = Math.sin(time * 0.4 + position[1]) * 0.15
    
    if (isActive) {
      const scale = 1.0 + Math.sin(time * 4.0) * 0.05
      meshRef.current.scale.setScalar(scale)
    } else {
      meshRef.current.scale.setScalar(1.0)
    }
  })

  return (
    <Float 
      speed={isActive ? 2.0 : 1.5} 
      rotationIntensity={isActive ? 0.2 : 0.1} 
      floatIntensity={isActive ? 0.4 : 0.2}
    >
      <Torus 
        ref={meshRef} 
        position={position}
        args={[size, size * 0.4, 16, 32]}
      >
        <primitive object={material} />
      </Torus>
    </Float>
  )
} 