const code = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]'

/** Photos are health data. Moved verbatim from app/demo/bodylog/page.tsx. */
export function PrivacySection() {
  return (
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Photos are health data
            </h2>
            <p>
              Skin photos are among the most sensitive images a person owns, so the storage model was
              a product decision before it was an engineering one:{' '}
              <span className="text-foreground/85">everything stays on the device.</span> No cloud,
              no analytics, no network calls.
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                Every stored image is downscaled and{' '}
                <span className="text-foreground/85">EXIF/GPS-stripped</span> before it touches disk.
                Capture dates are read off the original bytes and discarded with them — a dated photo
                of your own body should not also carry your address.
              </li>
              <li>
                Bytes live in <code className={code}>SwiftData</code> external storage — files
                alongside the store rather than blobs inside it, so a long history stays fast.
              </li>
              <li>
                The schema has been{' '}
                <span className="text-foreground/85">versioned since V1</span> and no shipped version
                is ever edited in place. Four have shipped, each a lightweight migration: V2 added
                photo capture dates, V3 the tracked condition, V4 the remaining capture questions and
                shot conditions.
              </li>
              <li>
                Body-region identifiers are a stored contract — a shipped one is never renamed. An
                entry logged before sides existed still parses and still means what it meant;
                inventing a side for old data would be a lie in a health record.
              </li>
              <li>
                Lists show abstract tiles rather than photographs by default, so the app is safe to
                scroll in public without changing a setting.
              </li>
            </ul>
          </section>
  )
}
