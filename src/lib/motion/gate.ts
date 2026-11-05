/**
 * Intro gate: the hero intro waits for the first-visit veil (see Loader) to lift.
 * Pure DOM, no GSAP, safe to import anywhere.
 *
 * The inline loader script sets `data-veil="on"` on <html> only on a first visit;
 * it removes the attribute and dispatches VEIL_DONE_EVENT when the veil is gone.
 */
export const VEIL_DONE_EVENT = "adv:veil-done";

/** Calls `fn` once the veil is gone (immediately on repeat visits). Returns a cleanup. */
export function whenVeilDone(fn: () => void): () => void {
  if (typeof document === "undefined") return () => {};
  if (document.documentElement.getAttribute("data-veil") !== "on") {
    fn();
    return () => {};
  }
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    window.removeEventListener(VEIL_DONE_EVENT, run);
    fn();
  };
  window.addEventListener(VEIL_DONE_EVENT, run);
  return () => {
    done = true;
    window.removeEventListener(VEIL_DONE_EVENT, run);
  };
}
