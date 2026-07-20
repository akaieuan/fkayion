import Link from 'next/link'

type SpotlightCardProps = {
  href: string
  external?: boolean
  className?: string
  children: React.ReactNode
}

// Glassy card link: translucent var(--card) + backdrop-blur, with a plain hover.
// (No cursor-tracking border glow — removed by request.)
const base =
  'group flex h-full flex-col rounded-xl border border-border bg-[color-mix(in_oklab,var(--card)_72%,transparent)] p-4 backdrop-blur-md transition-colors hover:bg-[color-mix(in_oklab,var(--card)_90%,transparent)]'

export function SpotlightCard({ href, external, className, children }: SpotlightCardProps) {
  const cls = `${base} ${className ?? ''}`
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}
