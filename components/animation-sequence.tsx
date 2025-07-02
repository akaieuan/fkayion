'use client'

import { useEffect, useRef } from 'react'
import { useAudio } from './AudioContext'

// Enhanced animation phases with beat-based progression
const ANIMATION_PHASES = [
  // Phase 1: Gentle Awakening (0-16 beats)
  {
    beatDuration: 16,
    name: "Gentle Awakening",
    effects: {
      baseIntensity: 0.4,
      colorFlow: 0.5,
      surfaceEffects: 0.3,
      deformation: 0.4,
      backgroundIntensity: 0.2,
      shapeComplexity: 0.2,
      dropletChaos: 0.1
    }
  },
  // Phase 2: Energy Building (16-32 beats)
  {
    beatDuration: 16,
    name: "Energy Building",
    effects: {
      baseIntensity: 0.7,
      colorFlow: 0.8,
      surfaceEffects: 0.6,
      deformation: 0.7,
      backgroundIntensity: 0.4,
      shapeComplexity: 0.5,
      dropletChaos: 0.3
    }
  },
  // Phase 3: High Energy (32-64 beats)
  {
    beatDuration: 32,
    name: "High Energy",
    effects: {
      baseIntensity: 1.0,
      colorFlow: 1.2,
      surfaceEffects: 0.9,
      deformation: 1.1,
      backgroundIntensity: 0.7,
      shapeComplexity: 0.8,
      dropletChaos: 0.6
    }
  },
  // Phase 4: Peak Chaos (64-96 beats)
  {
    beatDuration: 32,
    name: "Peak Chaos",
    effects: {
      baseIntensity: 1.4,
      colorFlow: 1.6,
      surfaceEffects: 1.3,
      deformation: 1.6,
      backgroundIntensity: 1.0,
      shapeComplexity: 1.2,
      dropletChaos: 1.0
    }
  },
  // Phase 5: Ultra Transcendence (96+ beats)
  {
    beatDuration: Infinity,
    name: "Ultra Transcendence",
    effects: {
      baseIntensity: 1.8,
      colorFlow: 2.0,
      surfaceEffects: 1.6,
      deformation: 2.2,
      backgroundIntensity: 1.4,
      shapeComplexity: 1.8,
      dropletChaos: 1.5
    }
  }
]

// Enhanced beat-reactive patterns with shape changing
const BEAT_PATTERNS = [
  // Pattern 1: Morphing Flow
  {
    name: "Morphing Flow",
    beatDuration: 8,
    onBeat: {
      shape: ['sphere', 'icosahedron', 'torus', 'dodecahedron'],
      shapeChangeOnBeat: true,
      modifiers: {
        goopiness: 3.0,
        liquidity: 4.0,
        split: 0.3,
        chrome: 0.4,
        puddleMode: 1.2,
        // Droplet controls
        dropletCount: 12,
        dropletSpread: 200,
        dropletMagnetic: 1.2,
        dropletDramIntensity: 1.0
      }
    },
    onOffBeat: {
      modifiers: {
        goopiness: 1.5,
        liquidity: 2.0,
        split: 0.8,
        chrome: 0.1,
        puddleMode: 0.5,
        dropletSpread: 100,
        dropletMagnetic: 0.5
      }
    }
  },
  // Pattern 2: Metallic Transformation
  {
    name: "Metallic Transformation",
    beatDuration: 6,
    onBeat: {
      shape: ['cube', 'octahedron', 'tetrahedron', 'cylinder'],
      shapeChangeOnBeat: true,
      modifiers: {
        metallic: 1.0,
        chrome: 0.9,
        pearl: 0.8,
        roughness: 0.3,
        contrast: 1.6,
        bloom: 0.3,
        // Enhanced droplet effects
        dropletShapeChange: true,
        dropletRotationSpeed: 2.0,
        dropletScaleReactivity: 1.5,
        dropletConnectionThickness: 1.0
      }
    }
  },
  // Pattern 3: Chaos Storm
  {
    name: "Chaos Storm",
    beatDuration: 4,
    onBeat: {
      shape: ['torusKnot', 'cone', 'cylinder', 'dodecahedron'],
      modifiers: {
        splitIntensity: 3.0,
        tentacleMode: 2.5,
        liquidMerge: 2.0,
        shattered: true,
        vortex: true,
        audioReactivity: 15.0,
        // Extreme droplet chaos
        dropletCount: 15,
        dropletSpread: 350,
        dropletSpeed: 2.5,
        dropletDramIntensity: 2.0,
        dropletMagnetic: 0.2
      }
    }
  },
  // Pattern 4: Glass Dreams
  {
    name: "Glass Dreams",
    beatDuration: 12,
    onBeat: {
      shape: ['sphere', 'icosahedron', 'torus'],
      modifiers: {
        glass: 1.0,
        holographic: 0.8,
        bloom: 0.5,
        contrast: 1.8,
        dotMatrix: true,
        grain: 0.1,
        // Ethereal droplets
        dropletSize: 1.5,
        dropletConnectionOpacity: 0.8,
        dropletScaleReactivity: 2.0
      }
    }
  },
  // Pattern 5: Liquid Mercury Storm
  {
    name: "Liquid Mercury Storm",
    beatDuration: 10,
    onBeat: {
      shape: ['sphere', 'torus', 'dodecahedron'],
      modifiers: {
        puddleMode: 3.0,
        liquidMerge: 3.0,
        viscosity: 0.1,
        density: 4.0,
        surfaceTension: 0.1,
        elasticity: 2.0,
        // Mercury droplet storm
        dropletCount: 15,
        dropletSpread: 400,
        dropletMagnetic: 1.8,
        dropletSpeed: 3.0
      }
    }
  },
  // Pattern 6: Wireframe Energy
  {
    name: "Wireframe Energy",
    beatDuration: 8,
    onBeat: {
      shape: ['icosahedron', 'octahedron', 'tetrahedron'],
      modifiers: {
        wireframe: true,
        elasticity: 2.0,
        goopiness: 4.0,
        audioReactivity: 18.0,
        grain: 0.2,
        contrast: 2.0,
        // Wireframe droplets
        dropletConnectionThickness: 1.5,
        dropletRotationSpeed: 3.0
      }
    }
  },
  // Pattern 7: Brilliant Droplet Storm
  {
    name: "Brilliant Droplet Storm",
    beatDuration: 6,
    onBeat: {
      shape: ['sphere', 'torus', 'icosahedron'],
      shapeChangeOnBeat: true,
      modifiers: {
        // Maximum visual impact
        dropletBrightness: 3.0,
        dropletGlow: 2.0,
        dropletIridescence: 1.0,
        dropletPulse: 2.0,
        dropletCount: 15,
        dropletSpread: 350,
        dropletSpeed: 2.5,
        dropletMagnetic: 1.5,
        dropletFluid: 1.0,
        // Main blob effects
        bloom: 0.6,
        holographic: 0.9,
        chrome: 0.8
      }
    },
    onOffBeat: {
      modifiers: {
        dropletBrightness: 1.0,
        dropletGlow: 0.5,
        dropletIridescence: 0.3,
        dropletSpread: 150
      }
    }
  },
  // Pattern 8: Plasma Energy Field
  {
    name: "Plasma Energy Field",
    beatDuration: 10,
    onBeat: {
      shape: ['torusKnot', 'dodecahedron', 'cylinder'],
      modifiers: {
        // Extreme energy effects
        audioReactivity: 20.0,
        tentacleMode: 3.0,
        liquidMerge: 3.0,
        shattered: true,
        vortex: true,
        // Plasma droplets
        dropletBrightness: 2.5,
        dropletGlow: 1.8,
        dropletMetallic: 1.0,
        dropletIridescence: 0.8,
        dropletCount: 15,
        dropletSpread: 400,
        dropletDramIntensity: 2.0,
        dropletConnectionThickness: 1.2
      }
    }
  }
]

export function AnimationSequence() {
  const { isPlaying, audioSrc, controls, setControls, audioData } = useAudio()
  const startTimeRef = useRef<number | null>(null)
  const lastPatternChangeRef = useRef<number>(0)
  const currentPatternRef = useRef<number>(0)
  const originalControlsRef = useRef<any>(null)
  const beatCountRef = useRef<number>(0)
  const lastBeatTimeRef = useRef<number>(0)
  const currentShapeIndexRef = useRef<number>(0)

  // Store original controls when animation starts
  useEffect(() => {
    if (isPlaying && audioSrc && controls.autoEvolution && !originalControlsRef.current) {
      // Store a deep copy of original controls
      originalControlsRef.current = { 
        ...controls,
        // Ensure these animation properties are excluded from backup
        currentPhase: undefined,
        currentPattern: undefined,
        elapsedTime: undefined,
        beatCount: undefined,
        backgroundIntensity: controls.backgroundIntensity || 0.15
      }
      startTimeRef.current = Date.now()
      lastPatternChangeRef.current = Date.now()
      beatCountRef.current = 0
      lastBeatTimeRef.current = Date.now()
      console.log('🎵 ENHANCED AUTO EVOLUTION ACTIVATED!')
    } else if (!controls.autoEvolution && originalControlsRef.current) {
      // IMMEDIATELY restore controls when auto evolution is disabled
      console.log('🎵 Auto Evolution DISABLED - Restoring Manual Control')
      const restoredControls = { 
        ...originalControlsRef.current,
        autoEvolution: false, // Ensure this stays false
        // Clear animation-specific properties
        currentPhase: undefined,
        currentPattern: undefined, 
        elapsedTime: undefined,
        beatCount: undefined
      }
      setControls(restoredControls)
      originalControlsRef.current = null
      startTimeRef.current = null
      beatCountRef.current = 0
    }
  }, [isPlaying, audioSrc, controls.autoEvolution, setControls])

  // Cleanup effect - ensures proper restoration on unmount
  useEffect(() => {
    return () => {
      if (originalControlsRef.current) {
        console.log('🧹 AnimationSequence cleanup - restoring controls')
        const restoredControls = { 
          ...originalControlsRef.current,
          autoEvolution: false,
          currentPhase: undefined,
          currentPattern: undefined,
          elapsedTime: undefined,
          beatCount: undefined
        }
        setControls(restoredControls)
        originalControlsRef.current = null
      }
    }
  }, [setControls])

  // Enhanced beat-responsive animation loop
  useEffect(() => {
    if (!isPlaying || !audioSrc || !startTimeRef.current || !controls.autoEvolution) {
      // Stop the interval when auto evolution is disabled
      return
    }

    const interval = setInterval(() => {
      const now = Date.now()
      const elapsed = (now - startTimeRef.current!) / 1000 // seconds
      
      // Enhanced beat detection with tempo awareness
      const beatDetected = audioData?.beatDetected || false
      const currentTempo = audioData?.tempo || 120
      const expectedBeatInterval = 60000 / currentTempo // ms per beat
      const timeSinceLastBeat = now - lastBeatTimeRef.current
      
      // Beat tracking with both detected beats and tempo prediction - MORE AGGRESSIVE
      let newBeat = false
      if (beatDetected || timeSinceLastBeat > expectedBeatInterval * 0.6) { // Reduced from 0.8 to be more aggressive
        newBeat = true
        beatCountRef.current++
        lastBeatTimeRef.current = now
        console.log(`🥁 Beat ${beatCountRef.current}: Audio=${beatDetected}, Tempo=${currentTempo}, Pattern=${BEAT_PATTERNS[currentPatternRef.current]?.name || 'Unknown'}`)
      }

      // Force beat every 500ms if no audio activity to keep animation alive
      if (timeSinceLastBeat > 500) {
        newBeat = true
        beatCountRef.current++
        lastBeatTimeRef.current = now
        console.log(`🔄 Forced Beat ${beatCountRef.current} - keeping animation alive`)
      }

      // Determine current phase based on beat count
      let currentPhase = ANIMATION_PHASES[0]
      let accumulatedBeats = 0
      for (const phase of ANIMATION_PHASES) {
        if (beatCountRef.current <= accumulatedBeats + phase.beatDuration) {
          currentPhase = phase
          break
        }
        accumulatedBeats += phase.beatDuration
      }

      // Pattern management with beat synchronization
      const currentPattern = BEAT_PATTERNS[currentPatternRef.current]
      const beatsSincePatternStart = beatCountRef.current % currentPattern.beatDuration
      
      // Change pattern on pattern cycle completion
      if (beatsSincePatternStart === 0 && beatCountRef.current > 0) {
        const availablePatterns = BEAT_PATTERNS.length
        currentPatternRef.current = (currentPatternRef.current + 1) % availablePatterns
        console.log(`🎵 Pattern Changed: ${BEAT_PATTERNS[currentPatternRef.current].name}`)
      }

      // Enhanced audio intensity calculation
      const audioIntensity = audioData ? 
        (audioData.volume * 0.4 + audioData.bassLevel * 0.3 + audioData.midLevel * 0.2 + audioData.highLevel * 0.1) : 0
      const bassLevel = audioData?.bassLevel || 0
      const midLevel = audioData?.midLevel || 0
      const highLevel = audioData?.highLevel || 0

      // Build evolved controls with dramatic enhancements
      const evolvedControls = { ...originalControlsRef.current }

      // Apply phase multipliers with audio responsiveness
      const phaseMultiplier = currentPhase.effects.baseIntensity + (audioIntensity * 0.8)

      // SHAPE CHANGING ON BEATS
      const pattern = BEAT_PATTERNS[currentPatternRef.current]
      if (pattern.onBeat?.shape && pattern.onBeat?.shapeChangeOnBeat && newBeat) {
        const shapes = pattern.onBeat.shape
        currentShapeIndexRef.current = (currentShapeIndexRef.current + 1) % shapes.length
        evolvedControls.shape = shapes[currentShapeIndexRef.current]
        console.log(`🔄 Shape Changed: ${evolvedControls.shape}`)
      }

      // Apply beat-reactive modifiers
      const isOnBeat = beatsSincePatternStart % 2 === 0
      const modifierSource = isOnBeat ? pattern.onBeat?.modifiers : pattern.onOffBeat?.modifiers
      
      if (modifierSource) {
        Object.entries(modifierSource).forEach(([key, value]) => {
          // Never modify color controls - they stay user-controlled
          if (key === 'color1' || key === 'color2' || key === 'color3') {
            return
          }
          
          if (typeof value === 'boolean') {
            evolvedControls[key] = value
          } else if (typeof value === 'number') {
            const baseValue = originalControlsRef.current[key] || 0
            const audioBoost = 1.0 + (audioIntensity * 2.0)
            evolvedControls[key] = baseValue + (value * phaseMultiplier * currentPhase.effects.deformation * audioBoost)
          }
        })
      }

      // ENHANCED REAL-TIME AUDIO REACTIVE EFFECTS
      
      // Bass-driven deformation
      if (bassLevel > 0.5) {
        evolvedControls.goopiness = Math.max(evolvedControls.goopiness || 0, bassLevel * 4.0 * phaseMultiplier)
        evolvedControls.liquidMerge = bassLevel * 2.5 * currentPhase.effects.deformation
        evolvedControls.puddleMode = Math.min(3.0, bassLevel * 3.0 * currentPhase.effects.shapeComplexity)
      }

      // Mid-frequency surface effects
      if (midLevel > 0.4) {
        evolvedControls.chrome = midLevel * 0.8 * currentPhase.effects.surfaceEffects
        evolvedControls.metallic = Math.min(1.0, midLevel * 1.2 * currentPhase.effects.surfaceEffects)
        evolvedControls.pearl = midLevel * 0.6 * currentPhase.effects.surfaceEffects
      }

      // High-frequency crystal effects
      if (highLevel > 0.3) {
        evolvedControls.holographic = highLevel * 0.7 * currentPhase.effects.surfaceEffects
        evolvedControls.glass = highLevel * 0.5 * currentPhase.effects.surfaceEffects
        evolvedControls.bloom = highLevel * 0.4 * currentPhase.effects.colorFlow
      }

      // DRAMATIC DROPLET EVOLUTION
      const dropletChaosLevel = currentPhase.effects.dropletChaos
      
      // Beat-reactive droplet chaos
      if (newBeat && bassLevel > 0.4) {
        evolvedControls.dropletSpread = Math.min(400, (evolvedControls.dropletSpread || 100) + bassLevel * 150 * dropletChaosLevel)
        evolvedControls.dropletDramIntensity = Math.min(2.0, bassLevel * 2.0 * dropletChaosLevel)
        evolvedControls.dropletSpeed = Math.min(3.0, bassLevel * 3.0 * dropletChaosLevel)
        
        // Enhanced brightness pulsing on beats
        evolvedControls.dropletBrightness = Math.min(3.0, (originalControlsRef.current.dropletBrightness || 1.5) + bassLevel * 1.5 * dropletChaosLevel)
        evolvedControls.dropletPulse = Math.min(2.0, bassLevel * 2.0 * dropletChaosLevel)
      }

      // Mid-frequency droplet coordination
      if (midLevel > 0.3) {
        evolvedControls.dropletMagnetic = midLevel * 1.5 * dropletChaosLevel
        evolvedControls.dropletConnectionThickness = midLevel * 1.2
        evolvedControls.dropletRotationSpeed = midLevel * 2.5 * dropletChaosLevel
        
        // Enhanced glow and metallic effects
        evolvedControls.dropletGlow = Math.min(2.0, midLevel * 2.0 * dropletChaosLevel)
        evolvedControls.dropletMetallic = Math.min(1.0, midLevel * 1.0)
      }

      // High-frequency droplet scaling and iridescence
      if (highLevel > 0.2) {
        evolvedControls.dropletScaleReactivity = highLevel * 2.0 * dropletChaosLevel
        evolvedControls.dropletSize = Math.max(0.3, (originalControlsRef.current.dropletSize || 0.8) + highLevel * 0.8)
        
        // Enhanced iridescent color shifting on high frequencies
        evolvedControls.dropletIridescence = Math.min(1.0, highLevel * 1.0 * dropletChaosLevel)
        evolvedControls.dropletFluid = Math.min(1.0, highLevel * 1.0)
      }

      // Progressive color evolution with beat sync - REMOVED BEAT REACTIVITY - COLORS STAY CALM
      const colorPhase = elapsed * 0.03 // Much slower, time-based only, no audio
      const colorIntensity = 0.8 // Constant, no phase changes
      
      // Very gentle color shifting - NO audio reactivity, just slow natural drift
      const hueShift1 = Math.sin(colorPhase) * 8 * colorIntensity // Much smaller shifts
      const hueShift2 = Math.sin(colorPhase + 2.1) * 8 * colorIntensity
      const hueShift3 = Math.sin(colorPhase + 4.2) * 8 * colorIntensity

      evolvedControls.colorFlow = 0.3 // Constant gentle flow
      evolvedControls.colorShift1 = hueShift1
      evolvedControls.colorShift2 = hueShift2
      evolvedControls.colorShift3 = hueShift3

      // COLORS ARE COMPLETELY DISCONNECTED FROM AUDIO - NO BEAT REACTIVE CHANGES

      // Audio-reactive intensity scaling
      if (audioIntensity > 0.3) {
        evolvedControls.audioReactivity = Math.min(20.0, 
          (originalControlsRef.current.audioReactivity || 6.0) + 
          audioIntensity * 12.0 * phaseMultiplier
        )
      }

      // Extreme mode activations
      if (audioIntensity > 0.7 && currentPhase.effects.baseIntensity > 1.0) {
        evolvedControls.shattered = true
        evolvedControls.vortex = true
        evolvedControls.tentacleMode = Math.min(3.0, audioIntensity * 3.0)
        evolvedControls.splitIntensity = Math.min(5.0, audioIntensity * 4.0)
      }

      // Background and metadata
      evolvedControls.backgroundIntensity = currentPhase.effects.backgroundIntensity * (1.0 + audioIntensity * 0.5)
      evolvedControls.currentPhase = currentPhase.name
      evolvedControls.currentPattern = pattern.name
      evolvedControls.elapsedTime = elapsed
      evolvedControls.beatCount = beatCountRef.current

      // Apply the dramatically evolved controls
      setControls(evolvedControls)

    }, 50) // Update every 50ms for ultra-smooth beat responsiveness

    return () => clearInterval(interval)
  }, [isPlaying, audioSrc, audioData, setControls])

  return null
} 