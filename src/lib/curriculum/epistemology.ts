import type { Subject } from "@/lib/types";

export const epistemology: Subject = {
  slug: "epistemology",
  name: "Epistemology",
  group: "core",
  oneLine: "What knowledge is, and when a belief counts as justified.",
  scope:
    "Epistemology asks what knowledge is, what makes a belief justified, and how far either one extends. The beginner tier separates knowledge from belief and opinion, surveys the standard sources, states the justified true belief analysis, and sets out the regress that every theory of justification is answering. The intermediate tier covers Gettier and the repairs, the structural theories, the modal conditions, and the move from belief to credence. The advanced tier is the specialist end: accuracy-first arguments for probabilism, the new evil demon problem, Fitch's paradox, self-locating belief, and the norms that govern inquiry rather than belief.",
  ladder: {
    beginner: [
      {
        slug: "knowledge-belief-opinion",
        title: "Knowledge, Belief, and Opinion",
        summary: "Three things people run together, and what separates them",
        estReadMin: 7,
        introduces: [
          "knowledge",
          "belief",
          "opinion",
          "truth",
          "propositional knowledge",
        ],
      },
      {
        slug: "what-justification-is",
        title: "What Justification Is",
        summary:
          "What turns a true belief into something better than a lucky guess",
        estReadMin: 8,
        introduces: ["justification", "epistemic reason", "doxastic attitude"],
        requires: ["belief", "knowledge", "truth"],
      },
      {
        slug: "sources-of-knowledge",
        title: "Sources: Perception, Memory, Testimony, Reason",
        summary:
          "Where beliefs actually come from, and the way each source can fail",
        estReadMin: 9,
        introduces: ["perception", "memory", "testimony", "reason"],
        requires: ["knowledge", "justification", "belief", "introspection"],
      },
      {
        slug: "skepticism-first-encounter",
        title: "Skepticism, First Encounter",
        summary:
          "Dreams, deceiving demons, and why ordinary beliefs are hard to defend",
        estReadMin: 8,
        introduces: [
          "skepticism",
          "Cartesian doubt",
          "dream argument",
          "brain in a vat",
        ],
        requires: ["knowledge", "justification", "perception", "memory"],
      },
      {
        slug: "the-jtb-analysis",
        title: "The JTB Analysis",
        summary:
          "Knowledge as justified true belief, stated as three separate conditions",
        estReadMin: 10,
        introduces: [
          "JTB analysis",
          "analysis of knowledge",
          "necessary and sufficient conditions",
        ],
        requires: [
          "knowledge",
          "belief",
          "truth",
          "justification",
          "propositional knowledge",
        ],
      },
      {
        slug: "the-regress-problem",
        title: "The Regress Problem",
        summary:
          "Agrippa's trilemma, and why the structural theories of justification are all answers to it",
        estReadMin: 11,
        introduces: [
          "epistemic regress",
          "regress argument",
          "Agrippa's trilemma",
          "inferential justification",
          "basic belief",
        ],
        requires: ["justification", "epistemic reason", "belief"],
      },
    ],
    intermediate: [
      {
        slug: "gettier-cases",
        title: "Gettier Cases and Post-Gettier Repairs",
        summary:
          "Justified true belief that falls short, and the patches that were tried",
        estReadMin: 14,
        introduces: [
          "Gettier case",
          "epistemic luck",
          "no false lemmas",
          "defeasibility analysis",
        ],
        requires: ["JTB analysis", "justification", "belief", "truth"],
      },
      {
        slug: "foundationalism-coherentism-infinitism",
        title: "Foundationalism, Coherentism, Infinitism",
        summary:
          "Three structures for justified belief: bedrock, web, or endless chain, each taking one horn of the trilemma",
        estReadMin: 16,
        introduces: [
          "foundationalism",
          "coherentism",
          "infinitism",
          "coherence",
          "doxastic basing",
        ],
        requires: [
          "epistemic regress",
          "basic belief",
          "inferential justification",
          "Agrippa's trilemma",
        ],
      },
      {
        slug: "internalism-vs-externalism",
        title: "Internalism versus Externalism",
        summary:
          "Whether what justifies you has to be something you can reflect on",
        estReadMin: 14,
        introduces: [
          "internalism",
          "externalism",
          "access internalism",
          "mentalism",
          "epistemic access",
        ],
        requires: ["justification", "epistemic reason", "Gettier case"],
      },
      {
        slug: "reliabilism-and-virtue-epistemology",
        title: "Reliabilism and Virtue Epistemology",
        summary:
          "Justification from truth-conducive processes, or from good intellectual character",
        estReadMin: 16,
        introduces: [
          "reliabilism",
          "process reliabilism",
          "virtue epistemology",
          "intellectual virtue",
          "generality problem",
        ],
        requires: [
          "externalism",
          "justification",
          "Gettier case",
          "epistemic luck",
        ],
      },
      {
        slug: "safety-and-sensitivity",
        title: "Safety and Sensitivity Conditions",
        summary:
          "Two modal conditions on knowledge, and the cases that pull them apart",
        estReadMin: 17,
        introduces: [
          "safety condition",
          "sensitivity condition",
          "counterfactual",
          "close possible world",
          "tracking account",
        ],
        requires: ["epistemic luck", "reliabilism", "Gettier case"],
      },
      {
        slug: "epistemic-closure-and-denial",
        title: "Epistemic Closure and Its Denial",
        summary:
          "Whether knowledge survives known entailment, and the price of saying no",
        estReadMin: 16,
        introduces: [
          "epistemic closure",
          "closure denial",
          "known entailment",
          "relevant alternatives",
        ],
        requires: ["sensitivity condition", "skepticism", "brain in a vat"],
      },
      {
        slug: "a-priori-and-a-posteriori",
        title: "A Priori and A Posteriori",
        summary:
          "Knowledge whose justification does not rest on experience, and whether any exists",
        estReadMin: 15,
        introduces: [
          "a priori",
          "a posteriori",
          "rational intuition",
          "innate knowledge",
        ],
        requires: ["reason", "justification", "perception"],
      },
      {
        slug: "analytic-synthetic-and-quine",
        title: "The Analytic/Synthetic Distinction and Quine's Attack",
        summary:
          "Truth by meaning alone, and Quine's argument that the notion runs in a circle",
        estReadMin: 16,
        introduces: [
          "analytic truth",
          "synthetic truth",
          "conceptual truth",
          "Quine's circularity argument",
          "confirmation holism",
        ],
        requires: ["a priori", "a posteriori", "rational intuition"],
      },
      {
        slug: "problem-of-induction",
        title: "The Problem of Induction",
        summary:
          "Hume's argument that past regularities give no reason to expect future ones",
        estReadMin: 15,
        introduces: [
          "induction",
          "enumerative induction",
          "Hume's problem of induction",
          "uniformity of nature",
        ],
        requires: ["a posteriori", "justification", "epistemic reason"],
      },
      {
        slug: "credence-and-bayesian-confidence",
        title: "Bayesian Confidence and Credence, Introduced",
        summary:
          "Belief as a matter of degree, and updating those degrees on new evidence",
        estReadMin: 18,
        introduces: [
          "credence",
          "degree of belief",
          "conditional probability",
          "prior probability",
          "posterior probability",
          "Bayes's theorem",
        ],
        requires: ["belief", "induction", "justification"],
      },
      {
        slug: "testimony-and-disagreement",
        title: "Testimony and Disagreement",
        summary:
          "When to trust what others tell you, and what to do when an equal disagrees",
        estReadMin: 16,
        introduces: [
          "reductionism about testimony",
          "anti-reductionism about testimony",
          "epistemic peer",
          "conciliationism",
          "steadfast view",
        ],
        requires: ["testimony", "justification", "credence"],
      },
      {
        slug: "epistemic-injustice",
        title: "Epistemic Injustice",
        summary:
          "The wrongs done to someone specifically as a giver or a subject of knowledge",
        estReadMin: 17,
        introduces: [
          "social epistemology",
          "epistemic injustice",
          "testimonial injustice",
          "hermeneutical injustice",
          "credibility deficit",
        ],
        requires: [
          "testimony",
          "epistemic peer",
          "reductionism about testimony",
        ],
      },
    ],
    advanced: [
      {
        slug: "contextualism-and-invariantism",
        title: "Contextualism, Invariantism, and Pragmatic Encroachment",
        summary:
          "Whether 'knows' shifts with the speaker's context, with the subject's stakes, or not at all",
        estReadMin: 24,
        introduces: [
          "contextualism",
          "invariantism",
          "subject-sensitive invariantism",
          "pragmatic encroachment",
          "epistemic standards",
          "practical stakes",
        ],
        requires: [
          "knowledge",
          "justification",
          "skepticism",
          "epistemic closure",
        ],
      },
      {
        slug: "knowledge-first-epistemology",
        title: "Knowledge-First Epistemology and Anti-Luminosity",
        summary:
          "Treating knowledge as primitive, defining evidence from it, and the margin-for-error argument that no condition is luminous",
        estReadMin: 26,
        introduces: [
          "knowledge-first epistemology",
          "knowledge norm of assertion",
          "factive mental state",
          "evidence as knowledge",
          "anti-luminosity argument",
        ],
        requires: [
          "JTB analysis",
          "analysis of knowledge",
          "Gettier case",
          "access internalism",
        ],
      },
      {
        slug: "disjunctivism-and-the-new-evil-demon",
        title: "Epistemological Disjunctivism and the New Evil Demon",
        summary:
          "A reason that is both reflectively accessible and factive, offered against the demand to choose between internalism and externalism",
        estReadMin: 25,
        introduces: [
          "epistemological disjunctivism",
          "new evil demon problem",
          "reflective access",
          "factive reason",
        ],
        requires: ["externalism", "internalism", "reliabilism", "perception"],
      },
      {
        slug: "epistemic-value-and-swamping",
        title: "Epistemic Value and the Swamping Problem",
        summary:
          "Why knowledge is worth more than mere true belief, and why reliability alone cannot say so",
        estReadMin: 21,
        introduces: [
          "epistemic value",
          "swamping problem",
          "final value",
          "instrumental value",
          "veritism",
        ],
        requires: ["reliabilism", "intellectual virtue", "knowledge"],
      },
      {
        slug: "formal-epistemology",
        title: "Formal Epistemology: Probabilism and Updating",
        summary:
          "Probability axioms as coherence constraints, and the rules for revising credences",
        estReadMin: 28,
        introduces: [
          "probabilism",
          "Dutch book",
          "probability axiom",
          "conditionalization",
          "Jeffrey updating",
        ],
        requires: [
          "credence",
          "conditional probability",
          "prior probability",
          "posterior probability",
        ],
      },
      {
        slug: "accuracy-first-epistemology",
        title: "Accuracy-First Epistemology",
        summary:
          "Deriving the probability axioms from accuracy alone, with no bets and no bookie in sight",
        estReadMin: 27,
        introduces: [
          "accuracy-first epistemology",
          "gradational accuracy",
          "scoring rule",
          "accuracy dominance",
          "epistemic utility",
        ],
        requires: [
          "probabilism",
          "credence",
          "conditionalization",
          "epistemic value",
        ],
      },
      {
        slug: "confirmation-theory-and-paradoxes",
        title: "Confirmation Theory, Ravens, and Grue",
        summary:
          "Why a white shoe appears to confirm that all ravens are black, and what grue breaks",
        estReadMin: 24,
        introduces: [
          "confirmation",
          "hypothetico-deductive method",
          "raven paradox",
          "grue",
          "new riddle of induction",
          "projectibility",
        ],
        requires: [
          "induction",
          "enumerative induction",
          "conditionalization",
          "confirmation holism",
        ],
      },
      {
        slug: "lottery-and-preface-paradoxes",
        title: "Lottery, Preface, and the Threshold View of Belief",
        summary:
          "If believing is having a high enough credence, rational belief is not closed under conjunction. Something has to give",
        estReadMin: 22,
        introduces: [
          "lottery paradox",
          "preface paradox",
          "Lockean thesis",
          "threshold view",
          "conjunction closure",
        ],
        requires: [
          "credence",
          "degree of belief",
          "epistemic closure",
          "belief",
        ],
      },
      {
        slug: "self-locating-belief",
        title: "Self-Locating Belief and Sleeping Beauty",
        summary:
          "What conditionalization says when the new information is about which person, or which time, you are",
        estReadMin: 25,
        introduces: [
          "self-locating belief",
          "centred proposition",
          "Sleeping Beauty problem",
          "self-sampling assumption",
        ],
        requires: [
          "credence",
          "conditionalization",
          "conditional probability",
          "principle of indifference",
        ],
      },
      {
        slug: "higher-order-evidence",
        title: "Higher-Order Evidence and Peer Disagreement",
        summary:
          "Evidence about the reliability of your own reasoning, and whether the levels can come apart",
        estReadMin: 24,
        introduces: [
          "higher-order evidence",
          "level-splitting",
          "calibrationism",
          "uniqueness thesis",
          "permissivism",
        ],
        requires: [
          "epistemic peer",
          "conciliationism",
          "steadfast view",
          "credence",
          "conditionalization",
        ],
      },
      {
        slug: "fitch-knowability-paradox",
        title: "Fitch's Paradox and the Knowability Principle",
        summary:
          "A short proof that if every truth can be known, then every truth already is known",
        estReadMin: 23,
        introduces: [
          "knowability principle",
          "Fitch's paradox",
          "restriction strategy",
        ],
        requires: [
          "knowledge",
          "epistemic closure",
          "known entailment",
          "epistemic logic",
        ],
      },
      {
        slug: "epistemology-of-modality",
        title: "The Epistemology of Modality",
        summary:
          "How anyone comes to know what is possible or necessary, with no experience of it",
        estReadMin: 22,
        introduces: [
          "modal epistemology",
          "modal knowledge",
          "essentialist modal epistemology",
        ],
        requires: [
          "a priori",
          "rational intuition",
          "counterfactual",
          "conceivability argument",
        ],
      },
      {
        slug: "transformative-experience",
        title: "Transformative Experience",
        summary:
          "Choices whose outcomes you cannot assess until after you have made them, and what that does to expected utility",
        estReadMin: 19,
        introduces: [
          "transformative experience",
          "epistemically transformative experience",
          "personally transformative experience",
          "expected utility",
        ],
        requires: ["credence", "epistemic value", "probabilism"],
      },
      {
        slug: "zetetic-epistemology",
        title: "Zetetic Epistemology and the Norms of Inquiry",
        summary:
          "Norms governing what to look into rather than what to believe, and the tension between the two",
        estReadMin: 21,
        introduces: [
          "zetetic epistemology",
          "norms of inquiry",
          "interrogative attitude",
          "suspension of judgement",
        ],
        requires: [
          "epistemic reason",
          "epistemic value",
          "doxastic attitude",
          "higher-order evidence",
        ],
      },
    ],
  },
};
