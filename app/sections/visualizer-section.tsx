'use client'

import Link from 'next/link'

export function VisualizerSection() {
  return (
    <section
      id="section-3"
      className="relative h-screen w-full snap-start bg-black flex items-center px-6 sm:px-8 md:px-16 lg:px-24 pt-14 pb-16"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-8">

        {/* left */}
        <div className="shrink-0 w-[280px] sm:w-[320px] md:w-[360px]">
          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/30"></p>
          <h2 className="text-xl font-light tracking-wide text-white/80 sm:text-2xl">Visualizer Eden</h2>
          <p className="mt-3 text-sm font-light leading-relaxed text-white/45">
            Upload WAV files, watch it warp a reactive 3D form in real time — glass, chrome, goo, pearl, holographic, roughness, and more.
          </p>
          <Link
            href="/Visualizer-Eden"
            className="mt-5 inline-flex items-center gap-2 rounded-[0.9rem] border border-white/[0.14] bg-black/40 px-4 py-2.5 text-[11px] font-medium tracking-wide text-white/70 backdrop-blur-md transition-all duration-300 hover:border-emerald-400/30 hover:bg-emerald-400/[0.07] hover:text-emerald-100/90 active:scale-[0.98]"
          >
            Open visualizer →
          </Link>
        </div>

        {/* right: video */}
        <div className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] w-full max-w-[520px] max-h-[60vh]">
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
    </section>
  )
}
