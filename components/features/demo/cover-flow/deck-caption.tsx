import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { TagRow } from '@/components/ui/tag-row'
import type { ProjectItem } from '@/components/ui/project-mark'
import { captionFor } from '@/lib/plain-summaries'

/** The deck's caption strip: the presentational half of /demo's CoverFlow. */
export function DeckCaption({ items }: { items: ProjectItem[] }) {
  return (
            /*
             * Presentational, and deliberately so. Every line here is already
             * in the list above as the covers' accessible names, so announcing
             * it a second time would make the deck read as thirty-six items.
             * The strip steps to the centred cover; see .aka-flow-strip.
             */
            <div className="aka-flow-strip" aria-hidden>
              {items.map((item) => {
                const external = /^https?:\/\//.test(item.href)
                return (
                  <div key={item.href} className="aka-flow-slot flex flex-col items-center">
                    <p className="text-[17px] font-light tracking-tight text-foreground/90">
                      {item.title}
                    </p>

                    {/*
                     * What kind of thing it is, from the tags the project
                     * already carries. Three at most: the fourth is always the
                     * one nobody needed, and a wrapped second row would push
                     * the caption past its floor.
                     */}
                    {item.tags && (
                      <TagRow className="mt-2 justify-center" tags={item.tags.slice(0, 3)} />
                    )}

                    <p className="mt-2.5 line-clamp-4 text-[13.5px] font-light leading-relaxed text-muted-foreground">
                      {captionFor(item.href, item.description)}
                    </p>

                    {/*
                     * Styled as the house secondary button. It is a span rather
                     * than a link because the cover above it already is one:
                     * the caption forwards clicks to it, so this is the visible
                     * affordance for a mouse and never a second tab stop or a
                     * second announcement.
                     */}
                    <span className="mt-3.5 inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-[12.5px] font-medium text-foreground transition-colors hover:bg-muted/40">
                      {external ? 'Open the site' : 'Learn more'}
                      {external ? (
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      ) : (
                        <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      )}
                    </span>
                  </div>
                )
              })}
            </div>
  )
}
