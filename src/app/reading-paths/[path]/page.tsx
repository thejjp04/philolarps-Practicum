import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ArticleRow, Container, PageHeader } from "@/components/ui";
import { getResolvedPath } from "@/lib/content";
import { READING_PATHS } from "@/lib/reading-paths";

type Params = { params: Promise<{ path: string }> };

export function generateStaticParams() {
  return READING_PATHS.map((p) => ({ path: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { path: slug } = await params;
  const path = getResolvedPath(slug);
  if (!path) return {};
  return { title: path.name, description: path.blurb };
}

export default async function ReadingPathPage({ params }: Params) {
  const { path: slug } = await params;
  const path = getResolvedPath(slug);
  if (!path) notFound();

  const minutes = path.articles.reduce((sum, a) => sum + a.estReadMin, 0);
  const written = path.articles.filter((a) => a.written).length;

  return (
    <Container>
      <PageHeader
        eyebrow={`${path.articles.length} articles · about ${Math.round(
          minutes / 60,
        )} hours · ${written} written`}
        title={path.name}
        lead={path.blurb}
      />

      <ol className="space-y-7">
        {path.articles.map((article, i) => (
          <ArticleRow
            key={article.href}
            article={article}
            index={i + 1}
            showTier
          />
        ))}
      </ol>
    </Container>
  );
}
