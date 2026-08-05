import { getLifeOsDb } from "../db/schema";

export const BACKUP_VERSION = 1;

export type LifeOsBackup = {
  version: number;
  exportedAt: number;
  tables: Record<string, unknown[]>;
};

export async function exportLifeOsData(): Promise<LifeOsBackup> {
  const db = getLifeOsDb();
  const tables: Record<string, unknown[]> = {};

  await Promise.all(
    db.tables.map(async (table) => {
      tables[table.name] = await table.toArray();
    })
  );

  return {
    version: BACKUP_VERSION,
    exportedAt: Date.now(),
    tables,
  };
}

export async function importLifeOsData(backup: LifeOsBackup): Promise<void> {
  if (!backup || typeof backup !== "object" || !backup.tables) {
    throw new Error("Invalid backup file.");
  }

  const db = getLifeOsDb();

  await db.transaction("rw", db.tables, async () => {
    for (const table of db.tables) {
      const rows = backup.tables[table.name];
      if (!Array.isArray(rows)) continue;
      await table.clear();
      if (rows.length > 0) {
        await table.bulkPut(rows as never[]);
      }
    }
  });
}

export function downloadJson(filename: string, data: unknown): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function readJsonFile(file: File): Promise<LifeOsBackup> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        resolve(JSON.parse(String(reader.result)));
      } catch {
        reject(new Error("The selected file is not valid JSON."));
      }
    };
    reader.onerror = () => reject(new Error("Could not read the selected file."));
    reader.readAsText(file);
  });
}
