import { SITE } from '@/components/features/demo/akaoss/shared'

/** One site, one source of truth. Moved verbatim from app/demo/akaoss/page.tsx. */
export function OneSiteSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">One site, one source of truth</h2>
            <p>
              <a href={SITE} target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">akaoss.dev</a>{' '}
              ties them together. The projects each live in their own repos; this one holds the{' '}
              <strong className="font-medium text-foreground/90">HITL Kit registry</strong> (the source
              of truth for the shadcn primitives, served at <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">/r/*.json</code>, with CI failing on drift), the{' '}
              <strong className="font-medium text-foreground/90">research feed</strong> (question → runs
              against real models → human-scored results → checked-in run JSON → repro link), and the
              paper. Next.js 16, Tailwind v4, file-based content — no CMS, no database.
            </p>
          </section>
  )
}
