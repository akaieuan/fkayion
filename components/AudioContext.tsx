'use client'

import { createContext, useContext, useState, useRef, useCallback, useEffect, ReactNode, useMemo } from 'react'

interface AudioData {
  audioData: Uint8Array | null
  frequencyData: {
    bass: number
    mid: number
    treble: number
    average: number
    peak: number
    waveform: Uint8Array | null
    bassMax: number
    bassAvg: number
    trebleMax: number
    trebleAvg: number
  } | null
  play: () => void
  pause: () => void
  setVolume: (volume: number) => void
  setTime: (time: number) => void
  isPlaying: boolean
  duration: number
  currentTime: number
  volume: number
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

    // Audio reactivity
    bassReactivity: number
    midReactivity: number
    trebleReactivity: number
    
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
    
    // Modes
    wireframe: boolean
    dotMatrix: boolean
  }
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
    bassMax: number
    bassAvg: number
    trebleMax: number
    trebleAvg: number
  } | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [audioSrc, setAudioSrc] = useState('')
  const [bgColor, setBgColor] = useState('#000000')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const lastFrameTimeRef = useRef(0)

  // Helper function for audio processing
  const modulate = (val: number, minVal: number, maxVal: number, outMin: number, outMax: number) => {
    const fr = (val - minVal) / (maxVal - minVal)
    const delta = outMax - outMin
    return outMin + (fr * delta)
  }

  // Default controls that always exist
  const [controls, setControls] = useState({
    // Core shape & flow
    shape: 'icosahedron',
    noiseScale: 2.2,
    noiseForce: 3.5,
    
    // Deform effects
    goopiness: 1.5,
    liquidity: 2.0,
    split: 1.2,
    splitIntensity: 1.0,

    // Audio reactivity
    bassReactivity: 4.0,
    midReactivity: 2.5,
    trebleReactivity: 1.8,
    
    // Colors
    color1: '#00f2ff',
    color2: '#ff00a8',
    color3: '#7000ff',
    colorBlend: 1.0,
    autoCycleColors: false,

    // Surface & post-processing
    metallic: 0.6,
    glass: 0.5,
    contrast: 1.4,
    bloom: 0.3,
    grain: 0.12,
    grainSize: 10,
    
    // Modes
    wireframe: false,
    dotMatrix: false,
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
        
        analyser.fftSize = 512
        analyser.smoothingTimeConstant = 0.6
        
        source.connect(analyser)
        analyser.connect(audioContext.destination)
        
        analyserRef.current = analyser
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)
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

  // Audio loading
  useEffect(() => {
    if (audioSrc) {
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
      const handleCanPlay = () => play()
      const handleError = () => {
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
      }
    }
  }, [audioSrc, play])
  
  // Audio analysis loop
  const animate = useCallback(() => {
    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current)
      
      const bufferLength = dataArrayRef.current.length
      
      const bassRange = Math.floor(bufferLength * 0.1)
      const midRange = Math.floor(bufferLength * 0.4)
      const trebleRange = bufferLength - 1
      
      const bassArray = dataArrayRef.current.slice(0, bassRange)
      const midArray = dataArrayRef.current.slice(bassRange, midRange)
      const trebleArray = dataArrayRef.current.slice(midRange, trebleRange)
      
      const bassMax = bassArray.length > 0 ? Math.max(...bassArray) / 255 : 0
      const bassAvg = bassArray.length > 0 ? bassArray.reduce((sum, val) => sum + val, 0) / bassArray.length / 255 : 0
      const midMax = midArray.length > 0 ? Math.max(...midArray) / 255 : 0
      const midAvg = midArray.length > 0 ? midArray.reduce((sum, val) => sum + val, 0) / midArray.length / 255 : 0
      const trebleMax = trebleArray.length > 0 ? Math.max(...trebleArray) / 255 : 0
      const trebleAvg = trebleArray.length > 0 ? trebleArray.reduce((sum, val) => sum + val, 0) / trebleArray.length / 255 : 0
      
      const bassResponse = Math.pow(bassMax, 0.6) * controls.bassReactivity * 1.5
      const midResponse = Math.pow(midAvg, 0.7) * controls.midReactivity * 1.2
      const trebleResponse = Math.pow(trebleMax, 0.8) * controls.trebleReactivity * 1.1
      
      const modulatedBass = modulate(bassResponse, 0, 1, 0, 1.5)
      const modulatedMid = modulate(midResponse, 0, 1, 0, 1.2)
      const modulatedTreble = modulate(trebleResponse, 0, 1, 0, 1.1)
      
      const overallMax = Math.max(bassMax, midMax, trebleMax)
      const overallAvg = (bassAvg + midAvg + trebleAvg) / 3
      const peak = Math.max(modulatedBass, modulatedMid, modulatedTreble)
      
      setFrequencyData({
        bass: modulatedBass,
        mid: modulatedMid, 
        treble: modulatedTreble,
        average: overallAvg,
        peak: peak,
        waveform: null,
        bassMax: bassMax * 1.8,
        bassAvg: bassAvg * 1.4,
        trebleMax: trebleMax * 1.6,
        trebleAvg: trebleAvg * 1.2,
      })
    }
  }, [controls.bassReactivity, controls.midReactivity, controls.trebleReactivity])

  useEffect(() => {
    const loop = (timestamp: number) => {
      if (timestamp - lastFrameTimeRef.current >= 1000 / 60) {
        lastFrameTimeRef.current = timestamp
        animate()
      }
      animationFrameRef.current = requestAnimationFrame(loop)
    }

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(loop)
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, animate])

  // Auto color cycling
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
    if (audioRef.current) {
      audioRef.current.pause()
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close()
    }

    if (audioSrc && audioSrc.startsWith('blob:')) {
      URL.revokeObjectURL(audioSrc)
    }

    analyserRef.current = null
    audioContextRef.current = null
    audioRef.current = null
    
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    setFrequencyData(null)
    
    const newSrc = URL.createObjectURL(file)
    setAudioSrc(newSrc)
  }, [audioSrc])

  const value: AudioData = {
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