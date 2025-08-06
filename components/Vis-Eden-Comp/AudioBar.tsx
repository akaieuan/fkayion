'use client'

import { useAudio } from './AudioContext'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Volume2, Play, Pause } from 'lucide-react'

export function AudioBar() {
  const { 
    isPlaying, play, pause, duration, currentTime, 
    setVolume, volume, setTime, audioSrc
  } = useAudio()

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  // Hide the entire bar if no audio is loaded
  if (!audioSrc) {
    return null
  }

  return (
    <div className="h-28 bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl flex items-center space-x-6">

        {/* Playback Control */}
        <Button
          size="lg" 
          onClick={isPlaying ? pause : play}
          className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all duration-200"
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        
        {/* Progress Bar & Time */}
        <div className="flex-1 flex items-center space-x-4">
          <span className="font-mono text-sm text-white/70 min-w-[4ch]">{formatTime(currentTime)}</span>
          <div className="w-full bg-white/10 backdrop-blur-sm rounded-full p-1.5 border border-white/20">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => setTime(parseFloat(e.target.value))}
              className="w-full h-2 bg-transparent appearance-none cursor-pointer rounded-full
                [&::-webkit-slider-track]:bg-white/30 [&::-webkit-slider-track]:rounded-full [&::-webkit-slider-track]:h-2
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/50
                [&::-moz-range-track]:bg-white/30 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:h-2 [&::-moz-range-track]:border-none
                [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white/50"
            />
          </div>
          <span className="font-mono text-sm text-white/70 min-w-[4ch]">{formatTime(duration)}</span>
        </div>

        <Separator orientation="vertical" className="h-8 bg-white/20" />

        {/* Volume Control */}
        <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
          <Volume2 className="h-4 w-4 text-white/70" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 h-2 bg-transparent appearance-none cursor-pointer rounded-full
              [&::-webkit-slider-track]:bg-white/30 [&::-webkit-slider-track]:rounded-full [&::-webkit-slider-track]:h-2
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white/50
              [&::-moz-range-track]:bg-white/30 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:h-2 [&::-moz-range-track]:border-none
              [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer"
          />
          <span className="text-white/70 text-xs font-mono w-8 text-center">{Math.round(volume * 100)}%</span>
        </div>
      </div>
    </div>
  )
} 