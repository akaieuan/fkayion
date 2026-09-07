import { DemoImage } from '@/components/ui/demo-image'

/**
 * The Studio, as the client sees it.
 *
 * Not rendered yet: the capture does not exist. Drop a screenshot of /studio
 * at public/box-populi/box-populi-studio.webp, run tools/gen-blur.mjs, set
 * the width and height below to the file's, and render this from the page
 * after the summary.
 */
export function StudioFigure() {
  return (
    <figure className="mt-8">
      <div className="aka-card-well aka-card-media overflow-hidden rounded-xl">
        <DemoImage
          src="/box-populi/box-populi-studio.webp"
          alt="The Sanity Studio at /studio: a black sidebar listing Site settings, Home page, Artists page, Contact page, Artists, Shows and Roles, with a document open for editing"
          width={1600}
          height={1000}
          sizes="(min-width: 672px) 640px, 100vw"
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-2.5 text-11 font-light leading-relaxed text-muted-foreground/75">
        The Sanity Studio at /studio, themed to the site. The client edits every section here;
        changes are live in about four seconds.
      </figcaption>
    </figure>
  )
}
