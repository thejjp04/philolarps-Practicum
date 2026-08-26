import type { Subject } from "@/lib/types";

export const philosophyOfMind: Subject = {
  slug: "philosophy-of-mind",
  name: "Philosophy of Mind",
  group: "mind",
  oneLine: "What minds are, and how they fit into a physical world.",
  scope:
    "Philosophy of mind asks what mental states are and whether they can be accounted for in physical terms. The beginner tier sets out the mind-body problem, separates consciousness from cognition, introduces perceptual experience, and asks what grounds our confidence that anyone else has a mind at all. The intermediate tier is the standard sequence of positions and the arguments that displaced each one, from dualism through behaviourism, identity theory, functionalism, and the computational theory, along with content, perception, action, and personal identity. The advanced tier is current research: illusionism and the meta-problem, the theories of consciousness, phenomenal intentionality, teleosemantics, exclusion, and the outer edges of the distribution question.",
  ladder: {
    beginner: [
      {
        slug: "the-mind-body-problem",
        title: "The Mind-Body Problem Stated",
        summary:
          "Why thoughts and brains look like different kinds of thing, and what a solution would have to deliver",
        estReadMin: 7,
        introduces: ["mind-body problem", "physicalism", "dualism", "monism"],
      },
      {
        slug: "consciousness-and-cognition",
        title: "Consciousness Versus Cognition",
        summary:
          "Separating what it is like to undergo a state from the work that state does in reasoning",
        estReadMin: 9,
        introduces: [
          "consciousness",
          "phenomenal consciousness",
          "access consciousness",
          "qualia",
          "cognition",
          "what it is like",
        ],
        requires: ["mind-body problem"],
      },
      {
        slug: "what-a-mental-state-is",
        title: "What a Mental State Is",
        summary:
          "Attitudes taken toward contents, and the difference between a state you are in now and one you merely have",
        estReadMin: 8,
        introduces: [
          "mental state",
          "propositional attitude",
          "belief",
          "desire",
          "occurrent state",
          "dispositional state",
        ],
        requires: ["mind-body problem", "cognition"],
      },
      {
        slug: "sensation-and-perception",
        title: "Sensation and Perception",
        summary:
          "What we are directly aware of when we see something, and why illusion makes that harder to answer than it looks",
        estReadMin: 10,
        introduces: [
          "perceptual experience",
          "sensation",
          "sense datum",
          "the argument from illusion",
          "hallucination",
        ],
        requires: ["mental state", "phenomenal consciousness", "what it is like"],
      },
      {
        slug: "introspection-and-its-limits",
        title: "Introspection and Its Limits",
        summary:
          "The case for first-person authority about one's own mind, and the confabulation results that cut it down",
        estReadMin: 10,
        introduces: [
          "introspection",
          "privileged access",
          "first-person authority",
          "incorrigibility",
          "confabulation",
        ],
        requires: ["mental state", "phenomenal consciousness", "belief"],
      },
      {
        slug: "the-problem-of-other-minds",
        title: "The Problem of Other Minds",
        summary:
          "Every mind but your own is an inference, and the inference has exactly one confirming case",
        estReadMin: 9,
        introduces: [
          "other minds problem",
          "argument from analogy",
          "criterion of the mental",
          "behavioural evidence",
        ],
        requires: [
          "mental state",
          "phenomenal consciousness",
          "introspection",
          "privileged access",
        ],
      },
    ],
    intermediate: [
      {
        slug: "substance-and-property-dualism",
        title: "Substance and Property Dualism",
        summary:
          "Two ways of splitting mind from matter, and the pressure that causal closure puts on both",
        estReadMin: 15,
        introduces: [
          "substance dualism",
          "property dualism",
          "interactionism",
          "epiphenomenalism",
          "causal closure",
          "supervenience",
          "mind-body supervenience",
        ],
        requires: ["dualism", "physicalism", "mind-body problem"],
      },
      {
        slug: "behaviourism-and-its-failure",
        title: "Behaviourism and Its Failure",
        summary:
          "Analysing mental talk into behavioural dispositions, and why belief and desire cannot be separated for that purpose",
        estReadMin: 14,
        introduces: [
          "logical behaviourism",
          "methodological behaviourism",
          "behavioural disposition",
          "circularity objection",
          "super-Spartan objection",
        ],
        requires: ["mental state", "belief", "desire", "dispositional state"],
      },
      {
        slug: "identity-theory",
        title: "Identity Theory: Type and Token",
        summary:
          "Identifying pain with a brain state, and the retreat from type identity to token identity",
        estReadMin: 15,
        introduces: [
          "identity theory",
          "type identity",
          "token identity",
          "reduction",
          "Leibniz's law",
        ],
        requires: ["physicalism", "mental state", "logical behaviourism"],
      },
      {
        slug: "functionalism-and-multiple-realizability",
        title: "Functionalism and Multiple Realizability",
        summary:
          "Defining mental states by their causal role, and the octopus case that made type identity look parochial",
        estReadMin: 17,
        introduces: [
          "functionalism",
          "functional role",
          "causal role",
          "multiple realizability",
          "machine functionalism",
        ],
        requires: [
          "type identity",
          "token identity",
          "logical behaviourism",
          "mental state",
        ],
      },
      {
        slug: "intentionality-and-mental-content",
        title: "Intentionality and Mental Content",
        summary:
          "How a state can be about something that does not exist, and what fixes which thing it is about",
        estReadMin: 17,
        introduces: [
          "intentionality",
          "aboutness",
          "mental content",
          "intentional object",
          "narrow content",
          "wide content",
        ],
        requires: ["propositional attitude", "belief", "mental state"],
      },
      {
        slug: "folk-psychology-and-eliminative-materialism",
        title: "Folk Psychology and Eliminative Materialism",
        summary:
          "Treating belief and desire as the posits of a theory, and the argument that the theory is false",
        estReadMin: 18,
        introduces: [
          "folk psychology",
          "eliminative materialism",
          "theory-theory",
          "simulation theory",
          "the self-refutation objection",
        ],
        requires: [
          "propositional attitude",
          "mental content",
          "reduction",
          "functionalism",
        ],
      },
      {
        slug: "computational-theory-of-mind",
        title: "The Computational Theory of Mind",
        summary:
          "Thinking as symbol manipulation, the systematicity argument for a language of thought, and the connectionist reply",
        estReadMin: 20,
        introduces: [
          "computational theory of mind",
          "language of thought",
          "systematicity",
          "productivity",
          "connectionism",
          "symbolic architecture",
        ],
        requires: [
          "functionalism",
          "machine functionalism",
          "mental content",
          "propositional attitude",
        ],
      },
      {
        slug: "the-chinese-room",
        title: "The Chinese Room",
        summary:
          "Searle's claim that symbol manipulation never yields understanding, and the replies that locate understanding elsewhere",
        estReadMin: 14,
        introduces: [
          "Chinese Room",
          "strong AI",
          "weak AI",
          "systems reply",
          "symbol grounding",
        ],
        requires: [
          "computational theory of mind",
          "functional role",
          "cognition",
        ],
      },
      {
        slug: "theories-of-perception",
        title: "Theories of Perception",
        summary:
          "Sense data, adverbialism, intentionalism, and naive realism, judged by what they say about the good case and the bad",
        estReadMin: 19,
        introduces: [
          "sense-datum theory",
          "adverbialism",
          "intentionalism about perception",
          "naive realism",
          "the common kind assumption",
        ],
        requires: [
          "perceptual experience",
          "sense datum",
          "the argument from illusion",
          "hallucination",
          "mental content",
          "qualia",
        ],
      },
      {
        slug: "the-knowledge-argument",
        title: "The Knowledge Argument and Mary's Room",
        summary:
          "A colour scientist who knows every physical fact and still learns something on leaving the black and white room",
        estReadMin: 16,
        introduces: [
          "knowledge argument",
          "Mary's room",
          "ability hypothesis",
          "phenomenal concept strategy",
        ],
        requires: [
          "qualia",
          "physicalism",
          "phenomenal consciousness",
          "functionalism",
        ],
      },
      {
        slug: "philosophical-zombies",
        title: "Philosophical Zombies and Conceivability",
        summary:
          "Running from what we can coherently imagine to what is metaphysically possible, and where that step can be blocked",
        estReadMin: 18,
        introduces: [
          "philosophical zombie",
          "conceivability argument",
          "logical supervenience",
          "a posteriori physicalism",
        ],
        requires: [
          "phenomenal consciousness",
          "physicalism",
          "supervenience",
          "knowledge argument",
          "functional role",
        ],
      },
      {
        slug: "externalism-about-content",
        title: "Externalism About Content: Twin Earth and Burge",
        summary:
          "Two thought experiments showing that environment and community, not the head alone, fix what a thought is about",
        estReadMin: 23,
        introduces: [
          "Twin Earth",
          "semantic externalism",
          "social externalism",
          "internalism about content",
          "natural kind term",
        ],
        requires: [
          "narrow content",
          "wide content",
          "mental content",
          "intentionality",
        ],
      },
      {
        slug: "action-intention-and-the-will",
        title: "Action, Intention, and the Will",
        summary:
          "What separates an action from a mere bodily movement, and why the answer keeps coming back to what caused it",
        estReadMin: 18,
        introduces: [
          "action",
          "basic action",
          "intention",
          "the causal theory of action",
          "reasons explanation",
          "trying",
        ],
        requires: ["belief", "desire", "propositional attitude", "causal role"],
      },
      {
        slug: "personal-identity-and-metaphysics",
        title: "Personal Identity and Its Overlap With Metaphysics",
        summary:
          "Whether what makes you the same person over time is psychological, bodily, or nothing that fission can preserve",
        estReadMin: 18,
        introduces: [
          "personal identity",
          "psychological continuity",
          "memory criterion",
          "bodily criterion",
          "fission case",
        ],
        requires: ["mental state", "introspection", "consciousness"],
      },
    ],
    advanced: [
      {
        slug: "the-hard-problem",
        title: "The Hard Problem and the Explanatory Gap",
        summary:
          "Why explaining every cognitive function can leave the question of experience untouched",
        estReadMin: 22,
        introduces: [
          "hard problem of consciousness",
          "easy problems",
          "explanatory gap",
          "mysterianism",
          "cognitive closure",
        ],
        requires: [
          "phenomenal consciousness",
          "qualia",
          "functionalism",
          "knowledge argument",
          "philosophical zombie",
        ],
      },
      {
        slug: "illusionism-and-the-meta-problem",
        title: "Illusionism and the Meta-Problem",
        summary:
          "Denying that phenomenal properties exist, and explaining instead why we are so sure they do",
        estReadMin: 22,
        introduces: [
          "illusionism",
          "meta-problem of consciousness",
          "quasi-phenomenal property",
          "phenomenal debunking",
        ],
        requires: [
          "hard problem of consciousness",
          "explanatory gap",
          "qualia",
          "introspection",
        ],
      },
      {
        slug: "higher-order-theories",
        title: "Higher-Order Theories of Consciousness",
        summary:
          "Making a state conscious by being represented by another state, and the trouble raised by states with no target",
        estReadMin: 20,
        introduces: [
          "higher-order theory",
          "higher-order thought",
          "higher-order perception",
          "transitivity principle",
          "targetless higher-order state",
        ],
        requires: [
          "phenomenal consciousness",
          "introspection",
          "access consciousness",
          "mental state",
        ],
      },
      {
        slug: "global-workspace-and-iit",
        title: "Global Workspace and Integrated Information Theory",
        summary:
          "Two empirical theories assessed philosophically: what each measures, and whether either addresses experience or only its correlates",
        estReadMin: 24,
        introduces: [
          "global workspace theory",
          "integrated information theory",
          "phi",
          "neural correlate of consciousness",
          "broadcast",
        ],
        requires: [
          "access consciousness",
          "phenomenal consciousness",
          "hard problem of consciousness",
          "explanatory gap",
        ],
      },
      {
        slug: "representationalism-and-qualia-externalism",
        title: "Representationalism and Qualia Externalism",
        summary:
          "Reducing what an experience is like to what it represents, with transparency for it and spectrum inversion against",
        estReadMin: 22,
        introduces: [
          "representationalism",
          "transparency thesis",
          "qualia externalism",
          "inverted spectrum",
          "phenomenal intentionality",
        ],
        requires: [
          "qualia",
          "intentionality",
          "mental content",
          "intentionalism about perception",
          "phenomenal consciousness",
        ],
      },
      {
        slug: "the-phenomenal-intentionality-program",
        title: "The Phenomenal Intentionality Program",
        summary:
          "Reversing the usual order of explanation: content derived from experience rather than experience from content",
        estReadMin: 22,
        introduces: [
          "phenomenal intentionality program",
          "derived intentionality",
          "inseparatism",
          "narrow phenomenal content",
        ],
        requires: [
          "phenomenal intentionality",
          "intentionality",
          "narrow content",
          "semantic externalism",
        ],
      },
      {
        slug: "cognitive-phenomenology",
        title: "Cognitive Phenomenology",
        summary:
          "Whether thinking a thought has a felt character of its own, or only the sensory imagery that accompanies it",
        estReadMin: 20,
        introduces: [
          "cognitive phenomenology",
          "restrictivism",
          "liberalism about phenomenology",
          "proprietary phenomenal character",
        ],
        requires: [
          "phenomenal consciousness",
          "what it is like",
          "propositional attitude",
          "phenomenal intentionality",
        ],
      },
      {
        slug: "naive-realism-and-hallucination",
        title: "Naive Realism and the Problem of Hallucination",
        summary:
          "Disjunctivism about perceptual experience, the causal argument against it, and the screening-off worry",
        estReadMin: 22,
        introduces: [
          "disjunctivism about perception",
          "the causal argument",
          "screening off",
          "negative epistemic conception of hallucination",
        ],
        requires: [
          "naive realism",
          "the common kind assumption",
          "hallucination",
          "the argument from illusion",
          "representationalism",
        ],
      },
      {
        slug: "panpsychism-and-the-combination-problem",
        title: "Panpsychism and the Combination Problem",
        summary:
          "Putting experience at the bottom to avoid emergence, then facing the question of how small subjects make a large one",
        estReadMin: 21,
        introduces: [
          "panpsychism",
          "constitutive panpsychism",
          "micro-experience",
          "combination problem",
          "emergentism",
        ],
        requires: [
          "hard problem of consciousness",
          "physicalism",
          "dualism",
          "explanatory gap",
        ],
      },
      {
        slug: "russellian-monism",
        title: "Russellian Monism",
        summary:
          "Physics describes structure and leaves the intrinsic nature of matter open, and consciousness is offered as the filler",
        estReadMin: 20,
        introduces: [
          "Russellian monism",
          "quiddity",
          "structural property",
          "categorical basis",
          "neutral monism",
        ],
        requires: [
          "panpsychism",
          "physicalism",
          "monism",
          "hard problem of consciousness",
        ],
      },
      {
        slug: "teleosemantics-and-the-disjunction-problem",
        title: "Teleosemantics and the Disjunction Problem",
        summary:
          "Naturalizing content through indication and biological function, and the misrepresentation cases every version has to survive",
        estReadMin: 26,
        introduces: [
          "teleosemantics",
          "indicator semantics",
          "biosemantics",
          "proper function",
          "the disjunction problem",
          "asymmetric dependence",
        ],
        requires: [
          "mental content",
          "semantic externalism",
          "intentionality",
          "natural kind term",
          "functional role",
        ],
      },
      {
        slug: "predictive-processing",
        title: "Predictive Processing",
        summary:
          "Treating perception as controlled hypothesis testing, and asking what survives of representation under the free energy story",
        estReadMin: 22,
        introduces: [
          "predictive processing",
          "prediction error minimization",
          "generative model",
          "free energy principle",
          "active inference",
        ],
        requires: [
          "mental content",
          "representationalism",
          "perceptual experience",
          "cognition",
        ],
      },
      {
        slug: "extended-and-embodied-mind",
        title: "Extended and Embodied Mind",
        summary:
          "Otto's notebook, the parity principle, and the bloat objection that follows from taking it seriously",
        estReadMin: 21,
        introduces: [
          "extended mind",
          "parity principle",
          "embodied cognition",
          "enactivism",
          "cognitive bloat",
        ],
        requires: [
          "functionalism",
          "cognition",
          "belief",
          "predictive processing",
        ],
      },
      {
        slug: "mental-causation-and-exclusion",
        title: "Mental Causation and the Exclusion Problem",
        summary:
          "Kim's argument that a sufficient physical cause leaves no work for a mental one, unless overdetermination is accepted",
        estReadMin: 24,
        introduces: [
          "mental causation",
          "exclusion problem",
          "causal overdetermination",
          "anomalous monism",
          "non-reductive physicalism",
        ],
        requires: [
          "causal closure",
          "supervenience",
          "epiphenomenalism",
          "token identity",
          "multiple realizability",
        ],
      },
      {
        slug: "deviant-causal-chains-and-the-disappearing-agent",
        title: "Deviant Causal Chains and the Disappearing Agent",
        summary:
          "The right mental cause producing the right movement the wrong way, and the worry that on this story nobody acts at all",
        estReadMin: 22,
        introduces: [
          "deviant causal chain",
          "the disappearing agent objection",
          "agent causation",
          "self-governing policy",
        ],
        requires: [
          "the causal theory of action",
          "basic action",
          "intention",
          "mental causation",
          "reasons explanation",
        ],
      },
      {
        slug: "self-knowledge-and-transparency",
        title: "Self-Knowledge and Transparency",
        summary:
          "Answering whether you believe it by looking at the world rather than at yourself, and what Moore's paradox shows about the asymmetry",
        estReadMin: 21,
        introduces: [
          "transparency method",
          "Moore's paradox",
          "constitutivism about self-knowledge",
          "inner sense model",
        ],
        requires: [
          "introspection",
          "privileged access",
          "first-person authority",
          "higher-order thought",
          "belief",
        ],
      },
      {
        slug: "the-unity-of-consciousness",
        title: "The Unity of Consciousness",
        summary:
          "Why experiences at a time come as one field, and what split-brain patients do to that claim",
        estReadMin: 21,
        introduces: [
          "unity of consciousness",
          "phenomenal unity",
          "binding problem",
          "split-brain case",
          "conscious field",
        ],
        requires: [
          "phenomenal consciousness",
          "personal identity",
          "higher-order theory",
          "integrated information theory",
        ],
      },
      {
        slug: "animal-and-machine-minds",
        title: "Animal and Machine Minds",
        summary:
          "Deciding how far consciousness extends when the only evidence is behaviour and structural similarity",
        estReadMin: 23,
        introduces: [
          "animal consciousness",
          "machine consciousness",
          "the distribution question",
          "gaming worry",
        ],
        requires: [
          "other minds problem",
          "argument from analogy",
          "Chinese Room",
          "functionalism",
          "multiple realizability",
          "hard problem of consciousness",
        ],
      },
    ],
  },
};
