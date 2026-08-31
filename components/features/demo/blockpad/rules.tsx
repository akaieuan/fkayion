/** The design rules, stated as decisions rather than features. */
const rules = [
  {
    h: 'It persists, it does not dismiss.',
    t: 'UI iteration is iterative. You send a sketch, the agent builds it, it is 70% right, you nudge two blocks and send again. A launcher that cleared on send would make you redraw every round. So the hotkey toggles rather than summons, contents survive hide, show and restart, the window remembers its size and position, Esc hides without discarding, and clearing is explicit.',
  },
  {
    h: 'The tree is the default, not the image.',
    t: 'The opposite of what every screenshot tool does, and the position the whole project rests on. The mode switcher sits next to the copy button for the times feel matters more than structure.',
  },
  {
    h: 'Never press Return.',
    t: 'Blockpad pastes and stops. The agent might be mid-plan or waiting on a permission gate, and a stray prompt at the wrong moment costs more than the keystroke saves.',
  },
  {
    h: 'No model inside it.',
    t: 'No inference, no account, no cloud, nothing agent-initiated, and nothing leaves the machine. It is an input device.',
  },
  {
    h: 'The tree is the only contract.',
    t: 'Everything the app can draw, including the thirty-two component blockouts, lands in the payload as plain blocks. Nothing gets a private representation the receiving agent would have to be taught.',
  },
]

/** What decides arguments. Moved verbatim from app/demo/blockpad/page.tsx. */
export function RulesSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              What decides arguments
            </h2>
            <ul className="!mt-4 list-none space-y-4 p-0">
              {rules.map((rule) => (
                <li key={rule.h} className="border-l border-border pl-4">
                  <p className="text-[14px] text-foreground/85">{rule.h}</p>
                  <p className="mt-1 text-[14px]">{rule.t}</p>
                </li>
              ))}
            </ul>
          </section>
  )
}
