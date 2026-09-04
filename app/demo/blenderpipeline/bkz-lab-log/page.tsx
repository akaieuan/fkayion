import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { LAB_ENTRIES } from '@/components/product-replicas/bkz-lab-log/entries'
import { JsonLd, breadcrumbSchema, collectionSchema } from '@/components/seo/json-ld'

/**
 * The lab log index.
 *
 * A findings list, laid out the way akaOSS lays its research out: entries as
 * bare articles separated by space, not cards. A boxed list of three items
 * reads as a menu of products; the same three as a flat list read as a
 * publication, which is what this is. Nothing here is a call to action, so
 * nothing here needs a border around it.
 */

const PATH = '/demo/blenderpipeline/bkz-lab-log'
const TITLE = 'BKZ lab log'
const DESCRIPTION =
  'Findings and methodology from the Brooklyn Dead asset pipeline: what broke, how it was measured, what the numbers said before and after, and what was priced and then refused.'
const HERO = '/bkz/mob-lab-night.webp'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: 'website',
    url: PATH,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: HERO, width: 1280, height: 720, alt: 'The mob lab at night' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [HERO] },
}

const tag =
  'rounded-full border border-border/70 px-2.5 py-1 text-11 font-light text-muted-foreground'

export default function LabLogIndexPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <JsonLd
        data={[
          collectionSchema({
            path: PATH,
            name: TITLE,
            description: DESCRIPTION,
            items: LAB_ENTRIES.map((e) => ({ name: e.title, path: `${PATH}/${e.slug}` })),
          }),
          breadcrumbSchema([
            { name: 'Projects', path: '/demo' },
            { name: 'Brooklyn Dead', path: '/demo/blenderpipeline' },
            { name: TITLE, path: PATH },
          ]),
        ]}
      />

      <div className="mx-auto max-w-2xl">
        <Link
          href="/demo/blenderpipeline"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Brooklyn Dead
        </Link>

        <p className="font-mono text-11 uppercase tracking-[0.2em] text-muted-foreground/70">
          BKZ lab log
        </p>
        <h1 className="mt-3 text-2xl font-light tracking-tight text-foreground">Findings</h1>
        <p className="mt-4 max-w-xl text-15 font-light leading-relaxed text-muted-foreground">
          Write-ups from the Brooklyn Dead asset pipeline. When assets are generated rather than
          modelled, a bug is rarely in one asset: it is in a shared assumption, and it shows up
          across the whole set at once. Numbers are given as measured, including the ones that make
          the old code look worse.
        </p>

        {LAB_ENTRIES.map((entry) => (
          <article key={entry.slug} className="mt-14 first:mt-12">
            <h2 className="text-xl font-medium leading-snug tracking-tight text-foreground">
              <Link href={`${PATH}/${entry.slug}`} className="transition-colors hover:underline decoration-border underline-offset-[3px]">
                {entry.title}
              </Link>
            </h2>
            <p className="mt-2 font-mono text-12 text-muted-foreground/70">
              <time dateTime={entry.date}>{entry.date}</time>
              {' · '}
              {entry.kicker.split(' · ')[0].toLowerCase()}
            </p>
            <p className="mt-3 max-w-xl text-15 font-light leading-relaxed text-muted-foreground">
              {entry.standfirst}
            </p>
            <ul className="mt-4 flex list-none flex-wrap gap-1.5 p-0">
              {entry.kicker.split(' · ').map((t) => (
                <li key={t} className={tag}>
                  {t.toLowerCase()}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  )
}
