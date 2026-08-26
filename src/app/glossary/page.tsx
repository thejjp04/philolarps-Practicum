import Link from "next/link";
import type { Metadata } from "next";

import { Container, PageHeader } from "@/components/ui";
import { getGlossary } from "@/lib/content";
import { TIER_LABEL } from "@/lib/types";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Every term defined anywhere on the site, with a link back to the article that defines it.",
};

export default function GlossaryPage() {
  const entries = getGlossary();

  const letters = [...new Set(entries.map((e) => e.term[0].toUpperCase()))].sort();

  return (
    <Container>
      <PageHeader
        title="Glossary"
        lead="Every term the site defines, collected from the definition boxes in the articles themselves. A term is defined in exactly one place, and this is the link to it."
      />

      {entries.length === 0 ? (
        <p className="font-serif text-[16px] leading-[1.6] text-[var(--text-muted)]">
          Empty for now. The glossary fills itself in as articles are written:
          every definition box in an article becomes an entry here, so there is
          nothing to maintain by hand.
        </p>
      ) : (
        <>
          <nav
            aria-label="Jump to letter"
            className="mb-10 flex flex-wrap gap-1.5 border-y border-[var(--border)] py-3"
          >
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="rounded-[var(--radius-pill)] px-2.5 py-1 font-mono text-[12.5px] text-[var(--text-muted)] transition-colors hover:bg-[var(--accent-wash)] hover:text-[var(--accent)]"
              >
                {letter}
              </a>
            ))}
          </nav>

          <div className="space-y-10">
            {letters.map((letter) => (
              <section
                key={letter}
                id={`letter-${letter}`}
                className="scroll-mt-24"
              >
                <h2 className="mb-4 font-mono text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  {letter}
                </h2>
                <dl className="space-y-6">
                  {entries
                    .filter((e) => e.term[0].toUpperCase() === letter)
                    .map((entry) => (
                      <div key={entry.href}>
                        <dt className="text-[16px] font-semibold text-[var(--accent)]">
                          {entry.term}
                        </dt>
                        <dd className="mt-1 font-serif text-[16px] leading-[1.6]">
                          {entry.definition}
                          <Link
                            href={entry.href}
                            className="mt-1.5 block font-sans text-[12px] text-[var(--text-muted)] hover:text-[var(--accent)]"
                          >
                            Defined in {entry.articleTitle} ·{" "}
                            {entry.subjectName} · {TIER_LABEL[entry.tier]}
                          </Link>
                        </dd>
                      </div>
                    ))}
                </dl>
              </section>
            ))}
          </div>
        </>
      )}
    </Container>
  );
}
