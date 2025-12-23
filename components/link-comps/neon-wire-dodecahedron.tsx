'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface NeonWireDodecahedronProps {
  position: [number, number, number]
  color: string
  hoverColor: string
  onClick: () => void
  isHovered: boolean
  onHover: (hovered: boolean) => void
  size?: number
  variant?: number
}

export function NeonWireDodecahedron({
  position,
  color,
  hoverColor,
  onClick,
  isHovered,
  onHover,
  size = 1,
  variant = 0
}: NeonWireDodecahedronProps) {
  const groupRef = useRef<THREE.Group>(null)
  const solidRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)

  const variantFactor = 0.9 + (variant % 8) * 0.035
  const speed = 2.0 * (0.9 + ((variant * 3) % 5) * 0.03)
  const rotIntensity = 0.35 * (0.9 + ((variant * 5) % 5) * 0.03)
  const floatIntensity = 0.55 * (0.9 + ((variant * 7) % 5) * 0.03)

  const glowMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      baseColor: { value: new THREE.Color(color) },
      glowColor: { value: new THREE.Color(hoverColor) }
    },
    vertexShader: `
      uniform float time;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec3 pos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
      }
    `,
    fragmentShader: `
      uniform vec3 baseColor;
      uniform vec3 glowColor;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      void main() {
        float rim = pow(1.0 - max(0.0, dot(normalize(vNormal), normalize(cameraPosition - vWorldPosition))), 2.0);
        vec3 color = mix(baseColor * 0.6, glowColor, rim * 0.9);
        gl_FragColor = vec4(color, 0.65);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })

  useFrame((state) => {
    const t = state.clock.elapsedTime
    glowMaterial.uniforms.time.value = t
    if (groupRef.current) {
      groupRef.current.rotation.y = t * (0.6 * variantFactor)
      groupRef.current.rotation.x = Math.sin(t * (1.1 * variantFactor)) * 0.25
      groupRef.current.position.y = position[1] + Math.sin(t * (1.8 * variantFactor)) * 0.12
    }
  })

  return (
    <Float speed={speed} rotationIntensity={rotIntensity} floatIntensity={floatIntensity}>
      <group
        ref={groupRef}
        position={position}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        onClick={onClick}
      >
        <mesh ref={solidRef}>
          <dodecahedronGeometry args={[size * 0.9, 0]} />
          <primitive object={glowMaterial} />
        </mesh>

        <mesh ref={wireRef}>
          <dodecahedronGeometry args={[size * 0.92, 0]} />
          <meshBasicMaterial color={hoverColor} wireframe transparent opacity={0.9} />
        </mesh>
      </group>
    </Float>
  )
}


