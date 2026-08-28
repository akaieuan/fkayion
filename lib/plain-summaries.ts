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
      'Null is a web browser I wrote for macOS. The name is the thesis: null is what a function returns when there is nothing to return, and that is the right default for a browser.',
      'There is no account system, no sync service and no telemetry endpoint. It does not phone home on launch, does not check for updates unless asked, and sends no crash reports anywhere. Bookmarks, history, notes and settings sit on your own machine in files you can open with a text editor.',
      'A panel lists every outbound request a page makes, grouped by origin, and you can block any origin from it. Blocked requests are still logged, so you see what was refused rather than only what got through.',
      'The part I want on record: it shipped with a full AI layer, and I took it out.',
    ],
    impact:
      'Six rules about what the app may never do are enforced in the code and checked at review, so the privacy claim is a property of the build rather than a page in a policy. The strongest product decision in it was deleting a feature I had already shipped.',
    aheadLabel: 'Why removing the AI made it a better browser',
    ahead: [
      {
        title: 'The feature was real, not a stub',
        why: 'Local models by default, your own API key held in the system keychain, chat grounded in the tab you were reading, summarise. It worked, and people liked it.',
      },
      {
        title: 'It quietly broke the one promise',
        why: 'A browser that can read the page for you is a browser with a reason to send the page somewhere. Every safeguard I kept adding was managing a risk that only existed because the feature did.',
      },
      {
        title: 'The useful half survived without it',
        why: 'What people actually wanted from the AI layer was to keep what they read. That is now page capture and notes written to markdown on your own disk, which needs no model at all.',
      },
      {
        title: 'It made the rules enforceable',
        why: 'Once nothing in the app wanted to send anything, "sends nothing by default" stopped being an aspiration and became an invariant you can fail a code review over.',
      },
    ],
  },

  '/demo/hitl-kit': {
    what: [
      'A free toolkit of nineteen ready-made interface pieces for products where an AI does work and a person has to sign off on it: approval rows, confidence meters, a preview of the action an agent is about to take, the evidence behind a claim it made.',
      'Any developer installs one into their own project with a single command, with six npm packages behind them carrying the logic.',
      'It ships with a paper. The argument is that most enterprise AI pilots fail because the industry tests the wrong thing: benchmarks ask whether a model can finish a task alone, while deployment asks whether it respected the authority of the person using it and left them better off.',
      'Every primitive traces back to a specific claim in that paper. If a piece cannot be tied to one, it does not ship.',
    ],
    impact:
      'It closes the distance between an argument about how AI should work and a team being able to build it that way, which is otherwise months of design work a smaller team never gets to do.',
  },

  '/demo/eval-kit': {
    what: [
      'A tool for measuring whether an AI agent actually helped a person do real work.',
      'Nearly every evaluation framework does one of two things: it tests the agent on a synthetic puzzle it has to solve alone, or it has another AI grade the answer. This refuses both.',
      'The test cases are ported from observed real workflows, complete with the traps real work contains: papers dated in the future, claims that cannot be verified, jobs that do not exist yet. A person scores each step from 0 to 3 across five dimensions. An AI may draft a score, but a human accepts or overrides it, and it can never become the default grader.',
      'The five dimensions are explainability, agency preservation, long-term capability, calibration, and collaborative performance.',
    ],
    impact:
      'It turns the thing everyone claims to care about, whether the AI actually helped, into a number you can compare across versions, instead of a claim propped up by a benchmark that measures something else.',
  },

  '/demo/blockpad': {
    what: [
      'A sketchpad that opens over your code editor on a keyboard shortcut. You draw where the boxes go, press copy, and paste into a chat with a coding agent.',
      'The problem it solves is narrow and expensive. You are in a repo and you need to say "filters go in a right-hand panel, tabs across the top, reset and apply in the footer." You type it. The agent builds something reasonable and wrong. You correct it. Three rounds later you have spent real tokens, real minutes and real attention reading implementations you are about to throw away. The cost is not the message, it is the rounds.',
      'What gets pasted is the layout as exact structure: coordinates, sizes, colours, nesting. Not a paragraph, and not a screenshot the model has to interpret.',
    ],
    impact:
      'It removes the correction rounds, which is where the time and the tokens actually go. Free and MIT licensed, written in Swift with a single dependency, because it started as a tool for me.',
  },

  '/demo/bodylog': {
    what: [
      'An iPhone app for tracking a visible skin or body condition between doctor visits: acne, eczema, psoriasis, cysts, bruising, physio progress.',
      'It exists because of one question. If you have a chronic condition, the most useful thing your doctor asks is the hardest thing to answer: is it better or worse than last time? Six weeks have gone by, the flare that worried you has faded, and you are reconstructing it from memory in a ten-minute appointment.',
      'You photograph the thing when you notice it, tag where on the body it is, say how it feels, and move on. The whole job of the app is making that thirty-second habit sustainable and handing you the history when it matters.',
      'It never examines your photos, never scores your skin, and never tells you what to do. Nothing leaves the phone: there is no network layer in the app. Not disabled, absent.',
    ],
    impact:
      'It turns an unanswerable appointment question into a record you can show someone, while holding the line that software with no medical training has no business grading a symptom.',
  },

  '/demo/akaoss': {
    what: [
      'akaOSS is an open-source studio: five free tools, one argument, and one website that ties them together.',
      'The argument is that the industry measures AI wrong. Benchmarks ask whether a model can finish a task on its own. A person at work needs to know whether it made them better at their job, and those are not the same question. I call the alternative Assist-Not-Complete.',
      'The five tools are what you need in order to act on that: ready-made interface pieces for keeping a person in charge of an agent, a way to score whether the agent actually helped, structured tagging for review work, and two tools for developers working with AI. All of them are free, and any developer installs them with one command.',
      'The site also publishes a research feed. Every finding on it is a real experiment: the question, the runs against real models, human-scored results, the raw run data checked in, and a link to reproduce it yourself.',
    ],
    impact:
      'Most positions on AI evaluation stop at the essay. This one ships the code that makes the position buildable and the evidence that lets you check it, so a reader who disagrees can re-run the experiment instead of arguing about the claim.',
    aheadLabel: 'What makes it unusual',
    ahead: [
      {
        title: 'An argument with an implementation attached',
        norm: 'a perspective piece on how AI should be evaluated ends when the essay does.',
        why: 'every primitive in the kit traces back to a specific claim in the paper, and installs into a real project with one command. The library is the argument, made usable.',
      },
      {
        title: 'Findings you can re-run',
        norm: 'AI research posts report numbers you have to take on faith.',
        why: 'publishes the question, the runs, the human scores, the raw run JSON in the repo, and a reproduction link for each finding.',
      },
      {
        title: 'People do the scoring',
        norm: 'it is now normal to have one model grade another, which is fast and quietly circular.',
        why: 'puts a human on a fixed rubric. An AI pre-fill exists, is optional, and is flagged on every score it touched.',
      },
      {
        title: 'A real registry, not a repo to copy from',
        norm: 'most component libraries are source you clone and adapt by hand.',
        why: 'serves nineteen install endpoints with continuous integration that fails the build on drift, so anyone on the open internet gets a working install with its dependencies resolved.',
      },
      {
        title: 'One source of truth',
        norm: 'the paper, the demos and the code usually live in three places that quietly disagree.',
        why: 'keeps the registry, the feed and the paper on one site with file-based content, no CMS and no database behind it.',
      },
    ],
    aheadClose:
      'The through-line is that each piece is checkable. The claim has a paper, the paper has primitives, the primitives have a registry, and the findings have raw data and a repro link.',
  },

  '/demo/akavsts': {
    what: [
      'Three musical instruments I built for macOS that load inside Ableton and other music software: an acid voice wrapped around a 64-step sequencer, a four-layer lo-fi synth sharing one voice pool, and a sampler that resamples itself.',
      'They are real audio plugins written in C++, shipping as VST3, AU and standalone apps. Not presets, not sample packs.',
      'They are at v0.1, v0.4 and v1.0, and the pages say so. What is finished is listed, what is queued is listed, and none of them are finished.',
    ],
    impact:
      'I perform with them, which is a harder test than shipping them. The design rule I now apply to everything came from here: on an instrument a control in the wrong place does not read worse, it makes you play something else.',
  },

  '/demo/blenderpipeline': {
    what: [
      'A survival game I am building in private, whose 3D art is written as code rather than modelled by hand.',
      'The interesting problem in a game this size is not any single asset. It is that there are hundreds of them and one person making them. So a Python file describes an asset and the 3D software builds it: characters, weapons, mobs, furniture, vehicles and crafting stations, along with their materials, modifiers and animations.',
      'Four stages, each with a contract at its edge. Code generates the geometry, the 3D software exports a standard interchange file, a browser preview renders it for inspection without opening the game engine, and the engine imports the same file the preview did.',
    ],
    impact:
      'Every asset is a source file rather than a binary, so it can be diffed and reviewed like code, and changing one rule rebuilds every asset that follows it.',
  },

  '/demo/trickle-ui-kit': {
    what: [
      'Forty-seven text animations for React, packaged so another developer installs any one of them with a single command.',
      'Every animation is a pure CSS keyframe. No animation library is involved: the browser does the work, and React is only asked to change state when an effect genuinely needs it.',
      'Forty-two of the forty-seven ship literally zero JavaScript to the visitor. The remaining five need a small amount because of what they do, and the page says which ones and why.',
    ],
    impact:
      'Web animation normally costs page weight and a delay before anything can move. These cost neither, which is the entire reason to package them rather than let each project reinvent them.',
  },

  '/demo/inertial': {
    what: [
      'A working demonstration of how AI content moderation could be made answerable after the fact.',
      'The thesis is one sentence: what the AI decided and what the human reviewer then did should both land in the same tamper-evident log, as typed evidence rather than as free text. So months later you can prove who decided what, on what basis, and in what order.',
      'It is deliberately not a deployable service, and the page says so. The schemas, the audit chain, the evaluation harness and the reviewer dashboard are real and tested. The connectors are stubs, there is no authentication, and the gold-standard test set is too small to certify anyone\u2019s accuracy. It is there to demonstrate the architecture, not to sell it.',
    ],
    impact:
      'Moderation systems are usually asked to be accurate. This one is built to be auditable, which is the thing a regulator, a court or an appeal actually needs, and almost nothing in the category is designed for it.',
  },

  '/demo/hologram': {
    what: [
      'A tool that lets you watch an AI agent work on 3D game assets while it happens.',
      'It streams what the asset pipeline is doing to a dashboard in real time, including the tool calls the agent is making right now, and it hands the agent a small interface for inspecting the same pipeline: list the assets, look inside one, render it, health-check it.',
      'That interface is deliberately read-only and non-destructive. The agent can see everything and change nothing on its own.',
    ],
    impact:
      'An agent working on binary 3D files is otherwise a black box that either worked or did not. This makes it something you can supervise while it runs, which is the difference between trusting the output and checking it.',
  },

  '/demo/collapse': {
    what: [
      'A tool that turns your own teaching material into skills an AI assistant can install and use.',
      'It exists because an assistant\u2019s default knowledge is generic while most developers live inside one stack at a time. The same idea, reactive state or error handling or lifecycle, lands differently in React, Vue, Nuxt or a quantum circuit library, and a generic answer costs you a round trip to correct.',
      'Point it at lessons or notebooks and it compiles the patterns inside into installable skills that carry your vocabulary, so the assistant reaches for the right idiom the first time.',
    ],
    impact:
      'Knowledge that used to sit in a document somebody had to read and remember becomes something the assistant applies by default, which is a different thing from pasting the document into a prompt.',
  },

  '/demo/akacovart': {
    what: [
      'A browser studio for making album art. Pick a generator, drop in a seed, shape it with a handful of controls for palette, composition, film texture and type, then export a print-ready cover or a video loop synced to the track.',
      'One decision runs through all of it: every image is data. A cover is fully described by an engine, a seed and a small set of parameters, and nothing else. Feed the same seed and settings back in and you get the same image.',
      'It is built for musicians and labels who want a distinctive sleeve quickly, and for developers who want a clean generative engine to build on.',
    ],
    impact:
      'Because a cover is data rather than a flattened file, it can be reproduced, versioned and adjusted months later. A JPEG of a good cover is a dead end; this is a recipe you can revisit.',
  },

  '/demo/box-populi': {
    what: [
      'A site for a New York live-techno collective: a rotating cast of artists who play continuous, multi-hour improvised sets.',
      'It carries the landing page, a full roster with a profile for every member, an in-page set player, and a booking form.',
      'The interesting part was never the landing page, it was the constraints. The site is a thin presentation layer over typed data files, so the crew can grow without anyone touching layout code, and several live streams are coordinated so that two can never play at once.',
    ],
    impact:
      'Real client work with real limits, including an iOS audio restriction that is surfaced honestly in the interface rather than papered over, which is usually where these sites quietly break.',
  },

  '/demo/visualizer-eden': {
    what: [
      'A browser audio visualiser. Load a track and the music drives the shape of a 3D surface in real time, written with custom shader code that runs on the graphics card.',
      'I built it because I wanted a mix to show up as motion rather than as a waveform strip. The same frequency analysis that powers the meters in a music production app is enough to steer a 3D look, provided you compress it into a few stable numbers and keep the heavy work off the main thread.',
    ],
    impact:
      'The accessibility rule I now apply to every piece of motion on this site started here: anything that pulses brightness in time with sound is a genuine hazard, so motion moves space instead. A constraint that came from one project became the house rule.',
  },

  '/demo/music-analysis-chat': {
    what: [
      'A workspace for a record label, built to answer one design question: when you ask an AI about music data, what should come back instead of a paragraph?',
      'I spent years around this data. The questions people actually ask are narrow and repetitive. How did this release convert. Who is posting with the sound. Who should we send the brief to. None of those are answered well by prose, which is exactly what a chat interface gives you by default.',
      'So it is not a chatbot that knows about music. It is an argument about response shape: for a question with a known answer type, the agent should return the artifact that answers it, and the sentence should be the caption on that artifact rather than the answer itself.',
    ],
    impact:
      'It reframes what an agent gives back as something you act on rather than something you read, which is the difference between an assistant that reports and one that is actually part of the workflow.',
  },

  '/demo/wrdef': {
    what: [
      'A five-letter word game where the clue is the dictionary definition rather than the pattern of letters you have already tried.',
      'That one change moves the whole game. In the original you are reasoning about spelling; here you are reasoning about meaning, which means a word you have never typed can still be deduced. Definitions are ranked by sense, so a word with several meanings gives you the one that is actually useful, and bonus blanks reward getting there on less information.',
      'You earn your words. Solve one and it joins a local dictionary that belongs to you, so the game accumulates across sessions instead of resetting every day.',
    ],
    impact:
      'A small, finished, playable thing. Shipping something complete is a different discipline from building a prototype that only has to survive a demo, and most portfolios only contain the second kind.',
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
