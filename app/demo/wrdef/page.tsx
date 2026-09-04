import { ArrowUpRight } from 'lucide-react'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { WriteUpHeader } from '@/components/features/demo/write-up-header'
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
      <WriteUpHeader
        kicker="Game"
        title="wrdef"
        description="Same 5-letter, 6-guess mechanic: clues are dictionary definitions; bonus round fills blanks in the definition."
        hero={
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
        }
        actions={
          <a
            href="https://www.wrdef.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Play live at wrdef.com
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
        }
        byline="Live, playable in the browser. No install."
      />
      <PlainSummary path={PATH} />

      <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
        <WhyIBuiltItSection />

        <TuningTheDataSection />

        <DictionaryYouEarnSection />
      </div>
    </DemoShell>
  )
}
