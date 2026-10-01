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

const MAX_SKIPS = 8;

let apiPromise: Promise<YTNamespace> | null = null;

function loadApi(): Promise<YTNamespace> {
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<YTNamespace>((resolve, reject) => {
    const w = window as ApiWindow;
    if (w.YT?.Player) {
      resolve(w.YT);
      return;
    }

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

function usable(player: YTPlayer | null): player is YTPlayer {
  return typeof player?.getCurrentTime === "function";
}

const VOLUME_STORAGE_KEY = "philolarps-volume";
const DEFAULT_VOLUME = 60;

function storedVolume(): number {
  if (typeof window === "undefined") return DEFAULT_VOLUME;
  try {
    const stored = Number(localStorage.getItem(VOLUME_STORAGE_KEY));
    if (Number.isFinite(stored) && stored >= 0 && stored <= 100) return stored;
  } catch {
  }
  return DEFAULT_VOLUME;
}

type Music = {
  station: Station | null;
  ready: boolean;
  playing: boolean;
  buffering: boolean;
  title: string;
  track: Track | null;
  elapsed: number;
  duration: number;
  shuffle: boolean;
  volume: number;
  muted: boolean;
  error: string | null;
  isMix: boolean;
  index: number;
  videoId: string;
  attachMount: (node: HTMLDivElement | null) => void;
  select: (station: Station) => void;
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

  const [host, setHost] = useState<HTMLDivElement | null>(null);
  const attachMount = useCallback((node: HTMLDivElement | null) => {
    setHost(node);
  }, []);

  const playerRef = useRef<YTPlayer | null>(null);
  const startIndexRef = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    if (station) root.style.setProperty("--player-height", "66px");
    else root.style.removeProperty("--player-height");
    return () => {
      root.style.removeProperty("--player-height");
    };
  }, [station]);

  useEffect(() => {
    const source = station?.source;
    if (!source || !host) return;

    if (usable(playerRef.current)) playerRef.current.destroy();
    playerRef.current = null;
    host.replaceChildren();

    let cancelled = false;
    let skips = 0;
    const target = document.createElement("div");
    host.appendChild(target);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [station, host]);

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

export function clock(seconds: number): string {
  const safe = Number.isFinite(seconds) && seconds > 0 ? Math.floor(seconds) : 0;
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const rest = safe % 60;
  const tail = `${String(minutes).padStart(hours > 0 ? 2 : 1, "0")}:${String(rest).padStart(2, "0")}`;
  return hours > 0 ? `${hours}:${tail}` : tail;
}
