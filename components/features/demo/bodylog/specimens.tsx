import { BodyLogSpecimens } from '@/components/replicas/bodylog/showcase'
import { label } from '@/components/features/demo/bodylog/chrome'

/** System specimens. Moved verbatim from app/demo/bodylog/page.tsx. */
export function SpecimensSection() {
  return (
          <div>
            <p className={label}>System specimens</p>
            <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
              The same components the phone is built from, on their own. The history grid&apos;s two
              readings are the clearest statement of the whole idea in one tap.
            </p>
            <div className="mt-5">
              <BodyLogSpecimens />
            </div>
          </div>
  )
}
