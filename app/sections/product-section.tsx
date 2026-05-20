'use client'

import Link from 'next/link'

const cardClass = 'rounded-2xl border border-border bg-card backdrop-blur-md p-5 sm:p-6'

/** Same hue as hero highlights: oklch(0.707 0.108 152.216) on dark; darker sage on light cards for contrast */
const labelAccent =
  'text-[10px] font-medium uppercase tracking-[0.2em] mb-2 text-[oklch(0.38_0.055_152.2)] dark:text-[oklch(0.62_0.09_152)]'
const linkAccent =
  'text-[oklch(0.4_0.08_152.2)] hover:text-[oklch(0.32_0.085_152)] dark:text-[oklch(0.707_0.108_152.216)] dark:hover:text-[oklch(0.78_0.1_152)] transition-colors duration-200'
const linkAccentSoft =
  'text-[oklch(0.44_0.07_152)] hover:text-[oklch(0.36_0.075_152)] dark:text-[oklch(0.62_0.1_152)] dark:hover:text-[oklch(0.75_0.1_152)] transition-colors duration-200'

export function ProductSection() {
  return (
    <section id="section-2" className="relative w-full py-24">
      <div className="max-w-site mx-auto site-inset">
        <div className="mb-5">
          <h1 className="text-xl text-muted-foreground font-light tracking-wide">
            product design &amp; research
          </h1>
          <p className="text-muted-foreground/50 text-xs mt-0.5 font-light">
            human-in-the-loop ai · design systems · user research · content strategy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className={cardClass}>
            <p className={labelAccent}>
              What I Build
            </p>
            <p className="text-xs font-light leading-relaxed text-muted-foreground">
              Interfaces for complex AI systems that people actually trust. Approval flows, citation verification, design systems, and the copy conventions that make agentic tools feel legible. I use Claude and Claude Code in a pipeline into Cursor; when I sketch by hand, I often pipe that through v0 or Claude first, then finish in Cursor.
            </p>
            <p className="mt-3">
              <Link
                href="/demo"
                className={`text-[11px] font-light ${linkAccent}`}
              >
                Try some interactive demos →
              </Link>
            </p>
          </div>

          <div className={cardClass}>
            <p className={labelAccent}>
              How I Validate
            </p>
            <p className="text-xs font-light leading-relaxed text-muted-foreground">
              Mixed-methods research: structured interviews, behavioral observation, and session replays, synthesized into prioritized UX decisions rather than slide-deck summaries. I anchor every cycle in trust, evidence attribution, and meaningful human control. Findings feed interaction specs, flow changes, system prompts, and microcopy in the same shipping rhythm as the product.
            </p>
          </div>

          <div className={`${cardClass} md:col-span-2`}>
            <p className={labelAccent}>
              Current Work
            </p>
            <div className="md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start">
              <p className="text-xs font-light leading-relaxed text-muted-foreground mb-2 md:mb-0 md:max-w-[200px]">
                Co-founded{' '}
                <a
                  href="https://github.com/ubik-inc/ubik-electron"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkAccent}
                >
                  Ubik Studio
                </a>
                , a desktop-native AI research platform.{' '}
                <a
                  href="https://kraa.io/team-test-log042"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkAccentSoft}
                >
                  team-test →
                </a>
              </p>
              <ul className="text-xs font-light leading-relaxed text-muted-foreground space-y-1.5 pl-3.5 list-disc marker:text-[oklch(0.55_0.055_152)] dark:marker:text-[oklch(0.5_0.07_152)]">
                <li>
                  Designed and built production-ready components and UI flows for a Next.js web app and Electron desktop app, informed by user &amp; design partner feedback, product research, and session replays.
                </li>
                <li>
                  Led user research cycles — interviews, behavioral observation, and feedback synthesis — translating findings into UX decisions for a human-in-the-loop AI tool focused on trust, evidence attribution, and human control.
                </li>
                <li>
                  Collaboratively designed approval flows and citation verification interfaces that balance automation with meaningful control, defining the UX patterns and copy conventions used across the product.
                </li>
                <li>
                  Authored product copy, microcopy, and content guidelines establishing voice, tone, and terminology standards across all user-facing surfaces.
                </li>
                <li>
                  Collaboratively built custom datasets for multi-hop research agents and designed system prompts for custom-built research agents.
                </li>
              </ul>
            </div>
          </div>

          <div className={`${cardClass} md:col-span-2`}>
            <p className={labelAccent}>
              A Measurement Problem
            </p>
            <p className="text-xs font-light leading-relaxed text-muted-foreground">
              95% of enterprise AI initiatives deliver zero measurable return, not from technology failure but from a measurement crisis. Current benchmarks saturate within months and optimize for autonomous task completion; this paper traces that gap across cognitive science, scaffolding research, and enterprise data, and argues for the assist-not-complete paradigm: AI designed to augment human agency rather than replace it.{' '}
              <a
                href="https://kraa.io/abmpinai1"
                target="_blank"
                rel="noopener noreferrer"
                className={linkAccent}
              >
                read →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
