import type { Table, UpdateSpec } from "dexie";
import type { IRepository } from "./types";

/**
 * IndexedDB-backed repository. All entity repositories extend this so the
 * storage engine lives in exactly one place — swapping to a remote backend
 * later (e.g. Supabase) means writing one new base class, not touching UI.
 */
export class DexieRepository<T extends { id: string }> implements IRepository<T> {
  constructor(private getTable: () => Table<T, string>) {}

  protected get table(): Table<T, string> {
    return this.getTable();
  }

  async getAll(): Promise<T[]> {
    return this.table.toArray();
  }

  async getById(id: string): Promise<T | undefined> {
    return this.table.get(id);
  }

  async add(item: T): Promise<string> {
    return this.table.add(item);
  }

  async bulkAdd(items: T[]): Promise<void> {
    await this.table.bulkAdd(items);
  }

  async update(id: string, changes: Partial<T>): Promise<void> {
    // Dexie's UpdateSpec supports dot-path keys for nested updates; we only
    // ever pass flat top-level partials, which is a valid (narrower) subset.
    await this.table.update(id, changes as unknown as UpdateSpec<T>);
  }

  async put(item: T): Promise<string> {
    return this.table.put(item);
  }

  async remove(id: string): Promise<void> {
    await this.table.delete(id);
  }

  async clear(): Promise<void> {
    await this.table.clear();
  }

  async count(): Promise<number> {
    return this.table.count();
  }
}
