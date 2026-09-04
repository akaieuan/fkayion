import { ArrowUpRight } from 'lucide-react'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { WriteUpHeader } from '@/components/features/demo/write-up-header'
import { WhatThisIsSection } from '@/components/features/demo/trickle-ui-kit/what-this-is'
import { WhySection } from '@/components/features/demo/trickle-ui-kit/why'
import { WhatIBuiltSection } from '@/components/features/demo/trickle-ui-kit/what-i-built'
import { DesignRubricSection } from '@/components/features/demo/trickle-ui-kit/design-rubric'
import { WhyUnusualSection } from '@/components/features/demo/trickle-ui-kit/why-unusual'
import { SkillSetSection } from '@/components/features/demo/trickle-ui-kit/skill-set'
import { ClosingSection } from '@/components/features/demo/trickle-ui-kit/closing'

const PATH = '/demo/trickle-ui-kit'

export const metadata = demoMetadata(PATH, {
  title: 'trickle — Pure-CSS text animations for React',
  description:
    '47 hand-tuned text-animation primitives for React. Zero runtime, SSR-safe, copy-paste install via the shadcn registry. Tailwind v4, React 18+, Next.js 15+, MIT.',
})

export default function TrickleKitProjectPage() {
  return (
    <DemoShell>
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <WriteUpHeader
        kicker="Open source · v0.1 shipped · MIT"
        title="tricklekit"
        description={
          <>
            Pure-CSS text animations for React. Zero runtime, SSR-safe, copy-paste install via the shadcn
            registry.{' '}
            <a
              href="https://tricklekit.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="aka-quiet-link"
            >
              tricklekit.dev
            </a>
          </>
        }
        actions={
          <>
            <a
              href="https://tricklekit.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="aka-button"
            >
              Visit tricklekit.dev
              <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
            </a>
            <a
              href="https://github.com/akaieuan/trickle-UI-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="aka-button-secondary"
            >
              GitHub — akaieuan/trickle-UI-kit
              <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
            </a>
            <a
              href="https://tricklekit.dev/#catalog"
              target="_blank"
              rel="noopener noreferrer"
              className="aka-button-secondary"
            >
              Browse the 47 components
              <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
            </a>
          </>
        }
        byline="Live site, interactive catalog, and shadcn-installable registry — the canonical home for the project."
      />

      <p className="mt-6 text-12 leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground/85">Quick install (any one component):</span>{' '}
        <code className="rounded bg-muted/60 px-1.5 py-0.5 font-mono text-11 text-foreground/85">
          npx shadcn@latest add https://tricklekit.dev/r/typewriter.json
        </code>
      </p>
      <PlainSummary path={PATH} />

      <div className="mt-10 aka-prose">
        <WhatThisIsSection />

        <WhySection />

        <WhatIBuiltSection />

        <DesignRubricSection />

        <WhyUnusualSection />

        <SkillSetSection />

        <ClosingSection />
      </div>
    </DemoShell>
  )
}
