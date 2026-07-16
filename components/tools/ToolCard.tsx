import Link from "next/link";
import { ToolIcon } from "./icons";
import type { ToolMeta } from "@/lib/tools/types";

export function ToolCard({ tool }: { tool: ToolMeta }) {
  const isAvailable = tool.status === "available";

  const inner = (
    <>
      <span className="gx-tool-icon" style={{ color: tool.accent, borderColor: `${tool.accent}33` }}>
        <ToolIcon name={tool.icon} />
      </span>
      <h3 className="gx-tool-card-title">{tool.title}</h3>
      <p className="gx-tool-card-desc">{tool.description}</p>
      <span
        className="gx-tool-card-cta"
        style={{ color: isAvailable ? tool.accent : "var(--faint)" }}
      >
        {isAvailable ? "Launch Tool ↗" : "Coming soon"}
      </span>
    </>
  );

  if (!isAvailable) {
    return (
      <div className="gx-tool-card gx-tool-card-disabled" aria-disabled="true" data-fade>
        {inner}
      </div>
    );
  }

  return (
    <Link href={`/tools/${tool.slug}`} data-cursor data-fade className="gx-tool-card">
      {inner}
    </Link>
  );
}
