'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface PerformanceConfig {
  animationQuality: 'low' | 'medium' | 'high'
  maxConcurrentAnimations: number
  targetFPS: number
  enableDroplets: boolean
  shaderComplexity: number
  geometryDetail: number
}

interface PerformanceContextType {
  config: PerformanceConfig
  updateConfig: (newConfig: Partial<PerformanceConfig>) => void
  isPerformanceMode: boolean
  frameRate: number
}

const PerformanceContext = createContext<PerformanceContextType | null>(null)

export const PerformanceProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<PerformanceConfig>({
    animationQuality: 'high',
    maxConcurrentAnimations: 8,
    targetFPS: 60,
    enableDroplets: true,
    shaderComplexity: 1.0,
    geometryDetail: 1.0,
  })
  
  const [frameRate, setFrameRate] = useState(60)
  const [isPerformanceMode, setIsPerformanceMode] = useState(false)

  // Monitor frame rate and adjust quality
  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        setFrameRate(fps)
        frameCount = 0
        lastTime = currentTime

        // Auto-adjust quality based on performance
        if (fps < 30 && config.animationQuality === 'high') {
          setConfig(prev => ({
            ...prev,
            animationQuality: 'medium',
            enableDroplets: false,
            shaderComplexity: 0.7,
            geometryDetail: 0.8,
          }))
          setIsPerformanceMode(true)
        } else if (fps < 20 && config.animationQuality === 'medium') {
          setConfig(prev => ({
            ...prev,
            animationQuality: 'low',
            enableDroplets: false,
            shaderComplexity: 0.5,
            geometryDetail: 0.6,
          }))
          setIsPerformanceMode(true)
        } else if (fps > 50 && isPerformanceMode) {
          // Gradually restore quality if performance improves
          setConfig(prev => ({
            ...prev,
            animationQuality: 'medium',
            enableDroplets: true,
            shaderComplexity: 0.8,
            geometryDetail: 0.9,
          }))
          setIsPerformanceMode(false)
        }
      }
      
      animationId = requestAnimationFrame(measureFPS)
    }

    animationId = requestAnimationFrame(measureFPS)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [config.animationQuality, isPerformanceMode])

  const updateConfig = (newConfig: Partial<PerformanceConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }))
  }

  return (
    <PerformanceContext.Provider value={{
      config,
      updateConfig,
      isPerformanceMode,
      frameRate
    }}>
      {children}
    </PerformanceContext.Provider>
  )
}

export const usePerformance = () => {
  const context = useContext(PerformanceContext)
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider')
  }
  return context
} 