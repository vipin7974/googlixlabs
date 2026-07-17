"use client";

import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "gx_presence_session";
const HEARTBEAT_MS = 15_000;

function getSessionId(): string {
  try {
    let id = window.sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    // sessionStorage blocked (private mode etc.) — fall back to a per-mount id, still counts this visitor correctly, just won't survive a page reload as "the same" session.
    return crypto.randomUUID();
  }
}

/**
 * Renders nothing until the first successful heartbeat confirms Upstash
 * is actually configured — a live-visitor badge that shows "0" (or
 * breaks) because the env vars aren't set yet would be worse than no
 * badge at all.
 */
export function LiveVisitors() {
  const [count, setCount] = useState<number | null>(null);
  const sessionIdRef = useRef<string>("");

  useEffect(() => {
    sessionIdRef.current = getSessionId();
    let cancelled = false;

    async function heartbeat() {
      try {
        const res = await fetch("/api/presence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sessionIdRef.current }),
        });
        if (!res.ok) return;
        const data = (await res.json()) as { count: number | null };
        if (!cancelled && typeof data.count === "number") {
          setCount(data.count);
        }
      } catch {
        // transient network issue — keep showing the last known count rather than hiding the badge
      }
    }

    heartbeat();
    const interval = setInterval(heartbeat, HEARTBEAT_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (count === null) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 20,
        bottom: 20,
        zIndex: 50,
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        fontFamily: "var(--font-mono), monospace",
        fontSize: 12,
        color: "var(--muted)",
        background: "var(--paper)",
        border: "1px solid var(--line)",
        borderRadius: 100,
        padding: "9px 16px",
        boxShadow: "0 6px 20px rgba(23,24,27,0.1)",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "var(--accent)",
          animation: "gxBlink 2.4s infinite",
        }}
      />
      {count} {count === 1 ? "person" : "people"} viewing now
    </div>
  );
}
