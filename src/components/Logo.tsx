import Image from "next/image";

const MARK_W = 106;
const MARK_H = 145;
const WORD_W = 127;
const WORD_H = 46;

const MARK_X = 2;
const WORD_X = 55;
const WORD_Y = 99;
const MARK_TILT = -6;

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo-mark.png"
      alt="Philolarps"
      width={MARK_W}
      height={MARK_H}
      priority
      className={className}
    />
  );
}

export function LogoLockup({ className }: { className?: string }) {
  return (
    <div
      className={`relative select-none ${className ?? ""}`}
      style={{ width: WORD_X + WORD_W, height: WORD_Y + WORD_H }}
      role="img"
      aria-label="Philolarps"
    >
      <Image
        src="/logo-mark.png"
        alt=""
        width={MARK_W}
        height={MARK_H}
        priority
        className="absolute top-0"
        style={{ left: MARK_X, transform: `rotate(${MARK_TILT}deg)` }}
      />
      <Image
        src="/logo-wordmark.png"
        alt=""
        width={WORD_W}
        height={WORD_H}
        priority
        className="absolute"
        style={{ left: WORD_X, top: WORD_Y }}
      />
    </div>
  );
}
