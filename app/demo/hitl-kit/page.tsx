import { DemoImage } from '@/components/ui/demo-image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { WriteUpHeader } from '@/components/features/demo/write-up-header'
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
    <DemoShell>
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <WriteUpHeader
        kicker="Open source · v0.6"
        title="HITLKit"
        description={
          <>
            A design system, component library, and perspective paper on human-in-the-loop AI.{' '}
            <a
              href="https://www.hitlkit.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="aka-quiet-link"
            >
              hitlkit.dev
            </a>
          </>
        }
        hero={
          <DemoImage
            src="/hitl-kit/hitl-kit-hero.png"
            alt="HITL Kit — landing preview with headline and navigation"
            width={1024}
            height={535}
            className="block h-auto w-full"
            priority
          />
        }
        actions={
          <>
            <a
              href="https://www.hitlkit.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="aka-button"
            >
              Visit hitlkit.dev
              <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
            </a>
            <a
              href="https://github.com/akaieuan/HITL-KIT"
              target="_blank"
              rel="noopener noreferrer"
              className="aka-button-secondary"
            >
              GitHub · akaieuan/HITL-KIT
              <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
            </a>
            <Link
              href="/demo/hitl-ai"
              className="aka-button-secondary"
            >
              See components
            </Link>
          </>
        }
        byline="Live site, paper, registry, and component showcase — the canonical home for the project."
      />

      <PrimitivesSection />

      <p className="mt-6 text-[12px] leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground/85">Earlier reference on this site:</span>{' '}
        <Link
          href="/demo/hitl-ai"
          className="aka-quiet-link"
        >
          widget showcase
        </Link>
        {' · '}
        <Link
          href="/demo/hitl-ai/sheet"
          className="aka-quiet-link"
        >
          component sheet
        </Link>
        . The shipped kit at hitlkit.dev supersedes this in-repo mock, but these are still
        useful for comparison.
      </p>
      <PlainSummary path={PATH} />

      <div className="mt-10 aka-prose">
        <WhatThisIsSection />

        <WhatIBuiltSection />

        <WhyUnusualSection />

        <SkillSetSection />

        <HitlKitClosing />
      </div>
    </DemoShell>
  )
}
