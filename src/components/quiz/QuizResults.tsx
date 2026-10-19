"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { reducedMotion, starBurst } from "@/components/fx";
import { IconArrowRight, IconFlame, IconRetry } from "@/components/icons";
import { PRIMARY, SECONDARY } from "@/components/quiz/buttons";
import type { QuizItem } from "@/lib/types";

export type Outcome = {
  total: number;
  right: number;
  bestStreak: number;
  ms: number;
  perArticle: { article: string; right: number; total: number }[];
  missed: QuizItem[];
};

function useCountUp(target: number, ms = 1200): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const startAt = performance.now();
    const quick = reducedMotion();
    const tick = (now: number) => {
      const p = quick ? 1 : Math.min((now - startAt) / ms, 1);
      setValue(Math.round(target * (1 - (1 - p) ** 3)));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, ms]);

  return value;
}

function verdict(score: number): { title: string; line: string } {
  if (score === 100) return { title: "Flawless", line: "Every question right first time." };
  if (score >= 85) return { title: "Outstanding", line: "You clearly have this material." };
  if (score >= 70) return { title: "Strong work", line: "A few slips to tidy up below." };
  if (score >= 50) return { title: "Getting there", line: "Go over the misses, then try them again." };
  return { title: "A good start", line: "Rereading the sections linked below will help most." };
}

function clock(ms: number): string {
  const s = Math.round(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

const R = 54;
const C = 2 * Math.PI * R;

export function QuizResults({
  outcome,
  titles,
  onRetryMissed,
  onAgain,
  onSetup,
}: {
  outcome: Outcome;
  titles: Map<string, string>;
  onRetryMissed: () => void;
  onAgain: () => void;
  onSetup: () => void;
}) {
  const score = Math.round((outcome.right / outcome.total) * 100);
  const shown = useCountUp(score);
  const { title, line } = verdict(score);
  const strong = score >= 80;
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!strong) return;
    const timer = setTimeout(() => {
      if (ringRef.current) starBurst(ringRef.current, { count: 110, power: 1.3 });
    }, 280);
    return () => clearTimeout(timer);
  }, [strong]);

  return (
    <div className="mx-auto max-w-[680px]">
      <section className="quiz-rise flex flex-col items-center text-center">
        <div ref={ringRef} className="relative h-[148px] w-[148px]">
          <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="64" cy="64" r={R} fill="none" stroke="var(--bg-subtle)" strokeWidth="11" />
            <circle
              cx="64"
              cy="64"
              r={R}
              fill="none"
              stroke={strong ? "var(--correct)" : "var(--accent)"}
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - shown / 100)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[36px] font-bold leading-none tracking-[-0.03em]" aria-label={`${score} percent`}>
              {shown}%
            </span>
            <span className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.09em] text-[var(--text-muted)]">
              first try
            </span>
          </div>
        </div>
        <h1 className="mt-5 text-[30px] font-bold tracking-[-0.025em]">{title}</h1>
        <p className="mt-1.5 font-serif text-[16.5px] text-[var(--text-muted)]">{line}</p>
      </section>

      <dl className="quiz-rise mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4" style={{ animationDelay: "120ms" }}>
        {[
          { label: "Right first time", value: `${outcome.right}/${outcome.total}` },
          { label: "To review", value: String(outcome.missed.length) },
          {
            label: "Best streak",
            value: (
              <span className="inline-flex items-center gap-1">
                <IconFlame className="h-[18px] w-[18px] text-[var(--subject-political-philosophy)]" />
                {outcome.bestStreak}
              </span>
            ),
          },
          { label: "Time", value: clock(outcome.ms) },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-[14px] border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
          >
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
              {stat.label}
            </dt>
            <dd className="mt-1 font-mono text-[20px] font-semibold">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <div className="quiz-rise mt-6 flex flex-wrap justify-center gap-2.5" style={{ animationDelay: "200ms" }}>
        {outcome.missed.length > 0 && (
          <button type="button" onClick={onRetryMissed} className={PRIMARY}>
            <IconRetry className="h-[15px] w-[15px]" />
            Retry the {outcome.missed.length} you missed
          </button>
        )}
        <button
          type="button"
          onClick={onAgain}
          className={outcome.missed.length > 0 ? SECONDARY : PRIMARY}
        >
          New round, same articles
        </button>
        <button type="button" onClick={onSetup} className={SECONDARY}>
          Choose articles
        </button>
      </div>

      {outcome.perArticle.length > 1 && (
        <section className="quiz-rise mt-12" style={{ animationDelay: "280ms" }}>
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.11em] text-[var(--text-muted)]">
            By article
          </h2>
          <ul className="mt-3 space-y-3">
            {[...outcome.perArticle]
              .sort((a, b) => a.right / a.total - b.right / b.total)
              .map((row) => (
                <li key={row.article}>
                  <div className="flex items-baseline justify-between gap-3">
                    <Link
                      href={`/${row.article}`}
                      className="min-w-0 truncate text-[14px] font-medium hover:text-[var(--accent)]"
                    >
                      {titles.get(row.article) ?? row.article}
                    </Link>
                    <span className="shrink-0 font-mono text-[12px] text-[var(--text-muted)]">
                      {row.right}/{row.total}
                    </span>
                  </div>
                  <div className="mt-1.5 h-[6px] overflow-hidden rounded-full bg-[var(--bg-subtle)]">
                    <div
                      className="h-full rounded-full transition-[width] duration-700"
                      style={{
                        width: `${(row.right / row.total) * 100}%`,
                        background: row.right / row.total >= 0.8 ? "var(--correct)" : "var(--accent)",
                      }}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </section>
      )}

      {outcome.missed.length > 0 && (
        <section className="quiz-rise mt-12" style={{ animationDelay: "360ms" }}>
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.11em] text-[var(--text-muted)]">
            Worth another look
          </h2>
          <ul className="mt-3 space-y-3">
            {outcome.missed.map((item) => (
              <li
                key={item.key}
                className="rounded-[14px] border border-[var(--border)] bg-[var(--surface)] px-4 py-4"
              >
                <p className="text-[11.5px] font-medium text-[var(--text-muted)]">
                  {titles.get(item.article) ?? item.article}
                </p>
                <div
                  className="quiz-html mt-1.5 font-serif text-[16px] font-medium leading-[1.5]"
                  dangerouslySetInnerHTML={{ __html: item.question }}
                />
                <div className="mt-3 flex gap-2 rounded-[10px] bg-[color-mix(in_srgb,var(--correct)_9%,transparent)] px-3 py-2 text-[14px]">
                  <span className="shrink-0 font-semibold text-[var(--correct)]">Answer</span>
                  <span
                    className="quiz-html min-w-0"
                    dangerouslySetInnerHTML={{ __html: item.options[item.answer] }}
                  />
                </div>
                <div
                  className="quiz-html mt-3 font-serif text-[15px] leading-[1.6] text-[var(--text-muted)]"
                  dangerouslySetInnerHTML={{ __html: item.explanation }}
                />
                {item.source && (
                  <Link
                    href={item.source}
                    className="mt-2.5 inline-flex items-center gap-1 text-[13px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
                  >
                    Revisit this section
                    <IconArrowRight className="h-[13px] w-[13px]" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
