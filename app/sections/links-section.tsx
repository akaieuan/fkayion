'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ProjectCarousel } from '@/components/features/links/project-carousel'

/* Active tab — minimal "green secondary": sage green text + faint green tint,
   no ring. Matches the hue ~152 accent on the projects index page. */
const activeTabClass =
  'text-[oklch(0.42_0.08_152.2)] bg-[oklch(0.45_0.08_152.2_/_0.1)] dark:text-[oklch(0.74_0.1_152)] dark:bg-[oklch(0.72_0.1_152_/_0.16)]'
const inactiveTabClass =
  'text-muted-foreground/50 hover:text-foreground hover:bg-muted/40'

/* Green category tag — mirrors the projects index (/demo) page (hue ~152) for shared visual language. */
const tagAccent =
  'text-[12px] font-medium leading-snug text-[oklch(0.38_0.055_152.2)] transition-colors dark:text-[oklch(0.62_0.09_152)] group-hover:text-[oklch(0.32_0.085_152)] dark:group-hover:text-[oklch(0.78_0.1_152)]'

type Row = {
  title: string
  type?: string
  description: string
  href: string
}

type Group = {
  id: string
  label: string
  more?: { label: string; href: string }
  rows: Row[]
}

const groups: Group[] = [
  {
    id: 'projects',
    label: 'projects',
    more: { label: 'all projects', href: '/demo' },
    rows: [
      {
        title: 'Ubik Studio',
        type: 'Product',
        description:
          'Co-founded a desktop-native AI research platform built around human-in-the-loop workflows.',
        href: 'https://www.reddit.com/user/akaieuan/',
      },
      {
        title: 'Box Populi',
        type: 'Client project · Live site',
        description:
          'On-brand site for a NYC live-techno collective. Custom audio players over the SoundCloud Widget, multiple live streams coordinated so they never overlap, an iOS quirk handled honestly.',
        href: '/demo/box-populi',
      },
      {
        title: 'Hologram',
        type: 'Open source · Dev tool · Write-up',
        description:
          'Live observability and a read-only MCP surface for Blender → glTF pipelines — watch your AI agent work on your game assets in real time.',
        href: '/demo/hologram',
      },
      {
        title: 'akaVSTs',
        type: 'Instruments · VST3 / AU · Live',
        description:
          'Three Ableton-ready instrument plugins I play live — acid synth + sequencer, 4-layer lo-fi synth, and a sculpting sampler. Built for live recording with dedicated FX and performance-focused master controls.',
        href: '/demo/akavsts',
      },
      {
        title: 'Collapse',
        type: 'Open source · Dev tool',
        description:
          'Pattern → SKILL.md compiler for Claude Code — pluggable ingestors feed a typed pipeline with local atomic writes. Cross-stack skills that move with you between React, Vue, Nuxt, and Qiskit.',
        href: '/demo/collapse',
      },
      {
        title: 'akaCOVART',
        type: 'Open source · Generative studio',
        description:
          'A generative album-art engine — shape it, sync the motion to your track, and export the cover. Every cover is reproducible: engine + seed + a few parameters.',
        href: '/demo/akacovart',
      },
      {
        title: 'HITL Kit',
        type: 'Open source · Write-up',
        description: 'Eleven HITL primitives, shadcn registry, and a personal research paper.',
        href: '/demo/hitl-kit',
      },
      {
        title: 'EVAL Kit',
        type: 'Open source · Write-up',
        description:
          'Agent eval framework: human scoring, YAML suites, local dashboard, CLI; five dimensions LLM judges miss.',
        href: '/demo/eval-kit',
      },
      {
        title: 'How I Work',
        type: 'Narrative · Demos',
        description:
          'Product design, validation, and how the Kit, Research OS, and team test log connect.',
        href: '/demo/hitl-practice',
      },
      {
        title: 'User feedback + design log',
        type: 'HITL-AI · External',
        description: 'HITL-AI team test log on Kraa.',
        href: 'https://kraa.io/team-test-log042',
      },
      {
        title: 'Inertial — Content Moderation Tool',
        type: 'Open source · Write-up',
        description:
          'Reference architecture for auditable AI content review: typed signals, YAML policy, hash-chained audit log, reviewer dashboard, eval harness.',
        href: '/demo/inertial',
      },
      {
        title: 'Null Browser',
        type: 'Open source · Write-up',
        description:
          'Privacy-first Tauri browser: zero telemetry, local-first AI, six invariants, every connection visible. Pre-v0.1.',
        href: '/demo/null-browser',
      },
      {
        title: 'Procedural Asset Pipeline Engineering',
        type: 'Write-up',
        description:
          'Private WIP: procedural Blender→glTF→Godot pipeline, programmatic animation, browser previews.',
        href: '/demo/brooklyn-dead',
      },
      {
        title: 'Wrdef (Wordle + definition)',
        type: 'Write-up',
        description:
          'Five-letter guessing game powered by definitions, bonus rounds, and a locally saved dictionary.',
        href: '/demo/wrdef',
      },
      {
        title: 'Research OS',
        type: 'Interactive demo',
        description:
          'Multi-panel workspace with agentic search and human-in-the-loop approval flows.',
        href: '/demo/research-os',
      },
      {
        title: 'Music Analysis Chat',
        type: 'Interactive demo',
        description: 'Music analytics assistant with roster dashboards and rich chat blocks.',
        href: '/demo/music-analysis-chat',
      },
      {
        title: 'Visualizer Eden',
        type: 'Audio tool',
        description:
          '3D audio visualizer — reactive mesh deformation and custom GLSL shaders.',
        href: '/demo/visualizer-eden',
      },
    ],
  },
  {
    id: 'writing',
    label: 'writing',
    more: { label: 'aka.write', href: 'https://kraa.io/akaieuan' },
    rows: [
      {
        title: 'A Benchmark Measurement Problem',
        type: 'Essay · AI',
        description: '95% of orgs achieve zero measurable return from generative AI — why.',
        href: 'https://kraa.io/abmpinai1',
      },
      {
        title: 'The Pursuit of Parsimony [Pt.1]',
        type: 'Essay · Science',
        description:
          'When science meets surprise it contorts and survives through faith in ambiguity.',
        href: 'https://kraa.io/306857640304253952',
      },
      {
        title: 'Of Course',
        type: 'Essay · AI',
        description:
          'On Sam Altman announcing ChatGPT will provide generative erotic services to mature users.',
        href: 'https://kraa.io/306857605553134592',
      },
      {
        title: 'Digital Gentrification',
        type: 'Essay · Tech',
        description:
          'Notes on transformative information technology, from a Y2K kid.',
        href: 'https://kraa.io/306942411031387136',
      },
      {
        title: 'The Gate Kept Public',
        type: 'Essay · Urbanism',
        description:
          'Hostile architecture: public property designed to expel undesired behavior by people and animals.',
        href: 'https://kraa.io/307129926200531968',
      },
      {
        title: 'Teacher Issues: Classroom Crisis',
        type: 'Essay · Education',
        description:
          'How the classroom has changed in the modern era — teacher problems and their fallout.',
        href: 'https://ubikstu.substack.com/p/teacher-issues-classroom-crisis',
      },
    ],
  },
  {
    id: 'music',
    label: 'music',
    rows: [
      {
        title: 'SoundCloud',
        type: 'Audio · Streaming',
        description: 'tracks · sets · mixes',
        href: 'https://soundcloud.com/akaieuan',
      },
      {
        title: 'Bandcamp',
        type: 'Music · Store',
        description: 'music · merch',
        href: 'https://akaieuan.bandcamp.com/',
      },
      {
        title: 'Spotify',
        type: 'Audio · Streaming',
        description: 'aka ieuan',
        href: 'https://open.spotify.com/artist/5OwuCYMg2wmmh3QofLLIPe',
      },
      {
        title: 'YouTube',
        type: 'Video · Streaming',
        description: 'videos · DJ sets',
        href: 'https://www.youtube.com/channel/UC6etRnx7fZEtoVAI-phCu6Q',
      },
    ],
  },
  {
    id: 'social',
    label: 'social',
    rows: [
      {
        title: 'Instagram',
        type: 'Social',
        description: 'Live playthroughs, unreleased tracks, DJ sets.',
        href: 'https://instagram.com/aka.ieuan/',
      },
      {
        title: 'GitHub',
        type: 'Code · Open source',
        description: 'github.com/akaieuan',
        href: 'https://github.com/akaieuan',
      },
      {
        title: 'LinkedIn',
        type: 'Professional',
        description: 'linkedin.com/in/ieuan-king',
        href: 'https://www.linkedin.com/in/ieuan-king/',
      },
      {
        title: 'Reddit',
        type: 'Community',
        description: 'reddit.com/user/akaieuan',
        href: 'https://www.reddit.com/user/akaieuan/',
      },
    ],
  },
]

function RowItem({ row }: { row: Row }) {
  const isExternal = /^https?:\/\//.test(row.href)
  const linkClass =
    'group block rounded-md px-2 py-1.5 -mx-2 transition-colors hover:bg-muted/30'
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[14px] font-light leading-snug tracking-[-0.01em] text-foreground pr-2">
          {row.title}
        </h3>
        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/35 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
      </div>
      {row.type && <p className={`mt-px ${tagAccent}`}>{row.type}</p>}
      <p className="mt-0.5 text-[12px] font-light leading-snug text-muted-foreground/75">
        {row.description}
      </p>
    </>
  )

  return (
    <li>
      {isExternal ? (
        <a href={row.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {body}
        </a>
      ) : (
        <Link href={row.href} className={linkClass}>
          {body}
        </Link>
      )}
    </li>
  )
}

function MoreLink({ more }: { more: { label: string; href: string } }) {
  const isExternal = /^https?:\/\//.test(more.href)
  const cls =
    'text-[11px] font-light text-muted-foreground/60 hover:text-foreground transition-colors inline-flex items-center gap-1 whitespace-nowrap'
  const inner = (
    <>
      {more.label}
      <ArrowUpRight className="h-3 w-3 opacity-70" aria-hidden />
    </>
  )
  return isExternal ? (
    <a href={more.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={more.href} className={cls}>
      {inner}
    </Link>
  )
}

export function LinksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [activeId, setActiveId] = useState<string>('projects')

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

  const active = groups.find((g) => g.id === activeId) ?? groups[0]

  return (
    <section ref={sectionRef} id="section-1" className="relative w-full py-20">
      <div className="w-full max-w-site mx-auto site-inset">
        <div
          className="mb-6"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.45s ease, transform 0.45s ease',
          }}
        >
          <h1 className="text-xl text-muted-foreground font-light tracking-wide">Who i am</h1>
          <p className="text-muted-foreground/50 text-xs mt-0.5 font-light">
            applied ai · anthropology · product design · electronic music
          </p>
          <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground max-w-xl">
            A product designer and technical anthropologist working on the human side of applied
            AI: discovery, approval flows, and the interfaces that make agents legible and worth
            trusting. Plus the agent training, front-end, and procedural 3D work behind them.
          </p>
        </div>

        <div className="w-full">
          {/* `-ml-2.5` offsets the active pill's left padding so the first tab's text aligns with the heading above. */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex flex-wrap items-center gap-x-1 gap-y-1 -ml-2.5">
            {groups.map((g) => {
              const isActive = g.id === activeId
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setActiveId(g.id)}
                  aria-pressed={isActive}
                  className={`px-2.5 py-1 rounded-md text-[12px] font-light tracking-wide transition-colors ${
                    isActive ? activeTabClass : inactiveTabClass
                  }`}
                >
                  {g.label}
                </button>
              )
            })}
            </div>
            {active.more && <MoreLink more={active.more} />}
          </div>

          {/* The `projects` tab is a horizontal card carousel (distinct from the /demo index);
              every other tab keeps the text-list rendering. The shared min-height below is sized to
              the tallest tab at each breakpoint so switching tabs NEVER moves the page. */}
          <div className="min-h-[580px] sm:min-h-[384px]">
            {activeId === 'projects' ? (
              <ProjectCarousel />
            ) : (
              <ul
                key={activeId}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3 p-0 list-none content-start items-start animate-in fade-in duration-200"
              >
                {active.rows.map((row) => (
                  <RowItem key={row.href} row={row} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
