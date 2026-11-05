"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { useMotion } from "@/components/providers/MotionProvider";
import { TransitionLink } from "@/components/providers/PageTransition";
import { Magnetic } from "@/components/ui/Magnetic";
import { WhatsAppGlyph } from "@/components/ui/icons";
import { CONTACT, NAV_LINKS, ROUTES, SITE } from "@/lib/site";

const SCROLLED_AFTER = 80;
const HIDE_AFTER = 200;

function isCurrent(pathname: string, href: string) {
  const norm = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);
  return norm(pathname) === norm(href) || norm(pathname).startsWith(norm(href) + "/");
}

export function SiteNav() {
  const pathname = usePathname();
  const { lenis } = useMotion();
  const headerRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // Transparent over the hero, Paper after 80px; hides on scroll down, returns on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > SCROLLED_AFTER);
      const focusInside = headerRef.current?.contains(document.activeElement) ?? false;
      if (y < HIDE_AFTER || y < last || focusInside || open) setHidden(false);
      else if (y > last + 2) setHidden(true);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [open]);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Scroll lock + focus handling while the menu is open.
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();
    const sheet = sheetRef.current;
    const first = sheet?.querySelector<HTMLElement>("a");
    const t = window.setTimeout(() => first?.focus(), 60);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !sheet) return;
      const items = [
        toggleRef.current,
        ...Array.from(sheet.querySelectorAll<HTMLElement>("a[href]")),
      ].filter((el): el is HTMLElement => !!el);
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [open, lenis, close]);

  return (
    <>
      <header
        ref={headerRef}
        className="site-nav fixed inset-x-0 top-0 z-50"
        data-scrolled={scrolled}
        data-hidden={hidden}
      >
        <div className="container-page flex h-16 items-center justify-between lg:h-20">
          <TransitionLink
            href={ROUTES.home}
            className="settle font-serif text-[1.375rem] leading-none tracking-[-0.01em] text-ink"
            aria-label={`${SITE.name}, página inicial`}
          >
            {SITE.name}
          </TransitionLink>

          <nav aria-label="Principal" className="settle hidden items-center gap-8 lg:flex">
            <ul className="type-label flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <TransitionLink
                    href={link.href}
                    className="nav-link"
                    aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
            <Magnetic>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <WhatsAppGlyph />
                WhatsApp
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </Magnetic>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="type-label settle -mr-3 flex h-11 min-w-11 items-center px-3 text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Fechar" : "Menu"}
          </button>
        </div>
      </header>

      <div
        id="menu-mobile"
        ref={sheetRef}
        className="menu-sheet fixed inset-0 z-40 overflow-y-auto bg-paper lg:hidden"
        data-open={open}
        inert={!open}
      >
        <nav aria-label="Menu" className="container-page flex min-h-full flex-col justify-center pb-16 pt-28">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.href}
                className="menu-item border-b border-rule"
                style={{ "--i": i } as React.CSSProperties}
              >
                <TransitionLink
                  href={link.href}
                  className="type-title flex min-h-16 items-center py-3"
                  aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
          <p className="type-small menu-item mt-8 text-ink-mute" style={{ "--i": NAV_LINKS.length } as React.CSSProperties}>
            {SITE.notice}
          </p>
        </nav>
      </div>
    </>
  );
}
