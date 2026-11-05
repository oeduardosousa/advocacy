import type { SVGProps } from "react";

/** Lucide-style icons, 1.5px stroke, 20px. The only icon set (DESIGN.md Imagery). */
function base(props: SVGProps<SVGSVGElement>) {
  return {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
    ...props,
  };
}

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

/** WhatsApp glyph (speech bubble with handset), drawn at 18px by the button. */
export function WhatsAppGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base({ width: 18, height: 18, ...props })}>
      <path d="M3 21l1.65-4.9A9 9 0 1 1 8 19.4L3 21z" />
      <path
        d="M9.2 8.6c0 3.2 2.9 6.1 6.1 6.1l1.1-1.5-2-1-.9.8a3.6 3.6 0 0 1-1.9-1.9l.8-.9-1-2-1.5 1.1z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function Plus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function Minus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14" />
    </svg>
  );
}
