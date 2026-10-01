import type { Subject } from "@/lib/types";

export const metalogic: Subject = {
  slug: "metalogic",
  name: "Metalogic",
  group: "core",
  oneLine:
    "Logic about logic: what validity is, where it comes from, and how we could know.",
  scope:
    "Metalogic studies logical systems from the outside and asks what makes a logic correct. The Logic subject already proves the main metatheorems, so this subject concentrates on what they mean and on the questions they leave open. The beginner tier asks where validity comes from, what Lewis Carroll's tortoise shows, and whether logic could be wrong. The intermediate tier covers the significance of soundness and completeness, Bolzano and Tarski on consequence, logical form, conventionalism, deviant logics, and Prior's tonk. The advanced tier is research-level: Etchemendy's critique of Tarski, Kreisel's squeezing argument, the Tarski-Sher thesis, Lindström's theorem, Carnap's categoricity problem, proof-theoretic semantics, the adoption problem, the normativity of logic, anti-exceptionalism, Gentzen and ordinal analysis, and the substructural and revision-theoretic responses to the paradoxes of truth.",
  ladder: {
    beginner: [
      {
        slug: "logic-about-logic",
        title: "Logic About Logic",
        summary:
          "The difference between reasoning inside a logic and reasoning about one",
        estReadMin: 8,
        introduces: ["metalogic", "metatheory", "philosophy of logic"],
        requires: ["argument", "validity", "inference"],
      },
      {
        slug: "where-validity-comes-from",
        title: "Where Validity Comes From",
        summary:
          "Necessity, form, and topic neutrality as three candidate marks of a logical truth",
        estReadMin: 10,
        introduces: [
          "truth preservation",
          "formality of logic",
          "topic neutrality",
        ],
        requires: ["validity", "soundness", "logical possibility", "metalogic"],
      },
      {
        slug: "what-the-tortoise-said-to-achilles",
        title: "What the Tortoise Said to Achilles",
        summary:
          "Lewis Carroll's regress and why a rule of inference cannot be one more premise",
        estReadMin: 9,
        introduces: ["Carroll's regress", "rule-premise distinction"],
        requires: ["modus ponens", "validity", "inference"],
      },
      {
        slug: "laws-of-thought",
        title: "Laws of Thought",
        summary:
          "Whether logic describes how we think, and Frege's case that it cannot",
        estReadMin: 9,
        introduces: ["laws of thought", "psychologism", "anti-psychologism"],
        requires: ["inference", "truth"],
      },
      {
        slug: "paradoxes-at-the-foundations",
        title: "Paradoxes at the Foundations",
        summary:
          "The liar and Russell's paradox as arguments that look valid and end in contradiction",
        estReadMin: 10,
        introduces: ["liar paradox", "Russell's paradox", "self-reference"],
        requires: ["contradiction", "truth", "validity"],
      },
      {
        slug: "can-logic-be-wrong",
        title: "Can Logic Be Wrong?",
        summary:
          "Rival logics, the quantum logic episode, and what it would take to give up a law of logic",
        estReadMin: 10,
        introduces: ["logical revision", "rival logic", "quantum logic"],
        requires: ["tautology", "contradiction", "validity", "metalogic"],
      },
      {
        slug: "how-we-know-logic",
        title: "How We Know Logic",
        summary:
          "Intuition, convention, and inference as candidate sources of logical knowledge",
        estReadMin: 9,
        introduces: ["epistemology of logic", "logical intuition"],
        requires: ["validity", "Carroll's regress", "laws of thought"],
      },
    ],
    intermediate: [
      {
        slug: "what-metatheorems-show",
        title: "What Metatheorems Show",
        summary:
          "Reading soundness and completeness as claims about the fit between proof and truth",
        estReadMin: 14,
        introduces: [
          "metatheorem",
          "adequacy of a proof system",
          "expressive power",
        ],
        requires: [
          "soundness theorem",
          "completeness theorem",
          "proof system",
          "semantic consequence",
          "syntactic consequence",
        ],
      },
      {
        slug: "bolzano-tarski-and-consequence",
        title: "Bolzano, Tarski, and Consequence",
        summary:
          "Substitutional, modal, and model-based accounts of what it is for a conclusion to follow",
        estReadMin: 16,
        introduces: [
          "substitutional account of consequence",
          "modal account of consequence",
          "Tarski's analysis of consequence",
        ],
        requires: [
          "semantic consequence",
          "interpretation",
          "model",
          "topic neutrality",
          "truth preservation",
        ],
      },
      {
        slug: "logical-form-and-formalisation",
        title: "Logical Form and Formalisation",
        summary:
          "How an English argument gets a form, and whether there is one correct way to formalise it",
        estReadMin: 14,
        introduces: ["logical form", "formalisation"],
        requires: [
          "well-formed formula",
          "predicate",
          "paraphrase",
          "regimentation",
        ],
      },
      {
        slug: "truth-bearers",
        title: "Truth-Bearers",
        summary:
          "Sentences, statements, or propositions: what logic's validities are about",
        estReadMin: 12,
        introduces: ["truth-bearer", "eternal sentence"],
        requires: ["proposition", "type-token distinction", "truth"],
      },
      {
        slug: "conventionalism-about-logic",
        title: "Conventionalism About Logic",
        summary:
          "Carnap's principle of tolerance and Quine's regress argument against truth by convention",
        estReadMin: 15,
        introduces: [
          "conventionalism about logic",
          "principle of tolerance",
          "truth by convention",
        ],
        requires: [
          "linguistic framework",
          "analytic truth",
          "Carroll's regress",
        ],
      },
      {
        slug: "deviant-logics-and-meaning-variance",
        title: "Deviant Logics and Meaning Variance",
        summary:
          "Quine's charge that a rival logician has only changed the subject, and how the rival replies",
        estReadMin: 15,
        introduces: ["deviant logic", "meaning-variance argument"],
        requires: [
          "rival logic",
          "logical revision",
          "conventionalism about logic",
        ],
      },
      {
        slug: "tonk-and-harmony",
        title: "Tonk and Harmony",
        summary:
          "Prior's rogue connective, Belnap's conservativeness reply, and Dummett's demand for harmony",
        estReadMin: 16,
        introduces: ["tonk", "conservative extension", "harmony"],
        requires: [
          "introduction rule",
          "elimination rule",
          "natural deduction",
        ],
      },
    ],
    advanced: [
      {
        slug: "logic-as-language-and-logic-as-calculus",
        title: "Logic as Language and Logic as Calculus",
        summary:
          "Van Heijenoort's contrast between Frege's universalism and the model-theoretic view, and what each makes of metalogic",
        estReadMin: 22,
        introduces: [
          "universalism about logic",
          "logic as language",
          "logic as calculus",
        ],
        requires: ["metalogic", "model", "metalanguage"],
      },
      {
        slug: "etchemendy-against-tarski",
        title: "Etchemendy Against Tarski",
        summary:
          "The charge that model-theoretic consequence gets the extension of validity right only by luck",
        estReadMin: 26,
        introduces: [
          "interpretational semantics",
          "representational semantics",
          "overgeneration",
          "undergeneration",
        ],
        requires: [
          "model-theoretic consequence",
          "Tarski's analysis of consequence",
          "logical constant",
        ],
      },
      {
        slug: "kreisels-squeezing-argument",
        title: "Kreisel's Squeezing Argument",
        summary:
          "How completeness lets a formal notion be proved coextensive with intuitive validity",
        estReadMin: 22,
        introduces: ["squeezing argument", "informal validity"],
        requires: [
          "completeness theorem",
          "model-theoretic consequence",
          "second-order logic",
        ],
      },
      {
        slug: "the-tarski-sher-thesis",
        title: "The Tarski-Sher Thesis",
        summary:
          "Logical constants as the isomorphism-invariant operations, McGee's theorem, and Feferman's objections",
        estReadMin: 25,
        introduces: [
          "Tarski-Sher thesis",
          "isomorphism invariance",
          "McGee's theorem",
        ],
        requires: [
          "permutation invariance",
          "logical constant",
          "formality of logic",
        ],
      },
      {
        slug: "lindstroms-theorem",
        title: "Lindström's Theorem",
        summary:
          "Why no logic stronger than first-order logic keeps both compactness and Löwenheim-Skolem, and what that is supposed to prove",
        estReadMin: 25,
        introduces: ["abstract logic", "Lindström's theorem"],
        requires: [
          "compactness theorem",
          "Löwenheim-Skolem theorem",
          "second-order logic",
          "expressive power",
        ],
      },
      {
        slug: "carnaps-categoricity-problem",
        title: "Carnap's Categoricity Problem",
        summary:
          "Non-normal valuations that respect every classical rule, and the bilateral and open-ended repairs",
        estReadMin: 24,
        introduces: [
          "Carnap's categoricity problem",
          "non-normal valuation",
          "open-ended rule",
        ],
        requires: [
          "completeness theorem",
          "truth table",
          "sequent",
          "bilateralism",
        ],
      },
      {
        slug: "proof-theoretic-semantics",
        title: "Proof-Theoretic Semantics",
        summary:
          "Prawitz validity, canonical proofs, and Dummett's fundamental assumption as a theory of what connectives mean",
        estReadMin: 26,
        introduces: [
          "proof-theoretic semantics",
          "canonical proof",
          "Prawitz validity",
          "fundamental assumption",
          "inversion principle",
        ],
        requires: [
          "harmony",
          "proof normalization",
          "introduction rule",
          "cut elimination",
        ],
      },
      {
        slug: "harmony-and-classical-logic",
        title: "Harmony and Classical Logic",
        summary:
          "Whether classical negation can be harmonious: stability, general elimination rules, and multiple conclusions",
        estReadMin: 25,
        introduces: [
          "stability",
          "general elimination rule",
          "multiple-conclusion logic",
        ],
        requires: [
          "harmony",
          "proof-theoretic semantics",
          "intuitionistic logic",
          "sequent",
          "excluded middle",
        ],
      },
      {
        slug: "justifying-deduction",
        title: "Justifying Deduction",
        summary:
          "Dummett on the justification of deduction, rule-circularity, and Boghossian's blind reasoning",
        estReadMin: 24,
        introduces: [
          "rule-circularity",
          "blind reasoning",
          "meaning-constitutive rule",
        ],
        requires: [
          "Carroll's regress",
          "epistemology of logic",
          "Hume's problem of induction",
        ],
      },
      {
        slug: "the-normativity-of-logic",
        title: "The Normativity of Logic",
        summary:
          "Harman's challenge that logic says nothing about reasoning, and MacFarlane's bridge principles",
        estReadMin: 25,
        introduces: ["bridge principle", "Harman's challenge"],
        requires: [
          "preface paradox",
          "psychologism",
          "laws of thought",
          "wide-scope requirement",
        ],
      },
      {
        slug: "anti-exceptionalism-about-logic",
        title: "Anti-Exceptionalism About Logic",
        summary:
          "Williamson and Priest on choosing a logic the way one chooses a scientific theory",
        estReadMin: 24,
        introduces: ["anti-exceptionalism about logic", "logical abductivism"],
        requires: [
          "logical revision",
          "inference to the best explanation",
          "quantum logic",
        ],
      },
      {
        slug: "the-adoption-problem",
        title: "The Adoption Problem",
        summary:
          "Kripke's argument, developed by Padró, that some logical rules cannot be adopted by anyone who lacks them",
        estReadMin: 22,
        introduces: ["adoption problem", "basic logical principle"],
        requires: [
          "Carroll's regress",
          "anti-exceptionalism about logic",
          "logical revision",
        ],
      },
      {
        slug: "pluralism-nihilism-and-collapse",
        title: "Pluralism, Nihilism, and Collapse",
        summary:
          "Beall and Restall's generalised Tarski thesis, the collapse argument against pluralism, and Russell's logical nihilism",
        estReadMin: 24,
        introduces: [
          "generalised Tarski thesis",
          "collapse argument against pluralism",
          "logical nihilism",
        ],
        requires: ["logical pluralism", "logical constant", "logic of paradox"],
      },
      {
        slug: "logic-as-modelling",
        title: "Logic as Modelling",
        summary:
          "Shapiro and Cook on formal systems as models of natural-language consequence rather than descriptions of it",
        estReadMin: 20,
        introduces: ["logic as modelling", "artefact of the model"],
        requires: [
          "anti-exceptionalism about logic",
          "model-theoretic consequence",
          "formalisation",
        ],
      },
      {
        slug: "hilberts-programme-and-finitism",
        title: "Hilbert's Programme and Finitism",
        summary:
          "Securing infinitary mathematics by finitary consistency proofs, Tait's analysis of finitism, and partial realisations",
        estReadMin: 24,
        introduces: [
          "Hilbert's programme",
          "finitism",
          "primitive recursive arithmetic",
          "conservation result",
        ],
        requires: [
          "second incompleteness theorem",
          "recursive function",
          "consistency",
          "reverse mathematics",
        ],
      },
      {
        slug: "gentzen-and-ordinal-analysis",
        title: "Gentzen and Ordinal Analysis",
        summary:
          "Gentzen's consistency proof for arithmetic by transfinite induction up to epsilon-naught, and what it secures",
        estReadMin: 26,
        introduces: [
          "ordinal analysis",
          "transfinite induction",
          "epsilon-naught",
          "proof-theoretic ordinal",
        ],
        requires: [
          "Hilbert's programme",
          "cut elimination",
          "second incompleteness theorem",
        ],
      },
      {
        slug: "revision-theory-of-truth",
        title: "The Revision Theory of Truth",
        summary:
          "Gupta and Belnap on truth as a circular concept defined by revision sequences",
        estReadMin: 25,
        introduces: [
          "revision theory of truth",
          "revision sequence",
          "circular definition",
        ],
        requires: [
          "T-schema",
          "fixed-point theory of truth",
          "groundedness",
          "liar paradox",
        ],
      },
      {
        slug: "revenge-paradoxes",
        title: "Revenge Paradoxes",
        summary:
          "Why every consistent theory of the liar seems to generate a new liar in its own vocabulary",
        estReadMin: 24,
        introduces: [
          "revenge paradox",
          "transparent truth",
          "paracompleteness",
        ],
        requires: [
          "strengthened liar",
          "truth value gap",
          "fixed-point theory of truth",
          "dialetheism",
        ],
      },
      {
        slug: "substructural-solutions-to-paradox",
        title: "Substructural Solutions to Paradox",
        summary:
          "Strict-tolerant logic, validity Curry, and keeping classical logic by giving up cut or contraction",
        estReadMin: 26,
        introduces: [
          "strict-tolerant logic",
          "non-transitive logic",
          "non-contractive logic",
          "Curry's paradox",
          "validity Curry",
        ],
        requires: [
          "contraction",
          "cut rule",
          "structural rule",
          "transparent truth",
          "substructural logic",
        ],
      },
    ],
  },
};
