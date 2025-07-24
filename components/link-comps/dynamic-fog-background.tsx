'use client'

import { useRef, useEffect, useState } from 'react'

interface FogParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  life: number
  maxLife: number
}

interface DynamicFogBackgroundProps {
  particleCount: number
  colors: string[]
  mouseInfluence: number
  viscosity: number
}

export function DynamicFogBackground({ 
  particleCount, 
  colors, 
  mouseInfluence, 
  viscosity 
}: DynamicFogBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<FogParticle[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Initialize particles
  useEffect(() => {
    const particles: FogParticle[] = []
    
    for (let i = 0; i < particleCount; i++) {
      const maxLife = 300 + Math.random() * 200
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 120 + 60,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.4 + 0.2,
        life: Math.random() * maxLife,
        maxLife
      })
    }
    
    particlesRef.current = particles
  }, [particleCount, colors])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const mouse = mouseRef.current
      const particles = particlesRef.current

      particles.forEach((particle, index) => {
        // Calculate distance to mouse
        const dx = particle.x - mouse.x
        const dy = particle.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Mouse repulsion effect (like oil moving away from water)
        if (distance < mouseInfluence) {
          const force = (mouseInfluence - distance) / mouseInfluence
          const angle = Math.atan2(dy, dx)
          const repulsionStrength = force * 3
          
          particle.vx += Math.cos(angle) * repulsionStrength * 0.02
          particle.vy += Math.sin(angle) * repulsionStrength * 0.02
        }

        // Gravity towards center (oil settling)
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const centerDx = centerX - particle.x
        const centerDy = centerY - particle.y
        const centerDistance = Math.sqrt(centerDx * centerDx + centerDy * centerDy)
        
        if (centerDistance > 0) {
          particle.vx += (centerDx / centerDistance) * 0.003
          particle.vy += (centerDy / centerDistance) * 0.003
        }

        // Viscosity (resistance)
        particle.vx *= viscosity
        particle.vy *= viscosity

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Boundary collision with soft bounce
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.3
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.3
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // Particle aging and regeneration
        particle.life++
        if (particle.life > particle.maxLife) {
          particle.life = 0
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          particle.vx = (Math.random() - 0.5) * 0.5
          particle.vy = (Math.random() - 0.5) * 0.5
          particle.color = colors[Math.floor(Math.random() * colors.length)]
        }

        // Opacity based on life and distance to mouse
        let opacity = particle.opacity * (1 - particle.life / particle.maxLife)
        if (distance < mouseInfluence) {
          opacity *= (distance / mouseInfluence) * 0.7 + 0.3
        }

        // Draw particle with gradient
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        )
        
        gradient.addColorStop(0, `${particle.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(0.7, `${particle.color}${Math.floor(opacity * 127).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(1, `${particle.color}00`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions, mouseInfluence, viscosity, colors])

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
} 