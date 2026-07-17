import Link from "next/link";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 12,
          color: "var(--muted)",
        }}
      >
        {items.map((item, i) => (
          <li key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {item.href ? (
              <Link href={item.href} data-cursor style={{ color: "var(--muted)" }}>
                {item.label}
              </Link>
            ) : (
              <span style={{ color: "var(--ink)" }} aria-current="page">
                {item.label}
              </span>
            )}
            {i < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
