import { demoMetadata } from '@/lib/demo-seo'

export const microLabel =
  'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'

export const PATH = '/demo/akavsts'

export const metadata = demoMetadata(PATH, {
  title: 'akaVST — Three JUCE Instruments for macOS',
  description:
    'Three JUCE instruments for macOS, built one at a time and documented as they go: akaBleep (acid voice + 64-step sequencer, v0.4.0), Enzyme (four lo-fi layers on one voice pool, v1.0.0), and i4 (sculpting sampler, v0.1.0). VST3 · AU · Standalone.',
})
