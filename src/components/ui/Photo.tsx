import { Img } from "@/components/ui/Img";

/**
 * Framed photograph with the "paper cover" reveal and optional parallax (DESIGN.md).
 * Server component: the motion is attached by HomeMotion through data attributes.
 *   [data-image-reveal]  frame, the reveal trigger
 *   [data-parallax]      wrapper that overscans the frame by 8% and travels inside it
 *   [data-image-settle]  scales 1.15 -> 1 while the cover slides off
 *   [data-image-cover]   Paper Deep layer, scaleY 1 -> 0 (hidden without motion)
 */
export function Photo({
  src,
  alt,
  ratio = "aspect-[3/2]",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  parallax = false,
  className = "",
  hoverZoom = false,
  priority = false,
}: {
  src: string;
  alt: string;
  ratio?: string;
  sizes?: string;
  parallax?: boolean;
  className?: string;
  hoverZoom?: boolean;
  /** LCP image: eager + high fetch priority + preload. */
  priority?: boolean;
}) {
  return (
    <div data-image-reveal className={`relative overflow-hidden bg-paper-deep ${ratio} ${className}`}>
      <div
        data-parallax={parallax ? "" : undefined}
        className={parallax ? "absolute inset-x-0 -top-[8%] h-[116%]" : "absolute inset-0"}
      >
        <div data-image-settle className="absolute inset-0">
          <Img
            name={src}
            alt={alt}
            sizes={sizes}
            priority={priority}
            className={`object-cover ${hoverZoom ? "transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]" : ""}`}
          />
        </div>
      </div>
      <div data-image-cover aria-hidden="true" className="img-cover absolute inset-0 bg-paper-deep" />
    </div>
  );
}
