import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PixelHead, type PixelIcon } from '@/components/features/brand/pixel-head'
import { BodyLogMark } from '@/components/demo/bodylog/bodylog-mark'
import { AkaOssLogo, AkaVstLogo, CircleheadsLogo } from '@/components/ui/brand-logos'

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
  /** Projects that ship their own logo — drawn from the source repo's icon.svg. */
  logo?: 'bodylog' | 'circleheads' | 'akaoss' | 'akavst'
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
  const body = (
    <>
      {item.logo || item.mark ? (
        // A filled well, tinted with the project's own hue: a soft wash plus a
        // hairline of the accent along the bottom, so cards differ without the
        // grid turning into a colour chart.
        <div
          className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden border-b"
          style={{
            background: accent
              ? `radial-gradient(120% 110% at 50% 18%, ${accent}22, ${accent}0B 62%, transparent)`
              : undefined,
            borderBottomColor: accent ? `${accent}55` : undefined,
            color: accent ?? undefined,
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: accent ? `${accent}0A` : undefined }}
          />
          <div className="relative">
            {item.logo === 'bodylog' && <BodyLogMark size={104} title="" />}
            {item.logo === 'circleheads' && <CircleheadsLogo size={100} />}
            {item.logo === 'akaoss' && <AkaOssLogo size={100} />}
            {item.logo === 'akavst' && <AkaVstLogo size={92} />}
            {!item.logo && item.mark && (
              <PixelHead size={112} grid={24} icon={item.mark} still color={accent} />
            )}
          </div>
        </div>
      ) : (
        item.img && (
          // p-3 keeps the shot clear of the card edge; `contain` never crops it.
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/10 p-3">
            <Image
              src={item.img}
              alt={item.imgAlt ?? item.title}
              fill
              placeholder="blur"
              priority={item.priority}
              sizes="(min-width:1024px) 340px, (min-width:640px) 45vw, 90vw"
              className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
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
