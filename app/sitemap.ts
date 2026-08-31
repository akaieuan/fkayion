import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { PROJECTS } from '@/lib/projects'
import { WRITING_PAGES } from '@/lib/writing'
import { LAB_ENTRIES } from '@/components/replicas/bkz-lab-log/entries'

/**
 * The sitemap, generated from the same data the pages are.
 *
 * Every route here is statically rendered, so a hand-written list would go
 * stale the first time a project or an essay was added. The three arrays below
 * are the ones the pages themselves read; a new lab entry appears in the
 * sitemap because it appears in the log.
 *
 * `lastModified` is the build time. These are hand-edited documents rather than
 * a feed, so the honest answer to "when did this change" is "when it was last
 * deployed" — and a crawler treats a fabricated per-page date as noise anyway.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const entry = (path: string, priority: number) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority,
  })

  // Demo routes come from the project list, minus anything that points off-site.
  const demos = PROJECTS.map((p) => p.href).filter((href) => href.startsWith('/'))

  /*
   * The playable demos. These are launched from a write-up rather than found on
   * their own, so they sit below the pages that explain them — but they are
   * real, linked, indexable routes and leaving them out would understate the
   * site. `/Visualizer-Eden` is the full-bleed build of the visualiser; the
   * write-up at /demo/visualizer-eden is the page that should rank.
   */
  const apps = ['/demo/hitl-ai', '/demo/hitl-ai/sheet', '/demo/bodylog/v1', '/Visualizer-Eden']

  return [
    entry('/', 1),
    entry('/demo', 0.9),
    ...demos.map((href) => entry(href, 0.8)),
    ...apps.map((href) => entry(href, 0.5)),
    entry('/demo/blenderpipeline/bkz-lab-log', 0.8),
    ...LAB_ENTRIES.map((e) => entry(`/demo/blenderpipeline/bkz-lab-log/${e.slug}`, 0.7)),
    ...WRITING_PAGES.map((w) => entry(`/writing/${w.slug}`, 0.7)),
    entry('/aka-style', 0.5),
    entry('/aka-style/foundations', 0.4),
    entry('/aka-style/primitives', 0.4),
    entry('/aka-style/marks', 0.4),
    entry('/aka-style/faces', 0.4),
  ]
}
