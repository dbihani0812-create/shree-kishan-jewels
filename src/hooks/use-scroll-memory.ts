import { useEffect } from "react";

/** In-memory scroll store. Module scope means it survives client-side route
 *  changes but is wiped by a fresh load or refresh — so "always start at the
 *  hero on fresh load" still holds, while going back from a set page restores
 *  exactly where the visitor left off. */
const positions = new Map<string, number>();
let clientNavigated = false;

export function useScrollMemory(key: string, opts: { honourHash?: boolean; startAtTopOnLoad?: boolean } = {}) {
  const { honourHash = false, startAtTopOnLoad = false } = opts;

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const saved = positions.get(key);
    const hash = honourHash ? window.location.hash.replace("#", "") : "";
    let timer: number | undefined;

    if (startAtTopOnLoad && !clientNavigated) {
      // Remove stale anchors before the browser can jump to them after loading.
      if (window.location.hash) {
        window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } else if (clientNavigated && saved != null && saved > 0) {
      // Let layout settle before jumping back to the remembered offset.
      timer = window.setTimeout(() => window.scrollTo(0, saved), 60);
    } else if (hash) {
      timer = window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 900);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    const onScroll = () => positions.set(key, window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      positions.set(key, window.scrollY);
      clientNavigated = true;
    };
  }, [key, honourHash, startAtTopOnLoad]);
}
