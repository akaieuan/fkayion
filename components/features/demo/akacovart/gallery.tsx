import { DemoImage } from '@/components/ui/demo-image'
import type { Shot } from '@/components/features/demo/akacovart/shared'

const gallery: Shot[] = [
  { src: '/akacovart/covart-controls.webp', w: 488, h: 1100, label: 'Controls — engine, seed, palette, motion' },
  { src: '/akacovart/covart-cover-wave.webp', w: 860, h: 796, label: 'A finished Waves cover' },
  { src: '/akacovart/covart-engine-grid.webp', w: 1706, h: 937, label: 'Grid + Waves engines' },
  { src: '/akacovart/covart-engine-wave.webp', w: 1715, h: 876, label: 'Waves, up close' },
  { src: '/akacovart/covart-animate.webp', w: 394, h: 936, label: 'Animate — move the cover to a beat' },
  { src: '/akacovart/covart-audio.webp', w: 396, h: 649, label: 'Audio — react to a track' },
]

/** The More views gallery strip. Moved verbatim from app/demo/akacovart/page.tsx. */
export function GallerySection() {
  return (
          <div>
            <p className="aka-kicker">More views</p>
            <div className="mt-3 columns-1 gap-4 sm:columns-2">
              {gallery.map((shot) => (
                <figure key={shot.src} className="mb-4 break-inside-avoid">
                  <a href={shot.src} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="aka-card-well aka-card-media aka-card-lift overflow-hidden rounded-lg">
                      <DemoImage
                        src={shot.src}
                        alt={shot.label}
                        width={shot.w}
                        height={shot.h}
                        sizes="(min-width: 640px) 320px, 100vw"
                        className="block h-auto w-full"
                      />
                    </div>
                  </a>
                  <figcaption className="mt-1.5 text-11 font-light text-muted-foreground/70">
                    {shot.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
  )
}
