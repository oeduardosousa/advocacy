import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Veil } from "@/components/layout/Veil";
import { Footer } from "@/components/layout/Footer";
import { SiteNav } from "@/components/layout/SiteNav";
import { WhatsAppBar } from "@/components/layout/WhatsAppBar";
import { Ambient } from "@/components/providers/Ambient";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { PageTransitionShell } from "@/components/providers/PageTransition";
import { instrumentSans, newsreader } from "@/lib/fonts";
import { SITE } from "@/lib/site";

import "./globals.css";

// No domain yet (BRIEF.md): absolute URLs (canonical, og:image) switch on when
// NEXT_PUBLIC_SITE_URL is set at build time, e.g. https://example.com
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "./" } } : {}),
  title: {
    default: `${SITE.name} — projeto conceito`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.name,
    title: `${SITE.name} — projeto conceito`,
    description: SITE.description,
    // Absolute image URL needs a domain: without one, Next would emit a localhost URL.
    ...(siteUrl
      ? { images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Ilustração de demonstração: luz de janela sobre uma mesa, com papéis e uma caneta-tinteiro." }] }
      : {}),
  },
  twitter: { card: siteUrl ? "summary_large_image" : "summary" },
};

export const viewport: Viewport = {
  themeColor: "#F4EFE6",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${newsreader.variable} ${instrumentSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Veil />
        <a href="#conteudo" className="skip-link">
          Ir para o conteúdo
        </a>
        <MotionProvider>
          <Ambient />
          <PageTransitionShell>
            <SiteNav />
            <WhatsAppBar />
            <main id="conteudo" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </PageTransitionShell>
        </MotionProvider>
      </body>
    </html>
  );
}
