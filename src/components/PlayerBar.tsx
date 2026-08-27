"use client";

import Link from "next/link";
import { useState } from "react";

import {
  IconClose,
  IconNext,
  IconPause,
  IconPlay,
  IconPrev,
  IconShuffle,
  IconVolume,
  IconVolumeOff,
} from "@/components/icons";
import { clock, useMusic } from "@/components/player";

/**
 * The bar along the bottom of the content column, in the shape everyone
 * already knows from a music app: artwork, what is playing, transport
 * controls, and a scrubber with the two timestamps.
 *
 * It starts after the sidebar rather than spanning the window, so the
 * sidebar's own bottom row stays reachable.
 */
export function PlayerBar() {
  const music = useMusic();
  const [scrub, setScrub] = useState<number | null>(null);

  const position = scrub ?? music.elapsed;
  const total = music.duration || 0;
  const fraction = total > 0 ? Math.min(1, position / total) : 0;

  /* Idle: no bar, but the graft point still exists, so the moment a station
     is picked the embed has somewhere to land. */
  if (!music.station) return <Mount className="sr-only" />;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--surface)] lg:left-[240px]"
      style={{ boxShadow: "var(--shadow-panel)" }}
      aria-label="Music player"
      role="region"
    >
      {/* Progress as a hairline across the top, for widths where the real
          scrubber is hidden. */}
      <div
        aria-hidden="true"
        className="h-[2px] w-full bg-[var(--border)] md:hidden"
      >
        <div
          className="h-full bg-[var(--accent)] transition-[width] duration-300"
          style={{ width: `${fraction * 100}%` }}
        />
      </div>

      <div className="flex h-[74px] items-center gap-3 px-3 sm:px-4">
        {/* Now playing */}
        <div className="flex min-w-0 flex-1 items-center gap-3 md:flex-none md:basis-[28%]">
          <div className="h-[38px] w-[68px] shrink-0 overflow-hidden rounded-[6px] border border-[var(--border)] bg-[var(--bg-subtle)]">
            {/* The embed lands here and becomes the artwork tile. */}
            <Mount className="h-[38px] w-[68px] [&>iframe]:h-[38px] [&>iframe]:w-[68px]" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold leading-tight">
              {music.error ? "Nothing playing" : music.title}
            </p>
            <p className="truncate text-[11.5px] leading-tight text-[var(--text-muted)]">
              {music.error ? (
                music.error
              ) : (
                <Link href="/music" className="hover:text-[var(--accent)]">
                  {music.track
                    ? [music.track.artist, music.track.from]
                        .filter(Boolean)
                        .join(" · ")
                    : `${music.station?.name} station`}
                </Link>
              )}
            </p>
          </div>
        </div>

        {/* Transport */}
        <div className="flex flex-col items-center gap-1.5 md:flex-1">
          <div className="flex items-center gap-1">
            {music.isMix ? (
              /* One long recording has no tracks to shuffle. The slot is kept
                 so the play button stays centred. */
              <span className="hidden h-8 w-8 sm:inline-flex" aria-hidden="true" />
            ) : (
              <ControlButton
                label={music.shuffle ? "Turn shuffle off" : "Turn shuffle on"}
                onClick={music.toggleShuffle}
                pressed={music.shuffle}
                className="hidden sm:inline-flex"
              >
                <IconShuffle className="h-[16px] w-[16px]" />
              </ControlButton>
            )}

            <ControlButton
              label={music.isMix ? "Back 30 seconds" : "Previous track"}
              onClick={music.previous}
            >
              <IconPrev className="h-[17px] w-[17px]" />
            </ControlButton>

            <button
              type="button"
              onClick={music.toggle}
              disabled={!music.ready}
              aria-label={music.playing ? "Pause" : "Play"}
              className="mx-1 inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--accent)] text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)] disabled:opacity-60"
            >
              {music.playing ? (
                <IconPause className="h-[16px] w-[16px]" />
              ) : (
                <IconPlay className="ml-[1px] h-[16px] w-[16px]" />
              )}
            </button>

            <ControlButton
              label={music.isMix ? "Forward 30 seconds" : "Next track"}
              onClick={music.next}
            >
              <IconNext className="h-[17px] w-[17px]" />
            </ControlButton>

            <span className="w-[30px] sm:hidden" aria-hidden="true" />
          </div>

          {/* Scrubber. A real range input, so it is keyboard operable and
              announces its own value without any extra wiring. */}
          <div className="hidden w-full max-w-[420px] items-center gap-2.5 md:flex">
            <Time value={position} />
            <input
              type="range"
              className="scrubber min-w-0 flex-1"
              min={0}
              max={total > 0 ? Math.floor(total) : 0}
              step={1}
              value={Math.floor(position)}
              disabled={total === 0}
              aria-label="Seek"
              aria-valuetext={`${clock(position)} of ${clock(total)}`}
              style={{ ["--played" as string]: `${fraction * 100}%` }}
              onChange={(e) => setScrub(Number(e.target.value))}
              onPointerUp={() => {
                if (scrub !== null) music.seek(scrub);
                setScrub(null);
              }}
              onKeyUp={() => {
                if (scrub !== null) music.seek(scrub);
                setScrub(null);
              }}
            />
            <Time value={total} />
          </div>
        </div>

        {/* Volume and dismiss */}
        <div className="flex items-center justify-end gap-1 md:flex-none md:basis-[28%]">
          <div className="hidden items-center gap-1.5 lg:flex">
            <ControlButton
              label={music.muted ? "Unmute" : "Mute"}
              onClick={music.toggleMute}
            >
              {music.muted ? (
                <IconVolumeOff className="h-[16px] w-[16px]" />
              ) : (
                <IconVolume className="h-[16px] w-[16px]" />
              )}
            </ControlButton>
            <input
              type="range"
              className="scrubber w-[92px]"
              min={0}
              max={100}
              step={1}
              value={music.muted ? 0 : music.volume}
              aria-label="Volume"
              style={{
                ["--played" as string]: `${music.muted ? 0 : music.volume}%`,
              }}
              onChange={(e) => music.changeVolume(Number(e.target.value))}
            />
          </div>

          <ControlButton label="Close the player" onClick={music.stop}>
            <IconClose className="h-[16px] w-[16px]" />
          </ControlButton>
        </div>
      </div>
    </div>
  );
}

/**
 * The element the YouTube embed is grafted into. It lives in its own
 * component because handing a callback out of the music context straight
 * into a `ref` attribute makes the hooks rule treat every other field on
 * that context as a ref too.
 */
function Mount({ className }: { className?: string }) {
  const { attachMount } = useMusic();
  return <div ref={attachMount} className={className} />;
}

function Time({ value }: { value: number }) {
  return (
    <span className="w-[52px] shrink-0 text-center font-mono text-[11px] tabular-nums text-[var(--text-muted)]">
      {clock(value)}
    </span>
  );
}

function ControlButton({
  label,
  onClick,
  pressed,
  className = "",
  children,
}: {
  label: string;
  onClick: () => void;
  pressed?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      className={[
        "inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-card)] transition-colors hover:bg-[var(--accent-wash)]",
        pressed ? "text-[var(--accent)]" : "text-[var(--text-muted)]",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
