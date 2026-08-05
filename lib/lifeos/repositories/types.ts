export interface IRepository<T extends { id: string }> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | undefined>;
  add(item: T): Promise<string>;
  bulkAdd(items: T[]): Promise<void>;
  update(id: string, changes: Partial<T>): Promise<void>;
  put(item: T): Promise<string>;
  remove(id: string): Promise<void>;
  clear(): Promise<void>;
  count(): Promise<number>;
}
