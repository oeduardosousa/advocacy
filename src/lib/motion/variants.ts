/**
 * Headline entrance variants. Only the letters move: the text block, its lines and its
 * position never slide or wipe, they simply stay where they are while the characters arrive.
 * Each page load picks a different variant from the last one (remembered per tab), and
 * section headlines walk through the list starting at a random point.
 * No GSAP import: safe anywhere. Reduced motion never reaches this code.
 */

export type TitleVariant = "cascade" | "blur" | "pop" | "wave" | "type";

export const TITLE_VARIANTS: TitleVariant[] = ["cascade", "blur", "pop", "wave", "type"];

const KEY = "adv-last-variant";

function readLast(): TitleVariant | null {
  try {
    return (sessionStorage.getItem(KEY) as TitleVariant | null) ?? null;
  } catch {
    return null;
  }
}

/** Random variant, never the same as the previous page load in this tab. */
export function pickVariant(): TitleVariant {
  const last = readLast();
  const pool = TITLE_VARIANTS.filter((v) => v !== last);
  const next = pool[Math.floor(Math.random() * pool.length)];
  try {
    sessionStorage.setItem(KEY, next);
  } catch {
    /* storage unavailable: variation still works, just without the no-repeat memory */
  }
  return next;
}

/** Every variant animates characters; lines are kept so wrapping never changes. */
export function splitType(): string {
  return "lines,chars";
}

interface Split {
  lines: Element[];
  chars: Element[];
}


/** Targets and `from` vars for a variant. `k` shortens staggers on the lite tier. */
export function titleTween(
  variant: TitleVariant,
  split: Split,
  k = 1,
): { targets: Element[]; vars: gsap.TweenVars } {
  const chars = split.chars;
  // Whole headline always finishes within ~0.9s, however long it is.
  const each = (base: number) => Math.min(base * k, 0.9 / Math.max(chars.length, 1));

  switch (variant) {
    case "blur":
      return {
        targets: chars,
        vars: { opacity: 0, filter: "blur(14px)", duration: 0.8, stagger: each(0.03) },
      };
    case "pop":
      return {
        targets: chars,
        vars: {
          opacity: 0,
          scale: 0.3,
          transformOrigin: "50% 85%",
          duration: 0.7,
          ease: "back.out(2.2)",
          stagger: each(0.028),
        },
      };
    case "wave":
      return {
        targets: chars,
        vars: {
          opacity: 0,
          y: 44,
          duration: 0.9,
          ease: "elastic.out(1, 0.6)",
          stagger: { each: each(0.03), from: "center" },
        },
      };
    case "type":
      return {
        targets: chars,
        vars: { opacity: 0, duration: 0.01, ease: "none", stagger: each(0.04) },
      };
    case "cascade":
    default:
      return {
        targets: chars,
        vars: { opacity: 0, yPercent: 70, duration: 0.7, stagger: each(0.022) },
      };
  }
}

/** Direction of the paper cover lifting off a photograph. */
export const COVER_DIRECTIONS = [
  { prop: "scaleY", origin: "50% 0%" },
  { prop: "scaleY", origin: "50% 100%" },
  { prop: "scaleX", origin: "0% 50%" },
  { prop: "scaleX", origin: "100% 50%" },
] as const;
