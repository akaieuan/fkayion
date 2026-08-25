/**
 * The one place the site knows its own address.
 *
 * Every absolute URL on the site is built from `SITE_URL`: canonicals, Open
 * Graph images, the sitemap, and the JSON-LD on the article routes. Next needs
 * an absolute origin for `metadataBase` because a relative Open Graph image is
 * not a thing a crawler can fetch, and there is no request object at build time
 * to infer one from.
 *
 * The Vercel-provided variables are read as a fallback so preview deployments
 * describe themselves rather than pointing every canonical at production.
 */
const VERCEL =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (VERCEL ? `https://${VERCEL}` : 'https://akabuild.dev')
).replace(/\/$/, '')

export const SITE_NAME = 'akaBuild'
export const AUTHOR = 'Ieuan King'

/** An absolute URL for a site-relative path. */
export function abs(path: string) {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
