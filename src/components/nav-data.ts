import type { NavGroup, Tier } from "@/lib/types";

/** Serializable shapes handed from the server layout to the client shell. */

export type NavArticle = {
  slug: string;
  title: string;
  tier: Tier;
  href: string;
  written: boolean;
  estReadMin: number;
};

export type NavSubject = {
  slug: string;
  name: string;
  href: string;
  /** The one line from the curriculum. Used by the tour, so it is not rewritten. */
  oneLine: string;
  counts: Record<Tier, number>;
  articles: NavArticle[];
};

export type NavGroupData = {
  key: NavGroup;
  label: string;
  subjects: NavSubject[];
};

export type NavData = {
  groups: NavGroupData[];
  /** href to display title, for breadcrumbs. */
  titles: Record<string, string>;
};
