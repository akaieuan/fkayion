'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

interface MeltingCubeOrbProps {
  position: [number, number, number]
  color: string
  hoverColor: string
  onClick: () => void
  isHovered: boolean
  onHover: (hovered: boolean) => void
  size?: number
  isDotMatrix?: boolean
}

export function MeltingCubeOrb({ 
  position, 
  color,
  hoverColor,
  onClick, 
  isHovered, 
  onHover,
  size = 1,
  isDotMatrix = false
}: MeltingCubeOrbProps) {
  const groupRef = useRef<THREE.Group>(null)
  const mainCubeRef = useRef<THREE.Mesh>(null)
  const dropsRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)
  
  // Dramatic melting shader with extreme contrast and grain
  const meltingMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      meltIntensity: { value: 0 },
      baseColor: { value: new THREE.Color(color) },
      meltColor: { value: new THREE.Color(hoverColor) },
      foamColor: { value: new THREE.Color('#ffffff') },
      blackColor: { value: new THREE.Color('#000000') },
    },
    vertexShader: `
      uniform float time;
      uniform float meltIntensity;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying float vMelt;
      varying vec3 vWorldPosition;
      
      // Noise for organic melting
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
        for(int i = 0; i < 5; i++) {
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
        
        // Extreme melting deformation
        if (meltIntensity > 0.0) {
          // Downward dripping motion
          float drip = pos.y * 3.0 * meltIntensity;
          pos.y -= drip * 0.5;
          
          // Sagging effect with noise
          float sag = fbm(pos * 4.0 + time * 1.5) * meltIntensity;
          pos.y -= sag * 0.8 * max(0.0, pos.y + 0.5);
          
          // Horizontal spreading at the bottom
          float spread = meltIntensity * (1.0 - (pos.y + 1.0) * 0.5);
          pos.x *= 1.0 + spread * 0.7;
          pos.z *= 1.0 + spread * 0.7;
          
          // Dripping strands
          float strands = sin(pos.x * 15.0 + time * 3.0) * sin(pos.z * 15.0 + time * 2.5);
          pos.y -= strands * meltIntensity * 0.4 * max(0.0, -pos.y);
          
          // Extreme melting at high intensity
          if (meltIntensity > 0.6) {
            float extremeMelt = (meltIntensity - 0.6) * 2.5;
            float collapse = fbm(pos * 8.0 + time * 4.0) * extremeMelt;
            pos.y -= collapse * 0.6;
            pos += normal * collapse * 0.3;
          }
        }
        
        vMelt = meltIntensity;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float meltIntensity;
      uniform vec3 baseColor;
      uniform vec3 meltColor;
      uniform vec3 foamColor;
      uniform vec3 blackColor;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying float vMelt;
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
        
        // Melting gradient from top to bottom
        float meltGradient = 1.0 - (vPosition.y + 1.0) * 0.5;
        vec3 color = mix(baseColor, meltColor, smoothstep(0.2, 0.9, vMelt * meltGradient));
        
        // Extreme fresnel for molten edges
        float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 1.6);
        color = mix(color, foamColor, fresnel * (0.3 + vMelt * 1.4));
        
        // Dripping streaks
        float streaks = sin(vPosition.x * 30.0 + vPosition.y * 10.0 + time * 4.0) * 
                       sin(vPosition.z * 25.0 + vPosition.y * 8.0 + time * 3.5);
        color += step(0.7, streaks) * meltColor * vMelt * 1.5;
        
        // Hot molten glow
        float heat = pow(meltGradient * vMelt, 1.5);
        color = mix(color, meltColor * 3.0, heat);
        
        // Deep shadows in melted crevices
        float crevices = 1.0 - smoothstep(0.0, 1.0, normal.y);
        color = mix(color, blackColor, crevices * vMelt * 0.5);
        
        // Most aggressive film grain
        float grain = filmGrain(vUv * 165.0, time);
        color += grain * 1.65;
        
        // Extreme contrast enhancement
        color = pow(color, vec3(2.1));
        color = mix(vec3(0.04), color, 1.85);
        
        // Maximum saturation boost
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(luminance), color, 2.6);
        
        // Melting transparency
        float alpha = 0.78 + vMelt * 0.22;
        
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
    meltingMaterial.uniforms.time.value = time
    
    // Melt intensity animation - viscous response
    const targetMelt = isHovered ? 1.0 : 0.0
    const currentMelt = meltingMaterial.uniforms.meltIntensity.value
    meltingMaterial.uniforms.meltIntensity.value = THREE.MathUtils.lerp(currentMelt, targetMelt, 0.08)
    
    // Slow sagging motion
    const meltLevel = currentMelt
    groupRef.current.position.y = position[1] + 
      Math.sin(time * 1.5) * 0.1 * (1 - meltLevel * 0.5) -
      meltLevel * 0.2 // Sag down when melting
    
    // Slow, droopy rotation
    groupRef.current.rotation.y = time * 0.4 * (1 - meltLevel * 0.5)
    groupRef.current.rotation.x = Math.sin(time * 1.2) * 0.2 * (1 - meltLevel * 0.7)
    
    // Melting scale - wider at bottom
    const scaleBottom = 1 + meltLevel * 0.3
    const scaleTop = 1 - meltLevel * 0.1
    groupRef.current.scale.set(
      THREE.MathUtils.lerp(scaleTop, scaleBottom, 0.5),
      1 - meltLevel * 0.15,
      THREE.MathUtils.lerp(scaleTop, scaleBottom, 0.5)
    )
    
    // Animate dripping drops
    if (dropsRef.current && meltLevel > 0) {
      dropsRef.current.children.forEach((drop, i) => {
        const dropSpeed = (1 + i * 0.3) * meltLevel
        drop.position.y -= dropSpeed * 0.02
        if (drop.position.y < -2) {
          drop.position.y = 0
        }
        drop.scale.setScalar(0.5 + Math.sin(time * 5 + i) * 0.2)
      })
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.25}>
      <group 
        ref={groupRef} 
        position={position}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        onClick={onClick}
      >
        {isDotMatrix ? (
          /* Dot matrix mode - melting dripping particles */
          <>
            <points position={[0, -Math.sin(timeRef.current * 2) * 0.1, 0]}>
              <octahedronGeometry args={[size * 0.8]} />
              <pointsMaterial 
                color={isHovered ? hoverColor : color}
                size={isHovered ? 0.055 : 0.03}
                sizeAttenuation={true}
                transparent
                opacity={isHovered ? 0.8 : 0.4}
              />
            </points>
            <points position={[0, -Math.abs(Math.sin(timeRef.current * 1.5)) * 0.4, 0]}>
              <octahedronGeometry args={[size * 0.6]} />
              <pointsMaterial 
                color={isHovered ? hoverColor : color}
                size={isHovered ? 0.04 : 0.025}
                sizeAttenuation={true}
                transparent
                opacity={isHovered ? 0.6 : 0.3}
              />
            </points>
            <points position={[Math.sin(timeRef.current * 2.5) * 0.1, -Math.abs(Math.cos(timeRef.current * 1.8)) * 0.6, 0]}>
              <octahedronGeometry args={[size * 0.4]} />
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
          /* Main melting cube */
          <RoundedBox ref={mainCubeRef} args={[size, size, size]} radius={0.12} smoothness={4}>
            <primitive object={meltingMaterial} />
          </RoundedBox>
        )}
        
        {/* Dripping drops when melting */}
        <group ref={dropsRef}>
          {isHovered && Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2
            const radius = size * 0.3
            return (
              <RoundedBox 
                key={i}
                args={[size * 0.06, size * 0.12, size * 0.06]} 
                radius={0.03}
                position={[
                  Math.cos(angle) * radius,
                  -size * 0.5,
                  Math.sin(angle) * radius
                ]}
              >
                <meshStandardMaterial 
                  color={hoverColor}
                  emissive={hoverColor}
                  emissiveIntensity={0.8}
                  metalness={0.0}
                  roughness={1.0}
                  transparent
                  opacity={0.9}
                />
              </RoundedBox>
            )
          })}
        </group>
      </group>
    </Float>
  )
} 