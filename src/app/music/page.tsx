import type { Metadata } from "next";

import { StationPicker } from "@/components/StationPicker";
import { Container, PageHeader, SectionHeading } from "@/components/ui";
import { STATIONS } from "@/lib/stations";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Background music to read to, playing from YouTube while you move around the site.",
};

export default function MusicPage() {
  return (
    <Container>
      <PageHeader
        title="Music"
        lead="Three stations to read to. Whichever you pick keeps playing while you move around the site, and the controls stay at the bottom of the page."
      />

      <StationPicker stations={STATIONS} />

      <div className="mt-12 border-t border-[var(--border)] pt-8">
        <SectionHeading>How this works</SectionHeading>
        <div className="mt-3 max-w-[62ch] space-y-3 font-serif text-[15.5px] leading-[1.65] text-[var(--text-muted)]">
          <p>
            No audio is hosted here. A station is either a list of songs on
            YouTube or one long recording, played through YouTube&rsquo;s own
            embed, which is the small tile on the left of the player bar. The
            buttons on the bar drive that embed.
          </p>
          <p>
            Where a station lists its songs, clicking one starts there. If a
            song has had embedding turned off by whoever uploaded it, the
            station steps over it rather than stopping.
          </p>
          <p>
            Nothing is stored about what you listen to, and no account is
            involved. If the player never appears, an extension is probably
            blocking the embed.
          </p>
        </div>
      </div>
    </Container>
  );
}
