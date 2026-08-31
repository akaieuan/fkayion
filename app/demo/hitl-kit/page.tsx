import { KickerTags } from '@/components/ui/tag-row'
import { DemoImage } from '@/components/ui/demo-image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { PrimitivesSection } from '@/components/features/demo/hitl-kit/primitives'
import { WhatThisIsSection } from '@/components/features/demo/hitl-kit/what-this-is'
import { WhatIBuiltSection } from '@/components/features/demo/hitl-kit/what-i-built'
import { WhyUnusualSection } from '@/components/features/demo/hitl-kit/why-unusual'
import { SkillSetSection } from '@/components/features/demo/hitl-kit/skill-set'
import { HitlKitClosing } from '@/components/features/demo/hitl-kit/closing'

const PATH = '/demo/hitl-kit'

export const metadata = demoMetadata(PATH, {
  title: 'HITL Kit — Human-in-the-Loop AI, Measured Properly',
  description:
    'An open-source design system, component library, and perspective paper on human-in-the-loop AI. Nineteen primitives, six @hitl-kit/* npm packages, a shadcn registry, and a research argument connecting them.',
})

export default function HitlKitProjectPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background px-6 py-16">
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground lg:hidden"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        <header className="mb-6">
          <KickerTags>Open source · v0.6</KickerTags>
          <h1
            className="mt-2 text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-balance text-foreground/90"
            aria-label="HITLKit"
          >
            HITLKit
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
          A design system, component library, and perspective paper on human-in-the-loop AI.{' '}
          <a
            href="https://www.hitlkit.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border hover:decoration-foreground/60 underline-offset-[3px] transition-colors"
          >
            hitlkit.dev
          </a>
          </p>
        </header>

        <div className="-mx-6 aka-card-well aka-card-media overflow-hidden sm:mx-0">
          <DemoImage
            src="/hitl-kit/hitl-kit-hero.png"
            alt="HITL Kit — landing preview with headline and navigation"
            width={1024}
            height={535}
            className="block h-auto w-full"
            priority
          />
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="https://www.hitlkit.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Visit hitlkit.dev
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          <a
            href="https://github.com/akaieuan/HITL-KIT"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            GitHub · akaieuan/HITL-KIT
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
          <Link
            href="/demo/hitl-ai"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            See components
          </Link>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          Live site, paper, registry, and component showcase — the canonical home for the project.
        </p>

        <PrimitivesSection />

        <p className="mt-6 text-[12px] leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground/85">Earlier reference on this site:</span>{' '}
          <Link
            href="/demo/hitl-ai"
            className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50"
          >
            widget showcase
          </Link>
          {' · '}
          <Link
            href="/demo/hitl-ai/sheet"
            className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50"
          >
            component sheet
          </Link>
          . The shipped kit at hitlkit.dev supersedes this in-repo mock, but these are still
          useful for comparison.
        </p>
        <PlainSummary path={PATH} />

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <WhatThisIsSection />

          <WhatIBuiltSection />

          <WhyUnusualSection />

          <SkillSetSection />

          <HitlKitClosing />
        </div>
      </article>
    </div>
  )
}
