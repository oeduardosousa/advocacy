import { Instrument_Sans, Newsreader } from "next/font/google";

// Display + reading font. Variable file with the optical-size axis, Latin subset
// (covers pt-BR diacritics). Italic is the only emphasis inside headlines.
export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-newsreader",
});

// Interface font. Variable file, Latin subset.
export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});
