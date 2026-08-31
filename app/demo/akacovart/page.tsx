import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { KickerTags } from '@/components/ui/tag-row'
import { DemoImage } from '@/components/ui/demo-image'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import type { Shot } from '@/components/features/demo/akacovart/chrome'
import { WhatThisIsSection } from '@/components/features/demo/akacovart/what-this-is'
import { EveryImageIsDataSection } from '@/components/features/demo/akacovart/every-image-is-data'
import { WhatYouMakeSection } from '@/components/features/demo/akacovart/what-you-make'
import { MotionMusicSection } from '@/components/features/demo/akacovart/motion-music'
import { UnderTheHoodSection } from '@/components/features/demo/akacovart/under-the-hood'
import { StatusSection } from '@/components/features/demo/akacovart/status'
import { GallerySection } from '@/components/features/demo/akacovart/gallery'
import { AkaCovartClosing } from '@/components/features/demo/akacovart/closing'

const code = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]'

const hero: Shot = { src: '/covart-splash.webp', w: 1600, h: 839, label: 'akaCOVART — a generative album-art engine' }

const PATH = '/demo/akacovart'

export const metadata = demoMetadata(PATH, {
  title: 'akaCOVART — Generative Album-Art Studio',
  description:
    'A browser-based generative album-art studio: pick an engine, drop a seed, shape with palette / composition / film / type, and export a print-ready cover or a synced video loop. Every cover is reproducible data. Next.js, React, Canvas 2D, Web Audio.',
})

export default function AkaCovartProjectPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
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
          <KickerTags>Open source · Generative studio · Album art</KickerTags>
          <h1
            className="mt-2 text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight"
            aria-label="akaCOVART"
          >
            <span className="text-foreground/90">akaCOVART</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
          A generative album-art engine. Shape it, sync the motion to your track, and export the
          cover.{' '}
          <a
            href="https://akacovart.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border hover:decoration-foreground/60 underline-offset-[3px] transition-colors"
          >
            akacovart.com
          </a>
          </p>
        </header>

        <figure className="-mx-6 aka-card-well aka-card-media overflow-hidden sm:mx-0">
          <a href={hero.src} target="_blank" rel="noopener noreferrer" className="group block">
            <DemoImage
              src={hero.src}
              alt={hero.label}
              width={hero.w}
              height={hero.h}
              sizes="(min-width: 672px) 640px, 100vw"
              className="block h-auto w-full transition-opacity group-hover:opacity-95"
              priority
            />
          </a>
        </figure>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="https://akacovart.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Visit akacovart.com
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          <a
            href="https://github.com/akaieuan/akaCovart"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            GitHub — akaieuan/akaCovart
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          Built by Ieuan King (akaBuild). Open source; the{' '}
          <span className="font-medium text-foreground/80">akaCOVART</span> name is a trademark of the
          project owner.
        </p>
        <PlainSummary path={PATH} />

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <WhatThisIsSection />

          <EveryImageIsDataSection />

          <WhatYouMakeSection />

          <MotionMusicSection />

          <UnderTheHoodSection />

          <StatusSection />

          <GallerySection />

          <AkaCovartClosing />
        </div>
      </article>
    </div>
  )
}
