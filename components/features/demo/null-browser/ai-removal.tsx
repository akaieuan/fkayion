import { extLink, PHILOSOPHY } from '@/components/features/demo/null-browser/shared'

/** It had AI, and I removed it. Moved verbatim from app/demo/null-browser/page.tsx. */
export function AiRemovalSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              The part I want on record: it had AI, and I removed it
            </h2>
            <p>
              Null shipped a full AI layer. Local Ollama by default, bring-your-own Anthropic key in
              the OS keychain, chat grounded in the current tab, summarize, multi-turn conversation
              history in SQLite. Four milestones of work. It is gone, and the milestone list in the
              repo says so rather than pretending it never happened.
            </p>
            <p>
              The reasoning is short. A browser that holds an API key is a browser you have to trust,
              and after living with it the only part that consistently earned its place was the part
              that needed no model at all: getting a clean copy of the page out of the browser and
              into somewhere else. So that is what is left. Null captures; you decide what reads it.
            </p>
            <p>
              Invariant 3 was rewritten from &ldquo;inference is local by default&rdquo; to{' '}
              <strong className="font-medium text-foreground/90">no inference in the browser</strong>
              , and migration 006 drops the conversation tables. Putting a model back, local or
              remote, now needs a decision recorded in{' '}
              <a href={PHILOSOPHY} target="_blank" rel="noopener noreferrer" className={extLink}>
                PHILOSOPHY.md
              </a>{' '}
              before any code. Deleting working software you spent months on is the judgment I am
              most pleased with on this project.
            </p>
          </section>
  )
}
