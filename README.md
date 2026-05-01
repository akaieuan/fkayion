# fkayion (akabuild.com)

Personal site and playground for **akaieuan**: portfolio, music, and interactive work. Built with **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**, and **shadcn/ui**-style primitives.

Live: [akabuild.com](https://akabuild.com)

## What’s in the build

### Landing (`/`)

Single composed home page with sectioned content: hero, links, product design notes, and music (4UH). Uses client-side orchestration (`unified-client.tsx`), shared 3D orb components, and sage-toned accents consistent across sections. The `links` and `4UH` content live as sections inside the homepage rather than standalone routes.

### Projects hub (`/demo`)

A single index of demos and write-ups. Each entry links to its own route:

| Route | What it is |
|-------|------------|
| `/demo/research-os` | Full-screen **Research OS** demo: multi-panel workspace, chat, HITL-style flows (mock data). |
| `/demo/brooklyn-dead` | **Write-up** on a private Godot game: procedural Blender→glTF pipeline, code-driven assets, browser previews (text-first). |
| `/demo/hitl-ai` | **HITL-AI** widget showcase: registry-driven HITL primitives. |
| `/demo/hitl-ai/sheet` | **HITL-AI** component sheet: live UI reference for approvals, agents, search, tokens, etc. |
| `/demo/music-analysis-chat` | **Music Analysis Chat**: roster-style UI, analytics views, rich chat blocks (mock API). |
| `/Visualizer-Eden` | **Visualizer Eden**: WebGL/R3F audio visualizer, GLSL materials, upload and controls (see below). |

### Other routes

- **`/Visualizer-Eden`** — Standalone full-screen audio visualizer app (the only non-`/demo` route outside the homepage).

### Visualizer Eden (summary)

3D audio visualizer using **React Three Fiber**, **Three.js**, and **Web Audio API**: frequency-driven deformation, material presets, control drawer, file upload. Detailed behavior is implemented under `components/features/visualizer/` (and related audio context).

## Tech stack

- **Framework:** Next.js 14, App Router, React 18  
- **Language:** TypeScript (strict)  
- **Styling:** Tailwind CSS 3, CSS variables, `tailwindcss-animate`  
- **UI:** Radix UI primitives, shadcn-style components in `components/ui/`  
- **3D / audio:** `@react-three/fiber`, `@react-three/drei`, `three`  
- **Motion:** Framer Motion  
- **Lint:** ESLint flat config (`eslint.config.mjs`) with `next/core-web-vitals` and TypeScript rules  

## Scripts

```bash
npm install          # dependencies
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # run production server
npm run lint         # next lint
```

Requires **Node.js 18+** and a modern browser (WebGL for Visualizer Eden).

## Repo layout (high level)

```
app/
  page.tsx                 # Home entry → UnifiedClient
  unified-client.tsx       # Sections composed into the homepage
  layout.tsx               # Root layout, globals
  globals.css
  sections/                # Home sections (home, links, product, four-uh)
  demo/                    # Projects index + per-demo routes
  Visualizer-Eden/         # /Visualizer-Eden
components/
  ui/                      # Buttons, sheet, header, theme, …
  features/                # Home, visualizer
  demo/                    # Large demo UIs (research-os, hitl-ai, music-chat-comp, …)
  shared/                  # Orbs, shared lists, etc.
```

CLI tooling for adding shadcn components is configured in **`components.json`** (not used at runtime).

## Contributing / license

Personal project by **akaieuan**. Not an open contribution workflow unless noted elsewhere.

---

*Interactive demos use mock data for illustration. Visualizer Eden is the most graphics-heavy part of the repo; the rest is mostly React, layout, and documentation-style UI.*