'use client'

import { useState } from 'react'

interface Release {
  title: string
  type: string
  url: string
  color: string
}

const releaseSets: Release[][] = [
  [
    { title: 'Drones', type: 'Live', url: 'https://soundcloud.com/akaieuan/drones-live', color: '#ff5500' },
    { title: 'No Signal 078', type: 'Mix', url: 'https://soundcloud.com/nosignalnyc/akaieuan-no-signal-078-nov-21-2025', color: '#ff5500' },
    { title: 'The Veil of Kobol', type: 'Live Set', url: 'https://soundcloud.com/akaieuan/sets/the-veil-of-kobol-live', color: '#ff5500' },
  ],
  [
    { title: 'aka.write', type: 'Writing', url: 'https://kraa.io/306857605553134592', color: '#88ff22' },
    { title: 'aka.write', type: 'Writing', url: 'https://kraa.io/306857640304253952', color: '#88ff22' },
    { title: 'aka.write', type: 'Writing', url: 'https://kraa.io/306942411031387136', color: '#88ff22' },
  ],
  [
    { title: 'seeing through u', type: 'Album', url: 'https://open.spotify.com/album/19uv9QP4c3D0dT7NwF4eyn?si=z2MvutHpTz-9Dec1uM4wWQ', color: '#1DB954' },
    { title: 'seeing through u', type: 'Single', url: 'https://open.spotify.com/track/4NAHeLvdAZ4n3R2hU6VU6j?si=aed499186b8b4eba', color: '#1DB954' },
  ],
]

function ReleaseLink({ 
  release, 
  isVisible, 
  index 
}: { 
  release: Release
  isVisible: boolean
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Alternate direction for abstract staggered effect
  const direction = index % 2 === 0 ? -1 : 1
  const translateX = direction * 20 // slide from sides
  
  return (
    <a
      href={release.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="block py-3 pr-2"
      style={{
        color: isHovered ? release.color : 'rgba(255,255,255,0.6)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translate3d(0, 0, 0)'
          : `translate3d(${translateX}px, 8px, 0)`,
        transition: isVisible
          ? `opacity 0.35s ease-out, transform 0.35s ease-out`
          : `opacity 0.25s ease-in, transform 0.25s ease-in`,
        transitionDelay: isVisible ? `${index * 50}ms` : `${(2 - index) * 30}ms`,
        willChange: isVisible ? 'transform, opacity' : 'auto',
      }}
    >
      <span className="text-sm font-light tracking-wide">
        {release.title}
      </span>
      <span className="text-xs text-white/25 ml-3 font-light">
        {release.type}
      </span>
    </a>
  )
}

export function LatestReleases() {
  const [currentSetIndex, setCurrentSetIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showingReleases, setShowingReleases] = useState(true)

  const currentReleases = releaseSets[currentSetIndex]
  const hasMore = currentSetIndex < releaseSets.length - 1
  const isAtStart = currentSetIndex === 0

  const handleShowMore = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setShowingReleases(false)
    
    // Optimized timing - faster transitions
    requestAnimationFrame(() => {
      setTimeout(() => {
        if (hasMore) {
          setCurrentSetIndex(prev => prev + 1)
        } else {
          setCurrentSetIndex(0) // Loop back to start
        }
        
        requestAnimationFrame(() => {
          setShowingReleases(true)
          setTimeout(() => setIsAnimating(false), 350)
        })
      }, 250)
    })
  }

  return (
    <div className="w-full">
      {/* Releases List - Fixed height container */}
      <div className="min-h-[140px] relative overflow-hidden">
        <div className="space-y-0">
          {currentReleases.map((release, index) => (
            <ReleaseLink 
              key={`${currentSetIndex}-${index}`}
              release={release} 
              isVisible={showingReleases}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Show More Button */}
      <button
        onClick={handleShowMore}
        disabled={isAnimating}
        className={`
          mt-4 text-xs font-light tracking-wide
          transition-colors duration-200 ease-out
          ${isAnimating 
            ? 'text-white/20 cursor-wait' 
            : 'text-white/40 hover:text-white/70'
          }
        `}
      >
        {isAtStart ? 'show more' : hasMore ? 'show more' : 'back to start'} 
        <span 
          className="inline-block ml-1"
          style={{
            transform: isAnimating ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease-out',
            willChange: isAnimating ? 'transform' : 'auto',
          }}
        >
          →
        </span>
      </button>

      {/* Page Indicators */}
      <div className="flex items-center gap-2 mt-4">
        {releaseSets.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating || index === currentSetIndex) return
              setIsAnimating(true)
              setShowingReleases(false)
              requestAnimationFrame(() => {
                setTimeout(() => {
                  setCurrentSetIndex(index)
                  requestAnimationFrame(() => {
                    setShowingReleases(true)
                    setTimeout(() => setIsAnimating(false), 350)
                  })
                }, 250)
              })
            }}
            className={`
              w-1.5 h-1.5 rounded-full transition-all duration-300
              ${index === currentSetIndex 
                ? 'bg-white/60 scale-125' 
                : 'bg-white/20 hover:bg-white/40'
              }
            `}
          />
        ))}
      </div>
    </div>
  )
}

