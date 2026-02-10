'use client'

import { useState } from 'react'

interface Release {
  title: string
  type: string
  url: string
  color: string
}

// Greenish-white hover color matching orb-3
const hoverColor = '#44ddaa'

const releaseSets: Release[][] = [
  [
    { title: 'Chaotic Networks', type: 'EP', url: 'https://soundcloud.com/akaieuan/sets/chaotic-networks-live', color: hoverColor },
    { title: 'Taiko446 - Diffuse Reality Records', type: 'EP', url: 'https://diffusereality.bandcamp.com/album/aka-ieuan-taiko446', color: hoverColor },
    { title: 'The Veil of Kobol', type: 'EP', url: 'https://soundcloud.com/akaieuan/sets/the-veil-of-kobol-live', color: hoverColor },
  ],
  [
    { title: 'The Pursuit of Parsimony', type: 'Writing', url: 'https://kraa.io/306857640304253952', color: hoverColor },
    { title: 'We Were Digitaly Shaped', type: 'Writing', url: 'https://kraa.io/306942411031387136', color: hoverColor },
    { title: 'All Roads Lead to Porn', type: 'Writing', url: 'https://kraa.io/306857605553134592', color: hoverColor },
  ],
  [
    { title: 'No Signal 078 (DJ Set)', type: 'Video', url: 'https://soundcloud.com/nosignalnyc/akaieuan-no-signal-078-nov-21-2025', color: hoverColor },
    { title: 'Techno INC Set', type: 'Video', url: 'https://www.youtube.com/watch?v=87kn2h5dQJk&list=RD87kn2h5dQJk&start_radio=1&t=1889s', color: hoverColor },
    { title: 'v0013 - video', type: 'Video', url: 'https://www.youtube.com/watch?v=HnsGJMUk8Pw', color: hoverColor },
  ],
  [
    { title: 'v0013 - yion', type: 'Single', url: 'https://akaieuan.bandcamp.com/track/v0013', color: hoverColor },
    { title: 'Visualizer Eden', type: 'Single', url: 'https://akaieuan.bandcamp.com/track/visualizer-eden', color: hoverColor },
    { title: 'Girls Just Want Breaks', type: 'Single', url: 'https://akaieuan.bandcamp.com/track/girls-just-want-breaks-yion-flip', color: hoverColor },    
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
        color: isHovered ? release.color : 'rgba(255,255,255,0.5)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translate3d(0, 0, 0)'
          : `translate3d(${translateX}px, 8px, 0)`,
        transition: isVisible
          ? `opacity 0.35s ease-out, transform 0.35s ease-out, color 0.25s ease-out`
          : `opacity 0.25s ease-in, transform 0.25s ease-in`,
        transitionDelay: isVisible ? `${index * 50}ms` : `${(2 - index) * 30}ms`,
        willChange: isVisible ? 'transform, opacity' : 'auto',
      }}
    >
      <span className="text-sm font-light tracking-wide">
        {release.title}
      </span>
      <span 
        className="text-xs ml-3 font-light"
        style={{
          color: isHovered ? 'rgba(68, 221, 170, 0.5)' : 'rgba(255,255,255,0.2)',
          transition: 'color 0.25s ease-out',
        }}
      >
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

