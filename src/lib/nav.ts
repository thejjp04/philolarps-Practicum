import "server-only";

import type { NavData, NavGroupData } from "@/components/nav-data";
import { NAV_GROUPS } from "@/lib/subjects";
import { getSubjectPath, getTierArticles } from "@/lib/content";
import { TIERS, TIER_LABEL } from "@/lib/types";
import { READING_PATHS } from "@/lib/reading-paths";

/** Builds the serializable nav payload the client shell needs. */
export function buildNavData(): NavData {
  const titles: Record<string, string> = {
    "/glossary": "Glossary",
    "/thinkers": "Thinkers Index",
    "/reading-paths": "Reading Paths",
    "/music": "Music",
  };

  titles["/tiers"] = "Tiers";
  for (const tier of TIERS) titles[`/tiers/${tier}`] = TIER_LABEL[tier];
  for (const p of READING_PATHS) titles[`/reading-paths/${p.slug}`] = p.name;

  const groups: NavGroupData[] = NAV_GROUPS.map((group) => ({
    key: group.key,
    label: group.label,
    subjects: group.subjects.map((subject) => {
      titles[`/${subject.slug}`] = subject.name;

      const articles = getSubjectPath(subject.slug).map((a) => {
        titles[a.href] = a.title;
        titles[`/${subject.slug}/${a.tier}`] = TIER_LABEL[a.tier];
        return {
          slug: a.slug,
          title: a.title,
          tier: a.tier,
          href: a.href,
          written: a.written,
          estReadMin: a.estReadMin,
        };
      });

      return {
        slug: subject.slug,
        name: subject.name,
        href: `/${subject.slug}`,
        counts: {
          beginner: getTierArticles(subject.slug, "beginner").length,
          intermediate: getTierArticles(subject.slug, "intermediate").length,
          advanced: getTierArticles(subject.slug, "advanced").length,
        },
        articles,
      };
    }),
  }));

  return { groups, titles };
}
