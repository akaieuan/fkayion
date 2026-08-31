const nonGoals =
  'Not a design tool. No layers panel, no Figma export, no collaboration, no cloud, no account, no LLM inside the app, and no Windows until the Mac version is actually good.'

/** Non-goals. Moved verbatim from app/demo/blockpad/page.tsx. */
export function NonGoalsSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Non-goals</h2>
            <p>{nonGoals}</p>
            <p className="text-[13px] text-muted-foreground/70">
              The colour picker used to be on this list. It is not any more.
            </p>
          </section>
  )
}
