"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";

import { ease, pageTransition } from "@/lib/motion/tokens";
import { useMotion } from "./MotionProvider";

/**
 * Page transition shell (DESIGN.md "Page transitions").
 *
 * App Router has no exit hook, so link clicks made through <TransitionLink> are
 * intercepted: a Paper Deep sheet covers the route, router.push runs once the cover
 * completes, then the sheet lifts away. It is a single fixed element animated with
 * transforms only; the Sheet lift shadow is applied only while it moves.
 *
 * Never runs on: first load, back/forward, hash links, same-page navigation, modified
 * clicks, keyboard-initiated clicks. Interruptible: a new click retargets the sheet
 * from its current position (overwrite).
 *
 * Reduced motion: instant route swap with a 150ms opacity crossfade.
 */

interface PageTransitionContextValue {
  navigate: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue>({
  navigate: () => {},
});

export function usePageTransition(): PageTransitionContextValue {
  return useContext(PageTransitionContext);
}

/** Safety net: lift the sheet even if the route never reports a new pathname. */
const SWAP_TIMEOUT_MS = 2000;

export function PageTransitionShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { ready, tier, motion, lenis } = useMotion();

  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const previousPath = useRef(pathname);
  /** true between the cover completing and the new route being committed. */
  const awaitingSwap = useRef(false);
  /** true when the shell (not back/forward) initiated the navigation. */
  const shellNavigation = useRef(false);
  const swapTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Park the sheet below the viewport once GSAP owns its transform.
  useEffect(() => {
    if (!ready || !motion || !sheetRef.current) return;
    motion.gsap.set(sheetRef.current, { yPercent: 100 });
  }, [ready, motion]);

  const lift = useCallback(() => {
    const sheet = sheetRef.current;
    if (!sheet || !motion) return;
    const timings = tier === "full" ? pageTransition.full : pageTransition.lite;

    motion.gsap.to(sheet, {
      yPercent: -100,
      duration: timings.lift,
      ease: ease.drawer,
      overwrite: true,
      onComplete: () => {
        motion.gsap.set(sheet, { yPercent: 100 });
        delete sheet.dataset.moving;
      },
    });
  }, [motion, tier]);

  const navigate = useCallback(
    (href: string) => {
      shellNavigation.current = true;

      const sheet = sheetRef.current;
      if (!ready || !motion || !sheet || tier === "reduced") {
        router.push(href);
        return;
      }

      const timings = tier === "full" ? pageTransition.full : pageTransition.lite;
      awaitingSwap.current = false;
      clearTimeout(swapTimeout.current);
      sheet.dataset.moving = "true";

      motion.gsap.to(sheet, {
        yPercent: 0,
        duration: timings.cover,
        ease: ease.inOut,
        overwrite: true, // retargets from the current position when interrupted
        onComplete: () => {
          awaitingSwap.current = true;
          router.push(href);
          swapTimeout.current = setTimeout(() => {
            if (awaitingSwap.current) {
              awaitingSwap.current = false;
              lift();
            }
          }, SWAP_TIMEOUT_MS);
        },
      });
    },
    [ready, motion, tier, router, lift],
  );

  // Route committed: finish the transition, reset scroll, refresh triggers.
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    const fromShell = shellNavigation.current;
    shellNavigation.current = false;

    // Lenis keeps its own scroll position; reset it with the route.
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);

    if (awaitingSwap.current) {
      awaitingSwap.current = false;
      clearTimeout(swapTimeout.current);
      lift();
    } else if (fromShell && tier === "reduced" && contentRef.current) {
      contentRef.current.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: pageTransition.reducedFade * 1000,
        easing: "linear",
      });
    }

    if (motion) {
      requestAnimationFrame(() => motion.ScrollTrigger.refresh());
    }
  }, [pathname, motion, tier, lenis, lift]);

  useEffect(() => () => clearTimeout(swapTimeout.current), []);

  const value = useMemo(() => ({ navigate }), [navigate]);

  return (
    <PageTransitionContext.Provider value={value}>
      <div ref={contentRef}>{children}</div>
      <div ref={sheetRef} className="page-sheet" aria-hidden="true" />
    </PageTransitionContext.Provider>
  );
}

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

/** Drop-in <Link> that routes internal clicks through the page transition. */
export function TransitionLink({ href, onClick, target, ...rest }: TransitionLinkProps) {
  const { navigate } = usePageTransition();
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    // Let the browser handle: modified clicks, non-primary buttons, new tabs.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (target && target !== "_self") return;
    // Keyboard-initiated activation (Enter) has detail 0: no animation (DESIGN.md).
    if (event.detail === 0) return;
    if (href.startsWith("#")) return;

    let url: URL;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return;
    }
    if (url.origin !== window.location.origin) return;

    const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);
    if (normalize(url.pathname) === normalize(pathname)) return; // same page / hash

    event.preventDefault();
    navigate(url.pathname + url.search + url.hash);
  };

  return <Link href={href} target={target} onClick={handleClick} {...rest} />;
}
