import { Carousel } from '@/components/ui/carousel'
import { CarouselSlide } from '@/components/ui/carousel-slide'
import { DemoImage } from '@/components/ui/demo-image'
import { LoopVideo } from '@/components/ui/loop-video'
import { UBIK_MARKETING_ARCHIVE } from '@/components/features/demo/ubik/shared'

/**
 * The marketing site, as the Wayback Machine kept it.
 *
 * Nine captures of ubik.studio from April 2026 on seven slides: four stills,
 * three long pages side by side, and two short recordings of the headlines
 * moving, one of them the home page itself. The
 * site is gone with the rest of the company, so these are the record, and the
 * archive link in the copy is the way to the site itself.
 *
 * A carousel rather than a gallery, because seven screens of a website in a
 * column would be most of a page, and because a marketing site is read one
 * screen at a time. Every slide is the width of the reading column's breakout
 * so a capture is legible at its own size.
 *
 * Three of the captures are full-page scrolls, 650 to 720 pixels wide and
 * more than twice as tall. A scroll like that is a thumbnail of a page, not a
 * page, so the three share one slide side by side, cropped to the frame from
 * the top: the shape of the site's long pages, with the caption saying what
 * runs down them.
 *
 * The stills load eagerly and unoptimised. Lazy loading waits for an image to
 * approach the viewport, and in a strip the approach is sideways, so every
 * slide arrived after the reader did; and the optimiser's first-request
 * transform of a 2560-wide capture is the delay a reader saw as the site
 * being slow. The files are already WebP at the size they are shown.
 */
type Page = { src: string; w: number; h: number; alt: string }
type Slide =
  | { kind: 'still'; src: string; w: number; h: number; alt: string; caption: string }
  | { kind: 'clip'; src: string; w: number; h: number; alt: string; caption: string }
  /** Full-page scrolls, shown together as the shape of the site rather than as reading. */
  | { kind: 'pages'; pages: Page[]; caption: string }

const SLIDES: Slide[] = [
  {
    kind: 'clip',
    src: '/ubik/marketing/home-hero',
    w: 1280,
    h: 662,
    alt: 'The Ubik home page: a two-line headline with its highlights arriving one phrase at a time, a download button, and the desktop app below it',
    caption:
      'The home page. One sentence, one download, and the product itself under it rather than an illustration of it.',
  },
  {
    kind: 'still',
    src: '/ubik/marketing/quality-control.webp',
    w: 2560,
    h: 1325,
    alt: 'A section headed Quality control is the new bottleneck, with three cards: Confidently Wrong, The Verification Tax, Cognitive Debt, each citing a paper',
    caption:
      'The problem before the product. Three failures, each with the paper it came from: calibration, the verification tax, cognitive debt.',
  },
  {
    kind: 'still',
    src: '/ubik/marketing/features.webp',
    w: 2560,
    h: 1322,
    alt: 'A grid of twelve capability cards under the heading Powerful and flexible, with the Resources menu open and the changelog beginning below',
    caption:
      'Twelve capabilities as a grid, the resources menu, and the changelog under them. Ubik Studio 1.0 shipped on February 20, 2026.',
  },
  {
    kind: 'still',
    src: '/ubik/marketing/use-cases-why-ai-fails.webp',
    w: 2560,
    h: 1342,
    alt: 'The use cases page opening on Why AI Fails for Professional Work, with a sidebar of twelve fields and three numbered failures',
    caption:
      'The use-cases page opened with the argument, not the product: citation hallucination, the calibration crisis, cognitive dependency, each with its sources.',
  },
  {
    kind: 'still',
    src: '/ubik/marketing/use-cases-approach.webp',
    w: 2560,
    h: 1336,
    alt: 'A section headed Ubik takes a different approach, with three cards: Runs Locally, Pinpoint Accuracy, Built to Assist, and the first field, Professional Research, beginning below',
    caption: 'Then the answer: runs locally, pinpoint accuracy, built to assist. The fields begin under it.',
  },
  {
    kind: 'pages',
    pages: [
      { src: '/ubik/marketing/use-cases-fields-1.webp', w: 722, h: 1514, alt: 'The use cases from Professional Research through Science and R&D, as one long page' },
      { src: '/ubik/marketing/use-cases-fields-2.webp', w: 684, h: 1572, alt: 'The use cases from Policy Analysis through Consulting and Advisory, as one long page' },
      { src: '/ubik/marketing/models.webp', w: 650, h: 1590, alt: 'The supported models page: 28 model cards with provider, plan, context length and pricing' },
    ],
    caption:
      'The long pages, side by side: twelve fields of use cases with worked examples in each, and the models page with its 28 models, 15 of them on the free plan.',
  },
  {
    kind: 'clip',
    src: '/ubik/marketing/mission-headline',
    w: 1280,
    h: 796,
    alt: 'The company page headline typing itself above the mission statement',
    caption: 'The company page. A headline that types itself over the mission statement.',
  },
]

/** The frame every slide sits in, at the aspect of the landscape captures. */
const FRAME = 'aka-card-well aka-card-media overflow-hidden rounded-xl aspect-[2560/1330]'

export function MarketingSiteSection() {
  return (
    <section className="space-y-3">
      <h2 className="aka-lead">The marketing site</h2>
      <p>
        The product was not the only surface I owned. Ubik&apos;s marketing site was mine end to
        end: the argument it opens with, the copy, the structure, the paintings commissioned for
        each capability, and the build. It was written in the order the product works. The problem
        first, then how Ubik answered it, then twelve fields of use cases with worked examples in
        each, and a models page that said what ran on the free plan.
      </p>
      <p>
        The site is retired with the rest. The Wayback Machine kept a copy from April 2026, and
        these are its pages;{' '}
        <a
          href={UBIK_MARKETING_ARCHIVE}
          target="_blank"
          rel="noopener noreferrer"
          className="aka-quiet-link"
        >
          the archived site
        </a>{' '}
        still opens.
      </p>

      <Carousel label="The Ubik marketing site" className="aka-breakout mt-6">
        {SLIDES.map((s, i) => (
          <CarouselSlide key={s.caption} index={i + 1} total={SLIDES.length} caption={s.caption}>
            <div className={FRAME}>
              {s.kind === 'clip' ? (
                <LoopVideo
                  src={s.src}
                  poster={`${s.src}-poster.webp`}
                  width={s.w}
                  height={s.h}
                  label={s.alt}
                  className="block h-full w-full object-cover object-top"
                />
              ) : s.kind === 'pages' ? (
                <div className="grid h-full grid-cols-3 gap-2 p-2 sm:gap-3 sm:p-3">
                  {s.pages.map((pg) => (
                    <div key={pg.src} className="overflow-hidden rounded-md">
                      <DemoImage
                        src={pg.src}
                        alt={pg.alt}
                        width={pg.w}
                        height={pg.h}
                        sizes="(min-width: 1240px) 380px, 33vw"
                        blur={false}
                        eager
                        unoptimized
                        className="block h-full w-full object-cover object-top"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <DemoImage
                  src={s.src}
                  alt={s.alt}
                  width={s.w}
                  height={s.h}
                  sizes="(min-width: 1240px) 1180px, 100vw"
                  blur={false}
                  eager
                  unoptimized
                  className="block h-full w-full object-cover"
                />
              )}
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </section>
  )
}
