import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Veil } from "@/components/layout/Veil";
import { Footer } from "@/components/layout/Footer";
import { SiteNav } from "@/components/layout/SiteNav";
import { WhatsAppBar } from "@/components/layout/WhatsAppBar";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { PageTransitionShell } from "@/components/providers/PageTransition";
import { instrumentSans, newsreader } from "@/lib/fonts";
import { SITE } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — projeto conceito`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.notice,
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
