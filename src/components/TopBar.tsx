"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Search } from "@/components/Search";
import { ReadingPathPanel } from "@/components/ReadingPathPanel";
import { IconMenu } from "@/components/icons";
import type { NavData } from "@/components/nav-data";

function titleFor(href: string, titles: Record<string, string>): string {
  if (titles[href]) return titles[href];
  const last = href.split("/").filter(Boolean).pop() ?? "";
  return last.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function TopBar({
  nav,
  onOpenMenu,
}: {
  nav: NavData;
  onOpenMenu: () => void;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((_, i) => {
    const href = `/${segments.slice(0, i + 1).join("/")}`;
    return { href, label: titleFor(href, nav.titles) };
  });

  return (
    <header className="sticky top-0 z-30 flex h-[60px] shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg-page)_88%,transparent)] px-4 backdrop-blur-md lg:px-8">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open navigation"
        className="-ml-1 shrink-0 rounded-[var(--radius-card)] p-2 transition-colors hover:bg-[var(--bg-subtle)] lg:hidden"
      >
        <IconMenu className="h-5 w-5" />
      </button>

      <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
        <ol className="flex items-center gap-1.5 overflow-hidden text-[13px] text-[var(--text-muted)]">
          {crumbs.length === 0 ? (
            <li className="truncate font-medium text-[var(--text-primary)]">
              Home
            </li>
          ) : (
            crumbs.map((crumb, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={crumb.href} className="flex min-w-0 items-center gap-1.5">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-[var(--text-muted)]"
                    >
                      /
                    </span>
                  )}
                  {last ? (
                    <span
                      aria-current="page"
                      className="truncate font-medium text-[var(--text-primary)]"
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="truncate capitalize transition-colors hover:text-[var(--accent)]"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })
          )}
        </ol>
      </nav>

      <div className="flex shrink-0 items-center gap-3">
        <div data-tour="search" className="w-auto md:w-[300px] xl:w-[380px]">
          <Search />
        </div>
        <div data-tour="reading-path" className="flex">
          <ReadingPathPanel nav={nav} />
        </div>
      </div>
    </header>
  );
}
