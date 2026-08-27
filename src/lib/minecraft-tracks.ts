import type { Track } from "@/lib/stations";

/* ------------------------------------------------------------------ *
 * The Minecraft station.
 *
 * The tracklist Josh sent, in his order. Every id was resolved against
 * YouTube search and then confirmed through oEmbed, so each one is a
 * real video titled the way it is listed here.
 *
 * Where the recording sits on an official artist channel the composer
 * is taken from that channel. Daniel Rosenfeld and C418 are the same
 * person, and the C418 name is used throughout because that is what the
 * albums are credited to. Volume Alpha and Volume Beta are only named
 * where the upload itself names them.
 *
 * Two of the requested tracks had no upload that was a single song
 * rather than an hours-long compilation, so they are not here:
 * Minecraft, and O's Piano.
 * ------------------------------------------------------------------ */

export const MINECRAFT_TRACKS: Track[] = [
  { id: "Gpd85y_iTxY", title: "Subwoofer Lullaby", artist: "C418", from: "Volume Alpha" },
  { id: "WmYTrtu-25A", title: "Shuniji", artist: "C418", from: "" },
  { id: "mukiMaOSLEs", title: "Wet Hands", artist: "C418", from: "Volume Alpha" },
  { id: "VSuIdgr66ho", title: "An Ordinary Day", artist: "Kumi Tanioka", from: "" },
  { id: "Uu3dshFseaU", title: "Echo in the Wind", artist: "Aaron Cherof", from: "" },
  { id: "8ravZ03m55A", title: "pokopoko", artist: "Kumi Tanioka", from: "" },
  { id: "GNsXUj7My5E", title: "Warmth", artist: "C418", from: "" },
  { id: "UhWjWdlnmEw", title: "Clark", artist: "C418", from: "Volume Alpha" },
  { id: "j1Z_Ihkluek", title: "Floating Trees", artist: "C418", from: "Volume Beta" },
  { id: "Y9menjGA86s", title: "komorebi", artist: "Kumi Tanioka", from: "" },
  { id: "4aNsK9aks0U", title: "yakusoku", artist: "Kumi Tanioka", from: "" },
  { id: "SznnVAnkv3c", title: "Danny", artist: "C418", from: "Volume Alpha" },
  { id: "lMRziQRmYLI", title: "Beginning", artist: "C418", from: "Volume Alpha" },
  { id: "hb5TsZcAiJQ", title: "Left to Bloom", artist: "Lena Raine", from: "" },
  { id: "y-f8pEX1Q1M", title: "Infinite Amethyst", artist: "Lena Raine", from: "" },
  { id: "atgjKEgSqSU", title: "Aria Math", artist: "C418", from: "Volume Beta" },
  { id: "laZusNy8QiY", title: "Haggstrom", artist: "C418", from: "Volume Alpha" },
  { id: "2vRBjHY7ReE", title: "Beginning 2", artist: "C418", from: "Volume Beta" },
  { id: "rbIGUF9QmXg", title: "Dreiton", artist: "C418", from: "Volume Beta" },
  { id: "C8df2pbOX6g", title: "Moog City 2", artist: "C418", from: "Volume Beta" },
  { id: "NPzukBv7w2w", title: "Below and Above", artist: "Minecraft", from: "" },
  { id: "CcAV71mXg_8", title: "Watcher", artist: "Aaron Cherof", from: "" },
  { id: "URr3lmSj9g4", title: "Lilypad", artist: "Minecraft", from: "" },
  { id: "FMJoOTOBcwE", title: "Aerie", artist: "Lena Raine", from: "" },
  { id: "bDIsDGxeg9c", title: "Broken Clocks", artist: "Minecraft", from: "" },
  { id: "SLS9tUa2GXI", title: "Featherfall", artist: "Aaron Cherof", from: "" },
  { id: "RxHgq2w-RsY", title: "Dragon Fish", artist: "C418", from: "" },
  { id: "aBkTkxKDduc", title: "Sweden", artist: "C418", from: "Volume Alpha" },
  { id: "8sglGXAfHLc", title: "Biome Fest", artist: "C418", from: "Volume Beta" },
  { id: "-CKR-McWeYk", title: "Key", artist: "C418", from: "" },
  { id: "DZ47H84Bc_Q", title: "Mice on Venus", artist: "C418", from: "Volume Alpha" },
  { id: "77Fv8gtZyuA", title: "Blind Spots", artist: "C418", from: "Volume Beta" },
  { id: "oGxQNQtnr6Q", title: "Living Mice", artist: "C418", from: "Volume Alpha" },
  { id: "4i0d6CPLSGo", title: "Dry Hands", artist: "C418", from: "Volume Alpha" },
  { id: "ao8U6D_F3dE", title: "Haunt Muskie", artist: "C418", from: "Volume Beta" },
  { id: "ec9dLqGOcg0", title: "A Familiar Room", artist: "Aaron Cherof", from: "" },
  { id: "f-y4SusrNeU", title: "Axolotl", artist: "C418", from: "" },
  { id: "dx_rYqJ5hNQ", title: "Excuse", artist: "C418", from: "Volume Alpha" },
  { id: "TRY0tH78Tjk", title: "Endless", artist: "Lena Raine", from: "" },
  { id: "VkynjYWG9ac", title: "Équinoxe", artist: "C418", from: "" },
  { id: "Mj6jF7I2s10", title: "Taswell", artist: "C418", from: "Volume Beta" },
];
