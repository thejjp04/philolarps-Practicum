"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useMemo, useState, useSyncExternalStore } from "react";

import { LogoLockup } from "@/components/Logo";
import { ThemeToggle } from "@/components/theme";
import { useDone } from "@/components/finish";
import {
  IconCheck,
  IconChevron,
  IconCompass,
  IconGlossary,
  IconMusic,
  IconPaths,
  IconQuiz,
  IconThinkers,
  SubjectGlyph,
} from "@/components/icons";
import type { NavArticle, NavData, NavSubject } from "@/components/nav-data";
import { useTour } from "@/components/tour";
import { TIERS, TIER_LABEL, type Tier } from "@/lib/types";

type Filter = Tier | "all";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "beginner", label: "Beginner" },
  { key: "intermediate", label: "Intermediate" },
  { key: "advanced", label: "Advanced" },
  { key: "all", label: "All" },
];

const FILTER_STORAGE_KEY = "philolarps-tier";
const FILTER_EVENT = "philolarps-tier-change";

function readFilter(): Filter {
  try {
    const stored = localStorage.getItem(FILTER_STORAGE_KEY);
    const match = FILTERS.find((f) => f.key === stored);
    if (match) return match.key;
  } catch {
  }
  return "all";
}

function subscribeFilter(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(FILTER_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(FILTER_EVENT, onChange);
  };
}

const REFERENCE = [
  { href: "/glossary", label: "Glossary", Icon: IconGlossary },
  { href: "/thinkers", label: "Thinkers Index", Icon: IconThinkers },
  { href: "/reading-paths", label: "Reading Paths", Icon: IconPaths },
  { href: "/quiz", label: "Quiz", Icon: IconQuiz },
  { href: "/music", label: "Music", Icon: IconMusic },
];

const TOUR_REFERENCE = "/music";

export function Sidebar({
  nav,
  onNavigate,
}: {
  nav: NavData;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const tour = useTour();
  const done = useDone();
  const filter = useSyncExternalStore<Filter>(
    subscribeFilter,
    readFilter,
    () => "all",
  );
  const [expanded, setExpanded] = useState<string[]>([]);
  const [seenSubject, setSeenSubject] = useState<string | null>(null);

  const activeSubject = useMemo(() => {
    const segment = pathname.split("/")[1] ?? "";
    return nav.groups.some((g) => g.subjects.some((s) => s.slug === segment))
      ? segment
      : null;
  }, [pathname, nav.groups]);

  const activeTier = useMemo<Tier | null>(() => {
    const segment = pathname.split("/")[2] ?? "";
    return TIERS.find((t) => t === segment) ?? null;
  }, [pathname]);

  if (activeSubject !== seenSubject) {
    setSeenSubject(activeSubject);
    if (activeSubject && !expanded.includes(activeSubject)) {
      setExpanded([...expanded, activeSubject]);
    }
  }

  function chooseFilter(next: Filter) {
    try {
      localStorage.setItem(FILTER_STORAGE_KEY, next);
    } catch {
    }
    window.dispatchEvent(new Event(FILTER_EVENT));
  }

  function toggle(slug: string) {
    setExpanded((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }

  const visibleTiers: Tier[] = filter === "all" ? [...TIERS] : [filter];

  return (
    <div className="flex h-full flex-col bg-[var(--bg-sidebar)] text-[var(--sidebar-text)]">
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
      <div data-tour="tier-switcher" className="shrink-0 px-4 pb-4 pt-3">
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
      <nav
        data-tour="nav-tree"
        aria-label="Subjects"
        className="scrollbar-slim min-h-0 flex-1 overflow-y-auto px-3 pb-4"
      >
        {nav.groups.map((group) => (
          <div key={group.key} data-tour={`group-${group.key}`} className="mb-5">
            <h2 className="px-3 pb-2 text-[10.5px] font-semibold uppercase tracking-[0.09em]">
              {group.label}
            </h2>
            <ul className="space-y-[2px]">
              {group.subjects.map((subject) => (
                <SubjectItem
                  key={subject.slug}
                  subject={subject}
                  pathname={pathname}
                  done={done}
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
              <li key={href} data-tour={href === TOUR_REFERENCE ? "music" : undefined}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  aria-current={pathname === href ? "page" : undefined}
                  className={rowClass(pathname === href)}
                >
                  <span className={SLOT}>
                    <Icon className="h-[17px] w-[17px] opacity-90" />
                  </span>
                  <span className="truncate">{label}</span>
                </Link>
              </li>
            ))}

            <li>
              <button
                type="button"
                onClick={() => {
                  onNavigate?.();
                  tour.start();
                }}
                className={`${rowClass(false)} w-full text-left`}
              >
                <span className={SLOT}>
                  <IconCompass className="h-[17px] w-[17px] opacity-90" />
                </span>
                <span className="truncate">Take the tour</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div
        data-tour="theme-toggle"
        className="flex h-[65px] shrink-0 items-center border-t border-[var(--sidebar-rule)] px-3"
      >
        <ThemeToggle />
      </div>
    </div>
  );
}

function rowClass(active: boolean) {
  return [
    "flex items-center gap-2 rounded-[var(--radius-card)] px-2.5 py-[6px] text-[13.5px] font-medium transition-colors",
    active
      ? "bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)]"
      : "hover:bg-[var(--sidebar-wash)]",
  ].join(" ");
}

const SLOT = "flex h-[25px] w-[25px] shrink-0 items-center justify-center";

function SubjectItem({
  subject,
  pathname,
  done,
  visibleTiers,
  pinnedTier,
  open,
  onToggle,
  onNavigate,
}: {
  subject: NavSubject;
  pathname: string;
  done: Set<string>;
  visibleTiers: Tier[];
  pinnedTier: Tier | null;
  open: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}) {
  const instanceId = useId();

  const isHub = pathname === subject.href;
  const inSubject = pathname.startsWith(`${subject.href}/`) || isHub;

  const tiers: Tier[] =
    pinnedTier && !visibleTiers.includes(pinnedTier)
      ? TIERS.filter((t) => visibleTiers.includes(t) || t === pinnedTier)
      : visibleTiers;

  const articles = subject.articles.filter((a) => tiers.includes(a.tier));

  const grouped = tiers
    .map((tier) => ({ tier, items: articles.filter((a) => a.tier === tier) }))
    .filter((g) => g.items.length > 0);
  const showTierHeadings = tiers.length > 1;

  const panelId = `nav-${instanceId}-${subject.slug}`;

  return (
    <li>
      <div className={rowClass(isHub)}>
        <Link
          href={subject.href}
          onClick={onNavigate}
          aria-current={isHub ? "page" : undefined}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-sm"
        >
          <SubjectGlyph slug={subject.slug} onDark />
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
                    done={done.has(article.href)}
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
  done,
  onNavigate,
}: {
  article: NavArticle;
  active: boolean;
  done: boolean;
  onNavigate?: () => void;
}) {
  return (
    <li>
      <Link
        href={article.href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className={[
          "flex items-center gap-1.5 rounded-[6px] px-2 py-[5px] text-[12.5px] transition-colors",
          active
            ? "bg-[var(--sidebar-active-bg)] font-medium text-[var(--sidebar-active-text)]"
            : `hover:bg-[var(--sidebar-wash)] hover:opacity-100 ${
                article.written ? "" : "opacity-70"
              }`,
        ].join(" ")}
      >
        <span className="truncate">{article.title}</span>
        {!article.written && (
          <span className="sr-only"> (planned, not yet written)</span>
        )}
        {done && (
          <>
            <IconCheck className="ml-auto h-[13px] w-[13px] shrink-0" />
            <span className="sr-only"> (read)</span>
          </>
        )}
      </Link>
    </li>
  );
}
