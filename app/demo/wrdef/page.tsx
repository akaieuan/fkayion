import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

export const metadata = {
  title: 'Wrdef (Wordle + definition)',
  description:
    'A five-letter guessing game powered by dictionary definitions, sense ranking, bonus blanks, and a local dictionary you earn.',
}

export default function WrdefProjectPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground lg:hidden"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        <header className="mb-6">
          <p
            className="text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-balance text-foreground/90"
            aria-label="wrdef"
          >
            wrdef
          </p>
        </header>

        <div className="-mx-6 overflow-hidden rounded-xl border border-border/80 bg-muted/10 sm:mx-0">
          <video
            className="block h-auto w-full"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="/wrdef-hero-poster.jpg"
            aria-label="Wrdef gameplay preview"
          >
            <source src="/wrdef-hero.webm" type="video/webm" />
          </video>
        </div>

        <div className="mt-5">
          <a
            href="https://www.wrdef.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Play live at wrdef.com
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
            Live, playable in the browser. No install.
          </p>
        </div>

        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
          Game
        </p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          Wordle remake: Wrdef (Wordle + definition)
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Same 5-letter, 6-guess mechanic: clues are dictionary definitions; bonus round fills blanks in
          the definition.
        </p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why I built it</h2>
            <p>
              I play Wordle almost every day, and sometimes I get annoyed when I beat the round but I
              don&apos;t know the word.
            </p>
            <p>
              So I built wrdef: same 5-letter guess-in-6 mechanic, but your clue is the dictionary
              definition. Solve it and you fill in blanks in that definition for bonus points, so you
              leave actually knowing what you just guessed.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              The interesting part: tuning the data
            </h2>

            <div className="space-y-3">
              <h3 className="text-[13px] font-medium text-foreground/90">Sense ranking per word</h3>
              <p>
                Most words have multiple definitions: &quot;print&quot; is a verb, a noun, and a
                photography term. I pull senses from the Wiktionary-backed dictionaryapi and tag each
                with a <strong className="font-medium text-foreground/90">primaryRank</strong> (0 = most
                obvious, N = most obscure). Difficulty is just a sense-rank selector: easy shows you the
                primary meaning, hard shows the deepest one available. Same pool, different game.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-[13px] font-medium text-foreground/90">POS-aware filtering</h3>
              <p>
                Interjections, prepositions, pronouns, prefixes: their definitions are circular
                (&quot;used to express surprise&quot;) and make terrible clues. I whitelist
                verb/noun/adjective/adverb as first-class senses and only fall back to the rest when a word
                has nothing else.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-[13px] font-medium text-foreground/90">
                Bucketing by frequency × depth
              </h3>
              <p>
                Every word has a corpus-occurrence score. Rare words with multiple senses get pushed to
                hard; common words with a single obvious sense stay in easy. The difficulty filter also
                requires a word to actually have a sense at that rank; otherwise the toggle would just be
                theming.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-[13px] font-medium text-foreground/90">
                Blank selection for the bonus round
              </h3>
              <p>
                The definition gets tokenized; stopwords, short words, and anything sharing a 4-character
                prefix with the answer get dropped (no &quot;running&quot; blanks when the answer is
                &quot;run&quot;). Remaining candidates ranked by length: longer words carry more
                information and make the bonus feel earned rather than random.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">A dictionary you earn</h2>
            <p>
              Every solve is saved to <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">localStorage</code> with its definition, difficulty, solve time, score, and whether you
              cleared the bonus. A separate <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">/urdefs</code> page builds a personal stats view off that log: win rate,
              current/best streak, fastest solve, per-difficulty breakdown, last-12 strip. No sign-in, no
              server. The idea is that the definitions shouldn&apos;t be disposable; you&apos;re slowly
              building a dictionary of words you actually earned.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
