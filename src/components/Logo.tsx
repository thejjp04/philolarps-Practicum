import Image from "next/image";

/**
 * The Philolarps mark: a capital P whose stem is a sword, plus the
 * "hilolarps" wordmark, so the lockup reads as one word.
 *
 * Both are the supplied artwork, converted to PNG with the white page keyed
 * out, not a redrawing. Do not substitute an SVG approximation.
 *
 * Source ratios: mark 631x860, wordmark 1284x466.
 */

const MARK_W = 56;
const MARK_H = 76;
const WORD_W = 145;
const WORD_H = 53;

/* Lockup geometry, measured against the alpha channel of the two PNGs rather
   than eyeballed.

   Rotated -6deg about its centre, the mark's right edge tapers from x=56 at
   y=38 down to x=34 at y=52, and below that only the bare blade is left,
   holding x≈26-27 all the way to y=76. The wordmark's "h" begins in its first
   opaque column, so the word's left edge is what has to clear the blade.

   Dropping the word to y=52 puts its top row past the bowl's taper, which frees
   it to move left into the notch the blade leaves under the bowl. WORD_X 31
   parks the "h" 4px off the blade on the tightest row, so the mark reads as the
   P of one word instead of a separate glyph sitting next to it. An earlier
   pairing (42, 50) cleared the blade by 15px and read as two pieces.

   MARK_X exists because the crossguard overhangs the artwork's own left edge by
   2px once rotated; the offset keeps the lockup flush with the sidebar padding.
   That padding leaves 200px, which is what caps WORD_X + WORD_W. */
const MARK_X = 2;
const WORD_X = 31;
const WORD_Y = 52;
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

/**
 * Full lockup for the sidebar: the mark, with the wordmark tucked under the
 * bowl of the P. No tagline.
 */
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
      {/* Sits under the round part of the P, starting past the stem so the two
          read as a single word rather than a stacked lockup. */}
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
