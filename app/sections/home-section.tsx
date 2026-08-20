import { AkaMarkLazy } from '@/components/features/brand/aka-mark-lazy'

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
 * than pushed to its edges, and the section is sized to the content instead of
 * to the screen. Projects arrives while the hero is still visible, which is the
 * point: the work is what the page is for.
 *
 * The height is a fixed measure rather than a fraction of the viewport. A vh
 * hero grows with the monitor, so the taller the screen the further the work
 * moves down it, which is exactly backwards.
 */
export function HomeSection() {
  return (
    <section id="section-0" className="relative w-full">
      <div className="flex min-h-[26rem] items-center pt-24 md:min-h-[28rem] md:pt-20">
        <div className="site-inset max-w-site mx-auto w-full">
          {/* The pair keeps its own measure and is centred in the page. At full
              width the title and the mark ended up at opposite margins with a
              third of a screen of nothing between them. */}
          <div className="mx-auto grid w-full max-w-3xl items-center gap-8 md:grid-cols-2 md:gap-10">
            {/* animation first so it sits above the copy when the grid stacks;
                md:order restores text left, mark right on wide. */}
            <div className={`flex justify-center md:order-2 md:justify-end ${reveal}`}>
              <AkaMarkLazy size={200} grid={24} fluid />
            </div>

            <div className="flex flex-col gap-5 md:order-1">
              <h1
                className={`text-lg font-light tracking-tight text-foreground/90 md:text-xl ${reveal}`}
                style={staggerDelay(1)}
              >
                I build tools and create art.
              </h1>

              <p
                className={`text-[11px] font-light tracking-wide text-foreground/30 ${reveal}`}
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
                    className="text-[13px] font-light text-muted-foreground/70 transition-colors hover:text-primary"
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
