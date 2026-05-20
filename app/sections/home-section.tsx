'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useState, useCallback, useEffect, useSyncExternalStore } from 'react'
import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

// Each orb variant is its own webpack chunk. Only the active variant downloads.
const LiquidMorphOrb = dynamic(
  () => import('@/components/features/home/liquid-morph-orb').then(m => ({ default: m.LiquidMorphOrb })),
  { ssr: false }
)
const LiquidMorphTorus = dynamic(
  () => import('@/components/shared/orbs/liquid-morph-torus').then(m => ({ default: m.LiquidMorphTorus })),
  { ssr: false }
)
const MetallicMeltingTorus = dynamic(
  () => import('@/components/shared/orbs/metallic-melting-torus').then(m => ({ default: m.MetallicMeltingTorus })),
  { ssr: false }
)

type HomeOrbVariant = 0 | 1 | 2

const keyLinks = [
  { label: 'Ubik Studio', href: 'https://github.com/ubik-inc/ubik-electron' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ieuan-king/' },
  { label: 'aka.write', href: 'https://kraa.io/akaieuan' },
]

type TextSegment = { text: string; highlight?: boolean }

const line1: TextSegment[] = [
  { text: 'I build ' },
  { text: 'tools', highlight: true },
  { text: ' and create ' },
  { text: 'art', highlight: true },
  { text: '.' },
]

const line2: TextSegment[] = [
  { text: 'I am a ' },
  { text: 'digital anthropologist', highlight: true },
  { text: ' and ' },
  { text: 'front-end dev', highlight: true },
  { text: ' focusing on ' },
  { text: 'human-computer interaction', highlight: true },
  { text: ' and ' },
  { text: 'HITL-AI', highlight: true },
  { text: ' tools.' },
]

function AnimatedText({ segments, baseDelay }: { segments: TextSegment[]; baseDelay: number }) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set())

  useEffect(() => {
    let highlightIndex = 0
    const highlights = segments.map((s, i) => s.highlight ? i : -1).filter(i => i >= 0)

    const timers: ReturnType<typeof setTimeout>[] = []
    highlights.forEach((segIndex) => {
      const timer = setTimeout(() => {
        setRevealed(prev => new Set(prev).add(segIndex))
      }, baseDelay + highlightIndex * 220)
      timers.push(timer)
      highlightIndex++
    })

    return () => timers.forEach(clearTimeout)
  }, [segments, baseDelay])

  return (
    <>
      {segments.map((seg, i) => {
        if (!seg.highlight) return <span key={i}>{seg.text}</span>
        const isRevealed = revealed.has(i)
        return (
          <span
            key={i}
            className="inline-block relative transition-all duration-500 ease-out"
            style={{
              color: isRevealed ? 'oklch(0.707 0.108 152.216)' : undefined,
              opacity: isRevealed ? 1 : 0.4,
            }}
          >
            {seg.text}
            <span
              className="absolute bottom-0 left-0 h-[1.5px] transition-all duration-500 ease-out"
              style={{
                width: isRevealed ? '100%' : '0%',
                background: 'oklch(0.707 0.108 152.216 / 0.4)',
              }}
            />
          </span>
        )
      })}
    </>
  )
}

const ORB_POSITION: [number, number, number] = [3.2, 0, 0]
const ORB_SIZE = 1.0

const NARROW_MEDIA = '(max-width: 768px)'

function subscribeNarrow(cb: () => void) {
  const mq = window.matchMedia(NARROW_MEDIA)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

function getNarrowSnapshot() {
  return window.matchMedia(NARROW_MEDIA).matches
}

function getServerNarrow() {
  return false
}

export function HomeSection() {
  const narrowViewport = useSyncExternalStore(subscribeNarrow, getNarrowSnapshot, getServerNarrow)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [orbVariant, setOrbVariant] = useState<HomeOrbVariant>(0)

  const cycleOrb = useCallback(() => {
    setOrbVariant((prev) => (((prev + 1) % 3) as HomeOrbVariant))
  }, [])

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    setMousePos({ x, y })
  }, [])

  return (
    <section id="section-0" className="relative min-h-dvh w-full" onPointerMove={handlePointerMove}>
      <div className="absolute inset-0 max-md:pointer-events-none">
        <Canvas
          className="pointer-events-none touch-pan-y"
          camera={{ position: [0, 0, 10], fov: 45 }}
          style={{ width: '100%', height: '100%' }}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
          dpr={narrowViewport ? 1 : [1, 1.5]}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.15} />
          <pointLight position={[-4, 2, 4]} intensity={1.5} color="#44ddaa" distance={15} />
          <pointLight position={[4, -2, 4]} intensity={1} color="#228866" distance={15} />
          <pointLight position={[0, 3, 2]} intensity={0.8} color="#ffffff" distance={20} />
          {orbVariant === 0 && (
            <LiquidMorphOrb
              position={ORB_POSITION}
              colors={{ primary: '#228866', secondary: '#44ddaa', rim: '#66cc99' }}
              size={ORB_SIZE}
              onClick={() => {}}
              isHovered={true}
              onHover={() => {}}
              mousePos={mousePos}
              narrowViewport={narrowViewport}
            />
          )}
          {orbVariant === 1 && (
            <LiquidMorphTorus
              position={ORB_POSITION}
              color="#cc4422"
              hoverColor="#ff6644"
              onClick={() => {}}
              isHovered={true}
              onHover={() => {}}
              size={1.4}
              variant={0}
              narrowViewport={narrowViewport}
            />
          )}
          {orbVariant === 2 && (
            <MetallicMeltingTorus
              position={ORB_POSITION}
              color="#6644cc"
              hoverColor="#aa88ff"
              onClick={() => {}}
              isHovered={true}
              onHover={() => {}}
              size={1.5}
              variant={0}
              narrowViewport={narrowViewport}
            />
          )}
        </Canvas>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full flex items-center">
          <div className="pointer-events-auto site-inset max-w-site mx-auto w-full">
            <h1 className="text-lg sm:text-xl md:text-2xl font-light tracking-tight text-foreground/90 leading-[1.35] max-w-md">
              <AnimatedText segments={line1} baseDelay={400} />
            </h1>

            <p className="text-xs sm:text-sm text-foreground/50 mt-3 max-w-md font-light leading-relaxed">
              <AnimatedText segments={line2} baseDelay={1200} />
            </p>

            <p className="text-[11px] text-foreground/25 mt-2 font-light tracking-wide italic">
              {'// I also produce and perform electronic music'}
            </p>

            <div className="flex items-center gap-5 mt-6">
              {keyLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-light tracking-wide text-foreground/30 hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-4">
              <button
                type="button"
                onClick={cycleOrb}
                className="text-[10px] font-light tracking-widest uppercase text-foreground/15 hover:text-primary/60 transition-colors duration-300"
              >
                change orb ↻
              </button>
              <Link
                href="/demo"
                className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-light tracking-wide text-foreground/15 hover:text-primary/60 transition-colors duration-300"
              >
                see projects
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 opacity-70" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
