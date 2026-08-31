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

/*
 * The Ubik newsletter post, rebuilt from the archived PDF. The words are the
 * post's own, lightly copyedited; the one link that could be recovered from
 * the export is the MIT study. It reads as an artifact of early 2025, present
 * tense and all: the deck marks it as an archive, so the text does not
 * apologize for being one.
 */
const amplifying: Block[] = [
  { k: 'h', text: 'Human Intelligence > Artificial Intelligence' },
  {
    k: 'p',
    text: `A deep dive into the architecture of Ubik and how our design philosophy amplifies human intelligence.`,
  },
  { k: 'h', text: 'The Cognitive Cost' },
  {
    k: 'p',
    text: `MIT is conducting an ongoing [neurological study of brain activity in ChatGPT users](https://www.media.mit.edu/projects/your-brain-on-chatgpt/overview/) while they use the AI chatbot to complete tasks. The study has three groups: ChatGPT allowed, search engine allowed, and brain only. The three groups are tasked with writing an essay using (or not using) the provided tools. MIT's early findings are concerning. Compared to the brain-only group, LLM-assisted writers were unable to complete writing tasks effectively or efficiently, and most didn't remember what they had previously generated or written. When tasked with using their brain, they struggled dramatically compared to the brain-only group, which thrived when using ChatGPT after the swap.`,
  },
  {
    k: 'p',
    text: `What does this mean? MIT's early data shows that LLM-dependent brains struggle without LLM assistance after exposure, or while using the LLM, which isn't surprising. **Using ChatGPT is like binge-watching your favorite show while doom-scrolling on TikTok.** Humans struggle to focus and remember information without friction between them and the content. Generative tools are novel in this way: a calculator cannot solve my problems without my knowledge of the formula, but one prompt to my AI friend ChatGPT and suddenly I've "written" a ten-thousand-word research paper that proves our universe is inside a black hole, as if I were a trained astrophysicist **(I am not)**.`,
  },
  {
    k: 'p',
    text: `Critical thinking skills and intellectual agility crumble when we treat AI as an oracle, so we should build tools that amplify human intelligence rather than outsourcing cognition.`,
  },
  { k: 'h', text: 'What is Ubik?' },
  {
    k: 'p',
    text: `Ubik is the first AI Research Environment (AiRE). With context-aware agents, access to academic databases, and robust human approval, Ubik unlocks AI for citation-based workflows while helping build critical thinking skills: AI as a tool, not a crutch.`,
  },
  {
    k: 'p',
    text: `Unlike available AI agents, models, and platforms, **Ubik agents can index, organize, and search through PDFs, create notes, and highlight text to the line level.** This improves agentic capabilities, minimizes hallucination, and makes LLM-assisted work usable in high-level research and publishing. How does Ubik do this?`,
  },
  {
    k: 'p',
    text: `**Agent orchestration.** We build our agents optimized around their environments, not a specific model, making it easy to run them in the cloud, on devices, and eventually with local models.`,
  },
  {
    k: 'p',
    text: `**Dynamic context engine.** Our special sauce for structured knowledge bases, geared toward research workflows and knowledge generation. This helps the AI and the human understand the larger project at hand, as well as any research criterion: citation styling, topic area focus, finding new sources, the context of a project.`,
  },
  {
    k: 'list',
    items: [
      `Not just embeddings or semantic search!`,
      `Custom document parsing and enhanced OCR for in-text citations and transparent AI output.`,
      `Agentic analysis to extract, understand, and mark up documents beyond single questions.`,
      `Like Cursor, Ubik knows your workspace. For improved accuracy, it references all files and agent-made items (notes, canvas) while prompting, using the @ symbol.`,
    ],
  },
  {
    k: 'p',
    text: `**Custom eval suite.** The Ubik evaluation suite for knowledge work and evidence attribution is designed to understand agentic performance as a research collaborator for high-level research. This covers tasks like:`,
  },
  {
    k: 'list',
    items: [
      `Searching for new sources and working with gathered documents.`,
      `High-level writing and cross-document work, for publishing academic research.`,
      `Synthesizing research and keeping citations correct.`,
      `Compiling evidence for literature reviews and exploration.`,
    ],
  },
  {
    k: 'p',
    text: `Our complete dataset of examples and gold truths, showing the highest possible quality and accuracy in output by Ubik agents, will be open-sourced for other AI developers to reproduce and test.`,
  },
  { k: 'h', text: 'Why Ubik?' },
  {
    k: 'p',
    text: `Ubik is designed and developed from iterative real-world user feedback and product interviews with potential and current users. All tech is built in-house, and we are proud to contribute to the space while helping researchers and writers use AI in their work today.`,
  },
  {
    k: 'p',
    text: `Since inception, we have focused on using AI in **non-generative** ways. As researchers and recent graduates, the launch of ChatGPT left us astonished, excited, and worried about a future in which humans over-rely on **generative AI tools**.`,
  },
  {
    k: 'p',
    text: `We believe that high-quality AI output depends on skilled human guidance, and that the rise of over-accessible, query-response AI chatbots will reduce critical thinking and cognitive skills in early learners and professionals. If using generative AI tools before acquiring field-specific skills is broadly adopted, we expect to see declines in the quality of citation-based writing, a slowdown in scientific breakthroughs, and an overall weakening of the human-AI relationship.`,
  },
  {
    k: 'p',
    text: `So we started interviewing educators in NYC, across high school and higher education, and professional researchers around the country, to understand **why AI was or wasn't working in their fields** and **what a successful AI tool would look like**.`,
  },
  { k: 'h', text: 'What were our takeaways?' },
  {
    k: 'list',
    ordered: true,
    items: [
      `Without **consistent and trustworthy citation attribution**, AI is **unusable** at the highest level of research and the lowest level of learning.`,
      `Without **PDF interactivity and annotation tools**, AI agents **don't help humans turn information into knowledge**.`,
      `High-level research is **not disposable** and **requires human wisdom and creative thinking**.`,
      `Successful AI for research **must help build knowledge bases** that last **more than one chat session**.`,
      `High-level researchers value accuracy over efficiency: **high quality > speed**.`,
    ],
  },
  {
    k: 'p',
    text: `From the lowest level of learning to the highest level of academia, AI chatbots were unreliable tools for educators, students, and professionals. Some teachers even said they rely on handwritten student essays, early in the year, to use as reliable sources of writing level standards per student, since generative AI has reduced the trust from teacher to student. If new technology moves us backward, how is it progress?`,
  },
  {
    k: 'p',
    text: `Our interviews confirmed humans need tools that position them in the driver's seat, not the passenger seat.`,
  },
  {
    k: 'p',
    text: `**But what would an AI environment for research look like?** We dove into our favorite tools and apps that help us produce work in any medium:`,
  },
  {
    k: 'list',
    items: [
      `Integrated Development Environments (IDEs), like Cursor.`,
      `Digital Audio Workstations (DAWs), like Ableton.`,
      `Cloud-based storage systems, like Google Drive.`,
    ],
  },
  {
    k: 'p',
    text: `A theme appeared: although these different forms of digital development software are used for various media and come packed with automation tools, they require intense human approval and oversight for high-quality output.`,
  },
  {
    k: 'p',
    text: `**What does this mean?** Cursor can code everything for you using high-powered AI tools and LLMs. But through these highly accessible and overpowered systems, new coders (vibe coders) often struggle to explain or recreate their projects after generation: **Cursor is only effective if the human understands how to get to the final product without AI.**`,
  },
  {
    k: 'p',
    text: `Similarly, cloud-based platforms like Google Drive have defined Gen Z's academic life, changing how we store, organize, and access personal files. With integrated tools like predictive writing and text generation powered by Google Gemini, students can now produce pseudo-polished writing that previously would have been crafted without AI assistance and taken a bit longer. But the end product would have been higher quality, and the written text would be sticky in the author's brain: **good writing is not done by LLM chatbots, and text generation tools are only effective if a good writer is using them.**`,
  },
  {
    k: 'p',
    text: `This is a new jump in possibilities. All these platforms are highly effective for skilled professionals, since these powerful AI tools can help experts translate their ideas quickly and alone. But through LLM chatbots like ChatGPT, the production pipeline is inverted: users come with ideas generated in full and edited by a human or another AI agent post-hoc.`,
  },
  {
    k: 'p',
    text: `**Why is this important?** Because generative tools help experts and hurt beginners. Quick solutions to complex problems, without friction or interactivity between the initial prompt and the desired output, don't build cognitive skills in beginners that experts have mastered without AI (vibe code, vibe physics, vibe engineering: **vibe xyz = AI slop**). Unlike beginners, experts amplify their human intelligence because they can correct AI output and understand when the model or agent is unhelpful or hallucinating. This is **intellectual agility**, a critical skill for effective AI use.`,
  },
  { k: 'h', text: 'So, Who Uses Ubik?' },
  { k: 'p', text: `**Researchers** use Ubik today because:` },
  {
    k: 'list',
    items: [
      `They can quickly highlight text in PDFs, surface quotes in open-source papers, and confidently inject citations while prompting.`,
      `They can search for relevant papers using Semantic Scholar and arXiv.`,
      `They can quickly upload drafts, find errors, or expand ideas with relevant research.`,
      `They can use tons of models (we got 'em all).`,
    ],
  },
  { k: 'p', text: `**Writers** use Ubik today because:` },
  {
    k: 'list',
    items: [
      `They can use the best model for creative writing.`,
      `They can upload long-format papers and confidently annotate, edit, and change work at speeds impossible with current AI or alone.`,
      `They can inject quotes or highlight text in long-format papers.`,
    ],
  },
  { k: 'p', text: `**Scientists** use Ubik today because:` },
  {
    k: 'list',
    items: [
      `Ubik is the only platform that offers agentic PDF searching and in-file annotation.`,
      `Their work needs accurate evidence attribution and citation.`,
      `They need one central place to save citations and quotes, manage sources, and edit writing with agents that can search for relevant research and amplify their unique human intelligence.`,
    ],
  },
  {
    k: 'p',
    text: `We are incredibly proud that our initial design philosophy, and our focus on using AI in non-generative ways to amplify human intelligence, are helping our current user base search and analyze peer-reviewed papers and their personal files with AI.`,
  },
  {
    k: 'p',
    text: `We have demoed with educators, researchers, and professionals, and they praise Ubik for its human-first design that promotes engaging with information rather than unquestioningly trusting answers from AI chatbots.`,
  },
  {
    k: 'p',
    text: `Ubik is the best way to do research with AI, and our goal is to help set a new standard benchmark for multi-hop research tasks. A local Ubik desktop app will be available soon. We would love to demo the app over a call to anyone interested, but for now, check out the live beta website!`,
  },
]

/*
 * The kraa.io post, rebuilt with its screenshots. The words are the post's
 * own, lightly copyedited; the figures are the original images pulled from the
 * archived export into /public/ubik/archive. Links kept are the ones whose
 * destinations could be recovered with confidence (the benchmarks and the
 * products); the rest kept their words.
 */
const builtToLearn: Block[] = [
  {
    k: 'p',
    text: `AI tools have surpassed experts, professionals, teams, institutions, really anyone in fields that require accurate citation and evidence attribution in their high-level knowledge work.`,
  },
  {
    k: 'p',
    text: `**Legal teams, data and research teams, consultants and analysts, scholars and academics:** what do individuals and teams in these fields have in common? **They all work with files.** Many high-level knowledge workers either have large file collections built over long periods of time or the research skills to find, analyze, and cite trusted sources found through academic databases. These kinds of field-specific, expert-level skills are unreplicatable by chatbots and platforms like ChatGPT, Perplexity, or Liner that vary in accuracy, tool access, and context awareness. All are prone to hallucination in generated text when answering one-shot prompts without context, and perform even worse when working with uploaded text files. These platforms all rank highly on published benchmarks that evaluate LLMs and AI agents but, while:`,
  },
  {
    k: 'quote',
    text: `Benchmarks are important tools for tracking the rapid advancements in large language model (LLM) capabilities. [They] are not keeping pace in difficulty: LLMs now achieve over 90% accuracy on popular benchmarks like MMLU, limiting informed measurement of state-of-the-art LLM capabilities.`,
    cite: 'Phan et al., 2025',
  },
  {
    k: 'p',
    text: `This quote from [Humanity's Last Exam](https://lastexam.ai) (HLE) outlines why there is a clear need for more complex, human-like benchmarks used to evaluate LLMs in their accuracy and intelligence. Humanity's Last Exam is "a multi-modal benchmark at the frontier of human knowledge, designed to be the final closed-ended academic benchmark of its kind with broad subject coverage." This "exam" is publicly available for companies and researchers to evaluate their models with, to get a better understanding of how LLMs struggle with complex tasks. While there are many different benchmarks, few focus on multi-hop questions where reasoning and problem solving guide the model rather than searching and relaying information correctly. [HotpotQA](https://hotpotqa.github.io) is an early dataset for "diverse, explainable, multi-hop question answering," but this dataset was published in 2018, well before the powerful AI models and agents we have today. When one of the authors of this dataset recently said "Stop using HotpotQA for agent research" (Peng Qi), because:`,
  },
  {
    k: 'quote',
    text: `Like many question answering datasets of its day, HotpotQA is an extractive question answering dataset following the pioneering work in SQuAD, which means that the answer came directly from a substring in the Wikipedia context that supports the answer. While this leads to relatively easy-to-implement and objective evaluation metric, it leads to a format that is no longer natural for today's generative AI systems (or to real users).`,
    cite: 'Peng Qi',
  },
  {
    k: 'p',
    text: `Nearly seven years later, Humanity's Last Exam is built to show how far LLMs have to go before being capable at complex human tasks that require intellectual agility and multi-hop reasoning. This dataset tests "structured academic problems rather than open-ended research or creative problem-solving skills," which means we aren't testing for Artificial General Intelligence (AGI), or the ability for these models to complete deep research tasks autonomously. Instead, HLE helps researchers measure technical knowledge and reasoning.`,
  },
  { k: 'h', text: `How are frontier models scoring on Humanity's Last Exam?` },
  {
    k: 'img',
    src: '/ubik/archive/hle-progress.webp',
    alt: `Chart of AI progress on Humanity's Last Exam from late 2024 through early 2026, with frontier models climbing from under 10% to around 40% accuracy`,
    w: 800,
    h: 296,
    caption: `AI progress on Humanity's Last Exam, as the post charted it.`,
  },
  {
    k: 'p',
    text: `In 2025, no LLMs surpassed 50% accuracy on Humanity's Last Exam. With a title so bold this may sound like a relief at first, but these kinds of complex, multi-hop questions found in high-level research and academia aren't solvable with just a simple search and reply. HLE confirms that LLMs exceed in simple, disposable tasks that require low amounts of reasoning and problem solving. For example, there are publicly available benchmarks for academic deep reasoning like [GPQA](https://arxiv.org/abs/2311.12022) and [MMLU](https://arxiv.org/abs/2009.03300): models like Gemini 3 Pro and GPT-5 score over 90%, but the same models score below 40% accuracy when tested on the HLE benchmark.`,
  },
  {
    k: 'img',
    src: '/ubik/archive/benchmark-bars.webp',
    alt: `Bar chart comparing model scores on HLE, GPQA, MATH and MMLU: the older benchmarks sit near the top of the scale while HLE bars stay near the bottom`,
    w: 789,
    h: 393,
    caption: `The same models against HLE, GPQA, MATH and MMLU. The old exams are saturated; the new one is not.`,
  },
  {
    k: 'p',
    text: `When doing deep research or high-level knowledge work, humans need accurate, evidence-rich information that can be trusted and used in real, publishable work. These requirements prevent many experts and professional teams from integrating AI tools into their workflows.`,
  },
  {
    k: 'img',
    src: '/ubik/archive/simpleqa.webp',
    alt: `SimpleQA factuality benchmark bar chart with Liner Deep Research first at 95.3, ahead of Perplexity, Gemini 2.0 Flash, GPT-4.5, Grok 3 Beta and DeepSeek R1`,
    w: 800,
    h: 431,
    caption: `The SimpleQA factuality benchmark, with Liner's deep research on top.`,
  },
  {
    k: 'p',
    text: `[Liner](https://getliner.com) is an amazing way to quickly locate relevant papers for high-level knowledge work. It focuses on one-shot tasks that "help users **discover** reliable sources, **generate citations**, and **accelerate their learning**." Liner ranks first on the [SimpleQA](https://openai.com/index/introducing-simpleqa/) benchmark, an "OpenAI-accurate fact-checking search results" evaluation, and succeeds in delivering accurate answers with generated text that includes variations of direct quotes, citations, and links to relevant search results.`,
  },
  {
    k: 'p',
    text: `**Still, Liner fails instantly when working with files added to the context window.**`,
  },
  {
    k: 'p',
    text: `**Let's run this simple, one-shot prompt through Ubik Studio and Liner AI.** **Q:** Can you highlight important quotes in the file @entropy-25-00706`,
  },
  { k: 'p', text: `**Liner response:**` },
  {
    k: 'img',
    src: '/ubik/archive/liner-response.webp',
    alt: `Liner with the entropy paper open in a PDF viewer and a chat panel apologizing that it cannot highlight text in PDF files`,
    w: 800,
    h: 471,
  },
  {
    k: 'quote',
    text: `I apologize that I cannot directly highlight text in PDF files, as this capability is not available in my toolset. However, I can provide you with a comprehensive and organized list of the most important quotes from Arkady Plotnitsky's paper "The No-Cloning Life: Uniqueness and Complementarity in Quantum and Quantum-like Theories," organized by major themes and with specific section references to make it easy for you to manually locate and highlight them.`,
    cite: 'Liner',
  },
  {
    k: 'p',
    text: `The Liner agent then generates a list of quotes found in the paper with an attached source document that lists these quotes. However, these quotes cite text that cannot be verified (I am unable to click on this text or confirm its placement in the file), and with a bit of CMD+F it becomes clear the quotes read as if they were direct pulls from the source, added to the context window. This is both useless and hurts reputations in professional fields where cited information and accurate evidence attribution are integral and required.`,
  },
  {
    k: 'p',
    text: `Liner claims it is accurate and trustworthy, but when the generated output isn't 100% correct in its evidence attribution when relaying quotes from published works or generating analysis, I have to go through the files again to constantly verify that my assistant is providing me with correct information. This creates a paradoxical interaction between me and the AI chatbot. I pay for subpar assistance, but I'm left to deal with my problems (which don't get solved), and ultimately, I end up doing more work because the chatbot is less effective than I am at solving or completing my problems and tasks.`,
  },
  {
    k: 'p',
    text: `Current AI tools are built to learn, not to help. Models learn more from you than you from them, and that is ridiculous.`,
  },
  {
    k: 'p',
    text: `**Let's run the same prompt through Ubik Studio with the same paper.** **Ubik response:**`,
  },
  {
    k: 'img',
    src: '/ubik/archive/ubik-response.webp',
    alt: `Ubik Studio with the same paper open, abstract and introduction highlighted in place, and the agent's key highlights listed in the panel on the right`,
    w: 800,
    h: 468,
  },
  {
    k: 'quote',
    text: `Perfect! I've successfully extracted 8 important quotes from "The No-Cloning Life: Uniqueness and Complementarity in Quantum and Quantum-like Theories" by Plotnitsky.\n\nAll notes have been created with precise page references and contextual analysis. Would you like me to retrieve the full text of any of these quotes, or would you like me to create a document synthesizing these key quotes?`,
    cite: 'Ubik Studio',
  },
  {
    k: 'p',
    text: `Ubik agents highlight quotes, allowing users to directly interact with analysis in the PDF viewer, with all annotations saved to the file. These notes aren't just visual; they come with an evidence-rich summary that is verifiable, accurate, and ready to use in your work.`,
  },
  {
    k: 'img',
    src: '/ubik/archive/ubik-highlights.webp',
    alt: `The paper's abstract and introduction with agent-made highlights, and a hover note reading "3 notes here" listing the annotations at that spot`,
    w: 794,
    h: 800,
    caption: `Highlights written into the file itself, with the notes surfacing where they were made.`,
  },
  {
    k: 'img',
    src: '/ubik/archive/ubik-review-queue.webp',
    alt: `Ubik's Needs Review panel: seven AI-generated notes awaiting approval, each with page references, an accept and a reject control`,
    w: 800,
    h: 597,
    caption: `Nothing lands without approval: AI-generated notes wait in a review queue.`,
  },
  {
    k: 'img',
    src: '/ubik/archive/ubik-notes.webp',
    alt: `The All Notes view: 67 notes across the workspace, grouped by the paper they belong to`,
    w: 528,
    h: 800,
    caption: `The workspace after the work: 67 notes, grouped by paper, still there next session.`,
  },
  {
    k: 'p',
    text: `**Working across files, searching academic databases, and delivering traceable, well-cited text in generated output is where Ubik excels.**`,
  },
  {
    k: 'p',
    text: `The way we think about building agents and the user experience is polar from platforms like Liner, ChatGPT, Perplexity, and Gemini. As models get better, don't need the cloud, and become more specialized, the majority of productivity and usability of AI for frontier knowledge work (**discovering new science, intense law analysis, publishing to journals, conducting R&D**) will be in **workflows that require** high degrees of **human approval**, **AI trace transparency**, and may **span long periods of time**.`,
  },
  {
    k: 'p',
    text: `Our approach is markedly different from current cloud-centric stacks, not only in terms of reduced cost, but also in the 95% of workflows where AI integration fails due to:`,
  },
  {
    k: 'list',
    items: [
      `Inaccurate generation and legal issues: incorrect citation or hallucinated work can cause real-world legal trouble and reputation harm.`,
      `A lack of human approval: if experts and professionals are forced to trust untrustworthy models and agents, more time is spent verifying and correcting, rather than producing and ideating.`,
    ],
  },
  {
    k: 'p',
    text: `**Unlike** Liner, ChatGPT, Perplexity, or Gemini, **Ubik focuses on multi-hop tasks** where agents retain pinpoint accuracy while working across many files, searching academic databases, and building expert-level analysis, all stored locally on the device. **Here is an example:**`,
  },
  {
    k: 'img',
    src: '/ubik/archive/ubik-prompt.webp',
    alt: `A Ubik prompt referencing five papers with @ mentions: review a draft, find supporting quotes in four papers, be critical, search if evidence is missing, then summarize`,
    w: 800,
    h: 682,
    caption: `One prompt, five papers, several dependent tasks: the multi-hop shape benchmarks rarely test.`,
  },
  {
    k: 'p',
    text: `In this prompt, the Ubik agent has multiple tasks and five separate papers to analyze. Often, these kinds of multi-pronged requests will have a direct impact on the quality and accuracy of the generated output (increased hallucinations). Experts work through complex multi-hop tasks in their high-level research and knowledge workflows. We understand this, and we have built Ubik agents specifically for consistent, accurate, and verifiable output.`,
  },
  { k: 'p', text: `**Ubik Studio brings usable AI into fields like:**` },
  {
    k: 'list',
    items: [
      `**Legal teams:** track and structure information across diverse source documents for litigation, regulatory research, or case prep. Use the AI agent for brainstorming with citations, or work directly with your organized data.`,
      `**Data and research teams:** extract structured datasets from unstructured documents. Turn internal knowledge into alternative data assets with human-in-the-loop review.`,
      `**Consultants and analysts:** power your research workflows and build an internal knowledge infrastructure from scattered documents and reports.`,
      `**Scholars and academics:** manage sources, search databases, and write with proper citations without leaving your workspace.`,
    ],
  },
  {
    k: 'p',
    text: `Ubik Studio is a local environment where you can upload your documents, and our tools transform them into interactive, searchable knowledge. Explore academic databases (ArXiv, Google Scholar, Semantic Scholar, and more), build structured datasets from unstructured sources, and work with AI that answers with traceable, cited output, all in one place. We grew up with powerful information technology and understand that preference and control build confidence and trust. Ubik gives you control over your data privacy and access to frontier models so that you always work with what suits your needs best.`,
  },
  {
    k: 'p',
    text: `There is a gap in the literature and research studying multi-hop tasks. There is no standard benchmark for utilizing AI as a co-collaborator in knowledge work over extended periods, or even beyond a chat session. There are numerous benchmarks, such as SimpleQA and [HotpotQA](https://hotpotqa.github.io), among others. These benchmarks are used to rank and test new AI models in various use cases and field-specific tasks. However, there is an evident lack of successful multi-hop question-answering models or benchmarks explicitly designed to test this process of generation. Although HotpotQA is designed for multi-hop reasoning, it differs significantly from existing multi-hop research tasks.`,
  },
  {
    k: 'img',
    src: '/ubik/archive/hotpotqa.webp',
    alt: `A HotpotQA example: two highlighted paragraphs about tennis players Brian Gottfried and Peter Fleming above the question "Who has more singles titles" and the answer 21`,
    w: 800,
    h: 678,
    caption: `A HotpotQA item, from the benchmark's own site: context, highlights, question, answer.`,
  },
  {
    k: 'p',
    text: `This screenshot, taken from the HotpotQA website, gives a random example that shows a question used in the benchmark dataset: "Who has more singles titles, Brian Gottfried or Peter Fleming?"`,
  },
  {
    k: 'p',
    text: `Above the question (Q), we are shown the context and information the model will use to answer, like a math problem. The highlighted areas are the model-identified sections that contain relevant information based on the words and diction from the question. While these kinds of benchmarks help researchers gain a better understanding of where LLMs struggle in multi-hop reasoning, they do not enable humans to perform high-level multi-hop tasks and knowledge work.`,
  },
  {
    k: 'p',
    text: `Sometimes we ask the wrong question, and with powerful generative tools, we shouldn't measure efficacy and usability through a lens of replacement and end-to-end solutions. Instead, our measurement procedures should include human entry in the steps between the initial prompt and the golden truth.`,
  },
]

/*
 * The Ubik Portals design document, rebuilt whole. Portals was the classroom
 * side of Ubik; this is the internal spec, kept in the author's own voice down
 * to the // margin notes. The GAIAS matrix stays as the artifact it was: a
 * coloured spreadsheet, rendered from the archived document rather than
 * redrawn, because redrawing it would make it interface instead of evidence.
 */
const portalsBible: Block[] = [
  {
    k: 'p',
    text: `What follows is the internal design document for Ubik Portals, the classroom side of Ubik: assignment types teachers could shape, and a five-point scale that decided exactly how much AI help each assignment allowed. It is reproduced as it was written, margin notes and all.`,
  },
  { k: 'h', text: 'Dictionary' },
  { k: 'p', text: `**HW = Homework // CW = Classwork**` },
  {
    k: 'p',
    text: `**Baseline rule across all assignment types:** teachers have full transparency of students' use inside UbikAI, with live-time stats and interactive data tools to help them understand students' learning habits.`,
  },
  {
    k: 'p',
    text: `**We believe:** giving teachers the tools to build AI experiences per assignment (how they see fit) fosters authentic teacher-student collaboration and high-quality, individualized learning environments for students.`,
  },
  {
    k: 'p',
    text: `**ChatHW:** this flow is a student-facing homework redesign. Teachers assign readings with comments and annotations at minimum, paired with an AI chat experience grounded in the assignment's context, custom generative friction, and a time limit made by the teacher. Students don't upload a write-up or any notes. Instead, the dispersed comments throughout the reading, plus a robust back and forth about the reading with the chatbot, lets students discover their interests stress-free as they pertain to the learning goals and fosters an authentic and effective learning environment.`,
  },
  {
    k: 'p',
    text: `**This is a five on the scale of AI assistance**, chat-based notes with no friction to promote exploration into topics that interest specific students. Teachers then assess the chat history using a set amount of time spent talking with the agent.`,
  },
  {
    k: 'p',
    text: `**ResearchHW:** our ResearchHW assignment type consists of three core steps.`,
  },
  {
    k: 'list',
    ordered: true,
    items: [
      `First, teachers pick how many topically relevant academic sources students must find.`,
      `Then, decide how many annotations students must make throughout their findings.`,
      `Last, teachers customize the research assistance by selecting a number from 0 to 5 (0 being no AI assistance, 5 being full collaborative help) and adding custom rules where they see fit, like "Do not give students answers to questions; question back with exploratory positions that provoke new questions."`,
    ],
  },
  {
    k: 'p',
    text: `Teachers have immense control over our ResearchHW assignment type; they can add custom notes on reading to indicate important key sections, exclude databases, or suggest specific papers. After students find their annotations and academic sources, teachers can require students to do an annotated bibliography with 0 AI assistance.`,
  },
  {
    k: 'p',
    text: `Teachers can also use this assignment type on personal files or scanned readings. Build research assignments with documents and PDFs that are not in databases but are teacher-owned and syllabus-relevant.`,
  },
  {
    k: 'p',
    text: `// Research assignments can also be CW assignments, **with live time view over students' presence in the portal and engagement with the classwork.** //`,
  },
  {
    k: 'p',
    text: `**ReadingHW:** reading assignments let teachers turn their PDFs into AI-ready chatbot experiences based solely on the context of the reading. Like in research assignments, teachers decide how much generative friction the chatbot has and any custom rules to help students meet learning goals. ReadingHW can be completely AI-free if the teacher believes the assignment would be more educationally positive without an AI assistant. Paired with our analytic tools, teachers have full transparency and knowledge about the student's time spent on reading, along with many metrics to display learning efficacy and progress. A ReadingHW with full AI collaboration lets students interact and explore the paper with tools like AI-driven quote finding, summarization, AI-posed questions, related article suggestions, highlighting and AI notes, and many more.`,
  },
  {
    k: 'p',
    text: `**ClassHW:** teachers can turn any assignment (except QuizHW) into a ClassHW assignment. Collaborative assignments are great for fostering conversation and exploration between students. Teachers can set the required number of comments, replies, and questions students make.`,
  },
  {
    k: 'p',
    text: `// usually suitable for uploaded readings, educational videos, or fostering discussion //`,
  },
  {
    k: 'p',
    text: `**GroupCW:** when it's time for in-class group work, teachers can use UbikAI to automatically and evenly create well-balanced groups with varying performance and learning levels. For example, in a History class, students are broken into groups of 5 and individually tasked with finding different academic sources on the same topic. The History teacher has auto-selected groups and sets each group to find ten sources with a generative friction setting of "2" (use AI to inspire ideas and help refine searches but cannot annotate, write, or summarize), ensuring students are reading through their findings and not using AI to generate answers or directly link them to papers.`,
  },
  { k: 'p', text: `When making GroupCW or GroupHW assignments, teachers decide.` },
  {
    k: 'p',
    text: `**WriteHW:** WrittenHWs mimic an essential upload submission on any LMS. On Ubik Portals, students can upload directly from their Drive, in-browser text editor, or PDFs. For teachers, all student work gets checked for plagiarism and AI generation. Still, most importantly, our AI synthesizes it to help teachers understand how their students are learning and whether they are meeting the teachers' teaching goals.`,
  },
  {
    k: 'p',
    text: `// **WriteCW** is more trackable and transparent with live time stats and public student profile presence, so teachers can see when students are working on the reading class or using tools outside the Ubik Portals suite. Teachers can also set friction rules so the AI assistant does not generate text for use in the final written piece. //`,
  },
  {
    k: 'p',
    text: `**QuizHW:** quizzes are used after readings to track students' information retention. This assignment type has 0 AI assistance; teachers can optionally require quizzes after every reading. Teachers can form the questions or let the AI craft individualized questions based on students' specific learning needs.`,
  },
  {
    k: 'p',
    text: `// **Watch and Respond:** teachers can link YouTube videos or personal MP4s and set discussion points where students can answer critical questions, leave comments, or ask relevant topical questions directly to the teacher. //`,
  },
  {
    k: 'p',
    text: `// **Refine & Define:** teachers assign students to generate an entire essay with the AI assistant in a text editor inside Portals. Then, the AI assistant works backward with the student to edit down and find all the mistakes and unimportant, irrelevant, or poorly written parts of the paper to give examples of what AI can't do. //`,
  },
  { k: 'h', text: `Ubik's Generative AI Assistance Scale` },
  {
    k: 'p',
    text: `Ubik Portals gives teachers a Generative AI Assistance Scale (GAIAS) designed to address educators' challenges with student AI use in and out of the classroom. Based on extensive teacher feedback, our solution allows educators to create customized, interactive AI assignments that set appropriate boundaries for AI usage in school. This flexible system helps standardize AI guidelines within each class, promoting responsible use while enhancing learning. With Ubik Portals, teachers can confidently integrate AI into their curriculum, ensuring students are well-prepared for an AI-driven future. The generative scale has 5 points ranging from no AI tools to full collaboration. Unlike current methods of enforcing and implementing AI scales for homework, the Ubik Portals generative scale has hardline tools associated with the numerical values teachers can pick from. We pair this with added custom guidelines the teacher sets to ensure their views and pedagogy are used and carried throughout the assignment generation and exploration with the students.`,
  },
  {
    k: 'p',
    text: `**Why is a generative AI scale important for students and teachers?**`,
  },
  {
    k: 'list',
    items: [
      `Implementing a generative AI scale supports thoughtful AI use inside and outside the classroom, helping students develop a solid educational foundation by learning when and how to use AI tools effectively.`,
      `When discussing how students will confirm compliance with the generative AI assistance scale, the author says, "Students must disclose that they used AI and submit a link to interactions with chatbots." This trust in students is forward thinking but naive: as recent high school students and as people who interview and collaborate with teachers in our development, we can very strongly say that this leaves too much onto the students (mainly 14 to 18 years old) without any regulation or guidance. Pseudo-scientific numerical values that represent how to do homework become a guessing game for students.`,
    ],
  },
  { k: 'h', text: 'Scale + assignment type + preset tools' },
  {
    k: 'img',
    src: '/ubik/archive/gaias-matrix.webp',
    alt: `The GAIAS matrix: five assistance levels from No AI Assistance to AI as Co-Collaborator against six assignment surfaces, each cell listing the numbered tools that combination allows`,
    w: 1320,
    h: 680,
    caption: `The matrix as it was drawn: five levels against six surfaces, cells listing the numbered tools each combination unlocks.`,
  },
  { k: 'h', text: 'Back end tools used by the AI assistant' },
  {
    k: 'p',
    text: `The numbers in the matrix refer to this table: twenty-seven tools the assistant could be limited to, written as presets for teachers.`,
  },
  {
    k: 'list',
    ordered: true,
    items: [
      `**Outline generation.** AI assistant generates a structured outline for the student paper in research paper format.`,
      `**AI feedback.** AI gives students genuine feedback in any context around student answers in relation to learning goals and class rules set by the teacher.`,
      `**AI-suggested papers.** When students are searching for papers, AI will recommend related papers either from a portal search engine or filing search engine.`,
      `**Topic generation.** When starting an assignment, AI (if prompted) will generate students topic ideas for their assignments based on the assignment information and description set by the teacher.`,
      `**Note analysis.** If the student makes a note (a highlight with a point for later, one kind of annotation), the AI assistant will respond with analysis to extend critical thinking on this specific point.`,
      `**Draft refinement.** AI assistants will help students craft drafts within the scope of the assignment, meaning: suggest new material to strengthen the argument, adjust length, and help structure the paper to better prove students' research claims.`,
      `**Bibliography creation.** Basic bibliography ready for students to export and use within work; teachers can set citation format prior.`,
      `**Annotated bibliography.** Annotated bibliography with teacher-set word count for citation summarization, and citation format.`,
      `**Paper summarization.** When gathering research (academic sources), AI assistants will summarize papers in academic language and detailed summary with highlighted points for students to explore.`,
      `**Collaborative editing.** When editing a written upload assignment, if a generative level of "4" or higher is selected, AI assistance will help students go through drafted work and make highlighted suggestions for fixing grammar, structure, and repetition issues in writing. Only available on already completed versions of a final draft.`,
      `**Grammar check.** Basic highlighted grammar suggestions when writing inside the text editor.`,
      `**Human forced grammar.** If a generative level of "0" is selected, AI is not allowed to make any suggestions for grammar.`,
      `**Evidence analysis.** AI will tell students if evidence from found academic sources is related to the research assignment, and if so, why. AI will also help students piece this information into larger research claims.`,
      `**Draft generation.** Draft generation, unlike outline generation, is only available when a student has written analysis and found research for their assignment, after an outline is completed.`,
      `**Annotation feedback.** After any student-made annotation inside any found academic papers or teacher-uploaded readings, AI will respond after the annotation is made to provoke further insight into the question, note, or highlight.`,
      `**AI-found annotations.** AI will automatically make highlights throughout papers with relevant annotations based on queries by students.`,
      `**Search refinement.** AI will help students rewrite search queries, helping find better, more relevant work.`,
      `**Search recursion.** AI will try to search through the entire knowledge base for search results.`,
      `**Interactive exploration.** When students are completing ChatHW, AI will go through entire papers and prompt students to explore specific points that relate to the topic idea; students are then required to complete set amounts of annotations and time-based conversation with the AI assistant. This helps students critically think about readings and provides in-depth analytics for teachers' understanding.`,
      `**AI-driven suggestions.** The AI assistant will make suggestions to students for guidance inside work or when trying to start work. AI can provide students with explanations of steps, help students stay on track, and make sure students are aware when information or topics may be out of line with assignment goals.`,
      `**In-depth questioning.** When students are completing research and reading assignments with a generative level of "4" or higher, AI will question students when making annotations or claims with the assistant.`,
      `**Highlighting.** AI can make highlights on student-found academic sources or teacher-uploaded trusted sources.`,
      `**Critical feedback.** An AI assistant will provide students with insights into their work in any context: an annotation, question, written work, class feedback, learning feedback, general feedback in the tone and candor of the teacher.`,
      `**Idea generation.** When starting a research assignment or a written assignment, students can ask the AI assistant to help generate topic ideas, search queries, and papers based on the assignment.`,
      `**Content exploration.** When completing a research or reading assignment with a generative level of "5", if a student has completed the assigned amount of annotations on a paper, AI will recommend similar papers based on the completed paper with the assigned amount of annotations.`,
      `**AI-driven hints.** If any assignment has a generative level of "2", the AI assistant will only reply to students with suggestions and hints for how to get the answer without the help of AI. When a student is completing a written assignment, AI will suggest how to start writing, or recommend papers related to the topic to help students form claims and analysis. When a student is completing a research or reading HW, the AI assistant will only recommend student-suggested keywords to look for when reading, or critical themes that relate to the assignment, but will not have any highlighting ability.`,
      `**AI-suggested idea expansion.** When a student is completing a written assignment with a generative level of "5", if prompted, AI will give students new topics to further help prove points, with recommended papers provided by the assistant.`,
    ],
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
    title: 'Research feed',
    type: 'Ongoing · akaOSS',
    description: 'Working notes and papers as they go up, on the studio site.',
    href: 'https://www.akaoss.dev/research',
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
    title: 'Amplifying Human Intelligence',
    type: 'Archive · Ubik',
    description:
      'The design philosophy behind Ubik: build AI that amplifies human intelligence rather than outsourcing cognition.',
    slug: 'amplifying-human-intelligence',
    deck: 'Archived post from Ubik Newsletter, early 2025.',
    published: 'First published in the Ubik newsletter, early 2025',
    body: amplifying,
  },
  {
    title: 'Built to Learn, Not to Help',
    type: 'Archive · Ubik',
    description:
      'Benchmarks say AI passed the experts. One prompt through Liner and Ubik Studio, side by side, says otherwise.',
    slug: 'built-to-learn-not-to-help',
    deck: 'Archived post from the Ubik blog on kraa.',
    published: 'First published on kraa.io',
    body: builtToLearn,
  },
  {
    title: 'The Ubik Portals Bible',
    type: 'Archive · Ubik',
    description:
      'The classroom spec: eight assignment types, a five-point AI assistance scale, and the 27 tools it gates.',
    slug: 'ubik-portals-bible',
    deck: 'Archived design document from Ubik Portals.',
    published: 'From the Ubik design archive',
    body: portalsBible,
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
