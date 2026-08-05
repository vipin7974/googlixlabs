import type { ID, EntityTimestamps } from "./common";

export type FinanceEntryType = "income" | "expense" | "savings" | "investment";

export type FinanceEntry = EntityTimestamps & {
  id: ID;
  date: string;
  type: FinanceEntryType;
  category: string;
  amount: number;
  notes: string;
};

export type FinanceDraft = Omit<FinanceEntry, "id" | "createdAt" | "updatedAt">;

export const FINANCE_TYPE_LABELS: Record<FinanceEntryType, string> = {
  income: "Income",
  expense: "Expense",
  savings: "Savings",
  investment: "Investment",
};
