import { PixelHead } from '@/components/features/brand/pixel-head'
import { MEASURE } from './measure'

const keyLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ieuan-king/' },
  { label: 'aka.write', href: 'https://kraa.io/akaieuan' },
  { label: 'akaOSS', href: 'https://www.akaoss.dev' },
]

/** Entrance stagger for the hero stack, top to bottom (mirrors the studio sites). */
const reveal =
  'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-backwards motion-safe:duration-700'
const staggerDelay = (step: number) => ({ animationDelay: `${step * 120}ms` })

/**
 * The hero.
 *
 * It used to hold a full viewport open, with the copy pinned to the left edge
 * and the mark to the right, and a button under the title pointing at a page
 * the reader reaches by scrolling four seconds later anyway. All of that was
 * width and height spent on an introduction.
 *
 * Now the pair sits in its own narrower measure, centred in the page rather
 * than pushed to its edges, and sized so it fills that measure, and the section is sized to the content instead of
 * to the screen. Projects arrives while the hero is still visible, which is the
 * point: the work is what the page is for.
 *
 * The height is a fixed measure rather than a fraction of the viewport. A vh
 * hero grows with the monitor, so the taller the screen the further the work
 * moves down it, which is exactly backwards.
 *
 * The mark is the circleheads head in faces mode, the same call the circleheads
 * site makes on its own hero, only smaller. It replaced AkaMark, which cycled a
 * knockout per discipline: AI spark, code, music, 3D, agent tooling, design.
 * Naming the skills was the weaker version of the joke. A head running through
 * twenty-six expressions is the same idea about range, made by someone rather
 * than by a list, and it ties this site to the studio family it belongs to.
 *
 * Rendered directly rather than behind dynamic(): the header already imports
 * PixelHead on every route, so the engine is in the shared bundle before the
 * hero asks for it, and a second chunk would only add a request.
 */

/** The mark's box. Sized to the measure it shares with the title. */
const HERO_MARK = 165
export function HomeSection() {
  return (
    <section id="section-0" className="relative w-full">
      <div className="flex min-h-[26rem] items-center pt-24 md:min-h-[28rem] md:pt-20">
        <div className="site-inset max-w-site mx-auto w-full">
          {/* The pair keeps its own measure and is centred in the page. At full
              width the title and the mark ended up at opposite margins with a
              third of a screen of nothing between them. */}
          <div
            className={`${MEASURE} grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8`}
          >
            {/*
             * Animation first so it sits above the copy when the grid stacks;
             * md:order restores text left, mark right on wide.
             *
             * The mark's column is sized to the mark rather than to half the
             * box, which is what makes the pair fill its measure. Two equal
             * columns left the right half of the second one empty, so a
             * perfectly centred box still read as a hero shoved to the left.
             */}
            <div className={`flex justify-center md:order-2 md:justify-end ${reveal}`}>
              {/*
               * The square is reserved by the wrapper, not by the canvas. A
               * canvas with no width/height attributes has an intrinsic 2:1,
               * so between the server's HTML and the effect that sizes it the
               * mark would be half height and the hero would settle downward.
               *
               * flex, not block: the engine's host is an inline-block, which on
               * a block parent sits on the text baseline and adds a descender's
               * worth of height under the square.
               */}
              <span className="flex aspect-square max-w-full" style={{ width: HERO_MARK }}>
                <PixelHead size={HERO_MARK} grid={24} faces startAssembled fluid />
              </span>
            </div>

            <div className="flex flex-col gap-5 md:order-1">
              <h1
                className={`text-lg font-light tracking-tight text-foreground/90 md:text-xl ${reveal}`}
                style={staggerDelay(1)}
              >
                I build tools and create art.
              </h1>

              <p
                className={`text-11 font-light tracking-wide text-foreground/30 ${reveal}`}
                style={staggerDelay(2)}
              >
                {'// I also produce and perform electronic music'}
              </p>

              <div className={`flex flex-wrap items-center gap-5 ${reveal}`} style={staggerDelay(3)}>
                {keyLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-13 font-light text-muted-foreground/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
