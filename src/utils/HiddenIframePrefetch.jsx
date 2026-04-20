/**
 * HiddenIframePrefetch
 * ---------------------
 * Preloads a cross‑origin iframe in the background so that when the user
 * later navigates to the CV page, the iframe loads instantly from cache.
 *
 * Features:
 * - Idle‑only loading (requestIdleCallback with timeout fallback)
 * - Respects Save‑Data
 * - Invisible, zero‑impact on layout
 * - Cleans itself up on unmount
 * - Does not run twice
 */

import { useEffect, useRef } from "react";

export default function HiddenIframePrefetch({
  src,
  idleTimeout = 2000
}) {
  const iframeRef = useRef(null);
  const idleHandleRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Respect Save‑Data
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection && connection.saveData) return;

    // Already prefetched in this session?
    if (sessionStorage.getItem("cvPrefetched") === "true") return;

    function loadIframe() {
      if (iframeRef.current) return;

      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.style.display = "none";
      iframe.loading = "eager"; // ensure immediate fetch
      iframe.sandbox = "allow-same-origin allow-popups allow-popups-to-escape-sandbox"; // last one allows target="_blank" links in the CV to work, we don't allow scripts here


      document.body.appendChild(iframe);
      iframeRef.current = iframe;

      // Mark as prefetched
      sessionStorage.setItem("cvPrefetched", "true");
    }

    // Prefer idle callback
    if ("requestIdleCallback" in window) {
      idleHandleRef.current = window.requestIdleCallback(
        loadIframe,
        { timeout: idleTimeout }
      );
    } else {
      // Fallback: small delay to avoid blocking mount
      timeoutRef.current = setTimeout(loadIframe, idleTimeout);
    }

    return () => {
      if (idleHandleRef.current && window.cancelIdleCallback) {
        window.cancelIdleCallback(idleHandleRef.current);
      }
      clearTimeout(timeoutRef.current);
      // Do NOT remove the iframe — we want it cached
    };
  }, [src, idleTimeout]);

  return null;
}
