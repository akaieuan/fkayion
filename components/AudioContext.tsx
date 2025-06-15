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
    colorBlend: 0.5,    // Color blend speed
    
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
    grainSize: 5,
    bloom: 0,
    wireframe: false,
    dotMatrix: false,
    showParticles: true,
    metallic: 0,      // Metallic surface effect
    glass: 0.3,         // Glass distortion effect
    
    // Shape
    shape: 'sphere', // Changed default to sphere for better visibility
    
    // Animation Controls
    sequenceSpeed: 1.0,
    autoCycleShapes: true,
    autoSequencing: true,
    autoRandomizeParams: true,
    autoCycleColors: true,
  })

  // Dynamic animation state
  const lastShapeChangeRef = useRef(0)
  const lastRandomizeRef = useRef(0)
  const lastSequenceRef = useRef(0)
  const lastVisualEffectRef = useRef(0)
  const lastColorChangeRef = useRef(0)
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

  const colorPalettes = [
    { name: 'Neon Dreams', color1: '#ff71ce', color2: '#01cdfe', color3: '#05ffa1' },
    { name: 'Cosmic Flare', color1: '#f5d300', color2: '#ff225e', color3: '#6a0dad' },
    { name: 'Oceanic', color1: '#00c6ff', color2: '#0072ff', color3: '#fceabb' },
    { name: 'Sunset', color1: '#ff8c00', color2: '#ff0080', color3: '#4b0082' },
    { name: 'Forest Spirit', color1: '#a7ff83', color2: '#17bd9b', color3: '#027a74' },
    { name: 'Fire and Ice', color1: '#ff4b1f', color2: '#1fddff', color3: '#ffffff' },
  ];

  const shapes = ['icosahedron', 'sphere', 'cube', 'torus']

  const setupAudioContext = useCallback(async () => {
    if (audioRef.current && !analyserRef.current) {
      try {
        console.log('Setting up audio context...')
        const audioContext = audioContextRef.current || new (window.AudioContext || (window as any).webkitAudioContext)()
        audioContextRef.current = audioContext
        
        if (audioContext.state === 'suspended') {
          console.log('Audio context suspended, resuming...')
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
        
        console.log('Audio context setup complete', {
          state: audioContext.state,
          sampleRate: audioContext.sampleRate,
          fftSize: analyser.fftSize,
          frequencyBinCount: analyser.frequencyBinCount
        })
      } catch (error) {
        console.error('Error setting up audio context:', error)
      }
    }
  }, [])

  const play = useCallback(async () => {
    if (audioRef.current) {
      try {
        if (!analyserRef.current) {
          await setupAudioContext()
        }
        if (audioContextRef.current?.state === 'suspended') {
          await audioContextRef.current.resume()
        }
        await audioRef.current.play()
      } catch (error) {
        console.error('Error playing audio:', error)
        setIsPlaying(false)
      }
    }
  }, [setupAudioContext])

  useEffect(() => {
    if (audioSrc) {
      console.log('Audio source changed:', audioSrc)
      if (audioRef.current) {
        audioRef.current.pause()
      }
      
      const audio = new Audio(audioSrc)
      audio.crossOrigin = 'anonymous'
      audioRef.current = audio
      
      const handleMetadata = () => setDuration(audio.duration)
      const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)
      const handleEnded = () => setIsPlaying(false)
      
      const handleCanPlay = async () => {
        console.log('Audio can play, attempting to play')
        await play()
      }
      
      const handleError = (e: ErrorEvent) => {
        console.error('Audio error:', e)
        if (audioSrc.startsWith('blob:')) {
          URL.revokeObjectURL(audioSrc)
        }
        setAudioSrc('')
      }

      audio.addEventListener('loadedmetadata', handleMetadata)
      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('play', handlePlay)
      audio.addEventListener('pause', handlePause)
      audio.addEventListener('ended', handleEnded)
      audio.addEventListener('canplay', handleCanPlay)
      audio.addEventListener('error', handleError)

      return () => {
        audio.removeEventListener('loadedmetadata', handleMetadata)
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('pause', handlePause)
        audio.removeEventListener('ended', handleEnded)
        audio.removeEventListener('canplay', handleCanPlay)
        audio.removeEventListener('error', handleError)
        audio.pause()
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }
  }, [audioSrc, play])
  
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
      
      // Spike tension on bass
      if (baseParamsRef.current.tension) {
        const tensionMultiplier = 1.0 + bass * 1.5;
        setControls(prev => ({ ...prev, tension: baseParamsRef.current.tension * tensionMultiplier }));
      }
      
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

    const { autoCycleShapes, autoSequencing, autoRandomizeParams, sequenceSpeed, shape, autoCycleColors } = controls
    if (!autoCycleShapes && !autoSequencing && !autoRandomizeParams && !autoCycleColors) return

    const interval = setInterval(() => {
      const now = Date.now()

      if (autoCycleShapes) {
        const shapeInterval = 25000 // 25 seconds
        if (now - lastShapeChangeRef.current > shapeInterval) {
          const currentShapeIndex = shapes.indexOf(shape)
          const nextShapeIndex = (currentShapeIndex + 1) % shapes.length
          setControls(prev => ({ ...prev, shape: shapes[nextShapeIndex] }))
          lastShapeChangeRef.current = now
        }
      }

      if (autoCycleColors) {
        const colorInterval = 10000 // 10 seconds
        if (now - lastColorChangeRef.current > colorInterval) {
          const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)]
          setControls(prev => ({
            ...prev,
            color1: palette.color1,
            color2: palette.color2,
            color3: palette.color3,
          }))
          lastColorChangeRef.current = now
        }
      }

      if (autoSequencing) {
        const sequenceInterval = 8000 / sequenceSpeed
        const visualEffectInterval = 10000 + 5000 * Math.random() // 10-15 seconds

        if (now - lastSequenceRef.current > sequenceInterval) {
          const sequence = sequences[Math.floor(Math.random() * sequences.length)]
          
          setControls(prev => ({
            ...prev,
            noiseForce: sequence.noiseForce,
            noiseScale: sequence.noiseScale,
            split: sequence.split ?? prev.split,
            complexity: sequence.complexity ?? prev.complexity,
            tension: sequence.tension ?? prev.tension,
            turbulence: sequence.turbulence ?? prev.turbulence,
            metallic: sequence.metallic ?? prev.metallic,
            glass: sequence.glass ?? prev.glass,
          }))
          
          lastSequenceRef.current = now
        }
        
        if (now - lastVisualEffectRef.current > visualEffectInterval) {
          const effectType = Math.random();
          if (effectType < 0.33) {
            setControls(prev => ({ ...prev, wireframe: true, dotMatrix: false }));
          } else if (effectType < 0.66) {
            setControls(prev => ({ ...prev, wireframe: false, dotMatrix: true }));
          } else {
            setControls(prev => ({ ...prev, wireframe: false, dotMatrix: false }));
          }
          lastVisualEffectRef.current = now;
        }
      }

      if (autoRandomizeParams) {
        const randomizeInterval = 12000
        if (now - lastRandomizeRef.current > randomizeInterval) {
          setControls(prev => ({
            ...prev,
            detail: 0.8 + Math.random() * 1.4,
            turbulence: 0.5 + Math.random() * 1.0,
          }))
          lastRandomizeRef.current = now
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, controls.autoCycleShapes, controls.autoSequencing, controls.autoRandomizeParams, controls.sequenceSpeed, controls.shape, shapes, controls.autoCycleColors])

  // Store base parameters when user manually changes them
  useEffect(() => {
    if (!isPlaying) {
      baseParamsRef.current = controls
    }
  }, [controls, isPlaying])

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

  const loadAudioFile = useCallback((file: File) => {
    console.log('Loading audio file:', file.name)
    
    if (audioSrc && audioSrc.startsWith('blob:')) {
      console.log('Revoking previous audio URL')
      URL.revokeObjectURL(audioSrc)
    }

    // Reset state for new file
    if(audioRef.current) audioRef.current.pause();
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    setFrequencyData(null)
    
    const newSrc = URL.createObjectURL(file)
    console.log('Created new audio URL:', newSrc)
    setAudioSrc(newSrc)
  }, [audioSrc])


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