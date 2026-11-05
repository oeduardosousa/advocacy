/**
 * The 96px circular seal: a placeholder mark for the fictional firm (DESIGN.md Shapes).
 * Decorative. `onInk` swaps to Oxblood on Ink, the only oxblood allowed on dark.
 */
export function Seal({ onInk = false }: { onInk?: boolean }) {
  const fill = onInk ? "var(--color-oxblood-on-ink)" : "var(--color-oxblood)";
  const mark = onInk ? "var(--color-ink)" : "var(--color-paper)";
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
      <circle cx="48" cy="48" r="48" fill={fill} />
      <circle cx="48" cy="48" r="41" fill="none" stroke={mark} strokeWidth="1" />
      <text
        x="48"
        y="57"
        textAnchor="middle"
        fontFamily="var(--font-newsreader), Georgia, serif"
        fontSize="30"
        fill={mark}
      >
        E·D
      </text>
    </svg>
  );
}
