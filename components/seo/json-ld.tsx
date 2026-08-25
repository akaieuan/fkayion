import { SITE_NAME, SITE_URL, AUTHOR, abs } from '@/lib/site'

/**
 * Structured data, server-rendered.
 *
 * A `<script type="application/ld+json">` is inert to the browser and read by
 * crawlers, so this ships as part of the HTML and costs no client JavaScript.
 * React refuses to render script content as a child, which is why it goes in
 * through `dangerouslySetInnerHTML` — the input here is our own typed objects
 * and never user text, and the one escape below closes the injection route a
 * literal `</script>` inside a string would otherwise open.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}

const PUBLISHER = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: abs('/icon.png') },
}

/** A lab entry: a technical article with an author, a date and a picture. */
export function articleSchema(a: {
  path: string
  headline: string
  description: string
  image: string
  date: string
  section?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(a.path) },
    url: abs(a.path),
    headline: a.headline,
    description: a.description,
    image: [abs(a.image)],
    datePublished: a.date,
    dateModified: a.date,
    inLanguage: 'en-GB',
    author: { '@type': 'Person', name: AUTHOR, url: SITE_URL },
    publisher: PUBLISHER,
    ...(a.section ? { articleSection: a.section } : {}),
  }
}

/** The trail the reader took to get here, so a result can show it. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: abs(step.path),
    })),
  }
}

/** An index page: the list itself is the content. */
export function collectionSchema(c: {
  path: string
  name: string
  description: string
  items: { name: string; path: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': abs(c.path),
    url: abs(c.path),
    name: c.name,
    description: c.description,
    inLanguage: 'en-GB',
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    publisher: PUBLISHER,
    mainEntity: {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: c.items.length,
      itemListElement: c.items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        url: abs(item.path),
      })),
    },
  }
}

/** The pipeline itself: a body of work rather than an article about one. */
export function projectSchema(p: {
  path: string
  name: string
  description: string
  image: string
  keywords: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': abs(p.path),
    url: abs(p.path),
    name: p.name,
    description: p.description,
    image: [abs(p.image)],
    inLanguage: 'en-GB',
    keywords: p.keywords.join(', '),
    creator: { '@type': 'Person', name: AUTHOR, url: SITE_URL },
    publisher: PUBLISHER,
  }
}
