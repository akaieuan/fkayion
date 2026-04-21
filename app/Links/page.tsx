import { Suspense } from 'react'
import { LinksClient } from './links-client'

const linksData = [
  { label: 'aka.write', url: 'https://kraa.io/akaieuan', color: '#88ff22', hoverColor: '#aaff44' },
  { label: 'Ubik', url: 'https://ubik.studio', color: '#ff4422', hoverColor: '#ff6644' },
  { label: 'Projects', url: '/demo', color: '#6366f1', hoverColor: '#818cf8' },
  { label: 'Instagram', url: 'https://instagram.com/aka.ieuan/', color: '#ff6b9d', hoverColor: '#ff8fa3' },
]

const projectLinks = [
  {
    label: 'Research OS',
    url: '/demo/research-os',
    description: 'HITL workspace, agentic search, chat',
  },
  {
    label: 'Procedural Asset Pipeline Engineering',
    url: '/demo/brooklyn-dead',
    description: 'Procedural 3D pipeline (write-up)',
  },
  {
    label: 'HITL Kit',
    url: '/demo/hitl-kit',
    description: 'Open write-up — hitlkit.dev, GitHub, earlier in-repo demo',
  },
  {
    label: 'Music Analysis Chat',
    url: '/demo/music-analysis-chat',
    description: 'Roster dashboards & rich chat blocks',
  },
]

const musicLinks = [
  { label: 'SoundCloud', url: 'https://soundcloud.com/akaieuan', description: 'tracks, sets & mixes' },
  { label: 'Bandcamp', url: 'https://akaieuan.bandcamp.com/', description: 'music & merch' },
  { label: 'Spotify', url: 'https://open.spotify.com/artist/5OwuCYMg2wmmh3QofLLIPe', description: 'streaming' },
  { label: 'YouTube', url: 'https://www.youtube.com/channel/UC6etRnx7fZEtoVAI-phCu6Q', description: 'videos & DJ sets' },
]

const writingLinks = [
  { label: 'Human in the Loop AI', url: 'https://www.ubik.studio/blog/human-in-the-loop', description: 'ubik.studio' },
  { label: 'The Pursuit of Parsimony', url: 'https://kraa.io/306857640304253952', description: 'kraa.io' },
  { label: 'Digital Gentrification', url: 'https://kraa.io/306942411031387136', description: 'kraa.io' },
  { label: 'Benchmark Measurement Problems', url: 'https://kraa.io/306857605553134592', description: 'kraa.io' },
]

// Server-side metadata
export const metadata = {
  title: 'Links | aka4uh',
  description: 'Social links and connections'
}

export default function LinksPage() {
  return (
    <div className="h-screen w-screen relative bg-black overflow-hidden">
      <Suspense fallback={
        <div className="h-full w-full flex items-center justify-center bg-black">
          <div className="text-white text-xl">Loading...</div>
        </div>
      }>
        <LinksClient
          linksData={linksData}
          projectLinks={projectLinks}
          writingLinks={writingLinks}
          musicLinks={musicLinks}
        />
      </Suspense>
    </div>
  )
}
