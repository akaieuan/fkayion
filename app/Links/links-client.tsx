'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { UnifiedDynamicOrb } from '@/components/shared/orbs'

// Greenish-white hover color matching orb
const hoverColor = '#44ddaa'

interface Link {
  label: string
  url: string
  color: string
  hoverColor: string
}

interface WritingLink {
  label: string
  url: string
  description: string
}

interface LinksClientProps {
  linksData: Link[]
  writingLinks?: WritingLink[]
  musicLinks?: WritingLink[]
  projectLinks?: WritingLink[]
}

function GridLinkItem({ 
  link, 
  index,
  onHover,
}: { 
  link: Link
  index: number
  onHover: (label: string | null) => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 60)
    return () => clearTimeout(timer)
  }, [index])
  
  const handleMouseEnter = () => { setIsHovered(true); onHover(link.label) }
  const handleMouseLeave = () => { setIsHovered(false); onHover(null) }

  const getInitialTransform = () => {
    const directions = [
      'translate3d(-20px, -20px, 0)', 'translate3d(0, -25px, 0)', 'translate3d(20px, -20px, 0)',
      'translate3d(-25px, 0, 0)', 'translate3d(0, 0, 0) scale(0.8)', 'translate3d(25px, 0, 0)',
      'translate3d(-20px, 20px, 0)', 'translate3d(0, 25px, 0)', 'translate3d(20px, 20px, 0)',
    ]
    return directions[index] || 'translate3d(0, 20px, 0)'
  }
  
  return (
    <button
      type="button"
      onClick={() => window.open(link.url, '_blank')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative py-3 px-2 sm:px-4 text-left transition-all duration-300 group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? 'translate3d(0, 0, 0) scale(1)' 
          : getInitialTransform(),
        transition: `opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)`,
        transitionDelay: `${index * 60}ms`,
      }}
    >
      <span 
        className="relative text-base sm:text-sm font-light tracking-wide transition-colors duration-200"
        style={{
          color: isHovered ? hoverColor : 'rgba(255,255,255,0.5)',
        }}
      >
        {link.label}
      </span>
    </button>
  )
}

function WritingLinkItem({ item, index }: { item: WritingLink; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const isExternal = /^https?:\/\//.test(item.url)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 60 + 200)
    return () => clearTimeout(timer)
  }, [index])

  const style = {
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
    transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
    transitionDelay: `${index * 60}ms`,
  } as const

  const inner = (
    <>
      <span
        className="text-sm font-light tracking-wide"
        style={{
          color: isHovered ? '#aaff44' : 'rgba(255,255,255,0.55)',
          transition: 'color 0.2s ease',
        }}
      >
        {item.label}
      </span>
      <span
        className="text-[10px] font-light tracking-wide shrink-0 ml-4"
        style={{
          color: isHovered ? 'rgba(170,255,68,0.45)' : 'rgba(255,255,255,0.2)',
          transition: 'color 0.2s ease',
        }}
      >
        {item.description}
      </span>
    </>
  )

  if (isExternal) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-between py-2.5 group"
        style={style}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link
      href={item.url}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center justify-between py-2.5 group"
      style={style}
    >
      {inner}
    </Link>
  )
}

export function LinksClient({
  linksData,
  writingLinks = [],
  musicLinks = [],
  projectLinks = [],
}: LinksClientProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [mobileLinkIndex, setMobileLinkIndex] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(max-width: 767px)').matches) return
    setHoveredLink(linksData[mobileLinkIndex]?.label ?? null)
  }, [mobileLinkIndex, linksData])

  const handleLinkHover = (linkLabel: string | null) => {
    setHoveredLink(linkLabel)
  }

  const goNextMobile = useCallback(() => {
    setMobileLinkIndex((i) => (i >= linksData.length - 1 ? 0 : i + 1))
  }, [linksData.length])

  const openCurrentMobileLink = useCallback(() => {
    const link = linksData[mobileLinkIndex]
    if (link) window.open(link.url, '_blank')
  }, [mobileLinkIndex, linksData])

  const activeLinkForOrb = hoveredLink
  const defaultColor = linksData[0]?.color || '#6655cc'
  const defaultHover = linksData[0]?.hoverColor || '#aa88ff'
  const orbColor = activeLinkForOrb 
    ? linksData.find(link => link.label === activeLinkForOrb)?.color || defaultColor
    : defaultColor
  const orbHoverColor = activeLinkForOrb 
    ? linksData.find(link => link.label === activeLinkForOrb)?.hoverColor || defaultHover
    : defaultHover

  return (
    <div className="relative w-full min-h-screen">
      <div className="absolute inset-0">
        <UnifiedDynamicOrb
          activeLink={activeLinkForOrb}
          color={orbColor}
          hoverColor={orbHoverColor}
          size={0.9}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1 flex items-center md:items-center">
          <div className="relative w-full px-4 pt-14 pb-16 sm:px-6 md:px-12 lg:px-16">
            <div className="mb-6">
              <h1 className="text-lg sm:text-xl text-gray-500/80 font-light tracking-wide">
                links
              </h1>
              <p className="text-white/25 text-xs mt-1 font-light">
                social · music · writing
              </p>
            </div>

            <div className="relative z-30 md:z-0">
              <div className="absolute -inset-4 bg-zinc-800/80 backdrop-blur-2xl backdrop-saturate-150 rounded-2xl -z-10 hidden md:block" />

              <div className="md:hidden w-full max-w-[min(100%,17rem)]">
                <div className="flex flex-col items-stretch gap-2.5">
                  <button
                    type="button"
                    onClick={openCurrentMobileLink}
                    className="w-full rounded-[1rem] border border-white/[0.12] bg-zinc-900/40 px-3.5 py-2.5 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] active:scale-[0.99] active:bg-white/[0.07]"
                  >
                    <span className="text-[13px] font-light tracking-wide text-white/[0.9]">
                      {linksData[mobileLinkIndex]?.label}
                    </span>
                  </button>
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      aria-label="Next link"
                      onClick={goNextMobile}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.85rem] border border-white/[0.14] bg-white/[0.04] text-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/25 hover:bg-emerald-400/[0.08] hover:text-emerald-200/90 active:scale-95"
                    >
                      <span className="text-[13px] font-light leading-none">→</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-2 w-full max-w-[280px] sm:max-w-[340px] md:max-w-[360px] p-3 sm:p-2">
                {linksData.slice(0, 9).map((link, index) => (
                  <GridLinkItem 
                    key={link.label}
                    link={link}
                    index={index}
                    onHover={handleLinkHover}
                  />
                ))}
              </div>
            </div>

            {projectLinks.length > 0 && (
              <div className="mt-8">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/25 mb-3">
                  projects
                </p>
                <div className="max-w-[360px]">
                  {projectLinks.map((item, i) => (
                    <WritingLinkItem key={item.label} item={item} index={i} />
                  ))}
                </div>
              </div>
            )}

            {writingLinks.length > 0 && (
              <div className="mt-8">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/25 mb-3">
                  aka-extra/links
                </p>
                <div className="max-w-[360px]">
                  {writingLinks.map((item, i) => (
                    <WritingLinkItem key={item.label} item={item} index={i} />
                  ))}
                </div>
              </div>
            )}

            {musicLinks.length > 0 && (
              <div className="mt-8">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/25 mb-3">
                  music
                </p>
                <div className="max-w-[360px]">
                  {musicLinks.map((item, i) => (
                    <WritingLinkItem key={item.label} item={item} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pb-6 flex justify-center pointer-events-none">
          <p className="text-white/15 text-xs font-light md:hidden">
            ← → browse · orb updates · tap to open
          </p>
          <p className="text-white/15 text-xs font-light hidden md:block">
            hover or tap to interact
          </p>
        </div>
      </div>
    </div>
  )
}
