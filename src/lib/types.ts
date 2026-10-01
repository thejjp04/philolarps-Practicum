export const TIERS = ["beginner", "intermediate", "advanced"] as const;
export type Tier = (typeof TIERS)[number];

export const TIER_LABEL: Record<Tier, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

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

export type LadderEntry = {
  slug: string;
  title: string;
  summary: string;
  estReadMin: number;
  introduces?: string[];
  requires?: string[];
};

export type Subject = {
  slug: string;
  name: string;
  group: NavGroup;
  oneLine: string;
  scope: string;
  ladder: Record<Tier, LadderEntry[]>;
};

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
  prerequisites: string[];
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
  dates: string;
  position: string;
  keyArticles?: string[];
};

export type ThinkerRecord = Thinker & {
  articles: ArticleRef[];
};

export type ReadingPath = {
  slug: string;
  name: string;
  blurb: string;
  steps: string[];
};
