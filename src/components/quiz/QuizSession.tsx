"use client";

import { useEffect, useRef, useState } from "react";

import {
  burstFrom,
  chime,
  confetti,
  correctSound,
  fanfare,
  useSound,
  wrongSound,
} from "@/components/fx";
import { IconArrowRight, IconClose, IconFlame, IconVolume, IconVolumeOff } from "@/components/icons";
import { requeue, type Card } from "@/components/quiz/deck";
import { recordAnswer } from "@/components/quiz/progress";
import { Question } from "@/components/quiz/Question";
import type { Outcome } from "@/components/quiz/QuizResults";
import { PRIMARY } from "@/components/quiz/buttons";

const MILESTONES: Record<number, string> = {
  3: "Three in a row",
  5: "Five in a row. On fire",
  10: "Ten in a row. Unstoppable",
  15: "Fifteen straight",
  20: "Twenty straight. Flawless",
};

export function QuizSession({
  deck,
  titles,
  onFinish,
  onQuit,
}: {
  deck: Card[];
  titles: Map<string, string>;
  onFinish: (outcome: Outcome) => void;
  onQuit: () => void;
}) {
  const [queue, setQueue] = useState(deck);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [first, setFirst] = useState<Record<string, boolean>>({});
  const [mastered, setMastered] = useState<Record<string, true>>({});
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [toast, setToast] = useState<{ text: string; id: number } | null>(null);
  const [startedAt] = useState(() => Date.now());
  const [sound, setSound] = useSound();
  const cardRef = useRef<HTMLDivElement>(null);

  const card = queue[index];
  const total = deck.length;
  const done = Object.keys(mastered).length;

  function pick(option: number, el: HTMLElement) {
    if (picked !== null) return;
    setPicked(option);

    const { key, answer } = card.item;
    const correct = option === answer;
    recordAnswer(key, correct);
    if (!(key in first)) setFirst({ ...first, [key]: correct });

    if (correct) {
      const run = streak + 1;
      setStreak(run);
      setBest(Math.max(best, run));
      setMastered({ ...mastered, [key]: true });
      correctSound(run - 1);
      burstFrom(el, run >= 5 ? 44 : 22);
      if (MILESTONES[run]) {
        setToast({ text: MILESTONES[run], id: Date.now() });
        if (run >= 5) window.setTimeout(chime, 260);
      }
    } else {
      setStreak(0);
      wrongSound();
      setQueue(requeue(queue, index));
    }
  }

  function finish() {
    const answered = deck.filter((c) => c.item.key in first);
    if (answered.length === 0) {
      onQuit();
      return;
    }

    const byArticle = new Map<string, { right: number; total: number }>();
    for (const c of answered) {
      const row = byArticle.get(c.item.article) ?? { right: 0, total: 0 };
      row.total += 1;
      if (first[c.item.key]) row.right += 1;
      byArticle.set(c.item.article, row);
    }

    const right = answered.filter((c) => first[c.item.key]).length;
    if (right / answered.length >= 0.8) {
      fanfare();
      confetti({ x: window.innerWidth / 2, y: window.innerHeight * 0.35 }, { count: 160 });
    } else {
      chime();
    }

    onFinish({
      total: answered.length,
      right,
      bestStreak: best,
      ms: Date.now() - startedAt,
      perArticle: [...byArticle].map(([article, r]) => ({ article, ...r })),
      missed: answered.filter((c) => !first[c.item.key]).map((c) => c.item),
    });
  }

  function next() {
    if (picked === null) return;
    if (index + 1 >= queue.length) {
      finish();
      return;
    }
    setIndex(index + 1);
    setPicked(null);
    cardRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable]")) return;

      if (picked === null) {
        const n = Number(e.key);
        if (Number.isInteger(n) && n >= 1 && n <= card.order.length) {
          const el = cardRef.current?.querySelectorAll<HTMLElement>(".quiz-option")[n - 1];
          if (el) {
            e.preventDefault();
            pick(card.order[n - 1], el);
          }
        }
        return;
      }

      const onButton = target?.closest("button, a") !== null;
      if (e.key === "ArrowRight" || (!onButton && (e.key === "Enter" || e.key === " "))) {
        e.preventDefault();
        next();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="mx-auto max-w-[680px]">
      <div className="sticky top-0 z-10 -mx-2 flex items-center gap-3 bg-[var(--bg-page)] px-2 py-3">
        <button
          type="button"
          onClick={finish}
          aria-label="End round"
          title="End round"
          className="rounded-full p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
        >
          <IconClose className="h-[18px] w-[18px]" />
        </button>
        <div
          role="progressbar"
          aria-label="Questions mastered"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={done}
          className="h-3 flex-1 overflow-hidden rounded-full bg-[var(--bg-subtle)]"
        >
          <div
            className="relative h-full rounded-full bg-[var(--correct)] transition-[width] duration-500 ease-out"
            style={{ width: `${(done / total) * 100}%` }}
          >
            <span className="absolute inset-x-2 top-[3px] h-[3px] rounded-full bg-white/35" />
          </div>
        </div>
        <span className="w-[46px] text-right font-mono text-[12.5px] text-[var(--text-muted)]">
          {done}/{total}
        </span>
        <span
          key={streak}
          aria-label={`Streak ${streak}`}
          className={[
            "flex min-w-[46px] items-center justify-center gap-1 rounded-full px-2 py-1 font-mono text-[13px] font-semibold",
            streak > 0 ? "quiz-bump" : "",
            streak >= 3
              ? "bg-[color-mix(in_srgb,var(--subject-political-philosophy)_16%,transparent)] text-[var(--subject-political-philosophy)]"
              : "text-[var(--text-muted)]",
          ].join(" ")}
        >
          <IconFlame className="h-[16px] w-[16px]" />
          {streak}
        </span>
        <button
          type="button"
          onClick={() => setSound(!sound)}
          aria-pressed={!sound}
          aria-label={sound ? "Mute sounds" : "Unmute sounds"}
          className="rounded-full p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
        >
          {sound ? (
            <IconVolume className="h-[18px] w-[18px]" />
          ) : (
            <IconVolumeOff className="h-[18px] w-[18px]" />
          )}
        </button>
      </div>

      {toast && (
        <div
          key={toast.id}
          role="status"
          className="quiz-toast pointer-events-none fixed left-1/2 top-24 z-40 flex items-center gap-2 rounded-full bg-[var(--text-primary)] px-4 py-2 text-[14px] font-semibold text-[var(--bg-page)]"
          style={{ boxShadow: "var(--shadow-panel)" }}
        >
          <IconFlame className="h-[17px] w-[17px] text-[var(--subject-political-philosophy-lift)]" />
          {toast.text}
        </div>
      )}

      <div ref={cardRef} key={index} className="quiz-enter mt-6 scroll-mt-20">
        <Question
          item={card.item}
          order={card.order}
          picked={picked}
          onPick={pick}
          hints
          eyebrow={
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[var(--border)] px-2.5 py-[3px] text-[11.5px] font-medium text-[var(--text-muted)]">
                {titles.get(card.item.article) ?? card.item.article}
              </span>
              {card.retry && (
                <span className="rounded-full bg-[var(--accent-wash)] px-2.5 py-[3px] text-[11.5px] font-semibold text-[var(--accent)]">
                  Second chance
                </span>
              )}
            </div>
          }
          footer={
            <div className="mt-4 flex items-center justify-end gap-3">
              <span className="hidden text-[12px] text-[var(--text-muted)] sm:inline">
                Press Enter
              </span>
              <button
                type="button"
                ref={(el) => {
                  el?.focus({ preventScroll: true });
                  el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
                }}
                onClick={next}
                className={PRIMARY}
              >
                {index + 1 >= queue.length ? "See results" : "Continue"}
                <IconArrowRight className="h-[15px] w-[15px]" />
              </button>
            </div>
          }
        />
        {picked === null && (
          <p className="mt-5 hidden text-center text-[12px] text-[var(--text-muted)] sm:block">
            Press 1 to {card.order.length} to answer
          </p>
        )}
      </div>
    </div>
  );
}
