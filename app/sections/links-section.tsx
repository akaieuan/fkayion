'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { fourUhSectionLabelMuted } from '@/components/shared/lists/four-uh-shared'

const cardClass = 'rounded-2xl border border-border bg-card backdrop-blur-md'
/** Dark shell masks Spotify’s default iframe paper color when clipped; no double border */
const SPOTIFY_EMBED_H = 152
const musicEmbedShell =
  'overflow-hidden rounded-lg bg-[#121212] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]'

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
    label: 'Projects',
    description: 'demos & tools',
    color: '#6366f1',
    detail:
      'Interactive demos and component experiments on this site: research workspaces, human-in-the-loop UI patterns, and a music-industry chat surface. Where the point is UX, those flows use mock data. Visualizer Eden is separate: Web Audio (AnalyserNode, 512-point FFT, bass/mid/high aggregation), a throttled analysis loop, React Three Fiber, and custom GLSL ShaderMaterials with audio-driven vertex displacement. The list below links to each write-up, including Eden; the full visualizer app is still the standalone Visualizer Eden route.',
    url: '/demo',
  },
  {
    label: 'aka.write', description: 'essays & research', color: '#5a9600',
    detail: 'Updating irregularly with personal research, reflection pieces, and rants.',
    url: 'https://kraa.io/akaieuan',
  },
  {
    label: 'Instagram', description: 'live sets & process', color: '#a8334a',
    detail: 'I post live playthroughs, unreleased tracks, and DJ sets. Instagram is my testing ground — a place to learn what listeners are feeling, what they want to dance to. I record all my tracks live so it\'s the best way to document that process.',
    url: 'https://instagram.com/aka.ieuan/',
    media: { type: 'image', src: '/instagram-grid.png' },
  },
  {
    label: 'music', description: 'productions · mixes · merch', color: '#7b2fbe',
    detail: 'Six years of electronic music spanning DnB, tech-house, and techno garnering 4 million+ streams',
    url: '',
  },
]

const writingEntries = [
  { title: 'A Benchmark Measurement Problem', desc: 'The enterprise AI landscape faces a fundamental crisis: despite $30-40B in investment, 95% of organizations achieve zero measurable return from generative AI.', url: 'https://kraa.io/abmpinai1' },
  { title: 'The Pursuit of Parsimony [Pt.1]', desc: 'When science meets surprise, it does not collapse. Instead, science contorts, re-ritualizes, and survives through faith in ambiguity.', url: 'https://kraa.io/306857640304253952' },
  { title: 'Of Course', desc: 'I\'m both unsurprised and astonished that Sam Altman has announced ChatGPT will provide generative erotic services to its mature users.', url: 'https://kraa.io/306857605553134592' },
  { title: 'Digital Gentrification', desc: 'Digital spaces have shaped my real-world experiences. Born in the Y2K era, I experienced firsthand the impact of transformative information technology.', url: 'https://kraa.io/306942411031387136' },
  { title: 'The Gate Kept Public', desc: 'Hostile Architecture is the development of public property designed to expel undesired behavior by people and animals.', url: 'https://kraa.io/307129926200531968' },
  { title: 'Teacher Issues: Classroom Crisis', desc: 'How has the classroom changed in the modern era? Exploring teacher problems and how the classroom is affected.', url: 'https://ubikstu.substack.com/p/teacher-issues-classroom-crisis' },
]

const musicEntries = [
  { label: 'SoundCloud', desc: 'tracks, sets & mixes', url: 'https://soundcloud.com/akaieuan' },
  { label: 'Bandcamp', desc: 'music & merch', url: 'https://akaieuan.bandcamp.com/' },
  { label: 'Spotify', desc: 'streaming', url: 'https://open.spotify.com/artist/5OwuCYMg2wmmh3QofLLIPe' },
  { label: 'YouTube', desc: 'videos & DJ sets', url: 'https://www.youtube.com/channel/UC6etRnx7fZEtoVAI-phCu6Q' },
]

/** Kept in lockstep with `app/demo/page.tsx` `projects` (order, title, description, href). */
const projectEntries: { label: string; desc: string; href: string }[] = [
  {
    label: 'Ubik Studio',
    desc: 'Co-founded and led product design at Ubik Studio, a desktop-native AI research platform for human-in-the-loop workflows.',
    href: 'https://ubik.studio',
  },
  {
    label: 'HITL Kit',
    desc: 'Design system, eleven HITL primitives, shadcn registry, and personal research paper.',
    href: '/demo/hitl-kit',
  },
  {
    label: 'How I Work',
    desc: 'Product design, validation, and how the Kit, Research OS, and team test log connect.',
    href: '/demo/hitl-practice',
  },
  {
    label: 'User feedback + design log',
    desc: 'HITL-AI team test log on Kraa.',
    href: 'https://kraa.io/team-test-log042',
  },
  {
    label: 'Procedural Asset Pipeline Engineering',
    desc: 'Private WIP: procedural Blender→glTF→Godot pipeline, programmatic animation, browser previews.',
    href: '/demo/brooklyn-dead',
  },
  {
    label: 'Wordle remake: Wrdef (Wordle + definition)',
    desc: 'A five-letter guessing game powered by definitions, bonus rounds, and a locally saved dictionary.',
    href: '/demo/wrdef',
  },
  {
    label: 'Research OS',
    desc: 'Multi-panel workspace with agentic search, chat, and human-in-the-loop approval flows.',
    href: '/demo/research-os',
  },
  {
    label: 'Music Analysis Chat',
    desc: 'Music analytics assistant with roster dashboards, creator discovery, and rich chat blocks.',
    href: '/demo/music-analysis-chat',
  },
  {
    label: 'Visualizer Eden',
    desc: 'Browser-based 3D audio visualizer with reactive mesh deformation, custom GLSL shaders, and material presets.',
    href: '/demo/visualizer-eden',
  },
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
      {images.length > 1 && (
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={prev}
            className="text-[11px] font-medium text-foreground/40 hover:text-foreground/80 transition-colors duration-150 flex items-center gap-1"
          >
            ← prev
          </button>
          <span className="text-[11px] text-muted-foreground/40 tabular-nums">
            {current + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={next}
            className="text-[11px] font-medium text-foreground/40 hover:text-foreground/80 transition-colors duration-150 flex items-center gap-1"
          >
            next →
          </button>
        </div>
      )}
      <div className="overflow-hidden rounded-lg border border-border">
        <Image
          src={images[current]}
          alt={`${label} ${current + 1}`}
          width={800}
          height={600}
          className="w-full h-auto block"
        />
      </div>
    </div>
  )
}

function LinkRow({
  item, isSelected, onClick,
}: {
  item: LinkItem; isSelected: boolean; onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between py-3 w-full text-left border-b border-border/50 last:border-b-0 rounded-md outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span
        className={`text-sm font-light tracking-wide transition-colors duration-150 ${
          isSelected ? 'text-foreground' : 'text-foreground/70'
        }`}
      >
        {item.label}
      </span>
      <span className="text-[11px] font-light tracking-wide shrink-0 ml-4 text-muted-foreground/60">
        {item.description}
      </span>
    </button>
  )
}

function DetailEmptyState() {
  return (
    <div className={`${cardClass} w-full h-full min-h-[280px] md:min-h-0 flex flex-col items-center justify-center gap-2`}>
      <p className="text-sm font-light tracking-wide text-muted-foreground/40">
        select a link to explore
      </p>
    </div>
  )
}

function DetailPanel({ item }: { item: LinkItem }) {
  const isAkaWrite = item.label === 'aka.write'
  const isMusic = item.label === 'music'
  const isProjects = item.label === 'Projects'
  const hasExternalLink = item.url && !isMusic && !isProjects

  const cardPadding = isAkaWrite ? 'px-4 py-4' : 'px-6 py-5'

  return (
    <div
      className={`${cardClass} ${cardPadding} w-full md:h-full md:min-h-0 max-h-[min(90vh,760px)] md:max-h-none overflow-y-auto overflow-x-hidden overscroll-y-contain [scrollbar-gutter:stable]`}
      key={item.label}
    >
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-3">
        <span className="text-base font-light tracking-wide text-foreground">
          {item.label}
        </span>
        {isProjects && (
          <Link
            href="/demo"
            className="text-[11px] font-light tracking-wide text-muted-foreground transition-opacity duration-200 hover:opacity-70"
          >
            All projects →
          </Link>
        )}
        {hasExternalLink && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-light tracking-wide text-muted-foreground transition-opacity duration-200 hover:opacity-70"
          >
            {getDomain(item.url)} →
          </a>
        )}
      </div>

      <p className="text-[13px] font-light leading-relaxed text-muted-foreground">
        {item.detail}
      </p>

      {item.gallery && item.gallery.length > 0 && (
        <GalleryCarousel images={item.gallery} label={item.label} />
      )}

      {isProjects && (
        <div className="mt-3 space-y-2.5 border-t border-border/40 pt-3">
          {projectEntries.map((entry) => {
            const isExternal = /^https?:\/\//.test(entry.href)
            const className = 'block group'
            const inner = (
              <>
                <p className="text-[12px] font-light text-foreground/65 group-hover:text-foreground/90 transition-colors duration-150 flex items-center gap-1">
                  {entry.label}
                  <span className="text-[10px] text-foreground/25 group-hover:text-foreground/55 transition-colors duration-150">
                    {isExternal ? '↗' : '→'}
                  </span>
                </p>
                <p className="text-[11px] font-light text-muted-foreground/45 leading-relaxed mt-0.5">
                  {entry.desc}
                </p>
              </>
            )
            return isExternal ? (
              <a
                key={entry.href}
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {inner}
              </a>
            ) : (
              <Link key={entry.href} href={entry.href} className={className}>
                {inner}
              </Link>
            )
          })}
        </div>
      )}

      {isAkaWrite && (
        <div className="mt-3 space-y-2.5 border-t border-border/40 pt-3">
          {writingEntries.map((entry) => (
            <a
              key={entry.title}
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <p className="text-[12px] font-light text-foreground/65 group-hover:text-foreground/90 transition-colors duration-150 flex items-center gap-1">
                {entry.title}
                <span className="text-[10px] text-foreground/25 group-hover:text-foreground/55 transition-colors duration-150">↗</span>
              </p>
              <p className="text-[11px] font-light text-muted-foreground/45 leading-relaxed mt-0.5">
                {entry.desc}
              </p>
            </a>
          ))}
        </div>
      )}

      {isMusic && (
        <div className="mt-4 border-t border-border/40 pt-4">
          {musicEntries.map((entry) => (
            <a
              key={entry.label}
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-2.5 border-b border-border/30 last:border-b-0 group"
            >
              <span className="text-[13px] font-light text-foreground/65 group-hover:text-foreground/90 transition-colors duration-150">
                {entry.label}
              </span>
              <span className="text-[11px] font-light text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors duration-150 ml-4 shrink-0">
                {entry.desc} ↗
              </span>
            </a>
          ))}
          <div className="mt-3 space-y-3">
            <div>
              <p className={`${fourUhSectionLabelMuted} mb-1.5`}>Spotify · aka ieuan</p>
              <div className={musicEmbedShell} style={{ height: SPOTIFY_EMBED_H }}>
                <iframe
                  title="Spotify — aka ieuan"
                  src="https://open.spotify.com/embed/artist/5OwuCYMg2wmmh3QofLLIPe?utm_source=generator"
                  width="100%"
                  height={SPOTIFY_EMBED_H}
                  frameBorder={0}
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="block h-full w-full border-0 align-top"
                />
              </div>
            </div>
            <div>
              <p className={`${fourUhSectionLabelMuted} mb-1.5`}>Spotify · yion</p>
              <div className={musicEmbedShell} style={{ height: SPOTIFY_EMBED_H }}>
                <iframe
                  title="Spotify — yion"
                  src="https://open.spotify.com/embed/artist/0SKj35DCAPNfu3KVUBTiVE?utm_source=generator"
                  width="100%"
                  height={SPOTIFY_EMBED_H}
                  frameBorder={0}
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="block h-full w-full border-0 align-top"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {item.media?.type === 'image' && (
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <Image src={item.media.src} alt={item.label} width={800} height={600} className="w-full h-auto block" />
        </div>
      )}

      {item.media?.type === 'video' && (
        <div className="mt-4 px-3 sm:px-4">
          <div className="overflow-hidden rounded-lg">
            <video autoPlay loop muted playsInline src={item.media.src} className="w-full h-auto block" />
          </div>
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
              <span className="text-sm font-light text-foreground">{mobileItem.label}</span>
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
            {links.map((item) => (
              <LinkRow
                key={item.label}
                item={item}
                isSelected={selectedItem?.label === item.label}
                onClick={() => toggleLink(item)}
              />
            ))}
          </div>

          <div className="w-full md:flex-1 min-w-0 md:h-[680px] min-h-0 flex flex-col">
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
