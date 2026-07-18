'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image, { type StaticImageData } from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Static imports → Next reads dimensions at build time and inlines an auto-generated
// blur placeholder, so cards paint instantly (blur → image) instead of holding blank.
import covartSplash from '@/public/covart-splash.webp'
import akableepSynth from '@/public/akableep-synth.webp'
import collapseHome from '@/public/collapse-home.webp'
import boxPopuliHero from '@/public/box-populi-hero.webp'
import hitlKitHero from '@/public/hitl-kit-hero.png'
import inertialDashboard from '@/public/inertial-dashboard.png'
import circleheadsMark from '@/public/circleheads.webp'
import akaossMark from '@/public/akaoss.webp'

type CarouselItem = {
  name: string
  href: string
  img: StaticImageData
  brief: string
  tags: string[]
}

const FEATURED: CarouselItem[] = [
  {
    name: 'Circleheads',
    href: '/demo/circleheads',
    img: circleheadsMark,
    brief: 'Applied-AI software studio — agents in production, a short consulting bench, and games.',
    tags: ['Studio', 'Applied AI'],
  },
  {
    name: 'akaOSS',
    href: '/demo/akaoss',
    img: akaossMark,
    brief: 'Open-source studio for human-in-the-loop AI — five projects, one thesis, a live research feed.',
    tags: ['Open source', 'HITL AI'],
  },
  {
    name: 'akaCOVART',
    href: '/demo/akacovart',
    img: covartSplash,
    brief: 'A generative album-art engine — shape it, sync motion to your track, export the cover.',
    tags: ['Generative', 'Album art'],
  },
  {
    name: 'akaVSTs',
    href: '/demo/akavsts',
    img: akableepSynth,
    brief: 'Three Ableton-ready instrument plugins, built to be played live.',
    tags: ['VST3 / AU', 'Live'],
  },
  {
    name: 'Collapse',
    href: '/demo/collapse',
    img: collapseHome,
    brief: 'Pattern → SKILL.md compiler — cross-stack skills that move with you.',
    tags: ['Dev tool', 'Claude Code'],
  },
  {
    name: 'Box Populi',
    href: '/demo/box-populi',
    img: boxPopuliHero,
    brief: 'On-brand site for a NYC live-techno collective.',
    tags: ['Client', 'Live site'],
  },
  {
    name: 'HITL Kit',
    href: '/demo/hitl-kit',
    img: hitlKitHero,
    brief: 'Eleven HITL primitives, a shadcn registry, and a research paper.',
    tags: ['Open source', 'Write-up'],
  },
  {
    name: 'Inertial',
    href: '/demo/inertial',
    img: inertialDashboard,
    brief: 'Auditable AI content-moderation reference architecture.',
    tags: ['Open source', 'Write-up'],
  },
]

const chip =
  'rounded-md border border-border/60 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[oklch(0.4_0.08_152.2)] dark:text-[oklch(0.62_0.09_152)]'

function CardInner({ item }: { item: CarouselItem }) {
  return (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/10">
        <Image
          src={item.img}
          alt={item.name}
          fill
          placeholder="blur"
          sizes="(min-width:1024px) 340px, (min-width:640px) 45vw, 90vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-4">
        <h3 className="text-[14px] font-light tracking-[-0.01em] text-foreground">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-[12px] font-light leading-snug text-muted-foreground/75">
          {item.brief}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span key={tag} className={chip}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

/* ---------------------------------- desktop --------------------------------- */

function DesktopCarousel({ items }: { items: CarouselItem[] }) {
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
    const cardWidth = first ? first.offsetWidth + 16 : el.clientWidth
    el.scrollBy({ left: dir * cardWidth, behavior: 'smooth' })
  }, [])

  const navBtn =
    'inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground/70 transition-colors hover:bg-muted/40 hover:text-foreground disabled:pointer-events-none disabled:opacity-30'

  return (
    <div className="hidden md:block">
      <div className="mb-2.5 flex justify-end gap-1.5">
        <button type="button" aria-label="Previous" onClick={() => scrollByCard(-1)} disabled={!canPrev} className={navBtn}>
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Next" onClick={() => scrollByCard(1)} disabled={!canNext} className={navBtn}>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div
        ref={scrollRef}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); scrollByCard(1) }
          else if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByCard(-1) }
        }}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div key={item.href} className="snap-start shrink-0 basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]">
            <Link
              href={item.href}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card/40 transition-colors hover:bg-muted/30"
            >
              <CardInner item={item} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ----------------------------- mobile: stacked deck ----------------------------- */

function StackedDeck({ items }: { items: CarouselItem[] }) {
  const n = items.length
  const [index, setIndex] = useState(0)
  const [drag, setDrag] = useState(0)
  const [animating, setAnimating] = useState(false)
  const startX = useRef<number | null>(null)
  const moved = useRef(false)

  const advance = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + n) % n), [n])

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX
    moved.current = false
    setAnimating(false)
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (startX.current == null) return
    const dx = e.clientX - startX.current
    if (Math.abs(dx) > 4) moved.current = true
    setDrag(dx)
  }
  const onPointerUp = () => {
    if (startX.current == null) return
    const dx = drag
    startX.current = null
    setAnimating(true)
    if (Math.abs(dx) > 70) advance(dx < 0 ? 1 : -1)
    setDrag(0)
  }

  // Front card + a few peeking below for a rolodex feel.
  const stack = [0, 1, 2, 3].slice(0, n).map((o) => ({ item: items[(index + o) % n], o }))

  return (
    <div className="md:hidden">
      <div className="relative mx-auto h-[404px] w-full max-w-[22rem] select-none">
        {stack
          .slice()
          .reverse()
          .map(({ item, o }) => {
            const isTop = o === 0
            const style: React.CSSProperties = isTop
              ? {
                  transform: `translateX(${drag}px) rotate(${drag * 0.025}deg)`,
                  transition: animating ? 'transform 0.28s ease' : 'none',
                  zIndex: 30,
                }
              : {
                  transform: `translateY(${o * 14}px) scale(${1 - o * 0.035})`,
                  transition: 'transform 0.28s ease',
                  zIndex: 30 - o,
                  opacity: 1 - o * 0.16,
                }
            return (
              <div
                key={item.href}
                className="absolute inset-x-0 top-0"
                style={style}
                onPointerDown={isTop ? onPointerDown : undefined}
                onPointerMove={isTop ? onPointerMove : undefined}
                onPointerUp={isTop ? onPointerUp : undefined}
                onPointerCancel={isTop ? onPointerUp : undefined}
                // If the card was dragged, swallow the click so it doesn't navigate.
                onClickCapture={isTop ? (e) => { if (moved.current) { e.preventDefault(); e.stopPropagation() } } : undefined}
              >
                <Link
                  href={item.href}
                  draggable={false}
                  tabIndex={isTop ? 0 : -1}
                  aria-hidden={!isTop}
                  className="group flex touch-pan-y flex-col overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-md"
                >
                  <CardInner item={item} />
                </Link>
              </div>
            )
          })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button type="button" aria-label="Previous" onClick={() => { setAnimating(true); advance(-1) }} className="text-muted-foreground/60 transition-colors hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-1.5">
          {items.map((it, i) => (
            <span
              key={it.href}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${i === index ? 'bg-foreground/70' : 'bg-foreground/20'}`}
            />
          ))}
        </div>
        <button type="button" aria-label="Next" onClick={() => { setAnimating(true); advance(1) }} className="text-muted-foreground/60 transition-colors hover:text-foreground">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export function ProjectCarousel({ items = FEATURED }: { items?: CarouselItem[] }) {
  return (
    <div className="animate-in fade-in duration-200">
      <DesktopCarousel items={items} />
      <StackedDeck items={items} />
    </div>
  )
}
