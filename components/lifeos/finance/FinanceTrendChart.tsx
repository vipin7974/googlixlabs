"use client";

import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { ChartCard } from "@/components/lifeos/analytics/ChartCard";
import { FINANCE_TYPE_LABELS, type FinanceEntry } from "@/lib/lifeos/types/finance";
import { monthKey } from "@/lib/lifeos/utils/date";

const TYPE_COLORS: Record<FinanceEntry["type"], string> = {
  income: "#10b981",
  expense: "#e5484d",
  savings: "#2b5cff",
  investment: "#8b5cf6",
};

export function FinanceTrendChart({ entries }: { entries: FinanceEntry[] }) {
  const data = useMemo(() => {
    const now = new Date();
    const months: { key: string; label: string }[] = [];
    for (let i = 5; i >= 0; i -= 1) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ key: monthKey(d), label: d.toLocaleDateString(undefined, { month: "short" }) });
    }

    return months.map(({ key, label }) => {
      const monthEntries = entries.filter((entry) => entry.date.startsWith(key));
      const totals: Record<FinanceEntry["type"], number> = {
        income: 0,
        expense: 0,
        savings: 0,
        investment: 0,
      };
      monthEntries.forEach((entry) => {
        totals[entry.type] += entry.amount;
      });
      return { label, ...totals };
    });
  }, [entries]);

  return (
    <ChartCard title="Monthly Trend">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="label" fontSize={11} />
          <YAxis fontSize={11} />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" name={FINANCE_TYPE_LABELS.income} fill={TYPE_COLORS.income} radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" name={FINANCE_TYPE_LABELS.expense} fill={TYPE_COLORS.expense} radius={[4, 4, 0, 0]} />
          <Bar dataKey="savings" name={FINANCE_TYPE_LABELS.savings} fill={TYPE_COLORS.savings} radius={[4, 4, 0, 0]} />
          <Bar
            dataKey="investment"
            name={FINANCE_TYPE_LABELS.investment}
            fill={TYPE_COLORS.investment}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
