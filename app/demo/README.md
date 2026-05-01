# app/demo — Dev Reference

Portfolio demo zone. Each route under `app/demo/` is a fullscreen, self-contained interactive demo. No backend, no auth — pure React state and hardcoded data.

---

## Route Structure

```
app/demo/
  README.md                          ← this file
  research-os/
    layout.tsx                       ← fixes the shell to position:fixed inset-0, hides root chrome
    page.tsx                         ← top-level state owner (view, activeTab, sidebar, modals)
    components/
      page.tsx                       ← widget showcase / storybook route

components/demo/
  research-os/
    types.ts                         ← ViewMode, RightTab, AgentStatus, shared type exports
    data.ts                          ← all hardcoded demo data (WORKSPACES, SEARCH_RESULTS, etc.)
    notes-shared.ts                  ← NoteGroup / SharedNoteRow data shared across panels
    AutoGrowTextarea.tsx             ← textarea that grows with content (scrollHeight trick)
    MacTitleBar.tsx                  ← fake macOS title bar, traffic lights, theme toggle
    HomeSidebar.tsx                  ← home view sidebar: workspaces, recent chats, nav items
    WorkspaceSidebar.tsx             ← workspace sidebar: file tree, nav with Human badge
    SidebarCollapsedRail.tsx         ← 44px icon-only strip shown when sidebar is collapsed
    HomeMainPanel.tsx                ← welcome screen, chat input, inline library picker
    ChatPanel.tsx                    ← chat thread with inline HITL cards
    HitlCard.tsx                     ← HITL interrupt card: search / review / write variants
    RightPanel.tsx                   ← tab bar container routing to the 5 right-panel views
    HumanPanel.tsx                   ← Review / To Download / Notes / Bibliography tabs
    Panels.tsx                       ← SearchPanel, PdfViewerPanel, WritingPanel, NotesPanel
    Misc.tsx                         ← AnnotatePanel, WorkspaceStatusBar, WorkspaceCreateModal
    index.ts                         ← barrel re-export for all of the above
  research-os-widgets/
    registry.tsx                     ← all widget components + WIDGET_REGISTRY array

lib/
  utils.ts                           ← cn() utility (clsx + tailwind-merge)
```

**Why `layout.tsx` is minimal:** it applies `position: fixed; inset: 0; z-index: 50; overflow: hidden` so the demo shell takes over the full viewport without fighting the root layout's padding or scroll container. The root `SiteHeader` is intentionally hidden — the demo has its own `MacTitleBar`.

**Why `page.tsx` owns all state:** view transitions (home → annotate → workspace), tab selection, sidebar collapse, and modal open/close are all coordinated from the top. Passing handlers down keeps child components stateless and reusable in the widget showcase.

---

## Adding a New Demo Tab (Widget Showcase)

The widget showcase lives at `app/demo/research-os/components/page.tsx` and is driven entirely by `WIDGET_REGISTRY` in `components/demo/research-os-widgets/registry.tsx`.

**Steps:**

1. **Write your widget component** in `registry.tsx` (or a separate file imported there). It must match this signature:

```ts
(props: { size: 'xs' | 'sm' | 'md' | 'lg'; liveData?: boolean }) => React.ReactNode
```

2. **Add an entry to `WIDGET_REGISTRY`:**

```ts
{
  id: 'my-widget',
  label: 'My Widget',
  description: 'One sentence about what it demos.',
  group: 'Subagent', // one of the WidgetGroup values
  supportsLiveData: false,
  Content: ({ size, liveData }) => <MyWidget size={size} />,
}
```

3. **Add a group** (if new) to the `WIDGET_GROUPS` array and the `WidgetGroup` union type — both in `registry.tsx`.

That's it. The sidebar, size toggle, and all-sizes grid are data-driven; no page edits required.

**File/folder convention for larger widgets:**

```
components/demo/research-os-widgets/
  my-widget/
    MyWidget.tsx        ← component
    my-widget-data.ts   ← hardcoded demo data (if substantial)
```

Then re-export from `registry.tsx` via import.

---

## HITL Component API

### `HitlCard`

The core human-in-the-loop interrupt pattern. Renders inline inside a chat thread.

```ts
// types
export interface HitlCardConfig {
  id: string;
  kind: 'search' | 'review' | 'write';
  title: string;
  subtitle: string;
  steps: { label: string; done: boolean }[];
  runLabel: string;
  openTab: RightTab;
  editPlaceholder?: string;
}

interface HitlCardProps {
  config: HitlCardConfig;
  onOpenTab?: (tab: RightTab) => void;
}
```

**States:** `idle` → `expanded` → `confirmed | dismissed`. Confirmed and dismissed are terminal — card collapses to a one-liner.

**Usage:**
```tsx
<HitlCard
  config={{
    id: 'h1',
    kind: 'search',
    title: '177 results found',
    subtitle: '"carbon pricing"',
    steps: [
      { label: 'Search complete', done: true },
      { label: 'Refine query', done: false },
    ],
    runLabel: 'Run refined search',
    openTab: 'search',
    editPlaceholder: 'Add query notes…',
  }}
  onOpenTab={(tab) => setActiveTab(tab)}
/>
```

---

### `HumanPanel`

Full review queue panel. Self-contained — manages all approval state internally.

```ts
// no props required
export function HumanPanel(): JSX.Element
```

Internally sections: `'review' | 'download' | 'notes' | 'bibliography'`. Section pill state is local.

**Usage:**
```tsx
<HumanPanel />
```

To change review items, edit the `items` array inside `ReviewSection` and the `DOWNLOAD_PAPERS` / `BIBLIOGRAPHY_ENTRIES` arrays in `data.ts`.

---

### `SearchPanel`

Filtered search results with a live query input.

```ts
// no props — data sourced from SEARCH_RESULTS in data.ts
export function SearchPanel(): JSX.Element
```

**Usage:**
```tsx
<SearchPanel />
```

To swap results, edit `SEARCH_RESULTS` in `data.ts`. Each entry needs: `id, rank, title, venue, year, authors, snippet, relevance, cites`.

---

### `WritingPanel`

Minimal document editor mockup with a toolbar and live word count.

```ts
// no props
export function WritingPanel(): JSX.Element
```

Initial content is a hardcoded string inside the component. Edit it directly for a different domain.

---

### `WorkspaceCreateModal`

Controlled dialog for creating a new workspace with name + color picker.

```ts
interface WorkspaceCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (name: string, color: string) => void;
}
```

**Usage:**
```tsx
<WorkspaceCreateModal
  open={workspaceModalOpen}
  onClose={() => setWorkspaceModalOpen(false)}
  onCreate={(name, color) => {
    // do something with name/color, then navigate
    setView('workspace');
  }}
/>
```

---

## Extending the Dashboard (Adding a Panel)

The right panel is tab-driven. Tabs are defined in `RightPanel.tsx`:

```ts
const TABS: { id: RightTab; label: string; color: string; indicator: string }[] = [
  { id: 'human',  label: 'Human',    color: 'text-amber-500',  indicator: 'bg-amber-400' },
  { id: 'search', label: 'Search',   color: 'text-violet-500', indicator: 'bg-violet-400' },
  { id: 'read',   label: 'Read',     color: 'text-yellow-500', indicator: 'bg-yellow-400' },
  { id: 'write',  label: 'Write',    color: 'text-blue-500',   indicator: 'bg-blue-400' },
  { id: 'notes',  label: 'All Notes',color: 'text-foreground', indicator: 'bg-foreground' },
];
```

**To add a new panel:**

1. Add a new value to the `RightTab` union in `types.ts`:
```ts
export type RightTab = 'human' | 'search' | 'read' | 'write' | 'notes' | 'myPanel';
```

2. Add a tab entry to the `TABS` array in `RightPanel.tsx` with a color and indicator.

3. Add a branch in the content renderer inside `RightPanel.tsx`:
```tsx
{activeTab === 'myPanel' && <MyPanel />}
```

4. Create `MyPanel` in `Panels.tsx` (or a dedicated file) and re-export from `index.ts`.

The panel receives no props by default — pull any data it needs from `data.ts` or `notes-shared.ts` directly.

---

## Styling Conventions

**Tailwind only — no inline styles.** The one exception is `SidebarCollapsedRail` using `style={{ color: ws.color }}` for dynamic workspace folder colors that can't be expressed as static Tailwind classes. Everything else is `className`.

**`cn()` from `lib/utils`** is used everywhere for conditional class merging:
```ts
import { cn } from '@/lib/utils';
cn('base-class', condition && 'conditional-class', variant === 'x' && 'variant-class')
```

**CSS variables in use** (all defined by shadcn/ui's theme, overrideable in `globals.css`):

| Token | Used for |
|---|---|
| `bg-background` | Page/panel backgrounds |
| `bg-card` | Elevated surfaces (cards, modals) |
| `bg-muted` | Subtle fills, hover states, code backgrounds |
| `text-foreground` | Primary text |
| `text-muted-foreground` | Secondary/label text |
| `border-border` | All dividers and card outlines |
| `bg-primary` / `text-primary-foreground` | CTAs, send buttons, selected states |
| `ring-ring` | Focus rings on inputs |

**Semantic color usage for HITL kinds:**

| Kind | Color |
|---|---|
| `search` | `violet-*` |
| `review` | `amber-*` |
| `write` | `blue-*` |
| Approved | `emerald-*` |
| Rejected | `red-*` |

**Dark mode** is handled via the `dark` class on `<html>`. `MacTitleBar.tsx` includes a theme toggle that calls `document.documentElement.classList.toggle('dark')`. All color tokens automatically invert via shadcn's CSS variable system — no manual `dark:` overrides needed on layout elements, only on hardcoded accent fills (e.g. `dark:bg-violet-950/20`).

---

## Layout Inheritance

```
app/layout.tsx          ← root layout: applies ThemeProvider, SiteHeader, body font
  └── app/demo/research-os/layout.tsx
        └── page.tsx
```

`app/demo/research-os/layout.tsx` renders `{children}` inside a `position: fixed; inset: 0` wrapper. This causes the demo to overlay the root layout's normal document flow, which means:

- **SiteHeader is hidden** — the fixed overlay sits on top of it at `z-index: 50`.
- **Body scroll is disabled** — the demo manages its own internal scroll areas.
- **ThemeProvider is still active** — dark mode works because it's applied at the root level above this layout.

If you want the demo to sit below the site header instead of overlaying it, remove the `position: fixed` from `layout.tsx` and replace with `height: calc(100vh - [header-height])`.

To add this demo to a site nav, add an entry to your `projectItems` (or equivalent nav config) pointing to `/demo/research-os`.

---

## How to Port a New Component Into This Demo

> **Copy this paragraph when briefing a new Claude session about adding something to `app/demo/`.**

I have a Next.js portfolio with a demo shell at `app/demo/research-os/`. The component tree lives in `components/demo/research-os/` and is barrel-exported from `index.ts`. The widget showcase at `app/demo/research-os/components/page.tsx` is driven by `WIDGET_REGISTRY` in `components/demo/research-os-widgets/registry.tsx` — each entry needs an `id`, `label`, `description`, `group` (one of: Subagent, QA, Writing, Research, Batch, Review, Shared), and a `Content` component typed as `(props: { size: 'xs' | 'sm' | 'md' | 'lg'; liveData?: boolean }) => React.ReactNode`. The app uses Tailwind CSS v4 with shadcn/ui tokens (`bg-background`, `bg-muted`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`), `cn()` from `lib/utils`, and `lucide-react` for all icons. No inline styles except dynamic colors that can't be expressed as static Tailwind classes. Before writing code, read `components/demo/research-os/types.ts` for shared types and `components/demo/research-os/data.ts` for the data shape. Add the new component to `Panels.tsx` or its own file, re-export from `index.ts`, then register it in `registry.tsx`.
