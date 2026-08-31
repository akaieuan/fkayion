import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { LAB_ENTRIES, findEntry } from '@/components/product-replicas/bkz-lab-log/entries'
import { LabProse } from '@/components/product-replicas/bkz-lab-log/prose'
import { JsonLd, articleSchema, breadcrumbSchema } from '@/components/seo/json-ld'

/**
 * One lab entry.
 *
 * Static at build time and server-rendered throughout: the entry is data, the
 * renderer is a server component, and the page ships no client JavaScript of
 * its own. `generateStaticParams` is what turns the dynamic segment into a
 * fixed set of prerendered HTML files rather than a function invoked per
 * request.
 */

type Params = { params: { slug: string } }

const LOG = '/demo/blenderpipeline/bkz-lab-log'

export function generateStaticParams() {
  return LAB_ENTRIES.map((entry) => ({ slug: entry.slug }))
}

/** Anything not in the list is a 404, not a miss that gets rendered on demand. */
export const dynamicParams = false

export function generateMetadata({ params }: Params): Metadata {
  const entry = findEntry(params.slug)
  if (!entry) return { title: 'BKZ lab log' }

  const path = `${LOG}/${entry.slug}`
  return {
    title: entry.title,
    description: entry.standfirst,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: path,
      title: entry.title,
      description: entry.standfirst,
      publishedTime: entry.date,
      section: entry.kicker,
      authors: ['Ieuan King'],
      images: [{ url: entry.hero, alt: entry.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.title,
      description: entry.standfirst,
      images: [entry.hero],
    },
  }
}

export default function LabEntryPage({ params }: Params) {
  const entry = findEntry(params.slug)
  if (!entry) notFound()

  const path = `${LOG}/${entry.slug}`

  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <JsonLd
        data={[
          articleSchema({
            path,
            headline: entry.title,
            description: entry.standfirst,
            image: entry.hero,
            date: entry.date,
            section: entry.kicker,
          }),
          breadcrumbSchema([
            { name: 'Projects', path: '/demo' },
            { name: 'Brooklyn Dead', path: '/demo/blenderpipeline' },
            { name: 'BKZ lab log', path: LOG },
            { name: entry.title, path },
          ]),
        ]}
      />

      <article className="mx-auto max-w-2xl">
        <Link
          href={LOG}
          className="mb-10 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          BKZ lab log
        </Link>

        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
          {entry.kicker}
        </p>
        <h1 className="mt-2 text-2xl font-light leading-snug tracking-tight text-foreground md:text-[26px]">
          {entry.title}
        </h1>
        <p className="mt-4 text-[15px] font-light leading-relaxed text-foreground/85">
          {entry.standfirst}
        </p>
        <p className="mt-4 font-mono text-[11px] text-muted-foreground/60">
          <time dateTime={entry.date}>{entry.published}</time>
          {' · '}
          {entry.meta ?? 'Brooklyn Dead asset pipeline'}
        </p>

        <LabProse blocks={entry.body} />

        <Link
          href="/demo/blenderpipeline"
          className="mt-14 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to the pipeline
        </Link>
      </article>
    </div>
  )
}
