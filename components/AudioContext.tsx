'use client'

import { createContext, useContext, useState, useRef, useCallback, useEffect, ReactNode } from 'react'

interface AudioData {
  audioData: Uint8Array | null
  frequencyData: {
    bass: number
    mid: number
    treble: number
    average: number
    peak: number
    waveform: Uint8Array | null
  } | null
  play: () => void
  pause: () => void
  setVolume: (volume: number) => void
  setTime: (time: number) => void
  isPlaying: boolean
  duration: number
  currentTime: number
  volume: number
  controls: any
  setControls: (controls: any) => void
  audioSrc: string
  setAudioSrc: (src: string) => void
  bgColor: string
  setBgColor: (color: string) => void
  setVisualizerColors: (colors: { color1: string, color2: string, color3: string }) => void
  isSidebarOpen: boolean
  toggleSidebar: () => void
  loadAudioFile: (file: File) => void
}

const AudioContext = createContext<AudioData | null>(null)

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [audioData, setAudioData] = useState<Uint8Array | null>(null)
  const [frequencyData, setFrequencyData] = useState<{
    bass: number
    mid: number
    treble: number
    average: number
    peak: number
    waveform: Uint8Array | null
  } | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [audioSrc, setAudioSrc] = useState('')
  const [bgColor, setBgColor] = useState('#000000')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const waveformArrayRef = useRef<Uint8Array | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  const [controls, setControls] = useState({
    // Core visualization parameters
    noiseScale: 1.5,    // Base noise scale
    noiseForce: 2.0,    // Base noise force
    goopiness: 1.0,     // Base goopiness
    color1: '#00f2ff',  // Primary color
    color2: '#ff00a8',  // Secondary color
    color3: '#7000ff',  // Accent color
    
    // Goop Character Controls
    complexity: 1.8,    // Affects overall noise complexity
    tension: 1.2,       // Affects spike sharpness
    turbulence: 0.8,    // Adds chaotic movement
    detail: 1.5,        // Affects fine detail level
    split: 0.7,         // Controls goop splitting
    
    // Audio reactivity
    bassReactivity: 2.0,
    midReactivity: 1.0,
    trebleReactivity: 0.5,
    
    // Visual Enhancements
    contrast: 1.15,
    grain: 0.08,
    bloom: 0.45,
    wireframe: false,
    showParticles: true,
    metallic: 0.5,      // Metallic surface effect
    glass: 0.3,         // Glass distortion effect
    
    // Shape
    shape: 'icosahedron',

    // Animation Controls
    sequenceSpeed: 1.0,
    autoCycleShapes: false,
    autoSequencing: false,
    autoRandomizeParams: false,
  })

  // Dynamic animation state
  const lastShapeChangeRef = useRef(0)
  const lastRandomizeRef = useRef(0)
  const lastSequenceRef = useRef(0)
  const baseParamsRef = useRef(controls)
  const currentSequenceRef = useRef(0)
  
  // Goop sequences with more dramatic variations
  const sequences = [
    { name: 'Virus Spikes', noiseForce: 2.2, noiseScale: 3.0, split: 1.2, complexity: 2.0, tension: 1.8 },
    { name: 'Crystal Form', noiseForce: 1.8, noiseScale: 2.5, split: 0.8, complexity: 1.5, tension: 2.2 },
    { name: 'Liquid Metal', noiseForce: 1.5, noiseScale: 1.8, split: 0.5, complexity: 1.2, metallic: 0.8 },
    { name: 'Glass Morph', noiseForce: 1.2, noiseScale: 2.0, split: 0.3, glass: 0.8, tension: 1.5 },
    { name: 'Chaos Spikes', noiseForce: 2.5, noiseScale: 3.5, split: 1.5, turbulence: 1.2, tension: 2.5 },
    { name: 'Smooth Flow', noiseForce: 1.0, noiseScale: 1.2, split: 0.2, complexity: 0.8, tension: 0.8 },
  ]

  const shapes = ['icosahedron', 'sphere', 'cube', 'torus']

  const setupAudioContext = useCallback(async () => {
    if (audioRef.current && !analyserRef.current) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        audioContextRef.current = audioContext
        
        if (audioContext.state === 'suspended') {
          await audioContext.resume()
        }
        
        const source = audioContext.createMediaElementSource(audioRef.current)
        const analyser = audioContext.createAnalyser()
        
        // Enhanced analyzer settings for better frequency resolution
        analyser.fftSize = 2048 // Increased from 512 for better resolution
        analyser.smoothingTimeConstant = 0.6 // Reduced for more responsive analysis
        
        source.connect(analyser)
        analyser.connect(audioContext.destination)
        
        analyserRef.current = analyser
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)
        waveformArrayRef.current = new Uint8Array(analyser.fftSize)
        
        console.log('Enhanced audio context setup complete')
      } catch (error) {
        console.error('Error setting up audio context:', error)
      }
    }
  }, [])

  useEffect(() => {
    if (audioSrc) {
      // Pause and cleanup previous audio if it exists
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current.load()
      }
      analyserRef.current = null; // Reset analyser

      audioRef.current = new Audio(audioSrc)
      audioRef.current.crossOrigin = 'anonymous'
      
      const audio = audioRef.current
      
      const handleMetadata = () => {
        setDuration(audio.duration)
        console.log('Audio loaded, duration:', audio.duration)
      }
      const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)
      const handleEnded = () => setIsPlaying(false)
      const handleCanPlay = () => {
        console.log('Audio can play')
        setupAudioContext()
      }

      audio.addEventListener('loadedmetadata', handleMetadata)
      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('play', handlePlay)
      audio.addEventListener('pause', handlePause)
      audio.addEventListener('ended', handleEnded)
      audio.addEventListener('canplay', handleCanPlay)

      return () => {
        audio.removeEventListener('loadedmetadata', handleMetadata)
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('pause', handlePause)
        audio.removeEventListener('ended', handleEnded)
        audio.removeEventListener('canplay', handleCanPlay)
        
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }
  }, [audioSrc, setupAudioContext])
  
  const animate = useCallback(() => {
    if (analyserRef.current && dataArrayRef.current && waveformArrayRef.current && isPlaying) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current)
      analyserRef.current.getByteTimeDomainData(waveformArrayRef.current)
      
      const bufferLength = dataArrayRef.current.length
      const bassEnd = Math.floor(bufferLength * 0.15)    // More bass range
      const midEnd = Math.floor(bufferLength * 0.5)      // Mids
      const trebleEnd = bufferLength                     // Treble
      
      let bassSum = 0, midSum = 0, trebleSum = 0
      
      // Enhanced bass detection
      for (let i = 0; i < bassEnd; i++) {
        const value = dataArrayRef.current[i]
        bassSum += value * value * 1.5  // Square for more dramatic response
      }
      
      // Mid frequencies
      for (let i = bassEnd; i < midEnd; i++) {
        const value = dataArrayRef.current[i]
        midSum += value * value
      }
      
      // High frequencies
      for (let i = midEnd; i < trebleEnd; i++) {
        const value = dataArrayRef.current[i]
        trebleSum += value * value * 0.8  // Slightly reduce treble influence
      }
      
      // Normalize and apply reactivity settings
      const bass = Math.min(1.0, Math.sqrt(bassSum / bassEnd) / 128 * controls.bassReactivity)
      const mid = Math.min(1.0, Math.sqrt(midSum / (midEnd - bassEnd)) / 128 * controls.midReactivity)
      const treble = Math.min(1.0, Math.sqrt(trebleSum / (trebleEnd - midEnd)) / 128 * controls.trebleReactivity)
      
      setFrequencyData({
        bass,
        mid,
        treble,
        average: (bass + mid + treble) / 3,
        peak: Math.max(bass, mid, treble),
        waveform: new Uint8Array(waveformArrayRef.current)
      })
    }
    
    animationFrameRef.current = requestAnimationFrame(animate)
  }, [isPlaying, controls])

  useEffect(() => {
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(animate)
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, animate])

  // Dynamic animation system
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      const now = Date.now()
      const sequenceInterval = (8000 / controls.sequenceSpeed)
      const shapeInterval = 15000
      const randomizeInterval = 12000

      if (controls.autoCycleShapes && now - lastShapeChangeRef.current > shapeInterval) {
        const currentShapeIndex = shapes.indexOf(controls.shape)
        const nextShapeIndex = (currentShapeIndex + 1) % shapes.length
        setControls(prev => ({ ...prev, shape: shapes[nextShapeIndex] }))
        lastShapeChangeRef.current = now
      }

      if (controls.autoSequencing && now - lastSequenceRef.current > sequenceInterval) {
        const sequence = sequences[Math.floor(Math.random() * sequences.length)]
        
        setControls(prev => ({
          ...prev,
          noiseForce: sequence.noiseForce,
          noiseScale: sequence.noiseScale,
          split: sequence.split || prev.split,
          complexity: sequence.complexity || prev.complexity,
          tension: sequence.tension || prev.tension,
          turbulence: sequence.turbulence || prev.turbulence,
          metallic: sequence.metallic || prev.metallic,
          glass: sequence.glass || prev.glass,
        }))
        
        lastSequenceRef.current = now
      }

      if (controls.autoRandomizeParams && now - lastRandomizeRef.current > randomizeInterval) {
        setControls(prev => ({
          ...prev,
          detail: 0.8 + Math.random() * 1.4,
          turbulence: 0.5 + Math.random() * 1.0,
        }))
        lastRandomizeRef.current = now
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, controls])

  // Store base parameters when user manually changes them
  useEffect(() => {
    if (!isPlaying) {
      baseParamsRef.current = controls
    }
  }, [controls, isPlaying])

  const play = async () => {
    if (audioRef.current) {
      try {
        if (!analyserRef.current) {
          await setupAudioContext()
        }
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.error('Error playing audio:', error)
      }
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const setAudioVolume = (vol: number) => {
    if (audioRef.current) {
      audioRef.current.volume = vol
      setVolume(vol)
    }
  }

  const setAudioTime = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const setVisualizerColors = (colors: { color1: string, color2: string, color3: string }) => {
    setControls((prev) => ({ ...prev, ...colors }))
  }

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)

  const loadAudioFile = (file: File) => {
    if (audioSrc) {
      URL.revokeObjectURL(audioSrc)
    }
    setAudioSrc(URL.createObjectURL(file))
  }


  const value = {
    audioData,
    frequencyData,
    play,
    pause,
    setVolume: setAudioVolume,
    setTime: setAudioTime,
    isPlaying,
    duration,
    currentTime,
    volume,
    controls,
    setControls,
    audioSrc,
    setAudioSrc,
    bgColor,
    setBgColor,
    setVisualizerColors,
    isSidebarOpen,
    toggleSidebar,
    loadAudioFile,
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