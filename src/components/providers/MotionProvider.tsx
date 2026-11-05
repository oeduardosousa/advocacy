"use client";

import type Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { MotionRuntime } from "@/lib/motion/runtime";
import type { MotionTier } from "@/lib/motion/tier";

export interface MotionContextValue {
  /** true once GSAP, plugins and (if the tier allows) Lenis are loaded. */
  ready: boolean;
  /**
   * Current tier. Before `ready` it is "reduced" (= static, what SSR rendered), so
   * markup is identical on server and first client render and content is never hidden.
   */
  tier: MotionTier;
  /** GSAP + plugins, null until ready. Components must work without it (static fallback). */
  motion: MotionRuntime | null;
  /** Lenis instance, only in the Full tier. */
  lenis: Lenis | null;
}

const MotionContext = createContext<MotionContextValue>({
  ready: false,
  tier: "reduced",
  motion: null,
  lenis: null,
});

export function useMotion(): MotionContextValue {
  return useContext(MotionContext);
}

/** Run `fn` after first paint, off the critical path. */
function afterFirstPaint(fn: () => void): () => void {
  let cancelled = false;
  let idleId: number | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const run = () => {
    if (!cancelled) fn();
  };

  const rafId = requestAnimationFrame(() => {
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(run, { timeout: 1000 });
    } else {
      timeoutId = setTimeout(run, 1);
    }
  });

  return () => {
    cancelled = true;
    cancelAnimationFrame(rafId);
    if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  };
}

/**
 * Loads the motion runtime after first paint, registers GSAP plugins once, and uses
 * gsap.matchMedia() (via createMotionMatcher) to decide the tier:
 *   full    -> Lenis created and synced with ScrollTrigger
 *   lite    -> native scroll, lighter effects
 *   reduced -> native scroll, static/opacity-only
 * Lenis is destroyed automatically when the tier or breakpoint changes.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MotionContextValue>({
    ready: false,
    tier: "reduced",
    motion: null,
    lenis: null,
  });

  useEffect(() => {
    let mm: { kill: (revert?: boolean) => void } | null = null;
    let disposed = false;

    const cancelSchedule = afterFirstPaint(() => {
      import("@/lib/motion/runtime").then((runtime) => {
        if (disposed) return;

        mm = runtime.createMotionMatcher({
          full: () => {
            const handle = runtime.startLenis();
            setState({
              ready: true,
              tier: "full",
              motion: runtime,
              lenis: handle.lenis,
            });
            return handle.destroy;
          },
          lite: () => {
            setState({ ready: true, tier: "lite", motion: runtime, lenis: null });
          },
          reduced: () => {
            setState({
              ready: true,
              tier: "reduced",
              motion: runtime,
              lenis: null,
            });
          },
        });
      });
    });

    return () => {
      disposed = true;
      cancelSchedule();
      mm?.kill(true);
    };
  }, []);

  const value = useMemo(() => state, [state]);

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
