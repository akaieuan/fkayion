'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere } from '@react-three/drei'
import * as THREE from 'three'

interface CrystallineShatterOrbProps {
  position: [number, number, number]
  colors: { primary: string, secondary: string, rim: string }
  onClick: () => void
  isHovered: boolean
  onHover: (hovered: boolean) => void
  size?: number
}

export function CrystallineShatterOrb({ 
  position, 
  colors, 
  onClick, 
  isHovered, 
  onHover,
  size = 1
}: CrystallineShatterOrbProps) {
  const groupRef = useRef<THREE.Group>(null)
  const mainOrbRef = useRef<THREE.Mesh>(null)
  const fragmentsRef = useRef<THREE.Group>(null)
  
  // Enhanced crystal fracture shader with film grain and high contrast
  const crystalMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      fractureLevel: { value: 0 },
      baseColor: { value: new THREE.Color('#001133') }, // Dark blue base
      crystalColor: { value: new THREE.Color('#88ddff') },
      glowColor: { value: new THREE.Color('#ffffff') },
      blackColor: { value: new THREE.Color('#000000') }, // Pure black
    },
    vertexShader: `
      uniform float time;
      uniform float fractureLevel;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying float vFracture;
      varying vec3 vWorldPosition;
      
      // Enhanced fracture generation with more contrast
      float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }
      
      float fracture(vec3 pos) {
        // More dramatic fracture patterns
        float f1 = sin(pos.x * 20.0) * sin(pos.y * 18.0);
        float f2 = sin(pos.z * 25.0) * sin(pos.x * 12.0);
        float f3 = sin(pos.y * 30.0) * sin(pos.z * 15.0);
        float combined = (f1 + f2 + f3) * 0.33;
        
        // Sharp fracture lines
        return step(0.1, abs(combined)) * sign(combined);
      }
      
      void main() {
        vNormal = normal;
        vPosition = position;
        vUv = uv;
        vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        
        vec3 pos = position;
        
        // Calculate dramatic fracture pattern
        float fracturePattern = fracture(pos);
        vFracture = fracturePattern;
        
        // Extreme displacement when fracturing
        if (fractureLevel > 0.0) {
          vec3 displacement = normal * fracturePattern * fractureLevel * 0.8;
          pos += displacement;
          
          // Create deep gaps between fractures
          float gap = step(0.3, abs(fracturePattern)) * fractureLevel;
          pos += normal * gap * 0.3;
          
          // Chaos effect at high fracture levels
          if (fractureLevel > 0.7) {
            float chaos = hash(pos + time * 0.5) * 2.0 - 1.0;
            pos += normal * chaos * (fractureLevel - 0.7) * 0.5;
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
      varying vec2 vUv;
      varying float vFracture;
      varying vec3 vWorldPosition;
      
      // Film grain
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      
      float filmGrain(vec2 uv, float time) {
        return hash(uv + time * 0.1) * 0.4 - 0.2;
      }
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        
        // Start with dark base
        vec3 color = baseColor;
        
        // Dramatic fracture lines with pure black cracks
        float fractureLine = abs(vFracture);
        if (fractureLevel > 0.1) {
          // Black fracture lines
          float crackMask = step(0.8, fractureLine) * fractureLevel;
          color = mix(color, blackColor, crackMask * 0.9);
          
          // Bright glow on fracture edges
          float glowMask = smoothstep(0.7, 0.85, fractureLine) * fractureLevel;
          color = mix(color, glowColor, glowMask * 1.2);
        }
        
        // Enhanced crystal refraction with high contrast
        float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 2.0);
        color = mix(color, crystalColor, fresnel * 0.8);
        
        // Internal light scattering - more dramatic
        float scatter = sin(vPosition.x * 15.0 + time * 2.0) * 
                       sin(vPosition.y * 12.0 + time * 2.5) * 
                       sin(vPosition.z * 18.0 + time * 1.5) * 0.2;
        color += scatter * crystalColor * 0.6;
        
        // Film grain for realism
        float grain = filmGrain(vUv * 80.0, time);
        color += grain * 0.6;
        
        // High contrast enhancement
        color = pow(color, vec3(1.4)); // More contrast
        color = mix(blackColor, color, 1.3); // Enhance blacks
        
        // Saturation boost
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(luminance), color, 1.5);
        
        // Transparency increases dramatically with fracturing
        float alpha = 1.0 - fractureLevel * 0.5;
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true
  })
  
  // Create crystal fragments with more dramatic positioning
  const fragments: Array<{
    position: [number, number, number]
    rotation: [number, number, number]
    scale: number
  }> = []
  for (let i = 0; i < 15; i++) { // More fragments
    const angle = (i / 15) * Math.PI * 2
    const radius = size * (0.6 + Math.random() * 0.4)
    fragments.push({
      position: [
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * size * 1.5,
        Math.sin(angle) * radius
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      scale: 0.08 + Math.random() * 0.25
    })
  }
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    
    // Update material uniforms
    crystalMaterial.uniforms.time.value = time
    
    // Fracture level animation - faster and more dramatic
    const targetFracture = isHovered ? 1.0 : 0.0
    const currentFracture = crystalMaterial.uniforms.fractureLevel.value
    crystalMaterial.uniforms.fractureLevel.value = THREE.MathUtils.lerp(currentFracture, targetFracture, 0.12)
    
    // Gentle rotation with crystal-like precision
    groupRef.current.rotation.y = time * 0.3
    groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1
    
    // Animate fragments when hovering - more chaotic
    if (fragmentsRef.current && isHovered) {
      fragmentsRef.current.children.forEach((fragment, i) => {
        const mesh = fragment as THREE.Mesh
        
        // More dramatic scattering
        const scatterIntensity = currentFracture * 0.8
        mesh.position.x = fragments[i].position[0] * (1 + scatterIntensity)
        mesh.position.y = fragments[i].position[1] * (1 + scatterIntensity * 0.7)
        mesh.position.z = fragments[i].position[2] * (1 + scatterIntensity)
        
        // Faster, more chaotic rotation
        mesh.rotation.x = fragments[i].rotation[0] + time * (0.8 + i * 0.15)
        mesh.rotation.y = fragments[i].rotation[1] + time * (0.6 + i * 0.12)
        mesh.rotation.z = fragments[i].rotation[2] + time * (0.7 + i * 0.18)
      })
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group 
        ref={groupRef} 
        position={position}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        onClick={onClick}
      >
        {/* Main crystal orb */}
        <Sphere ref={mainOrbRef} args={[size, 64, 64]}>
          <primitive object={crystalMaterial} />
        </Sphere>
        
        {/* Crystal fragments - enhanced */}
        <group ref={fragmentsRef}>
          {fragments.map((fragment, i) => (
            <mesh
              key={i}
              position={fragment.position}
              rotation={fragment.rotation}
              scale={fragment.scale}
            >
              <octahedronGeometry args={[0.12, 0]} />
              <meshPhysicalMaterial
                color="#003366"
                transmission={0.95}
                thickness={0.05}
                roughness={0.0}
                metalness={0.0}
                clearcoat={1.0}
                clearcoatRoughness={0.0}
                ior={2.8}
                transparent
                opacity={isHovered ? 0.9 : 0}
              />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  )
} 