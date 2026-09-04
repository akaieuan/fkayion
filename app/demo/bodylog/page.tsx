import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { BodyLogMark } from '@/components/product-replicas/bodylog/bodylog-mark'
import { BodyLogShowcase } from '@/components/product-replicas/bodylog/showcase'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { WriteUpHeader } from '@/components/features/demo/write-up-header'
import { label } from '@/components/features/demo/bodylog/shared'
import { WhySection } from '@/components/features/demo/bodylog/why'
import { WhatPeopleTrackSection } from '@/components/features/demo/bodylog/what-people-track'
import { RulesSection } from '@/components/features/demo/bodylog/rules'
import { MarkSection } from '@/components/features/demo/bodylog/mark'
import { SpecimensSection } from '@/components/features/demo/bodylog/specimens'
import { LoggingSection } from '@/components/features/demo/bodylog/logging'
import { RewardsSection } from '@/components/features/demo/bodylog/rewards'
import { PrivacySection } from '@/components/features/demo/bodylog/privacy'
import { DesignToProductionSection } from '@/components/features/demo/bodylog/design-to-production'
import { CreditsSection } from '@/components/features/demo/bodylog/credits'
import { StatusSection } from '@/components/features/demo/bodylog/status'
import { ClosingSection } from '@/components/features/demo/bodylog/closing'

const PATH = '/demo/bodylog'

export const metadata = demoMetadata(PATH, {
  title: 'BodyLog — A Record, Not a Verdict',
  description:
    'An iOS app for tracking any visible body or skin condition between doctor visits — acne, psoriasis, eczema, cysts, bruising, PT progress. It never reads your skin, scores it, or tells you what to do, and nothing leaves the phone.',
})

export default function BodyLogPage() {
  return (
    <DemoShell>
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <WriteUpHeader
        kicker="Circleheads · iOS"
        title="BodyLog"
        mark={<BodyLogMark size={84} title="" className="shrink-0" />}
        description={
          <>
            A skin-tracking app for iPhone. You photograph a place on your body, say what it&apos;s
            about, and the app keeps the record. It never reads your skin, scores it, or tells you
            what to do — and nothing leaves the phone.
          </>
        }
        actions={
          <>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background">
              Publishing soon · iOS
            </span>
            <a
              href="https://circleheads.com"
              target="_blank"
              rel="noopener noreferrer"
              className="aka-button-secondary"
            >
              circleheads.com
              <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
            </a>
            <Link
              href="/demo/bodylog/v1"
              className="aka-button-secondary"
            >
              The v1 prototype
              <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
            </Link>
          </>
        }
        byline={
          <>
            $3/month or $25/year at launch. Native SwiftUI + SwiftData, iOS 17+, zero external
            dependencies — no image assets; every glyph, badge and figure is a character grid drawn
            at runtime.
          </>
        }
      />

      {/* ------------------------------------------------------ the phone */}
      <div className="mt-12">
        <p className={label}>The app</p>
        <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
          Rebuilt here as live React from the shipping app&apos;s own values — the figure is
          rasterised from its vector anatomy, the logo is its frozen grid, and the colour, type
          and spacing are the real ones. It works: tap around.
        </p>
        <div className="mt-5">
          <BodyLogShowcase />
        </div>
      </div>

      <PlainSummary path={PATH} />

      <div className="mt-12 aka-prose">
        {/* ----------------------------------------------------- why */}
        <WhySection />

        {/* ------------------------------------------------ what people track */}
        <WhatPeopleTrackSection />

        {/* -------------------------------------------------------- rules */}
        <RulesSection />

        {/* --------------------------------------------------------- mark */}
        <MarkSection />

        {/* --------------------------------------------------- specimens */}
        <SpecimensSection />

        {/* ------------------------------------------------------ logging */}
        <LoggingSection />

        {/* ------------------------------------------------------ rewards */}
        <RewardsSection />

        {/* -------------------------------------------------------- privacy */}
        <PrivacySection />

        {/* ------------------------------------------- design → production */}
        <DesignToProductionSection />

        {/* ------------------------------------------------------- credits */}
        <CreditsSection />

        {/* -------------------------------------------------------- status */}
        <StatusSection />

        <ClosingSection />
      </div>
    </DemoShell>
  )
}
