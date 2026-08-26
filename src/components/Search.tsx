"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconSearch } from "@/components/icons";
import type { Tier } from "@/lib/types";

type SearchDoc = {
  kind: "article" | "heading" | "term";
  title: string;
  context: string;
  href: string;
  tier?: Tier;
};

const KIND_LABEL: Record<SearchDoc["kind"], string> = {
  article: "Article",
  heading: "Section",
  term: "Term",
};

function score(doc: SearchDoc, query: string): number {
  const title = doc.title.toLowerCase();
  if (title === query) return 0;
  if (title.startsWith(query)) return 1;
  if (new RegExp(`\\b${escapeRegex(query)}`).test(title)) return 2;
  if (title.includes(query)) return 3;
  if (doc.context.toLowerCase().includes(query)) return 4;
  return Infinity;
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function Search() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const load = useCallback(async () => {
    if (docs) return;
    try {
      const res = await fetch("/api/search");
      setDocs((await res.json()) as SearchDoc[]);
    } catch {
      setDocs([]);
    }
  }, [docs]);

  // Cmd+K / Ctrl+K anywhere, Escape to close.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        void load();
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [load]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      inputRef.current?.select();
    } else {
      setCursor(0);
    }
  }, [open]);

  const q = query.trim().toLowerCase();
  const results =
    q.length < 2 || !docs
      ? []
      : docs
          .map((d) => ({ doc: d, s: score(d, q) }))
          .filter((r) => r.s !== Infinity)
          .sort((a, b) => a.s - b.s || a.doc.title.length - b.doc.title.length)
          .slice(0, 20)
          .map((r) => r.doc);

  useEffect(() => setCursor(0), [query]);

  function go(doc: SearchDoc) {
    setOpen(false);
    setQuery("");
    router.push(doc.href);
  }

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter" && results[cursor]) {
      e.preventDefault();
      go(results[cursor]);
    }
  }

  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  return (
    <>
      {/* Narrow screens get the same control as a single icon. Hiding search
          outright below the breakpoint left phone readers with no way to look
          anything up, since the shortcut needs a keyboard. */}
      <button
        type="button"
        aria-label="Search"
        onClick={() => {
          setOpen(true);
          void load();
        }}
        className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--bg-subtle)] text-[13px] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] md:w-full md:max-w-[380px] md:justify-start md:gap-2 md:px-3.5 md:text-left"
      >
        <IconSearch className="h-4 w-4 shrink-0" />
        <span className="hidden min-w-0 flex-1 truncate md:block">
          Search concepts, thinkers, arguments…
        </span>
        <kbd className="hidden shrink-0 rounded border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5 font-sans text-[10.5px] font-medium md:block">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <button
            type="button"
            aria-label="Close search"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[color-mix(in_srgb,var(--text-primary)_45%,transparent)] backdrop-blur-[2px]"
          />

          <div
            className="relative w-full max-w-[600px] overflow-hidden rounded-[12px] border border-[var(--border)] bg-[var(--surface)]"
            style={{ boxShadow: "var(--shadow-panel)" }}
          >
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-4">
              <IconSearch className="h-[18px] w-[18px] shrink-0 text-[var(--text-muted)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search concepts, thinkers, arguments…"
                aria-label="Search"
                className="h-[52px] flex-1 bg-transparent text-[15px] outline-none placeholder:text-[var(--text-muted)]"
              />
              <kbd className="shrink-0 rounded border border-[var(--border)] px-1.5 py-0.5 text-[10.5px] text-[var(--text-muted)]">
                Esc
              </kbd>
            </div>

            <ul
              ref={listRef}
              className="scrollbar-slim max-h-[52vh] overflow-y-auto p-2"
            >
              {q.length >= 2 && results.length === 0 && (
                <li className="px-3 py-8 text-center text-[13.5px] text-[var(--text-muted)]">
                  {docs === null ? "Loading…" : `No match for “${query}”`}
                </li>
              )}

              {q.length < 2 && (
                <li className="px-3 py-8 text-center text-[13.5px] text-[var(--text-muted)]">
                  Type at least two characters.
                </li>
              )}

              {results.map((doc, i) => (
                <li key={`${doc.href}-${doc.title}-${i}`}>
                  <button
                    type="button"
                    data-active={i === cursor}
                    onMouseEnter={() => setCursor(i)}
                    onClick={() => go(doc)}
                    className={[
                      "flex w-full items-center gap-3 rounded-[var(--radius-card)] px-3 py-2.5 text-left transition-colors",
                      i === cursor ? "bg-[var(--accent-wash)]" : "",
                    ].join(" ")}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-medium">
                        {doc.title}
                      </span>
                      <span className="block truncate text-[12px] capitalize text-[var(--text-muted)]">
                        {doc.context}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-[var(--radius-pill)] border border-[var(--border)] px-2 py-0.5 text-[10.5px] font-medium text-[var(--text-muted)]">
                      {KIND_LABEL[doc.kind]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
