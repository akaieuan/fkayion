/**
 * The plain-language answer for each write-up, keyed by route.
 *
 * This exists because of a specific piece of interview feedback: the pages
 * explain how each thing was built and never answer the two questions a person
 * deciding whether to talk to you actually asks. What was it, in words you
 * could say out loud to someone outside the field? And what did it change?
 *
 * The rule for writing one: no jargon in `what`. If a term needs the rest of
 * the page to make sense, it does not belong here. `impact` is one sentence and
 * has to be a claim about consequence rather than about effort, so "shipped
 * four schema versions" is not an impact and "the record survives being wrong"
 * is. `ahead` is optional and only earns its place where there is a real
 * before-and-after to draw.
 */

export type Summary = {
  /** Two to four sentences of ordinary English. Shown open. */
  what: string[]
  /** One sentence on what it changed. Shown open, under a rule. */
  impact?: string
  /** Label for the disclosure. Defaults to "Why it mattered". */
  aheadLabel?: string
  /** Optional lead-in inside the disclosure. */
  aheadIntro?: string
  /** The case, as points. `norm` sets up a contrast; omit it for a plain list. */
  ahead?: { title: string; norm?: string; why: string }[]
  /** Optional closing line inside the disclosure. */
  aheadClose?: string
}

export const SUMMARIES: Record<string, Summary> = {
  '/demo/ubik': {
    what: [
      'Ubik Studio was a desktop program that worked like a research assistant: the AI did the reading and the drafting, and a person stayed in charge of every judgment call.',
      'You pointed it at an ordinary folder of PDFs and papers on your own computer. It read and indexed them locally, searched across dozens at once, and pulled out what mattered. The rule it enforced was simple: the AI could not state a fact or write a sentence unless it could attach a direct quote and an exact page number from your own files.',
      'When something needed a human decision, the agent stopped mid-task and said so. You got a review queue and approved, rejected or edited each claim before it reached the draft.',
    ],
    impact:
      'Most AI writing tools of the era tried to replace the researcher and shipped a wall of text nobody could check. Ubik did the opposite: it took the tedious half of the work and made the person verifying it the point of the product, which is the pattern the industry has spent the years since rebuilding.',
    aheadLabel: 'Why this was ahead of its time in 2023',
    aheadIntro:
      'In 2023 the state of the art in public was a single chatbot in a text box. It hallucinated freely, could not cite anything reliably, and left you copying snippets back and forth by hand. Ubik was already doing five things the field would spend the next several years arriving at.',
    ahead: [
      {
        title: 'Multiple specialised agents, not one general chatbot',
        norm: 'you talked to one model that tried to do every part of the job at once.',
        why: 'split the work across sub-agents, a PDF reader, a literature researcher and a drafting agent, and let you assign a different model and reasoning depth to each. A cheap fast model ingested text; an expensive one wrote.',
      },
      {
        title: 'Citations enforced in code, not requested in a prompt',
        norm: 'early chat-with-your-PDF tools were notorious for inventing quotes and giving page references that did not exist.',
        why: 'made it a programmatic rule. No exact quote and page number meant the claim could not be written at all, and every drafted line stayed linked to the highlighted source.',
      },
      {
        title: 'Human-in-the-loop as architecture rather than a confirmation dialog',
        norm: 'you got either full automation or a tedious one-prompt-at-a-time conversation.',
        why: 'had a dedicated review queue and a Human Needed status. The agent paused at judgment calls, queued the evidence, and waited to be approved, rejected or corrected in batches.',
      },
      {
        title: 'Local-first, on your own machine',
        norm: 'nearly everything required uploading confidential research to somebody else’s cloud.',
        why: 'ran on the desktop against your real file system. Pointing it at an existing folder indexed it in place, with no proprietary silo to move your data into.',
      },
      {
        title: 'Reading many long documents at once',
        norm: 'context windows were often four to eight thousand tokens, which made cross-referencing several papers essentially impossible.',
        why: 'let you mention a dozen papers in one prompt and read them in parallel against a working draft instead of summarising them one at a time.',
      },
    ],
    aheadClose:
      'While most companies that year were putting a wrapper around a chatbot, this was already the interaction design, the verification safeguards and the multi-agent workflow the rest of the field would go on to build.',
  },

  '/demo/null-browser': {
    what: [
      'Null is a web browser I built for macOS that does not phone home. No accounts, no telemetry, and no AI reading over your shoulder.',
      'Pages you keep are written to your own disk as plain markdown files you can open in any other app. A panel shows every outbound request the browser makes, and you can block an origin and still see what it tried to send.',
      'It started with an AI layer built into it, and became a better browser when that layer was taken back out.',
    ],
    impact:
      'Six rules about what the app may never do are enforced in the code and checked in review, so the privacy claim is a property of the build rather than a sentence in a policy.',
  },

  '/demo/hitl-kit': {
    what: [
      'A free toolkit of nineteen ready-made interface pieces for apps where an AI does work and a person has to sign off on it: approval rows, confidence meters, a preview of the action the agent is about to take, a record of the evidence it used.',
      'Any developer installs them into their own project with a single command.',
      'They come out of a paper I wrote arguing that the industry grades AI on the wrong thing: whether it can finish a task alone, rather than whether it helped the person doing the job.',
    ],
    impact:
      'The argument and the working code ship together, so a team that agrees with the paper can act on it the same afternoon instead of rebuilding the patterns from scratch.',
  },

  '/demo/eval-kit': {
    what: [
      'A tool for measuring whether an AI agent actually did a job well.',
      'The unusual part is who grades. People do. Most evaluation tools now use one AI to score another, which is fast and quietly circular; here a person scores against a fixed rubric, and an AI pre-fill is optional and flagged on every score it touched.',
    ],
    impact:
      'It makes the uncomfortable claim measurable: if you cannot show that the agent helped the person, a benchmark number is not evidence that it did.',
  },

  '/demo/blockpad': {
    what: [
      'A sketchpad that opens over your code editor on a keyboard shortcut. You draw where the boxes go, press copy, and paste into a chat with an AI.',
      'What gets pasted is the layout itself as exact coordinates and colours, not a paragraph describing it and not a screenshot.',
    ],
    impact:
      'A screenshot of a wireframe costs a couple of thousand tokens and still has to be interpreted. This costs a few hundred and is unambiguous, so the model builds what you drew rather than its reading of it.',
  },

  '/demo/bodylog': {
    what: [
      'An iOS app for tracking a visible skin or body condition between doctor visits: acne, eczema, psoriasis, bruising, physio progress.',
      'You log what you see, where it is, and how it feels. It never examines your photos to score you, never tells you what to do, and never says whether you are getting better.',
      'Nothing leaves the phone. There is no network layer in the app. Not disabled, absent.',
    ],
    impact:
      'It produces a record you can hand to a doctor, built on the position that software with no medical training has no business grading a symptom.',
  },

  '/demo/akaoss': {
    what: [
      'An open-source studio: five projects, one argument, one website.',
      'The argument is that we test AI by asking whether it can finish a task on its own, when what matters at work is whether it made the person better at theirs. The projects are the tools for measuring and building the second thing.',
    ],
    impact:
      'The paper, the evidence and the installable code sit at one address, so the claim can be checked rather than just cited.',
  },

  '/demo/akavsts': {
    what: [
      'Three musical instruments I built for macOS that run inside Ableton and other music software: a synth, a lo-fi layering instrument, and a sampler.',
      'They are real audio plugins written in C++, not presets or samples.',
    ],
    impact:
      'I perform with them, and the design rule I now apply everywhere came from here: on an instrument a control in the wrong place does not read worse, it makes you play something else.',
  },

  '/demo/blenderpipeline': {
    what: [
      'A game whose 3D assets are written as code rather than modelled by hand. A script builds the geometry, so changing one rule rebuilds every asset that follows it.',
      'Automatic checks run on every rebuild and refuse anything malformed before it can reach the game.',
    ],
    impact:
      'One person can keep a game\u2019s worth of 3D assets consistent, because consistency is enforced by the build instead of by remembering.',
  },

  '/demo/trickle-ui-kit': {
    what: [
      'Forty-seven text animations for websites, packaged so another developer installs them with one command.',
      'They are pure CSS. No JavaScript ships to the visitor, and they render correctly before the page becomes interactive.',
    ],
    impact:
      'Animation on the web normally costs page weight and a delay before it can start. These cost neither, which is the entire reason to package them.',
  },

  '/demo/inertial': {
    what: [
      'A working demonstration of how AI content moderation could be made auditable.',
      'Every decision the AI makes and every action a human reviewer takes are written into a tamper-evident log, so afterwards you can prove who decided what, and on what evidence.',
      'It is a reference architecture rather than a service to deploy.',
    ],
    impact:
      'Moderation systems are usually asked to be accurate. This one is built to be answerable, which is what a regulator or a court actually asks for.',
  },

  '/demo/hologram': {
    what: [
      'A tool that lets you watch an AI agent work on 3D game assets as it happens, and hands the agent a read-only view of the same pipeline.',
      'Read-only is the point: the agent can inspect everything and change nothing without you.',
    ],
    impact:
      'It turns an agent working on binary files into something you can supervise, instead of a black box that either worked or did not.',
  },

  '/demo/collapse': {
    what: [
      'A tool that turns teaching material into working tools for an AI assistant. Point it at lessons or notebooks and it compiles the patterns inside into skills the assistant can install and use.',
    ],
    impact:
      'Knowledge that used to sit in a document somebody had to read becomes something an assistant can actually apply.',
  },

  '/demo/akacovart': {
    what: [
      'A browser studio for making album art. Pick a generator, drop in a seed, shape it with colour, composition and type, then export a print-ready cover or a video loop synced to the track.',
      'Every cover is stored as the data that produced it, so the same seed always gives the same image.',
    ],
    impact:
      'A cover can be reproduced, versioned and adjusted months later, which a flattened image file cannot.',
  },

  '/demo/box-populi': {
    what: [
      'A site for a New York live-techno collective, with custom audio players and several live streams coordinated so that two never play at once.',
    ],
    impact:
      'Client work under real constraints, including an iOS audio restriction that is handled honestly in the interface rather than hidden.',
  },

  '/demo/visualizer-eden': {
    what: [
      'A browser audio visualiser: music drives the shape of a 3D surface in real time, written with custom shader code.',
    ],
    impact:
      'The accessibility rule I now apply to everything started here. Anything that pulses brightness in time with sound is a genuine hazard, so motion moves space instead.',
  },

  '/demo/music-analysis-chat': {
    what: [
      'A workspace built to answer one question: when you ask an AI about music data, what should come back instead of a paragraph?',
      'The answer it proposes is six kinds of structured result you can act on rather than read.',
    ],
    impact:
      'It reframes what an agent returns as a set of objects rather than prose, which is the difference between reading an answer and using one.',
  },

  '/demo/wrdef': {
    what: [
      'A five-letter word game where the clue is the dictionary definition rather than the letters.',
      'You earn words: solve one and it joins a local dictionary that belongs to you.',
    ],
    impact:
      'A small finished thing, shipped and playable, which is a different discipline from a prototype that only has to demo.',
  },

  '/demo/aka-style': {
    what: [
      'The design language every project here is built from, written as seven rules instead of preferences.',
      'A preference has to be re-argued every time. A rule can be checked in review and travels to a new codebase without me in the room.',
    ],
    impact:
      'It is why these projects look like one studio made them, and why an AI assistant can build a new surface in the same language without being taught it again.',
  },
}
