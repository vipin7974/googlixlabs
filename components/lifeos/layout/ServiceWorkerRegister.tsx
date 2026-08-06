"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    // No trailing slash: the dashboard route is exactly "/lifeos", which
    // would fall outside a "/lifeos/" scope (scope matching is a string
    // prefix check) and never get a service worker controller.
    navigator.serviceWorker.register("/lifeos-sw.js", { scope: "/lifeos" }).catch(() => {});
  }, []);

  return null;
}
