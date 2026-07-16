export function BarChart({
  data,
  accent = "var(--accent)",
  formatValue,
  height = 180,
}: {
  data: { label: string; value: number }[];
  accent?: string;
  formatValue?: (value: number) => string;
  height?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div
      role="img"
      aria-label={`Chart: ${data.map((d) => `${d.label} ${formatValue ? formatValue(d.value) : d.value}`).join(", ")}`}
      style={{ display: "flex", alignItems: "flex-end", gap: 10, height, padding: "0 4px" }}
    >
      {data.map((d) => {
        const barHeight = Math.max(4, (d.value / max) * (height - 40));
        return (
          <div
            key={d.label}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              height: "100%",
              gap: 8,
              minWidth: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 10.5,
                color: "var(--muted)",
                whiteSpace: "nowrap",
              }}
            >
              {formatValue ? formatValue(d.value) : d.value}
            </span>
            <div
              style={{
                width: "100%",
                maxWidth: 40,
                height: barHeight,
                borderRadius: "6px 6px 2px 2px",
                background: accent,
                transition: "height 0.5s cubic-bezier(0.19,1,0.22,1)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 10,
                color: "var(--faint)",
                whiteSpace: "nowrap",
              }}
            >
              {d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
