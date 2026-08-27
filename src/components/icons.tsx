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

/* ---- Subject icons ---- */

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

/* ---- Reference icons ---- */

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

/* ---- UI icons ---- */

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

/* ---- Player icons ---- */

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

export const SUBJECT_ICONS: Record<
  string,
  ((p: IconProps) => React.ReactElement) | undefined
> = {
  metaphysics: IconMetaphysics,
  epistemology: IconEpistemology,
  logic: IconLogic,
  ethics: IconEthics,
  "philosophy-of-mind": IconMind,
  ontology: IconOntology,
  "political-philosophy": IconPolitics,
  "applied-ethics": IconAppliedEthics,
  theism: IconTheism,
};
