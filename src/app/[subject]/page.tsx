import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  ArticleRow,
  Container,
  PageHeader,
  PrerequisiteChips,
} from "@/components/ui";
import { IconArrowRight, IconRoute, SubjectGlyph } from "@/components/icons";
import { getSubjectPath, getTierArticles } from "@/lib/content";
import { SUBJECTS, getSubject } from "@/lib/subjects";
import { TIERS, TIER_LABEL } from "@/lib/types";

type Params = { params: Promise<{ subject: string }> };

export function generateStaticParams() {
  return SUBJECTS.map((s) => ({ subject: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { subject: slug } = await params;
  const subject = getSubject(slug);
  if (!subject) return {};
  return { title: subject.name, description: subject.oneLine };
}

const TIER_NOTE: Record<(typeof TIERS)[number], string> = {
  beginner: "No prior exposure assumed. Every term is defined where it first appears.",
  intermediate: "Undergraduate level. Formal machinery, standard results, and the objections that stuck.",
  advanced: "Graduate level. Metatheory, technical variants, and disputes that are still open.",
};

export default async function SubjectPage({ params }: Params) {
  const { subject: slug } = await params;
  const subject = getSubject(slug);
  if (!subject) notFound();

  const path = getSubjectPath(subject.slug);
  const totalMinutes = path.reduce((sum, a) => sum + a.estReadMin, 0);
  const written = path.filter((a) => a.written).length;
  const firstReadable = path.find((a) => a.written);

  let counter = 0;

  return (
    <Container>
      <PageHeader
        title={subject.name}
        lead={subject.scope}
        glyph={<SubjectGlyph slug={subject.slug} size="lg" />}
      />

      <aside className="mb-12 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg-subtle)] px-5 py-4">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--text-muted)]">
          <IconRoute className="h-[15px] w-[15px]" />
          Reading path
        </p>
        <p className="mt-2 font-serif text-[16px] leading-[1.6]">
          Read the {path.length} articles below in the order they are numbered.
          The numbering runs straight through all three tiers, because each
          article only uses terms an earlier one has already defined. Roughly{" "}
          {Math.round(totalMinutes / 60)} hours end to end. {written} of{" "}
          {path.length} are written so far.
        </p>
        {firstReadable && (
          <Link
            href={firstReadable.href}
            className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
          >
            Start with {firstReadable.title}
            <IconArrowRight className="h-[15px] w-[15px]" />
          </Link>
        )}
      </aside>

      <div className="space-y-14">
        {TIERS.map((tier) => {
          const articles = getTierArticles(subject.slug, tier);
          if (articles.length === 0) return null;

          return (
            <section key={tier} id={tier} className="scroll-mt-24">
              <h2 className="text-[22px] font-bold tracking-[-0.02em]">
                {TIER_LABEL[tier]}
              </h2>
              <p className="mt-1.5 max-w-[60ch] font-serif text-[15.5px] leading-[1.55] text-[var(--text-muted)]">
                {TIER_NOTE[tier]}
              </p>

              <ul className="mt-6 space-y-7">
                {articles.map((article) => {
                  counter += 1;
                  return (
                    <ArticleRow
                      key={article.href}
                      article={article}
                      index={counter}
                      footer={
                        <PrerequisiteChips
                          subject={subject.slug}
                          slugs={article.prerequisites}
                          articles={path}
                        />
                      }
                    />
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </Container>
  );
}
