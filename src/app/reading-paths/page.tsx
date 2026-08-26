import Link from "next/link";
import type { Metadata } from "next";

import { Container, PageHeader } from "@/components/ui";
import { IconArrowRight } from "@/components/icons";
import { getResolvedPaths } from "@/lib/content";

export const metadata: Metadata = {
  title: "Reading Paths",
  description:
    "Three curated sequences through the curriculum, each crossing several subjects.",
};

export default function ReadingPathsPage() {
  const paths = getResolvedPaths();

  return (
    <Container>
      <PageHeader
        title="Reading Paths"
        lead="Each subject already has its own order. These three sequences cut across subjects instead, for readers who want a route through the whole site rather than a route through one part of it."
      />

      <div className="space-y-8">
        {paths.map((path) => {
          const minutes = path.articles.reduce((sum, a) => sum + a.estReadMin, 0);
          const written = path.articles.filter((a) => a.written).length;

          return (
            <article
              key={path.slug}
              className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <h2 className="text-[20px] font-bold tracking-[-0.02em]">
                <Link
                  href={`/reading-paths/${path.slug}`}
                  className="hover:text-[var(--accent)]"
                >
                  {path.name}
                </Link>
              </h2>
              <p className="mt-1.5 font-mono text-[11.5px] text-[var(--text-muted)]">
                {path.articles.length} articles · about{" "}
                {Math.round(minutes / 60)} hours · {written} written
              </p>
              <p className="mt-3 max-w-[64ch] font-serif text-[16px] leading-[1.6] text-[var(--text-muted)]">
                {path.blurb}
              </p>
              <Link
                href={`/reading-paths/${path.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
              >
                See the sequence
                <IconArrowRight className="h-[15px] w-[15px]" />
              </Link>
            </article>
          );
        })}
      </div>
    </Container>
  );
}
