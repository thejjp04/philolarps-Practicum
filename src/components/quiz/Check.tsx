"use client";

import { useState } from "react";

import { burstFrom, correctSound, wrongSound } from "@/components/fx";
import { Question } from "@/components/quiz/Question";
import { recordAnswer } from "@/components/quiz/progress";
import type { QuizItem } from "@/lib/types";

export function Check({ item }: { item: QuizItem }) {
  const [picked, setPicked] = useState<number | null>(null);

  function pick(option: number, el: HTMLElement) {
    setPicked(option);
    const correct = option === item.answer;
    recordAnswer(item.key, correct);
    if (correct) {
      correctSound(0);
      burstFrom(el, 18);
    } else {
      wrongSound();
    }
  }

  return (
    <section
      aria-label="Check your understanding"
      className="quiz-check my-9 rounded-[16px] border border-[var(--border)] bg-[var(--surface)] px-5 py-5 sm:px-6"
    >
      <Question
        item={{ ...item, source: undefined }}
        picked={picked}
        onPick={pick}
        eyebrow={
          <p className="mb-3 flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.11em] text-[var(--accent)]">
            <span aria-hidden="true" className="quiz-spark inline-block h-[7px] w-[7px] rounded-full bg-[var(--accent)]" />
            Check your understanding
          </p>
        }
      />
    </section>
  );
}
