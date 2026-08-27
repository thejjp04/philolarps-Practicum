"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useMemo, useState } from "react";

import { LogoLockup } from "@/components/Logo";
import { ThemeToggle } from "@/components/theme";
import {
  IconChevron,
  IconGlossary,
  IconMusic,
  IconPaths,
  IconThinkers,
  SUBJECT_ICONS,
} from "@/components/icons";
import type { NavArticle, NavData, NavSubject } from "@/components/nav-data";
import { TIERS, TIER_LABEL, type Tier } from "@/lib/types";

type Filter = Tier | "all";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "beginner", label: "Beginner" },
  { key: "intermediate", label: "Intermediate" },
  { key: "advanced", label: "Advanced" },
  { key: "all", label: "All" },
];

const FILTER_STORAGE_KEY = "philolarps-tier";

const REFERENCE = [
  { href: "/glossary", label: "Glossary", Icon: IconGlossary },
  { href: "/thinkers", label: "Thinkers Index", Icon: IconThinkers },
  { href: "/reading-paths", label: "Reading Paths", Icon: IconPaths },
  { href: "/music", label: "Music", Icon: IconMusic },
];

export function Sidebar({
  nav,
  onNavigate,
}: {
  nav: NavData;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FILTER_STORAGE_KEY) as Filter | null;
      if (stored && FILTERS.some((f) => f.key === stored)) setFilter(stored);
    } catch {
      // Nothing to restore.
    }
  }, []);

  // Open the subject the visitor is currently reading.
  const activeSubject = useMemo(() => {
    const segment = pathname.split("/")[1] ?? "";
    return nav.groups.some((g) => g.subjects.some((s) => s.slug === segment))
      ? segment
      : null;
  }, [pathname, nav.groups]);

  // The tier of the page being read, when the URL names one.
  const activeTier = useMemo<Tier | null>(() => {
    const segment = pathname.split("/")[2] ?? "";
    return TIERS.find((t) => t === segment) ?? null;
  }, [pathname]);

  useEffect(() => {
    if (activeSubject) {
      setExpanded((prev) =>
        prev.includes(activeSubject) ? prev : [...prev, activeSubject],
      );
    }
  }, [activeSubject]);

  function chooseFilter(next: Filter) {
    setFilter(next);
    try {
      localStorage.setItem(FILTER_STORAGE_KEY, next);
    } catch {
      // Choice will not persist. Harmless.
    }
  }

  function toggle(slug: string) {
    setExpanded((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }

  const visibleTiers: Tier[] = filter === "all" ? [...TIERS] : [filter];

  return (
    <div className="flex h-full flex-col bg-[var(--bg-sidebar)] text-[var(--sidebar-text)]">
      {/* Wordmark */}
      <div className="shrink-0 px-5 pb-1 pt-5">
        <Link
          href="/"
          onClick={onNavigate}
          aria-label="Philolarps home"
          className="inline-block rounded-[var(--radius-card)]"
        >
          <LogoLockup />
        </Link>
      </div>

      {/* Tier switcher */}
      <div className="shrink-0 px-4 pb-4 pt-3">
        <div
          role="radiogroup"
          aria-label="Filter by tier"
          className="flex rounded-[var(--radius-pill)] bg-[var(--sidebar-track)] p-[3px]"
        >
          {FILTERS.map((f) => {
            const on = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => chooseFilter(f.key)}
                title={f.label}
                className={[
                  "flex-1 rounded-[var(--radius-pill)] px-1 py-[5px] text-[11px] font-semibold transition-colors",
                  on
                    ? "bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)]"
                    : "text-[var(--sidebar-text)] hover:bg-[var(--sidebar-wash)]",
                ].join(" ")}
              >
                {f.key === "all" ? "All" : f.label.slice(0, 3)}
                <span className="sr-only"> {f.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Nav tree */}
      <nav
        aria-label="Subjects"
        className="scrollbar-slim min-h-0 flex-1 overflow-y-auto px-3 pb-4"
      >
        {nav.groups.map((group) => (
          <div key={group.key} className="mb-5">
            <h2 className="px-3 pb-2 text-[10.5px] font-semibold uppercase tracking-[0.09em]">
              {group.label}
            </h2>

            <ul className="space-y-[2px]">
              {group.subjects.map((subject) => (
                <SubjectItem
                  key={subject.slug}
                  subject={subject}
                  pathname={pathname}
                  visibleTiers={visibleTiers}
                  pinnedTier={
                    subject.slug === activeSubject ? activeTier : null
                  }
                  open={expanded.includes(subject.slug)}
                  onToggle={() => toggle(subject.slug)}
                  onNavigate={onNavigate}
                />
              ))}
            </ul>
          </div>
        ))}

        <div className="mb-2">
          <h2 className="px-3 pb-2 text-[10.5px] font-semibold uppercase tracking-[0.09em]">
            Reference
          </h2>
          <ul className="space-y-[2px]">
            {REFERENCE.map(({ href, label, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  aria-current={pathname === href ? "page" : undefined}
                  className={rowClass(pathname === href)}
                >
                  <Icon className="h-[17px] w-[17px] shrink-0 opacity-90" />
                  <span className="truncate">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Bottom slot. The theme toggle lives where an account block usually would. */}
      <div className="shrink-0 border-t border-[var(--sidebar-rule)] p-3">
        <ThemeToggle />
      </div>
    </div>
  );
}

function rowClass(active: boolean) {
  return [
    "flex items-center gap-2.5 rounded-[var(--radius-card)] px-3 py-[7px] text-[13.5px] font-medium transition-colors",
    active
      ? "bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)]"
      : "hover:bg-[var(--sidebar-wash)]",
  ].join(" ");
}

function SubjectItem({
  subject,
  pathname,
  visibleTiers,
  pinnedTier,
  open,
  onToggle,
  onNavigate,
}: {
  subject: NavSubject;
  pathname: string;
  visibleTiers: Tier[];
  pinnedTier: Tier | null;
  open: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}) {
  const instanceId = useId();
  const Icon =
    SUBJECT_ICONS[subject.slug as keyof typeof SUBJECT_ICONS] ?? IconGlossary;

  const isHub = pathname === subject.href;
  const inSubject = pathname.startsWith(`${subject.href}/`) || isHub;

  // The pill is a browsing preference, not a claim about where you are. If it
  // filters out the tier you are actually reading, the current article drops
  // out of the tree and nothing in the sidebar marks your position, so the
  // tier under the cursor is added back for this subject alone.
  const tiers: Tier[] =
    pinnedTier && !visibleTiers.includes(pinnedTier)
      ? TIERS.filter((t) => visibleTiers.includes(t) || t === pinnedTier)
      : visibleTiers;

  const articles = subject.articles.filter((a) => tiers.includes(a.tier));

  // On a single tier the list is already homogeneous, so a heading would say
  // nothing the pill switcher has not already said. On "All" the three tiers
  // run together, and without a break the jump from the last beginner rung to
  // the first intermediate one is invisible.
  const grouped = tiers
    .map((tier) => ({ tier, items: articles.filter((a) => a.tier === tier) }))
    .filter((g) => g.items.length > 0);
  const showTierHeadings = tiers.length > 1;

  /* The drawer and the fixed sidebar are both mounted below 1024px, so a slug
     alone would put the same id on two elements. */
  const panelId = `nav-${instanceId}-${subject.slug}`;

  return (
    <li>
      <div className={rowClass(isHub)}>
        {/* The icon sits inside the link. Outside it, a third of the row was
            a dead target that looked identical to the live part. */}
        <Link
          href={subject.href}
          onClick={onNavigate}
          aria-current={isHub ? "page" : undefined}
          className="flex min-w-0 flex-1 items-center gap-2.5 rounded-sm"
        >
          <Icon className="h-[17px] w-[17px] shrink-0 opacity-90" />
          <span className="truncate">{subject.name}</span>
        </Link>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? "Collapse" : "Expand"} ${subject.name} articles`}
          className="-mr-1 shrink-0 rounded p-0.5"
        >
          <IconChevron
            className="h-3.5 w-3.5 transition-transform duration-200"
            style={{ transform: open ? "rotate(90deg)" : undefined }}
          />
        </button>
      </div>

      {open && (
        <div
          id={panelId}
          className="ml-[22px] mt-[2px] border-l border-[var(--sidebar-rule)] pl-2.5"
        >
          {grouped.length === 0 && (
            <p className="px-2 py-1.5 text-[12px]">Nothing at this tier yet</p>
          )}

          {grouped.map(({ tier, items }) => (
            <div key={tier} className={showTierHeadings ? "pt-2 first:pt-0" : ""}>
              {showTierHeadings && (
                /* Full --sidebar-text, not a dimmed variant: at 9.5px this is
                   already the smallest type in the shell, and the group
                   headings above it are set the same way. */
                <h3 className="px-2 pb-[2px] text-[9.5px] font-semibold uppercase tracking-[0.12em]">
                  {TIER_LABEL[tier]}
                </h3>
              )}
              <ul className="space-y-[1px]">
                {items.map((article) => (
                  <ArticleLink
                    key={`${article.tier}-${article.slug}`}
                    article={article}
                    active={pathname === article.href}
                    onNavigate={onNavigate}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {inSubject && !open && (
        <span className="sr-only">Current subject: {subject.name}</span>
      )}
    </li>
  );
}

function ArticleLink({
  article,
  active,
  onNavigate,
}: {
  article: NavArticle;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <li>
      {/* Planned rungs link too. Their page explains the rung rather than
          faking prose, so the ladder is browsable end to end. --sidebar-text
          scores 12.1:1 on the violet sidebar, so dimming to 70% still
          composites past AA. */}
      <Link
        href={article.href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className={[
          "block truncate rounded-[6px] px-2 py-[5px] text-[12.5px] transition-colors",
          active
            ? "bg-[var(--sidebar-active-bg)] font-medium text-[var(--sidebar-active-text)]"
            : `hover:bg-[var(--sidebar-wash)] hover:opacity-100 ${
                article.written ? "" : "opacity-70"
              }`,
        ].join(" ")}
      >
        {article.title}
        {/* Not a title attribute: that would replace the link text as the
            accessible name, so every planned rung would announce
            identically. */}
        {!article.written && (
          <span className="sr-only"> (planned, not yet written)</span>
        )}
      </Link>
    </li>
  );
}
