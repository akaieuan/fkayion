import { PlainSummary } from '@/components/ui/plain-summary'

/*
 * In simple terms, with the figures beside it.
 *
 * Budget: the summary card is about 440 under its label, plus the 32 the
 * component puts above itself, about 500; the four tiles about 400, offset by
 * the same 32 so the first tile sits level with the label. Both well inside
 * the 844.
 *
 * The figures are the engineering section's, restated as numbers: the span,
 * the commit count and its dates, the four surfaces, and the storage model.
 * Under both, the thesis as the write-up quotes it: the writing agent's own
 * system prompt, verbatim from the "What Ubik was" section.
 */
const FIGURES = [
  { big: 'Three and a half years', small: '2023 to 2026, co-founded' },
  { big: '1,038 commits', small: 'September 2023 to May 2026' },
  {
    big: 'Four surfaces',
    small: 'a desktop app, a web gateway, cloud agent deployments, and a browser extension',
  },
  { big: 'Local-first', small: 'the file system is the workspace' },
] as const

export function UbikSimpleTerms() {
  return (
    <div className="h-full">
      <div className="grid grid-cols-[1fr_400px] gap-x-16">
      <div>
        <PlainSummary path="/demo/ubik" />
      </div>

      <div className="space-y-3 pt-8">
        {FIGURES.map((f) => (
          <div key={f.big} className="aka-card-well px-5 py-4">
            <p className="text-20 font-light text-foreground/90">{f.big}</p>
            <p className="mt-1 text-12 font-light leading-relaxed text-muted-foreground">
              {f.small}
            </p>
          </div>
        ))}
      </div>
      </div>

      <div className="mt-8 aka-card-well max-w-5xl px-6 py-5">
        <p className="aka-label">From the writing agent&apos;s system prompt</p>
        <blockquote className="mt-3 border-l-2 border-border pl-4 text-14 italic leading-relaxed text-foreground/80">
          &ldquo;Your job is not to replace human thinking — it is to amplify it. Optimize for the
          loop: you draft, the human refines, you incorporate, the human approves. Intelligence is
          maximized not when either side works alone, but when the handoff between AI and human is
          so seamless it feels like one mind thinking.&rdquo;
        </blockquote>
        <p className="mt-3 text-13 font-light leading-relaxed text-muted-foreground">
          That sentence was written years before &ldquo;human-in-the-loop&rdquo; became an
          industry talking point. Ubik spent three and a half years trying to actually earn it.
        </p>
      </div>
    </div>
  )
}
