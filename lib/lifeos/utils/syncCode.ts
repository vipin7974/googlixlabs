const STORAGE_KEY = "lifeos-sync-code";
const CODE_PATTERN = /^[a-z0-9]{6,32}$/;

export function isValidSyncCode(code: string): boolean {
  return CODE_PATTERN.test(code);
}

function generateSyncCode(): string {
  const bytes = new Uint8Array(10);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => (b % 36).toString(36)).join("");
}

export function getSyncCode(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEY);
}

/** Every device/browser gets its own code the first time it opens LifeOS; entering the same code elsewhere links them. */
export function ensureSyncCode(): string {
  if (typeof window === "undefined") return "";
  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing) return existing;

  const created = generateSyncCode();
  window.localStorage.setItem(STORAGE_KEY, created);
  return created;
}

export function setSyncCode(code: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, code);
}
