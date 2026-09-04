# akabuild.dev

Next.js 14 App Router, TypeScript, Tailwind v3. Deployed from `main`.

## Before pushing

Run the design-system check and act on what it says:

```bash
npm run style:check
```

It reports two kinds of drift.

**Law violations.** akaSTYLE states its rules as constraints rather than
preferences specifically so they can be checked instead of argued about, and a
constraint nothing checks is a preference. The check enforces the three that are
mechanically detectable:

- **Law 02**, every surface resolves from a CSS variable. A hex or `rgb()` in
  the site's own chrome means light and dark are no longer one definition.
- **Law 03**, depth is an edge and a graded fill, never a drop shadow. Raised
  and recessed are the same material with the light reversed, and both are named
  classes (`.aka-card`, `.aka-card-well`) rather than copied class strings.
- **Law 04**, motion moves space, never brightness. No `animate-pulse` or
  `animate-ping`.

Law 08 is not mechanically checkable and is the one to hold yourself to by
hand: anything scroll-linked or animated writes a CSS variable or a data
attribute, never React state. `components/features/demo-index/cover-flow.tsx` and
`components/ui/reveal.tsx` are the two worked examples.

Art-layer files are exempt and listed in the script: the canvas engines, the
shaders, and the write-ups that embed another product's palette. A theme switch
must not recolour Prospect Park or somebody else's app.

**Vocabulary the specimen has not caught up with.** Anything in
`components/ui/` that `/aka-style` has never heard of means the page claiming to
show "everything this site is built from" is now wrong.

### The rule

The check reports and exits clean; it does not block. What it is for is a
decision before each push:

1. **Did this change add a violation?** Fix it, or move the file into the
   art-layer list with a comment saying why it is art rather than interface.
2. **Did this change add house vocabulary?** A new primitive, a new surface
   treatment, a new rule you found yourself following twice. Then update
   akaSTYLE in the same push:
   - a new law goes in `lib/aka-style.ts`, which both `/aka-style` and
     `/demo/aka-style` read, so the two can never disagree;
   - a new token goes in `app/globals.css` and gets a swatch;
   - a new primitive gets a specimen in `app/aka-style/primitives`.
3. **Neither?** Push.

The point is that the design system is a live specimen rather than a document
about one. It only stays true if it is updated in the same commit as the thing
it describes, not in a cleanup pass later.

There is a standing backlog of 17 findings that predate the check, mostly drop
shadows and literals in the header and logo set. Do not add to it. Once it is
empty, `npm run style:check -- --strict` fails the run on any violation and can
go in CI.

## Conventions

- **Pages are composition.** A `page.tsx` holds metadata, the shell, and the
  imports; the sections it composes live in `components/features/<area>/`, one
  file per section, owned by that page. Shared vocabulary stays in
  `components/ui/`; data stays in `lib/`. No barrel files: every import names
  the file it comes from, so the server/client boundary stays visible.
  Under `components/features/`, `demo-index/` is the `/demo` page itself (the
  deck, its covers, captions and view toggle) and `demo/<slug>/` is one
  write-up; the project grid they both show is `components/ui/project-grid.tsx`,
  because the landing page shows it too.
- **Every page under `/demo` stands in `DemoShell`**
  (`components/features/demo/demo-shell.tsx`), and opens with
  `WriteUpHeader` (`write-up-header.tsx` beside it). The shell owns the frame,
  the reading column and the mobile back link; the header owns the title block
  in one order at one scale, and a page supplies only its facts. Wide material
  inside the column uses `.aka-breakout`, never a wider shell: the one page
  that had its own full-width frame printed the fixed back link over its own
  headline. The full-bleed demo screens (`hitl-ai`) and the `/demo` index are
  not shells and do not use it.
- **Text roles are classes, not strings.** The kicker, section title, standfirst,
  lead, code chip, the two buttons, the prose column and the prose list are
  `.aka-kicker`, `.aka-section-title`, `.aka-standfirst`, `.aka-lead`,
  `.aka-code`, `.aka-button`, `.aka-button-secondary`, `.aka-prose`,
  `.aka-list`, defined once in `app/globals.css` and shown on
  `/aka-style/primitives`. Never paste the utility string a role used to be:
  that is how the lead reached 127 copies and the button pair drifted from the
  one the specimen documented. A role that needs a new variant gets a new
  class and a specimen in the same push.
- **Server by default** (law 07). A component stays server-rendered unless it
  needs state, an event, or a canvas, and the client boundary is drawn as deep
  in the tree as possible.
- **No em dashes in user-facing copy.** Sentences or colons. This applies to
  copy written for the site, not to quoted material.
- **Build with the dev server stopped.** `next build` rewrites `.next` under a
  running server and leaves it serving chunk hashes that no longer exist, which
  looks like the site is broken.
