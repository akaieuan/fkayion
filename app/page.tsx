import { HomeSection } from './sections/home-section'
import { LinksSection } from './sections/links-section'

export const metadata = {
  title: 'akaBuild | akaieuan | akabuild.com',
  description: 'akaieuan is a front-end developer, designer, and artist',
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
