'use client'

import { createContext, useContext, useState, useRef, useCallback, useEffect, ReactNode, useMemo } from 'react'

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
    colorBlend: number
    autoCycleColors: boolean

    // Surface & post-processing
    metallic: number
    glass: number
    contrast: number
    bloom: number
    grain: number
    grainSize: number
    
    // Enhanced texture effects
    chrome: number
    pearl: number
    holographic: number
    roughness: number  // NEW CONTROL
    
    // Modes
    wireframe: boolean
    dotMatrix: boolean
    
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

    // AUDIO-DRIVEN DEFORMATION MULTIPLIERS (was: REAL PHYSICAL MERCURY PROPERTIES)
    viscosity: number
    surfaceTension: number
    density: number
    elasticity: number
    
    // *** NEW: PUDDLE MODE ***
    puddleMode: number  // NEW CONTROL: 0.0-3.0 for liquid spreading
    
    // *** ANIMATION SEQUENCE PROPERTIES ***
    backgroundIntensity?: number
    currentPhase?: string
    currentPattern?: string
    elapsedTime?: number
    colorFlow?: number
    colorShift1?: number
    colorShift2?: number
    colorShift3?: number
    autoEvolution?: boolean  // NEW: Controls whether animation sequence is active
    beatCount?: number       // NEW: Beat count for animation sequence
    
    // *** MERCURY DROPLET CONTROLS ***
    dropletCount?: number     // Number of mercury droplets
    dropletSize?: number      // Base size of droplets
    dropletSpeed?: number     // Movement speed multiplier
    dropletSpread?: number    // How spread out across the page
    dropletMagnetic?: number  // Magnetic attraction strength between droplets
    dropletDramIntensity?: number // How dramatic their movements are
    dropletShapeChange?: boolean   // Allow shape morphing on beats
    dropletConnectionThickness?: number // Thickness of 3D goop connections
    dropletConnectionOpacity?: number   // Opacity of connections
    dropletRotationSpeed?: number       // Rotation speed multiplier
    dropletScaleReactivity?: number     // How much they scale with audio
    
    // *** ENHANCED ABSTRACT DROPLET CONTROLS ***
    dropletBrightness: number          // Overall brightness multiplier
    dropletGlow: number                // Emissive glow intensity
    dropletMetallic: number            // Metallic surface property
    dropletRoughness: number           // Surface roughness (0=mirror, 1=rough)
    dropletIridescence: number         // Rainbow color shifting
    dropletPulse: number               // Beat-reactive pulsing intensity
    dropletTrails: boolean            // Leave glowing trails behind movement
    dropletFluid: number               // How fluid/liquid they appear
    dropletCrystalline: number         // Crystalline faceted appearance
    dropletPlasma: number              // Plasma energy effects
    dropletHologram: number            // Holographic transparency effects
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
    
    // Enhanced audio reactivity
    audioReactivity: 4.0, // Reduced from 2.0 for better response but not seizure-inducing
    
    // AUDIO-DRIVEN DEFORMATION MULTIPLIERS (was: REAL PHYSICAL MERCURY PROPERTIES)
    viscosity: 0.6,        // Slightly reduced for more fluid feel
    surfaceTension: 0.5,   // Reduced for more freedom 
    density: 0.6,          // Lighter feel
    elasticity: 0.6,       // Slightly more bouncy
    
    // *** NEW: PUDDLE MODE ***
    puddleMode: 0.0,  // NEW CONTROL: 0.0-3.0 for liquid spreading
    
    // Enhanced visual controls
    grain: 0.02,      // Reduced grain for cleaner look
    contrast: 1.1,    // Slightly reduced contrast
    metallic: 0.8,    // Increased for better mercury feel
    split: 0.6,       // Reduced for less harsh splitting
    glass: 0.2,       // Slight glass effect
    autoCycleColors: false,
    shape: 'sphere',
    
    // Additional effects - NATURAL SETTINGS
    bloom: 0.03,     // Reduced bloom for less overwhelming effect
    grainSize: 0.8,  // Smaller grain
    colorBlend: 1.0,
    dotMatrix: false,
    goopiness: 0.8,  // More reasonable goopiness
    liquidity: 1.2,  // Good balance
    splitIntensity: 0.6, // Less intense splitting
    
    // Enhanced texture effects
    chrome: 0.2,
    pearl: 0.1,
    holographic: 0.0,
    roughness: 0.15,  // NEW CONTROL
    
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
    
    // *** ANIMATION SEQUENCE PROPERTIES ***
    backgroundIntensity: undefined,
    currentPhase: undefined,
    currentPattern: undefined,
    elapsedTime: undefined,
    colorFlow: undefined,
    colorShift1: undefined,
    colorShift2: undefined,
    colorShift3: undefined,
    autoEvolution: false,  // DISABLED BY DEFAULT - users can enable for automatic evolution
    beatCount: undefined,  // NEW: Beat count for animation sequence
    
    // *** MERCURY DROPLET CONTROLS ***
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
    
    // *** ENHANCED ABSTRACT DROPLET CONTROLS ***
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
      
      console.log('✅ Audio analysis setup complete')
      startAudioAnalysis()
      
    } catch (error) {
      console.error('❌ Error setting up audio analysis:', error)
    }
  }, [])

  // Audio analysis loop
  const startAudioAnalysis = useCallback(() => {
    const analyzeAudio = () => {
      if (!analyserRef.current || !dataArrayRef.current) return
      
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
            console.log('✅ Audio context test passed')
          } catch (contextError) {
            console.warn('⚠️ Audio context test failed:', contextError)
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
      console.log('⏸️ PAUSE CALLED:', { element: !!audioRef.current })
      audioRef.current.pause()
      setIsPlaying(false)
      cleanupAudioAnalysis()
    }
  }, [cleanupAudioAnalysis])

  const setAudioVolume = useCallback((vol: number) => {
    if (audioRef.current) {
      audioRef.current.volume = vol
      setVolume(vol)
    }
  }, [])

  const setAudioTime = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  // Audio loading effect
  useEffect(() => {
    if (audioSrc) {
      console.log('🔄 CREATING NEW AUDIO ELEMENT:', { audioSrc })
      
      if (audioRef.current) {
        audioRef.current.pause()
        cleanupAudioAnalysis()
      }
      
      const audio = new Audio(audioSrc)
      audio.crossOrigin = 'anonymous'
      audioRef.current = audio
      setAudioElement(audio)
      
      const handleMetadata = () => {
        console.log('📊 AUDIO METADATA LOADED:', { duration: audio.duration })
        setDuration(audio.duration)
      }
      const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
      const handlePlay = () => {
        console.log('▶️ AUDIO STARTED PLAYING')
        setIsPlaying(true)
      }
      const handlePause = () => {
        console.log('⏸️ AUDIO PAUSED')
        setIsPlaying(false)
      }
      const handleEnded = () => {
        console.log('🔚 AUDIO ENDED')
        setIsPlaying(false)
        cleanupAudioAnalysis()
      }
      const handleCanPlay = () => {
        console.log('✅ AUDIO CAN PLAY - AUTO STARTING')
        play()
      }
      const handleError = (e: any) => {
        console.error('❌ AUDIO ERROR:', e)
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
      audio.addEventListener('canplay', handleCanPlay)
      audio.addEventListener('error', handleError)

      return () => {
        console.log('🧹 CLEANING UP AUDIO ELEMENT')
        audio.removeEventListener('loadedmetadata', handleMetadata)
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('pause', handlePause)
        audio.removeEventListener('ended', handleEnded)
        audio.removeEventListener('canplay', handleCanPlay)
        audio.removeEventListener('error', handleError)
        audio.pause()
        cleanupAudioAnalysis()
      }
    } else {
      setAudioElement(null)
      cleanupAudioAnalysis()
    }
  }, [audioSrc, play, cleanupAudioAnalysis])

  // Auto color cycling effect
  useEffect(() => {
    if (!controls.autoCycleColors) return

    const interval = setInterval(() => {
      const now = Date.now()
      const colorInterval = 8000

      if (now - lastColorChangeRef.current > colorInterval) {
        const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)]
        setControls(prev => ({
          ...prev,
          color1: randomPalette.color1,
          color2: randomPalette.color2,
          color3: randomPalette.color3,
        }))
        lastColorChangeRef.current = now
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [controls.autoCycleColors, colorPalettes])

  // File loading
  const loadAudioFile = useCallback((file: File) => {
    console.log('📁 LOADING AUDIO FILE:', { name: file.name, type: file.type, size: file.size })
    
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