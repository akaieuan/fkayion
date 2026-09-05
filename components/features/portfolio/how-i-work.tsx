import { SheetTitle } from '@/components/features/portfolio/sheet'
import { DemoImage } from '@/components/ui/demo-image'

/*
 * How I work, the opener.
 *
 * Budget, of the 844 the sheet gives: the title block about 180 (kicker,
 * display title, a four-line lead at the 768 measure), the painting 330, two
 * gaps of 24, and the three tiles take what is left, about 285, of which they
 * use about 180.
 *
 * The three tiles are the sentences from the write-up's three middle sections,
 * one heading and two or three sentences each, the words unchanged.
 */
const TILES = [
  {
    title: 'Field work, applied to product',
    body: 'It teaches you that what people say they do and what they do are different data, that both are worth collecting, and that the gap between them is usually where the product is wrong. Watching someone work around your software is worth more than any number of them rating it.',
  },
  {
    title: 'Designing through interaction',
    body: 'On a synth you do not describe the sound you want. You turn something and listen, and you keep turning until the room agrees with you. Software has the same property and most design process throws it away.',
  },
  {
    title: 'Small software',
    body: 'I believe in small software: a tool built for one person doing one thing, which is allowed to be opinionated precisely because it does not have to be for everyone.',
  },
] as const

export function HowIWork() {
  return (
    <div className="grid h-full grid-rows-[auto_330px_1fr] gap-y-6">
      <SheetTitle
        kicker="About · Brooklyn, NY"
        title="How I work"
        lead={
          <>
            Ieuan King. I&apos;m a product design engineer trained as an anthropologist, which is
            mostly a way of saying I go and find the problem before I design for it. Most of that
            has gone into human-in-the-loop AI for expert users: sitting with the people doing the
            work, watching where the task actually breaks, and deciding what an agent should and
            should not be trusted with.
          </>
        }
      />

      <div className="aka-card-well aka-card-media overflow-hidden rounded-xl">
        <DemoImage
          src="/how-i-work/how-i-work.webp"
          alt="A painted mountain range under low cloud over an open field, broken into a shifted grid of tiles"
          width={2400}
          height={900}
          sizes="1456px"
          priority
          className="block h-full w-full object-cover"
        />
      </div>

      <div className="grid grid-cols-3 gap-x-6">
        {TILES.map((t) => (
          <div key={t.title} className="aka-card px-5 py-5">
            <h3 className="aka-lead">{t.title}</h3>
            <p className="mt-3 text-13 font-light leading-relaxed text-muted-foreground">{t.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
