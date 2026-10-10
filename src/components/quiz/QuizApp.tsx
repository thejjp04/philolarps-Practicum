"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useDone } from "@/components/finish";
import {
  IconArrowRight,
  IconCheck,
  IconChevron,
  IconQuiz,
  IconRetry,
  IconSpark,
  SubjectGlyph,
} from "@/components/icons";
import { buildDeck, type Card } from "@/components/quiz/deck";
import { MASTERED_BOX, articleOf, isDue, useProgress, type Progress } from "@/components/quiz/progress";
import { QuizResults, type Outcome } from "@/components/quiz/QuizResults";
import { QuizSession } from "@/components/quiz/QuizSession";
import { PRIMARY, SECONDARY } from "@/components/quiz/buttons";
import { TIERS, TIER_LABEL, type QuizItem, type QuizSubject } from "@/lib/types";

const LENGTHS = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
  { value: 0, label: "All" },
];

const loaded = new Map<string, Promise<QuizItem[]>>();

function loadSubject(subject: string): Promise<QuizItem[]> {
  let hit = loaded.get(subject);
  if (!hit) {
    hit = fetch(`/api/quiz/${subject}`).then((res) => {
      if (!res.ok) throw new Error(`quiz ${subject}: ${res.status}`);
      return res.json() as Promise<QuizItem[]>;
    });
    hit.catch(() => loaded.delete(subject));
    loaded.set(subject, hit);
  }
  return hit;
}

async function loadItems(articles: string[]): Promise<QuizItem[]> {
  const subjects = [...new Set(articles.map((a) => a.split("/")[0]))];
  const wanted = new Set(articles);
  const all = await Promise.all(subjects.map(loadSubject));
  return all.flat().filter((item) => wanted.has(item.article));
}

type Request = { articles: string[]; only?: string[]; size: number };

type Phase =
  | { kind: "setup" }
  | { kind: "loading"; request: Request }
  | { kind: "error"; request: Request }
  | { kind: "play"; request: Request; deck: Card[]; id: number }
  | { kind: "done"; request: Request; outcome: Outcome };

function initialArticles(params: URLSearchParams, catalogue: QuizSubject[]): string[] {
  const known = new Set(catalogue.flatMap((s) => s.articles.map((a) => a.key)));
  const fromArticle = (params.get("a") ?? "").split(",").filter((k) => known.has(k));
  if (fromArticle.length > 0) return fromArticle;
  const subject = catalogue.find((s) => s.slug === params.get("s"));
  return subject ? subject.articles.map((a) => a.key) : [];
}

export function QuizApp({ catalogue }: { catalogue: QuizSubject[] }) {
  const params = useSearchParams();
  const progress = useProgress();
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(initialArticles(params, catalogue)),
  );
  const [size, setSize] = useState(10);
  const [phase, setPhase] = useState<Phase>(() => {
    const articles = params.get("a") ? initialArticles(params, catalogue) : [];
    return articles.length > 0
      ? { kind: "loading", request: { articles, size: 0 } }
      : { kind: "setup" };
  });

  const titles = useMemo(
    () => new Map(catalogue.flatMap((s) => s.articles.map((a) => [a.key, a.title] as const))),
    [catalogue],
  );

  const pending = phase.kind === "loading" ? phase.request : null;

  useEffect(() => {
    if (!pending) return;
    let live = true;
    loadItems(pending.articles)
      .then((items) => {
        if (!live) return;
        const only = pending.only ? new Set(pending.only) : null;
        const pool = only ? items.filter((i) => only.has(i.key)) : items;
        const deck = buildDeck(pool, progress, pending.size, Date.now());
        setPhase(
          deck.length > 0
            ? { kind: "play", request: pending, deck, id: Date.now() }
            : { kind: "setup" },
        );
      })
      .catch(() => {
        if (live) setPhase({ kind: "error", request: pending });
      });
    return () => {
      live = false;
    };
  }, [pending, progress]);

  function start(request: Request) {
    setPhase({ kind: "loading", request });
  }

  if (phase.kind === "loading") return <Loading />;

  if (phase.kind === "error") {
    return (
      <div className="mx-auto max-w-[520px] py-24 text-center">
        <p className="text-[17px] font-semibold">The questions did not load.</p>
        <p className="mt-2 font-serif text-[15px] text-[var(--text-muted)]">
          Check your connection and try again.
        </p>
        <div className="mt-6 flex justify-center gap-2.5">
          <button type="button" onClick={() => start(phase.request)} className={PRIMARY}>
            Try again
          </button>
          <button type="button" onClick={() => setPhase({ kind: "setup" })} className={SECONDARY}>
            Back
          </button>
        </div>
      </div>
    );
  }

  if (phase.kind === "play") {
    return (
      <QuizSession
        key={phase.id}
        deck={phase.deck}
        titles={titles}
        onFinish={(outcome) => setPhase({ kind: "done", request: phase.request, outcome })}
        onQuit={() => setPhase({ kind: "setup" })}
      />
    );
  }

  if (phase.kind === "done") {
    const { request, outcome } = phase;
    return (
      <QuizResults
        outcome={outcome}
        titles={titles}
        onRetryMissed={() =>
          start({
            articles: [...new Set(outcome.missed.map((i) => i.article))],
            only: outcome.missed.map((i) => i.key),
            size: 0,
          })
        }
        onAgain={() => start({ ...request, only: undefined })}
        onSetup={() => setPhase({ kind: "setup" })}
      />
    );
  }

  return (
    <Setup
      catalogue={catalogue}
      progress={progress}
      selected={selected}
      setSelected={setSelected}
      size={size}
      setSize={setSize}
      onStart={start}
    />
  );
}


function Loading() {
  return (
    <div className="mx-auto max-w-[680px] py-10" aria-busy="true" aria-live="polite">
      <p className="sr-only">Shuffling the deck</p>
      <div className="h-2.5 animate-pulse rounded-full bg-[var(--bg-subtle)]" />
      <div className="mt-10 space-y-3">
        <div className="h-6 w-4/5 animate-pulse rounded-md bg-[var(--bg-subtle)]" />
        <div className="h-6 w-3/5 animate-pulse rounded-md bg-[var(--bg-subtle)]" />
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="!mt-4 h-[52px] animate-pulse rounded-[12px] bg-[var(--bg-subtle)]"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function Setup({
  catalogue,
  progress,
  selected,
  setSelected,
  size,
  setSize,
  onStart,
}: {
  catalogue: QuizSubject[];
  progress: Progress;
  selected: Set<string>;
  setSelected: (next: Set<string>) => void;
  size: number;
  setSize: (n: number) => void;
  onStart: (request: Request) => void;
}) {
  const done = useDone();
  const [now] = useState(() => Date.now());
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState<Set<string>>(
    () =>
      new Set(
        catalogue
          .filter((s) => s.articles.some((a) => selected.has(a.key)))
          .map((s) => s.slug),
      ),
  );

  const articles = catalogue.flatMap((s) => s.articles);
  const counts = new Map(articles.map((a) => [a.key, a.count]));

  const answered = Object.keys(progress).length;
  const masteredAll = Object.values(progress).filter((m) => m.box >= MASTERED_BOX).length;
  const dueKeys = Object.keys(progress).filter(
    (k) => counts.has(articleOf(k)) && isDue(progress[k], now),
  );
  const readKeys = articles.filter((a) => done.has(a.href)).map((a) => a.key);
  const readQuestions = readKeys.reduce((n, k) => n + (counts.get(k) ?? 0), 0);

  const masteredIn = (key: string) =>
    Object.entries(progress).filter(([k, m]) => articleOf(k) === key && m.box >= MASTERED_BOX)
      .length;

  const selectedQuestions = [...selected].reduce((n, k) => n + (counts.get(k) ?? 0), 0);
  const roundSize = size > 0 ? Math.min(size, selectedQuestions) : selectedQuestions;

  const needle = filter.trim().toLowerCase();
  const visible = catalogue
    .map((s) => ({
      ...s,
      articles: needle
        ? s.articles.filter(
            (a) => a.title.toLowerCase().includes(needle) || s.name.toLowerCase().includes(needle),
          )
        : s.articles,
    }))
    .filter((s) => s.articles.length > 0);

  function toggle(keys: string[], on: boolean) {
    const next = new Set(selected);
    for (const k of keys) {
      if (on) next.add(k);
      else next.delete(k);
    }
    setSelected(next);
  }

  function toggleOpen(slug: string) {
    const next = new Set(open);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    setOpen(next);
  }

  return (
    <div className="pb-28">
      <header className="mb-9">
        <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-[var(--text-muted)]">
          <IconQuiz className="h-[14px] w-[14px]" />
          Quiz
        </p>
        <h1 className="text-[34px] font-bold leading-[1.15] tracking-[-0.025em] lg:text-[40px]">
          Quiz yourself
        </h1>
        <p className="mt-4 max-w-[62ch] font-serif text-[18px] leading-[1.65] text-[var(--text-muted)]">
          Pick the articles you want to be tested on. Anything you miss comes back
          later in the round until you get it right, and spaced review brings each
          question back just before you would forget it.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        <QuickStart
          tone="accent"
          title={dueKeys.length > 0 ? `${dueKeys.length} due for review` : "Nothing due yet"}
          body={
            dueKeys.length > 0
              ? "Questions whose review interval has come round, plus any you missed recently."
              : answered > 0
                ? `${answered} answered, ${masteredAll} mastered. Come back tomorrow and the first reviews will be waiting.`
                : "Answer some questions and they will come back here on a schedule."
          }
          action="Review now"
          disabled={dueKeys.length === 0}
          onClick={() =>
            onStart({
              articles: [...new Set(dueKeys.map(articleOf))],
              only: dueKeys,
              size: 0,
            })
          }
        />
        <QuickStart
          title={readKeys.length > 0 ? `${readKeys.length} articles read` : "Articles you have read"}
          body={
            readKeys.length > 0
              ? `A mixed round of ${Math.min(20, readQuestions)} from the ${readQuestions} questions on what you have marked as read.`
              : "Mark articles as read at the end of each one, and this builds a round from them."
          }
          action="Quiz my reading"
          disabled={readKeys.length === 0}
          onClick={() => onStart({ articles: readKeys, size: 20 })}
        />
      </div>

      <div className="mt-12 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[20px] font-bold tracking-[-0.02em]">Build a quiz</h2>
          <p className="mt-1 text-[13.5px] text-[var(--text-muted)]">
            {articles.length} articles, {articles.reduce((n, a) => n + a.count, 0)} questions.
          </p>
        </div>
        <input
          type="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter articles"
          aria-label="Filter articles"
          className="h-9 w-full rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--surface)] px-3.5 text-[13.5px] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] sm:w-[240px]"
        />
      </div>

      <ul className="mt-5 space-y-2.5">
        {visible.map((subject) => {
          const keys = subject.articles.map((a) => a.key);
          const chosen = keys.filter((k) => selected.has(k)).length;
          const all = chosen === keys.length;
          const isOpen = open.has(subject.slug) || needle.length > 0;
          const panel = `quiz-subject-${subject.slug}`;

          return (
            <li
              key={subject.slug}
              className="overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--surface)]"
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <Tick
                  state={all ? "on" : chosen > 0 ? "mixed" : "off"}
                  label={`Select all of ${subject.name}`}
                  onClick={() => toggle(keys, !all)}
                />
                <button
                  type="button"
                  onClick={() => toggleOpen(subject.slug)}
                  aria-expanded={isOpen}
                  aria-controls={panel}
                  className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
                >
                  <SubjectGlyph slug={subject.slug} />
                  <span className="truncate text-[15px] font-semibold">{subject.name}</span>
                  <span className="ml-auto shrink-0 font-mono text-[11.5px] text-[var(--text-muted)]">
                    {chosen > 0 ? `${chosen}/${keys.length}` : keys.length} articles
                  </span>
                  <IconChevron
                    className="h-3.5 w-3.5 shrink-0 text-[var(--text-muted)] transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(90deg)" : undefined }}
                  />
                </button>
              </div>

              {isOpen && (
                <div id={panel} className="border-t border-[var(--border)] px-4 pb-3 pt-1">
                  {TIERS.map((tier) => {
                    const inTier = subject.articles.filter((a) => a.tier === tier);
                    if (inTier.length === 0) return null;
                    const tierKeys = inTier.map((a) => a.key);
                    const tierAll = tierKeys.every((k) => selected.has(k));

                    return (
                      <div key={tier} className="pt-3">
                        <div className="mb-1.5 flex items-center justify-between">
                          <h3 className="text-[10.5px] font-semibold uppercase tracking-[0.11em] text-[var(--text-muted)]">
                            {TIER_LABEL[tier]}
                          </h3>
                          <button
                            type="button"
                            onClick={() => toggle(tierKeys, !tierAll)}
                            className="text-[12px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
                          >
                            {tierAll ? "Clear" : "Select all"}
                          </button>
                        </div>
                        <ul className="space-y-0.5">
                          {inTier.map((article) => {
                            const on = selected.has(article.key);
                            const mastered = masteredIn(article.key);
                            return (
                              <li key={article.key}>
                                <label className="flex cursor-pointer items-center gap-3 rounded-[9px] px-2 py-2 transition-colors hover:bg-[var(--bg-subtle)]">
                                  <input
                                    type="checkbox"
                                    checked={on}
                                    onChange={(e) => toggle([article.key], e.target.checked)}
                                    className="peer sr-only"
                                  />
                                  <Tick state={on ? "on" : "off"} decorative />
                                  <span className="min-w-0 flex-1 text-[14px] leading-snug">
                                    {article.title}
                                    {done.has(article.href) && (
                                      <span className="ml-2 align-middle text-[10.5px] font-medium uppercase tracking-[0.07em] text-[var(--text-muted)]">
                                        Read
                                      </span>
                                    )}
                                  </span>
                                  <MasteryBar mastered={mastered} count={article.count} />
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </li>
          );
        })}
        {visible.length === 0 && (
          <li className="rounded-[14px] border border-dashed border-[var(--border)] px-4 py-8 text-center text-[14px] text-[var(--text-muted)]">
            No article matches &ldquo;{filter}&rdquo;.
          </li>
        )}
      </ul>

      <div className="sticky bottom-4 z-10 mt-8">
        <div
          className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-[16px] border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
          style={{ boxShadow: "var(--shadow-panel)" }}
        >
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-semibold">
              {selected.size === 0
                ? "No articles chosen"
                : `${selected.size} article${selected.size === 1 ? "" : "s"}, ${selectedQuestions} questions`}
            </p>
            {selected.size > 0 && (
              <button
                type="button"
                onClick={() => setSelected(new Set())}
                className="text-[12px] text-[var(--text-muted)] hover:text-[var(--accent)]"
              >
                Clear selection
              </button>
            )}
          </div>
          <div
            role="radiogroup"
            aria-label="Questions per round"
            className="flex rounded-[var(--radius-pill)] bg-[var(--bg-subtle)] p-[3px]"
          >
            {LENGTHS.map((l) => (
              <button
                key={l.value}
                type="button"
                role="radio"
                aria-checked={size === l.value}
                onClick={() => setSize(l.value)}
                className={[
                  "min-w-[40px] rounded-[var(--radius-pill)] px-2.5 py-[5px] text-[12.5px] font-semibold transition-colors",
                  size === l.value
                    ? "bg-[var(--accent)] text-[var(--on-accent)]"
                    : "text-[var(--text-muted)] hover:text-[var(--accent)]",
                ].join(" ")}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={selected.size === 0}
            onClick={() => onStart({ articles: [...selected], size })}
            className={PRIMARY}
          >
            Start{roundSize > 0 ? ` ${roundSize}` : ""}
            <IconArrowRight className="h-[15px] w-[15px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

function QuickStart({
  title,
  body,
  action,
  disabled,
  onClick,
  tone,
}: {
  title: string;
  body: string;
  action: string;
  disabled: boolean;
  onClick: () => void;
  tone?: "accent";
}) {
  return (
    <div
      className={[
        "flex flex-col rounded-[16px] border px-5 py-4",
        tone === "accent" && !disabled
          ? "border-transparent bg-[var(--accent)] text-[var(--on-accent)]"
          : "border-[var(--border)] bg-[var(--surface)]",
      ].join(" ")}
    >
      <p className="flex items-center gap-2 text-[16px] font-semibold">
        {tone === "accent" ? (
          <IconRetry className="h-[17px] w-[17px]" />
        ) : (
          <IconSpark className="h-[17px] w-[17px]" />
        )}
        {title}
      </p>
      <p
        className={[
          "mt-1.5 flex-1 font-serif text-[14.5px] leading-[1.5]",
          tone === "accent" && !disabled ? "opacity-85" : "text-[var(--text-muted)]",
        ].join(" ")}
      >
        {body}
      </p>
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={[
          "mt-4 inline-flex items-center gap-1.5 self-start rounded-[var(--radius-pill)] px-4 py-[7px] text-[13px] font-semibold transition-[background-color,transform,opacity] disabled:pointer-events-none disabled:opacity-40",
          tone === "accent" && !disabled
            ? "bg-[var(--on-accent)] text-[var(--accent)] hover:-translate-y-[1px]"
            : "border border-[var(--border)] text-[var(--accent)] hover:bg-[var(--accent-wash)]",
        ].join(" ")}
      >
        {action}
        <IconArrowRight className="h-[14px] w-[14px]" />
      </button>
    </div>
  );
}

function Tick({
  state,
  label,
  onClick,
  decorative,
}: {
  state: "on" | "off" | "mixed";
  label?: string;
  onClick?: () => void;
  decorative?: boolean;
}) {
  const box = (
    <span
      aria-hidden={decorative}
      className={[
        "flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[6px] border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--accent)]",
        state === "off"
          ? "border-[var(--border)] bg-[var(--surface)]"
          : "border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)]",
      ].join(" ")}
    >
      {state === "on" && <IconCheck className="quiz-tick h-[13px] w-[13px]" />}
      {state === "mixed" && <span className="h-[2px] w-[9px] rounded bg-current" />}
    </span>
  );

  if (decorative) return box;

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={state === "mixed" ? "mixed" : state === "on"}
      aria-label={label}
      onClick={onClick}
      className="rounded-[6px]"
    >
      {box}
    </button>
  );
}

function MasteryBar({ mastered, count }: { mastered: number; count: number }) {
  const share = Math.min(mastered / count, 1);
  return (
    <span className="flex shrink-0 items-center gap-2" title={`${mastered} of ${count} mastered`}>
      <span className="hidden h-[5px] w-[44px] overflow-hidden rounded-full bg-[var(--bg-subtle)] sm:block">
        <span
          className="block h-full rounded-full bg-[var(--correct)]"
          style={{ width: `${share * 100}%` }}
        />
      </span>
      <span className="w-[34px] text-right font-mono text-[11px] text-[var(--text-muted)]">
        {count}q
      </span>
    </span>
  );
}
