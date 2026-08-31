'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

// Chunk-split so the three.js payload only loads on this page.
const LiquidMorphOrb = dynamic(
  () => import('@/components/features/demo/three-examples/liquid-morph-orb').then(m => ({ default: m.LiquidMorphOrb })),
  { ssr: false }
)

/**
 * The liquid orb that used to live on the landing hero, kept as the live
 * specimen on the Three.js Examples write-up.
 *
 * Renders only while on screen; pointer-events stay off so it never eats
 * scroll (the canvas tracks the pointer from the wrapper instead). No ground
 * of its own: the write-up floats it on the page rather than framing it, and a
 * fill here would draw the frame back in.
 */
export function OrbHero() {
  const mousePosRef = useRef({ x: 0, y: 0 })
  const hostRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const [narrow, setNarrow] = useState(false)
  const [still, setStill] = useState(false)

  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /*
   * The orb carries its own narrow path: no transmission droplets, a softer
   * shader, half the motion. It has to be told when to take it, and the answer
   * is a viewport query rather than a constant.
   *
   * Read in an effect rather than during render. The server has no viewport,
   * so anything measured on the first pass is a hydration mismatch.
   */
  useEffect(() => {
    const query = window.matchMedia('(max-width: 640px)')
    const read = () => setNarrow(query.matches)
    read()
    query.addEventListener('change', read)
    return () => query.removeEventListener('change', read)
  }, [])

  /*
   * Reduced motion gets a still, not a paused loop: the frame loop runs long
   * enough to put the orb on screen and then stops, which is the plates' rule
   * applied to a scene that cannot draw itself without a frame.
   *
   * The wait is on the orb's own chunk rather than on a timer. It arrives
   * after the canvas, and stopping before it mounts would ship an empty frame.
   */
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let live = true
    import('@/components/features/demo/three-examples/liquid-morph-orb').then(() => {
      if (!live) return
      // One frame to mount the orb, the next to render it, then hold that.
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(() => setStill(true))
      })
    })
    return () => {
      live = false
      cancelAnimationFrame(raf)
    }
  }, [])

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    mousePosRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mousePosRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  }, [])

  return (
    <div
      ref={hostRef}
      onPointerMove={handlePointerMove}
      className="relative aspect-video w-full"
    >
      <Canvas
        className="pointer-events-none"
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
        dpr={[1, 2]}
        frameloop={inView && !still ? 'always' : 'never'}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[-4, 2, 4]} intensity={1.5} color="#44ddaa" distance={15} />
        <pointLight position={[4, -2, 4]} intensity={1} color="#228866" distance={15} />
        <pointLight position={[0, 3, 2]} intensity={0.8} color="#ffffff" distance={20} />
        <LiquidMorphOrb
          position={[0, 0, 0]}
          colors={{ primary: '#228866', secondary: '#44ddaa', rim: '#66cc99' }}
          size={1.35}
          onClick={() => {}}
          isHovered={true}
          onHover={() => {}}
          mousePosRef={mousePosRef}
          narrowViewport={narrow}
        />
      </Canvas>
    </div>
  )
}
