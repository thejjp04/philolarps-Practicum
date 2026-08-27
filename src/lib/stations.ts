import { ANIME_TRACKS } from "@/lib/anime-tracks";
import { CLASSICAL_TRACKS } from "@/lib/classical-tracks";
import { MINECRAFT_TRACKS } from "@/lib/minecraft-tracks";

export type StationSlug = "minecraft" | "classical" | "anime";

/* ------------------------------------------------------------------ *
 * Paste links here. This is the only place they live.
 *
 * Anything YouTube hands you works: a playlist address, a single video
 * address, a youtu.be short link, or the bare id on its own.
 *
 *   https://www.youtube.com/playlist?list=OLAK5uy_...   a playlist
 *   https://www.youtube.com/watch?v=dQw4w9WgXcQ         one video, looped
 *   https://youtu.be/dQw4w9WgXcQ                        the same thing
 *
 * A watch address that carries a `list=` is read as the playlist.
 *
 * A station left empty still appears on the music page. It says it has
 * not been pointed at anything yet and its play button is disabled, so
 * the page never claims more than it can do.
 * ------------------------------------------------------------------ */

export const STATION_LINKS: Record<StationSlug, string> = {
  minecraft: "",
  classical: "",
  anime: "",
};

/** One song in a station built by hand rather than pointed at a playlist. */
export type Track = {
  /** The eleven-character YouTube id. */
  id: string;
  title: string;
  artist: string;
  /** The series it comes from, or an empty string if it is not from one. */
  from: string;
};

export type StationSource =
  | { kind: "playlist"; id: string }
  | { kind: "video"; id: string }
  | { kind: "queue"; ids: string[] };

/* A station built song by song. A link in STATION_LINKS beats this, so
   pasting one in is always enough to take a station over. */
const STATION_TRACKS: Partial<Record<StationSlug, Track[]>> = {
  minecraft: MINECRAFT_TRACKS,
  classical: CLASSICAL_TRACKS,
  anime: ANIME_TRACKS,
};

export type Station = {
  slug: StationSlug;
  name: string;
  /** One line under the station name. Sentence case, no trailing period. */
  blurb: string;
  /** Two or three sentences on what it does to a work session. */
  note: string;
  /** Null means the station has nothing behind it yet. */
  source: StationSource | null;
  /** Empty unless the station was built song by song. */
  tracks: Track[];
};

/** An id that is exactly eleven of YouTube's id characters is a video. */
const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

export function parseSource(input: string): StationSource | null {
  const raw = input.trim();
  if (!raw) return null;

  // A bare id, pasted without the address around it.
  if (!raw.includes("/") && !raw.includes("?") && !raw.includes("=")) {
    return VIDEO_ID.test(raw)
      ? { kind: "video", id: raw }
      : { kind: "playlist", id: raw };
  }

  let url: URL;
  try {
    url = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
  } catch {
    return null;
  }

  const list = url.searchParams.get("list");
  if (list) return { kind: "playlist", id: list };

  const video = url.searchParams.get("v");
  if (video) return { kind: "video", id: video };

  // youtu.be/ID, /embed/ID, /live/ID all end in the id.
  const last = url.pathname.split("/").filter(Boolean).pop();
  return last ? { kind: "video", id: last } : null;
}

const COPY: Omit<Station, "source" | "tracks">[] = [
  {
    slug: "minecraft",
    name: "Minecraft",
    blurb: "Slow, and written to sit under something else",
    note: "The Minecraft soundtrack was written to play behind an activity rather than to be listened to. Long sustained chords with almost nothing percussive under them, and very little that resolves in a way that pulls your head back up from the page.",
  },
  {
    slug: "classical",
    name: "Classical",
    blurb: "Instrumental, and none of it asks for your attention",
    note: "The claim that classical music raises your IQ came from a 1993 experiment on spatial reasoning, and the effect did not survive replication. What does hold up is narrower and more useful: words in music compete with reading for the same part of your attention, and music without words does not.",
  },
  {
    slug: "anime",
    name: "Anime",
    blurb: "Openings and endings, mostly",
    note: "Nearly all of this has words in it, which is the opposite of what the other two stations are for. It suits the walk to your desk and the break afterwards better than the middle of a reading session, so it is here for the part of studying that is not reading.",
  },
];

export const STATIONS: Station[] = COPY.map((station) => {
  const tracks = STATION_TRACKS[station.slug] ?? [];
  const linked = parseSource(STATION_LINKS[station.slug]);
  const source: StationSource | null =
    linked ??
    (tracks.length > 0
      ? { kind: "queue", ids: tracks.map((track) => track.id) }
      : null);
  return { ...station, source, tracks: linked ? [] : tracks };
});

export function getStation(slug: string): Station | undefined {
  return STATIONS.find((station) => station.slug === slug);
}
