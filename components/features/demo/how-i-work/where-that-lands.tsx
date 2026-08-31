import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { link, h2 } from '@/components/features/demo/how-i-work/shared'

/** Where that lands now. Moved verbatim from app/demo/how-i-work/page.tsx. */
export function WhereThatLandsSection() {
  return (
          <section className="space-y-3">
            <h2 className={h2}>Where that lands now</h2>
            <p>
              I take implementation when the work needs it rather than when the org chart allows
              it, which in practice means research and the build stay in the same week: what a
              session replay showed on Tuesday can be a working surface by Thursday, and the
              surface is what gets tested next rather than a deck about it.
            </p>
            <p>
              The current version of the Ubik argument is{' '}
              <Link href="/demo/hitl-kit" className={link}>
                HITL Kit
              </Link>
              , nineteen installable primitives for keeping a person in authority over an agent,
              and{' '}
              <Link href="/demo/eval-kit" className={link}>
                eval-kit
              </Link>
              , an evaluation framework where humans do the scoring. Both exist because benchmarks
              ask whether a model can finish a task alone and deployment asks whether it respected
              the person it was working with. Those are different questions and only one of them is
              the product.
            </p>
            <p>
              One window into the loop is the{' '}
              <a
                href="https://kraa.io/team-test-log042"
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                team test log
                <ArrowUpRight
                  className="ml-0.5 inline h-3.5 w-3.5 align-[-0.1em] opacity-70"
                  aria-hidden
                />
              </a>
              : real observation turned into concrete changes, kept in the open so you can read the
              arc rather than the conclusions. The full argument is my paper,{' '}
              <a
                href="https://kraa.io/abmpinai1"
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                An AI Measurement Problem
                <ArrowUpRight
                  className="ml-0.5 inline h-3.5 w-3.5 align-[-0.1em] opacity-70"
                  aria-hidden
                />
              </a>
              .
            </p>
          </section>
  )
}
