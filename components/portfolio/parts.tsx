import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

/**
 * The vocabulary the portfolio page is assembled from.
 *
 * All server components. They hold no state and read no browser API, so the
 * page's only client boundary is the work filter. Every heading, rule, figure
 * and chip below is HTML by the time it reaches anyone.
 */

export const KICKER =
  'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/60'

/*
 * Written out in full rather than composed from a shared prefix. Tailwind finds
 * classes by scanning source text, so a name assembled at runtime is a name it
 * never generates: `${PREFIX}reveal-rise` produces no CSS at all.
 *
 * Both gates are Tailwind's own variants. `motion-safe` drops the animation for
 * anyone who asked for less of it, and `supports-[...]` drops it in a browser
 * without scroll-driven animation. Either way the element keeps its resting
 * style, which is the finished one.
 */
export const RISE = 'motion-safe:supports-[animation-timeline:view()]:reveal-rise'
export const FADE = 'motion-safe:supports-[animation-timeline:view()]:reveal-fade'
export const SWEEP = 'motion-safe:supports-[animation-timeline:view()]:reveal-sweep'

/** A stagger offset for a group of siblings, read by the reveal range. */
export const enter = (i: number) => ({ ['--enter' as string]: i * 7 })

export function Section({
  id,
  kicker,
  title,
  lead,
  children,
}: {
  id?: string
  kicker: string
  title?: string
  lead?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="border-t border-border/50 py-16 sm:py-24">
      <p className={`${FADE} ${KICKER}`}>{kicker}</p>
      {title && (
        <h2 className={`${RISE} mt-3 max-w-2xl text-[clamp(1.4rem,3.4vw,2rem)] font-extralight leading-[1.15] tracking-tight text-foreground`}>
          {title}
        </h2>
      )}
      {lead && (
        <p
          className={`${RISE} mt-4 max-w-2xl text-[15px] font-light leading-relaxed text-muted-foreground`}
          style={enter(1)}
        >
          {lead}
        </p>
      )}
      <div className="mt-10">{children}</div>
    </section>
  )
}

/** One hard number, with the thing it counts underneath it. */
export function Stat({ value, label, i = 0 }: { value: string; label: string; i?: number }) {
  return (
    <div className={RISE} style={enter(i)}>
      <p className="text-[clamp(1.6rem,4vw,2.4rem)] font-extralight leading-none tracking-tight text-foreground">
        {value}
      </p>
      <p className="mt-2 text-[12px] font-light leading-snug text-muted-foreground/70">{label}</p>
    </div>
  )
}

/** A role: what it was, when, and what came out of it. */
export function Role({
  org,
  title,
  dates,
  note,
  points,
  links,
  i = 0,
}: {
  org: string
  title: string
  dates: string
  note?: string
  points: string[]
  links?: { label: string; href: string }[]
  i?: number
}) {
  return (
    <li className={`${RISE} relative list-none pb-12 pl-6 last:pb-0`} style={enter(i)}>
      {/* The spine, and this role's node on it. */}
      <span aria-hidden className="absolute left-0 top-2 h-full w-px bg-border/60" />
      <span
        aria-hidden
        className="absolute left-[-3px] top-[7px] h-[7px] w-[7px] rounded-full bg-foreground/40"
      />

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-[17px] font-light tracking-tight text-foreground">{org}</h3>
        <p className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground/55">{dates}</p>
      </div>
      <p className="mt-0.5 text-[12px] font-light text-muted-foreground/70">{title}</p>
      {note && <p className="mt-3 text-[14px] font-light leading-relaxed text-foreground/80">{note}</p>}

      <ul className="mt-3 space-y-2 p-0">
        {points.map((point) => (
          <li
            key={point}
            className="relative list-none pl-4 text-[14px] font-light leading-relaxed text-muted-foreground"
          >
            <span aria-hidden className="absolute left-0 top-[0.62em] h-1 w-1 rounded-full bg-muted-foreground/40" />
            {point}
          </li>
        ))}
      </ul>

      {links && links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
          {links.map((link) => (
            <Anchor key={link.href} href={link.href}>
              {link.label}
            </Anchor>
          ))}
        </div>
      )}
    </li>
  )
}

/** A quiet link that knows whether it is leaving the site. */
export function Anchor({
  href,
  children,
  className = '',
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const external = /^https?:\/\/|^mailto:/.test(href)
  const cls = `group inline-flex items-center gap-1 text-[12px] font-light text-muted-foreground/75 transition-colors hover:text-foreground ${className}`
  const body = (
    <>
      <span className="underline decoration-border underline-offset-[3px] transition-colors group-hover:decoration-foreground/40">
        {children}
      </span>
      <ArrowUpRight className="h-3 w-3 opacity-50 transition-transform group-hover:translate-x-px group-hover:-translate-y-px" aria-hidden />
    </>
  )
  return external ? (
    <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {body}
    </Link>
  )
}

/** A named group of capabilities, set as chips rather than a paragraph. */
export function Craft({ heading, items, i = 0 }: { heading: string; items: string[]; i?: number }) {
  return (
    <div className={RISE} style={enter(i)}>
      <p className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground/55">{heading}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5 p-0">
        {items.map((item) => (
          <li
            key={item}
            className="list-none rounded-md border border-border/60 px-2 py-1 text-[12px] font-light text-muted-foreground/85"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
