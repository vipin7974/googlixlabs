export function ScoreCircle({
  score,
  label,
  size = 148,
  accent = "#2B5CFF",
}: {
  score: number;
  label?: string;
  size?: number;
  accent?: string;
}) {
  const clamped = Math.max(0, Math.min(100, score));
  const stroke = size * 0.09;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
        role="img"
        aria-label={`Score: ${Math.round(clamped)} out of 100`}
      >
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={accent}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.19,1,0.22,1)" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-bricolage), sans-serif",
            fontWeight: 600,
            fontSize: size * 0.26,
            letterSpacing: "-.02em",
            color: "var(--ink)",
            lineHeight: 1,
          }}
        >
          {Math.round(clamped)}
        </span>
        {label ? (
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 10.5,
              letterSpacing: ".04em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginTop: 4,
              textAlign: "center",
            }}
          >
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
