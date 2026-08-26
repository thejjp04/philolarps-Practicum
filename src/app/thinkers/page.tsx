import Link from "next/link";
import type { Metadata } from "next";

import { Container, PageHeader } from "@/components/ui";
import { getThinkerRecords } from "@/lib/content";
import { TIER_LABEL } from "@/lib/types";

export const metadata: Metadata = {
  title: "Thinkers Index",
  description:
    "Every philosopher the curriculum engages with, their dates, what they held, and where the site covers them.",
};

export default function ThinkersPage() {
  const thinkers = getThinkerRecords();

  return (
    <Container>
      <PageHeader
        eyebrow={`${thinkers.length} entries`}
        title="Thinkers Index"
        lead="Who the curriculum engages with, roughly chronological. The line under each name says what the person held, not what they are best known for. Dates are printed only where they are settled; a 'c.' means the scholarship is not agreed."
      />

      <ol className="space-y-9">
        {thinkers.map((thinker) => (
          <li
            key={thinker.name}
            id={thinker.name.toLowerCase().replace(/[^a-z]+/g, "-")}
            className="scroll-mt-24"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-[17px] font-semibold leading-snug">
                {thinker.name}
              </h2>
              <span className="font-mono text-[12.5px] text-[var(--text-muted)]">
                {thinker.dates}
              </span>
            </div>

            <p className="mt-1.5 max-w-[64ch] font-serif text-[16px] leading-[1.6]">
              {thinker.position}
            </p>

            {thinker.articles.length > 0 && (
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {thinker.articles.map((article) => (
                  <li key={article.href}>
                    <Link
                      href={article.href}
                      className={[
                        "inline-block rounded-[var(--radius-pill)] border border-[var(--border)] px-2.5 py-[3px] text-[12px] transition-colors hover:bg-[var(--accent-wash)]",
                        article.written
                          ? "text-[var(--accent)]"
                          : "text-[var(--text-muted)]",
                      ].join(" ")}
                    >
                      {article.title}
                      <span className="sr-only">
                        {" "}
                        ({article.subjectName}, {TIER_LABEL[article.tier]}
                        {article.written ? "" : ", planned"})
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </Container>
  );
}
