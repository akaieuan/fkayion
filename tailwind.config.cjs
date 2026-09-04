// eslint-disable-next-line @typescript-eslint/no-require-imports
const tailwindcssAnimate = require('tailwindcss-animate')

/**
 * A theme colour that can carry an alpha.
 *
 * The tokens are bare var() and Tailwind cannot put an alpha inside a
 * variable it cannot parse, so for a long time `text-foreground/85` compiled
 * to nothing and the element inherited: the whole quiet-ink hierarchy was
 * designed and not rendering. A colour written as a function is asked for its
 * value with the modifier attached, and answers with a color-mix. Plain use
 * still answers with the bare variable, byte for byte, because the opacity
 * core plugins are off below and Tailwind then asks with no modifier at all.
 */
const token = (name) => ({ opacityValue } = {}) =>
  opacityValue === undefined
    ? `var(${name})`
    : `color-mix(in srgb, var(${name}) calc(${opacityValue} * 100%), transparent)`

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
  /*
   * The opacity plugins would otherwise wrap every plain colour in a
   * `--tw-text-opacity` variable and ask the token function for it, which is
   * a second declaration on every element for a utility the site never uses.
   * Off, a plain `text-foreground` is exactly `color: var(--foreground)`.
   */
  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    ringOpacity: false,
  },
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
        border: token('--border'),
        input: token('--input'),
        ring: token('--ring'),
        background: token('--background'),
        foreground: token('--foreground'),
        primary: {
          DEFAULT: token('--primary'),
          foreground: token('--primary-foreground'),
        },
        secondary: {
          DEFAULT: token('--secondary'),
          foreground: token('--secondary-foreground'),
        },
        destructive: {
          DEFAULT: token('--destructive'),
          foreground: token('--destructive-foreground'),
        },
        muted: {
          DEFAULT: token('--muted'),
          foreground: token('--muted-foreground'),
        },
        accent: {
          DEFAULT: token('--accent'),
          foreground: token('--accent-foreground'),
        },
        popover: {
          DEFAULT: token('--popover'),
          foreground: token('--popover-foreground'),
        },
        card: {
          DEFAULT: token('--card'),
          foreground: token('--card-foreground'),
        },
        chart: {
          '1': token('--chart-1'),
          '2': token('--chart-2'),
          '3': token('--chart-3'),
          '4': token('--chart-4'),
          '5': token('--chart-5'),
        },
        sidebar: {
          DEFAULT: token('--sidebar'),
          foreground: token('--sidebar-foreground'),
          primary: token('--sidebar-primary'),
          'primary-foreground': token('--sidebar-primary-foreground'),
          accent: token('--sidebar-accent'),
          'accent-foreground': token('--sidebar-accent-foreground'),
          border: token('--sidebar-border'),
          ring: token('--sidebar-ring'),
        },
        // The one place a hue other than the accent may appear.
        status: {
          warn: token('--status-warn'),
          danger: token('--status-danger'),
        },
        // Ink and wash for copy that sits on artwork: the same in both themes.
        'on-art': token('--ink-on-art'),
        'wash-on-art': token('--wash-on-art'),
      },
      borderRadius: {
        DEFAULT: 'var(--radius-xs)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      /*
       * The type scale, closed. Eight steps and the display size, named by
       * their pixel value so a size is never a guess. Size only: leading is
       * a separate decision and stays a utility on the element. An arbitrary
       * `text-[Npx]` is a size the scale does not have, and the style check
       * reports it.
       */
      fontSize: {
        '10': '10px',
        '11': '11px',
        '12': '12px',
        '13': '13px',
        '14': '14px',
        '15': '15px',
        '17': '17px',
        '20': '20px',
        display: 'clamp(1.85rem, 5.5vw, 2.85rem)',
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
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
