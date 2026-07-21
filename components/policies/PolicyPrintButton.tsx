"use client";

export function PolicyPrintButton() {
  return (
    <button
      type="button"
      data-cursor
      onClick={() => window.print()}
      className="gx-print-hide"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-mono), monospace",
        fontSize: 12,
        letterSpacing: ".02em",
        color: "var(--paper)",
        background: "transparent",
        border: "1px solid rgba(244,243,238,.4)",
        borderRadius: 100,
        padding: "10px 18px",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      Download / Print PDF ↓
    </button>
  );
}
