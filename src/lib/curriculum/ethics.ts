import type { Subject } from "@/lib/types";

export const ethics: Subject = {
  slug: "ethics",
  name: "Ethics",
  group: "core",
  oneLine:
    "What makes actions right or wrong, and how the answers are defended.",
  scope:
    "Ethics asks which actions are right, what makes them so, and what kind of claim a moral claim is in the first place. The beginner tier fixes the vocabulary: the difference between describing and evaluating, what a reason is, what a moral theory owes you, and what metaethics is asking that first-order ethics is not. The intermediate tier works through the standing families of theory and the metaethical landscape they sit in, including motivation and reasons, both of which are ordinary undergraduate material rather than specialist territory. The advanced tier is where the live disputes are: the embedding problem, the semantics of moral terms, the source of normative authority, holism about reasons, and the impossibility results in population ethics.",
  ladder: {
    beginner: [
      {
        slug: "descriptive-and-normative-claims",
        title: "Descriptive and Normative Claims",
        summary:
          "How claims about what is the case differ from claims about what ought to be",
        estReadMin: 6,
        introduces: [
          "descriptive claim",
          "normative claim",
          "evaluative claim",
          "ought",
        ],
      },
      {
        slug: "reasons-and-normativity",
        title: "Reasons, Oughts, and Normative Force",
        summary:
          "What it is for a consideration to count in favour of something, and why this comes before any theory of right action",
        estReadMin: 9,
        introduces: [
          "normative reason",
          "motivating reason",
          "practical reason",
          "normativity",
          "pro tanto reason",
        ],
        requires: ["normative claim", "ought"],
      },
      {
        slug: "what-a-moral-theory-is",
        title: "What a Moral Theory Is",
        summary:
          "What a theory owes you: a criterion of right action, not a list of verdicts",
        estReadMin: 7,
        introduces: [
          "moral theory",
          "moral principle",
          "right action",
          "permissibility",
        ],
        requires: ["normative claim", "evaluative claim"],
      },
      {
        slug: "consequences-rules-and-character",
        title: "Consequences, Rules, and Character",
        summary:
          "Three places a theory can locate rightness, and why they diverge on the same case",
        estReadMin: 9,
        introduces: ["consequentialism", "deontology", "virtue ethics"],
        requires: ["moral theory", "right action", "normative claim"],
      },
      {
        slug: "the-trolley-problem",
        title: "The Trolley Problem as a Diagnostic",
        summary:
          "Switch, footbridge, and what the gap between the two verdicts is meant to reveal",
        estReadMin: 8,
        introduces: [
          "trolley problem",
          "doing and allowing",
          "doctrine of double effect",
        ],
        requires: ["consequentialism", "deontology", "permissibility"],
      },
      {
        slug: "moral-intuitions",
        title: "Moral Intuitions and What to Do With Them",
        summary:
          "Whether a strong reaction to a case counts as evidence, and how theory building uses it",
        estReadMin: 10,
        introduces: [
          "moral intuition",
          "reflective equilibrium",
          "method of cases",
        ],
        requires: ["trolley problem", "moral theory", "moral principle"],
      },
      {
        slug: "what-metaethics-asks",
        title: "What Metaethics Asks",
        summary:
          "The four questions that sit behind first-order ethics: meaning, truth, knowledge, and what moral facts would have to be",
        estReadMin: 9,
        introduces: [
          "metaethics",
          "normative ethics",
          "moral semantics",
          "moral epistemology",
          "moral metaphysics",
        ],
        requires: ["moral theory", "normative claim", "moral intuition"],
      },
    ],
    intermediate: [
      {
        slug: "utilitarianism",
        title: "Utilitarianism and Its Objections",
        summary:
          "Four versions of the greatest happiness principle, and the demandingness and experience machine replies",
        estReadMin: 18,
        introduces: [
          "utilitarianism",
          "act utilitarianism",
          "rule utilitarianism",
          "hedonism",
          "preference satisfaction",
          "utility",
          "impartiality",
          "demandingness objection",
          "experience machine",
          "agent-centred prerogative",
        ],
        requires: [
          "consequentialism",
          "moral theory",
          "right action",
          "normative reason",
        ],
      },
      {
        slug: "kantian-deontology",
        title: "Kantian Deontology",
        summary:
          "The universal law and humanity formulations, and why Kant grounds duty in autonomy",
        estReadMin: 20,
        introduces: [
          "categorical imperative",
          "hypothetical imperative",
          "maxim",
          "universalizability",
          "formula of humanity",
          "duty",
          "autonomy",
          "good will",
          "imperfect duty",
        ],
        requires: [
          "deontology",
          "moral principle",
          "right action",
          "practical reason",
        ],
      },
      {
        slug: "virtue-ethics-and-eudaimonia",
        title: "Virtue Ethics and Eudaimonia",
        summary:
          "Aristotle's function argument, eudaimonia as activity, and the mean between excess and deficiency",
        estReadMin: 18,
        introduces: [
          "virtue",
          "eudaimonia",
          "doctrine of the mean",
          "practical wisdom",
          "function argument",
        ],
        requires: ["virtue ethics", "moral theory", "right action"],
      },
      {
        slug: "ross-and-prima-facie-duties",
        title: "Ross and the Plurality of Duties",
        summary:
          "A deontology with several irreducible duties and no ranking, and what happens when two of them collide",
        estReadMin: 15,
        introduces: [
          "prima facie duty",
          "duty proper",
          "deontic pluralism",
          "self-evidence",
        ],
        requires: ["deontology", "moral principle", "moral intuition", "duty"],
      },
      {
        slug: "contractualism",
        title: "Scanlonian Contractualism",
        summary:
          "What no one could reasonably reject, and how that differs from bargaining for mutual advantage",
        estReadMin: 19,
        introduces: [
          "contractarianism",
          "contractualism",
          "reasonable rejection",
        ],
        requires: [
          "impartiality",
          "moral principle",
          "autonomy",
          "social contract",
          "state of nature",
          "original position",
          "veil of ignorance",
        ],
      },
      {
        slug: "care-ethics",
        title: "Care Ethics",
        summary:
          "Why an ethics built on relationship and dependence rejects the impartial standpoint",
        estReadMin: 13,
        introduces: ["care ethics", "partiality", "relational autonomy"],
        requires: ["impartiality", "virtue", "autonomy"],
      },
      {
        slug: "moral-realism-and-anti-realism",
        title: "Realism, Anti-Realism, and the Metaethical Map",
        summary:
          "Whether moral claims report facts, express attitudes, or systematically fail to be true at all",
        estReadMin: 20,
        introduces: [
          "moral realism",
          "moral anti-realism",
          "moral fact",
          "moral property",
          "mind-independence",
          "cognitivism",
          "non-cognitivism",
          "emotivism",
          "expressivism",
          "error theory",
          "argument from queerness",
        ],
        requires: [
          "normative claim",
          "evaluative claim",
          "metaethics",
          "moral semantics",
        ],
      },
      {
        slug: "the-is-ought-gap",
        title: "The Is-Ought Gap",
        summary:
          "Hume's gap, Moore's open question argument, and whether naturalism can cross either",
        estReadMin: 15,
        introduces: [
          "is-ought gap",
          "naturalistic fallacy",
          "open question argument",
          "ethical naturalism",
          "non-naturalism",
        ],
        requires: ["descriptive claim", "normative claim", "moral fact"],
      },
      {
        slug: "moral-relativism",
        title: "Moral Relativism and Its Problems",
        summary:
          "Disagreement across cultures does not by itself show that rightness varies with them",
        estReadMin: 14,
        introduces: [
          "moral relativism",
          "cultural relativism",
          "descriptive relativism",
          "argument from disagreement",
        ],
        requires: ["moral realism", "moral anti-realism", "moral fact"],
      },
      {
        slug: "humean-theory-of-motivation",
        title: "Moral Motivation and the Humean Theory",
        summary:
          "The belief-desire model, motivational internalism, and the amoralist who judges without caring",
        estReadMin: 18,
        introduces: [
          "Humean theory of motivation",
          "belief-desire model",
          "motivational internalism",
          "motivational externalism",
          "amoralist",
          "the moral problem",
        ],
        requires: [
          "normative reason",
          "motivating reason",
          "moral realism",
          "cognitivism",
        ],
      },
      {
        slug: "reasons-internalism-and-externalism",
        title: "Reasons Internalism and Externalism",
        summary:
          "Whether a reason must connect to something already in the agent's motivational set",
        estReadMin: 17,
        introduces: [
          "reasons internalism",
          "reasons externalism",
          "motivational set",
          "deliberative route",
        ],
        requires: [
          "normative reason",
          "motivating reason",
          "practical reason",
          "Humean theory of motivation",
        ],
      },
    ],
    advanced: [
      {
        slug: "frege-geach-and-quasi-realism",
        title: "The Frege-Geach Problem and Quasi-Realism",
        summary:
          "Why an attitude-expressing semantics struggles in unasserted contexts, and what quasi-realism claims to earn back",
        estReadMin: 26,
        introduces: [
          "Frege-Geach problem",
          "embedding problem",
          "quasi-realism",
          "higher-order attitude",
          "hybrid expressivism",
          "minimalism about truth",
        ],
        requires: [
          "expressivism",
          "non-cognitivism",
          "cognitivism",
          "moral semantics",
        ],
      },
      {
        slug: "moral-twin-earth",
        title: "Moral Twin Earth and the Reference of Moral Terms",
        summary:
          "The objection that a causal semantics for moral words makes two communities talk past each other rather than disagree",
        estReadMin: 24,
        introduces: [
          "Cornell realism",
          "synthetic ethical naturalism",
          "moral twin earth",
          "causal theory of reference",
        ],
        requires: [
          "ethical naturalism",
          "moral realism",
          "moral property",
          "open question argument",
          "reference magnetism",
        ],
      },
      {
        slug: "moral-supervenience",
        title: "Moral Supervenience and What Explains It",
        summary:
          "Everyone agrees the moral cannot vary without the natural varying. The dispute is over who gets to explain that",
        estReadMin: 23,
        introduces: [
          "moral supervenience",
          "resultance",
          "supervenience argument",
        ],
        requires: [
          "moral property",
          "moral fact",
          "non-naturalism",
          "moral metaphysics",
          "strong supervenience",
        ],
      },
      {
        slug: "buck-passing-and-the-wrong-kind-of-reason",
        title: "Buck-Passing and the Wrong Kind of Reason",
        summary:
          "Analysing value as reasons for attitudes, and the demon who gives you a reason to admire the wrong thing",
        estReadMin: 22,
        introduces: [
          "buck-passing account",
          "fitting attitude analysis",
          "wrong kind of reason problem",
          "reasons fundamentalism",
        ],
        requires: ["normative reason", "pro tanto reason", "moral property"],
      },
      {
        slug: "constructivism",
        title: "Humean and Kantian Constructivism",
        summary:
          "Moral truth as the output of a procedure, and the split over which procedure and why it binds",
        estReadMin: 24,
        introduces: [
          "moral constructivism",
          "Humean constructivism",
          "Kantian constructivism",
          "proceduralism",
        ],
        requires: [
          "moral realism",
          "categorical imperative",
          "reasonable rejection",
          "cognitivism",
        ],
      },
      {
        slug: "constitutivism-and-normative-authority",
        title: "Constitutivism and the Normative Question",
        summary:
          "Deriving normative authority from what agency already is, and the reply that one could always settle for being a shmagent",
        estReadMin: 27,
        introduces: [
          "constitutivism",
          "the normative question",
          "constitutive aim of action",
          "shmagency objection",
          "normative authority",
        ],
        requires: [
          "practical reason",
          "normativity",
          "moral constructivism",
          "reasons internalism",
        ],
      },
      {
        slug: "rational-requirements",
        title: "Rational Requirements: Wide Scope and Narrow Scope",
        summary:
          "Where the operator attaches in 'if you intend the end, take the means', and why bootstrapping turns on the answer",
        estReadMin: 25,
        introduces: [
          "rational requirement",
          "wide-scope requirement",
          "narrow-scope requirement",
          "instrumental rationality",
          "bootstrapping objection",
          "detachment",
        ],
        requires: [
          "practical reason",
          "normative reason",
          "normativity",
          "hypothetical imperative",
        ],
      },
      {
        slug: "moral-particularism",
        title: "Particularism and Holism About Reasons",
        summary:
          "The claim that a consideration counting in favour here can count against there, and what that leaves of moral principles",
        estReadMin: 23,
        introduces: [
          "moral particularism",
          "holism about reasons",
          "default reason",
          "enabler",
          "generalism",
        ],
        requires: [
          "prima facie duty",
          "moral principle",
          "normative reason",
          "moral intuition",
        ],
      },
      {
        slug: "agent-relative-reasons",
        title: "Agent-Relative Reasons and the Paradox of Deontology",
        summary:
          "Why a constraint forbids an act that would prevent more acts of the very same kind",
        estReadMin: 24,
        introduces: [
          "agent-relative reason",
          "agent-neutral reason",
          "deontological constraint",
          "paradox of deontology",
        ],
        requires: [
          "deontology",
          "consequentialism",
          "normative reason",
          "doctrine of double effect",
          "agent-centred prerogative",
        ],
      },
      {
        slug: "moral-luck",
        title: "Moral Luck",
        summary:
          "How luck in results, circumstances, and constitution collides with the control principle",
        estReadMin: 20,
        introduces: [
          "moral luck",
          "resultant luck",
          "circumstantial luck",
          "constitutive luck",
          "control principle",
        ],
        requires: ["moral intuition", "virtue", "duty", "right action"],
      },
      {
        slug: "aggregation-and-separateness-of-persons",
        title: "Aggregation and the Separateness of Persons",
        summary:
          "Whether summing benefits across people ignores that each person's life is their own, and what limited aggregation offers instead",
        estReadMin: 24,
        introduces: [
          "aggregation",
          "separateness of persons",
          "numbers problem",
          "pairwise comparison",
          "limited aggregation",
        ],
        requires: [
          "utilitarianism",
          "veil of ignorance",
          "reasonable rejection",
          "impartiality",
        ],
      },
      {
        slug: "incommensurability-and-parity",
        title: "Incommensurability, Incomparability, and Parity",
        summary:
          "The small improvement argument, and the case for a fourth comparative relation beyond better, worse, and equal",
        estReadMin: 22,
        introduces: [
          "incommensurability",
          "incomparability",
          "parity",
          "small improvement argument",
        ],
        requires: ["aggregation", "utility", "pro tanto reason"],
      },
      {
        slug: "population-ethics",
        title: "Population Ethics",
        summary:
          "The total view, the repugnant conclusion, and the person-affecting intuitions that every proposed escape route gives up",
        estReadMin: 27,
        introduces: [
          "population ethics",
          "total view",
          "average view",
          "repugnant conclusion",
          "mere addition paradox",
          "person-affecting view",
          "critical level view",
        ],
        requires: [
          "aggregation",
          "utility",
          "act utilitarianism",
          "non-identity problem",
        ],
      },
      {
        slug: "evolutionary-debunking-arguments",
        title: "Evolutionary Debunking and the Darwinian Dilemma",
        summary:
          "Whether an evolutionary story about our moral beliefs undercuts their claim to track anything, and what a third factor would have to do",
        estReadMin: 22,
        introduces: [
          "evolutionary debunking argument",
          "Darwinian dilemma",
          "genealogical critique",
          "third-factor response",
        ],
        requires: [
          "moral realism",
          "moral intuition",
          "moral property",
          "error theory",
          "tracking account",
        ],
      },
      {
        slug: "moral-uncertainty",
        title: "Moral Uncertainty and Intertheoretic Comparison",
        summary:
          "How to act without knowing which moral theory is correct, and whether two theories' verdicts can be put on one scale at all",
        estReadMin: 23,
        introduces: [
          "moral uncertainty",
          "maximizing expected choiceworthiness",
          "intertheoretic comparison",
          "my favourite theory",
        ],
        requires: [
          "moral theory",
          "moral intuition",
          "aggregation",
          "reflective equilibrium",
          "expected choiceworthiness",
        ],
      },
    ],
  },
};
