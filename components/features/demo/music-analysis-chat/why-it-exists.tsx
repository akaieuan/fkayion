/** Why it exists. Moved verbatim from app/demo/music-analysis-chat/page.tsx. */
export function WhyItExistsSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">Why it exists</h2>
            <p>
              I spent years around music data: save rates, playlist adds, which clip is driving
              which conversion. The questions people actually ask of it are narrow and repetitive.
              How did this release convert. Who is posting with the sound. Who should we send the
              brief to. None of those are answered well by a paragraph of prose, which is what a
              chat interface gives you by default.
            </p>
            <p>
              So this is not a chatbot with music trivia in it. It is an argument about response
              shape: for a question with a known answer type, the agent should return the artifact
              that answers it, and the prose should be the caption rather than the payload.
            </p>
          </section>
  )
}
