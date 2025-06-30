'use client'

import { useAudio } from './AudioContext'

// Enhanced controls type with the good stuff back
type Controls = {
  noiseScale: number
  noiseForce: number
  color1: string
  color2: string
  color3: string
  bassReactivity: number
  midReactivity: number
  trebleReactivity: number
  wireframe: boolean
  // Enhanced visual controls
  grain: number
  contrast: number
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
}

export function ControlSidebar() {
  const { controls, setControls, isSidebarOpen, toggleSidebar } = useAudio()

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

      <div className="h-full overflow-y-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold text-white">Mercury Visualizer Controls</h2>

        {/* Shape Controls */}
        <div className="space-y-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
          <h3 className="text-lg font-semibold text-white">Shape Controls</h3>
          
          <div>
            <label className="text-sm font-medium text-white block mb-2">Base Shape</label>
            <select
              name="shape"
              value={controls.shape}
              onChange={handleControlChange}
              className="w-full bg-white/10 text-white rounded-lg p-2 border border-white/20"
            >
              <option value="sphere">Sphere</option>
              <option value="icosahedron">Icosahedron</option>
              <option value="cube">Cube</option>
              <option value="torus">Torus</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Surface Detail</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {controls.noiseScale.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="noiseScale"
              min="0.3"
              max="4.0"
              step="0.1"
              value={controls.noiseScale}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Flow Intensity</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {controls.noiseForce.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="noiseForce"
              min="0.1"
              max="6.0"
              step="0.1"
              value={controls.noiseForce}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-white/50 mt-1">
              Controls liquid mercury flow and surface movement
            </div>
          </div>
        </div>

        {/* Deform Controls */}
        <div className="space-y-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
          <h3 className="text-lg font-semibold text-white">Deform Effects</h3>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Goopiness</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {controls.goopiness.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="goopiness"
              min="0.0"
              max="3.0"
              step="0.1"
              value={controls.goopiness}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-white/50 mt-1">
              Controls how gooey and stretchy the liquid appears
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Liquidity</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {controls.liquidity.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="liquidity"
              min="0.5"
              max="4.0"
              step="0.1"
              value={controls.liquidity}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-white/50 mt-1">
              Controls fluid viscosity and flow characteristics
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Mercury Split</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {controls.split.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="split"
              min="0.0"
              max="3.0"
              step="0.1"
              value={controls.split}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-white/50 mt-1">
              1.0 = normal, &lt;1.0 = smooth, &gt;1.0 = inverted/split effect
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Split Intensity</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {controls.splitIntensity.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="splitIntensity"
              min="0.0"
              max="2.0"
              step="0.1"
              value={controls.splitIntensity}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-white/50 mt-1">
              Additional fracturing and splitting intensity
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="space-y-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Colors</h3>
            <div className="flex items-center space-x-2">
              <input
                id="autoCycleColors"
                type="checkbox"
                name="autoCycleColors"
                checked={controls.autoCycleColors}
                onChange={handleControlChange}
                className="w-4 h-4 rounded border-2 border-white/40"
              />
              <label htmlFor="autoCycleColors" className="text-xs text-white/70">Auto Cycle</label>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <label className="text-xs text-white/70 block mb-1">Primary</label>
              <input
                type="color"
                name="color1"
                value={controls.color1}
                onChange={handleControlChange}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-white/20"
              />
            </div>
            <div className="text-center">
              <label className="text-xs text-white/70 block mb-1">Secondary</label>
              <input
                type="color"
                name="color2"
                value={controls.color2}
                onChange={handleControlChange}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-white/20"
              />
            </div>
            <div className="text-center">
              <label className="text-xs text-white/70 block mb-1">Accent</label>
              <input
                type="color"
                name="color3"
                value={controls.color3}
                onChange={handleControlChange}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-white/20"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Color Blend Speed</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {controls.colorBlend.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              name="colorBlend"
              min="0.1"
              max="2.0"
              step="0.1"
              value={controls.colorBlend}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Audio Reactivity */}
        <div className="space-y-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
          <h3 className="text-lg font-semibold text-white">Audio Response</h3>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-white">Bass Response</label>
                <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                  {controls.bassReactivity.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                name="bassReactivity"
                min="0.1"
                max="4.0"
                step="0.1"
                value={controls.bassReactivity}
                onChange={handleControlChange}
                className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-white">Mid Response</label>
                <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                  {controls.midReactivity.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                name="midReactivity"
                min="0.1"
                max="4.0"
                step="0.1"
                value={controls.midReactivity}
                onChange={handleControlChange}
                className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-white">Treble Response</label>
                <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                  {controls.trebleReactivity.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                name="trebleReactivity"
                min="0.1"
                max="4.0"
                step="0.1"
                value={controls.trebleReactivity}
                onChange={handleControlChange}
                className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>

        {/* Surface Effects */}
        <div className="space-y-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
          <h3 className="text-lg font-semibold text-white">Surface Effects</h3>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Metallic Shine</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {controls.metallic.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              name="metallic"
              min="0"
              max="1.0"
              step="0.05"
              value={controls.metallic}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Glass Effect</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {controls.glass.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              name="glass"
              min="0"
              max="1.0"
              step="0.05"
              value={controls.glass}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Visual Effects */}
        <div className="space-y-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
          <h3 className="text-lg font-semibold text-white">Visual Effects</h3>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Contrast</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {controls.contrast.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              name="contrast"
              min="0.5"
              max="2.0"
              step="0.05"
              value={controls.contrast}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Bloom</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {controls.bloom.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              name="bloom"
              min="0"
              max="1"
              step="0.05"
              value={controls.bloom}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Grain</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {controls.grain.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              name="grain"
              min="0"
              max="0.5"
              step="0.01"
              value={controls.grain}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-white">Grain Size</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {controls.grainSize.toFixed(0)}
              </span>
            </div>
            <input
              type="range"
              name="grainSize"
              min="1"
              max="20"
              step="1"
              value={controls.grainSize}
              onChange={handleControlChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              id="wireframe"
              type="checkbox"
              name="wireframe"
              checked={controls.wireframe}
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
              checked={controls.dotMatrix}
              onChange={handleControlChange}
              className="w-5 h-5 rounded border-2 border-white/40"
            />
            <label htmlFor="dotMatrix" className="text-sm font-medium text-white">Dot Matrix Mode</label>
          </div>
        </div>

        {/* Live Status */}
        <div className="space-y-2 p-4 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
          <h4 className="text-sm font-semibold text-white/70">Live Status</h4>
          <div className="text-xs text-white/50 font-mono space-y-1">
            <div>Mercury Flow: {controls.noiseForce > 0 ? 'ACTIVE' : 'INACTIVE'}</div>
            <div>Metal Shine: {controls.metallic > 0.3 ? 'HIGH' : 'LOW'}</div>
            <div>Auto Colors: {controls.autoCycleColors ? 'ON' : 'OFF'}</div>
            <div>Split Effect: {controls.split > 1.0 ? 'INTENSE' : 'MILD'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

<style jsx>{`
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: linear-gradient(45deg, #00f2ff, #ff00a8);
    cursor: pointer;
    border: 2px solid #000;
    box-shadow: 0 2px 8px rgba(0, 242, 255, 0.3);
  }
  
  .slider::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: linear-gradient(45deg, #00f2ff, #ff00a8);
    cursor: pointer;
    border: 2px solid #000;
    box-shadow: 0 2px 8px rgba(0, 242, 255, 0.3);
  }
`}</style> 