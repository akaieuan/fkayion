'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere } from '@react-three/drei'
import * as THREE from 'three'

interface MetallicMeltingOrbProps {
  position: [number, number, number]
  colors: { primary: string, secondary: string, rim: string }
  onClick: () => void
  isHovered: boolean
  onHover: (hovered: boolean) => void
  size?: number
}

export function MetallicMeltingOrb({ 
  position, 
  colors, 
  onClick, 
  isHovered, 
  onHover,
  size = 1
}: MetallicMeltingOrbProps) {
  const groupRef = useRef<THREE.Group>(null)
  const mainOrbRef = useRef<THREE.Mesh>(null)
  const meltRef = useRef<THREE.Mesh>(null)
  const heatGlowRef = useRef<THREE.Mesh>(null)
  
  // Enhanced goopy melting shader with film grain
  const meltMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      heatLevel: { value: 0 },
      meltIntensity: { value: 0 },
      baseColor: { value: new THREE.Color('#cc2222') }, // Red metallic base
      hotColor: { value: new THREE.Color('#ff2200') }, // Bright molten red
      glowColor: { value: new THREE.Color('#ffaa00') }, // Hot orange glow
    },
    vertexShader: `
      uniform float time;
      uniform float heatLevel;
      uniform float meltIntensity;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying float vMeltFactor;
      varying vec3 vWorldPosition;
      
      // Enhanced noise for more realistic goopy behavior
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
        
        // Enhanced goopy melting effect
        float meltFactor = smoothstep(0.0, 1.0, heatLevel);
        vMeltFactor = meltFactor;
        
        // More dramatic deformation when melting
        if (meltIntensity > 0.0) {
          // Gravity-based dripping - much more pronounced
          float gravity = max(0.0, -pos.y + 0.3) * meltFactor * meltIntensity;
          pos.y -= gravity * 1.5;
          
          // Goopy stretching with noise
          float goop = fbm(pos * 3.0 + time * 0.8) * meltFactor * meltIntensity;
          pos.y -= abs(goop) * 0.8;
          
          // Viscous bulging
          float bulge = fbm(pos * 2.0 + time * 0.5) * meltFactor;
          pos += normal * bulge * 0.4;
          
          // Surface tension effects
          float tension = sin(pos.x * 8.0 + time * 2.0) * sin(pos.z * 6.0 + time * 1.5);
          pos += normal * tension * meltFactor * 0.2;
          
          // Extreme deformation at high heat
          if (meltFactor > 0.7) {
            float extreme = fbm(pos * 4.0 + time * 1.2) * (meltFactor - 0.7) * 3.0;
            pos.y -= abs(extreme) * 0.6;
          }
        }
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float heatLevel;
      uniform vec3 baseColor;
      uniform vec3 hotColor;
      uniform vec3 glowColor;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying float vMeltFactor;
      varying vec3 vWorldPosition;
      
      // Film grain noise
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      
      float filmGrain(vec2 uv, float time) {
        return hash(uv + time * 0.1) * 0.3 - 0.15;
      }
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        
        // High contrast heat-based color mixing
        vec3 color = mix(baseColor, hotColor, smoothstep(0.2, 0.8, heatLevel));
        
        // Extreme glow when fully molten
        if (heatLevel > 0.6) {
          float extremeGlow = (heatLevel - 0.6) * 2.5;
          color = mix(color, glowColor, extremeGlow * 0.8);
        }
        
        // Enhanced metallic reflection with contrast
        float metallic = mix(0.95, 0.2, heatLevel); // Less metallic when hot
        float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 1.5);
        vec3 reflection = mix(vec3(0.1), vec3(1.0), fresnel * metallic);
        color = mix(color, reflection, 0.4);
        
        // Heat shimmer and distortion
        if (heatLevel > 0.3) {
          float shimmer = sin(vPosition.x * 25.0 + time * 8.0) * 
                         sin(vPosition.y * 20.0 + time * 6.0) * 
                         sin(vPosition.z * 15.0 + time * 4.0) * 
                         heatLevel * 0.3;
          color += shimmer * glowColor;
        }
        
        // Film grain for realism
        float grain = filmGrain(vUv * 100.0, time);
        color += grain * 0.8;
        
        // High contrast enhancement
        color = pow(color, vec3(1.3)); // Increase contrast
        color = mix(vec3(0.0), color, 1.2); // Enhance blacks
        
        // Saturation boost for molten areas
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(luminance), color, 1.4);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `
  })
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    
    // Update material uniforms
    meltMaterial.uniforms.time.value = time
    
    // Heat level animation - faster response
    const targetHeat = isHovered ? 1.0 : 0.0
    const currentHeat = meltMaterial.uniforms.heatLevel.value
    meltMaterial.uniforms.heatLevel.value = THREE.MathUtils.lerp(currentHeat, targetHeat, 0.08)
    
    // Melt intensity follows heat level with slight delay
    const targetMelt = isHovered ? 1.0 : 0.0
    const currentMelt = meltMaterial.uniforms.meltIntensity.value
    meltMaterial.uniforms.meltIntensity.value = THREE.MathUtils.lerp(currentMelt, targetMelt, 0.04)
    
    // Gentle floating
    groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.1
    
    // Rotation slows down when melting (more viscous)
    const rotationSpeed = isHovered ? 0.1 : 0.5
    groupRef.current.rotation.y = time * rotationSpeed
    
    // No longer using heat glow effect
  })

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group 
        ref={groupRef} 
        position={position}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        onClick={onClick}
      >
        {/* Main melting orb */}
        <Sphere ref={mainOrbRef} args={[size, 64, 64]}>
          <primitive object={meltMaterial} />
        </Sphere>
        
        {/* Enhanced molten drips effect */}
        {isHovered && (
          <>
            <Sphere args={[size * 0.18, 16, 16]} position={[0.4, -size * 1.3, 0]}>
              <meshStandardMaterial 
                color="#aa1100" 
                emissive="#ff3300"
                emissiveIntensity={0.6}
                metalness={0.9}
                roughness={0.1}
              />
            </Sphere>
            <Sphere args={[size * 0.12, 16, 16]} position={[-0.3, -size * 1.5, 0.2]}>
              <meshStandardMaterial 
                color="#aa1100" 
                emissive="#ff3300"
                emissiveIntensity={0.6}
                metalness={0.9}
                roughness={0.1}
              />
            </Sphere>
            <Sphere args={[size * 0.08, 16, 16]} position={[0.1, -size * 1.7, -0.1]}>
              <meshStandardMaterial 
                color="#aa1100" 
                emissive="#ff3300"
                emissiveIntensity={0.6}
                metalness={0.9}
                roughness={0.1}
              />
            </Sphere>
          </>
        )}
      </group>
    </Float>
  )
}
