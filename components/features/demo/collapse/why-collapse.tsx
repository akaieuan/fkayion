/** Why collapse across stacks. Moved verbatim from app/demo/collapse/page.tsx. */
export function WhyCollapseSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why collapse across stacks</h2>
            <p>
              The leverage isn’t “I have skills” — it’s skills that move with you when you switch
              stacks. Writing the Vue version after the React version forces you to see exactly where
              they diverge, and the lesson captures it. The generated SKILL.md carries that
              translation, so asking “how do I do reactive state in Nuxt” in a Vue project answers
              correctly first try. The library compounds — skills cite each other and inherit trigger
              phrases — and a SKILL.md is just a kebab-case markdown file, so polyglot teams ship them
              via dotfiles or a gist. Switching cost approaches zero: you’re learning where stacks
              diverge, not relearning from scratch.
            </p>
          </section>
  )
}
