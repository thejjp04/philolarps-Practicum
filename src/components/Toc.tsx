"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/types";

/** Highlights the section currently nearest the top of the viewport. */
function useActiveHeading(headings: Heading[]) {
  const [active, setActive] = useState<string | null>(
    headings[0]?.id ?? null,
  );

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActive(visible[0].target.id);
          return;
        }

        // Nothing in the band: fall back to the last heading scrolled past.
        const passed = elements.filter(
          (el) => el.getBoundingClientRect().top < 120,
        );
        if (passed.length > 0) setActive(passed[passed.length - 1].id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  return active;
}

export function TocRail({ headings }: { headings: Heading[] }) {
  const active = useActiveHeading(headings);
  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[76px] hidden w-[200px] shrink-0 self-start xl:block"
    >
      <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.09em] text-[var(--text-muted)]">
        On this page
      </p>
      <ul className="scrollbar-slim max-h-[calc(100vh-140px)] space-y-[1px] overflow-y-auto border-l border-[var(--border)]">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? "location" : undefined}
              className={[
                "-ml-px block border-l-2 py-1.5 text-[12.5px] leading-snug transition-colors",
                h.depth === 3 ? "pl-6 pr-2" : "pl-3.5 pr-2",
                active === h.id
                  ? "border-[var(--accent)] font-medium text-[var(--accent)]"
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]",
              ].join(" ")}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Below the rail breakpoint the same list collapses above the article. */
export function TocSummary({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;

  return (
    <details className="mb-8 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg-subtle)] xl:hidden">
      <summary className="cursor-pointer list-none px-4 py-3 text-[13px] font-medium">
        On this page
        <span className="ml-2 text-[var(--text-muted)]">
          ({headings.length})
        </span>
      </summary>
      <ul className="space-y-0.5 px-4 pb-3.5">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={[
                "block py-1 text-[13px] text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]",
                h.depth === 3 ? "pl-4" : "",
              ].join(" ")}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
