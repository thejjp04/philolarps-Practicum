"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { IconArrowRight, IconCheck, IconSpark } from "@/components/icons";
import { chime, starBurst, useSound } from "@/components/fx";

const DONE_KEY = "philolarps-done";

const CHANGED = "philolarps-done-change";

export function readDone(): string[] {
  try {
    const raw = localStorage.getItem(DONE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((h) => typeof h === "string") : [];
  } catch {
    return [];
  }
}

function writeDone(hrefs: string[]) {
  try {
    localStorage.setItem(DONE_KEY, JSON.stringify(hrefs));
  } catch {
  }
  window.dispatchEvent(new Event(CHANGED));
}

export function useDone(): Set<string> {
  const [done, setDone] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    function sync() {
      setDone(new Set(readDone()));
    }

    const frame = requestAnimationFrame(sync);
    window.addEventListener(CHANGED, sync);
    window.addEventListener("storage", sync);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener(CHANGED, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return done;
}

export function FinishArticle({
  href,
  next,
}: {
  href: string;
  next?: { href: string; title: string } | null;
}) {
  const done = useDone();
  const isDone = done.has(href);
  const [sound, setSound] = useSound();

  function mark(event: React.MouseEvent<HTMLButtonElement>) {
    const list = readDone();

    if (isDone) {
      writeDone(list.filter((h) => h !== href));
      return;
    }

    writeDone(list.includes(href) ? list : [...list, href]);

    starBurst(event.currentTarget, { count: 50, power: 0.9 });
    chime();
  }

  return (
    <section className="mt-14 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg-subtle)] px-5 py-4">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[var(--accent-wash)] text-[var(--accent)]"
          >
            {isDone ? (
              <IconCheck className="h-[18px] w-[18px]" />
            ) : (
              <IconSpark className="h-[18px] w-[18px]" />
            )}
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-snug">
              {isDone ? "Marked as read" : "Reached the end?"}
            </p>
            <p className="mt-0.5 font-serif text-[14.5px] leading-[1.5] text-[var(--text-muted)]">
              {isDone
                ? "It shows with a tick in the sidebar from now on."
                : "Mark it, and the sidebar keeps track of where you have been."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSound(!sound)}
            aria-pressed={!sound}
            className="rounded-[var(--radius-pill)] border border-[var(--border)] px-2.5 py-[6px] text-[12px] font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--accent-wash)] hover:text-[var(--accent)]"
          >
            {sound ? "Sound on" : "Sound off"}
          </button>
          <button
            type="button"
            onClick={mark}
            aria-pressed={isDone}
            className={[
              "rounded-[var(--radius-pill)] px-4 py-[8px] text-[13px] font-medium transition-colors",
              isDone
                ? "border border-[var(--border)] text-[var(--accent)] hover:bg-[var(--accent-wash)]"
                : "bg-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-hover)]",
            ].join(" ")}
          >
            {isDone ? "Undo" : "Mark as read"}
          </button>
        </div>
      </div>

      {isDone && next && (
        <Link
          href={next.href}
          className="mt-4 flex items-center gap-1.5 border-t border-[var(--border)] pt-3 text-[13.5px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
        >
          Next up: {next.title}
          <IconArrowRight className="h-[15px] w-[15px]" />
        </Link>
      )}
    </section>
  );
}
