/** Web Audio: graph, analyser, and features. Moved verbatim from app/demo/visualizer-eden/page.tsx. */
export function WebAudioSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">
              Web Audio: graph, analyser, and features
            </h2>
            <p>
              Playback goes through{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                AudioContext
              </code>
              , then{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                createMediaElementSource
              </code>{' '}
              on the HTMLMediaElement so the file you load is the same signal you hear. An{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                AnalyserNode
              </code>{' '}
              sits in-line before{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                destination
              </code>
              :{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                fftSize = 512
              </code>
              ,{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                smoothingTimeConstant
              </code>{' '}
              around 0.3, and decibel bounds set so the byte spectrum is usable without pegging.
            </p>
            <p>
              Each frame we call{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                getByteFrequencyData
              </code>{' '}
              into a{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                Uint8Array
              </code>{' '}
              sized to{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                frequencyBinCount
              </code>
              , then reduce bins into three bands (roughly the lowest 10% as bass, the next 40% as mid,
              the remainder as high) plus a whole-spectrum volume term. Those four numbers are normalized
              against 0–255 and passed into React context as the thing the canvas reads. The analysis
              loop is throttled to about 30fps so we are not burning main-thread time on work the eye
              cannot resolve anyway.
            </p>
            <p>
              On top of that, there is light temporal logic: rolling volume history, peak tracking, and a
              bass-threshold beat detector that looks at spacing between hits to infer tempo-ish behavior
              for features that care about rhythm, not just level.
            </p>
          </section>
  )
}
