'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

interface PulsatingCubeOrbProps {
  position: [number, number, number]
  color: string
  hoverColor: string
  onClick: () => void
  isHovered: boolean
  onHover: (hovered: boolean) => void
  size?: number
  isDotMatrix?: boolean
}

export function PulsatingCubeOrb({ 
  position, 
  color,
  hoverColor,
  onClick, 
  isHovered, 
  onHover,
  size = 1,
  isDotMatrix = false
}: PulsatingCubeOrbProps) {
  const groupRef = useRef<THREE.Group>(null)
  const mainCubeRef = useRef<THREE.Mesh>(null)
  const timeRef = useRef(0)
  
  // Dramatic pulsating shader with extreme contrast and grain
  const pulsatingMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      pulseIntensity: { value: 0 },
      baseColor: { value: new THREE.Color(color) },
      pulseColor: { value: new THREE.Color(hoverColor) },
      foamColor: { value: new THREE.Color('#ffffff') },
      blackColor: { value: new THREE.Color('#000000') },
    },
    vertexShader: `
      uniform float time;
      uniform float pulseIntensity;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying float vPulse;
      varying vec3 vWorldPosition;
      
      void main() {
        vNormal = normal;
        vPosition = position;
        vUv = uv;
        vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        
        vec3 pos = position;
        
        // Dramatic pulsating deformation
        if (pulseIntensity > 0.0) {
          // Heartbeat-like pulse
          float heartbeat = sin(time * 8.0) * 0.5 + sin(time * 16.0) * 0.3 + sin(time * 24.0) * 0.2;
          float pulse = heartbeat * pulseIntensity * 0.6;
          
          // Breathing effect with varying speeds
          float breathe1 = sin(time * 2.0) * pulseIntensity * 0.4;
          float breathe2 = sin(time * 3.5 + 1.57) * pulseIntensity * 0.3;
          float breathe3 = sin(time * 5.0 + 3.14) * pulseIntensity * 0.2;
          
          // Radial expansion from center
          float radialPulse = length(pos) * sin(time * 6.0 - length(pos) * 10.0) * pulseIntensity * 0.5;
          
          // Apply all deformations
          pos *= 1.0 + pulse + breathe1 + breathe2 + breathe3;
          pos += normal * radialPulse;
          
          // Extreme pulsing at high intensity
          if (pulseIntensity > 0.7) {
            float extremePulse = pow(sin(time * 12.0), 2.0) * (pulseIntensity - 0.7) * 2.0;
            pos *= 1.0 + extremePulse;
          }
        }
        
        vPulse = pulseIntensity;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float pulseIntensity;
      uniform vec3 baseColor;
      uniform vec3 pulseColor;
      uniform vec3 foamColor;
      uniform vec3 blackColor;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying float vPulse;
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
        
        // Dramatic color pulsing
        float pulseFactor = sin(time * 10.0) * 0.5 + 0.5;
        vec3 color = mix(baseColor, pulseColor, vPulse * pulseFactor);
        
        // Extreme fresnel for glowing edges
        float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 1.3);
        color = mix(color, foamColor, fresnel * (0.5 + vPulse * 1.5));
        
        // Pulsing energy waves
        float energyWaves = sin(length(vPosition) * 20.0 - time * 10.0) * vPulse;
        color += energyWaves * pulseColor * 0.8;
        
        // Dramatic internal glow
        float internalGlow = pow(max(0.0, dot(normal, vec3(0.0, 0.0, 1.0))), 0.5) * vPulse;
        color = mix(color, pulseColor * 3.0, internalGlow);
        
        // Deep shadows for contrast
        float cavity = 1.0 - pow(max(0.0, dot(normal, viewDir)), 2.0);
        color = mix(color, blackColor, cavity * 0.4);
        
        // Most aggressive film grain
        float grain = filmGrain(vUv * 150.0, time);
        color += grain * 1.5;
        
        // Extreme contrast enhancement
        color = pow(color, vec3(1.9));
        color = mix(vec3(0.08), color, 1.7);
        
        // Maximum saturation boost
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(luminance), color, 2.3);
        
        // Pulsing transparency
        float alpha = 0.8 + vPulse * 0.2 * pulseFactor;
        
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
    pulsatingMaterial.uniforms.time.value = time
    
    // Pulse intensity animation - very responsive
    const targetPulse = isHovered ? 1.0 : 0.0
    const currentPulse = pulsatingMaterial.uniforms.pulseIntensity.value
    pulsatingMaterial.uniforms.pulseIntensity.value = THREE.MathUtils.lerp(currentPulse, targetPulse, 0.12)
    
    // Rhythmic floating motion
    const pulseLevel = currentPulse
    groupRef.current.position.y = position[1] + 
      Math.sin(time * 3.0) * 0.2 * (1 + pulseLevel) +
      Math.sin(time * 6.0) * 0.1 * pulseLevel
    
    // Gentle rotation that speeds up when pulsing
    const rotationSpeed = 0.5 + pulseLevel * 1.5
    groupRef.current.rotation.y = time * rotationSpeed
    groupRef.current.rotation.x = Math.sin(time * 2.0) * 0.3 * (1 + pulseLevel)
    
    // Base scale animation synchronized with pulse
    const baseScale = 1 + Math.sin(time * 4.0) * 0.08
    const pulseScale = pulseLevel * Math.sin(time * 8.0) * 0.2
    groupRef.current.scale.setScalar(baseScale + pulseScale)
  })

  return (
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.35}>
      <group 
        ref={groupRef} 
        position={position}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        onClick={onClick}
      >
        {isDotMatrix ? (
          /* Dot matrix mode - pulsing clustered particles */
          <>
            <points>
              <sphereGeometry args={[size * 0.85, 18, 18]} />
              <pointsMaterial 
                color={isHovered ? hoverColor : color}
                size={isHovered ? 0.05 : 0.025}
                sizeAttenuation={true}
                transparent
                opacity={isHovered ? 0.85 : 0.45}
              />
            </points>
            <points position={[0, Math.sin(timeRef.current * 4) * 0.25, 0]}>
              <sphereGeometry args={[size * 0.65, 14, 14]} />
              <pointsMaterial 
                color={isHovered ? hoverColor : color}
                size={isHovered ? 0.04 : 0.02}
                sizeAttenuation={true}
                transparent
                opacity={isHovered ? 0.7 : 0.35}
              />
            </points>
          </>
        ) : (
          /* Main pulsating cube */
          <RoundedBox ref={mainCubeRef} args={[size, size, size]} radius={0.08} smoothness={3}>
            <primitive object={pulsatingMaterial} />
          </RoundedBox>
        )}
        
        {/* Energy particles when pulsing */}
        {isHovered && (
          <>
            <RoundedBox args={[size * 0.08, size * 0.08, size * 0.08]} radius={0.04} position={[size * 0.6, size * 0.6, 0]}>
              <meshStandardMaterial 
                color={hoverColor}
                emissive={hoverColor}
                emissiveIntensity={1.5}
                metalness={0.1}
                roughness={0.9}
                transparent
                opacity={0.8}
              />
            </RoundedBox>
            <RoundedBox args={[size * 0.06, size * 0.06, size * 0.06]} radius={0.03} position={[-size * 0.5, 0, size * 0.5]}>
              <meshStandardMaterial 
                color={hoverColor}
                emissive={hoverColor}
                emissiveIntensity={1.5}
                metalness={0.1}
                roughness={0.9}
                transparent
                opacity={0.8}
              />
            </RoundedBox>
            <RoundedBox args={[size * 0.1, size * 0.1, size * 0.1]} radius={0.05} position={[0, -size * 0.7, -size * 0.4]}>
              <meshStandardMaterial 
                color={hoverColor}
                emissive={hoverColor}
                emissiveIntensity={1.5}
                metalness={0.1}
                roughness={0.9}
                transparent
                opacity={0.8}
              />
            </RoundedBox>
          </>
        )}
      </group>
    </Float>
  )
} 