import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconMetaphysics(p: IconProps) {
  return (
    <Base {...p}>
      <circle cx="12" cy="12" r="3" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4.2" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4.2" transform="rotate(60 12 12)" />
    </Base>
  );
}

export function IconEpistemology(p: IconProps) {
  return (
    <Base {...p}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.2 15.2 21 21" />
      <path d="M10.5 7.6v.01M10.5 10v3.4" />
    </Base>
  );
}

export function IconLogic(p: IconProps) {
  return (
    <Base {...p}>
      <circle cx="8.5" cy="12" r="5.5" />
      <circle cx="15.5" cy="12" r="5.5" />
    </Base>
  );
}

export function IconEthics(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M12 4v16M5 20h14" />
      <path d="M4 8h16" />
      <path d="M4 8 1.8 13.2a2.6 2.6 0 0 0 4.4 0Z" />
      <path d="M20 8l-2.2 5.2a2.6 2.6 0 0 0 4.4 0Z" />
    </Base>
  );
}

export function IconMind(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M15.5 20.5v-2.2a4 4 0 0 1 1.3-2.9A7 7 0 1 0 6.4 6.6" />
      <path d="M6.4 6.6A7 7 0 0 0 8.5 18.3v2.2" />
      <path d="M12 9.5v3M9.6 11h4.8" />
    </Base>
  );
}

export function IconOntology(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M12 2.8 21 8v8l-9 5.2L3 16V8Z" />
      <path d="M12 21.2V12M12 12 3 8M12 12l9-4" />
    </Base>
  );
}

export function IconLanguage(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M5 4.5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4.5 3.5v-3.5H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z" />
      <path d="M7.5 9h9M7.5 12.5h6" />
    </Base>
  );
}

export function IconMetalogic(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M6 4H3.5v16H6M18 4h2.5v16H18" />
      <circle cx="9.8" cy="12" r="3.6" />
      <circle cx="14.2" cy="12" r="3.6" />
    </Base>
  );
}

export function IconMetaontology(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M3 7V3h4M17 3h4v4M21 17v4h-4M7 21H3v-4" />
      <path d="M12 6.5 17 9.4v5.2L12 17.5 7 14.6V9.4Z" />
      <path d="M12 17.5V12M12 12 7 9.4M12 12l5-2.6" />
    </Base>
  );
}

export function IconPolitics(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M3 20h18" />
      <path d="M5 20V9.5M9.6 20V9.5M14.4 20V9.5M19 20V9.5" />
      <path d="M2.6 9.5 12 3.4l9.4 6.1Z" />
    </Base>
  );
}

export function IconAppliedEthics(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M4 5.5h9a3 3 0 0 1 3 3V20" />
      <path d="M20 18.5h-9a3 3 0 0 1-3-3V4" />
      <circle cx="4" cy="5.5" r="1.6" />
      <circle cx="20" cy="18.5" r="1.6" />
    </Base>
  );
}

export function IconTheism(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M12 3v18" />
      <path d="M6 8.5h12" />
      <circle cx="12" cy="12" r="9" opacity="0.4" />
    </Base>
  );
}

export function IconGlossary(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M5 4.5h11a2 2 0 0 1 2 2V21H7a2 2 0 0 1-2-2Z" />
      <path d="M5 17.2h13" />
      <path d="M8.6 8.6h6M8.6 12h4" />
    </Base>
  );
}

export function IconThinkers(p: IconProps) {
  return (
    <Base {...p}>
      <circle cx="9" cy="8.5" r="3.4" />
      <path d="M3.2 20a5.8 5.8 0 0 1 11.6 0" />
      <path d="M16.4 5.6a3.4 3.4 0 0 1 0 5.8" />
      <path d="M17.8 14.9A5.8 5.8 0 0 1 20.8 20" />
    </Base>
  );
}

export function IconPaths(p: IconProps) {
  return (
    <Base {...p}>
      <circle cx="6" cy="5.5" r="2.2" />
      <circle cx="18" cy="12" r="2.2" />
      <circle cx="6" cy="18.5" r="2.2" />
      <path d="M6 7.7v2.6a2 2 0 0 0 2 2h7.8" />
      <path d="M18 14.2v.6a2 2 0 0 1-2 2H8.2" />
    </Base>
  );
}

export function IconSearch(p: IconProps) {
  return (
    <Base {...p}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.4 15.4 21 21" />
    </Base>
  );
}

export function IconSun(p: IconProps) {
  return (
    <Base {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.2v2.3M12 19.5v2.3M2.2 12h2.3M19.5 12h2.3M5.1 5.1l1.6 1.6M17.3 17.3l1.6 1.6M18.9 5.1l-1.6 1.6M6.7 17.3l-1.6 1.6" />
    </Base>
  );
}

export function IconMoon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M20.5 14.2A8.6 8.6 0 0 1 9.8 3.5a8.6 8.6 0 1 0 10.7 10.7Z" />
    </Base>
  );
}

export function IconChevron(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M9 5.5 15.5 12 9 18.5" />
    </Base>
  );
}

export function IconArrowRight(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </Base>
  );
}

export function IconArrowLeft(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M19.5 12h-15M10.5 6l-6 6 6 6" />
    </Base>
  );
}

export function IconMenu(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
    </Base>
  );
}

export function IconClose(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Base>
  );
}

export function IconMusic(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M9 17.5V6.1l10-2v11.2" />
      <circle cx="6.4" cy="17.5" r="2.6" />
      <circle cx="16.4" cy="15.3" r="2.6" />
    </Base>
  );
}

export function IconPlay(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M7.5 4.8 18.5 12l-11 7.2Z" fill="currentColor" />
    </Base>
  );
}

export function IconPause(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M9 4.8v14.4M15 4.8v14.4" strokeWidth="2.4" />
    </Base>
  );
}

export function IconNext(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M6 5.4 15 12l-9 6.6Z" fill="currentColor" />
      <path d="M18.4 5.2v13.6" />
    </Base>
  );
}

export function IconPrev(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M18 5.4 9 12l9 6.6Z" fill="currentColor" />
      <path d="M5.6 5.2v13.6" />
    </Base>
  );
}

export function IconShuffle(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M3.4 6.6h2.9a4 4 0 0 1 3.3 1.75l4.1 6.1a4 4 0 0 0 3.3 1.75h2.4" />
      <path d="M3.4 17.4h2.9a4 4 0 0 0 3.3-1.75l.85-1.3" />
      <path d="M13.7 8.35l.75-1.1a4 4 0 0 1 3.3-1.75h2.4" />
      <path d="M18.1 3.2 20.9 5.5l-2.8 2.3M18.1 13.9l2.8 2.3-2.8 2.3" />
    </Base>
  );
}

export function IconVolume(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M4 9.4h3.3L11.6 5.8v12.4L7.3 14.6H4Z" />
      <path d="M15 9.6a3.4 3.4 0 0 1 0 4.8" />
      <path d="M17.6 7a7 7 0 0 1 0 10" />
    </Base>
  );
}

export function IconVolumeOff(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M4 9.4h3.3L11.6 5.8v12.4L7.3 14.6H4Z" />
      <path d="M15.4 9.8 20 14.4M20 9.8l-4.6 4.6" />
    </Base>
  );
}

export function IconRoute(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M4 6.5h9.5a3.5 3.5 0 0 1 0 7H8a3.5 3.5 0 0 0 0 7h12" />
      <circle cx="4" cy="6.5" r="1.8" />
      <path d="M17.5 18.2 20 20.5 17.5 22.8" />
    </Base>
  );
}

export function IconCompass(p: IconProps) {
  return (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.4 8.6-2 4.8-4.8 2 2-4.8Z" />
    </Base>
  );
}

export function IconCheck(p: IconProps) {
  return (
    <Base {...p}>
      <path d="m4.5 12.5 5 5 10-11" strokeWidth="2.2" />
    </Base>
  );
}

export function IconQuiz(p: IconProps) {
  return (
    <Base {...p}>
      <rect x="4" y="3.5" width="16" height="17" rx="3.5" />
      <path d="M9.7 9.4a2.4 2.4 0 1 1 3.2 2.2c-.6.3-.9.8-.9 1.4v.5" />
      <path d="M12 16.4v.01" />
    </Base>
  );
}

export function IconFlame(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.4 2.6-5.3 3.6-8.3.4 1.9 1.4 3 2.5 3.4C11.6 6.6 13 4.4 15.2 3c-.4 2.9.9 4.8 2.1 6.5 1 1.4 1.2 2.6 1.2 4.3 0 4.1-2.6 7.2-6.5 7.2Z" />
      <path d="M12 21c-1.7 0-2.8-1.2-2.8-2.8 0-1.8 1.4-2.6 2-4.2 1.6 1 3.6 2.2 3.6 4.4 0 1.5-1.1 2.6-2.8 2.6Z" />
    </Base>
  );
}

export function IconRetry(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
      <path d="M4.5 4.5v3.8h3.8" />
    </Base>
  );
}

export function IconSpark(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M12 2.5 14.1 9l6.4 2.2-6.4 2.2L12 20l-2.1-6.6L3.5 11.2 9.9 9Z" />
      <path d="M19 3.2v3M17.5 4.7h3" />
    </Base>
  );
}

export const SUBJECT_ICONS: Record<
  string,
  ((p: IconProps) => React.ReactElement) | undefined
> = {
  metaphysics: IconMetaphysics,
  epistemology: IconEpistemology,
  logic: IconLogic,
  "philosophy-of-language": IconLanguage,
  metalogic: IconMetalogic,
  ethics: IconEthics,
  "philosophy-of-mind": IconMind,
  ontology: IconOntology,
  metaontology: IconMetaontology,
  "political-philosophy": IconPolitics,
  "applied-ethics": IconAppliedEthics,
  theism: IconTheism,
};

const GLYPH_SIZES = {
  sm: { tile: 25, icon: 15, radius: 7 },
  md: { tile: 32, icon: 18, radius: 9 },
  lg: { tile: 40, icon: 22, radius: 11 },
} as const;

export function SubjectGlyph({
  slug,
  size = "sm",
  onDark = false,
  className = "",
}: {
  slug: string;
  size?: keyof typeof GLYPH_SIZES;
  onDark?: boolean;
  className?: string;
}) {
  const Icon = SUBJECT_ICONS[slug] ?? IconGlossary;
  const { tile, icon, radius } = GLYPH_SIZES[size];

  const hue = `var(--subject-${slug}${onDark ? "-lift" : ""}, var(--accent))`;

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{
        width: tile,
        height: tile,
        borderRadius: radius,
        color: hue,
        background: `color-mix(in srgb, ${hue} ${onDark ? 20 : 13}%, transparent)`,
      }}
    >
      <Icon style={{ width: icon, height: icon }} />
    </span>
  );
}
