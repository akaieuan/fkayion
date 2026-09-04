import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { TheMarkSection } from '@/components/features/aka-style/marks/the-mark'
import { FamilySection } from '@/components/features/aka-style/marks/family'
import { VariantSection } from '@/components/features/aka-style/marks/variant'
import { WordmarksSection } from '@/components/features/aka-style/marks/wordmarks'
import { DissolveModesSection } from '@/components/features/aka-style/marks/dissolve-modes'
import { GridSection } from '@/components/features/aka-style/marks/grid'
import { DisciplineCyclerSection } from '@/components/features/aka-style/marks/discipline-cycler'
import { RoundaboutSection } from '@/components/features/aka-style/marks/roundabout'
import { DrawnMarksSection } from '@/components/features/aka-style/marks/drawn-marks'
import { PropsSection } from '@/components/features/aka-style/marks/props-table'
import { MarksClosing } from '@/components/features/aka-style/marks/closing'

export const metadata = {
  title: 'Marks: the brand engine | akaSTYLE',
  description:
    'Every mark the pixel-disc engine produces: the akaBuild disc, studio heads, wordmarks, work-line icons, dissolve modes, grid resolutions, and the props that drive them.',
}

/** Each row is one prop dimension of the same engine, shown across its range. */
export default function MarksPage() {
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
          <p className="aka-kicker">Brand engine · Marks</p>
          <h1 className="mt-2 text-display font-extralight leading-none tracking-tight text-foreground/90">
            Marks
          </h1>
          <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
            One canvas engine, every mark in the family. A disc of pixel cells with something
            subtracted from it: change what is subtracted and you change brands, not code. Every
            mark on this page is live: colour follows <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-11">--foreground</code>,
            loops pause offscreen, and reduced motion renders a single frame.
          </p>
        </header>

        {/* THE MARK */}
        <TheMarkSection />

        {/* THE FAMILY */}
        <FamilySection />

        {/* VARIANT */}
        <VariantSection />

        {/* WORDMARKS */}
        <WordmarksSection />

        {/* DISSOLVE MODES */}
        <DissolveModesSection />

        {/* GRID */}
        <GridSection />

        {/* DISCIPLINE CYCLER */}
        <DisciplineCyclerSection />

        {/* ROUNDABOUT */}
        <RoundaboutSection />

        {/* DRAWN MARKS */}
        <DrawnMarksSection />

        {/* PROPS */}
        <PropsSection />

        <MarksClosing />
      </article>
    </div>
  )
}
