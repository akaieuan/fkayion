'use client'

import { useAudio } from './AudioContext'
import { Controls } from './animation-sequence'

export function ControlSidebar() {
  const { controls, setControls, isSidebarOpen, toggleSidebar } = useAudio()

  const handleControlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    const newValue = type === 'checkbox' ? e.target.checked : value
    
    setControls((prev: Controls) => ({
      ...prev,
      [name]: type === 'number' || type === 'range' ? parseFloat(newValue as string) : newValue
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
    <div className={`fixed right-0 top-0 h-[calc(100vh-7rem)] w-80 bg-black/50 backdrop-blur-xl transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <button
        onClick={toggleSidebar}
        className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white px-2 py-4 rounded-l-lg backdrop-blur-md"
      >
        {isSidebarOpen ? '→' : '←'}
      </button>

      <div className="h-full overflow-y-auto p-4 space-y-6 pb-8">
        <h2 className="text-xl font-bold text-white">Visualizer Controls</h2>

        <div className="space-y-4 p-4 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
          <h3 className="text-lg font-semibold text-white">Shape Controls</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="noiseScale" className="text-sm font-medium text-white">Spike Density</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.noiseScale || 0).toFixed(2)}
              </span>
            </div>
            <input
              id="noiseScale"
              type="range"
              name="noiseScale"
              min="0.3"
              max="4.0"
              step="0.1"
              value={controls.noiseScale}
              onChange={handleControlChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="goopiness" className="text-sm font-medium text-white">Spike Sharpness</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.goopiness || 0).toFixed(2)}
              </span>
            </div>
            <input
              id="goopiness"
              type="range"
              name="goopiness"
              min="0.1"
              max="3.0"
              step="0.1"
              value={controls.goopiness}
              onChange={handleControlChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="noiseForce" className="text-sm font-medium text-white">Base Force</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.noiseForce || 0).toFixed(2)}
              </span>
            </div>
            <input
              id="noiseForce"
              type="range"
              name="noiseForce"
              min="0.5"
              max="5.0"
              step="0.1"
              value={controls.noiseForce}
              onChange={handleControlChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Colors</label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="color"
                name="color1"
                value={controls.color1}
                onChange={handleControlChange}
                className="w-full h-8 rounded cursor-pointer"
              />
              <input
                type="color"
                name="color2"
                value={controls.color2}
                onChange={handleControlChange}
                className="w-full h-8 rounded cursor-pointer"
              />
              <input
                type="color"
                name="color3"
                value={controls.color3}
                onChange={handleControlChange}
                className="w-full h-8 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 p-4 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
          <h3 className="text-lg font-semibold text-white">Audio Reactivity</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="bassReactivity" className="text-sm font-medium text-white">Bass Response</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.bassReactivity || 0).toFixed(2)}
              </span>
            </div>
            <input
              id="bassReactivity"
              type="range"
              name="bassReactivity"
              min="0.1"
              max="4.0"
              step="0.1"
              value={controls.bassReactivity}
              onChange={handleControlChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="midReactivity" className="text-sm font-medium text-white">Mid Response</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.midReactivity || 0).toFixed(2)}
              </span>
            </div>
            <input
              id="midReactivity"
              type="range"
              name="midReactivity"
              min="0.1"
              max="4.0"
              step="0.1"
              value={controls.midReactivity}
              onChange={handleControlChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="trebleReactivity" className="text-sm font-medium text-white">Treble Response</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.trebleReactivity || 0).toFixed(2)}
              </span>
            </div>
            <input
              id="trebleReactivity"
              type="range"
              name="trebleReactivity"
              min="0.1"
              max="4.0"
              step="0.1"
              value={controls.trebleReactivity}
              onChange={handleControlChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-4 p-4 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
          <h3 className="text-lg font-semibold text-white">Visual Effects</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="contrast" className="text-sm font-medium text-white">Contrast</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.contrast || 0).toFixed(2)}
              </span>
            </div>
            <input
              id="contrast"
              type="range"
              name="contrast"
              min="0.5"
              max="2.0"
              step="0.05"
              value={controls.contrast}
              onChange={handleControlChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="bloom" className="text-sm font-medium text-white">Bloom</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.bloom || 0).toFixed(2)}
              </span>
            </div>
            <input
              id="bloom"
              type="range"
              name="bloom"
              min="0"
              max="1"
              step="0.05"
              value={controls.bloom}
              onChange={handleControlChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="grain" className="text-sm font-medium text-white">Grain</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.grain || 0).toFixed(2)}
              </span>
            </div>
            <input
              id="grain"
              type="range"
              name="grain"
              min="0"
              max="0.5"
              step="0.01"
              value={controls.grain}
              onChange={handleControlChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="wireframe"
              type="checkbox"
              name="wireframe"
              checked={controls.wireframe}
              onChange={handleControlChange}
              className="w-4 h-4 rounded border-white/20"
            />
            <label htmlFor="wireframe" className="text-sm font-medium text-white">Wireframe</label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="showParticles"
              type="checkbox"
              name="showParticles"
              checked={controls.showParticles}
              onChange={handleControlChange}
              className="w-4 h-4 rounded border-white/20"
            />
            <label htmlFor="showParticles" className="text-sm font-medium text-white">Show Particles</label>
          </div>
        </div>

        <div className="space-y-4 p-4 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
          <h3 className="text-lg font-semibold text-white">Goop Character</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="complexity" className="text-sm font-medium text-white">Complexity</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.complexity || 0).toFixed(2)}
              </span>
            </div>
            <input
              id="complexity"
              type="range"
              name="complexity"
              min="0.5"
              max="3.0"
              step="0.1"
              value={controls.complexity}
              onChange={handleControlChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="tension" className="text-sm font-medium text-white">Spike Tension</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.tension || 0).toFixed(2)}
              </span>
            </div>
            <input
              id="tension"
              type="range"
              name="tension"
              min="0.5"
              max="3.0"
              step="0.1"
              value={controls.tension}
              onChange={handleControlChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="turbulence" className="text-sm font-medium text-white">Turbulence</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.turbulence || 0).toFixed(2)}
              </span>
            </div>
            <input
              id="turbulence"
              type="range"
              name="turbulence"
              min="0"
              max="2.0"
              step="0.1"
              value={controls.turbulence}
              onChange={handleControlChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="detail" className="text-sm font-medium text-white">Detail Level</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.detail || 0).toFixed(2)}
              </span>
            </div>
            <input
              id="detail"
              type="range"
              name="detail"
              min="0.5"
              max="2.5"
              step="0.1"
              value={controls.detail}
              onChange={handleControlChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="split" className="text-sm font-medium text-white">Goop Split</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.split || 0).toFixed(2)}
              </span>
            </div>
            <input
              id="split"
              type="range"
              name="split"
              min="0"
              max="2.0"
              step="0.1"
              value={controls.split}
              onChange={handleControlChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-4 p-4 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
          <h3 className="text-lg font-semibold text-white">Surface Effects</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="metallic" className="text-sm font-medium text-white">Metallic</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.metallic || 0).toFixed(2)}
              </span>
            </div>
            <input
              id="metallic"
              type="range"
              name="metallic"
              min="0"
              max="1.0"
              step="0.05"
              value={controls.metallic}
              onChange={handleControlChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="glass" className="text-sm font-medium text-white">Glass</label>
              <span className="text-xs text-white/70 font-mono bg-white/20 px-2 py-1 rounded">
                {(controls.glass || 0).toFixed(2)}
              </span>
            </div>
            <input
              id="glass"
              type="range"
              name="glass"
              min="0"
              max="1.0"
              step="0.05"
              value={controls.glass}
              onChange={handleControlChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 