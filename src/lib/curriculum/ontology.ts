import type { Subject } from "@/lib/types";

export const ontology: Subject = {
  slug: "ontology",
  name: "Ontology",
  group: "mind",
  oneLine: "What there is, and how to tell what a theory says there is.",
  scope:
    "Ontology asks what exists and whether existence divides into kinds. The beginner tier fixes the vocabulary of existence, objects, properties, identity, and ontological commitment without assuming any prior technical training. The intermediate tier works through Quine's criterion and its truthmaker rival, the abstract and concrete divide, natural kinds, mathematics, non-existent objects, composition, and the Carnap dispute that set the modern agenda. The advanced tier is metaontology and the formal end of the field: easy ontology, quantifier variance, absolute generality, plural and higher-order quantification, grounding, and joint-carving.",
  ladder: {
    beginner: [
      {
        slug: "what-exists-means",
        title: "What 'Exists' Means",
        summary:
          "The difference between existing, being real, and merely being talked about",
        estReadMin: 8,
        introduces: ["ontology", "existence", "being", "existence claim"],
      },
      {
        slug: "candidate-existents",
        title: "Candidate Existents",
        summary:
          "Ordinary things, happenings, qualities, and numbers, and why the last two are contested",
        estReadMin: 10,
        introduces: ["event", "number", "particular"],
        requires: [
          "ontology",
          "existence",
          "object",
          "property",
          "instantiation",
        ],
      },
      {
        slug: "universals-and-instances",
        title: "Universals and Instances",
        summary:
          "One thing said of many, and the first question anyone asks about properties",
        estReadMin: 9,
        introduces: [
          "universal",
          "type",
          "token",
          "the one over many",
          "resemblance",
        ],
        requires: ["property", "object", "particular", "instantiation"],
      },
      {
        slug: "identity-and-individuation",
        title: "Identity and Individuation",
        summary:
          "Counting things requires knowing when you have one or two, and that turns out to depend on what kind they are",
        estReadMin: 10,
        introduces: [
          "identity",
          "individuation",
          "criterion of identity",
          "countability",
          "sortal",
        ],
        requires: ["object", "existence", "property"],
      },
      {
        slug: "is-existence-a-property",
        title: "Is Existence a Property?",
        summary:
          "Kant's complaint that adding 'and it exists' says nothing about a thing, and Frege's way of making that precise",
        estReadMin: 10,
        introduces: [
          "first-order property",
          "second-order property",
          "Kant's objection",
          "existence predicate",
        ],
        requires: ["existence", "property", "existence claim", "instantiation"],
      },
      {
        slug: "ontological-commitment-informally",
        title: "Ontological Commitment, Informally",
        summary:
          "What a theory says there is, and how rewriting a sentence can change the answer",
        estReadMin: 9,
        introduces: [
          "ontological commitment",
          "paraphrase",
          "ontological inventory",
        ],
        requires: ["existence claim", "object", "property"],
      },
    ],
    intermediate: [
      {
        slug: "quines-criterion",
        title: "Quine's Criterion and 'On What There Is'",
        summary:
          "To be is to be the value of a bound variable, and what that test does and does not settle",
        estReadMin: 16,
        introduces: [
          "Quine's criterion",
          "quantifier",
          "regimentation",
          "Plato's beard",
        ],
        requires: [
          "ontological commitment",
          "paraphrase",
          "existence claim",
          "bound variable",
        ],
      },
      {
        slug: "truthmaking-and-ontological-commitment",
        title: "The Truthmaker Rival to Quine's Criterion",
        summary:
          "Reading commitment off what has to exist for a sentence to be true, rather than off what it quantifies over",
        estReadMin: 17,
        introduces: [
          "truthmaker",
          "truthmaker principle",
          "truthmaker criterion of commitment",
          "ontological free lunch",
        ],
        requires: [
          "Quine's criterion",
          "ontological commitment",
          "paraphrase",
          "object",
          "property",
        ],
      },
      {
        slug: "categories-of-being",
        title: "Categories of Being",
        summary:
          "Whether being divides into kinds, or applies in one single sense to everything there is",
        estReadMin: 14,
        introduces: [
          "category of being",
          "univocal existence",
          "modes of being",
        ],
        requires: ["being", "ontology", "object"],
      },
      {
        slug: "drawing-the-abstract-concrete-line",
        title: "Drawing the Abstract/Concrete Line",
        summary:
          "Four ways of drawing the line, by causal power, location, mind dependence, and abstraction",
        estReadMin: 15,
        introduces: [
          "causal criterion",
          "spatiotemporal criterion",
          "mind-dependence criterion",
          "abstraction criterion",
        ],
        requires: [
          "object",
          "property",
          "category of being",
          "abstract object",
          "concrete object",
          "spatiotemporal location",
        ],
      },
      {
        slug: "natural-kinds",
        title: "Natural Kinds",
        summary:
          "Whether the divisions we sort things into are found or made, and what a kind would have to be to be found",
        estReadMin: 17,
        introduces: [
          "natural kind",
          "homeostatic property cluster",
          "promiscuous realism",
          "conventionalism about kinds",
        ],
        requires: [
          "property",
          "universal",
          "category of being",
          "sortal",
          "essence",
        ],
      },
      {
        slug: "platonism-and-nominalism",
        title: "Mathematical Platonism and Nominalism",
        summary:
          "The indispensability argument for numbers, and the nominalist strategies for doing without them",
        estReadMin: 18,
        introduces: [
          "mathematical platonism",
          "indispensability argument",
          "fictionalism",
          "Benacerraf's dilemma",
        ],
        requires: [
          "abstract object",
          "number",
          "Quine's criterion",
          "nominalism",
        ],
      },
      {
        slug: "meinong-and-nonexistent-objects",
        title: "Fictional and Non-Existent Objects",
        summary:
          "Meinong on objects that bear properties without existing, and Russell's objections to them",
        estReadMin: 17,
        introduces: ["subsistence", "fictional object", "nuclear property"],
        requires: [
          "existence claim",
          "object",
          "quantifier",
          "Meinongianism",
          "intentional object",
        ],
      },
      {
        slug: "mereological-composition",
        title: "Mereological Composition",
        summary:
          "When some things compose a further thing, and the nihilist and universalist answers",
        estReadMin: 18,
        introduces: ["composition", "fusion"],
        requires: [
          "object",
          "particular",
          "ontological commitment",
          "mereology",
          "parthood",
          "mereological nihilism",
          "mereological universalism",
          "special composition question",
        ],
      },
      {
        slug: "aristotle-and-husserl",
        title: "Ontological Categories in Aristotle and Husserl",
        summary:
          "Substance and accident in the Categories, and Husserl's dependence relations between regions",
        estReadMin: 19,
        introduces: [
          "accident",
          "Aristotle's categories",
          "ontological dependence",
          "regional ontology",
        ],
        requires: [
          "category of being",
          "property",
          "particular",
          "essence",
          "substance",
        ],
      },
      {
        slug: "carnap-and-quine",
        title: "Carnap's Internal and External Questions",
        summary:
          "Questions asked inside a framework against questions asked about it, and Quine's reply",
        estReadMin: 24,
        introduces: [
          "linguistic framework",
          "internal question",
          "external question",
          "analytic-synthetic distinction",
        ],
        requires: [
          "Quine's criterion",
          "ontological commitment",
          "abstract object",
        ],
      },
    ],
    advanced: [
      {
        slug: "metaontology-and-substantivity",
        title: "Metaontology and the Substantivity Dispute",
        summary:
          "Whether ontological disputes are genuine disagreements or artifacts of how the parties speak",
        estReadMin: 22,
        introduces: [
          "metaontology",
          "deflationism",
          "substantive dispute",
          "verbal dispute",
        ],
        requires: [
          "ontology",
          "ontological commitment",
          "Quine's criterion",
          "linguistic framework",
          "external question",
        ],
      },
      {
        slug: "easy-ontology-and-application-conditions",
        title: "Easy Ontology",
        summary:
          "Deriving numbers and properties from trivial inferences, and the claim that the hard questions were never hard",
        estReadMin: 22,
        introduces: [
          "easy ontology",
          "application conditions",
          "trivial inference",
          "deflationary derivation",
        ],
        requires: [
          "metaontology",
          "deflationism",
          "paraphrase",
          "internal question",
        ],
      },
      {
        slug: "neo-fregean-abstraction",
        title: "Neo-Fregean Abstraction",
        summary:
          "Deriving arithmetic from Hume's principle, and the Caesar and bad company objections",
        estReadMin: 26,
        introduces: [
          "abstraction principle",
          "Hume's principle",
          "neo-Fregeanism",
          "Caesar problem",
          "bad company objection",
        ],
        requires: [
          "abstract object",
          "mathematical platonism",
          "nominalism",
          "easy ontology",
          "second-order property",
        ],
      },
      {
        slug: "pluralism-and-quantifier-variance",
        title: "Ontological Pluralism and Quantifier Variance",
        summary:
          "Whether there are several ways of being, and whether rival ontologists mean one thing by 'there is'",
        estReadMin: 24,
        introduces: [
          "ontological pluralism",
          "quantifier variance",
          "unrestricted quantifier",
          "Hirsch's charity argument",
        ],
        requires: [
          "modes of being",
          "quantifier",
          "linguistic framework",
          "verbal dispute",
        ],
      },
      {
        slug: "absolute-generality",
        title: "Absolute Generality",
        summary:
          "Whether anyone can quantify over absolutely everything, and what indefinite extensibility would cost if not",
        estReadMin: 26,
        introduces: [
          "absolute generality",
          "generality relativism",
          "indefinite extensibility",
          "the all-in-one principle",
        ],
        requires: [
          "unrestricted quantifier",
          "quantifier",
          "bound variable",
          "ontological commitment",
        ],
      },
      {
        slug: "ideology-and-ontology",
        title: "Ideology and Ontology",
        summary:
          "Counting primitive notions as well as entities, and why the two economies pull against each other",
        estReadMin: 20,
        introduces: [
          "ideological commitment",
          "primitive notion",
          "ideological parsimony",
          "qualitative parsimony",
        ],
        requires: [
          "ontological commitment",
          "regimentation",
          "Quine's criterion",
        ],
      },
      {
        slug: "plural-quantification-and-ontological-innocence",
        title: "Plural Quantification and Ontological Innocence",
        summary:
          "Talking about some things without talking about a further thing they form, and what nominalism can buy with it",
        estReadMin: 24,
        introduces: [
          "plural quantification",
          "plural term",
          "ontological innocence",
          "monadic second-order logic",
        ],
        requires: [
          "quantifier",
          "bound variable",
          "nominalism",
          "fusion",
          "ideology",
        ],
      },
      {
        slug: "higher-order-metaphysics",
        title: "Higher-Order Metaphysics",
        summary:
          "Asking the questions in a typed higher-order language instead of a first-order one, and watching several of them change shape",
        estReadMin: 28,
        introduces: [
          "higher-order quantification",
          "type distinction",
          "property identity conditions",
          "higher-order metaphysics",
        ],
        requires: [
          "plural quantification",
          "second-order property",
          "category of being",
          "ideology",
          "primitive notion",
        ],
      },
      {
        slug: "grounding-based-ontology",
        title: "Grounding-Based Ontology",
        summary:
          "Ranking what there is by what holds in virtue of what, rather than listing it all flat",
        estReadMin: 26,
        introduces: ["derivative entity", "purity"],
        requires: [
          "ontological dependence",
          "substance",
          "metaontology",
          "grounding",
          "fundamentality",
          "metaphysical explanation",
        ],
      },
      {
        slug: "ontological-realism-and-joint-carving",
        title: "Ontological Realism and Joint-Carving",
        summary:
          "Sider's claim that quantification itself carves at the joints, and what makes a description natural",
        estReadMin: 28,
        introduces: [
          "ontological realism",
          "joint-carving",
          "reference magnetism",
        ],
        requires: [
          "quantifier variance",
          "deflationism",
          "fundamentality",
          "unrestricted quantifier",
          "ideology",
          "structure",
          "naturalness",
        ],
      },
      {
        slug: "boundaries-holes-and-absences",
        title: "Boundaries, Holes, and Absences",
        summary:
          "The ontology of things that seem to be defined by what is not there, and what they do to a clean mereology",
        estReadMin: 22,
        introduces: [
          "boundary",
          "hole",
          "negative part",
          "host and guest",
          "fiat boundary",
        ],
        requires: [
          "mereology",
          "parthood",
          "spatiotemporal location",
          "object",
          "criterion of identity",
        ],
      },
      {
        slug: "formal-and-applied-ontology",
        title: "Formal Ontology and Applied Ontologies",
        summary:
          "Upper ontologies built for shared scientific data, and the continuant and occurrent split they turn on",
        estReadMin: 22,
        introduces: [
          "formal ontology",
          "applied ontology",
          "upper ontology",
          "continuant",
          "occurrent",
        ],
        requires: [
          "Aristotle's categories",
          "regional ontology",
          "mereology",
          "event",
          "fiat boundary",
        ],
      },
    ],
  },
};
