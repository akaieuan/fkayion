import { ArrowUpRight } from 'lucide-react'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { WriteUpHeader } from '@/components/features/demo/write-up-header'
import { PATH } from '@/components/features/demo/akavsts/shared'
import { HowTheseGetMadeSection } from '@/components/features/demo/akavsts/how-these-get-made'
import { PluginsSection } from '@/components/features/demo/akavsts/plugins'

export { metadata } from '@/components/features/demo/akavsts/shared'

export default function AkaVstsPage() {
  return (
    <DemoShell>
      <WriteUpHeader
        kicker="Instruments · VST3 / AU · JUCE · macOS"
        title="akaVST"
        description={
          <>
            Three instruments, built one at a time and documented as they go: an acid voice wrapped
            around a 64-step sequencer, a four-layer lo-fi synth sharing one voice pool, and a
            sampler that resamples itself. JUCE and C++17, for macOS — VST3, AU, and Standalone.
            They&apos;re at v0.1, v0.4, and v1.0, and the pages say so: what&apos;s finished is
            listed, what&apos;s queued is listed, and none of them are finished.
          </>
        }
        actions={
          <>
            <a
              href="https://www.akavst.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="aka-button"
            >
              Visit akavst.com
              <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
            </a>
            <a
              href="https://github.com/akaieuan"
              target="_blank"
              rel="noopener noreferrer"
              className="aka-button-secondary"
            >
              GitHub
              <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
            </a>
          </>
        }
      />

      <PlainSummary path={PATH} />

      <HowTheseGetMadeSection />

      <PluginsSection />
    </DemoShell>
  )
}
