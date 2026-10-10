"use client";

import { useSyncExternalStore } from "react";

export type Mastery = {
  box: number;
  due: number;
  right: number;
  wrong: number;
};

export type Progress = Record<string, Mastery>;

const KEY = "philolarps-quiz";
const EVENT = "philolarps-quiz-change";
const DAY = 86_400_000;
const INTERVAL_DAYS = [0, 1, 3, 7, 16, 35];
export const MASTERED_BOX = 3;

const EMPTY: Progress = {};
let cachedRaw: string | null = null;
let cached: Progress = EMPTY;

function read(): Progress {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
  }
  if (raw === cachedRaw) return cached;
  cachedRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    cached = parsed && typeof parsed === "object" ? (parsed as Progress) : EMPTY;
  } catch {
    cached = EMPTY;
  }
  return cached;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function nextMastery(prev: Mastery | undefined, correct: boolean, now: number): Mastery {
  const base = prev ?? { box: 0, due: now, right: 0, wrong: 0 };
  const box = correct ? Math.min(base.box + 1, INTERVAL_DAYS.length - 1) : 0;
  return {
    box,
    due: now + INTERVAL_DAYS[box] * DAY,
    right: base.right + (correct ? 1 : 0),
    wrong: base.wrong + (correct ? 0 : 1),
  };
}

export function recordAnswer(key: string, correct: boolean) {
  const next = { ...read(), [key]: nextMastery(read()[key], correct, Date.now()) };
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
  }
  window.dispatchEvent(new Event(EVENT));
}

export function isDue(m: Mastery | undefined, now: number): boolean {
  return m !== undefined && m.due <= now;
}

export function articleOf(key: string): string {
  return key.slice(0, key.indexOf("#"));
}
