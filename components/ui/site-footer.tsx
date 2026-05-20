'use client'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-8 bg-background">
      <div className="mx-auto max-w-site site-inset">
        <div
          className="mb-6 h-px w-full shrink-0 bg-[linear-gradient(90deg,transparent_0%,var(--border)_14%,var(--border)_86%,transparent_100%)]"
          aria-hidden
        />
        <div className="flex items-center justify-between">
          <p className="text-xs font-light tracking-wide text-muted-foreground/50">
            © {currentYear} akaBuild
          </p>
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/ubik-inc/ubik-electron"
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
