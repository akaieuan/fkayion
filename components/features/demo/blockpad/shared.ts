import { demoMetadata } from '@/lib/demo-seo'

export const label = 'text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/50'

export const PATH = '/demo/blockpad'

export const metadata = demoMetadata(PATH, {
  title: 'Blockpad — Sketch a Layout, Hand an Agent the Structure',
  description:
    'A macOS sketchpad that opens over your editor on a hotkey. You draw where the boxes go, press copy, and paste. The agent gets the layout as an exact scene tree with coordinates and hex, not a paragraph and not a 2,000-token screenshot. Swift 6, SwiftUI, AppKit, MIT.',
})
