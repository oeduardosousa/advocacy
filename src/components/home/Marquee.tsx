import { getAreas } from "@/lib/content";

/**
 * Endless band of practice-area names. Static and wrapped when motion is off; with motion,
 * Ambient drives it with GSAP and speeds it up with the scroll velocity (data-marquee).
 */
export function Marquee() {
  const names = getAreas().map((area) => area.name);
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="marquee-row flex shrink-0 items-center gap-x-10 pr-10"
    >
      {names.map((name) => (
        <li key={name} className="flex items-center gap-x-10 whitespace-nowrap">
          <span className="font-serif text-[clamp(2rem,5vw,4.5rem)] italic leading-none">{name}</span>
          <span aria-hidden="true" className="text-oxblood">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Áreas de atuação" className="relative z-10 overflow-hidden border-y border-rule bg-paper py-8 text-ink">
      <div data-marquee className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
