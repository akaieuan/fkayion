import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

/**
 * Everything here is public and meant to be found, so the only real job of this
 * file is to point crawlers at the sitemap. `/_next/` is excluded because build
 * assets are not pages and indexing them wastes crawl budget on nothing.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/_next/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
