import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'
import { BlockpadMark } from '@/components/ui/blockpad-mark'
import { PlainSummary } from '@/components/ui/plain-summary'
import { PATH } from '@/components/features/demo/blockpad/chrome'
import { WhySection } from '@/components/features/demo/blockpad/why'
import { WhereItCameFromSection } from '@/components/features/demo/blockpad/where-it-came-from'
import { PayloadSection } from '@/components/features/demo/blockpad/payload'
import { RulesSection } from '@/components/features/demo/blockpad/rules'
import { UsingItSection } from '@/components/features/demo/blockpad/using-it'
import { GuidesSection } from '@/components/features/demo/blockpad/guides'
import { StylingSection } from '@/components/features/demo/blockpad/styling'
import { DeparturesSection } from '@/components/features/demo/blockpad/departures'
import { MarkSection } from '@/components/features/demo/blockpad/mark'
import { WhyNativeSection } from '@/components/features/demo/blockpad/why-native'
import { StackSection } from '@/components/features/demo/blockpad/stack'
import { StatusSection } from '@/components/features/demo/blockpad/status'
import { NonGoalsSection } from '@/components/features/demo/blockpad/non-goals'
import { WhoBuiltItSection } from '@/components/features/demo/blockpad/who-built-it'
import { WhyItMattersSection } from '@/components/features/demo/blockpad/why-it-matters'

const kicker = 'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'

export { metadata } from '@/components/features/demo/blockpad/chrome'

export default function BlockpadPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground lg:hidden"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        {/* ---------------------------------------------------------- hero */}
        <header className="mb-6 flex items-center gap-5">
          <BlockpadMark size={84} title="" className="shrink-0" />
          <div>
            <p className={kicker}>Personal tool · macOS · MIT</p>
            <h1 className="mt-1 text-[clamp(1.7rem,5vw,2.5rem)] font-extralight leading-none tracking-tight text-foreground/90">
              Blockpad
            </h1>
          </div>
        </header>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
          A macOS sketchpad that opens on a hotkey and hands drawings to whatever coding agent
          you&apos;re in. You draw where the boxes go, press copy, and paste. The agent gets the
          layout as exact structure, not a paragraph and not a screenshot.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="https://github.com/akaieuan/blockpad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            GitHub — akaieuan/blockpad
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-[13px] font-medium text-foreground">
            M0 shipped · M1 delivery in progress
          </span>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          Free and MIT licensed. Swift 6, SwiftUI, AppKit, macOS 14+, one dependency. Built for
          myself, open because there is no reason for it not to be.
        </p>

        <figure className="-mx-6 mt-10 aka-card-well aka-card-media overflow-hidden sm:mx-0">
          <DemoImage
            src="/blockpad-hero.webp"
            alt="The Blockpad window: a floating canvas with a filter panel sketched on it, a collapsible inspector rail, and a tool dock along the bottom"
            width={1600}
            height={1003}
            className="block h-auto w-full"
            priority
          />
        </figure>
        <p className="mt-2 text-[11px] font-light text-muted-foreground/60">
          One window, one canvas, one Copy button. It opens over whatever you are already in, and
          the dock sits along the bottom so the top edge of the drawing stays clear.
        </p>

        <PlainSummary path={PATH} />

        <div className="mt-12 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          {/* --------------------------------------------------- why */}
          <WhySection />

          {/* ------------------------------------------- where it came from */}
          <WhereItCameFromSection />

          {/* ------------------------------------------------ the payload */}
          <PayloadSection />

          {/* --------------------------------------------------- the rules */}
          <RulesSection />

          {/* --------------------------------------------------- using it */}
          <UsingItSection />

          {/* ------------------------------------------------- the guides */}
          <GuidesSection />

          {/* ------------------------------------------------------ colour */}
          <StylingSection />

          {/* ------------------------------------------------ the redesign */}
          <DeparturesSection />

          {/* ---------------------------------------------------- the mark */}
          <MarkSection />

          {/* -------------------------------------------------- why native */}
          <WhyNativeSection />

          {/* --------------------------------------------------- the stack */}
          <StackSection />

          {/* -------------------------------------------------- the status */}
          <StatusSection />

          {/* ------------------------------------------------- non-goals */}
          <NonGoalsSection />

          {/* ---------------------------------------------------- who / why */}
          <WhoBuiltItSection />

          <WhyItMattersSection />
        </div>
      </article>
    </div>
  )
}
