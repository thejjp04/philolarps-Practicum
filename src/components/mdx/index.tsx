import Link from "next/link";
import type { ReactNode } from "react";
import { definitionAnchor, slugifyHeading } from "@/lib/content";

/* ------------------------------------------------------------------ *
 * Definition
 * ------------------------------------------------------------------ */

export function Definition({
  term,
  children,
}: {
  term: string;
  children: ReactNode;
}) {
  return (
    <div
      /* Prefixed because a heading often carries the same wording as the term
         it defines, and rehype-slug would then mint the same id twice. The
         glossary links here, so it builds the anchor the same way. */
      id={definitionAnchor(term)}
      className="my-7 scroll-mt-24 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] px-5 py-4"
    >
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--text-muted)]">
        Definition
      </p>
      <p className="mt-1.5 font-sans text-[16px] font-semibold text-[var(--accent)]">
        {term}
      </p>
      <div className="mt-2 text-[16.5px] leading-[1.65] [&>p+p]:mt-3">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Argument: numbered premises with a rule above the conclusion
 * ------------------------------------------------------------------ */

export function Argument({
  name,
  children,
}: {
  name?: string;
  children: ReactNode;
}) {
  return (
    <div className="my-7 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg-subtle)] px-5 py-4">
      {name && (
        <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--text-muted)]">
          {name}
        </p>
      )}
      <ol className="argument-list space-y-2">{children}</ol>
    </div>
  );
}

/**
 * Premises number themselves with a CSS counter. MDX cannot easily thread an
 * index through to each child, and the counter never drifts out of step.
 */
export function Premise({ children }: { children: ReactNode }) {
  return (
    <li className="premise-row flex gap-3 text-[16.5px] leading-snug">
      <span className="w-6 shrink-0 text-right font-mono text-[13px] text-[var(--text-muted)]">
        <span className="premise-counter" />
      </span>
      <span className="min-w-0 flex-1">{children}</span>
    </li>
  );
}

export function Conclusion({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 border-t border-[var(--text-muted)] pt-2.5 text-[16.5px] leading-snug">
      <span className="w-6 shrink-0 text-right font-mono text-[15px] text-[var(--text-muted)]">
        ∴
      </span>
      <span className="min-w-0 flex-1 font-medium">{children}</span>
    </li>
  );
}

/* ------------------------------------------------------------------ *
 * TruthTable
 * ------------------------------------------------------------------ */

export function TruthTable({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: string[][];
  caption?: string;
}) {
  return (
    <figure className="my-7">
      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--border)]">
        <table className="w-full border-collapse font-mono text-[13px]">
          <thead>
            <tr className="bg-[var(--bg-subtle)]">
              {columns.map((col, i) => (
                <th
                  key={i}
                  scope="col"
                  className="border-b border-[var(--border)] px-3.5 py-2.5 text-center font-semibold whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr
                key={r}
                className="border-b border-[var(--border)] last:border-0"
              >
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={[
                      "px-3.5 py-2 text-center whitespace-nowrap",
                      c === row.length - 1
                        ? "bg-[var(--accent-wash)] font-semibold"
                        : "",
                    ].join(" ")}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <figcaption className="mt-2 font-sans text-[12.5px] text-[var(--text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ *
 * Proof
 * ------------------------------------------------------------------ */

const PROOF_LABEL = {
  ND: "Natural deduction",
  axiomatic: "Axiomatic derivation",
  tableau: "Semantic tableau",
} as const;

export function Proof({
  system = "ND",
  lines,
  caption,
}: {
  system?: keyof typeof PROOF_LABEL;
  lines: { n: number | string; formula: string; justification: string; depth?: number }[];
  caption?: string;
}) {
  return (
    <figure className="my-7">
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)]">
        <div className="border-b border-[var(--border)] bg-[var(--bg-subtle)] px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--text-muted)]">
          {PROOF_LABEL[system]}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-mono text-[13px]">
            <thead className="sr-only">
              <tr>
                <th scope="col">Line</th>
                <th scope="col">Formula</th>
                <th scope="col">Justification</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, i) => (
                <tr
                  key={i}
                  className="border-b border-[var(--border)] last:border-0"
                >
                  <td className="w-12 px-4 py-2 text-right align-top text-[var(--text-muted)]">
                    {line.n}
                  </td>
                  <td
                    className="py-2 pr-6 align-top whitespace-nowrap"
                    style={{ paddingLeft: `${(line.depth ?? 0) * 1.25 + 0.5}rem` }}
                  >
                    {(line.depth ?? 0) > 0 && (
                      <span
                        aria-hidden="true"
                        className="mr-2.5 inline-block border-l border-[var(--border)]"
                      />
                    )}
                    {line.formula}
                  </td>
                  <td className="px-4 py-2 text-right align-top text-[12px] whitespace-nowrap text-[var(--text-muted)]">
                    {line.justification}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 font-sans text-[12.5px] text-[var(--text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ *
 * Aside, Objection, Reply
 * ------------------------------------------------------------------ */

export function Aside({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="my-7 rounded-[var(--radius-card)] bg-[var(--bg-subtle)] px-5 py-4 text-[16px] leading-[1.65]">
      {title && (
        <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--text-muted)]">
          {title}
        </p>
      )}
      <div className="[&>p+p]:mt-3">{children}</div>
    </aside>
  );
}

function Boxed({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="my-5 border-l-[3px] border-[var(--accent)] bg-[var(--surface)] py-1 pl-4 pr-1">
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--accent)]">
        {label}
      </p>
      <div className="mt-1.5 text-[16.5px] leading-[1.65] [&>p+p]:mt-3">
        {children}
      </div>
    </div>
  );
}

export function Objection({ children }: { children: ReactNode }) {
  return <Boxed label="Objection">{children}</Boxed>;
}

export function Reply({ children }: { children: ReactNode }) {
  return <Boxed label="Reply">{children}</Boxed>;
}

/* ------------------------------------------------------------------ *
 * Symbol: inline notation. `$...$` in MDX also works via remark-math;
 * this wrapper exists for the cases where escaping gets awkward.
 * ------------------------------------------------------------------ */

export function Symbol({ children }: { children: ReactNode }) {
  return (
    <span className="whitespace-nowrap font-mono text-[0.9em]">{children}</span>
  );
}

/* ------------------------------------------------------------------ *
 * Further reading
 * ------------------------------------------------------------------ */

export function FurtherReading({ children }: { children: ReactNode }) {
  return (
    <section className="mt-14 border-t border-[var(--border)] pt-6">
      <h2 className="!mt-0 font-sans text-[15px] font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]">
        Further reading
      </h2>
      <ul className="mt-3 space-y-2 text-[15.5px] leading-snug">{children}</ul>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Heading overrides so the TOC rail has anchors to target
 * ------------------------------------------------------------------ */

function headingId(children: ReactNode): string {
  return slugifyHeading(textOf(children));
}

function textOf(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

export const mdxComponents = {
  Definition,
  Argument,
  Premise,
  Conclusion,
  TruthTable,
  Proof,
  Aside,
  Objection,
  Reply,
  Symbol,
  FurtherReading,

  h2: ({ children }: { children?: ReactNode }) => (
    <h2 id={headingId(children)}>{children}</h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 id={headingId(children)}>{children}</h3>
  ),
  a: ({ href, children }: { href?: string; children?: ReactNode }) => {
    if (href?.startsWith("/")) return <Link href={href}>{children}</Link>;
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
};
