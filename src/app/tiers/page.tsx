import type { Metadata } from "next";

import { Card, Container, PageHeader } from "@/components/ui";
import { IconArrowRight } from "@/components/icons";
import { getTierArticles } from "@/lib/content";
import { SUBJECTS } from "@/lib/subjects";
import { TIERS, TIER_LABEL, type Tier } from "@/lib/types";

export const metadata: Metadata = {
  title: "Tiers",
  description:
    "The three levels the curriculum is divided into, and what each one assumes.",
};

const TIER_NOTE: Record<Tier, string> = {
  beginner:
    "No prior exposure assumed. The motivating example comes before the formalism, and every term is defined where it first appears.",
  intermediate:
    "Undergraduate level. Formal machinery, the standard results, the main positions, and the objections that stuck to them.",
  advanced:
    "Graduate level. Metatheory, live disputes, technical variants, and the primary literature named rather than gestured at.",
};

export default function TiersPage() {
  return (
    <Container>
      <PageHeader
        title="Tiers"
        lead="Every subject is split three ways. The split is about what a reader is assumed to already know, not about how hard the material is: an advanced article can be easier reading than a beginner one, once you have the vocabulary."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {TIERS.map((tier) => {
          const count = SUBJECTS.reduce(
            (sum, s) => sum + getTierArticles(s.slug, tier).length,
            0,
          );

          return (
            <Card key={tier} href={`/tiers/${tier}`}>
              <p className="text-[15px] font-semibold">{TIER_LABEL[tier]}</p>
              <p className="mt-1 font-mono text-[11.5px] text-[var(--text-muted)]">
                {count} articles
              </p>
              <p className="mt-2 flex-1 font-serif text-[15px] leading-[1.55] text-[var(--text-muted)]">
                {TIER_NOTE[tier]}
              </p>
              <p className="mt-4 flex items-center gap-1.5 text-[13.5px] font-medium text-[var(--accent)]">
                Open index
                <IconArrowRight className="h-[15px] w-[15px] transition-transform group-hover:translate-x-0.5" />
              </p>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}
