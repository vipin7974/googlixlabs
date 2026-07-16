export function ResultCard({
  label,
  value,
  sublabel,
  accent,
}: {
  label: string;
  value: string;
  sublabel?: string;
  accent?: string;
}) {
  return (
    <div className="gx-result-card">
      <span className="gx-result-label">{label}</span>
      <span className="gx-result-value" style={accent ? { color: accent } : undefined}>
        {value}
      </span>
      {sublabel ? <span className="gx-result-sublabel">{sublabel}</span> : null}
    </div>
  );
}
