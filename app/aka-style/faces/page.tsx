import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { TheRuleSection } from '@/components/features/aka-style/faces/the-rule'
import { CycleSection } from '@/components/features/aka-style/faces/cycle'
import { TheSetSection } from '@/components/features/aka-style/faces/the-set'
import { PersonasSection } from '@/components/features/aka-style/faces/personas'
import { EntranceSection } from '@/components/features/aka-style/faces/entrance'
import { HowItWorksSection } from '@/components/features/aka-style/faces/how-it-works'
import { FacesClosing } from '@/components/features/aka-style/faces/closing'

export const metadata = {
  title: 'Faces — the expression set | akaSTYLE',
  description:
    'Twenty-six expressions that live inside the pixel-disc void: the full face set, the persona marks, and the rules for when a mark is allowed to have a face.',
}

export default function FacesPage() {
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
          <p className="aka-kicker">Brand engine · Faces</p>
          <h1 className="mt-2 text-[clamp(1.7rem,5vw,2.4rem)] font-extralight leading-none tracking-tight text-foreground/90">
            Faces
          </h1>
          <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
            Inside the knocked-out void, a mark can hold an expression. Twenty-six of them, drawn on
            a 9×9 sub-grid and morphed between on a 2.9-second slot with a short transition — so a
            face never cuts, it always travels.
          </p>
        </header>

        {/* THE RULE */}
        <TheRuleSection />

        {/* LIVE CYCLE */}
        <CycleSection />

        {/* THE SET */}
        <TheSetSection />

        {/* PERSONAS */}
        <PersonasSection />

        {/* ENTRANCE */}
        <EntranceSection />

        {/* HOW IT WORKS */}
        <HowItWorksSection />

        <FacesClosing />
      </article>
    </div>
  )
}
