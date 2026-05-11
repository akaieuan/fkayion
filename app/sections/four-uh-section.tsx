'use client'

import { Button } from '@/components/ui/button'

const FOUR_UH_URL = 'https://4uhnyc.com'

export function FourUHSection() {
  return (
    <section id="section-4" className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/4uh-aka-poster.jpg"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
        >
          <source src="/4uh-aka.webm" type="video/webm" />
        </video>
      </div>

      {/* Top / bottom blend: same soft edge as header & footer (no hard full-width bars) */}
      <div
        className="absolute inset-x-0 top-0 h-36 pointer-events-none z-[1]"
        style={{ background: 'linear-gradient(to bottom, var(--background), transparent)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-36 pointer-events-none z-[1]"
        style={{ background: 'linear-gradient(to top, var(--background), transparent)' }}
      />

      <div className="relative z-[2] min-h-screen">
        <div className="max-w-site mx-auto site-inset pt-28 pb-20 md:pt-32 md:pb-24">
          <div className="max-w-md">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground/90 mb-3">
              4UH · NYC
            </p>
            <p className="text-sm font-light leading-relaxed text-muted-foreground mb-5">
              Music, releases, and shows — continue on the dedicated site.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-md px-7 text-sm font-light tracking-wide shadow-md"
            >
              <a href={FOUR_UH_URL} target="_blank" rel="noopener noreferrer">
                Open 4uhnyc.com
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
