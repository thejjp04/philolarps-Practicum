"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { IconClose, IconRoute } from "@/components/icons";
import type { NavData, NavSubject } from "@/components/nav-data";
import { TIERS, TIER_LABEL, type Tier } from "@/lib/types";

/**
 * Slide-over showing the recommended order through the subject the visitor is
 * currently in. Falls back to the cross-subject paths page when they are not
 * inside a subject.
 */
export function ReadingPathPanel({ nav }: { nav: NavData }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const segment = pathname.split("/")[1] ?? "";
  const subject: NavSubject | undefined = nav.groups
    .flatMap((g) => g.subjects)
    .find((s) => s.slug === segment);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!subject) {
    return (
      <Link
        href="/reading-paths"
        /* The label is display:none below sm, which would otherwise leave the
           control with no accessible name on a phone. */
        aria-label="Reading path"
        className="flex h-9 shrink-0 items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--border)] px-3.5 text-[13px] font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        <IconRoute className="h-4 w-4" />
        <span className="hidden sm:inline">Reading path</span>
      </Link>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-label="Reading path"
        className="flex h-9 shrink-0 items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--border)] px-3.5 text-[13px] font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        <IconRoute className="h-4 w-4" />
        <span className="hidden sm:inline">Reading path</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close reading path"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[color-mix(in_srgb,var(--text-primary)_45%,transparent)]"
          />

          <aside
            className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col border-l border-[var(--border)] bg-[var(--bg-page)]"
            style={{ boxShadow: "var(--shadow-panel)" }}
            aria-label={`Reading path for ${subject.name}`}
          >
            <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[var(--border)] px-6 py-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--text-muted)]">
                  Reading path
                </p>
                <h2 className="mt-1 text-[19px] font-semibold tracking-[-0.015em]">
                  {subject.name}
                </h2>
                <p className="mt-1.5 text-[13px] text-[var(--text-muted)]">
                  {subject.articles.length} articles, in order.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="-mr-2 -mt-1 rounded-[var(--radius-card)] p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
              >
                <IconClose className="h-[18px] w-[18px]" />
              </button>
            </header>

            <div className="scrollbar-slim min-h-0 flex-1 overflow-y-auto px-6 py-5">
              {TIERS.map((tier: Tier) => {
                const items = subject.articles.filter((a) => a.tier === tier);
                if (items.length === 0) return null;

                const offset = subject.articles.findIndex(
                  (a) => a.tier === tier,
                );

                return (
                  <section key={tier} className="mb-7 last:mb-0">
                    <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--text-muted)]">
                      {TIER_LABEL[tier]}
                    </h3>
                    <ol className="space-y-1">
                      {items.map((article, i) => {
                        const active = pathname === article.href;
                        const n = offset + i + 1;

                        const inner = (
                          <>
                            <span
                              className={[
                                "mt-[1px] w-6 shrink-0 text-right font-mono text-[11.5px]",
                                active
                                  ? "text-[var(--accent)]"
                                  : "text-[var(--text-muted)]",
                              ].join(" ")}
                            >
                              {n}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[13.5px] leading-snug">
                                {article.title}
                              </span>
                              <span className="mt-0.5 block text-[11.5px] text-[var(--text-muted)]">
                                {article.written
                                  ? `${article.estReadMin} min`
                                  : "Not written yet"}
                              </span>
                            </span>
                          </>
                        );

                        return (
                          <li key={`${tier}-${article.slug}`}>
                            <Link
                              href={article.href}
                              aria-current={active ? "page" : undefined}
                              className={[
                                "flex gap-3 rounded-[var(--radius-card)] px-2.5 py-2 transition-colors",
                                active
                                  ? "bg-[var(--accent-wash)] font-medium text-[var(--accent)]"
                                  : "hover:bg-[var(--bg-subtle)]",
                                article.written || active
                                  ? ""
                                  : "text-[var(--text-muted)]",
                              ].join(" ")}
                            >
                              {inner}
                            </Link>
                          </li>
                        );
                      })}
                    </ol>
                  </section>
                );
              })}
            </div>

            <footer className="shrink-0 border-t border-[var(--border)] px-6 py-4">
              <Link
                href="/reading-paths"
                className="text-[13px] font-medium text-[var(--accent)] hover:underline"
              >
                Cross-subject reading paths
              </Link>
            </footer>
          </aside>
        </div>
      )}
    </>
  );
}
