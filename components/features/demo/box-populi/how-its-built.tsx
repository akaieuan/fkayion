/** How it's built. Moved verbatim from app/demo/box-populi/page.tsx. */
export function HowItsBuiltSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">How it&apos;s built</h2>
            <p>
              The site is a thin presentation layer over a typed data model. Everything the public
              sees is generated from typed files in{' '}
              <code className="aka-code">data/</code>:
              network constants, the artist roster and lookup helpers, shows, role labels, and shared
              types. Adding an artist or swapping the featured set is a one-line data change, and the
              per-artist pages generate themselves from the roster. Pages stay declarative.
            </p>
            <ul className="aka-list space-y-2">
              <li>
                <span className="text-foreground/85">Structure.</span> A multi-page Next.js App
                Router app, not a single landing page: a home page (hero, manifesto, Listen player,
                crew grid), a roster index, a dynamically generated profile page for each artist, a
                Resend-backed booking form, and an unlisted, non-indexed sandbox for work-in-progress
                pieces and client conversations. Around two dozen routes in all.
              </li>
              <li>
                <span className="text-foreground/85">Stack.</span> Next.js 16 (App Router, React
                Server Components), TypeScript 5 end to end, React 19, Tailwind CSS v4 with Radix UI
                primitives and lucide-react. Geist plus a VCR display face for headings. Resend for
                the booking form, the official SoundCloud Widget API for audio, Vercel with CI/CD on
                push to main.
              </li>
              <li>
                <span className="text-foreground/85">SEO.</span> The Next.js Metadata API drives
                titles, Open Graph, and Twitter cards, alongside robots and sitemap routes. The
                sandbox is excluded from indexing.
              </li>
            </ul>
          </section>
  )
}
