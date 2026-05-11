'use client'

import Link from 'next/link'

const cardClass = 'rounded-2xl border border-border bg-card backdrop-blur-md p-5 sm:p-6'

export function VisualizerSection() {
  return (
    <section id="section-3" className="relative w-full py-24">
      <div className="max-w-site mx-auto site-inset">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-8">
          <div className={`shrink-0 w-full sm:w-[320px] md:w-[360px] ${cardClass}`}>
            <h2 className="text-xl text-muted-foreground font-light tracking-wide">Visualizer Eden</h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
              Upload WAV files, watch it warp a reactive 3D form in real time — glass, chrome, goo, pearl, holographic, roughness, and more.
            </p>
            <Link
              href="/Visualizer-Eden"
              className="mt-5 inline-flex items-center gap-2 rounded-[0.9rem] border border-border bg-background/60 px-4 py-2.5 text-[11px] font-medium tracking-wide text-foreground/70 backdrop-blur-md transition-all duration-300 hover:border-emerald-400/30 hover:bg-emerald-400/[0.07] hover:text-emerald-100/90 active:scale-[0.98]"
            >
              Open visualizer →
            </Link>
          </div>

          <div className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card backdrop-blur-md w-full max-w-[520px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              src="/visualizer-eden-preview.webm"
              className="w-full h-full object-cover block"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
