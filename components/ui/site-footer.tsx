'use client'

import { Separator } from '@/components/ui/separator'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-[100] py-4 bg-black/80 backdrop-blur-sm">
      <div className="px-8 md:px-16 lg:px-24">
        <Separator className="bg-white/10 mb-4" />
        <div className="flex items-center justify-between">
          <p className="text-xs font-light tracking-wide text-white/25">
            © {currentYear} aka4uh
          </p>
          <div className="flex items-center space-x-6">
            <a 
              href="https://www.ubik.studio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-light tracking-wide text-white/25 hover:text-white/50 transition-colors duration-200"
            >
              Ubik
            </a>
            <a 
              href="https://www.linkedin.com/in/ieuan-king/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-light tracking-wide text-white/25 hover:text-white/50 transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a 
              href="https://kraa.io/akaieuan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-light tracking-wide text-white/25 hover:text-white/50 transition-colors duration-200"
            >
              aka.write
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

