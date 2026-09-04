import { KickerTags } from '@/components/ui/tag-row'
import { DemoImage } from '@/components/ui/demo-image'
import { ArrowUpRight } from 'lucide-react'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { StatusSection } from '@/components/features/demo/inertial/status'
import { ThesisSection } from '@/components/features/demo/inertial/thesis'
import { WhatsRealSection } from '@/components/features/demo/inertial/whats-real'
import { WhatsStubbedSection } from '@/components/features/demo/inertial/whats-stubbed'
import { WhySection } from '@/components/features/demo/inertial/why'
import { NotSection } from '@/components/features/demo/inertial/not'
import { SkillTiersSection } from '@/components/features/demo/inertial/skill-tiers'
import { NamingSection } from '@/components/features/demo/inertial/naming'
import { SiblingKitsSection } from '@/components/features/demo/inertial/sibling-kits'
import { GallerySection } from '@/components/features/demo/inertial/gallery'
import { ClosingSection } from '@/components/features/demo/inertial/closing'

const extLink =
  'underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50'

const repoHref = 'https://github.com/akaieuan/inertial-moderation-tool'
const readmeHref = 'https://github.com/akaieuan/inertial-moderation-tool/blob/main/README.md'

const techChip =
  'inline-flex items-center rounded-md border border-border/70 bg-muted/30 px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground'

const PATH = '/demo/inertial'

export const metadata = demoMetadata(PATH, {
  title: 'Inertial: reference architecture for auditable AI content review',
  description:
    'A reference architecture for auditable AI content review. Not a deployable moderation service — a working demonstration of one architectural thesis: AI classification outputs and human review actions both land in a hash-chained audit log, with typed structured signals as the unit of evidence and per-instance YAML as the unit of policy.',
})

export default function InertialProjectPage() {
  return (
    <DemoShell>
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <header className="mb-6">
        <KickerTags>Reference architecture · portfolio work · MIT</KickerTags>
        <h1
          className="mt-2 text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-balance lowercase text-foreground/90"
          aria-label="inertial"
        >
          inertial
        </h1>
        <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
          A reference architecture for auditable AI content review. Not a deployable moderation
          service, but a working demonstration of one architectural thesis, end to end through
          real code.
        </p>
      </header>

      <div className="-mx-6 space-y-3 sm:mx-0">
        <div className="aka-card-well aka-card-media overflow-hidden">
          <DemoImage
            src="/inertial/inertial-dashboard.webp"
            alt="Inertial dashboard: flag-activity heatmap, day-by-day stats grid, queue mix"
            width={1600}
            height={1000}
            className="block h-auto w-full"
            priority
          />
        </div>
        <div className="aka-card-well aka-card-media overflow-hidden">
          <DemoImage
            src="/inertial/inertial-queue-review.webp"
            alt="A queue review session — Approve / Remove / Escalate commits the decision and every applied tag into the hash-chained audit log"
            width={1600}
            height={1000}
            className="block h-auto w-full"
          />
        </div>
      </div>

      <p className="mt-5 text-[13px] font-light leading-relaxed text-muted-foreground">
        <a
          href={repoHref}
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          github.com/akaieuan/inertial-moderation-tool
          <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5 align-[-0.1em] opacity-70" aria-hidden />
        </a>
        <span className="text-muted-foreground/50"> · </span>
        <a
          href={readmeHref}
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Read the README
          <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5 align-[-0.1em] opacity-70" aria-hidden />
        </a>
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <span className={techChip}>MIT</span>
        <span className={techChip}>Node ≥20</span>
        <span className={techChip}>pnpm 10</span>
        <span className={techChip}>TypeScript</span>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          href={repoHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
        >
          GitHub
          <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
        </a>
        <a
          href={readmeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted/40"
        >
          Read the README
          <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
        </a>
      </div>
      <p className="mt-3 text-[12px] font-light text-muted-foreground/80">
        Repo, install instructions, the architecture diagram, the policy DSL, and the honest capability matrix all
        live in the README.
      </p>
      <PlainSummary path={PATH} />

      <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
        <StatusSection />

        <ThesisSection />

        <WhatsRealSection />

        <WhatsStubbedSection />

        <WhySection />

        <NotSection />

        <SkillTiersSection />

        <NamingSection />

        <SiblingKitsSection />

        <GallerySection />

        <ClosingSection />
      </div>
    </DemoShell>
  )
}
