import Link from "next/link";

import { Card, Container, SectionHeading, TierChips } from "@/components/ui";
import { IconArrowRight, SubjectGlyph } from "@/components/icons";
import { getRecentlyAdded, getTierArticles } from "@/lib/content";
import { SUBJECTS } from "@/lib/subjects";
import { TIERS, TIER_LABEL } from "@/lib/types";

const STARTING_POINTS = [
  {
    label: "Never studied philosophy",
    detail:
      "Start with how arguments work. Everything else on the site assumes it.",
    href: "/logic/beginner/what-is-an-argument",
    cta: "What is an argument?",
  },
  {
    label: "I know the basics",
    detail:
      "Formal machinery, the standard results, and the objections that stuck.",
    href: "/tiers/intermediate",
    cta: "Intermediate index",
  },
  {
    label: "I want the deep end",
    detail: "Metatheory, live disputes, and the primary literature.",
    href: "/tiers/advanced",
    cta: "Advanced index",
  },
];

export default function HomePage() {
  const recent = getRecentlyAdded(5);

  const subjects = SUBJECTS.map((subject) => ({
    ...subject,
    counts: Object.fromEntries(
      TIERS.map((tier) => [tier, getTierArticles(subject.slug, tier).length]),
    ) as Record<(typeof TIERS)[number], number>,
  }));

  return (
    <Container wide>
      <header className="mb-12">
        <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-0.03em] lg:text-[52px]">
          Philolarps
        </h1>
        <p className="mt-4 max-w-[62ch] font-serif text-[19px] leading-[1.6] text-[var(--text-muted)]">
          Philosophy curricula arranged as prerequisite ladders, from no prior
          exposure through to graduate level, free to read without an account.
        </p>
      </header>

      <section className="mb-14">
        <SectionHeading>Start here</SectionHeading>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {STARTING_POINTS.map((point) => (
            <Card key={point.href} href={point.href}>
              <p className="text-[15px] font-semibold leading-snug">
                {point.label}
              </p>
              <p className="mt-2 flex-1 font-serif text-[15px] leading-[1.55] text-[var(--text-muted)]">
                {point.detail}
              </p>
              <p className="mt-4 flex items-center gap-1.5 text-[13.5px] font-medium text-[var(--accent)]">
                {point.cta}
                <IconArrowRight className="h-[15px] w-[15px] transition-transform group-hover:translate-x-0.5" />
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <SectionHeading>Subjects</SectionHeading>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <div
              key={subject.slug}
              className="flex flex-col rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--accent)]"
            >
              <Link
                href={`/${subject.slug}`}
                className="flex items-center gap-3 text-[15.5px] font-semibold leading-snug hover:text-[var(--accent)]"
              >
                <SubjectGlyph slug={subject.slug} size="lg" />
                {subject.name}
              </Link>
              <p className="mt-3 flex-1 font-serif text-[15px] leading-[1.55] text-[var(--text-muted)]">
                {subject.oneLine}
              </p>
              <div className="mt-4 border-t border-[var(--border)] pt-3">
                <TierChips subject={subject.slug} counts={subject.counts} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading>Recently added</SectionHeading>
        {recent.length === 0 ? (
          <p className="mt-4 font-serif text-[15.5px] leading-[1.6] text-[var(--text-muted)]">
            Nothing published yet. The ladders above are laid out in full, so
            you can see exactly what each subject will cover and in what order.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {recent.map((article) => (
              <li key={article.href}>
                <Link
                  href={article.href}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 transition-colors hover:text-[var(--accent)]"
                >
                  <span className="text-[15px] font-medium">
                    {article.title}
                  </span>
                  <span className="font-mono text-[11.5px] text-[var(--text-muted)]">
                    {article.subjectName} · {TIER_LABEL[article.tier]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Container>
  );
}
