import { HomeSection } from '@/components/features/landing/home-section'
import { LinksSection } from '@/components/features/landing/links-section'

import type { Metadata } from 'next'

/**
 * The landing is the site, so its title is the site's name rather than a page
 * name run through the `%s | akaBuild` template, which would only stutter it.
 * `absolute` is how Next says "this exact string, skip the template" — `null`
 * looks like it should mean the same thing and instead ships no title at all.
 */
export const metadata: Metadata = {
  title: { absolute: 'akaBuild | akaieuan' },
  alternates: { canonical: '/' },
}

/**
 * The landing, rendered on the server.
 *
 * Both sections used to be pulled in through a client wrapper that dynamically
 * imported them, which made every project plate, writing row and music row part
 * of the client bundle whether or not any of them did anything. Almost none of
 * them do: the plates are links, the lists are links, and the hover panel and
 * the hero mark are the only pieces that need a browser. Those two stay client
 * components and everything around them is now markup.
 */
export default function HomePage() {
  return (
    <main className="relative min-h-0 w-full min-w-0 overflow-x-clip bg-background">
      <HomeSection />
      <LinksSection />
    </main>
  )
}
