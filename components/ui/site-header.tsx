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
    <header className="fixed top-0 left-0 right-0 z-[100] py-4 bg-black/80 backdrop-blur-sm">
      <nav className="flex items-center justify-between px-8 md:px-16 lg:px-24">
        {/* Logo/Brand - matches home page title */}
        <button 
          onClick={() => router.push('/')}
          className="text-xl text-white/80 font-light tracking-wide hover:text-white transition-colors duration-200"
        >
          aka4uh
        </button>

        {/* Nav Links - Apple-style light weight */}
        <div className="flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={`text-sm font-light tracking-wide transition-colors duration-200 ${
                  isActive 
                    ? 'text-white/80' 
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

