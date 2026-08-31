import { code } from '@/components/features/demo/blockpad/shared'

/** Tech stack. Moved verbatim from app/demo/blockpad/page.tsx. */
export function StackSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Tech stack</h2>
            <p className="font-mono text-[13px] text-foreground/80">
              Swift 6 · SwiftUI · AppKit · Core Graphics · macOS 14+
            </p>
            <p>
              One dependency, <code className={code}>KeyboardShortcuts</code>, and nothing else yet.
              No backend, no account, no inference, nothing leaves the machine.
            </p>
            <p>
              Not App Store: the sandbox blocks synthetic events and cross-app activation, so it
              ships as a signed, notarised DMG.
            </p>
          </section>
  )
}
