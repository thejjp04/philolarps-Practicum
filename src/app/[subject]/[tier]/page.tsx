import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  ArticleRow,
  Container,
  PageHeader,
  PrerequisiteChips,
} from "@/components/ui";
import { getSubjectPath, getTierArticles } from "@/lib/content";
import { SUBJECTS, getSubject } from "@/lib/subjects";
import { TIERS, TIER_LABEL, type Tier } from "@/lib/types";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs, pageMetadata } from "@/lib/seo";

const TIER_TITLE: Record<Tier, (name: string) => string> = {
  beginner: (name) => `${name} for Beginners`,
  intermediate: (name) => `Intermediate ${name}`,
  advanced: (name) => `Advanced ${name}`,
};

type Params = { params: Promise<{ subject: string; tier: string }> };

export function generateStaticParams() {
  return SUBJECTS.flatMap((s) => TIERS.map((tier) => ({ subject: s.slug, tier })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { subject: slug, tier } = await params;
  const subject = getSubject(slug);
  if (!subject || !isTier(tier)) return {};
  return pageMetadata({
    title: TIER_TITLE[tier](subject.name),
    description: `${subject.oneLine} ${TIER_LEAD[tier]}`,
    path: `/${subject.slug}/${tier}`,
  });
}

function isTier(value: string): value is Tier {
  return (TIERS as readonly string[]).includes(value);
}

const TIER_LEAD: Record<Tier, string> = {
  beginner:
    "Nothing here assumes you have read philosophy before. Every term is defined where it first appears, and the motivating example comes before the formalism.",
  intermediate:
    "Undergraduate level. These articles introduce the formal machinery, work through the standard results, and set out the main positions with the objections that stuck to them.",
  advanced:
    "Graduate level. Metatheory, technical variants, and disputes that are still open, with the primary literature named rather than gestured at.",
};

export default async function SubjectTierPage({ params }: Params) {
  const { subject: slug, tier } = await params;
  const subject = getSubject(slug);
  if (!subject || !isTier(tier)) notFound();

  const articles = getTierArticles(subject.slug, tier);
  const path = getSubjectPath(subject.slug);

  return (
    <Container>
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: subject.name, path: `/${subject.slug}` },
          { name: TIER_LABEL[tier], path: `/${subject.slug}/${tier}` },
        ])}
      />
      <PageHeader
        eyebrow={subject.name}
        title={TIER_LABEL[tier]}
        lead={TIER_LEAD[tier]}
      />

      {articles.length === 0 ? (
        <p className="font-serif text-[16px] text-[var(--text-muted)]">
          This tier has no entries yet.
        </p>
      ) : (
        <ul className="space-y-7">
          {articles.map((article, i) => (
            <ArticleRow
              key={article.href}
              article={article}
              index={i + 1}
              footer={
                <PrerequisiteChips
                  subject={subject.slug}
                  slugs={article.prerequisites}
                  articles={path}
                />
              }
            />
          ))}
        </ul>
      )}
    </Container>
  );
}
