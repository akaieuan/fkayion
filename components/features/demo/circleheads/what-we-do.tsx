const pillars = [
  {
    label: 'Applied AI',
    line: 'Agentic systems that do real work.',
    body: 'We watch the work first. Then we ship agents that do it in production — with the data they need, the skills they use, and approval gates that keep humans in control.',
  },
  {
    label: 'Consulting',
    line: 'A short bench, senior only.',
    body: 'A few engagements a year, taken when the fit is right: architecture, AI strategy, brand identity, and design that ships.',
  },
  {
    label: 'Games',
    line: 'Strange things, quietly built.',
    body: 'Original titles built in-house, on scopes two people can hold in their heads. Not ready to show you — which is exactly how we like it.',
  },
]

/** What we do. Moved verbatim from app/demo/circleheads/page.tsx. */
export function WhatWeDoSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">What we do</h2>
            <ul className="space-y-4">
              {pillars.map((p) => (
                <li key={p.label} className="aka-card-well px-5 py-4">
                  <p className="text-11 font-medium uppercase tracking-[0.16em] text-foreground/80">
                    {p.label}
                  </p>
                  <p className="mt-1 text-14 text-foreground/85">{p.line}</p>
                  <p className="mt-1.5 text-13 font-light leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          </section>
  )
}
