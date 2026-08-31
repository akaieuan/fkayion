import Link from 'next/link'
import { Inter } from 'next/font/google'
import { ArrowLeft } from 'lucide-react'
import { Prototype } from '@/components/replicas/bodylog-v1/prototype'
import '@/components/replicas/bodylog-v1/v1.css'
import { demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'

/**
 * The v1 BodyLog prototype, kept whole.
 *
 * This is the original interactive exploration — every screen of the app as one
 * clickable artefact, back when it was still called dermp — and it is still the
 * clearest way to read the user story end to end.
 *
 * It used to be a 1.37 MB self-contained bundle served out of `public/` and
 * shown in an iframe: a React runtime, its own copy of Inter and Geist Mono as
 * twenty inlined woff2 files, and the whole design in a string. It is now what
 * it should have been, a page: typed data tables, server-rendered SVG art, and
 * one client island for the state. Nothing about the prototype's behaviour
 * changed, and the fixture data is identical down to the seeds.
 *
 * The two faces are loaded here rather than in the root layout, because they
 * belong to the artefact and not to the site.
 *
 * The route is listed in `lib/fullscreen-demos.ts`, so the site header and the
 * section rail stay out of the prototype's own chrome.
 */

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--bl1-sans' })

/**
 * Geist Mono is not in this Next version's Google catalogue, so it comes in as
 * a stylesheet link rather than through next/font. React hoists it to the head
 * and dedupes it; the mono is only used for the prototype's micro-labels, and
 * the stack below covers the swap.
 */
const GEIST_MONO = 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap'

export const metadata = {
  title: 'BodyLog v1 Prototype',
  description:
    'The original interactive BodyLog prototype: the whole user story as one clickable artefact, kept exactly as it was designed.',
}

export default function BodyLogV1Page() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f0eee9]">
      <JsonLd
        data={demoSchema('/demo/bodylog/v1', {
          title: metadata.title,
          description: metadata.description,
        })}
      />
      <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between gap-4 border-b border-black/10 bg-[#0e0e0d] px-4 py-2.5">
        <Link
          href="/demo/bodylog"
          className="inline-flex items-center gap-1.5 text-[12px] font-light text-white/55 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          BodyLog
        </Link>
        <p className="truncate text-[11px] font-light tracking-wide text-white/35">
          v1 prototype · the user story, end to end
        </p>
      </div>

      <link rel="stylesheet" href={GEIST_MONO} />

      <div className={`bl1 ${inter.variable} flex-1 px-6 py-10 sm:px-11`}>
        <div className="mb-5 flex items-baseline gap-2.5">
          <span className="rounded bg-[#141413] px-[7px] py-[3px] font-mono text-[10px] font-medium text-[#fafaf8]">1</span>
          <span className="text-[13px] font-light leading-tight text-[#141413]">
            dermp — personal skin tracking. circleheads system, mobile.
          </span>
        </div>

        <div className="mb-7 flex max-w-[860px] flex-col gap-2.5">
          <p className="m-0 max-w-[640px] text-[13px] font-light leading-[1.65] text-black/60">
            What I assumed, so you can correct me: the app never interprets a photo, never scores a condition and never suggests
            treatment — every number on screen is something <em>you</em> typed. Severity is self-rated. The calendar grid counts logs,
            not health. Streaks are hard-break as you asked, but the copy around a broken streak stays neutral — no scolding.
          </p>
          <p className="m-0 max-w-[640px] text-[13px] font-light leading-[1.65] text-black/60">
            The system: warm near-black default with a paper toggle, one border weight, no shadows, ink hierarchy by alpha. Accents
            are punctuation — one hue per project, carried consistently from the project card to the body-map hotspot to the calendar
            cell. The pixel engine does all the brand art: the dermp mark (cross + pencil), tab icons, badges, and the sprite. No
            photography, no illustration.
          </p>
        </div>

        <Prototype />

        <p className="mt-6 text-[12px] font-light leading-[1.6] text-black/50">
          Try next: &ldquo;use the <OptRef id="1e" /> grid inside <OptRef id="1a" />&rdquo; · &ldquo;make the capture flow one sheet
          instead of three steps&rdquo; · &ldquo;the body map should be anatomical, not abstract&rdquo; · &ldquo;show me the doctor
          export&rdquo;
        </p>
      </div>
    </div>
  )
}

function OptRef({ id }: { id: string }) {
  return (
    <a
      href={`#${id}`}
      className="rounded-[5px] bg-black/[0.07] px-[7px] py-[3px] font-mono text-[10.5px] font-medium text-[#141413] transition-colors hover:bg-black/[0.12]"
    >
      {id}
    </a>
  )
}
