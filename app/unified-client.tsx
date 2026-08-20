'use client'

import dynamic from 'next/dynamic'

/*
 * Both sections are code-split but server-rendered.
 *
 * The hero used to be `ssr: false`, which meant the first thing a reader or a
 * crawler received for this page was an empty full-height box, and the title
 * only appeared once the bundle had arrived. Nothing in it needs a browser to
 * render: the mark is a canvas that paints itself in an effect, so the server
 * emits the same empty canvas the client would and the animation starts on
 * mount exactly as before.
 */
const HomeSection = dynamic(() => import('./sections/home-section').then(m => ({ default: m.HomeSection })), {
  loading: () => <section id="section-0" className="min-h-[26rem] w-full bg-background" />,
})

const LinksSection = dynamic(() => import('./sections/links-section').then(m => ({ default: m.LinksSection })), {
  loading: () => <section id="section-1" className="w-full py-24 bg-background" />,
})

export function UnifiedClient() {
  return (
    <main className="relative min-h-0 w-full min-w-0 overflow-x-clip bg-background">
      <HomeSection />
      <LinksSection />
    </main>
  )
}
