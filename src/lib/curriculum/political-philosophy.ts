import type { Subject } from "@/lib/types";

export const politicalPhilosophy: Subject = {
  slug: "political-philosophy",
  name: "Political Philosophy",
  group: "applied",
  oneLine: "Who gets to rule, on what terms, and within what limits.",
  scope:
    "Political philosophy asks what justifies political power and how a society's benefits and burdens should be divided. The beginner tier builds the working vocabulary of authority, the state, liberty, equality, justice, rights, and law from nothing. The intermediate tier works through the social contract tradition, Rawls and his critics, the main ideological positions, capabilities, republican freedom, democracy, punishment, and dissent. The advanced tier takes up the contemporary literature: public reason and perfectionism, the boundary problem, jurisprudence, philosophical anarchism, global justice, exploitation, structural injustice, collective agency, and the limits of markets.",
  ladder: {
    beginner: [
      {
        slug: "authority-and-legitimacy",
        title: "Authority and Legitimacy",
        summary:
          "Why some commands create obligations and others are only threats backed by force",
        estReadMin: 7,
        introduces: [
          "political authority",
          "legitimacy",
          "political obligation",
          "coercion",
        ],
      },
      {
        slug: "what-a-state-is-for",
        title: "What a State Is For",
        summary:
          "Order, defence, and public goods, and the anarchist reply that none of it requires a state",
        estReadMin: 8,
        introduces: [
          "state",
          "sovereignty",
          "monopoly on force",
          "public goods",
          "anarchism",
        ],
        requires: ["political authority", "coercion", "legitimacy"],
      },
      {
        slug: "liberty-equality-justice",
        title: "Liberty, Equality, and Justice as Three Demands",
        summary:
          "How freedom from interference, equal standing, and fair shares pull against each other",
        estReadMin: 9,
        introduces: [
          "negative liberty",
          "positive liberty",
          "equality",
          "formal equality",
          "distributive justice",
        ],
        requires: ["state", "coercion"],
      },
      {
        slug: "what-justice-requires",
        title: "What Justice Requires",
        summary:
          "Desert, need, and merit as rival bases for a share, and the difference between a fair procedure and a fair outcome",
        estReadMin: 10,
        introduces: [
          "desert",
          "need",
          "merit",
          "procedural justice",
          "corrective justice",
          "substantive equality",
        ],
        requires: ["distributive justice", "equality", "formal equality"],
      },
      {
        slug: "rights-introduced",
        title: "Rights, Introduced",
        summary:
          "Claims against others, liberties to act, and the split between rights demanding restraint and rights demanding provision",
        estReadMin: 9,
        introduces: [
          "claim right",
          "liberty right",
          "natural rights",
          "negative rights",
          "positive rights",
          "human rights",
        ],
        requires: ["political obligation", "negative liberty", "state"],
      },
      {
        slug: "law-and-the-rule-of-law",
        title: "Law and the Rule of Law",
        summary:
          "What separates a legal system from organised force, and the first split between positivists and natural lawyers",
        estReadMin: 10,
        introduces: [
          "law",
          "rule of law",
          "constitutionalism",
          "legal positivism",
          "natural law theory",
        ],
        requires: [
          "state",
          "coercion",
          "political authority",
          "political obligation",
        ],
      },
    ],
    intermediate: [
      {
        slug: "social-contract-tradition",
        title: "The Social Contract Tradition",
        summary:
          "Hobbes, Locke, and Rousseau derive the state from an agreement made out of a stateless condition, and disagree about what that condition is like",
        estReadMin: 16,
        introduces: [
          "social contract",
          "state of nature",
          "consent",
          "tacit consent",
          "Hobbesian sovereign",
          "general will",
        ],
        requires: [
          "state",
          "political authority",
          "legitimacy",
          "natural rights",
        ],
      },
      {
        slug: "rawls-original-position",
        title: "Rawls: The Original Position and the Two Principles",
        summary:
          "Choosing principles behind a screen that hides your talents, class, and conception of the good",
        estReadMin: 18,
        introduces: [
          "justice as fairness",
          "original position",
          "veil of ignorance",
          "difference principle",
          "primary goods",
          "maximin",
          "basic structure",
        ],
        requires: [
          "social contract",
          "distributive justice",
          "equality",
          "procedural justice",
        ],
      },
      {
        slug: "nozick-entitlement-theory",
        title: "Nozick and Entitlement Theory",
        summary:
          "The argument that justice depends on how holdings arose, so any fixed pattern can be kept only by blocking voluntary transfers",
        estReadMin: 14,
        introduces: [
          "entitlement theory",
          "historical principle",
          "patterned principle",
          "self-ownership",
          "Wilt Chamberlain argument",
          "Lockean proviso",
        ],
        requires: [
          "justice as fairness",
          "difference principle",
          "natural rights",
          "distributive justice",
        ],
      },
      {
        slug: "capabilities-approach",
        title: "The Capabilities Approach",
        summary:
          "Sen and Nussbaum measure advantage by what people are able to do and be rather than by resources or satisfaction",
        estReadMin: 20,
        introduces: [
          "capability",
          "functioning",
          "central capabilities",
          "adaptive preferences",
          "human development",
          "equality of what",
        ],
        requires: [
          "primary goods",
          "distributive justice",
          "equality",
          "need",
        ],
      },
      {
        slug: "four-political-positions",
        title: "Libertarianism, Liberalism, Socialism, Conservatism",
        summary:
          "What separates the four once you sort them by their commitments on property, equality, and inherited practice",
        estReadMin: 15,
        introduces: [
          "libertarianism",
          "liberalism",
          "socialism",
          "conservatism",
          "night-watchman state",
          "welfare state",
        ],
        requires: [
          "self-ownership",
          "negative liberty",
          "positive liberty",
          "distributive justice",
          "state",
        ],
      },
      {
        slug: "marx-alienation-class-ideology",
        title: "Marx on Alienation, Class, and Ideology",
        summary:
          "Labour that confronts the worker as alien, class defined by relation to productive resources, and beliefs that serve an existing order",
        estReadMin: 16,
        introduces: [
          "alienation",
          "class",
          "means of production",
          "ideology",
          "false consciousness",
          "historical materialism",
        ],
        requires: ["socialism", "liberalism", "state"],
      },
      {
        slug: "democracy-and-its-justifications",
        title: "Democracy and Its Justifications",
        summary:
          "Whether majority rule is defended by the quality of its outcomes or by the equal standing it expresses",
        estReadMin: 14,
        introduces: [
          "democracy",
          "majority rule",
          "political equality",
          "tyranny of the majority",
          "instrumental justification",
          "intrinsic justification",
        ],
        requires: ["legitimacy", "equality", "political authority"],
      },
      {
        slug: "republicanism-and-non-domination",
        title: "Republicanism and Non-Domination",
        summary:
          "Freedom as the absence of arbitrary power rather than the absence of actual interference",
        estReadMin: 20,
        introduces: [
          "non-domination",
          "republicanism",
          "arbitrary interference",
          "civic virtue",
          "contestatory democracy",
        ],
        requires: [
          "negative liberty",
          "positive liberty",
          "democracy",
          "coercion",
        ],
      },
      {
        slug: "punishment-and-the-right-to-punish",
        title: "Punishment and the Right to Punish",
        summary:
          "Backward-looking desert against forward-looking deterrence, and the separate question of who may inflict either",
        estReadMin: 17,
        introduces: [
          "punishment",
          "retributivism",
          "deterrence",
          "rehabilitation",
          "expressive theory of punishment",
          "standing to punish",
        ],
        requires: [
          "coercion",
          "political authority",
          "rule of law",
          "desert",
          "claim right",
        ],
      },
      {
        slug: "civil-disobedience",
        title: "Civil Disobedience",
        summary:
          "Public lawbreaking that accepts the penalty, and the conditions offered for when it is justified",
        estReadMin: 12,
        introduces: [
          "civil disobedience",
          "conscientious refusal",
          "unjust law",
          "nonviolence",
        ],
        requires: [
          "political obligation",
          "democracy",
          "majority rule",
          "justice as fairness",
          "punishment",
        ],
      },
      {
        slug: "toleration",
        title: "Toleration",
        summary:
          "The puzzle of putting up with what you judge to be wrong, and where a neutral state draws the line",
        estReadMin: 13,
        introduces: [
          "toleration",
          "paradox of toleration",
          "harm principle",
          "state neutrality",
          "value pluralism",
        ],
        requires: ["liberalism", "negative liberty", "state"],
      },
    ],
    advanced: [
      {
        slug: "luck-and-relational-egalitarianism",
        title: "Luck Egalitarianism and Relational Equality",
        summary:
          "Whether equality corrects for disadvantage nobody chose or instead removes standing hierarchies between citizens",
        estReadMin: 20,
        introduces: [
          "luck egalitarianism",
          "brute luck",
          "option luck",
          "relational equality",
          "social hierarchy",
          "the harshness objection",
        ],
        requires: [
          "equality of what",
          "difference principle",
          "distributive justice",
          "primary goods",
          "desert",
        ],
      },
      {
        slug: "public-reason-and-legitimacy",
        title: "Public Reason and Legitimacy",
        summary:
          "The demand that coercive law be justifiable in terms citizens holding different doctrines could accept",
        estReadMin: 22,
        introduces: [
          "public reason",
          "reasonable pluralism",
          "overlapping consensus",
          "comprehensive doctrine",
          "liberal principle of legitimacy",
        ],
        requires: [
          "legitimacy",
          "state neutrality",
          "justice as fairness",
          "toleration",
        ],
      },
      {
        slug: "political-liberalism-and-perfectionism",
        title: "Political Liberalism Against Perfectionism",
        summary:
          "Whether a state may promote a conception of the good life, and what neutrality could mean if it may not",
        estReadMin: 22,
        introduces: [
          "perfectionism",
          "anti-perfectionism",
          "neutrality of justification",
          "neutrality of effect",
          "autonomy-based liberalism",
        ],
        requires: [
          "public reason",
          "state neutrality",
          "value pluralism",
          "liberalism",
          "comprehensive doctrine",
        ],
      },
      {
        slug: "democratic-theory-variants",
        title: "Deliberative, Epistemic, and Agonistic Democracy",
        summary:
          "Three rival pictures of what democracy is for: reasoned exchange, tracking correct answers, and conflict that is never settled",
        estReadMin: 22,
        introduces: [
          "deliberative democracy",
          "aggregative democracy",
          "epistemic democracy",
          "Condorcet jury theorem",
          "agonistic pluralism",
        ],
        requires: [
          "democracy",
          "public reason",
          "majority rule",
          "instrumental justification",
        ],
      },
      {
        slug: "the-boundary-problem-of-the-demos",
        title: "The Boundary Problem",
        summary:
          "Democracy decides questions by a vote of the people, and cannot decide by a vote who the people are",
        estReadMin: 22,
        introduces: [
          "the boundary problem",
          "all-affected principle",
          "all-subjected principle",
          "constituent power",
        ],
        requires: [
          "democracy",
          "political equality",
          "deliberative democracy",
          "sovereignty",
          "legitimacy",
        ],
      },
      {
        slug: "jurisprudence-and-legal-interpretation",
        title: "Jurisprudence: Hart, Dworkin, and Hard Cases",
        summary:
          "The rule of recognition against law as an interpretive practice, and what each says a judge does when the rules run out",
        estReadMin: 26,
        introduces: [
          "rule of recognition",
          "interpretivism",
          "inclusive positivism",
          "exclusive positivism",
          "hard case",
          "judicial discretion",
        ],
        requires: [
          "law",
          "legal positivism",
          "natural law theory",
          "rule of law",
          "unjust law",
        ],
      },
      {
        slug: "philosophical-anarchism",
        title: "Philosophical Anarchism",
        summary:
          "The claim that no state is legitimate in the sense required for a general duty to obey, and that this changes less than it sounds",
        estReadMin: 22,
        introduces: [
          "philosophical anarchism",
          "the fair play principle",
          "natural duty of justice",
          "voluntarism about obligation",
        ],
        requires: [
          "political obligation",
          "consent",
          "tacit consent",
          "anarchism",
          "legitimacy",
        ],
      },
      {
        slug: "global-justice-and-cosmopolitanism",
        title: "Global Justice and Cosmopolitanism",
        summary:
          "Whether duties of distributive justice stop at the border or reach everyone, and what shared institutions have to do with it",
        estReadMin: 22,
        introduces: [
          "cosmopolitanism",
          "statism",
          "global basic structure",
          "duty of assistance",
          "associative obligation",
        ],
        requires: [
          "basic structure",
          "difference principle",
          "human rights",
          "sovereignty",
        ],
      },
      {
        slug: "immigration-and-open-borders",
        title: "Immigration and Open Borders",
        summary:
          "Arguments from freedom of movement set against a political community's claimed right to select who enters",
        estReadMin: 20,
        introduces: [
          "freedom of movement",
          "open borders",
          "right to exclude",
          "political membership",
          "brain drain objection",
        ],
        requires: [
          "cosmopolitanism",
          "statism",
          "sovereignty",
          "self-ownership",
          "the boundary problem",
        ],
      },
      {
        slug: "theories-of-exploitation",
        title: "Theories of Exploitation",
        summary:
          "Rival accounts built on surplus extraction, unfair terms of exchange, and taking advantage of vulnerability",
        estReadMin: 22,
        introduces: [
          "exploitation",
          "surplus value",
          "labour theory of value",
          "unequal exchange",
          "vulnerability account",
        ],
        requires: [
          "alienation",
          "means of production",
          "class",
          "self-ownership",
        ],
      },
      {
        slug: "ideal-and-non-ideal-theory",
        title: "Ideal and Non-Ideal Theory",
        summary:
          "What is gained and lost by theorising justice on the assumption that everyone complies and conditions are favourable",
        estReadMin: 20,
        introduces: [
          "ideal theory",
          "non-ideal theory",
          "strict compliance",
          "feasibility constraint",
          "fact-sensitivity",
        ],
        requires: [
          "justice as fairness",
          "basic structure",
          "distributive justice",
        ],
      },
      {
        slug: "race-gender-and-political-philosophy",
        title: "Critical Race Theory and Feminist Political Philosophy",
        summary:
          "Structural accounts of injustice, the racial contract as a rereading of contract theory, and the challenge to the public and private divide",
        estReadMin: 24,
        introduces: [
          "structural injustice",
          "the racial contract",
          "public/private distinction",
          "intersectionality",
          "oppression",
          "epistemic injustice",
        ],
        requires: [
          "social contract",
          "ideology",
          "non-ideal theory",
          "equality",
        ],
      },
      {
        slug: "social-ontology-and-collective-agency",
        title: "Social Ontology and Collective Agency",
        summary:
          "When a group counts as an agent in its own right, and the aggregation paradox that makes group judgment more than a sum of votes",
        estReadMin: 24,
        introduces: [
          "group agent",
          "joint intention",
          "discursive dilemma",
          "corporate responsibility",
          "methodological individualism",
        ],
        requires: [
          "structural injustice",
          "majority rule",
          "political authority",
          "aggregative democracy",
        ],
      },
      {
        slug: "property-taxation-and-redistribution",
        title: "Property, Taxation, and Redistribution",
        summary:
          "Whether pre-tax holdings are a baseline that taxation departs from, and what each answer implies about redistributive claims",
        estReadMin: 22,
        introduces: [
          "property rights",
          "pre-tax income",
          "redistribution",
          "forced labour objection",
          "everyday libertarianism",
        ],
        requires: [
          "entitlement theory",
          "self-ownership",
          "Lockean proviso",
          "welfare state",
          "difference principle",
        ],
      },
      {
        slug: "markets-and-their-limits",
        title: "Markets and Their Limits",
        summary:
          "Which goods should not be for sale, and whether the objection is to the terms of exchange or to what selling them expresses",
        estReadMin: 22,
        introduces: [
          "commodification",
          "blocked exchange",
          "noxious market",
          "spheres of justice",
          "corruption argument",
        ],
        requires: [
          "property rights",
          "exploitation",
          "vulnerability account",
          "relational equality",
          "welfare state",
        ],
      },
    ],
  },
};
