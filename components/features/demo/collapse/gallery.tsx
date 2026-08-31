import { DemoImage } from '@/components/ui/demo-image'
import type { Shot } from '@/components/features/demo/collapse/shared'

const microLabel =
  'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'

const gallery: Shot[] = [
  { src: '/collapse/collapse-lesson.webp', w: 1600, h: 1000, label: 'Annotated lesson — hover a token to reveal the note' },
  { src: '/collapse/collapse-grid.webp', w: 1600, h: 1000, label: 'Cross-stack grid — quantum audio encoding' },
  { src: '/collapse/collapse-grid-vue.webp', w: 1600, h: 1000, label: 'Cross-stack grid — Next.js vs Vue reactivity' },
  { src: '/collapse/collapse-import.webp', w: 1600, h: 1000, label: 'Notebook import — admonition prefill' },
  { src: '/collapse/collapse-skills.webp', w: 1600, h: 1000, label: '~/.claude/skills/ directory viewer' },
]

/** The More views gallery strip. Moved verbatim from app/demo/collapse/page.tsx. */
export function GallerySection() {
  return (
          <div>
            <p className={microLabel}>More views</p>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {gallery.map((shot) => (
                <figure key={shot.src}>
                  <a href={shot.src} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="aka-card-well aka-card-media overflow-hidden rounded-lg">
                      <DemoImage
                        src={shot.src}
                        alt={shot.label}
                        width={shot.w}
                        height={shot.h}
                        sizes="(min-width: 640px) 320px, 100vw"
                        className="block h-auto w-full transition-opacity group-hover:opacity-95"
                      />
                    </div>
                  </a>
                  <figcaption className="mt-1.5 text-[11px] font-light text-muted-foreground/70">
                    {shot.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
  )
}
