'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAudio } from './AudioContext'

function BackgroundParticles() {
  const { frequencyData, controls, isPlaying } = useAudio()
  const particlesRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  // Track mouse/window movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const particles = useMemo(() => {
    const particleArray = []
    for (let i = 0; i < 50; i++) {
      particleArray.push({
        position: [
          (Math.random() - 0.5) * 30,  // Even wider spread
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10   // Less depth spread
        ],
        baseScale: 0.02 + Math.random() * 0.04,
        speed: 0.05 + Math.random() * 0.15,
        offset: Math.random() * Math.PI * 2,
      })
    }
    return particleArray
  }, [])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(controls.color1) },
        color2: { value: new THREE.Color(controls.color2) },
        audioLevel: { value: 0.0 },
        mousePosition: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float audioLevel;
        uniform vec2 mousePosition;
        varying vec3 vPosition;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          // Mouse influence on opacity
          float mouseInfluence = length(mousePosition) * 0.3;
          
          // Enhanced pulsing opacity based on time, audio, and mouse
          float pulse = sin(time * 0.5) * 0.5 + 0.5;
          float opacity = mix(0.1, 0.3, pulse) * (1.0 + audioLevel * 0.5 + mouseInfluence);
          
          // Dynamic color mixing with mouse influence
          vec3 color = mix(color1, color2, dist * 2.0 + mouseInfluence);
          color = mix(color, color * (1.0 + audioLevel), 0.3);
          
          gl_FragColor = vec4(color, opacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }, [controls])

  useFrame((state) => {
    if (!particlesRef.current || !material.uniforms || !isPlaying) return
    
    const time = state.clock.elapsedTime
    material.uniforms.time.value = time
    material.uniforms.color1.value.set(controls.color1)
    material.uniforms.color2.value.set(controls.color2)
    material.uniforms.mousePosition.value.set(mouseRef.current.x, mouseRef.current.y)
    
    // Smooth audio reactivity
    const audioLevel = frequencyData ? (frequencyData.bass * 0.5 + frequencyData.mid * 0.3 + frequencyData.treble * 0.2) : 0
    material.uniforms.audioLevel.value = audioLevel
    
    particlesRef.current.children.forEach((particle, index) => {
      const data = particles[index]
      
      // Mouse-influenced motion
      const mouseInfluence = 0.01
      const targetX = data.position[0] + mouseRef.current.x * mouseInfluence
      const targetY = data.position[1] + mouseRef.current.y * mouseInfluence
      
      // Ambient floating motion with audio reactivity
      const xMotion = Math.sin(time * data.speed + data.offset) * (0.02 + audioLevel * 0.01)
      const yMotion = Math.cos(time * data.speed * 0.7 + data.offset) * (0.02 + audioLevel * 0.01)
      const zMotion = Math.sin(time * data.speed * 0.5 + data.offset) * (0.02 + audioLevel * 0.01)
      
      particle.position.x += (targetX - particle.position.x) * 0.1 + xMotion
      particle.position.y += (targetY - particle.position.y) * 0.1 + yMotion
      particle.position.z += zMotion
      
      // Keep particles within bounds with smooth wrapping
      const bound = 15
      if (Math.abs(particle.position.x) > bound) particle.position.x *= -0.95
      if (Math.abs(particle.position.y) > bound) particle.position.y *= -0.95
      if (Math.abs(particle.position.z) > bound) particle.position.z *= -0.95
      
      // Audio-reactive scaling
      const scale = data.baseScale * (1 + audioLevel * 0.3)
      particle.scale.setScalar(isPlaying ? scale : data.baseScale)
    })
  })

  if (!controls.showParticles) return null

  return (
    <group ref={particlesRef}>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position as [number, number, number]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <primitive object={material} attach="material" />
        </mesh>
      ))}
    </group>
  )
}

export function AnimatedBackground() {
  return <BackgroundParticles />
} 