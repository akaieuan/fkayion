import Link from 'next/link'

export function Links() {
  return (
    <section className="w-full flex items-start justify-center">
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-medium mb-8 text-black">Links</h2>
          <div className="space-y-6 text-lg text-black">
            <p>
              <a href="https://www.ubik.nyc" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Ubik.studio
              </a> // Co-founder of Ubik, an AI research and education company, building AI tools that keep humans in the driver's seat.
            </p>
            <p>
              <a href="https://www.instagram.com/aka.ieuan/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                @aka.ieuan
              </a> // Live techno play-throughs using Ableton Live
            </p>
            <p>
              <a href="https://open.spotify.com/artist/5OwuCYMg2wmmh3QofLLIPe?si=h3KTSXo_T66XvGMKrmmN7Q" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                My new spotify
              </a> // aka[ieuan] New techno focused project. More coming soon :3
            </p>
            <p>
              <a href="https://soundcloud.com/akaieuan" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Soundcloud
              </a> // A more sporadic - authentic release structure - always releasing my drafts and getting direct feedback.
            </p>
            <p>
              <a href="https://yi0n.bandcamp.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Buy my music
              </a> // If you like my music and want to use it in a set or just feel nice and want to support &lt;33
            </p>
            <p>
              <a href="https://open.spotify.com/artist/0SKj35DCAPNfu3KVUBTiVE?si=wZ3yv4liRligLV4_cZvGNg" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                My old spotify
              </a> // (yion) 30k monthly listeners. 3 million streams. Drum and Bass Focused project with some underground hits - Girls Just Want Breaks  //  visualizer.eden  //  v0013  //  Inertia [EP] // Digital Rain [EP]
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 