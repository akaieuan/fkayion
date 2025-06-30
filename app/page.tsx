'use client'

import { AudioProvider, useAudio } from '../components/AudioContext'
import { AudioVisualizer } from '../components/AudioVisualizer'
import { ControlSidebar } from '../components/ControlSidebar'
import { AudioBar } from '../components/AudioBar'

function UploadButton() {
  const { loadAudioFile, audioSrc } = useAudio()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      loadAudioFile(file)
    }
  }

  return (
    <div className="absolute top-6 right-6 z-40">
      <div className="relative">
        <input 
          type="file" 
          accept="audio/*,audio/mpeg,audio/wav,audio/mp3,audio/ogg,audio/flac" 
          onChange={handleFileChange} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="audio-upload"
          multiple={false}
        />
        <label 
          htmlFor="audio-upload"
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 hover:scale-105 shadow-lg border border-gray-600 flex items-center space-x-2"
        >
          <span>📁</span>
          <span>{audioSrc ? 'File Loaded' : 'Upload Audio'}</span>
        </label>
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
      
      {/* Control sidebar */}
      <ControlSidebar />
      
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