import Link from "next/link";
import type { Metadata } from "next";

import { Card, Container, SectionHeading, TierChips } from "@/components/ui";
import { IconArrowRight, SubjectGlyph } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import {
  getRecentlyAdded,
  getTierArticles,
  getWrittenArticles,
} from "@/lib/content";
import { SUBJECTS } from "@/lib/subjects";
import { TIERS, TIER_LABEL } from "@/lib/types";
import { PUBLISHER, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

const HOME_TITLE = "Learn Philosophy Online, Free";
const HOME_DESCRIPTION =
  "Learn philosophy for free with step-by-step courses in logic, ethics, metaphysics and more, from beginner to graduate level. For self-learners and teachers.";

export const metadata: Metadata = {
  title: { absolute: `${HOME_TITLE} · ${SITE_NAME}` },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${HOME_TITLE} · ${SITE_NAME}`,
    description: HOME_DESCRIPTION,
    url: "/",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${HOME_TITLE} · ${SITE_NAME}`,
    description: HOME_DESCRIPTION,
  },
};

const TEACHING_LINKS = [
  { href: "/tiers", label: "Tiers and what each assumes" },
  { href: "/reading-paths", label: "Cross-subject reading paths" },
  { href: "/glossary", label: "Glossary of every defined term" },
];

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
  const writtenCount = getWrittenArticles().length;

  const structuredData = [
    { "@context": "https://schema.org", ...PUBLISHER },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: HOME_DESCRIPTION,
      inLanguage: "en-GB",
      publisher: { "@id": PUBLISHER["@id"] },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: SUBJECTS.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/${s.slug}`),
      })),
    },
  ];

  const subjects = SUBJECTS.map((subject) => ({
    ...subject,
    counts: Object.fromEntries(
      TIERS.map((tier) => [tier, getTierArticles(subject.slug, tier).length]),
    ) as Record<(typeof TIERS)[number], number>,
  }));

  return (
    <Container wide>
      <JsonLd data={structuredData} />
      <header className="mb-12">
        <p className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-[0.11em] text-[var(--text-muted)]">
          {SITE_NAME}
        </p>
        <h1 className="max-w-[20ch] text-[40px] font-bold leading-[1.1] tracking-[-0.03em] lg:text-[52px]">
          Learn philosophy, from your first argument to graduate level
        </h1>
        <p className="mt-4 max-w-[62ch] font-serif text-[19px] leading-[1.6] text-[var(--text-muted)]">
          Free philosophy courses arranged as prerequisite ladders. Every
          article uses only terms an earlier one has defined, so you can start
          with no background and keep climbing. No account needed.
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
      <section className="mb-14">
        <SectionHeading>For philosophy teachers</SectionHeading>
        <div className="mt-4 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg-subtle)] px-5 py-5 sm:px-6">
          <p className="max-w-[68ch] font-serif text-[16.5px] leading-[1.6]">
            Every article lists the articles it assumes and defines each new
            term in exactly one place, so you can set a single reading without
            first checking what your students already know. Each subject page
            is a numbered reading order that works as a ready-made syllabus,
            and with {writtenCount} articles free to read and no sign-up, a
            link is all a class needs.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {TEACHING_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
                >
                  {link.label}
                  <IconArrowRight className="h-[15px] w-[15px]" />
                </Link>
              </li>
            ))}
          </ul>
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
