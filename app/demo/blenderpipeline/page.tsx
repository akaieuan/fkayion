import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { KickerTags } from '@/components/ui/tag-row'
import { DemoImage } from '@/components/ui/demo-image'
import { LAB_ENTRIES } from '@/components/replicas/bkz-lab-log/entries'
import { JsonLd, breadcrumbSchema, projectSchema } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { skills } from '@/components/features/demo/blenderpipeline/chrome'
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
    <div className="min-h-screen bg-background px-6 py-16">
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
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground lg:hidden"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        <KickerTags>Private work in progress</KickerTags>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          Brooklyn Dead
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A game whose art is written, not modelled. Blender Python → glTF → Godot 4.
        </p>
        <figure className="-mx-6 mt-8 aka-card-well aka-card-media overflow-hidden sm:mx-0">
          <DemoImage
            src="/bkz/mob-lab-night.webp"
            alt="A night street in the mob lab, a group of zombies lit by a wall lamp"
            width={1280}
            height={720}
            priority
            className="block h-auto w-full"
          />
        </figure>
        <p className="mt-3 text-[12px] font-light leading-relaxed text-muted-foreground/70">
          The detail tier at playing distance, in the mob lab at night. Every asset in the frame was
          generated from Python.
        </p>

        {/*
          The lab log sits directly under the opening render rather than at the
          foot of the page. Somebody who wants the engineering wants it before
          the overview, and the render is what makes them want it.
        */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/demo/blenderpipeline/bkz-lab-log"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            BKZ lab log · {LAB_ENTRIES.length} {LAB_ENTRIES.length === 1 ? 'entry' : 'entries'}
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </Link>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-[13px] font-medium text-foreground">
            Blender · Python · glTF 2.0 · Godot 4
          </span>
        </div>

        <PlainSummary path={PATH} />

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
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
      </article>
    </div>
  )
}
