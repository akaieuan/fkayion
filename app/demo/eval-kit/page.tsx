import { ArrowUpRight } from 'lucide-react'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { WriteUpHeader } from '@/components/features/demo/write-up-header'
import { WhatThisIsSection } from '@/components/features/demo/eval-kit/what-this-is'
import { WhatIBuiltSection } from '@/components/features/demo/eval-kit/what-i-built'
import { WhyUnusualSection } from '@/components/features/demo/eval-kit/why-unusual'
import { SkillSetSection } from '@/components/features/demo/eval-kit/skill-set'
import { EvalKitClosing } from '@/components/features/demo/eval-kit/closing'

const PATH = '/demo/eval-kit'

export const metadata = demoMetadata(PATH, {
  title: 'eval-kit: Human scoring for research agents',
  description:
    'The scoring cockpit for research agents: Zod schema-first monorepo, @eval-kit packages, Next.js dashboard, CLI, human 0-3 rubric, OSS release discipline. Pre-1.0, v0.3.1 stable.',
})

export default function EvalKitProjectPage() {
  return (
    <DemoShell>
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <WriteUpHeader
        kicker="Open source · pre-1.0 · v0.3.1"
        title="evalkit"
        name="eval-kit"
        description="The scoring cockpit for research agents. Open source. Pre-1.0. v0.3.1 stable."
        actions={
          <>
            <a
              href="https://github.com/akaieuan/eval-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
            >
              GitHub
              <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
            </a>
            <a
              href="https://www.npmjs.com/package/@eval-kit/core"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted/40"
            >
              @eval-kit on npm
              <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
            </a>
            <a
              href="https://github.com/akaieuan/eval-kit/blob/main/docs/BRIEF.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted/40"
            >
              Read the brief
              <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
            </a>
          </>
        }
        byline={
          <>
            Repo, scoped packages on npm, and the full project brief (philosophy, architecture, §13
            guardrails).
          </>
        }
      />
      <PlainSummary path={PATH} />

      <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
        <WhatThisIsSection />

        <WhatIBuiltSection />

        <WhyUnusualSection />

        <SkillSetSection />

        <EvalKitClosing />
      </div>
    </DemoShell>
  )
}
