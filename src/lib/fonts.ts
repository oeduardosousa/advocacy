import { Instrument_Sans, Newsreader } from "next/font/google";

// Display + reading font. Variable weight file, Latin subset (covers pt-BR diacritics).
// Italic is the only emphasis inside headlines.
// Performance: the optical-size (opsz) axis was dropped. With it the two files weigh
// ~280 KB and compete with the LCP image for bandwidth on mobile; without it ~120 KB
// (home LCP 3.4s -> 2.3s on simulated 4G). To restore: add axes: ["opsz"].
export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

// Interface font. Variable file, Latin subset.
export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});
