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

type Rig = { ctx: AudioContext; out: AudioNode };

let rig: Rig | null = null;

function room(ctx: AudioContext, seconds: number, decay: number): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const data = buffer.getChannelData(c);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** decay;
    }
  }
  return buffer;
}

function audio(): Rig | null {
  if (!readSound()) return null;
  if (!rig) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    const ctx = new Ctor();
    const out = ctx.createGain();
    const air = ctx.createBiquadFilter();
    const reverb = ctx.createConvolver();
    const wet = ctx.createGain();
    const glue = ctx.createDynamicsCompressor();

    out.gain.value = 0.9;
    air.type = "lowpass";
    air.frequency.value = 9000;
    air.Q.value = 0.5;
    reverb.buffer = room(ctx, 1.8, 3.5);
    wet.gain.value = 0.2;
    glue.threshold.value = -20;
    glue.knee.value = 10;
    glue.ratio.value = 3;
    glue.attack.value = 0.002;
    glue.release.value = 0.25;

    out.connect(air);
    air.connect(glue);
    air.connect(reverb);
    reverb.connect(wet);
    wet.connect(glue);
    glue.connect(ctx.destination);
    rig = { ctx, out };
  }
  if (rig.ctx.state === "suspended") void rig.ctx.resume().catch(() => {});
  return rig;
}

type Overtone = { ratio: number; level: number; decay: number };

const MALLET: Overtone[] = [
  { ratio: 1, level: 1, decay: 1 },
  { ratio: 4, level: 0.16, decay: 0.16 },
  { ratio: 9.8, level: 0.04, decay: 0.05 },
];

const BELL: Overtone[] = [
  { ratio: 1, level: 1, decay: 1 },
  { ratio: 2, level: 0.32, decay: 0.55 },
  { ratio: 3.01, level: 0.12, decay: 0.32 },
  { ratio: 4.18, level: 0.06, decay: 0.2 },
];

const MUTED: Overtone[] = [
  { ratio: 1, level: 1, decay: 1 },
  { ratio: 2, level: 0.1, decay: 0.35 },
];

type Strike = {
  hz: number;
  at: number;
  length: number;
  level: number;
  timbre?: Overtone[];
  bright?: number;
  bend?: number;
};

function strike(
  { ctx, out }: Rig,
  { hz, at, length, level, timbre = MALLET, bright = 6000, bend = 1 }: Strike,
) {
  const t = ctx.currentTime + 0.02 + at;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(bright, t);
  filter.frequency.exponentialRampToValueAtTime(Math.max(bright * 0.3, hz * 1.5), t + length);
  filter.connect(out);

  for (const p of timbre) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const end = t + length * p.decay;
    osc.type = "sine";
    osc.frequency.setValueAtTime(hz * p.ratio, t);
    if (bend !== 1) osc.frequency.exponentialRampToValueAtTime(hz * p.ratio * bend, end);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(level * p.level, t + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, end);
    osc.connect(gain).connect(filter);
    osc.start(t);
    osc.stop(end + 0.05);
  }
}

function pad({ ctx, out }: Rig, chord: number[], at: number, length: number, level: number) {
  const t = ctx.currentTime + 0.02 + at;
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  filter.type = "lowpass";
  filter.frequency.value = 1600;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(level, t + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + length);
  gain.connect(filter).connect(out);

  for (const hz of chord) {
    for (const cents of [-5, 5]) {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = hz;
      osc.detune.value = cents;
      osc.connect(gain);
      osc.start(t);
      osc.stop(t + length + 0.05);
    }
  }
}

const PENTATONIC = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51, 1567.98, 1760];

export function correctSound(streak: number) {
  const a = audio();
  if (!a) return;
  const step = Math.min(streak, PENTATONIC.length - 4);
  const high = PENTATONIC[step + 3];
  strike(a, { hz: PENTATONIC[step], at: 0, length: 0.4, level: 0.14 });
  strike(a, { hz: high, at: 0.08, length: 0.75, level: 0.16 });
  if (streak >= 4) {
    strike(a, { hz: high * 2, at: 0.08, length: 0.9, level: 0.035, timbre: BELL, bright: 9000 });
  }
}

export function wrongSound() {
  const a = audio();
  if (!a) return;
  strike(a, { hz: 293.66, at: 0, length: 0.22, level: 0.17, timbre: MUTED, bright: 1100 });
  strike(a, { hz: 233.08, at: 0.1, length: 0.42, level: 0.17, timbre: MUTED, bright: 900, bend: 0.97 });
}

export function chime() {
  const a = audio();
  if (!a) return;
  [783.99, 1046.5, 1318.51, 1567.98].forEach((hz, i, all) =>
    strike(a, {
      hz,
      at: i * 0.07,
      length: i === all.length - 1 ? 1.4 : 0.8,
      level: 0.09,
      timbre: BELL,
      bright: 7000,
    }),
  );
}

export function fanfare() {
  const a = audio();
  if (!a) return;
  [523.25, 659.25, 783.99, 1046.5].forEach((hz, i) =>
    strike(a, { hz, at: i * 0.075, length: 0.6, level: 0.13 }),
  );
  pad(a, [261.63, 329.63, 392, 523.25], 0.24, 1.8, 0.035);
  strike(a, { hz: 1318.51, at: 0.3, length: 1.6, level: 0.07, timbre: BELL, bright: 8000 });
  strike(a, { hz: 1567.98, at: 0.38, length: 1.8, level: 0.06, timbre: BELL, bright: 8000 });
  strike(a, { hz: 2093, at: 0.46, length: 2, level: 0.045, timbre: BELL, bright: 9000 });
}

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  rot: number;
  spin: number;
  delay: number;
  life: number;
  phase: number;
  fill: string;
  edge: boolean;
  dot: boolean;
};

const DRAG = 260;
const OUTLINE = "#2a0b5c";

function starColours(): string[] {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? ["#a679ff", "#a679ff", "#8b5cf6", "#e4d6ff", "#ffffff", "#f6a33f"]
    : ["#a679ff", "#8b5cf6", "#8b5cf6", "#c9b0ff", "#7c3aed", "#f6a33f"];
}

function sparkle(ctx: CanvasRenderingContext2D, r: number) {
  const k = r * 0.16;
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.quadraticCurveTo(k, -k, r, 0);
  ctx.quadraticCurveTo(k, k, 0, r);
  ctx.quadraticCurveTo(-k, k, -r, 0);
  ctx.quadraticCurveTo(-k, -k, 0, -r);
  ctx.closePath();
}

function backOut(x: number): number {
  return 1 + 2.70158 * (x - 1) ** 3 + 1.70158 * (x - 1) ** 2;
}

function edgePoint(box: DOMRect): { x: number; y: number; nx: number; ny: number } {
  const p = Math.random() * 2 * (box.width + box.height);
  if (p < box.width) return { x: box.left + p, y: box.top, nx: 0, ny: -1 };
  if (p < box.width + box.height) return { x: box.right, y: box.top + p - box.width, nx: 1, ny: 0 };
  if (p < 2 * box.width + box.height) {
    return { x: box.right - (p - box.width - box.height), y: box.bottom, nx: 0, ny: 1 };
  }
  return { x: box.left, y: box.bottom - (p - 2 * box.width - box.height), nx: -1, ny: 0 };
}

export function starBurst(
  target: Element | { x: number; y: number },
  { count = 60, power = 1 }: { count?: number; power?: number } = {},
) {
  if (reducedMotion()) return;

  const box =
    target instanceof Element
      ? target.getBoundingClientRect()
      : new DOMRect(target.x, target.y, 0, 0);
  const cx = box.left + box.width / 2;
  const cy = box.top + box.height / 2;
  const sized = box.width > 0 && box.height > 0;

  const canvas = document.createElement("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.setAttribute(
    "style",
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:80",
  );
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }
  ctx.scale(dpr, dpr);

  const colours = starColours();
  const grow = Math.min(1.3, 0.7 + power * 0.4);
  const stars: Star[] = Array.from({ length: count }, () => {
    let x = cx;
    let y = cy;
    let dx = Math.cos(Math.random() * Math.PI * 2);
    let dy = Math.sin(Math.random() * Math.PI * 2);
    if (sized) {
      const e = edgePoint(box);
      const rx = e.x - cx;
      const ry = e.y - cy;
      const len = Math.hypot(rx, ry) || 1;
      x = e.x;
      y = e.y;
      dx = e.nx + (rx / len) * 0.8 + (Math.random() - 0.5) * 0.5;
      dy = e.ny + (ry / len) * 0.8 + (Math.random() - 0.5) * 0.5;
    }
    const norm = Math.hypot(dx, dy) || 1;
    const speed = (0.18 + Math.random() ** 1.5 * 0.55) * power;
    const dot = Math.random() < 0.28;
    const r = dot ? 1.2 + Math.random() * 1.4 : 3 + Math.random() ** 2.2 * 10 * grow;
    return {
      x,
      y,
      vx: (dx / norm) * speed,
      vy: (dy / norm) * speed,
      r,
      rot: (Math.random() - 0.5) * 0.6,
      spin: (Math.random() - 0.5) * 0.006,
      delay: Math.random() * 90,
      life: 700 + Math.random() * 600 + power * 250,
      phase: Math.random() * Math.PI * 2,
      fill: colours[Math.floor(Math.random() * colours.length)],
      edge: !dot && r > 6.5,
      dot,
    };
  });

  const glow = count >= 60;
  const reach = Math.max(box.width, box.height) * 0.6 + 120;
  const start = performance.now();

  function frame(now: number) {
    if (!ctx) return;
    const t = now - start;
    ctx.clearRect(0, 0, w, h);

    if (glow) {
      const strength = t < 180 ? t / 180 : Math.max(0, 1 - (t - 180) / 900);
      if (strength > 0) {
        const radius = reach * (0.7 + 0.45 * Math.min(t / 1000, 1));
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        g.addColorStop(0, `rgba(139, 92, 246, ${0.3 * strength})`);
        g.addColorStop(0.5, `rgba(139, 92, 246, ${0.12 * strength})`);
        g.addColorStop(1, "rgba(139, 92, 246, 0)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = g;
        ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      }
    }

    let alive = false;
    for (const s of stars) {
      const age = t - s.delay;
      if (age < 0) {
        alive = true;
        continue;
      }
      if (age > s.life) continue;
      alive = true;

      const travel = DRAG * (1 - Math.exp(-age / DRAG));
      const k = age / s.life;
      const fade = k < 0.55 ? 1 : 1 - (k - 0.55) / 0.45;
      const pop = age < 160 ? backOut(age / 160) : 1;
      const twinkle = 1 + 0.14 * Math.sin(age / 70 + s.phase);
      const size = s.r * pop * twinkle * (0.35 + 0.65 * fade);
      if (size <= 0) continue;

      ctx.save();
      ctx.globalAlpha = Math.max(0, fade);
      ctx.translate(s.x + s.vx * travel, s.y + s.vy * travel + 0.000015 * age * age);
      ctx.rotate(s.rot + s.spin * travel);
      ctx.fillStyle = s.fill;
      if (s.dot) {
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        sparkle(ctx, size);
        if (s.edge) {
          ctx.lineJoin = "round";
          ctx.lineWidth = Math.max(1, size * 0.2);
          ctx.strokeStyle = OUTLINE;
          ctx.stroke();
        }
        ctx.fill();
      }
      ctx.restore();
    }

    if (alive && t < 3200) requestAnimationFrame(frame);
    else canvas.remove();
  }

  requestAnimationFrame(frame);
}
