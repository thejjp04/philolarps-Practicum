import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";

import { TocRail, TocSummary } from "@/components/Toc";
import { PlannedTag, PrerequisiteChips, TierBadge } from "@/components/ui";
import { IconArrowLeft, IconArrowRight, SubjectGlyph } from "@/components/icons";
import { FinishArticle } from "@/components/finish";
import { mdxComponents } from "@/components/mdx";
import {
  allLadderParams,
  getArticleRef,
  getLadderEntry,
  getNeighbours,
  getSubjectPath,
  loadArticle,
} from "@/lib/content";
import { getSubject } from "@/lib/subjects";
import { TIERS, TIER_LABEL, type ArticleRef, type Tier } from "@/lib/types";

type Params = { params: Promise<{ subject: string; tier: string; slug: string }> };

export function generateStaticParams() {
  return allLadderParams();
}

function isTier(value: string): value is Tier {
  return (TIERS as readonly string[]).includes(value);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { subject, tier, slug } = await params;
  if (!isTier(tier)) return {};
  const ref = getArticleRef(subject, tier, slug);
  if (!ref) return {};
  return {
    title: ref.written ? ref.title : `${ref.title} (planned)`,
    description: ref.summary,
  };
}

/**
 * Articles in the same subject whose vocabulary overlaps this one's, in either
 * direction. Nearest neighbours in the path are excluded because they already
 * have their own row below the prose.
 */
function relatedArticles(
  subjectSlug: string,
  tier: Tier,
  slug: string,
  path: ArticleRef[],
): ArticleRef[] {
  const subject = getSubject(subjectSlug);
  if (!subject) return [];

  const entries = TIERS.flatMap((t) =>
    subject.ladder[t].map((entry) => ({ entry, tier: t })),
  );
  const self = entries.find((e) => e.tier === tier && e.entry.slug === slug);
  if (!self) return [];

  const introduces = new Set(self.entry.introduces ?? []);
  const requires = new Set(self.entry.requires ?? []);
  const { previous, next } = getNeighbours(subjectSlug, tier, slug);
  const excluded = new Set([slug, previous?.slug, next?.slug]);

  return entries
    .filter(({ entry }) => !excluded.has(entry.slug))
    .filter(
      ({ entry }) =>
        (entry.requires ?? []).some((t) => introduces.has(t)) ||
        (entry.introduces ?? []).some((t) => requires.has(t)),
    )
    .map(({ entry, tier: t }) =>
      path.find((a) => a.tier === t && a.slug === entry.slug),
    )
    .filter((a): a is ArticleRef => a !== undefined)
    .slice(0, 4);
}

/** The written article closest to `index` in the subject's own order. */
function nearestWritten(path: ArticleRef[], index: number): ArticleRef | null {
  let best: ArticleRef | null = null;
  let bestGap = Infinity;

  path.forEach((candidate, i) => {
    if (!candidate.written) return;
    const gap = Math.abs(i - index);
    if (gap < bestGap) {
      best = candidate;
      bestGap = gap;
    }
  });

  return best;
}

function TermList({ label, terms }: { label: string; terms: string[] }) {
  if (terms.length === 0) return null;

  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--text-muted)]">
        {label}
      </span>
      {terms.map((term) => (
        <span
          key={term}
          className="rounded-[var(--radius-pill)] border border-[var(--border)] px-2.5 py-[3px] font-mono text-[11.5px] text-[var(--text-muted)]"
        >
          {term}
        </span>
      ))}
    </div>
  );
}

/**
 * What a planned rung shows instead of prose. Everything here comes from the
 * ladder declaration: the entry's own summary, the terms it is responsible for,
 * and where it sits in the order. Nothing about the argument is invented.
 */
function PlannedNotice({
  article,
  entryTerms,
  fallback,
}: {
  article: ArticleRef;
  entryTerms: { introduces: string[]; requires: string[] };
  fallback: ArticleRef | null;
}) {
  // Deliberately outside .prose-article: that scope styles every descendant
  // anchor as an underlined accent link, which would repaint the buttons below
  // in accent-on-accent.
  return (
    <div>
      <p className="font-serif text-[18px] leading-[1.7] text-[var(--text-muted)]">
        {article.summary}
      </p>

      <div className="mt-8 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg-subtle)] p-5">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-[var(--text-muted)]">
          Planned, not yet written
        </p>
        <p className="mt-2.5 font-serif text-[16px] leading-[1.6]">
          This rung already has its place in the {article.subjectName} ladder
          and a fixed job in the order. The prose is what is missing. Writing it
          out of sequence would break the guarantee that nothing here uses a term
          before an earlier article defines it.
        </p>

        <div className="mt-4 flex flex-wrap gap-2.5">
          <Link
            href={`/${article.subject}/${article.tier}`}
            className="rounded-[var(--radius-pill)] bg-[var(--accent)] px-3.5 py-[7px] text-[13px] font-medium text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            All {TIER_LABEL[article.tier].toLowerCase()} {article.subjectName}
          </Link>
          {fallback && (
            <Link
              href={fallback.href}
              className="rounded-[var(--radius-pill)] border border-[var(--border)] px-3.5 py-[7px] text-[13px] font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent-wash)]"
            >
              Read {fallback.title}
            </Link>
          )}
        </div>
      </div>

      {(entryTerms.introduces.length > 0 || entryTerms.requires.length > 0) && (
        <div className="mt-6 space-y-3">
          <TermList label="Will define" terms={entryTerms.introduces} />
          <TermList label="Assumes" terms={entryTerms.requires} />
        </div>
      )}
    </div>
  );
}

export default async function ArticlePage({ params }: Params) {
  const { subject: subjectSlug, tier, slug } = await params;
  if (!isTier(tier)) notFound();

  // A ref exists for every rung of the ladder, written or not. Only a slug that
  // is on no ladder at all is a 404.
  const ref = getArticleRef(subjectSlug, tier, slug);
  if (!ref) notFound();

  const article = loadArticle(subjectSlug, tier, slug);
  const headings = article?.headings ?? [];
  const path = getSubjectPath(subjectSlug);
  const { previous, next } = getNeighbours(subjectSlug, tier, slug);
  const related = relatedArticles(subjectSlug, tier, slug, path);

  let body;
  if (article) {
    const { content } = await compileMDX({
      source: article.source,
      components: mdxComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeSlug, rehypeKatex],
        },
      },
    });
    body = <div className="prose-article">{content}</div>;
  } else {
    const entry = getLadderEntry(subjectSlug, tier, slug);
    body = (
      <PlannedNotice
        article={ref}
        entryTerms={{
          introduces: entry?.introduces ?? [],
          requires: entry?.requires ?? [],
        }}
        fallback={nearestWritten(
          path,
          path.findIndex((a) => a.tier === tier && a.slug === slug),
        )}
      />
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1180px] gap-10 px-6 py-10 lg:px-10 lg:py-14">
      <article className="min-w-0 max-w-[760px] flex-1">
        <header className="mb-10">
          <div className="mb-3 flex flex-wrap items-center gap-2.5">
            <Link
              href={`/${ref.subject}`}
              className="inline-flex items-center gap-2 text-[12.5px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
            >
              <SubjectGlyph slug={ref.subject} />
              {ref.subjectName}
            </Link>
            <TierBadge tier={ref.tier} />
            <span className="font-mono text-[11.5px] text-[var(--text-muted)]">
              {ref.estReadMin} min
            </span>
            {!ref.written && (
              <span className="rounded-[var(--radius-pill)] border border-[var(--border)] px-2 py-[1px] text-[10.5px] font-medium uppercase tracking-[0.07em] text-[var(--text-muted)]">
                Planned
              </span>
            )}
          </div>

          <h1 className="text-[34px] font-bold leading-[1.15] tracking-[-0.025em] lg:text-[38px]">
            {ref.title}
          </h1>

          <PrerequisiteChips
            subject={ref.subject}
            slugs={ref.prerequisites}
            articles={path}
          />
        </header>

        <TocSummary headings={headings} />

        {body}

        {/* Only under prose. A planned rung has nothing to have finished, and
            the next rung it would offer is the one already in the notice. */}
        {ref.written && (
          <FinishArticle
            href={ref.href}
            next={next?.written ? { href: next.href, title: next.title } : null}
          />
        )}

        <nav
          aria-label="Reading path"
          className="mt-16 grid gap-3 border-t border-[var(--border)] pt-6 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={previous.href}
              className="group rounded-[var(--radius-card)] border border-[var(--border)] p-4 transition-colors hover:border-[var(--accent)]"
            >
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--text-muted)]">
                <IconArrowLeft className="h-[13px] w-[13px]" />
                Previous
                {!previous.written && <PlannedTag />}
              </span>
              <span className="mt-1.5 block text-[15px] font-medium leading-snug">
                {previous.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {next && (
            <Link
              href={next.href}
              className="group rounded-[var(--radius-card)] border border-[var(--border)] p-4 text-right transition-colors hover:border-[var(--accent)] sm:col-start-2"
            >
              <span className="flex items-center justify-end gap-1.5 text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--text-muted)]">
                Next
                {!next.written && <PlannedTag />}
                <IconArrowRight className="h-[13px] w-[13px]" />
              </span>
              <span className="mt-1.5 block text-[15px] font-medium leading-snug">
                {next.title}
              </span>
            </Link>
          )}
        </nav>

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.11em] text-[var(--text-muted)]">
              Related
            </h2>
            <ul className="mt-3 space-y-2">
              {related.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[15px] text-[var(--accent)] hover:text-[var(--accent-hover)]"
                  >
                    {item.title}
                  </Link>
                  {!item.written && <PlannedTag />}
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      <TocRail headings={headings} />
    </div>
  );
}
