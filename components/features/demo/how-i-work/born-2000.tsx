import Link from 'next/link'
import { link, h2 } from '@/components/features/demo/how-i-work/shared'

/** A 2000 baby, raised on the future. Moved verbatim from app/demo/how-i-work/page.tsx. */
export function Born2000Section() {
  return (
          <section className="space-y-3">
            <h2 className={h2}>A 2000 baby, raised on the future</h2>
            <p>
              My dad is a programmer and a gamer, and the thing he has always told me is that to
              achieve the impossible you have to attempt the improbable. He got me a computer when
              I was young, and the internet has been a second home since. Being born in 2000 feels
              specific in a way I have never fully shaken: I got to watch technology change from
              cyberpunk to sterile, from something that looked like it was made by people who
              wanted something into a surface with the fingerprints wiped off.
            </p>
            <p>
              I am also an artist and a perfectionist, which mostly manifests as having a problem
              with nearly every app I use. That used to be a complaint. AI changed my habits
              completely and now it is a to-do list. I live in the science-fiction future I was
              raised to glorify, and the interesting part of it is not that a model can write code.
              It is that the distance between wanting a tool and having one collapsed. The longer
              version of that argument is{' '}
              <Link href="/writing/digital-gentrification" className={link}>
                Digital Gentrification
              </Link>
              .
            </p>
          </section>
  )
}
