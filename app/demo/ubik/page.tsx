import type { Metadata } from 'next'
import { KickerTags } from '@/components/ui/tag-row'
import { DemoImage } from '@/components/ui/demo-image'
import { JsonLd, breadcrumbSchema, projectSchema } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { DemoShell } from '@/components/features/demo/demo-shell'
import { WhatUbikWasSection } from '@/components/features/demo/ubik/what-ubik-was'
import { ProductSection } from '@/components/features/demo/ubik/product'
import { ArchitectureSection } from '@/components/features/demo/ubik/architecture'
import { ProductCardsSection } from '@/components/features/demo/ubik/product-cards'
import { LongRunsSection } from '@/components/features/demo/ubik/long-runs'
import { EngineeringSection } from '@/components/features/demo/ubik/engineering'
import { RoleSection } from '@/components/features/demo/ubik/role'
import { DesignBoardSection } from '@/components/features/demo/ubik/design-board'
import { ClosedChapterSection } from '@/components/features/demo/ubik/closed-chapter'
import { ArchiveMenu } from '@/components/features/demo/ubik/archive-menu'
import { ArchiveMenuItems } from '@/components/features/demo/ubik/archive-menu-items'
import { ArchiveSection } from '@/components/features/demo/ubik/archive'
import { WRITING, writingHref } from '@/lib/writing'
import { UBIK_ARCHIVE_TYPE } from '@/components/features/demo/ubik/shared'

const code = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]'

type Shot = { src: string; w: number; h: number; label: string }

const hero: Shot = {
  src: '/ubik/splash.webp',
  w: 1506,
  h: 853,
  label: 'The workspace in its final build: the file explorer and an indexed-four-minutes-ago context pill on the left, a source paper in the middle with every claim the agent drew highlighted in place, evidence cards queued for review along the bottom, and the agent working through a four-task plan on the right',
}

const PATH = '/demo/ubik'
const TITLE = 'Ubik Studio — A Desktop-Native AI Research Platform'
const DESCRIPTION =
  'Three and a half years co-founding a desktop-native AI research platform where agents did the gathering and drafting, and humans kept the final say — with evidence behind every claim.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: 'article',
    url: PATH,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: hero.src, width: hero.w, height: hero.h, alt: hero.label }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [hero.src],
  },
}

export default function UbikProjectPage() {
  return (
    <DemoShell>
      <JsonLd
        data={[
          projectSchema({
            path: PATH,
            name: 'Ubik Studio',
            description: DESCRIPTION,
            image: hero.src,
            keywords: [
              'AI research platform',
              'human-in-the-loop',
              'agentic research',
              'local-first',
              'Electron',
              'product design',
              'evaluation framework',
            ],
          }),
          breadcrumbSchema([
            { name: 'Projects', path: '/demo' },
            { name: 'Ubik Studio', path: PATH },
          ]),
        ]}
      />
      <header className="mb-6">
        <KickerTags>Product · Desktop AI research platform · 2023–2026</KickerTags>
        <h1
          className="mt-2 text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight"
          aria-label="Ubik Studio"
        >
          <span className="text-foreground/90">Ubik Studio</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
        A desktop-native, local-first AI research platform. Three and a half years building the
        human side of agentic research, before it had a name.
        </p>
      </header>

      <figure className="-mx-6 aka-card-well aka-card-media overflow-hidden sm:mx-0">
        <DemoImage
          src={hero.src}
          alt={hero.label}
          width={hero.w}
          height={hero.h}
          sizes="(min-width: 672px) 640px, 100vw"
          className="block h-auto w-full"
          priority
        />
      </figure>
      <p className="mt-2 text-[11px] font-light text-muted-foreground/60">{hero.label}</p>

      {/*
        One control where there were two. The write-ups and the two surviving
        public links are the same errand — where else Ubik exists — so they
        are one menu rather than a row that grows a button per destination.
        The items are server-rendered and handed to the menu as children.
      */}
      <div className="mt-5">
        <ArchiveMenu label="Ubik archive">
          <ArchiveMenuItems />
        </ArchiveMenu>
      </div>
      <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
        2023–2026 · co-founded · the public site and builds are retired; the test log and the
        subreddit are what remain in the open.
      </p>
      <PlainSummary
        path={PATH}
        archive={WRITING.filter((e) => e.slug && e.type === UBIK_ARCHIVE_TYPE).map((e) => ({
          title: e.title,
          href: writingHref(e),
        }))}
      />

      <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
        <WhatUbikWasSection />

        <ProductSection />

        <ArchitectureSection />

        {/*
          The cards take the page, two across.
          
          ── Why they break out ────────────────────────────────────────────
          
          Everything else here is a column of text at the reading measure,
          which is the right width to read at and the wrong one to watch a
          screen recording in. These are recordings of a three-pane desktop
          app; at reading width the panes are too small to tell apart, which
          defeats the point of showing them.
          
          ── Why this width ────────────────────────────────────────────────
          
          1180px is not a new number. It is `max-w-site` — the width the
          project plates take on the landing and on /demo — so a reader who
          has seen the card wall meets the same grid here rather than a
          third measure invented for one page. The old version used
          breakpoint-tuned negative margins (-mx-24, -mx-40) that landed on
          896px, which matched nothing.
          
          The arithmetic is one line: give the block a width, then split the
          difference between it and the column across both margins. The
          negative margins fall out automatically and stay symmetrical, and
          `min()` against the viewport means the breakout shrinks into the
          gutter on a narrow window instead of opening a scrollbar — so
          there is no separate mobile rule to keep in sync.
          
          ── Why two across ────────────────────────────────────────────────
          
          Seven short loops of one product read as a set side by side. In a
          single column each one is a separate event and the section runs
          seven screens long. `items-start` because the clips have different
          aspect ratios and a row should not stretch the shorter card to
          match the taller one.
        */}
        <ProductCardsSection />

        <LongRunsSection />

        <EngineeringSection />

        <RoleSection />

        <DesignBoardSection />

        <ArchiveSection />

        <ClosedChapterSection />
      </div>
    </DemoShell>
  )
}
