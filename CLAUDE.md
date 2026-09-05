# akabuild.dev

Next.js 14 App Router, TypeScript, Tailwind v3. Deployed from `main`.

## Before pushing

Run the design-system check and act on what it says:

```bash
npm run style:check
```

It reports three kinds of drift, and `npm run style:selftest` proves every rule
still fires on a fixture that must trip it and passes its clean twin.

**Law violations.** akaSTYLE states its rules as constraints rather than
preferences specifically so they can be checked instead of argued about, and a
constraint nothing checks is a preference. The check enforces seven of the
eight mechanically:

- **Law 01**, one type scale: sizes are `text-10` through `text-20` and
  `text-display`; an arbitrary `text-[Npx]` or `text-[clamp(...)]` is a size the
  scale does not have.
- **Law 02**, every surface resolves from a CSS variable: hex, `rgb()`, `hsl()`,
  `oklch()` and the other colour functions, and Tailwind's stock `white`/`black`.
- **Law 03**, depth is an edge and a graded fill, never a drop shadow: every
  `shadow-*`, bare `shadow` in a class string, `box-shadow`, `drop-shadow`.
- **Law 04**, motion moves space, never brightness: `animate-pulse`/`ping`, a
  `@keyframes` that animates only opacity or filter, a hover that dims.
- **Law 05**, loops pause when unwatched: a file that calls
  `requestAnimationFrame` must also carry an IntersectionObserver, a
  `visibilitychange` gate and a reduced-motion branch, unless it is listed in
  the script with the reason it is not a loop.
- **Law 06**, layout never jumps: every `<Image>` and `<img>` ships width and
  height (or `fill`, or a static import).
- **Law 07**, server by default, as a number: `CLIENT_BUDGET` in the script is
  the count of client files. Spending one means raising it in the same commit,
  with the reason in that commit.

Law 08 is judgement, and the one to hold yourself to by hand:
anything scroll-linked or animated writes a CSS variable or a data attribute,
never React state. `components/features/demo-index/cover-flow.tsx` and
`components/ui/reveal.tsx` are the two worked examples.

**The specimen disagreeing with the code.** A law count written as a word
anywhere the design language is described, and every token value printed on
`/aka-style/foundations`, are compared to `lib/aka-style.ts` and
`app/globals.css`.

**Vocabulary the specimen has not caught up with.** Every export in
`components/ui/` and every `aka-*` class in `globals.css` must appear on
`/aka-style` (report only). One page's own chrome, like the deck's classes, is
listed in the script as internal.

Art-layer files are exempt and listed in the script: the canvas engines, the
shaders, the transcribed logo masters, the Trickle kit's effects, and the
write-ups that embed another product's palette. A theme switch must not
recolour Prospect Park or somebody else's app.

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
   - a new primitive gets a specimen in `app/aka-style/primitives`;
   - a new rule in the check gets a fixture in `--selftest`.
3. **Neither?** Push.

The point is that the design system is a live specimen rather than a document
about one. It only stays true if it is updated in the same commit as the thing
it describes, not in a cleanup pass later.

The check is strict and there is no backlog: `prebuild` runs the self-test and
`--strict` before every `next build`, locally and on Vercel, so a build with a
violation in it does not exist. A finding is fixed, or the file is moved to the
art-layer list with the reason, before the push; there is no third option.

**The front end, in a browser.** After a build, `npm run site:sweep` drives
every route the build prerendered through headless Chrome at 1280 and 375. It
fails on a route that is not 200, a console error or thrown exception, a
failed or 4xx request, or horizontal overflow at either width, and it writes a
screenshot per route and two contact sheets to `.next/sweep/`. Run it before a
push that touches shared vocabulary, the config, or the stylesheet: the style
check proves the source follows the laws, and this proves the pages still
stand. It starts its own `next start` on 7871; pass `--base` to sweep a server
that is already running.

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
- **The portfolio is a route.** `/portfolio` is a stack of 1600 by 1000 sheets in
  `components/features/portfolio/`, composed from the same components, classes and
  data as the rest of the site, and `public/ieuan-king-portfolio-2026.pdf` is a print
  of it: after a build, `npm run portfolio:pdf`. A change to a summary, a law or a
  project card reaches the PDF the next time it is printed, and never any other way.
- **Build with the dev server stopped.** `next build` rewrites `.next` under a
  running server and leaves it serving chunk hashes that no longer exist, which
  looks like the site is broken.
