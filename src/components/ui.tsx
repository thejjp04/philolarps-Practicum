import Link from "next/link";
import type { ReactNode } from "react";

import type { ArticleRef, Tier } from "@/lib/types";
import { TIERS, TIER_INITIAL, TIER_LABEL } from "@/lib/types";

/* ------------------------------------------------------------------ *
 * Layout
 * ------------------------------------------------------------------ */

/** The main content column: prose capped at 760px, centred in what is left. */
export function Container({
  children,
  wide = false,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-6 py-10 lg:px-10 lg:py-14 ${
        wide ? "max-w-[1040px]" : "max-w-[760px]"
      }`}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  lead,
  eyebrow,
}: {
  title: string;
  lead?: string;
  eyebrow?: string;
}) {
  return (
    <header className="mb-10">
      {eyebrow && (
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-[var(--text-muted)]">
          {eyebrow}
        </p>
      )}
      <h1 className="text-[34px] font-bold leading-[1.15] tracking-[-0.025em] lg:text-[40px]">
        {title}
      </h1>
      {lead && (
        <p className="mt-4 max-w-[62ch] font-serif text-[18px] leading-[1.65] text-[var(--text-muted)]">
          {lead}
        </p>
      )}
    </header>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[12px] font-semibold uppercase tracking-[0.11em] text-[var(--text-muted)]">
      {children}
    </h2>
  );
}

/* ------------------------------------------------------------------ *
 * Tier furniture
 * ------------------------------------------------------------------ */

export function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span className="inline-flex items-center rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--bg-subtle)] px-2.5 py-[3px] text-[11px] font-semibold uppercase tracking-[0.07em] text-[var(--text-muted)]">
      {TIER_LABEL[tier]}
    </span>
  );
}

/** `B 8 · I 11 · A 14`, each chip a link into that tier. */
export function TierChips({
  subject,
  counts,
}: {
  subject: string;
  counts: Record<Tier, number>;
}) {
  return (
    <div className="flex items-center gap-1">
      {TIERS.map((tier, i) => (
        <span key={tier} className="flex items-center gap-1">
          {i > 0 && (
            <span aria-hidden="true" className="text-[var(--text-muted)]">
              ·
            </span>
          )}
          <Link
            href={`/${subject}/${tier}`}
            className="rounded-[var(--radius-pill)] px-1.5 py-0.5 font-mono text-[11.5px] text-[var(--text-muted)] transition-colors hover:bg-[var(--accent-wash)] hover:text-[var(--accent)]"
          >
            <span aria-hidden="true">
              {TIER_INITIAL[tier]} {counts[tier]}
            </span>
            <span className="sr-only">
              {counts[tier]} {TIER_LABEL[tier].toLowerCase()} articles
            </span>
          </Link>
        </span>
      ))}
    </div>
  );
}

/**
 * Marks a link whose article is on the ladder but not yet written. The target
 * is a real page: it explains the rung and points somewhere readable.
 */
export function PlannedTag() {
  return (
    <span className="ml-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--text-muted)]">
      planned
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Article rows
 * ------------------------------------------------------------------ */

/**
 * One rung of a ladder. Every rung links to its own page, written or not; a
 * planned one lands on a page that says so and offers somewhere to go instead.
 */
export function ArticleRow({
  article,
  index,
  showTier = false,
  footer,
}: {
  article: ArticleRef;
  index?: number;
  showTier?: boolean;
  /** Rendered inside the row, below the link. Used for prerequisite chips. */
  footer?: ReactNode;
}) {
  const body = (
    <>
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span
          className={`text-[15.5px] font-semibold leading-snug ${
            article.written ? "" : "text-[var(--text-muted)]"
          }`}
        >
          {article.title}
        </span>
        {showTier && (
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text-muted)]">
            {article.subjectName} · {TIER_LABEL[article.tier]}
          </span>
        )}
        {!article.written && (
          <span className="rounded-[var(--radius-pill)] border border-[var(--border)] px-2 py-[1px] text-[10.5px] font-medium uppercase tracking-[0.07em] text-[var(--text-muted)]">
            Planned
          </span>
        )}
      </div>
      <p className="mt-1 font-serif text-[15.5px] leading-[1.55] text-[var(--text-muted)]">
        {article.summary}
      </p>
      <p className="mt-1.5 font-mono text-[11.5px] text-[var(--text-muted)]">
        {article.estReadMin} min
      </p>
    </>
  );

  return (
    <li className="flex gap-4">
      {index !== undefined && (
        <span
          aria-hidden="true"
          className="w-6 shrink-0 pt-[2px] text-right font-mono text-[13px] text-[var(--text-muted)]"
        >
          {index}
        </span>
      )}
      <div className="min-w-0 flex-1">
        {/* No opacity on the planned variant. The muted title and the Planned
            badge already separate it from a written row, and dimming on top of
            --text-muted would put the row below AA. */}
        <Link
          href={article.href}
          className="block rounded-[var(--radius-card)] outline-offset-4 transition-opacity hover:opacity-80"
        >
          {body}
        </Link>
        {footer}
      </div>
    </li>
  );
}

export function PrerequisiteChips({
  subject,
  slugs,
  articles,
}: {
  subject: string;
  slugs: string[];
  articles: ArticleRef[];
}) {
  if (slugs.length === 0) return null;

  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
        Needs first
      </span>
      {slugs.map((slug) => {
        const ref = articles.find((a) => a.slug === slug && a.subject === subject);
        const label = ref?.title ?? slug.replace(/-/g, " ");

        // A slug with no matching rung is a frontmatter typo, so it stays inert.
        return ref ? (
          <Link
            key={slug}
            href={ref.href}
            className={[
              "rounded-[var(--radius-pill)] border border-[var(--border)] px-2.5 py-[3px] text-[12px] transition-colors hover:bg-[var(--accent-wash)]",
              ref.written ? "text-[var(--accent)]" : "text-[var(--text-muted)]",
            ].join(" ")}
          >
            {label}
          </Link>
        ) : (
          <span
            key={slug}
            className="rounded-[var(--radius-pill)] border border-[var(--border)] px-2.5 py-[3px] text-[12px] text-[var(--text-muted)]"
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Cards
 * ------------------------------------------------------------------ */

export function Card({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--accent)]"
    >
      {children}
    </Link>
  );
}
