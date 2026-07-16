"use client";

import Link from "next/link";
import { useRecentTools } from "@/lib/tools/useRecentTools";
import { getToolBySlug } from "@/lib/tools/registry";
import type { ToolMeta } from "@/lib/tools/types";
import { ToolIcon } from "./icons";

export function RecentTools() {
  const slugs = useRecentTools();
  const tools = slugs
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is ToolMeta => tool !== undefined);

  if (tools.length === 0) return null;

  return (
    <div className="gx-recent-tools" data-fade>
      <span className="gx-recent-tools-label">Recently used</span>
      <div className="gx-recent-tools-row">
        {tools.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`} data-cursor className="gx-recent-tools-chip">
            <ToolIcon name={tool.icon} size={15} />
            {tool.shortTitle}
          </Link>
        ))}
      </div>
    </div>
  );
}
