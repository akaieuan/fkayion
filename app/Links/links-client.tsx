'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { DynamicFogBackground } from '../../components/link-comps/dynamic-fog-background'
import { AnimatedLinkObject } from '../../components/link-comps/animated-link-object'
import { PerformanceProvider, usePerformance } from '../../components/link-comps/performance-controller'

// Types for server data
interface LinkData {
  label: string
  url: string
  color: string
  hoverColor: string
}

interface LayoutConfig {
  fog: {
    particleCount: number
    colors: string[]
    mouseInfluence: number
    viscosity: number
  }
  links: {
    containerWidth: string
    maxWidth: string
    gridCols: number
    spacing: string
    positions: { x: number, y: number }[]
  }
}

interface LinksClientProps {
  linksData: LinkData[]
  layoutConfig: LayoutConfig
}

// Removed RevealButton component - using simple top button instead

// Instructions component
function Instructions({ isRevealed }: { isRevealed: boolean }) {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-center">
      <p className="text-xs md:text-sm text-white/60">
        {isRevealed ? 'Click on any link to visit' : 'Click goopd to reveal all links'}
      </p>
    </div>
  )
}

// Performance indicator component
function PerformanceIndicator() {
  const { frameRate, isPerformanceMode, config } = usePerformance()
  
  return (
    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded text-xs font-mono">
      <div>FPS: {frameRate}</div>
      <div>Quality: {config.animationQuality}</div>
      {isPerformanceMode && <div className="text-yellow-400">⚡ Performance Mode</div>}
    </div>
  )
}

function LinksClientInner({ linksData, layoutConfig }: LinksClientProps) {
  const router = useRouter()
  const [isRevealed, setIsRevealed] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<number | null>(null)
  const [isDotMatrix, setIsDotMatrix] = useState(false)
  const [currentColors, setCurrentColors] = useState(linksData)
  const [fogColors, setFogColors] = useState(layoutConfig.fog.colors)
  const { config } = usePerformance()

  const toggleReveal = () => {
    setIsRevealed(!isRevealed)
  }

  const toggleDotMatrix = () => {
    console.log('Toggling dot matrix mode, current:', isDotMatrix) // Debug log
    setIsDotMatrix(!isDotMatrix)
  }

  // Helper function to convert HSL to hex
  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100
    const a = s * Math.min(l, 1 - l) / 100
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }

  const randomizeColors = () => {
    console.log('Randomizing colors...') // Debug log
    
    // Generate random colors for links
    const newColors = linksData.map(link => {
      const baseHue = Math.random() * 360
      const saturation = 70 + Math.random() * 30 // 70-100%
      const lightness = 45 + Math.random() * 20 // 45-65%
      const hoverLightness = Math.min(85, lightness + 20)
      
      const color = hslToHex(baseHue, saturation, lightness)
      const hoverColor = hslToHex(baseHue, saturation, hoverLightness)
      
      return {
        ...link,
        color,
        hoverColor
      }
    })
    setCurrentColors(newColors)

    // Generate random fog colors
    const newFogColors = Array.from({ length: 5 }, () => {
      const hue = Math.random() * 360
      const saturation = 40 + Math.random() * 40 // 40-80%
      const lightness = 15 + Math.random() * 25 // 15-40%
      return hslToHex(hue, saturation, lightness)
    })
    setFogColors(newFogColors)
    
    console.log('New colors:', newColors) // Debug log
    console.log('New fog colors:', newFogColors) // Debug log
  }

  return (
    <div className="relative w-full h-full" style={{ overflow: 'visible' }}>
      {/* Dynamic fog background (performance optimized) */}
      <DynamicFogBackground 
        particleCount={Math.floor(layoutConfig.fog.particleCount * config.geometryDetail)}
        colors={fogColors}
        mouseInfluence={layoutConfig.fog.mouseInfluence * config.shaderComplexity}
        viscosity={layoutConfig.fog.viscosity}
      />

      {/* Performance indicator */}
      <PerformanceIndicator />

      {/* Back button */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-6 left-6 z-30 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg transition-all duration-300 text-white text-sm"
      >
        ← Home
      </button>

      {/* Magnt button - left of goopd */}
      <button
        onClick={toggleDotMatrix}
        className={`absolute top-6 left-1/2 transform -translate-x-1/2 translate-x-[-120px] z-30 px-4 py-3 backdrop-blur-sm border rounded-lg transition-all duration-300 text-white text-sm font-medium ${
          isDotMatrix 
            ? 'bg-white/30 border-white/40 text-white' 
            : 'bg-white/10 hover:bg-white/20 border-white/20'
        }`}
      >
        magnt
      </button>

      {/* Top goopd button */}
      <button
        onClick={toggleReveal}
        className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30 px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg transition-all duration-300 text-white text-sm font-medium"
      >
        goopd
      </button>

      {/* Color swap button - right of goopd */}
      <button
        onClick={randomizeColors}
        className="absolute top-6 left-1/2 transform -translate-x-1/2 translate-x-[120px] z-30 px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg transition-all duration-300 text-white text-sm font-medium"
      >
        colrswap
      </button>

      {/* Instructions */}
      <Instructions isRevealed={isRevealed} />

      {/* Link objects container */}
      <div className="absolute inset-0 z-20" style={{ overflow: 'visible' }}>
        {currentColors.map((link, index) => (
          <AnimatedLinkObject
            key={`${link.label}-${link.color}-${index}`}
            label={link.label}
            url={link.url}
            color={link.color}
            hoverColor={link.hoverColor}
            position={layoutConfig.links.positions[index]}
            onHover={(hovered) => setHoveredLink(hovered ? index : null)}
            isHovered={isRevealed || hoveredLink === index}
            isDotMatrix={isDotMatrix}
          />
        ))}
      </div>

      {/* Subtle gradient overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(0,0,0,0.3) 100%)'
        }}
      />
    </div>
  )
}

export function LinksClient({ linksData, layoutConfig }: LinksClientProps) {
  return (
    <PerformanceProvider>
      <LinksClientInner linksData={linksData} layoutConfig={layoutConfig} />
    </PerformanceProvider>
  )
} 