"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { IconGlossary, SUBJECT_ICONS } from "@/components/icons";
import type { NavData } from "@/components/nav-data";
import type { NavGroup } from "@/lib/types";

/**
 * The first-visit walk around the shell.
 *
 * A step names an element by its `data-tour` attribute. The overlay finds
 * that element, cuts a hole in the scrim around it and puts a card beside
 * it. The hole is a real hole: the four scrim panels stop at its edges, so
 * the control being pointed at can still be pressed while the tour is up.
 *
 * Runs once, then remembers. The sidebar keeps a button to start it again.
 */

const STORAGE_KEY = "philolarps-tour";

/** Space between the highlighted element and the card. */
const GAP = 14;
/** Smallest distance any of this is allowed to sit from the window edge. */
const EDGE = 12;
const CARD_WIDTH = 344;
/** How far the hole is cut outside the element itself. */
const PAD = 6;

type Step = {
  /** The `data-tour` value to point at. Null puts the card in the middle. */
  anchor: string | null;
  /** Sidebar anchors need the drawer open below 1024px. */
  inSidebar?: boolean;
  title: string;
  body: string;
  /** Lists this group's subjects in the card, each with its own line. */
  group?: NavGroup;
};

const STEPS: Step[] = [
  {
    anchor: null,
    title: "Welcome to Philolarps",
    body: "There is no account to make and nothing to pay for. This is a short walk around the site, and it stops the moment you want it to.",
  },
  {
    anchor: "nav-tree",
    inSidebar: true,
    title: "The subject list",
    body: "Nine subjects live here. Each one is a ladder: the first rung assumes nothing, and every rung above it leans on the ones below. Click a name to open the subject, or the arrow beside it to see the articles inside.",
  },
  {
    anchor: "group-core",
    inSidebar: true,
    group: "core",
    title: "Core",
    body: "The four subjects everything else on the site leans on.",
  },
  {
    anchor: "group-mind",
    inSidebar: true,
    group: "mind",
    title: "Mind and Being",
    body: "What there is, and what it takes for some of it to think.",
  },
  {
    anchor: "group-applied",
    inSidebar: true,
    group: "applied",
    title: "Applied",
    body: "The theories put to work on cases people are already arguing about.",
  },
  {
    anchor: "group-religion",
    inSidebar: true,
    group: "religion",
    title: "Religion",
    body: "Arguments for and against, each one taken in its strongest form.",
  },
  {
    anchor: "tier-switcher",
    inSidebar: true,
    title: "Beginner, Intermediate, Advanced",
    body: "This filters the list down to one tier. Beginner assumes no philosophy at all, and Advanced assumes both tiers under it. Left on All, the list shows how a subject is built from end to end.",
  },
  {
    anchor: "search",
    title: "Search",
    body: "This searches article titles and the section headings inside them, along with every term in the glossary. Ctrl+K opens it from anywhere on the site, or ⌘K on a Mac.",
  },
  {
    anchor: "reading-path",
    title: "Reading path",
    body: "Inside a subject this opens the order to read it in. Outside one it goes to the three paths that run across subjects.",
  },
  {
    anchor: "music",
    inSidebar: true,
    title: "Music",
    body: "Three stations that play through YouTube while you read. The bar along the bottom keeps going as you move between articles.",
  },
  {
    anchor: "theme-toggle",
    inSidebar: true,
    title: "Light and dark",
    body: "Both themes were built to the same contrast standard, so pick by eye. Press it now if you like. The choice is kept on this device.",
  },
  {
    anchor: null,
    title: "That is the whole shell",
    body: "Take the tour sits under Music in the sidebar, for whenever you want it again. Metaphysics is the usual place to start.",
  },
];

type TourApi = { start: () => void };

const TourContext = createContext<TourApi>({ start: () => {} });

export function useTour(): TourApi {
  return useContext(TourContext);
}

type Box = { top: number; left: number; width: number; height: number };
type Placed = { top: number; left: number; width: number; maxHeight: number };

function clamp(value: number, low: number, high: number): number {
  return Math.max(low, Math.min(value, high));
}

/**
 * Both sidebars carry the same `data-tour` values, since the drawer holds a
 * second copy below 1024px. Only one of the two is ever on screen, so the
 * one with a box is the one meant.
 */
function findAnchor(name: string): HTMLElement | null {
  const all = document.querySelectorAll<HTMLElement>(`[data-tour="${name}"]`);
  return Array.from(all).find((el) => el.getClientRects().length > 0) ?? null;
}

/** Below this, nothing fits beside anything and the card becomes a sheet. */
const NARROW = 640;

/** A sheet never gives back more room than this, however tight the fit. */
const MIN_SHEET = 190;

/** Beside the element where there is room for the card, under it otherwise. */
function place(target: Box, height: number): Placed {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const width = Math.min(CARD_WIDTH, vw - EDGE * 2);

  /* On a phone the sidebar is a drawer that covers most of the width, so a
     card set beside what it points at has nowhere to go. It runs the full
     width and sits against the top or bottom edge instead, whichever side of
     the highlight has more room. Below MIN it stops giving room back and
     scrolls its own contents. */
  if (vw < NARROW) {
    const below = vh - (target.top + target.height) - GAP - EDGE;
    const above = target.top - GAP - EDGE;
    const under = below >= above;
    const maxHeight = Math.min(
      cap(vw, vh),
      Math.max(MIN_SHEET, under ? below : above),
    );
    const h = Math.min(height, maxHeight);
    return {
      maxHeight,
      width: vw - EDGE * 2,
      left: EDGE,
      top: under ? Math.max(EDGE, vh - h - EDGE) : EDGE,
    };
  }

  const maxHeight = cap(vw, vh);
  const h = Math.min(height, maxHeight);

  let left: number;
  let top: number;

  if (target.left + target.width + GAP + width + EDGE <= vw) {
    left = target.left + target.width + GAP;
    top = target.top + target.height / 2 - h / 2;
  } else if (target.left - GAP - width - EDGE >= 0) {
    left = target.left - GAP - width;
    top = target.top + target.height / 2 - h / 2;
  } else if (target.top + target.height + GAP + h + EDGE <= vh) {
    left = target.left + target.width / 2 - width / 2;
    top = target.top + target.height + GAP;
  } else {
    left = target.left + target.width / 2 - width / 2;
    top = target.top - GAP - h;
  }

  return {
    maxHeight,
    width,
    left: clamp(left, EDGE, Math.max(EDGE, vw - width - EDGE)),
    top: clamp(top, EDGE, Math.max(EDGE, vh - h - EDGE)),
  };
}

function centre(height: number): Placed {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const width = Math.min(CARD_WIDTH + 40, vw - EDGE * 2);
  const maxHeight = cap(vw, vh);
  const h = Math.min(height, maxHeight);
  return {
    maxHeight,
    width,
    left: (vw - width) / 2,
    top: clamp((vh - h) / 2, EDGE, Math.max(EDGE, vh - h - EDGE)),
  };
}

/* A phone leaves the card less than half the screen, so the anchor above it
   stays in view. Anywhere else it can run the height of the window. */
function cap(vw: number, vh: number): number {
  return vw < NARROW ? Math.round(vh * 0.44) : vh - EDGE * 2;
}

export function Tour({
  nav,
  openMenu,
  closeMenu,
  children,
}: {
  nav: NavData;
  openMenu: () => void;
  closeMenu: () => void;
  children: React.ReactNode;
}) {
  const [at, setAt] = useState<number | null>(null);

  const api = useMemo<TourApi>(() => ({ start: () => setAt(0) }), []);

  // First visit only. A visitor who has been through it already gets nothing.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // Private browsing. Treat it as a first visit.
    }
    if (stored) return;
    const timer = setTimeout(() => setAt(0), 600);
    return () => clearTimeout(timer);
  }, []);

  const finish = useCallback(() => {
    setAt(null);
    closeMenu();
    try {
      localStorage.setItem(STORAGE_KEY, "done");
    } catch {
      // The tour will offer itself again next time. Harmless.
    }
  }, [closeMenu]);

  return (
    <TourContext.Provider value={api}>
      {children}
      {at !== null && (
        <Overlay
          nav={nav}
          at={at}
          go={setAt}
          finish={finish}
          openMenu={openMenu}
          closeMenu={closeMenu}
        />
      )}
    </TourContext.Provider>
  );
}

function Overlay({
  nav,
  at,
  go,
  finish,
  openMenu,
  closeMenu,
}: {
  nav: NavData;
  at: number;
  go: (next: number) => void;
  finish: () => void;
  openMenu: () => void;
  closeMenu: () => void;
}) {
  const step = STEPS[at];
  const cardRef = useRef<HTMLDivElement>(null);
  const [hole, setHole] = useState<Box | null>(null);
  const [pos, setPos] = useState<Placed | null>(null);

  const last = at === STEPS.length - 1;

  // Below 1024px the sidebar is a drawer, so a sidebar step has to open it
  // before there is anything to point at.
  useEffect(() => {
    if (window.innerWidth >= 1024) return;
    if (step.inSidebar) openMenu();
    else closeMenu();
  }, [step.inSidebar, openMenu, closeMenu]);

  /* The drawer above opens on the same commit as this one runs, so on a phone
     the thing being scrolled to does not exist yet the first time through.
     Keep asking until it does, then stop. */
  useEffect(() => {
    const name = step.anchor;
    if (!name) return;

    let done = false;
    function attempt() {
      if (done) return;
      const el = findAnchor(name!);
      if (!el) return;
      done = true;
      el.scrollIntoView({
        block: window.innerWidth < NARROW ? "start" : "center",
        inline: "nearest",
      });
    }

    const frame = requestAnimationFrame(attempt);
    const soon = setTimeout(attempt, 60);
    const later = setTimeout(attempt, 200);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(soon);
      clearTimeout(later);
    };
  }, [step.anchor]);

  useEffect(() => {
    function measure() {
      const card = cardRef.current;
      if (!card) return;

      /* The height the card wants, not the height it currently has. Placement
         hands back a max-height of its own, and measuring the constrained card
         would feed that cap into the next placement and settle short. */
      const height =
        card.scrollHeight + (card.offsetHeight - card.clientHeight);
      const el = step.anchor ? findAnchor(step.anchor) : null;

      if (!el) {
        setHole(null);
        setPos(centre(height));
        return;
      }

      const r = el.getBoundingClientRect();
      const box: Box = {
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height,
      };
      setHole(box);
      setPos(place(box, height));
    }

    /* The card has to be in the document before it can be measured, and a
       sidebar step may still be waiting on the drawer to mount its copy of
       the anchor, so this looks again a couple of times. */
    const frame = requestAnimationFrame(measure);
    const soon = setTimeout(measure, 90);
    const later = setTimeout(measure, 260);

    window.addEventListener("resize", measure);
    /* Capture, because the nav tree is its own scroll container and its
       scroll events do not reach the window otherwise. */
    window.addEventListener("scroll", measure, true);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(soon);
      clearTimeout(later);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [step.anchor, at]);

  useEffect(() => {
    cardRef.current?.focus();
  }, [at]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        finish();
      } else if (e.key === "ArrowRight") {
        if (last) finish();
        else go(at + 1);
      } else if (e.key === "ArrowLeft" && at > 0) {
        go(at - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [at, last, go, finish]);

  const subjects =
    step.group === undefined
      ? []
      : (nav.groups.find((g) => g.key === step.group)?.subjects ?? []);

  return (
    <div className="fixed inset-0 z-[60]" aria-live="polite">
      <Scrim hole={hole} />

      {hole && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-[10px] border-2 border-[var(--accent)]"
          style={{
            top: hole.top - PAD,
            left: hole.left - PAD,
            width: hole.width + PAD * 2,
            height: hole.height + PAD * 2,
          }}
        />
      )}

      <div
        ref={cardRef}
        role="dialog"
        aria-label={`${step.title}. Step ${at + 1} of ${STEPS.length}.`}
        tabIndex={-1}
        className="scrollbar-slim absolute overflow-y-auto rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-5 outline-none"
        style={{
          boxShadow: "var(--shadow-panel)",
          width: pos?.width ?? CARD_WIDTH,
          top: pos?.top ?? 0,
          left: pos?.left ?? 0,
          /* A sheet along the bottom of a phone has to leave the highlight
             above it room to be seen, so the card scrolls instead of growing.
             Unset until the measurement lands, or the first measurement is
             taken against a cap that has not been worked out yet. */
          maxHeight: pos?.maxHeight,
          visibility: pos ? "visible" : "hidden",
        }}
      >
        <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
          Step {at + 1} of {STEPS.length}
        </p>

        <h2 className="mt-1.5 text-[17px] font-bold tracking-[-0.015em]">
          {step.title}
        </h2>

        <p className="mt-2 font-serif text-[14.5px] leading-[1.55]">
          {step.body}
        </p>

        {subjects.length > 0 && (
          <ul className="mt-3.5 space-y-2.5 border-t border-[var(--border)] pt-3.5">
            {subjects.map((subject) => {
              const Icon = SUBJECT_ICONS[subject.slug] ?? IconGlossary;
              return (
                <li key={subject.slug} className="flex gap-2.5">
                  <Icon className="mt-[3px] h-[15px] w-[15px] shrink-0 text-[var(--accent)]" />
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold leading-tight">
                      {subject.name}
                    </span>
                    <span className="mt-[3px] block text-[12.5px] leading-[1.45] text-[var(--text-muted)]">
                      {subject.oneLine}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        )}

        {last && (
          <Link
            href="/metaphysics"
            onClick={finish}
            className="mt-4 flex h-9 w-full items-center justify-center rounded-[var(--radius-pill)] bg-[var(--accent)] text-[13px] font-medium text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            Start with Metaphysics
          </Link>
        )}

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={finish}
            className="text-[12.5px] font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
          >
            {last ? "Close" : "Skip the tour"}
          </button>

          <div className="flex items-center gap-2">
            {at > 0 && (
              <button
                type="button"
                onClick={() => go(at - 1)}
                className="h-8 rounded-[var(--radius-pill)] border border-[var(--border)] px-3.5 text-[12.5px] font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Back
              </button>
            )}
            {!last && (
              <button
                type="button"
                onClick={() => go(at + 1)}
                className="h-8 rounded-[var(--radius-pill)] bg-[var(--accent)] px-4 text-[12.5px] font-medium text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)]"
              >
                {at === 0 ? "Show me around" : "Next"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The dark ground, in four panels around the hole rather than one sheet with
 * a cut-out, so that the element being pointed at is genuinely uncovered and
 * still takes a click.
 */
function Scrim({ hole }: { hole: Box | null }) {
  if (!hole) {
    return (
      <div aria-hidden="true" className="absolute inset-0 bg-[var(--scrim)]" />
    );
  }

  const top = Math.max(0, hole.top - PAD);
  const bottom = hole.top + hole.height + PAD;
  const left = Math.max(0, hole.left - PAD);
  const right = hole.left + hole.width + PAD;

  const panels: React.CSSProperties[] = [
    { top: 0, left: 0, right: 0, height: top },
    { top: bottom, left: 0, right: 0, bottom: 0 },
    { top, left: 0, width: left, height: bottom - top },
    { top, left: right, right: 0, height: bottom - top },
  ];

  return (
    <>
      {panels.map((style, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute bg-[var(--scrim)]"
          style={style}
        />
      ))}
    </>
  );
}
