'use client'

import { useRouter } from 'next/navigation'

export default function MusicPage() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900/20 via-blue-900/20 to-cyan-900/20 text-white">
      {/* Navigation */}
      <nav className="absolute top-6 left-6 z-20">
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg transition-all duration-300 flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back to Home</span>
        </button>
      </nav>
      
      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Title */}
          <div className="space-y-4">
            <div className="text-6xl mb-4">🎵</div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-teal-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Music
            </h1>
            <p className="text-xl md:text-2xl text-white/70">
              Audio Collection & Experiences
            </p>
          </div>
          
          {/* Placeholder content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {[
              { 
                title: "Original Compositions", 
                desc: "Personal musical creations and experiments",
                tracks: "12 tracks"
              },
              { 
                title: "Curated Playlists", 
                desc: "Carefully selected audio journeys",
                tracks: "8 playlists"
              },
              { 
                title: "Audio Experiments", 
                desc: "Sound design and experimental audio",
                tracks: "15 pieces"
              },
              { 
                title: "Collaborative Works", 
                desc: "Music created with other artists",
                tracks: "6 collaborations"
              }
            ].map((section, i) => (
              <div 
                key={i}
                className="group p-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-cyan-300 transition-colors">
                  {section.title}
                </h3>
                <p className="text-white/70 mb-4">{section.desc}</p>
                <div className="text-sm text-cyan-400 font-medium">
                  {section.tracks}
                </div>
              </div>
            ))}
          </div>
          
          {/* Audio player placeholder */}
          <div className="mt-16 p-8 bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-teal-500/30 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-teal-300 mb-2">Now Playing</h4>
                <p className="text-white/70">No track selected</p>
              </div>
              <div className="flex space-x-4">
                <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  ⏮️
                </button>
                <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  ▶️
                </button>
                <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  ⏭️
                </button>
              </div>
            </div>
          </div>
          
          {/* Coming soon message */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl">
            <p className="text-lg text-blue-300">
              🎧 Music collection and player coming soon! Stay tuned for audio experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 