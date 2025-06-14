'use client'

import { AudioProvider, useAudio } from '../components/AudioContext'
import { AudioVisualizer } from '../components/AudioVisualizer'
import { ControlSidebar } from '../components/ControlSidebar'
import { AudioBar } from '../components/AudioBar'

function UploadButton() {
  const { loadAudioFile } = useAudio()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      loadAudioFile(file)
    }
  }

  return (
    <div className="absolute top-6 right-6 z-50">
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
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 hover:scale-105 shadow-lg border border-gray-600 flex items-center space-x-2"
        >
          <span>📁</span>
          <span>Upload Audio</span>
        </label>
      </div>
    </div>
  )
}

function MainContent() {
  return (
    <div className="flex flex-col h-screen w-screen bg-black">
      <div className="relative flex flex-1 min-h-0 min-w-0 overflow-hidden">
        <ControlSidebar />
        
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          <div className="relative flex-shrink-0 h-20">
            <UploadButton />
          </div>
          
          <div className="flex-1 flex items-center justify-center min-w-0 min-h-0 p-8">
            <div className="w-full max-w-[1800px] h-full">
              <AudioVisualizer />
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0">
        <AudioBar />
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