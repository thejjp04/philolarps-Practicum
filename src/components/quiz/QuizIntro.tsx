"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { chime, starBurst } from "@/components/fx";
import { IconArrowRight, IconFlame, IconQuiz, IconRetry } from "@/components/icons";
import { PRIMARY, SECONDARY } from "@/components/quiz/buttons";

const TOUR_KEY = "philolarps-tour";
const SEEN_KEY = "philolarps-quiz-intro";

const POINTS = [
  { Icon: IconQuiz, text: "Questions now sit inside the articles, so you can check yourself as you read." },
  { Icon: IconRetry, text: "Build your own quiz from any articles. Misses come back until you get them." },
  { Icon: IconFlame, text: "Streaks, sounds and spaced review that brings questions back before you forget." },
];

function remember() {
  try {
    localStorage.setItem(SEEN_KEY, "seen");
  } catch {
  }
}

export function QuizIntro() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const onQuiz = pathname === "/quiz";

  useEffect(() => {
    let tour: string | null = null;
    let seen: string | null = null;
    try {
      tour = localStorage.getItem(TOUR_KEY);
      seen = localStorage.getItem(SEEN_KEY);
    } catch {
      return;
    }
    if (seen) return;
    if (!tour || onQuiz) {
      remember();
      return;
    }
    const timer = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(timer);
  }, [onQuiz]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      if (logoRef.current) starBurst(logoRef.current, { count: 64, power: 1.05 });
    }, 380);
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function dismiss() {
    remember();
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        onClick={dismiss}
        className="quiz-intro-scrim absolute inset-0 bg-[var(--scrim)]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="New: quizzes"
        className="quiz-intro-card relative w-full max-w-[440px] rounded-[18px] border border-[var(--border)] bg-[var(--surface)] px-6 pb-6 pt-9 text-center"
        style={{ boxShadow: "var(--shadow-panel)" }}
      >
        <div ref={logoRef} className="relative mx-auto w-[260px] max-w-full">
          <span aria-hidden="true" className="quiz-intro-glow pointer-events-none absolute -inset-8 rounded-full" />
          <div className="quiz-intro-logo relative">
            <Image src="/quiz-logo.webp" alt="Quiz" width={1000} height={414} priority className="h-auto w-full" />
            <span aria-hidden="true" className="quiz-intro-shine absolute inset-0" />
          </div>
        </div>

        <p
          className="quiz-intro-rise mt-6 inline-block rounded-full bg-[var(--accent-wash)] px-3 py-[3px] text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--accent)]"
          style={{ animationDelay: "380ms" }}
        >
          New on Philolarps
        </p>
        <h2
          className="quiz-intro-rise mt-3 text-[22px] font-bold tracking-[-0.02em]"
          style={{ animationDelay: "440ms" }}
        >
          Test yourself on what you read
        </h2>

        <ul className="mt-5 space-y-3 text-left">
          {POINTS.map(({ Icon, text }, i) => (
            <li
              key={text}
              className="quiz-intro-rise flex gap-3"
              style={{ animationDelay: `${520 + i * 70}ms` }}
            >
              <span className="mt-[1px] flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent-wash)] text-[var(--accent)]">
                <Icon className="h-[15px] w-[15px]" />
              </span>
              <span className="font-serif text-[14.5px] leading-[1.5]">{text}</span>
            </li>
          ))}
        </ul>

        <div
          className="quiz-intro-rise mt-7 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-center"
          style={{ animationDelay: "760ms" }}
        >
          <button type="button" onClick={dismiss} className={SECONDARY}>
            Maybe later
          </button>
          <Link
            href="/quiz"
            onClick={() => {
              chime();
              dismiss();
            }}
            className={PRIMARY}
          >
            Try a quiz
            <IconArrowRight className="h-[15px] w-[15px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
