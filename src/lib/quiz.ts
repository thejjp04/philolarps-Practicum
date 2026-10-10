import "server-only";

import fs from "node:fs";
import path from "node:path";
import katex from "katex";

import { CONTENT_DIR, getSubjectPath } from "@/lib/content";
import { SUBJECTS } from "@/lib/subjects";
import type { QuizItem, QuizQuestion, QuizSubject, Tier } from "@/lib/types";

const CACHE = process.env.NODE_ENV === "production";
const cache = new Map<string, QuizItem[]>();

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderInline(text: string): string {
  return text
    .split(/(\$[^$]+\$[.,;:!?)]*)/g)
    .map((part) => {
      const math = /^\$([^$]+)\$(.*)$/.exec(part);
      if (math) {
        const formula = katex.renderToString(math[1], { throwOnError: true });
        return math[2]
          ? `<span style="white-space:nowrap">${formula}${escapeHtml(math[2])}</span>`
          : formula;
      }
      return escapeHtml(part)
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\*([^*]+)\*/g, "<em>$1</em>")
        .replace(/`([^`]+)`/g, "<code>$1</code>");
    })
    .join("");
}

function readQuestions(subject: string, tier: Tier, slug: string): QuizQuestion[] {
  const file = path.join(CONTENT_DIR, subject, tier, `${slug}.quiz.json`);
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8")) as QuizQuestion[];
}

export function getArticleQuiz(subject: string, tier: Tier, slug: string): QuizItem[] {
  const article = `${subject}/${tier}/${slug}`;
  const hit = cache.get(article);
  if (CACHE && hit) return hit;

  const items = readQuestions(subject, tier, slug).map((q) => ({
    key: `${article}#${q.id}`,
    article,
    question: renderInline(q.question),
    options: q.options.map(renderInline),
    answer: q.answer,
    explanation: renderInline(q.explanation),
    ...(q.section ? { source: `/${article}#${q.section}` } : {}),
  }));

  cache.set(article, items);
  return items;
}

export function getSubjectQuiz(subject: string): QuizItem[] {
  return getSubjectPath(subject)
    .filter((a) => a.written)
    .flatMap((a) => getArticleQuiz(a.subject, a.tier, a.slug));
}

export function getQuizCatalogue(): QuizSubject[] {
  return SUBJECTS.map((subject) => ({
    slug: subject.slug,
    name: subject.name,
    articles: getSubjectPath(subject.slug)
      .filter((a) => a.written)
      .map((a) => ({
        key: `${a.subject}/${a.tier}/${a.slug}`,
        title: a.title,
        tier: a.tier,
        href: a.href,
        count: getArticleQuiz(a.subject, a.tier, a.slug).length,
      }))
      .filter((a) => a.count > 0),
  })).filter((s) => s.articles.length > 0);
}
