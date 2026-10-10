"use client";

import Link from "next/link";

import { IconArrowRight, IconQuiz } from "@/components/icons";
import { MASTERED_BOX, articleOf, useProgress } from "@/components/quiz/progress";

export function QuizPrompt({ articleKey, count }: { articleKey: string; count: number }) {
  const progress = useProgress();
  const mine = Object.entries(progress).filter(([key]) => articleOf(key) === articleKey);
  const mastered = mine.filter(([, m]) => m.box >= MASTERED_BOX).length;
  const share = Math.min(mastered / count, 1);

  return (
    <section className="mt-14 overflow-hidden rounded-[16px] border border-[var(--border)] bg-[var(--surface)]">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-4 px-5 py-5 sm:px-6">
        <span
          aria-hidden="true"
          className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[13px] bg-[var(--accent)] text-[var(--on-accent)]"
        >
          <IconQuiz className="h-[24px] w-[24px]" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[16px] font-semibold leading-snug">
            {mine.length === 0 ? "Quiz yourself on this article" : "Keep it fresh"}
          </p>
          <p className="mt-1 font-serif text-[14.5px] leading-[1.5] text-[var(--text-muted)]">
            {mine.length === 0
              ? `${count} questions. Miss one and it comes back until you get it right.`
              : `${mastered} of ${count} questions mastered. Spaced review brings the rest back at the right time.`}
          </p>
        </div>
        <Link
          href={`/quiz?a=${encodeURIComponent(articleKey)}`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-[var(--radius-pill)] bg-[var(--accent)] px-4 py-[9px] text-[13.5px] font-semibold text-[var(--on-accent)] transition-[background-color,transform] hover:-translate-y-[1px] hover:bg-[var(--accent-hover)]"
        >
          {mine.length === 0 ? "Start quiz" : "Quiz again"}
          <IconArrowRight className="h-[14px] w-[14px]" />
        </Link>
      </div>
      {mine.length > 0 && (
        <div className="h-[4px] bg-[var(--bg-subtle)]">
          <div
            className="h-full bg-[var(--correct)] transition-[width] duration-700"
            style={{ width: `${share * 100}%` }}
          />
        </div>
      )}
    </section>
  );
}
