'use client'

import { AudioProvider, useAudio } from '../../components/Vis-Eden-Comp/AudioContext'
import { AudioVisualizer } from '../../components/Vis-Eden-Comp/AudioVisualizer'
import { ControlSidebar } from '../../components/Vis-Eden-Comp/ControlSidebar'
import { AudioBar } from '../../components/Vis-Eden-Comp/AudioBar'

function UploadButton() {
  const { loadAudioFile, audioSrc, play, pause, isPlaying } = useAudio()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      loadAudioFile(file)
    }
  }

  // Test audio generation
  const generateTestAudio = () => {
    console.log('🧪 Generating test audio...')
    
    // Create a simple test audio with bass frequencies
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const duration = 10 // 10 seconds
    const sampleRate = 44100
    const arrayBuffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
    const channelData = arrayBuffer.getChannelData(0)
    
    // Generate test signal with bass frequencies
    for (let i = 0; i < channelData.length; i++) {
      const time = i / sampleRate
      // Mix of bass frequencies that should trigger the visualizer
      const bass = Math.sin(2 * Math.PI * 60 * time) * 0.3  // 60Hz bass
      const kick = Math.sin(2 * Math.PI * 80 * time) * 0.4  // 80Hz kick
      const pulse = Math.sin(2 * Math.PI * 2 * time) > 0 ? 1 : 0 // 2Hz pulse
      channelData[i] = (bass + kick) * pulse * 0.5
    }
    
    // Convert to WAV blob
    const wavBuffer = audioBufferToWav(arrayBuffer)
    const blob = new Blob([wavBuffer], { type: 'audio/wav' })
    const url = URL.createObjectURL(blob)
    
    console.log('✅ Test audio generated, loading...')
    
    // Load the test audio
    if (audioSrc && audioSrc.startsWith('blob:')) {
      URL.revokeObjectURL(audioSrc)
    }
    
    // Create audio element manually for test
    const audio = new Audio(url)
    audio.crossOrigin = 'anonymous'
    loadAudioFile(new File([blob], 'test-audio.wav', { type: 'audio/wav' }))
  }

  return (
    <div className="absolute top-6 right-6 z-40 space-y-2">
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
      
      {/* Test Audio Button */}
      <button
        onClick={generateTestAudio}
        className="w-full px-6 py-3 bg-blue-800 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg border border-blue-600 flex items-center space-x-2"
      >
        <span>🧪</span>
        <span>Test Audio</span>
      </button>
      
      {/* Play/Pause for testing */}
      {audioSrc && (
        <button
          onClick={isPlaying ? pause : play}
          className="w-full px-6 py-3 bg-green-800 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg border border-green-600 flex items-center space-x-2"
        >
          <span>{isPlaying ? '⏸️' : '▶️'}</span>
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>
      )}
    </div>
  )
}



// Simple WAV encoder for test audio
function audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
  const length = buffer.length
  const arrayBuffer = new ArrayBuffer(44 + length * 2)
  const view = new DataView(arrayBuffer)
  const channelData = buffer.getChannelData(0)
  
  // WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
    }
  }
  
  writeString(0, 'RIFF')
  view.setUint32(4, 36 + length * 2, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, buffer.sampleRate, true)
  view.setUint32(28, buffer.sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeString(36, 'data')
  view.setUint32(40, length * 2, true)
  
  // Convert float samples to 16-bit PCM
  let offset = 44
  for (let i = 0; i < length; i++) {
    const sample = Math.max(-1, Math.min(1, channelData[i]))
    view.setInt16(offset, sample * 0x7FFF, true)
    offset += 2
  }
  
  return arrayBuffer
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