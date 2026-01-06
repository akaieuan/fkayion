'use client'

import { useState } from 'react'

interface MusicRelease {
  title: string
  type: string
  url: string
  color: string
}

// Placeholder music releases - replace with actual data
const musicReleaseSets: MusicRelease[][] = [
  [
    { title: 'Track One', type: 'Single', url: '#', color: '#ff4422' },
    { title: 'Track Two', type: 'EP', url: '#', color: '#4488ff' },
    { title: 'Track Three', type: 'Album', url: '#', color: '#44ddaa' },
  ],
  [
    { title: 'Track Four', type: 'Single', url: '#', color: '#aa22ff' },
    { title: 'Track Five', type: 'Remix', url: '#', color: '#ff6b9d' },
    { title: 'Track Six', type: 'EP', url: '#', color: '#22aaff' },
  ],
  [
    { title: 'Track Seven', type: 'Single', url: '#', color: '#88ff22' },
    { title: 'Track Eight', type: 'Album', url: '#', color: '#ff2288' },
    { title: 'Track Nine', type: 'Collab', url: '#', color: '#ffaa22' },
  ],
]

function MusicLink({ release, isVisible }: { release: MusicRelease; isVisible: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={release.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`block py-3 pr-2 transition-all duration-500 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-4'
      }`}
      style={{
        color: isHovered ? release.color : 'rgba(255,255,255,0.6)',
        transitionDelay: isVisible ? '0ms' : '0ms',
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

export function MusicReleases() {
  const [currentSetIndex, setCurrentSetIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showingReleases, setShowingReleases] = useState(true)

  const currentReleases = musicReleaseSets[currentSetIndex]
  const hasMore = currentSetIndex < musicReleaseSets.length - 1
  const isAtStart = currentSetIndex === 0

  const handleShowMore = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setShowingReleases(false)
    
    // Wait for fade out, then change content and fade in
    setTimeout(() => {
      if (hasMore) {
        setCurrentSetIndex(prev => prev + 1)
      } else {
        setCurrentSetIndex(0) // Loop back to start
      }
      
      setTimeout(() => {
        setShowingReleases(true)
        setIsAnimating(false)
      }, 50)
    }, 300)
  }

  return (
    <div className="w-full">
      {/* Releases List - Fixed height container */}
      <div className="min-h-[140px] relative">
        <div className="space-y-0">
          {currentReleases.map((release, index) => (
            <div
              key={`${currentSetIndex}-${index}`}
              style={{
                transitionDelay: showingReleases ? `${index * 100}ms` : `${(2 - index) * 50}ms`,
              }}
            >
              <MusicLink 
                release={release} 
                isVisible={showingReleases}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Show More Button */}
      <button
        onClick={handleShowMore}
        disabled={isAnimating}
        className={`
          mt-4 text-xs font-light tracking-wide
          transition-all duration-300 ease-out
          ${isAnimating 
            ? 'text-white/20 cursor-wait' 
            : 'text-white/40 hover:text-white/70'
          }
        `}
      >
        {isAtStart ? 'show more' : hasMore ? 'show more' : 'back to start'} 
        <span className={`
          inline-block ml-1 transition-transform duration-300
          ${isAnimating ? 'rotate-180' : ''}
        `}>
          →
        </span>
      </button>

      {/* Page Indicators */}
      <div className="flex items-center gap-2 mt-4">
        {musicReleaseSets.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating || index === currentSetIndex) return
              setIsAnimating(true)
              setShowingReleases(false)
              setTimeout(() => {
                setCurrentSetIndex(index)
                setTimeout(() => {
                  setShowingReleases(true)
                  setIsAnimating(false)
                }, 50)
              }, 300)
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

