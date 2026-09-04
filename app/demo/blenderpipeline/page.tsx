import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'
import { LAB_ENTRIES } from '@/components/product-replicas/bkz-lab-log/entries'
import { JsonLd, breadcrumbSchema, projectSchema } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { WriteUpHeader } from '@/components/features/demo/write-up-header'
import { skills } from '@/components/features/demo/blenderpipeline/shared'
import { TheGameSection } from '@/components/features/demo/blenderpipeline/the-game'
import { WhatThePipelineIsSection } from '@/components/features/demo/blenderpipeline/what-the-pipeline-is'
import { GatesSection } from '@/components/features/demo/blenderpipeline/gates'
import { GoneWrongSection } from '@/components/features/demo/blenderpipeline/gone-wrong'
import { LabLogSection } from '@/components/features/demo/blenderpipeline/lab-log'
import { AnimationSection } from '@/components/features/demo/blenderpipeline/animation'
import { CrossToolContractsSection } from '@/components/features/demo/blenderpipeline/cross-tool-contracts'
import { SkillSetSection } from '@/components/features/demo/blenderpipeline/skill-set'
import { BlenderPipelineClosing } from '@/components/features/demo/blenderpipeline/closing'

const PATH = '/demo/blenderpipeline'
const TITLE = 'Brooklyn Dead: procedural asset pipeline'
const DESCRIPTION =
  'A private Godot 4 game whose 3D assets are written rather than modelled: Blender Python, glTF 2.0, programmatic animation, and validators that gate every rebuild.'
const HERO = '/bkz/mob-lab-night.webp'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'procedural modelling',
    'Blender Python',
    'technical art',
    'glTF 2.0',
    'Godot 4',
    'asset pipeline',
    'Brooklyn Dead',
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: 'article',
    url: PATH,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: HERO, width: 1280, height: 720, alt: 'The mob lab at night' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [HERO],
  },
}

export default function BlenderPipelinePage() {
  return (
    <DemoShell>
      <JsonLd
        data={[
          projectSchema({
            path: PATH,
            name: TITLE,
            description: DESCRIPTION,
            image: HERO,
            keywords: skills,
          }),
          breadcrumbSchema([
            { name: 'Projects', path: '/demo' },
            { name: 'Brooklyn Dead', path: PATH },
          ]),
        ]}
      />
      {/*
        The lab log link is a header action, directly under the opening render
        rather than at the foot of the page. Somebody who wants the engineering
        wants it before the overview, and the render is what makes them want it.
      */}
      <WriteUpHeader
        kicker="Private work in progress"
        title="Brooklyn Dead"
        description="A game whose art is written, not modelled. Blender Python → glTF → Godot 4."
        hero={
          <DemoImage
            src="/bkz/mob-lab-night.webp"
            alt="A night street in the mob lab, a group of zombies lit by a wall lamp"
            width={1280}
            height={720}
            priority
            className="block h-auto w-full"
          />
        }
        caption={
          <>
            The detail tier at playing distance, in the mob lab at night. Every asset in the frame was
            generated from Python.
          </>
        }
        actions={
          <>
            <Link
              href="/demo/blenderpipeline/bkz-lab-log"
              className="aka-button"
            >
              BKZ lab log · {LAB_ENTRIES.length} {LAB_ENTRIES.length === 1 ? 'entry' : 'entries'}
              <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
            </Link>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-[13px] font-medium text-foreground">
              Blender · Python · glTF 2.0 · Godot 4
            </span>
          </>
        }
      />

      <PlainSummary path={PATH} />

      <div className="mt-10 aka-prose">
        <TheGameSection />

        <WhatThePipelineIsSection />

        <GatesSection />

        <GoneWrongSection />

        <LabLogSection />

        <AnimationSection />

        <CrossToolContractsSection />

        <SkillSetSection />

        <BlenderPipelineClosing />
      </div>
    </DemoShell>
  )
}
