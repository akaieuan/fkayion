'use client'

import { useAudio } from './AudioContext'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown, Menu } from 'lucide-react'

// Ultra-compact Collapsible Section Component
function CollapsibleSection({ 
  title, 
  children, 
  defaultOpen = false
}: { 
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded border border-white/10 h-fit">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-1 text-left text-white/80 hover:text-white transition-colors"
      >
        <span className="text-[9px] font-medium uppercase tracking-wider">{title}</span>
        <ChevronDown className={`w-2 h-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-1 pb-1 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  )
}

export function ControlDrawer() {
  const { controls, setControls, isSidebarOpen, toggleSidebar, audioData, isPlaying, audioSrc } = useAudio()

  const handleControlChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    let newValue: any = value
    
    if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked
    } else if (type === 'number' || type === 'range') {
      newValue = parseFloat(value)
    }
    
    setControls((prev: any) => ({
      ...prev,
      [name]: newValue
    }))
  }

  // Safe audio data
  const safeAudioData = audioData || {
    volume: 0,
    peakVolume: 0,
    averageVolume: 0,
    dbLevel: -60,
    bassLevel: 0,
    midLevel: 0,
    highLevel: 0,
  }

  if (!isSidebarOpen) {
    // Debug logging
    console.log('ControlDrawer button logic:', { isPlaying, audioSrc, shouldHide: !!audioSrc })
    
    // Only show the controls button if audio is NOT uploaded
    // When audio is uploaded, the controls button will be in the AudioBar
    if (audioSrc) {
      console.log('ControlDrawer: Hiding center button because audio is uploaded')
      return null  // Hide this button when audio is uploaded
    }

    // Only show when audio is NOT uploaded
    console.log('ControlDrawer: Showing center button because audio is NOT uploaded')
    return (
      <Button
        size="sm"
        variant="ghost"
        className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50 h-7 px-2 text-[10px] bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white/80 hover:text-white border border-white/20 hover:border-white/30 rounded"
        onClick={toggleSidebar}
      >
        <Menu className="h-3 w-3 mr-1" />
        Controls
      </Button>
    )
  }

  return (
    <div className={`fixed inset-x-0 bottom-0 z-50 bg-black/50 backdrop-blur-md transform transition-all duration-500 ${isSidebarOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      {/* Close button */}
      <Button
        size="sm"
        variant="ghost"
        onClick={toggleSidebar}
        className="absolute top-2 right-2 h-6 w-6 p-0 bg-white/10 hover:bg-white/20 text-white rounded"
      >
        <ChevronDown className="h-3 w-3" />
      </Button>

      {/* Drawer content - hugs bottom but shows enough content */}
      <div className="max-h-[75vh] overflow-y-auto p-4 pt-10">
        <div className="max-w-7xl mx-auto">
          {/* True Bento Box Layout - Tight packed like real bento */}
          <div className="grid grid-cols-12 gap-0.5 auto-rows-min bg-black/20 backdrop-blur-sm p-1 rounded-xl border border-white/5">
            
            {/* Row 1 - New layout with Surface and Basics adjacent */}
            {/* Audio + Auto - Compact (2 cols) */}
            <div className="col-span-2 space-y-0.5">
              <CollapsibleSection title="Audio" defaultOpen={true}>
                <div>
                  <div className="flex justify-between mb-0">
                    <label className="text-[9px] text-white/60">Reactivity</label>
                    <span className="text-[9px] text-white/40 font-mono">{(controls.audioReactivity || 0).toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    name="audioReactivity"
                    min="0.0"
                    max="15.0"
                    step="0.1"
                    value={controls.audioReactivity}
                    onChange={handleControlChange}
                    className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                  />
                </div>
              </CollapsibleSection>
              
              {/* Auto - Under Audio */}
              <CollapsibleSection title="Auto" defaultOpen={true}>
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-0.5">
                    <input
                      id="autoColor-dr"
                      type="checkbox"
                      name="autoColorCycle"
                      checked={controls.autoColorCycle || false}
                      onChange={handleControlChange}
                      className="w-2.5 h-2.5 rounded border border-white/40 focus:outline-none focus:ring-0 focus:border-white/50"
                    />
                    <label htmlFor="autoColor-dr" className="text-[8px] text-white/60">Auto Colors</label>
                  </div>
                  <div className="flex items-center space-x-0.5">
                    <input
                      id="autoShape-dr"
                      type="checkbox"
                      name="autoShapeCycle"
                      checked={controls.autoShapeCycle || false}
                      onChange={handleControlChange}
                      className="w-2.5 h-2.5 rounded border border-white/40 focus:outline-none focus:ring-0 focus:border-white/50"
                    />
                    <label htmlFor="autoShape-dr" className="text-[8px] text-white/60">Auto Shape</label>
                  </div>
                </div>
              </CollapsibleSection>
            </div>

            {/* Basics - Adjacent to Surface (2 cols) */}
            <div className="col-span-2">
              <CollapsibleSection title="Basics" defaultOpen={true}>
                <div className="space-y-0.5">
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-white/60">Contrast</label>
                      <span className="text-[9px] text-white/40 font-mono">{(controls.contrast || 1.8).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="contrast"
                      min="0.5"
                      max="4.0"
                      step="0.1"
                      value={controls.contrast || 1.8}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-white/60">Brightness</label>
                      <span className="text-[9px] text-white/40 font-mono">{(controls.brightness || 1.2).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="brightness"
                      min="0.3"
                      max="3.0"
                      step="0.1"
                      value={controls.brightness || 1.2}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    />
                  </div>
                                <div>
                <div className="flex justify-between mb-0">
                  <label className="text-[9px] text-white/60">Bloom</label>
                  <span className="text-[9px] text-white/40 font-mono">{((controls.bloom || 0.15) * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  name="bloom"
                  min="0.0"
                  max="0.8"
                  step="0.01"
                  value={controls.bloom || 0.15}
                  onChange={handleControlChange}
                  className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-0">
                  <label className="text-[9px] text-white/60">Film Grain</label>
                  <span className="text-[9px] text-white/40 font-mono">{((controls.grain || 0.08) * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  name="grain"
                  min="0.0"
                  max="0.3"
                  step="0.01"
                  value={controls.grain || 0.08}
                  onChange={handleControlChange}
                  className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-0">
                  <label className="text-[9px] text-white/60">Grain Size</label>
                  <span className="text-[9px] text-white/40 font-mono">{(controls.grainSize || 1.2).toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  name="grainSize"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={controls.grainSize || 1.2}
                  onChange={handleControlChange}
                  className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                />
              </div>
                </div>
              </CollapsibleSection>
            </div>

            {/* Surface - Adjacent to Basics (3 cols) */}
            <div className="col-span-3">
              <CollapsibleSection title="Surface" defaultOpen={true}>
                <div className="space-y-0.5">
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-white/60">Metallic</label>
                      <span className="text-[9px] text-white/40 font-mono">{(controls.metallic || 0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="metallic"
                      min="0.0"
                      max="1.0"
                      step="0.05"
                      value={controls.metallic}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-white/60">Chrome</label>
                      <span className="text-[9px] text-white/40 font-mono">{(controls.chrome || 0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="chrome"
                      min="0.0"
                      max="1.0"
                      step="0.05"
                      value={controls.chrome || 0}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-white/60">Glass</label>
                      <span className="text-[9px] text-white/40 font-mono">{(controls.glass || 0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="glass"
                      min="0.0"
                      max="1.0"
                      step="0.05"
                      value={controls.glass || 0}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-white/60">Roughness</label>
                      <span className="text-[9px] text-white/40 font-mono">{(controls.roughness || 0).toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      name="roughness"
                      min="0.0"
                      max="1.0"
                      step="0.05"
                      value={controls.roughness || 0}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-white/60">Pearl</label>
                      <span className="text-[9px] text-white/40 font-mono">{(controls.pearl || 0).toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      name="pearl"
                      min="0.0"
                      max="1.0"
                      step="0.05"
                      value={controls.pearl || 0}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-white/60">Holographic</label>
                      <span className="text-[9px] text-white/40 font-mono">{(controls.holographic || 0).toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      name="holographic"
                      min="0.0"
                      max="1.0"
                      step="0.05"
                      value={controls.holographic || 0}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>
              </CollapsibleSection>
            </div>

            {/* Colors - Compact (2 cols) */}
            <div className="col-span-2">
              <CollapsibleSection title="Colors" defaultOpen={true}>
                <div className="grid grid-cols-2 gap-0.5">
                  <div>
                    <label className="text-[8px] text-white/50 block mb-0.5">Color 1</label>
                    <input
                      type="color"
                      name="color1"
                      value={controls.color1}
                      onChange={handleControlChange}
                      className="w-full h-6 rounded cursor-pointer border border-white/20 focus:outline-none focus:ring-0 focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] text-white/50 block mb-0.5">Color 2</label>
                    <input
                      type="color"
                      name="color2"
                      value={controls.color2}
                      onChange={handleControlChange}
                      className="w-full h-6 rounded cursor-pointer border border-white/20 focus:outline-none focus:ring-0 focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] text-white/50 block mb-0.5">Color 3</label>
                    <input
                      type="color"
                      name="color3"
                      value={controls.color3}
                      onChange={handleControlChange}
                      className="w-full h-6 rounded cursor-pointer border border-white/20 focus:outline-none focus:ring-0 focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] text-white/50 block mb-0.5">Color 4</label>
                    <input
                      type="color"
                      name="color4"
                      value={controls.color4}
                      onChange={handleControlChange}
                      className="w-full h-6 rounded cursor-pointer border border-white/20 focus:outline-none focus:ring-0 focus:border-white/30"
                    />
                  </div>
                </div>
              </CollapsibleSection>
            </div>

            {/* Modes - Compact (3 cols) */}
            <div className="col-span-3">
              <CollapsibleSection title="Modes" defaultOpen={true}>
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-0.5">
                    <input
                      id="wireframe-dr"
                      type="checkbox"
                      name="wireframe"
                      checked={controls.wireframe || false}
                      onChange={handleControlChange}
                      className="w-2.5 h-2.5 rounded border border-white/40 focus:outline-none focus:ring-0 focus:border-white/50"
                    />
                    <label htmlFor="wireframe-dr" className="text-[8px] text-white/60">Wireframe</label>
                  </div>
                  <div className="flex items-center space-x-0.5">
                    <input
                      id="dotMatrix-dr"
                      type="checkbox"
                      name="dotMatrix"
                      checked={controls.dotMatrix || false}
                      onChange={handleControlChange}
                      className="w-2.5 h-2.5 rounded border border-white/40 focus:outline-none focus:ring-0 focus:border-white/50"
                    />
                    <label htmlFor="dotMatrix-dr" className="text-[8px] text-white/60">Dot Matrix</label>
                  </div>
                  <div className="flex items-center space-x-0.5">
                    <input
                      id="ambient-dr"
                      type="checkbox"
                      name="ambientSpaceMode"
                      checked={controls.ambientSpaceMode || false}
                      onChange={handleControlChange}
                      className="w-2.5 h-2.5 rounded border border-white/40 focus:outline-none focus:ring-0 focus:border-white/50"
                    />
                    <label htmlFor="ambient-dr" className="text-[8px] text-white/60">Ambient Space</label>
                  </div>
                </div>
              </CollapsibleSection>
            </div>

            {/* Row 2 - New layout with Shape moved here */}
            {/* Physics - Reduced (4 cols) */}
            <div className="col-span-4">
              <CollapsibleSection title="Physics" defaultOpen={true}>
                <div className="space-y-0.5">
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-white/60">Viscosity</label>
                      <span className="text-[9px] text-white/40 font-mono">{(controls.viscosity || 0.5).toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      name="viscosity"
                      min="0.05"
                      max="4.0"
                      step="0.05"
                      value={controls.viscosity || 0.5}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-white/60">Surface Tension</label>
                      <span className="text-[9px] text-white/40 font-mono">{(controls.surfaceTension || 0.7).toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      name="surfaceTension"
                      min="0.05"
                      max="3.0"
                      step="0.05"
                      value={controls.surfaceTension || 0.7}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-white/60">Density</label>
                      <span className="text-[9px] text-white/40 font-mono">{(controls.density || 1.0).toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      name="density"
                      min="0.1"
                      max="4.0"
                      step="0.05"
                      value={controls.density || 1.0}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-white/60">Elasticity</label>
                      <span className="text-[9px] text-white/40 font-mono">{(controls.elasticity || 0.5).toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      name="elasticity"
                      min="0.05"
                      max="2.0"
                      step="0.05"
                      value={controls.elasticity || 0.5}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>
              </CollapsibleSection>
            </div>

            {/* Liquid - Medium (3 cols) */}
            <div className="col-span-3">
              <CollapsibleSection title="Liquid" defaultOpen={true}>
                <div className="space-y-0.5">
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-white/60">Goopiness</label>
                      <span className="text-[9px] text-white/40 font-mono">{(controls.goopiness || 0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="goopiness"
                      min="0.0"
                      max="5.0"
                      step="0.1"
                      value={controls.goopiness}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-white/60">Liquidity</label>
                      <span className="text-[9px] text-white/40 font-mono">{(controls.liquidity || 0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="liquidity"
                      min="0.5"
                      max="6.0"
                      step="0.1"
                      value={controls.liquidity}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-white/60">Split</label>
                      <span className="text-[9px] text-white/40 font-mono">{(controls.split || 0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="split"
                      min="0.0"
                      max="5.0"
                      step="0.1"
                      value={controls.split}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-white/60">Split Intensity</label>
                      <span className="text-[9px] text-white/40 font-mono">{(controls.splitIntensity || 0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="splitIntensity"
                      min="0.0"
                      max="2.0"
                      step="0.1"
                      value={controls.splitIntensity || 0}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>
              </CollapsibleSection>
            </div>

            {/* Shape - Moved to Row 2 (2 cols) */}
            <div className="col-span-2">
              <CollapsibleSection title="Shape" defaultOpen={true}>
                <div className="space-y-0.5">
                  <select
                    name="shape"
                    value={controls.shape}
                    onChange={handleControlChange}
                    className="w-full bg-white/10 text-white rounded px-1 py-0.5 text-[9px] border border-white/20 focus:outline-none focus:ring-0 focus:border-white/30"
                  >
                    <option value="sphere">Sphere</option>
                    <option value="cube">Cube</option>
                    <option value="cylinder">Cylinder</option>
                    <option value="cone">Cone</option>
                    <option value="torus">Torus</option>
                    <option value="torusKnot">Torus Knot</option>
                  </select>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-white/60">Surface</label>
                      <span className="text-[9px] text-white/40 font-mono">{(controls.noiseScale || 0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="noiseScale"
                      min="2.0"
                      max="20.0"
                      step="0.1"
                      value={controls.noiseScale}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-white/60">Flow</label>
                      <span className="text-[9px] text-white/40 font-mono">{(controls.noiseForce || 0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="noiseForce"
                      min="1.5"
                      max="20.0"
                      step="0.1"
                      value={controls.noiseForce}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-white/60">Rotation</label>
                      <span className="text-[9px] text-white/40 font-mono">{(controls.rotationSpeed || 1.0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="rotationSpeed"
                      min="0.0"
                      max="5.0"
                      step="0.1"
                      value={controls.rotationSpeed ?? 1.0}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>
              </CollapsibleSection>
            </div>

            {/* Puddle - Integrated into Row 2 (3 cols) */}
            <div className="col-span-3">
              <CollapsibleSection title="Puddle" defaultOpen={true}>
                <div>
                  <div className="flex justify-between mb-0">
                    <label className="text-[9px] text-white/60">Spread</label>
                    <span className="text-[9px] text-white/40 font-mono">{(controls.puddleMode || 0).toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    name="puddleMode"
                    min="0.0"
                    max="3.0"
                    step="0.05"
                    value={controls.puddleMode || 0}
                    onChange={handleControlChange}
                    className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0"
                  />
                </div>
              </CollapsibleSection>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}