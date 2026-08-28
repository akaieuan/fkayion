import type { Metadata } from 'next'

/**
 * The demo itself, full-bleed.
 *
 * The page is a client component, so it cannot export `metadata` — Next only
 * reads that from a server module, and a sibling layout is the standard place
 * for it.
 *
 * `noindex`, and no structured data, on purpose: this route and its parent
 * write-up are the same piece of work, and the write-up is the one that should
 * rank. Two indexable URLs for one project split the signal and leave a
 * crawler judging the project by a bare application shell. The canonical
 * points back at the write-up.
 */
export const metadata: Metadata = {
  title: 'Music Analysis Chat — Live Demo',
  description:
    'The running demo: a roster workspace with chat, artifacts, analytics, artists and projects, driven by a mock API.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/demo/music-analysis-chat' },
}

export default function MusicChatAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, overflow: 'hidden' }}>{children}</div>
  )
}
