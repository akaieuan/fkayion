import { ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'
import { BlockpadMark } from '@/components/ui/blockpad-mark'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { WriteUpHeader } from '@/components/features/demo/write-up-header'
import { PATH } from '@/components/features/demo/blockpad/shared'
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

export { metadata } from '@/components/features/demo/blockpad/shared'

export default function BlockpadPage() {
  return (
    <DemoShell>
      <WriteUpHeader
        kicker="Personal tool · macOS · MIT"
        title="Blockpad"
        mark={<BlockpadMark size={84} title="" className="shrink-0" />}
        description={
          <>
            A macOS sketchpad that opens on a hotkey and hands drawings to whatever coding agent
            you&apos;re in. You draw where the boxes go, press copy, and paste. The agent gets the
            layout as exact structure, not a paragraph and not a screenshot.
          </>
        }
        hero={
          <DemoImage
            src="/blockpad/blockpad-hero.webp"
            alt="The Blockpad window: a floating canvas with a filter panel sketched on it, a collapsible inspector rail, and a tool dock along the bottom"
            width={1600}
            height={1003}
            className="block h-auto w-full"
            priority
          />
        }
        caption={
          <>
            One window, one canvas, one Copy button. It opens over whatever you are already in, and
            the dock sits along the bottom so the top edge of the drawing stays clear.
          </>
        }
        actions={
          <>
            <a
              href="https://github.com/akaieuan/blockpad"
              target="_blank"
              rel="noopener noreferrer"
              className="aka-button"
            >
              GitHub — akaieuan/blockpad
              <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
            </a>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-13 font-medium text-foreground">
              M0 shipped · M1 delivery in progress
            </span>
          </>
        }
        byline={
          <>
            Free and MIT licensed. Swift 6, SwiftUI, AppKit, macOS 14+, one dependency. Built for
            myself, open because there is no reason for it not to be.
          </>
        }
      />

      <PlainSummary path={PATH} />

      <div className="mt-12 aka-prose">
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
    </DemoShell>
  )
}
