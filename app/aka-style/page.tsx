import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { RulesSection } from '@/components/features/aka-style/overview/rules'
import { ColorSection } from '@/components/features/aka-style/overview/color'
import { TypeSection } from '@/components/features/aka-style/overview/type'
import { PrimitivesSection } from '@/components/features/aka-style/overview/primitives'
import { BrandEnginesSection } from '@/components/features/aka-style/overview/brand-engines'
import { PatternsSection } from '@/components/features/aka-style/overview/patterns'
import { UsageSection } from '@/components/features/aka-style/overview/usage'
import { WhyKeepSection } from '@/components/features/aka-style/overview/why-keep'

/**
 * The library: every primitive, brand engine, and design-language rule this site
 * (and its sibling repos) is built from: rendered live, not screenshotted, so the
 * page is always telling the truth about the current system.
 */

const sections = [
  { id: 'rules', label: 'The rules' },
  { id: 'color', label: 'Color' },
  { id: 'type', label: 'Type' },
  { id: 'primitives', label: 'Primitives' },
  { id: 'brand', label: 'Brand engines' },
  { id: 'patterns', label: 'Patterns' },
  { id: 'usage', label: 'Where it runs' },
]

export const metadata = {
  title: 'akaSTYLE: design language, primitives & brand engines',
  description:
    'akaSTYLE: the design language, component primitives, and canvas brand engines behind akabuild.dev, circleheads.com, akaoss.dev, and the kits: eight rules, a token set, and every primitive rendered live rather than screenshotted.',
}

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          akaBuild
        </Link>

        <header className="mb-8">
          <p className="aka-kicker">Design system · Primitives · Brand engines</p>
          <h1 className="mt-2 text-display font-extralight leading-none tracking-tight text-foreground/90">
            aka<span className="font-mono font-normal text-primary">STYLE</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
            Everything this site is built from, rendered live on this page rather than captured as
            screenshots, so it can never drift from what actually ships. The same vocabulary runs
            across the studios, the kits, and the client work.
          </p>
        </header>

        <nav aria-label="Sections" className="mb-12 flex flex-wrap gap-1.5">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-md border border-border/60 px-2.5 py-1 text-11 font-light text-muted-foreground/80 transition-colors hover:border-border hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </nav>

        {/* ============ akaSTYLE ============ */}
        <RulesSection />

        {/* ============ COLOR ============ */}
        <ColorSection />

        {/* ============ TYPE ============ */}
        <TypeSection />

        {/* ============ PRIMITIVES ============ */}
        <PrimitivesSection />

        {/* ============ BRAND ENGINES ============ */}
        <BrandEnginesSection />

        {/* ============ PATTERNS ============ */}
        <PatternsSection />

        {/* ============ USAGE ============ */}
        <UsageSection />

        <WhyKeepSection />
      </article>
    </div>
  )
}
