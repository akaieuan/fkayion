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
    <div className="bg-gray-800/30 backdrop-blur-sm rounded border border-gray-600/20 h-fit">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-1 text-left text-gray-200 hover:text-white transition-colors focus:outline-none focus:ring-0 focus:border-none focus:shadow-none"
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

  // Preset configurations
  const presets = {
    'Liquid Mercury': {
      shape: 'sphere',
      metallic: 0.9,
      chrome: 0.3,
      pearl: 0.1,
      goopiness: 2.5,
      liquidity: 3.2,
      viscosity: 1.2,
      surfaceTension: 1.8,
      brightness: 1.4,
      contrast: 2.1,
      color1: '#c0c0c0',
      color2: '#e6e6fa',
      color3: '#b0c4de',
      color4: '#d3d3d3'
    },
    'Neon Cyber': {
      shape: 'cube',
      metallic: 0.1,
      chrome: 0.8,
      holographic: 0.6,
      wireframe: true,
      brightness: 2.2,
      contrast: 3.0,
      bloom: 0.4,
      color1: '#00ffff',
      color2: '#ff00ff',
      color3: '#00ff00',
      color4: '#ffff00'
    },
    'Organic Glass': {
      shape: 'sphere',
      glass: 0.7,
      pearl: 0.4,
      roughness: 0.2,
      goopiness: 1.8,
      liquidity: 2.8,
      elasticity: 1.5,
      brightness: 1.6,
      bloom: 0.25,
      color1: '#87ceeb',
      color2: '#98fb98',
      color3: '#f0e68c',
      color4: '#dda0dd'
    },
    'Metallic Storm': {
      shape: 'torusKnot',
      metallic: 1.0,
      chrome: 0.9,
      roughness: 0.6,
      split: 2.5,
      splitIntensity: 1.2,
      viscosity: 0.3,
      density: 2.0,
      brightness: 1.8,
      contrast: 2.5,
      color1: '#4682b4',
      color2: '#708090',
      color3: '#2f4f4f',
      color4: '#696969'
    },
    'Plasma Energy': {
      shape: 'sphere',
      holographic: 0.8,
      bloom: 0.6,
      grain: 0.15,
      wireframe: false,
      dotMatrix: false,
      brightness: 2.5,
      contrast: 2.8,
      audioReactivity: 12.0,
      color1: '#ff4500',
      color2: '#ff69b4',
      color3: '#9370db',
      color4: '#00bfff'
    },
    'Liquid Droplets': {
      shape: 'sphere',
      dotMatrix: true,
      goopiness: 3.0,
      liquidity: 4.5,
      split: 1.8,
      metallic: 0.6,
      pearl: 0.3,
      brightness: 1.7,
      bloom: 0.3,
      color1: '#1e90ff',
      color2: '#32cd32',
      color3: '#ffd700',
      color4: '#ff6347'
    },
    'Crystal Formation': {
      shape: 'cone',
      glass: 0.9,
      chrome: 0.4,
      roughness: 0.8,
      elasticity: 0.8,
      surfaceTension: 2.5,
      brightness: 1.9,
      contrast: 2.3,
      grain: 0.05,
      color1: '#e0ffff',
      color2: '#f0f8ff',
      color3: '#e6e6fa',
      color4: '#f5f5dc'
    },
    'Ambient Space': {
      ambientSpaceMode: true,
      viscosity: 2.0,
      surfaceTension: 1.5,
      goopiness: 2.2,
      liquidity: 3.5,
      brightness: 1.3,
      contrast: 1.8,
      bloom: 0.2,
      color1: '#191970',
      color2: '#4b0082',
      color3: '#8b008b',
      color4: '#9400d3'
    }
  }

  const handlePresetSelect = (presetName: string) => {
    const preset = presets[presetName as keyof typeof presets]
    if (preset) {
      setControls((prev: any) => ({
        ...prev,
        ...preset
      }))
    }
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
    // Always show controls button now - positioned top right for mobile access
    return (
      <Button
        size="sm"
        variant="ghost"
        className="fixed top-28 right-4 z-50 h-8 px-3 text-xs bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white/80 hover:text-white border border-white/15 hover:border-white/25 rounded flex items-center gap-2 focus:outline-none focus:ring-0 focus:shadow-none"
        onClick={toggleSidebar}
      >
        <Menu className="h-3 w-3" />
        Controls
      </Button>
    )
  }

  return (
    <div className={`fixed top-36 right-2 z-40 w-[calc(100vw-1rem)] sm:w-56 max-w-xs h-[calc(100vh-12rem)] bg-transparent backdrop-blur-md transform transition-all duration-500 rounded-lg border border-gray-600/20 shadow-2xl ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* Close button */}
      <Button
        size="sm"
        variant="ghost"
        onClick={toggleSidebar}
        className="absolute top-2 right-2 h-6 w-6 p-0 bg-gray-700/40 hover:bg-gray-600/60 text-gray-200 hover:text-white rounded focus:outline-none focus:ring-0 focus:shadow-none"
      >
        <ChevronDown className="h-3 w-3 rotate-90" />
      </Button>

      {/* Drawer content - vertical scrollable */}
      <div className="h-full overflow-y-auto p-3 pt-10">
        <div className="space-y-2">
          {/* Bento Box Layout - Vertical stacking for sidebar */}
          <div className="space-y-1">
            
            {/* Colors Section - Always open and moved to top */}
            <CollapsibleSection title="Colors" defaultOpen={true}>
                <div className="grid grid-cols-2 gap-0.5">
                  <div>
                    <label className="text-[8px] text-gray-300 block mb-0.5">Color 1</label>
                    <input
                      type="color"
                      name="color1"
                      value={controls.color1}
                      onChange={handleControlChange}
                      className="w-full h-6 rounded cursor-pointer border border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-400"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] text-gray-300 block mb-0.5">Color 2</label>
                    <input
                      type="color"
                      name="color2"
                      value={controls.color2}
                      onChange={handleControlChange}
                      className="w-full h-6 rounded cursor-pointer border border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-400"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] text-gray-300 block mb-0.5">Color 3</label>
                    <input
                      type="color"
                      name="color3"
                      value={controls.color3}
                      onChange={handleControlChange}
                      className="w-full h-6 rounded cursor-pointer border border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-400"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] text-gray-300 block mb-0.5">Color 4</label>
                    <input
                      type="color"
                      name="color4"
                      value={controls.color4}
                      onChange={handleControlChange}
                      className="w-full h-6 rounded cursor-pointer border border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-400"
                    />
                  </div>
                </div>
            </CollapsibleSection>

            {/* Audio Section */}
            <CollapsibleSection title="Audio" defaultOpen={false}>
                <div>
                  <div className="flex justify-between mb-0">
                    <label className="text-[9px] text-gray-300">Reactivity</label>
                    <span className="text-[9px] text-gray-400 font-mono">{(controls.audioReactivity || 0).toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    name="audioReactivity"
                    min="0.0"
                    max="15.0"
                    step="0.1"
                    value={controls.audioReactivity}
                    onChange={handleControlChange}
                    className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                  />
                </div>
            </CollapsibleSection>
              
            {/* Evolving Section - Renamed from Auto */}
            <CollapsibleSection title="Evolving" defaultOpen={false}>
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-0.5">
                    <input
                      id="autoColor-dr"
                      type="checkbox"
                      name="autoColorCycle"
                      checked={controls.autoColorCycle || false}
                      onChange={handleControlChange}
                      className="w-2.5 h-2.5 rounded border border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-400 focus:shadow-none"
                    />
                    <label htmlFor="autoColor-dr" className="text-[8px] text-gray-300">Color Cycling</label>
                  </div>
                  <div className="flex items-center space-x-0.5">
                    <input
                      id="autoShape-dr"
                      type="checkbox"
                      name="autoShapeCycle"
                      checked={controls.autoShapeCycle || false}
                      onChange={handleControlChange}
                      className="w-2.5 h-2.5 rounded border border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-400 focus:shadow-none"
                    />
                    <label htmlFor="autoShape-dr" className="text-[8px] text-gray-300">Shape Cycling</label>
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Color Speed</label>
                      <span className="text-[9px] text-gray-400 font-mono">{((controls as any).colorCycleSpeed || 15).toFixed(0)}s</span>
                    </div>
                    <input
                      type="range"
                      name="colorCycleSpeed"
                      min="5"
                      max="60"
                      step="5"
                      value={(controls as any).colorCycleSpeed || 15}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Shape Speed</label>
                      <span className="text-[9px] text-gray-400 font-mono">{((controls as any).shapeCycleSpeed || 20).toFixed(0)}s</span>
                    </div>
                    <input
                      type="range"
                      name="shapeCycleSpeed"
                      min="10"
                      max="120"
                      step="10"
                      value={(controls as any).shapeCycleSpeed || 20}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                </div>
            </CollapsibleSection>

            {/* Basics Section */}
            <CollapsibleSection title="Basics" defaultOpen={false}>
                <div className="space-y-0.5">
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Contrast</label>
                      <span className="text-[9px] text-gray-400 font-mono">{(controls.contrast || 1.8).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="contrast"
                      min="0.5"
                      max="4.0"
                      step="0.1"
                      value={controls.contrast || 1.8}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Brightness</label>
                      <span className="text-[9px] text-gray-400 font-mono">{(controls.brightness || 1.2).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="brightness"
                      min="0.3"
                      max="3.0"
                      step="0.1"
                      value={controls.brightness || 1.2}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                                <div>
                <div className="flex justify-between mb-0">
                  <label className="text-[9px] text-gray-300">Bloom</label>
                  <span className="text-[9px] text-gray-400 font-mono">{((controls.bloom || 0.15) * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  name="bloom"
                  min="0.0"
                  max="0.8"
                  step="0.01"
                  value={controls.bloom || 0.15}
                  onChange={handleControlChange}
                  className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-0">
                  <label className="text-[9px] text-gray-300">Film Grain</label>
                  <span className="text-[9px] text-gray-400 font-mono">{((controls.grain || 0.08) * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  name="grain"
                  min="0.0"
                  max="0.3"
                  step="0.01"
                  value={controls.grain || 0.08}
                  onChange={handleControlChange}
                  className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-0">
                  <label className="text-[9px] text-gray-300">Grain Size</label>
                  <span className="text-[9px] text-gray-400 font-mono">{(controls.grainSize || 1.2).toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  name="grainSize"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={controls.grainSize || 1.2}
                  onChange={handleControlChange}
                  className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                />
              </div>
                </div>
            </CollapsibleSection>

            {/* Surface Section */}
            <CollapsibleSection title="Surface" defaultOpen={false}>
                <div className="space-y-0.5">
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Metallic</label>
                      <span className="text-[9px] text-gray-400 font-mono">{(controls.metallic || 0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="metallic"
                      min="0.0"
                      max="1.0"
                      step="0.05"
                      value={controls.metallic}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Chrome</label>
                      <span className="text-[9px] text-gray-400 font-mono">{(controls.chrome || 0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="chrome"
                      min="0.0"
                      max="1.0"
                      step="0.05"
                      value={controls.chrome || 0}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Glass</label>
                      <span className="text-[9px] text-gray-400 font-mono">{(controls.glass || 0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="glass"
                      min="0.0"
                      max="1.0"
                      step="0.05"
                      value={controls.glass || 0}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Roughness</label>
                      <span className="text-[9px] text-gray-400 font-mono">{(controls.roughness || 0).toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      name="roughness"
                      min="0.0"
                      max="1.0"
                      step="0.05"
                      value={controls.roughness || 0}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Pearl</label>
                      <span className="text-[9px] text-gray-400 font-mono">{(controls.pearl || 0).toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      name="pearl"
                      min="0.0"
                      max="1.0"
                      step="0.05"
                      value={controls.pearl || 0}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Holographic</label>
                      <span className="text-[9px] text-gray-400 font-mono">{(controls.holographic || 0).toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      name="holographic"
                      min="0.0"
                      max="1.0"
                      step="0.05"
                      value={controls.holographic || 0}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                </div>
            </CollapsibleSection>



            {/* Modes Section */}
            <CollapsibleSection title="Modes" defaultOpen={false}>
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-0.5">
                    <input
                      id="wireframe-dr"
                      type="checkbox"
                      name="wireframe"
                      checked={controls.wireframe || false}
                      onChange={handleControlChange}
                      className="w-2.5 h-2.5 rounded border border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-400 focus:shadow-none"
                    />
                    <label htmlFor="wireframe-dr" className="text-[8px] text-gray-300">Wireframe</label>
                  </div>
                  <div className="flex items-center space-x-0.5">
                    <input
                      id="dotMatrix-dr"
                      type="checkbox"
                      name="dotMatrix"
                      checked={controls.dotMatrix || false}
                      onChange={handleControlChange}
                      className="w-2.5 h-2.5 rounded border border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-400 focus:shadow-none"
                    />
                    <label htmlFor="dotMatrix-dr" className="text-[8px] text-gray-300">Dot Matrix</label>
                  </div>
                  {controls.dotMatrix && (
                    <div>
                      <div className="flex justify-between mb-0">
                        <label className="text-[9px] text-gray-300">Dot Spacing</label>
                        <span className="text-[9px] text-gray-400 font-mono">{(controls.dotSeparation || 1.0).toFixed(1)}</span>
                      </div>
                      <input
                        type="range"
                        name="dotSeparation"
                        min="0.3"
                        max="4.0"
                        step="0.1"
                        value={controls.dotSeparation || 1.0}
                        onChange={handleControlChange}
                        className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                      />
                    </div>
                  )}
                  <div className="flex items-center space-x-0.5">
                    <input
                      id="ambient-dr"
                      type="checkbox"
                      name="ambientSpaceMode"
                      checked={controls.ambientSpaceMode || false}
                      onChange={handleControlChange}
                      className="w-2.5 h-2.5 rounded border border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-400 focus:shadow-none"
                    />
                    <label htmlFor="ambient-dr" className="text-[8px] text-gray-300">Ambient Space</label>
                  </div>
                </div>
            </CollapsibleSection>

            {/* Physics Section */}
            <CollapsibleSection title="Physics" defaultOpen={false}>
                <div className="space-y-0.5">
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Viscosity</label>
                      <span className="text-[9px] text-gray-400 font-mono">{(controls.viscosity || 0.5).toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      name="viscosity"
                      min="0.05"
                      max="4.0"
                      step="0.05"
                      value={controls.viscosity || 0.5}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Surface Tension</label>
                      <span className="text-[9px] text-gray-400 font-mono">{(controls.surfaceTension || 0.7).toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      name="surfaceTension"
                      min="0.05"
                      max="3.0"
                      step="0.05"
                      value={controls.surfaceTension || 0.7}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Density</label>
                      <span className="text-[9px] text-gray-400 font-mono">{(controls.density || 1.0).toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      name="density"
                      min="0.1"
                      max="4.0"
                      step="0.05"
                      value={controls.density || 1.0}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Elasticity</label>
                      <span className="text-[9px] text-gray-400 font-mono">{(controls.elasticity || 0.5).toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      name="elasticity"
                      min="0.05"
                      max="2.0"
                      step="0.05"
                      value={controls.elasticity || 0.5}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                </div>
            </CollapsibleSection>

            {/* Liquid Section */}
            <CollapsibleSection title="Liquid" defaultOpen={false}>
                <div className="space-y-0.5">
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Goopiness</label>
                      <span className="text-[9px] text-gray-400 font-mono">{(controls.goopiness || 0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="goopiness"
                      min="0.0"
                      max="5.0"
                      step="0.1"
                      value={controls.goopiness}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Liquidity</label>
                      <span className="text-[9px] text-gray-400 font-mono">{(controls.liquidity || 0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="liquidity"
                      min="0.5"
                      max="6.0"
                      step="0.1"
                      value={controls.liquidity}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Split</label>
                      <span className="text-[9px] text-gray-400 font-mono">{(controls.split || 0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="split"
                      min="0.0"
                      max="5.0"
                      step="0.1"
                      value={controls.split}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Split Intensity</label>
                      <span className="text-[9px] text-gray-400 font-mono">{(controls.splitIntensity || 0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="splitIntensity"
                      min="0.0"
                      max="2.0"
                      step="0.1"
                      value={controls.splitIntensity || 0}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                </div>
            </CollapsibleSection>

            {/* Shape Section */}
            <CollapsibleSection title="Shape" defaultOpen={false}>
                <div className="space-y-0.5">
                  <select
                    name="shape"
                    value={controls.shape}
                    onChange={handleControlChange}
                    className="w-full bg-gray-700/60 text-gray-200 rounded px-1 py-0.5 text-[9px] border border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-400 focus:shadow-none"
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
                      <label className="text-[9px] text-gray-300">Surface</label>
                      <span className="text-[9px] text-gray-400 font-mono">{(controls.noiseScale || 0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="noiseScale"
                      min="2.0"
                      max="20.0"
                      step="0.1"
                      value={controls.noiseScale}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Flow</label>
                      <span className="text-[9px] text-gray-400 font-mono">{(controls.noiseForce || 0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="noiseForce"
                      min="1.5"
                      max="20.0"
                      step="0.1"
                      value={controls.noiseForce}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0">
                      <label className="text-[9px] text-gray-300">Rotation</label>
                      <span className="text-[9px] text-gray-400 font-mono">{(controls.rotationSpeed || 1.0).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      name="rotationSpeed"
                      min="0.0"
                      max="5.0"
                      step="0.1"
                      value={controls.rotationSpeed ?? 1.0}
                      onChange={handleControlChange}
                      className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                    />
                  </div>
                </div>
            </CollapsibleSection>

            {/* Puddle Section */}
            <CollapsibleSection title="Puddle" defaultOpen={false}>
                <div>
                  <div className="flex justify-between mb-0">
                    <label className="text-[9px] text-gray-300">Spread</label>
                    <span className="text-[9px] text-gray-400 font-mono">{(controls.puddleMode || 0).toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    name="puddleMode"
                    min="0.0"
                    max="3.0"
                    step="0.05"
                    value={controls.puddleMode || 0}
                    onChange={handleControlChange}
                    className="w-full h-1 bg-gray-600/50 rounded appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-none [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-0 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-0"
                  />
                </div>
            </CollapsibleSection>

            {/* Presets Section */}
            <CollapsibleSection title="Presets" defaultOpen={false}>
              <div className="space-y-1">
                <div className="text-[8px] text-gray-300 mb-1">Quick visual styles:</div>
                <div className="grid grid-cols-1 gap-1">
                  {Object.keys(presets).map((presetName) => (
                    <button
                      key={presetName}
                      onClick={() => handlePresetSelect(presetName)}
                      className="w-full text-left px-2 py-1 text-[8px] bg-gray-700/40 hover:bg-gray-600/60 text-gray-200 hover:text-white border border-gray-600/40 hover:border-gray-500/60 rounded transition-all duration-200"
                    >
                      {presetName}
                    </button>
                  ))}
                </div>
                <div className="text-[7px] text-gray-400 mt-1 italic">
                  Presets will override current settings
                </div>
              </div>
            </CollapsibleSection>
            
          </div>
        </div>
      </div>
    </div>
  )
}