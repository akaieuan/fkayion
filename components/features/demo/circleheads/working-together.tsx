import { ArrowUpRight } from 'lucide-react'
import { CONTACT } from '@/components/features/demo/circleheads/shared'

/** The working-together card. Moved verbatim from app/demo/circleheads/page.tsx. */
export function WorkingTogetherSection() {
  return (
          <section className="aka-card-well px-5 py-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Working together</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">
              If you have real work for an agent to do — or a system that needs the human side gotten
              right — we&apos;d like to hear about it. We take a small number of projects a year, and
              the fastest way to reach us is through the studio.
            </p>
            <div className="mt-4">
              <a
                href={CONTACT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
              </a>
            </div>
          </section>
  )
}
