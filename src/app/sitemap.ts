import type { MetadataRoute } from "next";

import { getWrittenArticles } from "@/lib/content";
import { READING_PATHS } from "@/lib/reading-paths";
import { SUBJECTS } from "@/lib/subjects";
import { TIERS } from "@/lib/types";

const SITE = "https://philolarps.com";

/**
 * Only pages with real content. The ladder renders a page for every planned
 * rung too, but those are near-identical stubs, and 300 of them in a sitemap
 * teaches a crawler that the site is mostly filler.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const at = (path: string, priority: number) => ({
    url: `${SITE}${path}`,
    priority,
  });

  return [
    at("/", 1),
    at("/reading-paths", 0.8),
    at("/glossary", 0.6),
    at("/thinkers", 0.6),
    at("/tiers", 0.5),
    at("/music", 0.4),
    ...TIERS.map((tier) => at(`/tiers/${tier}`, 0.5)),
    ...SUBJECTS.flatMap((s) => [
      at(`/${s.slug}`, 0.9),
      ...TIERS.map((tier) => at(`/${s.slug}/${tier}`, 0.6)),
    ]),
    ...READING_PATHS.map((p) => at(`/reading-paths/${p.slug}`, 0.7)),
    ...getWrittenArticles().map((a) => at(a.href, 0.8)),
  ];
}
