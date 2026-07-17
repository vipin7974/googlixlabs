"use client";

import { useState } from "react";
import Link from "next/link";
import { findNearestLocationSlug } from "@/lib/locations/geo";
import { getLocationBySlug } from "@/lib/locations/registry";

type Status = "idle" | "loading" | "found" | "denied" | "unsupported";

export function NearestLocation() {
  const [status, setStatus] = useState<Status>("idle");
  const [matchedSlug, setMatchedSlug] = useState<string | null>(null);

  function handleClick() {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setStatus("unsupported");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMatchedSlug(findNearestLocationSlug(position.coords.latitude, position.coords.longitude));
        setStatus("found");
      },
      () => setStatus("denied"),
      { timeout: 8000, maximumAge: 10 * 60 * 1000 }
    );
  }

  // Fail silently rather than nagging — this is a convenience, not a requirement.
  if (status === "unsupported" || status === "denied") return null;

  const matchedLocation = matchedSlug ? getLocationBySlug(matchedSlug) : undefined;

  return (
    <div
      data-fade
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        flexWrap: "wrap",
        padding: "16px 22px",
        border: "1px solid var(--line)",
        borderRadius: 100,
        marginBottom: 44,
      }}
    >
      {status === "found" && matchedLocation ? (
        <>
          <span style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 14, color: "var(--ink)" }}>
            Looks like you might be near <strong>{matchedLocation.name}</strong>.
          </span>
          <Link
            href={`/locations/${matchedLocation.slug}`}
            data-cursor
            className="gx-nav-cta"
            style={{ fontSize: 12 }}
          >
            View {matchedLocation.name} page ↗
          </Link>
        </>
      ) : (
        <button
          type="button"
          data-cursor
          onClick={handleClick}
          disabled={status === "loading"}
          className="gx-nav-cta"
          style={{ fontSize: 12 }}
        >
          {status === "loading" ? "Finding your nearest location…" : "Find my nearest location"}
        </button>
      )}
    </div>
  );
}
