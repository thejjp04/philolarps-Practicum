export const TIERS = ["beginner", "intermediate", "advanced"] as const;
export type Tier = (typeof TIERS)[number];

export const TIER_LABEL: Record<Tier, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

/** Short chip label used where space is tight, e.g. `B 8 · I 11 · A 14`. */
export const TIER_INITIAL: Record<Tier, string> = {
  beginner: "B",
  intermediate: "I",
  advanced: "A",
};

export type NavGroup = "core" | "mind" | "applied" | "religion";

export const NAV_GROUP_LABEL: Record<NavGroup, string> = {
  core: "Core",
  mind: "Mind & Being",
  applied: "Applied",
  religion: "Religion",
};

/**
 * A rung on a subject's prerequisite ladder.
 *
 * The ladder is declared up front, before the prose exists. An entry with no
 * matching MDX file renders in listings as planned but unwritten, so the
 * structure of a subject is browsable from the first day.
 */
export type LadderEntry = {
  slug: string;
  title: string;
  /** One line, sentence case, no trailing period. Shown in subject listings. */
  summary: string;
  estReadMin: number;
  /**
   * Terms this article is responsible for defining. A term may be introduced
   * exactly once across the whole site.
   */
  introduces?: string[];
  /**
   * Terms this article assumes. Every one must be introduced by an article
   * that appears earlier in the same reading path, or the ladder check fails.
   */
  requires?: string[];
};

export type Subject = {
  slug: string;
  name: string;
  group: NavGroup;
  /** One line for the subject card on the home page. */
  oneLine: string;
  /** Two or three sentences of plain prose for the subject hub. */
  scope: string;
  ladder: Record<Tier, LadderEntry[]>;
};

/** Frontmatter every article MDX file must carry. */
export type ArticleFrontmatter = {
  title: string;
  subject: string;
  tier: Tier;
  order: number;
  prerequisites?: string[];
  est_read_min: number;
  introduces?: string[];
  requires?: string[];
  summary?: string;
};

export type ArticleRef = {
  subject: string;
  subjectName: string;
  tier: Tier;
  slug: string;
  title: string;
  summary: string;
  estReadMin: number;
  /** Slugs of prerequisite articles within the same subject. */
  prerequisites: string[];
  /** True when an MDX file backs this entry. False means planned only. */
  written: boolean;
  href: string;
};

export type Heading = {
  depth: 2 | 3;
  text: string;
  id: string;
};

export type GlossaryEntry = {
  term: string;
  definition: string;
  href: string;
  articleTitle: string;
  subject: string;
  subjectName: string;
  tier: Tier;
};

export type Thinker = {
  name: string;
  /** As printed. Never guessed: a figure whose dates are uncertain is omitted. */
  dates: string;
  /** One line. What they held, not what they are famous for. */
  position: string;
  /** Curriculum entries where the figure is central, as `subject/tier/slug`. */
  keyArticles?: string[];
};

/** A thinker with their curriculum links resolved. */
export type ThinkerRecord = Thinker & {
  articles: ArticleRef[];
};

export type ReadingPath = {
  slug: string;
  name: string;
  blurb: string;
  /** Entries as `subject/tier/slug`. */
  steps: string[];
};
