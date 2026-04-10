'use client'

import { useState, useCallback } from 'react'
import { ShowsList, ReleasesList, PurchaseList, PlaylistList } from '@/components/shared/lists'
import { LatestReleases } from '@/components/features/home/latest-releases'

const PANELS = ['Shows', 'Releases', 'Purchase', 'Playlists', 'Latest'] as const
type PanelName = (typeof PANELS)[number]
type ActivePanel = Lowercase<PanelName>

const cardClass = 'rounded-2xl border border-border bg-card backdrop-blur-md'

export function FourUHSection() {
  const [panelIndex, setPanelIndex] = useState(0)

  const activePanel = PANELS[panelIndex].toLowerCase() as ActivePanel

  const goNext = useCallback(() => {
    setPanelIndex((i) => (i >= PANELS.length - 1 ? 0 : i + 1))
  }, [])

  return (
    <section id="section-4" className="relative min-h-screen w-full overflow-visible">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover opacity-20 dark:opacity-40"
        >
          <source src="/4uh-aka.webm" type="video/webm" />
        </video>
      </div>

      <div className="absolute inset-0 pointer-events-none section-fade-left-heavy" />
      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, var(--background), transparent)' }} />

      <div className="relative flex min-h-screen items-start md:items-center">
          <div className="flex w-full max-w-site mx-auto gap-10 lg:gap-16 site-inset pt-24 pb-16 max-md:flex-col md:flex-row md:items-start">

          {/* Main tabbed panel */}
          <div className={`${cardClass} p-4 sm:p-5 md:w-[420px] lg:w-[460px] shrink-0`}>
            <h2 className="text-xl text-muted-foreground font-light tracking-wide mb-3">Music</h2>

            {/* Small screen: squircle label + arrow */}
            <div className="md:hidden flex items-center gap-2.5 mb-3">
              <div className="rounded-[0.9rem] border border-border bg-background/50 px-3.5 py-2 backdrop-blur-md">
                <span className="text-[11px] font-medium tracking-widest uppercase text-foreground/75">
                  {PANELS[panelIndex]}
                </span>
              </div>
              <button
                type="button"
                aria-label="Next section"
                onClick={goNext}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.85rem] border border-border bg-card text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-[oklch(0.55_0.06_152/0.4)] hover:bg-[oklch(0.707_0.108_152.216/0.08)] hover:text-[oklch(0.32_0.08_152)] dark:hover:border-[oklch(0.707_0.108_152.216/0.35)] dark:hover:bg-[oklch(0.707_0.108_152.216/0.1)] dark:hover:text-[oklch(0.78_0.1_152)] active:scale-95"
              >
                <span className="text-[12px] font-light leading-none">→</span>
              </button>
            </div>

            {/* Large screen: tab row */}
            <nav
              className="hidden md:flex shrink-0 flex-nowrap items-center gap-x-3 border-b border-border pb-1.5 mb-3"
              aria-label="Music sections"
            >
              {PANELS.map((item, i) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPanelIndex(i)}
                  className={`shrink-0 whitespace-nowrap text-[10px] font-medium uppercase tracking-wide transition-colors ${
                    i === panelIndex
                      ? 'text-[oklch(0.38_0.08_152)] dark:text-[oklch(0.707_0.108_152.216)]'
                      : 'text-muted-foreground/60 hover:text-foreground/60'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* List panels */}
            <div className="relative min-h-[300px] md:h-[380px] lg:h-[400px] overscroll-y-contain">
              <div className={`absolute inset-0 ${activePanel !== 'shows' ? 'pointer-events-none' : ''}`}>
                <ShowsList isOpen={activePanel === 'shows'} />
              </div>
              <div className={`absolute inset-0 ${activePanel !== 'releases' ? 'pointer-events-none' : ''}`}>
                <ReleasesList isOpen={activePanel === 'releases'} />
              </div>
              <div className={`absolute inset-0 ${activePanel !== 'purchase' ? 'pointer-events-none' : ''}`}>
                <PurchaseList isOpen={activePanel === 'purchase'} />
              </div>
              <div className={`absolute inset-0 ${activePanel !== 'playlists' ? 'pointer-events-none' : ''}`}>
                <PlaylistList isOpen={activePanel === 'playlists'} />
              </div>
              <div className={`absolute inset-0 overflow-y-auto ${activePanel !== 'latest' ? 'pointer-events-none opacity-0' : 'opacity-100'}`} style={{ transition: 'opacity 0.2s ease' }}>
                <LatestReleases />
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div className="flex-1 md:self-center max-md:order-first">
            <div className="space-y-5 lg:space-y-7">
              <p className="text-sm sm:text-base lg:text-[15px] font-light leading-loose text-muted-foreground">
                aka ieuan is a Brooklyn-born &amp; based electronic musician crafting live-recorded, hypnotic techno compositions that combine his love of underground rap, alt-rock/metal, electronic music, and classical guitar. Known under various aliases including akaieuan, Mr.M4UH, abletonlivee, and yion, he has spent six years developing a sound that spans DnB, Tech-House, and Techno accumulating over 3 million streams across all platforms.
              </p>
              <p className="text-sm sm:text-base lg:text-[15px] font-light leading-loose text-muted-foreground">
                Growing up in Brooklyn and playing music from a young age, akaieuan draws from a diverse palette of influences to create melancholic yet energetic sounds. Inspired by live acts like Luke Slater, UFO95, and Rødhåd, his sets craft an evolving, hypnotic atmosphere that encourages movement, self-reflection, and healing.
              </p>
              <p className="text-sm sm:text-base lg:text-[15px] font-light leading-loose text-muted-foreground">
                With releases on Synapsa Music, Diffuse Reality, Impulse Control, and Agape Music, aka ieuan is one of Brooklyn&apos;s emerging homegrown artists helping define a new era of NYC techno.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
