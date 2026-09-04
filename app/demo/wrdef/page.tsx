import { ArrowUpRight } from 'lucide-react'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { KickerTags } from '@/components/ui/tag-row'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { WhyIBuiltItSection } from '@/components/features/demo/wrdef/why-i-built-it'
import { TuningTheDataSection } from '@/components/features/demo/wrdef/tuning-the-data'
import { DictionaryYouEarnSection } from '@/components/features/demo/wrdef/dictionary-you-earn'

const PATH = '/demo/wrdef'

export const metadata = demoMetadata(PATH, {
  title: 'Wrdef (Wordle + definition)',
  description:
    'A five-letter guessing game powered by dictionary definitions, sense ranking, bonus blanks, and a local dictionary you earn.',
})

export default function WrdefProjectPage() {
  return (
    <DemoShell>
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <header className="mb-6">
        <KickerTags>Game</KickerTags>
        <h1
          className="mt-2 text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-balance text-foreground/90"
          aria-label="wrdef"
        >
          wrdef
        </h1>
        <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
        Same 5-letter, 6-guess mechanic: clues are dictionary definitions; bonus round fills blanks in
        the definition.
        </p>
      </header>

      <div className="-mx-6 aka-card-well aka-card-media overflow-hidden sm:mx-0">
        <video
          className="block h-auto w-full"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/wrdef/wrdef-hero-poster.jpg"
          aria-label="Wrdef gameplay preview"
        >
          <source src="/wrdef/wrdef-hero.webm" type="video/webm" />
        </video>
      </div>

      <div className="mt-5">
        <a
          href="https://www.wrdef.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
        >
          Play live at wrdef.com
          <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
        </a>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          Live, playable in the browser. No install.
        </p>
      </div>
      <PlainSummary path={PATH} />

      <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
        <WhyIBuiltItSection />

        <TuningTheDataSection />

        <DictionaryYouEarnSection />
      </div>
    </DemoShell>
  )
}
