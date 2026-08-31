import type { CardArt } from '@/components/product-replicas/ubik/card-art'

/**
 * The 2026 build, recorded.
 *
 * These replace three recordings from an older build that no longer looked
 * like the product. Ordered as the work is: a folder becomes a workspace, the
 * sources come in, the agent reads them, the notes carry their evidence, and a
 * human signs off before any of it lands.
 */
export type Demo = {
  /** Base path; the component appends .mp4. */
  src: string
  title: string
  length: string
  summary: string
  /**
   * Which of the marketing site's painted grounds sits behind this card. Six
   * of the seven map onto the section the painting was originally made for.
   */
  art: CardArt
}

/**
 * Ubik's own writing, selected from the writing registry rather than restated.
 *
 * Three pieces of it survive and are rebuilt at /writing. They are listed in
 * three places on this page — the menu at the top, the plain-language summary,
 * and the archive section — and all three read this, so a fourth piece appears
 * everywhere by being added to lib/writing.ts and nowhere else.
 */
export const UBIK_ARCHIVE_TYPE = 'Archive · Ubik'

/** The two places Ubik still exists in public, now that the builds are gone. */
export const UBIK_ELSEWHERE = [
  { label: 'Team test log', href: 'https://kraa.io/team-test-log042' },
  { label: 'r/ubikstudio', href: 'https://www.reddit.com/r/ubikstudio/' },
]
