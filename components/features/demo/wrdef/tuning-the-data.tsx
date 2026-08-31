/** The interesting part: tuning the data. Moved verbatim from app/demo/wrdef/page.tsx. */
export function TuningTheDataSection() {
  return (
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
  )
}
