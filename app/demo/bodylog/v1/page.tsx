import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

/**
 * The v1 BodyLog prototype, kept whole.
 *
 * This is the original interactive exploration: every screen of the app as one
 * clickable artefact, which is still the clearest way to read the user story
 * end to end. It is a self-contained bundle, so it is served as a static file
 * and framed rather than ported. Porting it would mean maintaining a second
 * copy of a design that has already moved on, and the point of keeping it is
 * that it is the version we actually decided from.
 *
 * The bundle used to weigh 1.37 MB, of which about 1 MB was twenty base64
 * woff2 files: Inter and Geist Mono, every weight and every subset, inlined so
 * the artefact would work as a file on a desktop. Served from this site it
 * never needs that, so the faces now come from Google Fonts and the file is
 * around 310 KB. Nothing about the prototype itself changed; the React runtime
 * it carries stays, because the frame is its own document and needs one.
 *
 * The route is listed in `lib/fullscreen-demos.ts`, so the site header and the
 * section rail stay out of the prototype's own chrome.
 */

export const metadata = {
  title: 'BodyLog v1 Prototype | akaBuild',
  description:
    'The original interactive BodyLog prototype: the whole user story as one clickable artefact, kept exactly as it was designed.',
}

export default function BodyLogV1Page() {
  return (
    <div className="fixed inset-0 flex flex-col bg-[#0e0e0d]">
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-2.5">
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
      <iframe
        src="/bodylog-v1.html"
        title="BodyLog v1 interactive prototype"
        className="min-h-0 w-full flex-1 border-0"
      />
    </div>
  )
}
