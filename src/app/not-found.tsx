import Link from "next/link";

import { Container, PageHeader } from "@/components/ui";

/* Without this file a mistyped URL falls back to the framework default: no
   sidebar, no theme, no way back except the browser button. Placed at the app
   root so it renders inside the shell like every other page. */

const ROUTES = [
  { href: "/", label: "Home", note: "The three entry points and every subject." },
  {
    href: "/reading-paths",
    label: "Reading paths",
    note: "Three sequences that cut across subjects.",
  },
  {
    href: "/glossary",
    label: "Glossary",
    note: "Every term the site defines, and where it is defined.",
  },
  {
    href: "/thinkers",
    label: "Thinkers index",
    note: "Who the curriculum engages with, roughly chronological.",
  },
];

export default function NotFound() {
  return (
    <Container>
      <PageHeader
        eyebrow="404"
        title="No page at that address"
        lead="Either the address is mistyped or nothing was ever published there. Nothing on the site has been removed, so an old link should still work."
      />

      <ul className="space-y-3">
        {ROUTES.map(({ href, label, note }) => (
          <li key={href}>
            <Link
              href={href}
              className="block rounded-[var(--radius-card)] border border-[var(--border)] px-4 py-3 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-wash)]"
            >
              <span className="block text-[14.5px] font-medium text-[var(--text-primary)]">
                {label}
              </span>
              <span className="mt-0.5 block font-serif text-[14px] leading-[1.5] text-[var(--text-muted)]">
                {note}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
