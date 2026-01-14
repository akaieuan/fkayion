'use client'

import { useAudio } from './AudioContext'
import { Slider } from '@/components/ui/slider'
import { Volume2, VolumeX, Play, Pause } from 'lucide-react'
import { useState } from 'react'

export function AudioBar() {
  const { 
    isPlaying, play, pause, duration, currentTime, 
    setVolume, volume, setTime, audioSrc
  } = useAudio()
  const [showVolume, setShowVolume] = useState(false)

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  if (!audioSrc) return null

  return (
    <div className="fixed top-16 left-4 z-50">
      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-2xl border border-white/10">
        <button
          onClick={isPlaying ? pause : play}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
        >
          {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 ml-0.5" />}
        </button>
        
        <span className="text-[9px] text-white/40 font-mono">{formatTime(currentTime)}</span>
        <Slider
          value={[currentTime]}
          max={duration || 1}
          step={0.1}
          onValueChange={(vals) => setTime(vals[0])}
          className="w-24"
        />
        <span className="text-[9px] text-white/40 font-mono">{formatTime(duration)}</span>
        
        <div className="relative">
          <button
            onClick={() => setShowVolume(!showVolume)}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 text-white/40 transition-all"
          >
            {volume > 0 ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
          </button>
          {showVolume && (
            <div className="absolute top-8 left-0 w-28 p-2 rounded-lg bg-black/60 backdrop-blur-2xl border border-white/10">
              <Slider value={[volume]} max={1} step={0.01} onValueChange={(vals) => setVolume(vals[0])} />
              <div className="text-[8px] text-white/30 text-center mt-1">{Math.round(volume * 100)}%</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
