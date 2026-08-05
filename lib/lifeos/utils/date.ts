import {
  format,
  startOfWeek,
  startOfMonth,
  differenceInCalendarDays,
  parseISO,
  isValid,
} from "date-fns";

export const DATE_KEY_FORMAT = "yyyy-MM-dd";

export function todayKey(): string {
  return format(new Date(), DATE_KEY_FORMAT);
}

export function dateKey(date: Date): string {
  return format(date, DATE_KEY_FORMAT);
}

export function weekStartKey(date: Date = new Date()): string {
  return format(startOfWeek(date, { weekStartsOn: 1 }), DATE_KEY_FORMAT);
}

export function monthKey(date: Date = new Date()): string {
  return format(startOfMonth(date), "yyyy-MM");
}

export function parseKey(key: string): Date {
  const parsed = parseISO(key);
  return isValid(parsed) ? parsed : new Date();
}

export function isSameKey(a: string, b: string): boolean {
  return a === b;
}

export function daysBetween(startKey: string, endKey: string): number {
  return differenceInCalendarDays(parseKey(endKey), parseKey(startKey));
}

export function formatDisplayDate(key: string): string {
  return format(parseKey(key), "EEEE, MMMM d, yyyy");
}

export function formatShortDate(key: string): string {
  return format(parseKey(key), "MMM d");
}

export function formatDateTime(ts: number): string {
  return format(new Date(ts), "MMM d, yyyy h:mm a");
}

export function lastNDayKeys(n: number, from: Date = new Date()): string[] {
  const keys: string[] = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const d = new Date(from);
    d.setDate(d.getDate() - i);
    keys.push(dateKey(d));
  }
  return keys;
}
