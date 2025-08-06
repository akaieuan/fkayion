'use client'

import { useAudio } from './AudioContext'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Enhanced controls type with NEW PUDDLE MODE
type Controls = {
  noiseScale: number
  noiseForce: number
  color1: string
  color2: string
  color3: string
  color4: string
  audioReactivity: number
  wireframe: boolean
  
  // REAL PHYSICAL MERCURY PROPERTIES
  viscosity: number
  surfaceTension: number
  density: number
  elasticity: number
  
  // *** NEW: PUDDLE MODE ***
  puddleMode: number  // 0.0-3.0 for dramatic liquid spreading
  
  // Enhanced visual controls
  grain: number
  contrast: number
  brightness: number
  metallic: number
  split: number
  glass: number
  autoCycleColors: boolean
  shape: string
  
  // Additional effects
  bloom: number
  grainSize: number
  colorBlend: number
  dotMatrix: boolean
  goopiness: number
  liquidity: number
  splitIntensity: number
  
  // Enhanced texture effects
  chrome: number
  pearl: number
  holographic: number
  roughness: number  // NEW CONTROL
  
  // Visual modes
  kaleidoscope: number
  melting: number
  crystalline: number
  plasma: number
  shattered: boolean
  ripple: boolean
  vortex: boolean
  tentacleMode: number
  bubbleMode: number
  spiralMode: number
  webMode: number
  crystalGrowth: number
  liquidMerge: number
  dotSeparation: number
  
  // *** NEW: ABSTRACT INVERSION EFFECT ***
  abstractSplit: number  // 0.0-3.0 for dramatic blob inversion/splitting
  
  // *** NEW: EVOLVING CONTROLS ***
  autoColorCycle: boolean
  autoShapeCycle: boolean
  
  // *** NEW: ROTATION CONTROL ***
  rotationSpeed: number

  // *** NEW: AMBIENT SPACE MODE CONTROLS ***
  ambientSpaceMode: boolean
  ambientIntensity: number
  ambientWaveCount: number
  ambientFlowSpeed: number
  ambientDepth: number
}

// Collapsible Section Component
function CollapsibleSection({ 
  title, 
  children, 
  defaultOpen = false, 
  bgColor = "bg-white/10",
  borderColor = "border-white/20",
  titleColor = "text-white"
}: { 
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  bgColor?: string
  borderColor?: string
  titleColor?: string
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={`space-y-4 p-4 ${bgColor} backdrop-blur-md rounded-lg border ${borderColor}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full text-left ${titleColor} hover:opacity-80 transition-opacity`}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <svg 
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  )
}

export function ControlSidebar() {
  const { controls, setControls, isSidebarOpen, toggleSidebar, audioData } = useAudio()
  const router = useRouter()

  const handleControlChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    let newValue: any = value
    
    if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked
    } else if (type === 'number' || type === 'range') {
      newValue = parseFloat(value)
    }
    
    console.log(`MANUAL CONTROL CHANGE: ${name} = ${newValue}`)
    
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
    return (
      <button
        className="fixed top-6 left-6 z-50 w-14 h-14 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 border border-white/20 flex items-center justify-center group"
        onClick={toggleSidebar}
        aria-label="Open controls"
      >
        <svg 
          width="24" 
          height="24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="group-hover:scale-110 transition-transform duration-200"
        >
          <path d="M4 12h16M4 6h16M4 18h16"/>
        </svg>
      </button>
    )
  }

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-80 bg-black/90 backdrop-blur-xl border-l border-white/20 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <button
        onClick={toggleSidebar}
        className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white px-2 py-4 rounded-l-lg backdrop-blur-md border border-white/20 border-r-0"
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      <div className="h-full overflow-y-auto p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Visualizer Eden Controls</h2>
          <button
            onClick={() => router.push('/')}
            className="py-3 px-5 rounded-xl bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 text-white hover:bg-gray-800/70 hover:border-gray-600/70 transition-all duration-300 group flex items-center space-x-2"
            aria-label="Back to Home"
          >
            <span className="text-lg group-hover:text-opacity-100 text-opacity-90">←</span>
            <span className="text-base font-medium group-hover:text-opacity-100 text-opacity-90">Home</span>
          </button>
        </div>

        {/* AUDIO REACTIVITY - Always visible and first */}
        <CollapsibleSection title="Audio Reactivity" defaultOpen={true} bgColor="bg-gradient-to-br from-blue-900/20 to-purple-900/20" borderColor="border-blue-400/30" titleColor="text-blue-100">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-blue-100">Master Audio Reactivity</label>
              <span className="text-xs text-blue-200 font-mono bg-blue-900/30 px-2 py-1 rounded">
                {(controls.audioReactivity || 0).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="audioReactivity"
              min="0.0"
              max="15.0"
              step="0.1"
              value={controls.audioReactivity}
              onChange={handleControlChange}
              className="w-full h-3 bg-blue-900/30 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-blue-200/70 mt-1">
              Master multiplier for all audio-reactive effects
            </div>
          </div>
          
          {/* Live Audio Display */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-blue-200">Volume</span>
              <span className="text-xs text-blue-200 font-mono">{(safeAudioData.volume * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-blue-900/50 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-400 to-cyan-300 h-2 rounded-full transition-all duration-100"
                style={{ width: `${safeAudioData.volume * 100}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-xs text-blue-200 mb-1">Bass</div>
              <div className="w-full bg-blue-900/50 rounded-full h-2">
                <div 
                  className="bg-gradient-to-t from-red-500 to-red-300 h-2 rounded-full transition-all duration-100"
                  style={{ width: `${safeAudioData.bassLevel * 100}%` }}
                />
              </div>
              <div className="text-xs text-blue-300 font-mono mt-1">{(safeAudioData.bassLevel * 100).toFixed(0)}%</div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-blue-200 mb-1">Mid</div>
              <div className="w-full bg-blue-900/50 rounded-full h-2">
                <div 
                  className="bg-gradient-to-t from-green-500 to-green-300 h-2 rounded-full transition-all duration-100"
                  style={{ width: `${safeAudioData.midLevel * 100}%` }}
                />
              </div>
              <div className="text-xs text-blue-300 font-mono mt-1">{(safeAudioData.midLevel * 100).toFixed(0)}%</div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-blue-200 mb-1">High</div>
              <div className="w-full bg-blue-900/50 rounded-full h-2">
                <div 
                  className="bg-gradient-to-t from-purple-500 to-purple-300 h-2 rounded-full transition-all duration-100"
                  style={{ width: `${safeAudioData.highLevel * 100}%` }}
                />
              </div>
              <div className="text-xs text-blue-300 font-mono mt-1">{(safeAudioData.highLevel * 100).toFixed(0)}%</div>
            </div>
          </div>
        </CollapsibleSection>

        {/* CORE MERCURY SHAPE */}
        <CollapsibleSection title="Core Shape & Flow" defaultOpen={true}>
          <div>
            <label className="text-sm font-medium text-white block mb-2">Base Shape</label>
            {controls.autoShapeCycle && (
              <div className="text-xs text-yellow-300/80 mb-2 p-2 bg-yellow-900/20 rounded border border-yellow-400/30">
                WARNING: Auto Shape Cycle Active - Shape controlled automatically
              </div>
            )}
            <select
              name="shape"
              value={controls.shape}
              onChange={handleControlChange}
              className={`w-full text-white rounded-lg p-2 border ${
                controls.autoShapeCycle 
                  ? 'bg-yellow-900/20 border-yellow-400/30 text-yellow-200' 
                  : 'bg-white/10 border-white/20'
              }`}
              disabled={controls.autoShapeCycle}
            >
              <option value="sphere">Sphere</option>
              <option value="cube">Cube</option>
              <option value="cylinder">Cylinder</option>
              <option value="cone">Cone</option>
              <option value="torus">Torus</option>
              <option value="torusKnot">Torus Knot</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Surface Detail</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.noiseScale || 0).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="noiseScale"
              min="2.0"
              max="20.0"
              step="0.1"
              value={controls.noiseScale}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-white/60 mt-1">
              Higher values = extreme surface detail and bassline response
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Flow Intensity</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.noiseForce || 0).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="noiseForce"
              min="1.5"
              max="20.0"
              step="0.1"
              value={controls.noiseForce}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-white/60 mt-1">
              Higher values = extreme deformation and bassline reactivity
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Rotation Speed</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.rotationSpeed || 1.0).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="rotationSpeed"
              min="0.0"
              max="5.0"
              step="0.1"
              value={controls.rotationSpeed || 1.0}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-white/60 mt-1">
              Controls base rotation speed (0 = no rotation, 5 = very fast) - adds to audio reactivity
            </div>
          </div>
        </CollapsibleSection>

        {/* PUDDLE MODE */}
        <CollapsibleSection title="Puddle Mode" bgColor="bg-gradient-to-br from-cyan-900/20 to-blue-900/20" borderColor="border-cyan-400/30" titleColor="text-cyan-100">
          <div className="text-xs text-cyan-200/70 mb-3">
            Transform into a liquid puddle that spreads and ripples!
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-cyan-100">Puddle Spread</label>
              <span className="text-xs text-cyan-200 font-mono bg-cyan-900/30 px-2 py-1 rounded">
                {(controls.puddleMode || 0).toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              name="puddleMode"
              min="0.0"
              max="3.0"
              step="0.05"
              value={controls.puddleMode || 0}
              onChange={handleControlChange}
              className="w-full h-3 bg-cyan-900/30 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-cyan-200/70 mt-1">
              0.0 = normal shape • 3.0 = complete liquid puddle with ripples
            </div>
          </div>
        </CollapsibleSection>

        {/* COLORS */}
        <CollapsibleSection title="Visualizer Colors" defaultOpen={true}>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center">
              <label className="text-xs text-white/70 block mb-1">Color 1</label>
              <input
                type="color"
                name="color1"
                value={controls.color1}
                onChange={handleControlChange}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-white/20"
              />
            </div>
            <div className="text-center">
              <label className="text-xs text-white/70 block mb-1">Color 2</label>
              <input
                type="color"
                name="color2"
                value={controls.color2}
                onChange={handleControlChange}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-white/20"
              />
            </div>
            <div className="text-center">
              <label className="text-xs text-white/70 block mb-1">Color 3</label>
              <input
                type="color"
                name="color3"
                value={controls.color3}
                onChange={handleControlChange}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-white/20"
              />
            </div>
            <div className="text-center">
              <label className="text-xs text-white/70 block mb-1">Color 4</label>
              <input
                type="color"
                name="color4"
                value={controls.color4}
                onChange={handleControlChange}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-white/20"
              />
            </div>
          </div>
        </CollapsibleSection>

        {/* PHYSICS */}
        <CollapsibleSection title="Physics Properties" bgColor="bg-gradient-to-br from-purple-900/20 to-blue-900/20" borderColor="border-purple-400/30" titleColor="text-purple-100">
          <div className="text-xs text-purple-200/70 mb-3">
            Physical properties that multiply with audio reactivity!
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-purple-100">Viscosity</label>
              <span className="text-xs text-purple-200 font-mono bg-purple-900/30 px-2 py-1 rounded">
                {(controls.viscosity || 0.5).toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              name="viscosity"
              min="0.05"
              max="4.0"
              step="0.05"
              value={controls.viscosity || 0.5}
              onChange={handleControlChange}
              className="w-full h-3 bg-purple-900/30 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-purple-100">Surface Tension</label>
              <span className="text-xs text-purple-200 font-mono bg-purple-900/30 px-2 py-1 rounded">
                {(controls.surfaceTension || 0.7).toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              name="surfaceTension"
              min="0.05"
              max="3.0"
              step="0.05"
              value={controls.surfaceTension || 0.7}
              onChange={handleControlChange}
              className="w-full h-3 bg-purple-900/30 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-purple-100">Density</label>
              <span className="text-xs text-purple-200 font-mono bg-purple-900/30 px-2 py-1 rounded">
                {(controls.density || 1.0).toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              name="density"
              min="0.1"
              max="4.0"
              step="0.05"
              value={controls.density || 1.0}
              onChange={handleControlChange}
              className="w-full h-3 bg-purple-900/30 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-purple-100">Elasticity</label>
              <span className="text-xs text-purple-200 font-mono bg-purple-900/30 px-2 py-1 rounded">
                {(controls.elasticity || 0.5).toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              name="elasticity"
              min="0.05"
              max="2.0"
              step="0.05"
              value={controls.elasticity || 0.5}
              onChange={handleControlChange}
              className="w-full h-3 bg-purple-900/30 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </CollapsibleSection>

        {/* LIQUID EFFECTS */}
        <CollapsibleSection title="Liquid Effects">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Goopiness</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.goopiness || 0).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="goopiness"
              min="0.0"
              max="5.0"
              step="0.1"
              value={controls.goopiness}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Liquidity</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.liquidity || 0).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="liquidity"
              min="0.5"
              max="6.0"
              step="0.1"
              value={controls.liquidity}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Split Effect</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.split || 0).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="split"
              min="0.0"
              max="5.0"
              step="0.1"
              value={controls.split}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </CollapsibleSection>

        {/* SURFACE EFFECTS */}
        <CollapsibleSection title="Surface Effects">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Metallic</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.metallic || 0).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="metallic"
              min="0.0"
              max="1.0"
              step="0.05"
              value={controls.metallic}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Chrome</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.chrome || 0).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="chrome"
              min="0.0"
              max="1.0"
              step="0.05"
              value={controls.chrome || 0}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Pearl</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.pearl || 0).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="pearl"
              min="0.0"
              max="1.0"
              step="0.05"
              value={controls.pearl || 0}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Transparent</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.holographic || 0).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="holographic"
              min="0.0"
              max="1.0"
              step="0.05"
              value={controls.holographic || 0}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-white/60 mt-1">
              Edge transparency and see-through effect
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Glass</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.glass || 0).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="glass"
              min="0.0"
              max="1.0"
              step="0.05"
              value={controls.glass || 0}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Roughness</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.roughness || 0).toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              name="roughness"
              min="0.0"
              max="1.0"
              step="0.05"
              value={controls.roughness || 0}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-white/60 mt-1">
              Line-based pointillism texture pattern
            </div>
          </div>
        </CollapsibleSection>

        {/* EXTREME EFFECTS */}
        <CollapsibleSection title="Extreme Effects" bgColor="bg-gradient-to-br from-red-900/20 to-orange-900/20" borderColor="border-red-400/30" titleColor="text-red-100">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-red-100">Split Intensity</label>
              <span className="text-xs text-red-200 font-mono bg-red-900/30 px-2 py-1 rounded">
                {(controls.splitIntensity || 0).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="splitIntensity"
              min="0.0"
              max="5.0"
              step="0.1"
              value={controls.splitIntensity || 0}
              onChange={handleControlChange}
              className="w-full h-3 bg-red-900/30 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-red-100">Tentacle Mode</label>
              <span className="text-xs text-red-200 font-mono bg-red-900/30 px-2 py-1 rounded">
                {(controls.tentacleMode || 0).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="tentacleMode"
              min="0.0"
              max="3.0"
              step="0.1"
              value={controls.tentacleMode || 0}
              onChange={handleControlChange}
              className="w-full h-3 bg-red-900/30 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-red-100">Liquid Merge</label>
              <span className="text-xs text-red-200 font-mono bg-red-900/30 px-2 py-1 rounded">
                {(controls.liquidMerge || 0).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="liquidMerge"
              min="0.0"
              max="3.0"
              step="0.1"
              value={controls.liquidMerge || 0}
              onChange={handleControlChange}
              className="w-full h-3 bg-red-900/30 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              id="shattered"
              type="checkbox"
              name="shattered"
              checked={controls.shattered || false}
              onChange={handleControlChange}
              className="w-5 h-5 rounded border-2 border-red-400/40"
            />
            <label htmlFor="shattered" className="text-sm font-medium text-red-100">Shatter Mode</label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              id="vortex"
              type="checkbox"
              name="vortex"
              checked={controls.vortex || false}
              onChange={handleControlChange}
              className="w-5 h-5 rounded border-2 border-red-400/40"
            />
            <label htmlFor="vortex" className="text-sm font-medium text-red-100">Vortex Mode</label>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-red-100">Abstract Split</label>
              <span className="text-xs text-red-200 font-mono bg-red-900/30 px-2 py-1 rounded">
                {(controls.abstractSplit || 0).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="abstractSplit"
              min="0.0"
              max="3.0"
              step="0.1"
              value={controls.abstractSplit || 0}
              onChange={handleControlChange}
              className="w-full h-3 bg-red-900/30 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-red-200/70 mt-1">
              0.0 = normal blob • 3.0 = complete abstract inversion/splitting
            </div>
          </div>
        </CollapsibleSection>

        {/* VISUAL MODES */}
        <CollapsibleSection title="Visual Modes">

          <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 p-3 rounded-lg mb-4 border border-indigo-400/30">
            <div className="flex items-center space-x-3 mb-2">
              <input
                id="ambientSpaceMode"
                type="checkbox"
                name="ambientSpaceMode"
                checked={controls.ambientSpaceMode || false}
                onChange={handleControlChange}
                className="w-5 h-5 rounded border-2 border-indigo-400/40"
              />
              <label htmlFor="ambientSpaceMode" className="text-sm font-medium text-indigo-100">Ambient Space Mode</label>
              <div className={`px-2 py-1 rounded text-xs font-mono ${
                controls.ambientSpaceMode ? 'bg-indigo-600/30 text-indigo-200' : 'bg-gray-600/30 text-gray-300'
              }`}>
                {controls.ambientSpaceMode ? 'ACTIVE' : 'OFF'}
              </div>
            </div>
            <div className="text-xs text-indigo-200/70 space-y-1">
              <div>Enhanced 3D immersive environment with realistic depth</div>
              <div>Uses ALL physics controls: viscosity, goopiness, liquidity, split, etc.</div>
              <div>Same physics simulation as main blob but in ambient space</div>
              <div>Full audio reactivity with 3D depth effects and enhanced visuals</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <input
              id="wireframe"
              type="checkbox"
              name="wireframe"
              checked={controls.wireframe || false}
              onChange={handleControlChange}
              className="w-5 h-5 rounded border-2 border-white/40"
            />
            <label htmlFor="wireframe" className="text-sm font-medium text-white">Wireframe Mode</label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              id="dotMatrix"
              type="checkbox"
              name="dotMatrix"
              checked={controls.dotMatrix || false}
              onChange={handleControlChange}
              className="w-5 h-5 rounded border-2 border-white/40"
            />
            <label htmlFor="dotMatrix" className="text-sm font-medium text-white">Dot Matrix Mode</label>
          </div>

          {controls.dotMatrix && (
            <div className="ml-4 mt-2 p-3 bg-blue-900/20 rounded-lg border border-blue-400/30">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-blue-100">Dot Separation</label>
                  <span className="text-xs text-blue-200 font-mono bg-blue-900/30 px-2 py-1 rounded">
                    {(controls.dotSeparation || 1.0).toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  name="dotSeparation"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={controls.dotSeparation || 1.0}
                  onChange={handleControlChange}
                  className="w-full h-3 bg-blue-900/30 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-xs text-blue-200/70 mt-1">
                  Controls spacing between droplets (higher = more separated)
                </div>
              </div>
            </div>
          )}
        </CollapsibleSection>

        {/* EVOLVING CONTROLS */}
        <CollapsibleSection title="Evolving Controls" bgColor="bg-gradient-to-br from-green-900/20 to-teal-900/20" borderColor="border-green-400/30" titleColor="text-green-100">
          <div className="text-xs text-green-200/70 mb-3">
            Simple automatic changes to keep visuals fresh and dynamic
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                id="autoColorCycle"
                type="checkbox"
                name="autoColorCycle"
                checked={controls.autoColorCycle || false}
                onChange={handleControlChange}
                className="w-5 h-5 rounded border-2 border-green-400/40"
              />
              <label htmlFor="autoColorCycle" className="text-sm font-medium text-green-100">Auto Color Cycling</label>
              <div className={`px-2 py-1 rounded text-xs font-mono ${
                controls.autoColorCycle ? 'bg-green-600/30 text-green-200' : 'bg-gray-600/30 text-gray-300'
              }`}>
                {controls.autoColorCycle ? 'ACTIVE' : 'OFF'}
              </div>
            </div>
            <div className="text-xs text-green-200/70 ml-8">
              One color changes every 15 seconds through a curated palette
            </div>

            <div className="flex items-center space-x-3">
              <input
                id="autoShapeCycle"
                type="checkbox"
                name="autoShapeCycle"
                checked={controls.autoShapeCycle || false}
                onChange={handleControlChange}
                className="w-5 h-5 rounded border-2 border-green-400/40"
              />
              <label htmlFor="autoShapeCycle" className="text-sm font-medium text-green-100">Auto Shape Cycling</label>
              <div className={`px-2 py-1 rounded text-xs font-mono ${
                controls.autoShapeCycle ? 'bg-green-600/30 text-green-200' : 'bg-gray-600/30 text-gray-300'
              }`}>
                {controls.autoShapeCycle ? 'ACTIVE' : 'OFF'}
              </div>
            </div>
            <div className="text-xs text-green-200/70 ml-8">
              Shape changes every 20 seconds through all available forms
            </div>
          </div>
        </CollapsibleSection>

        {/* BASICS - Core Visual Controls */}
        <CollapsibleSection title="Basics" defaultOpen={true} bgColor="bg-gradient-to-br from-yellow-900/20 to-orange-900/20" borderColor="border-yellow-400/30" titleColor="text-yellow-100">
          <div className="text-xs text-yellow-200/70 mb-3">
            Essential visual controls for strong, emotional visualizer appearance
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-yellow-100">Contrast</label>
              <span className="text-xs text-yellow-200 font-mono bg-yellow-900/30 px-2 py-1 rounded">
                {(controls.contrast || 1.8).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="contrast"
              min="0.5"
              max="4.0"
              step="0.1"
              value={controls.contrast || 1.8}
              onChange={handleControlChange}
              className="w-full h-3 bg-yellow-900/30 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-yellow-200/70 mt-1">
              Controls how vivid and punchy the colors appear
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-yellow-100">Brightness</label>
              <span className="text-xs text-yellow-200 font-mono bg-yellow-900/30 px-2 py-1 rounded">
                {(controls.brightness || 1.2).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="brightness"
              min="0.3"
              max="3.0"
              step="0.1"
              value={controls.brightness || 1.2}
              onChange={handleControlChange}
              className="w-full h-3 bg-yellow-900/30 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-yellow-200/70 mt-1">
              Overall brightness and luminosity
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-yellow-100">Bloom</label>
              <span className="text-xs text-yellow-200 font-mono bg-yellow-900/30 px-2 py-1 rounded">
                {((controls.bloom || 0.15) * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              name="bloom"
              min="0.0"
              max="0.8"
              step="0.01"
              value={controls.bloom || 0.15}
              onChange={handleControlChange}
              className="w-full h-3 bg-yellow-900/30 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-yellow-200/70 mt-1">
              Glowing light effect around bright areas
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-yellow-100">Film Grain</label>
              <span className="text-xs text-yellow-200 font-mono bg-yellow-900/30 px-2 py-1 rounded">
                {((controls.grain || 0.08) * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              name="grain"
              min="0.0"
              max="0.3"
              step="0.005"
              value={controls.grain || 0.08}
              onChange={handleControlChange}
              className="w-full h-3 bg-yellow-900/30 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-yellow-200/70 mt-1">
              Film texture and organic surface detail
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-yellow-100">Grain Size</label>
              <span className="text-xs text-yellow-200 font-mono bg-yellow-900/30 px-2 py-1 rounded">
                {(controls.grainSize || 1.2).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="grainSize"
              min="0.5"
              max="3.0"
              step="0.1"
              value={controls.grainSize || 1.2}
              onChange={handleControlChange}
              className="w-full h-3 bg-yellow-900/30 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-yellow-200/70 mt-1">
              Size of film grain texture particles
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  )
}