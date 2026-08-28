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

const PATH = '/demo/hitl-ai/sheet'

export const metadata: Metadata = demoMetadata(PATH, {
  title: 'HITL-AI Component Sheet — Live UI Reference',
  description:
    'The full component sheet behind the HITL Kit: every approval, review, citation and evidence primitive laid out side by side as a working reference rather than a spec document.',
})

export default function HitlSheetLayout({ children }: { children: React.ReactNode }) {
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
