import { label, card as cardCls, codeChip as codeCls } from '@/components/features/aka-style/shared'
import { Row, Table } from '@/components/features/aka-style/foundations/token-table'

/** Color: ground and ink, and the opacity ladder. Moved verbatim from app/aka-style/foundations/page.tsx. */
export function ColorSection() {
  return (
        <section className="scroll-mt-24">
          <p className="aka-kicker">Color</p>
          <h2 className="mt-2 aka-section-title">Ground and ink</h2>
          <p className="aka-standfirst">
            Two tokens carry almost everything: a ground and an ink. OKLCH throughout, so a
            dark-mode flip is a lightness change rather than a re-pick, and the values below are the
            ones actually in <code className={codeCls}>globals.css</code>, light then dark.
          </p>
          <div className={`${cardCls} mt-6`}>
            <Table>
              <Row name="--background" value="0.955 0.002 106 / 0.09 0 0">
                <span className="block h-6 w-full max-w-[160px] rounded border border-border bg-background" />
              </Row>
              <Row name="--foreground" value="0.122 0.001 0 / 0.985 0 0">
                <span className="block h-6 w-full max-w-[160px] rounded border border-border bg-foreground" />
              </Row>
              <Row name="--muted-foreground" value="0.36 0.001 0 / 0.708 0 0">
                <span className="block h-6 w-full max-w-[160px] rounded border border-border bg-muted-foreground" />
              </Row>
              <Row name="--border" value="0.88 0.003 106 / white 10%">
                <span className="block h-6 w-full max-w-[160px] rounded border border-border bg-border" />
              </Row>
              <Row name="--select" value="0.58 0.13 250 / 0.707 0.108 152.216">
                <span
                  className="block h-6 w-full max-w-[160px] rounded border border-border"
                  style={{ background: 'var(--select)' }}
                />
              </Row>
              <Row name="--status-warn" value="0.58 0.13 75 / 0.72 0.13 75">
                <span className="block h-6 w-full max-w-[160px] rounded border border-border bg-status-warn" />
              </Row>
              <Row name="--status-danger" value="0.55 0.2 25 / 0.62 0.2 25">
                <span className="block h-6 w-full max-w-[160px] rounded border border-border bg-status-danger" />
              </Row>
              <Row name="--ink-on-art" value="1 0 0 / 1 0 0">
                <span className="flex items-center gap-3">
                  <span
                    className="block h-6 w-full max-w-[160px] rounded border border-border"
                    style={{ background: 'var(--ink-on-art)' }}
                  />
                  <span className="shrink-0 text-11 font-light text-muted-foreground/60">
                    copy over artwork, both themes
                  </span>
                </span>
              </Row>
              <Row name="--ink-link" value="0.4 0.08 152.2 / 0.707 0.108 152.216">
                <span
                  className="block h-6 w-full max-w-[160px] rounded border border-border"
                  style={{ background: 'var(--ink-link)' }}
                />
              </Row>
            </Table>
            <p className="mt-4 text-[11.5px] font-light leading-relaxed text-muted-foreground/70">
              <span className="text-foreground/80">One accent, and it is not --primary.</span>{' '}
              <code className={codeCls}>--select</code> is what a selected tab, selected text and a
              focus ring take, and it is the only place a hue is allowed to lead. It changes hue
              across themes rather than lightness, because the blue that reads as &ldquo;chosen&rdquo;
              on paper goes muddy on the dark ground.{' '}
              <code className={codeCls}>--primary</code> is near-black ink in light and the green in
              dark; it is a shadcn token the primitives inherited, not the system&apos;s accent.
            </p>
          </div>

          <div className={`${cardCls} mt-3`}>
            <p className={label}>The opacity ladder, and why it is not classes</p>
            <p className="mt-2 text-[12.5px] font-light leading-relaxed text-muted-foreground">
              Ink steps down in six, and that is the whole hierarchy. It is written by hand rather
              than with <code className={codeCls}>/nn</code> utilities, because on Tailwind v3 the
              colours above are bare <code className={codeCls}>var()</code> values with no{' '}
              <code className={codeCls}>&lt;alpha-value&gt;</code> slot. Tailwind cannot compute an
              alpha for them, so <code className={codeCls}>text-foreground/85</code> compiles to
              nothing at all: there is not one token slash-alpha utility in the built stylesheet,
              only the literal <code className={codeCls}>white/</code> and{' '}
              <code className={codeCls}>black/</code> ones.
            </p>
            <p className="mt-2 text-[12.5px] font-light leading-relaxed text-muted-foreground">
              So the two steps that carry long-form reading are mixed by hand, in sRGB, because the
              tokens are achromatic with an explicit hue of 0 and an OKLCH mix would interpolate it.
            </p>
            <pre className="mt-3 overflow-x-auto aka-card-well rounded-lg px-3 py-2 font-mono text-[10.5px] leading-relaxed text-muted-foreground/75">
              {`.aka-ink-body  { color: color-mix(in srgb, var(--foreground) 82%, transparent) }
.aka-ink-quiet { color: color-mix(in srgb, var(--foreground) 62%, transparent) }`}
            </pre>
            <p className="mt-3 text-[11.5px] font-light leading-relaxed text-muted-foreground/70">
              Everything on the site still written as{' '}
              <code className={codeCls}>text-foreground/85</code> is therefore full ink today. Giving
              the tokens an alpha slot would fix it in one line and change the colour of a great deal
              of text at once, so it is a design decision waiting to be made, not a bug to sneak in.
            </p>
          </div>
        </section>
  )
}
