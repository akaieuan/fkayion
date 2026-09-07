import { Carousel } from '@/components/ui/carousel'
import { CarouselSlide } from '@/components/ui/carousel-slide'
import { DemoImage } from '@/components/ui/demo-image'
import { LoopVideo } from '@/components/ui/loop-video'
import { UBIK_MARKETING_ARCHIVE } from '@/components/features/demo/ubik/shared'

/**
 * The marketing site, as the Wayback Machine kept it.
 *
 * Ten captures of ubik.studio from April 2026: eight stills and two short
 * recordings of the headlines moving. The site is gone with the rest of the
 * company, so these are the record, and the archive link under the strip is
 * the way to the copy itself.
 *
 * A carousel rather than a gallery, because ten screenshots of a website in a
 * column would be most of a page, and because a marketing site is read one
 * screen at a time. Every slide is the width of the reading column's breakout
 * so a capture is legible at its own size.
 *
 * Three of the captures are full-page scrolls, 650 to 720 pixels wide and
 * tall. They are shown at one CSS pixel per image pixel and cropped by the
 * frame rather than scaled up to its width, which would soften the type; the
 * frame shows their first screen and the caption says what runs on below.
 */
type Slide =
  | { kind: 'still'; src: string; w: number; h: number; tall?: boolean; alt: string; caption: string }
  | { kind: 'clip'; src: string; w: number; h: number; alt: string; caption: string }

const SLIDES: Slide[] = [
  {
    kind: 'still',
    src: '/ubik/marketing/home.webp',
    w: 2560,
    h: 1320,
    alt: 'The Ubik home page: a two-line headline, a download button, and the desktop app below it with a source paper open and the agent working on the right',
    caption:
      'The home page. One sentence, one download, and the product itself under it rather than an illustration of it.',
  },
  {
    kind: 'clip',
    src: '/ubik/marketing/home-hero',
    w: 1280,
    h: 784,
    alt: 'The home page headline with its highlights arriving one phrase at a time',
    caption: 'The hero as it moved: the highlights arrive a phrase at a time.',
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
    kind: 'still',
    src: '/ubik/marketing/use-cases-fields-1.webp',
    w: 722,
    h: 1514,
    tall: true,
    alt: 'A full-page capture of the use cases from Professional Research through Science and R&D, each field with three cards and four worked examples',
    caption:
      'Twelve fields, each with its own worked examples. This full-page capture runs from professional research through science and R&D.',
  },
  {
    kind: 'still',
    src: '/ubik/marketing/use-cases-fields-2.webp',
    w: 684,
    h: 1572,
    tall: true,
    alt: 'A full-page capture of the use cases from Policy Analysis through Consulting and Advisory',
    caption: 'The rest of the fields: policy analysis through consulting and advisory.',
  },
  {
    kind: 'still',
    src: '/ubik/marketing/models.webp',
    w: 650,
    h: 1590,
    tall: true,
    alt: 'The supported models page: a grid of 28 model cards with provider, plan, context length and pricing on each',
    caption: 'The models page: 28 models curated for agentic workflows, 15 of them on the free plan.',
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
          <CarouselSlide key={s.src} index={i + 1} total={SLIDES.length} caption={s.caption}>
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
              ) : (
                <DemoImage
                  src={s.src}
                  alt={s.alt}
                  width={s.w}
                  height={s.h}
                  sizes={s.tall ? '760px' : '(min-width: 1240px) 1180px, 100vw'}
                  className={
                    s.tall ? 'block h-full w-full object-none object-top' : 'block h-full w-full object-cover'
                  }
                />
              )}
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </section>
  )
}
