import { skills } from '@/components/features/demo/blenderpipeline/chrome'

/** How I describe the skill set. Moved verbatim from app/demo/blenderpipeline/page.tsx. */
export function SkillSetSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              How I describe the skill set
            </h2>
            <ul className="flex flex-wrap gap-1.5 pl-0">
              {skills.map((s) => (
                <li
                  key={s}
                  className="list-none rounded-md border border-border/70 px-2.5 py-1 text-[12px] text-muted-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
          </section>
  )
}
