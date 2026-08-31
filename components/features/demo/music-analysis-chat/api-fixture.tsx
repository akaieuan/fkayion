import { h2 } from '@/components/features/demo/music-analysis-chat/shared'

/** Why the API is a fixture. Moved verbatim from app/demo/music-analysis-chat/page.tsx. */
export function ApiFixtureSection() {
  return (
          <section className="space-y-3">
            <h2 className={h2}>Why the API is a fixture</h2>
            <p>
              Nothing behind it is real. The API is one function that matches keywords in the
              question and returns a hand-written payload after a short delay. That is the point:
              the work here is the response contract and the surface that renders it, and a real
              model would only add a source of variance to a thing being judged on its shape.
            </p>
            <p>
              It also means the demo has no key, no backend and no rate limit, so it still runs
              exactly as built.
            </p>
          </section>
  )
}
