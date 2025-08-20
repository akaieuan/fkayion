'use client'

import { AudioProvider, useAudio } from '../../components/Vis-Eden-Comp/AudioContext'
import { AudioVisualizer } from '../../components/Vis-Eden-Comp/AudioVisualizer'
import { ControlDrawer } from '../../components/Vis-Eden-Comp/ControlDrawer'
import { AudioBar } from '../../components/Vis-Eden-Comp/AudioBar'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

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