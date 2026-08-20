'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { FeaturedGrid } from '@/components/features/links/featured-grid'
import { CoverList, type CoverRow } from '@/components/features/links/cover-list'

/**
 * The middle of the landing: who I am, then the work, then the writing and the
 * music.
 *
 * These used to be four tabs. Stacking them is fewer decisions for a reader and
 * one less thing to operate: the whole page is now something you scroll rather
 * than something you drive. Projects keep their cards, which earn the space.
 * Writing and music are lists, because a title and a line is all either needs,
 * and the socials moved to the footer where links of that kind belong.
 */

type Row = {
  title: string
  type?: string
  description: string
  href: string
}

const writing: Row[] = [
  {
    title: 'A Benchmark Measurement Problem',
    type: 'Essay · AI',
    description: '95% of orgs achieve zero measurable return from generative AI, and why.',
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
    description: 'Notes on transformative information technology, from a Y2K kid.',
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
      'How the classroom has changed in the modern era, and the fallout for teachers.',
    href: 'https://ubikstu.substack.com/p/teacher-issues-classroom-crisis',
  },
]

/**
 * Playlists rather than an embedded player. A cover that appears when you point
 * at the name says what a record looks like without the page loading a widget,
 * autoplaying at anyone, or asking to be operated.
 */
const releases: CoverRow[] = [
  {
    title: 'Healthiest TRX',
    meta: 'Playlist · aka ieuan',
    href: 'https://soundcloud.com/akaieuan/sets/aka-ieuan-healthiest-trx',
    cover: '/music-healthiest-trx.webp',
  },
  {
    title: 'Releases, all',
    meta: 'Playlist · the whole catalogue',
    href: 'https://soundcloud.com/akaieuan/sets/aka-ieuan-releases-all',
    cover: '/music-releases-all.webp',
  },
  {
    title: 'VM4UH · Vitamixes 4 Ur Health',
    meta: 'Playlist · mixes',
    href: 'https://soundcloud.com/akaieuan/sets/vm4uh-vitamixes-4-ur-health',
    cover: '/music-vm4uh.webp',
  },
]

/*
 * Set in plain sentence case at reading size rather than as tiny letterspaced
 * capitals. The caps read as a system label; the word on its own reads as
 * someone talking, which is the register the rest of the page is in.
 */
const heading = 'text-[15px] font-normal tracking-tight text-foreground'

/** A list entry: the name, and one line saying what it is. */
function RowItem({ row }: { row: Row }) {
  const external = /^https?:\/\//.test(row.href)
  const body = (
    <>
      <span className="flex flex-wrap items-baseline gap-x-3">
        <span className="text-[14px] font-light tracking-tight text-foreground/85 underline decoration-transparent underline-offset-[5px] transition-colors duration-200 group-hover:text-foreground group-hover:decoration-foreground/30">
          {row.title}
        </span>
        {row.type && (
          <span className="text-[11px] font-light text-muted-foreground/40">{row.type}</span>
        )}
      </span>
      <span className="mt-0.5 block text-[12.5px] font-light leading-relaxed text-muted-foreground/55 transition-colors duration-200 group-hover:text-muted-foreground/80">
        {row.description}
      </span>
    </>
  )

  return (
    <li>
      {external ? (
        <a
          href={row.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block py-2.5"
        >
          {body}
        </a>
      ) : (
        <Link href={row.href} className="group block py-2.5">
          {body}
        </Link>
      )}
    </li>
  )
}

function MoreLink({ more }: { more: { label: string; href: string } }) {
  const external = /^https?:\/\//.test(more.href)
  const cls =
    'text-[11px] font-light text-muted-foreground/60 hover:text-foreground transition-colors inline-flex items-center gap-1 whitespace-nowrap'
  const inner = (
    <>
      {more.label}
      <ArrowUpRight className="h-3 w-3 opacity-70" aria-hidden />
    </>
  )
  return external ? (
    <a href={more.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={more.href} className={cls}>
      {inner}
    </Link>
  )
}

function SectionHead({
  title,
  more,
}: {
  title: string
  more?: { label: string; href: string }
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <h2 className={heading}>{title}</h2>
      {more && <MoreLink more={more} />}
    </div>
  )
}

export function LinksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

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

  return (
    <section ref={sectionRef} id="section-1" className="relative w-full py-20">
      <div className="w-full max-w-site mx-auto site-inset">
        <div
          className="mb-16 max-w-[40rem]"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.45s ease, transform 0.45s ease',
          }}
        >
          <h1 className={heading}>Who I am</h1>
          <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
            A product designer and technical anthropologist working on the human side of applied
            AI: discovery, approval flows, and the interfaces that make agents legible and worth
            trusting. Plus the agent training, front-end, and procedural 3D work behind them.
          </p>
        </div>

        <div className="mb-16">
          <SectionHead title="Projects" more={{ label: 'all projects', href: '/demo' }} />
          <FeaturedGrid />
        </div>

        {/* Prose sits in its own measure, so a heading and its link stay
            together instead of being flung to the container's far edge. */}
        <div className="mb-16 max-w-[40rem]">
          <SectionHead title="Writing" more={{ label: 'aka.write', href: 'https://kraa.io/akaieuan' }} />
          <ul className="list-none p-0">
            {writing.map((row) => (
              <RowItem key={row.href} row={row} />
            ))}
          </ul>
        </div>

        <div className="max-w-[40rem]">
          <SectionHead title="Music" more={{ label: 'soundcloud', href: 'https://soundcloud.com/akaieuan' }} />
          <CoverList items={releases} />
        </div>
      </div>
    </section>
  )
}
