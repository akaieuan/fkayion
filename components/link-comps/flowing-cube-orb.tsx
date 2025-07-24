'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

interface FlowingCubeOrbProps {
  position: [number, number, number]
  color: string
  hoverColor: string
  onClick: () => void
  isHovered: boolean
  onHover: (hovered: boolean) => void
  size?: number
  isDotMatrix?: boolean
}

export function FlowingCubeOrb({ 
  position, 
  color,
  hoverColor,
  onClick, 
  isHovered, 
  onHover,
  size = 1,
  isDotMatrix = false
}: FlowingCubeOrbProps) {
  const groupRef = useRef<THREE.Group>(null)
  const mainCubeRef = useRef<THREE.Mesh>(null)
  const timeRef = useRef(0)
  
  // Enhanced liquid morphing shader with film grain and high contrast (same as orb-3)
  const liquidMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      flowIntensity: { value: 0 },
      viscosity: { value: 0 },
      baseColor: { value: new THREE.Color(color) },
      liquidColor: { value: new THREE.Color(hoverColor) },
      foamColor: { value: new THREE.Color('#ffffff') },
      blackColor: { value: new THREE.Color('#000000') },
    },
    vertexShader: `
      uniform float time;
      uniform float flowIntensity;
      uniform float viscosity;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying float vFlow;
      varying vec3 vWorldPosition;
      
      // Enhanced multi-octave noise for dramatic liquid flow
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
        
        // Dramatic liquid deformation when flowing
        if (flowIntensity > 0.0) {
          // Extreme wave-like motion
          float wave1 = sin(pos.x * 8.0 + time * 4.0) * flowIntensity * 0.4;
          float wave2 = sin(pos.z * 6.0 + time * 3.5) * flowIntensity * 0.3;
          float wave3 = sin(pos.y * 10.0 + time * 5.0) * flowIntensity * 0.2;
          
          pos += normal * (wave1 + wave2 + wave3);
          
          // Dramatic liquid bulging and contracting
          float bulge = fbm(pos * 2.5 + time * 2.0) * flowIntensity;
          pos += normal * bulge * 0.6;
          
          // Extreme viscous stretching
          float stretch = sin(time * 3.0 + pos.y * 5.0) * viscosity * 0.8;
          pos.y += stretch * flowIntensity;
          
          // Chaotic liquid behavior at high flow
          if (flowIntensity > 0.6) {
            float chaos = fbm(pos * 4.0 + time * 3.0) * (flowIntensity - 0.6) * 2.5;
            pos += normal * chaos * 0.4;
          }
        }
        
        vFlow = flowIntensity;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float flowIntensity;
      uniform vec3 baseColor;
      uniform vec3 liquidColor;
      uniform vec3 foamColor;
      uniform vec3 blackColor;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying float vFlow;
      varying vec3 vWorldPosition;
      
      // Film grain
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      
      float filmGrain(vec2 uv, float time) {
        return hash(uv + time * 0.1) * 0.8 - 0.4;
      }
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        
        // High contrast liquid color mixing with better base visibility
        vec3 color = mix(baseColor, liquidColor, smoothstep(0.3, 0.9, vFlow));
        
        // Always visible base fresnel effect
        float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 1.8);
        color = mix(color, foamColor, fresnel * (0.3 + vFlow * 0.9));
        
        // Enhanced liquid surface ripples
        float ripple = sin(vPosition.x * 30.0 + time * 8.0) * 
                      sin(vPosition.z * 25.0 + time * 6.0) * 
                      vFlow * 0.4;
        color += ripple * foamColor;
        
        // Enhanced subsurface scattering effect
        float scatter = max(0.0, dot(normal, vec3(0.0, 1.0, 0.0))) * vFlow * 0.8;
        color = mix(color, liquidColor * 1.8, scatter);
        
        // Deep shadows in crevices (only when flowing)
        float cavity = 1.0 - max(0.0, dot(normal, vec3(0.0, 1.0, 0.0)));
        color = mix(color, blackColor, cavity * vFlow * 0.3);
        
        // Enhanced film grain for realism (most aggressive)
        float grain = filmGrain(vUv * 140.0, time);
        color += grain * 1.4;
        
        // Much higher contrast enhancement with better base visibility
        color = pow(color, vec3(1.7)); // Highest contrast
        color = mix(vec3(0.1), color, 1.6); // Strongest enhancement while keeping base visible
        
        // Enhanced saturation boost for liquid areas
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(luminance), color, 2.0); // Highest saturation
        
        // Enhanced transparency for liquid effect
        float alpha = 0.8 + vFlow * 0.2;
        
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
    liquidMaterial.uniforms.time.value = time
    
    // Flow intensity animation - more responsive
    const targetFlow = isHovered ? 1.0 : 0.0
    const currentFlow = liquidMaterial.uniforms.flowIntensity.value
    liquidMaterial.uniforms.flowIntensity.value = THREE.MathUtils.lerp(currentFlow, targetFlow, 0.1)
    
    // Viscosity animation - faster response
    const targetViscosity = isHovered ? 1.0 : 0.0
    const currentViscosity = liquidMaterial.uniforms.viscosity.value
    liquidMaterial.uniforms.viscosity.value = THREE.MathUtils.lerp(currentViscosity, targetViscosity, 0.06)
    
    // More dramatic liquid-like floating motion
    const flowLevel = currentFlow
    groupRef.current.position.y = position[1] + 
      Math.sin(time * 2.0) * 0.2 * (1 + flowLevel) +
      Math.sin(time * 3.2) * 0.08 * flowLevel +
      Math.sin(time * 1.8) * 0.05 * flowLevel
    
    // Rotation becomes much more chaotic when flowing
    const rotationMultiplier = 1 + flowLevel * 3
    groupRef.current.rotation.y = time * 0.6 * rotationMultiplier
    groupRef.current.rotation.x = Math.sin(time * 1.8) * 0.3 * rotationMultiplier
    groupRef.current.rotation.z = Math.cos(time * 1.2) * 0.2 * flowLevel
    
    // More dramatic scale pulsing like a liquid blob
    const scale = 1 + Math.sin(time * 4.0) * 0.12 * flowLevel + 
                     Math.sin(time * 6.0) * 0.08 * flowLevel
    groupRef.current.scale.setScalar(scale)
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group 
        ref={groupRef} 
        position={position}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        onClick={onClick}
      >
        {isDotMatrix ? (
          /* Dot matrix mode - clustered moving particles */
          <>
            <points>
              <sphereGeometry args={[size * 0.8, 20, 20]} />
              <pointsMaterial 
                color={isHovered ? hoverColor : color}
                size={isHovered ? 0.06 : 0.03}
                sizeAttenuation={true}
                transparent
                opacity={isHovered ? 0.9 : 0.5}
              />
            </points>
            <points position={[Math.sin(timeRef.current * 2) * 0.3, 0, 0]}>
              <sphereGeometry args={[size * 0.6, 15, 15]} />
              <pointsMaterial 
                color={isHovered ? hoverColor : color}
                size={isHovered ? 0.04 : 0.02}
                sizeAttenuation={true}
                transparent
                opacity={isHovered ? 0.7 : 0.3}
              />
            </points>
          </>
        ) : (
          /* Main liquid cube */
          <RoundedBox ref={mainCubeRef} args={[size, size, size]} radius={0.1} smoothness={4}>
            <primitive object={liquidMaterial} />
          </RoundedBox>
        )}
        
        {/* Enhanced liquid droplets when flowing */}
        {isHovered && (
          <>
            <RoundedBox args={[size * 0.12, size * 0.12, size * 0.12]} radius={0.06} position={[size * 0.7, -size * 0.3, 0]}>
              <meshPhysicalMaterial 
                color={color}
                transmission={0.9}
                thickness={0.08}
                roughness={0.05}
                metalness={0.0}
                ior={1.33}
                transparent
                opacity={0.95}
              />
            </RoundedBox>
            <RoundedBox args={[size * 0.09, size * 0.09, size * 0.09]} radius={0.045} position={[-size * 0.5, size * 0.4, size * 0.3]}>
              <meshPhysicalMaterial 
                color={color}
                transmission={0.9}
                thickness={0.08}
                roughness={0.05}
                metalness={0.0}
                ior={1.33}
                transparent
                opacity={0.95}
              />
            </RoundedBox>
            <RoundedBox args={[size * 0.06, size * 0.06, size * 0.06]} radius={0.03} position={[size * 0.2, size * 0.6, -size * 0.4]}>
              <meshPhysicalMaterial 
                color={color}
                transmission={0.9}
                thickness={0.08}
                roughness={0.05}
                metalness={0.0}
                ior={1.33}
                transparent
                opacity={0.95}
              />
            </RoundedBox>
            <RoundedBox args={[size * 0.05, size * 0.05, size * 0.05]} radius={0.025} position={[-size * 0.15, -size * 0.7, size * 0.15]}>
              <meshPhysicalMaterial 
                color={color}
                transmission={0.9}
                thickness={0.08}
                roughness={0.05}
                metalness={0.0}
                ior={1.33}
                transparent
                opacity={0.95}
              />
            </RoundedBox>
          </>
        )}
      </group>
    </Float>
  )
} 