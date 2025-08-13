'use client'

import { createContext, useContext, useState, useRef, useCallback, useEffect, ReactNode, useMemo } from 'react'

const DEBUG = false

interface AudioData {
  // Audio playback
  play: () => void
  pause: () => void
  setVolume: (volume: number) => void
  setTime: (time: number) => void
  isPlaying: boolean
  duration: number
  currentTime: number
  volume: number
  audioSrc: string
  setAudioSrc: (src: string) => void
  loadAudioFile: (file: File) => void
  
  // Audio element access for analysis
  audioElement: HTMLAudioElement | null
  
  // Audio analysis data
  audioData: {
    volume: number
    averageVolume: number
    peakVolume: number
    dbLevel: number
    bassLevel: number
    midLevel: number
    highLevel: number
    beatDetected: boolean
    tempo: number
    beatStrength: number
    halfTempoBeat: boolean
    beatCount: number
  }
  
  // Visual controls
  controls: {
    // Core shape & flow
    shape: string
    noiseScale: number
    noiseForce: number
    
    // Deform effects
    goopiness: number
    liquidity: number
    split: number
    splitIntensity: number

    // Audio reactivity settings
    audioReactivity: number
    volumeReactivity: number
    splitReactivity: number
    flowReactivity: number
    
    // Colors
    color1: string
    color2: string
    color3: string
    color4: string
    colorBlend: number
    autoCycleColors: boolean

    // Surface & post-processing
    metallic: number
    glass: number
    contrast: number
    brightness: number
    bloom: number
    grain: number
    grainSize: number
    
    // Enhanced texture effects
    chrome: number
    pearl: number
    holographic: number
    roughness: number
    
    // Modes
    wireframe: boolean
    dotMatrix: boolean
    dotSeparation: number
    rotationSpeed: number
    
    // Creative Shape Transformations
    tentacleMode: number
    bubbleMode: number
    spiralMode: number
    webMode: number
    crystalGrowth: number
    liquidMerge: number
    
    // Temporary old effects to match type
    kaleidoscope: number
    melting: number
    crystalline: number
    plasma: number
    
    // Advanced visual modes
    shattered: boolean
    ripple: boolean
    vortex: boolean

    // REAL PHYSICAL MERCURY PROPERTIES
    viscosity: number
    surfaceTension: number
    density: number
    elasticity: number
    
    // NEW: PUDDLE MODE
    puddleMode: number
    
    // ANIMATION SEQUENCE PROPERTIES
    backgroundIntensity?: number
    currentPhase?: string
    currentPattern?: string
    elapsedTime?: number
    colorFlow?: number
    colorShift1?: number
    colorShift2?: number
    colorShift3?: number
    autoColorCycle?: boolean
    autoShapeCycle?: boolean
    beatCount?: number
    
    // MERCURY DROPLET CONTROLS
    dropletCount?: number
    dropletSize?: number
    dropletSpeed?: number
    dropletSpread?: number
    dropletMagnetic?: number
    dropletDramIntensity?: number
    dropletShapeChange?: boolean
    dropletConnectionThickness?: number
    dropletConnectionOpacity?: number
    dropletRotationSpeed?: number
    dropletScaleReactivity?: number
    
    // ENHANCED ABSTRACT DROPLET CONTROLS
    dropletBrightness: number
    dropletGlow: number
    dropletMetallic: number
    dropletRoughness: number
    dropletIridescence: number
    dropletPulse: number
    dropletTrails: boolean
    dropletFluid: number
    dropletCrystalline: number
    dropletPlasma: number
    dropletHologram: number
    
    // AMBIENT SPACE MODE CONTROLS
    ambientSpaceMode?: boolean
    ambientIntensity?: number
    ambientWaveCount?: number
    ambientFlowSpeed?: number
    ambientDepth?: number
    
    // ABSTRACT INVERSION EFFECT
    abstractSplit?: number
  }
  setControls: (controls: any) => void
  
  // UI state
  bgColor: string
  setBgColor: (color: string) => void
  setVisualizerColors: (colors: { color1: string, color2: string, color3: string }) => void
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const AudioContext = createContext<AudioData | null>(null)

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  // Audio playback state
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [audioSrc, setAudioSrc] = useState('')
  
  // UI state
  const [bgColor, setBgColor] = useState('#000000')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Audio element state
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Audio analysis state
  const [audioData, setAudioData] = useState({
    volume: 0,
    averageVolume: 0,
    peakVolume: 0,
    dbLevel: -60,
    bassLevel: 0,
    midLevel: 0,
    highLevel: 0,
    beatDetected: false,
    tempo: 0,
    beatStrength: 0,
    halfTempoBeat: false,
    beatCount: 0,
  })

  // Audio analysis refs
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const animationFrameRef = useRef<number>()
  const volumeHistoryRef = useRef<number[]>([])

  // Beat detection state
  const beatHistoryRef = useRef<number[]>([])
  const lastBeatTimeRef = useRef(0)
  const tempoHistoryRef = useRef<number[]>([])
  const beatCountRef = useRef(0)

  // Enhanced controls with NEW PUDDLE MODE
  const [controls, setControls] = useState({
    // Core visualization parameters - natural defaults
    noiseScale: 2.2,
    noiseForce: 2.0,
    color1: '#00f2ff',
    color2: '#ff00a8', 
    color3: '#7000ff',
    color4: '#ff6b00',
    
    // Enhanced audio reactivity
    audioReactivity: 6.0, // Good balance for visibility
    
    // MERCURY PHYSICS - Better defaults for testing effects
    viscosity: 0.8,        // Higher for more visible effect
    surfaceTension: 1.0,   // Higher for more visible ripples
    density: 1.2,          // Higher for more deformation
    elasticity: 1.0,       // Higher for more bounce
    
    // NEW: PUDDLE MODE
    puddleMode: 0.0,  // NEW CONTROL: 0.0-3.0 for liquid spreading
    
    // Enhanced visual controls
    grain: 0.08,      // Default film grain for texture
    contrast: 1.8,    // Strong contrast for vivid colors
    brightness: 1.2,  // Default brightness
    metallic: 0.4,    // Significantly reduced for less shiny
    split: 0.8,       // Good visible splitting
    glass: 0.1,       // Reduced glass effect
    autoCycleColors: false,
    shape: 'sphere',
    
    // Additional effects - Better defaults for testing
    bloom: 0.15,     // Strong bloom for emotional glow
    grainSize: 1.2,  // Default grain size
    colorBlend: 1.0,
    dotMatrix: false,
    goopiness: 1.8,  // Higher for more visible goopiness
    liquidity: 2.5,  // Higher for more visible liquidity
    splitIntensity: 0.8, // Higher for more visible splitting
    
    // Enhanced texture effects
    chrome: 0.05,    // Significantly reduced chrome
    pearl: 0.05,     // Reduced pearl
    holographic: 0.0,
    roughness: 0.15,
    
    // Enhanced visual modes
    kaleidoscope: 0.0,
    melting: 0.0,
    crystalline: 0.0,
    plasma: 0.0,
    shattered: false,
    ripple: false,
    vortex: false,
    
    // Creative transformation effects
    tentacleMode: 0.0,
    bubbleMode: 0.0,
    spiralMode: 0.0,
    webMode: 0.0,
    crystalGrowth: 0.0,
    liquidMerge: 0.0,
    
    // Volume-driven reactivity controls - NATURAL AND SMOOTH
    volumeReactivity: 4.0, // Reduced from 12.0
    splitReactivity: 3.0,  // Reduced from 10.0
    flowReactivity: 5.0,   // Reduced from 15.0
    
    // Display modes
    wireframe: false,
    dotSeparation: 1.0,
    rotationSpeed: 1.0,
    
    // ANIMATION SEQUENCE PROPERTIES
    backgroundIntensity: undefined,
    currentPhase: undefined,
    currentPattern: undefined,
    elapsedTime: undefined,
    colorFlow: undefined,
    colorShift1: undefined,
    colorShift2: undefined,
    colorShift3: undefined,
    autoColorCycle: false,  // DISABLED BY DEFAULT - user can enable manually
    autoShapeCycle: false,  // DISABLED BY DEFAULT - user can enable manually
    beatCount: undefined,  // NEW: Beat count for animation sequence
    
    // MERCURY DROPLET CONTROLS
    dropletCount: 8,
    dropletSize: 0.8,
    dropletSpeed: 0.8,
    dropletSpread: 100,       // Fixed to match control range
    dropletMagnetic: 0.5,
    dropletDramIntensity: 0.7, // How dramatic their movements are
    dropletShapeChange: true,   // Allow shape morphing on beats
    dropletConnectionThickness: 0.5, // Thickness of 3D goop connections
    dropletConnectionOpacity: 0.6,   // Opacity of connections
    dropletRotationSpeed: 1.0,       // Rotation speed multiplier
    dropletScaleReactivity: 0.8,     // How much they scale with audio
    
    // ENHANCED ABSTRACT DROPLET CONTROLS
    dropletBrightness: 1.5,          // Overall brightness multiplier
    dropletGlow: 0.8,                // Emissive glow intensity
    dropletMetallic: 0.9,            // Metallic surface property
    dropletRoughness: 0.1,           // Surface roughness (0=mirror, 1=rough)
    dropletIridescence: 0.3,         // Rainbow color shifting
    dropletPulse: 0.5,               // Beat-reactive pulsing intensity
    dropletTrails: false,            // Leave glowing trails behind movement
    dropletFluid: 0.7,               // How fluid/liquid they appear
    dropletCrystalline: 0.0,         // Crystalline faceted appearance
    dropletPlasma: 0.0,              // Plasma energy effects
    dropletHologram: 0.0,            // Holographic transparency effects
    
    // AMBIENT SPACE MODE CONTROLS
    ambientSpaceMode: false,         // Toggle ambient space mode
    ambientIntensity: 1.0,           // Overall ambient intensity
    ambientWaveCount: 8,             // Number of wave patterns
    ambientFlowSpeed: 1.0,           // Speed of wave motion
    ambientDepth: 1.0,               // 3D depth of waves
    
    // ABSTRACT INVERSION EFFECT
    abstractSplit: 0.0,              // 0.0-3.0 for dramatic blob inversion/splitting
  })

  // Color palettes for auto cycling
  const colorPalettes = useMemo(() => [
    { color1: '#ff71ce', color2: '#01cdfe', color3: '#05ffa1' },
    { color1: '#f5d300', color2: '#ff225e', color3: '#6a0dad' },
    { color1: '#00c6ff', color2: '#0072ff', color3: '#fceabb' },
    { color1: '#ff8c00', color2: '#ff0080', color3: '#4b0082' },
    { color1: '#a7ff83', color2: '#17bd9b', color3: '#027a74' },
    { color1: '#ff4b1f', color2: '#1fddff', color3: '#ffffff' },
    { color1: '#9d4edd', color2: '#f72585', color3: '#4cc9f0' },
    { color1: '#39ff14', color2: '#ff073a', color3: '#00f5ff' },
  ], [])

  const lastColorChangeRef = useRef(0)

  // Audio analysis setup function
  const setupAudioAnalysis = useCallback((audioElement: HTMLAudioElement) => {
    try {
      console.log('🎵 Setting up audio analysis...')
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      
      const audioContext = audioContextRef.current
      
      if (audioContext.state === 'suspended') {
        audioContext.resume()
      }
      
      if (sourceRef.current) {
        sourceRef.current.disconnect()
      }
      
      const source = audioContext.createMediaElementSource(audioElement)
      const analyser = audioContext.createAnalyser()
      
      analyser.fftSize = 512
      analyser.smoothingTimeConstant = 0.3
      analyser.minDecibels = -90
      analyser.maxDecibels = -10
      
      source.connect(analyser)
      analyser.connect(audioContext.destination)
      
      sourceRef.current = source
      analyserRef.current = analyser
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)
      
      console.log('Audio analysis setup complete')
      startAudioAnalysis()
      
    } catch (error) {
      console.error('Error setting up audio analysis:', error)
    }
  }, [])

  // Audio analysis loop
  const lastAnalysisTimeRef = useRef(0)
  const startAudioAnalysis = useCallback(() => {
    const analyzeAudio = () => {
      if (!analyserRef.current || !dataArrayRef.current) return
      
      // Throttle to ~30fps for performance
      const now = performance.now()
      if (now - lastAnalysisTimeRef.current < 33) {
        animationFrameRef.current = requestAnimationFrame(analyzeAudio)
        return
      }
      lastAnalysisTimeRef.current = now
      
      analyserRef.current.getByteFrequencyData(dataArrayRef.current)
      const frequencyData = dataArrayRef.current
      
      const bassEnd = Math.floor(frequencyData.length * 0.1)
      const midEnd = Math.floor(frequencyData.length * 0.5)
      const highEnd = frequencyData.length
      
      let bassSum = 0, midSum = 0, highSum = 0, totalSum = 0
      
      for (let i = 0; i < bassEnd; i++) {
        bassSum += frequencyData[i]
      }
      
      for (let i = bassEnd; i < midEnd; i++) {
        midSum += frequencyData[i]
      }
      
      for (let i = midEnd; i < highEnd; i++) {
        highSum += frequencyData[i]
      }
      
      for (let i = 0; i < frequencyData.length; i++) {
        totalSum += frequencyData[i]
      }
      
      const bassLevel = bassSum / (bassEnd * 255)
      const midLevel = midSum / ((midEnd - bassEnd) * 255)
      const highLevel = highSum / ((highEnd - midEnd) * 255)
      const volume = totalSum / (frequencyData.length * 255)
      
      const dbLevel = volume > 0 ? 20 * Math.log10(volume) : -60
      
      volumeHistoryRef.current.push(volume)
      if (volumeHistoryRef.current.length > 10) {
        volumeHistoryRef.current.shift()
      }
      
      const averageVolume = volumeHistoryRef.current.reduce((a, b) => a + b, 0) / volumeHistoryRef.current.length
      const recentHistory = volumeHistoryRef.current.slice(-5)
      const peakVolume = Math.max(...recentHistory)
      
      // Beat detection
      const currentTime = Date.now()
      let beatDetected = false
      let beatStrength = 0
      let tempo = 0
      
      if (bassLevel > averageVolume * 1.5 && bassLevel > 0.3) {
        const timeSinceLastBeat = currentTime - lastBeatTimeRef.current
        
        if (timeSinceLastBeat > 200) {
          beatDetected = true
          beatStrength = bassLevel
          lastBeatTimeRef.current = currentTime
          
          beatHistoryRef.current.push(timeSinceLastBeat)
          if (beatHistoryRef.current.length > 8) {
            beatHistoryRef.current.shift()
          }
          
          if (beatHistoryRef.current.length > 3) {
            const avgInterval = beatHistoryRef.current.reduce((a, b) => a + b) / beatHistoryRef.current.length
            tempo = Math.round(60000 / avgInterval)
            
            tempoHistoryRef.current.push(tempo)
            if (tempoHistoryRef.current.length > 5) {
              tempoHistoryRef.current.shift()
            }
          }
          
          beatCountRef.current++
        }
      }
      
      const smoothedTempo = tempoHistoryRef.current.length > 0 
        ? tempoHistoryRef.current.reduce((a, b) => a + b) / tempoHistoryRef.current.length 
        : 0
      
      const halfTempoBeat = beatDetected && (beatCountRef.current % 2 === 0)
      
      setAudioData({
        volume,
        averageVolume,
        peakVolume,
        dbLevel: Math.max(dbLevel, -60),
        bassLevel,
        midLevel,
        highLevel,
        beatDetected,
        tempo: Math.round(smoothedTempo),
        beatStrength,
        halfTempoBeat,
        beatCount: beatCountRef.current,
      })
      
      animationFrameRef.current = requestAnimationFrame(analyzeAudio)
    }
    
    analyzeAudio()
  }, [])

  // Clean up audio analysis
  const cleanupAudioAnalysis = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    
    if (sourceRef.current) {
      sourceRef.current.disconnect()
      sourceRef.current = null
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
    
    analyserRef.current = null
    dataArrayRef.current = null
    volumeHistoryRef.current = []
    
    beatHistoryRef.current = []
    lastBeatTimeRef.current = 0
    tempoHistoryRef.current = []
    beatCountRef.current = 0
    
    setAudioData({
      volume: 0,
      averageVolume: 0,
      peakVolume: 0,
      dbLevel: -60,
      bassLevel: 0,
      midLevel: 0,
      highLevel: 0,
      beatDetected: false,
      tempo: 0,
      beatStrength: 0,
      halfTempoBeat: false,
      beatCount: 0,
    })
  }, [])

  // Playback functions
  const play = useCallback(async () => {
    if (audioRef.current) {
      try {
        console.log('🎵 PLAY CALLED:', { element: !!audioRef.current, src: audioRef.current.src })
        
        if (typeof window !== 'undefined') {
          try {
            const tempContext = new (window.AudioContext || (window as any).webkitAudioContext)()
            if (tempContext.state === 'suspended') {
              await tempContext.resume()
            }
            await tempContext.close()
            console.log('Audio context test passed')
          } catch (contextError) {
            console.warn('Audio context test failed:', contextError)
          }
        }
        
        await audioRef.current.play()
        
        if (audioRef.current) {
          setupAudioAnalysis(audioRef.current)
        }
      } catch (error) {
        console.error('Error playing audio:', error)
        setIsPlaying(false)
      }
    }
  }, [setupAudioAnalysis])

  const pause = useCallback(() => {
    if (audioRef.current) {
      console.log('PAUSE CALLED:', { element: !!audioRef.current })
      audioRef.current.pause()
      setIsPlaying(false)
      // Stop analysis loop but keep audio nodes/context so resume is seamless
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = undefined
      }
    }
  }, [])

  const setAudioVolume = useCallback((vol: number) => {
    if (audioRef.current) {
      audioRef.current.volume = vol
      setVolume(vol)
    }
  }, [])

  const setAudioTime = useCallback((time: number) => {
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused
      // temporarily pause the analysis loop while seeking to avoid spikes
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = undefined
      }
      audioRef.current.currentTime = time
      setCurrentTime(time)
      // resume analysis if it was playing
      if (wasPlaying) {
        requestAnimationFrame(() => {
          if (audioRef.current) {
            // restart analysis loop using existing nodes
            startAudioAnalysis()
          }
        })
      }
    }
  }, [startAudioAnalysis])

  // Audio loading effect
  useEffect(() => {
    if (audioSrc) {
              console.log('CREATING NEW AUDIO ELEMENT:', { audioSrc })
      
      if (audioRef.current) {
        audioRef.current.pause()
        cleanupAudioAnalysis()
      }
      
      const audio = new Audio(audioSrc)
      audio.crossOrigin = 'anonymous'
      audioRef.current = audio
      setAudioElement(audio)
      
      const handleMetadata = () => {
        console.log('AUDIO METADATA LOADED:', { duration: audio.duration })
        setDuration(audio.duration)
      }
      const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
      const handlePlay = () => {
        console.log('AUDIO STARTED PLAYING')
        setIsPlaying(true)
      }
      const handlePause = () => {
        console.log('AUDIO PAUSED')
        setIsPlaying(false)
      }
      const handleEnded = () => {
        console.log('AUDIO ENDED')
        setIsPlaying(false)
        cleanupAudioAnalysis()
      }
      // Removed auto-play to reduce initial load
      const handleError = (e: any) => {
        console.error('AUDIO ERROR:', e)
        if (audioSrc.startsWith('blob:')) {
          URL.revokeObjectURL(audioSrc)
        }
        setAudioSrc('')
        cleanupAudioAnalysis()
      }

      audio.addEventListener('loadedmetadata', handleMetadata)
      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('play', handlePlay)
      audio.addEventListener('pause', handlePause)
      audio.addEventListener('ended', handleEnded)
      // No auto-play listener
      audio.addEventListener('error', handleError)

      return () => {
        console.log('🧹 CLEANING UP AUDIO ELEMENT')
        audio.removeEventListener('loadedmetadata', handleMetadata)
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('pause', handlePause)
        audio.removeEventListener('ended', handleEnded)
        // No auto-play listener to remove
        audio.removeEventListener('error', handleError)
        audio.pause()
        cleanupAudioAnalysis()
      }
    } else {
      setAudioElement(null)
      cleanupAudioAnalysis()
    }
  }, [audioSrc, play, cleanupAudioAnalysis])

  // Smooth color morphing system - independent of audio tempo
  const colorMorphingRef = useRef({
    startTime: Date.now(),
    currentPaletteIndex: 0,
    nextPaletteIndex: 1,
    morphProgress: 0,
    morphDuration: 45000, // 45 seconds per color transition - much calmer
  })

  // Extended color palettes for more variety
  const extendedColorPalettes = useMemo(() => [
    { color1: '#00f2ff', color2: '#ff00a8', color3: '#7000ff', color4: '#ff6b00' }, // Original
    { color1: '#ff71ce', color2: '#01cdfe', color3: '#05ffa1', color4: '#ffb347' }, // Cyber
    { color1: '#f5d300', color2: '#ff225e', color3: '#6a0dad', color4: '#00ced1' }, // Sunset
    { color1: '#00c6ff', color2: '#0072ff', color3: '#fceabb', color4: '#ff8c94' }, // Ocean
    { color1: '#a7ff83', color2: '#17bd9b', color3: '#027a74', color4: '#ff6b9d' }, // Forest
    { color1: '#ff4b1f', color2: '#1fddff', color3: '#c471ed', color4: '#f64f59' }, // Fire
    { color1: '#9d4edd', color2: '#f72585', color3: '#4cc9f0', color4: '#f9844a' }, // Aurora
    { color1: '#39ff14', color2: '#ff073a', color3: '#00f5ff', color4: '#ffed4e' }, // Electric
    { color1: '#667eea', color2: '#764ba2', color3: '#f093fb', color4: '#f5576c' }, // Dream
    { color1: '#4facfe', color2: '#00f2fe', color3: '#43e97b', color4: '#38f9d7' }, // Tropical
  ], [])

  // Color interpolation helper function
  const interpolateColor = useCallback((color1: string, color2: string, progress: number): string => {
    const hex1 = color1.replace('#', '')
    const hex2 = color2.replace('#', '')
    
    const r1 = parseInt(hex1.substr(0, 2), 16)
    const g1 = parseInt(hex1.substr(2, 2), 16)
    const b1 = parseInt(hex1.substr(4, 2), 16)
    
    const r2 = parseInt(hex2.substr(0, 2), 16)
    const g2 = parseInt(hex2.substr(2, 2), 16)
    const b2 = parseInt(hex2.substr(4, 2), 16)
    
    const r = Math.round(r1 + (r2 - r1) * progress)
    const g = Math.round(g1 + (g2 - g1) * progress)
    const b = Math.round(b1 + (b2 - b1) * progress)
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }, [])

  // Smooth color morphing effect - calm and independent of audio
  useEffect(() => {
    if (!controls.autoCycleColors) return

    const morphColors = () => {
      const now = Date.now()
      const morphing = colorMorphingRef.current
      const elapsed = now - morphing.startTime
      
      // Calculate smooth progress using easing function for more natural transitions
      const rawProgress = Math.min(elapsed / morphing.morphDuration, 1)
      const easedProgress = 0.5 - 0.5 * Math.cos(rawProgress * Math.PI) // Smooth ease in/out
      
      const currentPalette = extendedColorPalettes[morphing.currentPaletteIndex]
      const nextPalette = extendedColorPalettes[morphing.nextPaletteIndex]
      
      // Interpolate between current and next palette
      const morphedColors = {
        color1: interpolateColor(currentPalette.color1, nextPalette.color1, easedProgress),
        color2: interpolateColor(currentPalette.color2, nextPalette.color2, easedProgress),
        color3: interpolateColor(currentPalette.color3, nextPalette.color3, easedProgress),
        color4: interpolateColor(currentPalette.color4, nextPalette.color4, easedProgress),
      }
      
      setControls(prev => ({
        ...prev,
        ...morphedColors
      }))
      
      // When transition is complete, move to next palette
      if (rawProgress >= 1) {
        morphing.currentPaletteIndex = morphing.nextPaletteIndex
        morphing.nextPaletteIndex = (morphing.nextPaletteIndex + 1) % extendedColorPalettes.length
        morphing.startTime = now
        
        // Vary the duration slightly for more organic feel (35-55 seconds)
        morphing.morphDuration = 35000 + Math.random() * 20000
      }
    }

    // Update colors at 60fps for smooth transitions
    const interval = setInterval(morphColors, 16) // ~60fps
    
    return () => clearInterval(interval)
  }, [controls.autoCycleColors, extendedColorPalettes, interpolateColor])

  // File loading
  const loadAudioFile = useCallback((file: File) => {
    console.log('LOADING AUDIO FILE:', { name: file.name, type: file.type, size: file.size })
    
    if (audioRef.current) {
      audioRef.current.pause()
      cleanupAudioAnalysis()
    }

    if (audioSrc && audioSrc.startsWith('blob:')) {
      URL.revokeObjectURL(audioSrc)
    }

    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    
    const newSrc = URL.createObjectURL(file)
    console.log('🔗 CREATED BLOB URL:', { newSrc })
    setAudioSrc(newSrc)
  }, [audioSrc, cleanupAudioAnalysis])

  // Helper functions
  const setVisualizerColors = useCallback((colors: { color1: string, color2: string, color3: string }) => {
    setControls((prev) => ({ ...prev, ...colors }))
  }, [])

  const toggleSidebar = useCallback(() => setIsSidebarOpen(prev => !prev), [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupAudioAnalysis()
    }
  }, [cleanupAudioAnalysis])

  const value: AudioData = {
    // Audio playback
    play,
    pause,
    setVolume: setAudioVolume,
    setTime: setAudioTime,
    isPlaying,
    duration,
    currentTime,
    volume,
    audioSrc,
    setAudioSrc,
    loadAudioFile,
    
    // Audio element
    audioElement,
    
    // Audio analysis data
    audioData,
    
    // Visual controls
    controls,
    setControls,
    
    // UI state
    bgColor,
    setBgColor,
    setVisualizerColors,
    isSidebarOpen,
    toggleSidebar,
  }

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
} 