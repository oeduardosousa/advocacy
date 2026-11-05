"use client";

import { useEffect, useState } from "react";

import { WhatsAppGlyph } from "@/components/ui/icons";
import { CONTACT } from "@/lib/site";

/**
 * Persistent mobile WhatsApp action: 56px, safe-area padded, hidden while the on-screen
 * keyboard is open. Hidden from 1024px up, where the nav carries the button.
 */
export function WhatsAppBar() {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const check = () => setKeyboardOpen(vv.height < window.innerHeight * 0.75);
    vv.addEventListener("resize", check);
    return () => vv.removeEventListener("resize", check);
  }, []);

  return (
    <div
      className="wa-bar fixed inset-x-0 bottom-0 z-40 bg-oxblood lg:hidden"
      hidden={keyboardOpen}
    >
      <a
        href={CONTACT.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="type-label flex h-14 items-center justify-center gap-3 text-paper transition-colors duration-100 ease-out active:bg-ink"
      >
        <WhatsAppGlyph />
        Conversar no WhatsApp
        <span className="sr-only">(abre em nova aba)</span>
      </a>
    </div>
  );
}
