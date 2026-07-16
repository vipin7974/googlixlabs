import type { CSSProperties } from "react";

/**
 * Thin wrapper around the site-wide `[data-count]` counter engine already
 * driven by <Interactions /> (IntersectionObserver + eased count-up) —
 * reuses that logic instead of re-implementing counting animation here.
 */
export function AnimatedCounter({
  target,
  suffix = "",
  style,
}: {
  target: number;
  suffix?: string;
  style?: CSSProperties;
}) {
  return (
    <span style={style}>
      <span data-count={target}>0</span>
      {suffix}
    </span>
  );
}
