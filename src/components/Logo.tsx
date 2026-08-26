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

const MARK_W = 106;
const MARK_H = 145;
const WORD_W = 127;
const WORD_H = 46;

/* Lockup geometry, solved against the alpha channel of the two PNGs rather than
   eyeballed.

   Two constraints fight each other. The word has to tuck into the notch the
   blade leaves under the bowl, or the lockup reads as "P hilolarps" in two
   pieces instead of one word. And the blade should finish on the word's
   baseline, or the P floats above the word with its sword cut short.

   The artwork decides how those reconcile. Rotated -6deg, the bowl fills the
   mark down to 78% of its height; only below that is the blade narrow enough to
   tuck against. So the word must fit in the bottom 22%, which fixes the ratio
   between the two: blade tip on the baseline needs MARK_H >= WORD_H / 0.22.

   At the word's previous 53px that wanted a 209px lockup, and the sidebar's
   padding leaves 200. Hence WORD_H 46: the word gives up a few pixels to buy
   the descender, and the P roughly doubles. WORD_Y 99 puts the word's baseline
   on row 145, which is exactly where the blade tip lands. WORD_X 55 parks the
   "h" 5px off the blade on the tightest row.

   MARK_X exists because the crossguard overhangs the artwork's own left edge by
   2px once rotated; the offset keeps the lockup flush with the sidebar padding.
   That padding leaves 200px, which is what caps WORD_X + WORD_W at 182. */
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
