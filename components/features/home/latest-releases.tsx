'use client'

interface Release {
  title: string
  type: string
  url: string
}

const releases: Release[] = [
  { title: 'Ubiquity', type: 'Album', url: 'https://open.spotify.com/album/3Obm9hWHC26Yk0vByeHBUl' },
  { title: 'Anthrotechnica AT.M2', type: 'Album', url: 'https://open.spotify.com/album/3tG4rJ2JHYm6NvxdLLnRn2' },
  { title: 'Chaotic Networks', type: 'EP', url: 'https://soundcloud.com/akaieuan/sets/chaotic-networks-live' },
  { title: 'Taiko446 - Diffuse Reality Records', type: 'EP', url: 'https://diffusereality.bandcamp.com/album/aka-ieuan-taiko446' },
  { title: 'Nevstv, aka ieuan (DJ Set)', type: 'Video', url: 'https://www.youtube.com/watch?v=hqsTCdA-QfQ&list=RDhqsTCdA-QfQ&start_radio=1&t=1581s' },
  { title: 'No Signal 078 (DJ Set)', type: 'Video', url: 'https://soundcloud.com/nosignalnyc/akaieuan-no-signal-078-nov-21-2025' },
  { title: 'Techno INC Set', type: 'Video', url: 'https://www.youtube.com/watch?v=87kn2h5dQJk&list=RD87kn2h5dQJk&start_radio=1&t=1889s' },
  { title: 'v0013 - video', type: 'Video', url: 'https://www.youtube.com/watch?v=HnsGJMUk8Pw' },
  { title: 'Memoriam - aka ieuan', type: 'Single', url: 'https://open.spotify.com/track/3V4w0BD1SsPWwrfYBCp7ts?si=30246d845aa24fd5' },
  { title: 'v0013 - yion', type: 'Single', url: 'https://akaieuan.bandcamp.com/track/v0013' },
  { title: 'Visualizer Eden', type: 'Single', url: 'https://akaieuan.bandcamp.com/track/visualizer-eden' },
  { title: 'Girls Just Want Breaks', type: 'Single', url: 'https://akaieuan.bandcamp.com/track/girls-just-want-breaks-yion-flip' },
]

function ReleaseRow({ release }: { release: Release }) {
  return (
    <a
      href={release.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between py-2 border-b border-border/30 last:border-b-0"
    >
      <span className="text-[12px] font-light tracking-wide truncate mr-3 text-foreground/55 transition-colors duration-150 group-hover:text-[oklch(0.4_0.08_152.2)] dark:group-hover:text-[oklch(0.707_0.108_152.216)]">
        {release.title}
      </span>
      <span className="text-[10px] font-light tracking-wide shrink-0 text-muted-foreground/40">
        {release.type}
      </span>
    </a>
  )
}

export function LatestReleases() {
  return (
    <div className="w-full">
      {releases.map((release) => (
        <ReleaseRow key={release.title} release={release} />
      ))}
    </div>
  )
}
