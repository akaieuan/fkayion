'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AkaMark } from '@/components/features/brand/aka-mark'

const keyLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ieuan-king/' },
  { label: 'aka.write', href: 'https://kraa.io/akaieuan' },
  { label: 'akaOSS', href: 'https://www.akaoss.dev' },
]

/** Entrance stagger for the hero stack, top to bottom (mirrors the studio sites). */
const reveal =
  'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-backwards motion-safe:duration-700'
const staggerDelay = (step: number) => ({ animationDelay: `${step * 120}ms` })

export function HomeSection() {
  return (
    <section id="section-0" className="relative min-h-dvh w-full">
      <div className="flex min-h-dvh items-center pt-24 md:pt-0">
        <div className="site-inset max-w-site mx-auto w-full">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-8">
            {/* animation first so it sits above the copy when the grid stacks;
                md:order restores text left, mark right on wide. */}
            <div className={`flex justify-center md:order-2 md:justify-end ${reveal}`}>
              <AkaMark size={300} grid={24} fluid />
            </div>

            <div className="flex max-w-md flex-col gap-7 md:order-1">
              <h1
                className={`text-xl font-light tracking-tight text-foreground/90 md:text-2xl ${reveal}`}
                style={staggerDelay(1)}
              >
                I build tools and create art.
              </h1>

              <p
                className={`text-[11px] font-light tracking-wide text-foreground/30 ${reveal}`}
                style={staggerDelay(2)}
              >
                {'// I also produce and perform electronic music'}
              </p>

              <div className={`flex flex-wrap items-center gap-5 ${reveal}`} style={staggerDelay(3)}>
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
