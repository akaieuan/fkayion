import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Prose } from '@/components/features/writing/prose'
import { WRITING_PAGES, getWritingPage } from '@/lib/writing'

/**
 * An essay, hosted here.
 *
 * These used to live on kraa.io, which meant leaving the site to read something
 * written for it. The text is now local data, so the route is static: every
 * piece is rendered at build time, ships as HTML, and carries no client
 * JavaScript of its own.
 *
 * The article sits in its own measure rather than the page's. Line length is
 * the one typographic decision a long read cannot get wrong.
 */

export function generateStaticParams() {
  return WRITING_PAGES.map((entry) => ({ slug: entry.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const entry = getWritingPage(params.slug)
  if (!entry) return {}
  return {
    title: entry.title,
    description: entry.description,
  }
}

export default function WritingPage({ params }: { params: { slug: string } }) {
  const entry = getWritingPage(params.slug)
  if (!entry) notFound()

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-[38rem]">
        <Link
          href="/#writing"
          className="mb-10 inline-flex items-center gap-1.5 text-xs font-light text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Writing
        </Link>

        <header className="mb-10">
          <p className="text-[11px] font-light text-muted-foreground">{entry.type}</p>
          <h1 className="mt-3 text-[clamp(1.6rem,4.5vw,2.15rem)] font-extralight leading-[1.15] tracking-tight text-foreground">
            {entry.title}
          </h1>
          <p className="mt-4 text-[15px] font-light leading-relaxed text-muted-foreground">
            {entry.deck}
          </p>
        </header>

        <Prose blocks={entry.body} />

        <footer className="mt-16 flex flex-wrap items-baseline justify-between gap-4">
          <span className="text-[12px] font-light text-muted-foreground">
            {entry.published}
          </span>
          <Link
            href="/#writing"
            className="text-[12px] font-light text-muted-foreground transition-colors hover:text-foreground"
          >
            More writing
          </Link>
        </footer>
      </article>
    </main>
  )
}
