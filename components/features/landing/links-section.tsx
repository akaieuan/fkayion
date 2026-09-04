import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { FeaturedGrid } from '@/components/features/landing/links/featured-grid'
import { CoverList, type CoverRow } from '@/components/features/landing/links/cover-list'
import { WritingList } from '@/components/features/landing/links/writing-list'
import { MEASURE } from './measure'

/**
 * The middle of the landing: the work, a line about who made it, then the
 * writing and the music.
 *
 * These used to be four tabs. Stacking them is fewer decisions for a reader and
 * one less thing to operate: the whole page is now something you scroll rather
 * than something you drive. Projects keep their cards, which earn the space.
 * Writing and music are lists, because a title and a line is all either needs,
 * and the socials moved to the footer where links of that kind belong.
 */

/**
 * Playlists rather than an embedded player. A cover that appears when you point
 * at the name says what a record looks like without the page loading a widget,
 * autoplaying at anyone, or asking to be operated.
 */
const releases: CoverRow[] = [
  {
    title: 'Healthiest TRX',
    meta: 'Playlist · aka ieuan',
    href: 'https://soundcloud.com/akaieuan/sets/aka-ieuan-healthiest-trx',
    cover: '/music-analysis-chat/music-healthiest-trx.webp',
  },
  {
    title: 'Releases, all',
    meta: 'Playlist · the whole catalogue',
    href: 'https://soundcloud.com/akaieuan/sets/aka-ieuan-releases-all',
    cover: '/music-analysis-chat/music-releases-all.webp',
  },
  {
    title: 'VM4UH · Vitamixes 4 Ur Health',
    meta: 'Playlist · mixes',
    href: 'https://soundcloud.com/akaieuan/sets/vm4uh-vitamixes-4-ur-health',
    cover: '/music-analysis-chat/music-vm4uh.webp',
  },
]

/*
 * Set in plain sentence case at reading size rather than as tiny letterspaced
 * capitals. The caps read as a system label; the word on its own reads as
 * someone talking, which is the register the rest of the page is in.
 */
const heading = 'text-[15px] font-normal tracking-tight text-foreground'


function MoreLink({ more }: { more: { label: string; href: string } }) {
  const external = /^https?:\/\//.test(more.href)
  const cls =
    'text-[11px] font-light text-muted-foreground/60 hover:text-foreground transition-colors inline-flex items-center gap-1 whitespace-nowrap'
  const inner = (
    <>
      {more.label}
      <ArrowUpRight className="h-3 w-3 opacity-70" aria-hidden />
    </>
  )
  return external ? (
    <a href={more.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={more.href} className={cls}>
      {inner}
    </Link>
  )
}

function SectionHead({
  title,
  more,
}: {
  title: string
  more?: { label: string; href: string }
}) {
  /*
   * The link sits next to the word, not at the other end of the column. Pushed
   * apart, "soundcloud" reads as a piece of page furniture floating near the
   * margin; set against the heading it reads as part of the same phrase, which
   * is what it is.
   */
  return (
    <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <h2 className={heading}>{title}</h2>
      {more && <MoreLink more={more} />}
    </div>
  )
}

export function LinksSection() {
  return (
    <section id="section-1" className="relative w-full pb-24 pt-4">
      <div className="w-full max-w-site mx-auto site-inset">
        <div className="mb-14">
          <SectionHead title="Projects" more={{ label: 'all projects', href: '/demo' }} />
          <FeaturedGrid />
        </div>

        {/*
         * Who I am reads as a caption to the work rather than as an
         * introduction to it, so it comes after the grid and keeps the grid's
         * own alignment at the page gutter.
         */}
        <div className="aka-rise mb-16 max-w-[40rem]">
          <h1 className={heading}>Who I am</h1>
          <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
            I&apos;m a product design engineer trained as an anthropologist, which is mostly a way
            of saying I go and find the problem before I design for it. Most of that has gone into
            human-in-the-loop AI for expert users: sitting with the people doing the work, watching
            where the task actually breaks, and deciding what an agent should and should not be
            trusted with.
          </p>
          <Link
            href="/demo/how-i-work"
            className="mt-3 inline-flex items-center gap-1.5 text-13 font-light text-muted-foreground aka-quiet-link"
          >
            How I work
          </Link>
        </div>

        {/* Prose sits in its own measure, so a heading and its link stay
            together instead of being flung to the container's far edge. */}
        <div id="writing" className={`${MEASURE} mb-16 scroll-mt-24`}>
          <SectionHead title="Writing" more={{ label: 'aka.write', href: 'https://kraa.io/akaieuan' }} />
          <WritingList />
        </div>

        <div id="music" className={`${MEASURE} scroll-mt-24`}>
          <SectionHead title="Music" more={{ label: 'soundcloud', href: 'https://soundcloud.com/akaieuan' }} />
          <CoverList items={releases} />
        </div>
      </div>
    </section>
  )
}
