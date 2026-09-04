import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ButtonsSection } from '@/components/features/aka-style/primitives/buttons'
import { SurfacesSection } from '@/components/features/aka-style/primitives/surfaces'
import { CardSection } from '@/components/features/aka-style/primitives/card'
import { InputSection } from '@/components/features/aka-style/primitives/input'
import { ContentSection } from '@/components/features/aka-style/primitives/content'
import { ComponentsSection } from '@/components/features/aka-style/primitives/components'
import { PrimitivesClosing } from '@/components/features/aka-style/primitives/closing'

export const metadata = {
  title: 'Primitives: controls & surfaces | akaSTYLE',
  description:
    'Every control and surface in the system, with the class string beside it: buttons, links, cards, chips, form controls, tables, code, lists, media frames, and status. Copy-paste transferable.',
}

export default function PrimitivesPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/aka-style"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          akaSTYLE
        </Link>

        <header className="mb-10">
          <p className="aka-kicker">Library · Primitives</p>
          <h1 className="mt-2 text-display font-extralight leading-none tracking-tight text-foreground/90">
            Controls &amp; surfaces
          </h1>
          <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
            The whole vocabulary, with the class string printed beside each piece. Everything here is
            server-rendered: no control on this page needs client JavaScript to look right. Copy the
            string, keep the tokens, and the primitive lands correctly in any repo running the same
            four variables.
          </p>
        </header>

        {/* BUTTONS */}
        <ButtonsSection />

        {/* SURFACES */}
        <SurfacesSection />

        {/* CARD */}
        <CardSection />

        {/* FORM */}
        <InputSection />

        {/* CONTENT */}
        <ContentSection />

        {/* COMPONENTS */}
        <ComponentsSection />

        <PrimitivesClosing />
      </article>
    </div>
  )
}
