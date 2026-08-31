import { code } from '@/components/features/demo/blockpad/chrome'

/** Why it exists. Moved verbatim from app/demo/blockpad/page.tsx. */
export function WhySection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why it exists</h2>
            <p>
              Figma and Excalidraw are good tools. They are also another tab, another context, a lot
              of clicks, and an account you have to keep, and the genuinely useful tiers cost money.
              None of that is wrong for design work. It is all wrong for the ninety seconds where you
              just need to say where the boxes go.
            </p>
            <p>
              Because that is usually the whole problem. You are in a repo, working with an agent, and
              you need to say{' '}
              <em className="not-italic text-foreground/80">
                &ldquo;filters go in a right-side panel, tabs across the top, reset and apply in the
                footer.&rdquo;
              </em>{' '}
              You type it. The agent builds something reasonable and wrong. You correct it. Closer,
              still wrong. Three rounds later you have spent real tokens, real minutes, and real
              attention reading implementations you are about to throw away.
            </p>
            <p className="text-foreground/85">The cost is not the message. It is the rounds.</p>
            <p>
              Blockpad is one hotkey and one canvas. <code className={code}>Ctrl+Opt+B</code>, drag
              four boxes, <code className={code}>Cmd+Return</code>, paste. No model inside it, no
              account, no subscription, nothing agent-initiated, and it never leaves your machine. It
              is a faster input device for one specific moment, and the constraint is the product.
            </p>
            <p className="aka-card-well p-4 text-[13.5px]">
              <span className="text-foreground/85">Loop target: six seconds</span>, with no mouse
              travel outside the canvas.
            </p>
          </section>
  )
}
