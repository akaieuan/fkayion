import type { Metadata } from 'next'
import { PROJECTS } from '@/lib/projects'
import { projectSchema, breadcrumbSchema } from '@/components/seo/json-ld'

/**
 * The SEO a project write-up gets for free, derived from the project itself.
 *
 * ── The problem ─────────────────────────────────────────────────────────────
 *
 * Four write-ups carried a canonical, Open Graph tags and JSON-LD; the other
 * eighteen carried a title and a description and nothing else. So most of the
 * work on this site had no structured data, no share card, and no canonical —
 * three separate things a crawler uses to decide what a page is and whether it
 * is the authoritative copy of it.
 *
 * Adding them by hand to eighteen files would have meant eighteen chances to
 * mistype a path, and a nineteenth page later with none of it.
 *
 * ── The approach ────────────────────────────────────────────────────────────
 *
 * Everything derivable is derived. `lib/projects.ts` already knows every
 * project's route, name, category tags and card art, because the plate on
 * /demo is built from it — so the canonical, the OG image, the keywords and
 * the breadcrumb trail all come from there rather than being restated.
 *
 * What cannot be derived is the page's own title and description: those are
 * written for the page and are better than the one-line card blurb. They stay
 * with the page and are passed in.
 *
 * The result is one call per page that cannot drift from the project list, and
 * a new write-up gets correct SEO by adding its entry to `PROJECTS` — which it
 * has to do anyway to appear on the index.
 */

type Extras = {
  title: string
  description: string
  /** Override the OG image when the card art is not the best share picture. */
  image?: string
  /** Override the breadcrumb label when the card title is unwieldy. */
  crumb?: string
}

/** The project's own record, so nothing here restates what /demo already says. */
function project(path: string) {
  return PROJECTS.find((p) => p.href === path)
}

/**
 * Pick the share image.
 *
 * A card can carry a screenshot, a bitmap logo, or a drawn mark that exists
 * only as markup. The first two are real files a crawler can fetch; the third
 * is not, and pointing Open Graph at something that does not resolve is worse
 * than omitting it, so a drawn mark falls back to the site icon.
 */
function shareImage(path: string, override?: string): string {
  if (override) return override
  const p = project(path)
  const art = p?.img ?? p?.logoImg
  return typeof art === 'object' && art !== null && 'src' in art ? (art.src as string) : '/icon.png'
}

/** Canonical, Open Graph and Twitter for a write-up. */
export function demoMetadata(path: string, extras: Extras): Metadata {
  const image = shareImage(path, extras.image)
  return {
    title: extras.title,
    description: extras.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: path,
      title: extras.title,
      description: extras.description,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: extras.title,
      description: extras.description,
      images: [image],
    },
  }
}

/**
 * The structured data: the work itself, and the trail a reader took to it.
 *
 * Keywords come from the project's tags rather than a second hand-written
 * list, so the words a crawler reads are the same words the card shows.
 */
export function demoSchema(path: string, extras: Extras) {
  const p = project(path)
  return [
    projectSchema({
      path,
      name: p?.title ?? extras.title,
      description: extras.description,
      image: shareImage(path, extras.image),
      keywords: p?.tags ?? [],
    }),
    breadcrumbSchema([
      { name: 'Projects', path: '/demo' },
      { name: extras.crumb ?? p?.title ?? extras.title, path },
    ]),
  ]
}
