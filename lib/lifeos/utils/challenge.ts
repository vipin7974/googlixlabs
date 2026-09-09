import { addDays, differenceInCalendarDays } from "date-fns";
import { dateKey, parseKey, todayKey } from "./date";
import type { Challenge, ChallengeLog } from "../types/challenge";

export function challengeDateKeys(challenge: Challenge): string[] {
  const start = parseKey(challenge.startDate);
  return Array.from({ length: challenge.durationDays }, (_, i) => dateKey(addDays(start, i)));
}

export type ChallengeDayStatus = "done" | "missed" | "pending" | "locked";

/** Past days without a log auto-cross themselves out; today stays actionable; future days are locked. */
export function challengeDayStatus(day: string, done: boolean, today: string): ChallengeDayStatus {
  if (day > today) return "locked";
  if (done) return "done";
  return day === today ? "pending" : "missed";
}

export function computeChallengeStats(challenge: Challenge, logs: ChallengeLog[]) {
  const today = todayKey();
  const dayKeys = challengeDateKeys(challenge);
  const doneSet = new Set(logs.filter((l) => l.done).map((l) => l.date));
  const doneCount = dayKeys.filter((k) => doneSet.has(k)).length;
  const elapsed = Math.min(
    challenge.durationDays,
    Math.max(0, differenceInCalendarDays(parseKey(today), parseKey(challenge.startDate)) + 1)
  );
  const daysLeft = Math.max(0, challenge.durationDays - elapsed);
  const percent = challenge.durationDays > 0 ? Math.round((doneCount / challenge.durationDays) * 100) : 0;
  const notStarted = today < challenge.startDate;
  const completed = elapsed >= challenge.durationDays;

  return { dayKeys, doneCount, elapsed, daysLeft, percent, notStarted, completed };
}

/** Monday-first month grid, padded to full weeks; cells outside the month are null. */
export function buildMonthGrid(monthKey: string): (string | null)[] {
  const [year, month] = monthKey.split("-").map(Number);
  const first = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const leading = (first.getDay() + 6) % 7;

  const cells: (string | null)[] = Array(leading).fill(null);
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push(dateKey(new Date(year, month - 1, d)));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
