/**
 * Shared chrome for the Collapse write-up: the inline-code chip is used by the
 * page shell and most sections, and Shot describes both the hero (kept on the
 * page) and the gallery screenshots.
 */
export const code = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]'

export type Shot = { src: string; w: number; h: number; label: string }
