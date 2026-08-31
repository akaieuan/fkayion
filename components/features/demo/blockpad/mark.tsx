import { BlockpadMark } from '@/components/ui/blockpad-mark'
import { label, code } from '@/components/features/demo/blockpad/chrome'

/** The mark is the operation. Moved verbatim from app/demo/blockpad/page.tsx. */
export function MarkSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              The mark is the operation
            </h2>
            <div className="!mt-4 flex flex-wrap items-end gap-6">
              {[128, 64, 32, 18].map((size) => (
                <span key={size} className="flex flex-col items-center gap-2">
                  <BlockpadMark size={size} title={size === 128 ? 'The Blockpad mark' : undefined} />
                  <span className={label}>{size}px</span>
                </span>
              ))}
            </div>
            <p className="!mt-5">
              A card on Apple&apos;s icon geometry, 22.37% corner radius, holding an isometric
              stack of three faces with three short rules radiating from where they meet. It is a blockout of a layout seen in three dimensions, which is close to
              literally what the app does. The top face is the only colour in it.
            </p>
            <p>
              There are two masters, dark and light, and they are not inversions of each other: the
              card runs near-black or near-white with a soft vertical gradient, the two side faces
              carry their own greys per theme, and only the orange stays put. On this page the
              palette swaps in CSS, so the drawing stays one server-rendered SVG rather than a
              component that has to read the theme.
            </p>
            <p>
              It is generated in Core Graphics from the palette rather than stored as a binary asset,
              so changing a swatch changes the icon, and{' '}
              <code className={code}>./Scripts/icon.sh</code> regenerates it from code. The SVG is
              emitted from the same ratios, so vector and raster cannot drift.
            </p>
          </section>
  )
}
