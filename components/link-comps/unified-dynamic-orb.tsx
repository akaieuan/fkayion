'use client'

import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useRef, useState, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { MetallicMeltingTorus } from './metallic-melting-torus'
import { CrystallineShatterTorus } from './crystalline-shatter-torus'
import { LiquidMorphTorus } from './liquid-morph-torus'
import { PulsatingSoundTetrahedron } from './pulsating-sound-tetrahedron'

interface UnifiedDynamicOrbProps {
  activeLink: string | null
  color: string
  hoverColor: string
  size?: number
  positionOffset?: [number, number, number]
}

interface MousePos {
  x: number
  y: number
}

// Hook to detect mobile
function useIsMobile() {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

// Default orb - metallic melting torusKnot style like Ubik Studio
function DefaultTorus({ size = 1, mousePos = { x: 0, y: 0 } }: { size?: number; mousePos?: MousePos }) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const dropletsRef = useRef<THREE.Group>(null)
  const goopStringsRef = useRef<THREE.Group>(null)
  
  // Create goop string data - 4 strings that stretch toward cursor
  const goopStrings = Array.from({ length: 4 }, (_, i) => ({
    baseAngle: (i / 4) * Math.PI * 2,
    offset: i * 0.25
  }))
  
  // Mercury melting shader with subtle cursor reactivity
  const mercuryMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      splitLevel: { value: 0.6 },
      mousePos: { value: new THREE.Vector2(mousePos.x, mousePos.y) },
      baseColor: { value: new THREE.Color('#6655cc') },
      mercuryColor: { value: new THREE.Color('#aa88ff') },
    },
    vertexShader: `
      uniform float time;
      uniform float splitLevel;
      uniform vec2 mousePos;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      
      void main() {
        vNormal = normal;
        vPosition = position;
        vUv = uv;
        
        vec3 pos = position;
        
        // Mercury melting and dripping
        float meltFactor = sin(time * 1.0) * 0.5 + 0.5;
        
        // Dripping downward
        if (pos.y < 0.0) {
          pos.y -= meltFactor * 0.6;
        }
        
        // Liquid mercury stretching
        float stretch = sin(pos.x * 4.0 + time * 2.0) * sin(pos.z * 4.0 + time * 1.5);
        pos.y -= abs(stretch) * meltFactor * 0.5;
        
        // Mercury blob deformation
        float blob = sin(pos.x * 6.0 + time * 3.0) * sin(pos.y * 5.0 + time * 2.0) * sin(pos.z * 7.0 + time * 2.5);
        pos += normal * blob * 0.25;
        
        // Dramatic cursor attraction - strong pull toward mouse position
        float cursorDist = distance(pos.xy, mousePos * 2.5);
        float cursorInfluence = smoothstep(3.0, 0.0, cursorDist) * 0.7;
        vec2 toMouse = normalize(mousePos * 2.5 - pos.xy);
        pos.xy += toMouse * cursorInfluence;
        
        // Strong bulge near cursor for visual feedback
        float bulgeNearCursor = smoothstep(2.2, 0.0, cursorDist) * 0.35;
        pos += normal * bulgeNearCursor;
        
        // Extra wave ripple emanating from cursor
        float ripple = sin(cursorDist * 4.0 - time * 3.0) * smoothstep(3.0, 0.0, cursorDist) * 0.15;
        pos += normal * ripple;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 baseColor;
      uniform vec3 mercuryColor;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      
      // Film grain function
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      
      float filmGrain(vec2 uv, float time) {
        return hash(uv * 300.0 + time * 0.1) * 0.8 - 0.4;
      }
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vPosition);
        
        // Saturated color base
        vec3 color = mix(baseColor * 1.5, mercuryColor * 1.3, 0.7);
        
        // Edge darkening for definition
        float edge = dot(normal, viewDir);
        color = mix(vec3(0.0), color, edge * 0.8 + 0.2);
        
        // Animated patterns
        float pattern = sin(vPosition.x * 15.0 + time * 5.0) * 
                       sin(vPosition.y * 12.0 + time * 4.0) * 0.4;
        color += pattern * mercuryColor * 0.6;
        
        // Film grain
        float grain = filmGrain(vUv, time);
        color += grain * 1.2;
        
        // Contrast and saturation
        color = pow(color, vec3(0.7));
        color = mix(vec3(0.0), color, 2.0);
        color = clamp(color, 0.0, 1.0);
        
        // Boost saturation
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(luminance), color, 2.5);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `
  })
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    
    // Update material uniforms
    mercuryMaterial.uniforms.time.value = time
    mercuryMaterial.uniforms.mousePos.value.set(mousePos.x, mousePos.y)
    
    // Smooth rotation
    groupRef.current.rotation.y = time * 0.8
    groupRef.current.rotation.x = Math.sin(time * 1.2) * 0.2
    groupRef.current.rotation.z = Math.cos(time * 0.9) * 0.1
    
    // Floating motion
    groupRef.current.position.y = Math.sin(time * 2.0) * 0.1
    
    // Animate droplets
    if (dropletsRef.current) {
      dropletsRef.current.children.forEach((droplet, i) => {
        const mesh = droplet as THREE.Mesh
        const angle = (i / 5) * Math.PI * 2 + time * 2
        const distance = 0.6 + Math.sin(time * 3 + i) * 0.2
        
        mesh.position.x = Math.cos(angle) * distance
        mesh.position.y = Math.sin(time * 4 + i) * 0.4
        mesh.position.z = Math.sin(angle) * distance
        
        mesh.rotation.y = time * (2 + i * 0.3)
      })
    }
    
    // Animate goop strings - they stretch toward cursor
    if (goopStringsRef.current) {
      const cursorMagnitude = Math.sqrt(mousePos.x * mousePos.x + mousePos.y * mousePos.y)
      const stretchFactor = Math.min(cursorMagnitude * 2.5, 1.5) // How far strings stretch
      
      goopStringsRef.current.children.forEach((goop, i) => {
        const mesh = goop as THREE.Mesh
        const baseAngle = goopStrings[i].baseAngle + time * 0.3
        const offset = goopStrings[i].offset
        
        // Base position on the orb surface
        const baseX = Math.cos(baseAngle) * size * 0.5
        const baseY = Math.sin(baseAngle + offset) * size * 0.3
        const baseZ = Math.sin(baseAngle) * size * 0.3
        
        // Target position toward cursor
        const targetX = mousePos.x * 2.5
        const targetY = mousePos.y * 2.5
        
        // String stretches from base toward cursor
        const midX = baseX + (targetX - baseX) * stretchFactor * 0.6
        const midY = baseY + (targetY - baseY) * stretchFactor * 0.6
        const midZ = baseZ * (1 - stretchFactor * 0.3)
        
        mesh.position.set(midX, midY, midZ)
        
        // Point toward cursor
        mesh.lookAt(targetX, targetY, 0)
        mesh.rotateX(Math.PI / 2)
        
        // Scale based on stretch - longer when cursor is farther
        const length = stretchFactor * 0.8 + 0.1
        const thickness = 0.04 + Math.sin(time * 3 + i) * 0.01
        mesh.scale.set(thickness, length, thickness)
        
        // Opacity based on cursor activity
        const material = mesh.material as THREE.MeshStandardMaterial
        material.opacity = 0.5 + stretchFactor * 0.4
      })
    }
  })

  return (
    <Float speed={2.0} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[size * 0.45, size * 0.16, 140, 18, 2, 3]} />
          <primitive object={mercuryMaterial} />
        </mesh>
        
        {/* Mercury droplets */}
        <group ref={dropletsRef}>
          {Array.from({ length: 5 }).map((_, i) => (
            <mesh key={i}>
              <sphereGeometry args={[size * 0.08, 16, 16]} />
              <meshStandardMaterial 
                color="#aa88ff"
                metalness={0.0}
                roughness={1.0}
                transparent
                opacity={0.7}
              />
            </mesh>
          ))}
        </group>
        
        {/* Goop strings that stretch toward cursor */}
        <group ref={goopStringsRef}>
          {goopStrings.map((_, i) => (
            <mesh key={`goop-${i}`}>
              <cylinderGeometry args={[0.03, 0.06, 1, 8]} />
              <meshStandardMaterial 
                color="#9977ee"
                metalness={0.1}
                roughness={0.6}
                transparent
                opacity={0.6}
              />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  )
}

export function UnifiedDynamicOrb({ activeLink, color, hoverColor, size = 1.2, positionOffset = [1.5, 0, 0] }: UnifiedDynamicOrbProps) {
  const isMobile = useIsMobile()
  const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 })
  
  // Track mouse position relative to canvas for cursor reactivity
  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    // Normalize to -1 to 1 range
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    setMousePos({ x, y })
  }, [])
  
  const hashStringToVariant = (str: string | null): number => {
    if (!str) return 0
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i)
      hash |= 0
    }
    return Math.abs(hash) % 17 // small bounded variant space
  }
  const variant = hashStringToVariant(activeLink)
  
  const getControlledSize = (isResting = false) => {
    // Use the size prop directly
    const baseSize = size
    if (isResting) {
      return isMobile ? baseSize * 1.2 : baseSize
    }
    return isMobile ? baseSize * 1.1 : baseSize * 0.9
  }
  
  // Color utilities to make per-link themes more distinct
  const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
  const hexToRgb = (hex: string) => {
    let h = hex.replace('#', '')
    if (h.length === 3) {
      h = h.split('').map((c) => c + c).join('')
    }
    const num = parseInt(h, 16)
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
  }
  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (x: number) => x.toString(16).padStart(2, '0')
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0
    const l = (max + min) / 2
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }
    return { h, s, l }
  }
  const hslToRgb = (h: number, s: number, l: number) => {
    let r: number, g: number, b: number
    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }
  }
  const adjust = (hex: string, hueShiftDeg: number, satMult: number, lightMult: number) => {
    try {
      const { r, g, b } = hexToRgb(hex)
      let { h, s, l } = rgbToHsl(r, g, b)
      const shift = ((hueShiftDeg % 360) + 360) % 360
      h = ((h + shift / 360) % 1 + 1) % 1
      s = clamp01(s * satMult)
      l = clamp01(l * lightMult)
      const rgb = hslToRgb(h, s, l)
      return rgbToHex(rgb.r, rgb.g, rgb.b)
    } catch {
      return hex
    }
  }
  const getEffectiveColors = (label: string | null, base: string, hover: string) => {
    if (!label) return { base, hover }
    if (label === 'Ubik Studio' || label === 'App Ubik Studio') {
      return { base, hover }
    }
    if (label === 'Instagram') {
      // Hot pink/magenta gradient for Instagram - vibrant and bold
      return { base: adjust(base, -50, 1.6, 1.1), hover: adjust(hover, -60, 1.7, 1.05) }
    }
    if (label === 'aka.write') {
      // Bright lime/green shift - very distinct from purple SoundCloud
      return { base: adjust(base, 85, 1.5, 1.1), hover: adjust(hover, 95, 1.6, 1.05) }
    }
    if (label === 'Spotify') {
      return { base: adjust(base, -45, 1.2, 0.95), hover: adjust(hover, -55, 1.3, 0.9) }
    }
    if (label === 'SoundCloud') {
      return { base: adjust(base, 15, 1.4, 1.0), hover: adjust(hover, 22, 1.5, 0.95) }
    }
    if (label === 'Bandcamp') {
      // Electric blue/azure for Bandcamp - bold and distinct
      return { base: adjust(base, -120, 1.5, 1.05), hover: adjust(hover, -130, 1.6, 1.0) }
    }
    if (label === 'YouTube') {
      return { base: adjust(base, 180, 1.2, 0.9), hover: adjust(hover, 165, 1.35, 0.85) }
    }
    return { base: adjust(base, 8, 1.05, 1.0), hover: adjust(hover, -8, 1.05, 0.98) }
  }
  const indicatorColors = getEffectiveColors(activeLink, color, hoverColor)

  // Render the appropriate orb based on active link
  function renderActiveOrb() {
    if (!activeLink) {
      return <DefaultTorus size={getControlledSize(true)} mousePos={mousePos} />
    }

    const effective = getEffectiveColors(activeLink, color, hoverColor)
    switch (activeLink) {
      case 'Ubik Studio':
      case 'App Ubik Studio':
        return (
          <MetallicMeltingTorus
            position={[0, 0, 0]}
            color={effective.base}
            hoverColor={effective.hover}
            onClick={() => {}}
            isHovered={true}
            onHover={() => {}}
            size={getControlledSize()}
            variant={variant}
          />
        )
      case 'Instagram':
      case 'Contact':
        return (
          <LiquidMorphTorus
            position={[0, 0, 0]}
            color={effective.base}
            hoverColor={effective.hover}
            onClick={() => {}}
            isHovered={true}
            onHover={() => {}}
            size={getControlledSize()}
            variant={variant}
            baseGeometry="icosa"
            shatterMode={true}
          />
        )
      case 'aka.write':
        return (
          <LiquidMorphTorus
            position={[0, 0, 0]}
            color={effective.base}
            hoverColor={effective.hover}
            onClick={() => {}}
            isHovered={true}
            onHover={() => {}}
            size={getControlledSize()}
            variant={variant}
            baseGeometry="torusKnot"
            shatterMode={true}
          />
        )
      case 'Spotify':
        return (
          <PulsatingSoundTetrahedron
            color={effective.base}
            hoverColor={effective.hover}
            size={getControlledSize()}
            variant={variant}
          />
        )
      case 'SoundCloud':
        return (
          <LiquidMorphTorus
            position={[0, 0, 0]}
            color={effective.base}
            hoverColor={effective.hover}
            onClick={() => {}}
            isHovered={true}
            onHover={() => {}}
            size={getControlledSize()}
            variant={variant}
            baseGeometry="dodeca"
          />
        )
      case 'Bandcamp':
        return (
          <LiquidMorphTorus
            position={[0, 0, 0]}
            color={effective.base}
            hoverColor={effective.hover}
            onClick={() => {}}
            isHovered={true}
            onHover={() => {}}
            size={getControlledSize()}
            variant={variant}
            baseGeometry="torus"
            shatterMode={true}
          />
        )
      case 'YouTube':
        return (
          <MetallicMeltingTorus
            position={[0, 0, 0]}
            color={effective.base}
            hoverColor={effective.hover}
            onClick={() => {}}
            isHovered={true}
            onHover={() => {}}
            size={getControlledSize()}
            variant={variant}
            baseGeometry="sphere"
          />
        )
      default:
        return <DefaultTorus size={getControlledSize(true)} mousePos={mousePos} />
    }
  }

  return (
    <div className="w-full h-full relative" onPointerMove={handlePointerMove}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45, near: 0.1, far: 100 }}
        style={{ 
          width: '100%', 
          height: '100%',
          display: 'block'
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
          preserveDrawingBuffer: true
        }}
        frameloop="always"
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
        shadows
      >
        {/* Enhanced lighting matching main page */}
        <ambientLight intensity={0.15} />
        
        {/* Colored point lights like main page */}
        <pointLight position={[-6, 2, 3]} intensity={2.5} color="#ff4400" distance={15} />
        <pointLight position={[0, 3, 3]} intensity={2.0} color="#44aaff" distance={15} />
        <pointLight position={[6, -1, 3]} intensity={2.3} color="#44ddaa" distance={15} />
        <pointLight position={[0, -8, -5]} intensity={1.0} color="#ffffff" distance={20} />
        <pointLight position={[8, 8, -8]} intensity={0.8} color="#ffddaa" distance={25} />
        <pointLight position={[-8, 4, -6]} intensity={0.6} color="#aaddff" distance={20} />
        
        {/* Directional light for definition */}
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.25} 
          color="#ffffff"
          castShadow
        />
        
        {/* Position offset group - like home page orb positioning */}
        <group position={positionOffset}>
          {renderActiveOrb()}
        </group>
      </Canvas>

    </div>
  )
}