import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ArticleRow, Container, PageHeader } from "@/components/ui";
import { SUBJECT_ICONS } from "@/components/icons";
import { getTierArticles } from "@/lib/content";
import { SUBJECTS } from "@/lib/subjects";
import { TIERS, TIER_LABEL, type Tier } from "@/lib/types";

type Params = { params: Promise<{ tier: string }> };

export function generateStaticParams() {
  return TIERS.map((tier) => ({ tier }));
}

function isTier(value: string): value is Tier {
  return (TIERS as readonly string[]).includes(value);
}

const TIER_LEAD: Record<Tier, string> = {
  beginner:
    "Everything on the site that assumes no prior reading, grouped by subject. Each subject's list is in ladder order, so start at the top of whichever one you want.",
  intermediate:
    "Undergraduate level across all nine subjects. These assume the beginner tier of the same subject, or an equivalent course.",
  advanced:
    "Graduate level. Metatheory, technical variants, and open disputes. Each subject's advanced tier assumes its intermediate tier.",
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { tier } = await params;
  if (!isTier(tier)) return {};
  return { title: `${TIER_LABEL[tier]} index`, description: TIER_LEAD[tier] };
}

export default async function TierIndexPage({ params }: Params) {
  const { tier } = await params;
  if (!isTier(tier)) notFound();

  const sections = SUBJECTS.map((subject) => ({
    subject,
    articles: getTierArticles(subject.slug, tier),
  })).filter((s) => s.articles.length > 0);

  const total = sections.reduce((sum, s) => sum + s.articles.length, 0);

  return (
    <Container>
      <PageHeader
        eyebrow={`${total} articles`}
        title={`${TIER_LABEL[tier]} index`}
        lead={TIER_LEAD[tier]}
      />

      <div className="space-y-14">
        {sections.map(({ subject, articles }) => {
          const Icon = SUBJECT_ICONS[subject.slug];

          return (
            <section key={subject.slug}>
              <h2 className="flex items-center gap-2.5 text-[20px] font-bold tracking-[-0.02em]">
                {Icon && (
                  <Icon className="h-[18px] w-[18px] text-[var(--accent)]" />
                )}
                <Link
                  href={`/${subject.slug}/${tier}`}
                  className="hover:text-[var(--accent)]"
                >
                  {subject.name}
                </Link>
              </h2>

              <ul className="mt-5 space-y-6">
                {articles.map((article, i) => (
                  <ArticleRow key={article.href} article={article} index={i + 1} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Container>
  );
}
