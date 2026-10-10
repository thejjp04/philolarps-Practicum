import type { QuizItem } from "@/lib/types";

export type Card = { item: QuizItem; order: number[]; retry: boolean };

type Mastery = { box: number; due: number };

export function shuffle<T>(list: T[], random = Math.random): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function optionOrder(item: QuizItem, random = Math.random): number[] {
  const order = item.options.map((_, i) => i);
  return item.options.length > 2 ? shuffle(order, random) : order;
}

function priority(m: Mastery | undefined, now: number): number {
  if (!m) return 1;
  if (m.due <= now) return 0;
  return 2;
}

export function buildDeck(
  items: QuizItem[],
  progress: Record<string, Mastery>,
  size: number,
  now: number,
  random = Math.random,
): Card[] {
  const ranked = shuffle(items, random)
    .map((item) => ({ item, p: priority(progress[item.key], now), due: progress[item.key]?.due ?? 0 }))
    .sort((a, b) => a.p - b.p || (a.p === 2 ? a.due - b.due : 0))
    .slice(0, size > 0 ? size : items.length);

  return shuffle(ranked, random).map(({ item }) => ({
    item,
    order: optionOrder(item, random),
    retry: false,
  }));
}

export const RETRY_GAP = 3;

export function requeue(queue: Card[], index: number, random = Math.random): Card[] {
  const card = queue[index];
  const at = Math.min(index + 1 + RETRY_GAP, queue.length);
  const again: Card = { item: card.item, order: optionOrder(card.item, random), retry: true };
  return [...queue.slice(0, at), again, ...queue.slice(at)];
}
