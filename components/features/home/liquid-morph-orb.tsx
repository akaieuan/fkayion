'use client'

import { useRef, useMemo, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere } from '@react-three/drei'
import * as THREE from 'three'

interface MousePos {
  x: number
  y: number
}

interface LiquidMorphOrbProps {
  position: [number, number, number]
  colors: { primary: string, secondary: string, rim: string }
  onClick: () => void
  isHovered: boolean
  onHover: (hovered: boolean) => void
  size?: number
  mousePos?: MousePos
  /** Softer shaders + less motion — avoids grain moiré on small screens */
  narrowViewport?: boolean
}

export function LiquidMorphOrb({ 
  position, 
  colors, 
  onClick, 
  isHovered, 
  onHover,
  size = 1,
  mousePos = { x: 0, y: 0 },
  narrowViewport = false,
}: LiquidMorphOrbProps) {
  const groupRef = useRef<THREE.Group>(null)
  const mainOrbRef = useRef<THREE.Mesh>(null)
  const liquidRef = useRef<THREE.Mesh>(null)
  
  const liquidMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      flowIntensity: { value: 0.6 }, // Always flowing at base level
      viscosity: { value: 0.5 }, // Always viscous
      mousePos: { value: new THREE.Vector2(0, 0) },
      baseColor: { value: new THREE.Color('#226644') }, // Visible teal base
      liquidColor: { value: new THREE.Color('#44ddaa') },
      foamColor: { value: new THREE.Color('#ffffff') },
      blackColor: { value: new THREE.Color('#000000') },
      comfort: { value: 1.0 },
    },
    vertexShader: `
      uniform float time;
      uniform float flowIntensity;
      uniform float viscosity;
      uniform vec2 mousePos;
      uniform float comfort;
      
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
        
        float t = time * mix(0.48, 1.0, comfort);
        
        vec3 pos = position;
        
        // Liquid deformation - ALWAYS ACTIVE
        // Wave-like motion
        float wave1 = sin(pos.x * 8.0 + t * 4.0) * flowIntensity * 0.3;
        float wave2 = sin(pos.z * 6.0 + t * 3.5) * flowIntensity * 0.25;
        float wave3 = sin(pos.y * 10.0 + t * 5.0) * flowIntensity * 0.15;
        
        pos += normal * (wave1 + wave2 + wave3);
        
        // Liquid bulging and contracting
        float bulge = fbm(pos * 2.5 + t * 2.0) * flowIntensity;
        pos += normal * bulge * 0.45;
        
        // Viscous stretching
        float stretch = sin(t * 3.0 + pos.y * 5.0) * viscosity * 0.6;
        pos.y += stretch * flowIntensity;
        
        // Subtle chaos
        float chaos = fbm(pos * 4.0 + t * 3.0) * flowIntensity * 0.2;
        pos += normal * chaos * 0.25;
        
        // Cursor attraction - only when hovered (mousePos will be zeroed when not hovered)
        float mouseMagnitude = length(mousePos);
        if (mouseMagnitude > 0.01) {
          float cursorDist = distance(pos.xy, mousePos * 2.5);
          float cursorInfluence = smoothstep(3.0, 0.0, cursorDist) * 0.5;
          vec2 toMouse = normalize(mousePos * 2.5 - pos.xy + 0.001);
          pos.xy += toMouse * cursorInfluence;
          
          // Bulge near cursor
          float bulgeNearCursor = smoothstep(2.2, 0.0, cursorDist) * 0.25;
          pos += normal * bulgeNearCursor;
          
          // Ripple from cursor
          float ripple = sin(cursorDist * 4.0 - t * 3.0) * smoothstep(3.0, 0.0, cursorDist) * 0.1;
          pos += normal * ripple;
        }
        
        vFlow = flowIntensity;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float flowIntensity;
      uniform float comfort;
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
        return hash(uv + time * 0.1) * 0.5 - 0.25;
      }
      
              void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(cameraPosition - vWorldPosition);
          float t = time * mix(0.48, 1.0, comfort);
          float rx = mix(10.0, 30.0, comfort);
          float rz = mix(9.0, 25.0, comfort);
          float rtx = mix(2.8, 8.0, comfort);
          float rtz = mix(2.2, 6.0, comfort);
          
          // High contrast liquid color mixing with better base visibility
          vec3 color = mix(baseColor, liquidColor, smoothstep(0.3, 0.9, vFlow));
          
          // Always visible base fresnel effect
          float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 1.8);
          color = mix(color, foamColor, fresnel * (0.3 + vFlow * 0.9)); // Base visibility + flow enhancement
          
          // Enhanced liquid surface ripples
          float ripple = sin(vPosition.x * rx + t * rtx) * 
                        sin(vPosition.z * rz + t * rtz) * 
                        vFlow * 0.4;
          color += ripple * foamColor;
          
          // Enhanced subsurface scattering effect
          float scatter = max(0.0, dot(normal, vec3(0.0, 1.0, 0.0))) * vFlow * 0.8;
          color = mix(color, liquidColor * 1.8, scatter);
          
          // Deep shadows in crevices (only when flowing)
          float cavity = 1.0 - max(0.0, dot(normal, vec3(0.0, 1.0, 0.0)));
          color = mix(color, blackColor, cavity * vFlow * 0.3);
          
          // Film grain for realism (low freq + weak on narrow viewports — avoids shimmer)
          float grainUv = mix(22.0, 90.0, comfort);
          float grain = filmGrain(vUv * grainUv, t);
          color += grain * mix(0.04, 0.7, comfort);
          
          // High contrast enhancement with better base visibility
          color = pow(color, vec3(1.3)); // Slightly less aggressive contrast
          color = mix(vec3(0.1), color, 1.3); // Don't go pure black, maintain base visibility
          
          // Saturation boost for liquid areas
          float luminance = dot(color, vec3(0.299, 0.587, 0.114));
          color = mix(vec3(luminance), color, 1.6);
          
          // Enhanced transparency for liquid effect
          float alpha = 0.8 + vFlow * 0.2;
          
          gl_FragColor = vec4(color, alpha);
        }
    `,
    transparent: true
  }), [])

  useLayoutEffect(() => {
    liquidMaterial.uniforms.comfort.value = narrowViewport ? 0 : 1
  }, [narrowViewport, liquidMaterial])

  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    const motion = narrowViewport ? 0.52 : 1
    
    // Update material uniforms
    liquidMaterial.uniforms.time.value = time
    liquidMaterial.uniforms.mousePos.value.set(mousePos.x, mousePos.y)
    
    // Flow intensity - always animated, increases more when hovered
    const baseFlow = 0.6
    const targetFlow = isHovered ? 1.0 : baseFlow
    const currentFlow = liquidMaterial.uniforms.flowIntensity.value
    liquidMaterial.uniforms.flowIntensity.value = THREE.MathUtils.lerp(currentFlow, targetFlow, 0.1)
    
    // Viscosity - always active
    const baseViscosity = 0.5
    const targetViscosity = isHovered ? 1.0 : baseViscosity
    const currentViscosity = liquidMaterial.uniforms.viscosity.value
    liquidMaterial.uniforms.viscosity.value = THREE.MathUtils.lerp(currentViscosity, targetViscosity, 0.06)
    
    // Always animate liquid-like floating motion
    groupRef.current.position.y = position[1] + 
      Math.sin(time * 2.0 * motion) * 0.15 +
      Math.sin(time * 3.2 * motion) * 0.06 +
      Math.sin(time * 1.8 * motion) * 0.04
    
    // Always rotating
    groupRef.current.rotation.y = time * 0.5 * motion
    groupRef.current.rotation.x = Math.sin(time * 1.8 * motion) * 0.2
    groupRef.current.rotation.z = Math.cos(time * 1.2 * motion) * 0.1
    
    // Always pulsing like a liquid blob
    const scale = 1 + Math.sin(time * 4.0 * motion) * 0.05 + 
                     Math.sin(time * 6.0 * motion) * 0.03
    groupRef.current.scale.setScalar(scale)
  })

  return (
    <Float speed={narrowViewport ? 0.75 : 2} rotationIntensity={narrowViewport ? 0.22 : 0.4} floatIntensity={narrowViewport ? 0.35 : 0.6}>
      <group 
        ref={groupRef} 
        position={position}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        onClick={onClick}
      >
        {/* Main liquid orb */}
        <Sphere ref={mainOrbRef} args={[size, 48, 48]}>
          <primitive object={liquidMaterial} />
        </Sphere>
        
        {/* Transmission droplets are heavy on mobile GPUs — omit in narrow layout */}
        {!narrowViewport && (
          <>
            <Sphere args={[size * 0.12, 16, 16]} position={[size * 0.8, -size * 0.3, 0]}>
              <meshPhysicalMaterial 
                color="#225544"
                transmission={0.9}
                thickness={0.08}
                roughness={0.05}
                metalness={0.0}
                ior={1.33}
                transparent
                opacity={0.85}
              />
            </Sphere>
            <Sphere args={[size * 0.09, 16, 16]} position={[-size * 0.6, size * 0.4, size * 0.3]}>
              <meshPhysicalMaterial 
                color="#225544"
                transmission={0.9}
                thickness={0.08}
                roughness={0.05}
                metalness={0.0}
                ior={1.33}
                transparent
                opacity={0.85}
              />
            </Sphere>
            <Sphere args={[size * 0.06, 16, 16]} position={[size * 0.25, size * 0.7, -size * 0.4]}>
              <meshPhysicalMaterial 
                color="#225544"
                transmission={0.9}
                thickness={0.08}
                roughness={0.05}
                metalness={0.0}
                ior={1.33}
                transparent
                opacity={0.85}
              />
            </Sphere>
          </>
        )}
      </group>
    </Float>
  )
} 