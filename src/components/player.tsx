"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { Station, Track } from "@/lib/stations";

/* ------------------------------------------------------------------ *
 * The YouTube IFrame API, typed down to the parts used here.
 *
 * Nothing is hosted on this site. The audio comes from YouTube, played
 * through its own embed, so the artists and labels keep whatever
 * arrangement they already have with it. The embed stays visible in the
 * bar as the artwork tile, which is also what YouTube's terms expect.
 * ------------------------------------------------------------------ */

type YTPlayer = {
  playVideo(): void;
  pauseVideo(): void;
  nextVideo(): void;
  previousVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  setVolume(volume: number): void;
  setShuffle(on: boolean): void;
  setLoop(on: boolean): void;
  getVideoData(): { title?: string; video_id?: string };
  getPlaylistIndex(): number;
  playVideoAt(index: number): void;
  loadPlaylist(playlist: string[], index?: number, startSeconds?: number): void;
  destroy(): void;
};

type YTNamespace = {
  Player: new (
    element: HTMLElement,
    options: {
      height?: string;
      width?: string;
      videoId?: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (event: { target: YTPlayer }) => void;
        onStateChange?: (event: { target: YTPlayer; data: number }) => void;
        onError?: (event: { data: number }) => void;
      };
    },
  ) => YTPlayer;
};

type ApiWindow = Window & {
  YT?: YTNamespace;
  onYouTubeIframeAPIReady?: () => void;
};

const ENDED = 0;
const PLAYING = 1;
const PAUSED = 2;
const BUFFERING = 3;

/** How many unplayable songs in a row before the station gives up. */
const MAX_SKIPS = 8;

let apiPromise: Promise<YTNamespace> | null = null;

/** Loads the IFrame API once per page, however many callers ask for it. */
function loadApi(): Promise<YTNamespace> {
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<YTNamespace>((resolve, reject) => {
    const w = window as ApiWindow;
    if (w.YT?.Player) {
      resolve(w.YT);
      return;
    }

    // The API calls this global when it finishes parsing. Anything already
    // hooked on it keeps working.
    const previous = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (w.YT) resolve(w.YT);
      else reject(new Error("iframe api loaded without YT"));
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => reject(new Error("iframe api blocked"));
    document.head.appendChild(script);
  });

  return apiPromise;
}

/* `new YT.Player()` hands back an object straight away, but none of its
   methods exist until the embed behind it has loaded. Switching stations
   leaves a window where the old station is still marked as playing and the
   new player is that half-built object, so everything that reaches for it
   checks first. */
function usable(player: YTPlayer | null): player is YTPlayer {
  return typeof player?.getCurrentTime === "function";
}

const VOLUME_STORAGE_KEY = "philolarps-volume";
const DEFAULT_VOLUME = 60;

/* Read at first render rather than in an effect, so the level never starts
   at one value and jumps to another. On the server there is no storage to
   read and no bar on screen yet, so the default is all that is needed. */
function storedVolume(): number {
  if (typeof window === "undefined") return DEFAULT_VOLUME;
  try {
    const stored = Number(localStorage.getItem(VOLUME_STORAGE_KEY));
    if (Number.isFinite(stored) && stored >= 0 && stored <= 100) return stored;
  } catch {
    // Storage is unavailable. The default stands.
  }
  return DEFAULT_VOLUME;
}

type Music = {
  station: Station | null;
  ready: boolean;
  playing: boolean;
  buffering: boolean;
  /** What to call the thing playing: our own name for it where we have one. */
  title: string;
  /** The row of the station's list that is playing, if it is on the list. */
  track: Track | null;
  elapsed: number;
  duration: number;
  shuffle: boolean;
  volume: number;
  muted: boolean;
  error: string | null;
  /** True when the station is one long recording rather than a playlist. */
  isMix: boolean;
  /** The index of the track playing, for a station built from a track list. */
  index: number;
  /* What the list on the page marks as playing. An index goes stale the
     moment the list is shuffled; the id of the video itself does not. */
  videoId: string;
  /* A callback rather than a ref object: a ref read during render is exactly
     what the hooks rule forbids, and the bar needs this at render time. */
  attachMount: (node: HTMLDivElement | null) => void;
  select: (station: Station) => void;
  /** Start a station at one particular song in its list. */
  playAt: (station: Station, index: number) => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  seek: (seconds: number) => void;
  changeVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  stop: () => void;
};

const MusicContext = createContext<Music | null>(null);

export function useMusic(): Music {
  const value = useContext(MusicContext);
  if (!value) throw new Error("useMusic used outside MusicProvider");
  return value;
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const [station, setStation] = useState<Station | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [title, setTitle] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [volume, setVolume] = useState(storedVolume);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [videoId, setVideoId] = useState("");

  /* State, not a ref: the build effect has to run again once the bar has
     mounted and handed over its host element. */
  const [host, setHost] = useState<HTMLDivElement | null>(null);
  const attachMount = useCallback((node: HTMLDivElement | null) => {
    setHost(node);
  }, []);

  const playerRef = useRef<YTPlayer | null>(null);
  /** Where a freshly built station should start. Read once, in onReady. */
  const startIndexRef = useRef(0);

  /* The bar is fixed, so the content column has to be told to end above it.
     A custom property beats threading a height through the shell, and it
     costs nothing while no station is playing. */
  useEffect(() => {
    const root = document.documentElement;
    if (station) root.style.setProperty("--player-height", "66px");
    else root.style.removeProperty("--player-height");
    return () => {
      root.style.removeProperty("--player-height");
    };
  }, [station]);

  /* Building the player. The embed replaces the node it is given, so the
     node is created by hand instead of being rendered: React never learns
     about it and so never tries to reconcile a element that is gone. */
  useEffect(() => {
    const source = station?.source;
    if (!source || !host) return;

    /* Switching stations tears the embed down and builds a new one. The API
       does have load methods, but they behave differently for a playlist and
       for a looping single video, and a rebuild is right in both cases. */
    if (usable(playerRef.current)) playerRef.current.destroy();
    playerRef.current = null;
    host.replaceChildren();

    let cancelled = false;
    let skips = 0;
    const target = document.createElement("div");
    host.appendChild(target);

    /* Three shapes go in here. A playlist YouTube already holds is named by
       id. One long recording is queued behind itself, which is the trick that
       makes `loop` apply to a single video. A hand-built track list is loaded
       in onReady instead: passing the ids as a startup parameter would leave
       the first song outside the playlist proper, and every position YouTube
       then reported would be one off from the list drawn on the page. */
    const sourceVars: Record<string, string | number> =
      source.kind === "playlist"
        ? { listType: "playlist", list: source.id }
        : source.kind === "video"
          ? { playlist: source.id, loop: 1 }
          : {};

    const firstVideo =
      source.kind === "queue"
        ? source.ids[0]
        : source.kind === "video"
          ? source.id
          : undefined;

    loadApi()
      .then((YT) => {
        if (cancelled) return;
        playerRef.current = new YT.Player(target, {
          width: "112",
          height: "63",
          videoId: firstVideo,
          playerVars: {
            ...sourceVars,
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              if (cancelled) return;
              event.target.setVolume(muted ? 0 : volume);
              event.target.setLoop(true);
              const start = startIndexRef.current;
              startIndexRef.current = 0;
              if (source.kind === "queue") {
                event.target.loadPlaylist(source.ids, start);
              } else if (start > 0) {
                event.target.playVideoAt(start);
              } else {
                event.target.playVideo();
              }
              if (shuffle && source.kind !== "video") {
                event.target.setShuffle(true);
              }
              setReady(true);
            },
            onStateChange: (event) => {
              if (cancelled) return;
              setPlaying(event.data === PLAYING);
              setBuffering(event.data === BUFFERING);
              if (event.data === PLAYING) skips = 0;
              if (event.data === PLAYING || event.data === PAUSED) {
                const data = event.target.getVideoData();
                setTitle(data.title ?? "");
                setVideoId(data.video_id ?? "");
                setDuration(event.target.getDuration() || 0);
                const at = event.target.getPlaylistIndex();
                if (at >= 0) setIndex(at);
              }
              if (event.data === ENDED) setElapsed(0);
            },
            /* Some owners turn embedding off, and in a list of a hundred
               songs a few always have. Rather than stopping the station on
               one of them, step over it. The cap is there so a station that
               is entirely unplayable stops instead of spinning. */
            onError: () => {
              if (cancelled) return;
              if (source.kind !== "video" && skips < MAX_SKIPS) {
                skips += 1;
                if (usable(playerRef.current)) playerRef.current.nextVideo();
                return;
              }
              setError(
                "That link would not load. It may be private, or its owner may have turned off embedding.",
              );
              setPlaying(false);
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) {
          setError("The YouTube player could not load. A blocker may be stopping it.");
        }
      });

    return () => {
      cancelled = true;
    };
    // Shuffle and volume are read at creation time only; their own handlers
    // push later changes straight into the player.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [station, host]);

  /* Elapsed time. The API has no progress event, so it gets polled, and
     only while something is actually moving. */
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      const player = playerRef.current;
      if (!usable(player)) return;
      setElapsed(player.getCurrentTime() || 0);
      const total = player.getDuration() || 0;
      if (total > 0) setDuration(total);
    }, 500);
    return () => window.clearInterval(id);
  }, [playing]);

  const select = useCallback(
    (next: Station) => {
      if (!next.source) return;
      setError(null);
      if (station?.slug === next.slug) {
        const player = playerRef.current;
        if (!usable(player)) return;
        if (playing) player.pauseVideo();
        else player.playVideo();
        return;
      }
      setReady(false);
      setTitle("");
      setElapsed(0);
      setDuration(0);
      setIndex(0);
      setVideoId("");
      setStation(next);
    },
    [station, playing],
  );

  const playAt = useCallback(
    (next: Station, at: number) => {
      const source = next.source;
      if (!source) return;
      setError(null);
      const player = playerRef.current;
      if (station?.slug === next.slug && usable(player)) {
        /* Reloading the list rather than seeking within it. A shuffled list
           no longer runs in the order shown on the page, so counting into it
           would land on the wrong song. Reloading puts the order back, and
           the shuffle button turns off to say as much. */
        if (source.kind === "queue") {
          player.loadPlaylist(source.ids, at);
          setShuffle(false);
        } else {
          player.playVideoAt(at);
        }
        setIndex(at);
        return;
      }
      startIndexRef.current = at;
      setReady(false);
      setTitle("");
      setElapsed(0);
      setDuration(0);
      setIndex(at);
      setStation(next);
    },
    [station],
  );

  const toggle = useCallback(() => {
    const player = playerRef.current;
    if (!usable(player)) return;
    if (playing) player.pauseVideo();
    else player.playVideo();
  }, [playing]);

  /* On a playlist these move a track. On a single long mix there is no next
     track, so they jump half a minute instead, which is what the buttons are
     good for on a three-hour recording. */
  const isMix = station?.source?.kind === "video";

  const next = useCallback(() => {
    const player = playerRef.current;
    if (!usable(player)) return;
    if (isMix) player.seekTo(player.getCurrentTime() + 30, true);
    else player.nextVideo();
  }, [isMix]);

  const previous = useCallback(() => {
    const player = playerRef.current;
    if (!usable(player)) return;
    if (isMix) player.seekTo(Math.max(0, player.getCurrentTime() - 30), true);
    else player.previousVideo();
  }, [isMix]);

  const seek = useCallback((seconds: number) => {
    const player = playerRef.current;
    if (usable(player)) player.seekTo(seconds, true);
    setElapsed(seconds);
  }, []);

  const changeVolume = useCallback((value: number) => {
    const clamped = Math.min(100, Math.max(0, Math.round(value)));
    setVolume(clamped);
    setMuted(clamped === 0);
    const player = playerRef.current;
    if (usable(player)) player.setVolume(clamped);
    try {
      localStorage.setItem(VOLUME_STORAGE_KEY, String(clamped));
    } catch {
      // The level will not persist. Harmless.
    }
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((wasMuted) => {
      const player = playerRef.current;
      if (usable(player)) player.setVolume(wasMuted ? volume : 0);
      return !wasMuted;
    });
  }, [volume]);

  const toggleShuffle = useCallback(() => {
    setShuffle((on) => {
      const player = playerRef.current;
      if (usable(player)) player.setShuffle(!on);
      return !on;
    });
  }, []);

  const stop = useCallback(() => {
    if (usable(playerRef.current)) playerRef.current.destroy();
    playerRef.current = null;
    host?.replaceChildren();
    setStation(null);
    setPlaying(false);
    setBuffering(false);
    setReady(false);
    setTitle("");
    setElapsed(0);
    setDuration(0);
    setIndex(0);
    setVideoId("");
    setError(null);
  }, [host]);

  /* Uploads are titled however their uploader felt that day, and a bar
     reading "C418 - Subwoofer Lullaby - Minecraft Volume Alpha" says the same
     thing three times. Where the station has its own name for the song, use
     that, and keep YouTube's for anything played from a real playlist. */
  const track =
    station?.tracks.find((candidate) => candidate.id === videoId) ?? null;

  const value: Music = {
    station,
    ready,
    playing,
    buffering,
    title: track?.title || title || station?.name || "",
    track,
    elapsed,
    duration,
    shuffle,
    volume,
    muted,
    error,
    isMix,
    index,
    videoId,
    attachMount,
    select,
    playAt,
    toggle,
    next,
    previous,
    seek,
    changeVolume,
    toggleMute,
    toggleShuffle,
    stop,
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

/** `3:07`, or `1:14:15` once a recording runs past the hour. */
export function clock(seconds: number): string {
  const safe = Number.isFinite(seconds) && seconds > 0 ? Math.floor(seconds) : 0;
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const rest = safe % 60;
  const tail = `${String(minutes).padStart(hours > 0 ? 2 : 1, "0")}:${String(rest).padStart(2, "0")}`;
  return hours > 0 ? `${hours}:${tail}` : tail;
}
