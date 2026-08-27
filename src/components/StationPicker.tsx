"use client";

import { useState } from "react";

import { IconPause, IconPlay } from "@/components/icons";
import { useMusic } from "@/components/player";
import type { Station } from "@/lib/stations";

/** Rows shown before the list asks you to open the rest of it. */
const PREVIEW_ROWS = 8;

/**
 * The station list on the music page. Picking one starts it in the bar at
 * the bottom, which then survives every move you make around the site.
 */
export function StationPicker({ stations }: { stations: Station[] }) {
  const music = useMusic();

  return (
    <ul className="space-y-4">
      {stations.map((station) => {
        const current = music.station?.slug === station.slug;
        const playing = current && music.playing;
        const empty = station.source === null;

        return (
          <li
            key={station.slug}
            className={[
              "rounded-[var(--radius-card)] border bg-[var(--surface)] p-5 transition-colors",
              current ? "border-[var(--accent)]" : "border-[var(--border)]",
            ].join(" ")}
          >
            <div className="flex items-start gap-4">
              <button
                type="button"
                disabled={empty}
                onClick={() => music.select(station)}
                aria-label={
                  empty
                    ? `${station.name} has nothing to play yet`
                    : playing
                      ? `Pause the ${station.name} station`
                      : `Play the ${station.name} station`
                }
                className="mt-[2px] inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--accent)] text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:bg-[var(--bg-subtle)] disabled:text-[var(--text-muted)]"
              >
                {playing ? (
                  <IconPause className="h-[18px] w-[18px]" />
                ) : (
                  <IconPlay className="ml-[2px] h-[18px] w-[18px]" />
                )}
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <h2 className="text-[19px] font-bold tracking-[-0.02em]">
                    {station.name}
                  </h2>
                  {current && (
                    <span className="rounded-[var(--radius-pill)] border border-[var(--accent)] px-2 py-[1px] text-[10.5px] font-medium uppercase tracking-[0.07em] text-[var(--accent)]">
                      {playing ? "Playing" : "Paused"}
                    </span>
                  )}
                  {empty && (
                    <span className="rounded-[var(--radius-pill)] border border-[var(--border)] px-2 py-[1px] text-[10.5px] font-medium uppercase tracking-[0.07em] text-[var(--text-muted)]">
                      Not set up yet
                    </span>
                  )}
                </div>

                <p className="mt-1 font-serif text-[16px] leading-[1.55] text-[var(--text-muted)]">
                  {station.blurb}
                </p>
                <p className="mt-3 max-w-[62ch] font-serif text-[15.5px] leading-[1.6]">
                  {station.note}
                </p>

                {station.tracks.length > 0 && (
                  <TrackList station={station} current={current} />
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** The songs in a station that was built one at a time. */
function TrackList({
  station,
  current,
}: {
  station: Station;
  current: boolean;
}) {
  const music = useMusic();
  const [open, setOpen] = useState(false);

  const shown = open ? station.tracks : station.tracks.slice(0, PREVIEW_ROWS);

  return (
    <div className="mt-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-[var(--text-muted)]">
        {station.tracks.length} songs
      </p>

      <ol className="mt-2 divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {shown.map((track, at) => {
          /* Matched on the id rather than the position, because shuffling
             reorders the list underneath and the position stops meaning what
             the row on screen says. Falls back to the position for the
             moment before YouTube has reported which video it opened. */
          const here =
            current &&
            (music.videoId ? music.videoId === track.id : music.index === at);
          return (
            <li key={`${track.id}-${at}`}>
              <button
                type="button"
                onClick={() => music.playAt(station, at)}
                className="group flex w-full items-center gap-3 px-1 py-[7px] text-left transition-colors hover:bg-[var(--accent-wash)]"
              >
                <span
                  className={[
                    "w-[22px] shrink-0 text-right font-mono text-[11px] tabular-nums",
                    here ? "text-[var(--accent)]" : "text-[var(--text-muted)]",
                  ].join(" ")}
                >
                  {at + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={[
                      "block truncate text-[13.5px] font-medium leading-tight",
                      here ? "text-[var(--accent)]" : "",
                    ].join(" ")}
                  >
                    {track.title}
                  </span>
                  <span className="block truncate text-[11.5px] leading-tight text-[var(--text-muted)]">
                    {track.from ? `${track.artist} · ${track.from}` : track.artist}
                  </span>
                </span>
                <span className="shrink-0 text-[var(--text-muted)] opacity-0 transition-opacity group-hover:opacity-100">
                  <IconPlay className="h-[13px] w-[13px]" />
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {station.tracks.length > PREVIEW_ROWS && (
        <button
          type="button"
          onClick={() => setOpen((was) => !was)}
          className="mt-2.5 text-[12.5px] font-medium text-[var(--accent)] hover:underline"
        >
          {open ? "Show fewer" : `Show all ${station.tracks.length}`}
        </button>
      )}
    </div>
  );
}
