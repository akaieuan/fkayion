import { DemoImage } from '@/components/ui/demo-image'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { WriteUpHeader } from '@/components/features/demo/write-up-header'
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
    <DemoShell>
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
          crumb: 'How I work',
        })}
      />
      <WriteUpHeader
        kicker="About · Brooklyn, NY"
        title="How I work"
        description={
          <>
            Ieuan King. I&apos;m a product design engineer trained as an
            anthropologist, which is mostly a way of saying I go and find the problem before I
            design for it. Most of that has gone into human-in-the-loop AI for expert users: sitting
            with the people doing the work, watching where the task actually breaks, and deciding
            what an agent should and should not be trusted with.
          </>
        }
        hero={
          <DemoImage
            src="/how-i-work/how-i-work.webp"
            alt="A painted mountain range under low cloud over an open field, broken into a shifted grid of tiles"
            width={2400}
            height={900}
            sizes="(min-width: 704px) 672px, calc(100vw - 3rem)"
            className="block h-auto w-full"
            priority
          />
        }
      />

      <div className="mt-6 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
        <UbikSection />

        <InteractionSection />

        <FieldWorkSection />

        <BrooklynSection />

        <Born2000Section />

        <SmallSoftwareSection />

        <WhereThatLandsSection />

        <ClosingSection />
      </div>
    </DemoShell>
  )
}
