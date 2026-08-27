import type { Track } from "@/lib/stations";

/* ------------------------------------------------------------------ *
 * The anime station.
 *
 * The first block is the list Josh sent, in the order he sent it. The
 * second is the additions: openings that turn up on most lists of this
 * kind and were not already in the first block.
 *
 * Every id was resolved against YouTube search and then confirmed
 * through YouTube's oEmbed endpoint, so each one is a real video whose
 * title and channel are what they are listed as here. Fan re-uploads,
 * lyric videos, covers, and live cuts were dropped rather than guessed
 * at. A handful of the original list had no clean official upload and
 * is not here: Ochame Kinou, BIRDBRAIN, Judgement, Aa-ssu!, Sinking
 * Town, the Samuel Kim Jolyne arrangement, Oddloop, Kura Kura, and
 * Aishite Aishite Aishite.
 *
 * The series in the third field is only filled in where it is settled.
 * Songs that were never an opening or an ending leave it empty.
 * ------------------------------------------------------------------ */

export const ANIME_TRACKS: Track[] = [
  // The list as sent.
  { id: "BC4zaaiXNMI", title: "Love Dramatic", artist: "Masayuki Suzuki", from: "Kaguya-sama: Love Is War" },
  { id: "LFoyXEFaz2Q", title: "Absolute Zero", artist: "natori", from: "" },
  { id: "H08YWE4CIFQ", title: "Overdose", artist: "natori", from: "" },
  { id: "OIBODIPC_8Y", title: "Yuusha", artist: "YOASOBI", from: "Frieren" },
  { id: "dy90tA3TT1c", title: "Kaibutsu", artist: "YOASOBI", from: "Beastars" },
  { id: "oDba5-eFQJE", title: "chase", artist: "batta", from: "JoJo: Diamond Is Unbreakable" },
  { id: "8QPyFlJNmus", title: "Shinzou wo Sasageyo!", artist: "Linked Horizon", from: "Attack on Titan" },
  { id: "fWRrWnvbMaw", title: "Red Swan", artist: "YOSHIKI feat. HYDE", from: "Attack on Titan" },
  { id: "N4F3bjlL_H4", title: "Akuma no Ko", artist: "Ai Higuchi", from: "Attack on Titan" },
  { id: "2Od7QCsyqkE", title: "DADDY! DADDY! DO!", artist: "Masayuki Suzuki feat. Airi Suzuki", from: "Kaguya-sama: Love Is War" },
  { id: "vptdHEUZN10", title: "GIRI GIRI", artist: "Masayuki Suzuki feat. Su", from: "Kaguya-sama: Love Is War" },
  { id: "Lfe0kHMBbpQ", title: "Love is Show", artist: "Masayuki Suzuki feat. Reni Takagi", from: "Kaguya-sama: Love Is War" },
  { id: "M2cckDmNLMI", title: "KICK BACK", artist: "Kenshi Yonezu", from: "Chainsaw Man" },
  { id: "kagoEGKHZvU", title: "NIGHT DANCER", artist: "imase", from: "" },
  { id: "wfCcs0vLysk", title: "Inferno", artist: "Mrs. GREEN APPLE", from: "Fire Force" },
  { id: "IKHGAuNaGuA", title: "Fiction", artist: "sumika", from: "Wotakoi" },
  { id: "O1bhZgkC4Gw", title: "Cry Baby", artist: "Official HIGE DANdism", from: "Tokyo Revengers" },
  { id: "3eytpBOkOFA", title: "Shukufuku", artist: "YOASOBI", from: "The Witch from Mercury" },
  { id: "jJzw1h5CR-I", title: "Dramaturgy", artist: "Eve", from: "" },
  { id: "dlFA0Zq1k2A", title: "Silhouette", artist: "KANA-BOON", from: "Naruto Shippuden" },
  { id: "0opyaQPK6bY", title: "Fatal", artist: "GEMN", from: "Oshi no Ko" },
  { id: "LXHA0Sv-qHM", title: "UN-APEX", artist: "TK from Ling Tosite Sigure", from: "Solo Leveling" },
  { id: "goXKlOozyx8", title: "Boku no Sensou", artist: "Shinsei Kamattechan", from: "Attack on Titan" },
  { id: "OBqw818mQ1E", title: "The Rumbling", artist: "SiM", from: "Attack on Titan" },
  { id: "C5yc0FPP7po", title: "STRAIGHT BET", artist: "MYTH & ROID", from: "" },
  { id: "E9Dru15yq9w", title: "Shikisai", artist: "yama", from: "Spy x Family" },
  { id: "tIhL2KHVdgE", title: "STYX HELIX", artist: "MYTH & ROID", from: "Re:Zero" },
  { id: "AE4b9jO1uB4", title: "GO!!!", artist: "FLOW", from: "Naruto" },
  { id: "FT0GKCuSaW0", title: "Hadaka no Yuusha", artist: "Vaundy", from: "Ranking of Kings" },
  { id: "1tk1pqwrOys", title: "Kaikai Kitan", artist: "Eve", from: "Jujutsu Kaisen" },
  { id: "Yd8kUoB72xU", title: "Seishun Complex", artist: "Kessoku Band", from: "Bocchi the Rock!" },
  { id: "8RSfSxkN0ek", title: "Black Rover", artist: "Vickeblanka", from: "Black Clover" },
  { id: "hP6VM6YAMIE", title: "Black Catcher", artist: "Vickeblanka", from: "Black Clover" },
  { id: "zJRZ9ybACB4", title: "Song of the Dead", artist: "KANA-BOON", from: "Zom 100" },
  { id: "K5bm_ER9CKw", title: "Paradisus-Paradoxum", artist: "MYTH & ROID", from: "Re:Zero" },
  { id: "aFPGhSkx7eA", title: "99", artist: "MOB CHOIR", from: "Mob Psycho 100" },
  { id: "S2IOrt-n2fc", title: "again", artist: "YUI", from: "Fullmetal Alchemist: Brotherhood" },
  { id: "i0K40f-6mLs", title: "Ao no Sumika", artist: "Tatsuya Kitani", from: "Jujutsu Kaisen" },
  { id: "Yo83M-KOc7k", title: "Mephisto", artist: "Queen Bee", from: "Oshi no Ko" },
  { id: "Isb7Q4jEA04", title: "Polaris", artist: "BLUE ENCOUNT", from: "My Hero Academia" },
  { id: "0YF8vecQWYs", title: "Kawaki wo Ameku", artist: "Minami", from: "Domestic Girlfriend" },
  { id: "D7MMMNTQ7H0", title: "the WORLD", artist: "NIGHTMARE", from: "Death Note" },
  { id: "ejzfqXA-bYY", title: "Chaos ga Kiwamaru", artist: "UNISON SQUARE GARDEN", from: "Bleach: Thousand-Year Blood War" },
  { id: "U0TXIXTzJEY", title: "il vento d'oro", artist: "Yugo Kanno", from: "JoJo: Golden Wind" },
  { id: "Qp3b-RXtz4w", title: "Usseewa", artist: "Ado", from: "" },
  { id: "ba8XoFqIJVY", title: "DOGLAND", artist: "PEOPLE 1", from: "" },
  { id: "zz2a9Q2Wru0", title: "AIZO", artist: "King Gnu", from: "" },
  { id: "gNg2Qw5R-Q4", title: "Serenade", artist: "natori", from: "" },
  { id: "hQ4-H-nNNz4", title: "TEST ME", artist: "CHANMINA", from: "" },
  { id: "c7E-tgmFuzw", title: "POP IN 2", artist: "B Komachi", from: "Oshi no Ko" },

  // Added on.
  { id: "KpsJWFuVTdI", title: "Blue Bird", artist: "Ikimonogakari", from: "Naruto Shippuden" },
  { id: "P1yJ51DH-18", title: "DIVER", artist: "NICO Touches the Walls", from: "Naruto Shippuden" },
  { id: "qpi9YXaChHI", title: "Sign", artist: "FLOW", from: "Naruto Shippuden" },
  { id: "Fve_lHIPa-I", title: "unravel", artist: "TK from Ling Tosite Sigure", from: "Tokyo Ghoul" },
  { id: "f4D0lY6A3nU", title: "katharsis", artist: "TK from Ling Tosite Sigure", from: "Tokyo Ghoul:re" },
  { id: "ZB9UvUJL_lE", title: "Asphyxia", artist: "Cö shu Nie", from: "Tokyo Ghoul:re" },
  { id: "x1FV6IrjZCY", title: "Gurenge", artist: "LiSA", from: "Demon Slayer" },
  { id: "4DxL6IKmXx4", title: "Homura", artist: "LiSA", from: "Demon Slayer: Mugen Train" },
  { id: "yGcm81aaTHg", title: "Akeboshi", artist: "LiSA", from: "Demon Slayer" },
  { id: "fhzKLBZJC3w", title: "SPECIALZ", artist: "King Gnu", from: "Jujutsu Kaisen" },
  { id: "2B6nj38AdD0", title: "Guren no Yumiya", artist: "Linked Horizon", from: "Attack on Titan" },
  { id: "W8UNLOOogU4", title: "Jiyuu no Tsubasa", artist: "Linked Horizon", from: "Attack on Titan" },
  { id: "r7n-L5B0bBw", title: "We Are!", artist: "Hiroshi Kitadani", from: "One Piece" },
  { id: "2AfIQX8YUVw", title: "Share The World", artist: "TVXQ", from: "One Piece" },
  { id: "o6wtDPVkKqI", title: "A Cruel Angel's Thesis", artist: "Yoko Takahashi", from: "Neon Genesis Evangelion" },
  { id: "jmKRgqWGrWc", title: "Beautiful World", artist: "Utada Hikaru", from: "Rebuild of Evangelion" },
  { id: "d75ov4HvRrM", title: "Tank!", artist: "Yoko Kanno & the Seatbelts", from: "Cowboy Bebop" },
  { id: "0iAF8TJAqp4", title: "Golden Time Lover", artist: "Sukima Switch", from: "Fullmetal Alchemist: Brotherhood" },
  { id: "9aJVr5tTTWk", title: "Peace Sign", artist: "Kenshi Yonezu", from: "My Hero Academia" },
  { id: "Th7MAZYFIMc", title: "THE DAY", artist: "Porno Graffitti", from: "My Hero Academia" },
  { id: "QbwE7OhmkYc", title: "Imagination", artist: "SPYAIR", from: "Haikyu!!" },
  { id: "CbH2F0kXgTY", title: "Mixed Nuts", artist: "Official HIGE DANdism", from: "Spy x Family" },
  { id: "ZRtdQ81jPUQ", title: "Idol", artist: "YOASOBI", from: "Oshi no Ko" },
  { id: "fhgwSyRmAb8", title: "Alumina", artist: "NIGHTMARE", from: "Death Note" },
  { id: "MS7qWGeOTfY", title: "Asterisk", artist: "ORANGE RANGE", from: "Bleach" },
  { id: "FUH9S44D1BM", title: "COLORS", artist: "FLOW", from: "Code Geass" },
  { id: "3TADlbgAXHY", title: "Hacking to the Gate", artist: "Kanako Ito", from: "Steins;Gate" },
  { id: "DOKM9QWJG3g", title: "abnormalize", artist: "Ling Tosite Sigure", from: "Psycho-Pass" },
  { id: "sCxyiE1pI0k", title: "Snow Fairy", artist: "FUNKIST", from: "Fairy Tail" },
  { id: "Jsc6bPHe4tM", title: "LEveL", artist: "SawanoHiroyuki[nZk] : TOMORROW X TOGETHER", from: "Solo Leveling" },
  { id: "5DjFpPSuGR0", title: "MUKANJYO", artist: "Survive Said The Prophet", from: "Vinland Saga" },
  { id: "tRwHpyOq4P4", title: "Otonoke", artist: "Creepy Nuts", from: "Dandadan" },
  { id: "r105CzDvoo0", title: "Anytime Anywhere", artist: "milet", from: "Frieren" },
  { id: "KId6eunoiWk", title: "crossing field", artist: "LiSA", from: "Sword Art Online" },
  { id: "J69oCCM1EcI", title: "Goya no Machiawase", artist: "Hello Sleepwalkers", from: "Noragami" },
  { id: "XY3RhMPMWAk", title: "Sirius", artist: "Eir Aoi", from: "Kill la Kill" },
  { id: "7EuTPTVpuNI", title: "Connect", artist: "ClariS", from: "Puella Magi Madoka Magica" },
  { id: "lFLMh-nIgZs", title: "fantastic dreamer", artist: "Machico", from: "KonoSuba" },
  { id: "osWXbe7MbGE", title: "Hyadain no Kakakata Kataomoi-C", artist: "Hyadain", from: "Nichijou" },
  { id: "Qtc6tfdu8c4", title: "Megumeru", artist: "riya", from: "Clannad" },
  { id: "ylPEBnmRRxQ", title: "Pre-Parade", artist: "Toradora! cast", from: "Toradora!" },
  { id: "HY1rLlmrilI", title: "pray", artist: "Tommy heavenly6", from: "Gintama" },
];
