export type ToolStatus = "available" | "coming-soon";

export type ToolIconName =
  | "calculator"
  | "chart"
  | "gauge"
  | "target"
  | "qrcode"
  | "whatsapp"
  | "percent"
  | "coins"
  | "document"
  | "idcard";

export interface ToolMeta {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: ToolIconName;
  accent: string;
  status: ToolStatus;
  keywords: string[];
}
