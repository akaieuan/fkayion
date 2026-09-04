import { ArrowUpRight } from 'lucide-react'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { KickerTags } from '@/components/ui/tag-row'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
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
      <header className="mb-6">
        <KickerTags>Open source · pre-1.0 · v0.3.1</KickerTags>
        <h1
          className="mt-2 text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-balance text-foreground/90"
          aria-label="eval-kit"
        >
          evalkit
        </h1>
        <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
        The scoring cockpit for research agents. Open source. Pre-1.0. v0.3.1 stable.
        </p>
      </header>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
      </div>
      <p className="mt-3 text-[12px] font-light text-muted-foreground/80">
        Repo, scoped packages on npm, and the full project brief (philosophy, architecture, §13
        guardrails).
      </p>
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
