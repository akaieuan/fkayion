'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface RippledNoiseSphereProps {
  position: [number, number, number]
  color: string
  hoverColor: string
  onClick: () => void
  isHovered: boolean
  onHover: (hovered: boolean) => void
  size?: number
  variant?: number
}

export function RippledNoiseSphere({
  position,
  color,
  hoverColor,
  onClick,
  isHovered,
  onHover,
  size = 1,
  variant = 0
}: RippledNoiseSphereProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)

  const variantFactor = 0.9 + (variant % 8) * 0.035
  const speed = 2.2 * (0.9 + ((variant * 3) % 5) * 0.03)
  const rotIntensity = 0.35 * (0.9 + ((variant * 5) % 5) * 0.03)
  const floatIntensity = 0.6 * (0.9 + ((variant * 7) % 5) * 0.03)

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      baseColor: { value: new THREE.Color(color) },
      accentColor: { value: new THREE.Color(hoverColor) },
      rippleFreq: { value: 2.5 * variantFactor },
      noiseAmp: { value: 0.35 * variantFactor }
    },
    vertexShader: `
      uniform float time;
      uniform float rippleFreq;
      uniform float noiseAmp;
      
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying vec3 vPos;
      
      // Simple 3D noise
      float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }
      float noise(vec3 x) {
        vec3 i = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(hash(i + vec3(0,0,0)), 
                          hash(i + vec3(1,0,0)), f.x),
                      mix(hash(i + vec3(0,1,0)), 
                          hash(i + vec3(1,1,0)), f.x), f.y),
                  mix(mix(hash(i + vec3(0,0,1)), 
                          hash(i + vec3(1,0,1)), f.x),
                      mix(hash(i + vec3(0,1,1)), 
                          hash(i + vec3(1,1,1)), f.x), f.y), f.z);
      }
      float fbm(vec3 p) {
        float value = 0.0;
        float amp = 0.5;
        for (int i = 0; i < 5; i++) {
          value += amp * noise(p);
          p *= 2.0;
          amp *= 0.5;
        }
        return value;
      }
      
      void main() {
        vNormal = normal;
        vec3 pos = position;
        vPos = pos;
        
        float r = length(pos);
        float ripple = sin(r * 10.0 * rippleFreq - time * 2.0) * 0.08;
        float n = fbm(pos * 1.5 + time * 0.6) * noiseAmp;
        pos += normal * (ripple + n);
        
        vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 baseColor;
      uniform vec3 accentColor;
      
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying vec3 vPos;
      
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      float filmGrain(vec2 uv, float t) {
        return (hash(uv * 180.0 + t * 0.1) * 2.0 - 1.0) * 0.35;
      }
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        
        float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 1.6);
        vec3 color = mix(baseColor * 1.2, accentColor * 1.5, fresnel);
        
        float lat = normalize(vPos).y;
        color = mix(color, accentColor * 1.3, smoothstep(0.2, 0.9, abs(lat)));
        
        color = pow(color, vec3(0.75));
        color = clamp(color, 0.0, 1.0);
        color += filmGrain(vWorldPosition.xy, time) * 0.4;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    transparent: false
  })

  useFrame((state) => {
    if (!groupRef.current) return
    material.uniforms.time.value = state.clock.elapsedTime
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = t * (0.7 * variantFactor)
    groupRef.current.rotation.x = Math.sin(t * (0.9 * variantFactor)) * 0.25
    groupRef.current.position.y = position[1] + Math.sin(t * (1.6 * variantFactor)) * 0.12
  })

  return (
    <Float speed={speed} rotationIntensity={rotIntensity} floatIntensity={floatIntensity}>
      <group
        ref={groupRef}
        position={position}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        onClick={onClick}
      >
        <mesh ref={meshRef}>
          <sphereGeometry args={[size * 0.85, 64, 64]} />
          <primitive object={material} />
        </mesh>
      </group>
    </Float>
  )
}


