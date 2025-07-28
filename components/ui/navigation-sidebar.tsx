'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Menu, Home, Link, Music, Palette, X } from 'lucide-react'

const navigationItems = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
    description: 'Main landing page'
  },
  {
    name: 'Links',
    href: '/Links',
    icon: Link,
    description: 'Social links and connections'
  },
  {
    name: 'Visualizer Eden',
    href: '/Visualizer-Eden',
    icon: Palette,
    description: 'Music visualizer (in development)'
  },
  {
    name: '4UH.NYC',
    href: '/4UH',
    icon: Music,
    description: 'Music releases and content'
  }
]

interface NavigationSidebarProps {
  className?: string
}

export function NavigationSidebar({ className }: NavigationSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsOpen(false) // Close sidebar after navigation
  }

  const FloatingButton = () => (
    <Button
      size="sm"
      className="fixed top-4 left-4 z-[60] w-10 h-10 rounded-lg bg-transparent backdrop-blur-sm hover:bg-white/15 border border-white/30 text-white hover:border-white/50 transition-all duration-200"
      onClick={() => setIsOpen(true)}
    >
      <Menu className="h-4 w-4" />
    </Button>
  )

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-black/95 backdrop-blur-xl text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold">Links</h2>
          <p className="text-xs text-white/50 mt-1">aka4uh | akaieuan</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-white/70 hover:text-white hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Button
              key={item.href}
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start h-auto p-4 text-left transition-all duration-200 ${
                isActive 
                  ? 'bg-white/20 text-white border border-white/30' 
                  : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
              }`}
              onClick={() => handleNavigation(item.href)}
            >
              <div className="flex items-start space-x-3">
                <Icon className={`h-5 w-5 mt-0.5 ${isActive ? 'text-white' : 'text-white/60'}`} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item.name}</div>
                  <div className={`text-xs mt-1 ${isActive ? 'text-white/80' : 'text-white/50'}`}>
                    {item.description}
                  </div>
                </div>
              </div>
            </Button>
          )
        })}
      </div>

      <Separator className="bg-white/10" />

      {/* Footer with additional info */}
      <div className="p-6 text-center space-y-2">
        <p className="text-xs text-white/50">
          Navigate between experiences
        </p>
        <p className="text-xs text-white/30">
          Built with React & Three.js
        </p>
      </div>
    </div>
  )

  return (
    <>
      {/* Floating Menu Button - always visible in top-left */}
      <FloatingButton />

      {/* Sidebar Sheet - opens from left */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent 
          side="left" 
          className="w-80 p-0 border-r border-white/20 z-[70]"
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
} 