import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { KickerTags } from '@/components/ui/tag-row'
import { DemoImage } from '@/components/ui/demo-image'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { UbikSection } from '@/components/features/demo/how-i-work/ubik'
import { InteractionSection } from '@/components/features/demo/how-i-work/interaction'
import { FieldWorkSection } from '@/components/features/demo/how-i-work/field-work'
import { BrooklynSection } from '@/components/features/demo/how-i-work/brooklyn'
import { Born2000Section } from '@/components/features/demo/how-i-work/born-2000'
import { SmallSoftwareSection } from '@/components/features/demo/how-i-work/small-software'
import { WhereThatLandsSection } from '@/components/features/demo/how-i-work/where-that-lands'
import { ClosingSection } from '@/components/features/demo/how-i-work/closing'

const PATH = '/demo/how-i-work'

export const metadata = demoMetadata(PATH, {
  title: 'How I work: product design engineering and anthropology',
  description:
    'A product design engineer trained as an anthropologist. Three and a half years of human-in-the-loop AI at Ubik Studio, design through interaction rather than review, and the small software I use every day because I built it.',
})

export default function HowIWorkPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background px-6 py-16">
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
          crumb: 'How I work',
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
          <p
            className="text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-balance text-foreground/90"
            aria-label="How I work"
          >
            How I work
          </p>
        </header>

        <div
          className="-mx-6 aka-card-well aka-card-media overflow-hidden sm:mx-0"
          style={{ aspectRatio: '2400 / 900' }}
        >
          <DemoImage
            src="/how-i-work/how-i-work.webp"
            alt="A painted mountain range under low cloud over an open field, broken into a shifted grid of tiles"
            width={2400}
            height={900}
            sizes="(min-width: 704px) 672px, calc(100vw - 3rem)"
            className="block h-full w-full object-cover"
            priority
          />
        </div>

        <KickerTags className="mt-10">About · Brooklyn, NY</KickerTags>
        {/*
          The heading names the person and the seat and gets out of the way.
          It used to be a line about the practice, which put a slogan directly
          above the paragraph that states the same thing properly: the reader
          got the claim twice, weaker first.
        */}
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          Ieuan King, product design engineer
        </h1>

        <div className="mt-6 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <p className="text-[16px] text-foreground/85">
            I&apos;m a product design engineer trained as an anthropologist, which is mostly a way
            of saying I go and find the problem before I design for it. Most of that has gone into
            human-in-the-loop AI for expert users: sitting with the people doing the work, watching
            where the task actually breaks, and deciding what an agent should and should not be
            trusted with.
          </p>

          <UbikSection />

          <InteractionSection />

          <FieldWorkSection />

          <BrooklynSection />

          <Born2000Section />

          <SmallSoftwareSection />

          <WhereThatLandsSection />

          <ClosingSection />
        </div>
      </article>
    </div>
  )
}
