'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface LiquidMorphTorusProps {
  position: [number, number, number]
  color: string
  hoverColor: string
  onClick: () => void
  isHovered: boolean
  onHover: (hovered: boolean) => void
  size?: number
}

export function LiquidMorphTorus({ 
  position, 
  color,
  hoverColor,
  onClick, 
  isHovered, 
  onHover,
  size = 1
}: LiquidMorphTorusProps) {
  const groupRef = useRef<THREE.Group>(null)
  const tetraRef = useRef<THREE.Mesh>(null)
  
  // Contrasty film grain liquid shader - no shine, strong blacks
  const liquidMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      flowIntensity: { value: 0.8 }, // Always flowing
      baseColor: { value: new THREE.Color(color) },
      liquidColor: { value: new THREE.Color(hoverColor) },
    },
    vertexShader: `
      uniform float time;
      uniform float flowIntensity;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      
      void main() {
        vNormal = normal;
        vPosition = position;
        vUv = uv;
        
        vec3 pos = position;
        
        // DRAMATIC liquid flowing and morphing
        float wave1 = sin(pos.x * 3.0 + time * 4.0) * 0.6;
        float wave2 = sin(pos.y * 2.5 + time * 3.0) * 0.5;
        float wave3 = sin(pos.z * 4.0 + time * 5.0) * 0.7;
        
        // Liquid bulging and contracting
        pos += normal * (wave1 + wave2 + wave3) * flowIntensity * 0.4;
        
        // Liquid dripping effect
        float drip = max(0.0, -pos.y + 0.2) * sin(time * 2.0 + pos.x * 5.0);
        pos.y -= drip * 0.5;
        
        // Viscous stretching
        float stretch = sin(time * 1.5 + pos.y * 8.0) * 0.3;
        pos += normal * stretch;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 baseColor;
      uniform vec3 liquidColor;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      
      // Heavy film grain function
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      
      float filmGrain(vec2 uv, float time) {
        return hash(uv * 280.0 + time * 0.1) * 1.0 - 0.5;
      }
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vPosition);
        
        // Strong saturated liquid base - no shine
        vec3 color = mix(baseColor * 1.6, liquidColor * 1.4, 0.9);
        
        // NO reflection - just edge darkening for liquid definition
        float edge = dot(normal, viewDir);
        color = mix(vec3(0.0), color, edge * 0.6 + 0.4);
        
        // Strong liquid ripple patterns
        float ripple = sin(vPosition.x * 25.0 + time * 8.0) * 
                      sin(vPosition.z * 20.0 + time * 6.0) * 0.6;
        color += ripple * liquidColor * 0.7;
        
        // Heavy film grain
        float grain = filmGrain(vUv, time);
        color += grain * 1.4;
        
        // Strong contrast and saturation
        color = pow(color, vec3(0.65)); // Boost mids
        color = mix(vec3(0.0), color, 2.4); // Strongest contrast
        color = clamp(color, 0.0, 1.0);
        
        // Boost saturation heavily
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(luminance), color, 2.8);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    transparent: false
  })
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    
    // Update material uniforms
    liquidMaterial.uniforms.time.value = time
    
    // Always animated chaotic rotation
    groupRef.current.rotation.y = time * 1.2
    groupRef.current.rotation.x = Math.sin(time * 2.5) * 0.3
    groupRef.current.rotation.z = Math.cos(time * 1.8) * 0.2
    
    // Constant floating motion
    groupRef.current.position.y = position[1] + 
      Math.sin(time * 2.5) * 0.15 +
      Math.sin(time * 4.2) * 0.08
    
    // Constant scale pulsing
    const scale = 1 + Math.sin(time * 5.0) * 0.1 + 
                     Math.sin(time * 7.0) * 0.05
    groupRef.current.scale.setScalar(scale)
  })

  return (
    <Float speed={3.0} rotationIntensity={0.6} floatIntensity={0.8}>
      <group 
        ref={groupRef} 
        position={position}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        onClick={onClick}
      >
        <mesh ref={tetraRef}>
          <tetrahedronGeometry args={[size * 0.6, 5]} />
          <primitive object={liquidMaterial} />
        </mesh>
      </group>
    </Float>
  )
} 