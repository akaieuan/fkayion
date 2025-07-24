'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

interface FracturingCubeOrbProps {
  position: [number, number, number]
  color: string
  hoverColor: string
  onClick: () => void
  isHovered: boolean
  onHover: (hovered: boolean) => void
  size?: number
  isDotMatrix?: boolean
}

export function FracturingCubeOrb({ 
  position, 
  color,
  hoverColor,
  onClick, 
  isHovered, 
  onHover,
  size = 1,
  isDotMatrix = false
}: FracturingCubeOrbProps) {
  const groupRef = useRef<THREE.Group>(null)
  const mainCubeRef = useRef<THREE.Mesh>(null)
  const fragmentsRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)
  
  // Dramatic fracturing shader with extreme contrast and grain
  const fracturingMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      fractureIntensity: { value: 0 },
      baseColor: { value: new THREE.Color(color) },
      fractureColor: { value: new THREE.Color(hoverColor) },
      foamColor: { value: new THREE.Color('#ffffff') },
      blackColor: { value: new THREE.Color('#000000') },
    },
    vertexShader: `
      uniform float time;
      uniform float fractureIntensity;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying float vFracture;
      varying vec3 vWorldPosition;
      
      // Dramatic fracturing noise
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
        float amplitude = 0.5;
        for(int i = 0; i < 6; i++) {
          value += amplitude * noise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }
      
      void main() {
        vNormal = normal;
        vPosition = position;
        vUv = uv;
        vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        
        vec3 pos = position;
        
        // Extreme fracturing deformation when active
        if (fractureIntensity > 0.0) {
          // Sharp angular breakage
          float crack1 = step(0.5, sin(pos.x * 15.0 + time * 6.0)) * fractureIntensity * 0.5;
          float crack2 = step(0.5, sin(pos.y * 12.0 + time * 5.0)) * fractureIntensity * 0.4;
          float crack3 = step(0.5, sin(pos.z * 18.0 + time * 7.0)) * fractureIntensity * 0.3;
          
          pos += normal * (crack1 + crack2 + crack3);
          
          // Extreme shattering with fbm
          float shatter = fbm(pos * 8.0 + time * 4.0) * fractureIntensity;
          pos += normal * shatter * 0.7;
          
          // Violent explosion effect
          float explosion = pow(fractureIntensity, 2.0) * sin(time * 10.0 + length(pos) * 20.0) * 0.5;
          pos += normal * explosion;
          
          // Chaotic behavior at high fracture
          if (fractureIntensity > 0.6) {
            float chaos = fbm(pos * 15.0 + time * 8.0) * (fractureIntensity - 0.6) * 3.0;
            pos += normal * chaos * 0.6;
          }
        }
        
        vFracture = fractureIntensity;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float fractureIntensity;
      uniform vec3 baseColor;
      uniform vec3 fractureColor;
      uniform vec3 foamColor;
      uniform vec3 blackColor;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying float vFracture;
      varying vec3 vWorldPosition;
      
      // Extreme film grain
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      
      float filmGrain(vec2 uv, float time) {
        return hash(uv + time * 0.1) * 0.8 - 0.4;
      }
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        
        // Dramatic color mixing with sharp transitions
        vec3 color = mix(baseColor, fractureColor, step(0.4, vFracture));
        
        // Extreme fresnel for dramatic edges
        float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 1.5);
        color = mix(color, foamColor, fresnel * (0.4 + vFracture * 1.2));
        
        // Sharp fracture lines
        float fractureLines = step(0.8, sin(vPosition.x * 50.0 + time * 10.0)) * 
                             step(0.8, sin(vPosition.y * 40.0 + time * 8.0)) * 
                             vFracture;
        color += fractureLines * foamColor * 2.0;
        
        // Extreme light scattering in cracks
        float scatter = pow(max(0.0, dot(normal, vec3(1.0, 1.0, 0.0))), 0.5) * vFracture * 1.5;
        color = mix(color, fractureColor * 2.5, scatter);
        
        // Deep shadows in fractures
        float cavity = 1.0 - max(0.0, dot(normal, vec3(0.0, 1.0, 0.0)));
        color = mix(color, blackColor, cavity * vFracture * 0.5);
        
        // Most aggressive film grain
        float grain = filmGrain(vUv * 160.0, time);
        color += grain * 1.6;
        
        // Extreme contrast enhancement
        color = pow(color, vec3(2.0)); // Highest contrast
        color = mix(vec3(0.05), color, 1.8); // Strongest enhancement
        
        // Maximum saturation boost
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(luminance), color, 2.5); // Maximum saturation
        
        // Sharp transparency for fracturing effect
        float alpha = 0.85 + vFracture * 0.15;
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true
  })
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    timeRef.current = time
    
    // Update material uniforms
    fracturingMaterial.uniforms.time.value = time
    
    // Fracture intensity animation - very responsive
    const targetFracture = isHovered ? 1.0 : 0.0
    const currentFracture = fracturingMaterial.uniforms.fractureIntensity.value
    fracturingMaterial.uniforms.fractureIntensity.value = THREE.MathUtils.lerp(currentFracture, targetFracture, 0.15)
    
    // Violent shaking when fracturing
    const fractureLevel = currentFracture
    if (fractureLevel > 0) {
      groupRef.current.position.x = position[0] + (Math.random() - 0.5) * fractureLevel * 0.1
      groupRef.current.position.z = position[2] + (Math.random() - 0.5) * fractureLevel * 0.1
    }
    
    // Erratic floating motion
    groupRef.current.position.y = position[1] + 
      Math.sin(time * 2.5) * 0.15 * (1 + fractureLevel * 2) +
      Math.sin(time * 4.2) * 0.1 * fractureLevel
    
    // Chaotic rotation when fracturing
    const rotationMultiplier = 1 + fractureLevel * 4
    groupRef.current.rotation.y = time * 0.8 * rotationMultiplier
    groupRef.current.rotation.x = Math.sin(time * 2.2) * 0.4 * rotationMultiplier
    groupRef.current.rotation.z = Math.cos(time * 1.8) * 0.3 * fractureLevel
    
    // Aggressive scale pulsing
    const scale = 1 + Math.sin(time * 5.0) * 0.15 * fractureLevel + 
                     Math.sin(time * 8.0) * 0.1 * fractureLevel
    groupRef.current.scale.setScalar(scale)
    
    // Animate fragments
    if (fragmentsRef.current && fractureLevel > 0) {
      fragmentsRef.current.children.forEach((fragment, i) => {
        const angle = (i / 8) * Math.PI * 2
        const distance = fractureLevel * 0.8
        fragment.position.x = Math.cos(angle + time * 2) * distance
        fragment.position.y = Math.sin(time * 3 + i) * distance * 0.5
        fragment.position.z = Math.sin(angle + time * 2) * distance
        fragment.rotation.x = time * (2 + i * 0.5) * fractureLevel
        fragment.rotation.y = time * (1.5 + i * 0.3) * fractureLevel
        const fragmentScale = (1 - fractureLevel * 0.5) * (0.8 + Math.sin(time * 4 + i) * 0.2)
        fragment.scale.setScalar(fragmentScale)
      })
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group 
        ref={groupRef} 
        position={position}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        onClick={onClick}
      >
        {isDotMatrix ? (
          /* Dot matrix mode - fracturing clustered particles */
          <>
            <points>
              <boxGeometry args={[size * 0.9, size * 0.9, size * 0.9]} />
              <pointsMaterial 
                color={isHovered ? hoverColor : color}
                size={isHovered ? 0.05 : 0.025}
                sizeAttenuation={true}
                transparent
                opacity={isHovered ? 0.8 : 0.4}
              />
            </points>
            <points position={[Math.cos(timeRef.current * 3) * 0.2, Math.sin(timeRef.current * 2.5) * 0.2, 0]}>
              <boxGeometry args={[size * 0.7, size * 0.7, size * 0.7]} />
              <pointsMaterial 
                color={isHovered ? hoverColor : color}
                size={isHovered ? 0.04 : 0.02}
                sizeAttenuation={true}
                transparent
                opacity={isHovered ? 0.6 : 0.3}
              />
            </points>
            <points position={[Math.sin(timeRef.current * 1.8) * 0.15, 0, Math.cos(timeRef.current * 2.2) * 0.15]}>
              <boxGeometry args={[size * 0.5, size * 0.5, size * 0.5]} />
              <pointsMaterial 
                color={isHovered ? hoverColor : color}
                size={isHovered ? 0.03 : 0.015}
                sizeAttenuation={true}
                transparent
                opacity={isHovered ? 0.5 : 0.25}
              />
            </points>
          </>
        ) : (
          /* Main fracturing cube */
          <RoundedBox ref={mainCubeRef} args={[size, size, size]} radius={0.05} smoothness={2}>
            <primitive object={fracturingMaterial} />
          </RoundedBox>
        )}
        
        {/* Dramatic fragments when fracturing */}
        <group ref={fragmentsRef}>
          {isHovered && Array.from({ length: 8 }).map((_, i) => (
            <RoundedBox 
              key={i} 
              args={[size * 0.15, size * 0.15, size * 0.15]} 
              radius={0.02}
              position={[0, 0, 0]}
            >
              <meshStandardMaterial 
                color={hoverColor}
                emissive={hoverColor}
                emissiveIntensity={0.5}
                metalness={0.2}
                roughness={0.8}
                transparent
                opacity={0.9}
              />
            </RoundedBox>
          ))}
        </group>
      </group>
    </Float>
  )
} 