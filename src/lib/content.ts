import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type {
  ArticleFrontmatter,
  ArticleRef,
  GlossaryEntry,
  Heading,
  ReadingPath,
  Subject,
  ThinkerRecord,
  Tier,
} from "@/lib/types";
import { TIERS } from "@/lib/types";
import { SUBJECTS, getSubject, validateLadders } from "@/lib/subjects";
import { READING_PATHS } from "@/lib/reading-paths";
import { THINKERS } from "@/lib/thinkers";

export const CONTENT_DIR = path.join(process.cwd(), "content");

/* ------------------------------------------------------------------ *
 * Filesystem layer
 * ------------------------------------------------------------------ */

type RawFile = {
  subject: string;
  tier: Tier;
  slug: string;
  filePath: string;
  source: string;
  data: Partial<ArticleFrontmatter> & { added?: string };
  mtimeMs: number;
};

/**
 * Caching is production-only. In dev the corpus has to be re-read on every
 * request, or editing an MDX file would leave the page showing the version
 * that was on disk when the server started.
 */
const CACHE = process.env.NODE_ENV === "production";

let rawCache: RawFile[] | null = null;

function readAllFiles(): RawFile[] {
  if (CACHE && rawCache) return rawCache;

  const files: RawFile[] = [];

  if (fs.existsSync(CONTENT_DIR)) {
    for (const subject of fs.readdirSync(CONTENT_DIR)) {
      const subjectDir = path.join(CONTENT_DIR, subject);
      if (!fs.statSync(subjectDir).isDirectory()) continue;

      for (const tier of TIERS) {
        const tierDir = path.join(subjectDir, tier);
        if (!fs.existsSync(tierDir)) continue;

        for (const file of fs.readdirSync(tierDir)) {
          if (!file.endsWith(".mdx")) continue;
          const filePath = path.join(tierDir, file);
          const rawSource = fs.readFileSync(filePath, "utf8");
          const parsed = matter(rawSource);

          files.push({
            subject,
            tier,
            slug: file.replace(/\.mdx$/, ""),
            filePath,
            source: parsed.content,
            data: parsed.data as RawFile["data"],
            mtimeMs: fs.statSync(filePath).mtimeMs,
          });
        }
      }
    }
  }

  // The ladder check runs once, on the first content read of a build.
  const problems = validateLadders();
  if (problems.length > 0) {
    const report = problems.map((p) => `  - ${p}`).join("\n");
    throw new Error(
      `Prerequisite ladder is broken. An article may not use a term before an earlier article introduces it.\n${report}`,
    );
  }

  rawCache = files;
  return files;
}

function findFile(subject: string, tier: Tier, slug: string) {
  return readAllFiles().find(
    (f) => f.subject === subject && f.tier === tier && f.slug === slug,
  );
}

/* ------------------------------------------------------------------ *
 * Article refs: the ladder merged with what has actually been written
 * ------------------------------------------------------------------ */

function toRef(subject: Subject, tier: Tier, index: number): ArticleRef {
  const entry = subject.ladder[tier][index];
  const file = findFile(subject.slug, tier, entry.slug);

  return {
    subject: subject.slug,
    subjectName: subject.name,
    tier,
    slug: entry.slug,
    title: file?.data.title ?? entry.title,
    summary: file?.data.summary ?? entry.summary,
    estReadMin: file?.data.est_read_min ?? entry.estReadMin,
    prerequisites: file?.data.prerequisites ?? [],
    written: Boolean(file),
    href: `/${subject.slug}/${tier}/${entry.slug}`,
  };
}

export function getTierArticles(subjectSlug: string, tier: Tier): ArticleRef[] {
  const subject = getSubject(subjectSlug);
  if (!subject) return [];
  return subject.ladder[tier].map((_, i) => toRef(subject, tier, i));
}

/** Every article in a subject, in ladder order across all three tiers. */
export function getSubjectPath(subjectSlug: string): ArticleRef[] {
  return TIERS.flatMap((tier) => getTierArticles(subjectSlug, tier));
}

export function getAllArticles(): ArticleRef[] {
  return SUBJECTS.flatMap((s) => getSubjectPath(s.slug));
}

export function getWrittenArticles(): ArticleRef[] {
  return getAllArticles().filter((a) => a.written);
}

export function getArticleRef(
  subject: string,
  tier: Tier,
  slug: string,
): ArticleRef | undefined {
  return getSubjectPath(subject).find(
    (a) => a.tier === tier && a.slug === slug,
  );
}

/** Previous and next written-or-planned steps in the subject's reading path. */
export function getNeighbours(subject: string, tier: Tier, slug: string) {
  const path_ = getSubjectPath(subject);
  const i = path_.findIndex((a) => a.tier === tier && a.slug === slug);
  return {
    previous: i > 0 ? path_[i - 1] : null,
    next: i >= 0 && i < path_.length - 1 ? path_[i + 1] : null,
  };
}

export function getRecentlyAdded(limit = 5): ArticleRef[] {
  const files = readAllFiles();
  const byKey = new Map(files.map((f) => [`${f.subject}/${f.tier}/${f.slug}`, f]));

  return getWrittenArticles()
    .map((a) => {
      const f = byKey.get(`${a.subject}/${a.tier}/${a.slug}`);
      const added = f?.data.added ? Date.parse(f.data.added) : (f?.mtimeMs ?? 0);
      return { article: a, added };
    })
    .sort((x, y) => y.added - x.added)
    .slice(0, limit)
    .map((x) => x.article);
}

/* ------------------------------------------------------------------ *
 * A single article
 * ------------------------------------------------------------------ */

export type LoadedArticle = {
  source: string;
  frontmatter: ArticleFrontmatter;
  ref: ArticleRef;
  headings: Heading[];
};

export function loadArticle(
  subject: string,
  tier: Tier,
  slug: string,
): LoadedArticle | null {
  const file = findFile(subject, tier, slug);
  const ref = getArticleRef(subject, tier, slug);
  if (!file || !ref) return null;

  return {
    source: file.source,
    frontmatter: file.data as ArticleFrontmatter,
    ref,
    headings: extractHeadings(file.source),
  };
}

/** Static params for every written article, for `generateStaticParams`. */
export function allWrittenParams() {
  return readAllFiles().map((f) => ({
    subject: f.subject,
    tier: f.tier,
    slug: f.slug,
  }));
}

/**
 * Static params for every rung of every ladder, written or not. A planned rung
 * still has a page: it says what the entry is for and where it sits in the
 * order, so the nav can link to all of them.
 */
export function allLadderParams() {
  return SUBJECTS.flatMap((subject) =>
    TIERS.flatMap((tier) =>
      subject.ladder[tier].map((entry) => ({
        subject: subject.slug,
        tier,
        slug: entry.slug,
      })),
    ),
  );
}

/** The raw ladder rung, which carries the term vocabulary a ref does not. */
export function getLadderEntry(subjectSlug: string, tier: Tier, slug: string) {
  return getSubject(subjectSlug)?.ladder[tier].find((e) => e.slug === slug);
}

/* ------------------------------------------------------------------ *
 * Headings, for the table-of-contents rail
 * ------------------------------------------------------------------ */

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Anchor for a definition box. Kept out of the heading namespace: an article
 * that defines "Inference" usually also has a heading called "Inference", and
 * two elements sharing an id makes the fragment link land on whichever comes
 * first in the document.
 */
export function definitionAnchor(term: string): string {
  return `def-${slugifyHeading(term)}`;
}

function extractHeadings(source: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of source.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    // Strip inline markdown so the rail shows plain text.
    const text = match[2]
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");

    headings.push({
      depth: match[1].length === 2 ? 2 : 3,
      text,
      id: slugifyHeading(text),
    });
  }

  return headings;
}

/* ------------------------------------------------------------------ *
 * Glossary, built from every <Definition> in the corpus
 * ------------------------------------------------------------------ */

let glossaryCache: GlossaryEntry[] | null = null;

export function getGlossary(): GlossaryEntry[] {
  if (CACHE && glossaryCache) return glossaryCache;

  const entries: GlossaryEntry[] = [];
  const pattern = /<Definition\s+term="([^"]+)"\s*>([\s\S]*?)<\/Definition>/g;

  for (const file of readAllFiles()) {
    const subject = getSubject(file.subject);
    const ref = getArticleRef(file.subject, file.tier, file.slug);
    if (!subject || !ref) continue;

    for (const match of file.source.matchAll(pattern)) {
      entries.push({
        term: match[1],
        definition: cleanInline(match[2]),
        href: `${ref.href}#${definitionAnchor(match[1])}`,
        articleTitle: ref.title,
        subject: subject.slug,
        subjectName: subject.name,
        tier: file.tier,
      });
    }
  }

  entries.sort((a, b) => a.term.localeCompare(b.term, "en"));
  glossaryCache = entries;
  return entries;
}

function cleanInline(text: string): string {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------------------------------------------ *
 * Search index, served to the client as JSON
 * ------------------------------------------------------------------ */

export type SearchDoc = {
  kind: "article" | "heading" | "term";
  title: string;
  context: string;
  href: string;
  tier?: Tier;
};

export function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const article of getAllArticles()) {
    docs.push({
      kind: "article",
      title: article.title,
      context: `${article.subjectName} · ${article.tier}`,
      href: article.href,
      tier: article.tier,
    });
  }

  for (const file of readAllFiles()) {
    const ref = getArticleRef(file.subject, file.tier, file.slug);
    if (!ref) continue;
    for (const h of extractHeadings(file.source)) {
      docs.push({
        kind: "heading",
        title: h.text,
        context: ref.title,
        href: `${ref.href}#${h.id}`,
        tier: file.tier,
      });
    }
  }

  for (const entry of getGlossary()) {
    docs.push({
      kind: "term",
      title: entry.term,
      context: entry.definition.slice(0, 90),
      href: entry.href,
      tier: entry.tier,
    });
  }

  return docs;
}

/* ------------------------------------------------------------------ *
 * Reading paths and thinkers, resolved against the ladder
 * ------------------------------------------------------------------ */

/**
 * Resolves a path's `subject/tier/slug` steps to real articles. A step that
 * matches nothing is dropped and reported, so a typo shows up in the build log
 * rather than as a dead link.
 */
export function resolvePathSteps(steps: string[]): ArticleRef[] {
  const resolved: ArticleRef[] = [];

  for (const step of steps) {
    const [subject, tier, slug] = step.split("/");
    const ref =
      TIERS.includes(tier as Tier) && subject && slug
        ? getArticleRef(subject, tier as Tier, slug)
        : undefined;

    if (ref) resolved.push(ref);
    else console.warn(`[reading-paths] step does not resolve: ${step}`);
  }

  return resolved;
}

export type ResolvedPath = ReadingPath & { articles: ArticleRef[] };

export function getResolvedPaths(): ResolvedPath[] {
  return READING_PATHS.map((p) => ({ ...p, articles: resolvePathSteps(p.steps) }));
}

export function getResolvedPath(slug: string): ResolvedPath | undefined {
  return getResolvedPaths().find((p) => p.slug === slug);
}

/**
 * Thinker records with their curriculum links resolved. Curated `keyArticles`
 * are the floor; any written article whose prose names the thinker is added on
 * top, so the index keeps up with the corpus without hand maintenance.
 */
export function getThinkerRecords(): ThinkerRecord[] {
  const files = readAllFiles();

  return THINKERS.map((thinker) => {
    const seen = new Set<string>();
    const articles: ArticleRef[] = [];

    const add = (ref: ArticleRef | undefined) => {
      if (!ref || seen.has(ref.href)) return;
      seen.add(ref.href);
      articles.push(ref);
    };

    for (const step of thinker.keyArticles ?? []) {
      const [subject, tier, slug] = step.split("/");
      if (!TIERS.includes(tier as Tier)) {
        console.warn(`[thinkers] ${thinker.name}: bad step ${step}`);
        continue;
      }
      const ref = getArticleRef(subject, tier as Tier, slug);
      if (!ref) console.warn(`[thinkers] ${thinker.name}: step does not resolve: ${step}`);
      add(ref);
    }

    // Match on surname, which is how prose refers to people after first mention.
    const surname = thinker.name.replace(/\s*\([^)]*\)/, "").split(" ").pop() ?? "";
    if (surname.length > 3) {
      const pattern = new RegExp(`\\b${escapeRegExp(surname)}\\b`);
      for (const file of files) {
        if (!pattern.test(file.source)) continue;
        add(getArticleRef(file.subject, file.tier, file.slug));
      }
    }

    return { ...thinker, articles };
  });
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* ------------------------------------------------------------------ *
 * Counts
 * ------------------------------------------------------------------ */

export function corpusStats() {
  const all = getAllArticles();
  return {
    planned: all.length,
    written: all.filter((a) => a.written).length,
    subjects: SUBJECTS.length,
  };
}
