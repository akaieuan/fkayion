import { kicker } from '@/components/features/aka-style/chrome'

// Foundations sets its inline code chip a half point smaller than the shared
// codeChip, so the string stays local to this page rather than moving to chrome.ts.
const codeCls = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[10.5px]'

/** Transfer: the whole system in one block. Moved verbatim from app/aka-style/foundations/page.tsx. */
export function TransferSection() {
  return (
        <section className="mt-16">
          <p className={kicker}>Transfer</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            The whole system, in one block
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            Two files, because this is Tailwind v3 and the mapping from token to utility lives in a
            config. It used to be printed here as v4 (<code className={codeCls}>@import
            &quot;tailwindcss&quot;</code>, <code className={codeCls}>@theme inline</code>, no config
            file), which does not parse on v3 and is exactly the mistake a generator makes when it
            guesses the version.
          </p>
          <pre className="mt-6 overflow-x-auto aka-card-well p-5 font-mono text-[10.5px] leading-relaxed text-foreground/80">
            {`/* globals.css */
:root {
  --background:       oklch(0.97  0.002 106);
  --foreground:       oklch(0.122 0.001 0);
  --muted-foreground: oklch(0.46  0.001 0);
  --border:           oklch(0.88  0.003 106);
  --select:           oklch(0.58  0.13  250);  /* the one accent */
  --radius:           0.625rem;
}

.dark {
  --background:       oklch(0.09  0 0);
  --foreground:       oklch(0.985 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --border:           oklch(1 0 0 / 10%);
  --select:           oklch(0.707 0.108 152.216);
}

@layer components {
  .max-w-site { max-width: 1180px; }
  .site-inset { @apply px-5 sm:px-6 md:px-12 lg:px-16; }
  /* the ink steps, because /nn utilities do not compile on bare var() tokens */
  .aka-ink-body  { color: color-mix(in srgb, var(--foreground) 82%, transparent); }
  .aka-ink-quiet { color: color-mix(in srgb, var(--foreground) 62%, transparent); }
}`}
          </pre>
          <pre className="mt-3 overflow-x-auto aka-card-well p-5 font-mono text-[10.5px] leading-relaxed text-foreground/80">
            {`// tailwind.config.cjs
module.exports = {
  darkMode: ['class'],
  // every hover: compiles inside @media (hover: hover), so a tap on a
  // touch screen cannot latch a hover state that never releases
  future: { hoverOnlyWhenSupported: true },
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      maxWidth: { site: '1180px' },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border:     'var(--border)',
        muted: { DEFAULT: 'var(--muted)', foreground: 'var(--muted-foreground)' },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}`}
          </pre>
        </section>
  )
}
