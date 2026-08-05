import { dateKey, parseKey } from "./date";

export function calculateStreak(doneDateKeys: string[], referenceDate: Date = new Date()): {
  current: number;
  longest: number;
} {
  const done = new Set(doneDateKeys);
  if (done.size === 0) return { current: 0, longest: 0 };

  const sorted = [...done].sort();
  let longest = 0;
  let run = 0;
  let prev: Date | null = null;

  for (const key of sorted) {
    const d = parseKey(key);
    if (prev) {
      const diffDays = Math.round((d.getTime() - prev.getTime()) / 86_400_000);
      run = diffDays === 1 ? run + 1 : 1;
    } else {
      run = 1;
    }
    longest = Math.max(longest, run);
    prev = d;
  }

  let current = 0;
  const cursor = new Date(referenceDate);
  if (!done.has(dateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (done.has(dateKey(cursor))) {
    current += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return { current, longest };
}
