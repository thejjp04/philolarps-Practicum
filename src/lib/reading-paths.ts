import type { ReadingPath } from "@/lib/types";

/**
 * Curated cross-subject sequences. Steps are `subject/tier/slug` and are
 * resolved against the ladder at build time, so a typo here shows up as a
 * missing step rather than a broken link.
 */
export const READING_PATHS: ReadingPath[] = [
  {
    slug: "total-beginner-six-weeks",
    name: "Total beginner, six weeks",
    blurb:
      "Four articles a week for six weeks. Starts with how arguments work, because every other subject leans on that, then moves through the four questions philosophy keeps returning to: what exists, what we can know, what we owe each other, and what a mind is. Nothing here assumes prior reading.",
    steps: [
      // Week 1: the tools
      "logic/beginner/what-is-an-argument",
      "logic/beginner/validity-and-soundness",
      "logic/intermediate/truth-and-proof",
      "logic/beginner/formal-fallacies",
      // Week 2: what there is
      "metaphysics/beginner/what-metaphysics-asks",
      "metaphysics/beginner/existence-and-non-existence",
      "metaphysics/beginner/objects-and-properties",
      "metaphysics/beginner/change-and-identity-over-time",
      // Week 3: what we know
      "epistemology/beginner/knowledge-belief-opinion",
      "epistemology/beginner/what-justification-is",
      "epistemology/beginner/sources-of-knowledge",
      "epistemology/beginner/skepticism-first-encounter",
      // Week 4: what we owe
      "ethics/beginner/descriptive-and-normative-claims",
      "ethics/beginner/what-a-moral-theory-is",
      "ethics/beginner/consequences-rules-and-character",
      "ethics/beginner/the-trolley-problem",
      // Week 5: minds
      "philosophy-of-mind/beginner/the-mind-body-problem",
      "philosophy-of-mind/beginner/consciousness-and-cognition",
      "philosophy-of-mind/beginner/what-a-mental-state-is",
      // Week 6: politics and religion, the two places the rest gets applied
      "political-philosophy/beginner/authority-and-legitimacy",
      "political-philosophy/beginner/what-a-state-is-for",
      "theism/beginner/what-god-is-claimed-to-be",
      "theism/beginner/theism-atheism-agnosticism",
      "applied-ethics/beginner/theory-and-cases",
    ],
  },
  {
    slug: "analytic-core",
    name: "Analytic core",
    blurb:
      "The sequence an analytic philosophy department would recognise as the spine of its own training. Formal logic first, then the Gettier literature, then the metaphysics of modality and time, then the mind. It ends in metatheory, where the tools get turned on themselves. Assumes you have done the beginner tier or its equivalent.",
    steps: [
      "logic/intermediate/propositional-logic-and-wffs",
      "logic/intermediate/natural-deduction",
      "logic/intermediate/predicate-logic",
      "logic/intermediate/identity-and-descriptions",
      "logic/intermediate/soundness-and-completeness-informally",
      "epistemology/beginner/the-jtb-analysis",
      "epistemology/intermediate/gettier-cases",
      "epistemology/intermediate/internalism-vs-externalism",
      "epistemology/intermediate/reliabilism-and-virtue-epistemology",
      "epistemology/intermediate/a-priori-and-a-posteriori",
      "epistemology/intermediate/analytic-synthetic-and-quine",
      "metaphysics/intermediate/universals-and-particulars",
      "metaphysics/intermediate/persistence-endurantism-and-perdurantism",
      "metaphysics/intermediate/theories-of-time",
      "metaphysics/intermediate/modality-and-possible-worlds",
      "logic/intermediate/modal-logic-foundations",
      "logic/intermediate/normal-modal-systems",
      "metaphysics/intermediate/modal-realism-and-ersatzism",
      "metaphysics/intermediate/essentialism-and-origin-essentialism",
      "ontology/intermediate/quines-criterion",
      "ontology/intermediate/carnap-and-quine",
      "philosophy-of-mind/intermediate/functionalism-and-multiple-realizability",
      "philosophy-of-mind/intermediate/the-knowledge-argument",
      "philosophy-of-mind/intermediate/philosophical-zombies",
      "philosophy-of-mind/advanced/the-hard-problem",
      "philosophy-of-mind/advanced/mental-causation-and-exclusion",
      "logic/advanced/godel-incompleteness",
      "metaphysics/advanced/metaontology-and-deflationism",
    ],
  },
  {
    slug: "continental-entry",
    name: "Continental entry",
    blurb:
      "This site is written from an analytic vantage point, so treat this as a bridge rather than a substitute for reading Hegel, Heidegger, or Foucault directly. It gathers the articles that engage the questions the continental tradition made central: being as a question rather than an inventory, the first-person structure of experience, ideology and power, and the situated body. Each one names the primary texts to go to next.",
    steps: [
      "ontology/beginner/what-exists-means",
      "ontology/beginner/candidate-existents",
      "ontology/intermediate/categories-of-being",
      "ontology/intermediate/aristotle-and-husserl",
      "philosophy-of-mind/beginner/introspection-and-its-limits",
      "philosophy-of-mind/advanced/extended-and-embodied-mind",
      "philosophy-of-mind/advanced/the-unity-of-consciousness",
      "political-philosophy/intermediate/marx-alienation-class-ideology",
      "political-philosophy/advanced/theories-of-exploitation",
      "political-philosophy/advanced/race-gender-and-political-philosophy",
      "ethics/intermediate/care-ethics",
      "epistemology/intermediate/epistemic-injustice",
      "epistemology/advanced/transformative-experience",
      "metaphysics/advanced/grounding-and-metaphysical-explanation",
      "theism/advanced/religious-language",
    ],
  },
];

export function getReadingPath(slug: string): ReadingPath | undefined {
  return READING_PATHS.find((p) => p.slug === slug);
}
