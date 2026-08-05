import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PixelHead, type PixelIcon } from '@/components/features/brand/pixel-head'
import { BodyLogMark } from '@/components/demo/bodylog/bodylog-mark'
import { CircleheadsLogo } from '@/components/ui/brand-logos'
import { ProjectLogo } from '@/components/ui/project-logo'
import { PixelPattern, patternFor } from '@/components/ui/pixel-pattern'

/**
 * The one project-card vocabulary, shared by the landing featured grid and
 * the /demo index: media on top (static import → build-time blur placeholder),
 * then name, brief, and neutral tag chips. Server-rendered; no client JS.
 */

export type ProjectCardItem = {
  title: string
  href: string
  description: string
  tags?: string[]
  img?: StaticImageData
  imgAlt?: string
  priority?: boolean
  /** Draw the brand mark instead of a screenshot — for toolkits that ship an icon. */
  mark?: PixelIcon
  /** Projects that ship their own logo — from the logo kits, or a local mark. */
  logo?: 'bodylog' | 'circleheads' | string
  /**
   * The project's own hue. Tints its media well and its mark so a wall of
   * cards reads as a family of distinct things rather than one repeated one.
   */
  accent?: string
}

const chip =
  'rounded-md border border-border/60 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70'

export function ProjectCard({ item }: { item: ProjectCardItem }) {
  const isExternal = /^https?:\/\//.test(item.href)
  // Fall back to the site's own accent so an untagged card still looks intentional.
  const accent = item.accent ?? '#8a8a86'
  const pattern = patternFor(item.logo ?? item.mark ?? item.title)
  const body = (
    <>
      {item.logo || item.mark ? (
        // A pixel-cell field in the project's own hue, with the logo in front —
        // same bit language as the marks themselves, drawn as server SVG.
        <div className="relative flex h-[124px] w-full items-center justify-center overflow-hidden border-b border-border/60">
          <PixelPattern
            kind={pattern.kind}
            seed={pattern.seed}
            accent={accent}
            className="absolute inset-0 h-full w-full"
          />
          <span className="relative text-foreground/90">
            {item.logo === 'bodylog' ? (
              <BodyLogMark size={64} title="" />
            ) : item.logo === 'circleheads' ? (
              <CircleheadsLogo size={62} />
            ) : item.logo ? (
              <ProjectLogo name={item.logo} size={62} />
            ) : (
              item.mark && <PixelHead size={68} grid={22} icon={item.mark} still />
            )}
          </span>
        </div>
      ) : (
        item.img && (
          <div className="relative h-[124px] w-full overflow-hidden border-b border-border/60 bg-muted/10">
            <Image
              src={item.img}
              alt={item.imgAlt ?? item.title}
              fill
              placeholder="blur"
              priority={item.priority}
              sizes="(min-width:1024px) 340px, (min-width:640px) 45vw, 90vw"
              className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        )
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[14px] font-light leading-snug tracking-[-0.01em] text-foreground">
            {item.title}
          </h3>
          <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/35 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
        </div>
        <p className="mt-1 line-clamp-3 text-[12px] font-light leading-snug text-muted-foreground/75">
          {item.description}
        </p>
        {item.tags && item.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2.5">
            {item.tags.map((tag) => (
              <span key={tag} className={chip}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  )

  const cls =
    'group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card/40 transition-colors hover:bg-muted/30'
  return isExternal ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <Link href={item.href} className={cls}>
      {body}
    </Link>
  )
}
