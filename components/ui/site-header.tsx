'use client'

import { useRouter, usePathname } from 'next/navigation'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Links', href: '/Links' },
  { name: 'Visualizer', href: '/Visualizer-Eden' },
  { name: '4UH', href: '/4UH' }
]

export function SiteHeader() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 bg-black/80 backdrop-blur-sm">
      <nav className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Logo/Brand */}
        <button 
          onClick={() => router.push('/')}
          className="text-white/70 hover:text-white text-sm font-light tracking-wide transition-colors duration-200"
        >
          aka4uh
        </button>

        {/* Nav Links */}
        <div className="flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={`text-xs tracking-wide transition-colors duration-200 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {item.name}
              </button>
            )
          })}
        </div>
      </nav>
    </header>
  )
}

