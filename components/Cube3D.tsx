/**
 * Floating CSS-3D wireframe cube — generalized from the one-off version
 * in components/sections/Studio.tsx so it can be reused (e.g. tinted per
 * location accent) without duplicating the six-face transform math.
 * Pure CSS 3D transforms, no canvas/WebGL. Desktop-only via `.gx-cube-wrap`
 * in globals.css.
 */
function CubeFace({ style }: { style: React.CSSProperties }) {
  return <div style={{ position: "absolute", inset: "15%", ...style }} />;
}

export default function Cube3D({
  accent = "var(--accent)",
  size = "clamp(150px,17vw,240px)",
}: {
  accent?: string;
  size?: string;
}) {
  return (
    <div
      className="gx-cube-wrap"
      style={{
        position: "absolute",
        top: -6,
        right: 0,
        width: size,
        height: size,
        animation: "gxFloat3d 6s ease-in-out infinite",
        perspective: 800,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
          animation: "gxSpin3d 18s linear infinite",
        }}
      >
        <CubeFace style={{ border: `1.5px solid ${accent}`, opacity: 0.85, transform: `translateZ(calc(0.35 * ${size}))` }} />
        <CubeFace style={{ border: "1.5px solid var(--ink)", opacity: 0.5, transform: `translateZ(calc(-0.35 * ${size}))` }} />
        <CubeFace style={{ border: "1.5px solid var(--ink)", opacity: 0.5, transform: `rotateY(90deg) translateZ(calc(0.35 * ${size}))` }} />
        <CubeFace style={{ border: `1.5px solid ${accent}`, opacity: 0.85, transform: `rotateY(90deg) translateZ(calc(-0.35 * ${size}))` }} />
        <CubeFace style={{ border: "1.5px solid var(--ink)", opacity: 0.5, transform: `rotateX(90deg) translateZ(calc(0.35 * ${size}))` }} />
        <CubeFace style={{ border: "1.5px solid var(--ink)", opacity: 0.5, transform: `rotateX(90deg) translateZ(calc(-0.35 * ${size}))` }} />
      </div>
    </div>
  );
}
