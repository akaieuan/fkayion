import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PixelHead } from '@/components/features/brand/pixel-head'

type FooterLink = { label: string; href: string; external?: boolean }

/** Four columns: what I made, who I run it with, the system behind it, where else I am. */
const columns: { heading: string; links: FooterLink[] }[] = [
  {
    heading: 'Work',
    links: [
      { label: 'All projects', href: '/demo' },
      { label: 'Ubik Studio', href: '/demo/ubik' },
      { label: 'Box Populi', href: '/demo/box-populi' },
      { label: 'akaCOVART', href: '/demo/akacovart' },
      { label: 'akaVST', href: '/demo/akavsts' },
    ],
  },
  {
    heading: 'Studios',
    links: [
      { label: 'Circleheads', href: '/demo/circleheads' },
      { label: 'akaOSS', href: '/demo/akaoss' },
      { label: 'HITL Kit', href: '/demo/hitl-kit' },
      { label: 'eval-kit', href: '/demo/eval-kit' },
      { label: 'Hologram', href: '/demo/hologram' },
    ],
  },
  {
    heading: 'akaSTYLE',
    links: [
      { label: 'Design system', href: '/aka-style' },
      { label: 'Foundations', href: '/aka-style/foundations' },
      { label: 'Primitives', href: '/aka-style/primitives' },
      { label: 'Marks', href: '/aka-style/marks' },
      { label: 'Faces', href: '/aka-style/faces' },
    ],
  },
  {
    heading: 'Elsewhere',
    links: [
      { label: 'GitHub', href: 'https://github.com/akaieuan', external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ieuan-king/', external: true },
      { label: 'aka.write', href: 'https://kraa.io/akaieuan', external: true },
      { label: 'SoundCloud', href: 'https://soundcloud.com/akaieuan', external: true },
      { label: 'How I work', href: '/demo/hitl-practice' },
    ],
  },
]

const linkCls =
  'text-[12.5px] font-light text-muted-foreground/70 transition-colors hover:text-foreground'
const headingCls =
  'text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/45'

function FooterItem({ link }: { link: FooterLink }) {
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
      {link.label}
    </a>
  ) : (
    <Link href={link.href} className={linkCls}>
      {link.label}
    </Link>
  )
}

export function SiteFooter() {
  return (
    <footer className="w-full bg-background pt-14 pb-8">
      <div className="mx-auto max-w-site site-inset">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
          {/* Brand block */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <PixelHead size={26} grid={22} icon="disc-aka" still />
              <span className="text-[15px] font-light tracking-[0.02em] text-foreground/90">
                akaBuild
              </span>
            </div>
            <p className="mt-3 text-[12.5px] font-light leading-relaxed text-muted-foreground/70">
              Product design and technical anthropology for the human side of applied AI — plus the
              tools, instruments, and art that come out of it.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <a href="/2026-ieuan-king.pdf" target="_blank" rel="noopener noreferrer" className={linkCls}>
                CV
              </a>
              <a
                href="/ieuan-king-portfolio-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={linkCls}
              >
                Portfolio
              </a>
              <a href="mailto:ieuan@yionvisual.com" className={linkCls}>
                ieuan@yionvisual.com
              </a>
            </div>
          </div>

          {/* Link columns */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4 lg:gap-x-14"
          >
            {columns.map((col) => (
              <div key={col.heading}>
                <p className={headingCls}>{col.heading}</p>
                <ul className="mt-3.5 flex list-none flex-col gap-2.5 p-0">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <FooterItem link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11.5px] font-light tracking-wide text-muted-foreground/45">
            © 2026 akaBuild{' '}
            <span className="ml-1.5 italic text-muted-foreground/35">
              {'// I build tools and create art.'}
            </span>
          </p>
          <a
            href="https://github.com/akaieuan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1 text-[11.5px] font-light tracking-wide text-muted-foreground/45 transition-colors hover:text-foreground"
          >
            Built by akaieuan
            <ArrowUpRight className="h-3 w-3 opacity-70" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  )
}
