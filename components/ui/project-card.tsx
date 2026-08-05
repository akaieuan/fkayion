import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PixelHead, type PixelIcon } from '@/components/features/brand/pixel-head'
import { BodyLogMark } from '@/components/demo/bodylog/bodylog-mark'
import { CircleheadsLogo } from '@/components/ui/brand-logos'
import { ProjectLogo } from '@/components/ui/project-logo'
import { MarkGlyph, hasGlyph } from '@/components/ui/mark-glyphs'
import { PixelField, type FieldMotion } from '@/components/ui/pixel-field'
import { type ShapeName } from '@/components/features/brand/shapes'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

/**
 * The one project-card vocabulary, shared by the landing featured grid and
 * the /demo index: art on top, then name, brief, and neutral tag chips.
 * Server-rendered, and the hover life is pure CSS, so no client JS either.
 *
 * Two kinds of art:
 *   · a screenshot (static import → build-time blur placeholder), or
 *   · a brand plate — the `.aka-plate` primitive: opaque ground, a pixel field
 *     in the project's hue, and its mark in an `.aka-icon-tile` in front.
 *
 * On hover only the field moves; the mark is identity and holds still.
 */

/** Field behaviours, from akaSTYLE. Named so a grid never repeats itself. */
export type Motion = FieldMotion

export type ProjectCardItem = {
  title: string
  href: string
  description: string
  tags?: string[]
  img?: StaticImageData
  imgAlt?: string
  priority?: boolean
  /** Draw a brand mark from the pixel engine instead of a screenshot. */
  mark?: PixelIcon
  /** A logo the project ships: a name from the logo kits, or a drawn glyph. */
  logo?: string
  /** A logo that only exists as a bitmap — it fills its own icon tile. */
  logoImg?: StaticImageData
  /** Projects whose logo is just their name set in type. */
  wordmark?: string
  /**
   * The project's own hue. Tints its pixel field so a wall of cards reads as a
   * family of distinct things rather than one repeated one.
   */
  accent?: string
  /**
   * The subject knocked out of the card's field — the same knockouts the hero
   * disc cycles through. Each card gets its own, so no two plates read alike.
   */
  shape?: ShapeName
  /** How the field's cells come apart on hover. Omit for a still plate. */
  motion?: Motion
}

/** A stable seed from the project's own name — the crop is part of its identity. */
function seedFor(key: string) {
  let h = 0
  for (let i = 0; i < key.length; i++) h = (Math.imul(h, 31) + key.charCodeAt(i)) >>> 0
  return (h % 997) + 1
}

export function ProjectCard({ item }: { item: ProjectCardItem }) {
  const isExternal = /^https?:\/\//.test(item.href)
  // Fall back to the site's own accent so an untagged card still looks intentional.
  const accent = item.accent ?? '#8a8a86'
  const seed = seedFor(item.logo ?? item.mark ?? item.title)
  const hasPlate = Boolean(item.logo || item.logoImg || item.wordmark || item.mark)

  const body = (
    <>
      {hasPlate ? (
        <div className="aka-plate">
          <PixelField
            shape={item.shape ?? 'spark'}
            seed={seed}
            accent={accent}
            motion={item.motion}
            className="aka-plate-field"
          />
          <span
            className={[
              'aka-icon-tile',
              item.logoImg ? 'aka-icon-tile-bleed' : '',
              item.wordmark ? 'aka-icon-tile-wide' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {item.logoImg ? (
              <Image
                src={item.logoImg}
                alt=""
                width={86}
                height={86}
                sizes="86px"
                className="h-full w-full object-cover"
              />
            ) : item.wordmark ? (
              <span className="font-mono text-[20px] font-medium uppercase tracking-[0.32em] text-foreground/85">
                {item.wordmark}
              </span>
            ) : item.logo === 'bodylog' ? (
              <BodyLogMark size={58} title="" />
            ) : item.logo === 'circleheads' ? (
              <CircleheadsLogo size={56} />
            ) : item.logo && hasGlyph(item.logo) ? (
              <MarkGlyph name={item.logo} size={52} accent={accent} />
            ) : item.logo ? (
              <ProjectLogo name={item.logo} size={56} />
            ) : (
              item.mark && <PixelHead size={60} grid={22} icon={item.mark} still />
            )}
          </span>
        </div>
      ) : (
        item.img && (
          <div className="aka-plate">
            <Image
              src={item.img}
              alt={item.imgAlt ?? item.title}
              fill
              placeholder="blur"
              priority={item.priority}
              sizes="(min-width:1024px) 340px, (min-width:640px) 45vw, 90vw"
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:transform-none"
            />
          </div>
        )
      )}
      <CardHeader className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-[14px] tracking-[-0.01em]">{item.title}</CardTitle>
          <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/35 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
        </div>
        <p className="line-clamp-3 text-[12px] font-light leading-snug text-muted-foreground/75">
          {item.description}
        </p>
      </CardHeader>
      {item.tags && item.tags.length > 0 && (
        <CardFooter className="flex-wrap gap-1.5 pt-2.5">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="tag">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      )}
    </>
  )

  const cls =
    'group h-full gap-0 overflow-hidden py-0 transition-colors hover:border-foreground/20 hover:bg-muted/30'
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
