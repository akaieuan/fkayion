import type { Block } from '@/components/features/writing/prose'

/**
 * The writing index, and the pieces that live here rather than elsewhere.
 *
 * Two shapes share one list. A piece published somewhere else keeps its `href`
 * and opens there; a piece that has been rebuilt here carries a `slug` and a
 * `body`, and the route builds itself from that. The landing reads the same
 * array, so a title, a description and a destination can only ever be written
 * once.
 *
 * Bodies are blocks rather than markup: the article renderer decides what a
 * paragraph, a heading and a pull quote look like, and the text stays text.
 * Inline, `**bold**` and `[label](url)` are the only two things a sentence can
 * carry, which is all these essays actually use.
 */

export type WritingEntry = {
  title: string
  type: string
  description: string
} & (
  | { href: string; slug?: never }
  | {
      slug: string
      href?: never
      /** The line under the title, in the author's own words. */
      deck: string
      /** Where and when it first went up. */
      published: string
      body: Block[]
    }
)

const parsimony: Block[] = [
  { k: 'h', text: '[re]Genesis (TAoF.00)' },
  {
    k: 'quote',
    text: '"In the beginning was the Word, and the Word was with God, and the Word was God"',
    cite: 'John 1:1',
  },
  { k: 'h', text: 'The Word[less]' },
  {
    k: 'p',
    text: `**The primordial theater:** A wordless prologue to our existence that echoes in every creation story humans continue to rewrite and retell. Whether whispered in Genesis or theorized by Nobel Peace Prize winners, humans try to define the unknowable moment when suddenly there was possibility. Our stories and answers groping toward the same impossible truth: something emerged from nothing, and WE weren't there to witness it. And yet, from this chaos, an origin story begins. Not one we wholly understand, but one we keep returning to. **Today, theoretical astrophysics is trapped in the same theological habits that define religious cosmology.**`,
  },
  { k: 'h', text: 'What does this mean?' },
  {
    k: 'p',
    text: `Scientists continue to pursue elegant narratives over research accompanied by rigorous evidence, prioritizing aesthetic simplicity over empirical evidence, which has legitimized untestable metaphysical speculation as hard research. By these standards, theoretical astrophysics becomes a fancy way to say God. The cosmic microwave background is no longer just a metric; the static transforms into a hissing lullaby remnant of creation's primal shout. Are these the mathematical words of faith? If science starts behaving like myth, how much closer can you get to theology?`,
  },
  {
    k: 'p',
    text: `There are more theories of everything than ever, and still, scientists are deep in the flood of uncertainty. And where there is uncertainty, faith is born. Faith fuels theories that lack math, logic, and experimentation, and I'm increasingly blown away by the large amounts of meritless research that gets published (probably written with AI).`,
  },
  {
    k: 'p',
    text: `When faced with uncertainty, some scientists like [Rupert Sheldrake jump to panpsychist theories of atomic consciousness or some true, measurable higher power](https://www.youtube.com/watch?v=O8JGlX5eU8g). While disputing these claims may be challenging due to a lack of evidence on both sides, we are suddenly expected to kneel at the pew with no idea what to say or when to stand, when to touch my face, my chest, my left shoulder, then my right.`,
  },
  {
    k: 'p',
    text: `I am no expert in theoretical astrophysics or, for what it's worth, any physics. Although I am intensely interested in the subject, I don't claim to fully understand what I read when I read it. Still, through my love of learning and reading what I don't understand, I feel more and more that the authors of these theories and claims are in the same boat, moving backward from scientists to natural philosophers. Each theorist with a slightly opposing view reminds me of being in freshman religion class at Jesuit High School.`,
  },
  {
    k: 'p',
    text: `Unlike 99% of my classmates, I wasn't (and still am not) Catholic. For the 99% Cathiolic kids i'd say 100% of them had no clue what a Jesuit was—so it took the class by surprise when my teacher Mr.Mulè, a Jesuit priest, made clear to the class that Jesuits do not consider the Bible to be a factual recounting of historical events but rather a book that outlines how to be the ideal man. The class was shocked. I was relieved. He said that Jesuits believe in science and evolution, a seemingly controversial point that the 99% fixated on. One classmate (I forget his name, probably something gospel-centric, Mark/Luke/John/Matthew, probably John) asked, "So evolution is real"?`,
  },
  {
    k: 'p',
    text: `At the time, my 14-year-old brain couldn't believe this was a question, "John" asked. I had no religious exposure until now; weirdly, I felt mature, like I knew some secret the other kids didn't. Santa Claus didn't exist, and my classmates around me still expected some otherworldly invisible ritual to take place, so their childish experience would be upheld. Presents lining the tree, half-eaten cookies, and the milk glass, empty.`,
  },
  { k: 'h', text: 'The Father, The Son, and the Holy Spirit.' },
  {
    k: 'p',
    text: `I've become grateful for my religious experiences and the exposure to religious people. Ironically, the Jesuits taught me the paradox of faith. Once we were shown a four-quadrant graph meant to pinpoint your likelihood of going to heaven based on a pseudo-scientific belief in God metric. How much do you believe in God? And based on that belief, you will or will not go to heaven, or you could end up in purgatory. The goal was to convince kids that by saying God doesn't exist, God wouldn't be there for you, and heaven's doors would shut for you. However, if you have never questioned the existence of God or thought about a life without God, those holy doors would be open. After this lesson, I asked Mr.Mulè if I would go to heaven as someone who doesn't believe in God, because based on the graph we just looked at in class, I was certainly going to hell, or at least I thought I would.`,
  },
  {
    k: 'p',
    text: `I will never forget his response because, keep in mind this is my first day of religion class, he said something like "No, of course you will not go to hell. Never say you don't believe in God, stay open to God, and your Faith in God will grow". I kind of just agreed and walked off. Now I realize how impactful these vague theological teachings were. I don't believe in God, but I don't dismiss God. I've cheekily prayed in dark, desperate times for some reason that I have no way of explaining. Some irrational, almost trauma response to being told that you shouldn't close doors to the unknown just because YOU don't know.`,
  },
  { k: 'p', text: `They believe in the ambiguity of God. Ambiguity = Faith` },
  { k: 'h', text: 'Atom (pronounced A-dam) (TAoF.01)' },
  {
    k: 'p',
    text: `Commonly, the beginning of time is known as the Big Bang, a theoretical event proposed by [Georges Lemaître](https://www.pbs.org/wgbh/aso/databank/entries/dp27bi.html) (1894-1966) in 1927. Lemaître, a Catholic priest and physicist, was obsessed with Einstein's theory of general relativity. After earning his PhD at the Catholic University of Louvain in 1920 and completing postdoctoral work at Cambridge and MIT, Lemaître returned to Louvain, where he developed his expanding universe theory in the mid-1920s (later in his career, Lemaître rose to monsignor, but his groundbreaking cosmological work predated this ecclesiastical honor). With no way to prove the universe's constant expansion, Lemaître waited two years until Edwin Hubble discovered that galaxies were moving away from Earth at high speeds, a speed now known as "Hubble's Constant". Lemaître used this discovery as evidence to support his theory, and many scientists quickly agreed.`,
  },
  {
    k: 'p',
    text: `Lemaître then took his theory one step further; he claimed that if all galaxies move away from Earth, there must be a start, or an explosion point containing the "primordial atom" that once held the entire universe (God). The Big Bang represented a beautiful moment of improbable and yet possible creation. A scientific answer for the unknown wrapped up with a bow. Unlike Lemaître, Einstein believed a universe built on probability felt too much like chaos masquerading as order. When Lemaître first presented his 1927 paper proposing an expanding universe, Einstein disagreed strongly with the physical interpretation, saying it was "abominable" (Lambert). A major point of contention between the two was the similarity to theological singular points of creation, which to Eistien seemed highly improbable. In 2025, physicists increasingly admit that Einstein might have been onto something. The Big Bang has lost its accepted narrative and become a probable, repeatable, most likely repeated already, event. This tension between the rational and the religious that Einstein embodied remains unresolved and metastasized through the field. A desert wanderer finds the mirage of fresh water that tastes like terminal dehydration.`,
  },
  {
    k: 'p',
    text: `Quantum entanglement is "the idea that particles of the same origin, which were once connected, always stay connected" (NASA, 2025). Einstein did not like this phenomenon, calling it "spooky" since it disagreed with a core tenet of his theory of special relativity that nothing can move faster than the speed of light. Entangled particles can have the same origin point, but stay connected no matter when or where in time and space they separate. Einstein's "spooky" description is observationally accurate; to his knowledge and experience, nothing could explain how something could move faster than the speed of light. Is it moving faster than the speed of light?`,
  },
  {
    k: 'p',
    text: `Scientists are still working on the measurement problem. We know that entangled particles can be measured only once the wave function collapses (Hossenfelder, 2020), like the reaffirmation of faith through mundane miracles and natural phenomena that can only be measured by the observer with faith. Some quantum-theological phenomenon occurs when you need God the most. In The Emperor's New Mind, Roger Penrose explains determinism in quantum physics, the idea that everything since the Big Bang has been encoded and pre-determined from that holy point. Scientific Calvinism.`,
  },
  {
    k: 'p',
    text: `In a letter to Ernst Strauss, Eisnstien asked, "What I'm really interested in is whether God could have made the world in a different way" (Kuznetosov, B. G., 1977).`,
  },
  { k: 'h', text: 'How does science rely on faith?' },
  {
    k: 'p',
    text: `Faith requires the unknown, and often, scientific theories become truth-fact, sweeping assumptions, and unproven math acting like holy texts. With a deep connection to the Catholic Church, Lemaître's theory feels like a direct rip of Genesis, an explainable starting point with a story, meaning, and most importantly, US. The paradox of beginnings is defining what came before, and if God doesn't play dice with the universe, does he play blackjack?`,
  },
  {
    k: 'p',
    text: `God probably gets embarrassingly drunk while playing poker or craps at the "cosmocino," losing primordial chips without a care in the world–a gambling addict with nothing to lose, constantly rerolling with faith that eventually he might land triple sixes, but what magic ritual will God perform to ensure the predestined outcome of each dice roll? We can't find the cosmic casino, even with NASA's James Webb Telescope (JWST), which has helped scientists learn more about our beginnings in the last five years than in the previous thirty. **Learn more = uncover new unknowns and ask new questions.**`,
  },
  {
    k: 'p',
    text: `Scientists expected the early universe to be chaotic, sparse, and immature. Instead, JWST found well-formed galaxies where only gas and remnants from the Big Bang were supposed to be. These findings forced the hand of existing cosmological models, forcing theorists to return to the drawing board. What does that tell us? We hoped the universe looked a certain way and fit our equations, but we were wrong. How could fully developed galaxies form so quickly after the Big Bang? Galaxies at the edge of the observable universe are known as Little Red Dots because, through JWST, they appear as tiny red dots made up of dust and gas, glowing red due to the red-shifted light, with wavelengths stretched thin, they appear red. These small galaxies defy our understanding of planet formation, galaxy formation, and the start of our universe. But scientists rewrite the scripture instead of abandoning the search for definitions and theories of everything. Adjust the constants. Tweak the models. Revising becomes a liturgy masking a simple truth: We (they (the scientists)) do not know that much.`,
  },
  {
    k: 'p',
    text: `We will always continue to alter the math, changing our cosmological and theological theories about our fantastical beginning, not because we know, but because we have faith that beauty equals truth. And why? **Because, like religion, science craves parsimony.** Humans want the simplest story to be true. We want one neat god. One bang. One theory of everything. It is not about what is right. Theories of everything rely on what is narratively irresistible to the theorist. JWST didn't just show us new (old) galaxies. It showed us our assumptions stretched thin.`,
  },
  { k: 'p', text: `Our Faith becomes redshifted.` },
  {
    k: 'p',
    text: `When science meets surprise, it does not collapse. Instead, science contorts, re-ritualizes, and survives through faith in ambiguity.`,
  },
]

const gentrification: Block[] = [
  {
    k: 'p',
    text: `Digital spaces have shaped my real-world experiences. Born in 2000, the Y2K era, I have firsthand experience of the impacts that transformative information technology had on my brain and skills. My generation (Gen Z) sits in a unique position: although technology has been accessible and integral in our personal development in ways previous generations weren't, our most formative years were not dominated by hyper-consumerism and doom scrolling because the tech just wasn't there yet. Gen Z is the coin in mid-toss, the unobserved quantum state that becomes paradoxical once measured. We have skills from the past that seem to be fading quickly in our present. Today research writing, critical thinking, and reading, skills that influence our intellectual agility in online spaces and help us use digital tools to amplify our human skills, but this is rapidly changing.`,
  },
  {
    k: 'p',
    text: `I didn't have a smartphone until I was 13, which may sound young to a 40 year old, but in 2025, a 5-year-old born in the midst of COVID would be deeply confused or become aggressive without access to a smartphone, iPad, or personal computer. I had projectors in class, written exams, and a fear of my teachers. I had computer class where typing, searching, file management, and safe practices online were taught to a room of students who mostly had zero access to personal technology at home.`,
  },
  {
    k: 'p',
    text: `There was one girl in my fourth-grade class who was very snobby, but rightly so. She was a child actor. I remember learning about 30 Rock, specifically because she was in one episode. She always acted older, even though she was four feet tall. She was the first girl I remember seeing wear a purse to school instead of a school bag.`,
  },
  {
    k: 'p',
    text: `One day, her purse started to vibrate and sing. Her phone was ringing. It was some early 2000s, Akon-esque ringtone that blasted across the classroom while we all sat cross-legged on the square, gridded rug. She shot up quickly and ran to her bag to silence her phone. The whole class, including the teacher, was in shock. A phone? We all thought it was crazy; not one person I knew had a phone. I had a Game Boy, but no phone. The freedom to communicate and the privilege of freedom were gained through age and experience, and she was more independent, mature, and experienced than the rest of the class. She walked home from school to her home nearby, would audition for parts, and needed to communicate with her mother; her explanations were far from shared experiences that any of us nine year olds could relate to.`,
  },
  {
    k: 'p',
    text: `I finally got a phone in middle school, and the main reason was for communication in case of a disaster. Not an iPhone or smartphone, a Samsung Rugby flip phone, a phone without apps and the hardest phone to break. I was so happy. Now I was walking, taking the bus, train, or even biking to my new middle school further away. Suddenly, the phone was like a "skill tree" unlock in my inventory. When I was given my first phone, my mother told me that she remembered when her parent got her a personal landline, which was a huge deal at the time—instead of having to share the home phone, she could now receive private calls directly to her room. As an 11-year-old, I laughed, but now I see how my generation may be the last to experience this kind of restriction and privilege that was previously shared intergenerationally. Now, many parents stick phones in the hands of babies like pacifiers to silence responsibility and create an environment of immediate solutions. At least the worst case scenario for a pacifier is buck teeth, not a lifelong dopamine-dependency to screens.`,
  },
  { k: 'h', text: 'Whats Changed?' },
  {
    k: 'p',
    text: `Over the last 15 years, I have watched the city I grew up in change dramatically. Gentrification is the process of public and private property development that uses rezoning and redlining to displace low-income individuals and families through the veil of progress, urban development, and neoliberal safety.`,
  },
  {
    k: 'p',
    text: `Just like Brooklyn, the internet I grew up with has been gentrified. Chopped and changed, all for better (more intrusive) data collection, addictive user experiences, and predictive advertising. I miss the old Youtube, a digital space that was once ad-free, educational, and hilarious. Even Instagram was once an ad-free platform where my friends and I would post silly snapshots of our lives, share overly written, angst-filled paragraphs full of tears, but once acquired by Meta, previously Facebook, ads became synonymous with the app. X was actually usable; it was also called Twitter. There were less bots, less porn, less gore, and no Grok AI. Twitter shaped our generation's humor and wit. Subliminally forcing our thoughts into quick, digestible quips that turn personal observations into collective, cultural truths. Twitter even redefined how protest movements scale internationally by offering a place where humans can post real-world footage of the horrors not seen across the world.`,
  },
  {
    k: 'p',
    text: `Today, you can still do all of this on the internet, but not without ads ads ads ads ads ads ads ads, and constantly checking that media you watch isn't some Baudrillard-esque simulacrum of uncanny AI-generated videos.`,
  },
  { k: 'p', text: `The internet kinda sucks. Like Majorly.` },
  { k: 'h', text: 'Holy Advertising' },
  {
    k: 'p',
    text: `Growing up with a Welsh father, I've seen too many James Bond films. As a little boy, it takes maybe twenty minutes of Bond driving a DB9 for a ten year old to fall in love with Aston Martins. After a decade of watching them together, that line—"a vodka martini, shaken not stirred"—became liturgy. Bond is defined through his luxurious taste and his paradoxical lack of respect for luxury: Aston Martins destroyed, Omega watches turned into explosives, Vesper martinis thrown into the eyes of enemies. When Ian Fleming wrote these details, they were character. When I was finally allowed to watch Casino Royale (2006) with Daniel Craig, I was amazed—it rebuilt the identity of a character I thought I knew.`,
  },
  {
    k: 'p',
    text: `Then Skyfall came out in 2012, and Bond drank Heineken. Beer. The advertising was suddenly clear. It was rude, in-your-face. Bond felt defiled and suddenly, American.`,
  },
  {
    k: 'p',
    text: `Gen Z spots product placement like waldo on a blank page; there is no respect for the advertising, especially if it tries to hide. Wayne's World was ahead of its time. The Pepsi scene is famous for its self-aware writing and cultural critique wrapped into a simple joke in which Wayne talks about "Never selling out" to big business while breaking the fourth wall and taking a big ol' sip of Pepsi. The product is advertised without ever saying the word Pepsi. It's excellent writing, and physical comedy displayed through this protestful silence and direct ignorance, Wayne silently says fuck Pepsi, I hate doing this—but it has to be done. This is deeply honest and scarily accurate of our modern experience.`,
  },
  {
    k: 'p',
    text: `Scroll through TikTok for one minute, and you will see the strangest examples of product placement. Ads have extended to an unknown individual. Micro-celebrity and influencer ship have given everyone access to these kinds of product deals. When the American Dream shifts from a meritocratic rise in class and status through labor to becoming an influencer with 100k+ followers, commodifying one's life and getting paid to promote products from home, advertising suddenly reaches a new level of sublime. I say this because sometimes I mention a product or problem I have, and suddenly, ads for that product or a related product appear on my social media. My anger peaks when these ads bleed into my smart TV, "smart".`,
  },
  {
    k: 'p',
    text: `We experienced the gentrification of digital spaces firsthand, and much like the physical world, these spaces are rebuilt with the goal of profit. Sadly, I think my entire generation feels this way; our collective disappointment with technology is met with complacency and stagnation. Toes and nose kissing the wall with just enough space between the wall and your mouth for the lips to move and say "lol".`,
  },
  {
    k: 'p',
    text: `There is a cynicism in Gen Z that is lost in the younger, new generation. Alpha. These children grew up in gentrified digital spaces. iPads at four, unmonitored time spent browsing YouTube, and the hilarious parental confusion I have no sympathy for. Children today face novel issues, such as screen dependency, by the age of 5. You sit at the restaurant and watch tables of parents conversing over silent children, their eyes glued to iPads or phones, a passive degradation. Terrible parenting, yet you can't blame Millennial parents for poor technological oversight of their children. These parents are first-wave lab rats dealing with new kinds of parental dilemmas: give Timmy the iPad and zone out, or take the iPad from Timmy and try to parent him while he has crack-addict-like withdrawals from the iPad I got him for Christmas. When you build your coffin, don't be surprised when the lid doesn't fit. I am eternally grateful that in the most random act of birth and conscience, I was privileged enough to be born with a dad who loves technology.`,
  },
  { k: 'h', text: 'Liminal Kids' },
  {
    k: 'p',
    text: `In the late 90's through the early 2000s, my dad owned and ran an internet cafe in Carroll Gardens, Brooklyn called Merlin Web. Ahead of its time, customers could come and use desktop PCs for their basic needs, like printing, emailing, or simply surfing the web, on accessible computers. The main focus was on offering web development services to local businesses seeking to modernize in the new internet era with online, digital storefronts. Merlin Web would build these websites, handle the maintenance and upkeep required post-build, and in any moment of free time in between, game. He worked with friends, all tech-savvy programmers and coders in love with the digital world. As much as they worked, I think they probably gamed five times more. I was there a lot.`,
  },
  {
    k: 'p',
    text: `I grew up consuming sci-fi media and watching him play StarCraft, Lord of the Rings Online, anything Valve-related either at Merlin Web, or at home. Me peeking over his shoulder, watching his intense focus. I felt like I was learning from a master. It wasn't long until I myself was playing with him and his buddies through late hours on weekends, playing what seemed like infinite Minecraft with my friends, on a server hosted, moderated, and regulated by dad, or reversing roles with my dad over my shoulder, coaching me through puzzle games like Portal after dinner, rugby matches, and chores. Never giving me the answers, but helping me stay calm and hungry for the challenge, rather than frustrated by the deaths and disappointments. I grew up around people who contributed to making the internet what it is today, always asking questions about the internet before I was born, trying to learn more about the complexities hidden behind the screen. His love for, and relationship to, technology was massive; it meant that when Mom begged me to get off my DS because I was playing too much Pokémon Diamond, he was able to mediate with the compromise of: "let him save at the next checkpoint and he will get off," and I did. It's that understanding and experience that helps parents give kids the respect needed to grow out of childhood while reinforcing parental rules and good habits that help teach self-control. Most importantly, my dad shaped me into a skeptic; he believes in questioning, often explaining (without using this term) how the internet is a dual-use technology.`,
  },
  {
    k: 'p',
    text: `Data privacy has been a topic that has been in my brain since, forever. My dad has always been an advocate for digital rights, data ownership, transparent development, and to this day contributes to the Fediverse. From an early age, he made it clear that there are responsible and irresponsible ways to use the internet. I was taught early how to manage cookies and do my best to stay in control of my online presence, but there is only so much he (I) could do: to sign up for The Facebook in 2010, users were required to be aged thirteen+ to sign up, but with absolutely zero way to enforce this rule, minors (like myself) flooded the platform with fake birthdays and fake names. I could definitely hear the confusion and disappointment in his voice when he called asking me about a Facebook profile using my face in the profile picture, but named Ieuan Ng (my name is Ieuan king). What do I mean by disappointment? If I had made a Facebook account, and successfully kept it hidden until I was 13 (he had access to my emails, history, blah blah blah), I honestly think that his programmer brain would have been proud if I had kept it secret successfully, so the missing "Ki" from "King," and a profile picture that was clearly my face encouraged disappointment. But this is how it goes 99% of the time.`,
  },
  {
    k: 'p',
    text: `Unlike my dad, I had access to social media and mature videos on the internet at the age of 10, not 27. Beheading videos on LiveLeak, horrific gore on r/gore and 4Chan, we were desensitized early, but we weren't iPad babies. Like my dad, we witnessed and helped create the social media platforms that today, dominate our lives. Through fifteen years of iterations, failed UI designs and features, or data-privacy lawsuits. It should be clear to everyone why Gen Z kids are black-pilled skeptics who meme about 9/11 and feel paradoxically complacent and unable to cause change when sedation and accessible modern horrors become daily rituals packed into the act of doom scrolling.`,
  },
  {
    k: 'p',
    text: `Digital spaces have shaped the way that I, and many other Gen Z children, developed socially, academically, and personally, but unlike the generation below me, Gen Alpha, we remember that liminal space between integration and inception. When the wired was polylithic, fluid, and user-focused. I am eternally grateful to have grown up in this timeline, but what happens when recent history becomes a nostalgic fantasy? Generation Alpha represents a paradigm shift in childhood and adolescence, moving from unstructured, creative development—to—stimulating, structured development through digital activities.`,
  },
  {
    k: 'p',
    text: `Less time outside, less time together, kids born in generation alpha dont play together as much, and i'm trying so hard to not sound boomer (old, for you boomers), but our experiences as Gen Z kids have much more in common with our parents. As an American born in 1967, my mom grew up with TV in the house, she had a record collection, and eventually a personal landline. This is essentially my childhood experience just with better video games, and not because the technology didn't exist. It did. My parents just understood how to regulate, monitor, and advise me through these phases of my life because I wasn't freaking out in public when I didn't have an iPad, or struggling to make friends and play outside. My parents could barely contain me from leaving the house at any moment possible to go play in the park with my friends. Even when we had phones, the best use case was talking with my friends, setting up hanging out, then hanging out and doing stuff not related to the phone. Like pranking people on the streets, goofing around in the park being reckless teenage boys, we even made a game called sewage ball that is a mix between european handball and basketball because we spent so much unstructured time together.`,
  },
  { k: 'h', text: 'Building A Future We Remember—Not The One We Want.' },
  {
    k: 'p',
    text: `We saw the warnings. We loved the warnings. Then we built them anyway. My dad raised me on Philip K. Dick—movies, books, video games, anything that explored what technology might do to us. I grew up loving Blade Runner, Total Recall, Minority Report the list is long, but I will always remember how deeply impactful WALL-E was for my dad. We watched in theatre together, and still, WALL-E pops into my brain often, like a sad memory of future I shouldn't remember.`,
  },
  {
    k: 'p',
    text: `WALL-E is a children's sci-fi movie set in a future where humans have become obese, sedentary, and dependent on technology in a world ravaged by pollution and greed. When me and my dad left the theatre, it was clear that he was moved by the film. I remember how he described WALL-E as ahead of its time and mature for a kids' film. He was right; it took years, but subliminally, WALL-E showed me, and a generation of children raised online, what the outcomes of consumerism, digital dependency, and techno-feudalism could do to our precious home. Earth.`,
  },
  {
    k: 'p',
    text: `When I think back to all those amazing films my dad showed me, a paradox is very quickly revealed: When the future is depicted through media, the viewer subliminally creates future expectations, and the scope of possibility narrows. My dad's generation (Gen X) helped build the modern internet and lost control quickly, suddenly what was the wild west became the most effective demography tool and predictive purchasing platform. They didn't avoid their favorite sci-fi dystopias, they unintentionally built the futures that were offered as warnings and misinterpreted as entertaining.`,
  },
  {
    k: 'p',
    text: `We aren't waiting for the dystopia: Modern technology is dystopian but uncannily familiar. It pains me to rewatch a Gattaca, Blade Runner, or Minority Report when predictive policing, gene editing, and AI humanoid-robots are all ethical tech-dilemmas happening in our lives today, and somehow it feels like some confusing, consumer-core, reverse mandela effect where we literally remember futures from the past.`,
  },
  {
    k: 'p',
    text: `Even with movies like Idiocracy, which paints a similarly dark future where humans have lost intellectual skills due to technological-dependence, or The Matrix a movie that redefined how we visualize these themes in futuristic ways like "bullet time", but when stripped to the core, all these movies warn us about the relationship that humans have to both technology and digital space—yet I have to grow up in a millenial-built, Gen X-funded hell where the internet operates as this brown entity of dual-use tech that is both amazing and dangerous. The entrepreneur-millennials doubled down on this future, they pacify humans with technological binkies, uncontrolled access to social platforms, and build datamines for predictive purchasing models.`,
  },
  {
    k: 'p',
    text: `I bet the Zuck, Altman, Musk, and the whole lot of them share love for my favorite films/TV shows like the Matrix, Blade Runner, Battlestar Galactica and so on—but to me these movies are horrors. Warnings, not fantasies.`,
  },
  {
    k: 'p',
    text: `This take isn't original, I know. But how many people will have to vocalize these worries before we recalibrate our development philosophies around change, not progress. Will it take 7000 crispr-made babies before we realize that gene editing goes hand-in-hand with eugenics (Gattaca)? The same goes for Neural Link (EyePhone, Futurama), Generative AI romantic partners (Her), and humanoid robots for hard-to-do physical tasks (Moon).`,
  },
  { k: 'h', text: 'A Whole Lot Of Nothing.' },
  {
    k: 'p',
    text: `NEO is one of many newly announced autonomous robots built for home chores like vacuuming, dusting, putting away the dishes, opening the door, really just anything cleaning related. NEO may be extremely helpful for individuals who struggle with physical disabilities or mobility issues, 1X clearly believes that NEO will help the elderly. Sure.`,
  },
  { k: 'p', text: `But how does NEO work? Is it truly autonomous?` },
  {
    k: 'p',
    text: `Of course, 1X makes it is insanely difficult to understand, luckily I do. Although written everywhere possible on their website, the "autonomy" the NEO is capable of, is purely theoretical, and most likely is straight buns (not good!). 1X does an excellent job of using positive language for questionable tech, a classic move. For example: 1X's NEO can be set to "Expert Mode" where "NEO works autonomously by default. For any chore it doesn't know, you can schedule a 1X Expert to guide it, helping NEO learn while getting the job done." (1x.tech) Schedule an expert? What is an expert?`,
  },
  {
    k: 'p',
    text: `An Expert is a human. Not an expert human, or an expert in any specific task. This expertise pertains to the intrinsic human qualities that robots like NEO lack. 1X plans to have tons of "experts" (underpaid humans) guiding and training these anthropomorphized robots for an eventual autonomy. This is called puppeteering, the training method where humans use their physical, real-world body to train physically, real-world-capable robots. While this may sound effective, I believe this may be one of the scariest techno-feudal ideas I have heard. 1X is silently proposing a business model where wealthy individuals purchase robots that they can order around 24/7 to do basic chores around the house. Now this would be all good and fun if these robots were not being controlled by humans, most likely international, underpaid, and turned into faceless slaves.`,
  },
  {
    k: 'p',
    text: `Joanna J. Bryson's piece, Robots Should Be Slaves (2009) brilliantly explains how and why robots should be tools not friends. I don't think Bryson was prepared for a future where the robots built for slavery are also controlled by humans out-of-reach. This framework avoids what Bryson warns us about in 2009.`,
  },
  {
    k: 'quote',
    text: `Why do people want robots to be peers? Is it perhaps because they want a 'peer' that will never argue, or at least never be smug when it wins? A fairy god-parent smarter than themselves that they can nevertheless ultimately boss around and pen up like a pet dog? If so, such narcissism is probably mostly harmless, and perhaps a good thing for the dogs. But in a liberal democracy we tend to think of every citizen's life and mind as a valuable resource. Wasting that resource 'socialising' with artifacts would be a great loss.\n\nRobots should rather be viewed as tools we use to extend our own abilities and to accelerate progress on our own goals. An autonomous robot definitionally incorporates its own internal motivational structure and decision mechanisms, but we choose those motivations and design the decision-making system. All their goals are derived from us.`,
    cite: 'Bryson, 10-11',
  },
  {
    k: 'p',
    text: `Today we live in this reality, humans complaining that GPT 5.1 was less agreeable and more robotic. Less human. Like the techno-pacifiers millennials stuff into the fingered mouths of children, generative chatbots are eroding human-skills rather than amplify them—and this is deeply confusing. When we grow up suffocated in fantastical warnings and red flags, shouldn't these futures be avoided? I hope WALL-E scared Gen Z kids like it scared me. Humans should avoid being stuck in this collective-psychosis where we build a future we remember instead of the one we want.`,
  },
]

export const WRITING: WritingEntry[] = [
  {
    title: 'A Benchmark Measurement Problem',
    type: 'Essay · AI',
    description: '95% of orgs achieve zero measurable return from generative AI, and why.',
    href: 'https://www.akaoss.dev/paper',
  },
  {
    title: 'The Pursuit of Parsimony [Pt.1]',
    type: 'Essay · Science',
    description:
      'When science meets surprise it contorts and survives through faith in ambiguity.',
    slug: 'the-pursuit-of-parsimony',
    deck: 'Truth through the ambiguity of faith.',
    published: 'Part one of an ongoing series',
    body: parsimony,
  },
  {
    title: 'Of Course',
    type: 'Essay · AI',
    description:
      'On Sam Altman announcing ChatGPT will provide generative erotic services to mature users.',
    href: 'https://kraa.io/306857605553134592',
  },
  {
    title: 'Digital Gentrification',
    type: 'Essay · Tech',
    description: 'Notes on transformative information technology, from a Y2K kid.',
    slug: 'digital-gentrification',
    deck: 'Some thoughts about my childhood, technology, and other things. //erosion',
    published: 'Written from Brooklyn',
    body: gentrification,
  },
  {
    title: 'Research feed',
    type: 'Ongoing · akaOSS',
    description: 'Working notes and papers as they go up, on the studio site.',
    href: 'https://www.akaoss.dev/research',
  },
]

/** Only the pieces that live here, for the route to build itself from. */
export const WRITING_PAGES = WRITING.flatMap((entry) =>
  entry.slug ? [entry as Extract<WritingEntry, { slug: string }>] : []
)

export function getWritingPage(slug: string) {
  return WRITING_PAGES.find((entry) => entry.slug === slug)
}

/** Where an entry points: its own page here, or wherever it was published. */
export function writingHref(entry: WritingEntry): string {
  return entry.slug === undefined ? entry.href : `/writing/${entry.slug}`
}
