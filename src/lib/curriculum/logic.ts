import type { Subject } from "@/lib/types";

export const logic: Subject = {
  slug: "logic",
  name: "Logic",
  group: "core",
  oneLine: "What follows from what, and how to prove it.",
  scope:
    "Logic studies which arguments are good in virtue of their form alone. The beginner tier builds the vocabulary of argument, validity, and truth-functional connectives from nothing, using truth tables as the only formal machinery. The intermediate tier is the standard first course in symbolic logic: the formal language, natural deduction, tableaux, Hilbert systems, predicate logic with identity, the set theory metatheory needs, and modal logic through the normal systems. The advanced tier is metatheory and philosophy of logic proper, from the Henkin construction and the incompleteness theorems through provability logic, model theory, reverse mathematics, and the substructural and non-classical families.",
  ladder: {
    beginner: [
      {
        slug: "what-is-an-argument",
        title: "What an Argument Is",
        summary:
          "Premises, conclusions, and the difference between arguing and asserting",
        estReadMin: 6,
        introduces: ["argument", "premise", "conclusion", "inference"],
      },
      {
        slug: "validity-and-soundness",
        title: "Validity and Soundness",
        summary:
          "Why a valid argument can have a false conclusion, and what soundness adds",
        estReadMin: 7,
        introduces: ["validity", "soundness", "counterexample"],
        requires: ["argument", "premise", "conclusion"],
      },
      {
        slug: "deductive-and-inductive-support",
        title: "Deductive and Inductive Support",
        summary:
          "Two ways premises can back a conclusion, and why only one of them is the subject of this ladder",
        estReadMin: 8,
        introduces: [
          "deductive argument",
          "inductive strength",
          "ampliative inference",
          "abduction",
        ],
        requires: ["argument", "inference", "validity"],
      },
      {
        slug: "statements-and-connectives",
        title: "Statements and Connectives",
        summary:
          "Negation, conjunction, disjunction, the conditional, and the biconditional",
        estReadMin: 9,
        introduces: [
          "proposition",
          "negation",
          "conjunction",
          "disjunction",
          "material conditional",
          "biconditional",
          "truth function",
        ],
        requires: ["argument"],
      },
      {
        slug: "truth-tables",
        title: "Truth Tables",
        summary:
          "Building the table for any formula, and reading validity off it",
        estReadMin: 10,
        introduces: [
          "truth table",
          "tautology",
          "contradiction",
          "contingency",
        ],
        requires: [
          "proposition",
          "negation",
          "conjunction",
          "disjunction",
          "material conditional",
          "validity",
        ],
      },
      {
        slug: "formal-fallacies",
        title: "Common Formal Fallacies",
        summary:
          "Affirming the consequent, denying the antecedent, and why they fail",
        estReadMin: 7,
        introduces: [
          "affirming the consequent",
          "denying the antecedent",
          "formal fallacy",
        ],
        requires: ["validity", "material conditional", "truth table"],
      },
      {
        slug: "basic-inference-rules",
        title: "Basic Inference Rules",
        summary:
          "Modus ponens, modus tollens, hypothetical syllogism, disjunctive syllogism",
        estReadMin: 9,
        introduces: [
          "modus ponens",
          "modus tollens",
          "hypothetical syllogism",
          "disjunctive syllogism",
        ],
        requires: [
          "material conditional",
          "disjunction",
          "negation",
          "validity",
        ],
      },
      {
        slug: "translating-english",
        title: "Translating English into Symbols",
        summary:
          "Where ordinary English and the truth-functional connectives come apart",
        estReadMin: 11,
        introduces: ["scope", "translation key", "main connective"],
        requires: [
          "proposition",
          "conjunction",
          "disjunction",
          "material conditional",
          "biconditional",
          "negation",
        ],
      },
    ],
    intermediate: [
      {
        slug: "propositional-logic-and-wffs",
        title: "Propositional Logic and Well-Formed Formulas",
        summary:
          "The formal grammar of the language, stated recursively, and why recursion is the right tool",
        estReadMin: 12,
        introduces: [
          "well-formed formula",
          "recursive definition",
          "object language",
          "metalanguage",
          "atomic formula",
        ],
        requires: ["proposition", "main connective", "truth function"],
      },
      {
        slug: "truth-and-proof",
        title: "Semantic and Syntactic Consequence",
        summary:
          "Two different relations that beginners run together, and the notation that keeps them apart",
        estReadMin: 12,
        introduces: [
          "semantic consequence",
          "syntactic consequence",
          "interpretation",
          "model",
        ],
        requires: ["well-formed formula", "validity", "truth table"],
      },
      {
        slug: "truth-functional-completeness",
        title: "Truth-Functional Completeness",
        summary:
          "Showing that a small set of connectives can express every truth function",
        estReadMin: 13,
        introduces: [
          "functional completeness",
          "adequate set",
          "disjunctive normal form",
        ],
        requires: ["truth function", "truth table", "well-formed formula"],
      },
      {
        slug: "sixteen-connectives",
        title: "The Sixteen Binary Connectives",
        summary:
          "Enumerating every binary truth function, and showing that the Sheffer stroke and the Peirce arrow are each complete alone",
        estReadMin: 15,
        introduces: ["Sheffer stroke", "Peirce arrow", "binary truth function"],
        requires: ["functional completeness", "adequate set", "truth table"],
      },
      {
        slug: "natural-deduction",
        title: "Natural Deduction",
        summary:
          "Introduction and elimination rules, conditional proof, and reductio",
        estReadMin: 18,
        introduces: [
          "natural deduction",
          "proof system",
          "introduction rule",
          "elimination rule",
          "conditional proof",
          "reductio ad absurdum",
          "discharge",
          "assumption",
        ],
        requires: [
          "well-formed formula",
          "modus ponens",
          "syntactic consequence",
        ],
      },
      {
        slug: "semantic-tableaux",
        title: "Semantic Tableaux",
        summary:
          "A decision procedure that searches for a countermodel and reports failure as proof",
        estReadMin: 14,
        introduces: ["semantic tableau", "branch closure", "countermodel"],
        requires: [
          "well-formed formula",
          "semantic consequence",
          "counterexample",
          "model",
        ],
      },
      {
        slug: "axiomatic-systems",
        title: "Axiomatic Systems and the Deduction Theorem",
        summary:
          "Hilbert-style proof, why it is painful to use, and the theorem that makes it usable",
        estReadMin: 18,
        introduces: [
          "axiom schema",
          "Hilbert system",
          "deduction theorem",
          "derivation",
        ],
        requires: [
          "proof system",
          "syntactic consequence",
          "natural deduction",
        ],
      },
      {
        slug: "predicate-logic",
        title: "Predicate Logic",
        summary:
          "Quantifiers, variable binding, scope, and multiply quantified sentences",
        estReadMin: 20,
        introduces: [
          "predicate",
          "universal quantifier",
          "existential quantifier",
          "bound variable",
          "free variable",
          "domain of discourse",
          "quantifier scope",
        ],
        requires: ["well-formed formula", "scope", "translation key"],
      },
      {
        slug: "identity-and-descriptions",
        title: "Identity and Definite Descriptions",
        summary:
          "Adding the identity predicate, numerical claims, and Russell's analysis of 'the'",
        estReadMin: 15,
        introduces: [
          "identity predicate",
          "definite description",
          "Russell's theory of descriptions",
        ],
        requires: [
          "predicate",
          "universal quantifier",
          "existential quantifier",
          "bound variable",
        ],
      },
      {
        slug: "set-theory-for-logicians",
        title: "Basic Set Theory for Logicians",
        summary:
          "Membership, functions, relations, and cardinality, at the depth metatheory needs",
        estReadMin: 16,
        introduces: [
          "set",
          "relation",
          "function",
          "cardinality",
          "countable set",
          "power set",
        ],
        requires: ["recursive definition", "domain of discourse"],
      },
      {
        slug: "probability-as-an-extension-of-logic",
        title: "Probability as an Extension of Logic",
        summary:
          "The Kolmogorov axioms read as a generalisation of the truth table, with Cox's derivation of them from constraints on plausible reasoning",
        estReadMin: 18,
        introduces: [
          "Kolmogorov axioms",
          "probability measure",
          "field of events",
          "finite additivity",
          "Cox's theorem",
          "statistical independence",
          "principle of indifference",
          "Bertrand's paradox",
        ],
        requires: [
          "set",
          "function",
          "proposition",
          "tautology",
          "disjunction",
          "truth function",
          "conditional probability",
        ],
      },
      {
        slug: "soundness-and-completeness-informally",
        title: "Soundness and Completeness, Informally",
        summary:
          "What the two metatheorems claim, before anyone tries to prove them",
        estReadMin: 12,
        introduces: [
          "soundness theorem",
          "completeness theorem",
          "consistency",
        ],
        requires: [
          "semantic consequence",
          "syntactic consequence",
          "proof system",
          "axiom schema",
        ],
      },
      {
        slug: "modal-logic-foundations",
        title: "Modal Logic: Possible Worlds Semantics",
        summary:
          "The box and diamond, frames, models, and the accessibility relation",
        estReadMin: 22,
        introduces: [
          "necessity operator",
          "possibility operator",
          "possible world",
          "frame",
          "accessibility relation",
          "Kripke model",
        ],
        requires: ["predicate", "relation", "semantic consequence", "model"],
      },
      {
        slug: "normal-modal-systems",
        title: "The Normal Systems K, D, T, B, S4, S5",
        summary:
          "Each system's characteristic axiom and the frame condition it corresponds to",
        estReadMin: 24,
        introduces: [
          "system K",
          "system D",
          "system T",
          "system B",
          "system S4",
          "system S5",
          "normal modal logic",
        ],
        requires: [
          "necessity operator",
          "frame",
          "accessibility relation",
          "axiom schema",
        ],
      },
    ],
    advanced: [
      {
        slug: "soundness-and-completeness-proofs",
        title: "Soundness and Completeness Proofs",
        summary:
          "Full proofs for propositional logic and the Henkin construction for first-order logic",
        estReadMin: 30,
        introduces: [
          "Lindenbaum's lemma",
          "maximal consistent set",
          "Henkin construction",
          "canonical model",
        ],
        requires: [
          "soundness theorem",
          "completeness theorem",
          "axiom schema",
          "set",
          "consistency",
        ],
      },
      {
        slug: "compactness-and-lowenheim-skolem",
        title: "Compactness and Löwenheim-Skolem",
        summary:
          "Two corollaries of completeness, and the limits they place on first-order description",
        estReadMin: 22,
        introduces: [
          "compactness theorem",
          "Löwenheim-Skolem theorem",
          "Skolem's paradox",
          "elementary equivalence",
        ],
        requires: [
          "completeness theorem",
          "cardinality",
          "countability",
          "canonical model",
        ],
      },
      {
        slug: "computability-and-decidability",
        title: "Computability, Decidability, and Church's Theorem",
        summary:
          "Recursive functions, the halting problem, and the proof that first-order validity has no decision procedure",
        estReadMin: 26,
        introduces: [
          "recursive function",
          "recursively enumerable set",
          "Church-Turing thesis",
          "halting problem",
          "decidability",
          "Church's theorem",
        ],
        requires: [
          "set",
          "function",
          "countability",
          "recursive definition",
          "predicate",
        ],
      },
      {
        slug: "sequent-calculus-and-cut-elimination",
        title: "Sequent Calculus and Cut Elimination",
        summary:
          "Gentzen's LK and LJ, the structural rules, and the Hauptsatz that makes proof search possible",
        estReadMin: 28,
        introduces: [
          "sequent",
          "structural rule",
          "cut rule",
          "cut elimination",
          "subformula property",
        ],
        requires: [
          "natural deduction",
          "proof system",
          "well-formed formula",
          "syntactic consequence",
        ],
      },
      {
        slug: "godel-incompleteness",
        title: "Gödel's Incompleteness Theorems",
        summary:
          "Arithmetization, the fixed-point lemma, and what the theorems do and do not show",
        estReadMin: 32,
        introduces: [
          "Gödel numbering",
          "diagonal lemma",
          "first incompleteness theorem",
          "second incompleteness theorem",
          "recursive axiomatizability",
        ],
        requires: [
          "axiom schema",
          "consistency",
          "recursively enumerable set",
          "decidability",
          "completeness theorem",
        ],
      },
      {
        slug: "tarski-undefinability-and-theories-of-truth",
        title: "Undefinability and the Theories of Truth",
        summary:
          "Tarski's theorem, the hierarchy it forces, and Kripke's fixed-point alternative",
        estReadMin: 28,
        introduces: [
          "undefinability theorem",
          "T-schema",
          "semantic closure",
          "fixed-point theory of truth",
          "groundedness",
          "strengthened liar",
        ],
        requires: [
          "diagonal lemma",
          "Gödel numbering",
          "metalanguage",
          "object language",
        ],
      },
      {
        slug: "provability-logic",
        title: "Provability Logic and Löb's Theorem",
        summary:
          "Reading the box as 'is provable in PA', and the modal system that turns out to be exactly right",
        estReadMin: 30,
        introduces: [
          "provability logic",
          "system GL",
          "Löb's theorem",
          "arithmetical interpretation",
          "arithmetical completeness",
        ],
        requires: [
          "second incompleteness theorem",
          "normal modal logic",
          "frame",
          "system S4",
        ],
      },
      {
        slug: "nonstandard-models-of-arithmetic",
        title: "Nonstandard Models of Arithmetic",
        summary:
          "What compactness forces into existence, the order type it has to have, and Tennenbaum's theorem",
        estReadMin: 26,
        introduces: [
          "nonstandard model",
          "nonstandard element",
          "overspill",
          "Tennenbaum's theorem",
        ],
        requires: [
          "compactness theorem",
          "elementary equivalence",
          "first incompleteness theorem",
        ],
      },
      {
        slug: "model-theory-and-categoricity",
        title: "Model Theory: Types, Quantifier Elimination, Categoricity",
        summary:
          "The machinery that classifies theories by the models they admit, up to Morley's theorem",
        estReadMin: 30,
        introduces: [
          "complete type",
          "saturation",
          "quantifier elimination",
          "categoricity",
          "Morley's theorem",
          "o-minimality",
        ],
        requires: [
          "Löwenheim-Skolem theorem",
          "elementary equivalence",
          "cardinality",
          "canonical model",
        ],
      },
      {
        slug: "second-order-logic",
        title: "Second-Order and Higher-Order Logic",
        summary:
          "Quantifying into predicate position, standard versus Henkin semantics, and the trade of completeness for categoricity",
        estReadMin: 24,
        introduces: [
          "second-order logic",
          "standard semantics",
          "Henkin semantics",
          "comprehension schema",
        ],
        requires: [
          "predicate",
          "completeness theorem",
          "compactness theorem",
          "Löwenheim-Skolem theorem",
          "categoricity",
        ],
      },
      {
        slug: "reverse-mathematics",
        title: "Reverse Mathematics",
        summary:
          "Asking which axioms a theorem needs by deriving the axioms back from it, and the five subsystems that keep appearing",
        estReadMin: 28,
        introduces: [
          "reverse mathematics",
          "subsystem of second-order arithmetic",
          "RCA-zero",
          "weak König's lemma",
          "arithmetical comprehension",
        ],
        requires: [
          "second-order logic",
          "comprehension schema",
          "recursively enumerable set",
          "compactness theorem",
        ],
      },
      {
        slug: "correspondence-theory",
        title: "Correspondence Theory",
        summary:
          "Proving that a modal formula is valid on exactly the frames with a given property",
        estReadMin: 20,
        introduces: ["frame validity", "correspondence", "canonicity"],
        requires: [
          "frame",
          "accessibility relation",
          "normal modal logic",
          "system S4",
        ],
      },
      {
        slug: "quantified-modal-logic",
        title: "Quantified Modal Logic and the Barcan Formulas",
        summary:
          "What happens when quantifiers meet the box: constant versus variable domains, and the necessity of identity",
        estReadMin: 26,
        introduces: [
          "Barcan formula",
          "converse Barcan formula",
          "constant domain semantics",
          "variable domain semantics",
          "necessity of identity",
        ],
        requires: [
          "universal quantifier",
          "necessity operator",
          "Kripke model",
          "identity predicate",
          "counterpart theory",
        ],
      },
      {
        slug: "non-normal-modal-logics",
        title: "Non-Normal Modal Logics",
        summary:
          "The Lewis systems below K, neighbourhood semantics, and impossible worlds",
        estReadMin: 24,
        introduces: [
          "neighbourhood semantics",
          "non-normal world",
          "impossible world",
          "Lewis systems",
        ],
        requires: ["normal modal logic", "Kripke model", "frame validity"],
      },
      {
        slug: "intuitionistic-logic",
        title: "Intuitionistic Logic and Kripke Semantics",
        summary:
          "Dropping excluded middle, the BHK reading of the connectives, and monotone Kripke models",
        estReadMin: 24,
        introduces: [
          "intuitionistic logic",
          "excluded middle",
          "BHK interpretation",
          "constructive proof",
          "monotonicity",
        ],
        requires: [
          "Kripke model",
          "natural deduction",
          "reductio ad absurdum",
          "accessibility relation",
        ],
      },
      {
        slug: "curry-howard-correspondence",
        title: "The Curry-Howard Correspondence",
        summary:
          "Proofs as programs: the isomorphism between natural deduction and the typed lambda calculus, and what normalization turns out to be",
        estReadMin: 28,
        introduces: [
          "Curry-Howard correspondence",
          "simply typed lambda calculus",
          "propositions as types",
          "proof normalization",
        ],
        requires: [
          "BHK interpretation",
          "constructive proof",
          "cut elimination",
          "natural deduction",
        ],
      },
      {
        slug: "substructural-logics",
        title: "Substructural Logics",
        summary:
          "Dropping weakening, contraction, or exchange, and what linear logic and the Lambek calculus buy by doing it",
        estReadMin: 26,
        introduces: [
          "substructural logic",
          "weakening",
          "contraction",
          "exchange",
          "linear logic",
          "Lambek calculus",
        ],
        requires: ["structural rule", "cut elimination", "sequent"],
      },
      {
        slug: "relevance-and-paraconsistency",
        title: "Relevance Logic and Paraconsistency",
        summary:
          "Rejecting explosion, the variable sharing constraint, and dialetheism",
        estReadMin: 22,
        introduces: [
          "explosion",
          "relevance logic",
          "paraconsistent logic",
          "dialetheism",
          "variable sharing",
        ],
        requires: [
          "disjunctive syllogism",
          "semantic consequence",
          "substructural logic",
          "intuitionistic logic",
        ],
      },
      {
        slug: "many-valued-logics",
        title: "Many-Valued Logics",
        summary:
          "Łukasiewicz three-valued logic, the Kleene schemes, and the logic of paradox",
        estReadMin: 22,
        introduces: [
          "truth value gap",
          "truth value glut",
          "designated value",
          "Kleene logic",
          "logic of paradox",
        ],
        requires: ["truth function", "truth table", "paraconsistent logic"],
      },
      {
        slug: "vagueness-and-the-sorites",
        title: "Vagueness and the Sorites",
        summary:
          "Supervaluationism, degree theories, epistemicism, and the problem of higher-order vagueness",
        estReadMin: 26,
        introduces: [
          "sorites paradox",
          "supervaluationism",
          "penumbral connection",
          "epistemicism about vagueness",
          "higher-order vagueness",
        ],
        requires: ["truth value gap", "excluded middle", "designated value"],
      },
      {
        slug: "conditionals-and-triviality",
        title: "Conditionals and the Triviality Results",
        summary:
          "Indicative against subjunctive, the Stalnaker-Lewis semantics, Adams' thesis, and why probability cannot be a conditional's meaning",
        estReadMin: 28,
        introduces: [
          "indicative conditional",
          "subjunctive conditional",
          "Stalnaker-Lewis semantics",
          "Adams' thesis",
          "triviality result",
        ],
        requires: [
          "material conditional",
          "possible world",
          "possibility operator",
          "semantic consequence",
          "conditional probability",
        ],
      },
      {
        slug: "probability-logic-and-uncertain-premises",
        title: "Probability Logic and Uncertain Premises",
        summary:
          "Validity fails to preserve certainty you never had, so the real question is how much uncertainty a valid inference can accumulate",
        estReadMin: 26,
        introduces: [
          "probabilistic validity",
          "uncertainty accumulation",
          "probabilistic entailment interval",
          "Popper function",
          "primitive conditional probability",
          "regularity",
          "imprecise probability",
        ],
        requires: [
          "Kolmogorov axioms",
          "probability measure",
          "finite additivity",
          "Adams' thesis",
          "semantic consequence",
          "validity",
          "conditional probability",
        ],
      },
      {
        slug: "inductive-logic-and-the-carnap-programme",
        title: "Inductive Logic and the Carnap Programme",
        summary:
          "The attempt to make confirmation a matter of logical form alone, the parameter it needed, and the result that universal laws end up confirmed to degree zero",
        estReadMin: 28,
        introduces: [
          "logical probability",
          "inductive logic",
          "continuum of inductive methods",
          "exchangeability",
          "zero confirmation of universal laws",
          "Hintikka systems",
        ],
        requires: [
          "probability measure",
          "principle of indifference",
          "probabilistic validity",
          "induction",
          "enumerative induction",
          "new riddle of induction",
        ],
      },
      {
        slug: "free-logic",
        title: "Free Logic",
        summary:
          "Quantifying without existence assumptions, and the positive, negative, and neutral variants",
        estReadMin: 18,
        introduces: ["free logic", "outer domain", "empty domain"],
        requires: [
          "universal quantifier",
          "existential quantifier",
          "definite description",
          "truth value gap",
          "existence predicate",
        ],
      },
      {
        slug: "temporal-deontic-epistemic",
        title: "Temporal, Deontic, and Epistemic Logic",
        summary:
          "Three applied modal families, their characteristic axioms, and their characteristic paradoxes",
        estReadMin: 26,
        introduces: [
          "temporal logic",
          "deontic logic",
          "epistemic logic",
          "logical omniscience",
          "contrary-to-duty paradox",
        ],
        requires: [
          "normal modal logic",
          "system S4",
          "system S5",
          "accessibility relation",
          "impossible world",
        ],
      },
      {
        slug: "logical-consequence-and-logicality",
        title: "What Makes a Constant Logical?",
        summary:
          "Tarski's analysis of consequence, the permutation invariance criterion, and the case for logical pluralism",
        estReadMin: 26,
        introduces: [
          "logical constant",
          "permutation invariance",
          "model-theoretic consequence",
          "logical pluralism",
        ],
        requires: [
          "semantic consequence",
          "model",
          "second-order logic",
          "relevance logic",
        ],
      },
    ],
  },
};
