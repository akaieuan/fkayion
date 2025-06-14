'use client'

import { useEffect, useRef } from 'react'
import { useAudio } from './AudioContext'
import * as THREE from 'three'

type ColorMode = 'intense' | 'mellow' | 'dark'
type SequenceState = {
  currentBassIndex: number
  currentMidIndex: number
  currentTrebleIndex: number
  currentColorMode: ColorMode
  colorIndex: number
  transitionProgress: number
  baseNoiseScale: number
  baseGoopiness: number
}

type BoxControls = {
  noiseScale: number
  noiseForce: number
  goopiness: number
  color1: string
  color2: string
  color3: string
}

export type Controls = {
  // Core visualization parameters
  noiseScale: number
  noiseForce: number
  goopiness: number
  color1: string
  color2: string
  color3: string
  
  // Audio reactivity
  bassReactivity: number
  midReactivity: number
  trebleReactivity: number
  
  // Visual Enhancements
  contrast: number
  grain: number
  bloom: number
  wireframe: boolean
  showParticles: boolean
  
  // Shape
  shape: string

  // Animation Controls
  sequenceSpeed: number
  autoCycleShapes: boolean
  autoSequencing: boolean
  autoRandomizeParams: boolean

  // Shape Parameters
  complexity: number
  tension: number
  turbulence: number
  detail: number
}

// Ambient goop sequences - now with spikier variations
const GOOP_SEQUENCES = {
  flow: [
    { noiseScale: 2.0, goopiness: 1.8 },  // Sharp spikes
    { noiseScale: 1.5, goopiness: 2.2 },  // Dense thorns
    { noiseScale: 2.5, goopiness: 1.5 },  // Scattered spikes
  ],
  spiky: [
    { noiseScale: 3.0, goopiness: 2.5 },  // Virus-like
    { noiseScale: 2.2, goopiness: 2.8 },  // Corona spikes
    { noiseScale: 2.8, goopiness: 2.0 },  // Crystalline spikes
  ]
}

// Audio reactive bounce parameters - increased for more dramatic effect
const BOUNCE_SEQUENCES = {
  bass: [
    { noiseForce: 4.0 },  // Heavy impact
    { noiseForce: 3.0 },  // Medium punch
    { noiseForce: 4.5 },  // Strong hit
  ],
  mid: [
    { noiseForce: 2.5 },  // Soft bounce
    { noiseForce: 3.0 },  // Medium bounce
    { noiseForce: 2.8 },  // Quick bounce
  ],
  treble: [
    { noiseForce: 2.0 },  // Light flutter
    { noiseForce: 2.5 },  // Sharp bounce
    { noiseForce: 3.0 },  // Crisp movement
  ]
}

const COLOR_SEQUENCES: Record<ColorMode, Array<{ color1: string, color2: string, color3: string }>> = {
  intense: [
    { color1: '#ff0088', color2: '#00ff88', color3: '#0088ff' },  // Neon burst
    { color1: '#ff00ff', color2: '#00ffff', color3: '#ffff00' },  // Tri-color flash
    { color1: '#ff0000', color2: '#00ff00', color3: '#0000ff' },  // RGB max
  ],
  mellow: [
    { color1: '#4400ff', color2: '#00ffcc', color3: '#ff0066' },  // Cool flow
    { color1: '#ff6600', color2: '#00ff99', color3: '#6600ff' },  // Warm pulse
    { color1: '#00ccff', color2: '#ff00cc', color3: '#ccff00' },  // Pastel wave
  ],
  dark: [
    { color1: '#330066', color2: '#660033', color3: '#003366' },  // Deep space
    { color1: '#660066', color2: '#006666', color3: '#666600' },  // Dark pulse
    { color1: '#330033', color2: '#003333', color3: '#333300' },  // Shadow wave
  ]
}

// Modified base parameters for spikier appearance
const calculateGoopParameters = (controls: Controls) => {
  const complexityFactor = Math.pow(controls.complexity || 1, 1.8) // Increased exponential for more dramatic effect
  const tensionFactor = controls.tension || 1
  const turbulenceFactor = controls.turbulence || 0
  const detailFactor = controls.detail || 1

  // Emphasize spiky characteristics
  return {
    noiseScale: (controls.noiseScale || 1) * complexityFactor * (1 + turbulenceFactor * 0.8),
    goopiness: (controls.goopiness || 1) * tensionFactor * (1 + (detailFactor - 1) * 0.5) * 1.2, // Increased base spikiness
  }
}

export function AnimationSequence() {
  const { frequencyData, controls, setControls, isPlaying } = useAudio()
  const lastUpdateRef = useRef(0)

  useEffect(() => {
    if (!isPlaying || !frequencyData) return

    const animate = () => {
      const now = Date.now()
      const deltaTime = now - lastUpdateRef.current
      
      if (deltaTime > 50 && frequencyData) {
        const { bass, mid, treble } = frequencyData

        // Calculate audio-reactive force
        const force = (
          bass * controls.bassReactivity +
          mid * controls.midReactivity +
          treble * controls.trebleReactivity
        ) / (bass + mid + treble || 1)

        // Update controls with force
        setControls((prev: Controls) => ({
          ...prev,
          noiseForce: force * prev.noiseForce,
        }))

        lastUpdateRef.current = now
      }

      requestAnimationFrame(animate)
    }

    const animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isPlaying, frequencyData, setControls, controls])

  return null
} 