import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PixelHead, type PixelIcon } from '@/components/features/brand/pixel-head'
import { BodyLogMark } from '@/components/demo/bodylog/bodylog-mark'
import { CircleheadsLogo } from '@/components/ui/brand-logos'
import { ProjectLogo, logoAspect } from '@/components/ui/project-logo'
import { MarkGlyph, hasGlyph } from '@/components/ui/mark-glyphs'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

/**
 * The one card vocabulary, shared by the landing featured grid, the /demo index
 * and the link tabs: the mark stamped top-left, then title, description and
 * tags stacked to its right.
 *
 * There used to be a generated pixel field behind the mark. It went because it
 * never resolved — a texture loud enough to notice competed with the very clean
 * logos it was supposed to support. The logo carries the identity now and the
 * card gets out of its way. Hue survives only as a whisper on the stamp, enough
 * to tell a wall of cards apart without colouring the page.
 *
 * Server-rendered; the hover is pure CSS, so no client JS either.
 */

export type ProjectCardItem = {
  title: string
  href: string
  description: string
  tags?: string[]
  /** A screenshot; cropped into the stamp when the project has no logo. */
  img?: StaticImageData
  imgAlt?: string
  priority?: boolean
  /** Draw a brand mark from the pixel engine. */
  mark?: PixelIcon
  /** A logo the project ships: a name from the logo kits, or a drawn glyph. */
  logo?: string
  /** A logo that only exists as a bitmap — it fills the stamp edge to edge. */
  logoImg?: StaticImageData
  /** Projects whose logo is just their name set in type. */
  wordmark?: string
  /** The project's own hue, used only to tint its stamp. */
  accent?: string
}

/** Two letters, when a mark cannot survive being 26px wide. */
function monogram(title: string) {
  const word = title.replace(/^aka/i, '').trim() || title
  return word.slice(0, 2).toUpperCase()
}

/** The mark, at stamp size. */
function Stamp({ item, accent }: { item: ProjectCardItem; accent: string }) {
  const bleed = Boolean(item.logoImg || (item.img && !item.logo && !item.mark && !item.wordmark))
  // A wordmark 6.8x wider than it is tall is a grey smear in a 44px square.
  // Those fall back to a monogram, which is what a favicon would do.
  const tooWide = Boolean(item.wordmark) || (item.logo ? logoAspect(item.logo) > 2.2 : false)

  return (
    <span
      className={`aka-stamp${bleed ? ' aka-stamp-bleed' : ''}`}
      style={bleed ? undefined : { ['--stamp-tint' as string]: accent }}
    >
      {item.logoImg ? (
        <Image src={item.logoImg} alt="" width={80} height={80} sizes="80px" className="h-full w-full object-cover" />
      ) : item.logo === 'bodylog' ? (
        <BodyLogMark size={28} title="" />
      ) : item.logo === 'circleheads' ? (
        <CircleheadsLogo size={26} />
      ) : tooWide ? (
        <span className="font-mono text-[13px] font-medium uppercase tracking-[0.02em] text-foreground/80">
          {monogram(item.wordmark ?? item.title)}
        </span>
      ) : item.logo && hasGlyph(item.logo) ? (
        <MarkGlyph name={item.logo} size={24} />
      ) : item.logo ? (
        <ProjectLogo name={item.logo} size={26} />
      ) : item.mark ? (
        <PixelHead size={28} grid={22} icon={item.mark} still />
      ) : (
        item.img && (
          <Image
            src={item.img}
            alt=""
            fill
            placeholder="blur"
            priority={item.priority}
            sizes="80px"
            className="object-cover object-top"
          />
        )
      )}
    </span>
  )
}

export function ProjectCard({ item }: { item: ProjectCardItem }) {
  const isExternal = /^https?:\/\//.test(item.href)
  const accent = item.accent ?? 'var(--foreground)'

  const body = (
    <>
      <Stamp item={item} accent={accent} />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex items-start justify-between gap-3">
          <span className="text-[14px] font-light leading-snug tracking-[-0.01em] text-foreground">
            {item.title}
          </span>
          <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/35 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
        </span>
        <span className="mt-1 line-clamp-3 text-[12px] font-light leading-snug text-muted-foreground/75">
          {item.description}
        </span>
        {item.tags && item.tags.length > 0 && (
          <span className="mt-auto flex flex-wrap gap-1 pt-3">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="tag">
                {tag}
              </Badge>
            ))}
          </span>
        )}
      </span>
    </>
  )

  const cls = 'aka-card group flex-row'
  return isExternal ? (
    <Card asChild className={cls}>
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    </Card>
  ) : (
    <Card asChild className={cls}>
      <Link href={item.href}>{body}</Link>
    </Card>
  )
}
