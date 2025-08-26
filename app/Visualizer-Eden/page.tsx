'use client'

import { AudioProvider, useAudio } from '../../components/Vis-Eden-Comp/AudioContext'
import { AudioVisualizer } from '../../components/Vis-Eden-Comp/AudioVisualizer'
import { ControlDrawer } from '../../components/Vis-Eden-Comp/ControlDrawer'
import { AudioBar } from '../../components/Vis-Eden-Comp/AudioBar'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { useState } from 'react'

// Demo songs data with unique visualizer presets
const demoSongs = [
  {
    id: 'demo1',
    title: 'sounds of scripture',
    artist: 'Demo Track',
    url: '/demo-audio/sounds of scripture.wav',
    preset: {
      // Dark Scripture Theme
      audioReactivity: 15.0, // Max reactivity
      shape: 'sphere', // Starting shape
      metallic: 0.1, // Minimal metallic
      chrome: 0.05, // Minimal chrome
      pearl: 0.3,
      glass: 0.2,
      goopiness: 4.6,
      liquidity: 3.2,
      split: 3.6,
      density: 0.7,
      viscosity: 1.8,
      surfaceTension: 2.0,
      puddleSpread: 2.1,
      rotationSpeed: 2.0,
      brightness: 2.2, // Darker
      contrast: 0.5, // Deep contrast
      bloom: 0.15,
      grain: 0.25, // Harsh film grain
      grainSize: 1.8,
      // Auto cycling enabled
      autoColorCycle: true,
      autoShapeCycle: true,
      colorCycleSpeed: 20, // 20 seconds
      shapeCycleSpeed: 30, // 30 seconds
      color1: '#1a237e', // Deep blue
      color2: '#4a148c', // Deep purple  
      color3: '#b71c1c', // Deep red
      color4: '#1b5e20'  // Deep green
    }
  },
  {
    id: 'demo2', 
    title: 'Sounds Before a Moment of Regret',
    artist: 'Demo Track',
    url: '/demo-audio/Sounds Before a Moment of Regret.wav',
    preset: {
      // Regret Emotional Theme
      audioReactivity: 15.0, // Max reactivity
      shape: 'cube', // Different starting shape
      metallic: 0.6, // Minimal metallic
      chrome: 0.03, // Minimal chrome
      holographic: 0.2,
      roughness: 0.9,
      goopiness: 4.0,
      liquidity: 4.8,
      split: 3.2,
      splitIntensity: 2.0,
      viscosity: 0.6,
      density: 0.80,
      brightness: 0.3, // Darker
      contrast: 0.5, // Deep contrast
      bloom: 0.00,
      grain: 0.30, // Harsh film grain
      grainSize: 2.1,
      // Auto cycling enabled
      autoColorCycle: true,
      autoShapeCycle: true,
      colorCycleSpeed: 20, // 20 seconds
      shapeCycleSpeed: 30, // 30 seconds
      color1: '#1c1c1c', // Dark reddish grey
      color2: '#4b5f62', // Muted teal grey
      color3: '#c26aa2', // Vibrant pink-purple
      color4: '#574849'  // Soft muted pink
    }
  },
  {
    id: 'demo3',
    title: 'the texture of skin',
    artist: 'Demo Track', 
    url: '/demo-audio/the texture of skin.wav',
    preset: {
      // Dark Organic Dot Matrix Theme (ONLY dot matrix song)
      audioReactivity: 15.0, // Max reactivity
      shape: 'cylinder', // Different starting shape
      dotMatrix: true, // ONLY this song has dot matrix
      metallic: 0.1, // Very low metallic
      chrome: 0.1, // Very low chrome
      pearl: 0.15,
      roughness: 0.8,
      goopiness: 2.8,
      liquidity: 4.2,
      elasticity: 2.2,
      surfaceTension: 1.8,
      brightness: 1.9, // Darker
      contrast: 0.5, // Deep contrast
      bloom: 0.10,
      grain: 0.30, // Harsh film grain
      grainSize: 3.0,
      dotSeparation: 1.2,
      // Auto cycling enabled
      autoColorCycle: true,
      autoShapeCycle: true,
      colorCycleSpeed: 20, // 20 seconds
      shapeCycleSpeed: 30, // 30 seconds
      color1: '#6a1b9a', // Dark purple
      color2: '#ad1457', // Dark pink
      color3: '#c62828', // Dark red
      color4: '#2e7d32'  // Dark green
    }
  },
  {
    id: 'demo4',
    title: 'seeingthroughu',
    artist: 'Demo Track',
    url: '/demo-audio/seeingthroughu.wav',
    preset: {
      // Dark Vision Theme (removed wireframe)
      audioReactivity: 15.0, // Max reactivity
      shape: 'cube ', // Different starting shape
      // No wireframe mode - normal rendering
      metallic: 0.2, // Minimal metallic
      chrome: 0.3, // Minimal chrome
      holographic: 0.3,
      glass: 0.25,
      goopiness: 4.5,
      liquidity: 5.2,
      viscosity: 3.8,
      density: 0.6,
      brightness: 0.3, // Darker
      contrast: 0.5, // Deep contrast
      bloom: 0.35,
      grain: 0.45, // Harsh film grain
      grainSize: 3.2,
      rotationSpeed: 4.5,
      dotSeparation: 0.3,
      surfaceTension: 2.8,
      surface: 35.0,
      flow: 35.0,
      rotation: 4.5,
      // Auto cycling enabled
      autoColorCycle: true,
      autoShapeCycle: true,
      colorCycleSpeed: 20, // 20 seconds
      shapeCycleSpeed: 30, // 30 seconds
      color1: '#0d47a1', // Deep blue
      color2: '#1a237e', // Deep indigo
      color3: '#4a148c', // Deep purple
      color4: '#006064'  // Deep cyan
    }
  }
]

function DemoSongSelector() {
  const { setAudioSrc, audioSrc, setControls } = useAudio()
  const [isOpen, setIsOpen] = useState(false)

  const handleDemoSelect = (song: typeof demoSongs[0]) => {
    // Set the audio source
    setAudioSrc(song.url)
    
    // Apply the song's unique preset
    setControls((prev: any) => ({
      ...prev,
      ...song.preset
    }))
    
    setIsOpen(false)
  }

  return (
    <div className="absolute top-16 right-4 z-40">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 px-3 text-xs bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white/80 hover:text-white border border-white/20 hover:border-white/30 rounded flex items-center gap-2"
      >
        Demo Songs
      </Button>
      
      {isOpen && (
        <div className="absolute top-10 right-0 w-72 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3 space-y-2">
          <div className="text-xs text-white/60 font-medium mb-2">Choose a demo song:</div>
          {demoSongs.map((song) => (
            <button
              key={song.id}
              onClick={() => handleDemoSelect(song)}
              className="w-full text-left p-2 bg-white/10 hover:bg-white/20 rounded text-xs text-white/80 hover:text-white transition-colors"
            >
              <div className="font-medium">{song.title}</div>
              <div className="text-white/50 text-[10px]">{song.artist}</div>
            </button>
          ))}
          <div className="text-[10px] text-white/40 pt-2 border-t border-white/10">
            Note: These are demo audio tracks. Upload your own music for the best experience!
          </div>
        </div>
      )}
    </div>
  )
}

function UploadButton() {
  const { loadAudioFile, audioSrc } = useAudio()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      loadAudioFile(file)
    }
  }

  return (
    <div className="absolute top-4 right-4 z-40">
      <div className="relative">
        <input 
          type="file" 
          accept="audio/*,audio/mpeg,audio/wav,audio/mp3,audio/ogg,audio/flac" 
          onChange={handleFileChange} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="audio-upload"
          multiple={false}
        />
        <Button 
          size="sm"
          variant="ghost"
          asChild
          className="h-8 px-3 text-xs bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white/80 hover:text-white border border-white/20 hover:border-white/30 rounded flex items-center gap-2"
        >
          <label htmlFor="audio-upload" className="cursor-pointer">
            <Upload className="h-3 w-3" />
            {audioSrc ? 'Audio Loaded' : 'Upload Audio File'}
          </label>
        </Button>
      </div>
    </div>
  )
}

function MainContent() {
  const { audioSrc, isPlaying } = useAudio()

  return (
    <div className="h-screen w-screen bg-black relative overflow-hidden">
      {/* Upload button */}
      <UploadButton />
      
      {/* Demo songs selector - positioned under upload button */}
      <DemoSongSelector />
      
      {/* Control drawer */}
      <ControlDrawer />
      
      {/* Main visualizer area */}
      <div className="absolute inset-0 flex flex-col">
        <div className="flex-1 relative">
          <AudioVisualizer />
        </div>
        
        {/* Audio bar at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <AudioBar />
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <AudioProvider>
      <MainContent />
    </AudioProvider>
  )
}