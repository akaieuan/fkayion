'use client'

import { AudioProvider, useAudio, AudioVisualizer, ControlDrawer, AudioBar } from '@/components/features/visualizer'
import { Upload, Music, Settings, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const demoSongs = [
  {
    id: 'demo1',
    title: 'seeingthroughu',
    artist: 'Demo Track',
    url: '/demo-audio/seeingthroughu.wav',
    preset: {
      audioReactivity: 15.0,
      shape: 'cube',
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
      bloom: 0.35,
      grain: 0.45,
      grainSize: 3.2,
      rotationSpeed: 4.5,
      dotSeparation: 0.3,
      surfaceTension: 2.8,
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

function Toolbar() {
  const { audioSrc, loadAudioFile, setAudioSrc, setControls, play, toggleSidebar, isSidebarOpen } = useAudio()
  const [showDemo, setShowDemo] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) loadAudioFile(file)
  }

  const handleDemoSelect = (song: typeof demoSongs[0]) => {
    setAudioSrc(song.url)
    setControls((prev: any) => ({ ...prev, ...song.preset }))
    setShowDemo(false)
    setTimeout(() => play(), 100)
  }

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1">
      {!audioSrc && (
        <>
          <label className="p-2.5 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 cursor-pointer transition-all group">
            <Upload className="h-4 w-4 text-white/50 group-hover:text-white/80 transition-colors" />
            <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" />
          </label>
          <div className="relative">
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="p-2.5 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all group"
            >
              <Music className="h-4 w-4 text-white/50 group-hover:text-white/80 transition-colors" />
            </button>
            {showDemo && (
              <div className="absolute bottom-11 left-1/2 -translate-x-1/2 w-36 bg-black/80 backdrop-blur-xl rounded-lg p-1 shadow-2xl border border-white/5">
                {demoSongs.map((song) => (
                  <button
                    key={song.id}
                    onClick={() => handleDemoSelect(song)}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-white/10 rounded text-xs text-white/60 hover:text-white/90 transition-colors"
                  >
                    {song.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
      <button
        onClick={toggleSidebar}
        className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
          isSidebarOpen ? 'bg-white/20 text-white' : 'bg-black/40 hover:bg-black/60 text-white/50 hover:text-white/80'
        }`}
        aria-label="Toggle controls"
      >
        <Settings className="h-4 w-4" />
      </button>
    </div>
  )
}

function MainContent() {
  return (
    <div className="fixed inset-0 bg-black">
      <div className="absolute inset-0">
        <AudioVisualizer />
      </div>

      <Link
        href="/demo"
        className="fixed top-4 left-4 z-50 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1.5 text-xs text-white/50 hover:text-white/80 hover:bg-black/60 transition-all"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Projects
      </Link>

      <Toolbar />
      <ControlDrawer />
      <AudioBar />
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
