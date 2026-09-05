import { KickerTags } from '@/components/ui/tag-row'
import { DemoImage } from '@/components/ui/demo-image'

/*
 * Ubik Studio, the opener.
 *
 * Budget: the right column is the tall one. The splash at the column's 988
 * width is 560 inside its frame, plus a three-line caption at text-11, about
 * 630 of the 844. The left column, tags, title, description and byline, is
 * under 300.
 *
 * The facts are the write-up header's: its kicker as chips, its description,
 * its byline and its hero with the hero's own caption.
 */
const HERO = {
  src: '/ubik/splash.webp',
  w: 1506,
  h: 853,
  label:
    'The workspace in its final build: the file explorer and an indexed-four-minutes-ago context pill on the left, a source paper in the middle with every claim the agent drew highlighted in place, evidence cards queued for review along the bottom, and the agent working through a four-task plan on the right',
} as const

export function UbikTitle() {
  return (
    <div className="grid h-full grid-cols-[420px_1fr] gap-x-12">
      <div>
        <KickerTags>Product · Desktop AI research platform · 2023–2026</KickerTags>
        <h1 className="mt-4 text-display font-extralight leading-none tracking-tight text-foreground/90">
          Ubik Studio
        </h1>
        <p className="mt-4 text-15 font-light leading-relaxed text-muted-foreground">
          A desktop-native, local-first AI research platform. Three and a half years building the
          human side of agentic research, before it had a name.
        </p>
        <p className="mt-4 text-13 font-light leading-relaxed text-muted-foreground/70">
          2023–2026 · co-founded · the public site and builds are retired; the test log and the
          subreddit are what remain in the open.
        </p>
      </div>

      <figure>
        <div className="aka-card-well aka-card-media overflow-hidden rounded-xl">
          <DemoImage
            src={HERO.src}
            alt={HERO.label}
            width={HERO.w}
            height={HERO.h}
            sizes="988px"
            priority
            className="block h-auto w-full"
          />
        </div>
        <figcaption className="mt-3 text-11 font-light leading-relaxed text-muted-foreground/70">
          {HERO.label}
        </figcaption>
      </figure>
    </div>
  )
}
