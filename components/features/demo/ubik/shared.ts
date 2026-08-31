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
