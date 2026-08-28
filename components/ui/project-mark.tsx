import Image, { type StaticImageData } from 'next/image'
import { PlateVideo } from '@/components/ui/plate-video'
import { PixelRoundabout } from '@/components/features/brand/pixel-roundabout'
import { PixelHead, type PixelIcon } from '@/components/features/brand/pixel-head'
import { BodyLogMark } from '@/components/demo/bodylog/bodylog-mark'
import { CovartMark } from '@/components/ui/covart-mark'
import { BlockpadMark } from '@/components/ui/blockpad-mark'
import { TrickleSpecimen } from '@/components/ui/trickle-specimen'
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
  /**
   * Override whether the art fills its frame. A drawn mark that carries its own
   * ground (akaCOVART) reads as an icon, not as a glyph sitting on a plate, and
   * nothing about its shape says so on its own.
   */
  bleed?: boolean
  /**
   * The art takes the whole plate. Inferred for a project whose only art is a
   * screenshot; set by hand for one that draws its own full-plate piece.
   */
  fill?: boolean
  /**
   * This project lives inside another one, and the parent is where it is
   * listed. It stays in `PROJECTS` so its write-up keeps its structured data,
   * its share image and its place in the sitemap; it is simply left out of the
   * index, which was showing five open-source toolkits and the studio that
   * ships all five as six equal plates.
   */
  parent?: string
  /**
   * The mark is drawn light on nothing, so it needs a dark ground under it in
   * either theme. Box Populi's art is white on transparent; akaVST's is
   * near-white with translucent white fills.
   */
  onDark?: boolean
}

/**
 * The older name for the same shape, kept because two files and a page of data
 * still read better with it.
 */
export type ProjectCardItem = ProjectItem

/** True when the art fills its frame rather than sitting inside it. */
export function marksBleed(item: ProjectItem) {
  if (item.bleed !== undefined) return item.bleed
  return Boolean(item.logoImg || (item.img && !item.logo && !item.mark && !item.wordmark))
}

/**
 * True when the art takes the whole plate rather than sitting inside it.
 *
 * On a plate these behave differently from a logo. A logo is an object that
 * wants air around it, which is why they all sit in the same inset square. A
 * screenshot is a picture of the work, and cropping one into a small square in
 * the middle of a large plate reads as a thumbnail of a thumbnail. It takes the
 * whole plate instead.
 */
export function fillsPlate(item: ProjectItem) {
  if (item.fill !== undefined) return item.fill
  return Boolean(item.img && !item.logo && !item.logoImg && !item.mark && !item.wordmark)
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
  priority,
}: {
  item: ProjectItem
  /** Rendered size of the mark itself, in px. */
  size: number
  /** next/image `sizes`, for the bitmap branches. */
  sizes?: string
  /**
   * Preload this one. A grid's first plate is above the fold on both pages that
   * show it, and a lazy bitmap there is the largest contentful paint.
   */
  priority?: boolean
}) {
  const eager = priority ?? item.priority
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
        // A static import carries a build-time blur; it only applies if asked
        // for. Without this a lazy plate below the fold decodes into an empty
        // tint and snaps in, which is the pop-in the reveal exists to cover.
        placeholder="blur"
        priority={eager}
        // These are logos, and one of them is generative grain: the default 75
        // smears it. Cheap here, since the sources are small and flat.
        quality={90}
        className="h-full w-full object-cover"
      />
    )
  }
  if (item.logo === 'wrdef-play')
    return (
      <PlateVideo
        src="/wrdef-card.mp4"
        poster="/wrdef-card-poster.webp"
        label="Wrdef, mid-game: a guess resolving to green and amber tiles"
        width={900}
        height={640}
      />
    )
  /*
   * Bartel-Pritchard Square, running. The plate's frame scales any canvas to
   * fill it, so the size here only sets the render resolution; the sim pauses
   * itself offscreen and on a hidden tab, and renders a single mid-flow frame
   * under reduced motion, so a grid of twenty-one plates does not pay for it.
   */
  if (item.logo === 'roundabout') return <PixelRoundabout size={size} />
  if (item.logo === 'bodylog') return <BodyLogMark size={size} title="" />
  if (item.logo === 'akacovart') return <CovartMark size={size} />
  if (item.logo === 'blockpad') return <BlockpadMark size={size} />
  if (item.logo === 'trickle-live') return <TrickleSpecimen />
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
        priority={eager}
        sizes={sizes}
        // A screenshot on a plate is shown at a third of a metre of screen, not
        // as a 26px stamp. The default 75 is visible at that size.
        quality={90}
        className="object-cover object-top"
      />
    )
  }
  return null
}
