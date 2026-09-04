import { DemoImage } from '@/components/ui/demo-image'

/**
 * The screenshots, with their own dimensions.
 *
 * They used to share a hard-coded 1600x1000, which was true of the first two
 * and is not true of the two taken since. A wrong ratio here is a layout shift
 * on load, so each shot carries its own.
 */
const shots: { src: string; alt: string; caption: string; w: number; h: number }[] = [
  {
    src: '/null/network-inspector.webp',
    w: 1600,
    h: 1000,
    alt: 'The Network Inspector listing four requests across three origins, with google-analytics.com struck through and marked blocked',
    caption:
      'The Network Inspector, mid-page-load. Four requests, three origins, one blocked: google-analytics.com is struck through and cancelled at the webview layer, and still logged so you can see what was refused.',
  },
  {
    src: '/null/notes-panel.webp',
    w: 2548,
    h: 1580,
    alt: 'A YouTube video playing with the Notes panel docked to its right, holding a note titled Zizek that is bound to the video URL',
    caption:
      'Notes docked beside the page it is about, not on top of it. The note is bound to the URL in its header, so returning to the video returns the note with it, and the row above carries copy, preview and delete.',
  },
  {
    src: '/null/notes.webp',
    w: 1600,
    h: 1000,
    alt: 'A note card open beside the page, with saved pages and selections listed and a copy button on every row',
    caption:
      'The same panel, listing what has been kept. Save a page or a selection as markdown, annotate it, copy it out. Every note is written twice: once to SQLite as the index, once to a real file in ~/Documents/Null.',
  },
  {
    src: '/null/new-tab.webp',
    w: 2546,
    h: 1588,
    alt: 'The new tab: a radial graph of thirteen visited sites around a centre point, with two note cards listed underneath',
    caption:
      'The new tab is the profile looking at itself. Thirteen sites as a graph rather than a wall of thumbnails, and under it the notes, each labelled with the page it came from and when it was last touched.',
  },
]

/** The four screenshots with their captions. Moved verbatim from app/demo/null-browser/page.tsx (a fragment renders nothing, so the figures stay direct children of the space-y wrapper). */
export function ShotsSection() {
  return (
    <>
          {shots.map((shot) => (
            <figure key={shot.src} className="!mt-8">
              <div
                className="-mx-6 aka-card-well aka-card-media overflow-hidden sm:mx-0"
                style={{ aspectRatio: `${shot.w} / ${shot.h}` }}
              >
                <DemoImage
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.w}
                  height={shot.h}
                  sizes="(min-width: 704px) 672px, calc(100vw - 3rem)"
                  className="block h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-2 text-12 font-light leading-relaxed text-muted-foreground/75">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
    </>
  )
}
