import { ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { WriteUpHeader } from '@/components/features/demo/write-up-header'
import type { Shot } from '@/components/features/demo/akacovart/shared'
import { WhatThisIsSection } from '@/components/features/demo/akacovart/what-this-is'
import { EveryImageIsDataSection } from '@/components/features/demo/akacovart/every-image-is-data'
import { WhatYouMakeSection } from '@/components/features/demo/akacovart/what-you-make'
import { MotionMusicSection } from '@/components/features/demo/akacovart/motion-music'
import { UnderTheHoodSection } from '@/components/features/demo/akacovart/under-the-hood'
import { StatusSection } from '@/components/features/demo/akacovart/status'
import { GallerySection } from '@/components/features/demo/akacovart/gallery'
import { AkaCovartClosing } from '@/components/features/demo/akacovart/closing'

const code = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]'

const hero: Shot = { src: '/akacovart/covart-splash.webp', w: 1600, h: 839, label: 'akaCOVART — a generative album-art engine' }

const PATH = '/demo/akacovart'

export const metadata = demoMetadata(PATH, {
  title: 'akaCOVART — Generative Album-Art Studio',
  description:
    'A browser-based generative album-art studio: pick an engine, drop a seed, shape with palette / composition / film / type, and export a print-ready cover or a synced video loop. Every cover is reproducible data. Next.js, React, Canvas 2D, Web Audio.',
})

export default function AkaCovartProjectPage() {
  return (
    <DemoShell>
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <WriteUpHeader
        kicker="Open source · Generative studio · Album art"
        title="akaCOVART"
        description={
          <>
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
          </>
        }
        hero={
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
        }
        actions={
          <>
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
          </>
        }
        byline={
          <>
            Built by Ieuan King (akaBuild). Open source; the{' '}
            <span className="font-medium text-foreground/80">akaCOVART</span> name is a trademark of the
            project owner.
          </>
        }
      />
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
    </DemoShell>
  )
}
