'use client'

import { AudioProvider, useAudio, AudioVisualizer, ControlDrawer, AudioBar } from '@/components/features/visualizer'
import { Upload, Settings, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

function Toolbar() {
  const { audioSrc, loadAudioFile, toggleSidebar, isSidebarOpen } = useAudio()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) loadAudioFile(file)
  }

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1">
      {!audioSrc && (
        <label className="p-2.5 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 cursor-pointer transition-all group">
          <Upload className="h-4 w-4 text-white/50 group-hover:text-white/80 transition-colors" />
          <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" />
        </label>
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
