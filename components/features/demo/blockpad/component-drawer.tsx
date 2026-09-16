import { DemoImage } from '@/components/ui/demo-image'
import { label } from '@/components/features/demo/blockpad/shared'

/** The five tabs, as captured: the count in each panel's header is the count here. */
const tabs = [
  { name: 'Layout', count: 8, src: '/blockpad/drawer-layout.webp', w: 524, h: 490, items: 'Page, Sidebar, Nav bar, Hero, Split, Grid, Footer, Card' },
  { name: 'Controls', count: 12, src: '/blockpad/drawer-controls.webp', w: 518, h: 632, items: 'Button, Actions, Input, Search, Select, Checkbox, Radio, Toggle, Slider, Segmented, Tabs, Form' },
  { name: 'Data', count: 8, src: '/blockpad/drawer-data.webp', w: 534, h: 522, items: 'Table, List, Stats, Chart, Kanban, Timeline, Avatars, Pages' },
  { name: 'Feedback', count: 6, src: '/blockpad/drawer-feedback.webp', w: 522, h: 396, items: 'Dialog, Toast, Banner, Empty, Progress, Badges' },
  { name: 'Story', count: 2, src: '/blockpad/drawer-story.webp', w: 524, h: 260, items: 'Storyboard, User Story' },
]

/** The component drawer: thirty-six blockouts across five tabs. */
export function ComponentDrawerSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">The component drawer</h2>
            <p>
              Thirty-six blockouts across five tabs, for the parts of an interface you would
              otherwise draw as the same four rectangles every time. Each one is a named group of
              plain blocks, so it lands in the tree exactly the way a hand-drawn rectangle does, and
              the receiving agent never meets a shape it has to be taught.
            </p>

            <div className="!mt-5 grid grid-cols-2 items-start gap-3 sm:grid-cols-3">
              {tabs.map((tab) => (
                <figure key={tab.name}>
                  <div className="aka-card-well aka-card-media overflow-hidden">
                    <DemoImage
                      src={tab.src}
                      alt={`The ${tab.name} tab of the component drawer: ${tab.items}`}
                      width={tab.w}
                      height={tab.h}
                      sizes="(min-width: 672px) 205px, 45vw"
                      className="block h-auto w-full"
                    />
                  </div>
                  <figcaption className={`${label} mt-2`}>
                    {tab.name} · {tab.count}
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="!mt-5 text-14">
              Story is the newest tab and holds two: a storyboard and a user story, for the sketch
              that is a sequence of screens rather than one.
            </p>
          </section>
  )
}
