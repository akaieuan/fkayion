import { DemoImage } from '@/components/ui/demo-image'

const gallery = [
  { src: '/inertial-queue.webp', label: 'The queue — three decks, click to review inline; worked as decks rather than an infinite list' },
  { src: '/inertial-pipelines.webp', label: 'Pipelines — wire up the dispatch flow: a visual canvas of the routing graph beside the active per-instance configs' },
  { src: '/inertial-skills.webp', label: 'Skills — what the Runciter is allowed to do: catalog + per-instance registration, with per-skill status' },
  { src: '/inertial-skills-create-sheet.webp', label: 'The create sheet — registering a new classifier with its typed signal contract' },
  { src: '/inertial-compliance.webp', label: 'Compliance — shadow agreement between AI and human decisions, over the hash-chained audit feed' },
  { src: '/inertial-insights.webp', label: 'Insights — per-skill calibration (Brier / ECE / agreement) against the gold set, the reviewer-tag corpus, and eval-run history; Run eval fires a live calibration pass' },
  { src: '/inertial-dashboard-chat-panel.webp', label: 'Side panels — chat, notes, and agent activity docked edge-to-edge, so the dashboard reads as one app instead of seven views' },
]

/** The reviewer surface, in frames. Moved verbatim from app/demo/inertial/page.tsx. */
export function GallerySection() {
  return (
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
              The reviewer surface, in frames
            </p>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {gallery.map((shot) => (
                <figure key={shot.src}>
                  <div className="aka-card-well aka-card-media overflow-hidden rounded-lg">
                    <DemoImage
                      src={shot.src}
                      alt={shot.label}
                      width={1600}
                      height={1000}
                      sizes="(min-width: 640px) 320px, 100vw"
                      className="block h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-1.5 text-[11px] font-light text-muted-foreground/70">
                    {shot.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
  )
}
