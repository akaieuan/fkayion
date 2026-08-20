import Image, { type StaticImageData } from 'next/image'
import { PixelHead, type PixelIcon } from '@/components/features/brand/pixel-head'
import { BodyLogMark } from '@/components/demo/bodylog/bodylog-mark'
import { CircleheadsLogo } from '@/components/ui/brand-logos'
import { ProjectLogo, logoAspect } from '@/components/ui/project-logo'
import { MarkGlyph, hasGlyph } from '@/components/ui/mark-glyphs'

/**
 * A project's mark, wherever it needs to appear.
 *
 * Every project carries its identity differently: some ship an SVG, some a
 * bitmap, some only exist as a grid the pixel engine draws, and one or two have
 * nothing but their name. Working out which is which is the same problem at
 * 26px on a card and at 90px on a plate, so it is solved once here and the
 * callers only choose a size.
 */

export type ProjectItem = {
  title: string
  href: string
  description: string
  tags?: string[]
  /** A screenshot; cropped in when the project has no logo. */
  img?: StaticImageData
  imgAlt?: string
  priority?: boolean
  /** Draw a brand mark from the pixel engine. */
  mark?: PixelIcon
  /** A logo the project ships: a name from the logo kits, or a drawn glyph. */
  logo?: string
  /** A logo that only exists as a bitmap; it fills its frame edge to edge. */
  logoImg?: StaticImageData
  /** Projects whose logo is just their name set in type. */
  wordmark?: string
  /** The project's own hue, used only to tint the ground behind the mark. */
  accent?: string
}

/** True when the art fills its frame rather than sitting inside it. */
export function marksBleed(item: ProjectItem) {
  return Boolean(item.logoImg || (item.img && !item.logo && !item.mark && !item.wordmark))
}

/** Two letters, for a mark that cannot survive being shrunk. */
function monogram(title: string) {
  const word = title.replace(/^aka/i, '').trim() || title
  return word.slice(0, 2).toUpperCase()
}

export function ProjectMark({
  item,
  size,
  sizes = '96px',
}: {
  item: ProjectItem
  /** Rendered size of the mark itself, in px. */
  size: number
  /** next/image `sizes`, for the bitmap branches. */
  sizes?: string
}) {
  // A wordmark much wider than it is tall is a grey smear once shrunk, so it
  // falls back to a monogram, which is what a favicon would do.
  const tooWide = Boolean(item.wordmark) || (item.logo ? logoAspect(item.logo) > 2.2 : false)

  if (item.logoImg) {
    return (
      <Image
        src={item.logoImg}
        alt=""
        width={size * 3}
        height={size * 3}
        sizes={sizes}
        className="h-full w-full object-cover"
      />
    )
  }
  if (item.logo === 'bodylog') return <BodyLogMark size={size} title="" />
  if (item.logo === 'circleheads') return <CircleheadsLogo size={size} />
  if (tooWide) {
    return (
      <span
        className="font-mono font-medium uppercase tracking-[0.02em] text-foreground/80"
        style={{ fontSize: Math.round(size * 0.46) }}
      >
        {monogram(item.wordmark ?? item.title)}
      </span>
    )
  }
  if (item.logo && hasGlyph(item.logo)) return <MarkGlyph name={item.logo} size={size} />
  if (item.logo) return <ProjectLogo name={item.logo} size={size} />
  if (item.mark) return <PixelHead size={size} grid={22} icon={item.mark} still />
  if (item.img) {
    return (
      <Image
        src={item.img}
        alt=""
        fill
        placeholder="blur"
        priority={item.priority}
        sizes={sizes}
        className="object-cover object-top"
      />
    )
  }
  return null
}
