import type { Metadata } from 'next'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'

/**
 * Metadata and structured data for an interactive demo.
 *
 * The page itself is a client component, so it cannot export `metadata` —
 * Next only reads that from a server module. A sibling layout is the standard
 * place for it, and it is also the only place a fullscreen demo can carry
 * JSON-LD without the schema becoming part of the client bundle.
 */

const PATH = '/demo/hitl-ai'

export const metadata: Metadata = demoMetadata(PATH, {
  title: 'HITL-AI Widget Showcase — Human-in-the-Loop Primitives',
  description:
    'A registry-driven showcase of human-in-the-loop primitives at four densities: approval gates, agent status, provenance scales, context chips and tool-call previews, each rendered live rather than screenshotted.',
})

export default function HitlAiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      {children}
    </>
  )
}
