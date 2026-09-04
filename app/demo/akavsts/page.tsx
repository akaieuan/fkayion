import { ArrowUpRight } from 'lucide-react'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { PATH } from '@/components/features/demo/akavsts/shared'
import { HowTheseGetMadeSection } from '@/components/features/demo/akavsts/how-these-get-made'
import { PluginsSection } from '@/components/features/demo/akavsts/plugins'

export { metadata } from '@/components/features/demo/akavsts/shared'

export default function AkaVstsPage() {
  return (
    <DemoShell>
      <header>
        <h1
          className="text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-foreground/90"
          aria-label="akaVST"
        >
          akaVST
        </h1>
        <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
          Three instruments, built one at a time and documented as they go: an acid voice wrapped
          around a 64-step sequencer, a four-layer lo-fi synth sharing one voice pool, and a
          sampler that resamples itself. JUCE and C++17, for macOS — VST3, AU, and Standalone.
          They&apos;re at v0.1, v0.4, and v1.0, and the pages say so: what&apos;s finished is
          listed, what&apos;s queued is listed, and none of them are finished.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="https://www.akavst.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Visit akavst.com
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          <a
            href="https://github.com/akaieuan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            GitHub
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
        </div>
      </header>

      <PlainSummary path={PATH} />

      <HowTheseGetMadeSection />

      <PluginsSection />
    </DemoShell>
  )
}
