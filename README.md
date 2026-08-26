# Philolarps

Structured philosophy curricula, from absolute beginner to graduate level.
Free, no account, no paywall.

Live at [philolarps.com](https://philolarps.com).

## What it is

Nine subjects, each laid out as a prerequisite ladder across three tiers:

| Subject | Beginner | Intermediate | Advanced |
| --- | --- | --- | --- |
| Metaphysics | 9 | 13 | 20 |
| Epistemology | 6 | 12 | 14 |
| Logic | 8 | 13 | 24 |
| Ethics | 7 | 11 | 15 |
| Philosophy of Mind | 6 | 14 | 18 |
| Ontology | 6 | 10 | 12 |
| Political Philosophy | 6 | 11 | 15 |
| Applied Ethics | 5 | 10 | 12 |
| Theism | 5 | 12 | 15 |

309 rungs in total. Ordering is by what a reader needs first, not by how
difficult a term sounds: nothing may require a concept that no earlier rung
introduces, and `validateLadders()` fails the build if that ever stops holding.

Alongside the ladders: a glossary built from the definition boxes in the prose,
a thinkers index, and three cross-subject reading paths.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build     # 364 pages, all prerendered
npx tsc --noEmit  # type check
npx eslint src    # note: `next lint` is broken in this project
```

## Layout

```
content/{subject}/{tier}/{slug}.mdx   prose
src/lib/curriculum/{subject}.ts       the ladder: order, tiers, prerequisites
src/lib/content.ts                    merges the ladder with what is written
src/components/mdx/                   Definition, Argument, Proof, TruthTable
```

A subject's ladder declares every rung. An `.mdx` file fills one in. Rungs
without a file still render, as a page explaining what will go there, so the
ladder is browsable end to end.

## Conventions

Colors come from CSS custom properties in `src/app/globals.css` and are never
hardcoded in components. Both themes have to clear WCAG AA. The logo is the
supplied artwork, scaled and placed but never redrawn or recoloured; the
lockup geometry in `src/components/Logo.tsx` is measured against the alpha
channel of the two PNGs.

Content rule: never invent a citation, a quotation, a date, or an attribution.
