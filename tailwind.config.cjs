// eslint-disable-next-line @typescript-eslint/no-require-imports
const tailwindcssAnimate = require('tailwindcss-animate')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const plugin = require('tailwindcss/plugin')

/**
 * Scroll-linked reveals.
 *
 * The clock is the element's own progress through the viewport rather than
 * elapsed time, so the browser runs these on the compositor and the page needs
 * no observer, no scroll listener and no client component to drive them.
 *
 * Written as longhands rather than the `animation` shorthand. The shorthand
 * resets `animation-timeline` to `auto`, so any rule using it would silently
 * cancel the timeline depending on declaration order, and it cannot express the
 * `auto` duration a scroll timeline needs.
 *
 * Every keyframe describes only where an element comes *from*. The resting
 * style is the finished style, so an element whose animation never runs is
 * already correct, and nothing can be left invisible waiting for a reveal.
 *
 * Scroll timelines ignore `animation-delay`, since their clock is position and
 * not time, so staggering a group means offsetting its range: that is `--enter`.
 */
const scrollReveal = plugin(({ addBase, addUtilities }) => {
  addBase({
    '@keyframes rise': { from: { opacity: '0', transform: 'translateY(14px)' } },
    '@keyframes fade-in': { from: { opacity: '0' } },
    '@keyframes sweep': { from: { transform: 'scaleX(0)' } },
  })

  const onView = (name) => ({
    'animation-name': name,
    // `auto` is what makes a progress-based timeline work: the animation is
    // stretched across its range instead of being given a wall-clock length. A
    // real duration here completes the whole thing in the first fraction of a
    // percent of the range, which looks exactly like no animation at all.
    'animation-duration': 'auto',
    'animation-timing-function': 'ease-out',
    // Backwards fill is what holds an element at its `from` state until the
    // scroll reaches it; forwards fill is what keeps it settled afterwards.
    'animation-fill-mode': 'both',
    'animation-timeline': 'view()',
    'animation-range':
      'entry calc(var(--enter, 0) * 1%) entry calc(58% + var(--enter, 0) * 1%)',
  })

  addUtilities({
    '.reveal-rise': onView('rise'),
    '.reveal-fade': onView('fade-in'),
    '.reveal-sweep': { ...onView('sweep'), 'transform-origin': 'left center' },
  })
})

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  // Every `hover:` and `group-hover:` utility compiles inside
  // `@media (hover: hover)`. On a touch screen `:hover` latches after a tap and
  // never releases, so without this a tapped card keeps its hover state — and
  // any transform or animation attached to it — until the page is left.
  // (Default in Tailwind v4; opt-in here on v3.)
  future: { hoverOnlyWhenSupported: true },
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      maxWidth: {
        site: '1180px',
      },
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        chart: {
          '1': 'var(--chart-1)',
          '2': 'var(--chart-2)',
          '3': 'var(--chart-3)',
          '4': 'var(--chart-4)',
          '5': 'var(--chart-5)',
        },
        sidebar: {
          DEFAULT: 'var(--sidebar)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent: 'var(--sidebar-accent)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          border: 'var(--sidebar-border)',
          ring: 'var(--sidebar-ring)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        float: {
          '0%, 100%': { opacity: '0.35', transform: 'translateY(0px)' },
          '50%':       { opacity: '0.6',  transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        float: 'float 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate, scrollReveal],
}
