"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { IconArrowRight, IconCheck, IconSpark } from "@/components/icons";

const DONE_KEY = "philolarps-done";
const SOUND_KEY = "philolarps-sound";

/** Fired on this window whenever the finished list changes. */
const CHANGED = "philolarps-done-change";

/* ------------------------------------------------------------------ *
 * The finished list
 * ------------------------------------------------------------------ */

export function readDone(): string[] {
  try {
    const raw = localStorage.getItem(DONE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((h) => typeof h === "string") : [];
  } catch {
    // No storage, or somebody put something else under the key.
    return [];
  }
}

function writeDone(hrefs: string[]) {
  try {
    localStorage.setItem(DONE_KEY, JSON.stringify(hrefs));
  } catch {
    // Progress will not survive the tab. The mark still shows until then.
  }
  window.dispatchEvent(new Event(CHANGED));
}

/**
 * The set of articles marked read, kept level with storage.
 *
 * Empty on the first render so the server and the client agree; the real list
 * arrives a frame later. Reading storage during render would mismatch, and
 * setting state straight from an effect body is an error in this repo.
 */
export function useDone(): Set<string> {
  const [done, setDone] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    function sync() {
      setDone(new Set(readDone()));
    }

    const frame = requestAnimationFrame(sync);
    window.addEventListener(CHANGED, sync);
    // Another tab of the same site, which fires storage rather than CHANGED.
    window.addEventListener("storage", sync);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener(CHANGED, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return done;
}

/* ------------------------------------------------------------------ *
 * Sound
 * ------------------------------------------------------------------ */

function soundOn(): boolean {
  try {
    return localStorage.getItem(SOUND_KEY) !== "off";
  } catch {
    return true;
  }
}

/**
 * A four-note rise, synthesised on the spot rather than sampled from anything.
 * Triangle waves with a fast attack and a short exponential tail, which is the
 * shape a chime has and what keeps it from clicking at either end.
 */
function chime() {
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return;

  const ctx = new Ctor();
  const start = ctx.currentTime + 0.01;

  // C5 E5 G5 C6: an arpeggio up, which reads as "that went well" in a way a
  // single tone does not.
  const notes = [523.25, 659.25, 783.99, 1046.5];

  notes.forEach((hz, i) => {
    const at = start + i * 0.085;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(hz, at);

    // The last note rings longer, so the run lands rather than stopping.
    const tail = i === notes.length - 1 ? 0.55 : 0.3;
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(0.16, at + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + tail);

    osc.connect(gain).connect(ctx.destination);
    osc.start(at);
    osc.stop(at + tail + 0.02);
  });

  // Nothing else uses this context, and a page that opens one per article
  // eventually runs into the per-tab limit.
  window.setTimeout(() => void ctx.close(), 1400);
}

/* ------------------------------------------------------------------ *
 * Confetti
 * ------------------------------------------------------------------ */

type Bit = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  spin: number;
  angle: number;
  colour: string;
};

/** The nine subject hues, whichever way the current theme resolves them. */
function palette(): string[] {
  const style = getComputedStyle(document.documentElement);
  const names = [
    "--subject-metaphysics",
    "--subject-philosophy-of-mind",
    "--subject-ethics",
    "--subject-political-philosophy",
    "--subject-theism",
    "--subject-applied-ethics",
    "--subject-ontology",
    "--subject-epistemology",
    "--subject-logic",
    "--accent",
  ];

  const found = names
    .map((n) => style.getPropertyValue(n).trim())
    .filter((v) => v.length > 0);

  return found.length > 0 ? found : ["currentColor"];
}

/**
 * Paper thrown up from a point, under gravity and a little drag. Its own
 * canvas, over everything, deaf to the pointer, gone when the last bit lands.
 */
function confetti(origin: { x: number; y: number }) {
  const canvas = document.createElement("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.setAttribute(
    "style",
    `position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:80`,
  );
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }
  ctx.scale(dpr, dpr);

  const colours = palette();
  const bits: Bit[] = Array.from({ length: 110 }, () => {
    // Up and outwards, wider than it is tall, so the spray reads as a burst
    // rather than a fountain.
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.1;
    const speed = 7 + Math.random() * 9;
    return {
      x: origin.x + (Math.random() - 0.5) * 40,
      y: origin.y,
      vx: Math.cos(angle) * speed * 1.25,
      vy: Math.sin(angle) * speed,
      size: 5 + Math.random() * 6,
      spin: (Math.random() - 0.5) * 0.34,
      angle: Math.random() * Math.PI,
      colour: colours[Math.floor(Math.random() * colours.length)],
    };
  });

  let frame = 0;
  const MAX = 240;

  function step() {
    if (!ctx) return;
    frame += 1;
    ctx.clearRect(0, 0, w, h);

    let alive = false;
    for (const b of bits) {
      b.vy += 0.32;
      b.vx *= 0.99;
      b.vy *= 0.99;
      b.x += b.vx;
      b.y += b.vy;
      b.angle += b.spin;

      if (b.y - b.size > h) continue;
      alive = true;

      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.angle);
      ctx.fillStyle = b.colour;
      // Scaled on one axis by the spin, which is what makes a flat rectangle
      // look like a tumbling piece of paper.
      ctx.fillRect(
        -b.size / 2,
        -b.size / 4,
        b.size,
        (b.size / 2) * Math.abs(Math.cos(b.angle)),
      );
      ctx.restore();
    }

    if (alive && frame < MAX) {
      requestAnimationFrame(step);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(step);
}

/* ------------------------------------------------------------------ *
 * The control
 * ------------------------------------------------------------------ */

export function FinishArticle({
  href,
  next,
}: {
  href: string;
  next?: { href: string; title: string } | null;
}) {
  const done = useDone();
  const isDone = done.has(href);
  const [sound, setSound] = useState(true);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setSound(soundOn()));
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleSound = useCallback(() => {
    setSound((on) => {
      const nextOn = !on;
      try {
        localStorage.setItem(SOUND_KEY, nextOn ? "on" : "off");
      } catch {
        // Preference will not persist. It still applies to this page.
      }
      return nextOn;
    });
  }, []);

  function mark(event: React.MouseEvent<HTMLButtonElement>) {
    const list = readDone();

    if (isDone) {
      writeDone(list.filter((h) => h !== href));
      return;
    }

    writeDone(list.includes(href) ? list : [...list, href]);

    const quiet = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!quiet) {
      const box = event.currentTarget.getBoundingClientRect();
      confetti({ x: box.left + box.width / 2, y: box.top + box.height / 2 });
    }
    if (sound) chime();
  }

  return (
    <section className="mt-14 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg-subtle)] px-5 py-4">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[var(--accent-wash)] text-[var(--accent)]"
          >
            {isDone ? (
              <IconCheck className="h-[18px] w-[18px]" />
            ) : (
              <IconSpark className="h-[18px] w-[18px]" />
            )}
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-snug">
              {isDone ? "Marked as read" : "Reached the end?"}
            </p>
            <p className="mt-0.5 font-serif text-[14.5px] leading-[1.5] text-[var(--text-muted)]">
              {isDone
                ? "It shows with a tick in the sidebar from now on."
                : "Mark it, and the sidebar keeps track of where you have been."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={!sound}
            className="rounded-[var(--radius-pill)] border border-[var(--border)] px-2.5 py-[6px] text-[12px] font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--accent-wash)] hover:text-[var(--accent)]"
          >
            {sound ? "Sound on" : "Sound off"}
          </button>
          <button
            type="button"
            onClick={mark}
            aria-pressed={isDone}
            className={[
              "rounded-[var(--radius-pill)] px-4 py-[8px] text-[13px] font-medium transition-colors",
              isDone
                ? "border border-[var(--border)] text-[var(--accent)] hover:bg-[var(--accent-wash)]"
                : "bg-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-hover)]",
            ].join(" ")}
          >
            {isDone ? "Undo" : "Mark as read"}
          </button>
        </div>
      </div>

      {isDone && next && (
        <Link
          href={next.href}
          className="mt-4 flex items-center gap-1.5 border-t border-[var(--border)] pt-3 text-[13.5px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
        >
          Next up: {next.title}
          <IconArrowRight className="h-[15px] w-[15px]" />
        </Link>
      )}
    </section>
  );
}
