'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PixelHead } from '@/components/features/brand/pixel-head'

const keyLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ieuan-king/' },
  { label: 'aka.write', href: 'https://kraa.io/akaieuan' },
]

/** Entrance stagger for the hero stack, top to bottom (mirrors the studio sites). */
const reveal =
  'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-backwards motion-safe:duration-700'
const staggerDelay = (step: number) => ({ animationDelay: `${step * 120}ms` })

export function HomeSection() {
  return (
    <section id="section-0" className="relative min-h-dvh w-full">
      <div className="flex min-h-dvh items-center">
        <div className="site-inset max-w-site mx-auto w-full">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-8">
            {/* animation first so it sits above the copy when the grid stacks;
                md:order restores text left, mark right on wide. */}
            <div className={`flex justify-center md:order-2 md:justify-end ${reveal}`}>
              <PixelHead size={400} grid={24} faces fluid />
            </div>

            <div className="flex max-w-md flex-col gap-6 md:order-1">
              <p
                className={`text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70 ${reveal}`}
                style={staggerDelay(0)}
              >
                Product design · Technical anthropology · Brooklyn
              </p>

              <h1
                className={`text-xl font-light tracking-tight text-foreground/90 md:text-2xl ${reveal}`}
                style={staggerDelay(1)}
              >
                I build tools and create art.
              </h1>

              <p
                className={`text-sm font-light leading-relaxed text-muted-foreground ${reveal}`}
                style={staggerDelay(2)}
              >
                A product designer and technical anthropologist working on the human side of
                applied AI — discovery, approval flows, and the interfaces that make agents
                legible and worth trusting.
              </p>

              <p
                className={`text-[11px] font-light tracking-wide text-foreground/30 ${reveal}`}
                style={staggerDelay(3)}
              >
                {'// I also produce and perform electronic music'}
              </p>

              <div className={`flex flex-wrap items-center gap-5 ${reveal}`} style={staggerDelay(4)}>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  See the work
                  <ArrowRight className="h-4 w-4 opacity-80" aria-hidden />
                </Link>
                {keyLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-light text-muted-foreground/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
