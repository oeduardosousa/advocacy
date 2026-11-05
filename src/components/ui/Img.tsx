import { getImageProps, type ImageProps } from "next/image";

type Props = Omit<ImageProps, "src" | "width" | "height" | "fill" | "loader" | "unoptimized"> & {
  /** Logical image name from assets/images-src (e.g. "post-1"). */
  name: string;
};

/**
 * Optimized, art-directed image: AVIF with WebP fallback via <picture>, srcset from the
 * offline pipeline, `fill` inside a ratio box (so no layout shift). `alt=""` marks decorative images.
 */
export function Img({ name, alt, sizes, ...rest }: Props) {
  const common = { alt, sizes, fill: true as const, ...rest };
  const { props: webp } = getImageProps({ ...common, src: name });
  const { props: avif } = getImageProps({ ...common, src: `${name}.avif` });
  const { srcSet: avifSet } = avif;
  return (
    <picture>
      <source type="image/avif" srcSet={avifSet} sizes={sizes} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...webp} />
    </picture>
  );
}
