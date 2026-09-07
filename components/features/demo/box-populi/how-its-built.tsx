/** How it's built. Moved verbatim from app/demo/box-populi/page.tsx. */
export function HowItsBuiltSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">How it&apos;s built</h2>
            <p>
              Content lives in Sanity and is edited in a Studio embedded at{' '}
              <code className="aka-code">/studio</code>, themed to the site and forced dark. The site
              reads it through a thin adapter layer: async getters that map Sanity documents onto the
              same typed <code className="aka-code">Artist</code> and{' '}
              <code className="aka-code">Show</code> contracts the components always used, with the
              copy the site shipped with as a fallback for any field left blank. Components never
              import the CMS. That seam is why moving from typed files to a hosted CMS produced a
              rendered-text diff of zero across every page.
            </p>
            <ul className="aka-list space-y-2">
              <li>
                <span className="text-foreground/85">Structure.</span> A multi-page Next.js App
                Router app, not a single landing page: a home page (hero, manifesto, Listen player,
                crew grid), a roster index, a dynamically generated profile page for each artist, a
                Resend-backed booking form, and an unlisted, non-indexed sandbox for work-in-progress
                pieces and client conversations. Nearly forty prerendered pages in all, plus the
                Studio.
              </li>
              <li>
                <span className="text-foreground/85">Content model.</span> Documents mirror how the
                client thinks, not a page builder: Site settings, Home page, Artists page and Contact
                page as pinned singletons that cannot be created twice or deleted, plus Artists,
                Shows and Roles as collections. Rich text is limited to paragraphs, bold, italic and
                links, so the section typography cannot be broken from the editor. Slugs are
                generated once and warned against changing. Shows move to past on their own once the
                date has gone.
              </li>
              <li>
                <span className="text-foreground/85">Publish to live.</span> Publishing fires a
                signed webhook at an API route that invalidates one cache tag, and Next re-renders on
                the next request. Measured in production at about four seconds from publish to live
                page, with an hourly refresh as a safety net if a delivery is ever missed.
              </li>
              <li>
                <span className="text-foreground/85">Stack.</span> Next.js 16 (App Router, React
                Server Components), TypeScript 5 end to end, React 19, Tailwind CSS v4 with Radix UI
                primitives and lucide-react. Geist plus a VCR display face for headings. Resend for
                the booking form, the official SoundCloud Widget API for audio, Vercel with CI/CD on
                push to main. Sanity for content, with the Studio embedded in the app and themed via{' '}
                <code className="aka-code">@sanity/themer</code>, Portable Text for rich copy. Node
                24, pinned to match Vercel.
              </li>
              <li>
                <span className="text-foreground/85">SEO.</span> The Next.js Metadata API drives
                titles, Open Graph, and Twitter cards, alongside robots and sitemap routes. The
                sandbox is excluded from indexing. Titles, descriptions and the share image are
                editable from the CMS.
              </li>
            </ul>
          </section>
  )
}
