"use client";

import { useSyncExternalStore } from "react";

const SOUND_KEY = "philolarps-sound";
const SOUND_EVENT = "philolarps-sound-change";

function readSound(): boolean {
  try {
    return localStorage.getItem(SOUND_KEY) !== "off";
  } catch {
    return true;
  }
}

function subscribeSound(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(SOUND_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(SOUND_EVENT, onChange);
  };
}

export function useSound(): [boolean, (on: boolean) => void] {
  const on = useSyncExternalStore(subscribeSound, readSound, () => true);
  const set = (next: boolean) => {
    try {
      localStorage.setItem(SOUND_KEY, next ? "on" : "off");
    } catch {
    }
    window.dispatchEvent(new Event(SOUND_EVENT));
  };
  return [on, set];
}

export function reducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let shared: AudioContext | null = null;

function audio(): AudioContext | null {
  if (!readSound()) return null;
  if (!shared) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    shared = new Ctor();
  }
  if (shared.state === "suspended") void shared.resume();
  return shared;
}

type Note = {
  hz: number;
  at: number;
  length: number;
  type?: OscillatorType;
  peak?: number;
  slideTo?: number;
};

function play(notes: Note[]) {
  const ctx = audio();
  if (!ctx) return;
  const start = ctx.currentTime + 0.01;

  for (const note of notes) {
    const at = start + note.at;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = note.type ?? "triangle";
    osc.frequency.setValueAtTime(note.hz, at);
    if (note.slideTo) {
      osc.frequency.exponentialRampToValueAtTime(note.slideTo, at + note.length);
    }

    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(note.peak ?? 0.16, at + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + note.length);

    osc.connect(gain).connect(ctx.destination);
    osc.start(at);
    osc.stop(at + note.length + 0.02);
  }
}

export function chime() {
  play(
    [523.25, 659.25, 783.99, 1046.5].map((hz, i, all) => ({
      hz,
      at: i * 0.085,
      length: i === all.length - 1 ? 0.55 : 0.3,
    })),
  );
}

export function correctSound(streak: number) {
  const lift = 2 ** (Math.min(streak, 12) / 12);
  play([
    { hz: 659.25 * lift, at: 0, length: 0.14, peak: 0.13 },
    { hz: 987.77 * lift, at: 0.07, length: 0.32, peak: 0.13 },
    { hz: 1975.5 * lift, at: 0.07, length: 0.18, type: "sine", peak: 0.03 },
  ]);
}

export function wrongSound() {
  play([
    { hz: 233, at: 0, length: 0.22, type: "sine", peak: 0.2, slideTo: 150 },
    { hz: 220, at: 0.12, length: 0.3, type: "sine", peak: 0.16, slideTo: 110 },
  ]);
}

export function selectSound() {
  play([{ hz: 880, at: 0, length: 0.05, type: "sine", peak: 0.05 }]);
}

export function fanfare() {
  play(
    [523.25, 659.25, 783.99, 1046.5, 1318.5, 1568].map((hz, i, all) => ({
      hz,
      at: i * 0.07,
      length: i === all.length - 1 ? 0.8 : 0.25,
      peak: 0.12,
    })),
  );
}

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

const PALETTE = [
  "--subject-metaphysics",
  "--subject-philosophy-of-mind",
  "--subject-ethics",
  "--subject-political-philosophy",
  "--subject-theism",
  "--subject-applied-ethics",
  "--subject-ontology",
  "--subject-epistemology",
  "--subject-logic",
  "--subject-philosophy-of-language",
  "--subject-metalogic",
  "--subject-metaontology",
  "--accent",
];

function palette(): string[] {
  const style = getComputedStyle(document.documentElement);
  const found = PALETTE.map((n) => style.getPropertyValue(n).trim()).filter(
    (v) => v.length > 0,
  );
  return found.length > 0 ? found : ["currentColor"];
}

export function confetti(
  origin: { x: number; y: number },
  { count = 110, power = 1 }: { count?: number; power?: number } = {},
) {
  if (reducedMotion()) return;

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
  const bits: Bit[] = Array.from({ length: count }, () => {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.1;
    const speed = (7 + Math.random() * 9) * power;
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

export function burstFrom(el: Element, count = 26) {
  const box = el.getBoundingClientRect();
  confetti(
    { x: box.left + box.width / 2, y: box.top + box.height / 2 },
    { count, power: 0.55 },
  );
}
