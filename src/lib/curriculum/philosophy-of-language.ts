import type { Subject } from "@/lib/types";

export const philosophyOfLanguage: Subject = {
  slug: "philosophy-of-language",
  name: "Philosophy of Language",
  group: "core",
  oneLine:
    "How words mean, refer, and do things, and what makes them mean anything at all.",
  scope:
    "Philosophy of language asks what meaning is, how words latch on to the world, and how speakers get across more than they say. The beginner tier builds the basic vocabulary of reference, truth conditions, sense, implicature, speech acts, and context. The intermediate tier covers the classic twentieth-century debates: Russell and Strawson, Kripke on names and necessity, possible-worlds semantics, Grice, Wittgenstein on rules, and Quine and Davidson on interpretation. The advanced tier is research-level and runs in five strands: reference and context after Kaplan, formal semantics from Montague to inquisitive semantics, context-sensitivity and relativism, pragmatics and the politics of speech, and metasemantics, the question of what makes an expression mean what it does.",
  ladder: {
    beginner: [
      {
        slug: "what-meaning-is",
        title: "What Meaning Is",
        summary:
          "Words, sentences, and the difference between using an expression and talking about it",
        estReadMin: 8,
        introduces: [
          "philosophy of language",
          "meaning",
          "linguistic expression",
          "use-mention distinction",
        ],
        requires: ["type-token distinction"],
      },
      {
        slug: "words-and-the-world",
        title: "Words and the World",
        summary:
          "How a name picks out a thing and a predicate picks out a feature",
        estReadMin: 9,
        introduces: ["reference", "referent", "singular term", "general term"],
        requires: ["meaning", "object", "property"],
      },
      {
        slug: "sentences-and-truth-conditions",
        title: "Sentences and Truth Conditions",
        summary:
          "Knowing what a sentence means as knowing what the world would have to be like for it to be true",
        estReadMin: 10,
        introduces: ["truth condition", "sentence meaning", "compositionality"],
        requires: ["truth", "proposition", "reference", "meaning"],
      },
      {
        slug: "sense-and-reference",
        title: "Sense and Reference",
        summary:
          "Frege's puzzle about informative identities and the idea of a mode of presentation",
        estReadMin: 11,
        introduces: ["sense", "Frege's puzzle", "cognitive significance"],
        requires: ["reference", "numerical identity", "truth condition"],
      },
      {
        slug: "names-and-descriptions",
        title: "Names and Descriptions",
        summary:
          "Whether a proper name is shorthand for a description of its bearer",
        estReadMin: 10,
        introduces: ["proper name", "description theory of names"],
        requires: ["sense", "singular term"],
      },
      {
        slug: "saying-and-implying",
        title: "Saying and Implying",
        summary:
          "The gap between what a sentence means and what a speaker gets across by uttering it",
        estReadMin: 10,
        introduces: [
          "semantics",
          "pragmatics",
          "speaker meaning",
          "conversational implicature",
          "cooperative principle",
        ],
        requires: ["sentence meaning"],
      },
      {
        slug: "doing-things-with-words",
        title: "Doing Things with Words",
        summary:
          "Promising, naming, and warning, and why some utterances are acts rather than reports",
        estReadMin: 10,
        introduces: [
          "speech act",
          "performative utterance",
          "illocutionary force",
          "perlocutionary effect",
          "assertion",
        ],
        requires: ["speaker meaning"],
      },
      {
        slug: "i-here-now",
        title: "I, Here, Now",
        summary:
          "Words whose reference shifts with who speaks, where, and when",
        estReadMin: 9,
        introduces: [
          "indexical",
          "demonstrative",
          "context of utterance",
          "context-sensitivity",
        ],
        requires: ["truth condition", "reference"],
      },
      {
        slug: "ambiguity-and-figurative-speech",
        title: "Ambiguity and Figurative Speech",
        summary:
          "Sentences with two meanings, and sentences that mean one thing and say another",
        estReadMin: 9,
        introduces: [
          "ambiguity",
          "lexical ambiguity",
          "structural ambiguity",
          "literal meaning",
          "metaphor",
        ],
        requires: ["sentence meaning", "speaker meaning"],
      },
      {
        slug: "meaning-and-use",
        title: "Meaning and Use",
        summary:
          "The later Wittgenstein's suggestion that meaning lies in how words are used in a practice",
        estReadMin: 10,
        introduces: ["meaning as use", "language game", "family resemblance"],
        requires: ["meaning", "speech act"],
      },
    ],
    intermediate: [
      {
        slug: "russell-strawson-and-referring",
        title: "Russell, Strawson, and Referring",
        summary:
          "Whether 'the present King of France is bald' is false or neither true nor false",
        estReadMin: 15,
        introduces: ["presupposition", "referential use", "attributive use"],
        requires: [
          "definite description",
          "Russell's theory of descriptions",
          "proper name",
          "description theory of names",
        ],
      },
      {
        slug: "naming-and-necessity",
        title: "Naming and Necessity",
        summary:
          "Kripke's modal and epistemic arguments against descriptivism and the causal picture that replaced it",
        estReadMin: 17,
        introduces: [
          "rigid designator",
          "modal argument",
          "epistemic argument",
          "causal theory of reference",
          "initial baptism",
        ],
        requires: [
          "proper name",
          "description theory of names",
          "possible world",
          "necessity",
        ],
      },
      {
        slug: "the-necessary-a-posteriori",
        title: "The Necessary A Posteriori",
        summary:
          "Water is H2O, the standard metre, and how rigid designation splits necessity from apriority",
        estReadMin: 15,
        introduces: ["contingent a priori", "reference-fixing description"],
        requires: [
          "necessary a posteriori",
          "rigid designator",
          "a priori",
          "natural kind term",
          "metaphysical possibility",
        ],
      },
      {
        slug: "intensions-and-possible-worlds-semantics",
        title: "Intensions and Possible-Worlds Semantics",
        summary:
          "Carnap's idea of meaning as a function from worlds to extensions, and where it runs out",
        estReadMin: 15,
        introduces: ["intension", "extension", "intensional context"],
        requires: [
          "possible world",
          "truth condition",
          "sense",
          "compositionality",
        ],
      },
      {
        slug: "belief-reports-and-opacity",
        title: "Belief Reports and Opacity",
        summary:
          "Why Lois can believe Superman flies without believing Clark Kent flies, if she can",
        estReadMin: 16,
        introduces: [
          "referential opacity",
          "attitude report",
          "Millianism",
          "de re belief",
        ],
        requires: [
          "propositional attitude",
          "Frege's puzzle",
          "intensional context",
          "de re modality",
        ],
      },
      {
        slug: "truth-conditional-semantics",
        title: "Truth-Conditional Semantics from Tarski to Davidson",
        summary:
          "Using a recursive theory of truth for a language as a theory of meaning for it",
        estReadMin: 17,
        introduces: [
          "truth-conditional semantics",
          "Convention T",
          "Davidsonian truth theory",
          "learnability argument",
        ],
        requires: [
          "compositionality",
          "truth condition",
          "object language",
          "metalanguage",
          "recursive definition",
        ],
      },
      {
        slug: "grice-on-meaning-and-implicature",
        title: "Grice on Meaning and Implicature",
        summary:
          "Non-natural meaning, the conversational maxims, and the tests that sort implicature from content",
        estReadMin: 16,
        introduces: [
          "non-natural meaning",
          "maxims of conversation",
          "cancellability",
          "scalar implicature",
          "generalized conversational implicature",
        ],
        requires: [
          "speaker meaning",
          "conversational implicature",
          "cooperative principle",
        ],
      },
      {
        slug: "rule-following-and-private-language",
        title: "Rule-Following and Private Language",
        summary:
          "Wittgenstein on what it is to follow a rule and why a language only one person could understand is incoherent",
        estReadMin: 16,
        introduces: [
          "rule-following",
          "private language argument",
          "beetle in a box",
        ],
        requires: ["meaning as use", "language game"],
      },
      {
        slug: "radical-translation-and-indeterminacy",
        title: "Radical Translation and Indeterminacy",
        summary:
          "Quine's field linguist, 'gavagai', and the claim that there is no fact of the matter about translation",
        estReadMin: 16,
        introduces: [
          "radical translation",
          "indeterminacy of translation",
          "inscrutability of reference",
        ],
        requires: [
          "analytic-synthetic distinction",
          "confirmation holism",
          "reference",
        ],
      },
      {
        slug: "radical-interpretation-and-charity",
        title: "Radical Interpretation and Charity",
        summary:
          "Davidson's interpreter, who must assign beliefs and meanings together, and the principle that lets them",
        estReadMin: 15,
        introduces: [
          "radical interpretation",
          "principle of charity",
          "triangulation",
        ],
        requires: [
          "radical translation",
          "Davidsonian truth theory",
          "propositional attitude",
        ],
      },
      {
        slug: "lewis-on-convention",
        title: "Lewis on Convention",
        summary:
          "How a meaning can be conventional without anyone having agreed to it",
        estReadMin: 15,
        introduces: [
          "convention",
          "coordination problem",
          "common knowledge",
          "convention of truthfulness and trust",
        ],
        requires: ["meaning", "speaker meaning"],
      },
      {
        slug: "empty-names-and-fiction",
        title: "Empty Names and Fiction",
        summary:
          "What 'Vulcan' and 'Sherlock Holmes' contribute to a sentence if they name nothing",
        estReadMin: 15,
        introduces: ["empty name", "pretence theory", "fiction operator"],
        requires: [
          "proper name",
          "Millianism",
          "fictional object",
          "nonexistent object",
        ],
      },
    ],
    advanced: [
      {
        slug: "kaplan-character-and-content",
        title: "Kaplan: Character and Content",
        summary:
          "The logic of demonstratives, direct reference, and the two levels of indexical meaning",
        estReadMin: 22,
        introduces: [
          "Kaplanian character",
          "Kaplanian content",
          "direct reference",
          "logic of demonstratives",
        ],
        requires: [
          "indexical",
          "context of utterance",
          "intension",
          "rigid designator",
        ],
      },
      {
        slug: "monsters-and-shifting-indexicals",
        title: "Monsters and Shifting Indexicals",
        summary:
          "Kaplan's ban on operators that shift context, and the languages that seem to break it",
        estReadMin: 22,
        introduces: ["monster", "indexical shift"],
        requires: [
          "Kaplanian character",
          "Kaplanian content",
          "attitude report",
        ],
      },
      {
        slug: "two-dimensional-semantics",
        title: "Two-Dimensional Semantics",
        summary:
          "Primary and secondary intensions, Stalnaker's diagonal, and Chalmers's bid to restore the link between meaning and apriority",
        estReadMin: 25,
        introduces: [
          "two-dimensional semantics",
          "primary intension",
          "secondary intension",
          "diagonal proposition",
        ],
        requires: [
          "necessary a posteriori",
          "Kaplanian character",
          "centred proposition",
          "intension",
        ],
      },
      {
        slug: "kripkes-puzzle-about-belief",
        title: "Kripke's Puzzle About Belief",
        summary:
          "Pierre, London, and Londres, and why the puzzle is not Frege's puzzle in disguise",
        estReadMin: 20,
        introduces: [
          "Kripke's puzzle about belief",
          "disquotation principle",
          "translation principle",
        ],
        requires: ["attitude report", "Millianism", "Frege's puzzle"],
      },
      {
        slug: "reference-after-kripke",
        title: "Reference After Kripke",
        summary:
          "Evans's Madagascar case, descriptive names, the qua problem, and causal descriptivism",
        estReadMin: 22,
        introduces: [
          "reference shift",
          "descriptive name",
          "qua problem",
          "causal descriptivism",
        ],
        requires: [
          "causal theory of reference",
          "initial baptism",
          "description theory of names",
          "rigid designator",
        ],
      },
      {
        slug: "structured-propositions-and-unity",
        title: "Structured Propositions and Their Unity",
        summary:
          "Russellian propositions, what holds their parts together, and the act-type theories of Soames and Hanks",
        estReadMin: 24,
        introduces: [
          "structured proposition",
          "Russellian proposition",
          "unity of the proposition",
          "act-type theory of propositions",
        ],
        requires: [
          "proposition",
          "compositionality",
          "intension",
          "Millianism",
        ],
      },
      {
        slug: "hyperintensionality-and-truthmaker-semantics",
        title: "Hyperintensionality and Truthmaker Semantics",
        summary:
          "Distinctions finer than necessary equivalence, Fine's exact verification, and Yablo on subject matter",
        estReadMin: 25,
        introduces: [
          "hyperintensionality",
          "truthmaker semantics",
          "exact verification",
          "subject matter",
        ],
        requires: [
          "intension",
          "impossible world",
          "truthmaker",
          "structured proposition",
        ],
      },
      {
        slug: "montague-grammar",
        title: "Montague Grammar and Type-Driven Interpretation",
        summary:
          "Treating English as a formal language with the typed lambda calculus doing the composition",
        estReadMin: 26,
        introduces: [
          "Montague grammar",
          "semantic type",
          "type-driven interpretation",
          "functional application",
        ],
        requires: [
          "simply typed lambda calculus",
          "compositionality",
          "intension",
          "Davidsonian truth theory",
        ],
      },
      {
        slug: "generalized-quantifiers",
        title: "Generalized Quantifiers",
        summary:
          "'Most', conservativity, and why determiners denote relations between sets",
        estReadMin: 22,
        introduces: [
          "generalized quantifier",
          "conservativity",
          "determiner",
          "quantifier raising",
        ],
        requires: [
          "quantifier",
          "semantic type",
          "Montague grammar",
          "quantifier scope",
        ],
      },
      {
        slug: "event-semantics",
        title: "Event Semantics",
        summary:
          "Davidson's hidden event argument, adverb dropping, and the neo-Davidsonian thematic roles",
        estReadMin: 22,
        introduces: [
          "event argument",
          "neo-Davidsonian semantics",
          "thematic role",
        ],
        requires: [
          "event",
          "Davidsonian truth theory",
          "functional application",
          "fine-grained event",
        ],
      },
      {
        slug: "dynamic-semantics-and-donkey-anaphora",
        title: "Dynamic Semantics and Donkey Anaphora",
        summary:
          "'Every farmer who owns a donkey beats it', E-type pronouns, Kamp's DRT, and meaning as context change",
        estReadMin: 26,
        introduces: [
          "donkey anaphora",
          "E-type pronoun",
          "discourse representation theory",
          "dynamic semantics",
          "context change potential",
        ],
        requires: [
          "quantifier scope",
          "bound variable",
          "generalized quantifier",
        ],
      },
      {
        slug: "questions-and-inquisitive-semantics",
        title: "Questions, Focus, and Inquisitive Semantics",
        summary:
          "Hamblin sets, partitions of logical space, Rooth on focus, and propositions that raise issues as well as settle them",
        estReadMin: 25,
        introduces: [
          "Hamblin semantics",
          "partition semantics",
          "alternative semantics",
          "focus",
          "inquisitive semantics",
        ],
        requires: ["intension", "possible world", "semantic type"],
      },
      {
        slug: "common-ground-and-accommodation",
        title: "Common Ground and Accommodation",
        summary:
          "Stalnaker's model of assertion as shrinking a context set, and Lewis's rule of accommodation",
        estReadMin: 22,
        introduces: ["common ground", "context set", "accommodation"],
        requires: [
          "assertion",
          "presupposition",
          "possible world",
          "common knowledge",
        ],
      },
      {
        slug: "presupposition-projection",
        title: "Presupposition Projection",
        summary:
          "Why presuppositions survive negation and questions, Karttunen's filters, Heim's satisfaction theory, and Schlenker's local contexts",
        estReadMin: 26,
        introduces: [
          "projection problem",
          "presupposition trigger",
          "satisfaction theory",
          "local context",
        ],
        requires: [
          "presupposition",
          "common ground",
          "context change potential",
          "accommodation",
        ],
      },
      {
        slug: "minimalism-contextualism-and-hidden-indexicals",
        title: "Minimalism, Contextualism, and Hidden Indexicals",
        summary:
          "Cappelen and Lepore against Recanati and Travis, and Stanley's binding argument for covert variables",
        estReadMin: 25,
        introduces: [
          "semantic minimalism",
          "truth-conditional pragmatics",
          "Travis case",
          "unarticulated constituent",
          "binding argument",
        ],
        requires: [
          "context-sensitivity",
          "indexical",
          "contextualism",
          "conversational implicature",
          "Kaplanian content",
        ],
      },
      {
        slug: "kratzer-modals-and-conditionals",
        title: "Kratzer on Modals and Conditionals",
        summary:
          "Modal bases, ordering sources, and the restrictor analysis of 'if'",
        estReadMin: 24,
        introduces: [
          "modal base",
          "ordering source",
          "modal flavour",
          "restrictor analysis of conditionals",
        ],
        requires: [
          "possible world",
          "indicative conditional",
          "necessity",
          "generalized quantifier",
        ],
      },
      {
        slug: "epistemic-modals-and-assessment-sensitivity",
        title: "Epistemic Modals and Assessment Sensitivity",
        summary:
          "'Might' claims, retraction, Yalcin's domain semantics, and MacFarlane's relativism about truth",
        estReadMin: 26,
        introduces: [
          "epistemic modal",
          "assessment sensitivity",
          "context of assessment",
          "truth relativism",
          "retraction",
          "domain semantics",
        ],
        requires: [
          "modal base",
          "Kaplanian content",
          "contextualism",
          "common ground",
        ],
      },
      {
        slug: "predicates-of-taste-and-faultless-disagreement",
        title: "Predicates of Taste and Faultless Disagreement",
        summary:
          "Whether two people can disagree about what is tasty without either being wrong, and metalinguistic negotiation",
        estReadMin: 22,
        introduces: [
          "predicate of personal taste",
          "faultless disagreement",
          "judge parameter",
          "metalinguistic negotiation",
        ],
        requires: [
          "assessment sensitivity",
          "truth relativism",
          "context-sensitivity",
          "expressivism",
        ],
      },
      {
        slug: "relevance-theory-and-neo-gricean-pragmatics",
        title: "Relevance Theory and Neo-Gricean Pragmatics",
        summary:
          "Sperber and Wilson's single principle, explicature, and Horn's two-principle reduction of the maxims",
        estReadMin: 22,
        introduces: [
          "relevance theory",
          "explicature",
          "neo-Gricean pragmatics",
          "Horn scale",
        ],
        requires: [
          "maxims of conversation",
          "scalar implicature",
          "generalized conversational implicature",
          "truth-conditional pragmatics",
        ],
      },
      {
        slug: "grammatical-theory-of-scalar-implicature",
        title: "The Grammatical Theory of Scalar Implicature",
        summary:
          "Chierchia, Fox, and Spector's covert exhaustification operator, embedded implicatures, and free choice",
        estReadMin: 26,
        introduces: [
          "exhaustification",
          "embedded implicature",
          "free choice inference",
          "grammatical theory of implicature",
        ],
        requires: [
          "scalar implicature",
          "Horn scale",
          "alternative semantics",
          "cancellability",
        ],
      },
      {
        slug: "conventional-implicature-and-expressives",
        title: "Conventional Implicature and Expressives",
        summary:
          "Potts's multidimensional semantics, appositives, 'damn', and content that is not at issue",
        estReadMin: 23,
        introduces: [
          "conventional implicature",
          "expressive meaning",
          "at-issue content",
          "multidimensional semantics",
        ],
        requires: [
          "conversational implicature",
          "cancellability",
          "presupposition",
          "semantic type",
        ],
      },
      {
        slug: "slurs",
        title: "Slurs",
        summary:
          "Where a slur's derogation lives: content, presupposition, expressive meaning, or a social prohibition",
        estReadMin: 24,
        introduces: [
          "slur",
          "offence projection",
          "combinatorial externalism",
          "prohibitionism",
          "reclamation",
        ],
        requires: [
          "hate speech",
          "expressive meaning",
          "conventional implicature",
          "at-issue content",
        ],
      },
      {
        slug: "silencing-and-subordinating-speech",
        title: "Silencing and Subordinating Speech",
        summary:
          "Langton and Hornsby on illocutionary disablement and McGowan on covert exercitives",
        estReadMin: 23,
        introduces: [
          "illocutionary silencing",
          "uptake",
          "exercitive",
          "covert exercitive",
        ],
        requires: [
          "speech act",
          "illocutionary force",
          "perlocutionary effect",
          "convention",
        ],
      },
      {
        slug: "generics",
        title: "Generics",
        summary:
          "'Ducks lay eggs', 'mosquitoes carry malaria', Leslie's default generalisations, and generic essentialism",
        estReadMin: 23,
        introduces: [
          "generic generalisation",
          "characterising generic",
          "striking property generic",
          "generic essentialism",
        ],
        requires: ["generalized quantifier", "natural kind term"],
      },
      {
        slug: "dog-whistles-and-propaganda",
        title: "Dog Whistles and Propaganda",
        summary:
          "Coded speech, Saul's figleaves, Khoo on code words, and Stanley on undermining propaganda",
        estReadMin: 23,
        introduces: [
          "dog whistle",
          "code word",
          "figleaf",
          "undermining propaganda",
        ],
        requires: [
          "at-issue content",
          "conversational implicature",
          "common ground",
          "illocutionary silencing",
        ],
      },
      {
        slug: "derrida-iterability-and-the-searle-exchange",
        title: "Derrida, Iterability, and the Searle Exchange",
        summary:
          "Derrida's reading of Austin, the claim that every sign can be cited out of context, and the quarrel collected in Limited Inc",
        estReadMin: 26,
        introduces: [
          "iterability",
          "citationality",
          "logocentrism",
          "Searle-Derrida exchange",
        ],
        requires: [
          "performative utterance",
          "use-mention distinction",
          "convention",
          "illocutionary force",
          "speaker meaning",
        ],
      },
      {
        slug: "what-metaphors-mean",
        title: "What Metaphors Mean",
        summary:
          "Davidson's denial of metaphorical meaning against Stern's context-dependent content and Camp's perspectives",
        estReadMin: 22,
        introduces: ["metaphorical meaning", "perspectival theory of metaphor"],
        requires: [
          "metaphor",
          "literal meaning",
          "explicature",
          "Kaplanian character",
        ],
      },
      {
        slug: "a-nice-derangement-of-epitaphs",
        title: "A Nice Derangement of Epitaphs",
        summary:
          "Malapropisms, prior and passing theories, and Davidson's claim that there is no such thing as a language",
        estReadMin: 20,
        introduces: ["prior theory", "passing theory", "malapropism"],
        requires: [
          "radical interpretation",
          "convention",
          "Davidsonian truth theory",
        ],
      },
      {
        slug: "metasemantics",
        title: "Metasemantics",
        summary:
          "The difference between saying what an expression means and saying what makes it mean that",
        estReadMin: 22,
        introduces: [
          "metasemantics",
          "descriptive semantics",
          "foundational semantics",
          "intentionalism about meaning",
        ],
        requires: [
          "speaker meaning",
          "convention",
          "radical interpretation",
          "mental content",
          "Kaplanian content",
        ],
      },
      {
        slug: "kripkenstein",
        title: "Kripkenstein",
        summary:
          "Plus, quus, the sceptical paradox about meaning, and why dispositions do not answer it",
        estReadMin: 26,
        introduces: [
          "Kripkenstein",
          "quus",
          "sceptical solution",
          "normativity of meaning",
          "finitude objection",
        ],
        requires: [
          "rule-following",
          "private language argument",
          "metasemantics",
          "disposition",
        ],
      },
      {
        slug: "putnams-model-theoretic-argument",
        title: "Putnam's Model-Theoretic Argument",
        summary:
          "Using Löwenheim-Skolem to argue that reference is radically indeterminate, and the 'just more theory' reply",
        estReadMin: 26,
        introduces: [
          "model-theoretic argument",
          "just more theory",
          "internal realism",
          "permutation argument",
        ],
        requires: [
          "model",
          "interpretation",
          "Löwenheim-Skolem theorem",
          "inscrutability of reference",
          "metasemantics",
        ],
      },
      {
        slug: "interpretationism-and-eligibility",
        title: "Interpretationism and Eligibility",
        summary:
          "Lewis's answer to Putnam: meaning fixed by the best interpretation, where natural properties are easier to mean",
        estReadMin: 24,
        introduces: [
          "interpretationism",
          "eligibility",
          "global descriptivism",
        ],
        requires: [
          "reference magnetism",
          "naturalness",
          "radical interpretation",
          "model-theoretic argument",
        ],
      },
      {
        slug: "dummett-and-semantic-anti-realism",
        title: "Dummett and Semantic Anti-Realism",
        summary:
          "The manifestation and acquisition arguments against truth-conditional meaning, and the case against bivalence",
        estReadMin: 26,
        introduces: [
          "semantic anti-realism",
          "manifestation argument",
          "acquisition argument",
          "molecularism",
          "bivalence",
        ],
        requires: [
          "intuitionistic logic",
          "BHK interpretation",
          "excluded middle",
          "Davidsonian truth theory",
          "harmony",
        ],
      },
      {
        slug: "inferentialism",
        title: "Inferentialism and Normative Pragmatics",
        summary:
          "Brandom's account of meaning as inferential role, deontic scorekeeping, and logic as making inference explicit",
        estReadMin: 26,
        introduces: [
          "inferentialism",
          "material inference",
          "deontic scorekeeping",
          "logical expressivism",
        ],
        requires: [
          "harmony",
          "meaning as use",
          "assertion",
          "semantic anti-realism",
        ],
      },
      {
        slug: "bilateralism-and-expressivist-semantics",
        title: "Bilateralism and Expressivist Semantics",
        summary:
          "Rejection as a primitive speech act, Schroeder's Being For, Gibbard's hyperplans, and the negation problem",
        estReadMin: 26,
        introduces: [
          "bilateralism",
          "rejection",
          "negation problem",
          "being-for semantics",
          "hyperplan",
        ],
        requires: [
          "Frege-Geach problem",
          "embedding problem",
          "expressivism",
          "inferentialism",
          "assertion",
        ],
      },
      {
        slug: "use-theories-and-deflationary-metasemantics",
        title: "Use Theories and Deflationary Metasemantics",
        summary:
          "Horwich's acceptance properties and whether a deflationist about truth can say what fixes meaning",
        estReadMin: 22,
        introduces: ["acceptance property", "deflationary metasemantics"],
        requires: [
          "minimalism about truth",
          "meaning as use",
          "metasemantics",
          "Kripkenstein",
        ],
      },
      {
        slug: "i-language-and-semantic-internalism",
        title: "I-Language and Semantic Internalism",
        summary:
          "Chomsky's case against public languages and reference, and Pietroski's conjunctivist semantics",
        estReadMin: 25,
        introduces: [
          "I-language",
          "E-language",
          "semantic internalism",
          "conjunctivism",
        ],
        requires: [
          "semantic externalism",
          "Twin Earth",
          "Montague grammar",
          "event argument",
          "language of thought",
        ],
      },
      {
        slug: "conceptual-engineering",
        title: "Conceptual Engineering",
        summary:
          "Revising what our words mean on purpose: ameliorative analysis, topic continuity, and the implementation problem",
        estReadMin: 24,
        introduces: [
          "conceptual engineering",
          "ameliorative analysis",
          "topic continuity",
          "implementation problem",
          "Austerity Framework",
        ],
        requires: [
          "metasemantics",
          "semantic externalism",
          "metalinguistic negotiation",
          "generic essentialism",
        ],
      },
    ],
  },
};
