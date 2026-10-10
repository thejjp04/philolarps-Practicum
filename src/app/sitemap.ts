import type { MetadataRoute } from "next";

import {
  getAddedDate,
  getTierArticles,
  getWrittenArticles,
} from "@/lib/content";
import { READING_PATHS } from "@/lib/reading-paths";
import { SITE_URL } from "@/lib/seo";
import { SUBJECTS } from "@/lib/subjects";
import { TIERS } from "@/lib/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const at = (path: string, priority: number, lastModified?: string) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    priority,
    ...(lastModified ? { lastModified } : {}),
  });

  return [
    at("/", 1),
    at("/reading-paths", 0.8),
    at("/quiz", 0.7),
    at("/glossary", 0.6),
    at("/thinkers", 0.6),
    at("/tiers", 0.5),
    at("/music", 0.3),
    ...TIERS.map((tier) => at(`/tiers/${tier}`, 0.6)),
    ...SUBJECTS.flatMap((s) => [
      at(`/${s.slug}`, 0.9),
      ...TIERS.filter((tier) =>
        getTierArticles(s.slug, tier).some((a) => a.written),
      ).map((tier) => at(`/${s.slug}/${tier}`, 0.6)),
    ]),
    ...READING_PATHS.map((p) => at(`/reading-paths/${p.slug}`, 0.7)),
    ...getWrittenArticles().map((a) => at(a.href, 0.8, getAddedDate(a))),
  ];
}
