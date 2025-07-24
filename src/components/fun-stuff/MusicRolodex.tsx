"use client"

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown, Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Sample data structure for the rolodex cards with enhanced details
type RolodexCard = {
  id: number
  title: string
  artist: string
  duration: string
  coverImage: string
  platform: 'spotify' | 'soundcloud'
}

const sampleCards: RolodexCard[] = [
  { 
    id: 1, 
    title: 'Girls Just Want Breaks', 
    artist: 'yion', 
    duration: '3:42',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b2731d5dee7d5f6a93c96587a9a8',
    platform: 'spotify'
  },
  { 
    id: 2, 
    title: 'visualizer.eden', 
    artist: 'yion', 
    duration: '4:16',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273dcf968462d04d0aeeffa48ec',
    platform: 'spotify'
  },
  { 
    id: 3, 
    title: 'v0013', 
    artist: 'yion', 
    duration: '2:58',
    coverImage: 'https://i1.sndcdn.com/artworks-000612594417-z0pnli-t500x500.jpg',
    platform: 'soundcloud'
  },
  { 
    id: 4, 
    title: 'Inertia', 
    artist: 'yion', 
    duration: '3:25',
    coverImage: 'https://i1.sndcdn.com/artworks-000590017068-l6j93o-t500x500.jpg',
    platform: 'soundcloud'
  },
  { 
    id: 5, 
    title: 'Digital Rain', 
    artist: 'yion', 
    duration: '5:02',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b2731a97193aa48f70c654bd1931',
    platform: 'spotify'
  },
  { 
    id: 6, 
    title: 'New Track', 
    artist: 'aka[ieuan]', 
    duration: '4:30',
    coverImage: 'https://i1.sndcdn.com/artworks-zCy7DF5SKM4WwzKv-1SvkXw-t500x500.jpg',
    platform: 'soundcloud'
  },
]

export function MusicRolodex() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)
  
  const nextCard = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => 
      prevIndex === sampleCards.length - 1 ? 0 : prevIndex + 1
    )
    resetPlayback()
  }

  const prevCard = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? sampleCards.length - 1 : prevIndex - 1
    )
    resetPlayback()
  }

  const togglePlayback = () => {
    if (isPlaying) {
      // Pause
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
        progressInterval.current = null
      }
    } else {
      // Play
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval.current as NodeJS.Timeout)
            setIsPlaying(false)
            return 0
          }
          return prev + 0.5
        })
      }, 100)
    }
    setIsPlaying(!isPlaying)
  }

  const resetPlayback = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
      progressInterval.current = null
    }
    setIsPlaying(false)
    setProgress(0)
  }

  // Get the current card
  const currentCard = sampleCards[currentIndex]
  
  // Define our theme colors based on platform
  const getThemeColors = (platform: 'spotify' | 'soundcloud') => {
    return platform === 'spotify' 
      ? {
          bg: 'bg-[#191414]', 
          text: 'text-white',
          accent: 'bg-[#1DB954]',
          accentText: 'text-[#1DB954]',
          progressBg: 'bg-[#535353]'
        }
      : {
          bg: 'bg-[#111]', 
          text: 'text-white',
          accent: 'bg-[#FF5500]',
          accentText: 'text-[#FF5500]',
          progressBg: 'bg-[#333]'
        }
  }

  const themeColors = getThemeColors(currentCard.platform)
  
  return (
    <div className="w-full max-w-3xl mx-auto py-6">
      <div className="relative flex">
        {/* Rolodex container */}
        <div className="relative w-full h-[240px] md:h-[280px] perspective-[1500px]">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={currentCard.id}
              custom={direction}
              initial={{ 
                rotateX: direction > 0 ? 90 : -90,
                y: direction > 0 ? 20 : -20,
                opacity: 0
              }}
              animate={{ 
                rotateX: 0, 
                y: 0, 
                opacity: 1,
                transition: { duration: 0.5 }
              }}
              exit={{ 
                rotateX: direction > 0 ? -90 : 90,
                y: direction > 0 ? -20 : 20,
                opacity: 0,
                transition: { duration: 0.3 }
              }}
              style={{
                transformOrigin: direction > 0 ? 'bottom' : 'top',
              }}
              className={`absolute inset-0 rounded-lg shadow-lg overflow-hidden ${themeColors.bg} ${themeColors.text} transform-style-3d`}
            >
              <div className="h-full flex flex-col p-4">
                {/* Platform logo */}
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xs opacity-70">
                    Playing from {currentCard.platform === 'spotify' ? 'Spotify' : 'SoundCloud'}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{currentIndex + 1}/{sampleCards.length}</span>
                  </div>
                </div>
                
                {/* Main content */}
                <div className="flex-1 flex items-center">
                  {/* Album art */}
                  <div className="w-24 h-24 md:w-32 md:h-32 mr-4 rounded overflow-hidden flex-shrink-0 shadow-md">
                    <img 
                      src={currentCard.coverImage} 
                      alt={`${currentCard.title} cover`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Track info */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold mb-1 line-clamp-2">{currentCard.title}</h3>
                    <p className="text-sm md:text-base opacity-80 mb-3">{currentCard.artist}</p>
                    
                    {/* Playback controls */}
                    <button 
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${themeColors.accent} text-black`}
                      onClick={togglePlayback}
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6 ml-1" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="mt-auto">
                  <div className={`h-1 w-full rounded ${themeColors.progressBg}`}>
                    <div 
                      className={`h-full rounded ${themeColors.accent} transition-all duration-100`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1 opacity-70">
                    <div>{formatTime(progress, currentCard.duration)}</div>
                    <div>{currentCard.duration}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full" 
          onClick={prevCard}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full" 
          onClick={nextCard}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Helper function to format the time based on progress percentage
function formatTime(progress: number, totalDuration: string): string {
  // Parse the total duration (e.g., "3:42" to seconds)
  const [minutes, seconds] = totalDuration.split(':').map(Number)
  const totalSeconds = minutes * 60 + seconds
  
  // Calculate current time based on progress percentage
  const currentSeconds = Math.floor(totalSeconds * (progress / 100))
  const currentMinutes = Math.floor(currentSeconds / 60)
  const remainingSeconds = currentSeconds % 60
  
  return `${currentMinutes}:${remainingSeconds.toString().padStart(2, '0')}`
} 