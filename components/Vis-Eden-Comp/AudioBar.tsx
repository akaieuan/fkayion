'use client'

import { useAudio } from './AudioContext'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Volume2, Play, Pause, Settings } from 'lucide-react'

export function AudioBar() {
  const { 
    isPlaying, play, pause, duration, currentTime, 
    setVolume, volume, setTime, audioSrc, toggleSidebar
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
    <div className="h-16 bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl p-3 flex items-center justify-center">
      <div className="w-full max-w-4xl flex items-center space-x-4">

        {/* Playback Control */}
        <Button
          size="sm"
          variant="ghost"
          onClick={isPlaying ? pause : play}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all duration-200"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        
        {/* Progress Bar & Time */}
        <div className="flex-1 flex items-center space-x-3">
          <span className="font-mono text-xs text-white/70 min-w-[3ch]">{formatTime(currentTime)}</span>
          <div className="w-full bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => setTime(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-transparent appearance-none cursor-pointer rounded-full
                [&::-webkit-slider-track]:bg-white/30 [&::-webkit-slider-track]:rounded-full [&::-webkit-slider-track]:h-1.5
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white/50
                [&::-moz-range-track]:bg-white/30 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:border-none
                [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer"
            />
          </div>
          <span className="font-mono text-xs text-white/70 min-w-[3ch]">{formatTime(duration)}</span>
        </div>

        <Separator orientation="vertical" className="h-6 bg-white/20" />

        {/* Volume Control */}
        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
          <Volume2 className="h-3 w-3 text-white/70" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 h-1.5 bg-transparent appearance-none cursor-pointer rounded-full
              [&::-webkit-slider-track]:bg-white/30 [&::-webkit-slider-track]:rounded-full [&::-webkit-slider-track]:h-1.5
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white/50
              [&::-moz-range-track]:bg-white/30 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:border-none
              [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer"
          />
          <span className="text-white/70 text-xs font-mono w-6 text-center">{Math.round(volume * 100)}</span>
        </div>

        {/* Controls Button - Only show when playing */}
        {isPlaying && (
          <>
            <Separator orientation="vertical" className="h-6 bg-white/20" />
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleSidebar}
              className="h-8 px-3 text-xs bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-200 flex items-center gap-1"
            >
              <Settings className="h-3 w-3" />
              Controls
            </Button>
          </>
        )}
      </div>
    </div>
  )
} 