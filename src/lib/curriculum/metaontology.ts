import type { Subject } from "@/lib/types";

export const metaontology: Subject = {
  slug: "metaontology",
  name: "Metaontology",
  group: "mind",
  oneLine:
    "Questions about questions of existence: what ontology is doing, and whether it can be done.",
  scope:
    "Metaontology asks what we are doing when we ask what exists, and by what method such questions could be settled. The Ontology subject already covers the central disputes over Carnap, easy ontology, quantifier variance, and joint-carving, so this subject concentrates on method and on positions it leaves out. The beginner tier introduces the field, descriptive and revisionary metaphysics, Moorean facts, and parsimony. The intermediate tier covers Quinean metaontology, debunking arguments about ordinary objects, naturalised metaphysics, and Lewis's cost-benefit method. The advanced tier is research-level: Bennett's epistemicism, Chalmers's ontological anti-realism, Hofweber's internalism, Yablo's figuralism, Price's pragmatism, Thomasson's modal normativism, ontological nihilism, Azzouni's neutralism, Priest's noneism, Williamson's necessitism, Rayo's just-is statements, Linnebo's thin objects, plenitude, Fine and Schaffer on the form of ontological claims, theoretical equivalence, and ontic structural realism.",
  ladder: {
    beginner: [
      {
        slug: "questions-about-questions-of-existence",
        title: "Questions About Questions of Existence",
        summary:
          "The step back from asking what exists to asking what that question means and how to answer it",
        estReadMin: 8,
        introduces: ["metaontology", "first-order ontology", "metametaphysics"],
        requires: ["ontology", "existence", "existence claim"],
      },
      {
        slug: "descriptive-and-revisionary-metaphysics",
        title: "Descriptive and Revisionary Metaphysics",
        summary:
          "Strawson's contrast between mapping how we think about the world and correcting it",
        estReadMin: 9,
        introduces: [
          "descriptive metaphysics",
          "revisionary metaphysics",
          "armchair method",
        ],
        requires: ["metaontology", "ontology"],
      },
      {
        slug: "common-sense-and-moorean-facts",
        title: "Common Sense and Moorean Facts",
        summary:
          "Whether 'I have hands' outweighs any philosophical argument that there are no hands",
        estReadMin: 9,
        introduces: [
          "Moorean fact",
          "common-sense ontology",
          "incredulous stare",
        ],
        requires: ["existence claim", "revisionary metaphysics"],
      },
      {
        slug: "simplicity-in-metaphysics",
        title: "Simplicity in Metaphysics",
        summary:
          "Ockham's razor, counting entities, and why a simpler theory might be likelier to be true",
        estReadMin: 10,
        introduces: [
          "theoretical virtue",
          "quantitative parsimony",
          "Ockham's razor",
        ],
        requires: ["ontological commitment", "metaontology"],
      },
      {
        slug: "metaphysics-and-science",
        title: "Metaphysics and Science",
        summary:
          "Whether metaphysics has questions of its own or must take its ontology from physics",
        estReadMin: 9,
        introduces: ["scientific metaphysics", "autonomy of metaphysics"],
        requires: ["metaontology", "revisionary metaphysics"],
      },
    ],
    intermediate: [
      {
        slug: "quinean-metaontology",
        title: "Quinean Metaontology",
        summary:
          "Van Inwagen's five theses, thin and thick conceptions of being, and what the orthodoxy commits you to",
        estReadMin: 15,
        introduces: [
          "Quinean metaontology",
          "thin conception of being",
          "thick conception of being",
        ],
        requires: [
          "Quine's criterion",
          "quantifier",
          "existence predicate",
          "regimentation",
        ],
      },
      {
        slug: "debunking-ordinary-objects",
        title: "Debunking Ordinary Objects",
        summary:
          "Korman on whether our belief in tables and statues but not in trout-turkeys can survive its origins",
        estReadMin: 16,
        introduces: [
          "arbitrariness argument",
          "conservatism about objects",
          "object eliminativism",
        ],
        requires: [
          "debunking argument",
          "Moorean fact",
          "mereological universalism",
          "mereological nihilism",
        ],
      },
      {
        slug: "naturalised-metaphysics",
        title: "Naturalised Metaphysics",
        summary:
          "Ladyman and Ross's case against neo-scholastic metaphysics and the principle of naturalistic closure",
        estReadMin: 15,
        introduces: [
          "naturalised metaphysics",
          "principle of naturalistic closure",
          "neo-scholastic metaphysics",
        ],
        requires: [
          "scientific metaphysics",
          "autonomy of metaphysics",
          "theoretical virtue",
        ],
      },
      {
        slug: "the-price-is-right",
        title: "The Price Is Right",
        summary:
          "Lewis's cost-benefit method in metaphysics and the worry that it cannot pick a winner",
        estReadMin: 15,
        introduces: ["cost-benefit method", "metaphysical underdetermination"],
        requires: [
          "theoretical virtue",
          "quantitative parsimony",
          "Moorean fact",
          "reflective equilibrium",
        ],
      },
    ],
    advanced: [
      {
        slug: "epistemicism-about-metaphysics",
        title: "Epistemicism About Metaphysics",
        summary:
          "Bennett's diagnosis that some disputes are substantive but unsettleable, through difference-minimising and burden-shifting",
        estReadMin: 23,
        introduces: [
          "epistemicism about metaphysics",
          "dismissivism",
          "difference-minimising",
          "burden-shifting",
        ],
        requires: [
          "verbal dispute",
          "metaontology",
          "coincident objects",
          "metaphysical underdetermination",
        ],
      },
      {
        slug: "ontological-anti-realism",
        title: "Ontological Anti-Realism",
        summary:
          "Chalmers on lightweight and heavyweight quantifiers and the method of elimination for verbal disputes",
        estReadMin: 24,
        introduces: [
          "ontological anti-realism",
          "lightweight quantifier",
          "heavyweight quantifier",
          "method of elimination",
        ],
        requires: ["verbal dispute", "quantifier variance", "easy ontology"],
      },
      {
        slug: "hofweber-and-internalism",
        title: "Hofweber and Internalism",
        summary:
          "Two readings of the quantifier, the puzzle about ontology, and internalism about arithmetic",
        estReadMin: 24,
        introduces: [
          "internal reading of quantifiers",
          "external reading of quantifiers",
          "puzzle about ontology",
          "internalism about arithmetic",
        ],
        requires: ["quantifier", "number", "mathematical platonism", "focus"],
      },
      {
        slug: "figuralism",
        title: "Figuralism",
        summary:
          "Yablo's claim that existence talk about numbers is often figurative, and why that makes ontology quizzical",
        estReadMin: 23,
        introduces: ["figuralism", "representational aid", "quizzicalism"],
        requires: [
          "fictionalism",
          "indispensability argument",
          "linguistic framework",
          "metaphor",
        ],
      },
      {
        slug: "pragmatism-after-carnap",
        title: "Pragmatism After Carnap",
        summary:
          "Price's subject naturalism, global expressivism, and the case for asking what existence talk does",
        estReadMin: 24,
        introduces: [
          "subject naturalism",
          "object naturalism",
          "global expressivism",
          "functional pluralism",
        ],
        requires: [
          "expressivism",
          "quasi-realism",
          "linguistic framework",
          "naturalised metaphysics",
        ],
      },
      {
        slug: "modal-normativism",
        title: "Modal Normativism",
        summary:
          "Thomasson's proposal that necessity claims express semantic rules rather than describe modal facts",
        estReadMin: 22,
        introduces: ["modal normativism"],
        requires: [
          "easy ontology",
          "analytic truth",
          "metaphysical possibility",
          "expressivism",
        ],
      },
      {
        slug: "ontological-nihilism",
        title: "Ontological Nihilism",
        summary:
          "Hawthorne, Cortens, and Turner on describing the world with no objects at all, using feature-placing and predicate functors",
        estReadMin: 25,
        introduces: [
          "ontological nihilism",
          "feature-placing language",
          "predicate functor logic",
        ],
        requires: ["quantifier", "bound variable", "ideological commitment"],
      },
      {
        slug: "neutralism-about-quantification",
        title: "Neutralism About Quantification",
        summary:
          "Azzouni's ontologically innocent quantifier and the ontological independence criterion for existence",
        estReadMin: 23,
        introduces: [
          "neutralism about quantification",
          "ontological independence criterion",
        ],
        requires: [
          "Quine's criterion",
          "existence predicate",
          "ontological commitment",
        ],
      },
      {
        slug: "noneism",
        title: "Noneism",
        summary:
          "Routley and Priest's modern Meinongianism, the characterisation principle, and objects that exist at impossible worlds",
        estReadMin: 24,
        introduces: [
          "noneism",
          "characterisation principle",
          "existence-entailing predicate",
        ],
        requires: [
          "Meinongianism",
          "nuclear property",
          "impossible world",
          "nonexistent object",
        ],
      },
      {
        slug: "necessitism-and-contingentism",
        title: "Necessitism and Contingentism",
        summary:
          "Williamson's claim that necessarily everything is necessarily something, and the merely possible as non-concrete",
        estReadMin: 25,
        introduces: [
          "necessitism",
          "contingentism",
          "contingently non-concrete object",
        ],
        requires: [
          "Barcan formula",
          "converse Barcan formula",
          "constant domain semantics",
          "variable domain semantics",
        ],
      },
      {
        slug: "just-is-statements",
        title: "Just-Is Statements",
        summary:
          "Rayo's compositionalism, trivialism about mathematics, and the construction of logical space",
        estReadMin: 24,
        introduces: ["just-is statement", "trivialism", "logical space"],
        requires: ["neo-Fregeanism", "abstraction principle", "possible world"],
      },
      {
        slug: "thin-objects",
        title: "Thin Objects",
        summary:
          "Linnebo's sufficiency of abstraction, reconceptualisation, and dynamic abstraction as a cure for bad company",
        estReadMin: 25,
        introduces: [
          "thin object",
          "sufficiency principle",
          "dynamic abstraction",
        ],
        requires: [
          "abstraction principle",
          "Hume's principle",
          "Caesar problem",
          "bad company objection",
          "indefinite extensibility",
        ],
      },
      {
        slug: "maximalism-and-plenitude",
        title: "Maximalism and Plenitude",
        summary:
          "Eklund's maximalism and the principle that every consistent kind of object there could be there is",
        estReadMin: 23,
        introduces: ["ontological maximalism", "plenitude"],
        requires: [
          "quantifier variance",
          "ontological pluralism",
          "joint-carving",
          "mereological universalism",
        ],
      },
      {
        slug: "the-question-of-ontology",
        title: "The Question of Ontology",
        summary:
          "Fine's argument that ontological claims are not existence claims and his reality operator",
        estReadMin: 24,
        introduces: [
          "reality operator",
          "Fine's critique of quantificational ontology",
        ],
        requires: ["grounding", "fundamentality", "existential quantifier"],
      },
      {
        slug: "permissivism-and-ordered-ontology",
        title: "Permissivism and Ordered Ontology",
        summary:
          "Schaffer's neo-Aristotelian view that existence questions are trivial and the real work is what grounds what",
        estReadMin: 24,
        introduces: [
          "permissivism about existence",
          "flat ontology",
          "sorted ontology",
          "ordered ontology",
        ],
        requires: [
          "grounding",
          "fundamentality",
          "priority monism",
          "ontological dependence",
        ],
      },
      {
        slug: "theoretical-equivalence",
        title: "Theoretical Equivalence",
        summary:
          "When two theories say the same thing: definitional and Morita equivalence and notational variants",
        estReadMin: 25,
        introduces: [
          "theoretical equivalence",
          "definitional equivalence",
          "Morita equivalence",
          "notational variant",
        ],
        requires: [
          "model",
          "interpretation",
          "ideological commitment",
          "joint-carving",
        ],
      },
      {
        slug: "ontic-structural-realism",
        title: "Ontic Structural Realism",
        summary:
          "Ladyman and Ross's rainforest realism, real patterns, and the claim that structure is all there is",
        estReadMin: 25,
        introduces: [
          "ontic structural realism",
          "rainforest realism",
          "real pattern",
        ],
        requires: [
          "naturalised metaphysics",
          "principle of naturalistic closure",
          "structural property",
        ],
      },
      {
        slug: "the-epistemic-challenge-to-metaphysics",
        title: "The Epistemic Challenge to Metaphysics",
        summary:
          "Whether theoretical virtues can be truth-conducive in metaphysics, and Kriegel on aesthetic virtues",
        estReadMin: 22,
        introduces: [
          "epistemic challenge to metaphysics",
          "aesthetic theoretical virtue",
        ],
        requires: [
          "metaphysical underdetermination",
          "theoretical virtue",
          "evolutionary debunking argument",
        ],
      },
    ],
  },
};
