/** The game. Moved verbatim from app/demo/blenderpipeline/page.tsx. */
export function TheGameSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">The game</h2>
            <p>
              Brooklyn Dead is a survival game I am building in private, in Godot 4. It has the
              shape you would expect from the genre: characters you outfit, mobs in tiers, weapons
              in a taxonomy, and crafting stations that get better as you do. The design work sits
              in spec documents. The part I can put on record here is everything underneath it,
              because the interesting problem in a game this size is not any one asset. It is that
              there are hundreds of them and one person making them.
            </p>
            <p>
              So none of them are modelled by hand. A Python file describes an asset and Blender
              builds it. Characters, weapons, mobs, furniture, vehicles and crafting stations all
              come out of code, along with their materials, their modifiers and their animations.
            </p>
          </section>
  )
}
