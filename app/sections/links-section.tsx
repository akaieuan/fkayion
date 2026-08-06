'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { FeaturedGrid } from '@/components/features/links/featured-grid'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

/* Tabs: quiet monochrome; the active tab carries the site's single green accent. */
const activeTabClass = 'text-primary'
const inactiveTabClass = 'text-muted-foreground/50 hover:text-foreground'

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
    rows: [], // rendered as the FeaturedGrid card set, not text rows
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
        href: 'https://www.akaoss.dev/paper',
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
      {
        title: '4UH',
        type: 'Live · NYC',
        description: 'the party, the lineups, the recordings',
        href: 'https://4uhnyc.com',
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
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[14px] font-light leading-snug tracking-[-0.01em] text-foreground">
          {row.title}
        </h3>
        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/35 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
      </div>
      <p className="mt-1 text-[12px] font-light leading-snug text-muted-foreground/75">
        {row.description}
      </p>
      {row.type && (
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2.5">
          {row.type.split(' · ').map((t) => (
            <Badge key={t} variant="tag">
              {t}
            </Badge>
          ))}
        </div>
      )}
    </>
  )

  // Same class string as the project cards, so a wall of links and a wall of
  // projects read as one system.
  const cls =
    'group flex h-full flex-col p-4 transition-colors hover:border-foreground/20 hover:bg-muted/30'

  return (
    <li className="h-full">
      <Card asChild className={cls}>
        {isExternal ? (
          <a href={row.href} target="_blank" rel="noopener noreferrer">
            {body}
          </a>
        ) : (
          <Link href={row.href}>{body}</Link>
        )}
      </Card>
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
          <h1 className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
            Who I am
          </h1>
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

          {/* `projects` renders the six flagship cards; the other tabs are link
              lists. Sized to content — a min-height tuned to the tallest tab left
              the three short ones opening onto a screen of dead space. */}
          <div className="min-h-[320px]">
            {activeId === 'projects' ? (
              <FeaturedGrid />
            ) : (
              <ul
                key={activeId}
                className="grid auto-rows-fr grid-cols-1 gap-4 p-0 list-none sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-200"
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
