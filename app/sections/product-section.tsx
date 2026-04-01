'use client'

const cardClass = 'rounded-2xl border border-border bg-card backdrop-blur-md p-5 sm:p-6'

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
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-400/80 mb-2">
              What I Build
            </p>
            <p className="text-xs font-light leading-relaxed text-muted-foreground">
              Interfaces for complex AI systems that people actually trust. Approval flows, citation verification, design systems, and the copy conventions that make agentic tools feel legible. I design with code, sketch by hand, draft in v0, and ship in Cursor.
            </p>
          </div>

          <div className={cardClass}>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-400/80 mb-2">
              How I Validate
            </p>
            <p className="text-xs font-light leading-relaxed text-muted-foreground">
              Mixed-methods research: structured interviews, behavioral observation, and session replays, synthesized into prioritized UX decisions rather than slide-deck summaries. I anchor every cycle in trust, evidence attribution, and meaningful human control. Findings feed interaction specs, flow changes, system prompts, and microcopy in the same shipping rhythm as the product.
            </p>
          </div>

          <div className={`${cardClass} md:col-span-2`}>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-400/80 mb-2">
              Current Work
            </p>
            <div className="md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start">
              <p className="text-xs font-light leading-relaxed text-muted-foreground mb-2 md:mb-0 md:max-w-[200px]">
                Co-founded{' '}
                <a
                  href="https://ubik.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                >
                  Ubik Studio
                </a>
                , a desktop-native AI research platform.{' '}
                <a
                  href="https://kraa.io/team-test-log042"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400/70 hover:text-emerald-300 transition-colors duration-200"
                >
                  team-test →
                </a>
              </p>
              <ul className="text-xs font-light leading-relaxed text-muted-foreground space-y-1.5 pl-3.5 list-disc marker:text-emerald-400/40">
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
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-400/80 mb-2">
              A Measurement Problem
            </p>
            <p className="text-xs font-light leading-relaxed text-muted-foreground">
              95% of enterprise AI initiatives deliver zero measurable return, not from technology failure but from a measurement crisis. Current benchmarks saturate within months and optimize for autonomous task completion; this paper traces that gap across cognitive science, scaffolding research, and enterprise data, and argues for the assist-not-complete paradigm: AI designed to augment human agency rather than replace it.{' '}
              <a
                href="https://kraa.io/abmpinai1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
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
