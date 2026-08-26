import type { Thinker } from "@/lib/types";

/**
 * The Thinkers Index.
 *
 * Rule for this file: no invented dates and no invented attributions. A figure
 * whose dates are genuinely uncertain gets a `c.` or is left out. The position
 * line says what the person held, not what they are famous for.
 *
 * `keyArticles` are curriculum entries where the figure is central. The index
 * page also picks up any article whose prose names them, so this list is a
 * floor rather than the whole answer.
 */
export const THINKERS: Thinker[] = [
  /* ---------------- Ancient ---------------- */
  {
    name: "Plato",
    dates: "c. 428–348 BCE",
    position:
      "Held that the objects of knowledge are eternal Forms, and that the sensible world only ever resembles them",
    keyArticles: [
      "metaphysics/intermediate/universals-and-particulars",
      "ontology/intermediate/platonism-and-nominalism",
      "epistemology/beginner/knowledge-belief-opinion",
    ],
  },
  {
    name: "Aristotle",
    dates: "384–322 BCE",
    position:
      "Located form in particular substances rather than a separate realm, and built the first systematic logic and the first virtue ethics",
    keyArticles: [
      "ontology/intermediate/categories-of-being",
      "ontology/intermediate/aristotle-and-husserl",
      "ethics/intermediate/virtue-ethics-and-eudaimonia",
      "metaphysics/intermediate/substance-and-bundle-theories",
    ],
  },
  {
    name: "Augustine of Hippo",
    dates: "354–430",
    position:
      "Argued that evil is a privation rather than a substance, which set the shape of Christian theodicy for a thousand years",
    keyArticles: ["theism/intermediate/theodicies"],
  },
  {
    name: "Boethius",
    dates: "c. 477–524",
    position:
      "Proposed that God's knowledge is timeless rather than foreknowledge, so it does not remove the contingency of future acts",
    keyArticles: ["theism/advanced/foreknowledge-and-freedom"],
  },

  /* ---------------- Medieval ---------------- */
  {
    name: "Avicenna (Ibn Sina)",
    dates: "c. 980–1037",
    position:
      "Distinguished essence from existence and argued from contingent beings to a necessary existent",
    keyArticles: ["theism/intermediate/cosmological-arguments"],
  },
  {
    name: "Anselm of Canterbury",
    dates: "c. 1033–1109",
    position:
      "Gave the first ontological argument: what exists in reality is greater than what exists in the understanding alone",
    keyArticles: ["theism/intermediate/ontological-arguments"],
  },
  {
    name: "Al-Ghazali",
    dates: "c. 1058–1111",
    position:
      "Pressed the kalam version of the cosmological argument and attacked the philosophers' claim that the world is eternal",
    keyArticles: ["theism/intermediate/cosmological-arguments"],
  },
  {
    name: "Maimonides",
    dates: "1138–1204",
    position:
      "Held that positive claims about God's nature fail, so theological language works by negation",
    keyArticles: ["theism/advanced/religious-language"],
  },
  {
    name: "Thomas Aquinas",
    dates: "1225–1274",
    position:
      "Argued for God from motion, causation, contingency, gradation and governance, and held that God is simple, with no distinction between attributes",
    keyArticles: [
      "theism/intermediate/cosmological-arguments",
      "theism/advanced/simplicity-timelessness-impassibility",
    ],
  },
  {
    name: "John Duns Scotus",
    dates: "c. 1266–1308",
    position:
      "Held that being is said univocally of God and creatures, and introduced haecceity as the principle of individuation",
    keyArticles: ["ontology/intermediate/categories-of-being"],
  },
  {
    name: "William of Ockham",
    dates: "c. 1287–1347",
    position:
      "Denied that universals exist outside the mind, treating them as names that apply to many particulars",
    keyArticles: ["ontology/intermediate/platonism-and-nominalism"],
  },

  /* ---------------- Early modern ---------------- */
  {
    name: "Thomas Hobbes",
    dates: "1588–1679",
    position:
      "Argued that life without a sovereign is intolerable, so rational agents contract into absolute political authority",
    keyArticles: [
      "political-philosophy/intermediate/social-contract-tradition",
      "political-philosophy/beginner/what-a-state-is-for",
    ],
  },
  {
    name: "René Descartes",
    dates: "1596–1650",
    position:
      "Held that mind and body are distinct substances, and tried to rebuild knowledge from the one belief doubt cannot touch",
    keyArticles: [
      "philosophy-of-mind/intermediate/substance-and-property-dualism",
      "epistemology/beginner/skepticism-first-encounter",
    ],
  },
  {
    name: "Baruch Spinoza",
    dates: "1632–1677",
    position:
      "Held that there is exactly one substance, so thought and extension are two attributes of the same thing",
    keyArticles: ["metaphysics/intermediate/substance-and-bundle-theories"],
  },
  {
    name: "John Locke",
    dates: "1632–1704",
    position:
      "Grounded personal identity in continuity of consciousness rather than soul or body, and derived property rights from labour",
    keyArticles: [
      "metaphysics/intermediate/personal-identity",
      "political-philosophy/intermediate/social-contract-tradition",
      "political-philosophy/intermediate/toleration",
    ],
  },
  {
    name: "Blaise Pascal",
    dates: "1623–1662",
    position:
      "Argued that belief in God is the rational bet under uncertainty, shifting the question from evidence to decision",
    keyArticles: ["theism/beginner/faith-and-reason"],
  },
  {
    name: "Gottfried Wilhelm Leibniz",
    dates: "1646–1716",
    position:
      "Held that everything has a sufficient reason, and that identity of indiscernibles rules out two things sharing every property",
    keyArticles: [
      "metaphysics/intermediate/modality-and-possible-worlds",
      "logic/intermediate/identity-and-descriptions",
    ],
  },
  {
    name: "George Berkeley",
    dates: "1685–1753",
    position:
      "Denied that matter exists: to be is to be perceived, and physical objects are collections of ideas",
    keyArticles: ["metaphysics/beginner/existence-and-non-existence"],
  },
  {
    name: "Thomas Reid",
    dates: "1710–1796",
    position:
      "Held that some beliefs are properly basic, so demanding a proof of the external world misunderstands how justification works",
    keyArticles: ["epistemology/intermediate/foundationalism-coherentism-infinitism"],
  },
  {
    name: "David Hume",
    dates: "1711–1776",
    position:
      "Denied that we perceive necessary connection in causes, denied that ought follows from is, and denied that testimony can establish a miracle",
    keyArticles: [
      "epistemology/intermediate/problem-of-induction",
      "metaphysics/intermediate/theories-of-causation",
      "ethics/intermediate/the-is-ought-gap",
      "theism/intermediate/miracles-and-hume",
    ],
  },
  {
    name: "Jean-Jacques Rousseau",
    dates: "1712–1778",
    position:
      "Held that legitimate authority comes from the general will, not from consent to be ruled by another",
    keyArticles: ["political-philosophy/intermediate/social-contract-tradition"],
  },
  {
    name: "Immanuel Kant",
    dates: "1724–1804",
    position:
      "Grounded morality in a test of universalisability rather than consequences, and held that some substantive knowledge is a priori",
    keyArticles: [
      "ethics/intermediate/kantian-deontology",
      "epistemology/intermediate/a-priori-and-a-posteriori",
      "theism/intermediate/ontological-arguments",
    ],
  },
  {
    name: "Jeremy Bentham",
    dates: "1748–1832",
    position:
      "Held that the right act maximises pleasure over pain, counting each person for one, and dismissed natural rights as rhetoric",
    keyArticles: ["ethics/intermediate/utilitarianism"],
  },

  /* ---------------- Nineteenth century ---------------- */
  {
    name: "Georg Wilhelm Friedrich Hegel",
    dates: "1770–1831",
    position:
      "Held that categories of thought develop historically through their own contradictions rather than sitting fixed",
    keyArticles: ["ontology/intermediate/categories-of-being"],
  },
  {
    name: "Arthur Schopenhauer",
    dates: "1788–1860",
    position:
      "Held that the world as it is in itself is blind will, and that existence is therefore not worth the suffering it costs",
    keyArticles: ["applied-ethics/advanced/procreative-ethics-and-antinatalism"],
  },
  {
    name: "John Stuart Mill",
    dates: "1806–1873",
    position:
      "Defended utilitarianism with higher and lower pleasures, and held that the only ground for coercing an adult is harm to others",
    keyArticles: [
      "ethics/intermediate/utilitarianism",
      "political-philosophy/beginner/liberty-equality-justice",
      "political-philosophy/intermediate/toleration",
    ],
  },
  {
    name: "Søren Kierkegaard",
    dates: "1813–1855",
    position:
      "Held that faith is not the conclusion of an argument but a commitment made without one",
    keyArticles: ["theism/beginner/faith-and-reason"],
  },
  {
    name: "Karl Marx",
    dates: "1818–1883",
    position:
      "Held that labour under capitalism alienates the worker from the product, the act, and other people, and that ideology makes this look natural",
    keyArticles: [
      "political-philosophy/intermediate/marx-alienation-class-ideology",
      "political-philosophy/advanced/theories-of-exploitation",
    ],
  },
  {
    name: "Charles Sanders Peirce",
    dates: "1839–1914",
    position:
      "Treated belief as a habit of action and truth as what inquiry would converge on in the long run",
    keyArticles: ["epistemology/advanced/confirmation-theory-and-paradoxes"],
  },
  {
    name: "Friedrich Nietzsche",
    dates: "1844–1900",
    position:
      "Held that moral systems have histories and interests behind them, and that tracing those undercuts their claim to authority",
    keyArticles: ["ethics/advanced/evolutionary-debunking-arguments"],
  },
  {
    name: "Gottlob Frege",
    dates: "1848–1925",
    position:
      "Invented quantificational logic, separated sense from reference, and held that numbers are objects",
    keyArticles: [
      "logic/intermediate/predicate-logic",
      "ontology/advanced/neo-fregean-abstraction",
    ],
  },
  {
    name: "Alexius Meinong",
    dates: "1853–1920",
    position:
      "Held that there are objects that do not exist, so quantification and existence come apart",
    keyArticles: ["ontology/intermediate/meinong-and-nonexistent-objects"],
  },
  {
    name: "Franz Brentano",
    dates: "1838–1917",
    position:
      "Held that directedness at an object marks the mental off from the physical",
    keyArticles: ["philosophy-of-mind/intermediate/intentionality-and-mental-content"],
  },
  {
    name: "Edmund Husserl",
    dates: "1859–1938",
    position:
      "Made the structure of experience itself the subject matter, bracketing the question of whether its objects exist",
    keyArticles: ["ontology/intermediate/aristotle-and-husserl"],
  },
  {
    name: "William James",
    dates: "1842–1910",
    position:
      "Held that where evidence is genuinely inconclusive and the choice is forced, belief may be settled on other grounds",
    keyArticles: ["theism/beginner/faith-and-reason"],
  },
  {
    name: "John Dewey",
    dates: "1859–1952",
    position:
      "Treated inquiry as problem-solving within a practice rather than the pursuit of certainty",
    keyArticles: ["political-philosophy/intermediate/democracy-and-its-justifications"],
  },

  /* ---------------- Twentieth century ---------------- */
  {
    name: "Bertrand Russell",
    dates: "1872–1970",
    position:
      "Analysed definite descriptions as quantifier phrases, so 'the present King of France is bald' comes out false rather than meaningless",
    keyArticles: [
      "logic/intermediate/identity-and-descriptions",
      "ontology/intermediate/meinong-and-nonexistent-objects",
    ],
  },
  {
    name: "G. E. Moore",
    dates: "1873–1958",
    position:
      "Held that good is indefinable, and that any attempt to define it in natural terms commits a fallacy",
    keyArticles: [
      "ethics/intermediate/moral-realism-and-anti-realism",
      "ethics/intermediate/the-is-ought-gap",
    ],
  },
  {
    name: "Ludwig Wittgenstein",
    dates: "1889–1951",
    position:
      "Held first that language pictures facts, later that meaning is use, and that a private inner language is impossible",
    keyArticles: [
      "philosophy-of-mind/beginner/introspection-and-its-limits",
      "theism/advanced/religious-language",
    ],
  },
  {
    name: "Martin Heidegger",
    dates: "1889–1976",
    position:
      "Held that the question of what it is to be had been forgotten in favour of cataloguing what there is",
    keyArticles: ["ontology/beginner/what-exists-means"],
  },
  {
    name: "Rudolf Carnap",
    dates: "1891–1970",
    position:
      "Distinguished questions internal to a linguistic framework from external questions about which framework to adopt, and held only the first have answers",
    keyArticles: [
      "ontology/intermediate/carnap-and-quine",
      "ontology/advanced/metaontology-and-substantivity",
    ],
  },
  {
    name: "Gilbert Ryle",
    dates: "1900–1976",
    position:
      "Held that dualism is a category mistake, and that mental terms describe dispositions to behave",
    keyArticles: ["philosophy-of-mind/intermediate/behaviourism-and-its-failure"],
  },
  {
    name: "Alfred Tarski",
    dates: "1901–1983",
    position:
      "Defined truth for a formal language in a stronger metalanguage, and showed no consistent language can define its own truth predicate",
    keyArticles: ["logic/advanced/soundness-and-completeness-proofs"],
  },
  {
    name: "Karl Popper",
    dates: "1902–1994",
    position:
      "Held that theories are never confirmed, only not yet refuted, so falsifiability marks science off from what imitates it",
    keyArticles: ["epistemology/advanced/confirmation-theory-and-paradoxes"],
  },
  {
    name: "Frank Ramsey",
    dates: "1903–1930",
    position:
      "Showed that degrees of belief must satisfy the probability axioms on pain of accepting a set of bets that loses whatever happens",
    keyArticles: ["epistemology/intermediate/credence-and-bayesian-confidence"],
  },
  {
    name: "Carl Hempel",
    dates: "1905–1997",
    position:
      "Set out the paradox that a green leaf confirms 'all ravens are black', which any theory of confirmation has to answer",
    keyArticles: ["epistemology/advanced/confirmation-theory-and-paradoxes"],
  },
  {
    name: "Kurt Gödel",
    dates: "1906–1978",
    position:
      "Proved that any consistent system strong enough for arithmetic contains truths it cannot prove, and cannot prove its own consistency",
    keyArticles: ["logic/advanced/godel-incompleteness"],
  },
  {
    name: "Hannah Arendt",
    dates: "1906–1975",
    position:
      "Held that politics is action among plural equals in public, not the administration of a population",
    keyArticles: ["political-philosophy/intermediate/democracy-and-its-justifications"],
  },
  {
    name: "Simone de Beauvoir",
    dates: "1908–1986",
    position:
      "Held that woman is constituted as the Other against which man is defined as the norm",
    keyArticles: ["political-philosophy/advanced/race-gender-and-political-philosophy"],
  },
  {
    name: "W. V. O. Quine",
    dates: "1908–2000",
    position:
      "Rejected the analytic-synthetic distinction, held that theories face experience as wholes, and made ontological commitment a matter of what the bound variables must range over",
    keyArticles: [
      "ontology/intermediate/quines-criterion",
      "ontology/intermediate/carnap-and-quine",
      "epistemology/intermediate/analytic-synthetic-and-quine",
    ],
  },
  {
    name: "A. J. Ayer",
    dates: "1910–1989",
    position:
      "Held that a statement is meaningful only if verifiable or analytic, which made moral and theological claims expressions of attitude",
    keyArticles: [
      "ethics/intermediate/moral-realism-and-anti-realism",
      "theism/advanced/religious-language",
    ],
  },
  {
    name: "Alan Turing",
    dates: "1912–1954",
    position:
      "Replaced the question whether a machine thinks with a question about whether its conversation is distinguishable from a person's",
    keyArticles: ["philosophy-of-mind/intermediate/the-chinese-room"],
  },
  {
    name: "Wilfrid Sellars",
    dates: "1912–1989",
    position:
      "Attacked the given: experience cannot justify belief unless it already has conceptual content",
    keyArticles: ["epistemology/intermediate/foundationalism-coherentism-infinitism"],
  },
  {
    name: "Roderick Chisholm",
    dates: "1916–1999",
    position:
      "Defended an internalist account of justification and posed the problem of the criterion",
    keyArticles: ["epistemology/intermediate/internalism-vs-externalism"],
  },
  {
    name: "Donald Davidson",
    dates: "1917–2003",
    position:
      "Held that mental events are physical events, though no strict law connects mental and physical descriptions",
    keyArticles: ["philosophy-of-mind/advanced/mental-causation-and-exclusion"],
  },
  {
    name: "J. L. Mackie",
    dates: "1917–1981",
    position:
      "Argued that objective values would be metaphysically queer, so moral claims are systematically false",
    keyArticles: [
      "ethics/intermediate/moral-realism-and-anti-realism",
      "theism/intermediate/problem-of-evil",
    ],
  },
  {
    name: "P. F. Strawson",
    dates: "1919–2006",
    position:
      "Held that responsibility is grounded in the reactive attitudes, which no metaphysical thesis about determinism could dislodge",
    keyArticles: ["metaphysics/intermediate/free-will-and-determinism"],
  },
  {
    name: "G. E. M. Anscombe",
    dates: "1919–2001",
    position:
      "Held that moral obligation without a lawgiver is incoherent, and that ethics should return to the virtues",
    keyArticles: ["ethics/intermediate/virtue-ethics-and-eudaimonia"],
  },
  {
    name: "Philippa Foot",
    dates: "1920–2010",
    position:
      "Introduced the trolley case to separate killing from letting die, and grounded virtue in facts about human flourishing",
    keyArticles: [
      "ethics/beginner/the-trolley-problem",
      "ethics/intermediate/virtue-ethics-and-eudaimonia",
    ],
  },
  {
    name: "John Rawls",
    dates: "1921–2002",
    position:
      "Held that principles of justice are the ones parties would choose behind a veil of ignorance, yielding equal liberty plus a difference principle",
    keyArticles: [
      "political-philosophy/intermediate/rawls-original-position",
      "political-philosophy/advanced/public-reason-and-legitimacy",
    ],
  },
  {
    name: "Thomas Kuhn",
    dates: "1922–1996",
    position:
      "Held that normal science proceeds within a paradigm and that paradigm shifts are not settled by evidence alone",
    keyArticles: ["epistemology/advanced/confirmation-theory-and-paradoxes"],
  },
  {
    name: "Michael Dummett",
    dates: "1925–2011",
    position:
      "Argued from a use theory of meaning to intuitionistic logic, rejecting bivalence for undecidable statements",
    keyArticles: ["logic/advanced/intuitionistic-logic"],
  },
  {
    name: "Michel Foucault",
    dates: "1926–1984",
    position:
      "Held that what counts as knowledge is shaped by power, and traced punishment from spectacle to discipline",
    keyArticles: [
      "applied-ethics/intermediate/punishment-and-the-death-penalty",
      "epistemology/intermediate/epistemic-injustice",
    ],
  },
  {
    name: "Hilary Putnam",
    dates: "1926–2016",
    position:
      "Argued that meanings are not in the head, and later that reference cannot be fixed by theory alone",
    keyArticles: [
      "philosophy-of-mind/intermediate/externalism-about-content",
      "philosophy-of-mind/intermediate/functionalism-and-multiple-realizability",
    ],
  },
  {
    name: "Edmund Gettier",
    dates: "1927–2021",
    position:
      "Showed with two short cases that justified true belief can fail to be knowledge",
    keyArticles: ["epistemology/intermediate/gettier-cases"],
  },
  {
    name: "Noam Chomsky",
    dates: "1928–",
    position:
      "Showed that the linguistic input a child receives underdetermines the grammar they acquire, which sank behaviourism about language",
    keyArticles: ["philosophy-of-mind/intermediate/behaviourism-and-its-failure"],
  },
  {
    name: "Bernard Williams",
    dates: "1929–2003",
    position:
      "Held that impartial moral theories demand that agents abandon the projects that give them reason to go on, and that luck reaches into moral assessment",
    keyArticles: [
      "ethics/advanced/moral-luck",
      "ethics/advanced/agent-relative-reasons",
    ],
  },
  {
    name: "Judith Jarvis Thomson",
    dates: "1929–2020",
    position:
      "Argued that even granting the fetus a right to life, that right does not entail a right to use another person's body",
    keyArticles: [
      "applied-ethics/intermediate/abortion",
      "ethics/beginner/the-trolley-problem",
    ],
  },
  {
    name: "Jürgen Habermas",
    dates: "1929–",
    position:
      "Grounds legitimacy in what could be agreed under conditions of undistorted discussion",
    keyArticles: ["political-philosophy/advanced/public-reason-and-legitimacy"],
  },
  {
    name: "John Searle",
    dates: "1932–",
    position:
      "Argued with the Chinese Room that symbol manipulation is not understanding, whatever the program does",
    keyArticles: ["philosophy-of-mind/intermediate/the-chinese-room"],
  },
  {
    name: "Alvin Plantinga",
    dates: "1932–",
    position:
      "Held that belief in God can be properly basic, and that free will answers the logical problem of evil",
    keyArticles: [
      "theism/advanced/reformed-epistemology",
      "theism/intermediate/theodicies",
      "theism/advanced/modal-ontological-parodies",
    ],
  },
  {
    name: "Amartya Sen",
    dates: "1933–",
    position:
      "Shifted the measure of justice from resources to what people are actually able to do and be",
    keyArticles: ["political-philosophy/intermediate/capabilities-approach"],
  },
  {
    name: "Jerry Fodor",
    dates: "1935–2017",
    position:
      "Held that thinking is computation over a language-like system of mental representations",
    keyArticles: ["philosophy-of-mind/intermediate/intentionality-and-mental-content"],
  },
  {
    name: "Thomas Nagel",
    dates: "1937–",
    position:
      "Held that no physical account captures what it is like to be a bat, and that morality cannot be reduced to a view from nowhere",
    keyArticles: [
      "philosophy-of-mind/advanced/the-hard-problem",
      "ethics/advanced/moral-luck",
    ],
  },
  {
    name: "Robert Nozick",
    dates: "1938–2002",
    position:
      "Held that a distribution is just if it arose from just acquisition and transfer, so patterned principles require constant interference",
    keyArticles: [
      "political-philosophy/intermediate/nozick-entitlement-theory",
      "epistemology/intermediate/safety-and-sensitivity",
    ],
  },
  {
    name: "Alvin Goldman",
    dates: "1938–",
    position:
      "Held that a belief is justified when the process producing it is reliable, whether or not the believer can say so",
    keyArticles: ["epistemology/intermediate/reliabilism-and-virtue-epistemology"],
  },
  {
    name: "T. M. Scanlon",
    dates: "1940–",
    position:
      "Held that an act is wrong if it violates a principle no one could reasonably reject",
    keyArticles: ["ethics/intermediate/contractualism"],
  },
  {
    name: "Saul Kripke",
    dates: "1940–2022",
    position:
      "Gave modal logic its possible-worlds semantics, and argued that names are rigid designators, which makes some necessary truths knowable only a posteriori",
    keyArticles: [
      "logic/intermediate/modal-logic-foundations",
      "metaphysics/intermediate/essentialism-and-origin-essentialism",
      "epistemology/intermediate/a-priori-and-a-posteriori",
    ],
  },
  {
    name: "David Lewis",
    dates: "1941–2001",
    position:
      "Held that possible worlds are as real as this one, differing only in that we are here, and analysed causation counterfactually",
    keyArticles: [
      "metaphysics/intermediate/modal-realism-and-ersatzism",
      "metaphysics/intermediate/theories-of-causation",
      "metaphysics/advanced/gunk-and-unrestricted-composition",
    ],
  },
  {
    name: "Derek Parfit",
    dates: "1942–2017",
    position:
      "Held that personal identity is not what matters in survival, and exposed the repugnant conclusion in population ethics",
    keyArticles: [
      "metaphysics/intermediate/personal-identity",
      "ethics/advanced/population-ethics",
      "applied-ethics/advanced/the-non-identity-problem",
    ],
  },
  {
    name: "Daniel Dennett",
    dates: "1942–2024",
    position:
      "Held that consciousness has no inner theatre, and that qualia as usually described do not exist",
    keyArticles: [
      "philosophy-of-mind/advanced/the-hard-problem",
      "philosophy-of-mind/advanced/higher-order-theories",
    ],
  },
  {
    name: "Allan Gibbard",
    dates: "1942–",
    position:
      "Treats normative judgement as the acceptance of norms rather than the description of facts",
    keyArticles: [
      "ethics/intermediate/moral-realism-and-anti-realism",
      "ethics/advanced/frege-geach-and-quasi-realism",
    ],
  },
  {
    name: "Frank Jackson",
    dates: "1943–",
    position:
      "Argued with the case of Mary the colour scientist that complete physical knowledge leaves something out, then later withdrew the conclusion",
    keyArticles: ["philosophy-of-mind/intermediate/the-knowledge-argument"],
  },
  {
    name: "Simon Blackburn",
    dates: "1944–",
    position:
      "Defends a quasi-realism on which moral talk earns the trappings of truth without moral facts",
    keyArticles: [
      "ethics/advanced/frege-geach-and-quasi-realism",
      "ethics/advanced/moral-supervenience",
    ],
  },
  {
    name: "Peter Singer",
    dates: "1946–",
    position:
      "Holds that equal interests count equally regardless of species, and that distance does not reduce an obligation to help",
    keyArticles: [
      "applied-ethics/intermediate/animal-ethics",
      "political-philosophy/advanced/global-justice-and-cosmopolitanism",
    ],
  },
  {
    name: "Kit Fine",
    dates: "1946–",
    position:
      "Argued that essence is not reducible to modality, and put grounding at the centre of metaphysics",
    keyArticles: [
      "metaphysics/advanced/fine-on-essence-and-modality",
      "metaphysics/advanced/grounding-and-metaphysical-explanation",
    ],
  },
  {
    name: "Martha Nussbaum",
    dates: "1947–",
    position:
      "Specifies a list of central human capabilities a just society must secure to a threshold",
    keyArticles: ["political-philosophy/intermediate/capabilities-approach"],
  },
  {
    name: "Christine Korsgaard",
    dates: "1952–",
    position:
      "Holds that normativity comes from the agent's own reflective endorsement of what they have reason to do",
    keyArticles: [
      "ethics/advanced/constructivism",
      "ethics/advanced/constitutivism-and-normative-authority",
    ],
  },
  {
    name: "Judith Butler",
    dates: "1956–",
    position:
      "Holds that gender is constituted by repeated performance rather than expressing a prior inner fact",
    keyArticles: ["political-philosophy/advanced/race-gender-and-political-philosophy"],
  },
  {
    name: "David Chalmers",
    dates: "1966–",
    position:
      "Separated the hard problem of why processing feels like anything from the tractable problems, and takes panpsychism seriously as an answer",
    keyArticles: [
      "philosophy-of-mind/advanced/the-hard-problem",
      "philosophy-of-mind/intermediate/philosophical-zombies",
      "philosophy-of-mind/advanced/panpsychism-and-the-combination-problem",
    ],
  },
];
