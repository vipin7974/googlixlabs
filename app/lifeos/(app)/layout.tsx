import { LifeOsShell } from "@/components/lifeos/layout/LifeOsShell";

export default function LifeOsAppLayout({ children }: { children: React.ReactNode }) {
  return <LifeOsShell>{children}</LifeOsShell>;
}
