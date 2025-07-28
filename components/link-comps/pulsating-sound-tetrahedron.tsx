'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere } from '@react-three/drei'
import * as THREE from 'three'

interface PulsatingSoundTetrahedronProps {
  color: string
  hoverColor: string
  size?: number
}

export function PulsatingSoundTetrahedron({ 
  color, 
  hoverColor, 
  size = 1 
}: PulsatingSoundTetrahedronProps) {
  const groupRef = useRef<THREE.Group>(null)
  const tetraRef = useRef<THREE.Mesh>(null)

  // Enhanced liquid morphing shader (adapted from orb-3.tsx) - controlled for Spotify
  const liquidMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      flowIntensity: { value: 0.6 }, // Reduced from 1.0 - more controlled
      viscosity: { value: 0.4 }, // Reduced from 0.8 - less viscous
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
      
      // Enhanced multi-octave noise for dramatic liquid flow (from orb-3.tsx)
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
        
        // Gentle liquid deformation (controlled for Spotify like main page orbs)
        // Gentle wave-like motion
        float wave1 = sin(pos.x * 6.0 + time * 2.0) * flowIntensity * 0.2; // Reduced from 8.0, 4.0, 0.4
        float wave2 = sin(pos.z * 4.0 + time * 1.5) * flowIntensity * 0.15; // Reduced from 6.0, 3.5, 0.3
        float wave3 = sin(pos.y * 5.0 + time * 2.5) * flowIntensity * 0.1; // Reduced from 10.0, 5.0, 0.2
        
        pos += normal * (wave1 + wave2 + wave3);
        
        // Gentle liquid bulging and contracting
        float bulge = fbm(pos * 1.5 + time * 1.0) * flowIntensity;
        pos += normal * bulge * 0.3; // Reduced from 2.5, 2.0, 0.6
        
        // Gentle viscous stretching
        float stretch = sin(time * 1.5 + pos.y * 3.0) * viscosity * 0.4; // Reduced from 3.0, 5.0, 0.8
        pos.y += stretch * flowIntensity;
        
        // Subtle liquid behavior (always active but controlled)
        float chaos = fbm(pos * 2.0 + time * 1.5) * flowIntensity * 1.0; // Reduced chaos
        pos += normal * chaos * 0.2; // Reduced from 4.0, 3.0, 2.5, 0.4
        
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
      
      // Heavy film grain function for gritty texture
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      
      float filmGrain(vec2 uv, float time) {
        // Multi-layer grain for more texture
        float grain1 = hash(uv * 300.0 + time * 0.1) * 2.0 - 1.0;
        float grain2 = hash(uv * 150.0 + time * 0.15) * 2.0 - 1.0;
        float grain3 = hash(uv * 75.0 + time * 0.08) * 2.0 - 1.0;
        return (grain1 + grain2 * 0.5 + grain3 * 0.25) * 0.4;
      }
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        
        // High contrast liquid color mixing with better base visibility
        vec3 color = mix(baseColor, liquidColor, smoothstep(0.3, 0.9, vFlow));
        
        // Always visible base fresnel effect
        float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 1.8);
        color = mix(color, foamColor, fresnel * (0.3 + vFlow * 0.9));
        
        // Controlled liquid surface ripples (like main page orbs)
        float ripple = sin(vPosition.x * 20.0 + time * 4.0) * 
                      sin(vPosition.z * 18.0 + time * 3.0) * 
                      vFlow * 0.2; // Reduced from 30.0, 25.0, 8.0, 6.0, 0.4
        color += ripple * foamColor;
        
        // Gentle subsurface scattering effect
        float scatter = max(0.0, dot(normal, vec3(0.0, 1.0, 0.0))) * vFlow * 0.4; // Reduced from 0.8
        color = mix(color, liquidColor * 1.3, scatter); // Reduced from 1.8
        
        // Subtle shadows in crevices
        float cavity = 1.0 - max(0.0, dot(normal, vec3(0.0, 1.0, 0.0)));
        color = mix(color, blackColor, cavity * vFlow * 0.15); // Reduced from 0.3
        
        // Heavy film grain for gritty texture
        float grain = filmGrain(vUv * 80.0, time); // Increased from 60.0
        color += grain * 1.2; // Increased from 0.4 for heavy grain
        
        // Enhanced film-like contrast
        color = pow(color, vec3(0.8)); // More film-like gamma
        color = mix(vec3(0.05), color, 1.4); // Higher contrast with slight base
        
        // Heavy saturation for film vibes
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(luminance), color, 2.0); // Increased from 1.3 for film saturation
        
        // Film grain texture overlay
        float extraGrain = filmGrain(vUv * 200.0, time * 1.5);
        color = mix(color, color + extraGrain * 0.3, 0.8);
        
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
    
    // Update material uniforms
    liquidMaterial.uniforms.time.value = time
    
    // Gentle controlled flow for Spotify (like main page orbs)
    const flowLevel = 0.6 // Reduce from 1.0 to be less intense
    
    // Gentle floating motion like main page orbs
    groupRef.current.position.y = Math.sin(time * 0.8) * 0.1
    
    // Much slower, controlled rotation like main page orbs
    groupRef.current.rotation.y = time * 0.3 // Much slower rotation
    groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1 // Gentle oscillation
    groupRef.current.rotation.z = Math.cos(time * 0.4) * 0.05 // Very subtle
    
    // Gentle scale pulsing like main page orbs
    const scale = 1 + Math.sin(time * 1.2) * 0.05 // Much more subtle
    groupRef.current.scale.setScalar(scale)
  })

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        <mesh ref={tetraRef}>
          <tetrahedronGeometry args={[size * 0.6, 5]} />
          <primitive object={liquidMaterial} />
        </mesh>
        
        {/* Subtle liquid droplets (controlled for Spotify like main page orbs) */}
        <Sphere args={[size * 0.08, 16, 16]} position={[size * 0.6, -size * 0.3, 0]}>
          <meshPhysicalMaterial 
            color={hoverColor}
            transmission={0.8}
            thickness={0.05}
            roughness={0.1}
            metalness={0.0}
            ior={1.33}
            transparent
            opacity={0.6}
          />
        </Sphere>
        <Sphere args={[size * 0.06, 16, 16]} position={[-size * 0.4, size * 0.4, size * 0.3]}>
          <meshPhysicalMaterial 
            color={hoverColor}
            transmission={0.8}
            thickness={0.05}
            roughness={0.1}
            metalness={0.0}
            ior={1.33}
            transparent
            opacity={0.6}
          />
        </Sphere>
        <Sphere args={[size * 0.05, 16, 16]} position={[size * 0.2, size * 0.6, -size * 0.4]}>
          <meshPhysicalMaterial 
            color={hoverColor}
            transmission={0.8}
            thickness={0.05}
            roughness={0.1}
            metalness={0.0}
            ior={1.33}
            transparent
            opacity={0.6}
          />
        </Sphere>
      </group>
    </Float>
  )
} 