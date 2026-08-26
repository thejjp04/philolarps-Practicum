import type { NavGroup, Subject, Tier } from "@/lib/types";
import { TIERS } from "@/lib/types";

import { logic } from "@/lib/curriculum/logic";
import { metaphysics } from "@/lib/curriculum/metaphysics";
import { epistemology } from "@/lib/curriculum/epistemology";
import { ethics } from "@/lib/curriculum/ethics";
import { philosophyOfMind } from "@/lib/curriculum/philosophy-of-mind";
import { ontology } from "@/lib/curriculum/ontology";
import { politicalPhilosophy } from "@/lib/curriculum/political-philosophy";
import { appliedEthics } from "@/lib/curriculum/applied-ethics";
import { theism } from "@/lib/curriculum/theism";

/** Nav order is fixed by hand. It is a curriculum, not an alphabetised list. */
export const SUBJECTS: Subject[] = [
  metaphysics,
  epistemology,
  logic,
  ethics,
  philosophyOfMind,
  ontology,
  politicalPhilosophy,
  appliedEthics,
  theism,
];

export const NAV_GROUPS: { key: NavGroup; label: string; subjects: Subject[] }[] =
  (["core", "mind", "applied", "religion"] as const).map((key) => ({
    key,
    label: {
      core: "Core",
      mind: "Mind & Being",
      applied: "Applied",
      religion: "Religion",
    }[key],
    subjects: SUBJECTS.filter((s) => s.group === key),
  }));

export function getSubject(slug: string): Subject | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}

export function subjectName(slug: string): string {
  return getSubject(slug)?.name ?? slug;
}

/** Count of ladder entries in a tier, written or not. */
export function tierCount(subject: Subject, tier: Tier): number {
  return subject.ladder[tier].length;
}

export function totalCount(subject: Subject): number {
  return TIERS.reduce((n, t) => n + subject.ladder[t].length, 0);
}

/**
 * Ladder integrity check.
 *
 * An article may not use a term before some earlier article on its path has
 * introduced it. Returns a list of violations; an empty list means the ladder
 * is sound. Called at build time from `src/lib/content.ts`.
 */
export function validateLadders(): string[] {
  const problems: string[] = [];

  for (const subject of SUBJECTS) {
    const introduced = new Map<string, string>();

    for (const tier of TIERS) {
      for (const entry of subject.ladder[tier]) {
        const where = `${subject.slug}/${tier}/${entry.slug}`;

        for (const term of entry.requires ?? []) {
          if (!introduced.has(term)) {
            problems.push(
              `${where} requires "${term}", which no earlier article introduces.`,
            );
          }
        }

        for (const term of entry.introduces ?? []) {
          const prior = introduced.get(term);
          if (prior) {
            problems.push(
              `${where} re-introduces "${term}", already introduced by ${prior}.`,
            );
          } else {
            introduced.set(term, where);
          }
        }
      }
    }
  }

  return problems;
}
