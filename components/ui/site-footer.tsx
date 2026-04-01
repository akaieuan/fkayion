'use client'

import { Separator } from '@/components/ui/separator'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-8 bg-background">
      <div className="mx-auto max-w-site site-inset">
        <Separator className="bg-border mb-6" />
        <div className="flex items-center justify-between">
          <p className="text-xs font-light tracking-wide text-muted-foreground/50">
            © {currentYear} aka4uh
          </p>
          <div className="flex items-center space-x-6">
            <a
              href="https://www.ubik.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-light tracking-wide text-muted-foreground/50 hover:text-foreground/50 transition-colors duration-200"
            >
              Ubik
            </a>
            <a
              href="https://www.linkedin.com/in/ieuan-king/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-light tracking-wide text-muted-foreground/50 hover:text-foreground/50 transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="https://kraa.io/akaieuan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-light tracking-wide text-muted-foreground/50 hover:text-foreground/50 transition-colors duration-200"
            >
              aka.write
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
