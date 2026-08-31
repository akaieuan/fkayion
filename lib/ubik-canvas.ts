/**
 * Waypoints into the Ubik Drive design canvas.
 *
 * The boxes come from `tools/build-ubik-canvas.py`, which segments the export
 * by looking for empty corridors between elements. The names and the notes are
 * mine: the script finds where the areas are, it cannot tell you what they were
 * for. Quoted fragments are verbatim from the canvas, typos and all.
 *
 * This is plain data so the page can render the list on the server and hand the
 * viewer a finished set of targets.
 */

/** Matches the viewBox of `public/ubik/ubik-canvas.svg`. */
export const CANVAS = { w: 72905.07, h: 82003.88 } as const

export type Waypoint = {
  id: string
  label: string
  note: string
  x: number
  y: number
  w: number
  h: number
}

export const WAYPOINTS: Waypoint[] = [
  {
    id: 'landing',
    label: 'Landing page, four ways',
    note: 'Four takes on the same page laid side by side, nav and section copy roughed in, each with its own idea of what the first screen should promise. A note across the top keeps everyone honest: “All not solid copy OFC”.',
    x: 10,
    y: 10,
    w: 29833,
    h: 8148,
  },
  {
    id: 'flow',
    label: 'Upload, tag, chat',
    note: 'The core user story drawn as a strip of wireframes. Upload a file, put it in a folder, tag it, then chat with it. The loading bars and empty states are drawn too, because those are the frames people actually argue about.',
    x: 4700,
    y: 8600,
    w: 24300,
    h: 9000,
  },
  {
    id: 'revised',
    label: 'The revised story',
    note: 'The same flow after we knew who it was for: a teacher and project manager view, sections for classes or teams, goals, reminders, files for context. The note in the corner is the handoff itself, “V0 coded version sent to blasie for DEV”.',
    x: 4700,
    y: 19300,
    w: 15000,
    h: 6300,
  },
  {
    id: 'usecases',
    label: 'Use cases and news',
    note: 'The marketing site once you scroll: product sections, a horizontal carousel moving between Ubik Studio, Ubik Drive and Ubik Scholar, and an arrow to where every link was supposed to land.',
    x: 5300,
    y: 26500,
    w: 10200,
    h: 7500,
  },
  {
    id: 'marketing',
    label: 'Marketing page edits',
    note: 'Review notes written directly onto the mockups, specific enough to act on without a meeting. One of them names the file: “And Repeat for each field section on web/marketing/use-case/page.tsx”.',
    x: 41662,
    y: 7656,
    w: 31240,
    h: 20600,
  },
  {
    id: 'dashboard',
    label: 'Dashboard and motion',
    note: 'What the dashboard should offer, next to a three step sketch of a transition: files move in like a cloud from the left, funnel through the middle, then “come out green and organized and move off the screen to the left”.',
    x: 49264,
    y: 32800,
    w: 16900,
    h: 4600,
  },
  {
    id: 'files',
    label: 'File manager review',
    note: 'A pass over the sidebar and the file panel. Chevrons so the interactivity reads, a clearer highlight on the selected item, and a naming question left open on the canvas: “Maybe we call this File Manager?”',
    x: 49148,
    y: 40554,
    w: 22840,
    h: 11470,
  },
  {
    id: 'screens',
    label: 'Reference captures',
    note: 'Full size screenshots of the running app, pasted in at scale as the thing being marked up. The canvas held the real product and the drawing over it in the same space.',
    x: 51678,
    y: 53460,
    w: 9005,
    h: 8058,
  },
  {
    id: 'icons',
    label: 'Icons needed',
    note: 'The bluntest area on the board, and the most useful. A heading reading “ICONS NEEDED” over a list of every sidebar item still waiting to be drawn: Workspaces, Your Chats, Deep Research, Library, Web Search, Write UDOC.',
    x: 54600,
    y: 63280,
    w: 6700,
    h: 8950,
  },
]
