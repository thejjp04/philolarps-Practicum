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

const TIER_RANK: Record<Tier, number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
};

/**
 * Ladder integrity check, run across the whole site rather than one subject at
 * a time. Returns a list of violations; an empty list means the ladder is
 * sound. Called at build time from `src/lib/content.ts`.
 *
 * Three rules:
 *
 * 1. A term is defined once, site-wide. When two subjects both claim to
 *    introduce "universal", a reader has no answer to where it is explained,
 *    and the two treatments drift apart as the articles get written.
 * 2. Every required term is defined somewhere.
 * 3. A rung may only lean on terms a reader already has. Within a subject that
 *    means earlier in the ladder. Across subjects it means the same tier or an
 *    easier one, since tiers are the site's difficulty promise: nothing filed
 *    under beginner may rest on something only an advanced article explains.
 *
 * The earlier version scoped rule 1 to a single subject, so it could not see a
 * term introduced twice in two different subjects, and had no form of rule 3.
 */
export function validateLadders(): string[] {
  const problems: string[] = [];

  const rungs = SUBJECTS.flatMap((subject) => {
    let step = 0;
    return TIERS.flatMap((tier) =>
      subject.ladder[tier].map((entry) => ({
        entry,
        tier,
        subject: subject.slug,
        where: `${subject.slug}/${tier}/${entry.slug}`,
        step: step++,
      })),
    );
  });

  const owner = new Map<string, (typeof rungs)[number]>();

  for (const rung of rungs) {
    for (const term of rung.entry.introduces ?? []) {
      const prior = owner.get(term);
      if (prior) {
        problems.push(
          `${rung.where} re-introduces "${term}", already introduced by ${prior.where}.`,
        );
      } else {
        owner.set(term, rung);
      }
    }
  }

  for (const rung of rungs) {
    for (const term of rung.entry.requires ?? []) {
      const source = owner.get(term);

      if (!source) {
        problems.push(
          `${rung.where} requires "${term}", which no article introduces.`,
        );
      } else if (source.subject === rung.subject) {
        if (source.step >= rung.step) {
          problems.push(
            `${rung.where} requires "${term}", which ${source.where} does not introduce until later in the same subject.`,
          );
        }
      } else if (TIER_RANK[source.tier] > TIER_RANK[rung.tier]) {
        problems.push(
          `${rung.where} requires "${term}", but ${source.where} introduces it a tier harder. Move the term down, or lean on an easier one.`,
        );
      }
    }
  }

  return problems;
}
