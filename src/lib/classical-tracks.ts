import type { Track } from "@/lib/stations";

/* ------------------------------------------------------------------ *
 * The classical station.
 *
 * Every id here was resolved against YouTube and confirmed through its
 * oEmbed endpoint, so each one is a recording that exists and is titled
 * the way it is listed. The performer is named only where the recording
 * itself names one.
 *
 * The selection rule is narrow on purpose. Nothing with words in it,
 * nothing that changes volume sharply, and nothing so familiar that it
 * starts narrating itself while you read. Slow keyboard music and small
 * string ensembles do most of the work.
 * ------------------------------------------------------------------ */

export const CLASSICAL_TRACKS: Track[] = [
  {
    id: "TL0xzp4zzBE",
    title: "Gymnopédie No. 1",
    artist: "Satie",
    from: "Khatia Buniatishvili",
  },
  {
    id: "pD_pq5LhqbA",
    title: "Gnossienne No. 1",
    artist: "Satie",
    from: "Justus Eichhorn",
  },
  {
    id: "c977QdbTImU",
    title: "Clair de Lune",
    artist: "Debussy",
    from: "Pascal Rogé",
  },
  {
    id: "ouYT5OEPfRI",
    title: "Rêverie",
    artist: "Debussy",
    from: "Lang Lang",
  },
  {
    id: "KFgaz7snX5Y",
    title: "Arabesque No. 1",
    artist: "Debussy",
    from: "Inga Fiolia",
  },
  {
    id: "gVah1cr3pU0",
    title: "Prelude No. 1 in C, BWV 846",
    artist: "Bach",
    from: "Lang Lang",
  },
  {
    id: "1prweT95Mo0",
    title: "Cello Suite No. 1, Prélude",
    artist: "Bach",
    from: "Yo-Yo Ma",
  },
  {
    id: "1PkD47rNkfY",
    title: "Air on the G String",
    artist: "Bach",
    from: "",
  },
  {
    id: "yDSxPiFOrEY",
    title: "Nocturne in E-flat, Op. 9 No. 2",
    artist: "Chopin",
    from: "Tiffany Poon",
  },
  {
    id: "DqpPRj6UZqc",
    title: "Nocturne in C-sharp minor, Op. posth.",
    artist: "Chopin",
    from: "Rousseau",
  },
  {
    id: "HVau-JRGirg",
    title: "Prelude Op. 28 No. 15, Raindrop",
    artist: "Chopin",
    from: "Rousseau",
  },
  {
    id: "XQE-b_sVhY8",
    title: "Berceuse in D-flat, Op. 57",
    artist: "Chopin",
    from: "Jayson Gillham",
  },
  {
    id: "kfSnDd5mTsQ",
    title: "Moonlight Sonata, first movement",
    artist: "Beethoven",
    from: "Marnie Laird",
  },
  {
    id: "4xeAsc6m35w",
    title: "Sonata in C, K. 545, Allegro",
    artist: "Mozart",
    from: "Lang Lang",
  },
  {
    id: "SRGLCo1LpoU",
    title: "Impromptu No. 3 in G-flat, D. 899",
    artist: "Schubert",
    from: "",
  },
  {
    id: "doSSutlNfXI",
    title: "Intermezzo in A, Op. 118 No. 2",
    artist: "Brahms",
    from: "",
  },
  {
    id: "ND3j5FNM5BQ",
    title: "Consolation No. 3",
    artist: "Liszt",
    from: "Tiffany Poon",
  },
  {
    id: "zaY3kxkUjcw",
    title: "Träumerei, from Kinderszenen",
    artist: "Schumann",
    from: "Kassia",
  },
  {
    id: "qJhdCBDy4yM",
    title: "Arietta, Op. 12 No. 1",
    artist: "Grieg",
    from: "",
  },
  {
    id: "vs4dh3KBXk4",
    title: "Romance, Op. 24 No. 9",
    artist: "Sibelius",
    from: "",
  },
  {
    id: "2_c8JRCKq1A",
    title: "Pavane pour une infante défunte",
    artist: "Ravel",
    from: "Orchestre national de France",
  },
  {
    id: "wQDoN40-_C4",
    title: "Pavane, Op. 50",
    artist: "Fauré",
    from: "The Young Cracow Philharmonic",
  },
  {
    id: "3qrKjywjo7Q",
    title: "The Swan",
    artist: "Saint-Saëns",
    from: "Yo-Yo Ma",
  },
  {
    id: "nGjaXzVzZlo",
    title: "Méditation from Thaïs",
    artist: "Massenet",
    from: "Frankfurt Radio Symphony",
  },
  {
    id: "mjfYb0gJDkQ",
    title: "Canon in D",
    artist: "Pachelbel",
    from: "Allegro Chamber Orchestra",
  },
  {
    id: "ZPdk5GaIDjo",
    title: "Winter, from The Four Seasons",
    artist: "Vivaldi",
    from: "Voices of Music",
  },
  {
    id: "YiA3TVYaRao",
    title: "Spiegel im Spiegel",
    artist: "Arvo Pärt",
    from: "",
  },
  {
    id: "0R2nT0RBfPE",
    title: "Für Alina",
    artist: "Arvo Pärt",
    from: "Joana Gama",
  },
  {
    id: "8l9Lr9loHG4",
    title: "Metamorphosis One",
    artist: "Philip Glass",
    from: "",
  },
  {
    id: "InyT9Gyoz_o",
    title: "On the Nature of Daylight",
    artist: "Max Richter",
    from: "",
  },
];
