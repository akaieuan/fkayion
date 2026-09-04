import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ColorSection } from '@/components/features/aka-style/foundations/color'
import { SurfacesSection } from '@/components/features/aka-style/foundations/surfaces'
import { SpacingSection } from '@/components/features/aka-style/foundations/spacing'
import { RadiusSection } from '@/components/features/aka-style/foundations/radius-table'
import { TypeRampSection } from '@/components/features/aka-style/foundations/type-ramp'
import { MotionSection } from '@/components/features/aka-style/foundations/motion'
import { LayoutSection } from '@/components/features/aka-style/foundations/layout'
import { TransferSection } from '@/components/features/aka-style/foundations/transfer-block'
import { FoundationsClosing } from '@/components/features/aka-style/foundations/closing'

export const metadata = {
  title: 'Foundations: tokens, scale & motion | akaSTYLE',
  description:
    'The measurable half of the system: the four-token color model, spacing and radius scales, the type ramp, motion timings and easings, breakpoints, and the copy-paste globals.css block.',
}

export default function FoundationsPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/aka-style"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          akaSTYLE
        </Link>

        <header className="mb-10">
          <p className="aka-kicker">Library · Foundations</p>
          <h1 className="mt-2 text-display font-extralight leading-none tracking-tight text-foreground/90">
            Tokens, scale &amp; motion
          </h1>
          <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
            The measurable half. Every number the system uses, in one place, with the reasoning
            attached, because a scale you can&apos;t justify is a scale you&apos;ll abandon. Drop the
            block at the bottom into a new repo and the{' '}
            <Link
              href="/aka-style/primitives"
              className="underline decoration-border underline-offset-[3px] hover:text-foreground"
            >
              primitives
            </Link>{' '}
            land correctly.
          </p>
        </header>

        {/* COLOR */}
        <ColorSection />

        {/* SURFACES */}
        <SurfacesSection />

        {/* SPACING */}
        <SpacingSection />

        {/* RADIUS */}
        <RadiusSection />

        {/* TYPE */}
        <TypeRampSection />

        {/* MOTION */}
        <MotionSection />

        {/* LAYOUT */}
        <LayoutSection />

        {/* THE BLOCK */}
        <TransferSection />

        <FoundationsClosing />
      </article>
    </div>
  )
}
