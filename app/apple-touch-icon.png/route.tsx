import { ImageResponse } from "next/og";

export const runtime = "edge";

// Served as a plain route (not the app/apple-icon.tsx convention) so it
// doesn't get merged into — and silently replace — the SVG <link rel="icon">
// that comes from metadata.icons in app/layout.tsx.
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#17181B",
        }}
      >
        <svg width="128" height="128" viewBox="0 0 40 40" fill="none">
          <path
            d="M28.6 24.6 A10 10 0 1 1 28.6 15.4"
            fill="none"
            stroke="#F4F3EE"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
          <path d="M29.2 20 H21.8" stroke="#F4F3EE" strokeWidth="3.6" strokeLinecap="round" />
          <circle cx="30.4" cy="10" r="2.9" fill="#2B5CFF" />
        </svg>
      </div>
    ),
    { width: 180, height: 180 }
  );
}
