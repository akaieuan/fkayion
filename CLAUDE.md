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
- **Law 03**, depth is a 1px border and a translucent fill, never a drop shadow.
- **Law 04**, motion moves space, never brightness. No `animate-pulse` or
  `animate-ping`.

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

- **Server by default** (law 07). A component stays server-rendered unless it
  needs state, an event, or a canvas, and the client boundary is drawn as deep
  in the tree as possible.
- **No em dashes in user-facing copy.** Sentences or colons. This applies to
  copy written for the site, not to quoted material.
- **Build with the dev server stopped.** `next build` rewrites `.next` under a
  running server and leaves it serving chunk hashes that no longer exist, which
  looks like the site is broken.
