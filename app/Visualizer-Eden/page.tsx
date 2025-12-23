'use client'

import { AudioProvider, useAudio } from '../../components/Vis-Eden-Comp/AudioContext'
import { AudioVisualizer } from '../../components/Vis-Eden-Comp/AudioVisualizer'
import { ControlDrawer } from '../../components/Vis-Eden-Comp/ControlDrawer'
import { AudioBar } from '../../components/Vis-Eden-Comp/AudioBar'
import { Button } from '@/components/ui/button'
import { Upload, Music, Settings } from 'lucide-react'
import { useState } from 'react'

// Demo songs data with unique visualizer presets
const demoSongs = [
  {
    id: 'demo1',
    title: 'seeingthroughu',
    artist: 'Demo Track',
    url: '/demo-audio/seeingthroughu.wav',
    preset: {
      audioReactivity: 15.0,
      shape: 'cube ',
      metallic: 0.2,
      chrome: 0.3,
      holographic: 0.3,
      glass: 0.25,
      goopiness: 4.5,
      liquidity: 5.2,
      viscosity: 3.8,
      density: 0.6,
      brightness: 3.5,
      contrast: 0.7,
      brightness: 3.5, // Darker
      contrast: 0.7, // Deep contrast
      bloom: 0.35,
      grain: 0.45,
      grainSize: 3.2,
      rotationSpeed: 4.5,
      dotSeparation: 0.3,
      surfaceTension: 2.8,
      surface: 35.0,
      flow: 35.0,
      rotation: 4.5,
      autoColorCycle: true,
      autoShapeCycle: true,
      colorCycleSpeed: 20,
      shapeCycleSpeed: 30,
      color1: '#0d47a1',
      color2: '#1a237e',
      color3: '#4a148c',
      color4: '#006064'
    }
  }
]

function DemoSongSelector() {
  const { setAudioSrc, setControls } = useAudio()
  const [isOpen, setIsOpen] = useState(false)

  const handleDemoSelect = (song: typeof demoSongs[0]) => {
    setAudioSrc(song.url)
    setControls((prev: any) => ({
      ...prev,
      ...song.preset
    }))
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs text-white/50 hover:text-white/80 transition-colors duration-200"
      >
        Demo
      </button>
      
      {isOpen && (
        <div className="absolute top-8 right-0 w-56 bg-black/90 backdrop-blur-sm border border-white/10 rounded-lg p-3 space-y-2">
          <div className="text-xs text-white/40 mb-2">Demo songs:</div>
          {demoSongs.map((song) => (
            <button
              key={song.id}
              onClick={() => handleDemoSelect(song)}
              className="w-full text-left p-2 hover:bg-white/10 rounded text-xs text-white/70 hover:text-white transition-colors"
            >
              {song.title}
            </button>
          ))}
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
    <div className="relative">
      <input 
        type="file" 
        accept="audio/*" 
        onChange={handleFileChange} 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        id="audio-upload"
      />
      <label 
        htmlFor="audio-upload" 
        className="text-xs text-white/50 hover:text-white/80 transition-colors duration-200 cursor-pointer flex items-center gap-1"
      >
        <Upload className="h-3 w-3" />
        {audioSrc ? 'Loaded' : 'Upload'}
      </label>
    </div>
  )
}

function ControlsToggle() {
  const { toggleSidebar } = useAudio()
  
  return (
    <button
      onClick={toggleSidebar}
      className="text-xs text-white/50 hover:text-white/80 transition-colors duration-200 flex items-center gap-1"
    >
      <Settings className="h-3 w-3" />
      Controls
    </button>
  )
}

function MainContent() {
  return (
    <div className="h-screen w-screen bg-black relative overflow-hidden pt-14">
      {/* Toolbar - positioned under the main header */}
      <div className="fixed top-16 right-6 z-40 flex items-center gap-6">
        <UploadButton />
        <DemoSongSelector />
        <ControlsToggle />
      </div>
      
      {/* Control drawer */}
      <ControlDrawer />
      
      {/* Main visualizer area */}
      <div className="absolute top-14 left-0 right-0 bottom-0 flex flex-col">
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
