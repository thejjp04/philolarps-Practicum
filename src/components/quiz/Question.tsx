"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { IconArrowRight, IconCheck, IconClose } from "@/components/icons";
import type { QuizItem } from "@/lib/types";

const PRAISE = ["Correct", "Exactly right", "Spot on", "Nicely done", "That's it"];
const CONSOLE = ["Not quite", "Not this time", "Close, but no"];

function pickPhrase(list: string[], key: string): string {
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) | 0;
  return list[Math.abs(h) % list.length];
}

export function Question({
  item,
  order,
  picked,
  onPick,
  hints = false,
  eyebrow,
  footer,
}: {
  item: QuizItem;
  order?: number[];
  picked: number | null;
  onPick: (option: number, el: HTMLElement) => void;
  hints?: boolean;
  eyebrow?: ReactNode;
  footer?: ReactNode;
}) {
  const shown = order ?? item.options.map((_, i) => i);
  const answered = picked !== null;
  const correct = picked === item.answer;

  return (
    <div>
      {eyebrow}
      <div
        className="quiz-html font-serif text-[19px] font-medium leading-[1.5]"
        dangerouslySetInnerHTML={{ __html: item.question }}
      />

      <div role="group" aria-label="Options" className="mt-5 space-y-2.5">
        {shown.map((option, position) => {
          const isAnswer = option === item.answer;
          const isPicked = option === picked;
          const state = !answered
            ? "idle"
            : isPicked
              ? isAnswer
                ? "right"
                : "wrong"
              : isAnswer
                ? "reveal"
                : "dim";

          return (
            <button
              key={option}
              type="button"
              disabled={answered}
              onClick={(e) => onPick(option, e.currentTarget)}
              aria-pressed={isPicked}
              data-state={state}
              className="quiz-option group flex w-full items-start gap-3 rounded-[12px] border px-4 py-3 text-left font-sans text-[15px] leading-[1.5] transition-[background-color,border-color,opacity,transform] duration-200"
            >
              <span
                aria-hidden="true"
                className="quiz-key mt-[1px] flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[7px] border font-mono text-[12px] font-semibold"
              >
                {state === "right" || state === "reveal" ? (
                  <IconCheck className="quiz-tick h-[14px] w-[14px]" />
                ) : state === "wrong" ? (
                  <IconClose className="quiz-tick h-[13px] w-[13px]" />
                ) : hints ? (
                  position + 1
                ) : (
                  String.fromCharCode(65 + position)
                )}
              </span>
              <span
                className="quiz-html min-w-0 flex-1"
                dangerouslySetInnerHTML={{ __html: item.options[option] }}
              />
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          role="status"
          data-correct={correct}
          className="quiz-feedback mt-5 rounded-[12px] border px-4 py-3.5"
        >
          <p className="flex items-center gap-2 font-sans text-[14px] font-semibold">
            <span className="quiz-feedback-icon flex h-[22px] w-[22px] items-center justify-center rounded-full">
              {correct ? (
                <IconCheck className="h-[13px] w-[13px]" />
              ) : (
                <IconClose className="h-[12px] w-[12px]" />
              )}
            </span>
            {pickPhrase(correct ? PRAISE : CONSOLE, item.key)}
          </p>
          <div
            className="quiz-html mt-2 font-serif text-[15.5px] leading-[1.6]"
            dangerouslySetInnerHTML={{ __html: item.explanation }}
          />
          {item.source && (
            <Link
              href={item.source}
              className="mt-2.5 inline-flex items-center gap-1 font-sans text-[13px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
            >
              Revisit this section
              <IconArrowRight className="h-[13px] w-[13px]" />
            </Link>
          )}
          {footer}
        </div>
      )}
    </div>
  );
}
