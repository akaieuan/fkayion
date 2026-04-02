'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const cardClass = 'rounded-2xl border border-border bg-card backdrop-blur-md'

type LinkItem = {
  label: string
  description: string
  detail: string
  url: string
  color: string
  media?: { type: 'image' | 'video'; src: string }
  gallery?: string[]
}

const links: LinkItem[] = [
  {
    label: 'Ubik Studio', description: 'AI research platform', color: '#c84b20',
    detail: 'Co-founded Ubik Studio, a desktop-native AI research platform built around human-in-the-loop workflows. I lead product design and user research — designing approval flows, citation verification interfaces, and the UX patterns that make agentic tools feel trustworthy.',
    url: 'https://ubik.studio',
    gallery: ['/ubik-studio-1.webp', '/ubik-studio-2.webp', '/ubik-studio-3.webp', '/ubik-studio-4.webp'],
  },
  {
    label: 'aka.write', description: 'essays & research', color: '#5a9600',
    detail: 'Updating irregularly with personal research, reflection pieces, and rants.',
    url: 'https://kraa.io/akaieuan',
  },
  {
    label: 'Visualizer Eden', description: 'interactive 3D audio tool', color: '#00796b',
    detail: 'A browser-based audio visualizer I built. Upload any WAV file and watch it warp a reactive 3D form in real time. Choose from material presets — glass, chrome, goo, pearl, holographic — and tweak roughness, metalness, and distortion. Built with React Three Fiber and custom GLSL shaders, it analyzes frequency data in real time to drive mesh deformation and material properties.',
    url: '/Visualizer-Eden',
    media: { type: 'video', src: '/visualizer-eden-preview.webm' },
  },
  {
    label: 'Instagram', description: 'live sets & process', color: '#a8334a',
    detail: 'I post live playthroughs, unreleased tracks, and DJ sets. Instagram is my testing ground — a place to learn what listeners are feeling, what they want to dance to. I record all my tracks live so it\'s the best way to document that process.',
    url: 'https://instagram.com/aka.ieuan/',
    media: { type: 'image', src: '/instagram-grid.png' },
  },
  {
    label: 'SoundCloud', description: 'tracks, sets & mixes', color: '#7b2fbe',
    detail: 'Primary home for original productions, DJ mixes, and live recordings. Six years of electronic music spanning DnB, tech-house, and techno — including sets from No Signal NYC and collaborations with Nevstv.',
    url: 'https://soundcloud.com/akaieuan',
  },
  {
    label: 'Bandcamp', description: 'music & merch', color: '#0277bd',
    detail: 'Full discography for digital purchase — Ubiquity, Anthrotechnica AT.M2, Chaotic Networks, v0013, Visualizer Eden, Girls Just Want Breaks. Limited merch drops here too.',
    url: 'https://akaieuan.bandcamp.com/',
  },
  {
    label: 'Spotify', description: 'streaming', color: '#1a7a44',
    detail: 'All releases streaming — albums, EPs, and singles. Over 3 million streams across platforms under aka ieuan, Mr.M4UH, abletonlivee, and yion.',
    url: 'https://open.spotify.com/artist/5OwuCYMg2wmmh3QofLLIPe',
  },
  {
    label: 'YouTube', description: 'videos & DJ sets', color: '#b71c4e',
    detail: 'Video DJ sets, live-recorded performances, and visual experiments — the Techno INC set, Nevstv collaboration, and the v0013 music video.',
    url: 'https://www.youtube.com/channel/UC6etRnx7fZEtoVAI-phCu6Q',
  },
]

const writingEntries = [
  { title: 'A Benchmark Measurement Problem', desc: 'The enterprise AI landscape faces a fundamental crisis: despite $30-40B in investment, 95% of organizations achieve zero measurable return from generative AI.', url: 'https://kraa.io/abmpinai1' },
  { title: 'The Pursuit of Parsimony [Pt.1]', desc: 'When science meets surprise, it does not collapse. Instead, science contorts, re-ritualizes, and survives through faith in ambiguity.', url: 'https://kraa.io/306857640304253952' },
  { title: 'Of Course', desc: 'I\'m both unsurprised and astonished that Sam Altman has announced ChatGPT will provide generative erotic services to its mature users.', url: 'https://kraa.io/306857605553134592' },
  { title: 'Digital Gentrification', desc: 'Digital spaces have shaped my real-world experiences. Born in the Y2K era, I experienced firsthand the impact of transformative information technology.', url: 'https://kraa.io/306942411031387136' },
  { title: 'The Gate Kept Public', desc: 'Hostile Architecture is the development of public property designed to expel undesired behavior by people and animals.', url: 'https://kraa.io/307129926200531968' },
]

function getDomain(url: string): string {
  try { return new URL(url).hostname.replace('www.', '') } catch { return url }
}

function GalleryCarousel({ images, label }: { images: string[]; label: string }) {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent(i => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setCurrent(i => (i >= images.length - 1 ? 0 : i + 1))

  return (
    <div className="mt-4">
      <div className="relative overflow-hidden rounded-lg border border-border">
        <Image
          src={images[current]}
          alt={`${label} ${current + 1}`}
          width={800}
          height={600}
          className="w-full h-auto block"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-lg bg-background/70 backdrop-blur-sm border border-border/60 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors text-xs"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-lg bg-background/70 backdrop-blur-sm border border-border/60 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors text-xs"
            >
              →
            </button>
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-200 ${i === current ? 'w-4 bg-foreground/60' : 'w-1 bg-foreground/25 hover:bg-foreground/40'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <p className="text-[10px] text-muted-foreground/30 mt-1.5 text-right tabular-nums">{current + 1} / {images.length}</p>
    </div>
  )
}

function LinkRow({
  item, isSelected, onClick, index, isInView,
}: {
  item: LinkItem; isSelected: boolean; onClick: () => void; index: number; isInView: boolean
}) {
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), index * 45)
      return () => clearTimeout(timer)
    }
  }, [isInView, hasAnimated, index])

  useEffect(() => {
    if (!isInView) setHasAnimated(false)
  }, [isInView])

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between py-3 w-full text-left border-b border-border/50 last:border-b-0"
      style={{
        opacity: hasAnimated ? 1 : 0,
        transform: hasAnimated ? 'translateX(0)' : 'translateX(-8px)',
        transition: 'opacity 0.35s ease-out, transform 0.35s ease-out',
        transitionDelay: `${index * 45}ms`,
      }}
    >
      <span
        className="text-sm font-light tracking-wide transition-colors duration-150"
        style={{ color: isSelected ? item.color : undefined }}
      >
        {!isSelected && <span className="text-foreground/70">{item.label}</span>}
        {isSelected && item.label}
      </span>
      <span className="text-[11px] font-light tracking-wide shrink-0 ml-4 text-muted-foreground/60">
        {item.description}
      </span>
    </button>
  )
}

function DetailEmptyState() {
  return (
    <p className="text-muted-foreground/45 text-sm font-light leading-relaxed max-w-md pt-0.5">
      Select a link to learn more about each platform and why it matters.
    </p>
  )
}

function DetailPanel({ item }: { item: LinkItem }) {
  const isAkaWrite = item.label === 'aka.write'
  const isVisualizerEden = item.url === '/Visualizer-Eden'

  const linkEl = isVisualizerEden ? (
    <Link
      href="/Visualizer-Eden"
      className="shrink-0 text-[11px] font-medium tracking-wide transition-opacity duration-200 hover:opacity-70"
      style={{ color: item.color }}
    >
      Open →
    </Link>
  ) : (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 text-[11px] font-medium tracking-wide transition-opacity duration-200 hover:opacity-70"
      style={{ color: item.color }}
    >
      {getDomain(item.url)} →
    </a>
  )

  return (
    <div className={`${cardClass} px-6 py-5 overflow-hidden`} key={item.label}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className="text-base font-medium tracking-wide" style={{ color: item.color }}>
          {item.label}
        </p>
        {linkEl}
      </div>

      <p className="text-[13px] font-light leading-relaxed text-muted-foreground">
        {item.detail}
      </p>

      {item.gallery && item.gallery.length > 0 && (
        <GalleryCarousel images={item.gallery} label={item.label} />
      )}

      {isAkaWrite && (
        <div className="mt-4 space-y-3.5 border-t border-border/40 pt-4">
          {writingEntries.map((entry) => (
            <a
              key={entry.title}
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <p className="text-[12px] font-medium text-foreground/65 group-hover:text-foreground/90 underline decoration-foreground/15 group-hover:decoration-foreground/45 underline-offset-2 transition-colors duration-150 flex items-center gap-1">
                {entry.title}
                <span className="no-underline text-[10px] text-foreground/25 group-hover:text-foreground/55 transition-colors duration-150">↗</span>
              </p>
              <p className="text-[11px] font-light text-muted-foreground/45 leading-relaxed mt-0.5">
                {entry.desc}
              </p>
            </a>
          ))}
        </div>
      )}

      {item.media?.type === 'image' && (
        <div className="mt-4 overflow-hidden rounded-lg border border-border relative">
          <Image src={item.media.src} alt={item.label} width={800} height={600} className="w-full h-auto block" />
        </div>
      )}

      {item.media?.type === 'video' && (
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <video autoPlay loop muted playsInline src={item.media.src} className="w-full h-auto block" />
        </div>
      )}
    </div>
  )
}

export function LinksSection() {
  const [selectedItem, setSelectedItem] = useState<LinkItem | null>(links[0])
  const [mobileIndex, setMobileIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) setIsInView(true)
        else if (!entry.isIntersecting) setIsInView(false)
      },
      { threshold: [0, 0.2, 0.5, 1] }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const toggleLink = (item: LinkItem) => {
    setSelectedItem(prev => prev?.label === item.label ? null : item)
  }

  const mobileItem = links[mobileIndex]
  const goPrev = () => setMobileIndex(i => (i === 0 ? links.length - 1 : i - 1))
  const goNext = () => setMobileIndex(i => (i >= links.length - 1 ? 0 : i + 1))

  return (
    <section ref={sectionRef} id="section-1" className="relative w-full py-24">
      <div className="w-full max-w-site mx-auto site-inset">

        <div
          className="mb-6"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.45s ease, transform 0.45s ease',
          }}
        >
          <h1 className="text-xl text-muted-foreground font-light tracking-wide">links</h1>
          <p className="text-muted-foreground/50 text-xs mt-0.5 font-light">work · writing · music · tools</p>
        </div>

        {/* Mobile: single-item navigator — detail always visible for current item */}
        <div className="md:hidden space-y-3">
          <div className={`${cardClass} px-4 py-3 flex items-center gap-3`}>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground transition-colors"
            >
              ←
            </button>
            <div className="flex-1 text-center">
              <span className="text-muted-foreground/50 text-[11px]">{mobileIndex + 1}/{links.length}</span>
              <span className="mx-1.5 text-border text-[11px]">·</span>
              <span className="text-sm font-light" style={{ color: mobileItem.color }}>{mobileItem.label}</span>
              <span className="ml-1.5 text-muted-foreground/45 text-[11px]">{mobileItem.description}</span>
            </div>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground transition-colors"
            >
              →
            </button>
          </div>

          <DetailPanel item={mobileItem} />
        </div>

        {/* Desktop: sidebar list + detail panel */}
        <div className="hidden md:flex md:flex-row md:items-start gap-4 md:gap-5">
          <div className={`${cardClass} px-5 py-4 w-full md:w-[300px] shrink-0 self-start`}>
            {links.map((item, i) => (
              <LinkRow
                key={item.label}
                item={item}
                isSelected={selectedItem?.label === item.label}
                onClick={() => toggleLink(item)}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>

          <div className="w-full md:flex-1 min-w-0 flex flex-col">
            {selectedItem ? (
              <DetailPanel item={selectedItem} />
            ) : (
              <DetailEmptyState />
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
