'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type CarouselItem = {
  name: string
  href: string
  img: string
  brief: string
  tags: string[]
}

const FEATURED: CarouselItem[] = [
  {
    name: 'akaCOVART',
    href: '/demo/akacovart',
    img: '/covart-studio.webp',
    brief: 'Generative album-art studio — pick an engine, drop a seed, export a cover or video.',
    tags: ['Generative', 'Album art'],
  },
  {
    name: 'akaVSTs',
    href: '/demo/akavsts',
    img: '/akableep-synth.webp',
    brief: 'Three Ableton-ready instrument plugins, built to be played live.',
    tags: ['VST3 / AU', 'Live'],
  },
  {
    name: 'Collapse',
    href: '/demo/collapse',
    img: '/collapse-home.webp',
    brief: 'Pattern → SKILL.md compiler — cross-stack skills that move with you.',
    tags: ['Dev tool', 'Claude Code'],
  },
  {
    name: 'Box Populi',
    href: '/demo/box-populi',
    img: '/box-populi-hero.webp',
    brief: 'On-brand site for a NYC live-techno collective.',
    tags: ['Client', 'Live site'],
  },
  {
    name: 'HITL Kit',
    href: '/demo/hitl-kit',
    img: '/hitl-kit-hero.png',
    brief: 'Eleven HITL primitives, a shadcn registry, and a research paper.',
    tags: ['Open source', 'Write-up'],
  },
  {
    name: 'Inertial',
    href: '/demo/inertial',
    img: '/inertial-dashboard.png',
    brief: 'Auditable AI content-moderation reference architecture.',
    tags: ['Open source', 'Write-up'],
  },
]

function ProjectCard({ item }: { item: CarouselItem }) {
  return (
    <Link
      href={item.href}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card/40 transition-colors hover:bg-muted/30"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/10">
        <Image
          src={item.img}
          alt={item.name}
          fill
          sizes="(min-width:1024px) 340px, (min-width:640px) 45vw, 88vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-4">
        <h3 className="text-[14px] font-light tracking-[-0.01em] text-foreground">{item.name}</h3>
        <p className="mt-1 text-[12px] font-light leading-snug text-muted-foreground/75">
          {item.brief}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border/60 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[oklch(0.4_0.08_152.2)] dark:text-[oklch(0.62_0.09_152)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export function ProjectCarousel({ items = FEATURED }: { items?: CarouselItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateButtons = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    setCanPrev(el.scrollLeft > 1)
    setCanNext(el.scrollLeft < maxScroll - 1)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateButtons()
    el.addEventListener('scroll', updateButtons, { passive: true })
    window.addEventListener('resize', updateButtons)
    return () => {
      el.removeEventListener('scroll', updateButtons)
      window.removeEventListener('resize', updateButtons)
    }
  }, [updateButtons])

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = scrollRef.current
    if (!el) return
    const first = el.firstElementChild as HTMLElement | null
    const gap = 16 // gap-4 = 1rem
    const cardWidth = first ? first.offsetWidth + gap : el.clientWidth
    el.scrollBy({ left: dir * cardWidth, behavior: 'smooth' })
  }, [])

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollByCard(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollByCard(-1)
    }
  }

  const navBtn =
    'inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground/70 transition-colors hover:bg-muted/40 hover:text-foreground disabled:pointer-events-none disabled:opacity-30'

  return (
    <div className="animate-in fade-in duration-200">
      <div className="mb-2.5 flex justify-end gap-1.5">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scrollByCard(-1)}
          disabled={!canPrev}
          className={navBtn}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => scrollByCard(1)}
          disabled={!canNext}
          className={navBtn}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={scrollRef}
        onKeyDown={onKeyDown}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div
            key={item.href}
            className="snap-start shrink-0 basis-[88%] sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]"
          >
            <ProjectCard item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}
