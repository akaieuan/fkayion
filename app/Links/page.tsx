'use client'

import { useRouter } from 'next/navigation'

export default function LinksPage() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900/20 via-orange-900/20 to-pink-900/20 text-white">
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
            <div className="text-6xl mb-4">🔗</div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              Links
            </h1>
            <p className="text-xl md:text-2xl text-white/70">
              Connections & Networks
            </p>
          </div>
          
          {/* Placeholder content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              { title: "Portfolio", desc: "Creative Works", url: "#" },
              { title: "GitHub", desc: "Code Repository", url: "#" },
              { title: "Social", desc: "Connect Online", url: "#" },
              { title: "Blog", desc: "Thoughts & Ideas", url: "#" },
              { title: "Contact", desc: "Get In Touch", url: "#" },
              { title: "Resources", desc: "Useful Tools", url: "#" }
            ].map((link, i) => (
              <div 
                key={i}
                className="group p-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-300 transition-colors">
                  {link.title}
                </h3>
                <p className="text-white/70">{link.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Coming soon message */}
          <div className="mt-16 p-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl">
            <p className="text-lg text-red-300">
              🚧 This section is under construction. Links and connections coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 