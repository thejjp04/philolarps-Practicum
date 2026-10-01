import type { NavGroup, Tier } from "@/lib/types";

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
  titles: Record<string, string>;
};
