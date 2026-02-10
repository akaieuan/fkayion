'use client'

import { useAudio } from './context/AudioContext'
import { useState, useRef, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { X, Minus, Plus, GripHorizontal } from 'lucide-react'

// Ultra-compact slider
function MiniSlider({ label, value, min, max, step, onChange }: {
  label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center gap-1.5 h-5">
      <span className="text-[9px] text-white/40 w-14 truncate">{label}</span>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v) => onChange(v[0])} className="flex-1" />
    </div>
  )
}

// Presets
const presets: Record<string, Record<string, any>> = {
  'Mercury': { metallic: 0.9, chrome: 0.3, goopiness: 2.5, color1: '#c0c0c0', color2: '#e6e6fa' },
  'Neon': { chrome: 0.8, holographic: 0.6, bloom: 0.4, color1: '#00ffff', color2: '#ff00ff' },
  'Organic': { glass: 0.7, pearl: 0.4, goopiness: 1.8, color1: '#87ceeb', color2: '#98fb98' },
  'Plasma': { holographic: 0.8, bloom: 0.6, audioReactivity: 12, color1: '#ff4500', color2: '#ff69b4' },
  'Cyber': { chrome: 0.6, metallic: 0.5, holographic: 0.4, color1: '#00ff88', color2: '#ff0088' },
  'Crystal': { glass: 0.9, pearl: 0.6, crystalline: 0.8, color1: '#88ffff', color2: '#ff88ff' },
}

export function ControlDrawer() {
  const { controls, setControls, isSidebarOpen, toggleSidebar } = useAudio()
  const [minimized, setMinimized] = useState(false)
  const [tab, setTab] = useState<'color' | 'surface' | 'physics' | 'mode'>('color')
  const [position, setPosition] = useState({ x: 16, y: 80 })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number } | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPosition({ x: window.innerWidth - 240, y: 80 })
    }
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragRef.current = { startX: e.clientX, startY: e.clientY, posX: position.x, posY: position.y }
  }

  useEffect(() => {
    if (!isDragging) return
    const move = (e: MouseEvent) => {
      if (!dragRef.current) return
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 220, dragRef.current.posX + e.clientX - dragRef.current.startX)),
        y: Math.max(0, Math.min(window.innerHeight - 100, dragRef.current.posY + e.clientY - dragRef.current.startY))
      })
    }
    const up = () => setIsDragging(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up) }
  }, [isDragging])

  const set = (k: string, v: any) => setControls((p: any) => ({ ...p, [k]: v }))

  // For bottom sheet slide-up animation on mount
  const [sheetMounted, setSheetMounted] = useState(false)
  useEffect(() => {
    if (isSidebarOpen) {
      const id = requestAnimationFrame(() => setSheetMounted(true))
      return () => cancelAnimationFrame(id)
    } else {
      setSheetMounted(false)
    }
  }, [isSidebarOpen])

  if (!isSidebarOpen) return null

  const panelContent = (
    <>
      <div className="flex items-center justify-between px-2 py-1.5 border-b border-white/5 md:cursor-move" onMouseDown={handleMouseDown}>
          <div className="flex items-center gap-1">
            <GripHorizontal className="h-2.5 w-2.5 text-white/20" />
            <span className="text-[10px] text-white/50">Controls</span>
          </div>
          <div className="flex items-center">
            <button onClick={() => setMinimized(!minimized)} className="p-1 hover:bg-white/10 rounded text-white/30 hover:text-white/60">
              {minimized ? <Plus className="h-2.5 w-2.5" /> : <Minus className="h-2.5 w-2.5" />}
            </button>
            <button onClick={toggleSidebar} className="p-1 hover:bg-white/10 rounded text-white/30 hover:text-white/60">
              <X className="h-2.5 w-2.5" />
            </button>
          </div>
        </div>

        {!minimized && (
          <>
            {/* Tabs */}
            <div className="flex border-b border-white/5">
              {(['color', 'surface', 'physics', 'mode'] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`flex-1 py-1 text-[8px] capitalize ${tab === t ? 'text-white/70 bg-white/5' : 'text-white/30 hover:text-white/50'}`}>
                  {t}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-2 space-y-1.5 max-h-[60vh] md:max-h-[50vh] overflow-y-auto">
              
              {/* COLOR TAB */}
              {tab === 'color' && (
                <>
                  <div className="flex gap-1 mb-2">
                    {['color1', 'color2', 'color3', 'color4'].map((c) => (
                      <input key={c} type="color" value={(controls as any)[c] || '#ffffff'} onChange={(e) => set(c, e.target.value)}
                        className="w-7 h-7 rounded cursor-pointer border border-white/10 bg-transparent" />
                    ))}
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-[9px] text-white/40">Auto Cycle</span>
                    <Switch checked={controls.autoColorCycle || false} onCheckedChange={(v) => set('autoColorCycle', v)} className="scale-75" />
                  </div>
                  <MiniSlider label="Brightness" value={controls.brightness ?? 0.85} min={0.3} max={3} step={0.1} onChange={(v) => set('brightness', v)} />
                  <MiniSlider label="Contrast" value={controls.contrast || 1.8} min={0.5} max={4} step={0.1} onChange={(v) => set('contrast', v)} />
                  <MiniSlider label="Bloom" value={controls.bloom || 0.15} min={0} max={1} step={0.01} onChange={(v) => set('bloom', v)} />
                  <MiniSlider label="Grain" value={controls.grain || 0.08} min={0} max={0.5} step={0.01} onChange={(v) => set('grain', v)} />
                  {/* Presets */}
                  <div className="pt-1.5 border-t border-white/5 grid grid-cols-3 gap-1">
                    {Object.keys(presets).map((n) => (
                      <button key={n} onClick={() => setControls((p: any) => ({ ...p, ...presets[n] }))}
                        className="px-1 py-1 text-[7px] text-white/40 hover:text-white/70 bg-white/[0.02] hover:bg-white/5 rounded border border-white/5">
                        {n}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* SURFACE TAB */}
              {tab === 'surface' && (
                <>
                  <div className="text-[8px] text-white/30 mb-1">MATERIAL</div>
                  <MiniSlider label="Metallic" value={controls.metallic || 0} min={0} max={1} step={0.05} onChange={(v) => set('metallic', v)} />
                  <MiniSlider label="Chrome" value={controls.chrome || 0} min={0} max={1} step={0.05} onChange={(v) => set('chrome', v)} />
                  <MiniSlider label="Glass" value={controls.glass || 0} min={0} max={1} step={0.05} onChange={(v) => set('glass', v)} />
                  <MiniSlider label="Pearl" value={controls.pearl || 0} min={0} max={1} step={0.05} onChange={(v) => set('pearl', v)} />
                  <MiniSlider label="Holographic" value={controls.holographic || 0} min={0} max={1} step={0.05} onChange={(v) => set('holographic', v)} />
                  <MiniSlider label="Roughness" value={controls.roughness || 0} min={0} max={1} step={0.05} onChange={(v) => set('roughness', v)} />
                  
                  <div className="text-[8px] text-white/30 mt-2 mb-1">EFFECTS</div>
                  <MiniSlider label="Crystalline" value={controls.crystalline || 0} min={0} max={1} step={0.05} onChange={(v) => set('crystalline', v)} />
                  <MiniSlider label="Melting" value={controls.melting || 0} min={0} max={1} step={0.05} onChange={(v) => set('melting', v)} />
                  <MiniSlider label="Plasma" value={controls.plasma || 0} min={0} max={1} step={0.05} onChange={(v) => set('plasma', v)} />
                  <MiniSlider label="Kaleidoscope" value={controls.kaleidoscope || 0} min={0} max={1} step={0.05} onChange={(v) => set('kaleidoscope', v)} />
                  
                  <div className="text-[8px] text-white/30 mt-2 mb-1">TRANSFORMS</div>
                  <MiniSlider label="Tentacle" value={controls.tentacleMode || 0} min={0} max={3} step={0.1} onChange={(v) => set('tentacleMode', v)} />
                  <MiniSlider label="Bubble" value={controls.bubbleMode || 0} min={0} max={3} step={0.1} onChange={(v) => set('bubbleMode', v)} />
                  <MiniSlider label="Spiral" value={controls.spiralMode || 0} min={0} max={3} step={0.1} onChange={(v) => set('spiralMode', v)} />
                  <MiniSlider label="Abstract" value={controls.abstractSplit || 0} min={0} max={3} step={0.1} onChange={(v) => set('abstractSplit', v)} />
                </>
              )}

              {/* PHYSICS TAB */}
              {tab === 'physics' && (
                <>
                  <div className="text-[8px] text-white/30 mb-1">LIQUID</div>
                  <MiniSlider label="Viscosity" value={controls.viscosity || 0.5} min={0.05} max={4} step={0.05} onChange={(v) => set('viscosity', v)} />
                  <MiniSlider label="Tension" value={controls.surfaceTension || 0.7} min={0.05} max={3} step={0.05} onChange={(v) => set('surfaceTension', v)} />
                  <MiniSlider label="Density" value={controls.density || 1} min={0.1} max={4} step={0.1} onChange={(v) => set('density', v)} />
                  <MiniSlider label="Elasticity" value={controls.elasticity || 0.5} min={0.05} max={2} step={0.05} onChange={(v) => set('elasticity', v)} />
                  
                  <div className="text-[8px] text-white/30 mt-2 mb-1">DEFORMATION</div>
                  <MiniSlider label="Goopiness" value={controls.goopiness || 1.5} min={0} max={5} step={0.1} onChange={(v) => set('goopiness', v)} />
                  <MiniSlider label="Liquidity" value={controls.liquidity || 2} min={0.5} max={6} step={0.1} onChange={(v) => set('liquidity', v)} />
                  <MiniSlider label="Split" value={controls.split || 0.8} min={0} max={5} step={0.1} onChange={(v) => set('split', v)} />
                  <MiniSlider label="SplitIntensity" value={controls.splitIntensity || 0} min={0} max={3} step={0.1} onChange={(v) => set('splitIntensity', v)} />
                  <MiniSlider label="Puddle" value={controls.puddleMode || 0} min={0} max={3} step={0.1} onChange={(v) => set('puddleMode', v)} />
                  
                  <div className="text-[8px] text-white/30 mt-2 mb-1">MOTION</div>
                  <MiniSlider label="AudioReact" value={controls.audioReactivity || 6} min={0} max={15} step={0.5} onChange={(v) => set('audioReactivity', v)} />
                  <MiniSlider label="Rotation" value={controls.rotationSpeed || 1} min={0} max={5} step={0.1} onChange={(v) => set('rotationSpeed', v)} />
                  <MiniSlider label="NoiseScale" value={controls.noiseScale || 2.2} min={0.5} max={5} step={0.1} onChange={(v) => set('noiseScale', v)} />
                  <MiniSlider label="NoiseForce" value={controls.noiseForce || 2} min={0.5} max={5} step={0.1} onChange={(v) => set('noiseForce', v)} />
                </>
              )}

              {/* MODE TAB */}
              {tab === 'mode' && (
                <>
                  {/* Shape selector */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[9px] text-white/40 w-14">Shape</span>
                    <select value={controls.shape} onChange={(e) => set('shape', e.target.value)}
                      className="flex-1 h-5 text-[9px] bg-white/5 border border-white/10 rounded px-1 text-white/70">
                      {['sphere', 'cube', 'torus', 'torusKnot', 'cylinder', 'cone', 'icosahedron', 'octahedron'].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Multi-blob */}
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-[9px] text-white/40">Blobs</span>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button key={n} onClick={() => set('blobCount', n)}
                          className={`w-5 h-5 text-[9px] rounded ${(controls.blobCount || 1) === n ? 'bg-white/20 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Glass overlay */}
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-[9px] text-white/40">Glass Blur</span>
                    <Switch checked={controls.glassOverlay || false} onCheckedChange={(v) => set('glassOverlay', v)} className="scale-75" />
                  </div>
                  {controls.glassOverlay && (
                    <MiniSlider label="Blur" value={controls.glassBlur || 0.5} min={0.1} max={1} step={0.05} onChange={(v) => set('glassBlur', v)} />
                  )}

                  {/* Dot Matrix */}
                  <div className="pt-1.5 border-t border-white/5">
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-[9px] text-white/40">Dot Matrix</span>
                      <Switch checked={controls.dotMatrix || false} onCheckedChange={(v) => set('dotMatrix', v)} className="scale-75" />
                    </div>
                    {controls.dotMatrix && (
                      <MiniSlider label="Separation" value={controls.dotSeparation || 1} min={0.5} max={3} step={0.1} onChange={(v) => set('dotSeparation', v)} />
                    )}
                  </div>

                  {/* Cellular Division Mode */}
                  <div className="pt-1.5 border-t border-white/5">
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-[9px] text-white/40">Cellular</span>
                      <Switch checked={controls.cellularMode || false} onCheckedChange={(v) => set('cellularMode', v)} className="scale-75" />
                    </div>
                    {controls.cellularMode && (
                      <div className="space-y-1.5 mt-1">
                        <MiniSlider label="Cells" value={controls.cellCount || 12} min={3} max={40} step={1} onChange={(v) => set('cellCount', v)} />
                        <MiniSlider label="Size" value={controls.cellSize || 1} min={0.3} max={2} step={0.1} onChange={(v) => set('cellSize', v)} />
                        <MiniSlider label="Division" value={controls.cellDivision || 0.5} min={0} max={3} step={0.1} onChange={(v) => set('cellDivision', v)} />
                        <MiniSlider label="Membrane" value={controls.cellMembrane || 0.5} min={0} max={1} step={0.05} onChange={(v) => set('cellMembrane', v)} />
                        <MiniSlider label="Organelles" value={controls.cellOrganelles || 0.3} min={0} max={1} step={0.05} onChange={(v) => set('cellOrganelles', v)} />
                        <div className="text-[7px] text-white/30 mt-1 italic">Physics tab affects cell behavior</div>
                      </div>
                    )}
                  </div>

                  {/* Particles / Strange Attractor */}
                  <div className="pt-1.5 border-t border-white/5">
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-[9px] text-white/40">Particles</span>
                      <Switch checked={controls.strangeAttractorMode || false} onCheckedChange={(v) => set('strangeAttractorMode', v)} className="scale-75" />
                    </div>
                    {controls.strangeAttractorMode && (
                      <div className="space-y-1.5 mt-1">
                        <div className="flex gap-1 mb-1">
                          {['color1', 'color2', 'color3', 'color4'].map((c) => (
                            <input key={c} type="color" value={(controls as any)[c] || '#ffffff'} onChange={(e) => set(c, e.target.value)}
                              className="w-6 h-6 rounded cursor-pointer border border-white/10 bg-transparent" />
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] text-white/40 w-14">Type</span>
                          <select value={controls.strangeAttractorType || 'thomas'} onChange={(e) => set('strangeAttractorType', e.target.value)}
                            className="flex-1 h-5 text-[9px] bg-white/5 border border-white/10 rounded px-1 text-white/70">
                            {['thomas', 'lorenz', 'rossler', 'aizawa', 'halvorsen', 'chen', 'dadras'].map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        <MiniSlider label="Count" value={controls.strangeAttractorParticles || 20000} min={5000} max={60000} step={5000} onChange={(v) => set('strangeAttractorParticles', v)} />
                        <MiniSlider label="Size" value={controls.strangeAttractorParticleSize || 0.5} min={0.1} max={3} step={0.1} onChange={(v) => set('strangeAttractorParticleSize', v)} />
                        <MiniSlider label="Chaos" value={controls.strangeAttractorChaos || 1} min={0.1} max={3} step={0.1} onChange={(v) => set('strangeAttractorChaos', v)} />
                        <MiniSlider label="AudioReact" value={controls.strangeAttractorAudioReactivity || 0.6} min={0} max={3} step={0.1} onChange={(v) => set('strangeAttractorAudioReactivity', v)} />
                      </div>
                    )}
                  </div>

                  {/* Auto cycling */}
                  <div className="pt-1.5 border-t border-white/5">
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-[9px] text-white/40">Auto Shape</span>
                      <Switch checked={controls.autoShapeCycle || false} onCheckedChange={(v) => set('autoShapeCycle', v)} className="scale-75" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
    </>
  )

  return (
    <>
      {/* Small screens: bottom sheet that draws up from bottom */}
      <div className="md:hidden fixed inset-0 z-40">
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
        <div 
          className={`absolute bottom-0 left-0 right-0 max-h-[75vh] rounded-t-2xl bg-black/90 backdrop-blur-2xl border border-white/10 border-b-0 shadow-2xl overflow-hidden transition-transform duration-300 ease-out select-none ${
            sheetMounted ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          {/* Drag handle */}
          <div className="flex justify-center py-2 border-b border-white/5">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>
          {panelContent}
        </div>
      </div>

      {/* md+: floating draggable panel */}
      <div 
        className="hidden md:block fixed z-40 w-[220px] select-none" 
        style={{ left: position.x, top: position.y }}
      >
        <div className="rounded-xl bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
          {panelContent}
        </div>
      </div>
    </>
  )
}
