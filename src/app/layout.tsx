import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";

import "katex/dist/katex.min.css";
import "./globals.css";

import { AppShell } from "@/components/AppShell";
import { themeScript } from "@/components/theme";
import { buildNavData } from "@/lib/nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const DESCRIPTION =
  "Structured philosophy curricula, from absolute beginner to graduate level. Free, no account needed.";

export const metadata: Metadata = {
  /* Without this, the generated og:image and canonical tags stay relative and
     every scraper that reads them resolves against its own host. */
  metadataBase: new URL("https://philolarps.com"),
  title: {
    default: "Philolarps",
    template: "%s · Philolarps",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Philolarps",
    title: "Philolarps",
    description: DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Philolarps",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const nav = buildNavData();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sourceSerif.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <AppShell nav={nav}>{children}</AppShell>
      </body>
    </html>
  );
}
